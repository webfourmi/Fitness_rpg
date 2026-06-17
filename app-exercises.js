// ============================================================
// Fitness RPG - app-exercises.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - afficher les 9 catégories d’exercices ;
// - afficher les exercices d’une catégorie ;
// - gérer les images cliquables ;
// - valider temps / répétitions ;
// - gérer les distances km ;
// - gérer un timer simple ;
// - envoyer les XP vers l’état/progression.
//
// Règle importante :
// ce fichier ne contient aucune version.
// Il ne modifie jamais document.title.
// ============================================================

window.FitnessRpgExercises = {
  currentCategoryId: null,
  activeTimer: null,
  remainingSeconds: 0,
  timerExerciseId: null
};

// ============================================================
// Helpers données
// ============================================================

window.FitnessRpgExercises.getData = function getData() {
  return window.FitnessRpgData || {};
};

window.FitnessRpgExercises.getCategories = function getCategories() {
  const data = window.FitnessRpgExercises.getData();
  return Array.isArray(data.exerciseCategories) ? data.exerciseCategories : [];
};

window.FitnessRpgExercises.getExercises = function getExercises() {
  const data = window.FitnessRpgExercises.getData();
  return Array.isArray(data.exercises) ? data.exercises : [];
};

window.FitnessRpgExercises.getCategory = function getCategory(categoryId) {
  return window.FitnessRpgExercises
    .getCategories()
    .find((category) => category.id === categoryId);
};

window.FitnessRpgExercises.getExercise = function getExercise(exerciseId) {
  const data = window.FitnessRpgExercises.getData();

  if (typeof data.getExerciseById === "function") {
    return data.getExerciseById(exerciseId);
  }

  return window.FitnessRpgExercises
    .getExercises()
    .find((exercise) => exercise.id === exerciseId);
};

window.FitnessRpgExercises.getExerciseCategory = function getExerciseCategory(exercise) {
  if (!exercise) return null;
  return window.FitnessRpgExercises.getCategory(exercise.categoryId);
};

window.FitnessRpgExercises.getContainer = function getContainer() {
  return (
    document.querySelector("#exercisesContent") ||
    document.querySelector("#questsList")
  );
};

window.FitnessRpgExercises.escapeHtml = function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

window.FitnessRpgExercises.imageOrDefault = function imageOrDefault(path) {
  return path || "assets/exercices/default.png";
};

window.FitnessRpgExercises.getCurrentGender = function getCurrentGender() {
  const profile = window.FitnessRpgState?.getProfile?.();

  if (profile?.gender === "femme") return "femme";

  return "homme";
};

window.FitnessRpgExercises.getCurrentGender = function getCurrentGender() {
  const profile = window.FitnessRpgState?.getProfile?.();
  const gender = String(profile?.gender || "homme").toLowerCase();

  if (gender === "femme" || gender === "female") return "femme";

  return "homme";
};

window.FitnessRpgExercises.resolveImage = function resolveImage(item) {
  const gender = window.FitnessRpgExercises.getCurrentGender();

  if (item?.images?.[gender]) return item.images[gender];

  // Compatibilité si certains objets utilisent encore male/female
  if (gender === "homme" && item?.images?.male) return item.images.male;
  if (gender === "femme" && item?.images?.female) return item.images.female;

  if (item?.images?.homme) return item.images.homme;
  if (item?.images?.femme) return item.images.femme;
  if (item?.images?.male) return item.images.male;
  if (item?.images?.female) return item.images.female;

  if (item?.image) return item.image;

  return gender === "femme"
    ? "assets/exercice/default_femme.png"
    : "assets/exercice/default_homme.png";
};
// ============================================================
// Helpers inputs
// ============================================================

window.FitnessRpgExercises.getExerciseAmountInput = function getExerciseAmountInput(exerciseId) {
  return document.querySelector(`.exercise-amount-input[data-exercise-id="${exerciseId}"]`);
};

window.FitnessRpgExercises.getExerciseDistanceInput = function getExerciseDistanceInput(exerciseId) {
  return document.querySelector(`.exercise-distance-input[data-exercise-id="${exerciseId}"]`);
};

