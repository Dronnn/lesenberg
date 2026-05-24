// Profile page
const Profile = ({ lang, user, isAdmin, onUpdateUser, onSignOut, allBooks, progressMap, savedWords, knownWords, streak }) => {
  const t = UI_STRINGS[lang];
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  if (!user) return (
    <div className="page-narrow" style={{ textAlign: "center", paddingTop: 80 }}>
      <h2 className="h-section">Bitte melde dich an.</h2>
      <a href="#/" className="btn btn-outline" style={{ marginTop: 18 }}>← {t.home}</a>
    </div>
  );

  const initials = user.name.split(/\s+/).map(s => s[0]).join("").slice(0, 2).toUpperCase();
  const joined = new Date(user.joined);
  const monthName = joined.toLocaleDateString(lang === "ru" ? "ru-RU" : lang === "de" ? "de-DE" : "en-US", { month: "long", year: "numeric" });

  const stats = (() => {
    const finished = Object.values(progressMap).filter(p => p.finished).length;
    const minutes = Object.entries(progressMap).reduce((sum, [id, p]) => {
      const book = allBooks.find(b => b.id === id);
      if (!book) return sum;
      return sum + (p.finished ? book.minutes : Math.round(book.minutes * (p.chapter / book.chapters.length)));
    }, 0);
    return { finished, minutes };
  })();

  const save = () => {
    onUpdateUser({ ...user, name: name.trim() || user.name, email: email.trim() || user.email });
    setEditing(false);
  };

  return (
    <div className="page-narrow">
      <div className="eyebrow" style={{ marginBottom: 14 }}>{t.yourAccount}</div>

      {/* HEAD */}
      <div className="profile-head" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 28, alignItems: "center", marginBottom: 40 }}>
        <div style={{
          width: 96, height: 96, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--brown) 0%, var(--burgundy) 100%)",
          display: "grid", placeItems: "center",
          color: "var(--paper)", fontFamily: "var(--font-serif)",
          fontSize: 36, fontWeight: 500, letterSpacing: "0.02em",
        }}>{initials}</div>
        <div>
          {editing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 360 }}>
              <input className="field" style={{
                background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 4,
                padding: "8px 12px", fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 500,
              }} value={name} onChange={(e) => setName(e.target.value)} />
              <input style={{
                background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 4,
                padding: "8px 12px", fontFamily: "inherit", fontSize: 14, color: "var(--ink-soft)",
              }} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          ) : (
            <>
              <h1 className="h-display" style={{ fontSize: 40, marginBottom: 4 }}>
                {user.name}
                {isAdmin && <span className="admin-pill" style={{ verticalAlign: "8px" }}>BIBLIOTHEKAR</span>}
              </h1>
              <div className="soft" style={{ fontSize: 14 }}>{user.email}</div>
              <div className="mono mute" style={{ fontSize: 11, letterSpacing: "0.08em", marginTop: 4 }}>
                {t.member} {monthName}
              </div>
            </>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {editing ? (
            <>
              <button className="btn btn-ghost" onClick={() => setEditing(false)}>Abbrechen</button>
              <button className="btn btn-primary" onClick={save}>{t.save}</button>
            </>
          ) : (
            <button className="btn btn-outline" onClick={() => setEditing(true)}>{t.editProfile}</button>
          )}
        </div>
      </div>

      {/* STATS */}
      <section className="card" style={{ padding: 0, marginBottom: 32 }}>
        <div className="stat-grid">
          <div className="s"><div className="n">{streak}</div><div className="l">{t.streak}</div></div>
          <div className="s"><div className="n">{stats.finished}</div><div className="l">{t.booksFinished}</div></div>
          <div className="s"><div className="n">{stats.minutes}</div><div className="l">{t.minutesRead}</div></div>
          <div className="s"><div className="n">{savedWords.length + knownWords.length}</div><div className="l">{t.wordsLearned}</div></div>
        </div>
      </section>

      {/* SAVED WORDS */}
      <section style={{ marginBottom: 32 }}>
        <div className="spread" style={{ marginBottom: 14 }}>
          <h3 className="h-section" style={{ fontSize: 22 }}>{t.saved}</h3>
          <span className="mono mute" style={{ fontSize: 11, letterSpacing: "0.08em" }}>{savedWords.length} {t.words}</span>
        </div>
        {savedWords.length === 0 ? (
          <div className="card" style={{ padding: 32, color: "var(--ink-mute)", textAlign: "center" }}>
            Tippe Wörter im Reader an, um sie hier zu sammeln.
          </div>
        ) : (
          <div className="card" style={{ padding: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {savedWords.slice().reverse().map(w => {
              const d = lookupWord(w);
              return (
                <span key={w} title={`${d?.en} · ${d?.ru}`} style={{
                  padding: "6px 12px", background: "var(--bg-deep)", borderRadius: 999,
                  fontFamily: "var(--font-serif)", fontSize: 14,
                }}>{w}</span>
              );
            })}
          </div>
        )}
      </section>

      {/* ACCOUNT */}
      <section className="card" style={{ padding: 24 }}>
        <h3 className="h-section" style={{ fontSize: 20, marginBottom: 14 }}>Konto</h3>
        <div style={{ display: "grid", gap: 0 }}>
          <a href="#/progress" style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <span>{t.progress}</span><span className="mute">→</span>
          </a>
          <a href="#/donate" style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <span>{t.supportAuthor}</span><span className="mute">→</span>
          </a>
          <a href="#/help" style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <span>{t.help}</span><span className="mute">→</span>
          </a>
          <button onClick={onSignOut} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "14px 0", border: 0, background: "transparent",
            cursor: "pointer", fontFamily: "inherit", fontSize: 15, color: "var(--burgundy)",
            textAlign: "left",
          }}>
            <span>{t.signOut}</span><span>→</span>
          </button>
        </div>
      </section>
    </div>
  );
};

window.Profile = Profile;
