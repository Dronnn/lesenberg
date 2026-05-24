// Shared components for die Deutsche Bibliothek
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ---------- HOOKS ----------
const useHash = () => {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
};

const useStore = (key, initial) => {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem("ddb:" + key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("ddb:" + key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
};

// ---------- LEVEL BADGE ----------
const Level = ({ value }) => (
  <span className={"lvl lvl-" + value}>{value}</span>
);

// ---------- COVER ----------
const BookCover = ({ book, size = "md" }) => {
  const theme = book.theme || "ink";
  return (
    <div className={"cover theme-" + theme} style={size === "lg" ? { fontSize: 22 } : null}>
      <span className="cover-lvl">{book.level}</span>
      <h3 className="cover-title" style={size === "lg" ? { fontSize: 26 } : null}>{book.title}</h3>
      <div className="cover-rule"></div>
      {book.subtitle && <div className="cover-sub">{book.subtitle}</div>}
      <span className="cover-author">A. Maier</span>
    </div>
  );
};

// ---------- THEME SWITCH ----------
const THEME_ICON = {
  light: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"></path>
    </svg>
  ),
  system: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="1.5"></rect>
      <path d="M8 21h8M12 17v4"></path>
    </svg>
  ),
};
const THEME_LABEL = { light: "Hell", dark: "Dunkel", system: "System" };
const ThemeSwitch = ({ value, onChange }) => (
  <div className="theme-switch" role="group" aria-label="Farbschema">
    {["light", "dark", "system"].map(k => (
      <button
        key={k}
        type="button"
        className={k === value ? "on" : ""}
        onClick={() => onChange(k)}
        aria-pressed={k === value}
        aria-label={THEME_LABEL[k]}
        title={THEME_LABEL[k]}
      >{THEME_ICON[k]}</button>
    ))}
  </div>
);

