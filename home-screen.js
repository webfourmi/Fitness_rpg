function initHomeScreenPatch() {
  const version = "0.2.4";
  document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((el) => {
    el.textContent = version;
  });

  const continueButton = document.querySelector("#continueProfileBtn");
  if (continueButton) continueButton.textContent = "Commencez l’entraînement";
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomeScreenPatch);
} else {
  initHomeScreenPatch();
}
