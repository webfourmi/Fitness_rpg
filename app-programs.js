// ============================================================
// Fitness RPG - app-programs.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - gérer les programmes complets ;
// - valider une séance de programme ;
// - gérer la quête du jour ;
// - ouvrir le programme recommandé ;
// - envoyer les XP vers l’état/progression.
//
// Règle importante :
// ce fichier ne contient aucune version.
// Il ne modifie jamais document.title.
// ============================================================

window.FitnessRpgPrograms = {};

// ============================================================
// Helpers programmes
// ============================================================

window.FitnessRpgPrograms.getProgram = function getProgram(programId) {
  return window.FitnessRpgConfig.getProgramById?.(programId) || null;
};

window.FitnessRpgPrograms.getProgramDetail = function getProgramDetail(programId) {
  return window.FitnessRpgData.getProgramDetail?.(programId) || null;
};

window.FitnessRpgPrograms.getProgramDay = function getProgramDay(programId, dayNumber) {
  const detail = window.FitnessRpgPrograms.getProgramDetail(programId);

  if (!detail || !Array.isArray(detail.days)) return null;

  return detail.days.find((day) => Number(day.day) === Number(dayNumber)) || null;
};

window.FitnessRpgPrograms.getRecommendedProgram = function getRecommendedProgram() {
  return window.FitnessRpgState.getRecommendedProgram?.()
    || window.FitnessRpgConfig.getProgramById?.("eveil-heros");
};

window.FitnessRpgPrograms.getRecommendedProgramId = function getRecommendedProgramId() {
  return window.FitnessRpgPrograms.getRecommendedProgram()?.id || "eveil-heros";
};

// ============================================================
// Calcul XP programme
// ============================================================

window.FitnessRpgPrograms.calculateProgramDayXp = function calculateProgramDayXp(programId, dayNumber) {
  const program = window.FitnessRpgPrograms.getProgram(programId);
  const day = window.FitnessRpgPrograms.getProgramDay(programId, dayNumber);

  if (!program || !day) return 10;

  const baseXp = Number(program.xp || 10);

  // Une séance plus longue peut légèrement mieux récompenser.
  const exerciseCount = Array.isArray(day.exercises) ? day.exercises.length : 1;
  const bonus = Math.max(0, exerciseCount - 3) * 2;

  return Math.max(5, Math.round(baseXp + bonus));
};

window.FitnessRpgPrograms.describeProgramDay = function describeProgramDay(programId, dayNumber) {
  const program = window.FitnessRpgPrograms.getProgram(programId);
  const day = window.FitnessRpgPrograms.getProgramDay(programId, dayNumber);

  if (!program || !day) return "Séance de programme";

  return `${program.title} · Jour ${day.day} · ${day.title}`;
};

window.FitnessRpgPrograms.formatDayExercises = function formatDayExercises(day) {
  if (!day || !Array.isArray(day.exercises)) return "";

  return day.exercises.map((item) => {
    const exercise = window.FitnessRpgData.getExerciseById(item.exerciseId);

    return `${item.phase} : ${exercise?.title || item.exerciseId} (${item.amount} ${item.unit})`;
  }).join(" · ");
};

