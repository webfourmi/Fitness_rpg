// V4 - Configuration centrale de Fitness RPG.
// Ce fichier sert de source commune pour les prochaines évolutions.
window.FitnessRpgConfig = {
  version: "0.4.3",
  displayVersion: "V4.3",

  storageKeys: {
    profile: "sportRpgV1Profile",
    weights: "sportRpgV1Weights",
    today: "sportRpgV1TodayDone",
    badges: "sportRpgV1RpgBadges",
    lastLevel: "sportRpgV1LastSeenLevel",
    personalGoal: "sportRpgV1PersonalGoal",
    centralRewards: "sportRpgV41Rewards",
    navigationState: "sportRpgV42NavigationState"
  },

  ranks: [
    { min: 1, max: 4, title: "Novice" },
    { min: 5, max: 9, title: "Aventurier" },
    { min: 10, max: 14, title: "Champion" },
    { min: 15, max: 19, title: "Légende" },
    { min: 20, max: 999, title: "Héros mythique" }
  ],

  xpRules: {
    shortSession: 20,
    normalSession: 40,
    hardSession: 60,
    walk: 10,
    weeklyBoss: 50,
    threeDayStreakBonus: 30,
    completeWeekBonus: 100
  },

  programXp: {
    "Éveil du héros": 20,
    "Cœur de dragon": 40,
    "Forge du guerrier": 40,
    "Tour de mage": 20,
    "Marche de l’aventurier": 10,
    "Défi boss hebdo": 50,
    "Repos actif": 5
  },

  programs: [
    { id: "eveil-heros", icon: "🌅", title: "Éveil du héros", objective: "Reprise douce", level: "Débutant", duration: "10-15 min", xp: 20 },
    { id: "coeur-dragon", icon: "❤️‍🔥", title: "Cœur de dragon", objective: "Cardio léger", level: "Débutant/intermédiaire", duration: "15-25 min", xp: 40 },
    { id: "forge-guerrier", icon: "⚒️", title: "Forge du guerrier", objective: "Renforcement complet", level: "Tous niveaux", duration: "20-30 min", xp: 40 },
    { id: "tour-mage", icon: "🧙", title: "Tour de mage", objective: "Mobilité + gainage", level: "Débutant", duration: "10-20 min", xp: 20 },
    { id: "marche-aventurier", icon: "🥾", title: "Marche de l’aventurier", objective: "Endurance douce", level: "Tous niveaux", duration: "20-45 min", xp: 10 },
    { id: "boss-hebdo", icon: "👹", title: "Défi boss hebdo", objective: "Séance plus longue", level: "Selon niveau", duration: "25-40 min", xp: 50 }
  ],

  goals: [
    { id: "perte-poids", icon: "⚖️", title: "Perte de poids", rhythm: "4 à 5 séances douces par semaine" },
    { id: "reprise-douce", icon: "🌅", title: "Reprise douce", rhythm: "3 séances courtes par semaine" },
    { id: "cardio", icon: "❤️‍🔥", title: "Cardio", rhythm: "3 séances cardio progressives" },
    { id: "renforcement", icon: "⚒️", title: "Renforcement", rhythm: "3 séances de force par semaine" },
    { id: "regularite", icon: "📅", title: "Régularité", rhythm: "Bouger souvent, sans pression" },
    { id: "mobilite", icon: "🧙", title: "Mobilité / récupération", rhythm: "2 à 4 séances légères" }
  ],

  pages: [
    "dashboard",
    "music",
    "quests",
    "programs",
    "badges",
    "week",
    "journal",
    "weight",
    "today",
    "profile"
  ]
};

window.FitnessRpgConfig.getRankTitle = function getRankTitle(level) {
  const safeLevel = Math.max(1, Number(level) || 1);
  const rank = window.FitnessRpgConfig.ranks.find((item) => safeLevel >= item.min && safeLevel <= item.max);
  return rank ? rank.title : "Novice";
};

window.FitnessRpgConfig.setVersionLabels = function setVersionLabels() {
  const version = window.FitnessRpgConfig.version;
  const display = window.FitnessRpgConfig.displayVersion;
  document.title = `Fitness RPG - ${display}`;
  document.querySelectorAll("#appVersionLabel, #appVersionLabelEditor").forEach((node) => {
    node.textContent = version;
  });
  const header = document.querySelector(".hero-header .eyebrow");
  if (header) header.textContent = `Fitness RPG · ${display}`;
};