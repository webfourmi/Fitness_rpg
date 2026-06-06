function initHomePolishV444() {
  if (window.__homePolishV444Ready) return;
  window.__homePolishV444Ready = true;

  const VERSION = "0.4.4.4";
  const DISPLAY_VERSION = "V4.4.4";

  function isHomeVisible() {
    const homePanel = document.querySelector("#homePanel");
    return Boolean(homePanel && !homePanel.classList.contains("hidden"));
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
    if (start) start.textContent = "Entraînement";
    if (coach) coach.textContent = "Coach";
    if (newHero) newHero.textContent = "Nouveau héros";

    const heroSummary = document.querySelector("#homeHeroSummary");
    if (heroSummary && heroSummary.textContent.includes("Niveau")) {
      heroSummary.textContent = heroSummary.textContent.replace(" · Homme · ", " · ").replace(" · Femme · ", " · ");
    }
  }

  function patchHomeImage() {
    const img = document.querySelector(".home-hero-visual img");
    if (!img) return;
    img.loading = "eager";
    img.decoding = "async";
    img.fetchPriority = "high";
  }

  function toggleHomeClass() {
    document.body.classList.toggle("home-polished", isHomeVisible());
    const reset = document.querySelector("#resetProfileBtn");
    if (reset) reset.classList.toggle("hidden", isHomeVisible());
  }

  function patch() {
    patchVersion();
    ensureGameVersionBadge();
    patchHomeTexts();
    patchHomeImage();
    toggleHomeClass();
  }

  patch();

  const observer = new MutationObserver(() => window.requestAnimationFrame(patch));
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });

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
