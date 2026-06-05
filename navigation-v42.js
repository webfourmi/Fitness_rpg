function initNavigationV42() {
  if (window.__navigationV42Ready) return;
  window.__navigationV42Ready = true;

  const config = window.FitnessRpgConfig || {};
  const VERSION = "0.4.3.1";
  const DISPLAY_VERSION = "V4.3.1";
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
    openMusicBtn: "music",
    openQuestsBtn: "quests",
    openBadgesBtn: "badges",
    openWeekBtn: "week",
    openProgramsBtn: "programs",
    openJournalBtn: "journal",
    openWeightBtn: "weight",
    openTodayBtn: "today",
    openProfileBtn: "profile",
    openGoalBtn: "goal",
    openPlanningBtn: "planning"
  };

  function ensureStylesheet(href) {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function ensureProfileV43Assets() {
    ensureStylesheet("profile-v43.css");
    ensureStylesheet("title-cleanup-v431.css");

    if (!document.querySelector('script[src="profile-v43.js"]')) {
      const script = document.createElement("script");
      script.src = "profile-v43.js";
      document.body.appendChild(script);
    }
  }

  function setTextIfDifferent(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function setVersion() {
    if (config) {
      config.version = VERSION;
      config.displayVersion = DISPLAY_VERSION;
    }

    if (document.title !== `Fitness RPG - ${DISPLAY_VERSION}`) {
      document.title = `Fitness RPG - ${DISPLAY_VERSION}`;
    }

    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((node) => {
      setTextIfDifferent(node, VERSION);
    });

    setTextIfDifferent(document.querySelector(".hero-header .eyebrow"), `Fitness RPG · ${DISPLAY_VERSION}`);
  }

  function cleanupDuplicatedTitles() {
    // Le grand titre global existe déjà dans .hero-header. On supprime/masque les répétitions internes.
    const hubIntro = document.querySelector("#sportHub > div:first-child");
    if (hubIntro) {
      hubIntro.querySelector("h2")?.classList.add("hidden-dashboard-title-v431");
      hubIntro.querySelector(".muted")?.classList.add("hidden-dashboard-title-v431");
    }

    document.querySelectorAll(".custom-tool-page .hero-header, .tool-page-screen .hero-header").forEach((node) => node.remove());

    document.querySelectorAll(".custom-tool-page h1, .tool-page-screen h1").forEach((title) => {
      if (title.textContent.trim().toLowerCase() === "quêtes sportives") title.remove();
    });
  }

  function saveNav(pageName) {
    try {
      localStorage.setItem(NAV_KEY, JSON.stringify({ page: pageName, at: new Date().toISOString() }));
    } catch {}
  }

  function pageElements() {
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

  function markActive(pageName) {
    document.querySelectorAll(".v42-active-tool").forEach((button) => button.classList.remove("v42-active-tool"));
    const entry = Object.entries(buttonMap).find(([, page]) => page === pageName);
    if (entry) document.querySelector(`#${entry[0]}`)?.classList.add("v42-active-tool");
  }

  function closeToDashboard() {
    pageElements().forEach((page) => {
      page.classList.add("hidden");
      page.classList.remove("v42-page-active");
    });
    setCoreVisible(true);
    markActive("dashboard");
    saveNav("dashboard");
    cleanupDuplicatedTitles();
    return true;
  }

  function openPage(pageName, options = {}) {
    if (pageName === "dashboard") return closeToDashboard();

    if (pageName === "profile" && typeof window.renderProfileV43 === "function") {
      window.renderProfileV43();
    }

    const targetId = pageMap[pageName];
    const target = targetId ? document.querySelector(`#${targetId}`) : null;

    if (!target) {
      if (!options.silent) console.warn(`Page introuvable pour la navigation V4.3.1 : ${pageName}`);
      return false;
    }

    pageElements().forEach((page) => {
      page.classList.toggle("hidden", page.id !== targetId);
      page.classList.remove("v42-page-active");
    });

    setCoreVisible(false);
    target.classList.remove("hidden");
    target.classList.add("v42-page-active");
    markActive(pageName);
    saveNav(pageName);
    cleanupDuplicatedTitles();

    if (!options.noScroll) target.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  function handleNavigationClick(event) {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.matches(".back-dashboard-btn, .tool-back-btn, #programsBackBtn, #todayBackBtn, #profileBackBtn")) {
      window.setTimeout(closeToDashboard, 0);
      return;
    }

    const pageName = buttonMap[button.id];
    if (!pageName) return;

    window.setTimeout(() => openPage(pageName, { noScroll: true, silent: true }), 0);
  }

  function addNavNote() {
    const hub = document.querySelector("#sportHub > div:first-child");
    if (!hub) return;

    let note = document.querySelector("#v42NavNote");
    if (!note) {
      note = document.createElement("span");
      note.id = "v42NavNote";
      note.className = "v42-nav-note";
      hub.appendChild(note);
    }

    setTextIfDifferent(note, "🧭 Navigation V4.3.1 · titres nettoyés");
  }

  function patchCore() {
    window.FitnessRpgNavigation = {
      openPage,
      closeToDashboard,
      current: () => {
        try { return JSON.parse(localStorage.getItem(NAV_KEY) || "{}"); }
        catch { return {}; }
      }
    };

    if (window.FitnessRpgCore) {
      window.FitnessRpgCore.openPage = openPage;
      window.FitnessRpgCore.closeToolsToDashboard = closeToDashboard;
    }
  }

  function patch() {
    ensureProfileV43Assets();
    setVersion();
    addNavNote();
    cleanupDuplicatedTitles();
    patchCore();
  }

  document.addEventListener("click", handleNavigationClick);
  patch();

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
