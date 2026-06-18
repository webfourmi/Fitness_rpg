// ============================================================
// Fitness RPG - app-render.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - afficher les pages ;
// - afficher l’accueil ;
// - afficher le héros et sa progression ;
// - afficher le coach ;
// - afficher la quête du jour ;
// - afficher les badges ;
// - afficher le journal ;
// - afficher le suivi du poids.
//
// Règle importante :
// ce fichier ne contient aucune version en dur.
// Il ne modifie jamais document.title directement.
// ============================================================

window.FitnessRpgRender = {};

// ============================================================
// Raccourcis DOM
// ============================================================

window.FitnessRpgRender.$ = function $(selector) {
  return document.querySelector(selector);
};

window.FitnessRpgRender.$$ = function $$(selector) {
  return Array.from(document.querySelectorAll(selector));
};

window.FitnessRpgRender.setText = function setText(selectorOrNode, value) {
  const node = typeof selectorOrNode === "string"
    ? document.querySelector(selectorOrNode)
    : selectorOrNode;

  if (node) node.textContent = value ?? "";
};

window.FitnessRpgRender.clear = function clear(selectorOrNode) {
  const node = typeof selectorOrNode === "string"
    ? document.querySelector(selectorOrNode)
    : selectorOrNode;

  if (node) node.innerHTML = "";
};

window.FitnessRpgRender.create = function create(tag, className = "", text = "") {
  const element = document.createElement(tag);

  if (className) element.className = className;
  if (text) element.textContent = text;

  return element;
};
// ============================================================
// Modal RPG globale
// ============================================================

window.FitnessRpgRender.escapeHtml = function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

window.FitnessRpgRender.ensureModal = function ensureModal() {
  let overlay = document.querySelector("#rpgModalOverlay");

  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.id = "rpgModalOverlay";
  overlay.className = "rpg-modal-overlay hidden";
  overlay.setAttribute("aria-hidden", "true");

  overlay.innerHTML = `
    <section class="rpg-modal-card card" role="dialog" aria-modal="true" aria-labelledby="rpgModalTitle">
      <div class="rpg-modal-icon" id="rpgModalIcon">⚔️</div>

      <div class="rpg-modal-content">
        <h2 id="rpgModalTitle">Message</h2>
        <div id="rpgModalMessage" class="rpg-modal-message"></div>

        <div id="rpgModalActions" class="rpg-modal-actions">
          <button id="rpgModalOkButton" class="primary-btn" type="button">OK</button>
        </div>
      </div>
    </section>
  `;

  document.body.appendChild(overlay);

  return overlay;
};

window.FitnessRpgRender.showModal = function showModal(options = {}) {
  const overlay = window.FitnessRpgRender.ensureModal();

  const icon = overlay.querySelector("#rpgModalIcon");
  const title = overlay.querySelector("#rpgModalTitle");
  const message = overlay.querySelector("#rpgModalMessage");
  const actions = overlay.querySelector("#rpgModalActions");

  const modalIcon = options.icon || "⚔️";
  const modalTitle = options.title || "Message du coach";
  const modalMessage = options.message || "";
  const okText = options.okText || "OK";
  const onOk = typeof options.onOk === "function" ? options.onOk : null;

  if (icon) icon.textContent = modalIcon;
  if (title) title.textContent = modalTitle;

  if (message) {
    if (Array.isArray(modalMessage)) {
      message.innerHTML = modalMessage
        .map((line) => `<p>${window.FitnessRpgRender.escapeHtml(line)}</p>`)
        .join("");
    } else {
      message.innerHTML = String(modalMessage)
        .split("\n")
        .map((line) => `<p>${window.FitnessRpgRender.escapeHtml(line)}</p>`)
        .join("");
    }
  }

  if (actions) {
    actions.innerHTML = `
      <button id="rpgModalOkButton" class="primary-btn" type="button">
        ${window.FitnessRpgRender.escapeHtml(okText)}
      </button>
    `;
  }

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");

  const okButton = overlay.querySelector("#rpgModalOkButton");

  if (okButton) {
    okButton.focus();

    okButton.onclick = () => {
      window.FitnessRpgRender.closeModal();

      if (onOk) onOk();
    };
  }
};

window.FitnessRpgRender.closeModal = function closeModal() {
  const overlay = document.querySelector("#rpgModalOverlay");

  if (!overlay) return;

  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
};
// ============================================================
// Pages
// ============================================================

window.FitnessRpgRender.renderPages = function renderPages() {
  const currentPage = window.FitnessRpgState.getPage?.() || "home";
  
  document.body.dataset.page = currentPage;

  document.querySelectorAll(".app-page").forEach((page) => {
    page.classList.toggle("hidden", page.dataset.page !== currentPage);
  });

  const header = document.querySelector("#appHeader");

  if (header) {
    header.classList.remove("hidden");
  }
  const homeButton = document.querySelector("#homeButton");
  const backButton = document.querySelector("#backButton");
  const headerProgramsButton = document.querySelector("#headerProgramsButton");
  const headerGoalButton = document.querySelector("#headerGoalButton");
  const headerPlanningButton = document.querySelector("#headerPlanningButton");

  if (homeButton) {
    homeButton.classList.toggle("hidden", currentPage === "home");
  }

  if (backButton) {
    backButton.classList.toggle("hidden", currentPage === "home");
  }
  if (headerProgramsButton) {
    headerProgramsButton.classList.toggle("hidden", currentPage === "home");
  }
  
  if (headerGoalButton) {
    headerGoalButton.classList.toggle("hidden", currentPage === "home");
  }
  if (headerPlanningButton) {
    headerPlanningButton.classList.toggle("hidden", currentPage === "home");
  }
};

window.FitnessRpgRender.renderVersion = function renderVersion() {
  window.FitnessRpgConfig?.setVersionLabels?.();
};

// ============================================================
// Images sûres
// ============================================================

window.FitnessRpgRender.setSafeImage = function setSafeImage(img, src, fallback = "") {
  if (!img) return;

  img.onerror = () => {
    img.onerror = null;

    if (fallback && img.src !== fallback) {
      img.src = fallback;
    }
  };

  img.src = src || fallback || "";
};

// ============================================================
// Accueil
// ============================================================

window.FitnessRpgRender.renderHome = function renderHome() {
  const profile = window.FitnessRpgState.getProfile?.();

  const duplicateBadge = document.querySelector("#homeGameVersionBadge");
  if (duplicateBadge) duplicateBadge.classList.add("hidden");

  const homeEyebrow = document.querySelector("#homePanel .eyebrow");
  if (homeEyebrow && homeEyebrow.textContent.trim().toLowerCase().includes("fitness")) {
    homeEyebrow.classList.add("hidden");
  }

  const homeVersion = document.querySelector("#homeVersionText");
  if (homeVersion) homeVersion.classList.add("hidden");

  const homeTitle = document.querySelector("#homeTitle");
  if (homeTitle) {
    homeTitle.textContent = "Ton entraînement devient une aventure";
  }

  const homeIntro = document.querySelector("#homeIntroText");
  if (homeIntro) {
    homeIntro.classList.add("hidden");
  }

  window.FitnessRpgRender.prepareHomeImageInfoToggle();

  if (!profile) {
    window.FitnessRpgRender.setText("#homeHeroSummary", "Aucun héros créé.");
    window.FitnessRpgRender.setText("#homeCoachSummary", "Aucun coach choisi.");
    return;
  }

  const info = window.FitnessRpgConfig.levelInfo(profile.totalXp || 0);
  const coach = window.FitnessRpgData.getCoach(profile.coachId);

  window.FitnessRpgRender.setText(
    "#homeHeroSummary",
    `${profile.name} · Niv. ${info.level} · ${info.rank} · ${profile.totalXp || 0} XP`
  );

  window.FitnessRpgRender.setText(
    "#homeCoachSummary",
    `Coach actuel : ${coach.fullName}`
  );
};

