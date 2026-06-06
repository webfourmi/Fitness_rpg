function initTrainingPolishV448() {
  if (window.__trainingPolishV448Ready) return;
  window.__trainingPolishV448Ready = true;

  const VERSION = "0.4.4.8";
  const DISPLAY_VERSION = "V4.4.8";

  function setText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function isDashboardVisible() {
    const dashboard = document.querySelector("#dashboard");
    const sportHub = document.querySelector("#sportHub");
    return Boolean(dashboard && !dashboard.classList.contains("hidden") && sportHub && !sportHub.classList.contains("hidden"));
  }

  function levelData() {
    try {
      return typeof levelInfo === "function" ? levelInfo(profile?.totalXp || 0) : { level: 1, currentXp: 0, nextXp: 100 };
    } catch {
      return { level: 1, currentXp: 0, nextXp: 100 };
    }
  }

  function rankWord() {
    const level = levelData().level;
    if (window.FitnessRpgConfig?.getRankTitle) return window.FitnessRpgConfig.getRankTitle(level);
    if (level <= 4) return "Novice";
    if (level <= 9) return "Aventurier";
    if (level <= 14) return "Champion";
    if (level <= 19) return "Légende";
    return "Héros mythique";
  }

  function updateVersion() {
    if (window.FitnessRpgConfig) {
      window.FitnessRpgConfig.version = VERSION;
      window.FitnessRpgConfig.displayVersion = DISPLAY_VERSION;
    }
    document.title = `Fitness RPG - ${DISPLAY_VERSION}`;
    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((node) => setText(node, VERSION));
    setText(document.querySelector(".hero-header .eyebrow"), `Fitness RPG · ${DISPLAY_VERSION}`);
  }

  function ensureHeroName() {
    const portrait = document.querySelector("#heroPortrait");
    if (!portrait || typeof profile === "undefined" || !profile) return;

    document.querySelector("#trainingHeroLabel")?.remove();
    document.querySelector(".training-hero-label")?.remove();

    let label = document.querySelector("#trainingHeroNameV448");
    if (!label) {
      label = document.createElement("div");
      label.id = "trainingHeroNameV448";
      portrait.insertAdjacentElement("afterend", label);
    }
    setText(label, profile.name || "Héros");
  }

  function ensureProgressTitle() {
    const levelRow = document.querySelector(".level-row");
    if (!levelRow) return;
    let title = document.querySelector("#trainingProgressTitleV448");
    if (!title) {
      title = document.createElement("div");
      title.id = "trainingProgressTitleV448";
      levelRow.insertAdjacentElement("beforebegin", title);
    }
    const info = levelData();
    setText(title, `Niv. ${info.level} - ${rankWord()}`);
  }

  function cleanStats() {
    document.querySelectorAll(".stats-grid > div").forEach((card) => {
      const label = card.querySelector("span")?.textContent?.trim().toLowerCase() || "";
      if (label.includes("xp total")) card.classList.add("training-hide-xp-total");
    });
  }

  function cleanSportHubHeader() {
    const intro = document.querySelector("#sportHub > div:first-child");
    if (intro) intro.style.display = "none";
  }

  function toggleClass() {
    const active = isDashboardVisible();
    document.body.classList.toggle("training-v448", active);
    if (active) {
      document.body.classList.remove("training-polished");
      document.querySelector("#homeBtn")?.classList.remove("hidden");
      document.querySelector("#resetProfileBtn")?.classList.add("hidden");
    }
  }

  function patch() {
    updateVersion();
    toggleClass();
    if (!isDashboardVisible()) return;
    ensureHeroName();
    ensureProgressTitle();
    cleanStats();
    cleanSportHubHeader();
  }

  window.TrainingPolishV448 = { patch };

  patch();

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__trainingPolishRenderPatched) {
    window.__trainingPolishRenderPatched = true;
    render = function trainingPolishRender() {
      oldRender();
      window.requestAnimationFrame(patch);
    };
    render();
  }

  document.addEventListener("click", () => window.setTimeout(patch, 80), true);
  document.addEventListener("visibilitychange", patch);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTrainingPolishV448);
} else {
  initTrainingPolishV448();
}