// ============================================================
// Validation d’une séance de programme
// ============================================================
window.FitnessRpgPrograms.validateProgramDay = function validateProgramDay(programId, dayNumber) {
  if (!window.FitnessRpgState.hasProfile()) {
    alert("Crée d’abord ton héros.");
    window.FitnessRpgNavigation.openHeroSetup();
    return;
  }

  const program = window.FitnessRpgPrograms.getProgram(programId);
  const day = window.FitnessRpgPrograms.getProgramDay(programId, dayNumber);

  if (!program || !day) {
    alert("Programme ou séance introuvable.");
    return;
  }

  window.FitnessRpgState.startProgramSession(programId, dayNumber);
  window.FitnessRpgRender.renderProgramDetail(programId);

  window.setTimeout(() => {
    document.querySelector("#activeProgramSession")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 80);
};


// ============================================================
// Quête du jour
// ============================================================

window.FitnessRpgPrograms.openTodayProgram = function openTodayProgram() {
  const programId = window.FitnessRpgPrograms.getRecommendedProgramId();

  window.FitnessRpgNavigation.openPrograms(programId);
};

window.FitnessRpgPrograms.validateTodayRecommendedProgram = function validateTodayRecommendedProgram() {
  const programId = window.FitnessRpgPrograms.getRecommendedProgramId();
  const detail = window.FitnessRpgPrograms.getProgramDetail(programId);

  if (!detail || !Array.isArray(detail.days) || !detail.days.length) {
    window.FitnessRpgNavigation.openPrograms(programId);
    return;
  }

  const firstDay = detail.days[0];

  window.FitnessRpgPrograms.validateProgramDay(programId, firstDay.day);
};

// ============================================================
// Marquage visuel
// ============================================================

window.FitnessRpgPrograms.markCompletedProgramDays = function markCompletedProgramDays() {
  const profile = window.FitnessRpgState.getProfile?.();
  if (!profile) return;

  const entries = window.FitnessRpgState.getAllEntries?.() || [];

  document.querySelectorAll(".start-program-day-btn").forEach((button) => {
    const programId = button.dataset.programId;
    const day = Number(button.dataset.day);

    const done = entries.some((entry) => {
      return entry.type === "program"
        && entry.programId === programId
        && String(entry.title || "").includes(`Jour ${day}`);
    });

    button.classList.toggle("validated", done);
    button.textContent = done ? "Séance déjà validée" : "Valider cette séance";
  });
};
// ============================================================
// Validation exercice par exercice
// ============================================================

window.FitnessRpgPrograms.validateProgramExercise = function validateProgramExercise(exerciseId) {
  const session = window.FitnessRpgState.getActiveProgramSession?.();

  if (!session) return;

  window.FitnessRpgState.completeProgramSessionExercise(exerciseId);

  const exercise = window.FitnessRpgData.getExerciseById(exerciseId);
  const coachId = window.FitnessRpgState.getCoachId();

  const coachMessage = document.querySelector("#coachMessage");

  if (coachMessage && exercise) {
    const message = window.FitnessRpgData.getCoachMessage(coachId, "complete", exercise.id);
    coachMessage.textContent = message;
  }

  window.FitnessRpgRender.renderProgramDetail(session.programId);
};

window.FitnessRpgPrograms.finishProgramSession = function finishProgramSession() {
  const session = window.FitnessRpgState.getActiveProgramSession?.();

  if (!session) return;

  if (!window.FitnessRpgState.isProgramSessionComplete()) {
    alert("Valide tous les exercices avant de terminer la séance.");
    return;
  }

  const program = window.FitnessRpgPrograms.getProgram(session.programId);
  const day = window.FitnessRpgPrograms.getProgramDay(session.programId, session.dayNumber);
  const xp = window.FitnessRpgProgress.calculateProgramSessionXp(session.programId, session.dayNumber);
  const difficulty = window.FitnessRpgProgress.getProgramDayDifficulty(day);
  const title = `${program.title} · Jour ${day.day} · ${day.title}`;

  window.FitnessRpgState.addTrainingEntry({
    type: "program",
    sportId: "program",
    sportTitle: "Programme",
    programId: program.id,
    programTitle: program.title,
    title,
    amount: 1,
    unit: "séance",
    xp
  });

  window.FitnessRpgState.addJournalEntry({
    type: "program",
    title,
    text: `${difficulty.label} terminée : ${day.exercises.length} exercices validés.`,
    xp
  });

  window.FitnessRpgState.setPose("victory");
  window.FitnessRpgState.clearActiveProgramSession();

  const coachId = window.FitnessRpgState.getCoachId();
  const coachMessage = document.querySelector("#coachMessage");

  if (coachMessage) {
    const message = window.FitnessRpgData.getCoachMessage(coachId, "complete");
    coachMessage.textContent = `${message} +${xp} XP.`;
  }

  window.FitnessRpgProgress.checkBadges();
  window.FitnessRpgRender.renderAll();

  window.setTimeout(() => {
    window.FitnessRpgRender.renderProgramDetail(program.id);
    document.querySelector("#programDetail")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 80);
};

// ============================================================
// Timer pour les exercices de programme
// ============================================================

window.FitnessRpgPrograms.getActiveProgramItem = function getActiveProgramItem(exerciseId) {
  const session = window.FitnessRpgState.getActiveProgramSession?.();

  if (!session) return null;

  const day = window.FitnessRpgPrograms.getProgramDay(session.programId, session.dayNumber);

  if (!day || !Array.isArray(day.exercises)) return null;

  return day.exercises.find((item) => item.exerciseId === exerciseId) || null;
};

window.FitnessRpgPrograms.programItemToSeconds = function programItemToSeconds(item) {
  if (!item) return 0;

  const amount = Number(item.amount || 0);

  if (!Number.isFinite(amount) || amount <= 0) return 0;

  if (item.unit === "sec") return Math.round(amount);
  if (item.unit === "min") return Math.round(amount * 60);

  return 0;
};

window.FitnessRpgPrograms.openProgramExerciseTimer = function openProgramExerciseTimer(exerciseId) {
  const item = window.FitnessRpgPrograms.getActiveProgramItem(exerciseId);
  const exercise = window.FitnessRpgData.getExerciseById(exerciseId);

  if (!item || !exercise) {
    alert("Exercice introuvable dans la séance.");
    return;
  }

  const seconds = window.FitnessRpgPrograms.programItemToSeconds(item);

  if (seconds <= 0) {
    alert("Cet exercice n’a pas de durée à minuter.");
    return;
  }

  window.FitnessRpgExercises.stopTimer?.();

  const overlay = window.FitnessRpgExercises.ensureTimerOverlay();
  const title = overlay.querySelector("#timerExerciseTitle");
  const timeText = overlay.querySelector("#timerTimeText");
  const stopButton = overlay.querySelector("#timerStopButton");
  const validateButton = overlay.querySelector("#timerValidateButton");

  window.FitnessRpgExercises.timerExerciseId = exerciseId;
  window.FitnessRpgExercises.remainingSeconds = seconds;

  title.textContent = `${exercise.title} · ${item.amount} ${item.unit}`;
  timeText.textContent = window.FitnessRpgExercises.formatTime(seconds);
  validateButton.textContent = "Valider l’exercice";

  overlay.classList.remove("hidden");

  stopButton.onclick = () => {
    window.FitnessRpgExercises.stopTimer();
    overlay.classList.add("hidden");
  };

  validateButton.onclick = () => {
    const id = window.FitnessRpgExercises.timerExerciseId;
    window.FitnessRpgExercises.stopTimer();
    overlay.classList.add("hidden");
    window.FitnessRpgPrograms.validateProgramExercise(id);
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
      window.FitnessRpgMedia?.playTimerEndSound?.();
    }
  }, 1000);
};
// ============================================================
// Clics
// ============================================================

