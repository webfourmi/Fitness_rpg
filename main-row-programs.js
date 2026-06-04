function initMainRowPrograms() {
  if (window.__mainRowProgramsReady) return;
  window.__mainRowProgramsReady = true;

  function moveProgramsButton() {
    const row = document.querySelector("#mainTrainingRow");
    const exerciseButton = document.querySelector("#openQuestsBtn");
    const programsButton = document.querySelector("#openProgramsBtn");

    if (!row || !exerciseButton || !programsButton) return;

    row.classList.add("has-programs-main");
    programsButton.classList.remove("tool-icon-btn");
    programsButton.classList.add("hub-nav-btn", "main-programs-btn");

    const expectedHtml = `<span>🗺️</span><strong>Programmes</strong><small>Séances guidées</small>`;
    if (programsButton.innerHTML !== expectedHtml) {
      programsButton.innerHTML = expectedHtml;
    }

    if (programsButton.parentElement !== row) {
      exerciseButton.insertAdjacentElement("afterend", programsButton);
    }

    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => {
      el.textContent = "0.3.5.3";
    });
  }

  function scheduleMove() {
    window.setTimeout(moveProgramsButton, 0);
    window.setTimeout(moveProgramsButton, 250);
    window.setTimeout(moveProgramsButton, 800);
  }

  scheduleMove();

  const oldRender = typeof render === "function" ? render : null;
  if (oldRender && !window.__mainRowProgramsRenderPatched) {
    window.__mainRowProgramsRenderPatched = true;
    render = function mainRowProgramPatchedRender() {
      oldRender();
      moveProgramsButton();
    };
    render();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMainRowPrograms);
} else {
  initMainRowPrograms();
}
