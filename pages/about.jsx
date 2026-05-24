// About the author — expanded standalone page
const About = ({ lang, allBooks }) => {
  const t = UI_STRINGS[lang];

  const facts = [
    { label: "Lebt in", value: "Hamburg" },
    { label: "Schreibt seit", value: "2019" },
    { label: "Lieblingsfont", value: "Source Serif" },
    { label: "Lieblingsbuch", value: "Stoner" },
  ];

  const beliefs = [
    {
      n: "01",
      title: "Verständnis kommt vor Grammatik",
      body: "Du lernst eine Sprache, indem du sie verstehst. Grammatik kann warten — zuerst muss das Lesen sich gut anfühlen.",
    },
    {
      n: "02",
      title: "Einfach ist nicht langweilig",
      body: "A1-Sätze müssen nicht kindisch sein. Eine kurze Zeile kann eine ganze Stimmung tragen. Hemingway hat das schon gewusst.",
    },
    {
      n: "03",
      title: "Wiederholung ist Magie",
      body: "Wenn dasselbe Wort fünfzehnmal in zehn Minuten erscheint, bleibst du nicht stehen — du lernst es nebenbei.",
    },
    {
      n: "04",
      title: "Übersetzung ist Hilfsrad",
      body: "Sie soll nah sein, schnell, und dann wieder verschwinden. Nicht ablenken. Nicht erklären.",
    },
  ];

  return (
    <div className="page-narrow">
      <div className="eyebrow" style={{ marginBottom: 14 }}>{t.aboutAuthor}</div>
      <h1 className="h-display" style={{ fontSize: 72, marginBottom: 24, lineHeight: 0.95 }}>
        Andrew<br /><em>Maier</em>
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 56, marginBottom: 64, alignItems: "start" }}>
        <div>
          <div style={{
            aspectRatio: "3/4",
            background: "linear-gradient(180deg, #d4a574 0%, #7a3a2a 100%)",
            borderRadius: 4,
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-serif)",
            color: "var(--paper)",
            fontSize: 110,
            fontStyle: "italic",
            fontWeight: 500,
            boxShadow: "var(--shadow)",
            marginBottom: 18,
          }}>AM</div>
          <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 12, color: "var(--ink-mute)", textAlign: "center" }}>
            Foto folgt — bis dahin das Monogramm.
          </div>
        </div>
        <div style={{ fontSize: 18, lineHeight: 1.65, color: "var(--ink)" }}>
          <p style={{ marginTop: 0 }}>
            Ich heiße Andrew. Ich bin Autor und vor langer Zeit war ich selbst Deutschschüler. Damals habe ich gefühlt, was alle Anfänger fühlen: Lehrbücher sind oft trocken, und richtige Bücher sind zu früh zu schwer.
          </p>
          <p>
            Also schreibe ich genau die Art von Büchern, die ich damals brauchte. Geschichten in einfachem Deutsch — kurz und gut. Niemals herablassend. Mit Figuren, die man wirklich kennen lernt.
          </p>
          <p>
            Jedes Buch hat ein eindeutiges Niveau: A1, A2 oder B1. Das Vokabular und die Grammatik sind streng kuratiert. Aber die Geschichten selbst — die sind so frei, wie sie sein können.
          </p>
          <p style={{ color: "var(--ink-soft)", fontStyle: "italic" }}>
            Wenn du eine Geschichte zu Ende liest und denkst „Ich habe das wirklich verstanden" — dann hat dieses Projekt seinen Zweck erfüllt.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
            {facts.map(f => (
              <div key={f.label}>
                <div className="mono mute" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{f.label}</div>
                <div className="serif" style={{ fontSize: 16, fontWeight: 500 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BELIEFS */}
      <section style={{ marginBottom: 64 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Wie ich darüber denke</div>
        <h2 className="h-section" style={{ marginBottom: 28, fontSize: 32 }}>Vier Überzeugungen</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {beliefs.map(b => (
            <div key={b.n} className="card" style={{ padding: 28 }}>
              <div className="mono mute" style={{ fontSize: 11, letterSpacing: "0.1em", marginBottom: 14 }}>{b.n}</div>
              <h3 className="serif" style={{ fontSize: 20, fontWeight: 500, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{b.title}</h3>
              <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKS TIMELINE */}
      <section style={{ marginBottom: 64 }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Bibliografie</div>
        <h2 className="h-section" style={{ marginBottom: 28, fontSize: 32 }}>Bücher in dieser Bibliothek</h2>
        <div className="card" style={{ padding: 0 }}>
          {allBooks.filter(b => !b.userAdded).map((b, i, arr) => (
            <a key={b.id} href={"#/book/" + b.id} style={{
              display: "grid",
              gridTemplateColumns: "80px 60px 1fr auto",
              gap: 20,
              padding: "18px 24px",
              borderBottom: i < arr.length - 1 ? "1px solid var(--line-soft)" : 0,
              alignItems: "center",
            }}>
              <span className="serif" style={{ fontSize: 22, color: "var(--ink-mute)", fontWeight: 400, letterSpacing: "-0.01em" }}>{b.year}</span>
              <Level value={b.level} />
              <div>
                <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>{b.title}</div>
                <div className="mute" style={{ fontSize: 12, marginTop: 2, fontStyle: "italic", fontFamily: "var(--font-serif)" }}>{b.subtitle}</div>
              </div>
              <span className="mute">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="card" style={{ padding: 36, marginBottom: 32, background: "var(--bg-soft)" }}>
        <h2 className="h-section" style={{ fontSize: 26, marginBottom: 10 }}>Schreib mir</h2>
        <p style={{ color: "var(--ink-soft)", margin: "0 0 18px", maxWidth: 540 }}>
          Hast du eine Frage, einen Vorschlag, oder einen Fehler gefunden? Ich antworte normalerweise innerhalb einer Woche.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <a href="mailto:andrew@bibliothek.de" className="btn btn-outline" style={{ justifyContent: "center" }}>andrew@bibliothek.de</a>
          <a href="#/donate" className="btn btn-primary" style={{ justifyContent: "center" }}>♥ {t.supportAuthor}</a>
        </div>
      </section>
    </div>
  );
};

window.About = About;