// ---------- HEADER ----------
const Header = ({ lang, setLang, theme, setTheme, streak, route, user, onSignInClick, onSignOut }) => {
  const t = UI_STRINGS[lang];
  const active = (path) => route.startsWith(path) ? "nav-link active" : "nav-link";
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  // Close the mobile menu whenever the route changes.
  useEffect(() => { setNavOpen(false); }, [route]);
  const initials = user ? user.name.split(/\s+/).map(s => s[0]).join("").slice(0,2).toUpperCase() : "";
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#/" className="brand">
          <span className="brand-mark">d</span>
          <span>die <em>Deutsche</em> Bibliothek</span>
        </a>
        <button
          type="button"
          className="nav-hamburger"
          aria-label="Menü"
          aria-expanded={navOpen}
          onClick={() => setNavOpen(o => !o)}
        >{navOpen ? "✕" : "☰"}</button>
        <div className={"nav-menu" + (navOpen ? " open" : "")}>
        <div className="nav-links">
          <a href="#/" className={route === "#/" ? "nav-link active" : "nav-link"} onClick={() => setNavOpen(false)}>{t.home}</a>
          <a href="#/library" className={route.startsWith("#/library") || route.startsWith("#/book") ? "nav-link active" : "nav-link"} onClick={() => setNavOpen(false)}>{t.library}</a>
          <a href="#/flashcards" className={route.startsWith("#/flashcards") ? "nav-link active" : "nav-link"} onClick={() => setNavOpen(false)}>{t.flashcards || "Karteikarten"}</a>
          <a href="#/help" className={active("#/help")} onClick={() => setNavOpen(false)}>{t.help}</a>
          <a href="#/about" className={active("#/about")} onClick={() => setNavOpen(false)}>{t.about}</a>
          <a href="#/donate" className={active("#/donate")} style={{ color: "var(--brown)", fontWeight: 600 }} onClick={() => setNavOpen(false)}>♥ {t.donate}</a>
        </div>
        <div className="nav-right">
          {user && (
            <div className="streak-pill" title={t.streak}>
              <span className="dot"></span>
              <span>{streak} {t.streak}</span>
            </div>
          )}
          <div className="lang-switch">
            {["de","en","ru"].map(l => (
              <button key={l} className={l === lang ? "on" : ""} onClick={() => setLang(l)}>{l}</button>
            ))}
          </div>
          <ThemeSwitch value={theme} onChange={setTheme} />
          {user ? (
            <div style={{ position: "relative" }} ref={menuRef}>
              <button onClick={() => setMenuOpen(o => !o)} style={{
                width: 34, height: 34, borderRadius: "50%",
                border: "1px solid var(--line)",
                background: "var(--brown)", color: "var(--paper)",
                fontFamily: "var(--font-serif)", fontSize: 13, fontWeight: 600,
                cursor: "pointer", letterSpacing: "0.04em",
              }}>{initials}</button>
              {menuOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0,
                  background: "var(--paper)", border: "1px solid var(--line)",
                  borderRadius: 6, boxShadow: "var(--shadow-lg)",
                  width: 220, padding: 8, zIndex: 70,
                }}>
                  <div style={{ padding: "10px 12px 12px", borderBottom: "1px solid var(--line-soft)", marginBottom: 4 }}>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 500 }}>{user.name}</div>
                    <div className="mute" style={{ fontSize: 12, marginTop: 2 }}>{user.email}</div>
                  </div>
                  <a href="#/profile" onClick={() => setMenuOpen(false)} className="nav-link" style={{ display: "block", padding: "8px 12px" }}>{t.profile}</a>
                  <a href="#/progress" onClick={() => setMenuOpen(false)} className="nav-link" style={{ display: "block", padding: "8px 12px" }}>{t.progress}</a>
                  <a href="#/donate" onClick={() => setMenuOpen(false)} className="nav-link" style={{ display: "block", padding: "8px 12px" }}>♥ {t.donate}</a>
                  <div style={{ height: 1, background: "var(--line-soft)", margin: "4px 0" }}></div>
                  <button onClick={() => { setMenuOpen(false); onSignOut(); }} className="nav-link" style={{
                    display: "block", padding: "8px 12px", border: 0, background: "transparent",
                    width: "100%", textAlign: "left", cursor: "pointer", fontFamily: "inherit", fontSize: 14,
                  }}>{t.signOut} →</button>
                </div>
              )}
            </div>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={() => { setNavOpen(false); onSignInClick(); }}>{t.signIn}</button>
          )}
        </div>
        </div>
      </div>
    </nav>
  );
};

// ---------- BOOK CARD ----------
const BookCard = ({ book, lang, status, progress }) => {
  const t = UI_STRINGS[lang];
  return (
    <a href={"#/book/" + book.id} className="book-card" style={{
      display: "flex",
      flexDirection: "column",
      gap: 14,
      padding: 0,
      transition: "transform 0.15s",
    }}>
      <div style={{ width: "100%" }}>
        <BookCover book={book} />
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
          <Level value={book.level} />
          <span className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: "0.06em" }}>
            {fmtReadingTime(book.minutes, t.minutes)} · {book.pages} {t.pages}
          </span>
        </div>
        <h3 className="h-card" style={{ marginTop: 2 }}>{book.title}</h3>
        <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 2, fontStyle: "italic" }}>{book.subtitle}</div>
        {status && status !== "new" && (
          <div style={{ marginTop: 10 }}>
            <div className="bar"><i style={{ width: (progress || 0) + "%" }}></i></div>
            <div style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 4, fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
              {status === "done" ? t.finished : status === "in" ? `${Math.round(progress || 0)}% · ${t.inProgress}` : t.notStarted}
            </div>
          </div>
        )}
      </div>
    </a>
  );
};