window.FitnessRpgExercises.getAmountValue = function getAmountValue(exerciseId) {
  const input = window.FitnessRpgExercises.getExerciseAmountInput(exerciseId);
  return Number(input?.value || 0);
};

window.FitnessRpgExercises.getDistanceValue = function getDistanceValue(exerciseId) {
  const input = window.FitnessRpgExercises.getExerciseDistanceInput(exerciseId);

  if (!input) return null;

  const value = Number(String(input.value || "0").replace(",", "."));

  if (!Number.isFinite(value) || value <= 0) return null;

  return value;
};

window.FitnessRpgExercises.formatDistance = function formatDistance(distanceKm) {
  const value = Number(distanceKm);

  if (!Number.isFinite(value) || value <= 0) return "";

  return ` · ${value.toLocaleString("fr-FR", {
    maximumFractionDigits: 2
  })} km`;
};

// ============================================================
// V3 - Helpers catégories, couleurs, pagination
// ============================================================

window.FitnessRpgExercises.exercisePageSize = 9;
window.FitnessRpgExercises.currentExercisePage = 0;

window.FitnessRpgExercises.getCategoryColor = function getCategoryColor(categoryId) {
  const category = window.FitnessRpgExercises.getCategory(categoryId);
  return category?.color || "#f0b84f";
};

window.FitnessRpgExercises.getCategoryIcon = function getCategoryIcon(categoryId) {
  const category = window.FitnessRpgExercises.getCategory(categoryId);
  return category?.icon || "⚔️";
};

window.FitnessRpgExercises.getSafeExerciseImage = function getSafeExerciseImage(exercise) {
  const gender = window.FitnessRpgExercises.getCurrentGender();
  const image = window.FitnessRpgExercises.resolveImage(exercise);

  if (image) return image;

  return gender === "femme"
    ? "assets/exercices/femme_default.png"
    : "assets/exercices/homme_default.png";
};
// ============================================================
// V3 - Rendu : catégories 3x3
// ============================================================

window.FitnessRpgExercises.renderCategories = function renderCategories() {
  const container = window.FitnessRpgExercises.getContainer();
  if (!container) return;

  const categories = window.FitnessRpgExercises.getCategories();

  window.FitnessRpgExercises.currentCategoryId = null;
  window.FitnessRpgExercises.currentExercisePage = 0;

  container.innerHTML = `
    <section class="exercise-category-page">
      <div class="exercise-category-grid v3-grid-3x3">
        ${categories.map((category) => window.FitnessRpgExercises.categoryCardHtml(category)).join("")}
      </div>
    </section>
  `;
};

window.FitnessRpgExercises.categoryCardHtml = function categoryCardHtml(category) {
  const title = window.FitnessRpgExercises.escapeHtml(category.title);
  const description = window.FitnessRpgExercises.escapeHtml(category.description);
  const image = window.FitnessRpgExercises.resolveImage(category);
  const color = category.color || "#f0b84f";
  const icon = category.icon || "⚔️";

  return `
    <button
      class="exercise-category-card v3-category-card"
      type="button"
      data-category-id="${category.id}"
      style="--category-color:${color}"
    >
      <span class="v3-category-icon">${icon}</span>
      <img src="${image}" alt="${title}" onerror="this.src='assets/exercices/homme_default.png'">
      <strong>${title}</strong>
      <small>${description}</small>
    </button>
  `;
};

// ============================================================
// V3 - Rendu : exercices en grille 3x3 avec pagination
// ============================================================

