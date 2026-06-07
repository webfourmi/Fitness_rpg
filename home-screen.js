function initHomeScreenPatch() {
  window.FitnessRpgConfig?.setVersionLabels?.();

  const continueButton = document.querySelector("#continueProfileBtn");
  if (continueButton) continueButton.textContent = "Entraînement";
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomeScreenPatch);
} else {
  initHomeScreenPatch();
}
