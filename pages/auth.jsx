// Auth modal — mock sign in / sign up
const AuthModal = ({ onClose, onSignIn, lang, initialMode }) => {
  const t = UI_STRINGS[lang];
  const [mode, setMode] = useState(initialMode || "in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    if (mode === "up" && !name.trim()) return;
    if (!email.trim() || !password.trim()) return;
    const finalName = mode === "up" ? name.trim() : (email.split("@")[0]);
    onSignIn({
      name: finalName,
      email: email.trim(),
      joined: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 440 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 18, padding: 4, background: "var(--bg-deep)", borderRadius: 6 }}>
          <button onClick={() => setMode("in")} style={{
            flex: 1, padding: "8px 12px", border: 0, borderRadius: 4,
            background: mode === "in" ? "var(--paper)" : "transparent",
            color: "var(--ink)", fontFamily: "inherit", fontSize: 13, fontWeight: 500,
            cursor: "pointer", boxShadow: mode === "in" ? "var(--shadow-sm)" : "none",
          }}>{t.signIn}</button>
          <button onClick={() => setMode("up")} style={{
            flex: 1, padding: "8px 12px", border: 0, borderRadius: 4,
            background: mode === "up" ? "var(--paper)" : "transparent",
            color: "var(--ink)", fontFamily: "inherit", fontSize: 13, fontWeight: 500,
            cursor: "pointer", boxShadow: mode === "up" ? "var(--shadow-sm)" : "none",
          }}>{t.signUp}</button>
        </div>
        <h2>{mode === "in" ? t.welcomeBack : t.createAccount}</h2>
        <p>{mode === "in" ? t.signInSub : t.signUpSub}</p>

        {mode === "up" && (
          <div className="field">
            <label>{t.name}</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.namePlaceholder} />
          </div>
        )}
        <div className="field">
          <label>{t.email}</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPlaceholder} />
        </div>
        <div className="field">
          <label>{t.password}</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>

        <button className="btn btn-primary" onClick={submit} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
          {mode === "in" ? t.signIn : t.createAccount} →
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--line)" }}></div>
          <span className="mute mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t.or}</span>
          <div style={{ flex: 1, height: 1, background: "var(--line)" }}></div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <button className="btn btn-outline" style={{ justifyContent: "center" }} onClick={() => onSignIn({ name: "Andrew M.", email: "demo@bibliothek.de", joined: new Date().toISOString() })}>
            <span style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>G</span> Google
          </button>
          <button className="btn btn-outline" style={{ justifyContent: "center" }} onClick={() => onSignIn({ name: "Andrew M.", email: "demo@bibliothek.de", joined: new Date().toISOString() })}>
             Apple
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "var(--ink-soft)" }}>
          <button className="btn btn-ghost btn-sm" onClick={onClose} style={{ padding: 0 }}>{t.continueAsGuest} →</button>
        </div>

        <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px dashed var(--line)", textAlign: "center" }}>
          <div className="mono mute" style={{ fontSize: 9, letterSpacing: "0.1em", marginBottom: 6 }}>{t.demo}</div>
          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => { onSignIn({ name: "Anna Schmidt", email: "anna@beispiel.de", joined: new Date().toISOString() }); }}
              style={{ fontSize: 11 }}
            >{t.asReader}</button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => { onSignIn({ name: "Andrew Maier", email: "andrew@deutsche-bibliothek.de", joined: new Date(2024, 0, 1).toISOString() }); }}
              style={{ fontSize: 11, color: "var(--brown)" }}
            >{t.asLibrarian}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

window.AuthModal = AuthModal;
