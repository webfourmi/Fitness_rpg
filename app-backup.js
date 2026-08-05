// ============================================================
// Fitness RPG - app-backup.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - exporter toutes les données locales appartenant à Fitness RPG ;
// - analyser et valider une sauvegarde avant restauration ;
// - afficher un aperçu lisible du fichier choisi ;
// - créer automatiquement une sauvegarde de sécurité avant import ;
// - restaurer les données de manière transactionnelle.
//
// Règle importante :
// aucune restauration ne remplace les données sans confirmation.
// ============================================================

window.FitnessRpgBackup = {
  schema: "fitness-rpg-backup",
  formatVersion: 1,
  maxFileSizeBytes: 8 * 1024 * 1024,
  pendingImport: null,
  importStatus: {
    type: "idle",
    message: "Choisis un fichier de sauvegarde Fitness RPG au format JSON."
  },
  isInitialized: false
};

// ============================================================
// Helpers généraux
// ============================================================

window.FitnessRpgBackup.escapeHtml = function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

window.FitnessRpgBackup.safeJsonParse = function safeJsonParse(raw, fallback = null) {
  if (typeof raw !== "string" || !raw.trim()) return fallback;

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

window.FitnessRpgBackup.isPlainObject = function isPlainObject(value) {
  return Boolean(
    value
    && typeof value === "object"
    && !Array.isArray(value)
  );
};

window.FitnessRpgBackup.formatDateTime = function formatDateTime(value) {
  if (!value) return "Date inconnue";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date inconnue";

  try {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(date);
  } catch {
    return date.toLocaleString("fr-FR");
  }
};

window.FitnessRpgBackup.formatFileSize = function formatFileSize(bytes) {
  const safeBytes = Math.max(0, Number(bytes) || 0);

  if (safeBytes < 1024) return `${safeBytes} octets`;
  if (safeBytes < 1024 * 1024) return `${(safeBytes / 1024).toFixed(1)} Ko`;

  return `${(safeBytes / (1024 * 1024)).toFixed(2)} Mo`;
};

window.FitnessRpgBackup.slugify = function slugify(value) {
  return String(value || "heros")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42) || "heros";
};

window.FitnessRpgBackup.fileTimestamp = function fileTimestamp(value = new Date()) {
  const date = new Date(value);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-") + "_" + [
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0")
  ].join("-");
};

// ============================================================
// Périmètre des données Fitness RPG
// ============================================================

window.FitnessRpgBackup.isOwnedStorageKey = function isOwnedStorageKey(key) {
  const safeKey = String(key || "");

  return safeKey.startsWith("fitnessRpg")
    || safeKey.startsWith("fitness_rpg_");
};

window.FitnessRpgBackup.collectRecords = function collectRecords() {
  const records = {};

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);

    if (!window.FitnessRpgBackup.isOwnedStorageKey(key)) continue;

    const value = localStorage.getItem(key);
    if (typeof value === "string") records[key] = value;
  }

  return Object.fromEntries(
    Object.entries(records).sort(([left], [right]) => left.localeCompare(right))
  );
};

window.FitnessRpgBackup.removeOwnedRecords = function removeOwnedRecords() {
  const keys = [];

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (window.FitnessRpgBackup.isOwnedStorageKey(key)) keys.push(key);
  }

  keys.forEach((key) => localStorage.removeItem(key));
};

window.FitnessRpgBackup.getKnownJsonKeys = function getKnownJsonKeys() {
  const storageKeys = window.FitnessRpgConfig?.storageKeys || {};

  return new Set([
    ...Object.values(storageKeys).filter(Boolean),
    "fitnessRpgV5WeeklyPlanningRewards"
  ]);
};

// ============================================================
// Résumé d'une sauvegarde
// ============================================================

window.FitnessRpgBackup.getProfileFromRecords = function getProfileFromRecords(records) {
  const profileKey = window.FitnessRpgConfig?.storageKeys?.profile || "fitnessRpgV5Profile";
  return window.FitnessRpgBackup.safeJsonParse(records?.[profileKey], null);
};

window.FitnessRpgBackup.countCompletedEntries = function countCompletedEntries(profile) {
  const completedByDate = window.FitnessRpgBackup.isPlainObject(profile?.completedByDate)
    ? profile.completedByDate
    : {};

  return Object.values(completedByDate).reduce((total, entries) => {
    return total + (Array.isArray(entries) ? entries.length : 0);
  }, 0);
};