window.FitnessRpgExercises.renderCategoryExercises = function renderCategoryExercises(categoryId, page = 0) {
  const container = window.FitnessRpgExercises.getContainer();
  if (!container) return;

  const category = window.FitnessRpgExercises.getCategory(categoryId);

  const allExercises = window.FitnessRpgExercises
    .getExercises()
    .filter((exercise) => exercise.categoryId === categoryId);

  const pageSize = window.FitnessRpgExercises.exercisePageSize || 9;
  const maxPage = Math.max(0, Math.ceil(allExercises.length / pageSize) - 1);
  const safePage = Math.max(0, Math.min(Number(page) || 0, maxPage));

  const start = safePage * pageSize;
  const exercises = allExercises.slice(start, start + pageSize);

  window.FitnessRpgExercises.currentCategoryId = categoryId;
  window.FitnessRpgExercises.currentExercisePage = safePage;

  const color = category?.color || "#f0b84f";

  container.innerHTML = `
    <section class="exercise-category-detail-page" style="--category-color:${color}">
      <div class="subpage-header v3-exercise-header">
        <div>
          <p class="eyebrow">${category?.icon || "⚔️"} Exercices</p>
          <h2>${window.FitnessRpgExercises.escapeHtml(category?.title || "Catégorie")}</h2>
          <p class="muted">${window.FitnessRpgExercises.escapeHtml(category?.description || "")}</p>
        </div>

        <button id="backToExerciseCategoriesBtn" class="ghost-btn" type="button">
          Retour
        </button>
      </div>

      <div class="exercise-card-grid v3-grid-3x3">
        ${exercises.map((exercise) => window.FitnessRpgExercises.exerciseCardHtml(exercise)).join("")}
      </div>

      ${
        maxPage > 0
          ? `
            <div class="exercise-carousel-controls">
              <button
                class="ghost-btn exercise-page-btn"
                type="button"
                data-delta="-1"
                ${safePage <= 0 ? "disabled" : ""}
              >
                ←
              </button>

              <span>Page ${safePage + 1}/${maxPage + 1}</span>

              <button
                class="ghost-btn exercise-page-btn"
                type="button"
                data-delta="1"
                ${safePage >= maxPage ? "disabled" : ""}
              >
                →
              </button>
            </div>
          `
          : ""
      }
    </section>
  `;
};

window.FitnessRpgExercises.exerciseCardHtml = function exerciseCardHtml(exercise) {
  const title = window.FitnessRpgExercises.escapeHtml(exercise.title);
  const description = window.FitnessRpgExercises.escapeHtml(exercise.shortDescription || exercise.description || "");
  const stat = window.FitnessRpgExercises.escapeHtml(exercise.stat || "");
  const image = window.FitnessRpgExercises.getSafeExerciseImage(exercise);
  const category = window.FitnessRpgExercises.getExerciseCategory(exercise);
  const categoryColor = category?.color || "#f4d35e";
  const color = window.FitnessRpgExercises.getCategoryColor(exercise.categoryId);
  const icon = window.FitnessRpgExercises.getCategoryIcon(exercise.categoryId);

  const distanceField = exercise.hasDistance
    ? `
      <label class="distance-inline-label">
        <span>km</span>
        <input
          class="exercise-distance-input"
          data-exercise-id="${exercise.id}"
          type="number"
          min="0"
          step="0.1"
          value="0"
        >
      </label>
    `
    : "";

  const timerButton = exercise.hasTimer
    ? `
      <button
        class="secondary-btn start-timer-btn"
        type="button"
        data-exercise-id="${exercise.id}"
        aria-label="Démarrer le timer"
        title="Démarrer"
      >
        <span class="exercise-action-icon" aria-hidden="true">▶️</span>
      </button>
    `
    : "";

   return `
    <article
      class="exercise-card"
      data-exercise-id="${exercise.id}"
      style="--exercise-color:${categoryColor}"
    >
      <h3 class="exercise-card-title">${title}</h3>

      <button class="exercise-image-button" type="button" data-exercise-id="${exercise.id}" title="Agrandir l’image">
        <img src="${image}" alt="${title}" onerror="this.src='assets/exercices/default.png'">
      </button>

      <div class="exercise-card-body">
        <p class="exercise-stat">${stat}</p>
        ${description ? `<p class="exercise-description">${description}</p>` : ""}

        <div class="exercise-control-row">
          <label class="amount-inline-label">
            <span>${window.FitnessRpgExercises.shortUnit(exercise.unit)}</span>
            <input
              class="exercise-amount-input"
              data-exercise-id="${exercise.id}"
              type="number"
              min="${exercise.min}"
              step="${exercise.step}"
              value="${exercise.defaultValue}"
            >
          </label>

          ${distanceField}
          ${timerButton}

          <button
            class="primary-btn validate-exercise-btn"
            type="button"
            data-exercise-id="${exercise.id}"
            aria-label="Valider l’exercice"
            title="Valider"
          >
            <span class="exercise-action-icon" aria-hidden="true">✅</span>
          </button>
        </div>
      </div>
    </article>
  `;
};
// ============================================================
// V3 - Mini-fiche exercice utilisée dans les programmes
// ============================================================
window.FitnessRpgExercises.shortUnit = function shortUnit(unit) {
  if (unit === "répétitions") return "rép.";
  if (unit === "repetitions") return "rép.";
  if (unit === "sec") return "sec";
  if (unit === "secondes") return "sec";
  if (unit === "min") return "min";
  if (unit === "minutes") return "min";
  return unit || "";
};

