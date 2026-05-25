// die Deutsche Bibliothek — books & dictionary
// All content original. Written in simple German for learners.

// Accounts run client-side only; there is no backend. Flip this to true to bring back the
// sign-in / sign-up UI (the AuthModal, the header sign-in button and avatar dropdown).
const AUTH_ENABLED = false;

const UI_STRINGS = {
  de: {
    home: "Startseite",
    library: "Bibliothek",
    about: "Über",
    progress: "Fortschritt",
    continue: "Weiterlesen",
    startReading: "Lesen beginnen",
    sample: "Leseprobe",
    download: "Herunterladen",
    buy: "Kaufen",
    upload: "Buch hinzufügen",
    chapters: "Kapitel",
    vocabulary: "Wortschatz",
    quiz: "Quiz",
    minutes: "Min.",
    words: "Wörter",
    pages: "Seiten",
    by: "von",
    level: "Niveau",
    allLevels: "Alle Niveaus",
    search: "Suchen…",
    saved: "Gespeichert",
    finished: "Gelesen",
    markUnread: "als ungelesen markieren",
    inProgress: "Begonnen",
    notStarted: "Neu",
    streak: "Tage in Folge",
    learned: "gelernt",
    save: "Speichern",
    known: "Kann ich",
    chapter: "Kapitel",
    of: "von",
    next: "Weiter",
    prev: "Zurück",
    readerPrev: "Zurück",
    readerNext: "Weiter →",
    seeAll: "Alle ansehen",
    featured: "Empfohlen",
    newLevel: "Für diese Stufe",
    yourLibrary: "Deine Bibliothek",
    welcome: "Willkommen zurück",
    yourProgress: "Dein Fortschritt",
    booksFinished: "Bücher fertig",
    wordsLearned: "Wörter gelernt",
    minutesRead: "Minuten gelesen",
    nothingHere: "Noch keine Bücher gefunden.",
    addOwn: "Eigenes Buch hinzufügen",
    addOwnSub: "Lade einen Titel hoch, der in deiner Bibliothek erscheint.",
    title: "Titel",
    description: "Beschreibung",
    content: "Inhalt (eine Zeile pro Absatz)",
    cancel: "Abbrechen",
    add: "Hinzufügen",
    aboutAuthor: "Über den Autor",
    written: "Geschrieben in einfachem Deutsch von Andrew Maier.",
    signIn: "Anmelden",
    signUp: "Registrieren",
    signOut: "Abmelden",
    profile: "Profil",
    donate: "Spenden",
    help: "Hilfe",
    yourAccount: "Dein Konto",
    name: "Name",
    email: "E-Mail",
    password: "Passwort",
    welcomeBack: "Willkommen zurück",
    createAccount: "Konto erstellen",
    noAccount: "Noch kein Konto?",
    haveAccount: "Schon ein Konto?",
    continueAsGuest: "Als Gast weiterlesen",
    editProfile: "Profil bearbeiten",
    save: "Speichern",
    member: "Mitglied seit",
    howTo: "Wie funktioniert es?",
    supportAuthor: "Den Autor unterstützen",
    donateHeadline: "Hilf mir, mehr Geschichten zu schreiben.",
    donateIntro: "Diese Bibliothek ist kostenlos — und soll es bleiben. Wenn dir die Bücher beim Lernen helfen, freue ich mich über eine Spende. Sie gibt mir die Zeit, weiter zu schreiben und neue Niveaus aufzunehmen. Such dir einen der Wege unten aus.",
    donateUsdtDesc: "Direkt, ohne Mittelsmann. Netzwerk: TRC20 (Tron). Sende USDT an die Adresse unten.",
    donateNetwork: "Netzwerk",
    donateCopy: "Adresse kopieren",
    donateCopied: "Kopiert!",
    donateCopyFail: "Konnte nicht kopiert werden — bitte von Hand markieren.",
    donateTorNote: "Diese Adresse ist auch über das Tor-Netzwerk erreichbar, falls dir Privatsphäre wichtig ist.",
    donateViaTor: "Über Tor öffnen",
    donateBoostyDesc: "Monatliche Unterstützung über Boosty — mit Updates zu neuen Büchern.",
    donatePatreonDesc: "Werde Patron auf Patreon und begleite jedes neue Buch von Anfang an.",
    donateComingSoon: "Bald verfügbar",
    donateOpen: "Öffnen",
    donateNoteLabel: "Ein Wort vom Autor",
    yourData: "Deine Daten",
    backupTitle: "Sicherung & Wiederherstellung",
    backupDesc: "Dein Fortschritt, deine Karteikarten und Lesezeichen werden nur in diesem Browser gespeichert. Exportiere sie als Datei, um eine Kopie zu behalten oder sie auf ein anderes Gerät zu übertragen, und importiere sie, um sie wiederherzustellen.",
    exportData: "Exportieren",
    importData: "Importieren",
    importConfirm: "Dadurch werden alle Daten ersetzt, die zurzeit in diesem Browser gespeichert sind. Fortfahren?",
    importSuccess: "Deine Daten wurden wiederhergestellt.",
    importError: "Diese Sicherungsdatei konnte nicht gelesen werden.",
    // — general / shared —
    flashcards: "Karteikarten",
    menu: "Menü",
    close: "Schließen",
    edit: "Bearbeiten",
    delete: "Löschen",
    remove: "Entfernen",
    add2: "Hinzufügen",
    or: "oder",
    cover: "Cover",
    display: "Anzeige",
    loadingBooks: "Lade Bücher …",
    footerRights: "Alle Rechte vorbehalten.",
    bookNotFound: "Buch nicht gefunden.",
    chapterNotFound: "Kapitel nicht gefunden.",
    notTranslated: "Übersetzung entfernen",
    colorScheme: "Farbschema",
    themeLight: "Hell",
    themeDark: "Dunkel",
    themeSystem: "System",
    baseForm: "Grundform",
    editCard: "Karteikarte bearbeiten",
    // — home —
    heroTitleA: "Deutsch lernen, ",
    heroTitleEm: "indem",
    heroTitleB: " du Bücher liest.",
    heroLead: "Originale Geschichten in einfachem Deutsch — geschrieben für Anfänger und Fortgeschrittene. Jedes Wort lässt sich antippen. Übersetzung auf Englisch und Russisch.",
    statBooks: "Bücher",
    statLevels: "Niveaus",
    statWordsToRead: "Wörter zum Lesen",
    started: "Begonnen",
    authorBio: "Ich schreibe kurze Bücher in einfachem Deutsch. Jede Geschichte ist eine Stufe — kurze Sätze für Anfänger, längere für Fortgeschrittene. Was ich am liebsten lese, schreibe ich am liebsten: ruhige, kleine Welten mit warmem Licht.",
    // — library —
    bookSingular: "Buch",
    bookPlural: "Bücher",
    curatedBy: "kuratiert von A. Maier",
    librarian: "BIBLIOTHEKAR",
    librarianTooltip: "Du bist eingeloggt als Bibliothekar",
    libManagement: "Bibliotheksverwaltung",
    sourceFolder: "Quellordner",
    adminScanDesc: "Der Server scannt diesen Ordner beim Start. Jede Markdown-Datei wird ein Buch. Front-Matter (title, level, subtitle, theme) bestimmt Cover und Metadaten.",
    uploadFile: "Datei hochladen",
    entries: "Einträge",
    scannedAgo: "gescannt vor 2 Min.",
    statusDraft: "ENTWURF",
    statusPublished: "VERÖFFENTLICHT",
    hide: "Ausblenden",
    adminHint: "Lege eine .md-Datei in /books/ ab — sie erscheint beim nächsten Scan automatisch im Regal. Nutzer können nichts hochladen.",
    // — upload modal —
    titlePlaceholder: "Mein Buch",
    subtitlePlaceholder: "Untertitel",
    contentPlaceholder: "Anna ging in den Park…",
    chooseFile: "Datei wählen (.txt / .md)",
    uploaded: "Hochgeladen",
    customBook: "Eigenes Buch.",
    // — book detail —
    afterReading: "Nach dem Lesen",
    quizTeaser: "Teste nach jedem Kapitel die wichtigsten Wörter.",
    // — vocabulary quiz —
    vocabQuizTitle: "Wortschatz",
    quizPrompt: "Was bedeutet dieses Wort?",
    quizPerfect: "Hervorragend!",
    quizGood: "Gut gemacht!",
    quizTryAgain: "Lies das Kapitel noch einmal.",
    quizScore: "Ergebnis",
    quizRetry: "Nochmal",
    quizNextChapter: "Nächstes Kapitel",
    quizNotEnough: "Nicht genug Vokabeln in diesem Kapitel für ein Quiz.",
    testChapterWords: "Wörter testen",
    // — profile —
    pleaseSignIn: "Bitte melde dich an.",
    savedWordsEmpty: "Tippe Wörter im Reader an, um sie hier zu sammeln.",
    account: "Konto",
    // — auth —
    signInSub: "Setze dein Lesen fort.",
    signUpSub: "Speichere Fortschritt, Wörter und Notizen.",
    namePlaceholder: "Anna Schmidt",
    emailPlaceholder: "anna@beispiel.de",
    demo: "DEMO",
    asReader: "Als Leser",
    asLibrarian: "Als Bibliothekar",
    // — reader —
    bookmarks: "Lesezeichen",
    bookmarksEmpty: "Klicke auf das ⌘ Symbol neben einem Absatz, um ein Lesezeichen zu setzen.",
    paragraph: "¶",
    removeBookmark: "Lesezeichen entfernen",
    addBookmark: "Lesezeichen hinzufügen",
    wordsShort: "Wörter",
    highlightsHeading: "Markierungen",
    savedCount: "gespeichert",
    howToSave: "So speicherst du:",
    howToSaveTap: "Wort antippen für Übersetzung",
    howToSavePhrase: "Text markieren für Phrasen & Sätze",
    howToSaveEdit: "Bearbeiten ✎ für eigene Notizen",
    editNote: "Notiz bearbeiten",
    addNote: "Notiz hinzufügen",
    // — card editor / phrase pop —
    selection: "Auswahl",
    highlight: "Markieren",
    saveWithNote: "Mit Notiz speichern",
    editPhrase: "Phrase bearbeiten",
    dictionary: "Wörterbuch",
    contextLabel: "Kontext",
    contextHint: "(Satz aus dem Buch)",
    contextPlaceholderPhrase: "Der Satz, in dem die Phrase vorkommt…",
    contextPlaceholderWord: "Der Satz, in dem das Wort vorkommt…",
    examplesLabel: "Beispiele",
    examplesHint: "(eigene Sätze)",
    examplePlaceholder: "z.B. Ich gehe gern in den Park.",
    addExample: "Beispiel hinzufügen",
    noteLabel: "Notiz",
    notePlaceholder: "Eselsbrücken, Grammatik, alles, was dir hilft…",
    yourTranslation: "Deine Übersetzung",
    enPlaceholder: "auf Englisch…",
    ruPlaceholder: "по-русски…",
    color: "Farbe",
    noColor: "Keine Farbe",
    // — flashcards —
    allCards: "Alle",
    hard: "Schwer",
    flashContextLabel: "KONTEXT",
    flashExamplesLabel: "BEISPIELE",
    flashNoteLabel: "NOTIZ",
    clickToFlip: "klicken zum Umdrehen",
    learnedTag: "✓ gelernt",
    hardTag: "schwer",
    phraseTag: "PHRASE",
    noTranslationYet: "Noch keine Übersetzung.",
    addAction: "hinzufügen",
    allCardsLearned: "Alle Karten gelernt.",
    noHardWords: "Noch keine schweren Wörter.",
    nothingLearned: "Noch nichts gelernt.",
    nothingToLearn: "Noch keine Wörter zum Lernen.",
    allMasteredA: "Du hast",
    allMasteredB: "Wörter gemeistert. Wechsle zum Tab Gelernt, um Karten zurück in den Stapel zu legen.",
    markLearnedHint: "Markiere Karten mit „ich kann das“, um sie hier zu sammeln.",
    tapToSaveHint: "Tippe Wörter im Reader an, um sie zu speichern.",
    viewLearned: "Gelernte Karten ansehen",
    resetAll: "Alle zurücksetzen",
    skip: "überspringen",
    backToDeck: "↺ zurück zum Stapel",
    backToDeckTooltip: "Karte zurück in den Lernstapel legen",
    skipTooltip: "Weiter",
    hardActive: "✓ schwer",
    markHardTooltip: "Als schwer zu lernen markieren",
    iKnowThis: "ich kann das ✓",
    iKnowThisTooltip: "Ich kann das — aus dem Stapel nehmen",
    // — help —
    levelBeginner: "Anfänger",
    levelBasic: "Grundstufe",
    levelIntermediate: "Mittelstufe",
    levelUpperIntermediate: "Obere Mittelstufe",
    helpA1Desc: "Du beginnst gerade. Du kennst einfache Wörter: Hallo, Tag, Buch.",
    helpA2Desc: "Du verstehst Alltagsthemen. Du kannst über die Vergangenheit sprechen.",
    helpB1Desc: "Du liest fließend. Du verstehst auch, was zwischen den Zeilen steht.",
    helpB2Desc: "Anspruchsvolle Texte mit komplexer Grammatik, abstrakten Themen und literarischem Stil. Längere Erzählungen verstehst du fast mühelos.",
    helpA1F1: "Kurze Sätze",
    helpA1F2: "Viel Wiederholung",
    helpA1F3: "Präsens",
    helpA1F4: "1.500–2.000 Wörter pro Buch",
    helpA2F1: "Mehrere Zeitformen",
    helpA2F2: "Längere Sätze",
    helpA2F3: "Dialoge",
    helpA2F4: "2.500–4.000 Wörter pro Buch",
    helpB1F1: "Komplexe Sätze",
    helpB1F2: "Nebensätze",
    helpB1F3: "Idiome",
    helpB1F4: "6.000–8.000 Wörter pro Buch",
    helpB2F1: "Komplexe Satzgefüge und Nebensätze",
    helpB2F2: "Abstrakte und literarische Themen",
    helpB2F3: "Idiomatische Wendungen",
    helpB2F4: "10.000+ Wörter pro Buch",
    helpStep1Title: "Wähle ein Buch",
    helpStep1Desc: "Filtere in der Bibliothek nach deinem Niveau. Beginne mit A1, wenn du unsicher bist — du kannst jederzeit wechseln.",
    helpStep2Title: "Tippe auf jedes Wort",
    helpStep2Desc: "Im Reader öffnet ein Tap auf jedes Wort eine Übersetzung — auf Englisch und Russisch. Du kannst Wörter speichern oder als „gekannt“ markieren.",
    helpStep3Title: "Lerne mit Karteikarten",
    helpStep3Desc: "Deine gespeicherten Wörter werden zu Karteikarten. Drehe sie um — sieh die Übersetzung — und wiederhole, bis du sie kennst.",
    helpStep4Title: "Verstehe mit Quizzen",
    helpStep4Desc: "Nach jedem Buch gibt es ein kurzes Quiz. Drei Fragen — schnell und konkret.",
    helpStep5Title: "Bleibe dran",
    helpStep5Desc: "Schon zehn Minuten am Tag genügen. Dein Streak wächst, und mit ihm dein Wortschatz.",
    faqQ1: "Brauche ich ein Konto?",
    faqA1: "Nein. Du kannst alles ohne Anmeldung lesen. Wenn du dich anmeldest, wird dein Fortschritt zwischen Geräten synchronisiert.",
    faqQ2: "Kann ich eigene Bücher hochladen?",
    faqA2: "Nein — die Bibliothek ist eine kuratierte Sammlung. Andrew Maier schreibt die Bücher und pflegt das Regal. Wenn du eine Idee oder einen Wunsch hast, schreib mir gerne über die Spenden-Seite.",
    faqQ3: "Sind die Übersetzungen automatisch?",
    faqA3: "Die wichtigsten Wörter sind handgepflegt. Bei selteneren Wörtern siehst du eventuell „—“ — dann hilft dir ein Online-Wörterbuch.",
    faqQ4: "Was bedeuten die Farben der Wörter?",
    faqA4: "Unterstrichen gelb = gespeichert (du willst es lernen). Grau und blass = du hast es als „gekannt“ markiert. Schwarz = neutral.",
    faqQ5: "Wie viel kosten die Bücher?",
    faqA5: "Nichts. Die Bibliothek ist kostenlos. Wenn du das Projekt unterstützen willst, freue ich mich über eine Spende.",
    faqQ6: "Auf welchen Geräten funktioniert das?",
    faqA6: "Im Browser — auf Telefon, Tablet und Computer. Es gibt keine App, die du installieren musst.",
    helpHeroEmA: "Lies. Tippe. ",
    helpHeroEm: "Lerne.",
    helpLead: "Diese Bibliothek funktioniert anders als die meisten Sprachlern-Apps. Du liest echte Geschichten — nicht isolierte Wörter. Hier ist, wie das geht.",
    helpTryIt: "Probier es selbst",
    helpTapHint: "↑ Tippe ein unterstrichenes Wort an",
    helpThreeLevels: "Die Niveaus",
    helpFiveSteps: "In fünf Schritten",
    helpWordStatesTitle: "Was die Wörter dir sagen",
    helpWordNeutral: "Neutral — du hast es noch nicht angesehen",
    helpWordSaved: "Gespeichert — kommt in deine Karteikarten",
    helpWordKnown: "Gekannt — wird beim nächsten Mal abgeblendet",
    helpFaqTitle: "Häufige Fragen",
    helpCtaTitle: "Bereit?",
    helpCtaSub: "Beginne mit einem A1-Buch. Es dauert zehn Minuten.",
    // — about —
    aboutFactLives: "Lebt in",
    aboutFactWriting: "Schreibt seit",
    aboutFactFont: "Lieblingsfont",
    aboutFactBook: "Lieblingsbuch",
    aboutFactBookValue: "alles von Stephen King",
    aboutBelief1Title: "Verständnis kommt vor Grammatik",
    aboutBelief1Body: "Du lernst eine Sprache, indem du sie verstehst. Grammatik kann warten — zuerst muss das Lesen sich gut anfühlen.",
    aboutBelief2Title: "Einfach ist nicht langweilig",
    aboutBelief2Body: "A1-Sätze müssen nicht kindisch sein. Eine kurze Zeile kann eine ganze Stimmung tragen. Hemingway hat das schon gewusst.",
    aboutBelief3Title: "Wiederholung ist Magie",
    aboutBelief3Body: "Wenn dasselbe Wort fünfzehnmal in zehn Minuten erscheint, bleibst du nicht stehen — du lernst es nebenbei.",
    aboutBelief4Title: "Übersetzung ist Hilfsrad",
    aboutBelief4Body: "Sie soll nah sein, schnell, und dann wieder verschwinden. Nicht ablenken. Nicht erklären.",
    aboutPhotoFollows: "Foto folgt — bis dahin das Monogramm.",
    aboutBioP1: "Ich heiße Andrew. Ich bin Autor und vor langer Zeit war ich selbst Deutschschüler. Damals habe ich gefühlt, was alle Anfänger fühlen: Lehrbücher sind oft trocken, und richtige Bücher sind zu früh zu schwer.",
    aboutBioP2: "Also schreibe ich genau die Art von Büchern, die ich damals brauchte. Geschichten in einfachem Deutsch — kurz und gut. Niemals herablassend. Mit Figuren, die man wirklich kennen lernt.",
    aboutBioP3: "Jedes Buch hat ein eindeutiges Niveau: A1, A2 oder B1. Das Vokabular und die Grammatik sind streng kuratiert. Aber die Geschichten selbst — die sind so frei, wie sie sein können.",
    aboutBioP4: "Wenn du eine Geschichte zu Ende liest und denkst „Ich habe das wirklich verstanden“ — dann hat dieses Projekt seinen Zweck erfüllt.",
    aboutBeliefsEyebrow: "Wie ich darüber denke",
    aboutBeliefsTitle: "Vier Überzeugungen",
    aboutBibliographyEyebrow: "Bibliografie",
    aboutBooksTitle: "Bücher in dieser Bibliothek",
    booksDisclaimer: "Die Bücher dieser Bibliothek wurden zu einem einzigen Zweck geschrieben: zum Lesen und zum Deutschlernen. Sie sind keine Nachschlagewerke, verfolgen keine andere Absicht und können Fehler enthalten.",
    aboutContactTitle: "Schreib mir",
    aboutContactBody: "Hast du eine Frage, einen Vorschlag, oder einen Fehler gefunden? Ich antworte normalerweise innerhalb einer Woche.",
    // — progress —
    last30Days: "Letzte 30 Tage",
    daysAgo30: "vor 30 Tagen",
    less: "weniger",
    more: "mehr",
    today: "heute",
    booksHeading: "Bücher",
  },
  en: {
    home: "Home",
    library: "Library",
    about: "About",
    progress: "Progress",
    continue: "Continue reading",
    startReading: "Start reading",
    sample: "Sample chapter",
    download: "Download",
    buy: "Buy",
    upload: "Add book",
    chapters: "Chapters",
    vocabulary: "Vocabulary",
    quiz: "Quiz",
    minutes: "min",
    words: "words",
    pages: "pages",
    by: "by",
    level: "Level",
    allLevels: "All levels",
    search: "Search…",
    saved: "Saved",
    finished: "Finished",
    markUnread: "mark as unread",
    inProgress: "In progress",
    notStarted: "New",
    streak: "day streak",
    learned: "learned",
    save: "Save",
    known: "Know it",
    chapter: "Chapter",
    of: "of",
    next: "Next",
    prev: "Previous",
    readerPrev: "← Previous",
    readerNext: "Next →",
    seeAll: "See all",
    featured: "Featured",
    newLevel: "For your level",
    yourLibrary: "Your library",
    welcome: "Welcome back",
    yourProgress: "Your progress",
    booksFinished: "Books finished",
    wordsLearned: "Words learned",
    minutesRead: "Minutes read",
    nothingHere: "No books found.",
    addOwn: "Add your own book",
    addOwnSub: "Upload a title and it will appear in your library.",
    title: "Title",
    description: "Description",
    content: "Content (one paragraph per line)",
    cancel: "Cancel",
    add: "Add",
    aboutAuthor: "About the author",
    written: "Written in simple German by Andrew Maier.",
    signIn: "Sign in",
    signUp: "Sign up",
    signOut: "Sign out",
    profile: "Profile",
    donate: "Donate",
    help: "Help",
    yourAccount: "Your account",
    name: "Name",
    email: "Email",
    password: "Password",
    welcomeBack: "Welcome back",
    createAccount: "Create account",
    noAccount: "No account yet?",
    haveAccount: "Already have an account?",
    continueAsGuest: "Continue as guest",
    editProfile: "Edit profile",
    save: "Save",
    member: "Member since",
    howTo: "How it works",
    supportAuthor: "Support the author",
    donateHeadline: "Help me write more stories.",
    donateIntro: "This library is free — and it will stay that way. If the books help you learn, I'd be grateful for a donation. It gives me the time to keep writing and to add new levels. Pick whichever way works for you below.",
    donateUsdtDesc: "Direct, no middleman. Network: TRC20 (Tron). Send USDT to the address below.",
    donateNetwork: "Network",
    donateCopy: "Copy address",
    donateCopied: "Copied!",
    donateCopyFail: "Couldn't copy — please select it by hand.",
    donateTorNote: "This address is also reachable over the Tor network if privacy matters to you.",
    donateViaTor: "Open via Tor",
    donateBoostyDesc: "Monthly support through Boosty — with updates on new books.",
    donatePatreonDesc: "Become a patron on Patreon and follow each new book from the start.",
    donateComingSoon: "Coming soon",
    donateOpen: "Open",
    donateNoteLabel: "A word from the author",
    yourData: "Your data",
    backupTitle: "Backup & Restore",
    backupDesc: "Your progress, flashcards and bookmarks are saved only in this browser. Export them to a file to keep a copy or move them to another device, and import to restore.",
    exportData: "Export",
    importData: "Import",
    importConfirm: "This will replace all data currently saved in this browser. Continue?",
    importSuccess: "Your data has been restored.",
    importError: "Could not read this backup file.",
    // — general / shared —
    flashcards: "Flashcards",
    menu: "Menu",
    close: "Close",
    edit: "Edit",
    delete: "Delete",
    remove: "Remove",
    add2: "Add",
    or: "or",
    cover: "Cover",
    display: "Display",
    loadingBooks: "Loading books …",
    footerRights: "All rights reserved.",
    bookNotFound: "Book not found.",
    chapterNotFound: "Chapter not found.",
    notTranslated: "Remove highlight",
    colorScheme: "Color scheme",
    themeLight: "Light",
    themeDark: "Dark",
    themeSystem: "System",
    baseForm: "Base form",
    editCard: "Edit flashcard",
    // — home —
    heroTitleA: "Learn German ",
    heroTitleEm: "by",
    heroTitleB: " reading books.",
    heroLead: "Original stories in simple German — written for beginners and advanced learners. Every word is tappable. Translations into English and Russian.",
    statBooks: "Books",
    statLevels: "Levels",
    statWordsToRead: "Words to read",
    started: "Started",
    authorBio: "I write short books in simple German. Each story is a level — short sentences for beginners, longer ones for advanced readers. What I most love to read is what I most love to write: quiet little worlds with warm light.",
    // — library —
    bookSingular: "book",
    bookPlural: "books",
    curatedBy: "curated by A. Maier",
    librarian: "LIBRARIAN",
    librarianTooltip: "You are signed in as the librarian",
    libManagement: "Library management",
    sourceFolder: "Source folder",
    adminScanDesc: "The server scans this folder on startup. Each Markdown file becomes a book. Front matter (title, level, subtitle, theme) defines the cover and metadata.",
    uploadFile: "Upload file",
    entries: "entries",
    scannedAgo: "scanned 2 min ago",
    statusDraft: "DRAFT",
    statusPublished: "PUBLISHED",
    hide: "Hide",
    adminHint: "Drop a .md file into /books/ — it appears on the shelf automatically at the next scan. Users cannot upload anything.",
    // — upload modal —
    titlePlaceholder: "My book",
    subtitlePlaceholder: "Subtitle",
    contentPlaceholder: "Anna went to the park…",
    chooseFile: "Choose file (.txt / .md)",
    uploaded: "Uploaded",
    customBook: "Custom book.",
    // — book detail —
    afterReading: "After reading",
    quizTeaser: "Test the key words after every chapter.",
    // — vocabulary quiz —
    vocabQuizTitle: "Vocabulary",
    quizPrompt: "What does this word mean?",
    quizPerfect: "Excellent!",
    quizGood: "Well done!",
    quizTryAgain: "Read the chapter again.",
    quizScore: "Score",
    quizRetry: "Try again",
    quizNextChapter: "Next chapter",
    quizNotEnough: "Not enough vocabulary in this chapter for a quiz.",
    testChapterWords: "Test the words",
    // — profile —
    pleaseSignIn: "Please sign in.",
    savedWordsEmpty: "Tap words in the reader to collect them here.",
    account: "Account",
    // — auth —
    signInSub: "Pick up where you left off.",
    signUpSub: "Save your progress, words and notes.",
    namePlaceholder: "Anna Schmidt",
    emailPlaceholder: "anna@beispiel.de",
    demo: "DEMO",
    asReader: "As reader",
    asLibrarian: "As librarian",
    // — reader —
    bookmarks: "Bookmarks",
    bookmarksEmpty: "Click the ⌘ icon next to a paragraph to add a bookmark.",
    paragraph: "¶",
    removeBookmark: "Remove bookmark",
    addBookmark: "Add bookmark",
    wordsShort: "words",
    highlightsHeading: "Highlights",
    savedCount: "saved",
    howToSave: "How to save:",
    howToSaveTap: "Tap a word for its translation",
    howToSavePhrase: "Select text for phrases & sentences",
    howToSaveEdit: "Edit ✎ for your own notes",
    editNote: "Edit note",
    addNote: "Add note",
    // — card editor / phrase pop —
    selection: "Selection",
    highlight: "Highlight",
    saveWithNote: "Save with note",
    editPhrase: "Edit phrase",
    dictionary: "Dictionary",
    contextLabel: "Context",
    contextHint: "(sentence from the book)",
    contextPlaceholderPhrase: "The sentence the phrase appears in…",
    contextPlaceholderWord: "The sentence the word appears in…",
    examplesLabel: "Examples",
    examplesHint: "(your own sentences)",
    examplePlaceholder: "e.g. I like going to the park.",
    addExample: "Add example",
    noteLabel: "Note",
    notePlaceholder: "Mnemonics, grammar, anything that helps you…",
    yourTranslation: "Your translation",
    enPlaceholder: "in English…",
    ruPlaceholder: "in Russian…",
    color: "Color",
    noColor: "No color",
    // — flashcards —
    allCards: "All",
    hard: "Hard",
    flashContextLabel: "CONTEXT",
    flashExamplesLabel: "EXAMPLES",
    flashNoteLabel: "NOTE",
    clickToFlip: "click to flip",
    learnedTag: "✓ learned",
    hardTag: "hard",
    phraseTag: "PHRASE",
    noTranslationYet: "No translation yet.",
    addAction: "add",
    allCardsLearned: "All cards learned.",
    noHardWords: "No hard words yet.",
    nothingLearned: "Nothing learned yet.",
    nothingToLearn: "No words to learn yet.",
    allMasteredA: "You have mastered",
    allMasteredB: "words. Switch to the Learned tab to put cards back into the deck.",
    markLearnedHint: "Mark cards with “I know this” to collect them here.",
    tapToSaveHint: "Tap words in the reader to save them.",
    viewLearned: "View learned cards",
    resetAll: "Reset all",
    skip: "skip",
    backToDeck: "↺ back to deck",
    backToDeckTooltip: "Put the card back into the learning deck",
    skipTooltip: "Next",
    hardActive: "✓ hard",
    markHardTooltip: "Mark as hard to learn",
    iKnowThis: "I know this ✓",
    iKnowThisTooltip: "I know this — take it out of the deck",
    // — help —
    levelBeginner: "Beginner",
    levelBasic: "Elementary",
    levelIntermediate: "Intermediate",
    levelUpperIntermediate: "Upper intermediate",
    helpA1Desc: "You're just starting out. You know simple words: hello, day, book.",
    helpA2Desc: "You understand everyday topics. You can talk about the past.",
    helpB1Desc: "You read fluently. You also understand what's between the lines.",
    helpB2Desc: "Demanding texts with complex grammar, abstract topics and a literary style. You follow longer narratives almost effortlessly.",
    helpA1F1: "Short sentences",
    helpA1F2: "Lots of repetition",
    helpA1F3: "Present tense",
    helpA1F4: "1,500–2,000 words per book",
    helpA2F1: "Several tenses",
    helpA2F2: "Longer sentences",
    helpA2F3: "Dialogues",
    helpA2F4: "2,500–4,000 words per book",
    helpB1F1: "Complex sentences",
    helpB1F2: "Subordinate clauses",
    helpB1F3: "Idioms",
    helpB1F4: "6,000–8,000 words per book",
    helpB2F1: "Complex clauses and subordination",
    helpB2F2: "Abstract and literary themes",
    helpB2F3: "Idiomatic expressions",
    helpB2F4: "10,000+ words per book",
    helpStep1Title: "Choose a book",
    helpStep1Desc: "Filter the library by your level. Start with A1 if you're unsure — you can switch any time.",
    helpStep2Title: "Tap every word",
    helpStep2Desc: "In the reader, a tap on any word opens a translation — into English and Russian. You can save words or mark them as “known”.",
    helpStep3Title: "Learn with flashcards",
    helpStep3Desc: "Your saved words become flashcards. Flip them over — see the translation — and repeat until you know them.",
    helpStep4Title: "Check yourself with quizzes",
    helpStep4Desc: "After each book there's a short quiz. Three questions — quick and concrete.",
    helpStep5Title: "Keep at it",
    helpStep5Desc: "Even ten minutes a day is enough. Your streak grows, and your vocabulary with it.",
    faqQ1: "Do I need an account?",
    faqA1: "No. You can read everything without signing up. If you do sign in, your progress syncs between devices.",
    faqQ2: "Can I upload my own books?",
    faqA2: "No — the library is a curated collection. Andrew Maier writes the books and tends the shelf. If you have an idea or a request, feel free to write to me via the donation page.",
    faqQ3: "Are the translations automatic?",
    faqA3: "The most important words are maintained by hand. For rarer words you may see a “—” — then an online dictionary will help.",
    faqQ4: "What do the word colors mean?",
    faqA4: "Underlined yellow = saved (you want to learn it). Gray and faded = you've marked it as “known”. Black = neutral.",
    faqQ5: "How much do the books cost?",
    faqA5: "Nothing. The library is free. If you'd like to support the project, a donation is always welcome.",
    faqQ6: "Which devices does this work on?",
    faqA6: "In the browser — on phone, tablet and computer. There's no app to install.",
    helpHeroEmA: "Read. Tap. ",
    helpHeroEm: "Learn.",
    helpLead: "This library works differently from most language-learning apps. You read real stories — not isolated words. Here's how it works.",
    helpTryIt: "Try it yourself",
    helpTapHint: "↑ Tap an underlined word",
    helpThreeLevels: "The levels",
    helpFiveSteps: "In five steps",
    helpWordStatesTitle: "What the words tell you",
    helpWordNeutral: "Neutral — you haven't looked at it yet",
    helpWordSaved: "Saved — goes into your flashcards",
    helpWordKnown: "Known — fades out next time",
    helpFaqTitle: "Frequently asked questions",
    helpCtaTitle: "Ready?",
    helpCtaSub: "Start with an A1 book. It takes ten minutes.",
    // — about —
    aboutFactLives: "Lives in",
    aboutFactWriting: "Writing since",
    aboutFactFont: "Favorite font",
    aboutFactBook: "Favorite book",
    aboutFactBookValue: "everything by Stephen King",
    aboutBelief1Title: "Understanding comes before grammar",
    aboutBelief1Body: "You learn a language by understanding it. Grammar can wait — first the reading has to feel good.",
    aboutBelief2Title: "Simple isn't boring",
    aboutBelief2Body: "A1 sentences don't have to be childish. A short line can carry a whole mood. Hemingway already knew that.",
    aboutBelief3Title: "Repetition is magic",
    aboutBelief3Body: "When the same word appears fifteen times in ten minutes, you don't get stuck — you learn it in passing.",
    aboutBelief4Title: "Translation is a training wheel",
    aboutBelief4Body: "It should be close, fast, and then disappear again. Not distract. Not explain.",
    aboutPhotoFollows: "Photo to come — until then, the monogram.",
    aboutBioP1: "My name is Andrew. I'm a writer, and long ago I was a German learner myself. Back then I felt what every beginner feels: textbooks are often dry, and real books are too hard too soon.",
    aboutBioP2: "So I write exactly the kind of books I needed back then. Stories in simple German — short and good. Never condescending. With characters you really get to know.",
    aboutBioP3: "Every book has a clear level: A1, A2 or B1. The vocabulary and grammar are strictly curated. But the stories themselves — those are as free as they can be.",
    aboutBioP4: "When you finish a story and think “I really understood that” — then this project has done its job.",
    aboutBeliefsEyebrow: "How I think about it",
    aboutBeliefsTitle: "Four convictions",
    aboutBibliographyEyebrow: "Bibliography",
    aboutBooksTitle: "Books in this library",
    booksDisclaimer: "The books in this library were written for a single purpose — reading practice and learning German. They are not reference works, pursue no other intent, and may contain mistakes.",
    aboutContactTitle: "Write to me",
    aboutContactBody: "Have a question, a suggestion, or found a mistake? I usually reply within a week.",
    // — progress —
    last30Days: "Last 30 days",
    daysAgo30: "30 days ago",
    less: "less",
    more: "more",
    today: "today",
    booksHeading: "Books",
  },
  ru: {
    home: "Главная",
    library: "Библиотека",
    about: "Об авторе",
    progress: "Прогресс",
    continue: "Продолжить",
    startReading: "Начать читать",
    sample: "Образец",
    download: "Скачать",
    buy: "Купить",
    upload: "Добавить книгу",
    chapters: "Главы",
    vocabulary: "Словарь",
    quiz: "Тест",
    minutes: "мин",
    words: "слов",
    pages: "стр.",
    by: "автор",
    level: "Уровень",
    allLevels: "Все уровни",
    search: "Поиск…",
    saved: "Сохранено",
    finished: "Прочитано",
    markUnread: "отметить непрочитанным",
    inProgress: "В процессе",
    notStarted: "Новое",
    streak: "дней подряд",
    learned: "выучено",
    save: "Сохранить",
    known: "Знаю",
    chapter: "Глава",
    of: "из",
    next: "Дальше",
    prev: "Назад",
    readerPrev: "← Назад",
    readerNext: "Дальше →",
    seeAll: "Все",
    featured: "Рекомендуемое",
    newLevel: "Для твоего уровня",
    yourLibrary: "Твоя библиотека",
    welcome: "С возвращением",
    yourProgress: "Твой прогресс",
    booksFinished: "Книг прочитано",
    wordsLearned: "Слов выучено",
    minutesRead: "Минут чтения",
    nothingHere: "Книг не найдено.",
    addOwn: "Добавить свою книгу",
    addOwnSub: "Загрузи название — оно появится в библиотеке.",
    title: "Название",
    description: "Описание",
    content: "Текст (по абзацу на строку)",
    cancel: "Отмена",
    add: "Добавить",
    aboutAuthor: "Об авторе",
    written: "Написано на простом немецком языке Эндрю Майером.",
    signIn: "Войти",
    signUp: "Регистрация",
    signOut: "Выйти",
    profile: "Профиль",
    donate: "Поддержать",
    help: "Помощь",
    yourAccount: "Твой аккаунт",
    name: "Имя",
    email: "Эл. почта",
    password: "Пароль",
    welcomeBack: "С возвращением",
    createAccount: "Создать аккаунт",
    noAccount: "Нет аккаунта?",
    haveAccount: "Уже есть аккаунт?",
    continueAsGuest: "Продолжить как гость",
    editProfile: "Изменить профиль",
    save: "Сохранить",
    member: "Участник с",
    howTo: "Как это работает",
    supportAuthor: "Поддержать автора",
    donateHeadline: "Помоги мне писать больше историй.",
    donateIntro: "Эта библиотека бесплатна — и останется такой. Если книги помогают тебе учиться, я буду благодарен за пожертвование. Оно даёт мне время писать дальше и добавлять новые уровни. Выбери любой удобный способ ниже.",
    donateUsdtDesc: "Напрямую, без посредников. Сеть: TRC20 (Tron). Отправь USDT на адрес ниже.",
    donateNetwork: "Сеть",
    donateCopy: "Скопировать адрес",
    donateCopied: "Скопировано!",
    donateCopyFail: "Не удалось скопировать — выдели вручную.",
    donateTorNote: "Этот адрес доступен и через сеть Tor, если для тебя важна приватность.",
    donateViaTor: "Открыть через Tor",
    donateBoostyDesc: "Ежемесячная поддержка через Boosty — с новостями о новых книгах.",
    donatePatreonDesc: "Стань патроном на Patreon и следи за каждой новой книгой с самого начала.",
    donateComingSoon: "Скоро",
    donateOpen: "Открыть",
    donateNoteLabel: "Слово от автора",
    yourData: "Твои данные",
    backupTitle: "Резервная копия",
    backupDesc: "Твой прогресс, карточки и закладки хранятся только в этом браузере. Экспортируй их в файл, чтобы сохранить копию или перенести на другое устройство, а импорт восстановит данные.",
    exportData: "Экспорт",
    importData: "Импорт",
    importConfirm: "Это заменит все данные, сохранённые сейчас в этом браузере. Продолжить?",
    importSuccess: "Твои данные восстановлены.",
    importError: "Не удалось прочитать этот файл резервной копии.",
    // — general / shared —
    flashcards: "Карточки",
    menu: "Меню",
    close: "Закрыть",
    edit: "Изменить",
    delete: "Удалить",
    remove: "Убрать",
    add2: "Добавить",
    or: "или",
    cover: "Обложка",
    display: "Отображение",
    loadingBooks: "Загружаю книги …",
    footerRights: "Все права защищены.",
    bookNotFound: "Книга не найдена.",
    chapterNotFound: "Глава не найдена.",
    notTranslated: "Убрать выделение",
    colorScheme: "Цветовая схема",
    themeLight: "Светлая",
    themeDark: "Тёмная",
    themeSystem: "Система",
    baseForm: "Начальная форма",
    editCard: "Изменить карточку",
    // — home —
    heroTitleA: "Учи немецкий, ",
    heroTitleEm: "читая",
    heroTitleB: " книги.",
    heroLead: "Оригинальные истории на простом немецком — для начинающих и продолжающих. По любому слову можно нажать. Перевод на английский и русский.",
    statBooks: "Книг",
    statLevels: "Уровней",
    statWordsToRead: "Слов для чтения",
    started: "Начато",
    authorBio: "Я пишу короткие книги на простом немецком. Каждая история — это уровень: короткие фразы для начинающих, длиннее — для продолжающих. Что больше всего люблю читать, то и пишу: тихие маленькие миры с тёплым светом.",
    // — library —
    bookSingular: "книга",
    bookPlural: "книг",
    curatedBy: "подборка А. Майера",
    librarian: "БИБЛИОТЕКАРЬ",
    librarianTooltip: "Ты вошёл как библиотекарь",
    libManagement: "Управление библиотекой",
    sourceFolder: "Исходная папка",
    adminScanDesc: "Сервер сканирует эту папку при запуске. Каждый файл Markdown становится книгой. Front matter (title, level, subtitle, theme) задаёт обложку и метаданные.",
    uploadFile: "Загрузить файл",
    entries: "записей",
    scannedAgo: "просканировано 2 мин назад",
    statusDraft: "ЧЕРНОВИК",
    statusPublished: "ОПУБЛИКОВАНО",
    hide: "Скрыть",
    adminHint: "Положи файл .md в /books/ — он появится на полке автоматически при следующем сканировании. Пользователи ничего загружать не могут.",
    // — upload modal —
    titlePlaceholder: "Моя книга",
    subtitlePlaceholder: "Подзаголовок",
    contentPlaceholder: "Анна пошла в парк…",
    chooseFile: "Выбрать файл (.txt / .md)",
    uploaded: "Загружено",
    customBook: "Своя книга.",
    // — book detail —
    afterReading: "После чтения",
    quizTeaser: "Проверяй ключевые слова после каждой главы.",
    // — vocabulary quiz —
    vocabQuizTitle: "Словарь",
    quizPrompt: "Что означает это слово?",
    quizPerfect: "Отлично!",
    quizGood: "Хорошо!",
    quizTryAgain: "Перечитай главу.",
    quizScore: "Результат",
    quizRetry: "Ещё раз",
    quizNextChapter: "Следующая глава",
    quizNotEnough: "В этой главе недостаточно слов для теста.",
    testChapterWords: "Проверить слова",
    // — profile —
    pleaseSignIn: "Пожалуйста, войди.",
    savedWordsEmpty: "Нажимай на слова в читалке, чтобы собирать их здесь.",
    account: "Аккаунт",
    // — auth —
    signInSub: "Продолжи с того места, где остановился.",
    signUpSub: "Сохраняй прогресс, слова и заметки.",
    namePlaceholder: "Anna Schmidt",
    emailPlaceholder: "anna@beispiel.de",
    demo: "ДЕМО",
    asReader: "Как читатель",
    asLibrarian: "Как библиотекарь",
    // — reader —
    bookmarks: "Закладки",
    bookmarksEmpty: "Нажми на значок ⌘ рядом с абзацем, чтобы поставить закладку.",
    paragraph: "¶",
    removeBookmark: "Убрать закладку",
    addBookmark: "Добавить закладку",
    wordsShort: "слов",
    highlightsHeading: "Выделения",
    savedCount: "сохранено",
    howToSave: "Как сохранять:",
    howToSaveTap: "Нажми на слово, чтобы увидеть перевод",
    howToSavePhrase: "Выдели текст для фраз и предложений",
    howToSaveEdit: "Изменить ✎ для своих заметок",
    editNote: "Изменить заметку",
    addNote: "Добавить заметку",
    // — card editor / phrase pop —
    selection: "Выделение",
    highlight: "Выделить",
    saveWithNote: "Сохранить с заметкой",
    editPhrase: "Изменить фразу",
    dictionary: "Словарь",
    contextLabel: "Контекст",
    contextHint: "(предложение из книги)",
    contextPlaceholderPhrase: "Предложение, в котором встречается фраза…",
    contextPlaceholderWord: "Предложение, в котором встречается слово…",
    examplesLabel: "Примеры",
    examplesHint: "(свои предложения)",
    examplePlaceholder: "напр. Я люблю гулять в парке.",
    addExample: "Добавить пример",
    noteLabel: "Заметка",
    notePlaceholder: "Мнемоника, грамматика, всё, что тебе помогает…",
    yourTranslation: "Твой перевод",
    enPlaceholder: "по-английски…",
    ruPlaceholder: "по-русски…",
    color: "Цвет",
    noColor: "Без цвета",
    // — flashcards —
    allCards: "Все",
    hard: "Сложные",
    flashContextLabel: "КОНТЕКСТ",
    flashExamplesLabel: "ПРИМЕРЫ",
    flashNoteLabel: "ЗАМЕТКА",
    clickToFlip: "нажми, чтобы перевернуть",
    learnedTag: "✓ выучено",
    hardTag: "сложное",
    phraseTag: "ФРАЗА",
    noTranslationYet: "Перевода пока нет.",
    addAction: "добавить",
    allCardsLearned: "Все карточки выучены.",
    noHardWords: "Сложных слов пока нет.",
    nothingLearned: "Пока ничего не выучено.",
    nothingToLearn: "Слов для изучения пока нет.",
    allMasteredA: "Ты освоил",
    allMasteredB: "слов. Перейди на вкладку Выучено, чтобы вернуть карточки в колоду.",
    markLearnedHint: "Отмечай карточки «я знаю это», чтобы собирать их здесь.",
    tapToSaveHint: "Нажимай на слова в читалке, чтобы сохранять их.",
    viewLearned: "Посмотреть выученные карточки",
    resetAll: "Сбросить все",
    skip: "пропустить",
    backToDeck: "↺ вернуть в колоду",
    backToDeckTooltip: "Вернуть карточку в колоду для изучения",
    skipTooltip: "Дальше",
    hardActive: "✓ сложное",
    markHardTooltip: "Отметить как сложное для запоминания",
    iKnowThis: "я знаю это ✓",
    iKnowThisTooltip: "Я знаю это — убрать из колоды",
    // — help —
    levelBeginner: "Начинающий",
    levelBasic: "Базовый",
    levelIntermediate: "Средний",
    levelUpperIntermediate: "Выше среднего",
    helpA1Desc: "Ты только начинаешь. Ты знаешь простые слова: привет, день, книга.",
    helpA2Desc: "Ты понимаешь повседневные темы. Можешь говорить о прошлом.",
    helpB1Desc: "Ты читаешь бегло. Понимаешь и то, что между строк.",
    helpB2Desc: "Сложные тексты с непростой грамматикой, абстрактными темами и литературным стилем. За длинными повествованиями следишь почти без усилий.",
    helpA1F1: "Короткие фразы",
    helpA1F2: "Много повторений",
    helpA1F3: "Настоящее время",
    helpA1F4: "1 500–2 000 слов на книгу",
    helpA2F1: "Несколько времён",
    helpA2F2: "Длиннее предложения",
    helpA2F3: "Диалоги",
    helpA2F4: "2 500–4 000 слов на книгу",
    helpB1F1: "Сложные предложения",
    helpB1F2: "Придаточные",
    helpB1F3: "Идиомы",
    helpB1F4: "6 000–8 000 слов на книгу",
    helpB2F1: "Сложные предложения с придаточными",
    helpB2F2: "Абстрактные и литературные темы",
    helpB2F3: "Идиоматические обороты",
    helpB2F4: "10 000+ слов на книгу",
    helpStep1Title: "Выбери книгу",
    helpStep1Desc: "Отфильтруй библиотеку по своему уровню. Начни с A1, если сомневаешься — поменять можно в любой момент.",
    helpStep2Title: "Нажимай на каждое слово",
    helpStep2Desc: "В читалке нажатие на любое слово открывает перевод — на английский и русский. Слова можно сохранять или отмечать как «знаю».",
    helpStep3Title: "Учи с карточками",
    helpStep3Desc: "Сохранённые слова становятся карточками. Переворачивай их — смотри перевод — и повторяй, пока не запомнишь.",
    helpStep4Title: "Проверяй себя тестами",
    helpStep4Desc: "После каждой книги есть короткий тест. Три вопроса — быстро и по делу.",
    helpStep5Title: "Не бросай",
    helpStep5Desc: "Хватит и десяти минут в день. Серия растёт, а вместе с ней и словарный запас.",
    faqQ1: "Нужен ли аккаунт?",
    faqA1: "Нет. Читать всё можно без регистрации. Если ты войдёшь, прогресс будет синхронизироваться между устройствами.",
    faqQ2: "Можно ли загружать свои книги?",
    faqA2: "Нет — библиотека это подобранная коллекция. Эндрю Майер пишет книги и ведёт полку. Если есть идея или пожелание, напиши мне через страницу поддержки.",
    faqQ3: "Переводы автоматические?",
    faqA3: "Самые важные слова сделаны вручную. У редких слов ты можешь увидеть «—» — тогда поможет онлайн-словарь.",
    faqQ4: "Что значат цвета слов?",
    faqA4: "Подчёркнуто жёлтым = сохранено (ты хочешь это выучить). Серое и бледное = ты отметил как «знаю». Чёрное = нейтральное.",
    faqQ5: "Сколько стоят книги?",
    faqA5: "Ничего. Библиотека бесплатна. Если хочешь поддержать проект, буду рад пожертвованию.",
    faqQ6: "На каких устройствах это работает?",
    faqA6: "В браузере — на телефоне, планшете и компьютере. Никакого приложения ставить не нужно.",
    helpHeroEmA: "Читай. Нажимай. ",
    helpHeroEm: "Учись.",
    helpLead: "Эта библиотека работает не так, как большинство приложений для изучения языков. Ты читаешь настоящие истории — а не отдельные слова. Вот как это устроено.",
    helpTryIt: "Попробуй сам",
    helpTapHint: "↑ Нажми на подчёркнутое слово",
    helpThreeLevels: "Уровни",
    helpFiveSteps: "За пять шагов",
    helpWordStatesTitle: "Что говорят тебе слова",
    helpWordNeutral: "Нейтральное — ты его ещё не смотрел",
    helpWordSaved: "Сохранено — попадает в твои карточки",
    helpWordKnown: "Знаю — в следующий раз станет бледнее",
    helpFaqTitle: "Частые вопросы",
    helpCtaTitle: "Готов?",
    helpCtaSub: "Начни с книги A1. Это займёт десять минут.",
    // — about —
    aboutFactLives: "Живёт в",
    aboutFactWriting: "Пишет с",
    aboutFactFont: "Любимый шрифт",
    aboutFactBook: "Любимая книга",
    aboutFactBookValue: "всё Стивена Кинга",
    aboutBelief1Title: "Понимание важнее грамматики",
    aboutBelief1Body: "Язык учишь, понимая его. Грамматика подождёт — сначала чтение должно приносить удовольствие.",
    aboutBelief2Title: "Простое не значит скучное",
    aboutBelief2Body: "Предложения уровня A1 не обязаны быть детскими. Короткая строка может нести целое настроение. Хемингуэй это уже знал.",
    aboutBelief3Title: "Повторение — это магия",
    aboutBelief3Body: "Когда одно и то же слово встречается пятнадцать раз за десять минут, ты не застреваешь — ты учишь его попутно.",
    aboutBelief4Title: "Перевод — это страховочное колесо",
    aboutBelief4Body: "Он должен быть рядом, быстрым, а потом снова исчезать. Не отвлекать. Не объяснять.",
    aboutPhotoFollows: "Фото будет позже — пока монограмма.",
    aboutBioP1: "Меня зовут Эндрю. Я писатель, и когда-то давно сам учил немецкий. Тогда я чувствовал то же, что и все начинающие: учебники часто сухие, а настоящие книги слишком рано слишком сложны.",
    aboutBioP2: "Поэтому я пишу именно такие книги, какие были нужны мне тогда. Истории на простом немецком — короткие и хорошие. Никогда не снисходительные. С героями, которых правда узнаёшь.",
    aboutBioP3: "У каждой книги чёткий уровень: A1, A2 или B1. Лексика и грамматика строго подобраны. Но сами истории — настолько свободны, насколько это возможно.",
    aboutBioP4: "Когда ты дочитываешь историю и думаешь «я правда это понял» — значит, проект выполнил своё предназначение.",
    aboutBeliefsEyebrow: "Как я об этом думаю",
    aboutBeliefsTitle: "Четыре убеждения",
    aboutBibliographyEyebrow: "Библиография",
    aboutBooksTitle: "Книги в этой библиотеке",
    booksDisclaimer: "Книги этой библиотеки написаны с одной-единственной целью — для чтения и изучения немецкого. Это не справочники, они не преследуют иных целей и могут содержать ошибки.",
    aboutContactTitle: "Напиши мне",
    aboutContactBody: "Есть вопрос, предложение или нашёл ошибку? Обычно отвечаю в течение недели.",
    // — progress —
    last30Days: "Последние 30 дней",
    daysAgo30: "30 дней назад",
    less: "меньше",
    more: "больше",
    today: "сегодня",
    booksHeading: "Книги",
  },
};

