// die Deutsche Bibliothek — root app
const { useState, useEffect, useMemo, useCallback } = React;

const parseRoute = (hash) => {
  const h = hash.replace(/^#/, "") || "/";
  const clean = h.split("?")[0];
  const parts = clean.split("/").filter(Boolean);
  if (parts.length === 0) return { name: "home" };
  if (parts[0] === "library") return { name: "library" };
  if (parts[0] === "progress") return { name: "progress" };
  if (parts[0] === "about") return { name: "about" };
  if (parts[0] === "help") return { name: "help" };
  if (parts[0] === "donate") return { name: "donate" };
  if (parts[0] === "profile") return { name: "profile" };
  if (parts[0] === "signin") return { name: "signin" };
  if (parts[0] === "book" && parts[1]) return { name: "book", id: parts[1] };
  if (parts[0] === "read" && parts[1]) return { name: "read", id: parts[1], chapter: parseInt(parts[2] || "0", 10) };
  if (parts[0] === "quiz" && parts[1]) return { name: "quiz", id: parts[1], chapter: parseInt(parts[2] || "0", 10) };
  if (parts[0] === "flashcards") return { name: "flashcards", id: parts[1] || null };
  return { name: "home" };
};

const App = () => {
  const hash = useHash();
  const route = parseRoute(hash);

  // Email patterns that grant admin/owner access. For the design mock this is hard-coded;
  // in production the server would gate this.
  const ADMIN_EMAIL_RE = /^(andrew|admin|maier|owner)/i;
  const isAdmin = (u) => !!u && (u.role === "admin" || ADMIN_EMAIL_RE.test((u.email || "").split("@")[0] || ""));

  const [lang, setLang] = useStore("lang", "de");
  const [theme, setTheme] = useStore("theme", "system");

  useEffect(() => {
    const root = document.documentElement;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const resolved = theme === "system" ? (mql.matches ? "dark" : "light") : theme;
      root.setAttribute("data-theme", resolved);
    };
    apply();
    if (theme === "system") {
      mql.addEventListener("change", apply);
      return () => mql.removeEventListener("change", apply);
    }
  }, [theme]);
  const [user, setUser] = useStore("user", null);
  const [userBooks, setUserBooks] = useStore("userBooks", []);
  const [progressMap, setProgressMap] = useStore("progress", {});
  const [highlights, setHighlights] = useStore("highlights", {}); // { key: color }  — key = word OR "p:<phrase>"
  const [cards, setCards] = useStore("cards", {}); // { key: { phrase, isPhrase, context, customEn, customRu, note, examples, bookId, ts } }
  const [knownWords, setKnownWords] = useStore("knownWords", []);
  const [hardWords, setHardWords] = useStore("hardWords", []);
  const [bookmarks, setBookmarks] = useStore("bookmarks", {}); // { bookId: [{chapter, paragraph, snippet, ts}] }
  const [quizzes, setQuizzes] = useStore("quizzes", {}); // { bookId: { chapterIndex: { score, total, date } } }
  const [streak, setStreak] = useStore("streak", 0);
  const [lastActive, setLastActive] = useStore("lastActive", "");
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("in");
  const [catalog, setCatalog] = useState([]);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [content, setContent] = useState({});      // { id: chapters[] }
  const [glossReady, setGlossReady] = useState({}); // { id: true }
  const [contentLoading, setContentLoading] = useState(false);

  // Load the lightweight catalog from books/manifest.json on mount. Book text + dictionaries are
  // fetched on demand (see the route-driven effect below), not here.
  useEffect(() => {
    let alive = true;
    window.loadCatalog()
      .then(bs => { if (alive) setCatalog(bs); })
      .catch(e => console.error('[app] catalog load failed', e))
      .finally(() => { if (alive) setCatalogLoading(false); });
    return () => { alive = false; };
  }, []);

  // Consecutive-day streak: count days the app is opened. Runs once per load.
  useEffect(() => {
    const ymd = d => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    const now = new Date();
    const today = ymd(now);
    if (lastActive === today) return;
    const yesterday = ymd(new Date(now.getTime() - 24 * 60 * 60 * 1000));
    setStreak(lastActive === yesterday ? streak + 1 : 1);
    setLastActive(today);
  }, []);

  // Auto-open auth if route asks for it
  useEffect(() => {
    if (route.name === "signin") {
      if (!AUTH_ENABLED) { window.location.hash = "#/"; return; }
      setAuthMode("in");
      setShowAuth(true);
      window.location.hash = "#/";
    }
  }, [route.name]);

  const allBooks = useMemo(() => {
    const merged = catalog.map(b => content[b.id] ? { ...b, chapters: content[b.id] } : b);
    return [...BOOKS, ...merged, ...userBooks];
  }, [catalog, content, userBooks]);
  const getBook = (id) => allBooks.find(b => b.id === id);
  const savedWords = useMemo(() => Object.keys(highlights), [highlights]);

  // Route-driven, on-demand loader: pull a book's chapters and/or glossary only when a content
  // route for it is opened. The book-detail page needs chapters but not the glossary (no word taps);
  // read/quiz/flashcards need both. Global flashcards (no id) warm every book's glossary.
  const CONTENT_ROUTES = { book: 1, read: 1, quiz: 1, flashcards: 1 };
  useEffect(() => {
    const id = route.id;
    // Global flashcards (no id): need every book's glossary for translations.
    if (route.name === "flashcards" && !id) {
      catalog.forEach(b => {
        if (!glossReady[b.id]) {
          window.loadGlossaryFor(b).then(() => setGlossReady(p => ({ ...p, [b.id]: true })));
        }
      });
      return;
    }
    if (!CONTENT_ROUTES[route.name] || !id) return;
    if (userBooks.some(u => u.id === id)) return; // uploaded books already carry chapters
    const meta = catalog.find(b => b.id === id);
    if (!meta) return;
    const needChapters = !content[id];
    const needGloss = route.name !== "book" && !glossReady[id];
    if (!needChapters && !needGloss) return;
    let cancelled = false;
    setContentLoading(true);
    (async () => {
      try {
        if (needChapters) {
          const parsed = await window.loadBookContent(meta);
          if (!cancelled) setContent(prev => ({ ...prev, [id]: parsed.chapters }));
        }
        if (needGloss) {
          await window.loadGlossaryFor(meta);
          if (!cancelled) setGlossReady(prev => ({ ...prev, [id]: true }));
        }
      } catch (e) {
        console.error('[app] content load failed', id, e);
      } finally {
        if (!cancelled) setContentLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [route.name, route.id, catalog, content, glossReady, userBooks]);

  const onUpload = useCallback((book) => {
    setUserBooks(prev => [...prev, book]);
    window.location.hash = "#/book/" + book.id;
  }, [setUserBooks]);

  const onHighlightWord = useCallback((word, color, meta) => {
    setHighlights(prev => {
      const next = { ...prev };
      if (!color) delete next[word];
      else next[word] = color;
      return next;
    });
    if (!color) {
      // keep card record so notes survive unhighlight? Remove for cleanliness.
      setCards(prev => { const n = { ...prev }; delete n[word]; return n; });
    } else {
      setCards(prev => {
        const existing = prev[word] || {};
        // Keep a context the user already has; otherwise fill it from the tapped sentence.
        const context = (existing.context && existing.context.trim())
          ? existing.context
          : ((meta && meta.context) || "");
        return {
          ...prev,
          [word]: {
            phrase: word,
            isPhrase: false,
            context: "",
            customEn: "",
            customRu: "",
            note: "",
            examples: [],
            ...existing,
            ...(meta || {}),
            context,
            ts: Date.now(),
          },
        };
      });
    }
  }, [setHighlights, setCards]);

  // Save a multi-word phrase as a card.
  const onSavePhrase = useCallback((phraseText, opts = {}) => {
    const key = "p:" + phraseText.toLowerCase().replace(/\s+/g, " ").trim();
    const color = opts.color || "yellow";
    setHighlights(prev => ({ ...prev, [key]: color }));
    setCards(prev => ({
      ...prev,
      [key]: {
        phrase: phraseText,
        isPhrase: true,
        context: opts.context || "",
        customEn: "",
        customRu: "",
        note: "",
        examples: [],
        bookId: opts.bookId || null,
        ...(prev[key] || {}),
        ...(opts.patch || {}),
        ts: Date.now(),
      },
    }));
    return key;
  }, [setHighlights, setCards]);

  const onUpdateCard = useCallback((key, patch) => {
    setCards(prev => {
      const existing = prev[key] || { phrase: key.startsWith("p:") ? key.slice(2) : key, isPhrase: key.startsWith("p:"), context: "", customEn: "", customRu: "", note: "", examples: [] };
      return { ...prev, [key]: { ...existing, ...patch, ts: Date.now() } };
    });
    if (Object.prototype.hasOwnProperty.call(patch, "color")) {
      setHighlights(prev => {
        const next = { ...prev };
        if (!patch.color) delete next[key];
        else next[key] = patch.color;
        return next;
      });
    }
  }, [setCards, setHighlights]);

  const onDeleteCard = useCallback((key) => {
    setCards(prev => { const n = { ...prev }; delete n[key]; return n; });
    setHighlights(prev => { const n = { ...prev }; delete n[key]; return n; });
    setHardWords(prev => prev.filter(w => w !== key));
    setKnownWords(prev => prev.filter(w => w !== key));
  }, [setCards, setHighlights, setHardWords, setKnownWords]);

  const onKnowWord = useCallback((word) => {
    setKnownWords(prev => prev.includes(word) ? prev : [...prev, word]);
    setHardWords(prev => prev.filter(w => w !== word));
    setHighlights(prev => {
      const next = { ...prev };
      delete next[word];
      return next;
    });
  }, [setKnownWords, setHardWords, setHighlights]);

  const onToggleHardWord = useCallback((word) => {
    setHardWords(prev => prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]);
  }, [setHardWords]);

  const onUnknowWord = useCallback((word) => {
    setKnownWords(prev => prev.filter(w => w !== word));
  }, [setKnownWords]);

  const onToggleBookmark = useCallback((bookId, chapter, paragraph, snippet) => {
    setBookmarks(prev => {
      const list = prev[bookId] || [];
      const exists = list.find(b => b.chapter === chapter && b.paragraph === paragraph);
      let nextList;
      if (exists) {
        nextList = list.filter(b => !(b.chapter === chapter && b.paragraph === paragraph));
      } else {
        nextList = [...list, { chapter, paragraph, snippet, ts: Date.now() }];
        nextList.sort((a, b) => a.chapter - b.chapter || a.paragraph - b.paragraph);
      }
      return { ...prev, [bookId]: nextList };
    });
  }, [setBookmarks]);

  const onAdvanceChapter = useCallback(() => {
    if (route.name !== "read") return;
    const book = getBook(route.id);
    if (!book) return;
    const next = route.chapter + 1;
    setProgressMap(prev => {
      const cur = prev[route.id] || { chapter: 0, finished: false };
      const newChap = Math.max(cur.chapter, next);
      const finished = newChap >= book.chapters.length;
      return { ...prev, [route.id]: { chapter: Math.min(newChap, book.chapters.length), finished } };
    });
    if (next < book.chapters.length) {
      window.location.hash = "#/read/" + book.id + "/" + next;
    } else {
      window.location.hash = "#/quiz/" + book.id + "/" + route.chapter;
    }
  }, [route, allBooks, setProgressMap]);

  const onMarkChapterUnread = useCallback((i) => {
    setProgressMap(prev => {
      const cur = prev[route.id];
      if (!cur || cur.chapter <= i) return prev;   // only rewind a chapter that is currently read
      return { ...prev, [route.id]: { chapter: i, finished: false } };
    });
  }, [route, setProgressMap]);

  const onChapter = useCallback((idx) => {
    const id = route.id;
    window.location.hash = "#/read/" + id + "/" + idx;
  }, [route]);

  // Record a single chapter's quiz result. Does NOT mark the whole book finished.
  const onFinishQuiz = useCallback((score, total) => {
    const chap = route.chapter || 0;
    setQuizzes(prev => {
      const book = { ...(prev[route.id] || {}) };
      book[chap] = { score, total, date: new Date().toISOString() };
      return { ...prev, [route.id]: book };
    });
  }, [route, setQuizzes]);

  const onSignIn = useCallback((u) => {
    setUser(u);
    setShowAuth(false);
  }, [setUser]);

  const onSignOut = useCallback(() => {
    setUser(null);
    window.location.hash = "#/";
  }, [setUser]);

  useEffect(() => { window.scrollTo(0, 0); }, [hash]);

  // Per-route content readiness: a content route can only mount once its book's chapters (and, for
  // word-tapping routes, its glossary) are in. Uploaded user books are always ready.
  const cid = route.id;
  const needsContent = !!CONTENT_ROUTES[route.name] && !!cid;
  const metaBook = cid ? (catalog.find(b => b.id === cid) || userBooks.find(b => b.id === cid) || BOOKS.find(b => b.id === cid)) : null;
  const isUserBook = userBooks.some(u => u.id === cid);
  const chaptersLoaded = !needsContent || !metaBook || isUserBook || !!content[cid];
  const needGloss = needsContent && route.name !== "book";
  const glossOk = !needGloss || isUserBook || !!glossReady[cid];
  const bookContentReady = !needsContent || !metaBook || (chaptersLoaded && glossOk);

  return (
    <>
      <Header
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        streak={streak}
        route={hash}
        user={user}
        isAdmin={isAdmin(user)}
        onSignInClick={() => { setAuthMode("in"); setShowAuth(true); }}
        onSignOut={onSignOut}
      />

      {catalogLoading && (
        <div className="page">
          <div style={{ textAlign: "center", padding: "120px 0", color: "var(--ink-mute)" }}>
            {UI_STRINGS[lang].loadingBooks}
          </div>
        </div>
      )}

      {!catalogLoading && needsContent && !bookContentReady && (
        <div className="page">
          <div style={{ textAlign: "center", padding: "120px 0", color: "var(--ink-mute)" }}>
            {UI_STRINGS[lang].loadingBooks}
          </div>
        </div>
      )}

      {!catalogLoading && route.name === "home" && (
        <Home
          lang={lang}
          allBooks={allBooks}
          progressMap={progressMap}
          savedWords={savedWords}
          isAdmin={isAdmin(user)}
          setRoute={(r) => { window.location.hash = r; }}
          onUpload={onUpload}
        />
      )}

      {!catalogLoading && route.name === "library" && (
        <Library lang={lang} allBooks={allBooks} progressMap={progressMap} isAdmin={isAdmin(user)} onUpload={onUpload} />
      )}

      {!catalogLoading && route.name === "book" && bookContentReady && (
        <BookDetail
          lang={lang}
          book={getBook(route.id)}
          progress={progressMap[route.id]}
          onMarkUnread={onMarkChapterUnread}
          savedWords={savedWords}
          knownWords={knownWords}
          onStartChapter={(i) => {
            const id = route.id;
            window.location.hash = "#/read/" + id + "/" + i;
          }}
        />
      )}

      {!catalogLoading && route.name === "read" && bookContentReady && (
        <Reader
          lang={lang}
          book={getBook(route.id)}
          chapterIndex={route.chapter}
          progress={progressMap[route.id]}
          highlights={highlights}
          knownWords={knownWords}
          bookmarks={bookmarks}
          onHighlightWord={onHighlightWord}
          onSavePhrase={onSavePhrase}
          onUpdateCard={onUpdateCard}
          onDeleteCard={onDeleteCard}
          cards={cards}
          onKnowWord={onKnowWord}
          onToggleBookmark={onToggleBookmark}
          onAdvance={onAdvanceChapter}
          onChapter={onChapter}
        />
      )}

      {!catalogLoading && route.name === "quiz" && bookContentReady && (
        <Quiz lang={lang} book={getBook(route.id)} chapterIndex={route.chapter || 0} onFinish={onFinishQuiz} />
      )}

      {!catalogLoading && route.name === "flashcards" && bookContentReady && (
        <Flashcards
          lang={lang}
          book={route.id ? getBook(route.id) : null}
          allBooks={allBooks}
          highlights={highlights}
          cards={cards}
          knownWords={knownWords}
          hardWords={hardWords}
          onKnowWord={onKnowWord}
          onUnknowWord={onUnknowWord}
          onToggleHardWord={onToggleHardWord}
          onUpdateCard={onUpdateCard}
          onDeleteCard={onDeleteCard}
        />
      )}

      {!catalogLoading && route.name === "progress" && (
        <ProgressPage lang={lang} allBooks={allBooks} progressMap={progressMap} savedWords={savedWords} knownWords={knownWords} streak={streak} />
      )}

      {!catalogLoading && route.name === "about" && (
        <About lang={lang} allBooks={allBooks} />
      )}

      {!catalogLoading && route.name === "help" && (
        <Help lang={lang} />
      )}

      {!catalogLoading && route.name === "donate" && (
        <Donate lang={lang} user={user} />
      )}

      {!catalogLoading && route.name === "profile" && (
        <Profile
          lang={lang}
          user={user}
          isAdmin={isAdmin(user)}
          onUpdateUser={setUser}
          onSignOut={onSignOut}
          allBooks={allBooks}
          progressMap={progressMap}
          savedWords={savedWords}
          knownWords={knownWords}
          streak={streak}
        />
      )}

      {!catalogLoading && <Footer lang={lang} />}

      {AUTH_ENABLED && showAuth && (
        <AuthModal
          lang={lang}
          initialMode={authMode}
          onClose={() => setShowAuth(false)}
          onSignIn={onSignIn}
        />
      )}
    </>
  );
};

// ---------- PROGRESS PAGE ----------
const ProgressPage = ({ lang, allBooks, progressMap, savedWords, knownWords, streak }) => {
  const t = UI_STRINGS[lang];
  const stats = useMemo(() => {
    const finished = Object.values(progressMap).filter(p => p.finished).length;
    const inProg = Object.values(progressMap).filter(p => p.chapter > 0 && !p.finished).length;
    const minutes = Object.entries(progressMap).reduce((sum, [id, p]) => {
      const book = allBooks.find(b => b.id === id);
      if (!book) return sum;
      const total = book.chapterCount || (book.chapters && book.chapters.length) || 1;
      return sum + (p.finished ? book.minutes : Math.round(book.minutes * (p.chapter / total)));
    }, 0);
    return { finished, inProg, minutes };
  }, [progressMap, allBooks]);

  const days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (29 - i));
      const active = i >= 30 - streak || (Math.random() > 0.55 && i < 30 - streak);
      return { date: d, active, intensity: active ? Math.ceil(Math.random() * 3) : 0 };
    });
  }, [streak]);

  return (
    <div className="page-narrow">
      <div className="eyebrow" style={{ marginBottom: 10 }}>{t.yourProgress}</div>
      <h1 className="h-display" style={{ fontSize: 56, marginBottom: 32 }}>{streak} <em style={{ fontStyle: "italic" }}>{t.streak}</em></h1>

      <section className="card" style={{ padding: 0, marginBottom: 32 }}>
        <div className="stat-grid">
          <div className="s"><div className="n">{stats.finished}</div><div className="l">{t.booksFinished}</div></div>
          <div className="s"><div className="n">{stats.inProg}</div><div className="l">{t.inProgress}</div></div>
          <div className="s"><div className="n">{stats.minutes}</div><div className="l">{t.minutesRead}</div></div>
          <div className="s"><div className="n">{savedWords.length + knownWords.length}</div><div className="l">{t.wordsLearned}</div></div>
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h3 className="eyebrow" style={{ marginBottom: 14 }}>{t.last30Days}</h3>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(30, 1fr)", gap: 4 }}>
            {days.map((d, i) => (
              <div key={i} style={{
                aspectRatio: "1",
                background: d.active ? `rgba(31, 58, 46, ${0.3 + d.intensity * 0.2})` : "var(--bg-deep)",
                borderRadius: 2,
              }} title={d.date.toLocaleDateString()}></div>
            ))}
          </div>
          <div className="row" style={{ justifyContent: "space-between", marginTop: 14, color: "var(--ink-mute)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em" }}>
            <span>{t.daysAgo30}</span>
            <div className="row" style={{ gap: 4, alignItems: "center" }}>
              <span>{t.less}</span>
              {[0.2, 0.4, 0.6, 0.8].map(o => <div key={o} style={{ width: 10, height: 10, background: `rgba(31, 58, 46, ${o})`, borderRadius: 2 }}></div>)}
              <span>{t.more}</span>
            </div>
            <span>{t.today}</span>
          </div>
        </div>
      </section>

      <section>
        <h3 className="eyebrow" style={{ marginBottom: 14 }}>{t.booksHeading}</h3>
        <div className="card" style={{ padding: 0 }}>
          {allBooks.map((b, i) => {
            const p = progressMap[b.id];
            const total = b.chapterCount || (b.chapters && b.chapters.length) || 1;
            const pct = p ? (p.chapter / total) * 100 : 0;
            return (
              <a key={b.id} href={"#/book/" + b.id} style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr 200px auto",
                gap: 18,
                padding: "16px 20px",
                borderBottom: i < allBooks.length - 1 ? "1px solid var(--line-soft)" : 0,
                alignItems: "center",
              }}>
                <Level value={b.level} />
                <div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 500 }}>{b.title}</div>
                  <div className="mute" style={{ fontSize: 12, marginTop: 2 }}>{b.subtitle}</div>
                </div>
                <div>
                  <div className="bar"><i style={{ width: pct + "%" }}></i></div>
                  <div className="mono mute" style={{ fontSize: 10, marginTop: 4, letterSpacing: "0.05em" }}>
                    {p && p.finished ? t.finished : p ? `${Math.round(pct)}%` : t.notStarted}
                  </div>
                </div>
                <span className="mute">→</span>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { App, parseRoute, ProgressPage });

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
