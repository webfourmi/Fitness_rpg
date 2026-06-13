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

window.FitnessRpgPrograms.getProgramWeeks = function getProgramWeeks(programId) {
  const detail = window.FitnessRpgPrograms.getProgramDetail(programId);

  if (!detail) return [];

  if (Array.isArray(detail.weeks) && detail.weeks.length) {
    return detail.weeks.map((week, index) => ({
      week: Number(week.week || week.weekNumber || index + 1),
      title: week.title || `Semaine ${index + 1}`,
      days: Array.isArray(week.days) ? week.days : (Array.isArray(detail.days) ? detail.days : []),
      progression: week.progression || week.note || ""
    }));
  }

  const baseDays = Array.isArray(detail.days) ? detail.days : [];

  const weekLines = Array.isArray(detail.progression)
    ? detail.progression.filter((line) => /^\s*Semaine\s+\d+/i.test(String(line || "")))
    : [];

  const weekCount = Math.max(1, weekLines.length || Number(detail.weekCount || 0) || 1);

  return Array.from({ length: weekCount }, (_, index) => ({
    week: index + 1,
    title: `Semaine ${index + 1}`,
    days: baseDays,
    progression: weekLines[index] || ""
  }));
};

window.FitnessRpgPrograms.getProgramWeek = function getProgramWeek(programId, weekNumber = 1) {
  const weeks = window.FitnessRpgPrograms.getProgramWeeks(programId);
  const safeWeekNumber = Math.max(1, Number(weekNumber) || 1);

  return weeks.find((week) => Number(week.week) === safeWeekNumber) || weeks[0] || null;
};

window.FitnessRpgPrograms.getProgramDaysForWeek = function getProgramDaysForWeek(programId, weekNumber = 1) {
  const week = window.FitnessRpgPrograms.getProgramWeek(programId, weekNumber);

  if (week && Array.isArray(week.days) && week.days.length) return week.days;

  const detail = window.FitnessRpgPrograms.getProgramDetail(programId);
  return Array.isArray(detail?.days) ? detail.days : [];
};

window.FitnessRpgPrograms.getProgramDay = function getProgramDay(programId, dayNumber, weekNumber = 1) {
  const days = window.FitnessRpgPrograms.getProgramDaysForWeek(programId, weekNumber);

  if (!Array.isArray(days) || !days.length) return null;

  return days.find((day) => Number(day.day) === Number(dayNumber)) || null;
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
  return window.FitnessRpgPrograms.getTodayPlanningQuest();
};

  return window.FitnessRpgPrograms.getNextGoalSession();
};


// ============================================================
// Planning hebdomadaire interactif
// ============================================================
window.FitnessRpgPrograms.getTodayPlanIndex = function getTodayPlanIndex() {
  const day = new Date().getDay();

  // JavaScript : dimanche = 0.
  // Notre planning : lundi = 0, mardi = 1, ..., dimanche = 6.
  return day === 0 ? 6 : day - 1;
};