// Mini dictionary: German → { pos, en, ru, lemma? }
const DICT = {
  // articles & basic
  "der": { pos: "art", en: "the (m.)", ru: "the (м.р.)" },
  "die": { pos: "art", en: "the (f./pl.)", ru: "the (ж.р./мн.ч.)" },
  "das": { pos: "art", en: "the (n.)", ru: "the (ср.р.)" },
  "ein": { pos: "art", en: "a / an", ru: "один, какой-то" },
  "eine": { pos: "art", en: "a / an", ru: "одна, какая-то" },
  "einen": { pos: "art", en: "a / an (acc.)", ru: "одного (вин.)" },
  "und": { pos: "conj", en: "and", ru: "и" },
  "oder": { pos: "conj", en: "or", ru: "или" },
  "aber": { pos: "conj", en: "but", ru: "но" },
  "weil": { pos: "conj", en: "because", ru: "потому что" },
  "wenn": { pos: "conj", en: "when / if", ru: "когда / если" },
  "dass": { pos: "conj", en: "that", ru: "что" },
  // pronouns
  "ich": { pos: "pron", en: "I", ru: "я" },
  "du": { pos: "pron", en: "you (informal)", ru: "ты" },
  "er": { pos: "pron", en: "he", ru: "он" },
  "sie": { pos: "pron", en: "she / they", ru: "она / они" },
  "es": { pos: "pron", en: "it", ru: "оно" },
  "wir": { pos: "pron", en: "we", ru: "мы" },
  "ihr": { pos: "pron", en: "you (pl.) / her", ru: "вы / её" },
  "mein": { pos: "pron", en: "my", ru: "мой" },
  "meine": { pos: "pron", en: "my (f./pl.)", ru: "моя" },
  "sein": { pos: "verb", en: "to be / his", ru: "быть / его" },
  // verbs (common)
  "ist": { pos: "verb", en: "is", ru: "есть, является", lemma: "sein" },
  "sind": { pos: "verb", en: "are", ru: "есть (мн.ч.)", lemma: "sein" },
  "war": { pos: "verb", en: "was", ru: "был", lemma: "sein" },
  "waren": { pos: "verb", en: "were", ru: "были", lemma: "sein" },
  "hat": { pos: "verb", en: "has", ru: "имеет", lemma: "haben" },
  "habe": { pos: "verb", en: "(I) have", ru: "(я) имею", lemma: "haben" },
  "hatte": { pos: "verb", en: "had", ru: "имел", lemma: "haben" },
  "geht": { pos: "verb", en: "goes", ru: "идёт", lemma: "gehen" },
  "ging": { pos: "verb", en: "went", ru: "шёл", lemma: "gehen" },
  "kommt": { pos: "verb", en: "comes", ru: "приходит", lemma: "kommen" },
  "kam": { pos: "verb", en: "came", ru: "пришёл", lemma: "kommen" },
  "sieht": { pos: "verb", en: "sees", ru: "видит", lemma: "sehen" },
  "sah": { pos: "verb", en: "saw", ru: "увидел", lemma: "sehen" },
  "sagt": { pos: "verb", en: "says", ru: "говорит", lemma: "sagen" },
  "sagte": { pos: "verb", en: "said", ru: "сказал", lemma: "sagen" },
  "macht": { pos: "verb", en: "makes / does", ru: "делает", lemma: "machen" },
  "machte": { pos: "verb", en: "made / did", ru: "сделал", lemma: "machen" },
  "denkt": { pos: "verb", en: "thinks", ru: "думает", lemma: "denken" },
  "dachte": { pos: "verb", en: "thought", ru: "думал", lemma: "denken" },
  "weiß": { pos: "verb", en: "knows", ru: "знает", lemma: "wissen" },
  "kennt": { pos: "verb", en: "knows (person)", ru: "знает (кого)", lemma: "kennen" },
  "möchte": { pos: "verb", en: "would like", ru: "хотел бы", lemma: "mögen" },
  "will": { pos: "verb", en: "wants", ru: "хочет", lemma: "wollen" },
  "kann": { pos: "verb", en: "can", ru: "может", lemma: "können" },
  "muss": { pos: "verb", en: "must", ru: "должен", lemma: "müssen" },
  "soll": { pos: "verb", en: "should", ru: "должен", lemma: "sollen" },
  "wohnt": { pos: "verb", en: "lives", ru: "живёт", lemma: "wohnen" },
  "arbeitet": { pos: "verb", en: "works", ru: "работает", lemma: "arbeiten" },
  "trinkt": { pos: "verb", en: "drinks", ru: "пьёт", lemma: "trinken" },
  "isst": { pos: "verb", en: "eats", ru: "ест", lemma: "essen" },
  "liest": { pos: "verb", en: "reads", ru: "читает", lemma: "lesen" },
  "schreibt": { pos: "verb", en: "writes", ru: "пишет", lemma: "schreiben" },
  "fährt": { pos: "verb", en: "drives / travels", ru: "едет", lemma: "fahren" },
  "öffnet": { pos: "verb", en: "opens", ru: "открывает", lemma: "öffnen" },
  "schließt": { pos: "verb", en: "closes", ru: "закрывает", lemma: "schließen" },
  "findet": { pos: "verb", en: "finds", ru: "находит", lemma: "finden" },
  "fand": { pos: "verb", en: "found", ru: "нашёл", lemma: "finden" },
  "sucht": { pos: "verb", en: "looks for", ru: "ищет", lemma: "suchen" },
  "bleibt": { pos: "verb", en: "stays", ru: "остаётся", lemma: "bleiben" },
  "lacht": { pos: "verb", en: "laughs", ru: "смеётся", lemma: "lachen" },
  "lächelt": { pos: "verb", en: "smiles", ru: "улыбается", lemma: "lächeln" },
  "schläft": { pos: "verb", en: "sleeps", ru: "спит", lemma: "schlafen" },
  "wartet": { pos: "verb", en: "waits", ru: "ждёт", lemma: "warten" },
  "fragt": { pos: "verb", en: "asks", ru: "спрашивает", lemma: "fragen" },
  "antwortet": { pos: "verb", en: "answers", ru: "отвечает", lemma: "antworten" },
  // nouns
  "Tag": { pos: "noun", en: "day", ru: "день" },
  "Nacht": { pos: "noun", en: "night", ru: "ночь" },
  "Morgen": { pos: "noun", en: "morning", ru: "утро" },
  "Abend": { pos: "noun", en: "evening", ru: "вечер" },
  "Park": { pos: "noun", en: "park", ru: "парк" },
  "Stadt": { pos: "noun", en: "city", ru: "город" },
  "Dorf": { pos: "noun", en: "village", ru: "деревня" },
  "Haus": { pos: "noun", en: "house", ru: "дом" },
  "Frau": { pos: "noun", en: "woman / Mrs.", ru: "женщина / госпожа" },
  "Mann": { pos: "noun", en: "man", ru: "мужчина" },
  "Kind": { pos: "noun", en: "child", ru: "ребёнок" },
  "Junge": { pos: "noun", en: "boy", ru: "мальчик" },
  "Mädchen": { pos: "noun", en: "girl", ru: "девочка" },
  "Hund": { pos: "noun", en: "dog", ru: "собака" },
  "Katze": { pos: "noun", en: "cat", ru: "кошка" },
  "Vogel": { pos: "noun", en: "bird", ru: "птица" },
  "Baum": { pos: "noun", en: "tree", ru: "дерево" },
  "Bank": { pos: "noun", en: "bench / bank", ru: "скамейка / банк" },
  "Buch": { pos: "noun", en: "book", ru: "книга" },
  "Brief": { pos: "noun", en: "letter", ru: "письмо" },
  "Bäcker": { pos: "noun", en: "baker", ru: "пекарь" },
  "Brot": { pos: "noun", en: "bread", ru: "хлеб" },
  "Brötchen": { pos: "noun", en: "bread roll", ru: "булочка" },
  "Kaffee": { pos: "noun", en: "coffee", ru: "кофе" },
  "Wasser": { pos: "noun", en: "water", ru: "вода" },
  "Wald": { pos: "noun", en: "forest", ru: "лес" },
  "Schlüssel": { pos: "noun", en: "key", ru: "ключ" },
  "Tür": { pos: "noun", en: "door", ru: "дверь" },
  "Fenster": { pos: "noun", en: "window", ru: "окно" },
  "Straße": { pos: "noun", en: "street", ru: "улица" },
  "Zug": { pos: "noun", en: "train", ru: "поезд" },
  "Bahnhof": { pos: "noun", en: "train station", ru: "вокзал" },
  "Reise": { pos: "noun", en: "journey", ru: "путешествие" },
  "Auto": { pos: "noun", en: "car", ru: "машина" },
  "Hand": { pos: "noun", en: "hand", ru: "рука" },
  "Augen": { pos: "noun", en: "eyes", ru: "глаза" },
  "Stimme": { pos: "noun", en: "voice", ru: "голос" },
  "Name": { pos: "noun", en: "name", ru: "имя" },
  "Anna": { pos: "noun", en: "Anna (name)", ru: "Анна" },
  "Paul": { pos: "noun", en: "Paul (name)", ru: "Пауль" },
  "Berlin": { pos: "noun", en: "Berlin", ru: "Берлин" },
  "München": { pos: "noun", en: "Munich", ru: "Мюнхен" },
  "Schwarzwald": { pos: "noun", en: "Black Forest", ru: "Шварцвальд" },
  // adjectives & adverbs
  "klein": { pos: "adj", en: "small", ru: "маленький" },
  "groß": { pos: "adj", en: "big", ru: "большой" },
  "neu": { pos: "adj", en: "new", ru: "новый" },
  "alt": { pos: "adj", en: "old", ru: "старый" },
  "schön": { pos: "adj", en: "beautiful", ru: "красивый" },
  "warm": { pos: "adj", en: "warm", ru: "тёплый" },
  "kalt": { pos: "adj", en: "cold", ru: "холодный" },
  "gut": { pos: "adj", en: "good", ru: "хороший" },
  "schlecht": { pos: "adj", en: "bad", ru: "плохой" },
  "schnell": { pos: "adj", en: "fast", ru: "быстрый" },
  "langsam": { pos: "adj", en: "slow", ru: "медленный" },
  "müde": { pos: "adj", en: "tired", ru: "уставший" },
  "froh": { pos: "adj", en: "happy / glad", ru: "радостный" },
  "still": { pos: "adj", en: "quiet", ru: "тихий" },
  "leise": { pos: "adj", en: "quiet (sound)", ru: "тихо" },
  "laut": { pos: "adj", en: "loud", ru: "громко" },
  "dunkel": { pos: "adj", en: "dark", ru: "тёмный" },
  "hell": { pos: "adj", en: "bright", ru: "светлый" },
  "ruhig": { pos: "adj", en: "calm", ru: "спокойный" },
  "fremd": { pos: "adj", en: "strange / foreign", ru: "чужой" },
  "verloren": { pos: "adj", en: "lost", ru: "потерянный" },
  // prepositions
  "in": { pos: "prep", en: "in / into", ru: "в" },
  "im": { pos: "prep", en: "in the (m./n.)", ru: "в (м./ср.)" },
  "auf": { pos: "prep", en: "on / onto", ru: "на" },
  "an": { pos: "prep", en: "at / on", ru: "у / на" },
  "am": { pos: "prep", en: "at the / on the", ru: "у / на" },
  "mit": { pos: "prep", en: "with", ru: "с" },
  "von": { pos: "prep", en: "from / of", ru: "от / из" },
  "vom": { pos: "prep", en: "from the", ru: "от" },
  "zu": { pos: "prep", en: "to", ru: "к" },
  "nach": { pos: "prep", en: "to / after", ru: "после / в" },
  "für": { pos: "prep", en: "for", ru: "для" },
  "ohne": { pos: "prep", en: "without", ru: "без" },
  "über": { pos: "prep", en: "over / about", ru: "над / о" },
  "durch": { pos: "prep", en: "through", ru: "через" },
  // misc
  "nicht": { pos: "adv", en: "not", ru: "не" },
  "auch": { pos: "adv", en: "also", ru: "тоже" },
  "nur": { pos: "adv", en: "only", ru: "только" },
  "sehr": { pos: "adv", en: "very", ru: "очень" },
  "heute": { pos: "adv", en: "today", ru: "сегодня" },
  "gestern": { pos: "adv", en: "yesterday", ru: "вчера" },
  "morgen": { pos: "adv", en: "tomorrow", ru: "завтра" },
  "hier": { pos: "adv", en: "here", ru: "здесь" },
  "da": { pos: "adv", en: "there", ru: "там" },
  "dort": { pos: "adv", en: "over there", ru: "там" },
  "dann": { pos: "adv", en: "then", ru: "потом" },
  "jetzt": { pos: "adv", en: "now", ru: "сейчас" },
  "schon": { pos: "adv", en: "already", ru: "уже" },
  "noch": { pos: "adv", en: "still / yet", ru: "ещё" },
  "ja": { pos: "part", en: "yes", ru: "да" },
  "nein": { pos: "part", en: "no", ru: "нет" },
  "Hallo": { pos: "intj", en: "hello", ru: "привет" },
  "Guten": { pos: "adj", en: "good (acc.)", ru: "доброго", lemma: "gut" },
  // Additional declined / plural forms — show lemma
  "Bücher": { pos: "noun", en: "books (pl.)", ru: "книги", lemma: "Buch" },
  "Männer": { pos: "noun", en: "men (pl.)", ru: "мужчины", lemma: "Mann" },
  "Frauen": { pos: "noun", en: "women (pl.)", ru: "женщины", lemma: "Frau" },
  "Kinder": { pos: "noun", en: "children", ru: "дети", lemma: "Kind" },
  "Häuser": { pos: "noun", en: "houses", ru: "дома", lemma: "Haus" },
  "Augen": { pos: "noun", en: "eyes", ru: "глаза", lemma: "Auge" },
  "Wälder": { pos: "noun", en: "forests", ru: "леса", lemma: "Wald" },
  "Bäume": { pos: "noun", en: "trees", ru: "деревья", lemma: "Baum" },
  "Vögel": { pos: "noun", en: "birds", ru: "птицы", lemma: "Vogel" },
  "Türen": { pos: "noun", en: "doors", ru: "двери", lemma: "Tür" },
  "Stimmen": { pos: "noun", en: "voices", ru: "голоса", lemma: "Stimme" },
  "Tage": { pos: "noun", en: "days", ru: "дни", lemma: "Tag" },
  "Hunde": { pos: "noun", en: "dogs", ru: "собаки", lemma: "Hund" },
  "Dörfer": { pos: "noun", en: "villages", ru: "деревни", lemma: "Dorf" },
  "Brötchen": { pos: "noun", en: "bread rolls", ru: "булочки", lemma: "Brötchen" },
  "kleinen": { pos: "adj", en: "small (decl.)", ru: "маленького", lemma: "klein" },
  "kleiner": { pos: "adj", en: "small (decl.)", ru: "маленький", lemma: "klein" },
  "schönen": { pos: "adj", en: "beautiful (decl.)", ru: "красивого", lemma: "schön" },
  "alten": { pos: "adj", en: "old (decl.)", ru: "старого", lemma: "alt" },
  "großen": { pos: "adj", en: "big (decl.)", ru: "большого", lemma: "groß" },
  "gutes": { pos: "adj", en: "good (n.)", ru: "хорошее", lemma: "gut" },
  "guten": { pos: "adj", en: "good (decl.)", ru: "хорошего", lemma: "gut" },
  "neuen": { pos: "adj", en: "new (decl.)", ru: "нового", lemma: "neu" },
  "dem": { pos: "art", en: "the (dat. m./n.)", ru: "the (дат. м./ср.)", lemma: "der" },
  "den": { pos: "art", en: "the (acc. m. / dat. pl.)", ru: "the (вин. м.)", lemma: "der" },
  "des": { pos: "art", en: "the (gen. m./n.)", ru: "the (род. м./ср.)", lemma: "der" },
  "ihn": { pos: "pron", en: "him", ru: "его", lemma: "er" },
  "ihm": { pos: "pron", en: "(to) him", ru: "ему", lemma: "er" },
  "ihr": { pos: "pron", en: "you (pl.) / her (dat.)", ru: "вы / ей", lemma: "sie" },
  "mich": { pos: "pron", en: "me (acc.)", ru: "меня", lemma: "ich" },
  "mir": { pos: "pron", en: "(to) me", ru: "мне", lemma: "ich" },
  "dich": { pos: "pron", en: "you (acc.)", ru: "тебя", lemma: "du" },
  "dir": { pos: "pron", en: "(to) you", ru: "тебе", lemma: "du" },
  "gegangen": { pos: "verb", en: "gone", ru: "ушёл", lemma: "gehen" },
  "gekommen": { pos: "verb", en: "come", ru: "пришёл", lemma: "kommen" },
  "gesehen": { pos: "verb", en: "seen", ru: "увиденный", lemma: "sehen" },
  "gegessen": { pos: "verb", en: "eaten", ru: "съеденный", lemma: "essen" },
  "gelesen": { pos: "verb", en: "read (pp.)", ru: "прочитанный", lemma: "lesen" },
  "geschrieben": { pos: "verb", en: "written", ru: "написанный", lemma: "schreiben" },
  "gefunden": { pos: "verb", en: "found", ru: "найденный", lemma: "finden" },
  "gesagt": { pos: "verb", en: "said", ru: "сказанный", lemma: "sagen" },
  "gemacht": { pos: "verb", en: "done / made", ru: "сделанный", lemma: "machen" },
  "gewesen": { pos: "verb", en: "been", ru: "был", lemma: "sein" },
  "gehabt": { pos: "verb", en: "had", ru: "имел", lemma: "haben" },
};

