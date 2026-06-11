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
// Rendu : catégories
// ============================================================

window.FitnessRpgExercises.renderCategories = function renderCategories() {
  const container = window.FitnessRpgExercises.getContainer();
  if (!container) return;

  const categories = window.FitnessRpgExercises.getCategories();

  container.innerHTML = `
    <section class="exercise-category-page">
      <div class="subpage-header">
        <div>
          <p class="eyebrow">Exercices</p>
          <h2>Catégories sportives</h2>
          <p class="muted">Choisis une catégorie, puis ouvre les exercices correspondants.</p>
        </div>
      </div>

      <div class="exercise-category-grid">
        ${categories.map((category) => window.FitnessRpgExercises.categoryCardHtml(category)).join("")}
      </div>
    </section>
  `;
};

window.FitnessRpgExercises.categoryCardHtml = function categoryCardHtml(category) {
  const title = window.FitnessRpgExercises.escapeHtml(category.title);
  const description = window.FitnessRpgExercises.escapeHtml(category.description);
  const image = window.FitnessRpgExercises.resolveImage(category);
  return `
  
  <button class="exercise-category-card" type="button" data-category-id="${category.id}">
    <img src="${image}" alt="${title}" onerror="this.src='assets/exercice/default_homme.png'">
    <strong>${title}</strong>
    <small>${description}</small>
  </button>

  `;
};

// ============================================================
// Rendu : exercices d’une catégorie
// ============================================================

window.FitnessRpgExercises.renderCategoryExercises = function renderCategoryExercises(categoryId) {
  const container = window.FitnessRpgExercises.getContainer();
  if (!container) return;

  const category = window.FitnessRpgExercises.getCategory(categoryId);
  const exercises = window.FitnessRpgExercises
    .getExercises()
    .filter((exercise) => exercise.categoryId === categoryId);

  window.FitnessRpgExercises.currentCategoryId = categoryId;

  container.innerHTML = `
    <section class="exercise-category-detail-page">
      <div class="subpage-header">
        <div>
          <p class="eyebrow">Exercices</p>
        <h2>${window.FitnessRpgExercises.escapeHtml(category?.title || "Catégorie")}</h2>
          <p class="muted">${window.FitnessRpgExercises.escapeHtml(category?.description || "")}</p>
        </div>

        <button id="backToExerciseCategoriesBtn" class="ghost-btn" type="button">
          Retour
        </button>
      </div>

      <div class="exercise-card-grid">
        ${exercises.map((exercise) => window.FitnessRpgExercises.exerciseCardHtml(exercise)).join("")}
      </div>
    </section>
  `;
};