window.FitnessRpgExercises.openExerciseDetails = function openExerciseDetails(exerciseId) {
  const exercise = window.FitnessRpgExercises.getExercise?.(exerciseId);

  if (!exercise) {
    window.FitnessRpgRender?.showModal?.({
      icon: "⚠️",
      title: "Exercice introuvable",
      message: "Impossible de trouver cet exercice.",
      okText: "Compris"
    });
    return;
  }

  const message = [
    exercise.description || exercise.shortDescription || "Aucune description détaillée pour cet exercice.",
    "",
    exercise.coachTip ? `Conseil : ${exercise.coachTip}` : "",
    exercise.defaultValue && exercise.unit
      ? `Valeur conseillée : ${exercise.defaultValue} ${exercise.unit}.`
      : "",
    exercise.hasTimer ? "Tu peux lancer le timer pour suivre la durée." : "",
    exercise.hasDistance ? "Tu peux aussi noter la distance en kilomètres." : ""
  ].filter(Boolean);

  window.FitnessRpgRender?.showModal?.({
    icon: "📜",
    title: exercise.title || "Exercice",
    message,
    okText: "Compris"
  });
};

window.FitnessRpgExercises.closeExerciseDetails = function closeExerciseDetails() {
  window.FitnessRpgRender?.closeModal?.();
};

window.FitnessRpgExercises.programExerciseCardHtml = function programExerciseCardHtml(item, index, options = {}) {
  const exercise = window.FitnessRpgData.getExerciseById(item.exerciseId);
  const safeExercise = exercise || {
    id: item.exerciseId,
    title: item.exerciseId,
    categoryId: "warmup",
    unit: item.unit,
    defaultValue: item.amount
  };

  const title = window.FitnessRpgExercises.escapeHtml(safeExercise.title || item.exerciseId);
  const phase = window.FitnessRpgExercises.escapeHtml(item.phase || "");
  const image = window.FitnessRpgExercises.getSafeExerciseImage
    ? window.FitnessRpgExercises.getSafeExerciseImage(safeExercise)
    : window.FitnessRpgExercises.resolveImage(safeExercise);

  const color = window.FitnessRpgExercises.getCategoryColor
    ? window.FitnessRpgExercises.getCategoryColor(safeExercise.categoryId)
    : "#f0b84f";

  const icon = window.FitnessRpgExercises.getCategoryIcon
    ? window.FitnessRpgExercises.getCategoryIcon(safeExercise.categoryId)
    : "⚔️";

  const category = window.FitnessRpgExercises.getCategory(safeExercise.categoryId);

  return `
    <article
      class="program-session-exercise v3-program-exercise-card${options.done ? " done" : ""}"
      style="--category-color:${color}"
    >
      <div class="program-session-index">${index + 1}</div>

      <button
        class="exercise-image-button v3-program-exercise-image"
        type="button"
        data-exercise-id="${item.exerciseId}"
        title="Voir l’explication"
      >
        <img
          src="${image}"
          alt="${title}"
          onerror="this.src='assets/exercices/homme_default.png'"
        >
      </button>

      <div class="v3-program-exercise-body">
        <strong>${phase}</strong>
        <h3>${title}</h3>
        <p>
          ${icon} ${window.FitnessRpgExercises.escapeHtml(category?.title || "Exercice")}
          · ${item.amount} ${item.unit}
        </p>
      </div>

      ${
        options.actionsHtml
          ? `<div class="program-session-actions">${options.actionsHtml}</div>`
          : ""
      }
    </article>
  `;
};
// ============================================================
// Validation d’exercice
// ============================================================

