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

    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => {
      el.textContent = "0.3.7";
    });
  }

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
    ["#musicPage","#questsPage","#weekPage","#badgesPage","#programsToolPage","#journalToolPage","#weightToolPage"].forEach((selector) => document.querySelector(selector)?.classList.add("hidden"));
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
    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => { el.textContent = "0.3.7"; });
  }

  window.openGoalPage = openGoalPage;
  window.getPersonalGoal = getGoal;
  window.refreshPersonalGoals = refresh;
  document.addEventListener("click", (event) => { if (event.target?.closest?.("#openProgramsBtn")) setTimeout(highlightPrograms, 200); });
  refresh();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMainRowPrograms);
  document.addEventListener("DOMContentLoaded", initPersonalGoalsInline);
} else {
  initMainRowPrograms();
  initPersonalGoalsInline();
}