window.FitnessRpgExercises.exerciseCardHtml = function exerciseCardHtml(exercise) {
  const title = window.FitnessRpgExercises.escapeHtml(exercise.title);
  const description = window.FitnessRpgExercises.escapeHtml(exercise.description || "");
  const stat = window.FitnessRpgExercises.escapeHtml(exercise.stat || "");
  const image = window.FitnessRpgExercises.resolveImage(exercise);

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
      <button class="secondary-btn start-timer-btn" type="button" data-exercise-id="${exercise.id}">
        Démarrer
      </button>
    `
    : "";

  return `
    <article class="exercise-card" data-exercise-id="${exercise.id}">
      <button class="exercise-image-button" type="button" data-exercise-id="${exercise.id}" title="Agrandir l’image">
        <img src="${image}" alt="${title}" onerror="this.src='assets/exercices/default.png'">
      </button>

      <div class="exercise-card-body">
        <p class="exercise-stat">${stat}</p>
        ${description ? `<p class="exercise-description">${description}</p>` : ""}

        <div class="exercise-control-row">
          <label class="amount-inline-label">
            <span>${exercise.unit}</span>
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

          <button class="primary-btn validate-exercise-btn" type="button" data-exercise-id="${exercise.id}">
            Valider
          </button>
        </div>
      </div>
    </article>
  `;
};

// ============================================================
// Validation d’exercice
// ============================================================

window.FitnessRpgExercises.validateExercise = function validateExercise(exerciseId) {
  const exercise = window.FitnessRpgExercises.getExercise(exerciseId);

  if (!exercise) {
    alert("Exercice introuvable.");
    return;
  }

  if (!window.FitnessRpgState?.hasProfile?.()) {
    alert("Crée d’abord ton héros.");
    window.FitnessRpgNavigation?.openHeroSetup?.();
    return;
  }

  const amount = window.FitnessRpgExercises.getAmountValue(exerciseId);

  if (!Number.isFinite(amount) || amount < exercise.min) {
    alert(`Entre une valeur d’au moins ${exercise.min} ${exercise.unit}.`);
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

window.FitnessRpgExercises.ensureTimerOverlay = function ensureTimerOverlay() {
  let overlay = document.querySelector("#exerciseTimerOverlay");

  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.id = "exerciseTimerOverlay";
  overlay.className = "timer-overlay hidden";

  overlay.innerHTML = `
    <section class="timer-card card">
      <h2 id="timerExerciseTitle">Timer</h2>
      <p id="timerTimeText">00:00</p>

      <div class="timer-actions">
        <button id="timerStopButton" class="ghost-btn" type="button">Arrêter</button>
        <button id="timerValidateButton" class="primary-btn" type="button">Valider l’exercice</button>
      </div>
    </section>
  `;

  document.body.appendChild(overlay);

  return overlay;
};

window.FitnessRpgExercises.openTimer = function openTimer(exerciseId) {
  const exercise = window.FitnessRpgExercises.getExercise(exerciseId);

  if (!exercise) return;

  const amount = window.FitnessRpgExercises.getAmountValue(exerciseId);
  const seconds = window.FitnessRpgExercises.amountToSeconds(exercise, amount);

  if (seconds <= 0) {
    alert("Cet exercice n’a pas de durée exploitable pour le timer.");
    return;
  }

  window.FitnessRpgExercises.stopTimer();

  const overlay = window.FitnessRpgExercises.ensureTimerOverlay();
  const title = overlay.querySelector("#timerExerciseTitle");
  const timeText = overlay.querySelector("#timerTimeText");
  const stopButton = overlay.querySelector("#timerStopButton");
  const validateButton = overlay.querySelector("#timerValidateButton");

  window.FitnessRpgExercises.timerExerciseId = exerciseId;
  window.FitnessRpgExercises.remainingSeconds = seconds;

  title.textContent = exercise.title;
  timeText.textContent = window.FitnessRpgExercises.formatTime(seconds);
  validateButton.textContent = "Valider l’exercice";

  overlay.classList.remove("hidden");

  stopButton.onclick = () => {
    window.FitnessRpgExercises.stopTimer();
    overlay.classList.add("hidden");
  };

  validateButton.onclick = () => {
    const id = window.FitnessRpgExercises.timerExerciseId;
    window.FitnessRpgExercises.stopTimer();
    overlay.classList.add("hidden");
    window.FitnessRpgExercises.validateExercise(id);
  };

  window.FitnessRpgExercises.activeTimer = window.setInterval(() => {
    window.FitnessRpgExercises.remainingSeconds -= 1;

    timeText.textContent = window.FitnessRpgExercises.formatTime(
      window.FitnessRpgExercises.remainingSeconds
    );

    if (window.FitnessRpgExercises.remainingSeconds <= 0) {
      window.FitnessRpgExercises.stopTimer();
      timeText.textContent = "00:00";
      validateButton.textContent = "Temps terminé · Valider";
      window.FitnessRpgMedia?.playTimerEndSound?.();
    }
  }, 1000);
};

window.FitnessRpgExercises.stopTimer = function stopTimer() {
  if (window.FitnessRpgExercises.activeTimer) {
    window.clearInterval(window.FitnessRpgExercises.activeTimer);
  }

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
    `${exercise.title}`,
    "",
    `Objectif : ${exercise.stat}.`,
    `Valeur conseillée : ${exercise.defaultValue} ${exercise.unit}.`,
    exercise.hasDistance ? "Tu peux aussi noter la distance en kilomètres." : "",
    exercise.hasTimer ? "Tu peux lancer le timer pour suivre le temps." : ""
  ].filter(Boolean).join("\n");

  alert(message);
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
  const categoryButton = event.target.closest(".exercise-category-card");

  if (categoryButton) {
    const categoryId = categoryButton.dataset.categoryId;
    window.FitnessRpgExercises.renderCategoryExercises(categoryId);
    return;
  }

  const backButton = event.target.closest("#backToExerciseCategoriesBtn");

  if (backButton) {
    window.FitnessRpgExercises.currentCategoryId = null;
    window.FitnessRpgExercises.renderCategories();
    return;
  }

  const imageButton = event.target.closest(".exercise-image-button");

  if (imageButton) {
    const exerciseId = imageButton.dataset.exerciseId;
    window.FitnessRpgExercises.openExerciseImage(exerciseId);
    return;
  }

  const validateButton = event.target.closest(".validate-exercise-btn");

  if (validateButton) {
    const exerciseId = validateButton.dataset.exerciseId;
    window.FitnessRpgExercises.validateExercise(exerciseId);
    return;
  }

  const timerButton = event.target.closest(".start-timer-btn");

  if (timerButton) {
    const exerciseId = timerButton.dataset.exerciseId;
    window.FitnessRpgExercises.explainExercise(exerciseId);
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
  


