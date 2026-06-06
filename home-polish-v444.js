function initHomePolishV444() {
  if (window.__homePolishV444Ready) return;
  window.__homePolishV444Ready = true;

  const VERSION = "0.4.4.6";
  const DISPLAY_VERSION = "V4.4.6";
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

  function currentRankWord() {
    try {
      const total = profile && profile.totalXp ? profile.totalXp : 0;
      const level = typeof levelInfo === "function" ? levelInfo(total).level : 1;
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
      const info = typeof levelInfo === "function" ? levelInfo(profile.totalXp || 0) : { level: 1 };
      setText(heroSummary, `${profile.name || "Héros"} · ${profile.age ? `${profile.age} ans · ` : ""}${currentRankWord()} · Niveau ${info.level} · ${profile.totalXp || 0} XP`);
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
      heroCard.insertBefore(label, portrait);
    }
    setText(label, `${profile.name || "Héros"} · ${currentRankWord()}`);
  }

  function togglePageClasses() {
    const home = isHomeVisible();
    const training = isTrainingVisible();
    document.body.classList.toggle("home-polished", home);
    document.body.classList.toggle("training-polished", !home && training);
    document.querySelector("#resetProfileBtn")?.classList.toggle("hidden", home);
  }

  function patch() {
    if (isPatching) return;
    isPatching = true;
    patchVersion();
    ensureGameVersionBadge();
    patchHomeTexts();
    patchHomeImage();
    ensureTrainingHeroLabel();
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
    if (event.target.closest("#continueProfileBtn, #changeCoachBtn, #startCreateHeroBtn, #homeBtn")) {
      window.setTimeout(patch, 50);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomePolishV444);
} else {
  initHomePolishV444();
}