window.FitnessRpgExercises.validateExercise = function validateExercise(exerciseId) {
  const exercise = window.FitnessRpgExercises.getExercise(exerciseId);

  if (!exercise) {
     window.FitnessRpgRender?.showModal?.({
    icon: "⚠️",
    title: "Exercice introuvable",
    message: "Impossible de trouver cet exercice dans le grimoire."
  });
    return;
  }

  if (!window.FitnessRpgState?.hasProfile?.()) {
    window.FitnessRpgRender?.showModal?.({
      icon: "🧙",
      title: "Héros requis",
      message: "Crée d’abord ton héros avant de partir à l’entraînement.",
      okText: "Créer mon héros",
      onOk: () => {
        window.FitnessRpgNavigation?.openHeroSetup?.();
      }
    });
    window.FitnessRpgNavigation?.openHeroSetup?.();
    return;
  }

  const amount = window.FitnessRpgExercises.getAmountValue(exerciseId);

  if (!Number.isFinite(amount) || amount < exercise.min) {
   window.FitnessRpgRender?.showModal?.({
      icon: "📏",
      title: "Valeur trop basse",
      message: `Entre une valeur d’au moins ${exercise.min} ${exercise.unit}.`
    });
    return;
  }

  const distanceKm = exercise.hasDistance
    ? window.FitnessRpgExercises.getDistanceValue(exerciseId)
    : null;

  const xp = window.FitnessRpgProgress?.calculateExerciseXp
    ? window.FitnessRpgProgress.calculateExerciseXp(exercise, amount)
    : Math.max(1, Math.round(amount * Number(exercise.xpPerUnit || 1)));

  const category = window.FitnessRpgExercises.getExerciseCategory(exercise);

  const entry = window.FitnessRpgState?.addTrainingEntry?.({
    type: "exercise",
    categoryId: exercise.categoryId,
    categoryTitle: category?.title || "Exercice",
    sportId: exercise.categoryId,
    sportTitle: category?.title || "Exercice",
    exerciseId: exercise.id,
    title: exercise.title,
    amount,
    unit: exercise.unit,
    distanceKm,
    xp
  });

  if (!entry) return;

  window.FitnessRpgState?.setPose?.(exercise.pose || "victory");

  const coachId = window.FitnessRpgState?.getCoachId?.();
  const message = window.FitnessRpgData?.getCoachMessage
    ? window.FitnessRpgData.getCoachMessage(coachId, "complete", exercise.id)
    : "Exercice validé.";

  const coachMessage = document.querySelector("#coachMessage");
  if (coachMessage) {
    coachMessage.textContent = `${message} +${xp} XP.`;
  }

  window.FitnessRpgState?.addJournalEntry?.({
    type: "exercise",
    title: exercise.title,
    text: `${exercise.title} validé : ${amount} ${exercise.unit}${window.FitnessRpgExercises.formatDistance(distanceKm)}.`,
    xp
  });

  window.FitnessRpgProgress?.checkBadges?.();
  window.FitnessRpgRender?.renderAll?.();
};

// ============================================================
// Timer
// ============================================================

window.FitnessRpgExercises.amountToSeconds = function amountToSeconds(exercise, amount) {
  const value = Number(amount || 0);

  if (!Number.isFinite(value) || value <= 0) return 0;

  if (exercise.unit === "sec") return Math.round(value);
  if (exercise.unit === "min") return Math.round(value * 60);

  return 0;
};

window.FitnessRpgExercises.formatTime = function formatTime(seconds) {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const rest = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
};

