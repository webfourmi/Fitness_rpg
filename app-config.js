// ============================================================
// Fitness RPG - app-config.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - définir la version officielle de l’application ;
// - centraliser les clés localStorage ;
// - centraliser les règles XP ;
// - centraliser les rangs RPG ;
// - centraliser les objectifs et les programmes principaux.
//
// Règle importante :
// aucun autre fichier JS ne doit définir une version en dur.
// ============================================================

window.FitnessRpgConfig = {
  // Version technique utilisée dans les petits labels.
  version: "0.5.0.0",

  // Version lisible affichée dans le header et l’onglet.
  displayVersion: "V5.0.0",

  // Version utilisée pour le cache des fichiers CSS/JS dans index.html.
  assetVersion: "5.0.0",

  // ------------------------------------------------------------
  // Clés de sauvegarde locale
  // ------------------------------------------------------------
  storageKeys: {
    profile: "fitnessRpgV5Profile",
    journal: "fitnessRpgV5Journal",
    weights: "fitnessRpgV5Weights",
    today: "fitnessRpgV5Today",
    badges: "fitnessRpgV5Badges",
    settings: "fitnessRpgV5Settings"
  },

  // ------------------------------------------------------------
  // Rangs RPG
  // ------------------------------------------------------------
  ranks: [
    { min: 1, max: 4, title: "Novice" },
    { min: 5, max: 9, title: "Aventurier" },
    { min: 10, max: 14, title: "Champion" },
    { min: 15, max: 19, title: "Légende" },
    { min: 20, max: 999, title: "Héros mythique" }
  ],

  // ------------------------------------------------------------
  // Courbe XP V5
  // Niveau 2 : 100 XP total
  // Niveau 3 : 300 XP total
  // Niveau 4 : 600 XP total
  // Niveau 5 : 1000 XP total
  // ------------------------------------------------------------
  xpCurve: {
    type: "triangular",
    description: "Chaque niveau demande niveau courant × 100 XP.",
    examples: [
      { level: 2, totalXp: 100 },
      { level: 3, totalXp: 300 },
      { level: 4, totalXp: 600 },
      { level: 5, totalXp: 1000 },
      { level: 6, totalXp: 1500 }
    ]
  },

  // ------------------------------------------------------------
  // Règles XP générales
  // ------------------------------------------------------------
  xpRules: {
    shortSession: 20,
    normalSession: 40,
    hardSession: 60,
    walk: 10,
    weeklyBoss: 50,
    threeDayStreakBonus: 30,
    completeWeekBonus: 100
  },

  // ------------------------------------------------------------
  // Objectifs personnels
  // ------------------------------------------------------------
  goals: [
    {
      id: "perte-poids",
      icon: "⚖️",
      title: "Perte de poids",
      rhythm: "4 à 5 séances douces par semaine",
      recommendedProgramId: "marche-aventurier"
    },
    {
      id: "reprise-douce",
      icon: "🌅",
      title: "Reprise douce",
      rhythm: "3 séances courtes par semaine",
      recommendedProgramId: "eveil-heros"
    },
    {
      id: "cardio",
      icon: "❤️‍🔥",
      title: "Cardio",
      rhythm: "3 séances cardio progressives",
      recommendedProgramId: "coeur-dragon"
    },
    {
      id: "renforcement",
      icon: "⚒️",
      title: "Renforcement",
      rhythm: "3 séances de force par semaine",
      recommendedProgramId: "forge-guerrier"
    },
    {
      id: "regularite",
      icon: "📅",
      title: "Régularité",
      rhythm: "Bouger souvent, sans pression",
      recommendedProgramId: "marche-aventurier"
    },
    {
      id: "mobilite",
      icon: "🧙",
      title: "Mobilité / récupération",
      rhythm: "2 à 4 séances légères",
      recommendedProgramId: "tour-mage"
    }
  ],

  // ------------------------------------------------------------
  // Programmes principaux
  // ------------------------------------------------------------
  programs: [
    {
      id: "eveil-heros",
      icon: "🌅",
      title: "Éveil du héros",
      objective: "Reprise douce",
      level: "Débutant",
      duration: "10-15 min",
      frequency: "3 séances par semaine",
      coachAdvice: "Violette ou Elmin",
      xp: 20
    },
    {
      id: "coeur-dragon",
      icon: "❤️‍🔥",
      title: "Cœur de dragon",
      objective: "Cardio léger",
      level: "Débutant/intermédiaire",
      duration: "15-25 min",
      frequency: "3 séances par semaine",
      coachAdvice: "Korvan ou Xara",
      xp: 40
    },
    {
      id: "forge-guerrier",
      icon: "⚒️",
      title: "Forge du guerrier",
      objective: "Renforcement complet",
      level: "Tous niveaux",
      duration: "20-30 min",
      frequency: "3 séances par semaine",
      coachAdvice: "Bazul ou Xara",
      xp: 40
    },
    {
      id: "tour-mage",
      icon: "🧙",
      title: "Tour de mage",
      objective: "Mobilité + gainage",
      level: "Débutant",
      duration: "10-20 min",
      frequency: "2 à 4 séances par semaine",
      coachAdvice: "Elmin ou Satyne",
      xp: 20
    },
    {
      id: "marche-aventurier",
      icon: "🥾",
      title: "Marche de l’aventurier",
      objective: "Endurance douce",
      level: "Tous niveaux",
      duration: "20-45 min",
      frequency: "4 à 6 fois par semaine",
      coachAdvice: "Violette, Korvan ou Elmin",
      xp: 10
    },
    {
      id: "boss-hebdo",
      icon: "👹",
      title: "Défi boss hebdo",
      objective: "Séance plus longue",
      level: "Selon niveau",
      duration: "25-40 min",
      frequency: "1 fois par semaine",
      coachAdvice: "Selon le thème du boss",
      xp: 50
    }
  ],

  // ------------------------------------------------------------
  // Pages officielles V5
  // ------------------------------------------------------------
  pages: [
    "home",
    "hero-setup",
    "training",
    "programs",
    "exercises",
    "music",
    "badges",
    "journal",
    "weight"
  ]
};

