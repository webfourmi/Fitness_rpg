function initHomePolishV444() {
  if (window.__homePolishV444Ready) return;
  window.__homePolishV444Ready = true;

  const VERSION = "0.4.4.5";
  const DISPLAY_VERSION = "V4.4.5";

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
      const total = profile?.totalXp || 0;
      const level = typeof levelInfo === "function" ? levelInfo(total).level : 1;
      if (window.FitnessRpgConfig?.getRankTitle) return window.FitnessRpgConfig.getRankTitle(level);
      if (level <= 4) return "Novice";
      if (level <= 9) return "Aventurier";
      if (level <= 14) return "Champion";
      if (level <= 19) return "Légende";
      return "Héros mythique";
    } catch {
      return "Novice";
    }
  }

  function patchVersion() {
    if (window.FitnessRpgConfig) {
      window.FitnessRpgConfig.version = VERSION;
      window.FitnessRpgConfig.displayVersion = DISPLAY_VERSION;
    }
    document.title = `Fitness RPG - ${DISPLAY_VERSION}`;
    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((node) => {
      node.textContent = VERSION;
    });
    const eyebrow = document.querySelector(".hero-header .eyebrow");
    if (eyebrow) eyebrow.textContent = `Fitness RPG · ${DISPLAY_VERSION}`;
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
    badge.textContent = `Fitness RPG · ${DISPLAY_VERSION}`;
  }

  function patchHomeTexts() {
    const start = document.querySelector("#continueProfileBtn");
    const coach = document.querySelector("#changeCoachBtn");
    const newHero = document.querySelector("#startCreateHeroBtn");
    if (start) {
      start.textContent = "Entraînement";
      start.onclick = () => {
        try { currentView = "dashboard"; pose = "idle"; render(); }
        catch { window.FitnessRpgNavigation?.openPage?.("dashboard"); }
      };
    }
    if (coach) {
      coach.textContent = "Coach";
      coach.onclick = () => {
        try { currentView = "coach"; selectCoach(profile.coach); render(); }
        catch {}
      };
    }
    if (newHero) {
      newHero.textContent = "Nouveau héros";
      newHero.onclick = () => {
        try { currentView = "setup"; render(); }
        catch {}
      };
    }

    const heroSummary = document.querySelector("#homeHeroSummary");
    if (heroSummary && profile) {
      const info = typeof levelInfo === "function" ? levelInfo(profile.totalXp || 0) : { level: 1 };
      heroSummary.textContent = `${profile.name || "Héros"} · ${profile.age ? `${profile.age} ans · ` : ""}${currentRankWord()} · Niveau ${info.level} · ${profile.totalXp || 0} XP`;
    }

    const coachSummary = document.querySelector("#homeCoachSummary");
    if (coachSummary && profile && typeof coaches !== "undefined") {
      coachSummary.textContent = `Coach actuel : ${coaches[profile.coach]?.fullName || coaches[profile.coach]?.name || "Coach"}`;
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
    if (!heroCard || !portrait || !profile) return;

    let label = document.querySelector("#trainingHeroLabel");
    if (!label) {
      label = document.createElement("div");
      label.id = "trainingHeroLabel";
      label.className = "training-hero-label";
      heroCard.insertBefore(label, portrait);
    }
    label.textContent = `${profile.name || "Héros"} · ${currentRankWord()}`;
  }

  function togglePageClasses() {
    const home = isHomeVisible();
    const training = isTrainingVisible();
    document.body.classList.toggle("home-polished", home);
    document.body.classList.toggle("training-polished", !home && training);
    const reset = document.querySelector("#resetProfileBtn");
    if (reset) reset.classList.toggle("hidden", home);
  }

  function patch() {
    patchVersion();
    ensureGameVersionBadge();
    patchHomeTexts();
    patchHomeImage();
    ensureTrainingHeroLabel();
    togglePageClasses();
  }

  patch();
  window.setInterval(patch, 650);

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__homePolishRenderPatched) {
    window.__homePolishRenderPatched = true;
    render = function homePolishRender() {
      oldRender();
      patch();
    };
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomePolishV444);
} else {
  initHomePolishV444();
}