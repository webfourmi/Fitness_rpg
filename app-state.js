// ============================================================
// Fitness RPG - app-state.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - gérer le profil utilisateur ;
// - gérer la sauvegarde locale ;
// - gérer le journal ;
// - gérer les entrées d’entraînement ;
// - gérer le poids ;
// - gérer la série de jours actifs ;
// - gérer l’objectif personnel.
//
// Règle importante :
// ce fichier ne modifie jamais le DOM.
// Il ne contient aucune version.
// ============================================================

window.FitnessRpgState = {
  profile: null,
  currentPage: "home",
  selectedCoachId: "korvan",
  selectedProgramId: null,
  selectedGoalId: "reprise-douce",
  currentPose: "idle",
  musicStatus: "Aucune musique choisie.",
  activeProgramSession: null
};

// ============================================================
// Raccourcis configuration
// ============================================================

window.FitnessRpgState.getConfig = function getConfig() {
  return window.FitnessRpgConfig || {};
};

window.FitnessRpgState.getKeys = function getKeys() {
  return window.FitnessRpgState.getConfig().storageKeys || {};
};

// ============================================================
// Dates
// ============================================================

window.FitnessRpgState.todayKey = function todayKey() {
  const d = new Date();

  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0")
  ].join("-");
};

window.FitnessRpgState.yesterdayKey = function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);

  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0")
  ].join("-");
};

window.FitnessRpgState.nowIso = function nowIso() {
  return new Date().toISOString();
};

window.FitnessRpgState.createId = function createId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

// ============================================================
// Sauvegarde générique
// ============================================================

window.FitnessRpgState.readJson = function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

window.FitnessRpgState.writeJson = function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

window.FitnessRpgState.removeKey = function removeKey(key) {
  localStorage.removeItem(key);
};

// ============================================================
// Profil
// ============================================================

window.FitnessRpgState.createDefaultProfile = function createDefaultProfile(data = {}) {
  return {
    id: window.FitnessRpgState.createId("hero"),
    name: data.name?.trim() || "Héros",
    gender: data.gender || "homme",
    age: Number.isFinite(Number(data.age)) && Number(data.age) > 0 ? Number(data.age) : null,
    coachId: data.coachId || data.coach || "korvan",
    goalId: data.goalId || "reprise-douce",

    totalXp: 0,
    streak: 0,
    lastActiveDate: null,

    completedByDate: {},
    journal: [],
    badges: [],

    createdAt: window.FitnessRpgState.nowIso(),
    updatedAt: window.FitnessRpgState.nowIso()
  };
};

window.FitnessRpgState.loadProfile = function loadProfile() {
  const keys = window.FitnessRpgState.getKeys();
  const profileKey = keys.profile || "fitnessRpgV5Profile";

  const loaded = window.FitnessRpgState.readJson(profileKey, null);

  if (loaded) {
    window.FitnessRpgState.profile = {
      ...window.FitnessRpgState.createDefaultProfile(),
      ...loaded,
      completedByDate: loaded.completedByDate || {},
      journal: Array.isArray(loaded.journal) ? loaded.journal : [],
      badges: Array.isArray(loaded.badges) ? loaded.badges : []
    };

    window.FitnessRpgState.selectedCoachId = window.FitnessRpgState.profile.coachId || "korvan";
    window.FitnessRpgState.selectedGoalId = window.FitnessRpgState.profile.goalId || "reprise-douce";
  } else {
    window.FitnessRpgState.profile = null;
  }

  return window.FitnessRpgState.profile;
};

window.FitnessRpgState.saveProfile = function saveProfile() {
  const keys = window.FitnessRpgState.getKeys();
  const profileKey = keys.profile || "fitnessRpgV5Profile";

  if (!window.FitnessRpgState.profile) return;

  window.FitnessRpgState.profile.updatedAt = window.FitnessRpgState.nowIso();
  window.FitnessRpgState.writeJson(profileKey, window.FitnessRpgState.profile);
};