// ---------- WORD POPUP ----------
const WordPop = ({ data, position, onClose, onHighlight, onKnown, onEdit, currentColor, isKnown, lang }) => {
  const t = UI_STRINGS[lang];
  const ref = useRef(null);
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const onEsc = (e) => { if (e.key === "Escape") onClose(); };
    setTimeout(() => document.addEventListener("mousedown", onClick), 0);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  if (!data) return null;
  const colors = ["yellow", "green", "pink", "blue"];
  return (
    <div ref={ref} className="word-pop" style={{ left: position.x, top: position.y }}>
      <div className="wp-head">
        <div className="wp-de">{data.word}</div>
        <div className="wp-pos">{data.pos}</div>
      </div>
      {data.lemma && data.lemma !== data.word && (
        <div className="wp-lemma">
          <span className="l1">Grundform</span>
          <span className="l2">{data.lemma}</span>
        </div>
      )}
      <div className="wp-tr">
        <span className="wp-flag">EN</span>
        <span className="wp-val">{data.en}</span>
      </div>
      <div className="wp-tr">
        <span className="wp-flag">RU</span>
        <span className="wp-val">{data.ru}</span>
      </div>
      <div className="wp-colors">
        <div className={"sw clear" + (!currentColor ? " on" : "")} onClick={() => onHighlight(null)} title="Markierung entfernen">×</div>
        {colors.map(c => (
          <div key={c} className={"sw " + c + (currentColor === c ? " on" : "")} onClick={() => onHighlight(c)}></div>
        ))}
        <div style={{ flex: 1 }}></div>
        {onEdit && (
          <button onClick={onEdit} className="wp-edit" title="Karteikarte bearbeiten">✎</button>
        )}
        <button onClick={onKnown} style={{
          background: isKnown ? "var(--gold)" : "transparent",
          color: isKnown ? "var(--ink)" : "var(--bg-soft)",
          border: "1px solid " + (isKnown ? "var(--gold)" : "rgba(244, 237, 224, 0.2)"),
          padding: "4px 10px",
          borderRadius: 4,
          fontSize: 11,
          letterSpacing: "0.04em",
          fontFamily: "inherit",
          cursor: "pointer",
        }}>{isKnown ? "✓ " + t.known : t.known}</button>
      </div>
    </div>
  );
};

// ---------- TAP-WORD TEXT ----------
// Tokenises text into words / whitespace, then overlays any saved multi-word
// phrases that occur in this paragraph. Phrases are matched longest-first
// so "Guten Tag" wins over "Tag" alone.
const TappableText = ({ text, onWord, onPhrase, highlights, knownWords, phrases = [] }) => {
  const parts = useMemo(() => {
    // Sort phrases longest-first; lowercase compare so case differences don't break matches.
    const sorted = phrases
      .filter(p => p && p.text && p.text.trim().length > 0)
      .slice()
      .sort((a, b) => b.text.length - a.text.length);
    const lowerText = text.toLowerCase();

    const out = [];
    let i = 0;
    while (i < text.length) {
      // Try phrase match at this index
      let matched = null;
      for (const ph of sorted) {
        const t = ph.text.toLowerCase();
        if (lowerText.startsWith(t, i)) {
          // Ensure phrase starts at a word boundary
          const prev = text[i - 1];
          if (i === 0 || !/[A-Za-zÄÖÜäöüß]/.test(prev || "")) {
            matched = { ...ph, raw: text.slice(i, i + ph.text.length) };
            break;
          }
        }
      }
      if (matched) {
        out.push({ kind: "phrase", t: matched.raw, color: matched.color, key: matched.key });
        i += matched.raw.length;
        continue;
      }
      const remaining = text.slice(i);
      const wm = /^[A-Za-zÄÖÜäöüß]+/.exec(remaining);
      if (wm) {
        out.push({ kind: "word", t: wm[0] });
        i += wm[0].length;
        continue;
      }
      const ws = /^[^A-Za-zÄÖÜäöüß]+/.exec(remaining);
      if (ws) {
        out.push({ kind: "ws", t: ws[0] });
        i += ws[0].length;
        continue;
      }
      i++;
    }
    return out;
  }, [text, phrases]);

  return (
    <>
      {parts.map((p, i) => {
        if (p.kind === "ws") return <span key={i}>{p.t}</span>;
        if (p.kind === "phrase") {
          let cls = "phrase";
          if (p.color) cls += " hl-" + p.color;
          return (
            <span
              key={i}
              className={cls}
              data-phrase-key={p.key}
              onClick={(e) => { e.stopPropagation(); onPhrase && onPhrase(e, p.key); }}
            >{p.t}</span>
          );
        }
        const lookup = lookupWord(p.t);
        const key = lookup ? lookup.word : p.t;
        const color = highlights[key];
        const isKnown = knownWords.has(key);
        let cls = "word";
        if (color) cls += " hl-" + color;
        if (isKnown && !color) cls += " known";
        return (
          <span key={i} className={cls} onClick={(e) => onWord(e, p.t)}>
            {p.t}
          </span>
        );
      })}
    </>
  );
};

