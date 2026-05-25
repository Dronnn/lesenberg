// Book detail page
const BookDetail = ({ lang, book, progress, savedWords, knownWords, onStartChapter }) => {
  const t = UI_STRINGS[lang];
  if (!book) return <div className="page"><p>{t.bookNotFound}</p></div>;

  const totalMins = book.minutes;
  const completedChapters = progress ? progress.chapter : 0;
  const pct = (completedChapters / book.chapters.length) * 100;

  const blurb = book.blurb[lang] || book.blurb.de;
  const vocabList = buildVocab(book);

  return (
    <div className="page-narrow">
      <a href="#/library" className="btn btn-ghost btn-sm" style={{ marginBottom: 24, marginLeft: -12 }}>← {t.library}</a>

      {/* HEAD */}
      <div className="book-head" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 48, marginBottom: 56 }}>
        <div className="book-head-cover" style={{ width: 240 }}>
          <BookCover book={book} size="lg" />
        </div>
        <div>
          <div className="row" style={{ marginBottom: 14, gap: 10 }}>
            <Level value={book.level} />
            <span className="mono mute" style={{ fontSize: 11, letterSpacing: "0.08em" }}>
              {fmtReadingTime(book.minutes, t.minutes)} · {book.words.toLocaleString()} {t.words} · {book.pages} {t.pages}
            </span>
          </div>
          <h1 className="h-display" style={{ fontSize: 48, marginBottom: 6 }}>{book.title}</h1>
          <div style={{ fontSize: 18, fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--ink-soft)", marginBottom: 18 }}>
            {book.subtitle}
          </div>
          <div className="mono mute" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18 }}>
            {t.by} Andrew Maier · {book.year}
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--ink)", maxWidth: 520, marginBottom: 24 }}>
            {blurb}
          </p>

          {progress && progress.chapter > 0 && (
            <div style={{ marginBottom: 18, maxWidth: 360 }}>
              <div className="bar"><i style={{ width: pct + "%" }}></i></div>
              <div className="mono mute" style={{ fontSize: 11, marginTop: 6, letterSpacing: "0.05em" }}>
                {completedChapters} / {book.chapters.length} {t.chapters} · {Math.round(pct)}%
              </div>
            </div>
          )}

          <div className="row" style={{ gap: 10, flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-lg" onClick={() => onStartChapter(Math.min(completedChapters, book.chapters.length - 1))}>
              {progress && progress.chapter > 0 ? t.continue : t.startReading} →
            </button>
            <button className="btn btn-outline" onClick={() => onStartChapter(0)}>
              {t.sample}
            </button>
            <button className="btn btn-ghost" onClick={async () => {
              let md = null;
              if (book.file) { try { md = await (await fetch("books/" + encodeURI(book.file))).text(); } catch (e) { md = null; } }
              if (!md) md = "# " + book.title + "\n\n" + book.chapters.map(c => "## " + c.title + "\n\n" + c.text.join("\n\n")).join("\n\n") + "\n";
              const url = URL.createObjectURL(new Blob([md], { type: "text/markdown;charset=utf-8" }));
              const a = document.createElement("a");
              a.href = url; a.download = book.id + ".md";
              document.body.appendChild(a); a.click(); document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}>↓ {t.download}</button>
            <button className="btn btn-ghost" onClick={() => { window.location.hash = "#/donate"; }}>€ {t.buy}</button>
          </div>
        </div>
      </div>

      {/* CHAPTERS */}
      <section style={{ marginBottom: 56 }}>
        <div className="spread" style={{ marginBottom: 16 }}>
          <h2 className="h-section">{t.chapters}</h2>
          <span className="mono mute" style={{ fontSize: 11, letterSpacing: "0.08em" }}>{book.chapters.length} {t.chapters}</span>
        </div>
        <div className="card" style={{ padding: 8 }}>
          {book.chapters.map((c, i) => {
            const done = progress && progress.chapter > i;
            const current = progress && progress.chapter === i;
            return (
              <div key={i} className={"chap" + (current ? " current" : "")} onClick={() => onStartChapter(i)}>
                <span className="chap-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="chap-title">{c.title}</div>
                  <div className="chap-meta">{fmtReadingTime(c.minutes, t.minutes)}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {done && <span className="mono" style={{ color: "var(--a1)", fontSize: 11, letterSpacing: "0.08em" }}>✓ {t.finished}</span>}
                  {current && <span className="mono" style={{ color: "var(--brown)", fontSize: 11, letterSpacing: "0.08em" }}>● {t.inProgress}</span>}
                  <span className="mute" style={{ fontSize: 18 }}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* VOCAB PREVIEW */}
      {vocabList.length > 0 && (
        <section style={{ marginBottom: 56 }}>
          <div className="spread" style={{ marginBottom: 16 }}>
            <h2 className="h-section">{t.vocabulary}</h2>
            <span className="mono mute" style={{ fontSize: 11, letterSpacing: "0.08em" }}>{vocabList.length} {t.words}</span>
          </div>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            {vocabList.map((v, i) => (
              <div key={i} className="vocab-row" style={{
                display: "grid",
                gridTemplateColumns: "180px 60px 1fr 1fr 40px",
                gap: 20,
                padding: "14px 20px",
                borderBottom: i < vocabList.length - 1 ? "1px solid var(--line-soft)" : 0,
                alignItems: "center",
              }}>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 500 }}>{v.word}</div>
                <div className="mono mute" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>{v.pos}</div>
                <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>
                  <span className="mono mute" style={{ fontSize: 9, marginRight: 6 }}>EN</span>{v.en}
                </div>
                <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>
                  <span className="mono mute" style={{ fontSize: 9, marginRight: 6 }}>RU</span>{v.ru}
                </div>
                <div style={{ textAlign: "right" }}>
                  {savedWords.includes(v.word) && <span style={{ color: "var(--gold)" }}>★</span>}
                  {knownWords.includes(v.word) && <span style={{ color: "var(--a1)", marginLeft: 4 }}>✓</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* QUIZ TEASER */}
      <section className="card quiz-teaser" style={{ padding: 28, marginBottom: 56, display: "grid", gridTemplateColumns: "1fr auto", gap: 20, alignItems: "center" }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>{t.afterReading}</div>
          <h3 className="h-section" style={{ fontSize: 22 }}>{t.vocabQuizTitle}</h3>
          <p className="soft" style={{ margin: "4px 0 0", fontSize: 14 }}>{t.quizTeaser}</p>
        </div>
        <a href={"#/quiz/" + book.id + "/0"} className="btn btn-outline">{t.quiz} →</a>
      </section>
    </div>
  );
};

window.BookDetail = BookDetail;