window.FitnessRpgPrograms.getTodayPlanningQuest = function getTodayPlanningQuest() {
  const goalId = window.FitnessRpgState.getGoalId?.() || "reprise-douce";

  const plan = window.FitnessRpgPrograms.getCombinedWeeklyPlan
    ? window.FitnessRpgPrograms.getCombinedWeeklyPlan(goalId)
    : window.FitnessRpgPrograms.getWeeklyPlan(goalId);

  const todayIndex = window.FitnessRpgPrograms.getTodayPlanIndex();
  const raw = plan[todayIndex] || plan[0];

  const dayLabel = raw?.[0] || "Jour";
  const title = raw?.[1] || "Séance";
  const programId = raw?.[2] || null;
  const source = raw?.[3] || "goal";

  const program = programId
    ? window.FitnessRpgConfig.getProgramById(programId)
    : null;

  const item = {
    index: todayIndex,
    dayLabel,
    title,
    programId,
    source,
    plan
  };

  if (source === "boss-locked") {
    const missing = window.FitnessRpgPrograms.getMissingMainSessionsThisWeek?.() || [];
    const firstMissing = missing[0] || null;

    return {
      ...item,
      type: "boss-locked",
      program: null,
      day: null,
      weekNumber: 1,
      dayNumber: 1,
      title: "Boss verrouillé",
      subtitle: "Défi du samedi non débloqué",
      description: firstMissing
        ? `Rattrape : ${firstMissing.dayLabel} · ${firstMissing.title}`
        : "Valide les 5 séances principales pour débloquer le boss."
    };
  }

  if (!programId || !program) {
    return {
      ...item,
      type: "rest",
      program: null,
      day: null,
      weekNumber: 1,
      dayNumber: 1,
      title: title || "Repos",
      subtitle: dayLabel,
      description: "Repos ou récupération douce."
    };
  }

  const weekNumber = window.FitnessRpgPrograms.getSuggestedWeekNumberForPlanItem
    ? window.FitnessRpgPrograms.getSuggestedWeekNumberForPlanItem(item)
    : 1;

  const dayNumber = window.FitnessRpgPrograms.getSuggestedDayNumberForPlanItem
    ? window.FitnessRpgPrograms.getSuggestedDayNumberForPlanItem(item)
    : (
        window.FitnessRpgPrograms.getNextProgramSession?.(programId)?.day?.day || 1
      );

  const day = window.FitnessRpgPrograms.getProgramDay(
    programId,
    dayNumber,
    weekNumber
  );

  return {
    ...item,
    type: "program",
    program,
    day,
    weekNumber,
    dayNumber,
    title: program.title,
    subtitle: `Aujourd’hui · ${dayLabel} · Semaine ${weekNumber} · Jour ${dayNumber}`,
    description: day
      ? `${day.title} · ${day.difficultyLabel || program.duration}`
      : `${program.objective} · ${program.duration}`
  };
};

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

window.FitnessRpgPrograms.getCompletedMainSessionsThisWeek = function getCompletedMainSessionsThisWeek() {
  const weekKeys = window.FitnessRpgState.getWeekKeys?.() || [];

  // On compte seulement lundi à vendredi.
  const mainWeekKeys = weekKeys.slice(0, 5);

  return mainWeekKeys.filter((dateKey) => {
    return window.FitnessRpgState.getEntriesForDate(dateKey).some((entry) => {
      return entry.type === "program";
    });
  }).length;
};

window.FitnessRpgPrograms.getObjectiveProgramIds = function getObjectiveProgramIds(goalId) {
  const goal = window.FitnessRpgConfig.getGoalById?.(goalId);

  if (Array.isArray(goal?.programProgression) && goal.programProgression.length) {
    return goal.programProgression;
  }

  if (goal?.recommendedProgramId) {
    return [goal.recommendedProgramId];
  }

  return ["eveil-heros", "marche-aventurier"];
};

window.FitnessRpgPrograms.getObjectiveProgramForSlot = function getObjectiveProgramForSlot(goalId, slotIndex) {
  const activeProgramId = window.FitnessRpgState.getActiveProgramId?.();
  const ids = window.FitnessRpgPrograms
    .getObjectiveProgramIds(goalId)
    .filter((programId) => programId && programId !== activeProgramId);

  const safeIds = ids.length ? ids : window.FitnessRpgPrograms.getObjectiveProgramIds(goalId);

  return safeIds[slotIndex % safeIds.length] || "eveil-heros";
};


