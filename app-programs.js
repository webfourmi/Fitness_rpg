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
  window.FitnessRpgState.setActiveProgramId?.(programId);
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
// choisir les seances en fonction du programme puis de l objectif
// ============================================================

window.FitnessRpgPrograms.getProgramWeeklySlots = function getProgramWeeklySlots(programId) {
  const program = window.FitnessRpgPrograms.getProgram(programId);

  if (Array.isArray(program?.weeklySlots)) return program.weeklySlots;

  const frequency = String(program?.frequency || "").toLowerCase();

  if (frequency.includes("1 fois")) return [5];          // samedi
  if (frequency.includes("2")) return [1, 4];             // mardi, vendredi
  if (frequency.includes("4") || frequency.includes("6")) return [0, 1, 3, 5]; // lun, mar, jeu, sam

  return [0, 2, 4]; // défaut : lundi, mercredi, vendredi
};

window.FitnessRpgPrograms.isActiveProgramDay = function isActiveProgramDay(programId) {
  if (!programId) return false;

  const todayIndex = window.FitnessRpgPrograms.getTodayPlanIndex();
  const slots = window.FitnessRpgPrograms.getProgramWeeklySlots(programId);

  return slots.includes(todayIndex);
};

window.FitnessRpgPrograms.getCompletedProgramDays = function getCompletedProgramDays(programId) {
  const entries = window.FitnessRpgState.getAllEntries?.() || [];

  return new Set(
    entries
      .filter((entry) => entry.type === "program" && entry.programId === programId)
      .map((entry) => {
        if (entry.dayNumber) return Number(entry.dayNumber);

        const match = String(entry.title || "").match(/Jour\s+(\d+)/i);
        return match ? Number(match[1]) : null;
      })
      .filter((dayNumber) => Number.isFinite(dayNumber))
  );
};

window.FitnessRpgPrograms.getNextProgramSession = function getNextProgramSession(programId) {
  const detail = window.FitnessRpgData.getProgramDetail(programId);
  if (!detail || !Array.isArray(detail.days)) return null;

  const completedDays = window.FitnessRpgPrograms.getCompletedProgramDays(programId);

  const nextDay = detail.days.find((day) => {
    return !completedDays.has(Number(day.day));
  });

  if (!nextDay) return null;

  const program = window.FitnessRpgConfig.getProgramById(programId);

  return {
    type: "program",
    source: "active-program",
    programId,
    program,
    day: nextDay,
    title: program?.title || "Programme",
    subtitle: `Jour ${nextDay.day} · ${nextDay.title}`,
    description: program
      ? `${program.objective} · ${program.duration}`
      : "Séance du programme choisi."
  };
};

window.FitnessRpgPrograms.getNextGoalSession = function getNextGoalSession() {
  const goalId = window.FitnessRpgState.getGoalId?.() || "reprise-douce";
  const goal = window.FitnessRpgConfig.getGoalById?.(goalId);
  const activeProgramId = window.FitnessRpgState.getActiveProgramId?.();

  const progression = goal?.programProgression || [];

  const fallbackProgression = [
    "eveil-heros",
    "marche-aventurier",
    "coeur-dragon"
  ];

  const programIds = progression.length ? progression : fallbackProgression;

  const objectiveOnlyIds = programIds.filter((programId) => programId !== activeProgramId);

  for (const programId of objectiveOnlyIds) {
    const session = window.FitnessRpgPrograms.getNextProgramSession(programId);

    if (session) {
      return {
        ...session,
        source: "goal",
        goalId,
        goal
      };
    }
  }

  for (const programId of programIds) {
    const session = window.FitnessRpgPrograms.getNextProgramSession(programId);

    if (session) {
      return {
        ...session,
        source: "goal",
        goalId,
        goal
      };
    }
  }

  return window.FitnessRpgPrograms.getNextProgramSession("eveil-heros");
};

window.FitnessRpgPrograms.getTodayQuest = function getTodayQuest() {
  const activeProgramId = window.FitnessRpgState.getActiveProgramId?.();

  if (
    activeProgramId &&
    window.FitnessRpgPrograms.isActiveProgramDay(activeProgramId)
  ) {
    const activeSession = window.FitnessRpgPrograms.getNextProgramSession(activeProgramId);

    if (activeSession) {
      return {
        ...activeSession,
        source: "active-program"
      };
    }
  }

  return window.FitnessRpgPrograms.getNextGoalSession();
};


