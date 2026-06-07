function initVersionFinalV453() {
  if (window.__versionFinalV453Ready) return;
  window.__versionFinalV453Ready = true;

  const VERSION = "0.4.5.3";
  const DISPLAY_VERSION = "V4.5.3";

  function setVersionText() {
    if (window.FitnessRpgConfig) {
      window.FitnessRpgConfig.version = VERSION;
      window.FitnessRpgConfig.displayVersion = DISPLAY_VERSION;
    }

    document.title = `Fitness RPG - ${DISPLAY_VERSION}`;

    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((node) => {
      node.textContent = VERSION;
    });

    document.querySelectorAll(".hero-header .eyebrow, #homeGameVersionBadge").forEach((node) => {
      node.textContent = `Fitness RPG · ${DISPLAY_VERSION}`;
    });

    if (window.FitnessRpgCore) window.FitnessRpgCore.version = VERSION;
  }

  setVersionText();

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__versionFinalRenderPatched) {
    window.__versionFinalRenderPatched = true;
    render = function versionFinalRender() {
      oldRender();
      window.requestAnimationFrame(setVersionText);
      window.setTimeout(setVersionText, 120);
    };
  }

  document.addEventListener("click", () => window.setTimeout(setVersionText, 80), true);
  window.setTimeout(setVersionText, 300);
  window.setTimeout(setVersionText, 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVersionFinalV453);
} else {
  initVersionFinalV453();
}
