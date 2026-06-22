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
  timerExerciseId: null,

  customProgramRun: null,
  customStepTimer: null,
  customStepRemainingSeconds: 0
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

  container.innerHTML = `
    <section class="exercise-category-page">
      ${window.FitnessRpgExercises.customProgramsPanelHtml()}

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
// Programmes personnalisés
// ============================================================

window.FitnessRpgExercises.customProgramsPanelHtml = function customProgramsPanelHtml() {
  const customPrograms = window.FitnessRpgState?.getCustomPrograms?.() || [];

  const listHtml = customPrograms.length
    ? `
      <div class="custom-program-list">
        ${customPrograms.map((program) => `
          <article class="custom-program-mini-card">
            <div>
              <strong>${window.FitnessRpgExercises.escapeHtml(program.title)}</strong>
              <small>${program.exercises.length} exercice${program.exercises.length > 1 ? "s" : ""}</small>
            </div>

            <div class="custom-program-mini-actions">
              <button
                class="secondary-btn open-custom-program-btn"
                type="button"
                data-program-id="${window.FitnessRpgExercises.escapeHtml(program.id)}"
              >
                Ouvrir
              </button>

              <button
                class="ghost-btn edit-custom-program-btn"
                type="button"
                data-program-id="${window.FitnessRpgExercises.escapeHtml(program.id)}"
              >
                Modifier
              </button>
            </div>
          </article>
        `).join("")}
      </div>
    `
    : `
      <p class="muted">
        Aucun programme personnalisé pour l’instant.
      </p>
    `;

  return `
    <section class="custom-program-panel card">
      <div class="custom-program-panel-header">
        <div>
          <p class="eyebrow">🧩 Programme perso</p>
          <h2>Crée ton propre programme</h2>
          <p>Choisis tes exercices, règle les quantités, puis sauvegarde ta routine.</p>
        </div>

        <button id="openCustomProgramBuilderBtn" class="primary-btn" type="button">
          Créer
        </button>
      </div>

      ${listHtml}
    </section>
  `;
};

window.FitnessRpgExercises.renderCustomProgramBuilder = function renderCustomProgramBuilder(programId = null) {
  const container = window.FitnessRpgExercises.getContainer();
  if (!container) return;

  const existingProgram = programId
    ? window.FitnessRpgState?.getCustomProgramById?.(programId)
    : null;

  const selectedMap = new Map(
    (existingProgram?.exercises || []).map((item) => [item.exerciseId, item])
  );

  const categories = window.FitnessRpgExercises.getCategories();
  const exercises = window.FitnessRpgExercises.getExercises();

  const categoriesHtml = categories.map((category) => {
    const categoryExercises = exercises.filter((exercise) => exercise.categoryId === category.id);

    if (!categoryExercises.length) return "";

    return `
      <details class="custom-program-category" open>
        <summary>
          ${category.icon || "⚔️"} ${window.FitnessRpgExercises.escapeHtml(category.title)}
        </summary>

        <div class="custom-program-exercise-list">
          ${categoryExercises.map((exercise) => {
            const selectedItem = selectedMap.get(exercise.id);
            const checked = selectedItem ? "checked" : "";
            const amount = selectedItem?.amount ?? exercise.defaultValue ?? exercise.min ?? 1;
            const unit = selectedItem?.unit || exercise.unit || "répétitions";

            return `
              <label class="custom-program-exercise-row">
                <input
                  class="custom-program-exercise-check"
                  type="checkbox"
                  data-exercise-id="${window.FitnessRpgExercises.escapeHtml(exercise.id)}"
                  ${checked}
                >

                <span>${window.FitnessRpgExercises.escapeHtml(exercise.title)}</span>

                <input
                  class="custom-program-amount-input"
                  type="number"
                  data-exercise-id="${window.FitnessRpgExercises.escapeHtml(exercise.id)}"
                  min="${exercise.min || 1}"
                  step="${exercise.step || 1}"
                  value="${amount}"
                >

                <small>${window.FitnessRpgExercises.escapeHtml(unit)}</small>
              </label>
            `;
          }).join("")}
        </div>
      </details>
    `;
  }).join("");

  container.innerHTML = `
    <section
      id="customProgramBuilder"
      class="custom-program-builder-page"
      data-program-id="${existingProgram?.id || ""}"
    >
      <div class="subpage-header">
        <div>
          <p class="eyebrow">🧩 Programme perso</p>
          <h2>${existingProgram ? "Modifier le programme" : "Créer ton programme"}</h2>
          <p class="muted">Sélectionne les exercices de ta routine.</p>
        </div>

        <button id="backToExerciseCategoriesBtn" class="ghost-btn" type="button">
          Retour
        </button>
      </div>

      <section class="custom-program-form card">
        <label class="custom-program-name-label">
          <span>Nom du programme</span>
          <input
            id="customProgramNameInput"
            type="text"
            maxlength="40"
            value="${window.FitnessRpgExercises.escapeHtml(existingProgram?.title || "")}"
            placeholder="Ex : Routine du soir"
          >
        </label>

        <p class="muted">
          Les exercices seront enregistrés dans l’ordre d’affichage.
        </p>
      </section>

      <section class="custom-program-picker">
        ${categoriesHtml}
      </section>

      <div class="custom-program-save-bar card">
        <button id="saveCustomProgramBtn" class="primary-btn" type="button">
          Sauvegarder le programme
        </button>
      </div>
    </section>
  `;
};

window.FitnessRpgExercises.saveCustomProgramFromBuilder = function saveCustomProgramFromBuilder() {
  if (!window.FitnessRpgState?.hasProfile?.()) {
    alert("Crée d’abord ton héros.");
    window.FitnessRpgNavigation?.openHeroSetup?.();
    return;
  }

  const builder = document.querySelector("#customProgramBuilder");
  const nameInput = document.querySelector("#customProgramNameInput");

  const title = String(nameInput?.value || "").trim();

  if (!title) {
    alert("Donne un nom à ton programme.");
    return;
  }

  const checkedInputs = Array.from(
    document.querySelectorAll(".custom-program-exercise-check:checked")
  );

  if (!checkedInputs.length) {
    alert("Choisis au moins un exercice.");
    return;
  }

  const exercises = checkedInputs.map((check, index) => {
    const exerciseId = check.dataset.exerciseId;
    const exercise = window.FitnessRpgExercises.getExercise(exerciseId);
    const amountInput = document.querySelector(`.custom-program-amount-input[data-exercise-id="${exerciseId}"]`);

    const rawAmount = Number(amountInput?.value || exercise?.defaultValue || 1);
    const minAmount = Number(exercise?.min || 1);
    const amount = Math.max(minAmount, Number.isFinite(rawAmount) ? rawAmount : minAmount);

    return {
      phase: `Étape ${index + 1}`,
      exerciseId,
      amount,
      unit: exercise?.unit || "répétitions"
    };
  });

  const savedProgram = window.FitnessRpgState.saveCustomProgram({
    id: builder?.dataset.programId || null,
    title,
    exercises
  });

  if (!savedProgram) {
    alert("Impossible de sauvegarder ce programme.");
    return;
  }

  window.FitnessRpgExercises.renderCategories();
};

window.FitnessRpgExercises.renderCustomProgramDetail = function renderCustomProgramDetail(programId) {
  const container = window.FitnessRpgExercises.getContainer();
  if (!container) return;

  const program = window.FitnessRpgState?.getCustomProgramById?.(programId);

  if (!program) {
    alert("Programme personnalisé introuvable.");
    window.FitnessRpgExercises.renderCategories();
    return;
  }

  const exercisesHtml = program.exercises.map((item) => {
    const exercise = window.FitnessRpgExercises.getExercise(item.exerciseId);

    return `
      <li>
        <strong>${window.FitnessRpgExercises.escapeHtml(item.phase)}</strong>
        <span>${window.FitnessRpgExercises.escapeHtml(exercise?.title || item.exerciseId)}</span>
        <em>${window.FitnessRpgExercises.escapeHtml(item.amount)} ${window.FitnessRpgExercises.escapeHtml(item.unit)}</em>
      </li>
    `;
  }).join("");

  container.innerHTML = `
    <section class="custom-program-detail-page">
      <div class="subpage-header">
        <div>
          <p class="eyebrow">🧩 Programme perso</p>
          <h2>${window.FitnessRpgExercises.escapeHtml(program.title)}</h2>
          <p class="muted">${program.exercises.length} exercice${program.exercises.length > 1 ? "s" : ""}</p>
        </div>

        <button id="backToExerciseCategoriesBtn" class="ghost-btn" type="button">
          Retour
        </button>
      </div>

      <section class="custom-program-detail-card card">
        <ul class="custom-program-exercise-summary">
          ${exercisesHtml}
        </ul>
  <div class="custom-program-actions">
    <button
      class="primary-btn start-custom-program-guided-btn"
      type="button"
      data-program-id="${window.FitnessRpgExercises.escapeHtml(program.id)}"
    >
      Démarrer guidé
    </button>
  
    <button
      class="secondary-btn validate-custom-program-btn"
      type="button"
      data-program-id="${window.FitnessRpgExercises.escapeHtml(program.id)}"
    >
      Valider sans guidage
    </button>
  
    <button
      class="secondary-btn edit-custom-program-btn"
      type="button"
      data-program-id="${window.FitnessRpgExercises.escapeHtml(program.id)}"
    >
      Modifier
    </button>
  
    <button
      class="ghost-btn delete-custom-program-btn"
      type="button"
      data-program-id="${window.FitnessRpgExercises.escapeHtml(program.id)}"
    >
      Supprimer
    </button>
  </div>
      </section>
    </section>
  `;
};

window.FitnessRpgExercises.calculateCustomProgramXp = function calculateCustomProgramXp(program) {
  if (!program || !Array.isArray(program.exercises)) return 10;

  const total = program.exercises.reduce((sum, item) => {
    const exercise = window.FitnessRpgExercises.getExercise(item.exerciseId);
    const amount = Number(item.amount || 0);
    const xpPerUnit = Number(exercise?.xpPerUnit || 1);

    return sum + amount * xpPerUnit;
  }, 0);

  return Math.max(10, Math.round(total));
};

window.FitnessRpgExercises.validateCustomProgram = function validateCustomProgram(programId) {
  if (!window.FitnessRpgState?.hasProfile?.()) {
    alert("Crée d’abord ton héros.");
    window.FitnessRpgNavigation?.openHeroSetup?.();
    return;
  }

  const program = window.FitnessRpgState?.getCustomProgramById?.(programId);

  if (!program) {
    alert("Programme personnalisé introuvable.");
    return;
  }

  const xp = window.FitnessRpgExercises.calculateCustomProgramXp(program);

  const entry = window.FitnessRpgState.addTrainingEntry({
    type: "custom-program",
    sportId: "custom-program",
    sportTitle: "Programme perso",
    programId: program.id,
    programTitle: program.title,
    title: `${program.title} · Programme perso`,
    amount: 1,
    unit: "séance",
    xp
  });

  if (!entry) return;

  const details = program.exercises.map((item) => {
    const exercise = window.FitnessRpgExercises.getExercise(item.exerciseId);
    return `${exercise?.title || item.exerciseId} : ${item.amount} ${item.unit}`;
  }).join(" · ");

  window.FitnessRpgState.addJournalEntry({
    type: "custom-program",
    title: program.title,
    text: `Programme personnalisé validé : ${details}.`,
    xp
  });

  window.FitnessRpgState.setPose?.("victory");

  const coachMessage = document.querySelector("#coachMessage");

  if (coachMessage) {
    coachMessage.textContent = `Programme perso terminé. +${xp} XP.`;
  }

  window.FitnessRpgProgress?.checkBadges?.();
  window.FitnessRpgRender?.renderAll?.();
};


// ============================================================
// Exécution guidée des programmes personnalisés
// ============================================================

window.FitnessRpgExercises.startCustomProgramGuided = function startCustomProgramGuided(programId) {
  const program = window.FitnessRpgState?.getCustomProgramById?.(programId);

  if (!program) {
    alert("Programme personnalisé introuvable.");
    return;
  }

  if (!Array.isArray(program.exercises) || program.exercises.length === 0) {
    alert("Ce programme ne contient aucun exercice.");
    return;
  }

  window.FitnessRpgExercises.stopCustomStepTimer();

  window.FitnessRpgExercises.customProgramRun = {
    programId,
    currentIndex: 0
  };

  window.FitnessRpgExercises.renderCustomProgramGuided();
};

window.FitnessRpgExercises.getCurrentCustomProgramRun = function getCurrentCustomProgramRun() {
  const run = window.FitnessRpgExercises.customProgramRun;

  if (!run) return null;

  const program = window.FitnessRpgState?.getCustomProgramById?.(run.programId);

  if (!program) return null;

  const index = Math.max(0, Math.min(
    Number(run.currentIndex || 0),
    program.exercises.length - 1
  ));

  const item = program.exercises[index];
  const exercise = window.FitnessRpgExercises.getExercise(item.exerciseId);

  return {
    run,
    program,
    item,
    exercise,
    index,
    total: program.exercises.length
  };
};

window.FitnessRpgExercises.renderCustomProgramGuided = function renderCustomProgramGuided() {
  const container = window.FitnessRpgExercises.getContainer();
  if (!container) return;

  const context = window.FitnessRpgExercises.getCurrentCustomProgramRun();

  if (!context || !context.exercise) {
    alert("Impossible d’ouvrir cette étape.");
    window.FitnessRpgExercises.renderCategories();
    return;
  }

  const { program, item, exercise, index, total } = context;

  const title = window.FitnessRpgExercises.escapeHtml(exercise.title);
  const programTitle = window.FitnessRpgExercises.escapeHtml(program.title);
  const image = window.FitnessRpgExercises.resolveImage(exercise);
  const amount = window.FitnessRpgExercises.escapeHtml(item.amount);
  const unit = window.FitnessRpgExercises.escapeHtml(item.unit);
  const phase = window.FitnessRpgExercises.escapeHtml(item.phase || `Étape ${index + 1}`);
  const description = window.FitnessRpgExercises.escapeHtml(
    exercise.description || exercise.shortDescription || ""
  );
  const coachTip = window.FitnessRpgExercises.escapeHtml(exercise.coachTip || "");
  const progress = Math.round(((index + 1) / total) * 100);
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const timerSeconds = window.FitnessRpgExercises.getCustomStepSeconds(item, exercise);
  const timerHtml = timerSeconds > 0
    ? `
      <div class="custom-step-timer-box">
        <p id="customStepTimerText">
          ${window.FitnessRpgExercises.formatTime(timerSeconds)}
        </p>

        <div class="custom-step-timer-actions">
          <button
            class="secondary-btn start-custom-step-timer-btn"
            type="button"
          >
            ▶️ Démarrer le timer
          </button>

          <button
            class="ghost-btn stop-custom-step-timer-btn"
            type="button"
          >
            Arrêter
          </button>
        </div>
      </div>
    `
    : "";

  container.innerHTML = `
    <section class="custom-program-run-page">
      <div class="subpage-header">
        <div>
          <p class="eyebrow">🧩 Séance guidée</p>
          <h2>${programTitle}</h2>
          <p class="muted">Étape ${index + 1} / ${total}</p>
        </div>

        <button
          id="cancelCustomProgramRunBtn"
          class="ghost-btn"
          type="button"
        >
          Quitter
        </button>
      </div>

      <div class="custom-program-step-progress">
        <div class="custom-program-step-progress-bar">
          <span style="width: ${progress}%"></span>
        </div>
        <small>${progress}%</small>
      </div>

      <article class="custom-program-run-card card">
        <p class="eyebrow">${phase}</p>

        <button
          class="exercise-image-button custom-program-run-image"
          type="button"
          data-exercise-id="${window.FitnessRpgExercises.escapeHtml(exercise.id)}"
          title="Voir l’explication"
        >
          <img
            src="${image}"
            alt="${title}"
            onerror="this.src='assets/exercices/default.png'"
          >
        </button>

        <div class="custom-program-run-body">
          <h3>${title}</h3>

          <p class="custom-program-run-amount">
            ${amount} ${unit}
          </p>

          ${description ? `<p class="muted">${description}</p>` : ""}

          ${coachTip ? `
            <p class="custom-program-run-tip">
              💬 ${coachTip}
            </p>
          ` : ""}

          ${timerHtml}
        </div>

        <div class="custom-program-run-actions">
          <button
            class="ghost-btn custom-step-prev-btn"
            type="button"
            ${isFirst ? "disabled" : ""}
          >
            Précédent
          </button>

          <button
            class="primary-btn validate-custom-step-btn"
            type="button"
          >
            ${isLast ? "Terminer la séance" : "Valider l’étape"}
          </button>
        </div>
      </article>
    </section>
  `;
};

window.FitnessRpgExercises.validateCustomProgramStep = function validateCustomProgramStep() {
  const context = window.FitnessRpgExercises.getCurrentCustomProgramRun();

  if (!context) return;

  const { run, program, index, total } = context;

  window.FitnessRpgExercises.stopCustomStepTimer();

  if (index >= total - 1) {
    window.FitnessRpgExercises.finishCustomProgramGuided(program.id);
    return;
  }

  run.currentIndex = index + 1;
  window.FitnessRpgExercises.renderCustomProgramGuided();
};

window.FitnessRpgExercises.previousCustomProgramStep = function previousCustomProgramStep() {
  const context = window.FitnessRpgExercises.getCurrentCustomProgramRun();

  if (!context) return;

  const { run, index } = context;

  window.FitnessRpgExercises.stopCustomStepTimer();

  run.currentIndex = Math.max(0, index - 1);
  window.FitnessRpgExercises.renderCustomProgramGuided();
};

window.FitnessRpgExercises.cancelCustomProgramGuided = function cancelCustomProgramGuided() {
  const context = window.FitnessRpgExercises.getCurrentCustomProgramRun();

  window.FitnessRpgExercises.stopCustomStepTimer();
  window.FitnessRpgExercises.customProgramRun = null;

  if (context?.program?.id) {
    window.FitnessRpgExercises.renderCustomProgramDetail(context.program.id);
    return;
  }

  window.FitnessRpgExercises.renderCategories();
};

window.FitnessRpgExercises.finishCustomProgramGuided = function finishCustomProgramGuided(programId) {
  window.FitnessRpgExercises.stopCustomStepTimer();
  window.FitnessRpgExercises.customProgramRun = null;

  window.FitnessRpgExercises.validateCustomProgram(programId);

  if (window.FitnessRpgState?.getCustomProgramById?.(programId)) {
    window.FitnessRpgExercises.renderCustomProgramDetail(programId);
  }
};

window.FitnessRpgExercises.getCustomStepSeconds = function getCustomStepSeconds(item, exercise) {
  const amount = Number(item?.amount || 0);
  const unit = item?.unit || exercise?.unit;

  if (!Number.isFinite(amount) || amount <= 0) return 0;

  if (unit === "sec") return Math.round(amount);
  if (unit === "min") return Math.round(amount * 60);

  return 0;
};

window.FitnessRpgExercises.startCustomStepTimer = function startCustomStepTimer() {
  const context = window.FitnessRpgExercises.getCurrentCustomProgramRun();

  if (!context) return;

  const seconds = window.FitnessRpgExercises.getCustomStepSeconds(
    context.item,
    context.exercise
  );

  if (seconds <= 0) {
    alert("Cette étape n’a pas de durée à chronométrer.");
    return;
  }

  window.FitnessRpgExercises.stopCustomStepTimer();

  window.FitnessRpgExercises.customStepRemainingSeconds = seconds;
  window.FitnessRpgExercises.updateCustomStepTimerText();

  window.FitnessRpgExercises.customStepTimer = window.setInterval(() => {
    window.FitnessRpgExercises.customStepRemainingSeconds -= 1;
    window.FitnessRpgExercises.updateCustomStepTimerText();

    if (window.FitnessRpgExercises.customStepRemainingSeconds <= 0) {
      window.FitnessRpgExercises.stopCustomStepTimer();
      window.FitnessRpgMedia?.playTimerEndSound?.();

      const button = document.querySelector(".start-custom-step-timer-btn");
      if (button) {
        button.textContent = "Temps terminé";
      }
    }
  }, 1000);
};

window.FitnessRpgExercises.stopCustomStepTimer = function stopCustomStepTimer() {
  if (window.FitnessRpgExercises.customStepTimer) {
    window.clearInterval(window.FitnessRpgExercises.customStepTimer);
  }

  window.FitnessRpgExercises.customStepTimer = null;
};

window.FitnessRpgExercises.updateCustomStepTimerText = function updateCustomStepTimerText() {
  const text = document.querySelector("#customStepTimerText");

  if (!text) return;

  text.textContent = window.FitnessRpgExercises.formatTime(
    window.FitnessRpgExercises.customStepRemainingSeconds
  );
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
  const image = window.FitnessRpgExercises.getSafeExerciseImage
    ? window.FitnessRpgExercises.getSafeExerciseImage(exercise)
    : window.FitnessRpgExercises.resolveImage(exercise);

  const color = window.FitnessRpgExercises.getCategoryColor
    ? window.FitnessRpgExercises.getCategoryColor(exercise.categoryId)
    : "#f0b84f";

  const icon = window.FitnessRpgExercises.getCategoryIcon
    ? window.FitnessRpgExercises.getCategoryIcon(exercise.categoryId)
    : "⚔️";

  const distanceField = exercise.hasDistance
    ? `
      <label class="distance-inline-label exercise-top-input">
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
      class="exercise-card v3-exercise-card"
      data-exercise-id="${exercise.id}"
      style="--category-color:${color}"
    >
      <h3 class="v3-exercise-title">${title}</h3>

      <div class="exercise-top-controls">
        <label class="amount-inline-label exercise-top-input">
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
      </div>

      <button
        class="exercise-image-button v3-exercise-image-button"
        type="button"
        data-exercise-id="${exercise.id}"
        title="Voir l’explication"
      >
        <img src="${image}" alt="${title}" onerror="this.src='assets/exercices/homme_default.png'">
      </button>

     <div class="exercise-card-body">
        <p class="exercise-stat">${icon} ${stat}</p>
      
        <div class="exercise-control-row">
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
  const target = event.target instanceof Element
    ? event.target
    : event.target?.parentElement;

  if (!target) return;

  // ============================================================
  // Programmes personnalisés
  // ============================================================

  const openBuilderButton = target.closest("#openCustomProgramBuilderBtn");

  if (openBuilderButton) {
    event.preventDefault();
    window.FitnessRpgExercises.renderCustomProgramBuilder();
    return;
  }

  const saveCustomProgramButton = target.closest("#saveCustomProgramBtn");

  if (saveCustomProgramButton) {
    event.preventDefault();
    window.FitnessRpgExercises.saveCustomProgramFromBuilder();
    return;
  }

  const openCustomProgramButton = target.closest(".open-custom-program-btn");

  if (openCustomProgramButton) {
    event.preventDefault();
    window.FitnessRpgExercises.renderCustomProgramDetail(
      openCustomProgramButton.dataset.programId
    );
    return;
  }

  const editCustomProgramButton = target.closest(".edit-custom-program-btn");

  if (editCustomProgramButton) {
    event.preventDefault();
    window.FitnessRpgExercises.renderCustomProgramBuilder(
      editCustomProgramButton.dataset.programId
    );
    return;
  }

  const deleteCustomProgramButton = target.closest(".delete-custom-program-btn");

  if (deleteCustomProgramButton) {
    event.preventDefault();

    const programId = deleteCustomProgramButton.dataset.programId;
    const program = window.FitnessRpgState?.getCustomProgramById?.(programId);

    if (!program) return;

    const confirmed = window.confirm(`Supprimer le programme "${program.title}" ?`);

    if (!confirmed) return;

    window.FitnessRpgState.deleteCustomProgram(programId);
    window.FitnessRpgExercises.renderCategories();
    return;
  }

  const validateCustomProgramButton = target.closest(".validate-custom-program-btn");

  if (validateCustomProgramButton) {
    event.preventDefault();
    window.FitnessRpgExercises.validateCustomProgram(
      validateCustomProgramButton.dataset.programId
    );
    return;
  }

    const startGuidedCustomProgramButton = target.closest(".start-custom-program-guided-btn");

  if (startGuidedCustomProgramButton) {
    event.preventDefault();
    window.FitnessRpgExercises.startCustomProgramGuided(
      startGuidedCustomProgramButton.dataset.programId
    );
    return;
  }

  const validateCustomStepButton = target.closest(".validate-custom-step-btn");

  if (validateCustomStepButton) {
    event.preventDefault();
    window.FitnessRpgExercises.validateCustomProgramStep();
    return;
  }

  const previousCustomStepButton = target.closest(".custom-step-prev-btn");

  if (previousCustomStepButton) {
    event.preventDefault();
    window.FitnessRpgExercises.previousCustomProgramStep();
    return;
  }

  const cancelCustomProgramRunButton = target.closest("#cancelCustomProgramRunBtn");

  if (cancelCustomProgramRunButton) {
    event.preventDefault();
    window.FitnessRpgExercises.cancelCustomProgramGuided();
    return;
  }

  const startCustomStepTimerButton = target.closest(".start-custom-step-timer-btn");

  if (startCustomStepTimerButton) {
    event.preventDefault();
    window.FitnessRpgExercises.startCustomStepTimer();
    return;
  }

  const stopCustomStepTimerButton = target.closest(".stop-custom-step-timer-btn");

  if (stopCustomStepTimerButton) {
    event.preventDefault();
    window.FitnessRpgExercises.stopCustomStepTimer();
    return;
  }

  // ============================================================
  // Catégories d'exercices
  // ============================================================

  const categoryButton = target.closest(".exercise-category-card, .v3-category-card");

  if (categoryButton) {
    event.preventDefault();

    const categoryId = categoryButton.dataset.categoryId;

    if (categoryId) {
      window.FitnessRpgExercises.renderCategoryExercises(categoryId, 0);
    }

    return;
  }

  const backButton = target.closest("#backToExerciseCategoriesBtn");

  if (backButton) {
    event.preventDefault();
    window.FitnessRpgExercises.currentCategoryId = null;
    window.FitnessRpgExercises.renderCategories();
    return;
  }

  // ============================================================
  // Modale explication exercice
  // ============================================================

  const imageButton = target.closest(
    ".exercise-image-button, .v3-exercise-image-button, .v3-program-exercise-image"
  );

  if (imageButton) {
    event.preventDefault();

    const exerciseId = imageButton.dataset.exerciseId;

    if (exerciseId) {
      window.FitnessRpgExercises.openExerciseDetails(exerciseId);
    }

    return;
  }

  if (target.closest("#closeExerciseDetailButton")) {
    event.preventDefault();
    window.FitnessRpgExercises.closeExerciseDetails();
    return;
  }

  if (target.id === "exerciseDetailOverlay") {
    event.preventDefault();
    window.FitnessRpgExercises.closeExerciseDetails();
    return;
  }

  // ============================================================
  // Pagination exercices
  // ============================================================

  const pageButton = target.closest(".exercise-page-btn");

  if (pageButton) {
    event.preventDefault();

    const delta = Number(pageButton.dataset.delta || 0);
    const categoryId = window.FitnessRpgExercises.currentCategoryId;
    const page = Number(window.FitnessRpgExercises.currentExercisePage || 0) + delta;

    if (categoryId) {
      window.FitnessRpgExercises.renderCategoryExercises(categoryId, page);
    }

    return;
  }

  // ============================================================
  // Timer
  // ============================================================

  const timerButton = target.closest(".start-timer-btn");

  if (timerButton) {
    event.preventDefault();

    const exerciseId = timerButton.dataset.exerciseId;

    if (exerciseId) {
      window.FitnessRpgExercises.openTimer(exerciseId);
    }

    return;
  }

  // ============================================================
  // Validation exercice simple
  // ============================================================

  const validateButton = target.closest(".validate-exercise-btn");

  if (validateButton) {
    event.preventDefault();

    const exerciseId = validateButton.dataset.exerciseId;

    if (exerciseId) {
      window.FitnessRpgExercises.validateExercise(exerciseId);
    }

    return;
  }

  // ============================================================
  // Clic sur carte exercice
  // ============================================================

  const exerciseCard = target.closest(".exercise-card");

  if (exerciseCard && !target.closest("button, input, label")) {
    const exerciseId = exerciseCard.dataset.exerciseId;

    if (exerciseId) {
      window.FitnessRpgExercises.explainExercise(exerciseId);
    }

    return;
  }
};
// ============================================================
// Initialisation
// ============================================================

window.FitnessRpgExercises.init = function initExercises() {
  document.removeEventListener("click", window.FitnessRpgExercises.handleDocumentClick);
  document.addEventListener("click", window.FitnessRpgExercises.handleDocumentClick);
};
  


