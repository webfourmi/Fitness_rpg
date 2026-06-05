function initExerciseTimer() {
  if (window.__exerciseTimerReady) return;
  window.__exerciseTimerReady = true;

  let totalSeconds = 0;
  let remainingSeconds = 0;
  let timerId = null;
  let isPaused = false;
  let currentAmountText = "";

  function parseDuration(text) {
    const raw = String(text || "").toLowerCase().trim();
    if (!raw) return null;

    const hasTimeUnit = /sec|seconde|secondes|min|minute|minutes/.test(raw);
    if (!hasTimeUnit) return null;

    const multiplierMatch = raw.match(/(\d+)\s*[×x]\s*(\d+(?:[.,]\d+)?)\s*(sec|s|secondes?|min|minutes?)/i);
    if (multiplierMatch) {
      const sets = Number(multiplierMatch[1]);
      const value = Number(multiplierMatch[2].replace(",", "."));
      const unit = multiplierMatch[3];
      const seconds = unit.startsWith("min") ? value * 60 : value;
      return Math.round(sets * seconds);
    }

    const minMatch = raw.match(/(\d+(?:[.,]\d+)?)\s*(min|minute|minutes)/i);
    if (minMatch) return Math.round(Number(minMatch[1].replace(",", ".")) * 60);

    const secMatch = raw.match(/(\d+(?:[.,]\d+)?)\s*(sec|s|seconde|secondes)/i);
    if (secMatch) return Math.round(Number(secMatch[1].replace(",", ".")));

    return null;
  }

  function formatTime(seconds) {
    const safe = Math.max(0, Math.round(seconds || 0));
    const min = Math.floor(safe / 60);
    const sec = safe % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function ensureTimerPanel() {
    let runner = document.querySelector(".session-runner");
    if (!runner) return null;

    let panel = document.querySelector("#exerciseTimerPanel");
    if (panel) return panel;

    panel = document.createElement("section");
    panel.id = "exerciseTimerPanel";
    panel.className = "exercise-timer-panel hidden";
    panel.innerHTML = `
      <div class="exercise-timer-top">
        <span class="exercise-timer-label">Timer exercice</span>
        <strong id="exerciseTimerTime" class="exercise-timer-time">00:00</strong>
      </div>
      <div class="exercise-timer-bar"><div id="exerciseTimerFill" class="exercise-timer-fill"></div></div>
      <p id="exerciseTimerNote" class="exercise-timer-note">Le timer démarre quand tu lances un exercice chronométré.</p>
      <div class="exercise-timer-controls">
        <button id="exerciseTimerPauseBtn" class="ghost-btn" type="button">Pause</button>
        <button id="exerciseTimerResetBtn" class="ghost-btn" type="button">Relancer</button>
      </div>
    `;

    const anchor = runner.querySelector("#sessionCurrentExercise");
    if (anchor) anchor.insertAdjacentElement("afterend", panel);
    else runner.appendChild(panel);

    panel.querySelector("#exerciseTimerPauseBtn")?.addEventListener("click", togglePause);
    panel.querySelector("#exerciseTimerResetBtn")?.addEventListener("click", () => startTimerFromText(currentAmountText));
    return panel;
  }

  function updatePanel() {
    const panel = ensureTimerPanel();
    if (!panel) return;

    const timeNode = panel.querySelector("#exerciseTimerTime");
    const fillNode = panel.querySelector("#exerciseTimerFill");
    const pauseBtn = panel.querySelector("#exerciseTimerPauseBtn");

    if (timeNode) timeNode.textContent = totalSeconds > 0 ? formatTime(remainingSeconds) : "Répétitions";
    if (fillNode) {
      const done = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;
      fillNode.style.width = `${Math.max(0, Math.min(100, done))}%`;
    }
    if (pauseBtn) pauseBtn.textContent = isPaused ? "Reprendre" : "Pause";
  }

  function stopTimer() {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
  }

  function finishTimer() {
    stopTimer();
    remainingSeconds = 0;
    const panel = ensureTimerPanel();
    panel?.classList.add("finished");
    panel?.classList.remove("manual-mode");
    const note = panel?.querySelector("#exerciseTimerNote");
    if (note) note.textContent = "✅ Temps terminé. Tu peux passer à l’exercice suivant.";
    updatePanel();
  }

  function tick() {
    if (isPaused) return;
    remainingSeconds -= 1;
    if (remainingSeconds <= 0) finishTimer();
    else updatePanel();
  }

  function startTimerFromText(amountText) {
    const panel = ensureTimerPanel();
    if (!panel) return;

    currentAmountText = amountText || "";
    const seconds = parseDuration(currentAmountText);
    stopTimer();
    panel.classList.remove("hidden", "finished", "manual-mode");

    const note = panel.querySelector("#exerciseTimerNote");

    if (!seconds || seconds <= 0) {
      totalSeconds = 0;
      remainingSeconds = 0;
      isPaused = true;
      panel.classList.add("manual-mode");
      if (note) note.textContent = `Mode répétitions : ${currentAmountText || "suis l’indication affichée"}. Valide manuellement quand c’est fait.`;
      updatePanel();
      return;
    }

    totalSeconds = seconds;
    remainingSeconds = seconds;
    isPaused = false;
    if (note) note.textContent = `Durée prévue : ${currentAmountText}. Le sablier est lancé.`;
    updatePanel();
    timerId = window.setInterval(tick, 1000);
  }

  function togglePause() {
    if (!totalSeconds) return;
    isPaused = !isPaused;
    const panel = ensureTimerPanel();
    const note = panel?.querySelector("#exerciseTimerNote");
    if (note) note.textContent = isPaused ? "Timer en pause." : "Timer relancé.";
    updatePanel();
  }

  function currentExerciseAmount() {
    return document.querySelector("#sessionCurrentExercise .exercise-amount")?.textContent?.trim() || "";
  }

  function scheduleTimerStart() {
    window.setTimeout(() => {
      const amount = currentExerciseAmount();
      if (amount) startTimerFromText(amount);
    }, 80);
  }

  function handleClick(event) {
    const nextButton = event.target.closest("#sessionStartNextBtn");
    if (!nextButton) return;
    scheduleTimerStart();
  }

  function hideTimerWhenOutsideRunner() {
    if (!document.querySelector(".session-runner")) {
      stopTimer();
      document.querySelector("#exerciseTimerPanel")?.classList.add("hidden");
    }
  }

  document.addEventListener("click", handleClick, true);

  const observer = new MutationObserver(() => hideTimerWhenOutsideRunner());
  observer.observe(document.body, { childList: true, subtree: true });

  window.ExerciseTimer = { startTimerFromText, stopTimer, parseDuration };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initExerciseTimer);
} else {
  initExerciseTimer();
}
