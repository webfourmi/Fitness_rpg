function initHomePolishV444() {
  if (window.__homePolishV444Ready) return;
  window.__homePolishV444Ready = true;

  const VERSION = "0.4.4.7";
  const DISPLAY_VERSION = "V4.4.7";
  let isPatching = false;

  function isHomeVisible() {
    const homePanel = document.querySelector("#homePanel");
    return Boolean(homePanel && !homePanel.classList.contains("hidden"));
  }

  function isTrainingVisible() {
    const dashboard = document.querySelector("#dashboard");
    const sportHub = document.querySelector("#sportHub");
    return Boolean(dashboard && !dashboard.classList.contains("hidden") && sportHub && !sportHub.classList.contains("hidden"));
  }

  function currentLevelInfo() {
    try {
      return typeof levelInfo === "function" ? levelInfo(profile?.totalXp || 0) : { level: 1, currentXp: 0, nextXp: 100 };
    } catch {
      return { level: 1, currentXp: 0, nextXp: 100 };
    }
  }

  function currentRankWord() {
    try {
      const level = currentLevelInfo().level;
      if (window.FitnessRpgConfig && window.FitnessRpgConfig.getRankTitle) return window.FitnessRpgConfig.getRankTitle(level);
      if (level <= 4) return "Novice";
      if (level <= 9) return "Aventurier";
      if (level <= 14) return "Champion";
      if (level <= 19) return "Légende";
      return "Héros mythique";
    } catch {
      return "Novice";
    }
  }

  function setText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function patchVersion() {
    if (window.FitnessRpgConfig) {
      window.FitnessRpgConfig.version = VERSION;
      window.FitnessRpgConfig.displayVersion = DISPLAY_VERSION;
    }
    if (document.title !== `Fitness RPG - ${DISPLAY_VERSION}`) document.title = `Fitness RPG - ${DISPLAY_VERSION}`;
    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((node) => setText(node, VERSION));
    setText(document.querySelector(".hero-header .eyebrow"), `Fitness RPG · ${DISPLAY_VERSION}`);
  }

  function ensureGameVersionBadge() {
    const visual = document.querySelector(".home-hero-visual");
    if (!visual) return;
    let badge = document.querySelector("#homeGameVersionBadge");
    if (!badge) {
      badge = document.createElement("div");
      badge.id = "homeGameVersionBadge";
      badge.className = "home-game-version";
      visual.insertBefore(badge, visual.firstChild);
    }
    setText(badge, `Fitness RPG · ${DISPLAY_VERSION}`);
  }

  function patchHomeTexts() {
    const start = document.querySelector("#continueProfileBtn");
    const coach = document.querySelector("#changeCoachBtn");
    const newHero = document.querySelector("#startCreateHeroBtn");
    setText(start, "Entraînement");
    setText(coach, "Coach");
    setText(newHero, "Nouveau héros");

    const heroSummary = document.querySelector("#homeHeroSummary");
    if (heroSummary && typeof profile !== "undefined" && profile) {
      const info = currentLevelInfo();
      setText(heroSummary, `${profile.name || "Héros"} · ${currentRankWord()} · Niveau ${info.level} · ${profile.totalXp || 0} XP`);
    }

    const coachSummary = document.querySelector("#homeCoachSummary");
    if (coachSummary && typeof profile !== "undefined" && profile && typeof coaches !== "undefined") {
      setText(coachSummary, `Coach actuel : ${coaches[profile.coach]?.fullName || coaches[profile.coach]?.name || "Coach"}`);
    }
  }

  function patchHomeImage() {
    const img = document.querySelector(".home-hero-visual img");
    if (!img) return;
    img.loading = "eager";
    img.decoding = "async";
    img.fetchPriority = "high";
  }

  function ensureTrainingHeroLabel() {
    const heroCard = document.querySelector(".hero-card");
    const portrait = document.querySelector("#heroPortrait");
    if (!heroCard || !portrait || typeof profile === "undefined" || !profile) return;
    let label = document.querySelector("#trainingHeroLabel");
    if (!label) {
      label = document.createElement("div");
      label.id = "trainingHeroLabel";
      label.className = "training-hero-label";
      portrait.insertAdjacentElement("afterend", label);
    }
    setText(label, `${profile.name || "Héros"}`);
  }

  function ensureTrainingProgressTitle() {
    const heroInfo = document.querySelector(".hero-info");
    const levelRow = document.querySelector(".level-row");
    if (!heroInfo || !levelRow || typeof profile === "undefined" || !profile) return;
    let title = document.querySelector("#trainingProgressTitle");
    if (!title) {
      title = document.createElement("div");
      title.id = "trainingProgressTitle";
      title.className = "training-progress-title";
      levelRow.insertAdjacentElement("beforebegin", title);
    }
    const info = currentLevelInfo();
    setText(title, `Niv. ${info.level} - ${currentRankWord()}`);
  }

  function patchStats() {
    const stats = document.querySelector(".stats-grid");
    if (!stats) return;
    const cards = [...stats.children];
    cards.forEach((card) => {
      const label = card.querySelector("span")?.textContent?.trim().toLowerCase() || "";
      if (label.includes("xp total")) card.classList.add("training-hide-xp-total");
    });
  }

  function togglePageClasses() {
    const home = isHomeVisible();
    const training = isTrainingVisible();
    document.body.classList.toggle("home-polished", home);
    document.body.classList.toggle("training-polished", !home && training);
    document.querySelector("#resetProfileBtn")?.classList.toggle("hidden", home || training);
    document.querySelector("#homeBtn")?.classList.toggle("hidden", !training);
  }

  function patch() {
    if (isPatching) return;
    isPatching = true;
    patchVersion();
    ensureGameVersionBadge();
    patchHomeTexts();
    patchHomeImage();
    ensureTrainingHeroLabel();
    ensureTrainingProgressTitle();
    patchStats();
    togglePageClasses();
    isPatching = false;
  }

  patch();

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__homePolishRenderPatched) {
    window.__homePolishRenderPatched = true;
    render = function homePolishRender() {
      oldRender();
      patch();
    };
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("#continueProfileBtn, #changeCoachBtn, #startCreateHeroBtn, #homeBtn, #openQuestsBtn, #openProgramsBtn")) {
      window.setTimeout(patch, 50);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomePolishV444);
} else {
  initHomePolishV444();
}