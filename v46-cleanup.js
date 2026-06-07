function initV46Cleanup() {
  if (window.__v46CleanupReady) return;
  window.__v46CleanupReady = true;

  const OFFICIAL_VERSION = "0.4.6.0";
  const OFFICIAL_DISPLAY_VERSION = "V4.6.0";

  function applyVersion() {
    if (window.FitnessRpgConfig) {
      window.FitnessRpgConfig.version = OFFICIAL_VERSION;
      window.FitnessRpgConfig.displayVersion = OFFICIAL_DISPLAY_VERSION;
    }

    document.title = `Fitness RPG - ${OFFICIAL_DISPLAY_VERSION}`;

    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((node) => {
      node.textContent = OFFICIAL_VERSION;
    });

    document.querySelectorAll(".hero-header .eyebrow, #homeGameVersionBadge").forEach((node) => {
      node.textContent = `Fitness RPG · ${OFFICIAL_DISPLAY_VERSION}`;
    });
  }

  function normalizeText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function recommendedProgramTitle() {
    const fromDashboard = document.querySelector("#todayDashboardCard h2")?.textContent?.trim();
    if (fromDashboard) return fromDashboard;

    const fromTodayPage = document.querySelector("#todayContent h2")?.textContent?.trim();
    if (fromTodayPage) return fromTodayPage;

    return "Éveil du héros";
  }

  function openRecommendedProgram() {
    const title = recommendedProgramTitle();

    if (window.FitnessRpgNavigation?.openPage) {
      window.FitnessRpgNavigation.openPage("programs", {
        noScroll: true,
        silent: true
      });
    } else {
      document.querySelector("#openProgramsBtn")?.click();
    }

    let attempts = 0;

    const timer = window.setInterval(() => {
      attempts += 1;

      const cards = Array.from(document.querySelectorAll(".program-card"));
      const match = cards.find((card) => {
        const cardTitle = card.querySelector("h3")?.textContent;
        return normalizeText(cardTitle) === normalizeText(title);
      });

      if (match) {
        window.clearInterval(timer);
        match.click();

        window.setTimeout(() => {
          document.querySelector("#programsToolPage")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }, 120);
      }

      if (attempts > 25) {
        window.clearInterval(timer);
      }
    }, 80);
  }

  function patchTodayCard() {
    const card = document.querySelector("#todayDashboardCard");

    if (card && card.dataset.v46DirectProgram !== "true") {
      card.dataset.v46DirectProgram = "true";
      card.classList.add("today-direct-program-card");
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("title", "Ouvrir le programme recommandé");

      card.addEventListener(
        "click",
        (event) => {
          if (event.target.closest("#todayOtherBtn")) return;

          event.preventDefault();
          event.stopImmediatePropagation();
          openRecommendedProgram();
        },
        true
      );

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openRecommendedProgram();
        }
      });
    }

    const start = document.querySelector("#todayStartBtn");

    if (start && start.dataset.v46DirectProgram !== "true") {
      start.dataset.v46DirectProgram = "true";
      start.textContent = "Ouvrir le programme";

      start.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          openRecommendedProgram();
        },
        true
      );
    }

    const programBtn = document.querySelector("#todayProgramBtn");

    if (programBtn && programBtn.dataset.v46DirectProgram !== "true") {
      programBtn.dataset.v46DirectProgram = "true";

      programBtn.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          openRecommendedProgram();
        },
        true
      );
    }
  }

  function patchHomeButtonIcon() {
    const homeBtn = document.querySelector("#homeBtn");
    if (!homeBtn) return;

    homeBtn.innerHTML = "🏠";
    homeBtn.setAttribute("aria-label", "Accueil");
    homeBtn.setAttribute("title", "Accueil");
  }

  function patch() {
    applyVersion();
    patchTodayCard();
    patchHomeButtonIcon();
  }

  patch();

  const oldRender = typeof render === "function" ? render : null;

  if (oldRender && !window.__v46RenderPatched) {
    window.__v46RenderPatched = true;

    render = function v46Render() {
      oldRender();
      window.requestAnimationFrame(patch);
      window.setTimeout(patch, 120);
    };
  }

  document.addEventListener(
    "click",
    () => {
      window.setTimeout(patch, 80);
    },
    true
  );

  window.setTimeout(patch, 300);
  window.setTimeout(patch, 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initV46Cleanup);
} else {
  initV46Cleanup();
}
