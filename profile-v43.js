function initProfileV43() {
  if (window.__profileV43Ready) return;
  window.__profileV43Ready = true;

  const config = window.FitnessRpgConfig || {
    version: "0.4.6.0",
    displayVersion: "V4.6.0",
    storageKeys: {}
  };

  const GOAL_KEY = config.storageKeys?.personalGoal || "sportRpgV1PersonalGoal";
  const WEIGHT_KEY = config.storageKeys?.weights || "sportRpgV1Weights";
  const goals = window.FitnessRpgConfig?.goals || [
    { id: "perte-poids", icon: "⚖️", title: "Perte de poids", rhythm: "4 à 5 séances douces par semaine" },
    { id: "reprise-douce", icon: "🌅", title: "Reprise douce", rhythm: "3 séances courtes par semaine" },
    { id: "cardio", icon: "❤️‍🔥", title: "Cardio", rhythm: "3 séances cardio progressives" },
    { id: "renforcement", icon: "⚒️", title: "Renforcement", rhythm: "3 séances de force par semaine" },
    { id: "regularite", icon: "📅", title: "Régularité", rhythm: "Bouger souvent, sans pression" },
    { id: "mobilite", icon: "🧙", title: "Mobilité / récupération", rhythm: "2 à 4 séances légères" }
  ];

  function formatKg(value) {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) return "—";
    return `${number.toFixed(1).replace(".", ",")} kg`;
  }

  function todayString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function loadWeights() {
    try {
      const raw = JSON.parse(localStorage.getItem(WEIGHT_KEY) || "[]");
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  }

  function saveWeights(entries) {
    const cleaned = entries
      .filter((entry) => entry && entry.date && Number.isFinite(Number(entry.weight)))
      .map((entry) => ({ date: entry.date, weight: Number(entry.weight) }))
      .sort((a, b) => a.date.localeCompare(b.date));
    localStorage.setItem(WEIGHT_KEY, JSON.stringify(cleaned));
  }

  function getGoal() {
    try {
      const stored = JSON.parse(localStorage.getItem(GOAL_KEY) || "null");
      if (stored?.id) return stored;
    } catch {}
    return goals[1] || goals[0];
  }

  function saveGoal(goal) {
    localStorage.setItem(GOAL_KEY, JSON.stringify(goal));
    if (typeof window.refreshTodayScreen === "function") window.refreshTodayScreen();
  }

  function getLevel(totalXp) {
    try {
      if (typeof levelInfo === "function") return levelInfo(Number(totalXp || 0)).level;
    } catch {}
    return Math.floor(Number(totalXp || 0) / 100) + 1;
  }

  function getRank(level) {
    if (window.FitnessRpgConfig?.getRankTitle) return window.FitnessRpgConfig.getRankTitle(level);
    return level <= 4 ? "Novice" : level <= 9 ? "Aventurier" : level <= 14 ? "Champion" : level <= 19 ? "Légende" : "Héros mythique";
  }

  function ensureProfilePage() {
    const dashboard = document.querySelector("#dashboard");
    if (!dashboard) return null;
    let page = document.querySelector("#profileToolPage");
    if (!page) {
      page = document.createElement("section");
      page.id = "profileToolPage";
      page.className = "card custom-tool-page profile-page-v4 hidden";
      page.innerHTML = `
        <div class="tool-page-header">
          <div>
            <p class="eyebrow">Profil</p>
            <h2>Fiche du héros</h2>
            <p class="muted">Objectif, poids, progression et identité du joueur.</p>
          </div>
          <button id="profileBackBtn" class="ghost-btn" type="button">Retour</button>
        </div>
        <div id="profileContentV4"></div>
      `;
      dashboard.insertBefore(page, document.querySelector("#logCard") || null);
    }
    page.querySelector("#profileBackBtn")?.addEventListener("click", () => {
      if (window.FitnessRpgCore?.openPage) window.FitnessRpgCore.openPage("dashboard");
      else {
        page.classList.add("hidden");
        document.querySelector(".hero-card")?.classList.remove("hidden");
        document.querySelector("#sportHub")?.classList.remove("hidden");
      }
    });
    return page;
  }

  function renderProfileV43() {
    const page = ensureProfilePage();
    const content = page?.querySelector("#profileContentV4");
    if (!content) return;

    if (typeof profile === "undefined" || !profile) {
      content.innerHTML = `<p class="profile-v43-note">Aucun héros créé. Retourne à l’accueil pour commencer l’aventure.</p>`;
      return;
    }

    const goal = getGoal();
    const weights = loadWeights();
    const latestWeight = weights.at(-1)?.weight;
    const startWeight = profile.startWeight || weights[0]?.weight || "";
    const targetWeight = profile.targetWeight || "";
    const diffTarget = Number.isFinite(Number(latestWeight)) && Number.isFinite(Number(targetWeight)) && Number(targetWeight) > 0
      ? Number(latestWeight) - Number(targetWeight)
      : null;
    const level = getLevel(profile.totalXp || 0);
    const rank = getRank(level);

    content.innerHTML = `
      <div class="profile-v43-panel">
        <article class="profile-v43-hero">
          <span class="profile-v43-hero-icon">${goal.icon || "🧭"}</span>
          <div>
            <h3>${profile.name || "Héros"} · Niveau ${level} · ${rank}</h3>
            <p>Objectif actuel : <strong>${goal.title}</strong>. ${goal.rhythm || "Avancer régulièrement."}</p>
          </div>
        </article>

        <div class="profile-v43-summary-grid">
          <article><strong>${formatKg(latestWeight)}</strong><span>Dernier poids</span></article>
          <article><strong>${formatKg(targetWeight)}</strong><span>Objectif de poids</span></article>
          <article><strong>${diffTarget === null ? "—" : `${diffTarget > 0 ? "-" : "+"}${Math.abs(diffTarget).toFixed(1).replace(".", ",")} kg`}</strong><span>${diffTarget === null ? "Écart" : diffTarget > 0 ? "À perdre" : "Sous objectif"}</span></article>
        </div>

        <form id="profileV43Form" class="profile-v43-form">
          <section class="profile-v43-section">
            <p class="profile-v43-section-title">Identité</p>
            <div class="profile-v43-grid">
              <label>Nom
                <input id="profileV43Name" type="text" maxlength="30" value="${profile.name || ""}">
              </label>
              <label>Âge
                <input id="profileV43Age" type="number" min="10" max="99" value="${profile.age || ""}">
              </label>
              <label>Genre
                <select id="profileV43Gender">
                  <option value="homme" ${profile.gender !== "femme" ? "selected" : ""}>Homme</option>
                  <option value="femme" ${profile.gender === "femme" ? "selected" : ""}>Femme</option>
                </select>
              </label>
            </div>
          </section>

          <section class="profile-v43-section">
            <p class="profile-v43-section-title">Objectif principal</p>
            <div class="profile-v43-goal-cards">
              ${goals.map((item) => `
                <button class="profile-v43-goal-card ${item.id === goal.id ? "active" : ""}" type="button" data-goal-id="${item.id}">
                  <strong>${item.icon} ${item.title}</strong>
                  <span>${item.rhythm}</span>
                </button>
              `).join("")}
            </div>
          </section>

          <section class="profile-v43-section">
            <p class="profile-v43-section-title">Poids</p>
            <div class="profile-v43-grid">
              <label>Poids de départ
                <input id="profileV43StartWeight" type="number" min="20" max="300" step="0.1" value="${startWeight}">
              </label>
              <label>Objectif de poids
                <input id="profileV43TargetWeight" type="number" min="20" max="300" step="0.1" value="${targetWeight}">
              </label>
              <label>Poids aujourd’hui
                <input id="profileV43TodayWeight" type="number" min="20" max="300" step="0.1" placeholder="Ex : 82.5">
              </label>
            </div>
          </section>

          <button class="primary-btn" type="submit">Enregistrer le profil</button>
        </form>

        <p class="profile-v43-note">Le poids d’aujourd’hui est ajouté à la courbe Balance. Le poids de départ et l’objectif restent dans le profil.</p>
      </div>
    `;

    let selectedGoal = goal;
    content.querySelectorAll(".profile-v43-goal-card").forEach((button) => {
      button.addEventListener("click", () => {
        const nextGoal = goals.find((item) => item.id === button.dataset.goalId) || selectedGoal;
        selectedGoal = nextGoal;
        content.querySelectorAll(".profile-v43-goal-card").forEach((card) => card.classList.toggle("active", card === button));
      });
    });

    content.querySelector("#profileV43Form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      profile.name = content.querySelector("#profileV43Name")?.value.trim() || profile.name || "Héros";
      profile.age = Number(content.querySelector("#profileV43Age")?.value || profile.age || 0);
      profile.gender = content.querySelector("#profileV43Gender")?.value || profile.gender || "homme";
      profile.startWeight = Number(content.querySelector("#profileV43StartWeight")?.value || 0) || "";
      profile.targetWeight = Number(content.querySelector("#profileV43TargetWeight")?.value || 0) || "";
      saveGoal(selectedGoal);

      const todayWeight = Number(content.querySelector("#profileV43TodayWeight")?.value || 0);
      if (Number.isFinite(todayWeight) && todayWeight > 0) {
        const entries = loadWeights().filter((entry) => entry.date !== todayString());
        entries.push({ date: todayString(), weight: todayWeight });
        saveWeights(entries);
      }

      if (typeof save === "function") save();
      if (typeof render === "function") render();
      renderProfileV43();
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
      renderProfileV43();
      if (window.FitnessRpgCore?.openPage) window.FitnessRpgCore.openPage("profile");
      else {
        document.querySelectorAll(".custom-tool-page, #musicPage, #questsPage, #badgesPage, #weekPage").forEach((page) => page.classList.add("hidden"));
        document.querySelector(".hero-card")?.classList.add("hidden");
        document.querySelector("#sportHub")?.classList.add("hidden");
        document.querySelector("#profileToolPage")?.classList.remove("hidden");
      }
    };
  }

  function patchVersion() {
  window.FitnessRpgConfig?.setVersionLabels?.();
}

  function patch() {
    ensureProfilePage();
    addProfileButton();
    patchVersion();
  }

  window.renderProfileV43 = renderProfileV43;
  window.getProfileV43Goal = getGoal;

  patch();
  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__profileV43RenderPatched) {
    window.__profileV43RenderPatched = true;
    render = function profileV43Render() {
      oldRender();
      patch();
    };
    render();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProfileV43);
} else {
  initProfileV43();
}