window.FitnessRpgRender.prepareHomeImageInfoToggle = function prepareHomeImageInfoToggle() {
  const image = document.querySelector("#homeSplashImage");
  const infoBox = document.querySelector("#homeImageInfoText");

  if (!image) return;

  if (infoBox) {
    infoBox.classList.add("hidden");
  }

  if (image.dataset.trainingLinkReady === "true") return;

  image.dataset.trainingLinkReady = "true";
  image.style.cursor = "pointer";
  image.setAttribute("title", "Entrer dans l’entraînement");

  image.addEventListener("click", () => {
    window.FitnessRpgNavigation.goTraining();
  });
};

window.FitnessRpgRender.renderHeroMenu = function renderHeroMenu() {
  const summary = document.querySelector("#heroMenuSummary");
  const profile = window.FitnessRpgState.getProfile?.();

  if (!summary) return;

  if (!profile) {
    summary.textContent = "Aucun héros créé pour l’instant.";
    return;
  }

  const info = window.FitnessRpgProgress.getProfileLevelInfo?.()
    || window.FitnessRpgConfig.levelInfo(profile.totalXp || 0);

  summary.textContent = `${profile.name || "Héros"} · Niv. ${info.level} · ${info.rank}`;
};
// ============================================================
// Création / modification du héros
// ============================================================

window.FitnessRpgRender.renderHeroSetup = function renderHeroSetup() {
  const profile = window.FitnessRpgState.getProfile?.();
  const mode = window.FitnessRpgNavigation.heroSetupMode || (profile ? "edit-hero" : "create");

  const title = document.querySelector("#heroSetupTitle");
  const help = document.querySelector("#heroSetupHelp");
  const saveButton = document.querySelector("#saveHeroButton");
  const formGrid = document.querySelector("#pageHeroSetup .form-grid");
  const coachSelection = document.querySelector("#pageHeroSetup .coach-selection");

  const isCreate = mode === "create" || !profile;
  const isEditHero = mode === "edit-hero" && profile;
  const isEditCoach = mode === "edit-coach" && profile;

  if (formGrid) {
    formGrid.classList.toggle("hidden", isEditCoach);
  }

  if (coachSelection) {
    coachSelection.classList.toggle("hidden", isEditHero);
  }

  if (isEditCoach) {
    window.FitnessRpgRender.setText(title, "Changer de coach");
    window.FitnessRpgRender.setText(help, "Choisis le coach qui accompagnera ton héros.");
    window.FitnessRpgRender.setText(saveButton, "Enregistrer le coach");
    window.FitnessRpgState.selectedCoachId = profile.coachId || "korvan";
    window.FitnessRpgRender.renderCoachChoices();
    return;
  }

  if (isEditHero) {
    window.FitnessRpgRender.setText(title, "Modifier ton héros");
    window.FitnessRpgRender.setText(help, "Tu peux ajuster le nom, l’âge ou le genre du héros.");
    window.FitnessRpgRender.setText(saveButton, "Enregistrer le héros");

    const nameInput = document.querySelector("#heroNameInput");
    const ageInput = document.querySelector("#heroAgeInput");

    if (nameInput && !nameInput.value) nameInput.value = profile.name || "";
    if (ageInput && !ageInput.value && profile.age) ageInput.value = profile.age;

    const genderInput = document.querySelector(`input[name="heroGender"][value="${profile.gender || "homme"}"]`);
    if (genderInput) genderInput.checked = true;

    return;
  }

  window.FitnessRpgRender.setText(title, "Créer ton héros");
  window.FitnessRpgRender.setText(help, "Choisis ton profil et ton coach pour commencer.");
  window.FitnessRpgRender.setText(saveButton, "Commencer l’aventure");

  window.FitnessRpgRender.renderCoachChoices();
};

window.FitnessRpgRender.renderCoachChoices = function renderCoachChoices() {
  const grid = document.querySelector("#coachChoiceGrid");
  if (!grid) return;

  const coaches = Object.values(window.FitnessRpgData.coaches || {});
  if (!coaches.length) {
    grid.innerHTML = "<p>Aucun coach disponible.</p>";
    return;
  }

  const selectedCoachId =
    window.FitnessRpgState.selectedCoachId
    || window.FitnessRpgState.getCoachId?.()
    || coaches[0].id;

  let selectedIndex = coaches.findIndex((coach) => coach.id === selectedCoachId);

  if (selectedIndex < 0) {
    selectedIndex = 0;
    window.FitnessRpgState.selectedCoachId = coaches[0].id;
  }

  const coach = coaches[selectedIndex];

  grid.className = "coach-choice-grid coach-carousel-root";
  grid.innerHTML = `
    <div class="coach-carousel">
      <button
        id="prevCoachButton"
        class="coach-carousel-btn ghost-btn"
        type="button"
        data-delta="-1"
        aria-label="Coach précédent"
      >
        ‹
      </button>

      <div class="coach-carousel-viewport">
        <label class="coach-choice-card coach-carousel-card active" data-coach-id="${coach.id}">
          <input type="radio" name="coachChoice" value="${coach.id}" checked />

          <img src="${coach.image}" alt="${coach.fullName}" />

          <div class="coach-carousel-text">
            <strong>${coach.name}</strong>
            <span>${coach.fullName}</span>
          </div>
        </label>
      </div>

      <button
        id="nextCoachButton"
        class="coach-carousel-btn ghost-btn"
        type="button"
        data-delta="1"
        aria-label="Coach suivant"
      >
        ›
      </button>
    </div>

    <div class="coach-carousel-dots" aria-label="Choix du coach">
      ${coaches.map((item, index) => {
        return `
          <button
            class="coach-carousel-dot${index === selectedIndex ? " active" : ""}"
            type="button"
            data-coach-id="${item.id}"
            aria-label="Choisir ${item.name}"
          ></button>
        `;
      }).join("")}
    </div>
  `;

  const img = grid.querySelector("img");
  window.FitnessRpgRender.setSafeImage(img, coach.image, coach.fallbackImage);
};

window.FitnessRpgRender.changeCoachCarousel = function changeCoachCarousel(delta = 1) {
  const coaches = Object.values(window.FitnessRpgData.coaches || {});
  if (!coaches.length) return;

  const selectedCoachId =
    window.FitnessRpgState.selectedCoachId
    || window.FitnessRpgState.getCoachId?.()
    || coaches[0].id;

  const currentIndex = Math.max(
    0,
    coaches.findIndex((coach) => coach.id === selectedCoachId)
  );

  const nextIndex = (currentIndex + Number(delta || 0) + coaches.length) % coaches.length;
  const nextCoach = coaches[nextIndex];

  if (!nextCoach) return;

  window.FitnessRpgState.selectedCoachId = nextCoach.id;
  window.FitnessRpgRender.renderCoachChoices();
};

window.FitnessRpgRender.selectCoachFromCarousel = function selectCoachFromCarousel(coachId) {
  if (!coachId) return;

  window.FitnessRpgState.selectedCoachId = coachId;
  window.FitnessRpgRender.renderCoachChoices();
};
// ============================================================
// Page entraînement
// ============================================================

window.FitnessRpgRender.renderTraining = function renderTraining() {
  const profile = window.FitnessRpgState.getProfile?.();

  if (!profile) return;

  window.FitnessRpgRender.renderHeroPanel();
  window.FitnessRpgRender.renderCoachPanel();
  window.FitnessRpgRender.renderTodayCard();
};

