// ============================================================
// Fitness RPG - app-exercises.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - gérer les exercices libres ;
// - valider temps / répétitions ;
// - gérer les distances km ;
// - gérer un timer simple ;
// - envoyer les XP vers l’état/progression.
//
// Règle importante :
// ce fichier ne contient aucune version.
// Il ne modifie jamais document.title.
// ============================================================

window.FitnessRpgExercises = {
  activeTimer: null,
  remainingSeconds: 0,
  timerExerciseId: null
};

// ============================================================
// Helpers
// ============================================================

window.FitnessRpgExercises.getExercise = function getExercise(exerciseId) {
  return window.FitnessRpgData.getExerciseById(exerciseId);
};

window.FitnessRpgExercises.getExerciseAmountInput = function getExerciseAmountInput(exerciseId) {
  return document.querySelector(`.exercise-amount-input[data-exercise-id="${exerciseId}"]`);
};

window.FitnessRpgExercises.getExerciseDistanceInput = function getExerciseDistanceInput(exerciseId) {
  return document.querySelector(`.exercise-distance-input[data-exercise-id="${exerciseId}"]`);
};

window.FitnessRpgExercises.getAmountValue = function getAmountValue(exerciseId) {
  const input = window.FitnessRpgExercises.getExerciseAmountInput(exerciseId);
  return Number(input?.value || 0);
};

window.FitnessRpgExercises.getDistanceValue = function getDistanceValue(exerciseId) {
  const input = window.FitnessRpgExercises.getExerciseDistanceInput(exerciseId);

  if (!input) return null;

  const value = Number(String(input.value || "0").replace(",", "."));

  if (!Number.isFinite(value) || value <= 0) return null;

  return value;
};

window.FitnessRpgExercises.formatDistance = function formatDistance(distanceKm) {
  const value = Number(distanceKm);

  if (!Number.isFinite(value) || value <= 0) return "";

  return ` · ${value.toLocaleString("fr-FR", {
    maximumFractionDigits: 2
  })} km`;
};

// ============================================================
// Validation d’exercice
// ============================================================

window.FitnessRpgExercises.validateExercise = function validateExercise(exerciseId) {
  const exercise = window.FitnessRpgExercises.getExercise(exerciseId);

  if (!exercise) {
    alert("Exercice introuvable.");
    return;
  }

  if (!window.FitnessRpgState.hasProfile()) {
    alert("Crée d’abord ton héros.");
    window.FitnessRpgNavigation.openHeroSetup();
    return;
  }

  const amount = window.FitnessRpgExercises.getAmountValue(exerciseId);

  if (!Number.isFinite(amount) || amount < exercise.min) {
    alert(`Entre une valeur d’au moins ${exercise.min} ${exercise.unit}.`);
    return;
  }

  const distanceKm = exercise.hasDistance
    ? window.FitnessRpgExercises.getDistanceValue(exerciseId)
    : null;

  const xp = window.FitnessRpgProgress.calculateExerciseXp(exercise, amount);

  const entry = window.FitnessRpgState.addTrainingEntry({
    type: "exercise",
    sportId: exercise.sportId,
    sportTitle: exercise.sportTitle,
    exerciseId: exercise.id,
    title: exercise.title,
    amount,
    unit: exercise.unit,
    distanceKm,
    xp
  });

  if (!entry) return;

  window.FitnessRpgState.setPose(exercise.pose || "victory");

  const coachId = window.FitnessRpgState.getCoachId();
  const message = window.FitnessRpgData.getCoachMessage(coachId, "complete", exercise.id);

  const coachMessage = document.querySelector("#coachMessage");
  if (coachMessage) {
    coachMessage.textContent = `${message} +${xp} XP.`;
  }

  window.FitnessRpgState.addJournalEntry({
    type: "exercise",
    title: exercise.title,
    text: `${exercise.title} validé : ${amount} ${exercise.unit}${window.FitnessRpgExercises.formatDistance(distanceKm)}.`,
    xp
  });

  window.FitnessRpgProgress.checkBadges();
  window.FitnessRpgRender.renderAll();
};

// ============================================================
// Timer
// ============================================================

window.FitnessRpgExercises.amountToSeconds = function amountToSeconds(exercise, amount) {
  const value = Number(amount || 0);

  if (!Number.isFinite(value) || value <= 0) return 0;

  if (exercise.unit === "sec") return Math.round(value);

  if (exercise.unit === "min") return Math.round(value * 60);

  return 0;
};

window.FitnessRpgExercises.formatTime = function formatTime(seconds) {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const rest = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
};