window.FitnessRpgState.hasProfile = function hasProfile() {
  return Boolean(window.FitnessRpgState.profile);
};

window.FitnessRpgState.getProfile = function getProfile() {
  return window.FitnessRpgState.profile;
};

window.FitnessRpgState.setProfile = function setProfile(profile) {
  window.FitnessRpgState.profile = profile;
  window.FitnessRpgState.saveProfile();
};

window.FitnessRpgState.createProfile = function createProfile(data = {}) {
  const profile = window.FitnessRpgState.createDefaultProfile(data);

  window.FitnessRpgState.profile = profile;
  window.FitnessRpgState.selectedCoachId = profile.coachId;
  window.FitnessRpgState.selectedGoalId = profile.goalId;
  window.FitnessRpgState.currentPage = "training";
  window.FitnessRpgState.currentPose = "welcome";

  window.FitnessRpgState.addJournalEntry({
    type: "profile",
    title: "Aventure commencée",
    text: `Aventure commencée avec ${profile.name}.`,
    xp: 0
  });

  window.FitnessRpgState.saveProfile();

  return profile;
};

window.FitnessRpgState.updateProfile = function updateProfile(data = {}) {
  if (!window.FitnessRpgState.profile) return null;

  window.FitnessRpgState.profile = {
    ...window.FitnessRpgState.profile,
    ...data,
    updatedAt: window.FitnessRpgState.nowIso()
  };

  if (data.coachId) window.FitnessRpgState.selectedCoachId = data.coachId;
  if (data.goalId) window.FitnessRpgState.selectedGoalId = data.goalId;

  window.FitnessRpgState.saveProfile();

  return window.FitnessRpgState.profile;
};

window.FitnessRpgState.clearProfile = function clearProfile() {
  const keys = window.FitnessRpgState.getKeys();
  const profileKey = keys.profile || "fitnessRpgV5Profile";

  window.FitnessRpgState.removeKey(profileKey);
  window.FitnessRpgState.profile = null;
  window.FitnessRpgState.currentPage = "home";
  window.FitnessRpgState.currentPose = "idle";
};

// ============================================================
// Coach et objectif
// ============================================================

window.FitnessRpgState.setCoach = function setCoach(coachId) {
  window.FitnessRpgState.selectedCoachId = coachId || "korvan";

  if (window.FitnessRpgState.profile) {
    window.FitnessRpgState.profile.coachId = window.FitnessRpgState.selectedCoachId;
    window.FitnessRpgState.saveProfile();
  }
};

window.FitnessRpgState.getCoachId = function getCoachId() {
  return window.FitnessRpgState.profile?.coachId || window.FitnessRpgState.selectedCoachId || "korvan";
};

window.FitnessRpgState.setGoal = function setGoal(goalId) {
  window.FitnessRpgState.selectedGoalId = goalId || "reprise-douce";

  if (window.FitnessRpgState.profile) {
    window.FitnessRpgState.profile.goalId = window.FitnessRpgState.selectedGoalId;
    window.FitnessRpgState.saveProfile();
  }
};

window.FitnessRpgState.getGoalId = function getGoalId() {
  return window.FitnessRpgState.profile?.goalId || window.FitnessRpgState.selectedGoalId || "reprise-douce";
};

window.FitnessRpgState.getRecommendedProgram = function getRecommendedProgram() {
  const goalId = window.FitnessRpgState.getGoalId();
  return window.FitnessRpgConfig?.getRecommendedProgramForGoal?.(goalId) || null;
};

// ============================================================
// XP et progression
// ============================================================

