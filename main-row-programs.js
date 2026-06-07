function initMainRowPrograms() {
  if (window.__mainRowProgramsReady) return;
  window.__mainRowProgramsReady = true;

  function moveProgramsButton() {
    const row = document.querySelector("#mainTrainingRow");
    const exerciseButton = document.querySelector("#openQuestsBtn");
    const programsButton = document.querySelector("#openProgramsBtn");

    if (!row || !exerciseButton || !programsButton) return;

    row.classList.add("has-programs-main");
    programsButton.classList.remove("tool-icon-btn");
    programsButton.classList.add("hub-nav-btn", "main-programs-btn");

    const expectedHtml = `<span>🗺️</span><strong>Programmes</strong><small>Séances guidées</small>`;
    if (programsButton.innerHTML !== expectedHtml) programsButton.innerHTML = expectedHtml;
    if (programsButton.parentElement !== row) exerciseButton.insertAdjacentElement("afterend", programsButton);

    window.FitnessRpgConfig?.setVersionLabels?.();

  function scheduleMove() {
    window.setTimeout(moveProgramsButton, 0);
    window.setTimeout(moveProgramsButton, 250);
    window.setTimeout(moveProgramsButton, 800);
  }

  scheduleMove();

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__mainRowProgramsRenderPatched) {
    window.__mainRowProgramsRenderPatched = true;
    render = function mainRowProgramPatchedRender() {
      oldRender();
      moveProgramsButton();
      if (typeof window.refreshPersonalGoals === "function") window.refreshPersonalGoals();
      if (typeof window.refreshWeeklyPlanning === "function") window.refreshWeeklyPlanning();
    };
    render();
  }
}