// ---------- UPLOAD MODAL ----------
const UploadModal = ({ onClose, onAdd, lang }) => {
  const t = UI_STRINGS[lang];
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("A1");
  const [theme, setTheme] = useState("forest");
  const [subtitle, setSubtitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [content, setContent] = useState("");
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setContent(ev.target.result);
      if (!title) setTitle(file.name.replace(/\.(txt|md)$/, ""));
    };
    reader.readAsText(file);
  };

  const submit = () => {
    if (!title.trim() || !content.trim()) return;
    const paragraphs = content.split(/\n+/).filter(Boolean);
    // Split into ~3 chapters
    const perChapter = Math.max(1, Math.ceil(paragraphs.length / 3));
    const chapters = [];
    for (let i = 0; i < paragraphs.length; i += perChapter) {
      chapters.push({
        title: t.chapter + " " + (chapters.length + 1),
        minutes: Math.max(2, Math.round(paragraphs.slice(i, i + perChapter).join(" ").split(/\s+/).length / 80)),
        text: paragraphs.slice(i, i + perChapter),
      });
    }
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    const book = {
      id: "user-" + Date.now(),
      title: title.trim(),
      subtitle: subtitle.trim() || "Hochgeladen",
      level,
      author: "Andrew Maier",
      theme,
      minutes: Math.max(2, Math.round(wordCount / 80)),
      words: wordCount,
      pages: Math.max(4, Math.round(wordCount / 60)),
      year: new Date().getFullYear(),
      blurb: { de: blurb || "Eigenes Buch.", en: blurb || "Custom book.", ru: blurb || "Своя книга." },
      chapters,
      vocab: [],
      userAdded: true,
    };
    onAdd(book);
    onClose();
  };

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{t.addOwn}</h2>
        <p>{t.addOwnSub}</p>
        <div className="field">
          <label>{t.title}</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Mein Buch" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div className="field">
            <label>{t.level}</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option>A1</option><option>A2</option><option>B1</option>
            </select>
          </div>
          <div className="field">
            <label>Cover</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="forest">Forest green</option>
              <option value="navy">Navy</option>
              <option value="burgundy">Burgundy</option>
              <option value="brown">Brown</option>
              <option value="gold">Gold</option>
              <option value="ink">Ink</option>
              <option value="cream">Cream</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label>{t.description}</label>
          <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Untertitel" />
        </div>
        <div className="field">
          <label>{t.content}</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Anna ging in den Park…"></textarea>
          <div style={{ marginTop: 8 }}>
            <input type="file" ref={fileRef} accept=".txt,.md,text/plain" onChange={handleFile} style={{ display: "none" }} />
            <button className="btn btn-ghost btn-sm" onClick={() => fileRef.current.click()}>↑ Datei wählen (.txt / .md)</button>
          </div>
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>{t.cancel}</button>
          <button className="btn btn-primary" onClick={submit} disabled={!title.trim() || !content.trim()}>{t.add}</button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { useHash, useStore, Level, BookCover, Header, ThemeSwitch, BookCard, WordPop, TappableText, UploadModal });