// ============================================================
// Planning hebdomadaire interactif
// ============================================================

window.FitnessRpgPrograms.getWeeklyPlan = function getWeeklyPlan(goalId) {
  const plans = {
    "perte-poids": [
      ["Lun", "Marche douce", "marche-aventurier"],
      ["Mar", "Éveil du héros", "eveil-heros"],
      ["Mer", "Marche active", "marche-aventurier"],
      ["Jeu", "Tour de mage", "tour-mage"],
      ["Ven", "Marche ou vélo léger", "marche-aventurier"],
      ["Sam", "Cœur de dragon", "coeur-dragon"],
      ["Dim", "Repos actif", "tour-mage"]
    ],
    "reprise-douce": [
      ["Lun", "Éveil du héros", "eveil-heros"],
      ["Mar", "Repos ou marche douce", "marche-aventurier"],
      ["Mer", "Éveil du héros", "eveil-heros"],
      ["Jeu", "Tour de mage", "tour-mage"],
      ["Ven", "Repos", null],
      ["Sam", "Éveil du héros", "eveil-heros"],
      ["Dim", "Marche tranquille", "marche-aventurier"]
    ],
    "cardio": [
      ["Lun", "Cavalier de la route", "cavalier-route"],
      ["Mar", "Tour de mage", "tour-mage"],
      ["Mer", "Vélo ou cardio", "cavalier-route"],
      ["Jeu", "Repos actif", "marche-aventurier"],
      ["Ven", "Cœur de dragon", "coeur-dragon"],
      ["Sam", "Marche longue", "marche-aventurier"],
      ["Dim", "Repos", null]
    ],
    "renforcement": [
      ["Lun", "Forge du guerrier", "forge-guerrier"],
      ["Mar", "Rempart du héros", "rempart-heros"],
      ["Mer", "Bras du héros", "bras-heros"],
      ["Jeu", "Marche douce", "marche-aventurier"],
      ["Ven", "Forge du guerrier", "forge-guerrier"],
      ["Sam", "Défi boss hebdo", "boss-hebdo"],
      ["Dim", "Repos", null]
    ],
    "regularite": [
      ["Lun", "Marche de l’aventurier", "marche-aventurier"],
      ["Mar", "Éveil du héros", "eveil-heros"],
      ["Mer", "Marche courte", "marche-aventurier"],
      ["Jeu", "Tour de mage", "tour-mage"],
      ["Ven", "Marche de l’aventurier", "marche-aventurier"],
      ["Sam", "Programme libre", "eveil-heros"],
      ["Dim", "Repos actif", "tour-mage"]
    ],
    "mobilite": [
      ["Lun", "Tour de mage", "tour-mage"],
      ["Mar", "Marche douce", "marche-aventurier"],
      ["Mer", "Rempart du héros", "rempart-heros"],
      ["Jeu", "Repos", null],
      ["Ven", "Tour de mage", "tour-mage"],
      ["Sam", "Éveil du héros", "eveil-heros"],
      ["Dim", "Respiration et étirements", "tour-mage"]
    ]
  };

  return plans[goalId] || plans["reprise-douce"];
};

window.FitnessRpgPrograms.getTodayPlanIndex = function getTodayPlanIndex() {
  const day = new Date().getDay();

  // JS : dimanche = 0. Planning : lundi = 0.
  return day === 0 ? 6 : day - 1;
};

window.FitnessRpgPrograms.getTodayPlanItem = function getTodayPlanItem() {
  const goalId = window.FitnessRpgState.getGoalId?.() || "reprise-douce";
  const plan = window.FitnessRpgPrograms.getCombinedWeeklyPlan(goalId);
  const index = window.FitnessRpgPrograms.getTodayPlanIndex();

  const item = plan[index] || plan[0];

  return {
    index,
    dayLabel: item[0],
    title: item[1],
    programId: item[2],
    plan
  };
};

