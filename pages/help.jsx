// Help / How-to-use page
const Help = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const [openFaq, setOpenFaq] = useState(0);

  const levels = [
    {
      lvl: "A1",
      label: "Anfänger",
      desc: "Du beginnst gerade. Du kennst einfache Wörter: Hallo, Tag, Buch.",
      features: ["Kurze Sätze", "Viel Wiederholung", "Präsens", "1.500–2.000 Wörter pro Buch"],
      example: "Anna geht in den Park. Sie sieht einen kleinen Hund.",
    },
    {
      lvl: "A2",
      label: "Grundstufe",
      desc: "Du verstehst Alltagsthemen. Du kannst über die Vergangenheit sprechen.",
      features: ["Mehrere Zeitformen", "Längere Sätze", "Dialoge", "2.500–4.000 Wörter pro Buch"],
      example: "Am Nachmittag kam der Zug an. Paul nahm seinen Koffer und ging zur Tür.",
    },
    {
      lvl: "B1",
      label: "Mittelstufe",
      desc: "Du liest fließend. Du verstehst auch, was zwischen den Zeilen steht.",
      features: ["Komplexe Sätze", "Nebensätze", "Idiome", "6.000–8.000 Wörter pro Buch"],
      example: "Manche Türen, sagte sie endlich, soll man nicht öffnen.",
    },
  ];

  const steps = [
    {
      n: "01",
      title: "Wähle ein Buch",
      desc: "Filtere in der Bibliothek nach deinem Niveau. Beginne mit A1, wenn du unsicher bist — du kannst jederzeit wechseln.",
    },
    {
      n: "02",
      title: "Tippe auf jedes Wort",
      desc: `Im Reader öffnet ein Tap auf jedes Wort eine Übersetzung — auf Englisch und Russisch. Du kannst Wörter speichern oder als „gekannt" markieren.`,
    },
    {
      n: "03",
      title: "Lerne mit Karteikarten",
      desc: "Deine gespeicherten Wörter werden zu Karteikarten. Drehe sie um — sieh die Übersetzung — und wiederhole, bis du sie kennst.",
    },
    {
      n: "04",
      title: "Verstehe mit Quizzen",
      desc: "Nach jedem Buch gibt es ein kurzes Quiz. Drei Fragen — schnell und konkret.",
    },
    {
      n: "05",
      title: "Bleibe dran",
      desc: "Schon zehn Minuten am Tag genügen. Dein Streak wächst, und mit ihm dein Wortschatz.",
    },
  ];

  const faqs = [
    {
      q: "Brauche ich ein Konto?",
      a: "Nein. Du kannst alles ohne Anmeldung lesen. Wenn du dich anmeldest, wird dein Fortschritt zwischen Geräten synchronisiert.",
    },
    {
      q: "Kann ich eigene Bücher hochladen?",
      a: `Nein — die Bibliothek ist eine kuratierte Sammlung. Andrew Maier schreibt die Bücher und pflegt das Regal. Wenn du eine Idee oder einen Wunsch hast, schreib mir gerne über die Spenden-Seite.`,
    },
    {
      q: "Sind die Übersetzungen automatisch?",
      a: `Die wichtigsten Wörter sind handgepflegt. Bei selteneren Wörtern siehst du eventuell „—" — dann hilft dir ein Online-Wörterbuch.`,
    },
    {
      q: "Was bedeuten die Farben der Wörter?",
      a: `Unterstrichen gelb = gespeichert (du willst es lernen). Grau und blass = du hast es als „gekannt" markiert. Schwarz = neutral.`,
    },
    {
      q: "Wie viel kosten die Bücher?",
      a: "Nichts. Die Bibliothek ist kostenlos. Wenn du das Projekt unterstützen willst, freue ich mich über eine Spende.",
    },
    {
      q: "Auf welchen Geräten funktioniert das?",
      a: "Im Browser — auf Telefon, Tablet und Computer. Es gibt keine App, die du installieren musst.",
    },
  ];

  return (
    <div className="page-narrow">
      <div className="eyebrow" style={{ marginBottom: 14 }}>{t.howTo}</div>
      <h1 className="h-display" style={{ fontSize: 56, marginBottom: 20 }}>
        Lies. Tippe. <em>Lerne.</em>
      </h1>
      <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: 580, lineHeight: 1.6 }}>
        Diese Bibliothek funktioniert anders als die meisten Sprachlern-Apps. Du liest echte Geschichten — nicht isolierte Wörter. Hier ist, wie das geht.
      </p>

      {/* TAP DEMO */}
      <section style={{ marginTop: 56, marginBottom: 56 }}>
        <h2 className="h-section" style={{ marginBottom: 18 }}>Probier es selbst</h2>
        <div className="card" style={{ padding: 36, fontFamily: "var(--font-serif)", fontSize: 22, lineHeight: 1.7 }}>
          <p style={{ margin: 0 }}>
            Anna <DemoWord word="geht" en="goes" ru="идёт" /> in den <DemoWord word="Park" en="park" ru="парк" />. Der <DemoWord word="Tag" en="day" ru="день" /> ist <DemoWord word="schön" en="beautiful" ru="красивый" /> und <DemoWord word="warm" en="warm" ru="тёплый" />.
          </p>
          <div className="mono mute" style={{ fontSize: 11, marginTop: 22, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            ↑ Tippe ein unterstrichenes Wort an
          </div>
        </div>
      </section>

      {/* LEVELS */}
      <section style={{ marginBottom: 56 }}>
        <h2 className="h-section" style={{ marginBottom: 18 }}>Drei Niveaus</h2>
        <div style={{ display: "grid", gap: 12 }}>
          {levels.map(l => (
            <div key={l.lvl} className="card" style={{ padding: 24, display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: 24, alignItems: "flex-start" }}>
              <div>
                <Level value={l.lvl} />
                <div className="serif" style={{ fontSize: 18, fontWeight: 500, marginTop: 8 }}>{l.label}</div>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>{l.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                  {l.features.map(f => (
                    <span key={f} className="mono" style={{
                      fontSize: 10, padding: "3px 8px",
                      background: "var(--bg-deep)", borderRadius: 3,
                      letterSpacing: "0.04em", color: "var(--ink-soft)",
                    }}>{f}</span>
                  ))}
                </div>
              </div>
              <div style={{
                background: "var(--bg-soft)", padding: 16, borderRadius: 4,
                borderLeft: "2px solid var(--brown)",
                fontFamily: "var(--font-serif)", fontStyle: "italic",
                fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5,
              }}>
                {l.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section style={{ marginBottom: 56 }}>
        <h2 className="h-section" style={{ marginBottom: 24 }}>In fünf Schritten</h2>
        <div style={{ display: "grid", gap: 0 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr",
              gap: 24,
              padding: "24px 0",
              borderBottom: i < steps.length - 1 ? "1px solid var(--line-soft)" : 0,
            }}>
              <div className="serif" style={{ fontSize: 32, color: "var(--brown)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1 }}>{s.n}</div>
              <div>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 6px" }}>{s.title}</h3>
                <p style={{ margin: 0, color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.6, maxWidth: 560 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORD STATES */}
      <section style={{ marginBottom: 56 }}>
        <h2 className="h-section" style={{ marginBottom: 18 }}>Was die Wörter dir sagen</h2>
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "18px 28px", alignItems: "center", fontFamily: "var(--font-serif)", fontSize: 18 }}>
            <span className="word">Tag</span>
            <span className="soft" style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>Neutral — du hast es noch nicht angesehen</span>
            <span className="word saved">Tag</span>
            <span className="soft" style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>Gespeichert — kommt in deine Karteikarten</span>
            <span className="word known">Tag</span>
            <span className="soft" style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>Gekannt — wird beim nächsten Mal abgeblendet</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ marginBottom: 56 }}>
        <h2 className="h-section" style={{ marginBottom: 18 }}>Häufige Fragen</h2>
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? "1px solid var(--line-soft)" : 0 }}>
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{
                width: "100%", padding: "18px 24px", border: 0, background: "transparent",
                textAlign: "left", cursor: "pointer", fontFamily: "inherit",
                display: "grid", gridTemplateColumns: "1fr 20px", gap: 12, alignItems: "center",
              }}>
                <span className="serif" style={{ fontSize: 17, fontWeight: 500 }}>{f.q}</span>
                <span className="mute" style={{ fontSize: 18, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 24px 20px", color: "var(--ink-soft)", fontSize: 15, lineHeight: 1.6, maxWidth: 640 }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="card" style={{ padding: 36, textAlign: "center", background: "var(--ink)", color: "var(--bg-soft)" }}>
        <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, margin: "0 0 8px" }}>Bereit?</h3>
        <p style={{ color: "rgba(244, 237, 224, 0.7)", margin: "0 0 22px" }}>Beginne mit einem A1-Buch. Es dauert zehn Minuten.</p>
        <a href="#/library?lvl=A1" className="btn btn-lg" style={{ background: "var(--paper)", color: "var(--ink)" }}>{t.library} →</a>
      </section>
    </div>
  );
};

// Small demo word for the Help page
const DemoWord = ({ word, en, ru }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return (
    <span ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <span className={"word" + (open ? " active" : " saved")} onClick={() => setOpen(o => !o)}>{word}</span>
      {open && (
        <div className="word-pop" style={{ left: 0, top: "calc(100% + 8px)" }}>
          <div className="wp-head">
            <div className="wp-de">{word}</div>
            <div className="wp-pos">Demo</div>
          </div>
          <div className="wp-tr">
            <span className="wp-flag">EN</span><span className="wp-val">{en}</span>
          </div>
          <div className="wp-tr">
            <span className="wp-flag">RU</span><span className="wp-val">{ru}</span>
          </div>
        </div>
      )}
    </span>
  );
};

window.Help = Help;