// ============================================================
// Fonctions utilitaires globales de configuration
// ============================================================

window.FitnessRpgConfig.getRankTitle = function getRankTitle(level) {
  const safeLevel = Math.max(1, Number(level) || 1);

  const rank = window.FitnessRpgConfig.ranks.find((item) => {
    return safeLevel >= item.min && safeLevel <= item.max;
  });

  return rank ? rank.title : "Novice";
};

window.FitnessRpgConfig.xpNeededForLevel = function xpNeededForLevel(level) {
  return Math.max(1, Number(level) || 1) * 100;
};

window.FitnessRpgConfig.totalXpForLevel = function totalXpForLevel(level) {
  const targetLevel = Math.max(1, Number(level) || 1);
  return ((targetLevel - 1) * targetLevel / 2) * 100;
};

window.FitnessRpgConfig.levelInfo = function levelInfo(totalXp) {
  const xp = Math.max(0, Number(totalXp) || 0);

  let level = 1;

  while (xp >= window.FitnessRpgConfig.totalXpForLevel(level + 1)) {
    level += 1;
  }

  const currentLevelStart = window.FitnessRpgConfig.totalXpForLevel(level);
  const nextLevelTotal = window.FitnessRpgConfig.totalXpForLevel(level + 1);

  return {
    level,
    rank: window.FitnessRpgConfig.getRankTitle(level),
    currentXp: xp - currentLevelStart,
    nextXp: nextLevelTotal - currentLevelStart,
    currentLevelStart,
    nextLevelTotal,
    totalXp: xp
  };
};

window.FitnessRpgConfig.getProgramById = function getProgramById(programId) {
  return window.FitnessRpgConfig.programs.find((program) => program.id === programId) || null;
};

window.FitnessRpgConfig.getGoalById = function getGoalById(goalId) {
  return window.FitnessRpgConfig.goals.find((goal) => goal.id === goalId) || null;
};

window.FitnessRpgConfig.getRecommendedProgramForGoal = function getRecommendedProgramForGoal(goalId) {
  const goal = window.FitnessRpgConfig.getGoalById(goalId);

  if (!goal) {
    return window.FitnessRpgConfig.getProgramById("eveil-heros");
  }

  return window.FitnessRpgConfig.getProgramById(goal.recommendedProgramId);
};

window.FitnessRpgConfig.setVersionLabels = function setVersionLabels() {
  const version = window.FitnessRpgConfig.version;
  const displayVersion = window.FitnessRpgConfig.displayVersion;

  document.title = `Fitness RPG - ${displayVersion}`;

  const versionLabel = document.querySelector("#appVersionLabel");
  if (versionLabel) versionLabel.textContent = version;

  const versionBadge = document.querySelector("#appVersionBadge");
  if (versionBadge) versionBadge.textContent = `Fitness RPG · ${displayVersion}`;
};
