// Library page — curated catalogue. Books are loaded from a server-scanned folder.
// Only the owner (isAdmin) sees the upload/manage UI; everyone else browses the shelf.
const Library = ({ lang, allBooks, progressMap, isAdmin, onUpload }) => {
  const t = UI_STRINGS[lang];
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");
  const [status, setStatus] = useState("all");
  const [showUpload, setShowUpload] = useState(false);

  // Read level from hash query
  useEffect(() => {
    const m = window.location.hash.match(/lvl=([A-B]\d)/);
    if (m) setLevel(m[1]);
  }, []);

  const filtered = useMemo(() => {
    return allBooks.filter(b => {
      if (level !== "all" && b.level !== level) return false;
      const p = progressMap[b.id];
      if (status === "in" && !(p && p.chapter > 0 && !p.finished)) return false;
      if (status === "done" && !(p && p.finished)) return false;
      if (status === "new" && p && p.chapter > 0) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!b.title.toLowerCase().includes(q) && !(b.subtitle || "").toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [allBooks, level, status, query, progressMap]);

  return (
    <div className="page">
      <div className="spread" style={{ marginBottom: 24, alignItems: "flex-end" }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>
            {t.yourLibrary}
            {isAdmin && <span className="admin-pill" title="Du bist eingeloggt als Bibliothekar">BIBLIOTHEKAR</span>}
          </div>
          <h1 className="h-display" style={{ fontSize: 48 }}>{t.library}</h1>
          <p className="soft" style={{ maxWidth: 520, marginTop: 8 }}>
            {filtered.length} {filtered.length === 1 ? "Buch" : "Bücher"} · {allBooks.reduce((s, b) => s + b.words, 0).toLocaleString()} {t.words} · kuratiert von A. Maier
          </p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={() => setShowUpload(true)}>+ {t.upload}</button>
        )}
      </div>

      {/* FILTERS */}
      <div className="library-filters" style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12, marginBottom: 28, alignItems: "center" }}>
        <div className="input">
          <span className="mono soft" style={{ fontSize: 12 }}>⌕</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.search} />
        </div>
        <div style={{ display: "flex", gap: 6, background: "var(--bg-soft)", border: "1px solid var(--line)", borderRadius: 4, padding: 3 }}>
          {[["all", t.allLevels], ["A1", "A1"], ["A2", "A2"], ["B1", "B1"]].map(([k, label]) => (
            <button key={k} onClick={() => setLevel(k)}
              style={{
                padding: "6px 12px",
                borderRadius: 3,
                border: 0,
                background: level === k ? "var(--ink)" : "transparent",
                color: level === k ? "var(--bg-soft)" : "var(--ink-soft)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>{label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, background: "var(--bg-soft)", border: "1px solid var(--line)", borderRadius: 4, padding: 3 }}>
          {[["all", "Alle"], ["new", t.notStarted], ["in", t.inProgress], ["done", t.finished]].map(([k, label]) => (
            <button key={k} onClick={() => setStatus(k)}
              style={{
                padding: "6px 10px",
                borderRadius: 3,
                border: 0,
                background: status === k ? "var(--ink)" : "transparent",
                color: status === k ? "var(--bg-soft)" : "var(--ink-soft)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>{label}</button>
          ))}
        </div>
      </div>

      {/* GRID */}
      {filtered.length === 0 ? (
        <div className="card" style={{ padding: 64, textAlign: "center", color: "var(--ink-mute)" }}>
          {t.nothingHere}
        </div>
      ) : (
        <div className="book-grid" style={{ rowGap: 36, columnGap: 24 }}>
          {filtered.map(b => {
            const p = progressMap[b.id];
            const st = !p ? "new" : p.finished ? "done" : "in";
            const pct = p ? (p.chapter / b.chapters.length) * 100 : 0;
            return <BookCard key={b.id} book={b} lang={lang} status={st} progress={pct} />;
          })}
        </div>
      )}

      {/* ADMIN — server folder scan panel */}
      {isAdmin && (
        <AdminShelfPanel allBooks={allBooks} onOpenUpload={() => setShowUpload(true)} />
      )}

      {showUpload && isAdmin && <UploadModal lang={lang} onClose={() => setShowUpload(false)} onAdd={onUpload} />}
    </div>
  );
};

// Mock admin panel that shows the /books/ folder as if scanned server-side.
// In the real build, the server would walk this folder and emit a JSON manifest.
const AdminShelfPanel = ({ allBooks, onOpenUpload }) => {
  const slug = (b) => (b.id || b.title.toLowerCase()).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return (
    <section className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <div className="eyebrow">Bibliotheksverwaltung</div>
          <h3 className="h-section" style={{ marginTop: 6, fontSize: 22 }}>Quellordner <code className="mono-code">/books/</code></h3>
          <p className="soft" style={{ marginTop: 6, fontSize: 13, maxWidth: 560 }}>
            Der Server scannt diesen Ordner beim Start. Jede Markdown-Datei wird ein Buch.
            Front-Matter (<code className="mono-code">title</code>, <code className="mono-code">level</code>, <code className="mono-code">subtitle</code>, <code className="mono-code">theme</code>) bestimmt Cover und Metadaten.
          </p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={onOpenUpload}>+ Datei hochladen</button>
      </div>

      <div className="admin-tree">
        <div className="admin-tree-head">
          <span>📂 /books/</span>
          <span className="mono mute">{allBooks.length} Einträge · gescannt vor 2 Min.</span>
        </div>
        {allBooks.map(b => (
          <div key={b.id} className="admin-tree-row">
            <span className="atr-icon">📄</span>
            <span className="atr-name mono">{slug(b)}.md</span>
            <span className="atr-meta mono mute">{b.level} · {b.words.toLocaleString()} Wörter</span>
            <span className="atr-status">
              {b.userAdded ? <span className="atr-tag draft">ENTWURF</span> : <span className="atr-tag pub">VERÖFFENTLICHT</span>}
            </span>
            <span className="atr-actions">
              <button className="atr-btn" title="Bearbeiten">✎</button>
              <button className="atr-btn" title="Ausblenden">⊘</button>
            </span>
          </div>
        ))}
      </div>

      <div className="admin-hint mono">
        <span className="mute">→</span> Lege eine <code>.md</code>-Datei in <code>/books/</code> ab — sie erscheint beim nächsten Scan automatisch im Regal. Nutzer können nichts hochladen.
      </div>
    </section>
  );
};

window.Library = Library;
window.AdminShelfPanel = AdminShelfPanel;
