function initTrainingFinalV449() {
  if (window.__trainingFinalV449Ready) return;
  window.__trainingFinalV449Ready = true;

  const VERSION = "0.4.5.2";
  const DISPLAY_VERSION = "V4.5.2";

  function setText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function loadV45Assets() {
    if (!document.querySelector('link[href^="v45-ui.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "v45-ui.css?v=4.5.2";
      document.head.appendChild(link);
    }
    if (!document.querySelector('script[src^="sport-distance-v45.js"]')) {
      const script = document.createElement("script");
      script.src = "sport-distance-v45.js?v=4.5.2";
      document.body.appendChild(script);
    }
    if (!document.querySelector('script[src^="today-direct-program-v45.js"]')) {
      const script = document.createElement("script");
      script.src = "today-direct-program-v45.js?v=4.5.2";
      document.body.appendChild(script);
    }
  }

  function isTrainingPage() {
    const dashboard = document.querySelector("#dashboard");
    const sportHub = document.querySelector("#sportHub");
    const heroCard = document.querySelector(".hero-card");
    return Boolean(
      dashboard && !dashboard.classList.contains("hidden") &&
      sportHub && !sportHub.classList.contains("hidden") &&
      heroCard && !heroCard.classList.contains("hidden")
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

  function forceHeader() {
    const header = document.querySelector(".hero-header");
    const homeBtn = document.querySelector("#homeBtn");
    const resetBtn = document.querySelector("#resetProfileBtn");
    const titleBlock = header?.querySelector("div:first-child");
    const actions = header?.querySelector(".header-actions");
    if (!header) return;

    header.style.display = "flex";
    header.style.visibility = "visible";
    header.style.opacity = "1";
    header.style.position = "relative";
    header.style.zIndex = "50";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.flexWrap = "nowrap";
    header.style.gap = "8px";

    if (titleBlock) {
      titleBlock.style.flex = "1 1 auto";
      titleBlock.style.minWidth = "0";
    }
    if (actions) {
      actions.style.display = "flex";
      actions.style.flex = "0 0 auto";
      actions.style.alignItems = "center";
      actions.style.justifyContent = "flex-end";
      actions.style.whiteSpace = "nowrap";
    }

    const eyebrow = header.querySelector(".eyebrow");
    if (eyebrow) {
      eyebrow.style.whiteSpace = "nowrap";
      eyebrow.style.overflow = "hidden";
      eyebrow.style.textOverflow = "ellipsis";
      eyebrow.style.maxWidth = "100%";
    }

    if (homeBtn) {
      homeBtn.classList.remove("hidden");
      homeBtn.innerHTML = "🏠";
      homeBtn.setAttribute("aria-label", "Accueil");
      homeBtn.setAttribute("title", "Accueil");
      homeBtn.style.display = "inline-flex";
      homeBtn.style.visibility = "visible";
      homeBtn.style.opacity = "1";
      homeBtn.style.alignItems = "center";
      homeBtn.style.justifyContent = "center";
      homeBtn.style.width = "38px";
      homeBtn.style.minWidth = "38px";
      homeBtn.style.height = "38px";
      homeBtn.style.minHeight = "38px";
      homeBtn.style.padding = "0";
      homeBtn.style.borderRadius = "999px";
      homeBtn.style.fontSize = "1.05rem";
      homeBtn.style.lineHeight = "1";
      homeBtn.style.flexShrink = "0";
    }
    if (resetBtn) resetBtn.classList.add("hidden");
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
      if (label.includes("xp total")) {
        card.classList.add("training-hide-xp-total");
        card.dataset.statCard = "xp-total";
      } else {
        card.classList.remove("training-hide-xp-total");
        card.style.display = "block";
      }
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
      document.body.classList.remove("home-polished");
      forceHeader();
    }
  }

  function patch() {
    loadV45Assets();
    updateVersion();
    toggleTrainingClass();
    if (!isTrainingPage()) return;
    forceHeader();
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
      window.setTimeout(patch, 120);
    };
    render();
  }

  document.addEventListener("click", () => window.setTimeout(patch, 80), true);
  document.addEventListener("visibilitychange", patch);
  window.setTimeout(patch, 250);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTrainingFinalV449);
} else {
  initTrainingFinalV449();
}
