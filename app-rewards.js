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
      image: "assets/familiers/familier_01.png"
    },
    {
      id: "familier-02",
      name: "Chaton des Ombres",
      image: "assets/familiers/familier_02.png"
    },
    {
      id: "familier-03",
      name: "Diablotin Farceur",
      image: "assets/familiers/familier_03.png"
    },
    {
      id: "familier-04",
      name: "Chiot Gardien",
      image: "assets/familiers/familier_04.png"
    },
    {
      id: "familier-05",
      name: "Familier 5",
      image: "assets/familiers/familier_05.png"
    },
    {
      id: "familier-06",
      name: "Familier 6",
      image: "assets/familiers/familier_06.png"
    },
    {
      id: "familier-07",
      name: "Familier 7",
      image: "assets/familiers/familier_07.png"
    },
    {
      id: "familier-08",
      name: "Familier 8",
      image: "assets/familiers/familier_08.png"
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
  const unlocked = window.FitnessRpgRewards.readJson(key, []);

  if (!Array.isArray(unlocked)) return [];

  return [...new Set(unlocked.filter(Boolean))];
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
