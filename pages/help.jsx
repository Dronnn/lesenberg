// Help / How-to-use page
const Help = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const [openFaq, setOpenFaq] = useState(0);

  const levels = [
    {
      lvl: "A1",
      label: t.levelBeginner,
      desc: t.helpA1Desc,
      features: [t.helpA1F1, t.helpA1F2, t.helpA1F3, t.helpA1F4],
      example: "Anna geht in den Park. Sie sieht einen kleinen Hund.",
    },
    {
      lvl: "A2",
      label: t.levelBasic,
      desc: t.helpA2Desc,
      features: [t.helpA2F1, t.helpA2F2, t.helpA2F3, t.helpA2F4],
      example: "Am Nachmittag kam der Zug an. Paul nahm seinen Koffer und ging zur Tür.",
    },
    {
      lvl: "B1",
      label: t.levelIntermediate,
      desc: t.helpB1Desc,
      features: [t.helpB1F1, t.helpB1F2, t.helpB1F3, t.helpB1F4],
      example: "Manche Türen, sagte sie endlich, soll man nicht öffnen.",
    },
    {
      lvl: "B2",
      label: t.levelUpperIntermediate,
      desc: t.helpB2Desc,
      features: [t.helpB2F1, t.helpB2F2, t.helpB2F3, t.helpB2F4],
      example: "Obwohl die Akten längst freigegeben waren, blieb die eigentliche Wahrheit zwischen den Zeilen verborgen.",
    },
  ];

  const steps = [
    { n: "01", title: t.helpStep1Title, desc: t.helpStep1Desc },
    { n: "02", title: t.helpStep2Title, desc: t.helpStep2Desc },
    { n: "03", title: t.helpStep3Title, desc: t.helpStep3Desc },
    { n: "04", title: t.helpStep4Title, desc: t.helpStep4Desc },
    { n: "05", title: t.helpStep5Title, desc: t.helpStep5Desc },
  ];

  const faqs = [
    { q: t.faqQ1, a: t.faqA1 },
    { q: t.faqQ2, a: t.faqA2 },
    { q: t.faqQ3, a: t.faqA3 },
    { q: t.faqQ4, a: t.faqA4 },
    { q: t.faqQ5, a: t.faqA5 },
    { q: t.faqQ6, a: t.faqA6 },
  ];

  return (
    <div className="page-narrow">
      <div className="eyebrow" style={{ marginBottom: 14 }}>{t.howTo}</div>
      <h1 className="h-display" style={{ fontSize: 56, marginBottom: 20 }}>
        {t.helpHeroEmA}<em>{t.helpHeroEm}</em>
      </h1>
      <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: 580, lineHeight: 1.6 }}>
        {t.helpLead}
      </p>

      {/* TAP DEMO */}
      <section style={{ marginTop: 56, marginBottom: 56 }}>
        <h2 className="h-section" style={{ marginBottom: 18 }}>{t.helpTryIt}</h2>
        <div className="card" style={{ padding: 36, fontFamily: "var(--font-serif)", fontSize: 22, lineHeight: 1.7 }}>
          <p style={{ margin: 0 }}>
            Anna <DemoWord word="geht" en="goes" ru="идёт" /> in den <DemoWord word="Park" en="park" ru="парк" />. Der <DemoWord word="Tag" en="day" ru="день" /> ist <DemoWord word="schön" en="beautiful" ru="красивый" /> und <DemoWord word="warm" en="warm" ru="тёплый" />.
          </p>
          <div className="mono mute" style={{ fontSize: 11, marginTop: 22, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            ↑ {t.helpTapHint}
          </div>
        </div>
      </section>

      {/* LEVELS */}
      <section style={{ marginBottom: 56 }}>
        <h2 className="h-section" style={{ marginBottom: 18 }}>{t.helpThreeLevels}</h2>
        <div style={{ display: "grid", gap: 12 }}>
          {levels.map(l => (
            <div key={l.lvl} className="card" style={{ padding: 24, display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: 24, alignItems: "flex-start" }}>
              <div>
                <Level value={l.lvl} />
                <div className="serif" style={{ fontSize: 18, fontWeight: 500, marginTop: 8 }}>{l.label}</div>
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, overflowWrap: "anywhere" }}>{l.desc}</p>
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
                minWidth: 0,
                background: "var(--bg-soft)", padding: 16, borderRadius: 4,
                borderLeft: "2px solid var(--brown)",
                fontFamily: "var(--font-serif)", fontStyle: "italic",
                fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5,
                overflowWrap: "anywhere",
              }}>
                {l.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section style={{ marginBottom: 56 }}>
        <h2 className="h-section" style={{ marginBottom: 24 }}>{t.helpFiveSteps}</h2>
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
        <h2 className="h-section" style={{ marginBottom: 18 }}>{t.helpWordStatesTitle}</h2>
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "18px 28px", alignItems: "center", fontFamily: "var(--font-serif)", fontSize: 18 }}>
            <span className="word">Tag</span>
            <span className="soft" style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>{t.helpWordNeutral}</span>
            <span className="word saved">Tag</span>
            <span className="soft" style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>{t.helpWordSaved}</span>
            <span className="word known">Tag</span>
            <span className="soft" style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>{t.helpWordKnown}</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ marginBottom: 56 }}>
        <h2 className="h-section" style={{ marginBottom: 18 }}>{t.helpFaqTitle}</h2>
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
        <h3 className="serif" style={{ fontSize: 28, fontWeight: 500, margin: "0 0 8px" }}>{t.helpCtaTitle}</h3>
        <p style={{ color: "rgba(244, 237, 224, 0.7)", margin: "0 0 22px" }}>{t.helpCtaSub}</p>
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
