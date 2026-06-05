function initNavigationV42() {
  if (window.__navigationV42Ready) return;
  window.__navigationV42Ready = true;

  const config = window.FitnessRpgConfig || {};
  const VERSION = "0.4.2";
  const DISPLAY_VERSION = "V4.2";
  const NAV_KEY = config.storageKeys?.navigationState || "sportRpgV42NavigationState";

  const pageMap = {
    dashboard: null,
    music: "musicPage",
    quests: "questsPage",
    badges: "badgesPage",
    week: "weekPage",
    programs: "programsToolPage",
    journal: "journalToolPage",
    weight: "weightToolPage",
    today: "todayToolPage",
    profile: "profileToolPage",
    goal: "goalToolPage",
    planning: "planningToolPage"
  };

  const buttonMap = {
    music: "openMusicBtn",
    quests: "openQuestsBtn",
    badges: "openBadgesBtn",
    week: "openWeekBtn",
    programs: "openProgramsBtn",
    journal: "openJournalBtn",
    weight: "openWeightBtn",
    today: "openTodayBtn",
    profile: "openProfileBtn",
    goal: "openGoalBtn",
    planning: "openPlanningBtn"
  };

  function saveNav(pageName) {
    try { localStorage.setItem(NAV_KEY, JSON.stringify({ page: pageName, at: new Date().toISOString() })); }
    catch {}
  }

  function setVersion() {
    if (config) {
      config.version = VERSION;
      config.displayVersion = DISPLAY_VERSION;
      config.setVersionLabels?.();
    }
  }

  function allPageElements() {
    return Object.values(pageMap)
      .filter(Boolean)
      .map((id) => document.querySelector(`#${id}`))
      .filter(Boolean);
  }

  function setCoreVisible(visible) {
    document.querySelector(".hero-card")?.classList.toggle("hidden", !visible);
    document.querySelector("#sportHub")?.classList.toggle("hidden", !visible);
    document.querySelector("#logCard")?.classList.add("hidden");
  }

  function clearActiveTools() {
    Object.values(buttonMap).forEach((id) => document.querySelector(`#${id}`)?.classList.remove("v42-active-tool"));
  }

  function markActive(pageName) {
    clearActiveTools();
    const buttonId = buttonMap[pageName];
    if (buttonId) document.querySelector(`#${buttonId}`)?.classList.add("v42-active-tool");
  }

  function openPage(pageName, options = {}) {
    const targetId = pageMap[pageName];

    if (pageName === "dashboard") {
      allPageElements().forEach((page) => page.classList.add("hidden"));
      setCoreVisible(true);
      markActive("dashboard");
      saveNav("dashboard");
      return true;
    }

    const target = targetId ? document.querySelector(`#${targetId}`) : null;
    if (!target) {
      if (!options.silent) console.warn(`Page introuvable pour la navigation V4.2 : ${pageName}`);
      return false;
    }

    allPageElements().forEach((page) => {
      page.classList.toggle("hidden", page.id !== targetId);
      page.classList.remove("v42-page-active");
    });

    setCoreVisible(false);
    target.classList.remove("hidden");
    target.classList.add("v42-page-active");
    markActive(pageName);
    saveNav(pageName);

    if (!options.noScroll) target.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  function closeToDashboard() {
    openPage("dashboard");
  }

  function pageFromButton(buttonId) {
    return Object.entries(buttonMap).find(([, id]) => id === buttonId)?.[0] || null;
  }

  function wireToolbar() {
    Object.entries(buttonMap).forEach(([pageName, buttonId]) => {
      const button = document.querySelector(`#${buttonId}`);
      if (!button || button.dataset.v42Nav === "true") return;
      button.dataset.v42Nav = "true";
      button.addEventListener("click", () => {
        window.setTimeout(() => openPage(pageName, { noScroll: true, silent: true }), 0);
      });
    });

    document.querySelectorAll(".back-dashboard-btn, .tool-back-btn, #programsBackBtn, #todayBackBtn, #profileBackBtn").forEach((button) => {
      if (button.dataset.v42Back === "true") return;
      button.dataset.v42Back = "true";
      button.addEventListener("click", () => window.setTimeout(closeToDashboard, 0));
    });
  }

  function addNavNote() {
    const hub = document.querySelector("#sportHub > div:first-child");
    if (!hub || document.querySelector("#v42NavNote")) return;
    const note = document.createElement("span");
    note.id = "v42NavNote";
    note.className = "v42-nav-note";
    note.textContent = "🧭 Navigation V4.2 active";
    hub.appendChild(note);
  }

  function patchCore() {
    window.FitnessRpgNavigation = { openPage, closeToDashboard, current: () => JSON.parse(localStorage.getItem(NAV_KEY) || "{}") };
    if (window.FitnessRpgCore) {
      window.FitnessRpgCore.openPage = openPage;
      window.FitnessRpgCore.closeToolsToDashboard = closeToDashboard;
    }
  }

  function patch() {
    setVersion();
    wireToolbar();
    addNavNote();
    patchCore();
  }

  patch();

  const observer = new MutationObserver(() => patch());
  observer.observe(document.body, { childList: true, subtree: true });

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__navigationV42RenderPatched) {
    window.__navigationV42RenderPatched = true;
    render = function navigationV42Render() {
      oldRender();
      patch();
    };
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavigationV42);
} else {
  initNavigationV42();
}
