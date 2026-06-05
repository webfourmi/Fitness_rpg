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

  function openProgramsPageAndRenderList() {
    const button = document.querySelector("#openProgramsBtn");

    // Très important : on déclenche le vrai bouton Programmes.
    // Son onclick appelle openProgramPage() dans programs.js, ce qui crée #programsContent et renderProgramsList().
    // La navigation seule ne suffit pas, car elle ne reconstruit pas la liste.
    if (button) {
      button.click();
      return true;
    }

    if (window.FitnessRpgNavigation?.openPage) {
      return window.FitnessRpgNavigation.openPage("programs", { noScroll: true, silent: true });
    }

    return false;
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

    openProgramsPageAndRenderList();

    window.setTimeout(() => {
      const card = findProgramCard(programTitle);
      if (card) {
        card.classList.add("goal-recommended");
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.click();
        return;
      }

      // Si la page Programmes a été ouverte mais que la liste n’est toujours pas là,
      // on retente quelques fois. GitHub Pages + mobile peuvent être un peu lents.
      if (attempt < 25) {
        openProgramDetailByTitle(programTitle, attempt + 1);
        return;
      }

      console.warn(`Programme introuvable pour la quête du jour : ${programTitle}`);
    }, attempt === 0 ? 220 : 140);
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
