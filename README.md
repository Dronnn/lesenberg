# die Deutsche Bibliothek

A small reading library for learners of German. You pick a book at your level, read it, and
**tap any word** to get an English and Russian translation. You can highlight words, save them as
flashcards, and the app remembers where you stopped.

All texts are original, written in graded German for learners at **A1–B2**.

---

## What it does

- **Read at your level.** Books are tagged by CEFR level (A1–B2, plus transitional grades like
  A2→B1), and the library filter shows only the levels actually in the catalogue.
- **Tap-to-translate.** Tap any word in the reader to see its part of speech, base form, and an
  English + Russian gloss. German nouns show with their article and capitalised form (e.g.
  *das Brötchen*, *die Bäckerei*). Separable verbs are recognised even when split across the
  sentence — tap either part of *sieht … aus* and you get *aussehen*. Every book ships with its
  own dictionary, so this works offline.
- **Highlight & save.** Mark a word — or select a whole phrase — in four colours and save them
  (with your own notes and example sentences) as flashcards.
- **Test yourself.** After each chapter, a short vocabulary quiz built live from that chapter's own
  key words — see a German word, pick its meaning.
- **Track your reading.** Per-chapter progress, words learned, minutes read — all stored in your
  browser. Mark a chapter back to unread anytime to revisit it, and bookmark any paragraph to
  jump back to it later.
- **No account needed.** Everything lives locally in your browser; you can **export** all your data
  to a file and **import** it later or on another device.
- **Download.** Save any book as a Markdown file.
- **Trilingual interface** (German / English / Russian) and a light / dark / system theme.
- **Works on phone and desktop** — the layout adapts to the screen.

## The books

| Book | Level | Words | Pages | Reading time | About |
|------|-------|-------|-------|--------------|-------|
| **Das Handy** | A2→B1 | ~13,100 | 66 | 2 h 11 | In the small north-German town of Stade, three friends find a strange phone with a single contact — someone writing to them from the future. A warm, gentle story about friendship and courage. |
| **Djatlow-Pass** | B1 | ~7,800 | 39 | 1 h 18 | January 1959: ten young hikers set out into the northern Urals; nine never return. The true story of the Dyatlov Pass incident. |
| **Der Zodiac-Killer** | B1 | ~11,200 | 56 | 1 h 52 | California in the late 1960s: an unknown killer murders young couples and mails ciphered letters to the press. He was never caught. |
| **Im Schatten der Akten** | B1 | ~15,900 | 79 | 2 h 39 | A novel based on true events — after the war, the chemist Henry Reed is drawn into the CIA's secret MKUltra programme. |
| **Mörderland** | B2 | ~43,500 | 218 | 7 h 15 | Why did so many serial killers come from the American Northwest? A search for clues between Ted Bundy, the Zodiac killer, and an invisible cause — poison in the air, soil and water. |
| **Das Schicksal eines Russland-Deutschen** | C2 | ~208,300 | 1,041 | 34 h 43 | The true life story of a Russian-German — from his ancestors and childhood through hard years in the Soviet Union to a new life. Robert Maier's first-hand family memoir, illustrated with original photographs. |

<sub>Reading time assumes a learner pace of ~100 words/min; page counts assume ~200 words/page.</sub>

## Running it locally

There is **no build step** — the app is React transpiled in the browser by Babel-standalone, so it
must be served over HTTP (opening `index.html` directly via `file://` won't work).

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static file server works (`npx serve`, nginx, GitHub Pages, etc.).

## How it's built

- Plain React 18 (UMD) + Babel-standalone, loaded with `<script>` tags — no bundler, no `node_modules`.
- Hash-based routing; all reader state (progress, highlights, flashcards, theme, language) lives in
  `localStorage`.
- The book catalogue is **data-driven**: it's loaded at runtime from `books/manifest.json`, so the
  code doesn't need to change to add a book.

### Adding a book

1. Drop the book's markdown file into `books/archive/`.
2. Add an entry to `books/manifest.json`:

   ```json
   {
     "id": "my-book",
     "title": "...",
     "subtitle": "...",
     "level": "B1",
     "theme": "ink",
     "author": "Andreas Maier",
     "year": 2026,
     "file": "archive/my-book.md",
     "chapterMode": "h2",
     "blurb": { "de": "...", "en": "...", "ru": "..." }
   }
   ```

3. Reload. Word count, reading time and chapters are computed automatically.

`chapterMode` controls how the markdown is split into chapters: `h2` (split on `##` headings),
`h2h3` (`##` parts containing `###` chapters), or `scenes` (no headings — split on `***` breaks
and grouped into `targetChapters`).

### Dictionaries

Each book has a `books/archive/<id>.dict.json` file mapping every word to `{ pos, lemma, en, ru }`.
The reader merges these so a tap finds a translation. The build tools live in `tools/`:
`extract-words.js` lists a book's unique words, and `build-dict-from-parts.js` assembles the
dictionary files.

## Project layout

```
index.html              entry point (script order)
data.js                 base dictionary, UI strings, lookup, per-chapter quiz generator
loader.js               markdown → book parser + dictionary loader
app.jsx                 root, routing, state
components.jsx          shared components (header, covers, cards, popups, tappable text)
pages/                  one file per page (home, library, book, reader, cards, profile, …)
styles.css              design system + responsive layer
books/manifest.json     the catalogue
books/archive/          book texts (.md) + per-book dictionaries (.dict.json)
tools/                  dictionary build scripts
```

## Support

The library is free and ad-free. If it helps you, you can support new books from the in-app donate
page — via USDT (TRC20), Boosty, or Patreon.

## Author

Texts and project by **Andreas Maier** — [contact@lesenberg.com](mailto:contact@lesenberg.com).