window.FitnessRpgRender.renderHeroPanel = function renderHeroPanel() {
  const profile = window.FitnessRpgState.getProfile?.();

  if (!profile) return;

  const info = window.FitnessRpgProgress.getProfileLevelInfo();
  const heroPath = window.FitnessRpgProgress.getHeroImagePath();
  const heroFrame = document.querySelector("#heroImageFrame");

  const pendingLevelUp = window.FitnessRpgProgress.peekLevelUpModal?.();
  const levelUpClass = pendingLevelUp ? " level-up-pulse" : "";

const heroName = window.FitnessRpgRender.escapeHtml
  ? window.FitnessRpgRender.escapeHtml(profile.name || "Héros")
  : String(profile.name || "Héros").replace(/[&<>"']/g, (char) => {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[char];
    });

if (heroFrame) {
  heroFrame.innerHTML = `
    <img
      id="heroImage"
      class="hero-image${levelUpClass}"
      src="${heroPath}"
      alt="${heroName}"
    />

    <span class="hero-level-badge">Niv. ${info.level}</span>

    <div class="hero-name-banner" aria-label="Nom du héros">
      <span class="hero-name-banner-tail left"></span>
      <span class="hero-name-banner-text">${heroName}</span>
      <span class="hero-name-banner-tail right"></span>
    </div>
  `;
}


/*
  Ligne blanche redondante désactivée.
  On garde la donnée, mais on ne l’affiche plus.
*/
window.FitnessRpgRender.setText("#heroIdentityLine", "");

  window.FitnessRpgRender.setText(
    "#xpTitle",
    `Niv. ${info.level} · ${info.rank}`
  );

  window.FitnessRpgRender.setText(
    "#xpText",
    window.FitnessRpgProgress.getXpText()
  );

  const xpBar = document.querySelector("#xpBar");
  if (xpBar) {
    xpBar.style.width = `${window.FitnessRpgProgress.getXpPercent()}%`;
  }

  window.FitnessRpgRender.setText("#streakLabel", profile.streak || 0);
  window.FitnessRpgRender.setText("#todayEntriesLabel", window.FitnessRpgState.getTodayEntries().length);
};

 
window.FitnessRpgRender.renderCoachPanel = function renderCoachPanel() {
  const profile = window.FitnessRpgState.getProfile?.();

  if (!profile) return;

  const coachId = window.FitnessRpgState.getCoachId();
  const coach = window.FitnessRpgData.getCoach(coachId);
  const pose = window.FitnessRpgState.getPose();
  const img = document.querySelector("#coachImage");

  const src = window.FitnessRpgData.getCoachImage(coachId, pose);

  window.FitnessRpgRender.setSafeImage(img, src, coach.fallbackImage);
  if (img) img.alt = coach.fullName;

  window.FitnessRpgRender.setText("#coachName", coach.fullName);

  const messageNode = document.querySelector("#coachMessage");

  if (messageNode && !messageNode.textContent.trim()) {
    messageNode.textContent = window.FitnessRpgData.getCoachMessage(coachId, "start");
  }
};

window.FitnessRpgRender.renderTodayCard = function renderTodayCard() {
  const quest = window.FitnessRpgPrograms.getTodayPlanningQuest?.()
    || window.FitnessRpgPrograms.getTodayQuest?.();

  if (!quest) {
    window.FitnessRpgRender.setText("#todayProgramTitle", "Éveil du héros");
    window.FitnessRpgRender.setText(
      "#todayProgramDescription",
      "Séance douce pour reprendre l’aventure."
    );
    return;
  }

  window.FitnessRpgRender.setText("#todayProgramTitle", quest.title);

  window.FitnessRpgRender.setText(
    "#todayProgramDescription",
    `${quest.subtitle} · ${quest.description}`
  );

  const todayCard = document.querySelector("#todayCard");

  if (todayCard) {
    todayCard.dataset.programId = quest.programId || "";
    todayCard.dataset.weekNumber = quest.weekNumber || 1;
    todayCard.dataset.dayNumber = quest.dayNumber || 1;
    todayCard.dataset.source = quest.source || "planning";
  }

  const openButton = document.querySelector("#openTodayProgramButton");

  if (openButton) {
    openButton.dataset.programId = quest.programId || "";
    openButton.dataset.weekNumber = quest.weekNumber || 1;
    openButton.dataset.dayNumber = quest.dayNumber || 1;

    if (quest.source === "boss-locked") {
      openButton.textContent = "Rattraper une séance";
    } else if (!quest.programId) {
      openButton.textContent = "Jour de repos";
    } else {
      openButton.textContent = "Voir la séance du jour";
    }
  }
};

// ============================================================
// Objectif personnel
// ============================================================

  window.FitnessRpgRender.renderGoalPage = function renderGoalPage() {
    const list = document.querySelector("#goalChoiceList");
    if (!list) return;
  
    const goals = window.FitnessRpgConfig.goals || [];
    const selectedGoalId = window.FitnessRpgState.getGoalId?.() || "reprise-douce";
  
    list.innerHTML = "";
  
    goals.forEach((goal) => {
      const program = window.FitnessRpgConfig.getProgramById(goal.recommendedProgramId);
  
      const card = document.createElement("article");
      card.className = `goal-choice-card card${goal.id === selectedGoalId ? " selected" : ""}`;
      card.dataset.goalId = goal.id;
  
      card.innerHTML = `
        <div class="goal-icon">${goal.icon}</div>
        <div>
          <h2>${goal.title}</h2>
          <p>${goal.rhythm}</p>
          <p class="goal-program">
            Programme conseillé : <strong>${program?.title || "Éveil du héros"}</strong>
          </p>
         <button class="primary-btn choose-goal-btn" type="button" data-goal-id="${goal.id}">
            ${goal.id === selectedGoalId ? "Objectif actuel" : "Choisir cet objectif"}
         </button>
        </div>
      `;
  
      list.appendChild(card);
    });
  };

// ============================================================
// Séance de programme active
// ============================================================

window.FitnessRpgRender.renderActiveProgramSession = function renderActiveProgramSession() {
  const detail = document.querySelector("#programDetail");
  const session = window.FitnessRpgState.getActiveProgramSession?.();

  if (!detail || !session) return;

  const program = window.FitnessRpgConfig.getProgramById(session.programId);
  const workout = window.FitnessRpgPrograms.getActiveProgramWorkout?.(session);

  if (!program || !workout) return;

  const isBoss = session.type === "program-boss";
  const complete = window.FitnessRpgState.isProgramSessionComplete();

  const xp = isBoss
    ? Number(workout.xp || workout.boss?.xp || 50)
    : (
        window.FitnessRpgProgress.calculateProgramSessionXp
          ? window.FitnessRpgProgress.calculateProgramSessionXp(
              session.programId,
              session.dayNumber,
              session.weekNumber || 1
            )
          : Number(workout.xp || 20)
      );

const exercisesHtml = workout.exercises.map((item, index) => {
  const exercise = window.FitnessRpgData.getExerciseById(item.exerciseId);
  const exerciseKey = `${index}-${item.exerciseId}`;
  const done = window.FitnessRpgState.isProgramSessionExerciseDone(exerciseKey);
  const canUseTimer = item.unit === "min" || item.unit === "sec" || exercise?.hasTimer;

  const actionsHtml = `
    ${
      canUseTimer
        ? `<button
            class="ghost-btn start-program-exercise-timer-btn"
            type="button"
            data-exercise-id="${item.exerciseId}"
            data-exercise-key="${exerciseKey}"
          >
            ⏱️ Timer
          </button>`
        : ""
    }

    <button
      class="${done ? "ghost-btn" : "secondary-btn"} validate-program-exercise-btn"
      type="button"
      data-exercise-id="${item.exerciseId}"
      data-exercise-key="${exerciseKey}"
    >
      ${done ? "Validé" : "Valider"}
    </button>
  `;

  if (typeof window.FitnessRpgExercises?.programExerciseCardHtml === "function") {
    return window.FitnessRpgExercises.programExerciseCardHtml(item, index, {
      done,
      actionsHtml
    });
  }

  return `
    <article class="program-session-exercise${done ? " done" : ""}">
      <div class="program-session-index">${index + 1}</div>

      <div>
        <strong>${item.phase}</strong>
        <h3>${exercise?.title || item.exerciseId}</h3>
        <p>${item.amount} ${item.unit}</p>
      </div>

      <div class="program-session-actions">
        ${actionsHtml}
      </div>
    </article>
  `;
}).join("");

  const doneCount = window.FitnessRpgState.getProgramSessionCompletedCount?.() || 0;
  const totalCount = workout.exercises.length;

  const title = isBoss
    ? `${program.title} · ${workout.title}`
    : `${program.title} · Semaine ${session.weekNumber || 1} · Jour ${workout.day}`;

  const subtitle = isBoss
    ? `${workout.subtitle || ""} · ${workout.label || ""}`.replace(/^ · | · $/g, "")
    : workout.title;

  const sessionHtml = `
    <section id="activeProgramSession" class="active-program-session card">
      <p class="eyebrow">${isBoss ? "🐉 Boss en cours" : `${program.icon} Séance en cours`}</p>
      <h2>${title}</h2>
      <p>${subtitle}</p>

      <div class="program-session-meta">
        <span>${workout.difficultyLabel || "Défi"}</span>
        <span>${doneCount}/${totalCount} exercices</span>
        <span>${xp} XP final</span>
      </div>

      <div class="program-session-list">
        ${exercisesHtml}
      </div>

      <button
        id="finishProgramSessionButton"
        class="primary-btn"
        type="button"
        ${complete ? "" : "disabled"}
      >
        ${complete ? `Terminer · +${xp} XP` : "Valide tous les exercices pour terminer"}
      </button>
    </section>
  `;

  const oldSession = detail.querySelector("#activeProgramSession");
  if (oldSession) oldSession.remove();

  detail.insertAdjacentHTML("afterbegin", sessionHtml);
};

