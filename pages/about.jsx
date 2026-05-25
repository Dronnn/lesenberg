// About the author — expanded standalone page
const CONTACT_EMAIL = "contact@lesenberg.com";

const About = ({ lang, allBooks }) => {
  const t = UI_STRINGS[lang];

  const facts = [
    { label: t.aboutFactLives, value: "Hamburg" },
    { label: t.aboutFactWriting, value: "2019" },
    { label: t.aboutFactFont, value: "Source Serif" },
    { label: t.aboutFactBook, value: "Stoner" },
  ];

  const beliefs = [
    { n: "01", title: t.aboutBelief1Title, body: t.aboutBelief1Body },
    { n: "02", title: t.aboutBelief2Title, body: t.aboutBelief2Body },
    { n: "03", title: t.aboutBelief3Title, body: t.aboutBelief3Body },
    { n: "04", title: t.aboutBelief4Title, body: t.aboutBelief4Body },
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
            {t.aboutPhotoFollows}
          </div>
        </div>
        <div style={{ fontSize: 18, lineHeight: 1.65, color: "var(--ink)" }}>
          <p style={{ marginTop: 0 }}>
            {t.aboutBioP1}
          </p>
          <p>
            {t.aboutBioP2}
          </p>
          <p>
            {t.aboutBioP3}
          </p>
          <p style={{ color: "var(--ink-soft)", fontStyle: "italic" }}>
            {t.aboutBioP4}
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
        <div className="eyebrow" style={{ marginBottom: 14 }}>{t.aboutBeliefsEyebrow}</div>
        <h2 className="h-section" style={{ marginBottom: 28, fontSize: 32 }}>{t.aboutBeliefsTitle}</h2>
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
        <div className="eyebrow" style={{ marginBottom: 14 }}>{t.aboutBibliographyEyebrow}</div>
        <h2 className="h-section" style={{ marginBottom: 28, fontSize: 32 }}>{t.aboutBooksTitle}</h2>
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
        <h2 className="h-section" style={{ fontSize: 26, marginBottom: 10 }}>{t.aboutContactTitle}</h2>
        <p style={{ color: "var(--ink-soft)", margin: "0 0 18px", maxWidth: 540 }}>
          {t.aboutContactBody}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-outline" style={{ justifyContent: "center" }}>{CONTACT_EMAIL}</a>
          <a href="#/donate" className="btn btn-primary" style={{ justifyContent: "center" }}>♥ {t.supportAuthor}</a>
        </div>
      </section>
    </div>
  );
};

window.About = About;