window.FitnessRpgPrograms.handleDocumentClick = function handleDocumentClick(event) {
  const programTimerButton = event.target.closest(".start-program-exercise-timer-btn");

  if (programTimerButton) {
    event.preventDefault();
  
    const exerciseId = programTimerButton.dataset.exerciseId;
    window.FitnessRpgPrograms.openProgramExerciseTimer(exerciseId);
    return;
  }
  
  const programExerciseButton = event.target.closest(".validate-program-exercise-btn");
  
  if (programExerciseButton) {
    event.preventDefault();
  
    const exerciseId = programExerciseButton.dataset.exerciseId;
    window.FitnessRpgPrograms.validateProgramExercise(exerciseId);
    return;
  }
  
  const finishButton = event.target.closest("#finishProgramSessionButton");
  
  if (finishButton) {
    event.preventDefault();
    window.FitnessRpgPrograms.finishProgramSession();
    return;
  }
  
  const dayButton = event.target.closest(".start-program-day-btn");

  if (dayButton) {
    event.preventDefault();

    const programId = dayButton.dataset.programId;
    const dayNumber = dayButton.dataset.day;

    window.FitnessRpgPrograms.validateProgramDay(programId, dayNumber);
    return;
  }

  const todayButton = event.target.closest("#openTodayProgramButton");

  if (todayButton) {
    event.preventDefault();
    window.FitnessRpgPrograms.openTodayProgram();
  }
};

// ============================================================
// Après rendu
// ============================================================

window.FitnessRpgPrograms.afterRender = function afterRender() {
  window.FitnessRpgPrograms.markCompletedProgramDays();
};

// ============================================================
// Initialisation
// ============================================================

window.FitnessRpgPrograms.init = function initPrograms() {
  document.addEventListener("click", window.FitnessRpgPrograms.handleDocumentClick);
};
