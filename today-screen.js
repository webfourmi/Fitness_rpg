function initTodayScreen() {
  if (window.__todayScreenReady) return;
  window.__todayScreenReady = true;

  const TODAY_KEY = "sportRpgV1TodayDone";
  const PROGRAM_XP = {
    "Éveil du héros": 20,
    "Cœur de dragon": 40,
    "Forge du guerrier": 40,
    "Tour de mage": 20,
    "Marche de l’aventurier": 10,
    "Défi boss hebdo": 50,
    "Repos actif": 5
  };

  const planTemplates = {
    "Perte de poids": ["Marche de l’aventurier", "Éveil du héros", "Repos actif", "Marche de l’aventurier", "Cœur de dragon", "Marche de l’aventurier", "Repos actif"],
    "Reprise douce": ["Éveil du héros", "Repos actif", "Tour de mage", "Repos actif", "Éveil du héros", "Marche de l’aventurier", "Repos actif"],
    "Cardio": ["Cœur de dragon", "Repos actif", "Marche de l’aventurier", "Cœur de dragon", "Repos actif", "Défi boss hebdo", "Tour de mage"],
    "Renforcement": ["Forge du guerrier", "Tour de mage", "Repos actif", "Forge du guerrier", "Marche de l’aventurier", "Défi boss hebdo", "Repos actif"],
    "Régularité": ["Marche de l’aventurier", "Éveil du héros", "Tour de mage", "Marche de l’aventurier", "Éveil du héros", "Repos actif", "Défi boss hebdo"],
    "Mobilité / récupération": ["Tour de mage", "Marche de l’aventurier", "Tour de mage", "Repos actif", "Éveil du héros", "Tour de mage", "Repos actif"]
  };

  const icons = {
    "Éveil du héros": "🌅",
    "Cœur de dragon": "❤️‍🔥",
    "Forge du guerrier": "⚒️",
    "Tour de mage": "🧙",
    "Marche de l’aventurier": "🥾",
    "Défi boss hebdo": "👹",
    "Repos actif": "🌙"
  };

  const subtitles = {
    "Éveil du héros": "Reprise douce · 10-15 min",
    "Cœur de dragon": "Cardio léger · 15-25 min",
    "Forge du guerrier": "Renforcement · 20-30 min",
    "Tour de mage": "Mobilité + gainage · 10-20 min",
    "Marche de l’aventurier": "Endurance douce · 20-45 min",
    "Défi boss hebdo": "Boss hebdo · 25-40 min",
    "Repos actif": "Respiration, marche très douce ou étirements · 5-10 min"
  };

  function todayString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function mondayIndex() {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1;
  }

  function currentGoal() {
    return typeof window.getPersonalGoal === "function" ? window.getPersonalGoal() : { title: "Reprise douce", icon: "🌅", rhythm: "3 séances courtes par semaine" };
  }

  function todayProgram() {
    const goal = currentGoal();
    const plan = planTemplates[goal.title] || planTemplates["Reprise douce"];
    return plan[mondayIndex()] || "Éveil du héros";
  }

  function loadDone() {
    try { return JSON.parse(localStorage.getItem(TODAY_KEY) || "{}"); }
    catch { return {}; }
  }

  function saveDone(done) {
    localStorage.setItem(TODAY_KEY, JSON.stringify(done));
  }

  function isDoneToday() {
    return Boolean(loadDone()[todayString()]);
  }

  function ensurePage() {
    const dashboard = document.querySelector("#dashboard");
    if (!dashboard) return null;
    let page = document.querySelector("#todayToolPage");
    if (page) return page;

    page = document.createElement("section");
    page.id = "todayToolPage";
    page.className = "card custom-tool-page today-page hidden";
    page.innerHTML = `
      <div class="tool-page-header">
        <div>
          <p class="eyebrow">Aujourd’hui</p>
          <h2>Quête du jour</h2>
          <p class="muted">Une proposition claire pour lancer la séance sans fouiller tout le grimoire.</p>
        </div>
        <button id="todayBackBtn" class="ghost-btn" type="button">Retour</button>
      </div>
      <div id="todayContent"></div>
    `;
    dashboard.insertBefore(page, document.querySelector("#logCard") || null);
    page.querySelector("#todayBackBtn")?.addEventListener("click", closeTodayPage);
    return page;
  }

  function hideAllPages() {
    ["#musicPage", "#questsPage", "#weekPage", "#badgesPage", "#programsToolPage", "#journalToolPage", "#weightToolPage", "#goalToolPage", "#planningToolPage"].forEach((selector) => document.querySelector(selector)?.classList.add("hidden"));
    document.querySelectorAll(".custom-tool-page").forEach((page) => {
      if (page.id !== "todayToolPage") page.classList.add("hidden");
    });
  }

  function openTodayPage() {
    const page = ensurePage();
    if (!page) return;
    hideAllPages();
    document.querySelector(".hero-card")?.classList.add("hidden");
    document.querySelector("#sportHub")?.classList.add("hidden");
    page.classList.remove("hidden");
    renderTodayPage();
    page.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closeTodayPage() {
    document.querySelector("#todayToolPage")?.classList.add("hidden");
    document.querySelector(".hero-card")?.classList.remove("hidden");
    document.querySelector("#sportHub")?.classList.remove("hidden");
  }

  function validateToday() {
    const program = todayProgram();
    const done = loadDone();
    const date = todayString();
    if (done[date]) return;

    const xp = PROGRAM_XP[program] || 10;
    done[date] = { at: new Date().toISOString(), program, xp };
    saveDone(done);

    try {
      if (typeof profile !== "undefined" && profile) {
        profile.totalXp = Number(profile.totalXp || 0) + xp;
        profile.xp = Number(profile.xp || 0) + xp;
        if (!profile.completedByDate) profile.completedByDate = {};
        const entries = Array.isArray(profile.completedByDate[date]) ? profile.completedByDate[date] : [];
        entries.push({ id: `today-${date}`, sportId: "today", sportTitle: "Aujourd’hui", title: `Quête du jour · ${program}`, amount: 1, unit: "séance", xp, at: new Date().toISOString() });
        profile.completedByDate[date] = entries;
        if (typeof updateStreak === "function") updateStreak();
        if (typeof log === "function") log(`+${xp} XP · Aujourd’hui · ${program}`);
        if (typeof save === "function") save();
        if (typeof render === "function") render();
      }
    } catch (error) {
      console.warn("Validation de la quête du jour impossible", error);
    }

    const coachMsg = document.querySelector("#coachMessage");
    if (coachMsg) coachMsg.textContent = `Quête du jour validée : ${program}. +${xp} XP.`;
    openTodayPage();
  }

  function openSuggestedProgram() {
    const program = todayProgram();
    document.querySelector("#openProgramsBtn")?.click();
    window.setTimeout(() => {
      document.querySelectorAll(".program-card").forEach((card) => {
        if (card.querySelector("h3")?.textContent === program) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          card.classList.add("goal-recommended");
        }
      });
    }, 250);
  }

  function renderTodayCard() {
    const sportHub = document.querySelector("#sportHub");
    if (!sportHub) return;

    const program = todayProgram();
    const goal = currentGoal();
    let card = document.querySelector("#todayDashboardCard");
    if (!card) {
      card = document.createElement("article");
      card.id = "todayDashboardCard";
      card.className = "today-card";
      sportHub.insertBefore(card, sportHub.firstChild?.nextSibling || sportHub.firstChild);
    }

    card.innerHTML = `
      <span class="today-icon">${icons[program] || "☀️"}</span>
      <div>
        <p class="eyebrow">Aujourd’hui</p>
        <h2>${program}</h2>
        <p>${subtitles[program] || "Séance conseillée"}</p>
        <div class="today-main-line">
          <span class="today-pill">Objectif : ${goal.title}</span>
          <span class="today-pill">${isDoneToday() ? "Déjà validé" : "+" + (PROGRAM_XP[program] || 10) + " XP"}</span>
        </div>
      </div>
      <div class="today-card-actions">
        <button id="todayStartBtn" class="primary-btn" type="button">Commencer</button>
        <button id="todayOtherBtn" class="ghost-btn" type="button">Autre choix</button>
      </div>
    `;

    card.querySelector("#todayStartBtn")?.addEventListener("click", openTodayPage);
    card.querySelector("#todayOtherBtn")?.addEventListener("click", () => document.querySelector("#openQuestsBtn")?.click());
  }

  function renderTodayPage() {
    const page = ensurePage();
    const content = page?.querySelector("#todayContent");
    if (!content) return;

    const program = todayProgram();
    const goal = currentGoal();
    const xp = PROGRAM_XP[program] || 10;
    const done = isDoneToday();

    content.innerHTML = `
      <article class="today-hero-card">
        <span class="today-big-icon">${icons[program] || "☀️"}</span>
        <div>
          <p class="eyebrow">Suggestion du jour</p>
          <h2>${program}</h2>
          <p>${subtitles[program] || "Séance conseillée"}</p>
        </div>
      </article>
      <div class="today-info-grid">
        <article><strong>${goal.title}</strong><span>Objectif</span></article>
        <article><strong>${done ? "Validé" : "+" + xp + " XP"}</strong><span>Récompense</span></article>
        <article><strong>${new Date().toLocaleDateString("fr-FR", { weekday: "long" })}</strong><span>Jour</span></article>
      </div>
      <div id="todayDoneBanner" class="today-done-banner${done ? "" : " hidden"}">
        <strong>✅ Quête du jour validée</strong>
        <p>Le parchemin est signé. Tu peux faire plus, mais ce n’est pas obligatoire.</p>
      </div>
      <div class="today-action-grid">
        <button id="todayValidateBtn" class="primary-btn" type="button" ${done ? "disabled" : ""}>${done ? "Déjà validé" : "Valider la quête du jour"}</button>
        <button id="todayProgramBtn" class="secondary-btn" type="button">Voir le programme</button>
        <button id="todayExerciseBtn" class="ghost-btn" type="button">Faire autre chose</button>
        <button id="todayPlanningBtn" class="ghost-btn" type="button">Voir le planning</button>
      </div>
    `;

    content.querySelector("#todayValidateBtn")?.addEventListener("click", validateToday);
    content.querySelector("#todayProgramBtn")?.addEventListener("click", openSuggestedProgram);
    content.querySelector("#todayExerciseBtn")?.addEventListener("click", () => document.querySelector("#openQuestsBtn")?.click());
    content.querySelector("#todayPlanningBtn")?.addEventListener("click", () => {
      if (typeof window.openWeeklyPlanning === "function") window.openWeeklyPlanning();
      else document.querySelector("#openPlanningBtn")?.click();
    });
  }

  function addToolbarButton() {
    const toolbar = document.querySelector("#toolIconBar");
    if (!toolbar) return;

    let button = document.querySelector("#openTodayBtn");
    if (!button) {
      button = document.createElement("button");
      button.id = "openTodayBtn";
      button.className = "tool-icon-btn";
      button.type = "button";
      button.innerHTML = `<span>☀️</span><strong>Aujourd’hui</strong><small>Quête</small>`;
      toolbar.insertBefore(button, toolbar.firstChild);
    }
    button.onclick = openTodayPage;
  }

  function refresh() {
    ensurePage();
    addToolbarButton();
    renderTodayCard();
    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => { el.textContent = "0.3.9"; });
    document.querySelector(".hero-header .eyebrow") && (document.querySelector(".hero-header .eyebrow").textContent = "Fitness RPG · V3.9");
  }

  window.openTodayPage = openTodayPage;
  window.refreshTodayScreen = refresh;

  refresh();

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__todayRenderPatched) {
    window.__todayRenderPatched = true;
    render = function todayPatchedRender() {
      oldRender();
      refresh();
    };
    render();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTodayScreen);
} else {
  initTodayScreen();
}
