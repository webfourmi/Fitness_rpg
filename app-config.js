// ============================================================
// Fitness RPG - app-config.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - définir la version officielle de l’application ;
// - centraliser les clés localStorage ;
// - centraliser les règles XP  ;
// - centraliser les rangs RPG ;
// - centraliser les objectifs et les programmes principaux.
//
// Règle importante :
// aucun autre fichier JS ne doit définir une version en dur.
// ============================================================

window.FitnessRpgConfig = {
  // Version technique utilisée dans les petits labels.
  version: "0.5.3",

  // Version lisible affichée dans le header et l’onglet.
  displayVersion: "V5.3",

  // Version utilisée pour le cache des fichiers CSS/JS dans index.html.
  assetVersion: "5.3",

  // ------------------------------------------------------------
  // Clés de sauvegarde locale
  // ------------------------------------------------------------
  storageKeys: {
    profile: "fitnessRpgV5Profile",
    journal: "fitnessRpgV5Journal",
    weights: "fitnessRpgV5Weights",
    today: "fitnessRpgV5Today",
    badges: "fitnessRpgV5Badges",
    settings: "fitnessRpgV5Settings",
    familiars: "fitness_rpg_familiars",
    lastChestReward: "fitness_rpg_last_chest_reward",
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
    weeklyThreeSessionsBonus: 40,
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
      recommendedProgramId: "marche-aventurier",
      programProgression: [
          "marche-aventurier",
          "eveil-heros",
          "coeur-dragon"
      ]
    },
    {
      id: "reprise-douce",
      icon: "🌅",
      title: "Reprise douce",
      rhythm: "3 séances courtes par semaine",
      recommendedProgramId: "eveil-heros",
      programProgression: [
        "eveil-heros",
        "tour-mage",
        "marche-aventurier"
      ]
    },
    {
      id: "cardio",
      icon: "❤️‍🔥",
      title: "Cardio",
      rhythm: "3 séances cardio progressives",
      recommendedProgramId: "cavalier-route",
      programProgression: [
        "cavalier-route",
        "coeur-dragon",
        "marche-aventurier"
      ]
    },
    {
      id: "renforcement",
      icon: "⚒️",
      title: "Renforcement",
      rhythm: "3 séances de force par semaine",
      recommendedProgramId: "forge-guerrier",
      programProgression: [
        "forge-guerrier",
        "bras-heros",
        "rempart-heros"
      ]
        
    },
    {
      id: "regularite",
      icon: "📅",
      title: "Régularité",
      rhythm: "Bouger souvent, sans pression",
      recommendedProgramId: "marche-aventurier",
       programProgression: [
        "marche-aventurier",
        "eveil-heros",
        "tour-mage"
      ]
    },
    {
      id: "mobilite",
      icon: "🧙",
      title: "Mobilité / récupération",
      rhythm: "2 à 4 séances légères",
      recommendedProgramId: "tour-mage",
       programProgression: [
        "tour-mage",
        "rempart-heros",
        "eveil-heros"
      ]
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
    objective: "Reprise douce · débutant complet",
    level: "Niveau 1 · Débutant complet",
    tier: "beginner",
    unlockLevel: 1,
    duration: "15-30 min",
    frequency: "3 séances par semaine · 4 semaines",
    coachAdvice: "Violette ou Elmin",
    xp: 50,
    reward: {
      badgeId: "heros-eveille",
      title: "Héros Éveillé",
      chest: true,
      nextPrograms: ["forge-guerrier", "marche-aventurier"]
    }
  },
    {
      id: "coeur-dragon",
      icon: "❤️‍🔥",
      title: "Cœur de dragon",
      objective: "Cardio progressif sans impact violent",
      level: "Après Éveil du héros",
      tier: "intermediate",
      unlockLevel: 2,
      duration: "20-35 min",
      frequency: "3 séances par semaine · boss le samedi",
      coachAdvice: "Korvan ou Xara",
      weeklySlots: [0, 2, 4],
      xp: 60,
      reward: {
        badgeId: "coeur-dragon",
        title: "Cœur de Dragon",
        chest: true,
        nextPrograms: ["messager-sentiers", "cavalier-route", "forge-guerrier"]
      }
},
    {
      id: "cavalier-route",
      icon: "🚴‍♂️",
      title: "Cavalier de la route",
      objective: "Préparation sportive pour vélo",
      level: "Débutant à intermédiaire",
      tier: "intermediate",
      duration: "20-35 min",
      frequency: "3 fois par semaine",
      coachAdvice: "Korvan, Xara ou Bazul",
      xp: 40
    },
    {
    id: "champion-arenes",
    icon: "🏟️",
    title: "Champion des Arènes",
    objective: "Programme avancé : force, musculation, kettlebell et sac de frappe",
    level: "Avancé",
    tier: "advanced",  
    duration: "45-75 min",
    frequency: "3 séances par semaine + boss hebdomadaire",
    coachAdvice: "Korvan, Xara ou Bazul",
    xp: 90
  },
    {
      id: "forge-guerrier",
      icon: "⚒️",
      title: "Forge du guerrier",
      objective: "Renforcement complet sans matériel : jambes, bras, dos, gainage et posture",
      level: "Débutant à intermédiaire",
      tier: "intermediate",
      duration: "20-25 min",
      frequency: "3 séances par semaine + boss hebdomadaire",
      coachAdvice: "Bazul ou Xara",
      xp: 60
    },
    {
      id: "rempart-heros",
      icon: "🛡️",
      title: "Rempart du héros",
      objective: "Abdos, gainage, posture et stabilité",
      level: "Débutant à intermédiaire",
      tier: "intermediate",
      duration: "10-20 min",
      frequency: "3 fois par semaine",
      coachAdvice: "Xara, Bazul ou Satyne",
      xp: 35
    },
    {
      id: "bras-heros",
      icon: "💪",
      title: "Bras du héros",
      objective: "Bras, épaules, posture et tonus du haut du corps",
      level: "Débutant à intermédiaire",
      tier: "intermediate",
      duration: "15-25 min",
      frequency: "3 fois par semaine",
      coachAdvice: "Xara, Bazul ou Korvan",
      xp: 35
    },
    {
   
      id: "tour-mage",
      icon: "🧘",
      title: "Tour du Mage",
      objective: "Pilates : centre du corps, posture, mobilité, équilibre et prévention du mal de dos",
      level: "Débutant à intermédiaire",
      tier: "intermediate",
      duration: "20 min",
      frequency: "3 séances par semaine + boss hebdomadaire",
      coachAdvice: "Elmin ou Satyne",
      xp: 60
    },
    {
      id: "marche-aventurier",
      icon: "🥾",
      title: "Marche de l’aventurier",
      objective: "Endurance douce",
      level: "Tous niveaux",
      tier: "beginner",
      duration: "20-45 min",
      frequency: "3 fois par semaine",
      coachAdvice: "Violette, Korvan ou Elmin",
      xp: 10
    },
   
  ],

  // ------------------------------------------------------------
  // Pages officielles V5
  // ------------------------------------------------------------
  pages: [
    "home",
    "hero-setup",
    "hero-menu",
    "training",
    "programs",
    "exercises",
    "music",
    "badges",
    "journal",
    "weight",
    "goal",
    "planning",
    "progression",
    "familiars"

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

window.FitnessRpgConfig.programTierLabels = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé"
};

window.FitnessRpgConfig.getProgramTier = function getProgramTier(program) {
  if (program?.tier) return program.tier;

  const text = `${program?.level || ""} ${program?.objective || ""}`.toLowerCase();

  if (text.includes("avancé")) return "advanced";
  if (text.includes("intermédiaire")) return "intermediate";

  return "beginner";
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
 if (versionBadge) versionBadge.textContent = "Fitness RPG";
};