window.FitnessRpgExercises.ensureTimerOverlay = function ensureTimerOverlay() {
  let overlay = document.querySelector("#exerciseTimerOverlay");

  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.id = "exerciseTimerOverlay";
  overlay.className = "timer-overlay hidden";

  overlay.innerHTML = `
    <section class="timer-card card">
      <h2 id="timerExerciseTitle">Timer</h2>
      <p id="timerTimeText">00:00</p>

      <div class="timer-actions">
        <button id="timerStopButton" class="ghost-btn" type="button">Arrêter</button>
        <button id="timerValidateButton" class="primary-btn" type="button">Valider l’exercice</button>
      </div>
    </section>
  `;

  document.body.appendChild(overlay);

  return overlay;
};

window.FitnessRpgExercises.openTimer = function openTimer(exerciseId) {
  const exercise = window.FitnessRpgExercises.getExercise(exerciseId);

  if (!exercise) return;

  const amount = window.FitnessRpgExercises.getAmountValue(exerciseId);
  const seconds = window.FitnessRpgExercises.amountToSeconds(exercise, amount);

  if (seconds <= 0) {
    alert("Cet exercice n’a pas de durée exploitable pour le timer.");
    return;
  }

  window.FitnessRpgExercises.stopTimer();

  const overlay = window.FitnessRpgExercises.ensureTimerOverlay();
  const title = overlay.querySelector("#timerExerciseTitle");
  const timeText = overlay.querySelector("#timerTimeText");
  const stopButton = overlay.querySelector("#timerStopButton");
  const validateButton = overlay.querySelector("#timerValidateButton");

  window.FitnessRpgExercises.timerExerciseId = exerciseId;
  window.FitnessRpgExercises.remainingSeconds = seconds;

  title.textContent = exercise.title;
  timeText.textContent = window.FitnessRpgExercises.formatTime(seconds);

  overlay.classList.remove("hidden");

  stopButton.onclick = () => {
    window.FitnessRpgExercises.stopTimer();
    overlay.classList.add("hidden");
  };

  validateButton.onclick = () => {
    const id = window.FitnessRpgExercises.timerExerciseId;
    window.FitnessRpgExercises.stopTimer();
    overlay.classList.add("hidden");
    window.FitnessRpgExercises.validateExercise(id);
  };

  window.FitnessRpgExercises.activeTimer = window.setInterval(() => {
    window.FitnessRpgExercises.remainingSeconds -= 1;

    timeText.textContent = window.FitnessRpgExercises.formatTime(
      window.FitnessRpgExercises.remainingSeconds
    );

    if (window.FitnessRpgExercises.remainingSeconds <= 0) {
      window.FitnessRpgExercises.stopTimer();
      timeText.textContent = "00:00";
      validateButton.textContent = "Temps terminé · Valider";
    }
  }, 1000);
};

window.FitnessRpgExercises.stopTimer = function stopTimer() {
  if (window.FitnessRpgExercises.activeTimer) {
    window.clearInterval(window.FitnessRpgExercises.activeTimer);
  }

  window.FitnessRpgExercises.activeTimer = null;
};

// ============================================================
// Explication première fois
// ============================================================

window.FitnessRpgExercises.explainExercise = function explainExercise(exerciseId) {
  const exercise = window.FitnessRpgExercises.getExercise(exerciseId);

  if (!exercise) return;

  const key = `fitnessRpgV5Explained_${exerciseId}`;

  if (localStorage.getItem(key) === "true") return;

  localStorage.setItem(key, "true");

  const message = [
    `${exercise.title}`,
    "",
    `Objectif : ${exercise.stat}.`,
    `Valeur conseillée : ${exercise.defaultValue} ${exercise.unit}.`,
    exercise.hasDistance ? "Tu peux aussi noter la distance en kilomètres." : "",
    exercise.hasTimer ? "Tu peux lancer le timer pour suivre le temps." : ""
  ].filter(Boolean).join("\n");

  alert(message);
};

// ============================================================
// Clics
// ============================================================

window.FitnessRpgExercises.handleDocumentClick = function handleDocumentClick(event) {
  const validateButton = event.target.closest(".validate-exercise-btn");

  if (validateButton) {
    const exerciseId = validateButton.dataset.exerciseId;
    window.FitnessRpgExercises.validateExercise(exerciseId);
    return;
  }

  const timerButton = event.target.closest(".start-timer-btn");

  if (timerButton) {
    const exerciseId = timerButton.dataset.exerciseId;
    window.FitnessRpgExercises.explainExercise(exerciseId);
    window.FitnessRpgExercises.openTimer(exerciseId);
    return;
  }

  const exerciseCard = event.target.closest(".exercise-card");

  if (exerciseCard) {
    const button = exerciseCard.querySelector(".validate-exercise-btn, .start-timer-btn");
    const exerciseId = button?.dataset.exerciseId;

    if (exerciseId) {
      window.FitnessRpgExercises.explainExercise(exerciseId);
    }
  }
};

// ============================================================
// Initialisation
// ============================================================

window.FitnessRpgExercises.init = function initExercises() {
  document.addEventListener("click", window.FitnessRpgExercises.handleDocumentClick);
};