window.FitnessRpgPrograms.getCombinedWeeklyPlan = function getCombinedWeeklyPlan(goalId) {
  const activeProgramId =
    window.FitnessRpgState.getActiveProgramId?.()
    || window.FitnessRpgConfig.getGoalById?.(goalId)?.recommendedProgramId
    || "eveil-heros";

  const activeProgram = window.FitnessRpgConfig.getProgramById(activeProgramId);

  const objectiveProgram1Id = window.FitnessRpgPrograms.getObjectiveProgramForSlot(goalId, 0);
  const objectiveProgram2Id = window.FitnessRpgPrograms.getObjectiveProgramForSlot(goalId, 1);

  const objectiveProgram1 = window.FitnessRpgConfig.getProgramById(objectiveProgram1Id);
  const objectiveProgram2 = window.FitnessRpgConfig.getProgramById(objectiveProgram2Id);

  const completedMainSessions = window.FitnessRpgPrograms.getCompletedMainSessionsThisWeek();
  const bossUnlocked = completedMainSessions >= 5;

  return [
    [
      "Lun",
      activeProgram?.title || "Programme choisi",
      activeProgramId,
      "active-program"
    ],
    [
      "Mar",
      objectiveProgram1?.title || "Séance objectif",
      objectiveProgram1Id,
      "goal"
    ],
    [
      "Mer",
      activeProgram?.title || "Programme choisi",
      activeProgramId,
      "active-program"
    ],
    [
      "Jeu",
      objectiveProgram2?.title || "Séance objectif",
      objectiveProgram2Id,
      "goal"
    ],
    [
      "Ven",
      activeProgram?.title || "Programme choisi",
      activeProgramId,
      "active-program"
    ],
    bossUnlocked
      ? [
          "Sam",
          "Défi boss hebdo",
          "boss-hebdo",
          "boss"
        ]
      : [
          "Sam",
          `Boss verrouillé · ${completedMainSessions}/5 séances`,
          null,
          "boss-locked"
        ],
    [
      "Dim",
      "Repos",
      null,
      "rest"
    ]
  ];
};

window.FitnessRpgPrograms.getSuggestedDayNumberForPlanItem = function getSuggestedDayNumberForPlanItem(item) {
  if (!item?.programId) return 1;
  return window.FitnessRpgPrograms.getSuggestedProgramPosition(item.programId).dayNumber;
};

window.FitnessRpgPrograms.getSuggestedWeekNumberForPlanItem = function getSuggestedWeekNumberForPlanItem(item) {
  if (!item?.programId) return 1;
  return window.FitnessRpgPrograms.getSuggestedProgramPosition(item.programId).weekNumber;
};
window.FitnessRpgPrograms.getTodayPlanningItem = function getTodayPlanningItem() {
  const goalId = window.FitnessRpgState.getGoalId?.() || "reprise-douce";

  const plan = window.FitnessRpgPrograms.getCombinedWeeklyPlan
    ? window.FitnessRpgPrograms.getCombinedWeeklyPlan(goalId)
    : window.FitnessRpgPrograms.getWeeklyPlan(goalId);

  const todayIndex = window.FitnessRpgPrograms.getTodayPlanIndex();
  const item = plan[todayIndex] || plan[0];

  return {
    index: todayIndex,
    dayLabel: item?.[0] || "Lun",
    title: item?.[1] || "Séance",
    programId: item?.[2] || null,
    source: item?.[3] || "goal",
    plan
  };
};

window.FitnessRpgPrograms.startTodayPlanningSession = function startTodayPlanningSession() {
  if (!window.FitnessRpgState.hasProfile?.()) {
    alert("Crée d’abord ton héros.");
    window.FitnessRpgNavigation.openHeroSetup?.();
    return;
  }

  const item = window.FitnessRpgPrograms.getTodayPlanningItem();

  if (item.source === "boss-locked") {
    window.FitnessRpgPrograms.startWeeklyCatchupSession();
    return;
  }

  if (!item.programId) {
    alert("Aujourd’hui, c’est repos. Ton héros a aussi droit à sa taverne.");
    return;
  }

  const weekNumber = window.FitnessRpgPrograms.getSuggestedWeekNumberForPlanItem(item);
  const dayNumber = window.FitnessRpgPrograms.getSuggestedDayNumberForPlanItem(item);

  window.FitnessRpgPrograms.openProgramDetail(item.programId, {
    weekNumber,
    dayNumber
  });

  window.setTimeout(() => {
    window.FitnessRpgPrograms.validateProgramDay(item.programId, dayNumber, weekNumber);
  }, 120);
};