const lookupWord = (raw) => {
  if (!raw) return null;
  const clean = raw.replace(/[.,;:!?"„"()«»…\-]/g, "").trim();
  if (!clean) return null;
  if (DICT[clean]) return { word: clean, ...DICT[clean] };
  const lower = clean.toLowerCase();
  if (DICT[lower]) return { word: lower, ...DICT[lower] };
  // try uppercased noun form
  const cap = lower.charAt(0).toUpperCase() + lower.slice(1);
  if (DICT[cap]) return { word: cap, ...DICT[cap] };
  // fall back to the per-book glossary loaded at runtime (DICT keeps precedence)
  const G = (typeof window !== 'undefined' && window.GLOSSARY) ? window.GLOSSARY : {};
  if (G[clean]) return { word: clean, ...G[clean] };
  if (G[lower]) return { word: lower, ...G[lower] };
  if (G[cap]) return { word: cap, ...G[cap] };
  return { word: clean, pos: "—", en: "—", ru: "—", unknown: true };
};

// ---------- SEPARABLE VERBS (trennbare Verben) ----------
// Live heuristic: in "... sieht ... aus" the prefix "aus" at the clause end belongs to the
// finite verb "sieht" (lemma sehen) -> "aussehen". We validate prefix+lemma against the
// existing dictionary (joined forms appear in the books, so the verb lemma exists) and only
// treat a trailing prefix as separable when it sits at a clause end, so a plain preposition
// ("aus dem Haus") is left alone. detectSeparableGroups runs over TappableText's `parts`
// (tokens { kind: "word"|"ws"|"phrase", t }) and returns the linked stem/prefix pairs.
const SEPARABLE_PREFIXES = new Set([
  "ab", "an", "auf", "aus", "bei", "da", "dabei", "ein", "empor", "entgegen", "fest", "fort",
  "frei", "gegenüber", "gleich", "heim", "her", "heran", "herauf", "heraus", "herbei", "herein",
  "herum", "herunter", "hervor", "hin", "hinauf", "hinaus", "hinein", "hinunter", "los", "mit",
  "nach", "nieder", "vor", "voran", "voraus", "vorbei", "weg", "weiter", "wieder", "zu",
  "zurecht", "zurück", "zusammen",
]);
const _SV_COORD = new Set(["und", "oder", "aber", "denn", "sondern"]);

