// ============================================================
// Fitness RPG - app-progress.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - calculer les XP ;
// - calculer les niveaux ;
// - vérifier les badges ;
// - afficher plus tard l’écran “Niveau supérieur” ;
// - fournir des helpers de progression.
//
// Règle importante :
// ce fichier ne contient aucune version.
// Il ne modifie jamais document.title.
// ============================================================

window.FitnessRpgProgress = {};

// ============================================================
// Raccourcis
// ============================================================

window.FitnessRpgProgress.getConfig = function getConfig() {
  return window.FitnessRpgConfig || {};
};

window.FitnessRpgProgress.getData = function getData() {
  return window.FitnessRpgData || {};
};

window.FitnessRpgProgress.getState = function getState() {
  return window.FitnessRpgState || {};
};

// ============================================================
// XP et niveaux
// ============================================================

window.FitnessRpgProgress.xpNeededForLevel = function xpNeededForLevel(level) {
  return window.FitnessRpgConfig.xpNeededForLevel(level);
};

window.FitnessRpgProgress.totalXpForLevel = function totalXpForLevel(level) {
  return window.FitnessRpgConfig.totalXpForLevel(level);
};

window.FitnessRpgProgress.levelInfo = function levelInfo(totalXp) {
  return window.FitnessRpgConfig.levelInfo(totalXp);
};

window.FitnessRpgProgress.getProfileLevelInfo = function getProfileLevelInfo() {
  const profile = window.FitnessRpgState.getProfile?.();
  return window.FitnessRpgConfig.levelInfo(profile?.totalXp || 0);
};

window.FitnessRpgProgress.calculateExerciseXp = function calculateExerciseXp(exercise, amount) {
  if (!exercise) return 0;

  const value = Number(amount || 0);

  if (!Number.isFinite(value) || value <= 0) {
    return 0;
  }

  const xpBase = Number(exercise.xpBase || 0);
  const xpPerUnit = Number(exercise.xpPerUnit || 1);

  return Math.max(1, Math.round(xpBase + value * xpPerUnit));
};

window.FitnessRpgProgress.calculateProgramXp = function calculateProgramXp(programId) {
  const program = window.FitnessRpgConfig.getProgramById?.(programId);

  if (!program) return 10;

  return Number(program.xp || 10);
};

// ============================================================
// Difficulté et XP des séances de programme
// ============================================================

window.FitnessRpgProgress.estimateProgramDayMinutes = function estimateProgramDayMinutes(day) {
  if (!day || !Array.isArray(day.exercises)) return 0;

  return day.exercises.reduce((total, item) => {
    const amount = Number(item.amount || 0);

    if (item.unit === "min") return total + amount;
    if (item.unit === "sec") return total + amount / 60;

    // Pour les répétitions, on estime grossièrement le temps.
    if (item.unit === "répétitions") return total + amount / 10;

    return total + 1;
  }, 0);
};

window.FitnessRpgProgress.getProgramDayDifficulty = function getProgramDayDifficulty(day) {
  const minutes = window.FitnessRpgProgress.estimateProgramDayMinutes(day);
  const count = Array.isArray(day?.exercises) ? day.exercises.length : 0;

  if (minutes <= 15 && count <= 4) {
    return {
      id: "short",
      label: "Séance courte",
      xpKey: "shortSession"
    };
  }

  if (minutes <= 30 && count <= 7) {
    return {
      id: "normal",
      label: "Séance normale",
      xpKey: "normalSession"
    };
  }

  return {
    id: "hard",
    label: "Séance difficile",
    xpKey: "hardSession"
  };
};

window.FitnessRpgProgress.calculateProgramSessionXp = function calculateProgramSessionXp(programId, dayNumber) {
  const day = window.FitnessRpgPrograms?.getProgramDay?.(programId, dayNumber);

  if (day?.xp) {
    return Number(day.xp);
  }

  const difficulty = window.FitnessRpgProgress.getProgramDayDifficulty(day);
  const rules = window.FitnessRpgConfig.xpRules || {};

  return Number(rules[difficulty.xpKey] || 20);
};
// ============================================================
// Attribution XP
// ============================================================

