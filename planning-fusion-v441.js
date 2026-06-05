function initPlanningFusionV441() {
  if (window.__planningFusionV441Ready) return;
  window.__planningFusionV441Ready = true;

  const VERSION = "0.4.4.1";
  const DISPLAY_VERSION = "V4.4.1";

  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function weekKeys() {
    const now = new Date();
    const mondayOffset = now.getDay() === 0 ? -6 : 1 - now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, index) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + index);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    });
  }

  function dayLabel(index) {
    return ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][index] || "Jour";
  }

  function entriesForDate(date) {
    try {
      if (!profile?.completedByDate) return [];
      return Array.isArray(profile.completedByDate[date]) ? profile.completedByDate[date] : [];
    } catch {
      return [];
    }
  }

  function setVersion() {
    if (window.FitnessRpgConfig) {
      window.FitnessRpgConfig.version = VERSION;
      window.FitnessRpgConfig.displayVersion = DISPLAY_VERSION;
    }
    document.title = `Fitness RPG - ${DISPLAY_VERSION}`;
    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((node) => {
      node.textContent = VERSION;
    });
    if (window.FitnessRpgNavigation?.setMainHeader) {
      const current = window.FitnessRpgNavigation.current?.()?.page || "dashboard";
      if (current === "week") window.FitnessRpgNavigation.setMainHeader("planning");
      else window.FitnessRpgNavigation.setMainHeader(current);
    }
  }

  function renderWeekSummaryInsidePlanning() {
    const planning = document.querySelector("#planningToolPage");
    if (!planning) return;

    planning.querySelector(".tool-page-header > div")?.classList.add("hidden-dashboard-title-v431");

    let summary = planning.querySelector("#planningWeekSummary");
    if (!summary) {
      summary = document.createElement("section");
      summary.id = "planningWeekSummary";
      summary.className = "planning-week-summary";
      const firstContent = planning.querySelector(".planning-card, .planning-hero-card, .weekly-plan, .planning-list") || planning.querySelector(".tool-page-header")?.nextElementSibling;
      if (firstContent) firstContent.insertAdjacentElement("beforebegin", summary);
      else planning.appendChild(summary);
    }

    const keys = weekKeys();
    const today = todayKey();
    const totalDays = keys.filter((key) => entriesForDate(key).length > 0).length;
    const totalEntries = keys.reduce((sum, key) => sum + entriesForDate(key).length, 0);

    summary.innerHTML = `
      <p class="eyebrow">Cette semaine</p>
      <div class="planning-week-days">
        ${keys.map((key, index) => {
          const count = entriesForDate(key).length;
          const classes = ["planning-week-day", key === today ? "today" : "", count ? "done" : ""].filter(Boolean).join(" ");
          return `<article class="${classes}"><strong>${dayLabel(index)}</strong><span>${count ? `${count} entrée${count > 1 ? "s" : ""}` : "0 entrée"}</span></article>`;
        }).join("")}
      </div>
      <p class="planning-week-note">${totalDays}/7 jours actifs · ${totalEntries} entrée${totalEntries > 1 ? "s" : ""} cette semaine. La régularité est intégrée au planning, plus besoin d’une page séparée.</p>
    `;
  }

  function redirectWeekToPlanning() {
    const weekButton = document.querySelector("#openWeekBtn");
    if (!weekButton) return;

    weekButton.innerHTML = `<span>📅</span><strong>Planning</strong><small>Semaine</small>`;
    weekButton.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (typeof window.openWeeklyPlanning === "function") {
        window.openWeeklyPlanning();
      } else if (window.FitnessRpgNavigation?.openPage) {
        window.FitnessRpgNavigation.openPage("planning", { noScroll: true, silent: true });
      } else {
        document.querySelector("#openPlanningBtn")?.click();
      }
      window.setTimeout(renderWeekSummaryInsidePlanning, 120);
    };
  }

  function hideOldWeekPage() {
    document.querySelector("#weekPage")?.classList.add("hidden");
  }

  function optimizeHomeImage() {
    const img = document.querySelector(".home-hero-visual img");
    if (!img) return;
    img.loading = "eager";
    img.decoding = "async";
    img.fetchPriority = "high";
    img.width = img.width || 900;
    img.height = img.height || 900;

    if (!document.querySelector("link[data-home-preload='true']")) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = img.getAttribute("src") || "assets/ecran/ecran_accueil.png";
      link.dataset.homePreload = "true";
      document.head.appendChild(link);
    }
  }

  function patchNavigation() {
    if (!window.FitnessRpgNavigation || window.__planningFusionNavPatched) return;
    window.__planningFusionNavPatched = true;
    const oldOpenPage = window.FitnessRpgNavigation.openPage;

    window.FitnessRpgNavigation.openPage = function fusedOpenPage(pageName, options = {}) {
      const target = pageName === "week" ? "planning" : pageName;
      const result = oldOpenPage.call(window.FitnessRpgNavigation, target, options);
      if (target === "planning") window.setTimeout(renderWeekSummaryInsidePlanning, 80);
      return result;
    };
  }

  function patch() {
    setVersion();
    redirectWeekToPlanning();
    hideOldWeekPage();
    optimizeHomeImage();
    patchNavigation();
    renderWeekSummaryInsidePlanning();
  }

  window.renderPlanningWeekSummary = renderWeekSummaryInsidePlanning;

  patch();

  const observer = new MutationObserver(() => window.requestAnimationFrame(patch));
  observer.observe(document.body, { childList: true, subtree: true });

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__planningFusionRenderPatched) {
    window.__planningFusionRenderPatched = true;
    render = function planningFusionRender() {
      oldRender();
      patch();
    };
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPlanningFusionV441);
} else {
  initPlanningFusionV441();
}
