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

  window.FitnessRpgProgress.awardFamiliarsForLevelRange?.(oldLevel, newLevel);
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
  return Number(level || 0) > 1;
};

window.FitnessRpgProgress.getLevelRewardText = function getLevelRewardText(level) {
  if (window.FitnessRpgProgress.hasChestReward(level)) {
    return "🎁 Coffre de familier débloqué !";
  }

  return "✨ Nouvelle apparence et progression héroïque.";
};

window.FitnessRpgProgress.awardFamiliarForLevel = function awardFamiliarForLevel(level) {
  const state = window.FitnessRpgState;
  const profile = state.getProfile?.();

  if (!profile || !window.FitnessRpgProgress.hasChestReward(level)) {
    return null;
  }

  if (!Array.isArray(profile.familiars)) {
    profile.familiars = [];
  }

  if (!profile.levelFamiliarRewards || typeof profile.levelFamiliarRewards !== "object") {
    profile.levelFamiliarRewards = {};
  }

  const levelKey = String(level);

 const existingReward = profile.levelFamiliarRewards[levelKey];

if (existingReward?.familiarId) {
  return existingReward;
}

if (existingReward?.allCollected) {
  const profileOwnedIds = Array.isArray(profile.familiars)
    ? profile.familiars
        .map((item) => {
          return typeof item === "string" ? item : item?.id;
        })
        .filter(Boolean)
    : [];

  const rewardOwnedIds = window.FitnessRpgRewards?.getUnlockedFamiliarIds?.() || [];

  const ownedIds = [...new Set([...profileOwnedIds, ...rewardOwnedIds])];

  const stillAvailable = window.FitnessRpgData
    .getRewardFamiliars()
    .some((familiar) => {
      return familiar?.id && !ownedIds.includes(familiar.id);
    });

  if (!stillAvailable) {
    return existingReward;
  }

  delete profile.levelFamiliarRewards[levelKey];
}

 const profileOwnedIds = profile.familiars.map((item) => {
  return typeof item === "string" ? item : item?.id;
}).filter(Boolean);

const rewardOwnedIds = window.FitnessRpgRewards?.getUnlockedFamiliarIds?.() || [];

const ownedIds = [...new Set([...profileOwnedIds, ...rewardOwnedIds])];

  const draw = window.FitnessRpgData.pickRandomFamiliar?.(ownedIds);

  if (!draw || draw.allCollected || !draw.familiar) {
    const reward = {
      level,
      familiarId: null,
      allCollected: true,
      at: state.nowIso?.() || new Date().toISOString()
    };

    profile.levelFamiliarRewards[levelKey] = reward;

    state.addJournalEntry?.({
      type: "familiar",
      title: "Collection complète",
      text: `Niveau ${level} atteint : tous les familiers sont déjà dans ta ménagerie.`,
      xp: 0
    });

    state.saveProfile?.();
    return reward;
  }

  const familiar = draw.familiar;

  profile.familiars.push({
    id: familiar.id,
    name: familiar.name,
    image: familiar.image,
    level,
    unlockedAt: state.nowIso?.() || new Date().toISOString()
  });

  const reward = {
    level,
    familiarId: familiar.id,
    familiarName: familiar.name,
    familiarImage: familiar.image,
    allCollected: false,
    at: state.nowIso?.() || new Date().toISOString()
  };

  profile.levelFamiliarRewards[levelKey] = reward;

  state.addJournalEntry?.({
    type: "familiar",
    title: "Nouveau familier",
    text: `Niveau ${level} atteint : ${familiar.name} rejoint ton aventure !`,
    xp: 0
  });

  state.saveProfile?.();

  return reward;
};

window.FitnessRpgProgress.awardFamiliarsForLevelRange = function awardFamiliarsForLevelRange(oldLevel, newLevel) {
  const rewards = [];

  for (let level = Number(oldLevel) + 1; level <= Number(newLevel); level += 1) {
    const reward = window.FitnessRpgProgress.awardFamiliarForLevel(level);

    if (reward) {
      rewards.push(reward);
    }
  }

  return rewards;
};

window.FitnessRpgProgress.getLevelUpNarrative = function getLevelUpNarrative(level) {
  const safeLevel = Number(level) || 1;

  const specialMessages = {
    2: "Le héros quitte l’échauffement du destin. Les premières cicatrices sont encore invisibles.",
    3: "La routine devient une arme. Chaque séance ajoute une maille à l’armure.",
    4: "Le souffle tient mieux. Le corps commence à croire à la légende.",
    5: "Transformation majeure. Le novice devient aventurier, et le coffre s’ouvre dans un bruit de tonnerre.",
    10: "Le héros entre dans les chroniques. Les anciennes excuses reculent dans l’ombre.",
    15: "Le champion devient une figure de saga. Même les boss prennent une seconde pour réfléchir.",
    20: "Héros mythique. Le corps, le souffle et la volonté avancent sous la même bannière."
  };

  if (specialMessages[safeLevel]) {
    return specialMessages[safeLevel];
  }

  if (safeLevel > 20) {
    return "La légende continue au-delà des cartes connues.";
  }

  return "Nouvelle étape franchie. Le héros change, lentement mais sûrement.";
};
// ============================================================
// Bonus planning hebdomadaire
// ============================================================

window.FitnessRpgProgress.getWeeklyRewardStorageKey = function getWeeklyRewardStorageKey() {
  return "fitnessRpgV5WeeklyPlanningRewards";
};