window.FitnessRpgBackup.buildSummary = function buildSummary(records, backupMeta = {}) {
  const keys = window.FitnessRpgConfig?.storageKeys || {};
  const profile = window.FitnessRpgBackup.getProfileFromRecords(records) || {};
  const weights = window.FitnessRpgBackup.safeJsonParse(
    records?.[keys.weights || "fitnessRpgV5Weights"],
    []
  );
  const storedFamiliars = window.FitnessRpgBackup.safeJsonParse(
    records?.[keys.familiars || "fitness_rpg_familiars"],
    []
  );
  const activeProgramSession = window.FitnessRpgBackup.safeJsonParse(
    records?.[keys.activeProgramSession || "fitnessRpgV54ActiveProgramSession"],
    null
  );
  const activeTimer = window.FitnessRpgBackup.safeJsonParse(
    records?.[keys.activeTimer || "fitnessRpgV55ActiveTimer"],
    null
  );

  const profileFamiliars = Array.isArray(profile?.familiars)
    ? profile.familiars.map((item) => typeof item === "string" ? item : item?.id).filter(Boolean)
    : [];

  const familiarIds = [
    ...(Array.isArray(storedFamiliars) ? storedFamiliars : []),
    ...profileFamiliars
  ].filter(Boolean);

  const totalXp = Math.max(0, Number(profile?.totalXp) || 0);
  const levelInfo = window.FitnessRpgConfig?.levelInfo?.(totalXp) || {
    level: 1,
    rank: "Novice"
  };

  return {
    heroName: String(profile?.name || "Héros sans nom"),
    profileId: profile?.id || null,
    totalXp,
    level: Number(levelInfo.level) || 1,
    rank: levelInfo.rank || "Novice",
    streak: Math.max(0, Number(profile?.streak) || 0),
    entries: window.FitnessRpgBackup.countCompletedEntries(profile),
    journalEntries: Array.isArray(profile?.journal) ? profile.journal.length : 0,
    badges: Array.isArray(profile?.badges) ? profile.badges.length : 0,
    familiars: new Set(familiarIds).size,
    weights: Array.isArray(weights) ? weights.length : 0,
    activeProgramSession: Boolean(activeProgramSession?.programId),
    activeTimer: Boolean(activeTimer?.exerciseId),
    activeProgramId: profile?.activeProgramId || null,
    goalId: profile?.goalId || null,
    lastActiveDate: profile?.lastActiveDate || null,
    storageRecordCount: Object.keys(records || {}).length,
    exportedAt: backupMeta.exportedAt || null,
    appVersion: backupMeta.appVersion || window.FitnessRpgConfig?.displayVersion || "Version inconnue"
  };
};

// ============================================================
// Construction et téléchargement
// ============================================================

window.FitnessRpgBackup.buildBackup = function buildBackup(options = {}) {
  const records = options.records || window.FitnessRpgBackup.collectRecords();
  const exportedAt = new Date().toISOString();
  const appVersion = window.FitnessRpgConfig?.displayVersion || "Version inconnue";
  const summary = window.FitnessRpgBackup.buildSummary(records, {
    exportedAt,
    appVersion
  });

  return {
    schema: window.FitnessRpgBackup.schema,
    formatVersion: window.FitnessRpgBackup.formatVersion,
    appVersion,
    exportedAt,
    profile: {
      id: summary.profileId,
      name: summary.heroName,
      level: summary.level,
      rank: summary.rank,
      totalXp: summary.totalXp
    },
    stats: {
      entries: summary.entries,
      badges: summary.badges,
      familiars: summary.familiars,
      weights: summary.weights,
      activeProgramSession: summary.activeProgramSession,
      activeTimer: summary.activeTimer,
      storageRecordCount: summary.storageRecordCount
    },
    data: {
      records
    }
  };
};

window.FitnessRpgBackup.downloadJson = function downloadJson(backup, prefix = "sauvegarde") {
  const summary = window.FitnessRpgBackup.buildSummary(backup?.data?.records || {}, backup || {});
  const heroSlug = window.FitnessRpgBackup.slugify(summary.heroName);
  const filename = `fitness-rpg-${prefix}-${heroSlug}-${window.FitnessRpgBackup.fileTimestamp()}.json`;
  const content = `${JSON.stringify(backup, null, 2)}\n`;
  const blob = new Blob([content], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.hidden = true;

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 1200);

  return {
    filename,
    size: blob.size
  };
};

