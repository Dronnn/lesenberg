// Merge hand-written TSV dictionary parts into per-book dictionary JSON files.
// This is the offline path used right now: translations live in tools/dict-parts/
// as NNN.tsv files (word<TAB>pos<TAB>lemma<TAB>en<TAB>ru) and this script folds
// them into a master map plus one <id>.dict.json next to each book's markdown.
//
// Usage: node tools/build-dict-from-parts.js
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const { parseMarkdownBook } = require(path.join(ROOT, "loader.js"));

// Keep the tokenizer identical to tools/extract-words.js so the word keys match.
const WORD_RE = /[A-Za-zÄÖÜäöüßẞ][A-Za-zÄÖÜäöüßẞ'’\-]*/g;

function tokenize(text) {
  const m = text.match(WORD_RE);
  return m ? m : [];
}

// All unique lowercased word forms across every chapter of a parsed book.
function bookWords(book) {
  const allText = book.chapters.map((c) => c.text.join("\n")).join("\n");
  const set = new Set();
  for (const t of tokenize(allText)) set.add(t.toLowerCase());
  return set;
}

// Pretty JSON with keys sorted alphabetically (so output is stable/diffable).
function stringifySorted(obj) {
  const sorted = {};
  for (const k of Object.keys(obj).sort()) sorted[k] = obj[k];
  return JSON.stringify(sorted, null, 2) + "\n";
}

// books/archive/djatlow.md + id "djatlow-pass" -> "books/archive/djatlow-pass.dict.json"
function dictPathFor(entry) {
  const dir = path.dirname(entry.file); // "archive" or "." if no folder
  const rel = dir === "." ? entry.id + ".dict.json" : path.join(dir, entry.id + ".dict.json");
  return path.join(ROOT, "books", rel);
}

// ---------- read the TSV parts into the master map ----------
function loadParts() {
  const partsDir = path.join(__dirname, "dict-parts");
  const master = {};
  let skipped = 0;

  let files = [];
  if (fs.existsSync(partsDir)) {
    files = fs
      .readdirSync(partsDir)
      .filter((f) => f.toLowerCase().endsWith(".tsv"))
      .sort();
  }

  for (const file of files) {
    const text = fs.readFileSync(path.join(partsDir, file), "utf8");
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
      if (line.trim() === "" || line.trimStart().startsWith("#")) continue;
      const cols = line.split("\t");
      if (cols.length < 5) {
        skipped++;
        continue;
      }
      const [word, pos, lemma, en, ru] = cols;
      const key = word.toLowerCase();
      if (key === "") {
        skipped++;
        continue;
      }
      // Last write wins on duplicate word.
      master[key] = { pos, lemma, en, ru };
    }
  }

  return { master, skipped, fileCount: files.length };
}

// Reused by tools/build-dictionaries.js so the two paths write identical files.
module.exports = { WORD_RE, tokenize, bookWords, stringifySorted, dictPathFor };

function main() {
  const manifest = JSON.parse(
    fs.readFileSync(path.join(ROOT, "books", "manifest.json"), "utf8")
  );

  const { master, skipped, fileCount } = loadParts();

  // Master map for reference / resumability.
  fs.writeFileSync(
    path.join(__dirname, "dictionary-master.json"),
    stringifySorted(master)
  );

  console.log(`Parts files read: ${fileCount}`);
  console.log(`Master map size:  ${Object.keys(master).length}`);
  console.log(`Skipped lines:    ${skipped}`);

  for (const entry of manifest.books) {
    const md = fs.readFileSync(path.join(ROOT, "books", entry.file), "utf8");
    const book = parseMarkdownBook(md, entry);
    const words = bookWords(book);

    const dict = {};
    let covered = 0;
    for (const w of words) {
      if (master[w]) {
        dict[w] = master[w];
        covered++;
      }
    }

    const outPath = dictPathFor(entry);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, stringifySorted(dict));

    const total = words.size;
    const pct = total ? ((covered / total) * 100).toFixed(1) : "0.0";
    console.log(
      `\n=== ${entry.id} ===\n  unique words: ${total}\n  covered:      ${covered}\n  coverage:     ${pct}%\n  -> ${path.relative(ROOT, outPath)}`
    );
  }
}

if (require.main === module) main();
