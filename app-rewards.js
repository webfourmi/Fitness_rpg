// ============================================================
// Fitness RPG - app-rewards.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - gérer les récompenses de coffre ;
// - gérer la collection de familiers ;
// - tirer un familier aléatoire ;
// - sauvegarder les familiers obtenus.
//
// Règle importante :
// ce fichier ne modifie jamais le DOM.
// Il ne fait aucun rendu HTML.
// ============================================================

window.FitnessRpgRewards = window.FitnessRpgRewards || {};

// ============================================================
// Clés localStorage
// ============================================================

window.FitnessRpgRewards.getStorageKey = function getStorageKey(keyName, fallback) {
  return window.FitnessRpgConfig?.storageKeys?.[keyName] || fallback;
};

window.FitnessRpgRewards.getFamiliarsStorageKey = function getFamiliarsStorageKey() {
  return window.FitnessRpgRewards.getStorageKey(
    "familiars",
    "fitnessRpgV5Familiars"
  );
};

window.FitnessRpgRewards.getLastChestRewardStorageKey = function getLastChestRewardStorageKey() {
  return window.FitnessRpgRewards.getStorageKey(
    "lastChestReward",
    "fitnessRpgV5LastChestReward"
  );
};

// ============================================================
// Lecture / écriture JSON
// ============================================================

window.FitnessRpgRewards.readJson = function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.warn("Fitness RPG Rewards - lecture JSON impossible :", error);
    return fallback;
  }
};

window.FitnessRpgRewards.writeJson = function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn("Fitness RPG Rewards - sauvegarde JSON impossible :", error);
    return false;
  }
};

// ============================================================
// Familiers disponibles
// ============================================================

window.FitnessRpgRewards.getRewardFamiliars = function getRewardFamiliars() {
  const familiars = window.FitnessRpgData?.rewardFamiliars;

  if (Array.isArray(familiars) && familiars.length > 0) {
    return familiars.filter((familiar) => {
      return familiar && familiar.id && familiar.name && familiar.image;
    });
  }

  // Secours si rewardFamiliars n’est pas encore dans app-data.js.
  return [
    {
      id: "familier-01",
      name: "Dragonnet de Braise",
      image: "assets/familiers/familier_grenouille.webp"
    },
    {
      id: "familier-02",
      name: "Chaton des Ombres",
      image: "assets/familiers/familier_hibou.webp"
    },
    {
      id: "familier-03",
      name: "Diablotin Farceur",
      image: "assets/familiers/familier_renard.webp"
    },
    {
      id: "familier-04",
      name: "Chiot Gardien",
      image: "assets/familiers/familier_corbeau.webp"
    },
    {
      id: "familier-05",
      name: "Familier 5",
      image: "assets/familiers/familier_chien.webp"
    },
    {
      id: "familier-06",
      name: "Familier 6",
      image: "assets/familiers/familier_chat.webp"
    },
    {
      id: "familier-07",
      name: "Familier 7",
      image: "assets/familiers/familier_diablotin.webp"
    },
    {
      id: "familier-08",
      name: "Familier 8",
      image: "assets/familiers/familier_dragon.webp"
    }
  ];
};

window.FitnessRpgRewards.getFamiliarById = function getFamiliarById(familiarId) {
  if (!familiarId) return null;

  return window.FitnessRpgRewards.getRewardFamiliars().find((familiar) => {
    return familiar.id === familiarId;
  }) || null;
};

// ============================================================
// Collection du joueur
// ============================================================

window.FitnessRpgRewards.getUnlockedFamiliarIds = function getUnlockedFamiliarIds() {
  const key = window.FitnessRpgRewards.getFamiliarsStorageKey();
  const stored = window.FitnessRpgRewards.readJson(key, []);

  const storedIds = Array.isArray(stored)
    ? stored.filter(Boolean)
    : [];

  const profile = window.FitnessRpgState?.getProfile?.();

  const profileIds = Array.isArray(profile?.familiars)
    ? profile.familiars
        .map((item) => {
          return typeof item === "string" ? item : item?.id;
        })
        .filter(Boolean)
    : [];

  const mergedIds = [...new Set([...storedIds, ...profileIds])];

  if (mergedIds.length !== storedIds.length) {
    window.FitnessRpgRewards.saveUnlockedFamiliarIds(mergedIds);
  }

  return mergedIds;
};

window.FitnessRpgRewards.saveUnlockedFamiliarIds = function saveUnlockedFamiliarIds(familiarIds) {
  const key = window.FitnessRpgRewards.getFamiliarsStorageKey();
  const cleanIds = [...new Set((familiarIds || []).filter(Boolean))];

  window.FitnessRpgRewards.writeJson(key, cleanIds);

  return cleanIds;
};

