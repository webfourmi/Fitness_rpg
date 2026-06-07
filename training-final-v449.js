function initTrainingFinalV449() {
  if (window.__trainingFinalV449Ready) return;
  window.__trainingFinalV449Ready = true;

  const VERSION = "0.4.4.9";
  const DISPLAY_VERSION = "V4.4.9";

  function setText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function isTrainingPage() {
    const dashboard = document.querySelector("#dashboard");
    const setupPanel = document.querySelector("#setupPanel");
    const sportHub = document.querySelector("#sportHub");
    return Boolean(
      dashboard && !dashboard.classList.contains("hidden") &&
      sportHub && !sportHub.classList.contains("hidden") &&
      (!setupPanel || setupPanel.classList.contains("hidden"))
    );
  }

  function levelData() {
    try {
      return typeof levelInfo === "function" ? levelInfo(profile?.totalXp || 0) : { level: 1 };
    } catch {
      return { level: 1 };
    }
  }

  function rankWord() {
    const level = levelData().level || 1;
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
    setText(document.querySelector(".hero-header .eyebrow"), `Fitness RPG · ${DISPLAY_VERSION}`);
    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((node) => setText(node, VERSION));
  }

  function ensureHeroLine() {
    const portrait = document.querySelector("#heroPortrait");
    if (!portrait || typeof profile === "undefined" || !profile) return;

    document.querySelector("#trainingHeroLabel")?.remove();
    document.querySelector("#trainingHeroNameV448")?.remove();

    let line = document.querySelector("#trainingFinalHeroLine");
    if (!line) {
      line = document.createElement("div");
      line.id = "trainingFinalHeroLine";
      portrait.insertAdjacentElement("afterend", line);
    }

    const info = levelData();
    setText(line, `${profile.name || "Héros"} · Niv. ${info.level || 1} · ${rankWord()}`);
  }

  function cleanupHeroInfo() {
    document.querySelector("#trainingProgressTitle")?.remove();
    document.querySelector("#trainingProgressTitleV448")?.remove();
    document.querySelector("#xpCurvePanel")?.remove();

    document.querySelectorAll(".stats-grid > div").forEach((card) => {
      const label = card.querySelector("span")?.textContent?.trim().toLowerCase() || "";
      if (label.includes("xp total")) card.remove();
    });
  }

  function cleanupSportHub() {
    const hubIntro = document.querySelector("#sportHub > div:first-child");
    if (hubIntro) hubIntro.style.display = "none";
  }

  function toggleTrainingClass() {
    const active = isTrainingPage();
    document.body.classList.toggle("training-final-v449", active);
    if (active) {
      document.body.classList.remove("training-polished");
      document.querySelector("#homeBtn")?.classList.remove("hidden");
      document.querySelector("#resetProfileBtn")?.classList.add("hidden");
    }
  }

  function patch() {
    updateVersion();
    toggleTrainingClass();
    if (!isTrainingPage()) return;
    ensureHeroLine();
    cleanupHeroInfo();
    cleanupSportHub();
  }

  window.TrainingFinalV449 = { patch };

  patch();

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__trainingFinalRenderPatched) {
    window.__trainingFinalRenderPatched = true;
    render = function trainingFinalRender() {
      oldRender();
      window.requestAnimationFrame(patch);
    };
    render();
  }

  document.addEventListener("click", () => window.setTimeout(patch, 80), true);
  document.addEventListener("visibilitychange", patch);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTrainingFinalV449);
} else {
  initTrainingFinalV449();
}