window.FitnessRpgBackup.exportCurrentBackup = function exportCurrentBackup() {
  const records = window.FitnessRpgBackup.collectRecords();
  const profile = window.FitnessRpgBackup.getProfileFromRecords(records);

  if (!profile) {
    window.FitnessRpgBackup.setImportStatus(
      "error",
      "Aucun héros n’est enregistré sur cet appareil. Tu peux néanmoins importer une sauvegarde."
    );
    return null;
  }

  const backup = window.FitnessRpgBackup.buildBackup({ records });
  const result = window.FitnessRpgBackup.downloadJson(backup, "sauvegarde");

  window.FitnessRpgBackup.setImportStatus(
    "success",
    `Sauvegarde créée : ${result.filename}`
  );

  return result;
};

// ============================================================
// Validation du fichier importé
// ============================================================

window.FitnessRpgBackup.validateProfile = function validateProfile(profile, errors) {
  if (!window.FitnessRpgBackup.isPlainObject(profile)) {
    errors.push("Le profil du héros est absent ou illisible.");
    return;
  }

  if (
    typeof profile.name !== "string"
    || !profile.name.trim()
    || profile.name.length > 100
    || /[<>\u0000-\u001f]/.test(profile.name)
  ) {
    errors.push("Le nom du héros est invalide.");
  }

  if (!Number.isFinite(Number(profile.totalXp || 0)) || Number(profile.totalXp || 0) < 0) {
    errors.push("La quantité d’XP du héros est invalide.");
  }

  if (profile.completedByDate !== undefined) {
    if (!window.FitnessRpgBackup.isPlainObject(profile.completedByDate)) {
      errors.push("L’historique des entraînements est invalide.");
    } else if (Object.values(profile.completedByDate).some((entries) => !Array.isArray(entries))) {
      errors.push("Une journée de l’historique des entraînements est invalide.");
    }
  }

  if (profile.journal !== undefined && !Array.isArray(profile.journal)) {
    errors.push("Le journal du héros est invalide.");
  }

  if (profile.badges !== undefined && !Array.isArray(profile.badges)) {
    errors.push("La collection de badges est invalide.");
  }
};