window.FitnessRpgRewards.hasFamiliar = function hasFamiliar(familiarId) {
  return window.FitnessRpgRewards.getUnlockedFamiliarIds().includes(familiarId);
};

window.FitnessRpgRewards.unlockFamiliar = function unlockFamiliar(familiarId) {
  if (!familiarId) {
    return {
      unlocked: false,
      alreadyOwned: false,
      familiar: null
    };
  }

  const familiar = window.FitnessRpgRewards.getFamiliarById(familiarId);

  if (!familiar) {
    return {
      unlocked: false,
      alreadyOwned: false,
      familiar: null
    };
  }

  const unlockedIds = window.FitnessRpgRewards.getUnlockedFamiliarIds();

  if (unlockedIds.includes(familiarId)) {
    return {
      unlocked: false,
      alreadyOwned: true,
      familiar
    };
  }

  unlockedIds.push(familiarId);
  window.FitnessRpgRewards.saveUnlockedFamiliarIds(unlockedIds);

  return {
    unlocked: true,
    alreadyOwned: false,
    familiar
  };
};

window.FitnessRpgRewards.getUnlockedFamiliars = function getUnlockedFamiliars() {
  const unlockedIds = window.FitnessRpgRewards.getUnlockedFamiliarIds();

  return unlockedIds
    .map((id) => window.FitnessRpgRewards.getFamiliarById(id))
    .filter(Boolean);
};

window.FitnessRpgRewards.getCollectionProgress = function getCollectionProgress() {
  const total = window.FitnessRpgRewards.getRewardFamiliars().length;
  const unlocked = window.FitnessRpgRewards.getUnlockedFamiliarIds().length;

  return {
    unlocked,
    total,
    complete: total > 0 && unlocked >= total
  };
};

// ============================================================
// V6.5 - Familier actif et Affinité
// ============================================================

window.FitnessRpgRewards.familiarAffinityThresholds = Object.freeze([0, 20, 50, 100]);

window.FitnessRpgRewards.ensureFamiliarProfileData = function ensureFamiliarProfileData() {
  const profile = window.FitnessRpgState?.getProfile?.();
  if (!profile) return null;

  let changed = false;

  if (!profile.familiarAffinity || typeof profile.familiarAffinity !== "object") {
    profile.familiarAffinity = {};
    changed = true;
  }

  if (!Array.isArray(profile.familiarAffinityHistory)) {
    profile.familiarAffinityHistory = [];
    changed = true;
  }

  const unlockedIds = window.FitnessRpgRewards.getUnlockedFamiliarIds();
  if (profile.activeFamiliarId && !unlockedIds.includes(profile.activeFamiliarId)) {
    profile.activeFamiliarId = null;
    changed = true;
  }

  // À la migration, le premier familier déjà obtenu devient le compagnon actif.
  if (!profile.activeFamiliarId && unlockedIds.length) {
    profile.activeFamiliarId = unlockedIds[0];
    changed = true;
  }

  if (changed) window.FitnessRpgState?.saveProfile?.();
  return profile;
};

window.FitnessRpgRewards.getActiveFamiliarId = function getActiveFamiliarId() {
  const profile = window.FitnessRpgRewards.ensureFamiliarProfileData();
  return profile?.activeFamiliarId || null;
};

window.FitnessRpgRewards.getActiveFamiliar = function getActiveFamiliar() {
  const familiarId = window.FitnessRpgRewards.getActiveFamiliarId();
  return familiarId ? window.FitnessRpgRewards.getFamiliarById(familiarId) : null;
};

window.FitnessRpgRewards.setActiveFamiliar = function setActiveFamiliar(familiarId) {
  if (!window.FitnessRpgRewards.hasFamiliar(familiarId)) return null;

  const profile = window.FitnessRpgRewards.ensureFamiliarProfileData();
  if (!profile) return null;

  profile.activeFamiliarId = familiarId;
  window.FitnessRpgState?.saveProfile?.();
  return window.FitnessRpgRewards.getFamiliarById(familiarId);
};

window.FitnessRpgRewards.getFamiliarAffinity = function getFamiliarAffinity(familiarId) {
  const profile = window.FitnessRpgRewards.ensureFamiliarProfileData();
  if (!profile || !familiarId) return 0;

  const raw = profile.familiarAffinity?.[familiarId];
  const value = typeof raw === "object" ? Number(raw.points) : Number(raw);
  return Number.isFinite(value) && value > 0 ? Math.round(value) : 0;
};

