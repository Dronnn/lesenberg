#!/usr/bin/env node
// Bake per-book stats into books/manifest.json.
//
// For every entry it parses the book's markdown with the same parser the app uses and writes back
// `words`, `minutes`, `pages`, `chapterCount`, inserted right after `chapterMode` (before `blurb`).
// Re-running is idempotent. The `_comment` and `targetChapters` fields are preserved, and the
// original key order is otherwise kept intact.
//
//   node tools/compute-manifest-stats.js

const fs = require('fs');
const path = require('path');
const { parseMarkdownBook } = require('../loader.js');

const ROOT = path.join(__dirname, '..');
const MANIFEST = path.join(ROOT, 'books', 'manifest.json');
const COMPUTED = ['words', 'minutes', 'pages', 'chapterCount'];

// Rebuild a single entry object so the four computed fields land right after `chapterMode`
// (before `blurb`), preserving the order of every other key. Any stale computed fields elsewhere
// are dropped so the layout stays canonical on re-runs.
function reorderEntry(entry, stats) {
  const out = {};
  for (const key of Object.keys(entry)) {
    if (COMPUTED.includes(key)) continue; // skip; re-inserted in canonical spot below
    out[key] = entry[key];
    if (key === 'chapterMode') {
      out.words = stats.words;
      out.minutes = stats.minutes;
      out.pages = stats.pages;
      out.chapterCount = stats.chapterCount;
    }
  }
  // Fallback: if there was no chapterMode key, append the computed fields at the end.
  if (!('chapterMode' in entry)) {
    out.words = stats.words;
    out.minutes = stats.minutes;
    out.pages = stats.pages;
    out.chapterCount = stats.chapterCount;
  }
  return out;
}

function main() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const rows = [];

  manifest.books = manifest.books.map(entry => {
    const mdPath = path.join(ROOT, 'books', entry.file);
    const md = fs.readFileSync(mdPath, 'utf8');
    const parsed = parseMarkdownBook(md, entry);
    const stats = {
      words: parsed.words,
      minutes: parsed.minutes,
      pages: parsed.pages,
      chapterCount: parsed.chapters.length,
    };
    rows.push({ id: entry.id, ...stats });
    return reorderEntry(entry, stats);
  });

  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  const pad = (s, n) => String(s).padEnd(n);
  const padL = (s, n) => String(s).padStart(n);
  console.log(pad('id', 24) + padL('words', 8) + padL('pages', 7) + padL('minutes', 9) + padL('chapters', 10));
  console.log('-'.repeat(58));
  for (const r of rows) {
    console.log(pad(r.id, 24) + padL(r.words, 8) + padL(r.pages, 7) + padL(r.minutes, 9) + padL(r.chapterCount, 10));
  }
}

main();
