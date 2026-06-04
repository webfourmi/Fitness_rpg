function initProgramsModule() {
  if (window.__programsModuleReady) return;
  window.__programsModuleReady = true;

  const PROGRAM_DONE_KEY = "sportRpgV1ProgramDone";
  let currentProgramId = null;
  let currentSessionIndex = 0;
  let currentStepIndex = 0;
  let sessionStarted = false;
  let sessionFinished = false;

  const programs = [
    {
      id: "eveil-heros",
      icon: "🌅",
      title: "Éveil du héros",
      objective: "Reprise douce",
      level: "Débutant",
      duration: "10-15 min",
      coaches: "Violette ou Elmin",
      frequency: "3 séances / semaine",
      xp: 20,
      description: "Remise en mouvement, perte de poids douce, reprise après longue pause.",
      sessions: [
        { title: "Jour 1 · Réveil doux", steps: [
          ["Échauffement", "Marche sur place", "2 min"], ["Mobilité", "Cercles d’épaules", "30 sec"], ["Mobilité", "Rotations du bassin", "30 sec"], ["Renfo doux", "Squat chaise", "2 × 8"], ["Renfo doux", "Pompes murales", "2 × 8"], ["Cardio doux", "Pas latéraux", "2 × 30 sec"], ["Retour au calme", "Respiration lente", "2 min"]
        ]},
        { title: "Jour 2 · Même rituel", steps: [
          ["Échauffement", "Marche sur place", "2 min"], ["Mobilité", "Épaules + bassin", "1 min"], ["Renfo doux", "Squat chaise", "2 × 8"], ["Renfo doux", "Pompes murales", "2 × 8"], ["Cardio doux", "Pas latéraux", "2 × 30 sec"], ["Retour au calme", "Respiration lente", "2 min"]
        ]},
        { title: "Jour 3 · Petit cran de plus", steps: [
          ["Échauffement", "Marche sur place", "3 min"], ["Mobilité", "Cercles d’épaules", "45 sec"], ["Renfo doux", "Squat chaise", "2 × 9"], ["Renfo doux", "Pompes murales", "2 × 9"], ["Cardio doux", "Pas latéraux", "2 × 40 sec"], ["Retour au calme", "Respiration lente", "2 min"]
        ]}
      ]
    },
    {
      id: "coeur-dragon",
      icon: "❤️‍🔥",
      title: "Cœur de dragon",
      objective: "Cardio léger",
      level: "Débutant/intermédiaire",
      duration: "15-25 min",
      coaches: "Korvan ou Xara",
      frequency: "3 séances / semaine",
      xp: 40,
      description: "Cardio sans violence, transpirer un peu sans finir en crêpe médiévale.",
      sessions: [
        { title: "Jour 1 · Souffle du dragon", steps: [["Échauffement", "Marche dynamique", "3 min"], ["Cardio", "Montées de genoux lentes", "3 × 30 sec"], ["Cardio", "Pas chassés", "3 × 30 sec"], ["Cardio", "Jumping jack sans saut", "3 × 30 sec"], ["Renfo", "Squats", "3 × 10"], ["Gainage", "Planche genoux", "3 × 20 sec"], ["Retour au calme", "Étirements mollets/cuisses", "3 min"]]},
        { title: "Jour 2 · Braises régulières", steps: [["Échauffement", "Marche dynamique", "3 min"], ["Cardio", "Montées de genoux lentes", "4 × 30 sec"], ["Cardio", "Pas chassés", "3 × 35 sec"], ["Renfo", "Squats", "3 × 10"], ["Gainage", "Planche genoux", "3 × 25 sec"], ["Retour au calme", "Étirements", "3 min"]]},
        { title: "Jour 3 · Dragon content", steps: [["Échauffement", "Marche dynamique", "4 min"], ["Cardio", "Montées de genoux", "4 × 35 sec"], ["Cardio", "Pas chassés", "4 × 30 sec"], ["Cardio", "Jumping jack sans saut", "3 × 35 sec"], ["Renfo", "Squats", "3 × 12"], ["Retour au calme", "Étirements", "3 min"]]}
      ]
    },
    {
      id: "forge-guerrier",
      icon: "⚒️",
      title: "Forge du guerrier",
      objective: "Renforcement complet",
      level: "Tous niveaux",
      duration: "20-30 min",
      coaches: "Bazul ou Xara",
      frequency: "3 séances / semaine",
      xp: 40,
      description: "Renforcement général, jambes, haut du corps, posture et centre.",
      sessions: [
        { title: "Jour 1 · Métal de base", steps: [["Échauffement", "Mobilité complète", "4 min"], ["Jambes", "Squats", "3 × 12"], ["Haut du corps", "Pompes inclinées", "3 × 8"], ["Dos/posture", "Superman", "3 × 10"], ["Centre", "Gainage", "3 × 20 sec"], ["Fessiers", "Pont de hanches", "3 × 12"], ["Retour au calme", "Étirements", "4 min"]]},
        { title: "Jour 2 · Enclume stable", steps: [["Échauffement", "Mobilité complète", "4 min"], ["Jambes", "Squats", "3 × 12"], ["Haut du corps", "Pompes murales ou inclinées", "3 × 10"], ["Dos/posture", "Superman", "3 × 10"], ["Centre", "Gainage genoux", "3 × 25 sec"], ["Retour au calme", "Étirements", "4 min"]]},
        { title: "Jour 3 · Lame qui prend forme", steps: [["Échauffement", "Mobilité complète", "5 min"], ["Jambes", "Squats ou fentes", "3 × 12"], ["Haut du corps", "Pompes inclinées", "3 × 10"], ["Centre", "Gainage", "3 × 30 sec"], ["Fessiers", "Pont de hanches", "3 × 15"], ["Retour au calme", "Étirements", "4 min"]]}
      ]
    },
    {
      id: "tour-mage",
      icon: "🧙",
      title: "Tour de mage",
      objective: "Mobilité + gainage",
      level: "Débutant",
      duration: "10-20 min",
      coaches: "Elmin ou Satyne",
      frequency: "2 à 4 séances / semaine",
      xp: 20,
      description: "Mobilité, posture, gainage, récupération. Parfait les jours de fatigue.",
      sessions: [
        { title: "Jour 1 · Cercle de calme", steps: [["Respiration", "Respiration lente", "2 min"], ["Mobilité", "Chat-vache", "1 min"], ["Mobilité", "Rotation thoracique", "1 min"], ["Gainage", "Planche genoux", "3 × 20 sec"], ["Équilibre", "Appui sur une jambe", "2 × 30 sec"], ["Étirement", "Dos, hanches, épaules", "5 min"]]},
        { title: "Jour 2 · Posture du grimoire", steps: [["Respiration", "Respiration lente", "2 min"], ["Mobilité", "Chat-vache", "1 min"], ["Mobilité", "Ouverture des hanches", "2 min"], ["Gainage", "Planche genoux", "3 × 20 sec"], ["Équilibre", "Appui sur une jambe", "2 × 30 sec"], ["Étirement", "Dos et épaules", "5 min"]]},
        { title: "Jour 3 · Mage réveillé", steps: [["Respiration", "Respiration lente", "2 min"], ["Mobilité", "Rotation thoracique", "2 min"], ["Gainage", "Planche genoux", "3 × 25 sec"], ["Équilibre", "Appui sur une jambe", "2 × 40 sec"], ["Étirement", "Dos, hanches, épaules", "6 min"]]}
      ]
    },
    {
      id: "marche-aventurier",
      icon: "🥾",
      title: "Marche de l’aventurier",
      objective: "Endurance douce",
      level: "Tous niveaux",
      duration: "20-45 min",
      coaches: "Violette, Korvan ou Elmin",
      frequency: "4 à 6 fois / semaine",
      xp: 10,
      description: "Endurance douce, perte de poids et habitude quotidienne.",
      sessions: [
        { title: "Jour 1 · Départ du village", steps: [["Marche", "Marche confortable", "15-20 min"], ["Bonus", "Respiration régulière", "pendant la marche"], ["Retour", "Étirement mollets", "2 min"]]},
        { title: "Jour 2 · Route sûre", steps: [["Marche", "Marche active", "20-30 min"], ["Bonus", "Objectif pas", "6000 pas si possible"], ["Retour", "Étirements doux", "3 min"]]},
        { title: "Jour 3 · Long sentier", steps: [["Marche", "Marche active", "30-45 min"], ["Bonus", "Objectif pas", "8000-10000 pas"], ["Retour", "Étirements doux", "4 min"]]}
      ]
    },
    {
      id: "boss-hebdo",
      icon: "👹",
      title: "Défi boss hebdo",
      objective: "Séance plus longue",
      level: "Selon niveau",
      duration: "25-40 min",
      coaches: "Selon le thème",
      frequency: "1 fois / semaine",
      xp: 50,
      description: "Une séance spéciale de fin de semaine avec récompense de boss.",
      sessions: [
        { title: "Boss · Donjon des Courbatures", steps: [["Combat", "Squats", "20"], ["Combat", "Pompes inclinées", "12"], ["Combat", "Gainage", "30 sec"], ["Combat", "Pas chassés", "1 min"], ["Combat", "Pont de hanches", "20"], ["Final", "Respiration finale", "2 min"]]},
        { title: "Boss · Golem du Canapé", steps: [["Combat", "Marche dynamique", "5 min"], ["Combat", "Squats", "20"], ["Combat", "Planche genoux", "30 sec"], ["Combat", "Mountain climbing lent", "40"], ["Final", "Étirements", "4 min"]]},
        { title: "Boss · Dragon du Souffle Court", steps: [["Combat", "Marche dynamique", "5 min"], ["Combat", "Pas chassés", "2 × 1 min"], ["Combat", "Montées de genoux", "3 × 40 sec"], ["Combat", "Squats", "20"], ["Final", "Respiration", "3 min"]]}
      ]
    }
  ];

  function todayString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function loadDone() {
    try { return JSON.parse(localStorage.getItem(PROGRAM_DONE_KEY) || "{}"); }
    catch { return {}; }
  }

  function saveDone(data) {
    localStorage.setItem(PROGRAM_DONE_KEY, JSON.stringify(data));
  }

  function ensureProgramPage() {
    const dashboard = document.querySelector("#dashboard");
    if (!dashboard) return null;
    let page = document.querySelector("#programsToolPage");
    if (page) return page;

    page = document.createElement("section");
    page.id = "programsToolPage";
    page.className = "card custom-tool-page programs-tool hidden";
    page.innerHTML = `
      <div class="tool-page-header">
        <div>
          <p class="eyebrow">Programmes</p>
          <h2>Choisis ton aventure sportive</h2>
          <p class="muted">Des parcours prêts à lancer, avec séances guidées jour par jour.</p>
        </div>
        <button id="programsBackBtn" class="ghost-btn" type="button">Retour</button>
      </div>
      <div id="programsContent"></div>
    `;
    const logCard = document.querySelector("#logCard");
    dashboard.insertBefore(page, logCard || null);
    page.querySelector("#programsBackBtn").addEventListener("click", closeProgramPage);
    return page;
  }

  function setCoreVisible(visible) {
    document.querySelector(".hero-card")?.classList.toggle("hidden", !visible);
    document.querySelector("#sportHub")?.classList.toggle("hidden", !visible);
    document.querySelector("#logCard")?.classList.add("hidden");
  }

  function hideStandardPages() {
    ["#musicPage", "#questsPage", "#weekPage", "#badgesPage"].forEach((selector) => document.querySelector(selector)?.classList.add("hidden"));
    document.querySelectorAll(".custom-tool-page").forEach((page) => page.classList.add("hidden"));
  }

  function openProgramPage() {
    const page = ensureProgramPage();
    if (!page) return;
    hideStandardPages();
    setCoreVisible(false);
    page.classList.remove("hidden");
    renderProgramsList();
    page.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closeProgramPage() {
    document.querySelector("#programsToolPage")?.classList.add("hidden");
    setCoreVisible(true);
  }

  function renderProgramsList() {
    const content = document.querySelector("#programsContent");
    if (!content) return;
    currentProgramId = null;
    sessionStarted = false;
    sessionFinished = false;
    content.innerHTML = `<div class="programs-grid"></div>`;
    const grid = content.querySelector(".programs-grid");
    programs.forEach((program) => {
      const card = document.createElement("button");
      card.className = "program-card";
      card.type = "button";
      card.innerHTML = `
        <div class="program-card-head"><span class="program-icon">${program.icon}</span><div><h3>${program.title}</h3><p>${program.objective}</p></div></div>
        <p>${program.description}</p>
        <div class="program-tags"><span>${program.level}</span><span>${program.duration}</span><span>+${program.xp} XP</span></div>
      `;
      card.addEventListener("click", () => renderProgramDetail(program.id));
      grid.appendChild(card);
    });
  }

  function renderProgramDetail(programId) {
    const program = programs.find((item) => item.id === programId);
    const content = document.querySelector("#programsContent");
    if (!program || !content) return;
    currentProgramId = programId;
    sessionStarted = false;
    sessionFinished = false;

    content.innerHTML = `
      <div class="program-detail-panel">
        <div class="program-detail-hero"><span class="program-icon">${program.icon}</span><div><p class="eyebrow">Programme</p><h2>${program.title}</h2><p>${program.description}</p></div></div>
        <div class="program-meta-grid">
          <article><strong>${program.objective}</strong><span>Objectif</span></article>
          <article><strong>${program.level}</strong><span>Niveau</span></article>
          <article><strong>${program.duration}</strong><span>Durée</span></article>
          <article><strong>${program.coaches}</strong><span>Coach conseillé</span></article>
        </div>
        <div class="section-title-row"><div><h3>Séances du programme</h3><p class="muted">Choisis un jour pour lancer la séance guidée.</p></div><button id="backToProgramsListBtn" class="ghost-btn" type="button">Programmes</button></div>
        <div class="programs-sessions-grid"></div>
      </div>
    `;
    content.querySelector("#backToProgramsListBtn").addEventListener("click", renderProgramsList);
    const grid = content.querySelector(".programs-sessions-grid");
    const done = loadDone();
    program.sessions.forEach((session, index) => {
      const key = `${program.id}:${index}`;
      const card = document.createElement("button");
      card.type = "button";
      card.className = "program-session-card";
      card.innerHTML = `
        <div class="program-session-head"><span class="program-icon">${done[key] ? "✅" : "🗓️"}</span><div><h3>${session.title}</h3><p>${session.steps.length} étapes</p></div></div>
        <span class="program-xp-pill">+${program.xp} XP séance</span>
      `;
      card.addEventListener("click", () => renderSessionRunner(program.id, index));
      grid.appendChild(card);
    });
  }

  function renderSessionRunner(programId, sessionIndex) {
    const program = programs.find((item) => item.id === programId);
    const session = program?.sessions[sessionIndex];
    const content = document.querySelector("#programsContent");
    if (!program || !session || !content) return;
    currentProgramId = programId;
    currentSessionIndex = sessionIndex;
    currentStepIndex = 0;
    sessionStarted = false;
    sessionFinished = false;

    content.innerHTML = `
      <div class="session-runner">
        <div class="section-title-row"><div><p class="eyebrow">${program.title}</p><h2>${session.title}</h2><p class="muted">Avance étape par étape, puis valide la séance.</p></div><button id="backToProgramDetailBtn" class="ghost-btn" type="button">Séances</button></div>
        <div class="session-progress-box"><strong id="sessionProgressText">Prêt à commencer</strong><div class="session-progress-bar"><div id="sessionProgressFill" class="session-progress-fill"></div></div></div>
        <div id="sessionCurrentExercise" class="session-current-exercise"></div>
        <div class="session-controls"><button id="sessionStartNextBtn" class="primary-btn" type="button">Démarrer</button><button id="sessionFinishBtn" class="secondary-btn" type="button">Séance terminée</button></div>
        <ul id="sessionStepList" class="session-step-list"></ul>
      </div>
    `;
    content.querySelector("#backToProgramDetailBtn").addEventListener("click", () => renderProgramDetail(program.id));
    content.querySelector("#sessionStartNextBtn").addEventListener("click", nextStep);
    content.querySelector("#sessionFinishBtn").addEventListener("click", finishSession);
    renderSessionState();
  }

  function renderSessionState() {
    const program = programs.find((item) => item.id === currentProgramId);
    const session = program?.sessions[currentSessionIndex];
    if (!program || !session) return;

    const current = session.steps[Math.min(currentStepIndex, session.steps.length - 1)];
    const doneCount = sessionFinished ? session.steps.length : Math.min(currentStepIndex, session.steps.length);
    const percent = Math.round((doneCount / session.steps.length) * 100);

    document.querySelector("#sessionProgressText").textContent = sessionFinished ? "Séance terminée" : sessionStarted ? `Étape ${Math.min(currentStepIndex + 1, session.steps.length)} / ${session.steps.length}` : "Prêt à commencer";
    document.querySelector("#sessionProgressFill").style.width = `${percent}%`;
    document.querySelector("#sessionCurrentExercise").innerHTML = sessionFinished
      ? `<div class="program-complete-banner"><strong>Boss de séance vaincu !</strong><span>Tu peux retourner aux programmes ou relancer une autre séance.</span></div>`
      : `<span class="phase">${current[0]}</span><span class="exercise-name">${current[1]}</span><span class="exercise-amount">${current[2]}</span>`;

    const nextButton = document.querySelector("#sessionStartNextBtn");
    nextButton.textContent = !sessionStarted ? "Démarrer" : currentStepIndex >= session.steps.length - 1 ? "Dernière étape" : "Exercice suivant";
    nextButton.disabled = sessionFinished;

    const list = document.querySelector("#sessionStepList");
    list.innerHTML = "";
    session.steps.forEach((step, index) => {
      const li = document.createElement("li");
      li.className = index < doneCount ? "done" : "";
      li.innerHTML = `<span>${index < doneCount ? "✅" : index === currentStepIndex && sessionStarted ? "➡️" : "○"}</span><strong>${step[1]}</strong><small>${step[0]} · ${step[2]}</small>`;
      list.appendChild(li);
    });
  }

  function nextStep() {
    const program = programs.find((item) => item.id === currentProgramId);
    const session = program?.sessions[currentSessionIndex];
    if (!program || !session || sessionFinished) return;
    if (!sessionStarted) {
      sessionStarted = true;
      currentStepIndex = 0;
    } else if (currentStepIndex < session.steps.length - 1) {
      currentStepIndex += 1;
    }
    renderSessionState();
  }

  function finishSession() {
    const program = programs.find((item) => item.id === currentProgramId);
    const session = program?.sessions[currentSessionIndex];
    if (!program || !session || sessionFinished) return;
    sessionFinished = true;
    currentStepIndex = session.steps.length;

    try {
      if (profile) {
        const oldLevel = typeof levelInfo === "function" ? levelInfo(profile.totalXp).level : 1;
        profile.totalXp = Number(profile.totalXp || 0) + program.xp;
        profile.xp = Number(profile.xp || 0) + program.xp;
        if (!profile.completedByDate) profile.completedByDate = {};
        const date = todayString();
        const entries = Array.isArray(profile.completedByDate[date]) ? profile.completedByDate[date] : [];
        entries.push({ id: `program-${program.id}`, sportId: "program", sportTitle: "Programme", title: `${program.title} · ${session.title}`, amount: 1, unit: "séance", xp: program.xp, at: new Date().toISOString() });
        profile.completedByDate[date] = entries;
        if (typeof updateStreak === "function") updateStreak();
        if (typeof log === "function") log(`+${program.xp} XP · Programme · ${program.title} · ${session.title}`);
        const newLevel = typeof levelInfo === "function" ? levelInfo(profile.totalXp).level : oldLevel;
        if (newLevel > oldLevel && typeof log === "function") log(`Niveau ${newLevel} atteint !`);
        if (typeof save === "function") save();
      }

      const done = loadDone();
      done[`${program.id}:${currentSessionIndex}`] = new Date().toISOString();
      saveDone(done);

      const coachMsg = document.querySelector("#coachMessage");
      if (coachMsg) coachMsg.textContent = `Programme terminé : ${program.title}. +${program.xp} XP. La route continue.`;
      if (typeof render === "function") render();
      openProgramPage();
      renderSessionRunner(program.id, currentSessionIndex);
      sessionFinished = true;
      currentStepIndex = session.steps.length;
      renderSessionState();
    } catch (error) {
      console.warn("Impossible de valider le programme", error);
    }
  }

  function addProgramButton() {
    const toolbar = document.querySelector("#toolIconBar");
    if (!toolbar) return;
    let button = document.querySelector("#openProgramsBtn");
    if (!button) {
      button = document.createElement("button");
      button.id = "openProgramsBtn";
      button.className = "tool-icon-btn";
      button.type = "button";
      button.innerHTML = `<span>🗺️</span><strong>Programmes</strong><small>Séances guidées</small>`;
      toolbar.insertBefore(button, toolbar.firstChild);
    }
    button.onclick = openProgramPage;
  }

  function patchRender() {
    addProgramButton();
    ensureProgramPage();
    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => { el.textContent = "0.3.3"; });
  }

  patchRender();
  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__programsRenderPatched) {
    window.__programsRenderPatched = true;
    render = function programPatchedRender() {
      oldRender();
      patchRender();
    };
    render();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProgramsModule);
} else {
  initProgramsModule();
}
