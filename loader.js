// Runtime book loader.
// Reads books/manifest.json, fetches each markdown file, and turns it into the
// book object shape the app expects. Pure-JS so it can also run under node for tests.

// Cache-busting suffix for the runtime fetches (manifest, book texts, dictionaries).
// Taken from this script's own ?v= so it stays in sync with the version in index.html
// and a single bump refreshes book content too. No-op under node (no document).
var ASSET_V = "";
try {
  if (typeof document !== "undefined" && document.currentScript && document.currentScript.src) {
    var _vm = document.currentScript.src.match(/[?&]v=([^&]+)/);
    if (_vm) ASSET_V = _vm[1];
  }
} catch (e) {}
function vbust(path) {
  if (!ASSET_V) return path;
  return path + (path.indexOf("?") === -1 ? "?" : "&") + "v=" + ASSET_V;
}

// Image-paragraph marker: a Private Use Area char (U+E000) prefixed onto a resolved image URL.
// It's outside the word tokenizer's character class, so image URLs never leak into word lists,
// and a paragraph is an image iff its first char is U+E000.
const IMG_MARK = "";

// Pull every markdown image reference out of a line. Returns the resolved sentinel paragraphs
// (one per ![](...) tag) plus whatever non-image text is left on the line. `base` is the book's
// markdown directory ("books/<dir>"); a relative image path is joined onto it.
function extractImages(line, base) {
  const images = [];
  const text = line.replace(/!\[[^\]]*\]\(([^)]+)\)/g, (_, src) => {
    src = src.trim();
    const url = /^(https?:)?\//.test(src) || /^[a-z]+:/i.test(src) ? src : base + "/" + src;
    images.push(IMG_MARK + url);
    return " ";
  });
  return { images, text };
}