window.FitnessRpgExercises.getTimerPoseForExercise = function getTimerPoseForExercise(exercise) {
  const categoryId = String(exercise?.categoryId || "").toLowerCase();
  const pose = String(exercise?.pose || "").toLowerCase();

  if (categoryId === "bike" || pose === "bike") return "bike";
  if (categoryId === "walk" || pose === "walk") return "walk";
  if (categoryId === "warmup" || pose === "warmup") return "warmup";

  if (
    categoryId === "mobility" ||
    categoryId === "stretch" ||
    pose === "stretch"
  ) {
    return "stretch";
  }

  if (
    categoryId === "strength" ||
    categoryId === "core" ||
    categoryId === "arms" ||
    pose === "core" ||
    pose === "squats"
  ) {
    return "core";
  }

  return "motivate";
};

window.FitnessRpgExercises.getTimerCoachMessage = function getTimerCoachMessage(exercise) {
  const pose = window.FitnessRpgExercises.getTimerPoseForExercise(exercise);

  const messages = {
    bike: [
      "Trouve ton rythme. Les roues aiment la régularité.",
      "Pédale souple, respire propre, avance sans te cramer."
    ],
    walk: [
      "Chaque pas compte. Garde une allure confortable.",
      "Avance tranquille, mais avance vraiment."
    ],
    warmup: [
      "On réveille le corps doucement. Pas de charge héroïque à froid.",
      "Prépare les articulations, la quête commence proprement."
    ],
    stretch: [
      "Respire lentement. L’étirement doit rester doux.",
      "On allonge, on relâche, on ne force pas."
    ],
    core: [
      "Reste solide. La qualité vaut plus que la quantité.",
      "Tiens proprement. Le héros construit ses fondations."
    ],
    motivate: [
      "C’est parti. Reste concentré jusqu’au signal final.",
      "Un geste après l’autre. La quête avance."
    ]
  };

  const list = messages[pose] || messages.motivate;
  return list[Math.floor(Math.random() * list.length)];
};

window.FitnessRpgExercises.updateTimerCoach = function updateTimerCoach(exercise) {
  const overlay = document.querySelector("#exerciseTimerOverlay");
  if (!overlay || !exercise) return;

  const coachId = window.FitnessRpgState?.getCoachId?.() || "korvan";
  const pose = window.FitnessRpgExercises.getTimerPoseForExercise(exercise);
  const image = window.FitnessRpgData?.getCoachImage?.(coachId, pose);

  const img = overlay.querySelector("#timerCoachImage");
  const name = overlay.querySelector("#timerCoachName");
  const message = overlay.querySelector("#timerCoachMessage");

  const coach = window.FitnessRpgData?.getCoach?.(coachId);

  if (img && image) {
    img.src = image;
    img.alt = coach?.fullName || "Coach";
  }

  if (name) {
    name.textContent = coach?.fullName || "Coach";
  }

  if (message) {
    message.textContent = window.FitnessRpgExercises.getTimerCoachMessage(exercise);
  }
};

window.FitnessRpgExercises.ensureTimerOverlay = function ensureTimerOverlay() {
  let overlay = document.querySelector("#exerciseTimerOverlay");

  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.id = "exerciseTimerOverlay";
  overlay.className = "timer-overlay hidden";

  overlay.innerHTML = `
    <section class="timer-card card timer-card-with-coach">
      <aside class="timer-coach-panel">
        <img id="timerCoachImage" src="" alt="Coach">
        <p id="timerCoachName" class="eyebrow">Coach</p>
        <p id="timerCoachMessage">Prépare-toi.</p>
      </aside>

      <section class="timer-main-panel">
        <p id="timerStatusText" class="timer-status-text">Préparation</p>
        <h2 id="timerExerciseTitle">Timer</h2>
        <p id="timerTimeText">00:00</p>

        <div class="timer-actions">
          <button id="timerStopButton" class="ghost-btn" type="button">Arrêter</button>
          <button id="timerValidateButton" class="primary-btn" type="button">Valider l’exercice</button>
        </div>
      </section>
    </section>
  `;

  document.body.appendChild(overlay);

  return overlay;
};