function _svGapHasSentenceEnd(parts, a, b) {
  for (let k = a + 1; k < b; k++) {
    if (parts[k].kind === "ws" && /[.!?]/.test(parts[k].t)) return true;
  }
  return false;
}
// True only when the prefix at index p sits at a clause end: the run after it (before the
// next word) carries clause punctuation, or the next word is a coordinating conjunction, or
// the paragraph ends. This is what separates "...aus." (verb) from "aus dem Haus" (prep).
function _svAtClauseEnd(parts, p) {
  for (let k = p + 1; k < parts.length; k++) {
    if (parts[k].kind === "ws") { if (/[.!?,;:]/.test(parts[k].t)) return true; continue; }
    return _SV_COORD.has(String(parts[k].t || "").toLowerCase());
  }
  return true;
}
function detectSeparableGroups(parts) {
  if (typeof lookupWord !== "function" || !Array.isArray(parts)) return [];
  const wordIdx = [];
  for (let i = 0; i < parts.length; i++) if (parts[i].kind === "word") wordIdx.push(i);
  const groups = [];
  const used = new Set();
  for (let w = 0; w < wordIdx.length; w++) {
    const pi = wordIdx[w];
    if (used.has(pi)) continue;
    const surf = String(parts[pi].t || "").toLowerCase();
    if (!SEPARABLE_PREFIXES.has(surf) || !_svAtClauseEnd(parts, pi)) continue;
    for (let b = w - 1; b >= 0; b--) {
      const bpi = wordIdx[b];
      if (_svGapHasSentenceEnd(parts, bpi, pi)) break; // don't cross a sentence boundary
      if (used.has(bpi)) continue;
      const lk = lookupWord(parts[bpi].t);
      if (!lk || lk.pos !== "verb" || !lk.lemma) continue;
      const cv = lookupWord(surf + String(lk.lemma).toLowerCase());
      if (cv && !cv.unknown && cv.pos === "verb") {
        groups.push({ stem: bpi, prefix: pi, lemma: cv.word, data: cv });
        used.add(bpi); used.add(pi);
        break;
      }
    }
  }
  return groups;
}