// ============================================================
// Planning hebdomadaire
// ============================================================

  
  
window.FitnessRpgRender.renderPlanningPage = function renderPlanningPage() {
  const summary = document.querySelector("#planningSummary");
  const grid = document.querySelector("#planningWeekGrid");

  if (!summary || !grid) return;

 const goalId = window.FitnessRpgState.getGoalId?.() || "reprise-douce";
const goal = window.FitnessRpgConfig.getGoalById(goalId);

const todayQuest = window.FitnessRpgPrograms.getTodayPlanningQuest?.();

const plan = todayQuest?.plan || (
  window.FitnessRpgPrograms.getCombinedWeeklyPlan
    ? window.FitnessRpgPrograms.getCombinedWeeklyPlan(goalId)
    : window.FitnessRpgPrograms.getWeeklyPlan(goalId)
);

const todayIndex = todayQuest?.index ?? window.FitnessRpgPrograms.getTodayPlanIndex();
const todayItem = {
  index: todayIndex,
  dayLabel: todayQuest?.dayLabel || "Jour",
  title: todayQuest?.title || "Séance",
  programId: todayQuest?.programId || null,
  source: todayQuest?.source || "goal",
  plan
};

  const todayProgram = todayItem.programId
    ? window.FitnessRpgConfig.getProgramById(todayItem.programId)
    : null;

  const weekKeys = window.FitnessRpgState.getWeekKeys();
  const todayKey = window.FitnessRpgState.todayKey();
  const stats = window.FitnessRpgState.getWeeklyActivityStats();
  const bonus = window.FitnessRpgProgress.getWeeklyPlanningBonusStatus();

  const todayDone = todayProgram
    ? window.FitnessRpgState.hasDoneProgramOnDate(todayProgram.id, todayKey)
    : window.FitnessRpgState.hasTrainingToday();

  const activeProgramId = window.FitnessRpgState.getActiveProgramId?.();
  const activeProgram = activeProgramId
    ? window.FitnessRpgConfig.getProgramById(activeProgramId)
    : null;

  const bossLockedToday = todayItem.source === "boss-locked";
  const missingSessions = window.FitnessRpgPrograms.getMissingMainSessionsThisWeek?.() || [];
  const firstMissing = missingSessions[0] || null;
  
  if (bossLockedToday) {
    window.FitnessRpgState.setPose?.("motivate");
  
    const coachMessage = document.querySelector("#coachMessage");
    if (coachMessage) {
      coachMessage.textContent = "Tu n’as pas réussi à faire tout ton programme ! Rattrape une des séances de ta semaine maintenant !";
    }
}
  
summary.innerHTML = `
  <div class="planning-compact-header">
    <span class="eyebrow">${goal?.icon || "🎯"} Planning interactif</span>
    <span><strong>Programme :</strong> ${activeProgram?.title || "Aucun programme choisi"}</span>
    <span><strong>Objectif :</strong> ${goal?.title || "Reprise douce"}</span>
  </div>

  <section class="today-planning-card compact">
    <div class="today-planning-line">
      <strong>Aujourd’hui · ${todayItem.dayLabel}</strong>
      <span>${todayItem.title}</span>
      <span>${todayProgram ? todayProgram.duration : "Repos"}</span>
    </div>

 ${
  todayProgram
    ? `<button id="startTodayPlanningButton" class="primary-btn" type="button">
        Démarrer la séance du jour
      </button>`
    : bossLockedToday && firstMissing
      ? `<button id="startWeeklyCatchupButton" class="primary-btn" type="button">
          Rattraper : ${firstMissing.dayLabel} · ${firstMissing.title}
        </button>`
      : bossLockedToday
        ? `<button class="ghost-btn" type="button" disabled>
            Boss verrouillé · valide les 5 séances
          </button>`
        : `<button class="ghost-btn" type="button" disabled>
            Jour de repos
          </button>`
}
  </section>

  <section class="planning-week-progress">
    <div>
      <strong>${stats.activeDays}/7</strong>
      <span>jours actifs</span>
    </div>
    <div>
      <strong>${stats.totalEntries}</strong>
      <span>entrées cette semaine</span>
    </div>
    <div>
      <strong>${bonus.earned ? "OK" : `${Math.min(bonus.activeDays, bonus.target)}/${bonus.target}`}</strong>
      <span>${bonus.earned ? "bonus obtenu" : `bonus +${bonus.xp} XP`}</span>
    </div>
  </section>
`;

  grid.innerHTML = "";

plan.forEach(([dayLabel, title, programId, source, bossWeekNumber], index) => {
    const dateKey = weekKeys[index];
    const entries = window.FitnessRpgState.getEntriesForDate(dateKey);
    const program = programId ? window.FitnessRpgConfig.getProgramById(programId) : null;

    const isToday = dateKey === todayKey;
    const done = source === "program-boss"
  ? entries.some((entry) => {
      return entry.type === "program-boss"
        && entry.programId === programId
        && Number(entry.weekNumber || 1) === Number(bossWeekNumber || 1);
    })
  : program
    ? window.FitnessRpgState.hasDoneProgramOnDate(program.id, dateKey)
    : entries.length > 0;
    const card = document.createElement("article");

    card.className = [
      "planning-day-card",
      "card",
      isToday ? "today" : "",
      done ? "done" : "",
      source === "rest" ? "rest-day" : "",
      source === "boss-locked" ? "boss-locked" : "",
      (source === "boss" || source === "program-boss") ? "boss-day" : "",
      source === "active-program" ? "active-program-day" : "",
      source === "goal" ? "goal-day" : ""
    ].filter(Boolean).join(" ");

    card.dataset.programId = programId || "";

    card.innerHTML = `
      <div class="planning-day-top">
        <strong>${dayLabel}</strong>
        <span>${isToday ? "Aujourd’hui" : done ? "Fait" : "À venir"}</span>
      </div>

      <h2>${title}</h2>

      <p>
        ${
          program
            ? `${program.title} · ${program.objective}`
            : "Repos ou récupération douce."
        }
      </p>

      <small>${entries.length} entrée${entries.length > 1 ? "s" : ""} ce jour</small>

      ${
        
          program
          ? `<button
              class="secondary-btn planning-program-btn"
              type="button"
              data-program-id="${program.id}"
              data-source="${source || "planning"}"
              data-week-number="${bossWeekNumber || 1}"
              data-date-key="${dateKey}"
            >
              ${
                source === "program-boss"
                  ? done ? "Boss vaincu" : "Choisir la mission"
                  : done ? "Revoir" : "Ouvrir"
              }
            </button>`
          : source === "boss-locked"
            ? `<span class="rest-label">Boss verrouillé</span>`
            : `<span class="rest-label">Repos</span>`
      }
    `;

    grid.appendChild(card);
  });
};