window.FitnessRpgRewards.getFamiliarLevelInfo = function getFamiliarLevelInfo(familiarId) {
  const points = window.FitnessRpgRewards.getFamiliarAffinity(familiarId);
  const thresholds = window.FitnessRpgRewards.familiarAffinityThresholds;
  let level = 1;

  thresholds.forEach((threshold, index) => {
    if (points >= threshold) level = index + 1;
  });

  const maxLevel = thresholds.length;
  const currentThreshold = thresholds[level - 1] || 0;
  const nextThreshold = level < maxLevel ? thresholds[level] : null;
  const span = nextThreshold === null ? 1 : Math.max(1, nextThreshold - currentThreshold);
  const progress = nextThreshold === null
    ? 100
    : Math.max(0, Math.min(100, Math.round(((points - currentThreshold) / span) * 100)));

  const titles = ["Compagnon", "Complice", "Fidèle", "Inséparable"];

  return {
    level,
    maxLevel,
    title: titles[level - 1] || titles[0],
    points,
    currentThreshold,
    nextThreshold,
    progress,
    remaining: nextThreshold === null ? 0 : Math.max(0, nextThreshold - points)
  };
};

window.FitnessRpgRewards.getFamiliarDescription = function getFamiliarDescription(familiar) {
  if (!familiar) return "Compagnon de route du héros.";

  const species = {
    "familier-01": "grenouille runique",
    "familier-02": "hibou des veilles",
    "familier-03": "renard de braise",
    "familier-04": "corbeau nocturne",
    "familier-05": "chien gardien",
    "familier-06": "chat des ombres",
    "familier-07": "diablotin",
    "familier-08": "dragonnet",
    "familier-09": "axolotl lunaire",
    "familier-10": "capybara placide",
    "familier-11": "cerf sylvestre",
    "familier-12": "chauve-souris crépusculaire",
    "familier-13": "chèvre des sommets",
    "familier-14": "chien des grands vents",
    "familier-15": "crocodile cuirassé",
    "familier-16": "écureuil vif",
    "familier-17": "hérisson de lune",
    "familier-18": "hippogriffe",
    "familier-19": "koala rêveur",
    "familier-20": "lapin bondissant",
    "familier-21": "licorne astrale",
    "familier-22": "loutre argentée",
    "familier-23": "mouton des nuages",
    "familier-24": "panda tranquille",
    "familier-25": "panda roux agile",
    "familier-26": "pégase",
    "familier-27": "phénix",
    "familier-28": "phoque des eaux claires",
    "familier-29": "raton laveur masqué",
    "familier-30": "souris d'alchimiste",
    "familier-31": "tortue azurée"
  };

  const kind = species[familiar.id] || "compagnon fantastique";
  return `${familiar.name} est un ${kind}. Son Affinité grandit en t’accompagnant pendant les séances et les Boss.`;
};

window.FitnessRpgRewards.addFamiliarAffinity = function addFamiliarAffinity(amount, reason = "session", sourceSessionId = null) {
  const profile = window.FitnessRpgRewards.ensureFamiliarProfileData();
  const familiar = window.FitnessRpgRewards.getActiveFamiliar();
  const gain = Math.max(0, Math.round(Number(amount) || 0));

  if (!profile || !familiar || !gain) return null;

  if (!Array.isArray(profile.familiarAffinityHistory)) {
    profile.familiarAffinityHistory = [];
  }

  if (sourceSessionId && profile.familiarAffinityHistory.some((item) => item?.sourceSessionId === sourceSessionId)) {
    return null;
  }

  const before = window.FitnessRpgRewards.getFamiliarLevelInfo(familiar.id);
  const previous = window.FitnessRpgRewards.getFamiliarAffinity(familiar.id);
  profile.familiarAffinity[familiar.id] = previous + gain;

  const after = window.FitnessRpgRewards.getFamiliarLevelInfo(familiar.id);
  profile.familiarAffinityHistory.push({
    familiarId: familiar.id,
    amount: gain,
    reason,
    sourceSessionId: sourceSessionId || null,
    at: window.FitnessRpgState?.nowIso?.() || new Date().toISOString()
  });
  profile.familiarAffinityHistory = profile.familiarAffinityHistory.slice(-80);
  window.FitnessRpgState?.saveProfile?.();

  return {
    familiar,
    gain,
    reason,
    before,
    after,
    leveledUp: after.level > before.level
  };
};

// ============================================================
// Tirage de coffre
// ============================================================

window.FitnessRpgRewards.pickRandomItem = function pickRandomItem(items) {
  if (!Array.isArray(items) || items.length === 0) return null;

  const index = Math.floor(Math.random() * items.length);
  return items[index] || null;
};

