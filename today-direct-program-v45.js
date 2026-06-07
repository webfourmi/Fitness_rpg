function initTodayDirectProgramV45() {
  if (window.__todayDirectProgramV45Ready) return;
  window.__todayDirectProgramV45Ready = true;

  function recommendedProgramTitle() {
    const fromDashboard = document.querySelector("#todayDashboardCard h2")?.textContent?.trim();
    if (fromDashboard) return fromDashboard;
    const fromTodayPage = document.querySelector("#todayContent .today-hero-card h2")?.textContent?.trim();
    if (fromTodayPage) return fromTodayPage;
    return "Éveil du héros";
  }

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function openRecommendedProgram() {
    const programTitle = recommendedProgramTitle();

    if (window.FitnessRpgNavigation?.openPage) {
      window.FitnessRpgNavigation.openPage("programs", { noScroll: true, silent: true });
    } else {
      document.querySelector("#openProgramsBtn")?.click();
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      const cards = Array.from(document.querySelectorAll(".program-card"));
      const match = cards.find((card) => normalize(card.querySelector("h3")?.textContent) === normalize(programTitle));

      if (match) {
        window.clearInterval(timer);
        match.click();
        window.setTimeout(() => {
          const page = document.querySelector("#programsToolPage");
          page?.scrollIntoView({ behavior: "smooth", block: "start" });
          document.querySelector(".program-detail-panel")?.classList.add("goal-recommended");
        }, 120);
      }

      if (attempts > 20) window.clearInterval(timer);
    }, 80);
  }

  function patchTodayCard() {
    const card = document.querySelector("#todayDashboardCard");
    if (card && card.dataset.directProgramReady !== "true") {
      card.dataset.directProgramReady = "true";
      card.classList.add("today-direct-program-card");
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("title", "Ouvrir le programme recommandé");
      card.addEventListener("click", (event) => {
        if (event.target.closest("#todayOtherBtn")) return;
        event.preventDefault();
        event.stopPropagation();
        openRecommendedProgram();
      }, true);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openRecommendedProgram();
        }
      });
    }

    const start = document.querySelector("#todayStartBtn");
    if (start && start.dataset.directProgramReady !== "true") {
      start.dataset.directProgramReady = "true";
      start.textContent = "Ouvrir le programme";
      start.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openRecommendedProgram();
      }, true);
    }

    const programBtn = document.querySelector("#todayProgramBtn");
    if (programBtn && programBtn.dataset.directProgramReady !== "true") {
      programBtn.dataset.directProgramReady = "true";
      programBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openRecommendedProgram();
      }, true);
    }
  }

  window.openRecommendedTodayProgram = openRecommendedProgram;

  const observer = new MutationObserver(() => window.requestAnimationFrame(patchTodayCard));
  observer.observe(document.body, { childList: true, subtree: true });

  patchTodayCard();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTodayDirectProgramV45);
} else {
  initTodayDirectProgramV45();
}