// ============================================================
// Programmes
// ============================================================

window.FitnessRpgRender.renderProgramList = function renderProgramList() {
  const list = document.querySelector("#programList");
  const detail = document.querySelector("#programDetail");

  if (!list) return;

  list.classList.remove("hidden");

  if (detail) {
    detail.classList.add("hidden");
    detail.innerHTML = "";
  }

  list.innerHTML = "";

  const programs = window.FitnessRpgConfig.programs || [];
  const activeProgramId = window.FitnessRpgState.getActiveProgramId?.();

  programs.forEach((program) => {
    const selected = program.id === activeProgramId;

    const card = document.createElement("article");
    card.className = `program-card card${selected ? " selected" : ""}`;
    card.dataset.programId = program.id;

    card.innerHTML = `
      <div class="program-icon">${program.icon}</div>

      <div>
        <h2>${program.title}</h2>
        <p>${program.objective}</p>

        <ul>
          <li><strong>Niveau :</strong> ${program.level}</li>
          <li><strong>Durée :</strong> ${program.duration}</li>
          <li><strong>Fréquence :</strong> ${program.frequency}</li>
          <li><strong>Coach conseillé :</strong> ${program.coachAdvice || "Libre"}</li>
        </ul>

        <div class="program-card-actions">
          <button
            class="secondary-btn open-program-detail-btn"
            type="button"
            data-program-id="${program.id}"
          >
            Voir le programme
          </button>

          <button
            class="${selected ? "secondary-btn" : "primary-btn"} choose-program-btn"
            type="button"
            data-program-id="${program.id}"
          >
            ${selected ? "Programme actuel" : "Choisir ce programme"}
          </button>
        </div>
      </div>
    `;

    list.appendChild(card);
  });
};
window.FitnessRpgRender.renderProgramBossChoiceHtml = function renderProgramBossChoiceHtml(programId, weekNumber = 1) {
  const boss = window.FitnessRpgPrograms.getProgramBoss?.(programId, weekNumber);

  if (!boss) return "";

  const unlocked = window.FitnessRpgPrograms.isProgramBossUnlocked?.(programId, weekNumber);
  const variants = boss.variants || {};
  const variantList = Object.values(variants);

  if (!variantList.length && Array.isArray(boss.exercises)) {
    variantList.push({
      id: "single",
      label: "⚔️ Boss",
      title: boss.title,
      mission: boss.coachLine || boss.subtitle || "",
      difficultyLabel: boss.difficultyLabel || "",
      exercises: boss.exercises
    });
  }

  const variantsHtml = variantList.map((variant) => {
    const exercisesPreview = (variant.exercises || [])
      .slice(0, 4)
      .map((item) => {
        const exercise = window.FitnessRpgData.getExerciseById(item.exerciseId);
        return `<li>${exercise?.title || item.exerciseId} · ${item.amount} ${item.unit}</li>`;
      })
      .join("");

    return `
      <article class="program-boss-variant-card">
        <h4>${variant.label || variant.title || "Boss"}</h4>
        <p>${variant.mission || ""}</p>
        <p><strong>${variant.difficultyLabel || boss.difficultyLabel || ""}</strong></p>
        <ul>${exercisesPreview}</ul>

        <button
          class="secondary-btn start-program-boss-btn"
          type="button"
          data-program-id="${programId}"
          data-week-number="${weekNumber}"
          data-variant-id="${variant.id || "single"}"
          ${unlocked ? "" : "disabled"}
        >
          ${unlocked ? "Démarrer cette mission" : "Boss verrouillé"}
        </button>
      </article>
    `;
  }).join("");

  return `
    <section class="program-boss-choice card">
      <p class="eyebrow">🐉 Boss de la semaine ${weekNumber}</p>
      <h3>${boss.title}</h3>
      <p>${boss.subtitle || boss.instructions || ""}</p>
      ${
        unlocked
          ? `<p class="success-text">Boss débloqué. Choisis ta mission.</p>`
          : `<p class="planning-coach-warning">${boss.lockedMessage || "Termine les 3 séances de la semaine pour débloquer le boss."}</p>`
      }
      <div class="program-boss-variants">
        ${variantsHtml}
      </div>
    </section>
  `;
};

window.FitnessRpgRender.renderProgramDetail = function renderProgramDetail(programId) {
  const list = document.querySelector("#programList");
  const detail = document.querySelector("#programDetail");

  if (!detail) return;

  const program = window.FitnessRpgConfig.getProgramById(programId);
  const programDetail = window.FitnessRpgData.getProgramDetail(programId);

  if (!program || !programDetail) {
    detail.classList.add("hidden");
    detail.innerHTML = "";

    if (list) list.classList.remove("hidden");

    return;
  }

  if (list) list.classList.add("hidden");

  detail.classList.remove("hidden");
  detail.dataset.programId = programId;

  const selection = window.FitnessRpgPrograms.getProgramBrowserSelection
  ? window.FitnessRpgPrograms.getProgramBrowserSelection(programId)
  : { weekNumber: 1, dayNumber: 1 };

  const weeks = window.FitnessRpgPrograms.getProgramWeeks(programId);
  const week = window.FitnessRpgPrograms.getSelectedProgramWeek(programId);
  const days = window.FitnessRpgPrograms.getProgramDaysForWeek(
    programId,
    selection.weekNumber
  );
 const bossHtml = window.FitnessRpgRender.renderProgramBossChoiceHtml(
  programId,
  selection.weekNumber || 1
);
  const day = window.FitnessRpgPrograms.getSelectedProgramDay(programId);

  const activeProgramId = window.FitnessRpgState.getActiveProgramId?.();
  const isActiveProgram = activeProgramId === programId;

  const suggested = window.FitnessRpgPrograms.getSuggestedProgramPosition(programId);

  if (!day) {
    detail.innerHTML = `
      <button id="backToProgramListBtn" class="ghost-btn" type="button">
        ← Choisir un autre programme
      </button>

      <p>Impossible d’afficher cette séance.</p>
    `;

    return;
  }

  const weekIndex = Math.max(
    0,
    weeks.findIndex((item) => Number(item.week) === Number(selection.weekNumber))
  );

  const dayIndex = Math.max(
    0,
    days.findIndex((item) => Number(item.day) === Number(selection.dayNumber))
  );

  const previousWeekDisabled = selection.weekNumber <= 1 ? "disabled" : "";
  const nextWeekDisabled = selection.weekNumber >= weeks.length ? "disabled" : "";

  const previousDayDisabled = dayIndex <= 0 ? "disabled" : "";
  const nextDayDisabled = dayIndex >= days.length - 1 ? "disabled" : "";

const exercisesHtml = day.exercises.map((item, index) => {
  if (typeof window.FitnessRpgExercises?.programExerciseCardHtml === "function") {
    return window.FitnessRpgExercises.programExerciseCardHtml(item, index);
  }

  const exercise = window.FitnessRpgData.getExerciseById(item.exerciseId);

  return `
    <article class="program-session-exercise">
      <div class="program-session-index">${index + 1}</div>

      <div>
        <strong>${item.phase}</strong>
        <h3>${exercise?.title || item.exerciseId}</h3>
        <p>${item.amount} ${item.unit}</p>
      </div>
    </article>
  `;
}).join("");

  const progressionHtml = (programDetail.progression || [])
    .map((line) => `<li>${line}</li>`)
    .join("");

  const weekNote = week?.progression
    ? `<p class="program-week-note">${week.progression}</p>`
    : "";

  const suggestedText = `Séance conseillée : semaine ${suggested.weekNumber}, jour ${suggested.dayNumber}`;

  detail.innerHTML = `
    <button id="backToProgramListBtn" class="ghost-btn" type="button">
      ← Choisir un autre programme
    </button>

   <header class="program-detail-header">
    <p class="eyebrow">${program.icon} ${program.objective}</p>
    <h2>${program.title}</h2>
    <p>${program.duration} · ${program.frequency}</p>
  
    <div class="program-detail-actions">
      <button
        class="ghost-btn reset-program-progress-btn"
        type="button"
        data-program-id="${programId}"
      >
        ♻️ Réinitialiser ce programme
      </button>
    </div>
  </header>

    <section class="program-carousel card">
      <p class="eyebrow">Progression</p>

      <div class="program-carousel-row">
        <button
          class="ghost-btn program-week-carousel-btn"
          type="button"
          data-delta="-1"
          ${previousWeekDisabled}
        >
          ←
        </button>

        <div>
          <strong>Semaine ${selection.weekNumber}</strong>
          <span>${weekIndex + 1}/${weeks.length}</span>
        </div>

        <button
          class="ghost-btn program-week-carousel-btn"
          type="button"
          data-delta="1"
          ${nextWeekDisabled}
        >
          →
        </button>
      </div>

      ${weekNote}
    </section>

    <section class="program-carousel card">
      <p class="eyebrow">Séance</p>

      <div class="program-carousel-row">
        <button
          class="ghost-btn program-day-carousel-btn"
          type="button"
          data-delta="-1"
          ${previousDayDisabled}
        >
          ←
        </button>

        <div>
          <strong>Jour ${day.day}</strong>
          <span>${dayIndex + 1}/${days.length}</span>
        </div>

        <button
          class="ghost-btn program-day-carousel-btn"
          type="button"
          data-delta="1"
          ${nextDayDisabled}
        >
          →
        </button>
      </div>
    </section>

    <section class="program-days">
      <article class="program-day-card selected-program-day">
        <h3>Semaine ${selection.weekNumber} · Jour ${day.day} · ${day.title}</h3>

        <div class="program-preview-exercise-grid">
        ${exercisesHtml}
      </div>
        <button
          class="primary-btn start-program-day-btn"
          type="button"
          data-program-id="${programId}"
          data-week="${selection.weekNumber}"
          data-day="${day.day}"
        >
          Démarrer cette séance
        </button>
      </article>
    </section>
    ${bossHtml}

    <section class="program-detail-actions">
      <button
        class="${isActiveProgram ? "secondary-btn" : "primary-btn"} choose-program-btn"
        type="button"
        data-program-id="${programId}"
      >
        ${isActiveProgram ? "Programme actuel" : "Choisir ce programme"}
      </button>

      <button id="startProgramPlanningButton" class="secondary-btn" type="button">
        Voir le planning
      </button>
    </section>

    <section class="program-progression">
      <h3>Notes de progression</h3>
      <ul>${progressionHtml}</ul>
    </section>
  `;

  window.FitnessRpgRender.renderActiveProgramSession();
};

