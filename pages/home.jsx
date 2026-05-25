// Home page
const Home = ({ lang, allBooks, progressMap, savedWords, setRoute, onUpload }) => {
  const t = UI_STRINGS[lang];
  const inProgress = allBooks.filter(b => progressMap[b.id] && progressMap[b.id].chapter > 0 && !progressMap[b.id].finished);
  const featured = allBooks.slice(0, 3);
  const totals = useMemo(() => {
    const finished = Object.values(progressMap).filter(p => p.finished).length;
    const minutes = Object.entries(progressMap).reduce((sum, [id, p]) => {
      const book = allBooks.find(b => b.id === id);
      if (!book) return sum;
      return sum + (p.finished ? book.minutes : Math.round(book.minutes * (p.chapter / book.chapters.length)));
    }, 0);
    return { finished, minutes, words: savedWords.length };
  }, [progressMap, savedWords, allBooks]);

  const byLevel = (lvl) => allBooks.filter(b => b.level === lvl);

  const CEFR = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const levels = [...new Set(allBooks.map(b => b.level))].sort((a, b) => CEFR.indexOf(a) - CEFR.indexOf(b));
  const totalWords = allBooks.reduce((s, b) => s + (b.words || 0), 0);
  const wordsLabel = totalWords >= 1000 ? Math.round(totalWords / 1000) + "K" : String(totalWords);

  return (
    <div className="page">
      {/* HERO */}
      <div className="home-hero" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "center", padding: "32px 0 56px" }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>Andrew Maier · Bibliothek · {levels.join(" · ")}</div>
          <h1 className="h-display">
            {t.heroTitleA}<em>{t.heroTitleEm}</em>{t.heroTitleB}
          </h1>
          <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: 460, marginTop: 18, lineHeight: 1.55 }}>
            {t.heroLead}
          </p>
          <div className="row" style={{ marginTop: 28, gap: 10 }}>
            <a href="#/library" className="btn btn-primary btn-lg">{t.library} →</a>
            {featured[0] && (
              <a href={"#/read/" + featured[0].id + "/0"} className="btn btn-outline btn-lg">{t.sample}</a>
            )}
            {savedWords.length > 0 && (
              <a href="#/flashcards" className="btn btn-ghost btn-lg">
                {t.flashcards} <span className="mono mute" style={{ fontSize: 11, marginLeft: 6 }}>{savedWords.length}</span>
              </a>
            )}
          </div>
          <div className="hero-stats" style={{ display: "flex", gap: 28, marginTop: 40, alignItems: "center" }}>
            <div>
              <div className="serif" style={{ fontSize: 32, fontWeight: 500, lineHeight: 1 }}>{allBooks.length}</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{t.statBooks}</div>
            </div>
            <div style={{ width: 1, height: 36, background: "var(--line)" }}></div>
            <div>
              <div className="serif" style={{ fontSize: 32, fontWeight: 500, lineHeight: 1 }}>{levels.length}</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{t.statLevels}</div>
            </div>
            <div style={{ width: 1, height: 36, background: "var(--line)" }}></div>
            <div>
              <div className="serif" style={{ fontSize: 32, fontWeight: 500, lineHeight: 1 }}>{wordsLabel}</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{t.statWordsToRead}</div>
            </div>
          </div>
        </div>
        <div className="hero-stack" style={{ position: "relative", height: 420 }}>
          {featured.map((b, i) => (
            <div key={b.id} style={{
              position: "absolute",
              width: 180,
              top: 30 + i * 10,
              left: i * 130,
              transform: `rotate(${(i - 1) * 4}deg)`,
              zIndex: i,
            }}>
              <BookCover book={b} />
            </div>
          ))}
        </div>
      </div>

      {/* CONTINUE */}
      {inProgress.length > 0 && (
        <section style={{ marginBottom: 56 }}>
          <div className="spread" style={{ marginBottom: 18 }}>
            <h2 className="h-section">{t.continue}</h2>
            <a href="#/library" className="btn btn-ghost btn-sm">{t.seeAll} →</a>
          </div>
          <div className="book-grid" style={{ gap: 28 }}>
            {inProgress.slice(0, 4).map(b => {
              const p = progressMap[b.id];
              const pct = (p.chapter / b.chapters.length) * 100;
              return (
                <BookCard key={b.id} book={b} lang={lang} status="in" progress={pct} />
              );
            })}
          </div>
        </section>
      )}

      {/* PROGRESS STRIP */}
      <section className="card" style={{ padding: 0, marginBottom: 56 }}>
        <div className="stat-grid">
          <div className="s">
            <div className="n">{totals.finished}</div>
            <div className="l">{t.booksFinished}</div>
          </div>
          <div className="s">
            <div className="n">{totals.words}</div>
            <div className="l">{t.wordsLearned}</div>
          </div>
          <div className="s">
            <div className="n">{totals.minutes}</div>
            <div className="l">{t.minutesRead}</div>
          </div>
          <div className="s">
            <div className="n" style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              {Object.values(progressMap).length} <span style={{ fontSize: 16, color: "var(--ink-mute)" }}>/ {allBooks.length}</span>
            </div>
            <div className="l">{t.started}</div>
          </div>
        </div>
      </section>

      {/* BY LEVEL */}
      {levels.map(lvl => (
        <section key={lvl} style={{ marginBottom: 56 }}>
          <div className="spread" style={{ marginBottom: 18 }}>
            <div className="row" style={{ gap: 12 }}>
              <h2 className="h-section">{t.level} <em style={{ fontStyle: "italic" }}>{lvl}</em></h2>
              <Level value={lvl} />
            </div>
            <a href={"#/library?lvl=" + lvl} className="btn btn-ghost btn-sm">{t.seeAll} →</a>
          </div>
          <div className="book-grid" style={{ gap: 28 }}>
            {byLevel(lvl).map(b => {
              const p = progressMap[b.id];
              const status = !p ? "new" : p.finished ? "done" : "in";
              const pct = p ? (p.chapter / b.chapters.length) * 100 : 0;
              return <BookCard key={b.id} book={b} lang={lang} status={status} progress={pct} />;
            })}
          </div>
        </section>
      ))}

      {/* AUTHOR */}
      <section className="card author-card" style={{ padding: 36, marginBottom: 56, display: "grid", gridTemplateColumns: "auto 1fr", gap: 36, alignItems: "center" }}>
        <div style={{ width: 120, height: 120, borderRadius: "50%", background: "var(--bg-deep)", display: "grid", placeItems: "center", fontFamily: "var(--font-serif)", fontSize: 48, color: "var(--brown)", fontStyle: "italic" }}>AM</div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>{t.aboutAuthor}</div>
          <h2 className="h-section" style={{ marginBottom: 8 }}>Andrew Maier</h2>
          <p style={{ color: "var(--ink-soft)", fontSize: 15, maxWidth: 600, lineHeight: 1.6, margin: 0 }}>
            {t.authorBio}
          </p>
        </div>
      </section>
    </div>
  );
};

window.Home = Home;