window.FitnessRpgBackup.validateBackupObject = function validateBackupObject(candidate) {
  const errors = [];

  if (!window.FitnessRpgBackup.isPlainObject(candidate)) {
    return {
      valid: false,
      errors: ["Le fichier ne contient pas une sauvegarde JSON valide."],
      records: {},
      summary: null
    };
  }

  if (candidate.schema !== window.FitnessRpgBackup.schema) {
    errors.push("Ce fichier n’est pas une sauvegarde Fitness RPG reconnue.");
  }

  if (Number(candidate.formatVersion) !== window.FitnessRpgBackup.formatVersion) {
    errors.push("Le format de cette sauvegarde n’est pas compatible avec cette version de l’application.");
  }

  const records = candidate?.data?.records;

  if (!window.FitnessRpgBackup.isPlainObject(records)) {
    errors.push("Le bloc de données de la sauvegarde est absent.");
  }

  const cleanRecords = {};

  if (window.FitnessRpgBackup.isPlainObject(records)) {
    const entries = Object.entries(records);

    if (!entries.length) {
      errors.push("La sauvegarde ne contient aucune donnée.");
    }

    if (entries.length > 2000) {
      errors.push("La sauvegarde contient trop d’éléments pour être sûre.");
    }

    entries.forEach(([key, value]) => {
      if (!window.FitnessRpgBackup.isOwnedStorageKey(key)) {
        errors.push(`Clé non autorisée détectée : ${key}`);
        return;
      }

      if (typeof value !== "string") {
        errors.push(`Valeur invalide pour la clé ${key}.`);
        return;
      }

      cleanRecords[key] = value;
    });
  }

  const serializedSize = new Blob([JSON.stringify(candidate)]).size;
  if (serializedSize > window.FitnessRpgBackup.maxFileSizeBytes) {
    errors.push("La sauvegarde dépasse la taille maximale autorisée de 8 Mo.");
  }

  const knownJsonKeys = window.FitnessRpgBackup.getKnownJsonKeys();

  Object.entries(cleanRecords).forEach(([key, value]) => {
    if (!knownJsonKeys.has(key)) return;

    try {
      JSON.parse(value);
    } catch {
      errors.push(`Les données enregistrées sous ${key} sont corrompues.`);
    }
  });

  const keys = window.FitnessRpgConfig?.storageKeys || {};
  const weights = window.FitnessRpgBackup.safeJsonParse(
    cleanRecords[keys.weights || "fitnessRpgV5Weights"],
    []
  );
  const familiars = window.FitnessRpgBackup.safeJsonParse(
    cleanRecords[keys.familiars || "fitness_rpg_familiars"],
    []
  );
  const activeProgramSession = window.FitnessRpgBackup.safeJsonParse(
    cleanRecords[keys.activeProgramSession || "fitnessRpgV54ActiveProgramSession"],
    null
  );
  const activeTimer = window.FitnessRpgBackup.safeJsonParse(
    cleanRecords[keys.activeTimer || "fitnessRpgV55ActiveTimer"],
    null
  );

  if (cleanRecords[keys.weights || "fitnessRpgV5Weights"] && !Array.isArray(weights)) {
    errors.push("L’historique du poids est invalide.");
  }

  if (cleanRecords[keys.familiars || "fitness_rpg_familiars"] && !Array.isArray(familiars)) {
    errors.push("La collection de familiers est invalide.");
  }

  if (cleanRecords[keys.activeProgramSession || "fitnessRpgV54ActiveProgramSession"] && !window.FitnessRpgBackup.isPlainObject(activeProgramSession)) {
    errors.push("La séance de programme active est invalide.");
  }

  if (cleanRecords[keys.activeTimer || "fitnessRpgV55ActiveTimer"] && !window.FitnessRpgBackup.isPlainObject(activeTimer)) {
    errors.push("Le timer sauvegardé est invalide.");
  }

  const profile = window.FitnessRpgBackup.getProfileFromRecords(cleanRecords);
  window.FitnessRpgBackup.validateProfile(profile, errors);

  const summary = errors.length
    ? null
    : window.FitnessRpgBackup.buildSummary(cleanRecords, candidate);

  return {
    valid: errors.length === 0,
    errors,
    records: cleanRecords,
    summary
  };
};

window.FitnessRpgBackup.readImportFile = async function readImportFile(file) {
  if (!file) throw new Error("Aucun fichier sélectionné.");

  if (file.size > window.FitnessRpgBackup.maxFileSizeBytes) {
    throw new Error("Le fichier dépasse la taille maximale autorisée de 8 Mo.");
  }

  const raw = await file.text();
  let candidate = null;

  try {
    candidate = JSON.parse(raw);
  } catch {
    throw new Error("Le fichier JSON est illisible ou incomplet.");
  }

  const validation = window.FitnessRpgBackup.validateBackupObject(candidate);

  if (!validation.valid) {
    throw new Error(validation.errors.join(" "));
  }

  return {
    fileName: file.name || "sauvegarde.json",
    fileSize: file.size,
    backup: candidate,
    records: validation.records,
    summary: validation.summary
  };
};

window.FitnessRpgBackup.handleFileInputChange = async function handleFileInputChange(event) {
  const file = event?.target?.files?.[0];

  if (!file) {
    window.FitnessRpgBackup.clearPendingImport();
    return;
  }

  window.FitnessRpgBackup.pendingImport = null;
  window.FitnessRpgBackup.setImportStatus("loading", "Analyse de la sauvegarde en cours…");

  try {
    window.FitnessRpgBackup.pendingImport = await window.FitnessRpgBackup.readImportFile(file);
    window.FitnessRpgBackup.setImportStatus(
      "success",
      "Sauvegarde valide. Vérifie l’aperçu avant de lancer la restauration."
    );
  } catch (error) {
    window.FitnessRpgBackup.pendingImport = null;
    window.FitnessRpgBackup.setImportStatus(
      "error",
      error?.message || "Impossible de lire cette sauvegarde."
    );
  }

  window.FitnessRpgBackup.renderPage();
};

