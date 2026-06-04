function initDashboardRedesign() {
  if (window.__dashboardRedesignReady) return;
  window.__dashboardRedesignReady = true;

  document.body.classList.add("dashboard-redesign");

  function moveCoachAndTools() {
    const sportHub = document.querySelector("#sportHub");
    const coachCard = document.querySelector(".coach-panel-card");
    const hubGrid = document.querySelector(".hub-nav-grid");
    const exercisesButton = document.querySelector("#openQuestsBtn");
    const musicButton = document.querySelector("#openMusicBtn");
    const badgesButton = document.querySelector("#openBadgesBtn");
    const weekButton = document.querySelector("#openWeekBtn");
    const logCard = document.querySelector("#logCard");

    if (!sportHub || !coachCard || !hubGrid || !exercisesButton) return;

    let mainRow = document.querySelector("#mainTrainingRow");
    if (!mainRow) {
      mainRow = document.createElement("div");
      mainRow.id = "mainTrainingRow";
      mainRow.className = "main-training-row";
      const intro = sportHub.querySelector("div");
      intro?.insertAdjacentElement("afterend", mainRow);
    }

    if (coachCard.parentElement !== mainRow) mainRow.appendChild(coachCard);
    if (exercisesButton.parentElement !== mainRow) mainRow.appendChild(exercisesButton);

    let toolbar = document.querySelector("#toolIconBar");
    if (!toolbar) {
      toolbar = document.createElement("div");
      toolbar.id = "toolIconBar";
      toolbar.className = "tool-icon-bar";
      mainRow.insertAdjacentElement("afterend", toolbar);
    }

    [musicButton, badgesButton, weekButton].forEach((button) => {
      if (!button) return;
      button.classList.add("tool-icon-btn");
      if (button.parentElement !== toolbar) toolbar.appendChild(button);
    });

    let journalButton = document.querySelector("#openJournalBtn");
    if (!journalButton) {
      journalButton = document.createElement("button");
      journalButton.id = "openJournalBtn";
      journalButton.className = "tool-icon-btn";
      journalButton.type = "button";
      journalButton.innerHTML = `<span>📜</span><strong>Journal</strong><small>Exploits</small>`;
      journalButton.addEventListener("click", () => {
        if (logCard) {
          logCard.classList.remove("hidden");
          logCard.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      toolbar.appendChild(journalButton);
    }

    hubGrid.remove();
  }

  moveCoachAndTools();

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__dashboardRenderPatched) {
    window.__dashboardRenderPatched = true;
    render = function patchedRender() {
      oldRender();
      moveCoachAndTools();
    };
    render();
  }

  document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => {
    el.textContent = "0.3.0";
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDashboardRedesign);
} else {
  initDashboardRedesign();
}