window.FitnessRpgState.addXp = function addXp(amount, source = "Progression") {
  if (!window.FitnessRpgState.profile) {
    return { oldLevel: 1, newLevel: 1, xp: 0 };
  }

  const xp = Math.max(0, Number(amount) || 0);
  if (xp <= 0) {
    const info = window.FitnessRpgConfig.levelInfo(window.FitnessRpgState.profile.totalXp || 0);
    return { oldLevel: info.level, newLevel: info.level, xp: 0 };
  }

  const oldInfo = window.FitnessRpgConfig.levelInfo(window.FitnessRpgState.profile.totalXp || 0);

  window.FitnessRpgState.profile.totalXp = Number(window.FitnessRpgState.profile.totalXp || 0) + xp;

  const newInfo = window.FitnessRpgConfig.levelInfo(window.FitnessRpgState.profile.totalXp || 0);

  window.FitnessRpgState.addJournalEntry({
    type: "xp",
    title: source,
    text: `+${xp} XP · ${source}`,
    xp
  });

  if (newInfo.level > oldInfo.level) {
    window.FitnessRpgState.currentPose = "levelup";

    window.FitnessRpgState.addJournalEntry({
      type: "levelup",
      title: `Niveau ${newInfo.level}`,
      text: `Niveau ${newInfo.level} atteint !`,
      xp: 0
    });
  }

  window.FitnessRpgState.saveProfile();

  return {
    oldLevel: oldInfo.level,
    newLevel: newInfo.level,
    xp
  };
};

// ============================================================
// Entrées d’entraînement
// ============================================================

window.FitnessRpgState.getEntriesForDate = function getEntriesForDate(dateKey) {
  if (!window.FitnessRpgState.profile) return [];

  const entries = window.FitnessRpgState.profile.completedByDate?.[dateKey];

  return Array.isArray(entries) ? entries : [];
};

window.FitnessRpgState.getTodayEntries = function getTodayEntries() {
  return window.FitnessRpgState.getEntriesForDate(window.FitnessRpgState.todayKey());
};

window.FitnessRpgState.setEntriesForDate = function setEntriesForDate(dateKey, entries) {
  if (!window.FitnessRpgState.profile) return;

  if (!window.FitnessRpgState.profile.completedByDate) {
    window.FitnessRpgState.profile.completedByDate = {};
  }

  window.FitnessRpgState.profile.completedByDate[dateKey] = Array.isArray(entries) ? entries : [];
  window.FitnessRpgState.saveProfile();
};

window.FitnessRpgState.addTrainingEntry = function addTrainingEntry(entry = {}) {
  if (!window.FitnessRpgState.profile) return null;

  const dateKey = entry.date || window.FitnessRpgState.todayKey();
  const entries = window.FitnessRpgState.getEntriesForDate(dateKey);

  const cleanEntry = {
    id: entry.id || window.FitnessRpgState.createId("entry"),
    date: dateKey,
    type: entry.type || "exercise",
    sportId: entry.sportId || null,
    sportTitle: entry.sportTitle || null,
    exerciseId: entry.exerciseId || null,
    programId: entry.programId || null,
    programTitle: entry.programTitle || null,
    title: entry.title || "Séance",
    amount: Number(entry.amount || 0),
    unit: entry.unit || "",
    distanceKm: entry.distanceKm ? Number(entry.distanceKm) : null,
    xp: Number(entry.xp || 0),
    at: entry.at || window.FitnessRpgState.nowIso()
  };

  entries.push(cleanEntry);

  window.FitnessRpgState.setEntriesForDate(dateKey, entries);
  window.FitnessRpgState.updateStreak(dateKey);

  if (cleanEntry.xp > 0) {
    window.FitnessRpgState.addXp(cleanEntry.xp, cleanEntry.title);
  } else {
    window.FitnessRpgState.saveProfile();
  }

  return cleanEntry;
};

window.FitnessRpgState.clearTodayEntries = function clearTodayEntries() {
  window.FitnessRpgState.setEntriesForDate(window.FitnessRpgState.todayKey(), []);

  window.FitnessRpgState.addJournalEntry({
    type: "system",
    title: "Entrées du jour effacées",
    text: "Les entrées du jour ont été effacées.",
    xp: 0
  });

  window.FitnessRpgState.saveProfile();
};