window.FitnessRpgPrograms.getSuggestedDayNumberForPlanItem = function getSuggestedDayNumberForPlanItem(planItem) {
  if (!planItem?.programId) return 1;

  const detail = window.FitnessRpgPrograms.getProgramDetail(planItem.programId);

  if (!detail?.days?.length) return 1;

  const occurrence = planItem.plan
    .slice(0, planItem.index + 1)
    .filter((item) => item[2] === planItem.programId)
    .length;

  const day = detail.days[(Math.max(1, occurrence) - 1) % detail.days.length];

  return day?.day || 1;
};

window.FitnessRpgPrograms.startTodayPlanningSession = function startTodayPlanningSession() {
  const item = window.FitnessRpgPrograms.getTodayPlanItem();

  if (!item.programId) {
    alert("Aujourd’hui, le planning conseille du repos ou une récupération douce.");
    return;
  }

  const dayNumber = window.FitnessRpgPrograms.getSuggestedDayNumberForPlanItem(item);

  window.FitnessRpgNavigation.openPrograms(item.programId);

  window.setTimeout(() => {
    window.FitnessRpgPrograms.validateProgramDay(item.programId, dayNumber);
  }, 120);
};

// ============================================================
// Quête du jour
// ============================================================

window.FitnessRpgPrograms.openTodayProgram = function openTodayProgram() {
  const quest = window.FitnessRpgPrograms.getTodayQuest?.();

  if (!quest?.programId) {
    window.FitnessRpgNavigation.openPrograms("eveil-heros");
    return;
  }

  window.FitnessRpgNavigation.openPrograms(quest.programId);

  window.setTimeout(() => {
    if (quest.day?.day) {
      window.FitnessRpgPrograms.validateProgramDay(quest.programId, quest.day.day);
    }
  }, 120);
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
    dayNumber: session.dayNumber,
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
  window.FitnessRpgProgress.checkWeeklyPlanningBonus?.();
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

window.FitnessRpgPrograms.chooseProgram = function chooseProgram(programId) {
  const program = window.FitnessRpgConfig.getProgramById(programId);

  if (!program) {
    alert("Programme introuvable.");
    return;
  }

  if (!window.FitnessRpgState.hasProfile?.()) {
    alert("Crée d’abord ton héros.");
    window.FitnessRpgNavigation.openHeroSetup?.();
    return;
  }

  window.FitnessRpgState.setActiveProgramId(programId);
  window.FitnessRpgRender.renderProgramList?.();
};

window.FitnessRpgPrograms.goToPlanning = function goToPlanning() {
  window.FitnessRpgState.setPage("planning");
  window.FitnessRpgRender.renderAll();

  window.setTimeout(() => {
    document.querySelector("#pagePlanning")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 80);
};

window.FitnessRpgPrograms.chooseProgram = function chooseProgram(programId) {
  const program = window.FitnessRpgConfig.getProgramById(programId);

  if (!program) {
    alert("Programme introuvable.");
    return;
  }

  if (!window.FitnessRpgState.hasProfile?.()) {
    alert("Crée d’abord ton héros.");
    window.FitnessRpgNavigation.openHeroSetup?.();
    return;
  }

  window.FitnessRpgState.setActiveProgramId(programId);

  const coachMessage = document.querySelector("#coachMessage");
  if (coachMessage) {
    coachMessage.textContent = `Programme actuel : ${program.title}. Le planning est recalculé.`;
  }

  window.FitnessRpgRender.renderAll?.();
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

 const todayPlanningButton = event.target.closest("#startTodayPlanningButton");

  if (todayPlanningButton) {
    event.preventDefault();
    window.FitnessRpgPrograms.startTodayPlanningSession();
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

  const chooseProgramButton = event.target.closest(".choose-program-btn");

  if (chooseProgramButton) {
    event.preventDefault();
  
    const programId = chooseProgramButton.dataset.programId;
    window.FitnessRpgPrograms.chooseProgram(programId);
    return;
  }
  
  const startProgramPlanningButton = event.target.closest("#startProgramPlanningButton");
  
  if (startProgramPlanningButton) {
    event.preventDefault();
    window.FitnessRpgPrograms.goToPlanning();
    return;
  }

  const chooseProgramButton = event.target.closest(".choose-program-btn");

if (chooseProgramButton) {
  event.preventDefault();
  event.stopPropagation();

  const programId = chooseProgramButton.dataset.programId;
  window.FitnessRpgPrograms.chooseProgram(programId);
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