window.FitnessRpgProgress.applyXp = function applyXp(amount, sourceLabel = "Progression") {
  const state = window.FitnessRpgState;

  if (!state?.getProfile?.()) {
    return {
      oldLevel: 1,
      newLevel: 1,
      xp: 0,
      leveledUp: false
    };
  }

  const oldInfo = window.FitnessRpgProgress.getProfileLevelInfo();
  const result = state.addXp(amount, sourceLabel);
  const newInfo = window.FitnessRpgProgress.getProfileLevelInfo();

  const leveledUp = newInfo.level > oldInfo.level;

  if (leveledUp) {
    window.FitnessRpgProgress.handleLevelUp(oldInfo.level, newInfo.level);
  }

  return {
    ...result,
    leveledUp,
    oldInfo,
    newInfo
  };
};

window.FitnessRpgProgress.handleLevelUp = function handleLevelUp(oldLevel, newLevel) {
  const state = window.FitnessRpgState;

  state.setPose?.("levelup");

  state.addJournalEntry?.({
    type: "levelup",
    title: "Niveau supérieur",
    text: `Niveau ${newLevel} atteint !`,
    xp: 0
  });

  window.FitnessRpgProgress.queueLevelUpModal(oldLevel, newLevel);
};

// ============================================================
// Modal niveau supérieur
// ============================================================

window.FitnessRpgProgress.queueLevelUpModal = function queueLevelUpModal(oldLevel, newLevel) {
  window.FitnessRpgProgress.pendingLevelUp = {
    oldLevel,
    newLevel,
    at: new Date().toISOString()
  };
};

window.FitnessRpgProgress.consumeLevelUpModal = function consumeLevelUpModal() {
  const pending = window.FitnessRpgProgress.pendingLevelUp || null;
  window.FitnessRpgProgress.pendingLevelUp = null;
  return pending;
};
window.FitnessRpgProgress.peekLevelUpModal = function peekLevelUpModal() {
  return window.FitnessRpgProgress.pendingLevelUp || null;
};

window.FitnessRpgProgress.hasChestReward = function hasChestReward(level) {
  return Number(level || 0) > 0 && Number(level) % 5 === 0;
};

window.FitnessRpgProgress.getLevelRewardText = function getLevelRewardText(level) {
  if (window.FitnessRpgProgress.hasChestReward(level)) {
    return "🎁 Coffre de récompense débloqué !";
  }

  return "✨ Nouvelle apparence et progression héroïque.";
};
// ============================================================
// Badges
// ============================================================

window.FitnessRpgProgress.countEntries = function countEntries(filterFn = null) {
  const entries = window.FitnessRpgState.getAllEntries?.() || [];

  if (typeof filterFn !== "function") {
    return entries.length;
  }

  return entries.filter(filterFn).length;
};

window.FitnessRpgProgress.countExercise = function countExercise(exerciseId) {
  return window.FitnessRpgProgress.countEntries((entry) => {
    return entry.exerciseId === exerciseId;
  });
};

window.FitnessRpgProgress.countExerciseGroup = function countExerciseGroup(exerciseIds = []) {
  return window.FitnessRpgProgress.countEntries((entry) => {
    return exerciseIds.includes(entry.exerciseId);
  });
};

window.FitnessRpgProgress.countSport = function countSport(sportId) {
  return window.FitnessRpgProgress.countEntries((entry) => {
    return entry.sportId === sportId;
  });
};

window.FitnessRpgProgress.countProgram = function countProgram(programId) {
  return window.FitnessRpgProgress.countEntries((entry) => {
    return entry.programId === programId;
  });
};

window.FitnessRpgProgress.isBadgeUnlocked = function isBadgeUnlocked(badge) {
  const profile = window.FitnessRpgState.getProfile?.();

  if (!profile || !badge) return false;

  if (window.FitnessRpgState.hasBadge?.(badge.id)) {
    return true;
  }

  switch (badge.type) {
    case "totalEntries":
      return window.FitnessRpgProgress.countEntries() >= badge.target;

    case "streak":
      return Number(profile.streak || 0) >= badge.target;

    case "exerciseCount":
      return window.FitnessRpgProgress.countExercise(badge.exerciseId) >= badge.target;

    case "exerciseGroupCount":
      return window.FitnessRpgProgress.countExerciseGroup(badge.exerciseIds || []) >= badge.target;

    case "sportCount":
      return window.FitnessRpgProgress.countSport(badge.sportId) >= badge.target;

    case "program":
      return window.FitnessRpgProgress.countProgram(badge.programId) >= badge.target;

    default:
      return false;
  }
};