// ============================================================
// Exercices
// ============================================================

window.FitnessRpgRender.renderExerciseList = function renderExerciseList() {
  const list = document.querySelector("#exerciseList");
  if (!list) return;

  list.innerHTML = `
    <div id="exercisesContent"></div>
  `;

  window.setTimeout(() => {
    window.FitnessRpgExercises?.renderCategories?.();
  }, 0);
};

// ============================================================
// Badges
// ============================================================

window.FitnessRpgRender.renderBadges = function renderBadges() {
  const list = document.querySelector("#badgeList");
  if (!list) return;

  const badges = window.FitnessRpgProgress.getBadgeStatusList();

  list.innerHTML = "";

  badges.forEach((badge) => {
    const progress = window.FitnessRpgProgress.getBadgeProgress(badge);

    const item = document.createElement("article");
    item.className = `badge-card card${badge.unlocked ? " unlocked" : ""}`;

    item.innerHTML = `
      <div class="badge-icon">${badge.icon}</div>
      <div class="badge-content">
        <div class="badge-title-row">
          <h2>${badge.title}</h2>
          <strong>${badge.unlocked ? "Débloqué" : "En cours"}</strong>
        </div>

        <p>${badge.description}</p>

        <div class="badge-progress-bar">
          <div class="badge-progress-fill" style="width: ${badge.unlocked ? 100 : progress.percent}%"></div>
        </div>

        <span class="badge-progress-text">
          ${badge.unlocked ? "Récompense acquise" : `${progress.current}/${progress.target}`}
        </span>
      </div>
    `;

    list.appendChild(item);
  });
};
// ============================================================
// Journal
// ============================================================

window.FitnessRpgRender.renderJournal = function renderJournal() {
  const list = document.querySelector("#journalList");
  if (!list) return;

  const journal = window.FitnessRpgState.getJournal();

  list.innerHTML = "";

  if (!journal.length) {
    const empty = document.createElement("li");
    empty.textContent = "Aucun exploit enregistré pour l’instant.";
    list.appendChild(empty);
    return;
  }

  journal.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "journal-entry";

    const date = new Date(entry.at).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    item.innerHTML = `
      <strong>${entry.title}</strong>
      <span>${date}</span>
      <p>${entry.text}</p>
    `;

    list.appendChild(item);
  });
};

// ============================================================
// Poids
// ============================================================

window.FitnessRpgRender.renderWeight = function renderWeight() {
  const canvas = document.querySelector("#weightChart");
  if (!canvas) return;

  const weights = window.FitnessRpgState.getWeights();

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!weights.length) {
    ctx.font = "14px sans-serif";
    ctx.fillText("Aucune donnée de poids pour l’instant.", 20, 90);
    return;
  }

  const values = weights.map((entry) => Number(entry.value));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);

  ctx.beginPath();

  weights.forEach((entry, index) => {
    const x = 20 + (index / Math.max(1, weights.length - 1)) * (canvas.width - 40);
    const y = canvas.height - 20 - ((Number(entry.value) - min) / range) * (canvas.height - 50);

    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);

    ctx.fillRect(x - 2, y - 2, 4, 4);
  });

  ctx.stroke();

  ctx.font = "12px sans-serif";
  ctx.fillText(`${min.toFixed(1)} kg`, 10, canvas.height - 10);
  ctx.fillText(`${max.toFixed(1)} kg`, 10, 20);
};

// ============================================================
// Niveau supérieur
// ============================================================

window.FitnessRpgRender.getHeroImagePathForLevel = function getHeroImagePathForLevel(level) {
  const profile = window.FitnessRpgState.getProfile?.();
  const safeLevel = Math.max(1, Math.min(20, Number(level) || 1));
  const padded = String(safeLevel).padStart(2, "0");

  if (profile?.gender === "femme") {
    return `assets/joueuse/joueuse_niveau_${padded}.png`;
  }

  return `assets/joueur/joueur_niveau_${padded}.png`;
};

window.FitnessRpgRender.renderLevelUpOverlay = function renderLevelUpOverlay() {
  const pending = window.FitnessRpgProgress.peekLevelUpModal?.();
  const overlay = document.querySelector("#levelUpOverlay");

  if (!overlay || !pending) return;

  const oldLevel = Number(pending.oldLevel || 1);
  const newLevel = Number(pending.newLevel || 1);
  const rank = window.FitnessRpgConfig.getRankTitle(newLevel);
  const hasChest = window.FitnessRpgProgress.hasChestReward(newLevel);
  const narrative = window.FitnessRpgProgress.getLevelUpNarrative?.(newLevel) || "";

  const oldHeroImage = window.FitnessRpgRender.getHeroImagePathForLevel(oldLevel);
  const newHeroImage = window.FitnessRpgRender.getHeroImagePathForLevel(newLevel);

  const icon = document.querySelector("#levelUpIcon");
  const title = document.querySelector("#levelUpTitle");
  const text = document.querySelector("#levelUpText");
  const reward = document.querySelector("#levelUpReward");

  if (icon) icon.textContent = hasChest ? "🎁" : "✨";
  if (title) title.textContent = `Niveau ${newLevel} atteint !`;

 if (text) {
  text.innerHTML = `
    <div class="level-up-transform">
      <div class="level-up-hero-stage">
        <img src="${oldHeroImage}" alt="Ancien niveau" />
        <span>Niv. ${oldLevel}</span>
      </div>

      <div class="level-up-arrow">➜</div>

      <div class="level-up-hero-stage level-up-new">
        <img src="${newHeroImage}" alt="Nouveau niveau" />
        <span>Niv. ${newLevel}</span>
      </div>
    </div>

    <p>
      Ton héros devient <strong>${rank}</strong>.
    </p>

    ${
      narrative
        ? `<p class="level-up-narrative">${narrative}</p>`
        : ""
    }

    <p>
      ${hasChest ? "Transformation majeure accomplie." : "Nouvelle apparence héroïque débloquée."}
    </p>

    <button
      class="secondary-btn open-progression-from-levelup-btn"
      type="button"
    >
      Voir l’évolution du héros
    </button>
  `;
}

  if (reward) {
    reward.textContent = window.FitnessRpgProgress.getLevelRewardText(newLevel);
    reward.classList.toggle("hidden", false);
  }

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("level-up-active");
};