window.FitnessRpgPrograms.programBrowser = {
  programId: null,
  weekNumber: null,
  dayNumber: null
};

window.FitnessRpgPrograms.getCompletedProgramSessionCount = function getCompletedProgramSessionCount(programId) {
  const entries = window.FitnessRpgState.getAllEntries?.() || [];

  return entries.filter((entry) => {
    return entry.type === "program" && entry.programId === programId;
  }).length;
};

window.FitnessRpgPrograms.getSuggestedProgramPosition = function getSuggestedProgramPosition(programId) {
  const weeks = window.FitnessRpgPrograms.getProgramWeeks(programId);
  const weekCount = Math.max(1, weeks.length || 1);

  const firstWeekDays = window.FitnessRpgPrograms.getProgramDaysForWeek(programId, 1);
  const daysPerWeek = Math.max(1, firstWeekDays.length || 1);

  const completedCount = window.FitnessRpgPrograms.getCompletedProgramSessionCount(programId);
  const totalSlots = Math.max(1, weekCount * daysPerWeek);
  const slotIndex = Math.min(completedCount, totalSlots - 1);

  const weekNumber = Math.floor(slotIndex / daysPerWeek) + 1;
  const dayIndex = slotIndex % daysPerWeek;

  const weekDays = window.FitnessRpgPrograms.getProgramDaysForWeek(programId, weekNumber);
  const day = weekDays[dayIndex] || weekDays[0] || { day: 1 };

  return {
    weekNumber,
    dayNumber: Number(day.day) || 1,
    completedCount,
    weekCount,
    daysPerWeek
  };
};

window.FitnessRpgPrograms.setProgramBrowserSelection = function setProgramBrowserSelection(programId, weekNumber, dayNumber) {
  const weeks = window.FitnessRpgPrograms.getProgramWeeks(programId);
  const weekCount = Math.max(1, weeks.length || 1);
  const safeWeek = Math.min(weekCount, Math.max(1, Number(weekNumber) || 1));

  const days = window.FitnessRpgPrograms.getProgramDaysForWeek(programId, safeWeek);
  const fallbackDay = days[0]?.day || 1;
  const wantedDay = Number(dayNumber || fallbackDay);
  const hasDay = days.some((day) => Number(day.day) === wantedDay);
  const safeDay = hasDay ? wantedDay : fallbackDay;

  window.FitnessRpgPrograms.programBrowser = {
    programId,
    weekNumber: safeWeek,
    dayNumber: safeDay
  };

  window.FitnessRpgState.selectedProgramId = programId;

  return window.FitnessRpgPrograms.programBrowser;
};

window.FitnessRpgPrograms.getProgramBrowserSelection = function getProgramBrowserSelection(programId) {
  const browser = window.FitnessRpgPrograms.programBrowser || {};

  if (browser.programId === programId && browser.weekNumber && browser.dayNumber) {
    return browser;
  }

  const suggested = window.FitnessRpgPrograms.getSuggestedProgramPosition(programId);

  return window.FitnessRpgPrograms.setProgramBrowserSelection(
    programId,
    suggested.weekNumber,
    suggested.dayNumber
  );
};

window.FitnessRpgPrograms.openProgramList = function openProgramList() {
  const list = document.querySelector("#programList");
  const detail = document.querySelector("#programDetail");

  window.FitnessRpgState.selectedProgramId = null;

  window.FitnessRpgPrograms.programBrowser = {
    programId: null,
    weekNumber: null,
    dayNumber: null
  };

  if (list) list.classList.remove("hidden");

  if (detail) {
    detail.classList.add("hidden");
    detail.innerHTML = "";
  }

  window.FitnessRpgRender.renderProgramList?.();
};

