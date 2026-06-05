function initTodayProgramDirect() {
  if (window.__todayProgramDirectReady) return;
  window.__todayProgramDirectReady = true;

  function normalizeTitle(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/œ/g, "oe")
      .replace(/’/g, "'");
  }

  function currentTodayProgramTitle() {
    return document.querySelector("#todayDashboardCard h2")?.textContent?.trim()
      || document.querySelector("#todayContent .today-hero-card h2")?.textContent?.trim()
      || document.querySelector("#todayContent h2")?.textContent?.trim()
      || "";
  }

  function openFallbackExercises() {
    document.querySelector("#openQuestsBtn")?.click();
  }

  function openProgramsPage() {
    if (window.FitnessRpgNavigation?.openPage) {
      const opened = window.FitnessRpgNavigation.openPage("programs", { noScroll: true, silent: true });
      if (opened) return;
    }
    document.querySelector("#openProgramsBtn")?.click();
  }

  function findProgramCard(title) {
    const wanted = normalizeTitle(title);
    return [...document.querySelectorAll(".program-card")].find((card) => {
      const cardTitle = card.querySelector("h3")?.textContent?.trim() || "";
      return normalizeTitle(cardTitle) === wanted;
    });
  }

  function openProgramDetailByTitle(title, attempt = 0) {
    const programTitle = String(title || "").trim();
    if (!programTitle) return;

    if (normalizeTitle(programTitle) === normalizeTitle("Repos actif")) {
      openFallbackExercises();
      return;
    }

    openProgramsPage();

    window.setTimeout(() => {
      const card = findProgramCard(programTitle);
      if (card) {
        card.classList.add("goal-recommended");
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.click();
        return;
      }

      if (attempt < 20) {
        openProgramDetailByTitle(programTitle, attempt + 1);
      }
    }, attempt === 0 ? 180 : 120);
  }

  function openTodaySelectedProgram() {
    openProgramDetailByTitle(currentTodayProgramTitle());
  }

  function handleTodayClick(event) {
    const otherButton = event.target.closest("#todayOtherBtn, #todayExerciseBtn, #todayPlanningBtn, #todayValidateBtn");
    if (otherButton) return;

    const directTarget = event.target.closest("#todayStartBtn, #todayProgramBtn, #todayDashboardCard, #todayContent .today-hero-card");
    if (!directTarget) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    openTodaySelectedProgram();
  }

  window.openTodaySelectedProgram = openTodaySelectedProgram;
  window.openProgramDetailByTitle = openProgramDetailByTitle;

  document.addEventListener("click", handleTodayClick, true);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTodayProgramDirect);
} else {
  initTodayProgramDirect();
}