window.FitnessRpgRender.closeLevelUpOverlay = function closeLevelUpOverlay() {
  const overlay = document.querySelector("#levelUpOverlay");

  if (overlay) {
    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");
  }

  document.body.classList.remove("level-up-active");
  window.FitnessRpgProgress.consumeLevelUpModal?.();
  window.FitnessRpgRender.renderHeroPanel?.();
};
// ============================================================
// Carrousel évolution du héros
// ============================================================

window.FitnessRpgRender.heroEvolutionLevel = null;

window.FitnessRpgRender.getHeroImagePathForLevel = window.FitnessRpgRender.getHeroImagePathForLevel || function getHeroImagePathForLevel(level) {
  const profile = window.FitnessRpgState.getProfile?.();
  const safeLevel = Math.max(1, Math.min(20, Number(level) || 1));
  const padded = String(safeLevel).padStart(2, "0");

  if (profile?.gender === "femme") {
    return `assets/joueuse/joueuse_niveau_${padded}.png`;
  }

  return `assets/joueur/joueur_niveau_${padded}.png`;
};

window.FitnessRpgRender.renderHeroEvolutionCarousel = function renderHeroEvolutionCarousel() {
  const container = document.querySelector("#heroEvolutionCarousel");

  if (!container) return;

  const profile = window.FitnessRpgState.getProfile?.();

  if (!profile) {
    container.innerHTML = "";
    return;
  }

  const info = window.FitnessRpgConfig.levelInfo(profile.totalXp || 0);
  const currentLevel = Math.max(1, Math.min(20, Number(info.level) || 1));

  if (!window.FitnessRpgRender.heroEvolutionLevel) {
    window.FitnessRpgRender.heroEvolutionLevel = currentLevel;
  }

  const selectedLevel = Math.max(
    1,
    Math.min(currentLevel, Number(window.FitnessRpgRender.heroEvolutionLevel) || currentLevel)
  );

  window.FitnessRpgRender.heroEvolutionLevel = selectedLevel;

  const image = window.FitnessRpgRender.getHeroImagePathForLevel(selectedLevel);
  const rank = window.FitnessRpgConfig.getRankTitle(selectedLevel);

  container.innerHTML = `
    <p class="eyebrow">🧬 Évolution du héros</p>

    <div class="hero-level-carousel-row">
      <button
        class="ghost-btn hero-level-carousel-btn"
        type="button"
        data-delta="-1"
        ${selectedLevel <= 1 ? "disabled" : ""}
      >
        ←
      </button>

      <div class="hero-level-carousel-main">
        <img
          src="${image}"
          alt="Héros niveau ${selectedLevel}"
          class="hero-level-carousel-image"
        />

        <h2>Niveau ${selectedLevel}</h2>
        <p>${rank}</p>
        <span>
          ${selectedLevel === currentLevel ? "Apparence actuelle" : "Ancienne apparence débloquée"}
        </span>
      </div>

      <button
        class="ghost-btn hero-level-carousel-btn"
        type="button"
        data-delta="1"
        ${selectedLevel >= currentLevel ? "disabled" : ""}
      >
        →
      </button>
    </div>
  `;
};

window.FitnessRpgRender.changeHeroEvolutionLevel = function changeHeroEvolutionLevel(delta) {
  const profile = window.FitnessRpgState.getProfile?.();

  if (!profile) return;

  const info = window.FitnessRpgConfig.levelInfo(profile.totalXp || 0);
  const currentLevel = Math.max(1, Math.min(20, Number(info.level) || 1));
  const nextLevel = Number(window.FitnessRpgRender.heroEvolutionLevel || currentLevel) + Number(delta || 0);

  window.FitnessRpgRender.heroEvolutionLevel = Math.max(1, Math.min(currentLevel, nextLevel));
  window.FitnessRpgRender.renderHeroEvolutionCarousel();
};
// ============================================================
// Page progression RPG
// ============================================================


window.FitnessRpgRender.renderProgressionPage = function renderProgressionPage() {
  const summary = document.querySelector("#progressionSummary");
  const levelGrid = document.querySelector("#progressionLevelGrid");
  const badgeSummary = document.querySelector("#progressionBadgeSummary");

  if (!summary || !levelGrid || !badgeSummary) return;

  const stats = window.FitnessRpgProgress.getProgressionStats();
  const profile = stats.profile;

  if (!profile) {
    summary.innerHTML = `
      <p class="eyebrow">Aucun héros</p>
      <h2>Crée ton héros pour voir ta progression.</h2>
    `;
    levelGrid.innerHTML = "";
    badgeSummary.innerHTML = "";

    const heroEvolution = document.querySelector("#heroEvolutionCarousel");
    if (heroEvolution) heroEvolution.innerHTML = "";
    
    return;
  }


  const percent = window.FitnessRpgProgress.getXpPercent();
  const milestones = window.FitnessRpgProgress.getLevelMilestones(20);

  summary.innerHTML = `
    <p class="eyebrow">🏆 Fiche de progression</p>

    <div class="progression-hero-line">
      <div>
        <h2>${profile.name || "Héros"}</h2>
        <p>${stats.currentRank} · Niveau ${stats.currentLevel}</p>
      </div>
      <strong>${stats.totalXp} XP</strong>
    </div>

    <div class="progression-xp-block">
      <div class="progression-xp-top">
        <span>${stats.currentXp} / ${stats.nextXp} XP</span>
        <span>${stats.xpBeforeNextLevel} XP avant niveau suivant</span>
      </div>

      <div class="progress-bar">
        <div class="progress-fill" style="width: ${percent}%"></div>
      </div>
    </div>

    <div class="progression-stat-grid">
      <article>
        <strong>${stats.totalEntries}</strong>
        <span>entrées totales</span>
      </article>
      <article>
        <strong>${stats.programSessions}</strong>
        <span>séances terminées</span>
      </article>
      <article>
        <strong>${stats.streak}</strong>
        <span>série actuelle</span>
      </article>
      <article>
        <strong>${stats.unlockedBadgeCount}/${stats.totalBadgeCount}</strong>
        <span>badges</span>
      </article>
    </div>
  `;

  window.FitnessRpgRender.renderHeroEvolutionCarousel();

  levelGrid.innerHTML = milestones.map((item) => {
    return `
      <article class="level-milestone-card card ${item.unlocked ? "unlocked" : "locked"} ${item.current ? "current" : ""}">
        <strong>${item.chest ? "🎁" : "⭐"}</strong>
        <h3>Niv. ${item.level}</h3>
        <p>${item.rank}</p>
        <span>${item.current ? "Actuel" : item.unlocked ? "Atteint" : `${item.totalXpRequired} XP`}</span>
      </article>
    `;
  }).join("");

  const unlockedBadgesHtml = stats.unlockedBadges.length
    ? stats.unlockedBadges.map((badge) => {
        return `
          <article class="progression-mini-badge">
            <span>${badge.icon}</span>
            <div>
              <strong>${badge.title}</strong>
              <p>${badge.description}</p>
            </div>
          </article>
        `;
      }).join("")
    : `<p>Aucun badge débloqué pour l’instant. Le premier pas arrive vite.</p>`;

  badgeSummary.innerHTML = `
    <p class="eyebrow">🏅 Badges débloqués</p>
    <h2>${stats.unlockedBadgeCount}/${stats.totalBadgeCount}</h2>
    <div class="progression-badge-list">
      ${unlockedBadgesHtml}
    </div>
  `;
};
// ============================================================
// Coffre de récompense familier - version mobile
// ============================================================

