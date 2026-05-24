// Build per-book reading dictionaries via the Claude API.
// This is the FUTURE/online path: given an ANTHROPIC_API_KEY it translates every
// unique word in each book (word -> {pos, lemma, en, ru}) and writes the same
// books/<dir>/<id>.dict.json files as tools/build-dict-from-parts.js, so the two
// paths are interchangeable.
//
// Translations are cached in tools/dictionary-cache.json and only missing words
// are sent, so re-runs are cheap and the job is resumable after an interruption.
//
// Note on prompt caching: the system prompt below is far under Haiku's ~4096-token
// minimum cacheable prefix, so the cache_control block will likely not engage. It
// is kept anyway (harmless). The real cost levers here are the incremental cache
// and batching, not prompt caching.
//
// Usage:
//   ANTHROPIC_API_KEY=... node tools/build-dictionaries.js
//   node tools/build-dictionaries.js --dry-run
//   ANTHROPIC_API_KEY=... node tools/build-dictionaries.js --limit 100
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const { parseMarkdownBook } = require(path.join(ROOT, "loader.js"));
const { bookWords, stringifySorted, dictPathFor } = require(
  path.join(__dirname, "build-dict-from-parts.js")
);

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 8192;
const BATCH_SIZE = 40;
const CONCURRENCY = 3;
const MAX_RETRIES = 5;
const CACHE_PATH = path.join(__dirname, "dictionary-cache.json");

const SYSTEM_PROMPT = [
  "You are a German lexicographer building a reading dictionary for learners",
  "who speak English and Russian. Each input is a JSON array of German words as",
  "they appear in a B1/B2 nonfiction text (surface forms, lowercased).",
  "For every word return:",
  "- word: echo the input word exactly as given",
  "- lemma: the base/dictionary form (infinitive for verbs, nominative singular",
  "  for nouns, positive for adjectives)",
  "- pos: a short part-of-speech tag (one of: art, pron, prep, conj, verb, noun,",
  "  adj, adv, num, part, intj, name, abbr)",
  "- en: a concise English gloss",
  "- ru: a concise Russian gloss",
  "Glosses must be short (a word or short phrase), suitable for a pop-up while",
  "reading. Return one entry per input word, in the same order.",
].join("\n");

const SCHEMA = {
  type: "object",
  properties: {
    entries: {
      type: "array",
      items: {
        type: "object",
        properties: {
          word: { type: "string" },
          lemma: { type: "string" },
          pos: { type: "string" },
          en: { type: "string" },
          ru: { type: "string" },
        },
        required: ["word", "lemma", "pos", "en", "ru"],
        additionalProperties: false,
      },
    },
  },
  required: ["entries"],
  additionalProperties: false,
};

// ---------- args ----------
function parseArgs(argv) {
  const args = { dryRun: false, limit: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--limit") args.limit = parseInt(argv[++i], 10);
  }
  return args;
}

// ---------- cache ----------
function loadCache() {
  if (!fs.existsSync(CACHE_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
  } catch (err) {
    console.error("[build] could not read cache, starting fresh:", err.message);
    return {};
  }
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_PATH, stringifySorted(cache));
}

// ---------- helpers ----------
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildRequestBody(words) {
  return {
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: JSON.stringify(words) }],
    output_config: { format: { type: "json_schema", schema: SCHEMA } },
  };
}

// One HTTP call with retry/backoff. Throws on 400; retries 429/500/529.
async function callApi(words, apiKey) {
  const body = JSON.stringify(buildRequestBody(words));
  let attempt = 0;
  for (;;) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body,
    });

    if (res.ok) return res.json();

    const text = await res.text();
    if (res.status === 400) {
      throw new Error("API 400 (bad request): " + text);
    }
    if ((res.status === 429 || res.status === 500 || res.status === 529) && attempt < MAX_RETRIES) {
      const retryAfter = parseFloat(res.headers.get("retry-after"));
      const waitMs = Number.isFinite(retryAfter)
        ? retryAfter * 1000
        : Math.min(30000, 1000 * Math.pow(2, attempt));
      attempt++;
      console.error(`[build] HTTP ${res.status}, retry ${attempt}/${MAX_RETRIES} in ${waitMs}ms`);
      await sleep(waitMs);
      continue;
    }
    throw new Error(`API ${res.status}: ${text}`);
  }
}

// Pull the first text content block out of the response and JSON.parse it.
function extractEntries(response) {
  const block = (response.content || []).find((b) => b.type === "text");
  if (!block) throw new Error("no text block in response");
  const parsed = JSON.parse(block.text);
  if (!Array.isArray(parsed.entries)) throw new Error("response has no entries array");
  return parsed.entries;
}

