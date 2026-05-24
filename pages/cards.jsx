// Card editor + phrase selection popup
// Renders the floating toolbar when user drag-selects text, and the full editor modal
// for adding context, custom translations, examples and notes to any saved card.

const HL_COLORS = ["yellow", "green", "pink", "blue"];

// ---------- SELECTION TOOLBAR (multi-word) ----------
const PhrasePop = ({ phrase, context, position, onClose, onSave, onOpenEditor }) => {
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const onEsc = (e) => { if (e.key === "Escape") onClose(); };
    setTimeout(() => document.addEventListener("mousedown", onDoc), 0);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  return (
    <div ref={ref} className="phrase-pop word-pop" style={{ left: position.x, top: position.y }}>
      <div className="pp-head">
        <span className="pp-kind">Auswahl · {phrase.split(/\s+/).length} Wörter</span>
        <button className="pp-close" onClick={onClose} aria-label="Schließen">×</button>
      </div>
      <div className="pp-phrase">„{phrase}"</div>
      {context && context !== phrase && (
        <div className="pp-context">…{context}…</div>
      )}
      <div className="pp-row">
        <span className="pp-label">Markieren</span>
        <div className="pp-colors">
          {HL_COLORS.map(c => (
            <button key={c} className={"sw " + c} title={c} onClick={() => onSave(c)}></button>
          ))}
        </div>
      </div>
      <div className="pp-actions">
        <button className="pp-btn ghost" onClick={onClose}>Abbrechen</button>
        <button className="pp-btn primary" onClick={() => onOpenEditor()}>Mit Notiz speichern →</button>
      </div>
    </div>
  );
};

// ---------- CARD EDITOR MODAL ----------
const CardEditor = ({ entryKey, initial, dictLookup, onSave, onDelete, onClose, lang }) => {
  const isPhrase = !!initial.isPhrase;
  const [phrase] = useState(initial.phrase || "");
  const [context, setContext] = useState(initial.context || "");
  const [customEn, setCustomEn] = useState(initial.customEn || "");
  const [customRu, setCustomRu] = useState(initial.customRu || "");
  const [note, setNote] = useState(initial.note || "");
  const [examples, setExamples] = useState(initial.examples && initial.examples.length ? initial.examples : [""]);
  const [color, setColor] = useState(initial.color || (initial.isPhrase ? "yellow" : null));

  const dict = !isPhrase ? dictLookup : null;

  const save = () => {
    onSave(entryKey, {
      phrase,
      isPhrase,
      context: context.trim(),
      customEn: customEn.trim(),
      customRu: customRu.trim(),
      note: note.trim(),
      examples: examples.map(e => e.trim()).filter(Boolean),
      color: color || initial.color || "yellow",
    });
    onClose();
  };

  const addExample = () => setExamples(prev => [...prev, ""]);
  const setExample = (i, v) => setExamples(prev => prev.map((e, k) => k === i ? v : e));
  const removeExample = (i) => setExamples(prev => prev.filter((_, k) => k !== i));

  return (
    <div className="modal-back" onClick={onClose}>
      <div className="modal card-editor" onClick={(e) => e.stopPropagation()}>
        <div className="ce-head">
          <div>
            <div className="eyebrow">{isPhrase ? "Phrase bearbeiten" : "Karteikarte bearbeiten"}</div>
            <h2 className="ce-phrase">{phrase}</h2>
            {dict && dict.pos && dict.pos !== "—" && (
              <div className="ce-dict">
                <span className="mono mute">{dict.pos}</span>
                {dict.lemma && dict.lemma !== phrase && <span className="mono mute"> · Grundform: {dict.lemma}</span>}
              </div>
            )}
          </div>
          <button className="ce-x" onClick={onClose} aria-label="Schließen">×</button>
        </div>

        <div className="ce-grid">
          {/* LEFT — context + note + examples */}
          <div className="ce-col">
            <div className="field">
              <label>Kontext <span className="mute">(Satz aus dem Buch)</span></label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder={isPhrase ? "Der Satz, in dem die Phrase vorkommt…" : "Der Satz, in dem das Wort vorkommt…"}
                rows={isPhrase ? 3 : 2}
              />
            </div>

            <div className="field">
              <label>Beispiele <span className="mute">(eigene Sätze)</span></label>
              {examples.map((ex, i) => (
                <div key={i} className="ce-example">
                  <span className="mono mute">{i + 1}.</span>
                  <input
                    value={ex}
                    onChange={(e) => setExample(i, e.target.value)}
                    placeholder="z.B. Ich gehe gern in den Park."
                  />
                  {examples.length > 1 && (
                    <button className="ce-rm" onClick={() => removeExample(i)} title="Entfernen">×</button>
                  )}
                </div>
              ))}
              <button className="ce-add" onClick={addExample}>+ Beispiel hinzufügen</button>
            </div>

            <div className="field">
              <label>Notiz</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Eselsbrücken, Grammatik, alles, was dir hilft…"
                rows={3}
              />
            </div>
          </div>

          {/* RIGHT — translations + color */}
          <div className="ce-col ce-side">
            {dict && (
              <div className="ce-auto">
                <div className="eyebrow">Wörterbuch</div>
                <div className="ce-auto-row"><span className="mono mute">EN</span><span>{dict.en || "—"}</span></div>
                <div className="ce-auto-row"><span className="mono mute">RU</span><span>{dict.ru || "—"}</span></div>
              </div>
            )}

            <div className="field">
              <label>Deine Übersetzung <span className="mono mute" style={{ marginLeft: 4 }}>EN</span></label>
              <input
                value={customEn}
                onChange={(e) => setCustomEn(e.target.value)}
                placeholder={dict?.en && dict.en !== "—" ? dict.en : "auf Englisch…"}
              />
            </div>
            <div className="field">
              <label>Deine Übersetzung <span className="mono mute" style={{ marginLeft: 4 }}>RU</span></label>
              <input
                value={customRu}
                onChange={(e) => setCustomRu(e.target.value)}
                placeholder={dict?.ru && dict.ru !== "—" ? dict.ru : "по-русски…"}
              />
            </div>

            <div className="field">
              <label>Farbe</label>
              <div className="ce-colors">
                {HL_COLORS.map(c => (
                  <button
                    key={c}
                    className={"sw " + c + (color === c ? " on" : "")}
                    onClick={() => setColor(c)}
                    title={c}
                  ></button>
                ))}
                <button
                  className={"sw clear" + (!color ? " on" : "")}
                  onClick={() => setColor(null)}
                  title="Keine Farbe"
                >×</button>
              </div>
            </div>
          </div>
        </div>

        <div className="ce-foot">
          <button className="btn btn-ghost" style={{ color: "var(--b1)" }} onClick={() => { onDelete(entryKey); onClose(); }}>Löschen</button>
          <div style={{ flex: 1 }}></div>
          <button className="btn btn-ghost" onClick={onClose}>Abbrechen</button>
          <button className="btn btn-primary" onClick={save}>Speichern</button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { PhrasePop, CardEditor, HL_COLORS });