window.FitnessRpgRender.currentChestReward = null;

window.FitnessRpgRender.renderChestRewardHtml = function renderChestRewardHtml(chestReward, isOpen = false) {
  if (!chestReward || !chestReward.success || !chestReward.familiar) {
    return `
      <div class="reward-chest-box">
        <h3>🎁 Coffre de récompense</h3>
        <p>Le coffre s’ouvre, mais aucun familier n’est disponible.</p>

        <button
          class="primary-btn close-chest-reward-modal-btn"
          type="button"
        >
          Continuer l’aventure
        </button>
      </div>
    `;
  }

  const familiar = chestReward.familiar;

  return `
    <div class="reward-chest-box ${isOpen ? "is-open" : "is-closed"}">
      <p class="eyebrow">🎁 Récompense</p>
      <h3>Coffre de récompense</h3>

      <div class="reward-chest-visual" aria-hidden="true">
        <div class="reward-chest-light"></div>
        <div class="reward-chest-lid"></div>
        <div class="reward-chest-base"></div>
        <div class="reward-chest-lock">✦</div>
      </div>

      ${
        !isOpen
          ? `
            <p class="reward-chest-intro">
              Un petit bruit gratte à l’intérieur du coffre...
            </p>

            <button
              class="primary-btn open-chest-reward-btn"
              type="button"
            >
              ✨ Ouvrir le coffre
            </button>
          `
          : `
            <div class="reward-familiar-card">
              <img
                src="${familiar.image}"
                alt="${familiar.name}"
                class="reward-familiar-image"
              />

              <h4 class="reward-familiar-name">${familiar.name}</h4>

              <p class="reward-familiar-status">
                ${chestReward.isNew ? "✨ Nouveau familier débloqué !" : "🔁 Familier déjà obtenu !"}
              </p>

              <p class="reward-familiar-progress">
                Collection : ${chestReward.unlockedCount} / ${chestReward.totalCount}
              </p>

              ${
                chestReward.collectionComplete
                  ? `<p class="reward-familiar-complete">🏆 Collection complète !</p>`
                  : ""
              }
            </div>

            <button
              class="primary-btn close-chest-reward-modal-btn"
              type="button"
            >
              Continuer l’aventure
            </button>
          `
      }
    </div>
  `;
};

window.FitnessRpgRender.showChestRewardModal = function showChestRewardModal(chestReward) {
  let overlay = document.querySelector("#chestRewardOverlay");

  window.FitnessRpgRender.currentChestReward = chestReward;

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "chestRewardOverlay";
    overlay.className = "reward-chest-overlay hidden";
    overlay.setAttribute("aria-hidden", "true");

    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="reward-chest-modal" role="dialog" aria-modal="true">
      <button
        class="reward-chest-close close-chest-reward-modal-btn"
        type="button"
        aria-label="Fermer"
      >
        ×
      </button>

      <div id="chestRewardContent">
        ${window.FitnessRpgRender.renderChestRewardHtml(chestReward, false)}
      </div>
    </div>
  `;

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
};

window.FitnessRpgRender.openChestRewardModal = function openChestRewardModal() {
  const overlay = document.querySelector("#chestRewardOverlay");
  const content = document.querySelector("#chestRewardContent");
  const chestReward = window.FitnessRpgRender.currentChestReward;

  if (!overlay || !content || !chestReward) return;

  content.innerHTML = window.FitnessRpgRender.renderChestRewardHtml(chestReward, true);

  const modal = overlay.querySelector(".reward-chest-modal");
  if (modal) {
    modal.scrollTop = 0;
  }
};

window.FitnessRpgRender.closeChestRewardModal = function closeChestRewardModal() {
  const overlay = document.querySelector("#chestRewardOverlay");

  if (!overlay) return;

  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = "";

  window.FitnessRpgRender.currentChestReward = null;
  document.body.classList.remove("modal-open");
};
// ============================================================
// Page familiers
// ============================================================

window.FitnessRpgRender.renderFamiliarsPage = function renderFamiliarsPage() {
  const summary = document.querySelector("#familiarCollectionSummary");
  const grid = document.querySelector("#familiarCollectionGrid");

  if (!summary || !grid) return;

  const allFamiliars = window.FitnessRpgRewards?.getRewardFamiliars?.() || [];
  const unlockedIds = window.FitnessRpgRewards?.getUnlockedFamiliarIds?.() || [];

  const unlockedCount = unlockedIds.length;
  const totalCount = allFamiliars.length;

  summary.innerHTML = `
    <p class="eyebrow">🐾 Collection</p>
    <h2>${unlockedCount} / ${totalCount} familiers débloqués</h2>
    <p>
      Les familiers sont obtenus dans les coffres de récompense.
      Les silhouettes inconnues seront révélées quand tu les gagneras.
    </p>
  `;

  if (!allFamiliars.length) {
    grid.innerHTML = `
      <article class="card">
        <h2>Aucun familier disponible</h2>
        <p>Ajoute tes 8 familiers dans app-data.js ou vérifie app-rewards.js.</p>
      </article>
    `;
    return;
  }

  grid.innerHTML = allFamiliars.map((familiar) => {
    const unlocked = unlockedIds.includes(familiar.id);

    return `
      <article class="familiar-card card ${unlocked ? "unlocked" : "locked"}">
        <div class="familiar-image-frame">
          ${
            unlocked
              ? `<img src="${familiar.image}" alt="${familiar.name}" class="familiar-image" />`
              : `<div class="familiar-locked-silhouette">?</div>`
          }
        </div>

        <h2>${unlocked ? familiar.name : "Familier inconnu"}</h2>

        <p>
          ${unlocked ? "Compagnon débloqué." : "Encore caché dans un coffre."}
        </p>
      </article>
    `;
  }).join("");
};
// ============================================================
// Rendu global
// ============================================================


window.FitnessRpgRender.renderCurrentPage = function renderCurrentPage() {
  const page = window.FitnessRpgState.getPage();

  window.FitnessRpgRender.renderPages();
  window.FitnessRpgRender.renderVersion();

  switch (page) {
    case "home":
      window.FitnessRpgRender.renderHome();
      break;

    case "hero-setup":
      window.FitnessRpgRender.renderHeroSetup();
      break;
      
    case "hero-menu":
      window.FitnessRpgRender.renderHeroMenu();
      break;
      
    case "training":
      window.FitnessRpgRender.renderTraining();
      break;

    case "programs":
      window.FitnessRpgRender.renderProgramList();
      break;

    case "goal":
      window.FitnessRpgRender.renderGoalPage();
      break;
    
    case "planning":
      window.FitnessRpgRender.renderPlanningPage();
      break;

    case "exercises":
      window.FitnessRpgRender.renderExerciseList();
      break;

    case "badges":
      window.FitnessRpgProgress.checkBadges();
      window.FitnessRpgRender.renderBadges();
      break;

    case "familiars":
      window.FitnessRpgRender.renderFamiliarsPage();
      break;
      
    case "journal":
      window.FitnessRpgRender.renderJournal();
      break;

    case "weight":
      window.FitnessRpgRender.renderWeight();
      break;

    case "music":
      window.FitnessRpgRender.setText("#musicStatus", window.FitnessRpgState.musicStatus);
      break;

    case "progression":
      window.FitnessRpgProgress.checkBadges();
      window.FitnessRpgRender.renderProgressionPage();
      break;

    default:
      window.FitnessRpgState.setPage("home");
      window.FitnessRpgRender.renderHome();
      break;
  }
};

window.FitnessRpgRender.renderAll = function renderAll() {
  window.FitnessRpgRender.renderCurrentPage();
  window.FitnessRpgRender.renderLevelUpOverlay();
};