window.FitnessRpgBackup.clearPendingImport = function clearPendingImport() {
  window.FitnessRpgBackup.pendingImport = null;
  window.FitnessRpgBackup.importStatus = {
    type: "idle",
    message: "Choisis un fichier de sauvegarde Fitness RPG au format JSON."
  };

  const input = document.querySelector("#backupFileInput");
  if (input) input.value = "";

  window.FitnessRpgBackup.renderPage();
};

// ============================================================
// Restauration transactionnelle
// ============================================================

window.FitnessRpgBackup.applyRecordsTransaction = function applyRecordsTransaction(records) {
  const previousRecords = window.FitnessRpgBackup.collectRecords();

  try {
    window.FitnessRpgBackup.removeOwnedRecords();

    Object.entries(records).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    Object.entries(records).forEach(([key, value]) => {
      if (localStorage.getItem(key) !== value) {
        throw new Error(`Échec de vérification pour ${key}.`);
      }
    });
  } catch (error) {
    try {
      window.FitnessRpgBackup.removeOwnedRecords();
      Object.entries(previousRecords).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
    } catch (rollbackError) {
      console.error("Fitness RPG - restauration des données précédentes impossible :", rollbackError);
    }

    throw error;
  }

  return previousRecords;
};

window.FitnessRpgBackup.restorePendingImport = function restorePendingImport() {
  const pending = window.FitnessRpgBackup.pendingImport;

  if (!pending?.records || !pending?.summary) {
    window.FitnessRpgBackup.setImportStatus(
      "error",
      "Choisis d’abord une sauvegarde valide."
    );
    return false;
  }

  const currentSummary = window.FitnessRpgBackup.buildSummary(
    window.FitnessRpgBackup.collectRecords()
  );
  const importedSummary = pending.summary;
  const currentHero = currentSummary.profileId
    ? `${currentSummary.heroName}, niveau ${currentSummary.level}`
    : "les données actuellement présentes";

  const confirmation = window.confirm(
    `⚠️ Restaurer la sauvegarde de ${importedSummary.heroName}, niveau ${importedSummary.level} ?\n\n` +
    `Cette opération remplacera ${currentHero} sur cet appareil.\n` +
    "Une sauvegarde de sécurité des données actuelles sera téléchargée automatiquement juste avant le remplacement.\n\n" +
    "Continuer la restauration ?"
  );

  if (!confirmation) {
    window.FitnessRpgBackup.setImportStatus(
      "idle",
      "Restauration annulée. Les données actuelles n’ont pas été modifiées."
    );
    return false;
  }

  try {
    const currentRecords = window.FitnessRpgBackup.collectRecords();
    let safetyFilename = null;

    if (Object.keys(currentRecords).length) {
      const safetyBackup = window.FitnessRpgBackup.buildBackup({ records: currentRecords });
      safetyFilename = window.FitnessRpgBackup.downloadJson(
        safetyBackup,
        "avant-restauration"
      ).filename;
    }

    window.FitnessRpgBackup.applyRecordsTransaction(pending.records);

    window.alert(
      `Sauvegarde restaurée pour ${importedSummary.heroName}.` +
      (safetyFilename ? `\n\nCopie de sécurité créée : ${safetyFilename}` : "") +
      "\n\nL’application va maintenant se recharger."
    );

    window.location.reload();
    return true;
  } catch (error) {
    console.error("Fitness RPG - restauration impossible :", error);

    window.FitnessRpgBackup.setImportStatus(
      "error",
      "La restauration a échoué. Les données précédentes ont été remises en place."
    );

    window.alert(
      "La restauration a échoué. Les données précédentes ont été remises en place et n’ont pas été remplacées."
    );

    return false;
  }
};

// ============================================================
// Rendu de la page
// ============================================================

window.FitnessRpgBackup.summaryHtml = function summaryHtml(summary, options = {}) {
  const title = options.title || summary.heroName;
  const exportedAt = options.showExportDate && summary.exportedAt
    ? `<p class="backup-export-date">Fichier du ${window.FitnessRpgBackup.escapeHtml(window.FitnessRpgBackup.formatDateTime(summary.exportedAt))}</p>`
    : "";
  return `
    <div class="backup-summary-heading">
      <div class="backup-summary-icon" aria-hidden="true">${options.icon || "🛡️"}</div>
      <div><h2>${window.FitnessRpgBackup.escapeHtml(title)}</h2><p>Niv. ${summary.level} · ${window.FitnessRpgBackup.escapeHtml(summary.rank)} · ${summary.totalXp} XP</p>${exportedAt}</div>
    </div>
    <ul class="backup-summary-grid backup-summary-quick">
      <li><span>Entraînements</span><strong>${summary.entries}</strong></li>
      <li><span>Badges</span><strong>${summary.badges}</strong></li>
      <li><span>Familiers</span><strong>${summary.familiars}</strong></li>
      <li><span>Pesées</span><strong>${summary.weights}</strong></li>
    </ul>
    <p class="backup-live-status">${summary.activeProgramSession ? "🟢 Séance en cours sauvegardée" : "⚪ Aucune séance en cours"}${summary.activeTimer ? " · timer inclus" : ""}</p>
  `;
};