window.FitnessRpgProgress.getWeeklyRewardMap = function getWeeklyRewardMap() {
  try {
    return JSON.parse(
      localStorage.getItem(window.FitnessRpgProgress.getWeeklyRewardStorageKey()) || "{}"
    );
  } catch {
    return {};
  }
};

window.FitnessRpgProgress.saveWeeklyRewardMap = function saveWeeklyRewardMap(map) {
  localStorage.setItem(
    window.FitnessRpgProgress.getWeeklyRewardStorageKey(),
    JSON.stringify(map || {})
  );
};

window.FitnessRpgProgress.getWeeklyPlanningBonusStatus = function getWeeklyPlanningBonusStatus() {
  const stats = window.FitnessRpgState.getWeeklyActivityStats?.() || {
    weekId: "",
    activeDays: 0,
    totalEntries: 0
  };

  const rewards = window.FitnessRpgProgress.getWeeklyRewardMap();
  const xp = Number(window.FitnessRpgConfig.xpRules?.weeklyThreeSessionsBonus || 40);

  return {
    weekId: stats.weekId,
    activeDays: stats.activeDays,
    totalEntries: stats.totalEntries,
    target: 3,
    xp,
    earned: Boolean(rewards[stats.weekId]),
    ready: stats.activeDays >= 3
  };
};

window.FitnessRpgProgress.checkWeeklyPlanningBonus = function checkWeeklyPlanningBonus() {
  const status = window.FitnessRpgProgress.getWeeklyPlanningBonusStatus();

  if (!status.ready || status.earned || !status.weekId) {
    return false;
  }

  const rewards = window.FitnessRpgProgress.getWeeklyRewardMap();
  rewards[status.weekId] = {
    earnedAt: new Date().toISOString(),
    xp: status.xp
  };

  window.FitnessRpgProgress.saveWeeklyRewardMap(rewards);

  window.FitnessRpgProgress.applyXp(status.xp, "Bonus planning hebdomadaire");

  window.FitnessRpgState.addJournalEntry?.({
    type: "bonus",
    title: "Bonus planning hebdomadaire",
    text: `3 jours actifs cette semaine : +${status.xp} XP.`,
    xp: status.xp
  });

  return true;
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
window.FitnessRpgProgress.countProgramGroup = function countProgramGroup(programIds = []) {
  return window.FitnessRpgProgress.countEntries((entry) => {
    return programIds.includes(entry.programId);
  });
};

window.FitnessRpgProgress.countProgramBoss = function countProgramBoss(programId, weekNumber = null) {
  return window.FitnessRpgProgress.countEntries((entry) => {
    if (entry.type !== "program-boss") return false;
    if (entry.programId !== programId) return false;

    if (weekNumber !== null && weekNumber !== undefined) {
      return Number(entry.weekNumber || 0) === Number(weekNumber);
    }

    return true;
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

    case "programGroup":
      return window.FitnessRpgProgress.countProgramGroup(badge.programIds || []) >= badge.target;

    case "program-boss":
      return window.FitnessRpgProgress.countProgramBoss(
        badge.programId,
        badge.weekNumber
      ) >= badge.target;

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

    case "programGroup":
      current = window.FitnessRpgProgress.countProgramGroup(badge.programIds || []);
      break;

    case "program-boss":
      current = window.FitnessRpgProgress.countProgramBoss(
        badge.programId,
        badge.weekNumber
      );
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
// Page progression complète
// ============================================================

window.FitnessRpgProgress.getUnlockedBadges = function getUnlockedBadges() {
  return window.FitnessRpgProgress.getBadgeStatusList()
    .filter((badge) => badge.unlocked);
};

window.FitnessRpgProgress.getProgressionStats = function getProgressionStats() {
  const profile = window.FitnessRpgState.getProfile?.();
  const entries = window.FitnessRpgState.getAllEntries?.() || [];
  const info = window.FitnessRpgProgress.getProfileLevelInfo();

  const unlockedBadges = window.FitnessRpgProgress.getUnlockedBadges();
  const programSessions = entries.filter((entry) => entry.type === "program").length;

  return {
    profile,
    info,
    currentLevel: info.level,
    currentRank: info.rank,
    currentXp: info.currentXp,
    nextXp: info.nextXp,
    xpBeforeNextLevel: Math.max(0, info.nextXp - info.currentXp),
    totalXp: info.totalXp,
    totalEntries: entries.length,
    programSessions,
    streak: Number(profile?.streak || 0),
    unlockedBadges,
    unlockedBadgeCount: unlockedBadges.length,
    totalBadgeCount: window.FitnessRpgData.badges?.length || 0
  };
};

window.FitnessRpgProgress.getLevelMilestones = function getLevelMilestones(maxLevel = 20) {
  const stats = window.FitnessRpgProgress.getProgressionStats();
  const currentLevel = stats.currentLevel;

  return Array.from({ length: maxLevel }, (_, index) => {
    const level = index + 1;
    const isChest = [5, 10, 15, 20].includes(level);

    return {
      level,
      rank: window.FitnessRpgConfig.getRankTitle(level),
      chest: isChest,
      current: level === currentLevel,
      unlocked: level <= currentLevel,
      locked: level > currentLevel,
      totalXpRequired: window.FitnessRpgConfig.totalXpForLevel(level)
    };
  });
};

// ============================================================
// Initialisation
// ============================================================

window.FitnessRpgProgress.init = function initProgress() {
  window.FitnessRpgProgress.checkBadges();
};