function initPersonalGoalsInline() {
  if (window.__personalGoalsReady) return;
  window.__personalGoalsReady = true;

  const GOAL_KEY = "sportRpgV1PersonalGoal";
  const goals = [
    { id: "perte-poids", icon: "⚖️", title: "Perte de poids", text: "Bouger souvent, marcher davantage et garder une progression douce.", programs: ["Marche de l’aventurier", "Éveil du héros", "Cœur de dragon"], rhythm: "4 à 6 actions légères par semaine", coach: "Violette ou Elmin", tags: ["Marche", "Cardio doux", "Régularité"] },
    { id: "reprise-douce", icon: "🌅", title: "Reprise douce", text: "Remettre le corps en route sans pression, avec des séances courtes.", programs: ["Éveil du héros", "Tour de mage", "Marche de l’aventurier"], rhythm: "3 séances courtes par semaine", coach: "Violette ou Elmin", tags: ["Débutant", "Mobilité", "Confiance"] },
    { id: "cardio", icon: "❤️‍🔥", title: "Cardio", text: "Améliorer le souffle sans transformer la séance en duel contre un dragon adulte.", programs: ["Cœur de dragon", "Marche de l’aventurier", "Défi boss hebdo"], rhythm: "3 séances cardio par semaine", coach: "Korvan ou Xara", tags: ["Souffle", "Endurance", "Énergie"] },
    { id: "renforcement", icon: "⚒️", title: "Renforcement", text: "Construire force, posture et stabilité avec une progression lisible.", programs: ["Forge du guerrier", "Défi boss hebdo", "Tour de mage"], rhythm: "3 séances de renforcement par semaine", coach: "Bazul ou Xara", tags: ["Force", "Posture", "Gainage"] },
    { id: "regularite", icon: "📅", title: "Régularité", text: "Créer l’habitude avant de chercher la performance. Le vrai boss, c’est demain.", programs: ["Marche de l’aventurier", "Éveil du héros", "Tour de mage"], rhythm: "Une petite action presque chaque jour", coach: "Violette, Elmin ou Korvan", tags: ["Habitude", "Série", "Sans pression"] },
    { id: "mobilite", icon: "🧘", title: "Mobilité / récupération", text: "Bouger mieux, récupérer et sauver les jours de fatigue sans casser la série.", programs: ["Tour de mage", "Éveil du héros", "Marche de l’aventurier"], rhythm: "2 à 4 séances souples par semaine", coach: "Elmin ou Satyne", tags: ["Souplesse", "Posture", "Récupération"] }
  ];

  function injectStyle() {
    if (document.querySelector("#personalGoalsInlineStyle")) return;
    const style = document.createElement("style");
    style.id = "personalGoalsInlineStyle";
    style.textContent = `
      .goal-recommendation-card,.goal-current-card{display:grid;grid-template-columns:54px 1fr auto;gap:12px;align-items:center;margin-top:12px;padding:12px;border-radius:18px;border:1px solid rgba(240,184,79,.28);background:rgba(240,184,79,.07)}
      .goal-current-card{grid-template-columns:58px 1fr;margin-top:0}.goal-recommendation-icon,.goal-icon,.goal-card-icon{display:grid;place-items:center;border-radius:16px;background:rgba(240,184,79,.13);font-size:1.8rem}.goal-recommendation-icon{width:54px;height:54px}.goal-icon{width:58px;height:58px}.goal-card-icon{width:46px;height:46px;font-size:1.55rem}.goal-page{display:grid;gap:14px}.goal-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}.goal-card{display:grid;gap:9px;padding:13px;border-radius:18px;border:1px solid var(--line);background:rgba(255,255,255,.035);color:var(--text);text-align:left;cursor:pointer}.goal-card.active,.program-card.goal-recommended{border-color:rgba(240,184,79,.55);background:rgba(240,184,79,.10)}.goal-card-head{display:grid;grid-template-columns:46px 1fr;gap:10px;align-items:center}.goal-card h3,.goal-page h3{margin:0}.goal-card p,.goal-current-card p,.goal-recommendation-card p{margin:0;color:var(--muted);line-height:1.32}.goal-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}.goal-tags span{padding:4px 7px;border-radius:999px;border:1px solid rgba(240,184,79,.25);background:rgba(240,184,79,.07);color:var(--accent);font-size:.72rem;font-weight:800}.goal-actions{display:grid;grid-template-columns:auto auto;gap:8px}.program-card.goal-recommended::before{content:"🎯 Recommandé";justify-self:start;padding:4px 8px;border-radius:999px;background:rgba(240,184,79,.14);color:var(--accent);font-size:.72rem;font-weight:900}
      @media(max-width:780px){.goal-recommendation-card{grid-template-columns:42px 1fr;padding:10px;gap:8px;border-radius:15px}.goal-recommendation-icon,.goal-icon{width:42px;height:42px;font-size:1.4rem}.goal-actions{grid-column:1/-1;grid-template-columns:1fr 1fr}.goal-grid{grid-template-columns:1fr;gap:8px}.goal-card{padding:10px;border-radius:14px}.goal-card-head{grid-template-columns:40px 1fr;gap:8px}.goal-card-icon{width:40px;height:40px;font-size:1.35rem}.goal-card p{font-size:.76rem;line-height:1.22}.goal-tags span{font-size:.65rem}}
    `;
    document.head.appendChild(style);
  }

  function getGoal() {
    const id = (typeof profile !== "undefined" && profile?.goalId) || localStorage.getItem(GOAL_KEY) || "reprise-douce";
    return goals.find((goal) => goal.id === id) || goals[1];
  }

  function saveGoal(id) {
    const goal = goals.find((item) => item.id === id) || goals[1];
    localStorage.setItem(GOAL_KEY, goal.id);
    if (typeof profile !== "undefined" && profile) {
      profile.goalId = goal.id;
      if (typeof log === "function") log(`Objectif personnel : ${goal.icon} ${goal.title}`);
      if (typeof save === "function") save();
    }
    const coachMsg = document.querySelector("#coachMessage");
    if (coachMsg) coachMsg.textContent = `Objectif choisi : ${goal.title}. ${goal.rhythm}.`;
    refresh();
  }

  function ensurePage() {
    const dashboard = document.querySelector("#dashboard");
    if (!dashboard) return null;
    let page = document.querySelector("#goalToolPage");
    if (page) return page;
    page = document.createElement("section");
    page.id = "goalToolPage";
    page.className = "card custom-tool-page goal-page hidden";
    page.innerHTML = `<div class="tool-page-header"><div><p class="eyebrow">Objectifs</p><h2>Objectif personnel</h2><p class="muted">Choisis la direction de ton aventure sportive. Les programmes conseillés seront mis en avant.</p></div><button id="goalBackBtn" class="ghost-btn" type="button">Retour</button></div><div id="goalContent"></div>`;
    dashboard.insertBefore(page, document.querySelector("#logCard") || null);
    page.querySelector("#goalBackBtn").addEventListener("click", () => { page.classList.add("hidden"); document.querySelector(".hero-card")?.classList.remove("hidden"); document.querySelector("#sportHub")?.classList.remove("hidden"); });
    return page;
  }

  function openGoalPage() {
    const page = ensurePage();
    if (!page) return;
    ["#musicPage","#questsPage","#weekPage","#badgesPage","#programsToolPage","#journalToolPage","#weightToolPage","#planningToolPage"].forEach((selector) => document.querySelector(selector)?.classList.add("hidden"));
    document.querySelector(".hero-card")?.classList.add("hidden");
    document.querySelector("#sportHub")?.classList.add("hidden");
    page.classList.remove("hidden");
    renderGoalPage();
    page.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderGoalPage() {
    const page = ensurePage();
    const content = page?.querySelector("#goalContent");
    if (!content) return;
    const current = getGoal();
    content.innerHTML = `<article class="goal-current-card"><span class="goal-icon">${current.icon}</span><div><p class="eyebrow">Objectif actuel</p><h3>${current.title}</h3><p>${current.text}</p><div class="goal-tags"><span>${current.rhythm}</span><span>Coach : ${current.coach}</span></div></div></article><div class="goal-grid"></div>`;
    const grid = content.querySelector(".goal-grid");
    goals.forEach((goal) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = `goal-card${goal.id === current.id ? " active" : ""}`;
      card.innerHTML = `<div class="goal-card-head"><span class="goal-card-icon">${goal.icon}</span><div><h3>${goal.title}</h3><p>${goal.text}</p></div></div><div class="goal-tags">${goal.tags.map((tag) => `<span>${tag}</span>`).join("")}</div><p><strong>Rythme :</strong> ${goal.rhythm}</p>`;
      card.addEventListener("click", () => saveGoal(goal.id));
      grid.appendChild(card);
    });
  }

  function addButton() {
    const toolbar = document.querySelector("#toolIconBar");
    if (!toolbar) return;
    let button = document.querySelector("#openGoalBtn");
    if (!button) {
      button = document.createElement("button");
      button.id = "openGoalBtn";
      button.className = "tool-icon-btn";
      button.type = "button";
      button.innerHTML = `<span>🎯</span><strong>Objectifs</strong><small>Personnel</small>`;
      toolbar.insertBefore(button, toolbar.firstChild);
    }
    button.onclick = openGoalPage;
  }

  function renderRecommendation() {
    const row = document.querySelector("#mainTrainingRow");
    if (!row) return;
    const goal = getGoal();
    let card = document.querySelector("#goalRecommendationCard");
    if (!card) {
      card = document.createElement("article");
      card.id = "goalRecommendationCard";
      card.className = "goal-recommendation-card";
      row.insertAdjacentElement("afterend", card);
    }
    card.innerHTML = `<span class="goal-recommendation-icon">${goal.icon}</span><div><p class="eyebrow">Objectif actuel</p><h3>${goal.title}</h3><p>${goal.rhythm} · Conseillés : ${goal.programs.join(", ")}</p></div><div class="goal-actions"><button class="ghost-btn" id="miniGoalBtn" type="button">Changer</button><button class="secondary-btn" id="goalProgramsBtn" type="button">Voir</button></div>`;
    card.querySelector("#miniGoalBtn").onclick = openGoalPage;
    card.querySelector("#goalProgramsBtn").onclick = () => { document.querySelector("#openProgramsBtn")?.click(); setTimeout(highlightPrograms, 160); };
  }

  function highlightPrograms() {
    const goal = getGoal();
    document.querySelectorAll(".program-card").forEach((card) => {
      const title = card.querySelector("h3")?.textContent || "";
      card.classList.toggle("goal-recommended", goal.programs.includes(title));
    });
  }

  function refresh() {
    injectStyle();
    ensurePage();
    addButton();
    renderRecommendation();
    highlightPrograms();
    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => { el.textContent = "0.3.8"; });
  }

  window.openGoalPage = openGoalPage;
  window.getPersonalGoal = getGoal;
  window.refreshPersonalGoals = refresh;
  document.addEventListener("click", (event) => { if (event.target?.closest?.("#openProgramsBtn")) setTimeout(highlightPrograms, 200); });
  refresh();
}

