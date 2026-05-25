// Donation page

// Donation channels — fill in the remaining values.
const DONATE_CONFIG = {
  usdtNetwork: "TRC20 (Tron)",
  usdtAddress: "TUwUrtU2pBrteanrQGU3VcsWszpLMLdANw",   // real
  torOnion: "",        // optional .onion mirror URL — leave "" to hide the Tor link
  boostyUrl: "",       // e.g. https://boosty.to/<name>  — leave "" to disable that card's button
  patreonUrl: "",      // e.g. https://www.patreon.com/<name> — leave "" to disable
};

const Donate = ({ lang, user }) => {
  const t = UI_STRINGS[lang];
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const copyAddress = async () => {
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(DONATE_CONFIG.usdtAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      setCopyFailed(true);
    }
  };

  const cardStyle = { padding: 28, marginTop: 20, display: "grid", gap: 12 };
  const headStyle = { fontSize: 22, margin: 0 };
  const descStyle = { fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6, margin: 0 };

  return (
    <div className="page-narrow">
      <div className="eyebrow" style={{ marginBottom: 14 }}>{t.supportAuthor}</div>
      <h1 className="h-display" style={{ fontSize: 56, marginBottom: 18 }}>
        {t.donateHeadline}
      </h1>
      <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: 620, lineHeight: 1.6 }}>
        {t.donateIntro}
      </p>

      {/* USDT (TRC20) */}
      <div className="card" style={cardStyle}>
        <h3 className="h-section" style={headStyle}>USDT (TRC20)</h3>
        <p style={descStyle}>{t.donateUsdtDesc}</p>

        <div className="spread" style={{ alignItems: "baseline", marginTop: 4 }}>
          <span className="mono mute" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {t.donateNetwork}
          </span>
          <span className="mono" style={{ fontSize: 13 }}>{DONATE_CONFIG.usdtNetwork}</span>
        </div>

        <div
          className="mono"
          style={{
            background: "var(--bg-soft)", border: "1px solid var(--line)", borderRadius: 6,
            padding: "12px 14px", fontSize: 13, wordBreak: "break-all", lineHeight: 1.5,
          }}
        >
          {DONATE_CONFIG.usdtAddress}
        </div>

        <div className="row" style={{ gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={copyAddress}>
            {copied ? t.donateCopied : t.donateCopy}
          </button>
          {DONATE_CONFIG.torOnion ? (
            <a
              className="btn btn-outline"
              href={DONATE_CONFIG.torOnion}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.donateViaTor}
            </a>
          ) : null}
        </div>

        {copyFailed ? (
          <div className="mute" style={{ fontSize: 13, color: "var(--brown)" }}>{t.donateCopyFail}</div>
        ) : null}

        {!DONATE_CONFIG.torOnion ? (
          <div className="mute" style={{ fontSize: 13 }}>{t.donateTorNote}</div>
        ) : null}
      </div>

      {/* Boosty */}
      <div className="card" style={cardStyle}>
        <h3 className="h-section" style={headStyle}>Boosty</h3>
        <p style={descStyle}>{t.donateBoostyDesc}</p>
        <div className="row">
          {DONATE_CONFIG.boostyUrl ? (
            <a
              className="btn btn-primary"
              href={DONATE_CONFIG.boostyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.donateOpen} →
            </a>
          ) : (
            <button className="btn btn-outline" disabled>{t.donateComingSoon}</button>
          )}
        </div>
      </div>

      {/* Patreon */}
      <div className="card" style={cardStyle}>
        <h3 className="h-section" style={headStyle}>Patreon</h3>
        <p style={descStyle}>{t.donatePatreonDesc}</p>
        <div className="row">
          {DONATE_CONFIG.patreonUrl ? (
            <a
              className="btn btn-primary"
              href={DONATE_CONFIG.patreonUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.donateOpen} →
            </a>
          ) : (
            <button className="btn btn-outline" disabled>{t.donateComingSoon}</button>
          )}
        </div>
      </div>

      {/* AUTHOR NOTE */}
      <div className="card" style={{ padding: 28, marginTop: 32, display: "grid", gridTemplateColumns: "auto 1fr", gap: 20, alignItems: "flex-start" }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "var(--brown)", color: "var(--paper)",
          display: "grid", placeItems: "center",
          fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 500,
        }}>AM</div>
        <div>
          <div className="mono mute" style={{ fontSize: 11, marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {t.donateNoteLabel}
          </div>
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