window.FitnessRpgProgress.checkBadges = function checkBadges() {
  const badges = window.FitnessRpgData.badges || [];
  const unlocked = [];

  badges.forEach((badge) => {
    if (window.FitnessRpgState.hasBadge?.(badge.id)) return;

    if (window.FitnessRpgProgress.isBadgeUnlocked(badge)) {
      const success = window.FitnessRpgState.unlockBadge?.(badge.id);

      if (success) {
        unlocked.push(badge);
      }
    }
  });

  return unlocked;
};

window.FitnessRpgProgress.getBadgeStatusList = function getBadgeStatusList() {
  const badges = window.FitnessRpgData.badges || [];

  return badges.map((badge) => {
    return {
      ...badge,
      unlocked: window.FitnessRpgState.hasBadge?.(badge.id) || window.FitnessRpgProgress.isBadgeUnlocked(badge)
    };
  });
};

window.FitnessRpgProgress.getBadgeProgress = function getBadgeProgress(badge) {
  const profile = window.FitnessRpgState.getProfile?.();

  if (!profile || !badge) {
    return { current: 0, target: badge?.target || 1, percent: 0 };
  }

  let current = 0;

  switch (badge.type) {
    case "totalEntries":
      current = window.FitnessRpgProgress.countEntries();
      break;

    case "streak":
      current = Number(profile.streak || 0);
      break;

    case "exerciseCount":
      current = window.FitnessRpgProgress.countExercise(badge.exerciseId);
      break;

    case "exerciseGroupCount":
      current = window.FitnessRpgProgress.countExerciseGroup(badge.exerciseIds || []);
      break;

    case "sportCount":
      current = window.FitnessRpgProgress.countSport(badge.sportId);
      break;

    case "program":
      current = window.FitnessRpgProgress.countProgram(badge.programId);
      break;

    default:
      current = 0;
  }

  const target = Math.max(1, Number(badge.target || 1));
  const percent = Math.max(0, Math.min(100, Math.round((current / target) * 100)));

  return { current, target, percent };
};

// ============================================================
// Récompenses visuelles par niveau
// ============================================================

window.FitnessRpgProgress.getHeroImageLevel = function getHeroImageLevel() {
  const info = window.FitnessRpgProgress.getProfileLevelInfo();

  return Math.max(1, Math.min(20, info.level));
};

window.FitnessRpgProgress.getHeroImagePath = function getHeroImagePath() {
  const profile = window.FitnessRpgState.getProfile?.();
  const level = window.FitnessRpgProgress.getHeroImageLevel();
  const padded = String(level).padStart(2, "0");

  if (profile?.gender === "femme") {
    return `assets/joueuse/joueuse_niveau_${padded}.png`;
  }

  return `assets/joueur/joueur_niveau_${padded}.png`;
};

window.FitnessRpgProgress.getRankTitle = function getRankTitle() {
  const info = window.FitnessRpgProgress.getProfileLevelInfo();
  return info.rank || window.FitnessRpgConfig.getRankTitle(info.level);
};

// ============================================================
// Progression texte
// ============================================================

window.FitnessRpgProgress.getXpText = function getXpText() {
  const info = window.FitnessRpgProgress.getProfileLevelInfo();

  return `${info.currentXp} / ${info.nextXp} XP`;
};

window.FitnessRpgProgress.getXpPercent = function getXpPercent() {
  const info = window.FitnessRpgProgress.getProfileLevelInfo();

  if (!info.nextXp) return 0;

  return Math.max(0, Math.min(100, Math.round((info.currentXp / info.nextXp) * 100)));
};

window.FitnessRpgProgress.getIdentityLine = function getIdentityLine() {
  const profile = window.FitnessRpgState.getProfile?.();
  const info = window.FitnessRpgProgress.getProfileLevelInfo();

  const name = profile?.name || "Héros";
  const rank = info.rank || "Novice";

  return `${name} · Niv. ${info.level} · ${rank}`;
};

// ============================================================
// Initialisation
// ============================================================

window.FitnessRpgProgress.init = function initProgress() {
  window.FitnessRpgProgress.checkBadges();
};