function initWeeklyPlanningInline() {
  if (window.__weeklyPlanningReady) return;
  window.__weeklyPlanningReady = true;

  const PLAN_KEY = "sportRpgV1WeeklyPlanningDone";
  const PROGRAM_XP = {
    "Éveil du héros": 20,
    "Cœur de dragon": 40,
    "Forge du guerrier": 40,
    "Tour de mage": 20,
    "Marche de l’aventurier": 10,
    "Défi boss hebdo": 50,
    "Repos actif": 5
  };

  const templates = {
    "Perte de poids": ["Marche de l’aventurier", "Éveil du héros", "Repos actif", "Marche de l’aventurier", "Cœur de dragon", "Marche de l’aventurier", "Repos actif"],
    "Reprise douce": ["Éveil du héros", "Repos actif", "Tour de mage", "Repos actif", "Éveil du héros", "Marche de l’aventurier", "Repos actif"],
    "Cardio": ["Cœur de dragon", "Repos actif", "Marche de l’aventurier", "Cœur de dragon", "Repos actif", "Défi boss hebdo", "Tour de mage"],
    "Renforcement": ["Forge du guerrier", "Tour de mage", "Repos actif", "Forge du guerrier", "Marche de l’aventurier", "Défi boss hebdo", "Repos actif"],
    "Régularité": ["Marche de l’aventurier", "Éveil du héros", "Tour de mage", "Marche de l’aventurier", "Éveil du héros", "Repos actif", "Défi boss hebdo"],
    "Mobilité / récupération": ["Tour de mage", "Marche de l’aventurier", "Tour de mage", "Repos actif", "Éveil du héros", "Tour de mage", "Repos actif"]
  };

  const labels = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  const subtitles = {
    "Éveil du héros": "Reprise douce · 10-15 min",
    "Cœur de dragon": "Cardio léger · 15-25 min",
    "Forge du guerrier": "Renforcement · 20-30 min",
    "Tour de mage": "Mobilité + gainage · 10-20 min",
    "Marche de l’aventurier": "Endurance douce · 20-45 min",
    "Défi boss hebdo": "Boss hebdo · 25-40 min",
    "Repos actif": "Respiration, marche très douce ou étirements · 5-10 min"
  };
  const icons = { "Éveil du héros": "🌅", "Cœur de dragon": "❤️‍🔥", "Forge du guerrier": "⚒️", "Tour de mage": "🧙", "Marche de l’aventurier": "🥾", "Défi boss hebdo": "👹", "Repos actif": "🌙" };

  function injectStyle() {
    if (document.querySelector("#weeklyPlanningStyle")) return;
    const style = document.createElement("style");
    style.id = "weeklyPlanningStyle";
    style.textContent = `
      .planning-page{display:grid;gap:14px}.planning-summary{display:grid;grid-template-columns:56px 1fr;gap:12px;align-items:center;padding:12px;border-radius:18px;border:1px solid rgba(240,184,79,.28);background:rgba(240,184,79,.08)}.planning-summary-icon{width:56px;height:56px;display:grid;place-items:center;border-radius:18px;background:rgba(240,184,79,.14);font-size:2rem}.planning-week-grid{display:grid;gap:9px}.planning-day-card{display:grid;grid-template-columns:50px 1fr auto;gap:10px;align-items:center;padding:11px;border-radius:16px;border:1px solid var(--line);background:rgba(255,255,255,.035)}.planning-day-card.today{border-color:rgba(240,184,79,.55);background:rgba(240,184,79,.10)}.planning-day-card.done{border-color:rgba(74,222,128,.35);background:rgba(74,222,128,.08)}.planning-day-icon{width:50px;height:50px;display:grid;place-items:center;border-radius:15px;background:rgba(255,255,255,.05);font-size:1.55rem}.planning-day-card h3,.planning-summary h3{margin:0}.planning-day-card p,.planning-summary p{margin:0;color:var(--muted);line-height:1.25}.planning-actions{display:grid;grid-template-columns:auto auto;gap:7px}.planning-actions button{min-height:38px;padding:8px 10px;border-radius:12px}.planning-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.planning-stats article{padding:10px;border-radius:14px;border:1px solid var(--line);background:rgba(255,255,255,.03);text-align:center}.planning-stats strong{display:block;color:var(--accent);font-size:1.1rem}.planning-stats span{color:var(--muted);font-size:.74rem}
      @media(max-width:780px){.planning-page{gap:10px}.planning-summary{grid-template-columns:42px 1fr;padding:10px;border-radius:15px}.planning-summary-icon{width:42px;height:42px;font-size:1.45rem}.planning-summary h3{font-size:1rem}.planning-summary p{font-size:.76rem}.planning-day-card{grid-template-columns:40px 1fr;padding:9px;gap:8px;border-radius:14px}.planning-day-icon{width:40px;height:40px;font-size:1.3rem;border-radius:12px}.planning-day-card h3{font-size:.96rem}.planning-day-card p{font-size:.73rem}.planning-actions{grid-column:1/-1;grid-template-columns:1fr 1fr}.planning-actions button{min-height:36px;padding:7px}.planning-stats{gap:6px}.planning-stats article{padding:8px 5px}.planning-stats strong{font-size:.95rem}.planning-stats span{font-size:.65rem}}
    `;
    document.head.appendChild(style);
  }

  function mondayIndex() {
    const jsDay = new Date().getDay();
    return jsDay === 0 ? 6 : jsDay - 1;
  }

  function todayString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }

  function weekKey() {
    const d = new Date();
    const day = d.getDay() === 0 ? 6 : d.getDay() - 1;
    d.setDate(d.getDate() - day);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }

  function loadDone() {
    try { return JSON.parse(localStorage.getItem(PLAN_KEY) || "{}"); }
    catch { return {}; }
  }

  function saveDone(done) {
    localStorage.setItem(PLAN_KEY, JSON.stringify(done));
  }

  function currentGoal() {
    return typeof window.getPersonalGoal === "function" ? window.getPersonalGoal() : { title: "Reprise douce", icon: "🌅" };
  }

  function currentPlan() {
    const goal = currentGoal();
    return templates[goal.title] || templates["Reprise douce"];
  }

  function ensurePage() {
    const dashboard = document.querySelector("#dashboard");
    if (!dashboard) return null;
    let page = document.querySelector("#planningToolPage");
    if (page) return page;
    page = document.createElement("section");
    page.id = "planningToolPage";
    page.className = "card custom-tool-page planning-page hidden";
    page.innerHTML = `<div class="tool-page-header"><div><p class="eyebrow">Planning</p><h2>Planning hebdomadaire</h2><p class="muted">Une proposition simple selon ton objectif personnel. Pas de punition, juste une carte de route.</p></div><button id="planningBackBtn" class="ghost-btn" type="button">Retour</button></div><div id="planningContent"></div>`;
    dashboard.insertBefore(page, document.querySelector("#logCard") || null);
    page.querySelector("#planningBackBtn").addEventListener("click", closePage);
    return page;
  }

  function closePage() {
    document.querySelector("#planningToolPage")?.classList.add("hidden");
    document.querySelector(".hero-card")?.classList.remove("hidden");
    document.querySelector("#sportHub")?.classList.remove("hidden");
  }

  function openPage() {
    const page = ensurePage();
    if (!page) return;
    ["#musicPage","#questsPage","#weekPage","#badgesPage","#programsToolPage","#journalToolPage","#weightToolPage","#goalToolPage"].forEach((selector) => document.querySelector(selector)?.classList.add("hidden"));
    document.querySelector(".hero-card")?.classList.add("hidden");
    document.querySelector("#sportHub")?.classList.add("hidden");
    page.classList.remove("hidden");
    renderPage();
    page.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateDay(index, programName) {
    const done = loadDone();
    const key = `${weekKey()}:${index}`;
    if (done[key]) return;
    done[key] = { at: new Date().toISOString(), program: programName };
    saveDone(done);

    const xp = PROGRAM_XP[programName] || 10;
    try {
      if (typeof profile !== "undefined" && profile) {
        profile.totalXp = Number(profile.totalXp || 0) + xp;
        profile.xp = Number(profile.xp || 0) + xp;
        if (!profile.completedByDate) profile.completedByDate = {};
        const date = todayString();
        const entries = Array.isArray(profile.completedByDate[date]) ? profile.completedByDate[date] : [];
        entries.push({ id: `planning-${index}`, sportId: "planning", sportTitle: "Planning", title: `${labels[index]} · ${programName}`, amount: 1, unit: "séance", xp, at: new Date().toISOString() });
        profile.completedByDate[date] = entries;
        if (typeof updateStreak === "function") updateStreak();
        if (typeof log === "function") log(`+${xp} XP · Planning · ${labels[index]} · ${programName}`);
        if (typeof save === "function") save();
        if (typeof render === "function") render();
      }
    } catch (error) { console.warn("Validation planning impossible", error); }

    const coachMsg = document.querySelector("#coachMessage");
    if (coachMsg) coachMsg.textContent = `Planning validé : ${programName}. +${xp} XP.`;
    openPage();
  }

  function renderPage() {
    const page = ensurePage();
    const content = page?.querySelector("#planningContent");
    if (!content) return;
    const goal = currentGoal();
    const plan = currentPlan();
    const done = loadDone();
    const prefix = weekKey();
    const todayIdx = mondayIndex();
    const doneCount = plan.filter((_, index) => done[`${prefix}:${index}`]).length;
    const totalXp = plan.reduce((sum, program) => sum + (done[`${prefix}:${plan.indexOf(program)}`] ? (PROGRAM_XP[program] || 10) : 0), 0);

    content.innerHTML = `<article class="planning-summary"><span class="planning-summary-icon">${goal.icon || "🗓️"}</span><div><p class="eyebrow">Objectif : ${goal.title}</p><h3>Semaine guidée</h3><p>${goal.rhythm || "Un rythme souple"}. La carte s’adapte à ton objectif actuel.</p></div></article><div class="planning-stats"><article><strong>${doneCount}/7</strong><span>jours validés</span></article><article><strong>${totalXp}</strong><span>XP planning</span></article><article><strong>${labels[todayIdx]}</strong><span>aujourd’hui</span></article></div><div class="planning-week-grid"></div>`;
    const grid = content.querySelector(".planning-week-grid");

    plan.forEach((programName, index) => {
      const key = `${prefix}:${index}`;
      const isDone = Boolean(done[key]);
      const card = document.createElement("article");
      card.className = `planning-day-card${index === todayIdx ? " today" : ""}${isDone ? " done" : ""}`;
      card.innerHTML = `<span class="planning-day-icon">${isDone ? "✅" : icons[programName] || "🗓️"}</span><div><p class="eyebrow">${labels[index]}${index === todayIdx ? " · Aujourd’hui" : ""}</p><h3>${programName}</h3><p>${subtitles[programName] || "Séance conseillée"}</p></div><div class="planning-actions"><button class="ghost-btn planning-open-programs" type="button">Programme</button><button class="primary-btn planning-validate" type="button" ${isDone ? "disabled" : ""}>${isDone ? "Validé" : "Valider"}</button></div>`;
      card.querySelector(".planning-open-programs").addEventListener("click", () => { document.querySelector("#openProgramsBtn")?.click(); });
      card.querySelector(".planning-validate").addEventListener("click", () => validateDay(index, programName));
      grid.appendChild(card);
    });
  }

  function addButton() {
    const toolbar = document.querySelector("#toolIconBar");
    if (!toolbar) return;
    let button = document.querySelector("#openPlanningBtn");
    if (!button) {
      button = document.createElement("button");
      button.id = "openPlanningBtn";
      button.className = "tool-icon-btn";
      button.type = "button";
      button.innerHTML = `<span>🗓️</span><strong>Planning</strong><small>Semaine</small>`;
      toolbar.insertBefore(button, toolbar.children[1] || null);
    }
    button.onclick = openPage;
  }

  function refresh() {
    injectStyle();
    ensurePage();
    addButton();
    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => { el.textContent = "0.3.8"; });
  }

  window.openWeeklyPlanning = openPage;
  window.refreshWeeklyPlanning = refresh;
  refresh();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMainRowPrograms);
  document.addEventListener("DOMContentLoaded", initPersonalGoalsInline);
  document.addEventListener("DOMContentLoaded", initWeeklyPlanningInline);
} else {
  initMainRowPrograms();
  initPersonalGoalsInline();
  initWeeklyPlanningInline();
}