window.FitnessRpgExercises.runTimer = function runTimer(options = {}) {
  const exercise = options.exercise;
  const seconds = Number(options.seconds || 0);
  const titleText = options.title || exercise?.title || "Timer";
  const onValidate = typeof options.onValidate === "function" ? options.onValidate : null;

  if (!exercise || seconds <= 0) {
    window.FitnessRpgRender?.showModal?.({
      icon: "⏱️",
      title: "Timer indisponible",
      message: [
        "Cet exercice n’a pas de durée exploitable pour le timer.",
        "Tu peux quand même le valider avec le bouton ✅ après l’avoir réalisé."
      ],
      okText: "Compris"
    });
    return;
  }
  

  window.FitnessRpgExercises.stopTimer();

  const overlay = window.FitnessRpgExercises.ensureTimerOverlay();
  const title = overlay.querySelector("#timerExerciseTitle");
  const timeText = overlay.querySelector("#timerTimeText");
  const statusText = overlay.querySelector("#timerStatusText");
  const stopButton = overlay.querySelector("#timerStopButton");
  const validateButton = overlay.querySelector("#timerValidateButton");

  window.FitnessRpgExercises.timerExerciseId = exercise.id;
  window.FitnessRpgExercises.remainingSeconds = seconds;

  title.textContent = titleText;
  timeText.textContent = "5";
  statusText.textContent = "Départ dans";
  validateButton.textContent = "Valider l’exercice";

  window.FitnessRpgExercises.updateTimerCoach(exercise);

  overlay.classList.remove("hidden");

  stopButton.onclick = () => {
    window.FitnessRpgExercises.stopTimer();
    overlay.classList.add("hidden");
  };

  validateButton.onclick = () => {
    window.FitnessRpgExercises.stopTimer();
    overlay.classList.add("hidden");

    if (onValidate) {
      onValidate();
    } else {
      window.FitnessRpgExercises.validateExercise(exercise.id);
    }
  };

  let countdown = 5;

  window.FitnessRpgMedia?.playTimerCountdownBeep?.();

  window.FitnessRpgExercises.countdownTimer = window.setInterval(() => {
    countdown -= 1;

    if (countdown > 0) {
      timeText.textContent = String(countdown);
      window.FitnessRpgMedia?.playTimerCountdownBeep?.();
      return;
    }

    window.clearInterval(window.FitnessRpgExercises.countdownTimer);
    window.FitnessRpgExercises.countdownTimer = null;

    window.FitnessRpgMedia?.playTimerStartSound?.();

    statusText.textContent = "En cours";
    timeText.textContent = window.FitnessRpgExercises.formatTime(seconds);

    window.FitnessRpgExercises.activeTimer = window.setInterval(() => {
      window.FitnessRpgExercises.remainingSeconds -= 1;

      timeText.textContent = window.FitnessRpgExercises.formatTime(
        window.FitnessRpgExercises.remainingSeconds
      );

      if (window.FitnessRpgExercises.remainingSeconds <= 0) {
        window.FitnessRpgExercises.stopTimer();
        statusText.textContent = "Temps terminé";
        timeText.textContent = "00:00";
        validateButton.textContent = "Temps terminé · Valider";
        window.FitnessRpgMedia?.playTimerEndSound?.();
      }
    }, 1000);
  }, 1000);
};

window.FitnessRpgExercises.openTimer = function openTimer(exerciseId) {
  const exercise = window.FitnessRpgExercises.getExercise(exerciseId);

  if (!exercise) return;

  const amount = window.FitnessRpgExercises.getAmountValue(exerciseId);
  const seconds = window.FitnessRpgExercises.amountToSeconds(exercise, amount);

  window.FitnessRpgExercises.runTimer({
    exercise,
    seconds,
    title: exercise.title,
    onValidate: () => {
      window.FitnessRpgExercises.validateExercise(exercise.id);
    }
  });
};

window.FitnessRpgExercises.stopTimer = function stopTimer() {
  if (window.FitnessRpgExercises.countdownTimer) {
    window.clearInterval(window.FitnessRpgExercises.countdownTimer);
  }

  if (window.FitnessRpgExercises.activeTimer) {
    window.clearInterval(window.FitnessRpgExercises.activeTimer);
  }

  window.FitnessRpgExercises.countdownTimer = null;
  window.FitnessRpgExercises.activeTimer = null;
};

