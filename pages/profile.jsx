// Profile page
const Profile = ({ lang, user, isAdmin, onUpdateUser, onSignOut, allBooks, progressMap, savedWords, knownWords, streak }) => {
  const t = UI_STRINGS[lang];
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const fileRef = useRef(null);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  // The account head/sign-out only make sense when auth is on and a user is signed in.
  const showAccountHead = AUTH_ENABLED && !!user;

  if (AUTH_ENABLED && !user) return (
    <div className="page-narrow" style={{ textAlign: "center", paddingTop: 80 }}>
      <h2 className="h-section">{t.pleaseSignIn}</h2>
      <a href="#/" className="btn btn-outline" style={{ marginTop: 18 }}>← {t.home}</a>
    </div>
  );

  const initials = user ? user.name.split(/\s+/).map(s => s[0]).join("").slice(0, 2).toUpperCase() : "";
  const joined = user ? new Date(user.joined) : null;
  const monthName = joined ? joined.toLocaleDateString(lang === "ru" ? "ru-RU" : lang === "de" ? "de-DE" : "en-US", { month: "long", year: "numeric" }) : "";

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

  const onPickImport = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (!window.confirm(t.importConfirm)) return;
    try {
      await importUserData(file);
      window.alert(t.importSuccess);
      window.location.reload();
    } catch (err) {
      window.alert(t.importError);
    }
  };

  return (
    <div className="page-narrow">
      <div className="eyebrow" style={{ marginBottom: 14 }}>{showAccountHead ? t.yourAccount : t.yourData}</div>

      {/* HEAD */}
      {showAccountHead && (
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
                  {isAdmin && <span className="admin-pill" style={{ verticalAlign: "8px" }}>{t.librarian}</span>}
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
                <button className="btn btn-ghost" onClick={() => setEditing(false)}>{t.cancel}</button>
                <button className="btn btn-primary" onClick={save}>{t.save}</button>
              </>
            ) : (
              <button className="btn btn-outline" onClick={() => setEditing(true)}>{t.editProfile}</button>
            )}
          </div>
        </div>
      )}

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
            {t.savedWordsEmpty}
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

      {/* BACKUP & RESTORE */}
      <section className="card" style={{ padding: 24, marginBottom: 32 }}>
        <h3 className="h-section" style={{ fontSize: 20, marginBottom: 8 }}>{t.backupTitle}</h3>
        <p className="mute" style={{ fontSize: 14, marginBottom: 18, lineHeight: 1.55 }}>{t.backupDesc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <button className="btn btn-primary btn-sm" onClick={() => exportUserData()}>↓ {t.exportData}</button>
          <button className="btn btn-outline btn-sm" onClick={() => fileRef.current && fileRef.current.click()}>↑ {t.importData}</button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            onChange={onPickImport}
            style={{ display: "none" }}
          />
        </div>
      </section>

      {/* ACCOUNT */}
      <section className="card" style={{ padding: 24 }}>
        <h3 className="h-section" style={{ fontSize: 20, marginBottom: 14 }}>{t.account}</h3>
        <div style={{ display: "grid", gap: 0 }}>
          <a href="#/progress" style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <span>{t.progress}</span><span className="mute">→</span>
          </a>
          <a href="#/donate" style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid var(--line-soft)" }}>
            <span>{t.supportAuthor}</span><span className="mute">→</span>
          </a>
          <a href="#/help" style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: showAccountHead ? "1px solid var(--line-soft)" : 0 }}>
            <span>{t.help}</span><span className="mute">→</span>
          </a>
          {showAccountHead && (
            <button onClick={onSignOut} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 0", border: 0, background: "transparent",
              cursor: "pointer", fontFamily: "inherit", fontSize: 15, color: "var(--burgundy)",
              textAlign: "left",
            }}>
              <span>{t.signOut}</span><span>→</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

window.Profile = Profile;