// ---------- LEVELS ----------
const CEFR_ORDER = ["A1", "A2", "B1", "B2", "C1", "C2"];
// "A2→B1" / "A2->B1" / "A2-B1" / "A2/B1" -> ["A2","B1"];  "B1" -> ["B1"]
function levelTokens(level) {
  return String(level || "").toUpperCase().split(/\s*(?:→|->|\/|–|—|-)\s*/).filter(Boolean);
}
// Numeric sort key; combined levels sort between their endpoints (avg of indices).
function levelRank(level) {
  const idxs = levelTokens(level).map(tk => { const i = CEFR_ORDER.indexOf(tk); return i === -1 ? 99 : i; });
  if (!idxs.length) return 999;
  return idxs.reduce((a, b) => a + b, 0) / idxs.length;
}
// Distinct, in CEFR order; combined levels slot between their endpoints.
function sortLevels(levels) {
  return [...new Set((levels || []).filter(Boolean))]
    .sort((a, b) => levelRank(a) - levelRank(b) || String(a).localeCompare(String(b)));
}
// CEFR band used to pick a badge color for any level label (its target/last token).
function levelBand(level) {
  const toks = levelTokens(level);
  if (!toks.length) return "";
  const target = toks[toks.length - 1];
  return CEFR_ORDER.includes(target) ? target : "";
}

