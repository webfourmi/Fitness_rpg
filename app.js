// ============================================================
// Fitness RPG - app.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - initialiser toute l’application ;
// - appeler les modules dans le bon ordre ;
// - lancer le premier rendu ;
// - fournir quelques outils globaux de debug.
//
// Règle importante :
// ce fichier ne contient aucune version.
// La version officielle est uniquement dans app-config.js.
// ============================================================

window.FitnessRpgApp = {
  ready: false
};

// ============================================================
// Vérification des modules
// ============================================================

window.FitnessRpgApp.requiredModules = [
  "FitnessRpgConfig",
  "FitnessRpgData",
  "FitnessRpgState",
  "FitnessRpgProgress",
  "FitnessRpgRender",
  "FitnessRpgNavigation",
  "FitnessRpgExercises",
  "FitnessRpgPrograms",
  "FitnessRpgMedia"
];

window.FitnessRpgApp.checkModules = function checkModules() {
  const missing = window.FitnessRpgApp.requiredModules.filter((moduleName) => {
    return !window[moduleName];
  });

  if (missing.length) {
    console.error("Modules Fitness RPG manquants :", missing);
    alert(`Erreur de chargement Fitness RPG : modules manquants ${missing.join(", ")}`);
    return false;
  }

  return true;
};

// ============================================================
// Initialisation visuelle de base
// ============================================================

window.FitnessRpgApp.applyVersion = function applyVersion() {
  window.FitnessRpgConfig?.setVersionLabels?.();
};

window.FitnessRpgApp.ensureInitialPage = function ensureInitialPage() {
  if (window.FitnessRpgState.hasProfile()) {
    window.FitnessRpgState.setPage("home");
  } else {
    window.FitnessRpgState.setPage("hero-setup");
  }
};

window.FitnessRpgApp.prepareDom = function prepareDom() {
  document.body.classList.add("fitness-rpg-v5");
  
  const backButton = document.querySelector("#backButton");
  const homeButton = document.querySelector("#homeButton");

  if (backButton) {
    backButton.innerHTML = "←";
    backButton.setAttribute("aria-label", "Retour");
    backButton.setAttribute("title", "Retour");
  }

  if (homeButton) {
    homeButton.innerHTML = "🏠";
    homeButton.setAttribute("aria-label", "Accueil");
    homeButton.setAttribute("title", "Accueil");
  }
};

// ============================================================
// Initialisation des modules
// ============================================================

window.FitnessRpgApp.initModules = function initModules() {
  window.FitnessRpgState?.init?.();
  window.FitnessRpgProgress?.init?.();
  window.FitnessRpgExercises?.init?.();
  window.FitnessRpgPrograms?.init?.();
  window.FitnessRpgMedia?.init?.();
  window.FitnessRpgNavigation?.init?.();
};
// ============================================================
// Rendu global
// ============================================================

window.FitnessRpgApp.render = function render() {
  window.FitnessRpgApp.applyVersion();
  window.FitnessRpgRender.renderAll?.();
  window.FitnessRpgPrograms.afterRender?.();
};

window.FitnessRpgApp.refresh = function refresh() {
  window.FitnessRpgApp.render();
};

// ============================================================
// Debug utile pendant la refonte
// ============================================================

window.FitnessRpgApp.debug = function debug() {
  return {
    ready: window.FitnessRpgApp.ready,
    version: window.FitnessRpgConfig?.displayVersion,
    page: window.FitnessRpgState?.getPage?.(),
    profile: window.FitnessRpgState?.getProfile?.(),
    modules: window.FitnessRpgApp.requiredModules.reduce((acc, moduleName) => {
      acc[moduleName] = Boolean(window[moduleName]);
      return acc;
    }, {})
  };
};

window.FitnessRpgApp.resetLocalData = function resetLocalData() {
  const ok = window.confirm("Supprimer les données locales Fitness RPG V5 ?");

  if (!ok) return;

  const keys = window.FitnessRpgConfig?.storageKeys || {};

  Object.values(keys).forEach((key) => {
    localStorage.removeItem(key);
  });

  window.location.reload();
};

// ============================================================
// Initialisation principale
// ============================================================

window.FitnessRpgApp.init = function init() {
  if (window.FitnessRpgApp.ready) return;

  if (!window.FitnessRpgApp.checkModules()) return;

  window.FitnessRpgApp.prepareDom();
  window.FitnessRpgApp.initModules();
  window.FitnessRpgApp.ensureInitialPage();
  window.FitnessRpgApp.render();

  window.FitnessRpgApp.ready = true;

  console.info(`Fitness RPG chargé : ${window.FitnessRpgConfig.displayVersion}`);
};

// ============================================================
// Lancement
// ============================================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", window.FitnessRpgApp.init);
} else {
  window.FitnessRpgApp.init();
}