window.FitnessRpgRewards.drawChestFamiliarReward = function drawChestFamiliarReward() {
  const allFamiliars = window.FitnessRpgRewards.getRewardFamiliars();

  if (!allFamiliars.length) {
    return {
      success: false,
      reason: "NO_FAMILIARS",
      familiar: null,
      isNew: false,
      alreadyOwned: false,
      unlockedCount: 0,
      totalCount: 0,
      collectionComplete: false
    };
  }

  const unlockedIds = window.FitnessRpgRewards.getUnlockedFamiliarIds();

  const notOwned = allFamiliars.filter((familiar) => {
    return !unlockedIds.includes(familiar.id);
  });

  // Tant qu’il reste des familiers non obtenus, le coffre privilégie un nouveau familier.
  // Quand la collection est complète, il tire dans toute la liste.
  const pool = notOwned.length > 0 ? notOwned : allFamiliars;
  const familiar = window.FitnessRpgRewards.pickRandomItem(pool);

  if (!familiar) {
    return {
      success: false,
      reason: "DRAW_FAILED",
      familiar: null,
      isNew: false,
      alreadyOwned: false,
      unlockedCount: unlockedIds.length,
      totalCount: allFamiliars.length,
      collectionComplete: unlockedIds.length >= allFamiliars.length
    };
  }

  const alreadyOwned = unlockedIds.includes(familiar.id);
  const isNew = !alreadyOwned;

  if (isNew) {
    unlockedIds.push(familiar.id);
    window.FitnessRpgRewards.saveUnlockedFamiliarIds(unlockedIds);
  }

  const progress = window.FitnessRpgRewards.getCollectionProgress();

  const reward = {
    success: true,
    type: "familiar",
    familiar,
    familiarId: familiar.id,
    isNew,
    alreadyOwned,
    unlockedCount: progress.unlocked,
    totalCount: progress.total,
    collectionComplete: progress.complete,
    createdAt: new Date().toISOString()
  };

  window.FitnessRpgRewards.saveLastChestReward(reward);

  return reward;
};

// ============================================================
// Dernière récompense de coffre
// ============================================================

window.FitnessRpgRewards.saveLastChestReward = function saveLastChestReward(reward) {
  const key = window.FitnessRpgRewards.getLastChestRewardStorageKey();

  if (!reward) {
    localStorage.removeItem(key);
    return null;
  }

  window.FitnessRpgRewards.writeJson(key, reward);

  return reward;
};

window.FitnessRpgRewards.getLastChestReward = function getLastChestReward() {
  const key = window.FitnessRpgRewards.getLastChestRewardStorageKey();
  const reward = window.FitnessRpgRewards.readJson(key, null);

  if (!reward || !reward.familiarId) return reward;

  const familiar = window.FitnessRpgRewards.getFamiliarById(reward.familiarId);

  return {
    ...reward,
    familiar: familiar || reward.familiar || null
  };
};

window.FitnessRpgRewards.clearLastChestReward = function clearLastChestReward() {
  const key = window.FitnessRpgRewards.getLastChestRewardStorageKey();
  localStorage.removeItem(key);
};

// ============================================================
// Messages prêts à afficher
// ============================================================

window.FitnessRpgRewards.getChestRewardMessage = function getChestRewardMessage(reward) {
  if (!reward || !reward.success || !reward.familiar) {
    return "Le coffre s’ouvre, mais il semble vide pour l’instant.";
  }

  const status = reward.isNew
    ? "Nouveau familier débloqué !"
    : "Familier déjà obtenu !";

  const collection = `Collection : ${reward.unlockedCount} / ${reward.totalCount}`;

  const complete = reward.collectionComplete
    ? "Collection complète !"
    : "";

  return [
    status,
    reward.familiar.name,
    collection,
    complete
  ].filter(Boolean).join("\n");
};

window.FitnessRpgRewards.buildChestRewardPayload = function buildChestRewardPayload(reward) {
  if (!reward || !reward.success || !reward.familiar) {
    return {
      icon: "🎁",
      title: "Coffre de récompense",
      message: "Le coffre s’ouvre, mais aucun familier n’est disponible.",
      reward: null
    };
  }

  return {
    icon: reward.isNew ? "✨" : "🔁",
    title: reward.isNew ? "Nouveau familier !" : "Familier déjà obtenu",
    message: window.FitnessRpgRewards.getChestRewardMessage(reward),
    reward
  };
};

// ============================================================
// Outils de debug
// ============================================================

window.FitnessRpgRewards.resetFamiliarsCollection = function resetFamiliarsCollection() {
  window.FitnessRpgRewards.saveUnlockedFamiliarIds([]);
  window.FitnessRpgRewards.clearLastChestReward();

  return {
    success: true,
    message: "Collection de familiers réinitialisée."
  };
};

window.FitnessRpgRewards.debugDrawFamiliar = function debugDrawFamiliar() {
  const reward = window.FitnessRpgRewards.drawChestFamiliarReward();
  console.log("Fitness RPG - Tirage familier :", reward);
  return reward;
};
