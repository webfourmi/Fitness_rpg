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
    programsButton.innerHTML = `<span>🗺️</span><strong>Programmes</strong><small>Séances guidées</small>`;

    if (programsButton.parentElement !== row) {
      exerciseButton.insertAdjacentElement("afterend", programsButton);
    }

    const toolbar = document.querySelector("#toolIconBar");
    if (toolbar) {
      toolbar.querySelectorAll(".tool-icon-btn").forEach((button) => {
        if (button.id === "openProgramsBtn") button.remove();
      });
    }

    document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => {
      el.textContent = "0.3.4";
    });
  }

  moveProgramsButton();

  const observer = new MutationObserver(moveProgramsButton);
  observer.observe(document.body, { childList: true, subtree: true });

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
