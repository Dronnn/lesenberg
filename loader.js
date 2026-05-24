// Runtime book loader.
// Reads books/manifest.json, fetches each markdown file, and turns it into the
// book object shape the app expects. Pure-JS so it can also run under node for tests.

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
// Paragraphs are separated by blank lines or by separator lines.
function linesToParagraphs(lines) {
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
    } else {
      current.push(line);
    }
  }
  flush();
  return paragraphs;
}

function countWords(text) {
  const m = text.match(/\S+/g);
  return m ? m.length : 0;
}

function chapterWordCount(chapter) {
  return chapter.text.reduce((sum, p) => sum + countWords(p), 0);
}

function minutesFor(words) {
  return Math.max(1, Math.round(words / 150));
}

function pagesFor(words) {
  return Math.max(1, Math.round(words / 250));
}

// ----- h2: split on `## ` headings -----
function parseH2(lines) {
  const chapters = [];
  let started = false;
  let title = null;
  let body = [];
  const flush = () => {
    if (title === null) return;
    chapters.push({ title: stripInline(title), text: linesToParagraphs(body) });
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
function parseH2H3(lines) {
  // Collect headings with their body line ranges. Everything before the first
  // `## ` heading is preamble (title, ### subtitle, byline) and is dropped.
  const blocks = []; // { level: 2|3, title, body: [] }
  let cur = null;
  let seenPart = false;
  for (const line of lines) {
    if (/^##\s+/.test(line) && !/^###\s+/.test(line)) {
      seenPart = true;
      cur = { level: 2, title: line.replace(/^##\s+/, ""), body: [] };
      blocks.push(cur);
    } else if (/^###\s+/.test(line)) {
      if (!seenPart) { cur = null; continue; } // preamble subheading — drop
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
  for (const b of blocks) {
    const paragraphs = linesToParagraphs(b.body);
    const headingTitle = stripInline(b.title);
    if (b.level === 2) {
      if (paragraphs.length === 0) {
        // part label
        currentPart = headingTitle;
      } else {
        currentPart = "";
        chapters.push({ title: headingTitle, text: paragraphs });
      }
    } else {
      const title = currentPart ? currentPart + " · " + headingTitle : headingTitle;
      chapters.push({ title, text: paragraphs });
    }
  }
  return chapters;
}

// ----- scenes: no headings, split on `***`, group into targetChapters -----
function parseScenes(lines, targetChapters) {
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
    .map(sec => linesToParagraphs(sec))
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

  let chapters;
  if (mode === "h2h3") {
    chapters = parseH2H3(lines);
  } else if (mode === "scenes") {
    chapters = parseScenes(lines, meta.targetChapters);
  } else {
    chapters = parseH2(lines);
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
    const res = await fetch('books/' + encodeURI(dictPathFor(entry)));
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
  const res = await fetch('books/manifest.json');
  const manifest = await res.json();
  const books = [];
  for (const entry of manifest.books) {
    try {
      const mdRes = await fetch('books/' + encodeURI(entry.file));
      const md = await mdRes.text();
      books.push(parseMarkdownBook(md, entry));
      await loadGlossaryFor(entry);
    } catch (err) {
      console.error('[loader] failed for', entry.id, err);
    }
  }
  return books;
}

if (typeof window !== 'undefined') { window.parseMarkdownBook = parseMarkdownBook; window.loadBooksFromManifest = loadBooksFromManifest; }
if (typeof module !== 'undefined' && module.exports) { module.exports = { parseMarkdownBook, loadBooksFromManifest }; }