// ---------- BOOKS ----------
// Catalog is loaded at runtime from books/manifest.json (see loader.js).
const BOOKS = [];

// Build a vocab record per book with translations from DICT
const buildVocab = (book) => {
  return (book.vocab || []).map(w => {
    const entry = DICT[w] || DICT[w.toLowerCase()] || DICT[w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()] || { pos: "—", en: "—", ru: "—" };
    return { word: w, ...entry };
  });
};

// ---------- VOCABULARY QUIZ ----------
// German function words (articles, pronouns, prepositions, conjunctions, auxiliaries/modals,
// particles, common adverbs). Quiz words are drawn from CONTENT words only, so these are skipped.
const STOPWORDS = new Set([
  // articles
  "der", "die", "das", "den", "dem", "des", "ein", "eine", "einen", "einem", "einer", "eines",
  "kein", "keine", "keinen", "keinem", "keiner", "keines",
  // demonstratives / quantifiers
  "dieser", "diese", "dieses", "diesen", "diesem", "jener", "jene", "jenes",
  "jeder", "jede", "jedes", "jeden", "alle", "alles", "allen", "manche", "mancher",
  "viel", "viele", "vielen", "wenig", "wenige", "mehr", "etwas", "nichts", "beide",
  // pronouns
  "ich", "du", "er", "sie", "es", "wir", "ihr", "man", "sich", "selbst", "einander",
  "mich", "mir", "dich", "dir", "ihn", "ihm", "uns", "euch", "ihnen", "ihrer",
  "mein", "meine", "meinen", "meinem", "meiner", "meines",
  "dein", "deine", "deinen", "deinem", "deiner",
  "sein", "seine", "seinen", "seinem", "seiner",
  "ihre", "ihren", "ihrem", "unser", "unsere", "unseren",
  "wer", "wen", "wem", "wessen", "was", "welche", "welcher", "welches", "welchen",
  // auxiliaries / modals (and common conjugations)
  "ist", "sind", "bin", "bist", "seid", "war", "warst", "waren", "wart", "gewesen", "sei",
  "hat", "habe", "hast", "habt", "haben", "hatte", "hattest", "hatten", "gehabt",
  "wird", "werde", "wirst", "werdet", "werden", "wurde", "wurden", "worden", "geworden",
  "kann", "kannst", "kannst", "könnt", "können", "konnte", "konnten",
  "muss", "musst", "müsst", "müssen", "musste", "mussten",
  "soll", "sollst", "sollt", "sollen", "sollte", "sollten",
  "will", "willst", "wollt", "wollen", "wollte", "wollten",
  "darf", "darfst", "dürft", "dürfen", "durfte", "durften",
  "mag", "magst", "mögen", "möchte", "möchten", "möchtest",
  // prepositions
  "in", "im", "auf", "an", "am", "ans", "mit", "von", "vom", "zu", "zum", "zur",
  "nach", "für", "über", "unter", "durch", "bei", "beim", "aus", "um", "ohne",
  "gegen", "zwischen", "vor", "hinter", "neben", "seit", "bis", "ab", "wegen",
  "während", "trotz", "statt", "innerhalb", "außerhalb", "gegenüber", "entlang",
  // conjunctions / subordinators
  "und", "oder", "aber", "denn", "sondern", "doch", "als", "wie", "wenn", "dass",
  "weil", "ob", "obwohl", "damit", "sobald", "während", "bevor", "nachdem", "falls",
  "sowie", "sowohl", "weder", "entweder", "je", "desto",
  // common adverbs / particles
  "nicht", "auch", "nur", "schon", "noch", "sehr", "dann", "dort", "hier", "so",
  "ja", "nein", "doch", "mal", "eben", "halt", "wohl", "etwa", "zwar", "denn",
  "jetzt", "immer", "nie", "oft", "manchmal", "wieder", "bald", "gleich", "sofort",
  "heute", "gestern", "morgen", "hin", "her", "weg", "los", "wo", "wohin", "woher",
  "warum", "wieso", "weshalb", "wann", "ganz", "fast", "kaum", "gar", "eigentlich",
  "vielleicht", "natürlich", "wirklich", "genau", "ziemlich", "besonders", "leider",
  "darauf", "dabei", "dazu", "davon", "daran", "damit", "darüber", "dafür", "dadurch",
  "worauf", "wobei", "wozu", "wovon", "woran", "womit", "worüber", "wofür",
  "oben", "unten", "vorn", "hinten", "links", "rechts", "drinnen", "draußen",
  "diesmal", "ebenfalls", "trotzdem", "deshalb", "deswegen", "daher", "also", "zudem",
]);