window.FitnessRpgBackup.setImportStatus = function setImportStatus(type, message) {
  window.FitnessRpgBackup.importStatus = {
    type: type || "idle",
    message: message || ""
  };

  const status = document.querySelector("#backupImportStatus");

  if (status) {
    status.className = `backup-import-status ${window.FitnessRpgBackup.importStatus.type}`;
    status.textContent = window.FitnessRpgBackup.importStatus.message;
  }
};

window.FitnessRpgBackup.renderPage = function renderPage() {
  const currentSummaryNode = document.querySelector("#backupCurrentSummary");
  const previewNode = document.querySelector("#backupPreview");
  const restoreButton = document.querySelector("#restoreBackupButton");
  const clearButton = document.querySelector("#clearBackupSelectionButton");
  const currentRecords = window.FitnessRpgBackup.collectRecords();
  const currentProfile = window.FitnessRpgBackup.getProfileFromRecords(currentRecords);

  if (currentSummaryNode) {
    if (currentProfile) {
      const currentSummary = window.FitnessRpgBackup.buildSummary(currentRecords);
      currentSummaryNode.innerHTML = window.FitnessRpgBackup.summaryHtml(currentSummary, {
        title: `Données actuelles · ${currentSummary.heroName}`,
        icon: "🧙"
      });
    } else {
      currentSummaryNode.innerHTML = `
        <div class="backup-empty-state">
          <span aria-hidden="true">🗃️</span>
          <div>
            <h2>Aucun héros enregistré</h2>
            <p>Tu peux importer ici une ancienne sauvegarde pour retrouver ton aventure.</p>
          </div>
        </div>
      `;
    }
  }

  if (previewNode) {
    const pending = window.FitnessRpgBackup.pendingImport;

    if (pending?.summary) {
      previewNode.classList.remove("hidden");
      previewNode.innerHTML = `
        <p class="eyebrow">Aperçu avant restauration</p>
        ${window.FitnessRpgBackup.summaryHtml(pending.summary, {
          title: pending.summary.heroName,
          icon: "📦",
          showExportDate: true
        })}
        <div class="backup-file-meta">
          <span>${window.FitnessRpgBackup.escapeHtml(pending.fileName)}</span>
          <span>${window.FitnessRpgBackup.escapeHtml(window.FitnessRpgBackup.formatFileSize(pending.fileSize))}</span>
          <span>${window.FitnessRpgBackup.escapeHtml(pending.summary.appVersion)}</span>
        </div>
      `;
    } else {
      previewNode.classList.add("hidden");
      previewNode.innerHTML = "";
    }
  }

  if (restoreButton) restoreButton.disabled = !window.FitnessRpgBackup.pendingImport;
  if (clearButton) clearButton.disabled = !window.FitnessRpgBackup.pendingImport;

  window.FitnessRpgBackup.setImportStatus(
    window.FitnessRpgBackup.importStatus.type,
    window.FitnessRpgBackup.importStatus.message
  );
};

// ============================================================
// Initialisation
// ============================================================

window.FitnessRpgBackup.init = function initBackup() {
  if (window.FitnessRpgBackup.isInitialized) return;

  const input = document.querySelector("#backupFileInput");

  if (input) {
    input.addEventListener("change", window.FitnessRpgBackup.handleFileInputChange);
  }

  window.FitnessRpgBackup.isInitialized = true;
};

// Le module reste autonome afin que l’application principale continue de
// fonctionner même pendant un remplacement manuel des fichiers sur GitHub.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", window.FitnessRpgBackup.init, { once: true });
} else {
  window.FitnessRpgBackup.init();
}
