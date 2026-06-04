function initPersonalGoalsModule() {
  if (window.__personalGoalsReady) return;
  window.__personalGoalsReady = true;

  const GOAL_KEY = "sportRpgV1PersonalGoal";

  const GOALS = [
    {
      id: "perte-poids",
      icon: "⚖️",
      title: "Perte de poids",
      text: "Bouger souvent, marcher davantage et garder une progression douce.",
      recommendedPrograms: ["marche-aventurier", "eveil-heros", "coeur-dragon"],
      rhythm: "4 à 6 actions légères par semaine",
      coach: "Violette ou Elmin",
      tags: ["Marche", "Cardio doux", "Régularité"],
      message: "Objectif choisi : perte de poids. On avance avec patience, pas avec un fouet."
    },
    {
      id: "reprise-douce",
      icon: "🌅",
      title: "Reprise douce",
      text: "Remettre le corps en route sans pression, avec des séances courtes.",
      recommendedPrograms: ["eveil-heros", "tour-mage", "marche-aventurier"],
      rhythm: "3 séances courtes par semaine",
      coach: "Violette ou Elmin",
      tags: ["Débutant", "Mobilité", "Confiance"],
      message: "Objectif choisi : reprise douce. Petit pas, vraie victoire."
    },
    {
      id: "cardio",
      icon: "❤️‍🔥",
      title: "Cardio",
      text: "Améliorer le souffle sans transformer la séance en duel contre un dragon adulte.",
      recommendedPrograms: ["coeur-dragon", "marche-aventurier", "boss-hebdo"],
      rhythm: "3 séances cardio par semaine",
      coach: "Korvan ou Xara",
      tags: ["Souffle", "Endurance", "Énergie"],
      message: "Objectif choisi : cardio. On va rallumer la forge du souffle."
    },
    {
      id: "renforcement",
      icon: "⚒️",
      title: "Renforcement",
      text: "Construire force, posture et stabilité avec une progression lisible.",
      recommendedPrograms: ["forge-guerrier", "boss-hebdo", "tour-mage"],
      rhythm: "3 séances de renforcement par semaine",
      coach: "Bazul ou Xara",
      tags: ["Force", "Posture", "Gainage"],
      message: "Objectif choisi : renforcement. La forge est ouverte."
    },
    {
      id: "regularite",
      icon: "📅",
      title: "Régularité",
      text: "Créer l’habitude avant de chercher la performance. Le vrai boss, c’est demain.",
      recommendedPrograms: ["marche-aventurier", "eveil-heros", "tour-mage"],
      rhythm: "Une petite action presque chaque jour",
      coach: "Violette, Elmin ou Korvan",
      tags: ["Habitude", "Série", "Sans pression"],
      message: "Objectif choisi : régularité. On gagne la campagne un jour après l’autre."
    },
    {
      id: "mobilite",
      icon: "🧘",
      title: "Mobilité / récupération",
      text: "Bouger mieux, récupérer et sauver les jours de fatigue sans casser la série.",
      recommendedPrograms: ["tour-mage", "eveil-heros", "marche-aventurier"],
      rhythm: "2 à 4 séances souples par semaine",
      coach: "Elmin ou Satyne",
      tags: ["Souplesse", "Posture", "Récupération"],
      message: "Objectif choisi : mobilité. La magie lente fait aussi gagner des niveaux."
    }
  ];

  function loadGoalId() {
    try {
      if (typeof profile !== "undefined" && profile && profile.goalId) return profile.goalId;
      return localStorage.getItem(GOAL_KEY) || "reprise-douce";
    } catch {
      return "reprise-douce";
    }
  }

  function getGoal(goalId = loadGoalId()) {
    return GOALS.find((goal) => goal.id === goalId) || GOALS[1];
  }

  function saveGoal(goalId) {
    const goal = getGoal(goalId);
    localStorage.setItem(GOAL_KEY, goal.id);

    try {
      if (typeof profile !== "undefined" && profile) {
        profile.goalId = goal.id;
        if (typeof log === "function") log(`Objectif personnel : ${goal.icon} ${goal.title}`);
        if (typeof save === "function") save();
      }
    } catch {}

    const coachMsg = document.querySelector("#coachMessage");
    if (coachMsg) coachMsg.textContent = goal.message;

    renderGoalPage();
    renderGoalRecommendation();
    highlightRecommendedPrograms();
  }

  function ensureStyleLoaded() {
    if (document.querySelector('link[href="personal-goals.css"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "personal-goals.css";
    document.head.appendChild(link);
  }

  function ensureGoalPage() {
    const dashboard = document.querySelector("#dashboard");
    if (!dashboard) return null;

    let page = document.querySelector("#goalToolPage");
    if (page) return page;

    page = document.createElement("section");
    page.id = "goalToolPage";
    page.className = "card custom-tool-page goal-page hidden";
    page.innerHTML = `
      <div class="tool-page-header">
        <div>
          <p class="eyebrow">Objectifs</p>
          <h2>Objectif personnel</h2>
          <p class="muted">Choisis la direction de ton aventure sportive. Les programmes conseillés seront mis en avant.</p>
        </div>
        <button id="goalBackBtn" class="ghost-btn" type="button">Retour</button>
      </div>
      <div id="goalContent"></div>
    `;

    const logCard = document.querySelector("#logCard");
    dashboard.insertBefore(page, logCard || null);
    page.querySelector("#goalBackBtn")?.addEventListener("click", closeGoalPage);
    return page;
  }

  function setCoreVisible(visible) {
    document.querySelector(".hero-card")?.classList.toggle("hidden", !visible);
    document.querySelector("#sportHub")?.classList.toggle("hidden", !visible);
    document.querySelector("#logCard")?.classList.add("hidden");
  }

  function hideStandardPages() {
    ["#musicPage", "#questsPage", "#weekPage", "#badgesPage", "#programsToolPage", "#journalToolPage", "#weightToolPage"].forEach((selector) => {
      document.querySelector(selector)?.classList.add("hidden");
    });
  }

  function openGoalPage() {
    const page = ensureGoalPage();
    if (!page) return;
    hideStandardPages();
    setCoreVisible(false);
    page.classList.remove("hidden");
    renderGoalPage();
    page.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closeGoalPage() {
    document.querySelector("#goalToolPage")?.classList.add("hidden");
    setCoreVisible(true);
  }

  function renderGoalPage() {
    const page = ensureGoalPage();
    if (!page) return;

    const selected = getGoal();
    const content = page.querySelector("#goalContent");
    if (!content) return;

    content.innerHTML = `
      <article class="goal-current-card">
        <span class="goal-icon">${selected.icon}</span>
        <div>
          <p class="eyebrow">Objectif actuel</p>
          <h3>${selected.title}</h3>
          <p>${selected.text}</p>
          <div class="goal-tags"><span>${selected.rhythm}</span><span>Coach : ${selected.coach}</span></div>
        </div>
      </article>
      <div class="goal-grid"></div>
    `;

    const grid = content.querySelector(".goal-grid");
    GOALS.forEach((goal) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = `goal-card${goal.id === selected.id ? " active" : ""}`;
      card.innerHTML = `
        <div class="goal-card-head">
          <span class="goal-card-icon">${goal.icon}</span>
          <div><h3>${goal.title}</h3><p>${goal.text}</p></div>
        </div>
        <div class="goal-tags">${goal.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        <p><strong>Rythme :</strong> ${goal.rhythm}</p>
      `;
      card.addEventListener("click", () => saveGoal(goal.id));
      grid.appendChild(card);
    });
  }

  function renderGoalRecommendation() {
    const sportHub = document.querySelector("#sportHub");
    const mainRow = document.querySelector("#mainTrainingRow");
    if (!sportHub || !mainRow) return;

    const goal = getGoal();
    let card = document.querySelector("#goalRecommendationCard");
    if (!card) {
      card = document.createElement("article");
      card.id = "goalRecommendationCard";
      card.className = "goal-recommendation-card";
      mainRow.insertAdjacentElement("afterend", card);
    }

    card.innerHTML = `
      <span class="goal-recommendation-icon">${goal.icon}</span>
      <div>
        <p class="eyebrow">Objectif actuel</p>
        <h3>${goal.title}</h3>
        <p>${goal.rhythm} · Programmes conseillés : ${goal.recommendedPrograms.map(formatProgramName).join(", ")}</p>
      </div>
      <div class="goal-recommendation-actions">
        <button id="openGoalPageBtnMini" class="ghost-btn" type="button">Changer</button>
        <button id="openRecommendedProgramsBtn" class="secondary-btn" type="button">Voir</button>
      </div>
    `;

    card.querySelector("#openGoalPageBtnMini")?.addEventListener("click", openGoalPage);
    card.querySelector("#openRecommendedProgramsBtn")?.addEventListener("click", () => {
      document.querySelector("#openProgramsBtn")?.click();
      window.setTimeout(highlightRecommendedPrograms, 100);
    });
  }

  function formatProgramName(programId) {
    const names = {
      "eveil-heros": "Éveil du héros",
      "coeur-dragon": "Cœur de dragon",
      "forge-guerrier": "Forge du guerrier",
      "tour-mage": "Tour de mage",
      "marche-aventurier": "Marche de l’aventurier",
      "boss-hebdo": "Défi boss hebdo"
    };
    return names[programId] || programId;
  }

  function addGoalButton() {
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

  function highlightRecommendedPrograms() {
    const goal = getGoal();
    const cards = document.querySelectorAll(".program-card");
    if (!cards.length) return;

    cards.forEach((card) => {
      const title = card.querySelector("h3")?.textContent || "";
      const isRecommended = goal.recommendedPrograms.some((id) => formatProgramName(id) === title);
      card.classList.toggle("goal-recommended", isRecommended);
    });
  }

  function patch() {
    ensureStyleLoaded();
    ensureGoalPage();
    addGoalButton();
    renderGoalRecommendation();
    highlightRecommendedPrograms();

    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => {
      el.textContent = "0.3.7";
    });
  }

  window.openGoalPage = openGoalPage;
  window.getPersonalGoal = getGoal;
  window.highlightRecommendedPrograms = highlightRecommendedPrograms;

  patch();

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__personalGoalsRenderPatched) {
    window.__personalGoalsRenderPatched = true;
    render = function personalGoalsPatchedRender() {
      oldRender();
      patch();
    };
    render();
  }

  document.addEventListener("click", (event) => {
    if (event.target?.closest?.("#openProgramsBtn")) {
      window.setTimeout(highlightRecommendedPrograms, 120);
      window.setTimeout(highlightRecommendedPrograms, 500);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPersonalGoalsModule);
} else {
  initPersonalGoalsModule();
}
