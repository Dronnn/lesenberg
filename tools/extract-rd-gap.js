// One-off: extract the gap word list for "Das Schicksal eines Russland-Deutschen".
// Tokenises the book text (German/Latin words only, Cyrillic ignored), counts frequency,
// drops words already covered by tools/dictionary-master.json, and writes a
// frequency-sorted gap list plus fixed-size batch files for translation.
const fs = require("fs");
const path = require("path");

const BOOK = path.join(__dirname, "..", "books", "archive", "Das_Schicksal_eines_Russland-Deutschen", "Das_Schicksal_eines_Russland-Deutschen.md");
const MASTER = path.join(__dirname, "dictionary-master.json");
const OUT_LIST = path.join(__dirname, "wordlists", "russland-deutscher.gap.txt");
const BATCH_DIR = path.join(__dirname, "rd-batches");
const BATCH_SIZE = 900;

let md = fs.readFileSync(BOOK, "utf8");
// Keep only the body: drop everything before the first "## Teil " (h1 + table of contents).
const teilIdx = md.search(/^## Teil /m);
if (teilIdx > 0) md = md.slice(teilIdx);
// Strip image tags, turn links into their text, remove markdown markers.
md = md.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
md = md.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
md = md.replace(/[#>*_`|]/g, " ");

// German/Latin word tokens (Cyrillic and digits excluded).
const tokens = md.match(/[A-Za-zÄÖÜäöüßẞ]+/g) || [];
const freq = new Map();
for (const tok of tokens) {
  if (tok.length < 2) continue;            // skip single letters
  const key = tok.toLowerCase();
  freq.set(key, (freq.get(key) || 0) + 1);
}

const master = JSON.parse(fs.readFileSync(MASTER, "utf8"));
const covered = new Set(Object.keys(master).map(k => k.toLowerCase()));

// Surface form to translate: prefer a Capitalised form if the word ever appears capitalised
// in the text (nouns/names), else lowercase. We track the most-seen surface casing.
const surfaceCount = new Map(); // lowerKey -> { surface -> n }
for (const tok of tokens) {
  if (tok.length < 2) continue;
  const key = tok.toLowerCase();
  const m = surfaceCount.get(key) || {};
  m[tok] = (m[tok] || 0) + 1;
  surfaceCount.set(key, m);
}
const bestSurface = (key) => {
  const m = surfaceCount.get(key) || {};
  return Object.keys(m).sort((a, b) => m[b] - m[a])[0] || key;
};

const gap = [...freq.entries()]
  .filter(([w]) => !covered.has(w))
  .sort((a, b) => b[1] - a[1])      // most frequent first
  .map(([w]) => bestSurface(w));

fs.mkdirSync(path.dirname(OUT_LIST), { recursive: true });
fs.writeFileSync(OUT_LIST, gap.join("\n") + "\n");

// Batch files for translation.
fs.rmSync(BATCH_DIR, { recursive: true, force: true });
fs.mkdirSync(BATCH_DIR, { recursive: true });
let n = 0;
for (let i = 0; i < gap.length; i += BATCH_SIZE) {
  n++;
  const slice = gap.slice(i, i + BATCH_SIZE);
  const name = "rd-" + String(n).padStart(2, "0") + ".txt";
  fs.writeFileSync(path.join(BATCH_DIR, name), slice.join("\n") + "\n");
}

console.log("unique words (>=2 chars):", freq.size);
console.log("already covered by master:", freq.size - gap.length);
console.log("gap words to translate:", gap.length);
console.log("batches of", BATCH_SIZE + ":", n, "-> tools/rd-batches/");
console.log("top 15 gap words:", gap.slice(0, 15).join(", "));