window.FitnessRpgState.getAllEntries = function getAllEntries() {
  if (!window.FitnessRpgState.profile?.completedByDate) return [];

  return Object.values(window.FitnessRpgState.profile.completedByDate)
    .flat()
    .filter(Boolean);
};

// ============================================================
// Série
// ============================================================

window.FitnessRpgState.updateStreak = function updateStreak(activeDateKey = null) {
  if (!window.FitnessRpgState.profile) return;

  const dateKey = activeDateKey || window.FitnessRpgState.todayKey();

  if (window.FitnessRpgState.profile.lastActiveDate === dateKey) {
    return;
  }

  const yesterday = window.FitnessRpgState.yesterdayKey();

  if (window.FitnessRpgState.profile.lastActiveDate === yesterday) {
    window.FitnessRpgState.profile.streak = Number(window.FitnessRpgState.profile.streak || 0) + 1;
  } else {
    window.FitnessRpgState.profile.streak = 1;
  }

  window.FitnessRpgState.profile.lastActiveDate = dateKey;
  window.FitnessRpgState.saveProfile();
};

// ============================================================
// Journal
// ============================================================

window.FitnessRpgState.addJournalEntry = function addJournalEntry(entry = {}) {
  if (!window.FitnessRpgState.profile) return null;

  const cleanEntry = {
    id: entry.id || window.FitnessRpgState.createId("journal"),
    type: entry.type || "note",
    title: entry.title || "Journal",
    text: entry.text || "",
    xp: Number(entry.xp || 0),
    at: entry.at || window.FitnessRpgState.nowIso()
  };

  if (!Array.isArray(window.FitnessRpgState.profile.journal)) {
    window.FitnessRpgState.profile.journal = [];
  }

  window.FitnessRpgState.profile.journal.unshift(cleanEntry);
  window.FitnessRpgState.profile.journal = window.FitnessRpgState.profile.journal.slice(0, 50);

  window.FitnessRpgState.saveProfile();

  return cleanEntry;
};

window.FitnessRpgState.getJournal = function getJournal() {
  return Array.isArray(window.FitnessRpgState.profile?.journal)
    ? window.FitnessRpgState.profile.journal
    : [];
};

window.FitnessRpgState.clearJournal = function clearJournal() {
  if (!window.FitnessRpgState.profile) return;

  window.FitnessRpgState.profile.journal = [];
  window.FitnessRpgState.saveProfile();
};

// ============================================================
// Poids
// ============================================================

window.FitnessRpgState.getWeights = function getWeights() {
  const keys = window.FitnessRpgState.getKeys();
  const weightKey = keys.weights || "fitnessRpgV5Weights";

  return window.FitnessRpgState.readJson(weightKey, []);
};

window.FitnessRpgState.saveWeights = function saveWeights(weights) {
  const keys = window.FitnessRpgState.getKeys();
  const weightKey = keys.weights || "fitnessRpgV5Weights";

  window.FitnessRpgState.writeJson(weightKey, Array.isArray(weights) ? weights : []);
};

window.FitnessRpgState.addWeight = function addWeight(value, dateKey = null) {
  const weight = Number(value);

  if (!Number.isFinite(weight) || weight <= 0) {
    return null;
  }

  const weights = window.FitnessRpgState.getWeights();

  const entry = {
    id: window.FitnessRpgState.createId("weight"),
    date: dateKey || window.FitnessRpgState.todayKey(),
    value: weight,
    at: window.FitnessRpgState.nowIso()
  };

  weights.push(entry);
  weights.sort((a, b) => String(a.date).localeCompare(String(b.date)));

  window.FitnessRpgState.saveWeights(weights);

  return entry;
};

window.FitnessRpgState.clearWeights = function clearWeights() {
  window.FitnessRpgState.saveWeights([]);
};

// ============================================================
// Badges
// ============================================================

