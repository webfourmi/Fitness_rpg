function initTitleCleanupV431() {
  if (window.__titleCleanupV431Ready) return;
  window.__titleCleanupV431Ready = true;

 const config = window.FitnessRpgConfig || {
    version: "0.4.6.0",
    displayVersion: "V4.6.0",
    storageKeys: {}
  };

 function applyVersion() {
  window.FitnessRpgConfig?.setVersionLabels?.();
}

  function cleanupDuplicatedTitles() {
    applyVersion();

    // Le gros titre global existe déjà dans .hero-header : on masque le titre répété du tableau de bord.
    const hubIntro = document.querySelector("#sportHub > div:first-child");
    if (hubIntro) {
      hubIntro.querySelector("h2")?.classList.add("hidden-dashboard-title-v431");
      hubIntro.querySelector(".muted")?.classList.add("hidden-dashboard-title-v431");
    }

    // Sécurité : si un module recrée un gros header complet dans une page interne, on le neutralise.
    document.querySelectorAll(".custom-tool-page .hero-header, .tool-page-screen .hero-header").forEach((node) => {
      node.remove();
    });

    // Les titres locaux restent en h2 : Objectif personnel, Planning hebdomadaire, Régularité, etc.
    document.querySelectorAll(".custom-tool-page h1, .tool-page-screen h1").forEach((title) => {
      if (title.textContent.trim().toLowerCase() === "quêtes sportives") {
        title.remove();
      }
    });
  }

  cleanupDuplicatedTitles();

  const observer = new MutationObserver(() => {
    window.requestAnimationFrame(cleanupDuplicatedTitles);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__titleCleanupRenderPatched) {
    window.__titleCleanupRenderPatched = true;
    render = function titleCleanupRender() {
      oldRender();
      cleanupDuplicatedTitles();
    };
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTitleCleanupV431);
} else {
  initTitleCleanupV431();
}