window.FitnessRpgPrograms.openProgramDetail = function openProgramDetail(programId, options = {}) {
  const program = window.FitnessRpgPrograms.getProgram(programId);

  if (!program) {
    alert("Programme introuvable.");
    return;
  }

  const suggested = window.FitnessRpgPrograms.getSuggestedProgramPosition(programId);
  const current = window.FitnessRpgPrograms.programBrowser || {};

  const weekNumber = options.weekNumber
    || (current.programId === programId ? current.weekNumber : null)
    || suggested.weekNumber;

  const dayNumber = options.dayNumber
    || (current.programId === programId ? current.dayNumber : null)
    || suggested.dayNumber;

  window.FitnessRpgPrograms.setProgramBrowserSelection(programId, weekNumber, dayNumber);

  if (window.FitnessRpgState.getPage?.() !== "programs") {
    window.FitnessRpgNavigation.setPage("programs");
  }

  window.FitnessRpgRender.renderProgramDetail(programId);

  window.setTimeout(() => {
    document.querySelector("#programDetail")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 80);
};

window.FitnessRpgPrograms.changeProgramWeek = function changeProgramWeek(delta) {
  const browser = window.FitnessRpgPrograms.programBrowser || {};
  if (!browser.programId) return;

  const nextWeek = Number(browser.weekNumber || 1) + Number(delta || 0);

  window.FitnessRpgPrograms.setProgramBrowserSelection(browser.programId, nextWeek, browser.dayNumber);
  window.FitnessRpgRender.renderProgramDetail(browser.programId);
};

window.FitnessRpgPrograms.changeProgramDay = function changeProgramDay(delta) {
  const browser = window.FitnessRpgPrograms.programBrowser || {};
  if (!browser.programId) return;

  const days = window.FitnessRpgPrograms.getProgramDaysForWeek(browser.programId, browser.weekNumber || 1);
  if (!days.length) return;

  const currentIndex = Math.max(0, days.findIndex((day) => Number(day.day) === Number(browser.dayNumber)));
  const nextIndex = Math.min(days.length - 1, Math.max(0, currentIndex + Number(delta || 0)));
  const nextDay = days[nextIndex] || days[0];

  window.FitnessRpgPrograms.setProgramBrowserSelection(browser.programId, browser.weekNumber || 1, nextDay.day);
  window.FitnessRpgRender.renderProgramDetail(browser.programId);
};

window.FitnessRpgPrograms.getSelectedProgramDay = function getSelectedProgramDay(programId) {
  const selection = window.FitnessRpgPrograms.getProgramBrowserSelection(programId);

  return window.FitnessRpgPrograms.getProgramDay(
    programId,
    selection.dayNumber,
    selection.weekNumber
  );
};

window.FitnessRpgPrograms.getSelectedProgramWeek = function getSelectedProgramWeek(programId) {
  const selection = window.FitnessRpgPrograms.getProgramBrowserSelection(programId);
  return window.FitnessRpgPrograms.getProgramWeek(programId, selection.weekNumber);
};

window.FitnessRpgPrograms.getMissingMainSessionsThisWeek = function getMissingMainSessionsThisWeek() {
  const goalId = window.FitnessRpgState.getGoalId?.() || "reprise-douce";
  const plan = window.FitnessRpgPrograms.getCombinedWeeklyPlan(goalId);
  const weekKeys = window.FitnessRpgState.getWeekKeys?.() || [];

  return plan.slice(0, 5).map((item, index) => {
    const [dayLabel, title, programId, source] = item;
    const dateKey = weekKeys[index];

    const done = programId
      ? window.FitnessRpgState.getEntriesForDate(dateKey).some((entry) => {
          return entry.type === "program";
        })
      : false;

    return {
      index,
      dayLabel,
      title,
      programId,
      source,
      dateKey,
      plan,
      done
    };
  }).filter((item) => {
    return item.programId && !item.done;
  });
};

window.FitnessRpgPrograms.startWeeklyCatchupSession = function startWeeklyCatchupSession() {
  const missing = window.FitnessRpgPrograms.getMissingMainSessionsThisWeek();

  if (!missing.length) {
    alert("Toutes les séances principales sont déjà validées.");
    return;
  }

  const item = missing[0];
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
  const quest = window.FitnessRpgPrograms.getTodayPlanningQuest?.();

  if (!quest) return;

  if (quest.source === "boss-locked") {
    window.FitnessRpgPrograms.startWeeklyCatchupSession?.();
    return;
  }

  if (!quest.programId) {
    window.FitnessRpgRender?.showModal?.({
      icon: "🌙",
      title: "Jour de repos",
      message: "Aujourd’hui, ton planning indique repos ou récupération douce.",
      okText: "Compris"
    });
    return;
  }

  if (window.FitnessRpgPrograms.openProgramDetail) {
    window.FitnessRpgPrograms.openProgramDetail(quest.programId, {
      weekNumber: quest.weekNumber || 1,
      dayNumber: quest.dayNumber || 1
    });
  } else {
    window.FitnessRpgNavigation.openPrograms(quest.programId);
  }
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

window.FitnessRpgPrograms.validateProgramExercise = function validateProgramExercise(exerciseId, exerciseKey = null) {
  const session = window.FitnessRpgState.getActiveProgramSession?.();

  if (!session) return;

  const key = exerciseKey || exerciseId;

  window.FitnessRpgState.markProgramSessionExerciseDone(key);

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
  const day = window.FitnessRpgPrograms.getProgramDay(
    session.programId,
    session.dayNumber,
    session.weekNumber || 1,
  );
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
  window.FitnessRpgProgress?.checkBadges?.();
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

  const day = window.FitnessRpgPrograms.getProgramDay(
    session.programId,
    session.dayNumber,
    session.weekNumber || 1
  );

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

window.FitnessRpgPrograms.openProgramExerciseTimer = function openProgramExerciseTimer(exerciseId, exerciseKey = null) {
  const item = window.FitnessRpgPrograms.getActiveProgramItemByKey(exerciseKey, exerciseId);
  const exercise = window.FitnessRpgData.getExerciseById(exerciseId);

  if (!item || !exercise) {
    window.FitnessRpgRender?.showModal?.({
      icon: "⚠️",
      title: "Exercice introuvable",
      message: "Impossible de trouver cet exercice dans la séance.",
      okText: "Compris"
    });
    return;
  }

  const seconds = window.FitnessRpgPrograms.programItemToSeconds(item);

  if (seconds <= 0) {
    window.FitnessRpgRender?.showModal?.({
      icon: "⏱️",
      title: "Timer indisponible",
      message: "Cet exercice n’a pas de durée à minuter.",
      okText: "Compris"
    });
    return;
  }

  window.FitnessRpgExercises.runTimer({
    exercise,
    seconds,
    title: `${exercise.title} · ${item.amount} ${item.unit}`,
    onValidate: () => {
      window.FitnessRpgPrograms.validateProgramExercise(exerciseId, exerciseKey);
    }
  });
};

window.FitnessRpgPrograms.getActiveProgramItemByKey = function getActiveProgramItemByKey(exerciseKey, fallbackExerciseId = null) {
  const session = window.FitnessRpgState.getActiveProgramSession?.();

  if (!session) return null;

  const day = window.FitnessRpgPrograms.getProgramDay(
    session.programId,
    session.dayNumber,
    session.weekNumber || 1
  );

  if (!day || !Array.isArray(day.exercises)) return null;

  if (exerciseKey) {
    const index = Number(String(exerciseKey).split("-")[0]);

    if (Number.isFinite(index) && day.exercises[index]) {
      return day.exercises[index];
    }
  }

  return day.exercises.find((item) => item.exerciseId === fallbackExerciseId) || null;
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

  const catchupButton = event.target.closest("#startWeeklyCatchupButton");

  if (catchupButton) {
      event.preventDefault();
      window.FitnessRpgPrograms.startWeeklyCatchupSession();
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