// Shuffle an array in place (Fisher–Yates) and return it.
const shuffleArr = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const QUIZ_WORD_RE = /[A-Za-zÄÖÜäöüßẞ][A-Za-zÄÖÜäöüßẞ'’\-]*/g;
const QUIZ_POS = new Set(["noun", "verb", "adj", "adv"]);

// Is a looked-up entry an eligible CONTENT word for the quiz (in the target language)?
const isQuizEligible = (entry, meaning) => {
  if (!entry || entry.unknown) return false;
  if (!QUIZ_POS.has(entry.pos)) return false;
  if (!meaning || meaning === "—") return false;
  if (STOPWORDS.has((entry.word || "").toLowerCase())) return false;
  return true;
};

// Collect deduped eligible content words for a single chapter, with in-chapter frequency.
// Returns a Map keyed by dedupe key (lemma || word) → { key, word, meaning, count }.
const collectChapterWords = (chapter, lang) => {
  const map = new Map();
  if (!chapter || !Array.isArray(chapter.text)) return map;
  const tokens = chapter.text.join("\n").match(QUIZ_WORD_RE) || [];
  for (const token of tokens) {
    if (STOPWORDS.has(token.toLowerCase())) continue;
    const entry = lookupWord(token);
    if (!entry) continue;
    const meaning = lang === "ru" ? entry.ru : entry.en;
    if (!isQuizEligible(entry, meaning)) continue;
    const display = entry.lemma || entry.word;
    const key = display.toLowerCase();
    const existing = map.get(key);
    if (existing) existing.count += 1;
    else map.set(key, { key, word: display, meaning, count: 1 });
  }
  return map;
};

// Generate a per-chapter multiple-choice vocabulary quiz.
// Shows a German word; the reader picks its meaning (in `lang`) from 4 options.
const makeChapterQuiz = (book, chapterIndex, lang, count = 7) => {
  if (!book || !Array.isArray(book.chapters)) return [];
  const chapter = book.chapters[chapterIndex];
  if (!chapter) return [];

  const chapterWords = collectChapterWords(chapter, lang);

  // Distractor pool: eligible content words from across the whole book (this chapter + others),
  // keyed the same way so we can exclude the current answer by key.
  const pool = new Map();
  book.chapters.forEach((ch) => {
    collectChapterWords(ch, lang).forEach((v, k) => {
      const existing = pool.get(k);
      if (existing) existing.count += v.count;
      else pool.set(k, { ...v });
    });
  });

  // Rank the chapter's words: frequency desc, then longer word as a mild tiebreak.
  const ranked = [...chapterWords.values()].sort(
    (a, b) => b.count - a.count || b.word.length - a.word.length
  );
  const selected = ranked.slice(0, count);

  return selected.map((item) => {
    // Gather distractor meanings (same language) from other content words, distinct from the answer.
    const candidates = [...pool.values()].filter(
      (p) => p.key !== item.key && p.meaning && p.meaning !== item.meaning
    );
    shuffleArr(candidates);
    const distractors = [];
    const usedMeanings = new Set([item.meaning]);
    for (const c of candidates) {
      if (distractors.length >= 3) break;
      if (usedMeanings.has(c.meaning)) continue;
      usedMeanings.add(c.meaning);
      distractors.push(c.meaning);
    }
    const options = shuffleArr([item.meaning, ...distractors]);
    return { word: item.word, prompt: item.word, options, answer: item.meaning };
  });
};

// ---------- BACKUP & RESTORE ----------
// All user data lives in localStorage under the "ddb:" prefix. These helpers let a reader
// export everything to a JSON file and import it back (e.g. to move between devices). No backend.
const DDB_PREFIX = "ddb:";
const BACKUP_APP = "die-deutsche-bibliothek";
const BACKUP_VERSION = 1;

// Pure: read every ddb: key out of a Storage-like object and build the backup payload.
// Kept free of DOM so it can be unit-tested. `store` defaults to window.localStorage.
const collectUserData = (store) => {
  const ls = store || (typeof localStorage !== "undefined" ? localStorage : null);
  const data = {};
  if (ls) {
    for (let i = 0; i < ls.length; i++) {
      const fullKey = ls.key(i);
      if (!fullKey || fullKey.indexOf(DDB_PREFIX) !== 0) continue;
      const bareKey = fullKey.slice(DDB_PREFIX.length);
      const raw = ls.getItem(fullKey);
      try {
        data[bareKey] = JSON.parse(raw);
      } catch {
        data[bareKey] = raw;
      }
    }
  }
  return {
    app: BACKUP_APP,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  };
};

// Pure: write a backup payload's data map back into a Storage-like object. Returns the count.
const restoreUserData = (payload, store) => {
  if (!payload || typeof payload !== "object" || !payload.data || typeof payload.data !== "object") {
    throw new Error("Invalid backup file.");
  }
  if (payload.app && payload.app !== BACKUP_APP) {
    throw new Error("This file is not a die-Deutsche-Bibliothek backup.");
  }
  const ls = store || (typeof localStorage !== "undefined" ? localStorage : null);
  let count = 0;
  if (ls) {
    Object.keys(payload.data).forEach((key) => {
      ls.setItem(DDB_PREFIX + key, JSON.stringify(payload.data[key]));
      count++;
    });
  }
  return count;
};

const backupFilename = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  return `deutsche-bibliothek-backup-${stamp}.json`;
};

