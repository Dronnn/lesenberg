// Extract unique German words per book from the manifest, with frequencies.
// Pure parsing (no API). Reuses the markdown parser from loader.js.
// Usage: node tools/extract-words.js
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const { parseMarkdownBook } = require(path.join(ROOT, "loader.js"));

const WORD_RE = /[A-Za-zÄÖÜäöüßẞ][A-Za-zÄÖÜäöüßẞ'’\-]*/g;

function tokenize(text) {
  const m = text.match(WORD_RE);
  return m ? m : [];
}

function coverageForTopN(sorted, total, n) {
  let sum = 0;
  for (let i = 0; i < Math.min(n, sorted.length); i++) sum += sorted[i][1];
  return total ? ((sum / total) * 100).toFixed(1) : "0";
}

const manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, "books", "manifest.json"), "utf8")
);

const TMP = "/tmp/lesepfad-words";
fs.mkdirSync(TMP, { recursive: true });

const globalFreq = new Map();

for (const entry of manifest.books) {
  const md = fs.readFileSync(path.join(ROOT, "books", entry.file), "utf8");
  const book = parseMarkdownBook(md, entry);
  const allText = book.chapters.map((c) => c.text.join("\n")).join("\n");
  const tokens = tokenize(allText);

  const freq = new Map();
  for (const t of tokens) {
    const k = t.toLowerCase();
    freq.set(k, (freq.get(k) || 0) + 1);
    globalFreq.set(k, (globalFreq.get(k) || 0) + 1);
  }

  const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  const total = tokens.length;
  const ge = (n) => sorted.filter(([, c]) => c >= n).length;

  console.log(`\n=== ${entry.id} (${entry.level}) ===`);
  console.log(`  running tokens: ${total}`);
  console.log(`  unique forms:   ${sorted.length}`);
  console.log(`  freq >=2: ${ge(2)} | >=3: ${ge(3)} | >=5: ${ge(5)}`);
  console.log(
    `  coverage by top-N forms:  500→${coverageForTopN(sorted, total, 500)}%  1000→${coverageForTopN(sorted, total, 1000)}%  1500→${coverageForTopN(sorted, total, 1500)}%  2000→${coverageForTopN(sorted, total, 2000)}%`
  );

  // dump full sorted list for generation use
  fs.writeFileSync(
    path.join(TMP, entry.id + ".words.txt"),
    sorted.map(([w, c]) => `${c}\t${w}`).join("\n") + "\n"
  );
}

const gsorted = [...globalFreq.entries()].sort((a, b) => b[1] - a[1]);
const gtotal = gsorted.reduce((s, [, c]) => s + c, 0);
console.log(`\n=== GLOBAL (all 4 books merged) ===`);
console.log(`  running tokens: ${gtotal}`);
console.log(`  unique forms:   ${gsorted.length}`);
console.log(
  `  coverage by top-N forms:  1000→${coverageForTopN(gsorted, gtotal, 1000)}%  2000→${coverageForTopN(gsorted, gtotal, 2000)}%  3000→${coverageForTopN(gsorted, gtotal, 3000)}%  5000→${coverageForTopN(gsorted, gtotal, 5000)}%`
);
fs.writeFileSync(
  path.join(TMP, "_global.words.txt"),
  gsorted.map(([w, c]) => `${c}\t${w}`).join("\n") + "\n"
);
console.log(`\nWord lists written to ${TMP}/`);