// Translate a single batch, retrying the parse once. Returns { word: {pos,lemma,en,ru} }.
async function translateBatch(words, apiKey) {
  let entries;
  try {
    entries = extractEntries(await callApi(words, apiKey));
  } catch (err) {
    console.error("[build] parse/response error, retrying batch once:", err.message);
    entries = extractEntries(await callApi(words, apiKey));
  }

  // Map results back to the requested words, case-insensitively.
  const byWord = new Map();
  for (const e of entries) {
    if (e && typeof e.word === "string") byWord.set(e.word.toLowerCase(), e);
  }
  const out = {};
  for (const w of words) {
    const e = byWord.get(w.toLowerCase());
    if (e) out[w] = { pos: e.pos, lemma: e.lemma, en: e.en, ru: e.ru };
  }
  return out;
}

// Run async tasks with a fixed-size worker pool.
async function runPool(items, limit, worker) {
  let next = 0;
  const workers = [];
  for (let i = 0; i < Math.min(limit, items.length); i++) {
    workers.push(
      (async () => {
        while (next < items.length) {
          const idx = next++;
          await worker(items[idx], idx);
        }
      })()
    );
  }
  await Promise.all(workers);
}

// ---------- main ----------
async function main() {
  const args = parseArgs(process.argv.slice(2));

  const manifest = JSON.parse(
    fs.readFileSync(path.join(ROOT, "books", "manifest.json"), "utf8")
  );

  // Collect each book's unique words (same tokenizer as extract-words.js).
  const perBook = manifest.books.map((entry) => {
    const md = fs.readFileSync(path.join(ROOT, "books", entry.file), "utf8");
    const book = parseMarkdownBook(md, entry);
    let words = [...bookWords(book)].sort();
    if (Number.isInteger(args.limit) && args.limit > 0) words = words.slice(0, args.limit);
    return { entry, words };
  });

  const cache = loadCache();

  // Words across all books not yet in the cache.
  const missingSet = new Set();
  for (const { words } of perBook) {
    for (const w of words) if (!cache[w]) missingSet.add(w);
  }
  const missing = [...missingSet].sort();
  const batches = chunk(missing, BATCH_SIZE);

  if (args.dryRun) {
    console.log("DRY RUN — nothing will be sent.\n");
    for (const { entry, words } of perBook) {
      const newCount = words.filter((w) => !cache[w]).length;
      console.log(`${entry.id}: ${words.length} unique, ${newCount} new`);
    }
    // Rough estimate: words drive both directions; assume ~2 tokens in / ~25 out per word.
    const estIn = missing.length * 2;
    const estOut = missing.length * 25;
    // Haiku 4.5 pricing (approx, USD per 1M tokens): $1 in / $5 out.
    const estCost = (estIn / 1e6) * 1 + (estOut / 1e6) * 5;
    console.log(`\nNew words to translate: ${missing.length}`);
    console.log(`Batches (${BATCH_SIZE}/batch): ${batches.length}`);
    console.log(`Rough token estimate: ~${estIn} in / ~${estOut} out`);
    console.log(`Rough cost estimate:  ~$${estCost.toFixed(4)}`);
    if (batches.length) {
      console.log("\nFirst batch request JSON:");
      console.log(JSON.stringify(buildRequestBody(batches[0]), null, 2));
    }
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not set. Set it and re-run.");
    process.exit(1);
  }

  if (batches.length === 0) {
    console.log("Nothing to translate — cache already covers every word.");
  } else {
    console.log(`Translating ${missing.length} new words in ${batches.length} batches...`);
    let done = 0;
    await runPool(batches, CONCURRENCY, async (batch) => {
      const result = await translateBatch(batch, apiKey);
      Object.assign(cache, result);
      saveCache(cache); // write after each batch -> resumable
      done++;
      console.log(`[build] batch ${done}/${batches.length} done (${Object.keys(result).length} words)`);
    });
  }

  // Write per-book dictionaries in the same layout as build-dict-from-parts.js.
  for (const { entry, words } of perBook) {
    const dict = {};
    let covered = 0;
    for (const w of words) {
      if (cache[w]) {
        dict[w] = cache[w];
        covered++;
      }
    }
    const outPath = dictPathFor(entry);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, stringifySorted(dict));
    const pct = words.length ? ((covered / words.length) * 100).toFixed(1) : "0.0";
    console.log(`${entry.id}: ${covered}/${words.length} covered (${pct}%) -> ${path.relative(ROOT, outPath)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
