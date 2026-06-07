function initAppCoreV4() {
  if (window.__appCoreV4Ready) return;
  window.__appCoreV4Ready = true;

  const config = window.FitnessRpgConfig || { version: "0.4.5.3", displayVersion: "V4.5.3" };

  function currentProfile() {
    return typeof profile !== "undefined" ? profile : null;
  }

  function getLevel(totalXp) {
    try {
      if (typeof levelInfo === "function") return levelInfo(Number(totalXp || 0)).level;
    } catch {}
    return Math.floor(Number(totalXp || 0) / 100) + 1;
  }

  function getRank(level) {
    if (config.getRankTitle) return config.getRankTitle(level);
    if (level <= 4) return "Novice";
    if (level <= 9) return "Aventurier";
    if (level <= 14) return "Champion";
    if (level <= 19) return "Légende";
    return "Héros mythique";
  }

  function todayString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function ensureCompletedToday(entry) {
    const p = currentProfile();
    if (!p) return;
    if (!p.completedByDate) p.completedByDate = {};
    const date = todayString();
    const entries = Array.isArray(p.completedByDate[date]) ? p.completedByDate[date] : [];
    entries.push(entry);
    p.completedByDate[date] = entries;
  }

  function applyXpGain(xp, sourceLabel = "Progression", entry = null) {
    const p = currentProfile();
    const value = Number(xp || 0);
    if (!p || !Number.isFinite(value) || value <= 0) return { oldLevel: 1, newLevel: 1, xp: 0 };

    const oldLevel = getLevel(p.totalXp || 0);
    p.totalXp = Number(p.totalXp || 0) + value;
    p.xp = Number(p.xp || 0) + value;
    const newLevel = getLevel(p.totalXp || 0);

    if (entry) {
      ensureCompletedToday({
        id: entry.id || `v4-${Date.now()}`,
        sportId: entry.sportId || "v4",
        sportTitle: entry.sportTitle || sourceLabel,
        title: entry.title || sourceLabel,
        amount: entry.amount || 1,
        unit: entry.unit || "action",
        xp: value,
        at: new Date().toISOString()
      });
    }

    if (typeof updateStreak === "function") updateStreak();
    if (typeof log === "function") log(`+${value} XP · ${sourceLabel}`);
    if (typeof save === "function") save();
    if (typeof render === "function") render();

    if (newLevel > oldLevel && typeof window.showLevelUpModal === "function") {
      window.showLevelUpModal(oldLevel, newLevel);
    }

    return { oldLevel, newLevel, xp: value };
  }

  function hideKnownPages(keepId = null) {
    const selectors = [
      "#musicPage", "#questsPage", "#badgesPage", "#weekPage", "#programsToolPage",
      "#journalToolPage", "#weightToolPage", "#todayToolPage", "#goalToolPage",
      "#planningToolPage", "#profileToolPage"
    ];
    selectors.forEach((selector) => {
      const page = document.querySelector(selector);
      if (page && page.id !== keepId) page.classList.add("hidden");
    });
  }

  function showDashboardCore(show) {
    document.querySelector(".hero-card")?.classList.toggle("hidden", !show);
    document.querySelector("#sportHub")?.classList.toggle("hidden", !show);
    document.querySelector("#logCard")?.classList.add("hidden");
  }

  function openPage(pageName) {
    const map = {
      dashboard: null,
      music: "musicPage",
      quests: "questsPage",
      badges: "badgesPage",
      week: "weekPage",
      programs: "programsToolPage",
      journal: "journalToolPage",
      weight: "weightToolPage",
      today: "todayToolPage",
      profile: "profileToolPage"
    };

    if (pageName === "dashboard") {
      hideKnownPages();
      showDashboardCore(true);
      return;
    }

    const id = map[pageName];
    const page = id ? document.querySelector(`#${id}`) : null;
    if (!page) return;
    hideKnownPages(id);
    showDashboardCore(false);
    page.classList.remove("hidden");
    page.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function closeToolsToDashboard() {
    hideKnownPages();
    showDashboardCore(true);
  }

  function ensureProfilePage() {
    const dashboard = document.querySelector("#dashboard");
    if (!dashboard) return null;
    let page = document.querySelector("#profileToolPage");
    if (page) return page;

    page = document.createElement("section");
    page.id = "profileToolPage";
    page.className = "card custom-tool-page profile-page-v4 hidden";
    page.innerHTML = `
      <div class="tool-page-header">
        <div>
          <p class="eyebrow">Profil</p>
          <h2>Fiche du héros</h2>
          <p class="muted">Les informations principales du joueur, centralisées pour la V4.</p>
        </div>
        <button id="profileBackBtn" class="ghost-btn" type="button">Retour</button>
      </div>
      <div id="profileContentV4"></div>
    `;
    dashboard.insertBefore(page, document.querySelector("#logCard") || null);
    page.querySelector("#profileBackBtn")?.addEventListener("click", closeToolsToDashboard);
    return page;
  }

  function renderProfilePage() {
    const page = ensureProfilePage();
    const content = page?.querySelector("#profileContentV4");
    const p = currentProfile();
    if (!content) return;

    if (!p) {
      content.innerHTML = `<p class="v4-tool-note">Aucun héros créé pour l’instant. Retourne à l’accueil pour commencer l’aventure.</p>`;
      return;
    }

    const level = getLevel(p.totalXp || 0);
    const rank = getRank(level);
    const goal = typeof window.getPersonalGoal === "function" ? window.getPersonalGoal() : null;

    content.innerHTML = `
      <span class="v4-status-pill">🧭 Moteur V4 stabilisé</span>
      <div class="profile-grid-v4">
        <article class="profile-card-v4"><span>Nom</span><strong>${p.name || "Héros"}</strong></article>
        <article class="profile-card-v4"><span>Âge</span><strong>${p.age || "—"}</strong></article>
        <article class="profile-card-v4"><span>Genre</span><strong>${p.gender === "femme" ? "Femme" : "Homme"}</strong></article>
        <article class="profile-card-v4"><span>Coach</span><strong>${p.coach || "korvan"}</strong></article>
        <article class="profile-card-v4"><span>Niveau</span><strong>${level} · ${rank}</strong></article>
        <article class="profile-card-v4"><span>XP total</span><strong>${Number(p.totalXp || 0)}</strong></article>
        <article class="profile-card-v4"><span>Série</span><strong>${Number(p.streak || 0)} jour(s)</strong></article>
        <article class="profile-card-v4"><span>Objectif</span><strong>${goal?.title || "Non défini"}</strong></article>
      </div>
      <form id="profileEditFormV4" class="profile-edit-form-v4">
        <label>Nom
          <input id="profileNameV4" type="text" maxlength="30" value="${p.name || ""}">
        </label>
        <label>Âge
          <input id="profileAgeV4" type="number" min="10" max="99" value="${p.age || ""}">
        </label>
        <label>Genre
          <select id="profileGenderV4">
            <option value="homme" ${p.gender !== "femme" ? "selected" : ""}>Homme</option>
            <option value="femme" ${p.gender === "femme" ? "selected" : ""}>Femme</option>
          </select>
        </label>
        <button class="primary-btn" type="submit">Enregistrer le profil</button>
      </form>
      <p class="v4-tool-note">La V4 prépare la suite : toutes les futures options de profil pourront se greffer ici proprement.</p>
    `;

    content.querySelector("#profileEditFormV4")?.addEventListener("submit", (event) => {
      event.preventDefault();
      p.name = content.querySelector("#profileNameV4")?.value.trim() || p.name || "Héros";
      p.age = Number(content.querySelector("#profileAgeV4")?.value || p.age || 0);
      p.gender = content.querySelector("#profileGenderV4")?.value || p.gender || "homme";
      if (typeof save === "function") save();
      if (typeof render === "function") render();
      renderProfilePage();
    });
  }

  function addProfileButton() {
    const toolbar = document.querySelector("#toolIconBar");
    if (!toolbar) return;
    let button = document.querySelector("#openProfileBtn");
    if (!button) {
      button = document.createElement("button");
      button.id = "openProfileBtn";
      button.className = "tool-icon-btn";
      button.type = "button";
      button.innerHTML = `<span>🧍</span><strong>Profil</strong><small>Héros</small>`;
      toolbar.appendChild(button);
    }
    button.onclick = () => {
      renderProfilePage();
      openPage("profile");
    };
  }

  function patchVersion() {
    if (config.setVersionLabels) config.setVersionLabels();
    else {
      document.title = "Fitness RPG - V4.0";
      const header = document.querySelector(".hero-header .eyebrow");
      if (header) header.textContent = "Fitness RPG · V4.0";
    }
  }

  function patch() {
    ensureProfilePage();
    addProfileButton();
    patchVersion();
  }

  window.FitnessRpgCore = {
    version: config.version || "0.4.0",
    openPage,
    closeToolsToDashboard,
    applyXpGain,
    renderProfilePage,
    getLevel,
    getRank
  };

  patch();
  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__appCoreV4RenderPatched) {
    window.__appCoreV4RenderPatched = true;
    render = function appCoreV4Render() {
      oldRender();
      patch();
    };
    render();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAppCoreV4);
} else {
  initAppCoreV4();
}
