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

  const xp = window.FitnessRpgPrograms.calculateProgramDayXp(programId, dayNumber);
  const title = window.FitnessRpgPrograms.describeProgramDay(programId, dayNumber);
  const details = window.FitnessRpgPrograms.formatDayExercises(day);

  const entry = window.FitnessRpgState.addTrainingEntry({
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

  if (!entry) return;

  window.FitnessRpgState.addJournalEntry({
    type: "program",
    title,
    text: `${title} validé. ${details}`,
    xp
  });

  window.FitnessRpgState.setPose("victory");

  const coachId = window.FitnessRpgState.getCoachId();
  const coachMessage = document.querySelector("#coachMessage");

  if (coachMessage) {
    const message = window.FitnessRpgData.getCoachMessage(coachId, "complete");
    coachMessage.textContent = `${message} +${xp} XP.`;
  }

  window.FitnessRpgProgress.checkBadges();
  window.FitnessRpgRender.renderAll();

  window.setTimeout(() => {
    const detail = document.querySelector("#programDetail");
    if (detail) {
      window.FitnessRpgRender.renderProgramDetail(programId);
      detail.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
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
// Clics
// ============================================================

window.FitnessRpgPrograms.handleDocumentClick = function handleDocumentClick(event) {
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
