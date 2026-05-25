// Reader page — tap-word translations, progress, vocab sidebar, bookmarks, highlights
const Reader = ({ lang, book, chapterIndex, progress, highlights, cards, knownWords, bookmarks, onHighlightWord, onSavePhrase, onUpdateCard, onDeleteCard, onKnowWord, onToggleBookmark, onAdvance, onChapter }) => {
  const t = UI_STRINGS[lang];
  const [pop, setPop] = useState(null);
  const [phrasePop, setPhrasePop] = useState(null);
  const [editor, setEditor] = useState(null); // { key, initial, dictLookup }
  const [fontScale, setFontScale] = useState(1);
  const [drawer, setDrawer] = useState(null); // null | "chapters" | "saved"
  const stageRef = useRef(null);

  // Build phrases list for inline rendering — keyed by lowercase, with color from highlights.
  const phrases = useMemo(() => {
    const list = [];
    Object.entries(cards || {}).forEach(([key, c]) => {
      if (!c || !c.isPhrase) return;
      list.push({ text: c.phrase, color: highlights[key] || c.color, key });
    });
    return list;
  }, [cards, highlights]);

  const openEditorForKey = (key, override) => {
    const existing = (cards && cards[key]) || null;
    const isPhrase = key.startsWith("p:");
    const phrase = override?.phrase || existing?.phrase || (isPhrase ? key.slice(2) : key);
    const dictLookup = !isPhrase ? lookupWord(phrase) : null;
    setEditor({
      key,
      initial: {
        phrase,
        isPhrase,
        context: override?.context || existing?.context || "",
        customEn: existing?.customEn || "",
        customRu: existing?.customRu || "",
        note: existing?.note || "",
        examples: existing?.examples || [],
        color: highlights[key] || existing?.color || null,
      },
      dictLookup,
    });
  };

  const onPhraseInlineClick = (e, key) => {
    e.stopPropagation();
    openEditorForKey(key);
  };

  const knownSet = useMemo(() => new Set(knownWords), [knownWords]);

  if (!book) return <div className="page"><p>{t.bookNotFound}</p></div>;
  const chapter = book.chapters[chapterIndex];
  if (!chapter) return <div className="page"><p>{t.chapterNotFound}</p></div>;

  const bookBookmarks = bookmarks[book.id] || [];

  const onWordClick = (e, raw, sv) => {
    e.stopPropagation();
    // If user is actively dragging a selection, suppress single-word popup
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && sel.toString().trim().length > 0) return;
    const lookup = sv ? sv.data : lookupWord(raw);
    if (!lookup) return;
    const rect = e.target.getBoundingClientRect();
    const stage = stageRef.current.getBoundingClientRect();
    const x = rect.left - stage.left;
    const y = rect.bottom - stage.top + 8;
    document.querySelectorAll(".word.active").forEach(el => el.classList.remove("active"));
    e.target.classList.add("active");
    if (sv) {
      const own = Number(e.target.getAttribute("data-ti"));
      const partnerIdx = sv.indices[0] === own ? sv.indices[1] : sv.indices[0];
      // scope the partner lookup to THIS paragraph so data-ti (unique per paragraph) resolves right
      const scope = e.target.closest("p.para") || e.target.parentElement;
      const partner = scope && scope.querySelector('[data-ti="' + partnerIdx + '"]');
      if (partner) partner.classList.add("active");
    }
    setPop({ data: lookup, x, y, key: lookup.word });
  };

  const closePop = () => {
    document.querySelectorAll(".word.active").forEach(el => el.classList.remove("active"));
    setPop(null);
  };

  // ---- Multi-word selection handler ----
  const onTextMouseUp = () => {
    // wait a tick for selection to finalize
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
      const text = sel.toString().trim();
      if (!text) return;
      const words = text.match(/[A-Za-zÄÖÜäöüß]+/g) || [];
      if (words.length < 2) return; // single-word handled by click

      const range = sel.getRangeAt(0);
      // selection must be inside reader-body
      const stage = stageRef.current;
      if (!stage) return;
      let container = range.commonAncestorContainer;
      if (container.nodeType !== 1) container = container.parentElement;
      if (!stage.contains(container)) return;

      // find paragraph for context
      let paraEl = container.closest ? container.closest("p.para") : null;
      if (!paraEl) {
        let n = container;
        while (n && n !== stage) {
          if (n.classList && n.classList.contains("para")) { paraEl = n; break; }
          n = n.parentElement;
        }
      }
      let context = text;
      if (paraEl) {
        // strip the bookmark button glyph from text content
        const full = paraEl.textContent.replace(/^[▰▱]\s*/, "");
        const idx = full.indexOf(text);
        if (idx >= 0) {
          let s = idx;
          while (s > 0 && !/[.!?]/.test(full[s - 1])) s--;
          let e2 = idx + text.length;
          while (e2 < full.length && !/[.!?]/.test(full[e2])) e2++;
          if (e2 < full.length) e2++;
          context = full.slice(s, e2).trim();
        }
      }

      const rect = range.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      setPop(null);
      setPhrasePop({
        phrase: text,
        context,
        x: Math.max(20, rect.left - stageRect.left + rect.width / 2 - 140),
        y: rect.bottom - stageRect.top + 8,
      });
    }, 10);
  };

  const closePhrasePop = () => {
    setPhrasePop(null);
    const sel = window.getSelection();
    if (sel) sel.removeAllRanges();
  };

  const savePhraseQuick = (color) => {
    if (!phrasePop) return;
    const key = onSavePhrase(phrasePop.phrase, {
      context: phrasePop.context,
      bookId: book.id,
      patch: { color },
    });
    // Also reflect color via highlight
    if (color) {
      // already set via onSavePhrase's setHighlights, but ensure card color matches
      onUpdateCard(key, { color });
    }
    closePhrasePop();
  };

  const openPhraseEditor = () => {
    if (!phrasePop) return;
    const phraseText = phrasePop.phrase;
    const context = phrasePop.context;
    const key = onSavePhrase(phraseText, {
      context,
      bookId: book.id,
    });
    setPhrasePop(null);
    const sel = window.getSelection();
    if (sel) sel.removeAllRanges();
    openEditorForKey(key, { phrase: phraseText, context });
  };

  const isLast = chapterIndex === book.chapters.length - 1;
  const pct = ((chapterIndex + 1) / book.chapters.length) * 100;

  const isBookmarked = (pIdx) => bookBookmarks.some(b => b.chapter === chapterIndex && b.paragraph === pIdx);

  // Group highlights by color for sidebar
  const highlightedWords = Object.entries(highlights);

  return (
    <div className="reader-shell">
      {/* LEFT — chapters + bookmarks */}
      <aside className={"reader-side reader-pane reader-pane-left" + (drawer === "chapters" ? " open" : "")}>
        <a href={"#/book/" + book.id} className="btn btn-ghost btn-sm" style={{ marginLeft: -10, marginBottom: 16 }}>← {book.title}</a>
        <div className="eyebrow" style={{ marginBottom: 12 }}>{t.chapters}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 24 }}>
          {book.chapters.map((c, i) => {
            const done = progress && progress.chapter > i;
            const current = i === chapterIndex;
            return (
              <button key={i}
                onClick={() => { setDrawer(null); onChapter(i); }}
                style={{
                  textAlign: "left",
                  background: current ? "var(--bg-deep)" : "transparent",
                  border: 0,
                  padding: "10px 12px",
                  borderRadius: 4,
                  cursor: "pointer",
                  display: "grid",
                  gridTemplateColumns: "24px 1fr 14px",
                  gap: 10,
                  alignItems: "center",
                  fontFamily: "inherit",
                  color: "inherit",
                }}>
                <span className="mono mute" style={{ fontSize: 11 }}>{String(i+1).padStart(2,"0")}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: current ? 600 : 500, color: "var(--ink)" }}>{c.title}</div>
                  <div className="mono mute" style={{ fontSize: 10, letterSpacing: "0.05em", marginTop: 2 }}>{fmtReadingTime(c.minutes, t.minutes)}</div>
                </div>
                <span style={{ color: done ? "var(--a1)" : current ? "var(--brown)" : "transparent", fontSize: 12 }}>{done ? "✓" : current ? "●" : "○"}</span>
              </button>
            );
          })}
        </div>

        <div className="eyebrow" style={{ marginBottom: 10 }}>{t.bookmarks}</div>
        {bookBookmarks.length === 0 ? (
          <div className="mute" style={{ fontSize: 11, fontStyle: "italic", marginBottom: 24 }}>
            {t.bookmarksEmpty}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 24 }}>
            {bookBookmarks.map((b, i) => (
              <button key={i} onClick={() => { setDrawer(null); onChapter(b.chapter); }} style={{
                textAlign: "left",
                background: "transparent",
                border: 0,
                padding: "8px 10px",
                borderLeft: "2px solid var(--brown)",
                cursor: "pointer",
                marginBottom: 4,
                fontFamily: "inherit",
                color: "inherit",
              }}>
                <div className="mono mute" style={{ fontSize: 9, letterSpacing: "0.06em" }}>
                  {t.chapter} {b.chapter + 1} · {t.paragraph} {b.paragraph + 1}
                </div>
                <div style={{ fontSize: 12, fontFamily: "var(--font-serif)", color: "var(--ink-soft)", marginTop: 2, lineHeight: 1.3, fontStyle: "italic" }}>
                  „{b.snippet}…"
                </div>
              </button>
            ))}
          </div>
        )}

        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>{t.progress}</div>
          <div className="bar"><i style={{ width: pct + "%" }}></i></div>
          <div className="mono mute" style={{ fontSize: 11, marginTop: 6, letterSpacing: "0.04em" }}>
            {chapterIndex + 1} / {book.chapters.length} {t.chapters}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>{t.display}</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => setFontScale(s => Math.max(0.8, s - 0.1))} className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: "center", border: "1px solid var(--line)" }}>A−</button>
            <button onClick={() => setFontScale(1)} className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: "center", border: "1px solid var(--line)" }}>A</button>
            <button onClick={() => setFontScale(s => Math.min(1.5, s + 0.1))} className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: "center", border: "1px solid var(--line)" }}>A+</button>
          </div>
        </div>
      </aside>

      {/* CENTER — text */}
      <main className="reader-stage" ref={stageRef} onClick={() => pop && closePop()} onMouseUp={onTextMouseUp}>
        <div className="reader-mobilebar">
          <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); setDrawer("chapters"); }}>☰ {t.chapters}</button>
          <button className="btn btn-ghost btn-sm" onClick={(e) => { e.stopPropagation(); setDrawer("saved"); }}>{t.wordsShort}</button>
        </div>
        <div className="reader-body" style={{ fontSize: 20 * fontScale + "px", lineHeight: 1.7 }}>
          <div className="reader-meta">
            {t.chapter} {String(chapterIndex + 1).padStart(2, "0")} · {t.of} {book.chapters.length}
          </div>
          <h1>{chapter.title}</h1>
          {chapter.text.map((p, i) => (
            <p key={i} className={"para" + (isBookmarked(i) ? " bookmarked" : "")}>
              <button
                className="bm-btn"
                onClick={(e) => { e.stopPropagation(); onToggleBookmark(book.id, chapterIndex, i, p.slice(0, 80)); }}
                title={isBookmarked(i) ? t.removeBookmark : t.addBookmark}>
                {isBookmarked(i) ? "▰" : "▱"}
              </button>
              <TappableText text={p} onWord={onWordClick} onPhrase={onPhraseInlineClick} highlights={highlights} knownWords={knownSet} phrases={phrases} />
            </p>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 56, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
            <button className="btn btn-ghost"
              onClick={() => onChapter(Math.max(0, chapterIndex - 1))}
              disabled={chapterIndex === 0}
              style={{ visibility: chapterIndex === 0 ? "hidden" : "visible" }}>
              {t.readerPrev}
            </button>
            <div className="row" style={{ gap: 10 }}>
              <a href={"#/quiz/" + book.id + "/" + chapterIndex} className="btn btn-outline">{t.testChapterWords}</a>
              {!isLast && (
                <button className="btn btn-primary" onClick={() => onAdvance()}>
                  {t.readerNext}
                </button>
              )}
            </div>
          </div>
        </div>

        {pop && (
          <WordPop
            data={pop.data}
            position={{ x: pop.x, y: pop.y }}
            onClose={closePop}
            currentColor={highlights[pop.key]}
            isKnown={knownSet.has(pop.key)}
            onHighlight={(color) => { onHighlightWord(pop.key, color); }}
            onKnown={() => { onKnowWord(pop.key); closePop(); }}
            onEdit={() => { closePop(); openEditorForKey(pop.key); }}
            lang={lang}
          />
        )}

        {phrasePop && (
          <PhrasePop
            phrase={phrasePop.phrase}
            context={phrasePop.context}
            position={{ x: phrasePop.x, y: phrasePop.y }}
            onClose={closePhrasePop}
            onSave={savePhraseQuick}
            onOpenEditor={openPhraseEditor}
            lang={lang}
          />
        )}
      </main>

      {/* RIGHT — saved entries (words + phrases) */}
      <aside className={"reader-side right reader-pane reader-pane-right" + (drawer === "saved" ? " open" : "")}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>{t.highlightsHeading}</div>
        <div className="mono mute" style={{ fontSize: 11, marginBottom: 18, letterSpacing: "0.04em" }}>
          {highlightedWords.length} {t.savedCount} · {knownWords.length} {t.known}
        </div>

        {highlightedWords.length === 0 ? (
          <div style={{ padding: 18, border: "1px dashed var(--line)", borderRadius: 4, fontSize: 12, color: "var(--ink-mute)", lineHeight: 1.5 }}>
            <strong style={{ display: "block", color: "var(--ink-soft)", marginBottom: 6, fontWeight: 600 }}>{t.howToSave}</strong>
            <span style={{ display: "block", marginBottom: 4 }}>· {t.howToSaveTap}</span>
            <span style={{ display: "block", marginBottom: 4 }}>· {t.howToSavePhrase}</span>
            <span>· {t.howToSaveEdit}</span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {highlightedWords.slice().reverse().slice(0, 30).map(([k, color]) => {
              const cardData = cards && cards[k];
              const isPhrase = k.startsWith("p:");
              const phrase = isPhrase ? (cardData?.phrase || k.slice(2)) : k;
              const data = !isPhrase ? lookupWord(phrase) : null;
              const en = cardData?.customEn || data?.en || "";
              const ru = cardData?.customRu || data?.ru || "";
              const hasNote = cardData && (cardData.note || (cardData.examples && cardData.examples.length > 0));
              return (
                <div key={k} className={"sv-row" + (isPhrase ? " is-phrase" : "")}>
                  <span className={"sv-dot hl-bg-" + color}></span>
                  <div className="sv-body">
                    <div className="sv-title">
                      {isPhrase && <span className="sv-kind">PHRASE</span>}
                      <span className="sv-text">{phrase}</span>
                      {data?.lemma && data.lemma !== phrase && (
                        <span className="mute" style={{ fontSize: 11, fontStyle: "italic", marginLeft: 6 }}>→ {data.lemma}</span>
                      )}
                    </div>
                    {(en || ru) && (
                      <div className="sv-tr">
                        {en && <span>{en}</span>}
                        {en && ru && <span className="mute"> · </span>}
                        {ru && <span className="mute">{ru}</span>}
                      </div>
                    )}
                    {cardData?.context && (
                      <div className="sv-ctx">„{cardData.context.length > 70 ? cardData.context.slice(0, 70) + "…" : cardData.context}"</div>
                    )}
                  </div>
                  <button className="sv-edit" onClick={() => openEditorForKey(k)} title={hasNote ? t.editNote : t.addNote}>
                    {hasNote ? "✎" : "+"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <a href={"#/flashcards/" + book.id} className="btn btn-outline btn-sm" style={{ width: "100%", justifyContent: "center" }}>
            {t.flashcards} →
          </a>
        </div>
      </aside>

      {editor && (
        <CardEditor
          entryKey={editor.key}
          initial={editor.initial}
          dictLookup={editor.dictLookup}
          lang={lang}
          onSave={(key, patch) => onUpdateCard(key, patch)}
          onDelete={(key) => onDeleteCard(key)}
          onClose={() => setEditor(null)}
        />
      )}

      {drawer !== null && <div className="reader-backdrop" onClick={() => setDrawer(null)} />}
    </div>
  );
};

// ---------- FLASHCARDS ----------
const FlashSourceTabs = ({ options, value, onChange }) => (
  <div className="flash-tabs" role="tablist">
    {options.map(o => (
      <button
        key={o.id}
        role="tab"
        aria-selected={value === o.id}
        className={`flash-tab ${value === o.id ? "active" : ""}`}
        onClick={() => onChange(o.id)}
        disabled={o.count === 0 && value !== o.id}
      >
        <span className="flash-tab-label">{o.label}</span>
        <span className="flash-tab-count">{o.count}</span>
      </button>
    ))}
  </div>
);

const Flashcards = ({ lang, book, allBooks = [], highlights, cards = {}, knownWords = [], hardWords = [], onKnowWord, onUnknowWord, onToggleHardWord, onUpdateCard, onDeleteCard }) => {
  const t = UI_STRINGS[lang];
  const [editor, setEditor] = useState(null);

  // Source filter — defaults to the book if you came in from a book page, otherwise "all".
  const [source, setSource] = useState(() => (book ? "book:" + book.id : "all"));
  useEffect(() => { if (book) setSource("book:" + book.id); }, [book && book.id]);

  // Build a lookup of which book each saved word came from (best-effort) so we can filter by source.
  const wordBook = useMemo(() => {
    const m = {};
    allBooks.forEach(b => {
      try {
        buildVocab(b).forEach(c => { if (!m[c.word]) m[c.word] = b.id; });
      } catch (e) {}
    });
    return m;
  }, [allBooks]);

  // The complete pool of cards (current book's auto-vocab + every saved/known/hard entry, incl. phrases), deduped.
  const fullDeck = useMemo(() => {
    const base = book ? buildVocab(book) : [];
    const lookup = (w) => DICT[w] || DICT[w.toLowerCase()] || { pos: "—", en: "—", ru: "—" };
    const allTouched = new Set([
      ...Object.keys(highlights),
      ...Object.keys(cards || {}),
      ...knownWords,
      ...hardWords,
    ]);
    const saved = Array.from(allTouched).map(key => {
      const c = cards && cards[key];
      const isPhrase = key.startsWith("p:") || !!c?.isPhrase;
      const phrase = isPhrase ? (c?.phrase || key.replace(/^p:/, "")) : key;
      const dict = isPhrase ? { pos: "Phrase", en: "—", ru: "—" } : lookup(phrase);
      return {
        key,
        word: phrase,
        bookId: c?.bookId || wordBook[phrase] || null,
        isPhrase,
        pos: dict.pos,
        lemma: dict.lemma,
        autoEn: dict.en,
        autoRu: dict.ru,
        en: c?.customEn || dict.en,
        ru: c?.customRu || dict.ru,
        context: c?.context || "",
        note: c?.note || "",
        examples: c?.examples || [],
        customEn: c?.customEn || "",
        customRu: c?.customRu || "",
      };
    });
    const seen = new Set();
    return [
      ...base.map(c => ({ ...c, key: c.word, bookId: book.id, isPhrase: false, autoEn: c.en, autoRu: c.ru, examples: [] })),
      ...saved,
    ].filter(c => {
      if (seen.has(c.key)) return false;
      seen.add(c.key);
      return true;
    });
  }, [book, highlights, cards, knownWords, hardWords, wordBook]);

  const knownSet = useMemo(() => new Set(knownWords), [knownWords]);
  const hardSet = useMemo(() => new Set(hardWords), [hardWords]);

  // Apply the active source filter. The "learned" deck inverts the filter: it shows ONLY known words.
  const deck = useMemo(() => {
    if (source === "learned") {
      return fullDeck.filter(c => knownSet.has(c.key));
    }
    const filterFn = (c) => {
      if (source === "all") return true;
      if (source === "hard") return hardSet.has(c.key);
      if (source === "saved") return !!highlights[c.key];
      if (source.startsWith("book:")) return c.bookId === source.slice(5);
      return true;
    };
    return fullDeck.filter(filterFn).filter(c => !knownSet.has(c.key));
  }, [fullDeck, knownSet, hardSet, highlights, source]);

  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [exit, setExit] = useState(null);
  const [enter, setEnter] = useState(null);
  const totalDone = knownWords.filter(w => fullDeck.some(c => c.key === w)).length;

  // Reset position when the source filter changes
  useEffect(() => { setI(0); setFlipped(false); }, [source]);
  useEffect(() => {
    if (i >= deck.length && deck.length > 0) setI(deck.length - 1);
  }, [deck.length, i]);

  // Source options — show book filters only when there are saved/auto cards from that book
  const sourceOptions = useMemo(() => {
    const learnedCount = fullDeck.filter(c => knownSet.has(c.key)).length;
    const opts = [
      { id: "all", label: t.allCards, count: fullDeck.filter(c => !knownSet.has(c.key)).length },
      { id: "saved", label: t.saved, count: fullDeck.filter(c => highlights[c.key] && !knownSet.has(c.key)).length },
      { id: "hard", label: t.hard, count: fullDeck.filter(c => hardSet.has(c.key) && !knownSet.has(c.key)).length },
      { id: "learned", label: t.learned, count: learnedCount },
    ];
    allBooks.forEach(b => {
      const n = fullDeck.filter(c => c.bookId === b.id && !knownSet.has(c.key)).length;
      if (n > 0) opts.push({ id: "book:" + b.id, label: b.title, count: n });
    });
    return opts;
  }, [fullDeck, knownSet, hardSet, highlights, allBooks]);

  // Empty / no-source states
  if (deck.length === 0) {
    const allDone = fullDeck.length > 0 && totalDone === fullDeck.length && source === "all";
    return (
      <div className="page-narrow" style={{ paddingTop: 56 }}>
        {book && <a href={"#/book/" + book.id} className="btn btn-ghost btn-sm" style={{ marginBottom: 18 }}>← {book.title}</a>}
        <div className="eyebrow" style={{ marginBottom: 14, textAlign: "center" }}>
          {book ? `${book.title} · ${t.vocabulary}` : t.flashcards}
        </div>
        <FlashSourceTabs options={sourceOptions} value={source} onChange={setSource} />
        <div style={{ textAlign: "center", paddingTop: 40 }}>
          <h2 className="h-section">
            {allDone ? t.allCardsLearned :
             source === "hard" ? t.noHardWords :
             source === "learned" ? t.nothingLearned :
             t.nothingToLearn}
          </h2>
          <p className="soft" style={{ marginTop: 8 }}>
            {allDone
              ? `${t.allMasteredA} ${fullDeck.length} ${t.allMasteredB}`
              : source === "learned"
                ? t.markLearnedHint
                : t.tapToSaveHint}
          </p>
          <div className="row" style={{ justifyContent: "center", gap: 10, marginTop: 18 }}>
            {allDone && (
              <button
                className="btn btn-outline"
                onClick={() => setSource("learned")}
              >{t.viewLearned}</button>
            )}
            {allDone && (
              <button
                className="btn btn-ghost"
                onClick={() => fullDeck.forEach(c => onUnknowWord && onUnknowWord(c.key))}
              >{t.resetAll}</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const card = deck[Math.min(i, deck.length - 1)];
  const isHard = hardWords.includes(card.key);
  const remaining = deck.length;

  const goNext = () => {
    if (exit) return;
    setExit("right");
    setTimeout(() => {
      setFlipped(false);
      setI(p => (p + 1) % Math.max(deck.length, 1));
      setEnter("right");
      setExit(null);
      requestAnimationFrame(() => requestAnimationFrame(() => setEnter(null)));
    }, 280);
  };

  const goPrev = () => {
    if (exit) return;
    setExit("prev");
    setTimeout(() => {
      setFlipped(false);
      setI(p => (p - 1 + deck.length) % Math.max(deck.length, 1));
      setEnter("left");
      setExit(null);
      requestAnimationFrame(() => requestAnimationFrame(() => setEnter(null)));
    }, 280);
  };

  const markKnown = () => {
    if (exit) return;
    setExit("up");
    setTimeout(() => {
      onKnowWord && onKnowWord(card.key);
      setFlipped(false);
      // index stays — list shrinks under it; useEffect clamps if needed
      setEnter("right");
      setExit(null);
      requestAnimationFrame(() => requestAnimationFrame(() => setEnter(null)));
    }, 320);
  };

  const sendBackToDeck = () => {
    if (exit) return;
    setExit("up");
    setTimeout(() => {
      onUnknowWord && onUnknowWord(card.key);
      setFlipped(false);
      setEnter("left");
      setExit(null);
      requestAnimationFrame(() => requestAnimationFrame(() => setEnter(null)));
    }, 320);
  };

  const markHard = () => {
    if (exit) return;
    onToggleHardWord && onToggleHardWord(card.key);
    if (!isHard) {
      // animate to next card so user feels progression
      goNext();
    }
  };

  const exitClass = exit ? `flash-exit-${exit}` : "";
  const enterClass = enter ? `flash-enter-${enter}` : "";

  return (
    <div className="page-narrow" style={{ paddingTop: 56 }}>
      {book && <a href={"#/book/" + book.id} className="btn btn-ghost btn-sm" style={{ marginBottom: 18 }}>← {book.title}</a>}
      <div className="eyebrow" style={{ marginBottom: 14, textAlign: "center" }}>
        {book ? `${book.title} · ${t.vocabulary}` : t.flashcards}
      </div>

      <FlashSourceTabs options={sourceOptions} value={source} onChange={setSource} />

      <div className="mono mute" style={{ fontSize: 11, marginBottom: 18, letterSpacing: "0.08em", textAlign: "center" }}>
        {i + 1} / {remaining} · {totalDone}/{fullDeck.length} {t.learned}
      </div>

      <div className="flash-stage">
        <div
          key={card.key + ":" + i}
          className={`flash-card-wrap ${exitClass} ${enterClass}`}
        >
          <div
            className={`flash ${flipped ? "flipped" : ""} ${isHard ? "is-hard" : ""} ${source === "learned" ? "is-learned" : ""} ${card.isPhrase ? "is-phrase" : ""}`}
            onClick={() => setFlipped(f => !f)}
            role="button"
            aria-pressed={flipped}
          >
            <button
              className="flash-edit"
              onClick={(e) => { e.stopPropagation(); setEditor({
                key: card.key,
                initial: {
                  phrase: card.word,
                  isPhrase: card.isPhrase,
                  context: card.context,
                  customEn: card.customEn,
                  customRu: card.customRu,
                  note: card.note,
                  examples: card.examples,
                  color: highlights[card.key] || null,
                },
                dictLookup: card.isPhrase ? null : { pos: card.pos, en: card.autoEn, ru: card.autoRu, lemma: card.lemma },
              }); }}
              title={t.edit}
            >✎</button>

            <div className="flash-face flash-front">
              {card.isPhrase && <span className="flash-tag flash-tag-phrase">{t.phraseTag}</span>}
              {source === "learned" && <span className="flash-tag flash-tag-learned">{t.learnedTag}</span>}
              {isHard && source !== "learned" && <span className="flash-tag">{t.hardTag}</span>}
              <div className={"de" + (card.isPhrase ? " is-phrase" : "")}>{card.word}</div>
              <div className="pos">{card.pos}</div>
              {card.context && card.isPhrase && (
                <div className="flash-ctx">„{card.context.length > 90 ? card.context.slice(0, 90) + "…" : card.context}"</div>
              )}
              <div className="mono mute flash-hint">{t.clickToFlip}</div>
            </div>
            <div className="flash-face flash-back">
              {card.isPhrase && <span className="flash-tag flash-tag-phrase">{t.phraseTag}</span>}
              {source === "learned" && <span className="flash-tag flash-tag-learned">{t.learnedTag}</span>}
              {isHard && source !== "learned" && <span className="flash-tag">{t.hardTag}</span>}
              <div className={"de" + (card.isPhrase ? " is-phrase" : "")} style={card.isPhrase ? null : { fontSize: 26 }}>{card.word}</div>
              <div className="pos">{card.pos}{card.lemma && card.lemma !== card.word ? " · " + card.lemma : ""}</div>
              {card.en && card.en !== "—" && (
                <div className="tr">
                  <span className="mono mute" style={{ fontSize: 10, marginRight: 6 }}>EN</span>
                  {card.en}
                  {card.customEn && card.autoEn && card.autoEn !== "—" && card.customEn !== card.autoEn && (
                    <span className="mute" style={{ fontSize: 12, marginLeft: 8, fontStyle: "italic" }}>· {card.autoEn}</span>
                  )}
                </div>
              )}
              {card.ru && card.ru !== "—" && (
                <div className="tr">
                  <span className="mono mute" style={{ fontSize: 10, marginRight: 6 }}>RU</span>
                  {card.ru}
                  {card.customRu && card.autoRu && card.autoRu !== "—" && card.customRu !== card.autoRu && (
                    <span className="mute" style={{ fontSize: 12, marginLeft: 8, fontStyle: "italic" }}>· {card.autoRu}</span>
                  )}
                </div>
              )}
              {(card.en === "—" || !card.en) && (card.ru === "—" || !card.ru) && (
                <div className="flash-empty-tr">
                  {t.noTranslationYet} <button className="flash-link" onClick={(e) => { e.stopPropagation(); setEditor({
                    key: card.key,
                    initial: { phrase: card.word, isPhrase: card.isPhrase, context: card.context, customEn: card.customEn, customRu: card.customRu, note: card.note, examples: card.examples, color: highlights[card.key] || null },
                    dictLookup: null,
                  }); }}>{t.addAction} ✎</button>
                </div>
              )}
              {card.context && (
                <div className="flash-back-ctx">
                  <span className="mono mute">{t.flashContextLabel}</span>
                  <div>„{card.context}"</div>
                </div>
              )}
              {card.examples && card.examples.length > 0 && (
                <div className="flash-back-ex">
                  <span className="mono mute">{t.flashExamplesLabel}</span>
                  {card.examples.map((ex, k) => (
                    <div key={k}>· {ex}</div>
                  ))}
                </div>
              )}
              {card.note && (
                <div className="flash-back-note">
                  <span className="mono mute">{t.flashNoteLabel}</span>
                  <div>{card.note}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flash-actions">
        {source === "learned" ? (
          <>
            <button
              className="btn btn-ghost flash-mark"
              onClick={goNext}
              title={t.skipTooltip}
            >{t.skip}</button>
            <button
              className="btn btn-primary flash-mark"
              onClick={sendBackToDeck}
              title={t.backToDeckTooltip}
            >{t.backToDeck}</button>
          </>
        ) : (
          <>
            <button
              className={`btn btn-outline flash-mark ${isHard ? "active" : ""}`}
              onClick={markHard}
              title={t.markHardTooltip}
            >
              {isHard ? t.hardActive : t.hardTag}
            </button>
            <button
              className="btn btn-primary flash-mark flash-known"
              onClick={markKnown}
              title={t.iKnowThisTooltip}
            >
              {t.iKnowThis}
            </button>
          </>
        )}
      </div>

      <div className="row" style={{ justifyContent: "center", marginTop: 18, gap: 10 }}>
        <button className="btn btn-ghost" onClick={goPrev}>← {t.prev}</button>
        <button className="btn btn-ghost" onClick={goNext}>{t.next} →</button>
      </div>

      {editor && (
        <CardEditor
          entryKey={editor.key}
          initial={editor.initial}
          dictLookup={editor.dictLookup}
          lang={lang}
          onSave={(key, patch) => onUpdateCard && onUpdateCard(key, patch)}
          onDelete={(key) => onDeleteCard && onDeleteCard(key)}
          onClose={() => setEditor(null)}
        />
      )}
    </div>
  );
};

// ---------- QUIZ ----------
// Per-chapter multiple-choice vocabulary quiz. Shows a German word; the reader picks its meaning
// (in the interface language) from four options. Questions are generated once and frozen in state.
const QUIZ_MIN_QUESTIONS = 3;

const Quiz = ({ lang, book, chapterIndex = 0, onFinish }) => {
  const t = UI_STRINGS[lang];
  const [questions] = useState(() => book ? makeChapterQuiz(book, chapterIndex, lang) : []);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (!book) return <div className="page"><p>{t.bookNotFound}</p></div>;

  const chapter = book.chapters[chapterIndex];
  const hasNext = chapterIndex + 1 < book.chapters.length;

  // Not enough eligible vocabulary in this chapter for a quiz.
  if (questions.length < QUIZ_MIN_QUESTIONS) {
    return (
      <div className="page-narrow" style={{ paddingTop: 56 }}>
        <a href={"#/book/" + book.id} className="btn btn-ghost btn-sm" style={{ marginBottom: 24 }}>← {book.title}</a>
        <div className="eyebrow" style={{ marginBottom: 12 }}>{book.title} · {t.vocabQuizTitle}</div>
        <div className="quiz-card" style={{ textAlign: "center" }}>
          <p className="soft" style={{ fontSize: 16, margin: "8px 0 24px" }}>{t.quizNotEnough}</p>
          <div className="row" style={{ justifyContent: "center", gap: 10 }}>
            <a href={"#/read/" + book.id + "/" + chapterIndex} className="btn btn-outline">← {chapter ? chapter.title : book.title}</a>
            {hasNext && (
              <a href={"#/read/" + book.id + "/" + (chapterIndex + 1)} className="btn btn-primary">{t.quizNextChapter} →</a>
            )}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[i];

  const pick = (opt) => {
    if (picked) return;
    setPicked(opt);
    const correct = opt === q.answer ? score + 1 : score;
    if (opt === q.answer) setScore(correct);
    setTimeout(() => {
      if (i + 1 < questions.length) {
        setI(i + 1);
        setPicked(null);
      } else {
        setDone(true);
        onFinish && onFinish(correct, questions.length);
      }
    }, 1000);
  };

  const retry = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const feedback = score === questions.length ? t.quizPerfect : score >= questions.length / 2 ? t.quizGood : t.quizTryAgain;
    return (
      <div className="page-narrow" style={{ textAlign: "center", paddingTop: 80 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>{book.title} · {t.vocabQuizTitle}</div>
        <h1 className="h-display" style={{ fontSize: 64 }}>{score} / {questions.length}</h1>
        <p className="soft" style={{ fontSize: 17, marginTop: 12 }}>{feedback}</p>
        <div className="row" style={{ justifyContent: "center", gap: 10, marginTop: 28 }}>
          <button className="btn btn-ghost" onClick={retry}>{t.quizRetry}</button>
          {hasNext ? (
            <a href={"#/read/" + book.id + "/" + (chapterIndex + 1)} className="btn btn-primary">{t.quizNextChapter} →</a>
          ) : (
            <a href={"#/book/" + book.id} className="btn btn-primary">{book.title} →</a>
          )}
        </div>
        <div style={{ marginTop: 14 }}>
          <a href={"#/book/" + book.id} className="btn btn-ghost btn-sm">← {book.title}</a>
        </div>
      </div>
    );
  }

  return (
    <div className="page-narrow" style={{ paddingTop: 56 }}>
      <a href={"#/book/" + book.id} className="btn btn-ghost btn-sm" style={{ marginBottom: 24 }}>← {book.title}</a>
      <div className="eyebrow" style={{ marginBottom: 12 }}>
        {book.title} · {t.vocabQuizTitle} · {t.chapter} {chapterIndex + 1}
      </div>
      <div className="bar" style={{ maxWidth: 560, margin: "0 auto 32px" }}>
        <i style={{ width: ((i + 1) / questions.length * 100) + "%" }}></i>
      </div>
      <div className="quiz-card">
        <div className="mono mute" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>{i + 1} / {questions.length}</div>
        <h2 className="quiz-prompt">{q.prompt}</h2>
        <p className="soft" style={{ marginTop: -8, marginBottom: 18, fontSize: 14 }}>{t.quizPrompt}</p>
        {q.options.map(opt => {
          let cls = "quiz-option";
          if (picked) {
            if (opt === q.answer) cls += " correct";
            else if (opt === picked) cls += " wrong";
          }
          return (
            <button key={opt} className={cls} onClick={() => pick(opt)} disabled={!!picked}>{opt}</button>
          );
        })}
      </div>
    </div>
  );
};

Object.assign(window, { Reader, Flashcards, Quiz });