window.FitnessRpgState.unlockBadge = function unlockBadge(badgeId) {
  if (!window.FitnessRpgState.profile) return false;

  if (!Array.isArray(window.FitnessRpgState.profile.badges)) {
    window.FitnessRpgState.profile.badges = [];
  }

  if (window.FitnessRpgState.profile.badges.includes(badgeId)) {
    return false;
  }

  window.FitnessRpgState.profile.badges.push(badgeId);

  window.FitnessRpgState.addJournalEntry({
    type: "badge",
    title: "Badge débloqué",
    text: `Badge débloqué : ${badgeId}`,
    xp: 0
  });

  window.FitnessRpgState.saveProfile();

  return true;
};

window.FitnessRpgState.hasBadge = function hasBadge(badgeId) {
  return Boolean(window.FitnessRpgState.profile?.badges?.includes(badgeId));
};
// ============================================================
// Séance de programme en cours
// ============================================================

window.FitnessRpgState.startProgramSession = function startProgramSession(programId, dayNumber) {
  const day = window.FitnessRpgPrograms?.getProgramDay?.(programId, dayNumber);

  if (!day) return null;

  window.FitnessRpgState.activeProgramSession = {
    id: window.FitnessRpgState.createId("program-session"),
    programId,
    dayNumber: Number(dayNumber),
    startedAt: window.FitnessRpgState.nowIso(),
    completedExerciseIds: []
  };

  return window.FitnessRpgState.activeProgramSession;
};

window.FitnessRpgState.getActiveProgramSession = function getActiveProgramSession() {
  return window.FitnessRpgState.activeProgramSession;
};

window.FitnessRpgState.clearActiveProgramSession = function clearActiveProgramSession() {
  window.FitnessRpgState.activeProgramSession = null;
};

window.FitnessRpgState.completeProgramSessionExercise = function completeProgramSessionExercise(exerciseId) {
  const session = window.FitnessRpgState.getActiveProgramSession();

  if (!session) return null;

  if (!session.completedExerciseIds.includes(exerciseId)) {
    session.completedExerciseIds.push(exerciseId);
  }

  return session;
};

window.FitnessRpgState.isProgramSessionExerciseDone = function isProgramSessionExerciseDone(exerciseId) {
  const session = window.FitnessRpgState.getActiveProgramSession();

  if (!session) return false;

  return session.completedExerciseIds.includes(exerciseId);
};

window.FitnessRpgState.isProgramSessionComplete = function isProgramSessionComplete() {
  const session = window.FitnessRpgState.getActiveProgramSession();

  if (!session) return false;

  const day = window.FitnessRpgPrograms?.getProgramDay?.(session.programId, session.dayNumber);

  if (!day || !Array.isArray(day.exercises)) return false;

  return day.exercises.every((item) => {
    return session.completedExerciseIds.includes(item.exerciseId);
  });
};

// ============================================================
// Navigation d’état
// ============================================================

window.FitnessRpgState.setPage = function setPage(pageId) {
  window.FitnessRpgState.currentPage = pageId || "home";
};

window.FitnessRpgState.getPage = function getPage() {
  return window.FitnessRpgState.currentPage || "home";
};

window.FitnessRpgState.setPose = function setPose(pose) {
  window.FitnessRpgState.currentPose = pose || "idle";
};

window.FitnessRpgState.getPose = function getPose() {
  return window.FitnessRpgState.currentPose || "idle";
};

// ============================================================
// Initialisation état
// ============================================================

window.FitnessRpgState.init = function initState() {
  window.FitnessRpgState.loadProfile();

  if (window.FitnessRpgState.profile) {
    window.FitnessRpgState.currentPage = "home";
    window.FitnessRpgState.selectedCoachId = window.FitnessRpgState.profile.coachId || "korvan";
    window.FitnessRpgState.selectedGoalId = window.FitnessRpgState.profile.goalId || "reprise-douce";
  } else {
    window.FitnessRpgState.currentPage = "hero-setup";
  }

  return window.FitnessRpgState.profile;
};