// Strip inline markdown markers, keep inner text, collapse whitespace, trim.
function stripInline(s) {
  let out = s;
  out = out.replace(/\*\*([^*]+)\*\*/g, "$1");
  out = out.replace(/\*([^*]+)\*/g, "$1");
  out = out.replace(/_([^_]+)_/g, "$1");
  out = out.replace(/`([^`]+)`/g, "$1");
  out = out.replace(/\s+/g, " ").trim();
  return out;
}

function isSeparatorLine(line) {
  return /^\s*([-*_!])\1{2,}\s*$/.test(line);
}

function isBlankLine(line) {
  return line.trim() === "";
}

// Turn a block of body lines (no headings) into an array of cleaned paragraphs.
// Paragraphs are separated by blank lines or by separator lines. When `base` is given, markdown
// image references are pulled out and emitted as their own sentinel paragraphs (any leftover
// caption text on the same line stays a normal paragraph).
function linesToParagraphs(lines, base) {
  const paragraphs = [];
  let current = [];
  const flush = () => {
    if (current.length) {
      const text = stripInline(current.join(" "));
      if (text) paragraphs.push(text);
      current = [];
    }
  };
  for (const line of lines) {
    if (isBlankLine(line) || isSeparatorLine(line)) {
      flush();
    } else if (base && line.indexOf("![") !== -1) {
      // The image(s) on this line break the current text paragraph: flush it, emit each image as
      // its own sentinel paragraph, then keep any leftover caption text in the running paragraph.
      const { images, text } = extractImages(line, base);
      flush();
      for (const img of images) paragraphs.push(img);
      if (text.trim()) current.push(text);
    } else {
      current.push(line);
    }
  }
  flush();
  return paragraphs;
}

function isImagePara(p) {
  return typeof p === "string" && p.charCodeAt(0) === 0xE000;
}

function countWords(text) {
  const m = text.match(/\S+/g);
  return m ? m.length : 0;
}

function chapterWordCount(chapter) {
  return chapter.text.reduce((sum, p) => (isImagePara(p) ? sum : sum + countWords(p)), 0);
}

function minutesFor(words) {
  return Math.max(1, Math.round(words / 100));
}

function pagesFor(words) {
  return Math.max(1, Math.round(words / 200));
}

// ----- h2: split on `## ` headings -----
function parseH2(lines, base) {
  const chapters = [];
  let started = false;
  let title = null;
  let body = [];
  const flush = () => {
    if (title === null) return;
    chapters.push({ title: stripInline(title), text: linesToParagraphs(body, base) });
    body = [];
  };
  for (const line of lines) {
    if (/^##\s+/.test(line) && !/^###\s+/.test(line)) {
      flush();
      title = line.replace(/^##\s+/, "");
      started = true;
    } else if (/^###\s+/.test(line)) {
      // subheading inside a chapter — keep its text as a normal paragraph
      if (started) body.push(line.replace(/^###\s+/, ""));
    } else if (/^#\s+/.test(line)) {
      // H1 / title line — drop
    } else if (started) {
      body.push(line);
    }
    // anything before the first `## ` is preamble — dropped
  }
  flush();
  return chapters;
}

// ----- h2h3: ## parts (label) + ### chapters -----
function parseH2H3(lines, base) {
  // Collect headings with their body line ranges. Everything before the first
  // `## ` heading is preamble (title, ### subtitle, byline) and is dropped.
  const blocks = []; // { level: 2|3, title, body: [], hasChildren }
  let cur = null;
  let lastPart = null;
  let seenPart = false;
  for (const line of lines) {
    if (/^##\s+/.test(line) && !/^###\s+/.test(line)) {
      seenPart = true;
      cur = { level: 2, title: line.replace(/^##\s+/, ""), body: [], hasChildren: false };
      lastPart = cur;
      blocks.push(cur);
    } else if (/^###\s+/.test(line)) {
      if (!seenPart) { cur = null; continue; } // preamble subheading — drop
      if (lastPart) lastPart.hasChildren = true;
      cur = { level: 3, title: line.replace(/^###\s+/, ""), body: [] };
      blocks.push(cur);
    } else if (/^#\s+/.test(line)) {
      cur = null; // H1 / title — drop
    } else if (cur) {
      cur.body.push(line);
    }
    // lines before the first `## ` heading are preamble — dropped
  }

  const chapters = [];
  let currentPart = "";
  let pendingIntro = []; // part body that appears before its first `### ` chapter
  for (const b of blocks) {
    const paragraphs = linesToParagraphs(b.body, base);
    const headingTitle = stripInline(b.title);
    if (b.level === 2) {
      if (b.hasChildren) {
        // A part: it labels the `### ` chapters that follow. Any body it carries before its first
        // `### ` (e.g. an intro image) is held over and prepended to that first chapter.
        currentPart = headingTitle;
        pendingIntro = paragraphs;
      } else {
        // A `## ` heading with no `### ` children is a standalone chapter (e.g. Vorwort, Anhang).
        currentPart = "";
        pendingIntro = [];
        chapters.push({ title: headingTitle, text: paragraphs });
      }
    } else {
      const title = currentPart ? currentPart + " · " + headingTitle : headingTitle;
      const text = pendingIntro.length ? [...pendingIntro, ...paragraphs] : paragraphs;
      pendingIntro = [];
      chapters.push({ title, text });
    }
  }
  return chapters;
}

// ----- scenes: no headings, split on `***`, group into targetChapters -----
function parseScenes(lines, targetChapters, base) {
  // Drop a leading H1 / preamble if present.
  let body = lines.slice();
  // Split on `***` separator lines into sections.
  const sections = [];
  let current = [];
  for (const line of body) {
    if (/^\s*\*{3,}\s*$/.test(line)) {
      sections.push(current);
      current = [];
    } else {
      current.push(line);
    }
  }
  sections.push(current);

  const sectionParas = sections
    .map(sec => linesToParagraphs(sec, base))
    .filter(paras => paras.length > 0);

  const total = sectionParas.length;
  const target = targetChapters || 9;
  const spc = Math.max(1, Math.ceil(total / target));
  const chapters = [];
  for (let i = 0; i * spc < total; i++) {
    const group = sectionParas.slice(i * spc, (i + 1) * spc);
    const paras = [];
    group.forEach(p => paras.push(...p));
    chapters.push({ title: "Teil " + (i + 1), text: paras });
  }
  return chapters;
}

function parseMarkdownBook(md, meta) {
  const lines = md.split(/\r?\n/);
  const mode = meta.chapterMode;

  // Image references in the markdown are resolved relative to the book's markdown directory.
  // meta.file is e.g. "archive/foo/foo.md", so the served base is "books/archive/foo".
  const slash = (meta.file || "").lastIndexOf("/");
  const base = slash === -1 ? "books" : "books/" + meta.file.slice(0, slash);

  let chapters;
  if (mode === "h2h3") {
    chapters = parseH2H3(lines, base);
  } else if (mode === "scenes") {
    chapters = parseScenes(lines, meta.targetChapters, base);
  } else {
    chapters = parseH2(lines, base);
  }

  let totalWords = 0;
  const builtChapters = chapters.map(c => {
    const w = chapterWordCount(c);
    totalWords += w;
    return { title: c.title, minutes: minutesFor(w), text: c.text };
  });

  return {
    id: meta.id,
    title: meta.title,
    subtitle: meta.subtitle,
    level: meta.level,
    theme: meta.theme,
    author: meta.author,
    year: meta.year,
    blurb: meta.blurb,
    file: meta.file,
    words: totalWords,
    minutes: minutesFor(totalWords),
    pages: pagesFor(totalWords),
    vocab: [],
    chapters: builtChapters,
  };
}

// Derive the dictionary path for a manifest entry: same folder as the .md file,
// named `<id>.dict.json`. "archive/djatlow.md" + "djatlow-pass" -> "archive/djatlow-pass.dict.json".
function dictPathFor(entry) {
  const slash = entry.file.lastIndexOf('/');
  const dir = slash === -1 ? '' : entry.file.slice(0, slash + 1);
  return dir + entry.id + '.dict.json';
}

// Fetch a book's dictionary JSON and merge it into window.GLOSSARY (keys lowercased).
// Best-effort: any failure is swallowed so it never blocks book loading.
async function loadGlossaryFor(entry) {
  if (typeof window === 'undefined') return;
  window.GLOSSARY = window.GLOSSARY || {};
  try {
    const res = await fetch(vbust('books/' + encodeURI(dictPathFor(entry))));
    if (!res.ok) {
      console.debug('[loader] no dictionary for', entry.id, res.status);
      return;
    }
    const dict = await res.json();
    for (const k of Object.keys(dict)) {
      window.GLOSSARY[k.toLowerCase()] = dict[k];
    }
  } catch (err) {
    console.debug('[loader] dictionary load skipped for', entry.id, err);
  }
}

async function loadBooksFromManifest() {
  const res = await fetch(vbust('books/manifest.json'));
  const manifest = await res.json();
  const books = [];
  for (const entry of manifest.books) {
    try {
      const mdRes = await fetch(vbust('books/' + encodeURI(entry.file)));
      const md = await mdRes.text();
      books.push(parseMarkdownBook(md, entry));
      await loadGlossaryFor(entry);
    } catch (err) {
      console.error('[loader] failed for', entry.id, err);
    }
  }
  return books;
}

// Lightweight catalog: manifest metadata + baked counts. NO md/dict fetch.
async function loadCatalog() {
  const res = await fetch(vbust('books/manifest.json'));
  const manifest = await res.json();
  return manifest.books.map(e => ({
    id: e.id, title: e.title, subtitle: e.subtitle, level: e.level,
    theme: e.theme, author: e.author, year: e.year, blurb: e.blurb,
    file: e.file, chapterMode: e.chapterMode, targetChapters: e.targetChapters,
    words: e.words || 0, minutes: e.minutes || 0, pages: e.pages || 0,
    chapterCount: e.chapterCount || 0,
    chapters: [],
  }));
}

// Fetch + parse ONE book's text. Returns the full parsed book object (with chapters).
async function loadBookContent(entry) {
  const mdRes = await fetch(vbust('books/' + encodeURI(entry.file)));
  const md = await mdRes.text();
  return parseMarkdownBook(md, entry);
}

if (typeof window !== 'undefined') { window.parseMarkdownBook = parseMarkdownBook; window.loadBooksFromManifest = loadBooksFromManifest; window.loadCatalog = loadCatalog; window.loadBookContent = loadBookContent; window.loadGlossaryFor = loadGlossaryFor; }
if (typeof module !== 'undefined' && module.exports) { module.exports = { parseMarkdownBook, loadBooksFromManifest, loadCatalog, loadBookContent, loadGlossaryFor }; }