// Build the backup, then trigger a download of it as a JSON file.
const exportUserData = () => {
  const payload = collectUserData();
  const json = JSON.stringify(payload, null, 2);
  if (typeof document === "undefined" || typeof URL === "undefined" || !URL.createObjectURL) {
    return json;
  }
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = backupFilename();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return json;
};

// Read a chosen File, validate it, and write its data back into localStorage.
// Resolves with the number of keys restored. The caller reloads the page.
const importUserData = (file) => {
  const readText = () => {
    if (file && typeof file.text === "function") return file.text();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error || new Error("File read failed."));
      reader.readAsText(file);
    });
  };
  return Promise.resolve()
    .then(() => {
      if (!file) throw new Error("No file selected.");
      return readText();
    })
    .then((text) => {
      let payload;
      try {
        payload = JSON.parse(text);
      } catch {
        throw new Error("This file is not valid JSON.");
      }
      return restoreUserData(payload);
    });
};

window.UI_STRINGS = UI_STRINGS;
window.DICT = DICT;
window.AUTH_ENABLED = AUTH_ENABLED;
function fmtReadingTime(m, minUnit) {
  if (m < 60) return m + " " + minUnit;
  const h = Math.floor(m / 60), mm = m % 60;
  return mm ? (h + " h " + mm + " " + minUnit) : (h + " h");
}
window.fmtReadingTime = fmtReadingTime;
window.lookupWord = lookupWord;
window.CEFR_ORDER = CEFR_ORDER;
window.levelRank = levelRank;
window.sortLevels = sortLevels;
window.levelBand = levelBand;
window.detectSeparableGroups = detectSeparableGroups;
window.BOOKS = BOOKS;
window.buildVocab = buildVocab;
window.STOPWORDS = STOPWORDS;
window.makeChapterQuiz = makeChapterQuiz;
window.collectUserData = collectUserData;
window.restoreUserData = restoreUserData;
window.exportUserData = exportUserData;
window.importUserData = importUserData;
