// Donation page
const Donate = ({ lang, user }) => {
  const t = UI_STRINGS[lang];
  const [amount, setAmount] = useState(10);
  const [custom, setCustom] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [step, setStep] = useState(1); // 1: amount, 2: payment, 3: thanks
  const [method, setMethod] = useState("card");

  const tiers = [
    { v: 3, label: "Ein Kaffee", desc: "Danke!" },
    { v: 10, label: "Ein Brötchen-Frühstück", desc: "Mein Favorit" },
    { v: 25, label: "Ein neues Buch", desc: "Hilft beim nächsten Roman" },
    { v: 100, label: "Mäzen", desc: "Großzügig — ganz herzlich" },
  ];

  const finalAmount = custom ? parseFloat(custom) || 0 : amount;

  if (step === 3) {
    return (
      <div className="page-narrow" style={{ textAlign: "center", paddingTop: 80 }}>
        <div style={{ fontSize: 64, color: "var(--gold)", marginBottom: 14 }}>♥</div>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Vielen Dank</div>
        <h1 className="h-display" style={{ fontSize: 56, marginBottom: 18 }}>
          <em>Danke</em>, {user?.name?.split(" ")[0] || "Leser"}.
        </h1>
        <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
          Deine Spende von <strong style={{ color: "var(--ink)" }}>€{finalAmount.toFixed(2)}</strong>{recurring ? " im Monat" : ""} hilft mir, weiter Geschichten in einfachem Deutsch zu schreiben.
        </p>
        <div className="row" style={{ justifyContent: "center", gap: 10, marginTop: 32 }}>
          <a href="#/library" className="btn btn-primary">{t.library} →</a>
          <a href="#/" className="btn btn-ghost">{t.home}</a>
        </div>
      </div>
    );
  }

  return (
    <div className="page-narrow">
      <div className="eyebrow" style={{ marginBottom: 14 }}>{t.supportAuthor}</div>
      <h1 className="h-display" style={{ fontSize: 56, marginBottom: 18 }}>
        Hilf mir, mehr<br /><em>Geschichten</em> zu schreiben.
      </h1>
      <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: 560, lineHeight: 1.6 }}>
        Diese Bibliothek ist kostenlos — und soll es bleiben. Wenn dir die Bücher helfen, freue ich mich über eine kleine Spende. Sie hilft mir, weiter zu schreiben und neue Niveaus aufzunehmen.
      </p>

      {/* PROGRESS BAR */}
      <div className="card" style={{ padding: 24, marginTop: 32 }}>
        <div className="spread" style={{ marginBottom: 10 }}>
          <span className="mono mute" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Nächstes Buch — B2</span>
          <span className="mono" style={{ fontSize: 12, letterSpacing: "0.04em" }}>€1.840 / €3.000</span>
        </div>
        <div className="bar" style={{ height: 6 }}><i style={{ width: "61%" }}></i></div>
        <div className="mute" style={{ fontSize: 12, marginTop: 8 }}>
          47 Leser haben bereits mitgeholfen. Bald geht das nächste Niveau in den Druck.
        </div>
      </div>

      {step === 1 && (
        <>
          {/* TIERS */}
          <div className="donate-tiers" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 32 }}>
            {tiers.map(tier => (
              <button key={tier.v} onClick={() => { setAmount(tier.v); setCustom(""); }} style={{
                background: amount === tier.v && !custom ? "var(--ink)" : "var(--paper)",
                color: amount === tier.v && !custom ? "var(--bg-soft)" : "var(--ink)",
                border: "1px solid " + (amount === tier.v && !custom ? "var(--ink)" : "var(--line)"),
                borderRadius: 6, padding: "20px 16px", textAlign: "left",
                cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit",
              }}>
                <div className="serif" style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em" }}>€{tier.v}</div>
                <div style={{ fontSize: 13, fontWeight: 500, marginTop: 6 }}>{tier.label}</div>
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4, fontStyle: "italic", fontFamily: "var(--font-serif)" }}>{tier.desc}</div>
              </button>
            ))}
          </div>

          {/* CUSTOM */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, marginTop: 16, alignItems: "center" }}>
            <div className="input" style={{ background: custom ? "var(--paper)" : "var(--bg-soft)" }}>
              <span className="serif" style={{ fontSize: 18, fontWeight: 500, color: "var(--ink-mute)" }}>€</span>
              <input
                type="number"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setAmount(0); }}
                placeholder="Eigener Betrag"
                min="1" max="10000"
              />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} />
              <span>Monatlich</span>
            </label>
          </div>

          <button className="btn btn-primary btn-lg"
            onClick={() => setStep(2)}
            disabled={finalAmount <= 0}
            style={{ marginTop: 28, width: "100%", justifyContent: "center", fontSize: 16 }}>
            ♥ €{finalAmount.toFixed(2)} {recurring ? "im Monat " : ""}spenden →
          </button>

          <div className="mute" style={{ fontSize: 12, textAlign: "center", marginTop: 12 }}>
            Sichere Zahlung. Keine Anmeldung nötig. Du kannst jederzeit kündigen.
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="card" style={{ padding: 28, marginTop: 32 }}>
            <div className="spread" style={{ marginBottom: 20 }}>
              <h3 className="h-section" style={{ fontSize: 22 }}>Bezahlung</h3>
              <button className="btn btn-ghost btn-sm" onClick={() => setStep(1)}>← Zurück</button>
            </div>

            <div className="donate-methods" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
              {[["card", "Karte"], ["paypal", "PayPal"], ["bank", "SEPA"]].map(([k, label]) => (
                <button key={k} onClick={() => setMethod(k)} style={{
                  padding: "12px 8px", borderRadius: 4,
                  border: "1px solid " + (method === k ? "var(--ink)" : "var(--line)"),
                  background: method === k ? "var(--bg-deep)" : "var(--paper)",
                  fontFamily: "inherit", fontSize: 13, fontWeight: 500, cursor: "pointer",
                }}>{label}</button>
              ))}
            </div>

            {method === "card" && (
              <>
                <div className="field">
                  <label>Karteninhaber</label>
                  <input defaultValue={user?.name || ""} placeholder="Anna Schmidt" />
                </div>
                <div className="field">
                  <label>Kartennummer</label>
                  <input placeholder="4242 4242 4242 4242" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div className="field">
                    <label>Gültig bis</label>
                    <input placeholder="MM / JJ" />
                  </div>
                  <div className="field">
                    <label>CVC</label>
                    <input placeholder="•••" />
                  </div>
                </div>
              </>
            )}

            {method === "paypal" && (
              <div style={{ padding: 32, textAlign: "center", background: "var(--bg-soft)", borderRadius: 4, color: "var(--ink-soft)" }}>
                Du wirst zu PayPal weitergeleitet, um die Zahlung abzuschließen.
              </div>
            )}

            {method === "bank" && (
              <>
                <div className="field">
                  <label>IBAN</label>
                  <input placeholder="DE89 3704 0044 0532 0130 00" />
                </div>
                <div className="field">
                  <label>Kontoinhaber</label>
                  <input defaultValue={user?.name || ""} placeholder="Anna Schmidt" />
                </div>
              </>
            )}

            <div className="spread" style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--line)" }}>
              <span style={{ fontSize: 14 }}>Gesamt</span>
              <span className="serif" style={{ fontSize: 28, fontWeight: 500 }}>€{finalAmount.toFixed(2)}{recurring ? <span style={{ fontSize: 14, color: "var(--ink-mute)" }}> / Monat</span> : null}</span>
            </div>

            <button className="btn btn-primary btn-lg"
              onClick={() => setStep(3)}
              style={{ marginTop: 18, width: "100%", justifyContent: "center" }}>
              Spende bestätigen →
            </button>
          </div>
        </>
      )}

      {/* AUTHOR NOTE */}
      <div className="card" style={{ padding: 28, marginTop: 32, display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "flex-start" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "var(--brown)", color: "var(--paper)",
          display: "grid", placeItems: "center",
          fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500,
        }}>AM</div>
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 16, lineHeight: 1.6, color: "var(--ink)" }}>
            „Jede Spende — auch eine kleine — bedeutet, dass jemand das hier wertvoll findet. Das gibt mir mehr Motivation, als ich sagen kann."
          </div>
          <div className="mono mute" style={{ fontSize: 11, marginTop: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            — Andrew Maier
          </div>
        </div>
      </div>
    </div>
  );
};

window.Donate = Donate;