// ============================================================
// Explication première fois
// ============================================================

window.FitnessRpgExercises.explainExercise = function explainExercise(exerciseId) {
  const exercise = window.FitnessRpgExercises.getExercise(exerciseId);

  if (!exercise) return;

  const key = `fitnessRpgV5Explained_${exerciseId}`;

  if (localStorage.getItem(key) === "true") return;

  localStorage.setItem(key, "true");

  const message = [
  `Objectif : ${exercise.stat}.`,
  `Valeur conseillée : ${exercise.defaultValue} ${exercise.unit}.`,
  exercise.hasDistance ? "Tu peux aussi noter la distance en kilomètres." : "",
  exercise.hasTimer ? "Tu peux lancer le timer pour suivre le temps." : ""
].filter(Boolean);

window.FitnessRpgRender?.showModal?.({
  icon: exercise.hasTimer ? "⏱️" : "⚔️",
  title: exercise.title,
  message,
  okText: "J’ai compris"
});
};

// ============================================================
// Images
// ============================================================

window.FitnessRpgExercises.openExerciseImage = function openExerciseImage(exerciseId) {
  const exercise = window.FitnessRpgExercises.getExercise(exerciseId);

  if (!exercise) return;

  const image = window.FitnessRpgExercises.resolveImage(exercise);

  if (window.FitnessRpgMedia?.openImageFullscreen) {
    window.FitnessRpgMedia.openImageFullscreen(image, exercise.title);
    return;
  }

  window.open(image, "_blank");
};

// ============================================================
// Clics
// ============================================================

window.FitnessRpgExercises.handleDocumentClick = function handleDocumentClick(event) {
  const categoryButton = event.target.closest(".exercise-category-card, .v3-category-card");

if (categoryButton) {
  event.preventDefault();

  const categoryId = categoryButton.dataset.categoryId;

  if (categoryId) {
    window.FitnessRpgExercises.renderCategoryExercises(categoryId, 0);
  }

  return;
}

  const backButton = event.target.closest("#backToExerciseCategoriesBtn");

  if (backButton) {
    window.FitnessRpgExercises.currentCategoryId = null;
    window.FitnessRpgExercises.renderCategories();
    return;
  }

  const imageButton = event.target.closest(".exercise-image-button, .v3-exercise-image-button, .v3-program-exercise-image");

if (imageButton) {
  const exerciseId = imageButton.dataset.exerciseId;
  window.FitnessRpgExercises.openExerciseDetails(exerciseId);
  return;
}

const pageButton = event.target.closest(".exercise-page-btn");

if (pageButton) {
  const delta = Number(pageButton.dataset.delta || 0);
  const categoryId = window.FitnessRpgExercises.currentCategoryId;
  const page = Number(window.FitnessRpgExercises.currentExercisePage || 0) + delta;

  if (categoryId) {
    window.FitnessRpgExercises.renderCategoryExercises(categoryId, page);
  }

  return;
}

if (event.target.closest("#closeExerciseDetailButton")) {
  window.FitnessRpgExercises.closeExerciseDetails();
  return;
}

if (event.target.id === "exerciseDetailOverlay") {
  window.FitnessRpgExercises.closeExerciseDetails();
  return;
}

  const timerButton = event.target.closest(".start-timer-btn");

  if (timerButton) {
    const exerciseId = timerButton.dataset.exerciseId;
    window.FitnessRpgExercises.openTimer(exerciseId);
    return;
  }

  const exerciseCard = event.target.closest(".exercise-card");

  if (exerciseCard && !event.target.closest("button, input, label")) {
    const exerciseId = exerciseCard.dataset.exerciseId;

    if (exerciseId) {
      window.FitnessRpgExercises.explainExercise(exerciseId);
    }
  }
};

// ============================================================
// Initialisation
// ============================================================

window.FitnessRpgExercises.init = function initExercises() {
  document.removeEventListener("click", window.FitnessRpgExercises.handleDocumentClick);
  document.addEventListener("click", window.FitnessRpgExercises.handleDocumentClick);
};
  


