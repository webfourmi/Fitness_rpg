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
  const hasProfile = Boolean(window.FitnessRpgState.hasProfile?.());

  document.body.dataset.page = currentPage;

  document.querySelectorAll(".app-page").forEach((page) => {
    page.classList.toggle("hidden", page.dataset.page !== currentPage);
  });

  const header = document.querySelector("#appHeader");
  if (header) header.classList.remove("hidden");

  const homeButton = document.querySelector("#homeButton");
  const backButton = document.querySelector("#backButton");
  const headerProgramsButton = document.querySelector("#headerProgramsButton");
  const headerGoalButton = document.querySelector("#headerGoalButton");
  const headerPlanningButton = document.querySelector("#headerPlanningButton");
  const hideHeaderActions = currentPage === "home";

  homeButton?.classList.toggle("hidden", hideHeaderActions);
  backButton?.classList.toggle("hidden", hideHeaderActions);
  headerProgramsButton?.classList.toggle("hidden", hideHeaderActions);
  headerGoalButton?.classList.toggle("hidden", hideHeaderActions);
  headerPlanningButton?.classList.toggle("hidden", hideHeaderActions);

  window.FitnessRpgNavigation?.closeMobileMorePanel?.({
    restoreFocus: false
  });

  const mobileNav = document.querySelector("#mobilePrimaryNav");
  const showMobileNav = hasProfile && !["home", "hero-setup"].includes(currentPage);
  mobileNav?.classList.toggle("hidden", !showMobileNav);

  const activeDestination = {
    training: "training",
    exercises: "exercises",
    programs: "programs",
    planning: "planning"
  }[currentPage] || "more";

  const mobileButtons = {
    training: document.querySelector("#mobileNavTrainingButton"),
    exercises: document.querySelector("#mobileNavExercisesButton"),
    programs: document.querySelector("#mobileNavProgramsButton"),
    planning: document.querySelector("#mobileNavPlanningButton"),
    more: document.querySelector("#mobileNavMoreButton")
  };

  Object.entries(mobileButtons).forEach(([destination, button]) => {
    if (!button) return;

    const isActive = showMobileNav && destination === activeDestination;
    button.classList.toggle("active", isActive);

    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
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
  window.FitnessRpgRender.prepareHomeImageInfoToggle();
};

window.FitnessRpgRender.prepareHomeImageInfoToggle = function prepareHomeImageInfoToggle() {
  const image = document.querySelector("#homeSplashImage");
  const button = document.querySelector("#homeSplashButton");

  if (!image || !button) return;
  if (button.dataset.trainingLinkReady === "true") return;

  button.dataset.trainingLinkReady = "true";

  button.addEventListener("click", () => {
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
  window.FitnessRpgRender.renderActiveSessionResumeCard();
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

  const weekly = window.FitnessRpgState.getWeeklyActivityStats?.() || { activeDays: 0 };
  const remainingXp = Math.max(0, Number(info.nextXp || 0) - Number(info.currentXp || 0));

  window.FitnessRpgRender.setText("#streakLabel", profile.streak || 0);
  window.FitnessRpgRender.setText("#todayEntriesLabel", window.FitnessRpgState.getTodayEntries().length);
  window.FitnessRpgRender.setText("#weeklyActiveDaysLabel", weekly.activeDays || 0);
  window.FitnessRpgRender.setText("#heroWeeklyBadge", `${weekly.activeDays || 0}/7 jours`);
  window.FitnessRpgRender.setText(
    "#xpNextText",
    remainingXp > 0
      ? `${remainingXp} XP avant le niveau suivant`
      : "Niveau suivant atteint"
  );
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

window.FitnessRpgRender.renderActiveSessionResumeCard = function renderActiveSessionResumeCard() {
  const card = document.querySelector("#activeSessionResumeCard");
  if (!card) return;

  const session = window.FitnessRpgState.getActiveProgramSession?.();

  if (!session) {
    card.classList.add("hidden");
    card.innerHTML = "";
    return;
  }

  const program = window.FitnessRpgPrograms.getProgram?.(session.programId)
    || window.FitnessRpgConfig.getProgramById?.(session.programId);
  const workout = window.FitnessRpgPrograms.getActiveProgramWorkout?.(session);
  const exercises = Array.isArray(workout?.exercises) ? workout.exercises : [];
  const total = exercises.length;
  const done = Math.min(
    total,
    window.FitnessRpgState.getProgramSessionCompletedCount?.() || 0
  );
  const remaining = Math.max(0, total - done);
  const progress = total ? Math.round((done / total) * 100) : 0;
  const isBoss = session.type === "program-boss";
  const position = isBoss
    ? `Boss · Semaine ${Number(session.weekNumber || 1)}`
    : `Semaine ${Number(session.weekNumber || 1)} · Jour ${Number(session.dayNumber || 1)}`;

  card.innerHTML = `
    <div class="active-session-resume-header">
      <div>
        <p class="eyebrow">${isBoss ? "🐉 Boss en cours" : "⚔️ Séance en cours"}</p>
        <h2>${window.FitnessRpgRender.escapeHtml(program?.title || "Programme")}</h2>
      </div>
      <strong>${done}/${total}</strong>
    </div>

    <p class="active-session-resume-position">${position}</p>
    <p class="active-session-resume-title">
      ${window.FitnessRpgRender.escapeHtml(
        workout?.title || workout?.subtitle || "Séance en cours"
      )}
    </p>

    <div
      class="active-session-resume-progress"
      role="progressbar"
      aria-label="Progression de la séance"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow="${progress}"
    >
      <span style="width: ${progress}%"></span>
    </div>

    <div class="active-session-resume-meta">
      <span>${done} validé${done > 1 ? "s" : ""}</span>
      <span>${remaining} restant${remaining > 1 ? "s" : ""}</span>
    </div>

    <div class="active-session-resume-actions">
      <button id="resumeActiveProgramSessionButton" class="primary-btn" type="button">
        Reprendre la séance
      </button>
      <button id="abandonActiveProgramSessionButton" class="ghost-btn" type="button">
        Abandonner
      </button>
    </div>
  `;

  card.classList.remove("hidden");
};

window.FitnessRpgRender.renderTodayCard = function renderTodayCard() {
  const quest = window.FitnessRpgPrograms.getTodayPlanningQuest?.()
    || window.FitnessRpgPrograms.getTodayQuest?.();
  const todayCard = document.querySelector("#todayCard");
  const openButton = document.querySelector("#openTodayProgramButton");
  const status = document.querySelector("#todayQuestStatus");
  const progressBlock = document.querySelector("#todayQuestProgressBlock");
  const progressBar = document.querySelector("#todayQuestProgressBar");
  const progressTrack = progressBar?.closest(".today-quest-progress");

  if (!quest) {
    window.FitnessRpgRender.setText("#todayProgramTitle", "Éveil du héros");
    window.FitnessRpgRender.setText(
      "#todayProgramDescription",
      "Séance douce pour reprendre l’aventure."
    );
    window.FitnessRpgRender.setText("#todayQuestPosition", "Semaine 1 · Jour 1");
    window.FitnessRpgRender.setText("#todayQuestDuration", "10 à 15 min");
    window.FitnessRpgRender.setText("#todayQuestXp", "20 XP");
    return;
  }

  const program = quest.program
    || window.FitnessRpgPrograms.getProgram?.(quest.programId)
    || window.FitnessRpgConfig.getProgramById?.(quest.programId);
  const activeSession = window.FitnessRpgState.getActiveProgramSession?.();
  const activeForQuest = Boolean(
    activeSession
    && activeSession.programId === quest.programId
    && Number(activeSession.weekNumber || 1) === Number(quest.weekNumber || 1)
    && (
      activeSession.type === "program-boss"
      || Number(activeSession.dayNumber || 1) === Number(quest.dayNumber || 1)
    )
  );
  const isRest = quest.type === "rest" || (!quest.programId && quest.source !== "boss-locked");
  const isLocked = quest.source === "boss-locked" || quest.type === "boss-locked";
  const isBoss = quest.type === "program-boss" || quest.source === "program-boss";

  window.FitnessRpgRender.setText("#todayProgramTitle", quest.title);
  window.FitnessRpgRender.setText(
    "#todayProgramDescription",
    quest.description || program?.objective || "Prépare ta prochaine séance."
  );

  const position = isBoss
    ? `Boss · Semaine ${Number(quest.weekNumber || 1)}`
    : isRest
      ? (quest.subtitle || "Récupération")
      : `Semaine ${Number(quest.weekNumber || 1)} · Jour ${Number(quest.dayNumber || 1)}`;
  const duration = isRest
    ? "Récupération"
    : program?.duration || quest.day?.duration || "Séance guidée";
  const xp = !isRest && quest.programId
    ? Number(
        window.FitnessRpgProgress.calculateProgramSessionXp?.(
          quest.programId,
          quest.dayNumber || 1,
          quest.weekNumber || 1
        ) || program?.xp || 0
      )
    : 0;

  window.FitnessRpgRender.setText("#todayQuestPosition", position);
  window.FitnessRpgRender.setText("#todayQuestDuration", duration);
  window.FitnessRpgRender.setText("#todayQuestXp", xp > 0 ? `${xp} XP` : "Sans XP");

  if (status) {
    status.className = "status-chip";

    if (activeForQuest) {
      status.textContent = "En cours";
      status.classList.add("status-active");
    } else if (isLocked) {
      status.textContent = "Verrouillé";
      status.classList.add("status-locked");
    } else if (isBoss) {
      status.textContent = "Boss";
      status.classList.add("status-boss");
    } else if (isRest) {
      status.textContent = "Repos";
      status.classList.add("status-neutral");
    } else {
      status.textContent = "À venir";
      status.classList.add("status-next");
    }
  }

  let progress = null;
  if (quest.programId) {
    progress = window.FitnessRpgPrograms.getProgramProgressDetails?.(quest.programId) || null;
  }

  if (progress && progress.total > 0) {
    progressBlock?.classList.remove("hidden");
    window.FitnessRpgRender.setText(
      "#todayQuestProgressText",
      `${progress.completed}/${progress.total} · ${progress.percent}%`
    );
    if (progressBar) progressBar.style.width = `${progress.percent}%`;
    if (progressTrack) progressTrack.setAttribute("aria-valuenow", String(progress.percent));
  } else {
    progressBlock?.classList.add("hidden");
    if (progressBar) progressBar.style.width = "0%";
    if (progressTrack) progressTrack.setAttribute("aria-valuenow", "0");
  }

  if (todayCard) {
    todayCard.dataset.programId = quest.programId || "";
    todayCard.dataset.weekNumber = quest.weekNumber || 1;
    todayCard.dataset.dayNumber = quest.dayNumber || 1;
    todayCard.dataset.source = quest.source || "planning";
    todayCard.dataset.questAction = isRest ? "none" : "open";
    todayCard.classList.toggle("is-rest", isRest);
    todayCard.classList.toggle("is-boss", isBoss);
    todayCard.setAttribute("aria-disabled", isRest ? "true" : "false");
    todayCard.tabIndex = isRest ? -1 : 0;
  }

  if (openButton) {
    openButton.dataset.programId = quest.programId || "";
    openButton.dataset.weekNumber = quest.weekNumber || 1;
    openButton.dataset.dayNumber = quest.dayNumber || 1;
    openButton.disabled = isRest;

    if (activeForQuest) {
      openButton.textContent = "Reprendre cette séance";
    } else if (isLocked) {
      openButton.textContent = "Rattraper une séance";
    } else if (isBoss) {
      openButton.textContent = "Préparer le combat";
    } else if (isRest) {
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

  document.body.classList.toggle("guided-session-active", Boolean(detail && session));

  if (!detail || !session) {
    detail?.querySelector("#activeProgramSession")?.remove();
    return;
  }

  const program = window.FitnessRpgConfig.getProgramById(session.programId);
  const workout = window.FitnessRpgPrograms.getActiveProgramWorkout?.(session);
  const exercises = Array.isArray(workout?.exercises) ? workout.exercises : [];

  if (!program || !workout || !exercises.length) {
    document.body.classList.remove("guided-session-active");
    detail.querySelector("#activeProgramSession")?.remove();
    return;
  }

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

  const completedKeys = window.FitnessRpgPrograms.getCompletedExerciseKeys?.(session) || [];
  const totalCount = exercises.length;
  const doneCount = Math.min(
    totalCount,
    window.FitnessRpgState.getProgramSessionCompletedCount?.() || 0
  );

  const currentIndex = exercises.findIndex((item, index) => {
    const key = `${index}-${item.exerciseId}`;
    return !completedKeys.includes(key) && !completedKeys.includes(item.exerciseId);
  });

  const activeIndex = currentIndex >= 0 ? currentIndex : Math.max(0, totalCount - 1);
  const activeItem = exercises[activeIndex];
  const activeExercise = window.FitnessRpgExercises.getExercise?.(activeItem.exerciseId);
  const activeExerciseKey = `${activeIndex}-${activeItem.exerciseId}`;
  const activeDone = window.FitnessRpgState.isProgramSessionExerciseDone(activeExerciseKey);
  const normalizedUnit = String(activeItem.unit || "").toLowerCase();
  const canUseTimer = [
    "min",
    "minute",
    "minutes",
    "sec",
    "seconde",
    "secondes"
  ].includes(normalizedUnit) || activeExercise?.hasTimer;

  const stepMeta = window.FitnessRpgPrograms.getProgramExerciseStepMeta?.(
    exercises,
    activeIndex
  );

  const guidedProgress = Math.round((doneCount / totalCount) * 100);
  const nextIndex = complete ? -1 : Math.min(totalCount - 1, activeIndex + 1);
  const nextItem = nextIndex > activeIndex ? exercises[nextIndex] : null;
  const nextExercise = nextItem
    ? window.FitnessRpgExercises.getExercise?.(nextItem.exerciseId)
    : null;

  const actionsHtml = complete
    ? `
      <button id="finishProgramSessionButton" class="primary-btn guided-finish-btn" type="button">
        Terminer · +${xp} XP
      </button>
    `
    : `
      ${
        canUseTimer && !activeDone
          ? `<button
              class="secondary-btn start-program-exercise-timer-btn"
              type="button"
              data-exercise-id="${activeItem.exerciseId}"
              data-exercise-key="${activeExerciseKey}"
            >
              <span aria-hidden="true">⏱️</span>
              <span>Timer</span>
            </button>`
          : ""
      }
      <button
        class="primary-btn validate-program-exercise-btn"
        type="button"
        data-exercise-id="${activeItem.exerciseId}"
        data-exercise-key="${activeExerciseKey}"
        ${activeDone ? "disabled" : ""}
      >
        ${activeIndex >= totalCount - 1 ? "Valider" : "Valider et continuer"}
      </button>
    `;

  const exerciseCardHtml = window.FitnessRpgExercises.programExerciseCardHtml?.(
    activeItem,
    activeIndex,
    {
      done: activeDone,
      actionsHtml: "",
      exerciseKey: activeExerciseKey
    }
  ) || `<p class="muted">Impossible d’afficher cet exercice.</p>`;

  const shortSessionTitle = isBoss
    ? workout.title
    : workout.title || `Jour ${workout.day}`;

  const nextHtml = nextItem
    ? `<p class="guided-next-line">
        Ensuite : <strong>${window.FitnessRpgRender.escapeHtml(nextExercise?.title || nextItem.exerciseId)}</strong>
      </p>`
    : `<p class="guided-next-line guided-next-finish">Dernier exercice de la séance</p>`;

  const sessionHtml = `
    <section id="activeProgramSession" class="active-program-session card session-focus-shell">
      <header class="guided-session-header">
        <div>
          <p class="eyebrow">${isBoss ? "🐉 Boss" : `${program.icon} Séance guidée`}</p>
          <h2>${window.FitnessRpgRender.escapeHtml(shortSessionTitle)}</h2>
        </div>

        <button id="abandonGuidedProgramSessionButton" class="danger-link-btn guided-quit-btn" type="button" aria-label="Quitter la séance">
          Quitter
        </button>
      </header>

      <section class="guided-progress-panel" aria-label="Progression de la séance">
        <div class="guided-progress-numbers">
          <strong>${Math.min(activeIndex + 1, totalCount)} / ${totalCount}</strong>
          <span>${guidedProgress}%</span>
        </div>
        <div
          class="program-guided-progress-bar session-focus-progress-bar"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="${guidedProgress}"
        >
          <span style="width: ${guidedProgress}%"></span>
        </div>
        <div class="guided-step-strip">
          <strong>${stepMeta?.blockLabel || "⚔️ Étape"}</strong>
          ${stepMeta?.cycleLabel ? `<span>${stepMeta.cycleLabel}</span>` : ""}
        </div>
      </section>

      <main class="guided-exercise-stage">
        <div class="program-session-list session-focus-card-wrap">
          ${exerciseCardHtml}
        </div>
        ${nextHtml}
      </main>

      <footer class="guided-action-dock" aria-label="Actions de la séance">
        ${actionsHtml}
      </footer>
    </section>
  `;

  detail.querySelector("#activeProgramSession")?.remove();
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

window.FitnessRpgRender.selectedProgramTier = window.FitnessRpgRender.selectedProgramTier || "beginner";

window.FitnessRpgRender.getProgramProgressStatusLabel = function getProgramProgressStatusLabel(status) {
  const labels = {
    completed: "Terminée",
    active: "En cours",
    next: "Prochaine",
    upcoming: "À venir",
    defeated: "Vaincu",
    unlocked: "Débloqué",
    locked: "Verrouillé",
    current: "En cours"
  };

  return labels[status] || "À venir";
};

window.FitnessRpgRender.renderProgramProgressOverviewHtml = function renderProgramProgressOverviewHtml(
  progress,
  options = {}
) {
  if (!progress) return "";

  const compact = options.compact === true;
  const bossText = progress.bossTotal
    ? `${progress.bossesDefeated}/${progress.bossTotal} boss`
    : "Sans boss";
  const lastText = progress.lastEntry
    ? progress.lastSessionLabel
    : "Pas encore commencée";

  if (compact) {
    return `
      <section class="program-progress-compact" aria-label="Progression ${progress.program?.title || "programme"}">
        <div class="program-progress-compact-line">
          <strong>${progress.completed}/${progress.total} séances</strong>
          <span>${progress.percent}%</span>
        </div>
        <div class="program-progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}">
          <span style="width: ${progress.percent}%"></span>
        </div>
        <div class="program-progress-compact-meta">
          <span>🐉 ${bossText}</span>
          <span>✨ ${progress.totalXp} XP</span>
        </div>
      </section>
    `;
  }

  const weeksHtml = progress.weeks.map((week) => {
    const daysHtml = week.days.map((day) => {
      const label = window.FitnessRpgRender.getProgramProgressStatusLabel(day.status);
      const icon = day.status === "completed"
        ? "✓"
        : day.status === "active"
          ? "▶"
          : day.status === "next"
            ? "➜"
            : "○";

      return `
        <button
          class="program-progress-session-btn status-${day.status}"
          type="button"
          data-program-id="${progress.programId}"
          data-week-number="${day.weekNumber}"
          data-day-number="${day.dayNumber}"
          aria-label="Semaine ${day.weekNumber}, jour ${day.dayNumber}, ${label}"
        >
          <span class="program-progress-status-icon">${icon}</span>
          <span>
            <strong>Jour ${day.dayNumber}</strong>
            <small>${day.day?.title || "Séance"}</small>
          </span>
          <em>${label}</em>
        </button>
      `;
    }).join("");

    const bossHtml = week.boss
      ? `
        <button
          class="program-progress-boss-btn status-${week.boss.status}"
          type="button"
          data-program-id="${progress.programId}"
          data-week-number="${week.weekNumber}"
          ${week.boss.status === "locked" ? "disabled" : ""}
        >
          <span class="program-progress-status-icon">🐉</span>
          <span>
            <strong>${week.boss.data?.title || `Boss semaine ${week.weekNumber}`}</strong>
            <small>${window.FitnessRpgRender.getProgramProgressStatusLabel(week.boss.status)}</small>
          </span>
        </button>
      `
      : "";

    return `
      <article class="program-progress-week status-${week.status}">
        <header>
          <div>
            <strong>Semaine ${week.weekNumber}</strong>
            <span>${week.completedDays}/${week.totalDays} séances</span>
          </div>
          <span class="program-progress-week-state">
            ${week.status === "completed" ? "✓ Complète" : week.status === "active" ? "▶ En cours" : week.status === "current" ? "➜ Actuelle" : "À venir"}
          </span>
        </header>
        <div class="program-progress-session-list">
          ${daysHtml}
          ${bossHtml}
        </div>
      </article>
    `;
  }).join("");

  return `
    <section class="program-progress-dashboard card">
      <div class="program-progress-heading">
        <div>
          <p class="eyebrow">🗺️ Campagne du programme</p>
          <h3>${progress.completed}/${progress.total} séances terminées</h3>
        </div>
        <strong>${progress.percent}%</strong>
      </div>

      <div class="program-progress-bar large" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}">
        <span style="width: ${progress.percent}%"></span>
      </div>

      <div class="program-progress-stats">
        <div><strong>${progress.completed}</strong><span>Séances</span></div>
        <div><strong>${bossText}</strong><span>Boss</span></div>
        <div><strong>${progress.totalXp}</strong><span>XP gagnée</span></div>
        <div><strong>${lastText}</strong><span>Dernière séance</span></div>
      </div>

      <div class="program-progress-weeks">
        ${weeksHtml}
      </div>
    </section>
  `;
};

window.FitnessRpgRender.renderProgramList = function renderProgramList() {
  const list = document.querySelector("#programList");
  const detail = document.querySelector("#programDetail");
  const tabs = document.querySelector("#programLevelTabs");

  if (!list) return;

  list.classList.remove("hidden");

  if (tabs) tabs.classList.remove("hidden");

  if (detail) {
    detail.classList.add("hidden");
    detail.innerHTML = "";
  }

  list.innerHTML = "";

  const programs = window.FitnessRpgConfig.programs || [];
  const activeProgramId = window.FitnessRpgState.getActiveProgramId?.();

  const tiers = [
    { id: "beginner", label: "Débutant" },
    { id: "intermediate", label: "Intermédiaire" },
    { id: "advanced", label: "Avancé" }
  ];

  const selectedTier = window.FitnessRpgRender.selectedProgramTier || "beginner";
  const getTier = (program) => {
    return window.FitnessRpgConfig.getProgramTier?.(program) || program.tier || "beginner";
  };

  if (tabs) {
    tabs.innerHTML = tiers.map((tier) => {
      const active = tier.id === selectedTier;
      const count = programs.filter((program) => getTier(program) === tier.id).length;

      return `
        <button
          class="program-level-tab ${active ? "active" : ""}"
          type="button"
          data-program-tier="${tier.id}"
          aria-pressed="${active ? "true" : "false"}"
        >
          <strong>${tier.label}</strong>
          <small>${count}</small>
        </button>
      `;
    }).join("");
  }

  const filteredPrograms = programs.filter((program) => {
    return getTier(program) === selectedTier;
  });

  if (!filteredPrograms.length) {
    list.innerHTML = `
      <article class="program-empty-state card">
        <span>🧭</span>
        <div>
          <h2>Aucun programme dans ce niveau</h2>
          <p>Cette catégorie est vide pour l’instant.</p>
        </div>
      </article>
    `;
    return;
  }

  filteredPrograms.forEach((program) => {
    const selected = program.id === activeProgramId;
    const progress = window.FitnessRpgPrograms.getProgramProgressDetails(program.id);
    const nextStatus = progress.action?.type === "resume"
      ? "En cours"
      : progress.completed >= progress.total && progress.total > 0
        ? "Terminée"
        : progress.completed > 0
          ? "En progression"
          : "Nouvelle";

    const statusClass = selected
      ? "status-active"
      : nextStatus === "Terminée"
        ? "status-completed"
        : progress.completed > 0
          ? "status-next"
          : "status-info";

    const card = document.createElement("article");
    card.className = `program-card card${selected ? " selected" : ""}`;
    card.dataset.programId = program.id;

    card.innerHTML = `
      <header class="program-card-header">
        <div class="program-icon">${program.icon}</div>
        <div class="program-card-heading">
          <div class="program-card-title-line">
            <h2>${program.title}</h2>
            <span class="status-chip ${statusClass}">${selected ? "Programme actuel" : nextStatus}</span>
          </div>
          <p>${program.objective}</p>
        </div>
      </header>

      <div class="program-card-meta">
        <span>🎚️ ${program.level}</span>
        <span>⏱️ ${program.duration}</span>
        <span>📅 ${program.frequency}</span>
      </div>

      ${window.FitnessRpgRender.renderProgramProgressOverviewHtml(progress, { compact: true })}

      <p class="program-card-coach">🧙 Coach conseillé : <strong>${program.coachAdvice || "Libre"}</strong></p>

      <div class="program-card-actions">
        <button
          class="primary-btn program-primary-action-btn"
          type="button"
          data-program-id="${program.id}"
        >
          ${progress.action.label}
        </button>

        <button
          class="secondary-btn open-program-detail-btn"
          type="button"
          data-program-id="${program.id}"
        >
          Voir les détails
        </button>

        <button
          class="${selected ? "secondary-btn" : "ghost-btn"} choose-program-btn"
          type="button"
          data-program-id="${program.id}"
        >
          ${selected ? "Sélectionné" : "Sélectionner"}
        </button>
      </div>
    `;

    list.appendChild(card);
  });
};

window.FitnessRpgRender.renderProgramBossChoiceHtml = function renderProgramBossChoiceHtml(programId, weekNumber = 1) {
  const boss = window.FitnessRpgPrograms.getProgramBoss?.(programId, weekNumber);

  if (!boss) return "";

  const progress = window.FitnessRpgPrograms.getProgramProgressDetails?.(programId);
  const weekProgress = progress?.weeks?.find((item) => {
    return Number(item.weekNumber) === Number(weekNumber);
  });
  const bossProgress = weekProgress?.boss || null;
  const defeated = Boolean(bossProgress?.defeated);
  const unlocked = defeated || window.FitnessRpgPrograms.isProgramBossUnlocked?.(programId, weekNumber);
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

  const bossImageHtml = boss.image
    ? `<div class="program-boss-image-frame">
        <img class="program-boss-image" src="${boss.image}" alt="${window.FitnessRpgRender.escapeHtml(boss.title || "Boss")}" onerror="this.closest('.program-boss-image-frame')?.remove()">
      </div>`
    : "";

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
          ${defeated ? "Rejouer cette mission" : unlocked ? "Démarrer cette mission" : "Boss verrouillé"}
        </button>
      </article>
    `;
  }).join("");

  return `
    <section class="program-boss-choice card">
      <p class="eyebrow">🐉 Boss de la semaine ${weekNumber}</p>
      <h3>${boss.title}</h3>
      ${bossImageHtml}
      <p>${boss.subtitle || boss.instructions || ""}</p>
      ${
        defeated
          ? `<p class="success-text">Boss déjà vaincu. Tu peux rejouer la mission.</p>`
          : unlocked
            ? `<p class="success-text">Boss débloqué. Choisis ta mission.</p>`
            : `<p class="planning-coach-warning">${boss.lockedMessage || "Termine les 3 séances de la semaine pour débloquer le boss."}</p>`
      }
      <div class="program-boss-variants">
        ${variantsHtml}
      </div>
    </section>
  `;
};
window.FitnessRpgRender.getProgramBlockIcon = function getProgramBlockIcon(label) {
  const text = String(label || "").toLowerCase();

  if (text.includes("échauffement") || text.includes("echauffement")) return "🔥";
  if (text.includes("défi") || text.includes("defi")) return "⚔️";
  if (text.includes("retour")) return "🧘";
  if (text.includes("respiration")) return "🌬️";
  if (text.includes("boss")) return "🐉";
  if (text.includes("cycle") || text.includes("circuit")) return "🔁";

  return "✨";
};

window.FitnessRpgRender.getProgramBlockTitle = function getProgramBlockTitle(phase) {
  const raw = String(phase || "Exercices").trim();

  if (!raw) return "Exercices";

  const cleaned = raw
    .replace(/\s*·\s*Cycle\s+\d+\s*$/i, "")
    .replace(/\s*-\s*Cycle\s+\d+\s*$/i, "")
    .replace(/^\s*Cycle\s+\d+\s*$/i, "")
    .trim();

  if (cleaned) return cleaned;
  if (/cycle/i.test(raw)) return "Circuit";

  return "Exercices";
};

window.FitnessRpgRender.getProgramCycleNumber = function getProgramCycleNumber(phase) {
  const match = String(phase || "").match(/cycle\s*(\d+)/i);
  return match ? Number(match[1]) : 1;
};

window.FitnessRpgRender.buildProgramExerciseBlocksFallback = function buildProgramExerciseBlocksFallback(exercises = []) {
  const blocks = [];

  (exercises || []).forEach((item) => {
    const title = window.FitnessRpgRender.getProgramBlockTitle(item.phase);
    const cycleNumber = window.FitnessRpgRender.getProgramCycleNumber(item.phase);

    let block = blocks.find((entry) => entry.title === title);

    if (!block) {
      block = {
        title,
        icon: window.FitnessRpgRender.getProgramBlockIcon(title),
        cycles: []
      };

      blocks.push(block);
    }

    let cycle = block.cycles.find((entry) => Number(entry.number) === Number(cycleNumber));

    if (!cycle) {
      cycle = {
        number: cycleNumber,
        items: []
      };

      block.cycles.push(cycle);
    }

    cycle.items.push(item);
  });

  blocks.forEach((block) => {
    block.cycles.sort((a, b) => Number(a.number || 1) - Number(b.number || 1));
    block.cycleCount = block.cycles.length;
  });

  return blocks;
};

window.FitnessRpgRender.renderProgramExerciseBlocksHtml = function renderProgramExerciseBlocksHtml(exercises = []) {
  const externalBlocks = window.FitnessRpgPrograms.getProgramExerciseBlocks?.(exercises);
  const blocks = Array.isArray(externalBlocks) && externalBlocks.length
    ? externalBlocks
    : window.FitnessRpgRender.buildProgramExerciseBlocksFallback(exercises);

  if (!blocks.length) {
    return `<p class="muted">Aucun exercice dans cette séance.</p>`;
  }

  return blocks.map((block, blockIndex) => {
    const cycleCount = Number(block.cycleCount || block.cycles?.length || 1);
    const cycleText = cycleCount > 1
      ? ` · ${cycleCount} cycles`
      : "";

    const cyclesHtml = (block.cycles || []).map((cycle) => {
      const titleHtml = cycleCount > 1
        ? `<h4>🔁 Cycle ${cycle.number} / ${cycleCount}</h4>`
        : "";

      const itemsHtml = (cycle.items || []).map((item) => {
        const exercise = window.FitnessRpgData.getExerciseById?.(item.exerciseId);
        const safeTitle = window.FitnessRpgRender.escapeHtml(exercise?.title || item.exerciseId || "Exercice");
        const safeAmount = window.FitnessRpgRender.escapeHtml(
          window.FitnessRpgPrograms.formatExerciseAmount?.(item) || `${item.amount ?? ""} ${item.unit || ""}`.trim()
        );

        return `
          <li>
            <span>${safeTitle}</span>
            <strong>${safeAmount}</strong>
          </li>
        `;
      }).join("");

      return `
        <div class="program-cycle-preview">
          ${titleHtml}
          <ul>${itemsHtml}</ul>
        </div>
      `;
    }).join("");

    return `
      <details class="program-phase-block" ${blockIndex === 0 ? "open" : ""}>
        <summary>
          <span>${block.icon || window.FitnessRpgRender.getProgramBlockIcon(block.title)}</span>
          <strong>${window.FitnessRpgRender.escapeHtml(block.title || "Exercices")}${cycleText}</strong>
          <small>Ouvrir</small>
        </summary>

        <div class="program-phase-block-body">
          ${cyclesHtml}
        </div>
      </details>
    `;
  }).join("");
};

window.FitnessRpgRender.renderProgramDetail = function renderProgramDetail(programId) {
  const list = document.querySelector("#programList");
  const detail = document.querySelector("#programDetail");
  const tabs = document.querySelector("#programLevelTabs");

  if (!detail) return;

  const program = window.FitnessRpgConfig.getProgramById(programId);
  const programDetail = window.FitnessRpgData.getProgramDetail(programId);

  if (!program || !programDetail) {
    detail.classList.add("hidden");
    detail.innerHTML = "";
    if (list) list.classList.remove("hidden");
    if (tabs) tabs.classList.remove("hidden");
    return;
  }

  if (list) list.classList.add("hidden");
  if (tabs) tabs.classList.add("hidden");

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
  const progress = window.FitnessRpgPrograms.getProgramProgressDetails(programId);
  const selectedWeekProgress = progress.weeks.find((item) => {
    return Number(item.weekNumber) === Number(selection.weekNumber);
  });
  const selectedDayProgress = selectedWeekProgress?.days.find((item) => {
    return Number(item.dayNumber) === Number(day?.day || selection.dayNumber);
  });
  const selectedDayButtonLabel = selectedDayProgress?.active
    ? "Reprendre cette séance"
    : selectedDayProgress?.completed
      ? "Refaire cette séance"
      : "Démarrer cette séance";
  const selectedDayButtonClass = selectedDayProgress?.completed
    ? "secondary-btn"
    : "primary-btn";

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

  const exercisesHtml = window.FitnessRpgRender.renderProgramExerciseBlocksHtml
    ? window.FitnessRpgRender.renderProgramExerciseBlocksHtml(day.exercises || [])
    : "";

  const progressionHtml = (programDetail.progression || [])
    .map((line) => `<li>${line}</li>`)
    .join("");
  const weekNote = week?.progression
    ? `<p class="program-week-note">${week.progression}</p>`
    : "";
  const exerciseCount = Array.isArray(day.exercises) ? day.exercises.length : 0;

  detail.innerHTML = `
    <div class="program-detail-topbar">
      <button id="backToProgramListBtn" class="ghost-btn" type="button">
        ← Programmes
      </button>
      <span class="status-chip ${isActiveProgram ? "status-active" : "status-info"}">
        ${isActiveProgram ? "Programme actuel" : program.level}
      </span>
    </div>

    <header class="program-detail-hero">
      <div class="program-detail-hero-icon">${program.icon}</div>
      <div>
        <p class="eyebrow">${program.objective}</p>
        <h2>${program.title}</h2>
        <p>${program.duration} · ${program.frequency}</p>
        <div class="program-detail-hero-meta">
          <span>🎚️ ${program.level}</span>
          <span>🧙 ${program.coachAdvice || "Coach libre"}</span>
          <span>🏆 ${program.xp || 0} XP par séance</span>
        </div>
      </div>
    </header>

    <div class="program-detail-layout">
      <main class="program-detail-main">
        <section class="program-browser-panel card">
          <div class="program-browser-heading">
            <div>
              <p class="eyebrow">🧭 Choisir une séance</p>
              <h3>Semaine ${selection.weekNumber} · Jour ${day.day}</h3>
            </div>
            <span>${weekIndex + 1}/${weeks.length} semaines</span>
          </div>

          <div class="program-browser-controls">
            <div class="program-browser-control">
              <span>Semaine</span>
              <div class="program-carousel-row">
                <button class="ghost-btn program-week-carousel-btn" type="button" data-delta="-1" ${previousWeekDisabled}>←</button>
                <div><strong>${selection.weekNumber}</strong><small>sur ${weeks.length}</small></div>
                <button class="ghost-btn program-week-carousel-btn" type="button" data-delta="1" ${nextWeekDisabled}>→</button>
              </div>
            </div>

            <div class="program-browser-control">
              <span>Séance</span>
              <div class="program-carousel-row">
                <button class="ghost-btn program-day-carousel-btn" type="button" data-delta="-1" ${previousDayDisabled}>←</button>
                <div><strong>Jour ${day.day}</strong><small>${dayIndex + 1}/${days.length}</small></div>
                <button class="ghost-btn program-day-carousel-btn" type="button" data-delta="1" ${nextDayDisabled}>→</button>
              </div>
            </div>
          </div>
          ${weekNote}
        </section>

        <section class="program-days">
          <article class="program-day-card selected-program-day status-${selectedDayProgress?.status || "upcoming"}">
            <div class="selected-program-day-heading">
              <div>
                <p class="eyebrow">Séance sélectionnée</p>
                <h3>${day.title}</h3>
              </div>
              <span class="program-day-status status-${selectedDayProgress?.status || "upcoming"}">
                ${window.FitnessRpgRender.getProgramProgressStatusLabel(selectedDayProgress?.status)}
              </span>
            </div>

            <div class="selected-program-day-meta">
              <span>🧩 ${exerciseCount} exercice${exerciseCount > 1 ? "s" : ""}</span>
              <span>⏱️ ${program.duration}</span>
              <span>✨ ${program.xp || 0} XP</span>
            </div>

            <div class="program-phase-block-list">${exercisesHtml}</div>

            <button
              class="${selectedDayButtonClass} start-program-day-btn selected-program-day-start"
              type="button"
              data-program-id="${programId}"
              data-week="${selection.weekNumber}"
              data-day="${day.day}"
            >
              ${selectedDayButtonLabel}
            </button>
          </article>
        </section>

        ${bossHtml}

        <details class="program-progression program-notes-card">
          <summary>Notes de progression</summary>
          <ul>${progressionHtml}</ul>
        </details>
      </main>

      <aside class="program-detail-sidebar">
        ${window.FitnessRpgRender.renderProgramProgressOverviewHtml(progress)}

        <section class="program-detail-actions card">
          <button
            class="${isActiveProgram ? "secondary-btn" : "primary-btn"} choose-program-btn"
            type="button"
            data-program-id="${programId}"
          >
            ${isActiveProgram ? "Programme actuel" : "Sélectionner"}
          </button>

          <button id="startProgramPlanningButton" class="secondary-btn" type="button">
            Planning
          </button>

          <button
            class="danger-btn reset-program-progress-btn"
            type="button"
            data-program-id="${programId}"
          >
            Réinitialiser la progression
          </button>
        </section>
      </aside>
    </div>
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

window.FitnessRpgRender.getBadgeImagePath = function getBadgeImagePath(badge) {
  if (badge?.image || badge?.imagePath) {
    return badge.image || badge.imagePath;
  }

  const rawName = String(badge?.imageId || badge?.title || badge?.id || "badge");

  const safeName = rawName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b-vaincu\b/g, "")
    .replace(/\bvaincu\b/g, "")
    .replace(/\blégendaire\b/g, "legendaire")
    .replace(/\blegendaire\b/g, "legendaire")
    .replace(/[^a-z0-9]/g, "")
    .trim();

  return `assets/badges/badge_${safeName}.png`;
};
window.FitnessRpgRender.renderBadges = function renderBadges() {
  const summary = document.querySelector("#badgeCollectionSummary");
  const list = document.querySelector("#badgeList");

  if (!list) return;

 const rawBadges = window.FitnessRpgProgress.getBadgeStatusList();

const badges = rawBadges
  .map((badge, index) => {
    return {
      ...badge,
      originalIndex: index
    };
  })
  .sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;

    return a.originalIndex - b.originalIndex;
  });

const unlockedBadges = badges.filter((badge) => badge.unlocked);
  const unlockedCount = unlockedBadges.length;
  const totalCount = badges.length;

  if (summary) {
    summary.innerHTML = `
      <p class="eyebrow">🏅 Salle des trophées</p>
      <h2>${unlockedCount}/${totalCount} badge${totalCount > 1 ? "s" : ""} débloqué${unlockedCount > 1 ? "s" : ""}</h2>
      <p>
        Les badges gagnés apparaissent ici sous forme d’images.
        Touche un badge débloqué pour le voir en grand.
      </p>
    `;
  }

  if (!badges.length) {
    list.innerHTML = `
      <article class="card badge-empty-card">
        <h2>Aucun badge disponible</h2>
        <p>La salle des trophées est vide pour l’instant.</p>
      </article>
    `;
    return;
  }

  const badgeCardsHtml = badges.map((badge) => {
    const progress = window.FitnessRpgProgress.getBadgeProgress(badge);

    const safeId = window.FitnessRpgRender.escapeHtml(badge.id);
    const safeTitle = window.FitnessRpgRender.escapeHtml(badge.title || "Badge");
    const safeDescription = window.FitnessRpgRender.escapeHtml(badge.description || "");
    const safeIcon = window.FitnessRpgRender.escapeHtml(badge.icon || "🏅");
    const safeImage = window.FitnessRpgRender.escapeHtml(
      window.FitnessRpgRender.getBadgeImagePath(badge)
    );

    const statusText = badge.unlocked
      ? "Débloqué"
      : `${progress.current}/${progress.target}`;

    const percent = badge.unlocked ? 100 : progress.percent;

    return `
      <button
        class="badge-card ${badge.unlocked ? "unlocked" : "locked"}"
        type="button"
        data-badge-id="${safeId}"
        aria-label="${badge.unlocked ? `Voir ${safeTitle} en grand` : `${safeTitle} verrouillé`}"
        ${badge.unlocked ? "" : "disabled"}
      >
        <div class="badge-image-frame" data-icon="${safeIcon}">
          ${
            badge.unlocked
              ? `
                <img
                  src="${safeImage}"
                  alt="${safeTitle}"
                  class="badge-image"
                  onerror="this.parentElement.classList.add('is-missing'); this.remove();"
                />
              `
              : `
                <span class="badge-locked-sigil">🔒</span>
              `
          }
        </div>

        <strong>${safeTitle}</strong>

        <span class="badge-card-status">
          ${statusText}
        </span>

        <p>${safeDescription}</p>

        <div class="badge-progress-bar">
          <div class="badge-progress-fill" style="width: ${percent}%"></div>
        </div>
      </button>
    `;
  }).join("");

  list.innerHTML = `
    <div class="badge-carousel-shell">
      <button
        class="badge-carousel-btn"
        type="button"
        data-direction="-1"
        aria-label="Badge précédent"
        ${badges.length <= 1 ? "disabled" : ""}
      >
        ‹
      </button>

      <div
        id="badgeCarouselTrack"
        class="badge-carousel-track"
        tabindex="0"
        aria-label="Carrousel des badges"
      >
        ${badgeCardsHtml}
      </div>

      <button
        class="badge-carousel-btn"
        type="button"
        data-direction="1"
        aria-label="Badge suivant"
        ${badges.length <= 1 ? "disabled" : ""}
      >
        ›
      </button>
    </div>

    <p class="badge-carousel-help">
      Glisse horizontalement pour parcourir les badges. Les images apparaissent quand le badge est débloqué.
    </p>
  `;
};

window.FitnessRpgRender.openBadgeModal = function openBadgeModal(badgeId) {
  const badges = window.FitnessRpgProgress.getBadgeStatusList();
  const badge = badges.find((item) => item.id === badgeId);

  if (!badge || !badge.unlocked) return;

  let overlay = document.querySelector("#badgeDetailOverlay");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "badgeDetailOverlay";
    overlay.className = "badge-detail-overlay hidden";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);
  }

  const safeTitle = window.FitnessRpgRender.escapeHtml(badge.title || "Badge");
  const safeDescription = window.FitnessRpgRender.escapeHtml(badge.description || "");
  const safeImage = window.FitnessRpgRender.escapeHtml(
    window.FitnessRpgRender.getBadgeImagePath(badge)
  );
  const safeIcon = window.FitnessRpgRender.escapeHtml(badge.icon || "🏅");

  overlay.innerHTML = `
    <section class="badge-detail-modal" role="dialog" aria-modal="true">
      <button
        class="badge-detail-close"
        type="button"
        aria-label="Fermer"
      >
        ×
      </button>

      <div class="badge-detail-image-frame" data-icon="${safeIcon}">
        <img
          src="${safeImage}"
          alt="${safeTitle}"
          class="badge-detail-image"
          onerror="this.parentElement.classList.add('is-missing'); this.remove();"
        />
      </div>

      <h2>${safeTitle}</h2>
      <p>${safeDescription}</p>
      <strong>Badge débloqué</strong>
    </section>
  `;

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

window.FitnessRpgRender.closeBadgeModal = function closeBadgeModal() {
  const overlay = document.querySelector("#badgeDetailOverlay");

  if (!overlay) return;

  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = "";
  document.body.classList.remove("modal-open");
};
// ============================================================
// Journal
// ============================================================

window.FitnessRpgRender.journalFilter = window.FitnessRpgRender.journalFilter || "all";
window.FitnessRpgRender.journalQuery = window.FitnessRpgRender.journalQuery || "";

window.FitnessRpgRender.getJournalGroup = function getJournalGroup(type) {
  const safeType = String(type || "note").toLowerCase();

  if (["exercise", "program", "program-boss", "custom-program", "workout"].includes(safeType)) {
    return "training";
  }

  if (["xp", "levelup", "badge", "bonus", "chest", "familiar", "reward"].includes(safeType)) {
    return "rewards";
  }

  return "life";
};

window.FitnessRpgRender.getJournalTypeMeta = function getJournalTypeMeta(entry) {
  const group = window.FitnessRpgRender.getJournalGroup(entry?.type);
  const type = String(entry?.type || "note").toLowerCase();

  const map = {
    exercise: ["⚔️", "Exercice"],
    program: ["📜", "Programme"],
    "program-boss": ["🐉", "Boss"],
    "custom-program": ["🧩", "Programme personnalisé"],
    xp: ["✨", "XP"],
    levelup: ["🏆", "Niveau"],
    badge: ["🏅", "Badge"],
    bonus: ["🎁", "Bonus"],
    familiar: ["🐾", "Familier"],
    weight: ["⚖️", "Poids"],
    goal: ["🎯", "Objectif"],
    profile: ["🧙", "Héros"],
    system: ["⚙️", "Système"]
  };

  const [icon, label] = map[type] || (group === "training"
    ? ["⚔️", "Entraînement"]
    : group === "rewards"
      ? ["✨", "Récompense"]
      : ["📖", "Aventure"]);

  return { group, icon, label };
};

window.FitnessRpgRender.setJournalFilter = function setJournalFilter(filter) {
  const allowed = ["all", "training", "rewards", "life"];
  window.FitnessRpgRender.journalFilter = allowed.includes(filter) ? filter : "all";
  window.FitnessRpgRender.renderJournal();
};

window.FitnessRpgRender.setJournalQuery = function setJournalQuery(query) {
  window.FitnessRpgRender.journalQuery = String(query || "").trim().toLowerCase();
  window.FitnessRpgRender.renderJournal();
};

window.FitnessRpgRender.renderJournal = function renderJournal() {
  const list = document.querySelector("#journalList");
  const summary = document.querySelector("#journalSummary");
  const title = document.querySelector("#journalResultsTitle");
  const countNode = document.querySelector("#journalResultCount");
  const searchInput = document.querySelector("#journalSearchInput");
  if (!list) return;

  const journal = window.FitnessRpgState.getJournal() || [];
  const filter = window.FitnessRpgRender.journalFilter || "all";
  const query = window.FitnessRpgRender.journalQuery || "";

  const counts = journal.reduce((acc, entry) => {
    const group = window.FitnessRpgRender.getJournalGroup(entry?.type);
    acc[group] += 1;
    return acc;
  }, { training: 0, rewards: 0, life: 0 });

  const filtered = journal.filter((entry) => {
    const group = window.FitnessRpgRender.getJournalGroup(entry?.type);
    if (filter !== "all" && group !== filter) return false;
    if (!query) return true;
    return `${entry?.title || ""} ${entry?.text || ""} ${entry?.type || ""}`
      .toLowerCase()
      .includes(query);
  });

  document.querySelectorAll(".journal-filter-btn").forEach((button) => {
    const active = button.dataset.journalFilter === filter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  if (searchInput && document.activeElement !== searchInput && searchInput.value !== window.FitnessRpgRender.journalQuery) {
    searchInput.value = window.FitnessRpgRender.journalQuery;
  }

  const lastDate = journal[0]?.at
    ? new Date(journal[0].at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : "Aucune chronique";

  if (summary) {
    summary.innerHTML = `
      <article class="journal-summary-card"><span>📚</span><div><strong>${journal.length}</strong><small>entrées</small></div></article>
      <article class="journal-summary-card"><span>⚔️</span><div><strong>${counts.training}</strong><small>entraînements</small></div></article>
      <article class="journal-summary-card"><span>✨</span><div><strong>${counts.rewards}</strong><small>récompenses</small></div></article>
      <p class="journal-last-date">Dernière trace : ${window.FitnessRpgRender.escapeHtml(lastDate)}</p>
    `;
  }

  const labels = {
    all: "Toutes",
    training: "Entraînements",
    rewards: "Récompenses",
    life: "Aventure"
  };
  if (title) title.textContent = labels[filter] || labels.all;
  if (countNode) countNode.textContent = `${filtered.length} entrée${filtered.length > 1 ? "s" : ""}`;

  list.innerHTML = "";

  if (!filtered.length) {
    list.innerHTML = `
      <li class="journal-empty-state">
        <span aria-hidden="true">📭</span>
        <div>
          <strong>Aucune chronique trouvée</strong>
          <p>${journal.length ? "Modifie le filtre ou la recherche pour retrouver une trace." : "Les exploits du héros apparaîtront ici après les premières actions."}</p>
        </div>
      </li>
    `;
    return;
  }

  let previousDay = "";

  filtered.forEach((entry) => {
    const date = new Date(entry.at);
    const validDate = Number.isFinite(date.getTime());
    const dayKey = validDate ? date.toISOString().slice(0, 10) : "unknown";

    if (dayKey !== previousDay) {
      const divider = document.createElement("li");
      divider.className = "journal-date-divider";
      divider.textContent = validDate
        ? date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
        : "Date inconnue";
      list.appendChild(divider);
      previousDay = dayKey;
    }

    const meta = window.FitnessRpgRender.getJournalTypeMeta(entry);
    const item = document.createElement("li");
    item.className = `journal-entry journal-entry-${meta.group}`;

    const dateLabel = validDate
      ? date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
      : "Heure inconnue";

    item.innerHTML = `
      <span class="journal-entry-icon" aria-hidden="true">${meta.icon}</span>
      <div class="journal-entry-content">
        <div class="journal-entry-heading">
          <strong>${window.FitnessRpgRender.escapeHtml(entry.title || "Chronique")}</strong>
          <time>${window.FitnessRpgRender.escapeHtml(dateLabel)}</time>
        </div>
        <p>${window.FitnessRpgRender.escapeHtml(entry.text || "")}</p>
        <span class="journal-entry-type">${window.FitnessRpgRender.escapeHtml(meta.label)}${Number(entry.xp || 0) > 0 ? ` · +${Number(entry.xp)} XP` : ""}</span>
      </div>
    `;

    list.appendChild(item);
  });
};

// ============================================================
// Poids

// ============================================================
// Poids
// ============================================================

window.FitnessRpgRender.formatWeightDate = function formatWeightDate(value, options = {}) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "Date inconnue";
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: options.short ? "short" : "long",
    year: "numeric"
  });
};

window.FitnessRpgRender.drawWeightChart = function drawWeightChart(canvas, weights) {
  const ctx = canvas?.getContext?.("2d");
  if (!ctx) return;

  const parentWidth = Math.max(320, canvas.parentElement?.clientWidth || 760);
  const cssHeight = parentWidth < 520 ? 240 : 300;
  const ratio = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  canvas.width = Math.round(parentWidth * ratio);
  canvas.height = Math.round(cssHeight * ratio);
  canvas.style.width = `${parentWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, parentWidth, cssHeight);

  const styles = getComputedStyle(document.documentElement);
  const textColor = styles.getPropertyValue("--text-muted").trim() || "#b8c0d0";
  const lineColor = styles.getPropertyValue("--accent").trim() || "#f1c968";
  const blue = styles.getPropertyValue("--blue").trim() || "#7cc8ff";

  if (!weights.length) {
    ctx.fillStyle = textColor;
    ctx.font = "600 14px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("Aucune mesure enregistrée pour l’instant.", parentWidth / 2, cssHeight / 2);
    return;
  }

  const values = weights.map((entry) => Number(entry.value)).filter(Number.isFinite);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const paddingValue = Math.max(0.5, (rawMax - rawMin) * 0.18);
  const min = rawMin - paddingValue;
  const max = rawMax + paddingValue;
  const range = Math.max(1, max - min);

  const margin = { left: 52, right: 22, top: 24, bottom: 44 };
  const chartWidth = parentWidth - margin.left - margin.right;
  const chartHeight = cssHeight - margin.top - margin.bottom;

  ctx.lineWidth = 1;
  ctx.font = "600 11px system-ui";
  ctx.fillStyle = textColor;
  ctx.strokeStyle = "rgba(210,221,244,0.11)";

  for (let i = 0; i <= 4; i += 1) {
    const ratioY = i / 4;
    const y = margin.top + chartHeight * ratioY;
    const value = max - range * ratioY;
    ctx.beginPath();
    ctx.moveTo(margin.left, y);
    ctx.lineTo(parentWidth - margin.right, y);
    ctx.stroke();
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(`${value.toFixed(1)}`, margin.left - 8, y);
  }

  const points = weights.map((entry, index) => {
    const x = margin.left + (index / Math.max(1, weights.length - 1)) * chartWidth;
    const y = margin.top + chartHeight - ((Number(entry.value) - min) / range) * chartHeight;
    return { x, y, entry };
  });

  const gradient = ctx.createLinearGradient(0, margin.top, 0, margin.top + chartHeight);
  gradient.addColorStop(0, "rgba(124,200,255,0.24)");
  gradient.addColorStop(1, "rgba(124,200,255,0.015)");
  ctx.beginPath();
  ctx.moveTo(points[0].x, margin.top + chartHeight);
  points.forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.lineTo(points.at(-1).x, margin.top + chartHeight);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  points.forEach((point, index) => index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y));
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();

  points.forEach((point, index) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, index === points.length - 1 ? 5 : 3.5, 0, Math.PI * 2);
    ctx.fillStyle = index === points.length - 1 ? lineColor : blue;
    ctx.fill();
    ctx.strokeStyle = "rgba(11,15,24,0.9)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  const labelIndexes = [...new Set([0, Math.floor((weights.length - 1) / 2), weights.length - 1])];
  ctx.fillStyle = textColor;
  ctx.font = "600 11px system-ui";
  ctx.textBaseline = "top";
  labelIndexes.forEach((index) => {
    const point = points[index];
    ctx.textAlign = index === 0 ? "left" : index === weights.length - 1 ? "right" : "center";
    ctx.fillText(
      window.FitnessRpgRender.formatWeightDate(point.entry.date || point.entry.at, { short: true }),
      point.x,
      margin.top + chartHeight + 13
    );
  });
};

window.FitnessRpgRender.renderWeight = function renderWeight() {
  const canvas = document.querySelector("#weightChart");
  const summary = document.querySelector("#weightSummary");
  const history = document.querySelector("#weightHistory");
  const countNode = document.querySelector("#weightHistoryCount");
  const rangeNode = document.querySelector("#weightChartRange");
  if (!canvas) return;

  const weights = (window.FitnessRpgState.getWeights() || [])
    .filter((entry) => Number.isFinite(Number(entry?.value)))
    .map((entry) => ({ ...entry, value: Number(entry.value) }))
    .sort((a, b) => String(a.date || a.at).localeCompare(String(b.date || b.at)));

  const latest = weights.at(-1) || null;
  const first = weights[0] || null;
  const values = weights.map((entry) => entry.value);
  const min = values.length ? Math.min(...values) : null;
  const max = values.length ? Math.max(...values) : null;
  const delta = latest && first ? latest.value - first.value : null;
  const deltaText = delta === null
    ? "Pas encore de tendance"
    : `${delta > 0 ? "+" : ""}${delta.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} kg`;

  if (summary) {
    summary.innerHTML = `
      <article class="weight-summary-card"><span>⚖️</span><div><strong>${latest ? `${latest.value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} kg` : "—"}</strong><small>dernière mesure</small></div></article>
      <article class="weight-summary-card"><span>📈</span><div><strong>${window.FitnessRpgRender.escapeHtml(deltaText)}</strong><small>évolution depuis la première mesure</small></div></article>
      <article class="weight-summary-card"><span>↕️</span><div><strong>${min === null ? "—" : `${min.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} à ${max.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} kg`}</strong><small>amplitude observée</small></div></article>
      <article class="weight-summary-card"><span>🗓️</span><div><strong>${weights.length}</strong><small>mesure${weights.length > 1 ? "s" : ""} enregistrée${weights.length > 1 ? "s" : ""}</small></div></article>
    `;
  }

  if (rangeNode) {
    rangeNode.textContent = weights.length > 1
      ? `${window.FitnessRpgRender.formatWeightDate(first.date || first.at, { short: true })} → ${window.FitnessRpgRender.formatWeightDate(latest.date || latest.at, { short: true })}`
      : weights.length === 1
        ? "Première mesure"
        : "Aucune mesure";
  }

  if (countNode) countNode.textContent = `${weights.length} mesure${weights.length > 1 ? "s" : ""}`;

  window.FitnessRpgRender.drawWeightChart(canvas, weights);

  if (history) {
    if (!weights.length) {
      history.innerHTML = `
        <div class="weight-empty-state">
          <span aria-hidden="true">⚖️</span>
          <div><strong>Aucune mesure enregistrée</strong><p>La première mesure créera la courbe d’évolution.</p></div>
        </div>
      `;
    } else {
      history.innerHTML = weights.slice(-8).reverse().map((entry, index) => {
        const previous = weights[weights.length - 2 - index];
        const change = previous ? entry.value - previous.value : null;
        const changeText = change === null
          ? "Point de départ"
          : `${change > 0 ? "+" : ""}${change.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} kg`;
        const changeClass = change === null || Math.abs(change) < 0.05
          ? "neutral"
          : change > 0 ? "up" : "down";

        return `
          <article class="weight-history-item">
            <time>${window.FitnessRpgRender.escapeHtml(window.FitnessRpgRender.formatWeightDate(entry.date || entry.at))}</time>
            <strong>${entry.value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} kg</strong>
            <span class="weight-change ${changeClass}">${window.FitnessRpgRender.escapeHtml(changeText)}</span>
          </article>
        `;
      }).join("");
    }
  }
};

// ============================================================
// Bilan de séance

// ============================================================
// Bilan de séance
// ============================================================

window.FitnessRpgRender.pendingWorkoutSummary = null;
window.FitnessRpgRender.pendingSummaryChestReward = null;

window.FitnessRpgRender.captureBadgeIds = function captureBadgeIds() {
  const profile = window.FitnessRpgState?.getProfile?.();
  return Array.isArray(profile?.badges) ? [...profile.badges] : [];
};

window.FitnessRpgRender.getNewBadgeRewards = function getNewBadgeRewards(beforeIds = []) {
  const before = new Set(Array.isArray(beforeIds) ? beforeIds : []);
  const profile = window.FitnessRpgState?.getProfile?.();
  const current = Array.isArray(profile?.badges) ? profile.badges : [];
  const badges = Array.isArray(window.FitnessRpgData?.badges)
    ? window.FitnessRpgData.badges
    : [];

  return current
    .filter((badgeId) => !before.has(badgeId))
    .map((badgeId) => {
      const badge = badges.find((item) => item.id === badgeId);
      return {
        id: badgeId,
        title: badge?.title || badgeId,
        icon: badge?.icon || "🏅"
      };
    });
};

window.FitnessRpgRender.getLevelSnapshot = function getLevelSnapshot() {
  const info = window.FitnessRpgProgress?.getProfileLevelInfo?.()
    || window.FitnessRpgConfig?.levelInfo?.(
      window.FitnessRpgState?.getProfile?.()?.totalXp || 0
    )
    || {};

  return {
    level: Number(info.level || 1),
    rank: info.rank || window.FitnessRpgConfig?.getRankTitle?.(info.level || 1) || "Novice",
    currentXp: Number(info.currentXp || 0),
    nextXp: Number(info.nextXp || 0),
    totalXp: Number(info.totalXp || 0)
  };
};

window.FitnessRpgRender.getElapsedSeconds = function getElapsedSeconds(startedAt, endedAt = Date.now()) {
  const startedMs = typeof startedAt === "number"
    ? startedAt
    : Date.parse(startedAt || "");
  const endedMs = typeof endedAt === "number"
    ? endedAt
    : Date.parse(endedAt || "");

  if (!Number.isFinite(startedMs) || !Number.isFinite(endedMs) || endedMs < startedMs) {
    return null;
  }

  return Math.max(0, Math.round((endedMs - startedMs) / 1000));
};

window.FitnessRpgRender.formatWorkoutDuration = function formatWorkoutDuration(seconds) {
  if (seconds === null || seconds === undefined || seconds === "") {
    return "Non chronométrée";
  }

  const value = Number(seconds);
  if (!Number.isFinite(value) || value < 0) return "Non chronométrée";

  const rounded = Math.max(0, Math.round(value));
  const hours = Math.floor(rounded / 3600);
  const minutes = Math.floor((rounded % 3600) / 60);
  const rest = rounded % 60;

  if (hours > 0) return `${hours} h ${String(minutes).padStart(2, "0")} min`;
  if (minutes > 0) return `${minutes} min ${String(rest).padStart(2, "0")} s`;
  return `${rest} s`;
};

window.FitnessRpgRender.formatWorkoutItemAmount = function formatWorkoutItemAmount(item = {}) {
  const amount = item.amount ?? "";
  const unit = item.unit || "";
  const distance = Number(item.distanceKm);
  const base = `${amount} ${unit}`.trim();

  if (Number.isFinite(distance) && distance > 0) {
    return `${base}${base ? " · " : ""}${distance.toFixed(1)} km`;
  }

  return base || "Réalisé";
};

window.FitnessRpgRender.queueWorkoutSummary = function queueWorkoutSummary(summary = {}) {
  const items = Array.isArray(summary.items) ? summary.items.filter(Boolean) : [];
  const rewards = Array.isArray(summary.rewards) ? summary.rewards.filter(Boolean) : [];

  window.FitnessRpgRender.pendingWorkoutSummary = {
    type: summary.type || "workout",
    icon: summary.icon || "✅",
    eyebrow: summary.eyebrow || "Quête accomplie",
    title: summary.title || "Séance terminée",
    subtitle: summary.subtitle || "",
    durationSeconds: summary.durationSeconds !== null
      && summary.durationSeconds !== undefined
      && summary.durationSeconds !== ""
      && Number.isFinite(Number(summary.durationSeconds))
        ? Math.max(0, Number(summary.durationSeconds))
        : null,
    xp: Math.max(0, Number(summary.xp || 0)),
    baseXp: Math.max(0, Number(summary.baseXp ?? summary.xp ?? 0)),
    bonusXp: Math.max(0, Number(summary.bonusXp || 0)),
    items,
    rewards,
    progress: summary.progress || null,
    coachMessage: summary.coachMessage || "Belle séance. La progression est en marche.",
    familiarReward: summary.familiarReward || null,
    levelBefore: summary.levelBefore || null,
    levelAfter: summary.levelAfter || window.FitnessRpgRender.getLevelSnapshot(),
    createdAt: new Date().toISOString()
  };

  if (summary.chestReward?.success) {
    window.FitnessRpgRender.pendingSummaryChestReward = summary.chestReward;
  }

  return window.FitnessRpgRender.pendingWorkoutSummary;
};

window.FitnessRpgRender.peekWorkoutSummary = function peekWorkoutSummary() {
  return window.FitnessRpgRender.pendingWorkoutSummary || null;
};

window.FitnessRpgRender.consumeWorkoutSummary = function consumeWorkoutSummary() {
  const summary = window.FitnessRpgRender.pendingWorkoutSummary || null;
  window.FitnessRpgRender.pendingWorkoutSummary = null;
  return summary;
};

window.FitnessRpgRender.isWorkoutSummaryVisible = function isWorkoutSummaryVisible() {
  const overlay = document.querySelector("#workoutSummaryOverlay");
  return Boolean(overlay && !overlay.classList.contains("hidden"));
};

window.FitnessRpgRender.renderWorkoutSummaryOverlay = function renderWorkoutSummaryOverlay() {
  const summary = window.FitnessRpgRender.peekWorkoutSummary();
  const overlay = document.querySelector("#workoutSummaryOverlay");
  const card = document.querySelector("#workoutSummaryCard");

  if (!overlay || !card || !summary) return false;

  const escape = window.FitnessRpgRender.escapeHtml;
  const levelAfter = summary.levelAfter || window.FitnessRpgRender.getLevelSnapshot();
  const levelBefore = summary.levelBefore || levelAfter;
  const levelChanged = Number(levelAfter.level) > Number(levelBefore.level);
  const durationText = window.FitnessRpgRender.formatWorkoutDuration(summary.durationSeconds);
  const progress = summary.progress;
  const progressPercent = progress
    ? Math.max(0, Math.min(100, Number(progress.percent || 0)))
    : 0;

  const itemsHtml = summary.items.length
    ? summary.items.map((item) => `
        <li class="workout-summary-exercise">
          <span class="workout-summary-exercise-icon">${escape(item.icon || "✓")}</span>
          <span class="workout-summary-exercise-copy">
            <small>${escape(item.phase || "Exercice")}</small>
            <strong>${escape(item.title || "Exercice")}</strong>
          </span>
          <em>${escape(window.FitnessRpgRender.formatWorkoutItemAmount(item))}</em>
        </li>
      `).join("")
    : `<li class="workout-summary-empty">Séance enregistrée dans le journal.</li>`;

  const rewardsHtml = summary.rewards.length
    ? `
      <section class="workout-summary-rewards">
        <h2>Récompenses et déblocages</h2>
        <ul>
          ${summary.rewards.map((reward) => {
            const icon = typeof reward === "string" ? "✨" : reward.icon || "✨";
            const text = typeof reward === "string" ? reward : reward.text || reward.title || "Récompense";
            return `<li><span>${escape(icon)}</span><strong>${escape(text)}</strong></li>`;
          }).join("")}
        </ul>
      </section>
    `
    : "";

  const progressHtml = progress
    ? `
      <section class="workout-summary-progress">
        <div>
          <span>${escape(progress.label || "Progression")}</span>
          <strong>${escape(progress.text || `${progress.value || 0} / ${progress.max || 0}`)}</strong>
        </div>
        <div class="workout-summary-progress-track" aria-label="Progression ${Math.round(progressPercent)} %">
          <span style="width:${progressPercent}%"></span>
        </div>
      </section>
    `
    : "";

  const xpDetail = summary.bonusXp > 0
    ? `<small>${summary.baseXp} XP de séance + ${summary.bonusXp} XP bonus</small>`
    : "";

  const familiarReward = summary.familiarReward;
  const familiarRewardHtml = familiarReward?.familiar
    ? (() => {
        const familiar = familiarReward.familiar;
        const after = familiarReward.after || {};
        const levelUpText = familiarReward.leveledUp
          ? ` · Niveau d’Affinité ${after.level} atteint !`
          : "";
        return `
          <section class="workout-summary-familiar familiar-state-victory">
            <img src="${escape(familiar.image || "")}" alt="${escape(familiar.name || "Familier")}">
            <div>
              <p class="eyebrow">🐾 Ton compagnon fête la victoire</p>
              <strong>${escape(familiar.name || "Familier")} gagne +${Number(familiarReward.gain || 0)} Affinité</strong>
              <small>Affinité ${Number(after.points || 0)} · Niv. ${Number(after.level || 1)}${escape(levelUpText)}</small>
            </div>
          </section>
        `;
      })()
    : "";

  card.innerHTML = `
    <header class="workout-summary-header">
      <div class="workout-summary-sigil" aria-hidden="true">${escape(summary.icon)}</div>
      <p class="eyebrow">${escape(summary.eyebrow)}</p>
      <h1 id="workoutSummaryTitle">${escape(summary.title)}</h1>
      ${summary.subtitle ? `<p>${escape(summary.subtitle)}</p>` : ""}
    </header>

    <section class="workout-summary-stats" aria-label="Résumé de la séance">
      <article>
        <span>⏱️</span>
        <small>Durée</small>
        <strong>${escape(durationText)}</strong>
      </article>
      <article>
        <span>✨</span>
        <small>XP gagnée</small>
        <strong>+${summary.xp} XP</strong>
        ${xpDetail}
      </article>
      <article>
        <span>⚔️</span>
        <small>Exercices</small>
        <strong>${summary.items.length}</strong>
      </article>
      <article>
        <span>${levelChanged ? "🌟" : "🛡️"}</span>
        <small>${levelChanged ? "Nouveau niveau" : "Niveau"}</small>
        <strong>${escape(`Niv. ${levelAfter.level} · ${levelAfter.rank}`)}</strong>
      </article>
    </section>

    ${progressHtml}

    <section class="workout-summary-list-section">
      <h2>Exercices réalisés</h2>
      <ul class="workout-summary-exercises">${itemsHtml}</ul>
    </section>

    ${rewardsHtml}

    ${familiarRewardHtml}

    <blockquote class="workout-summary-coach">
      <span>💬</span>
      <p>${escape(summary.coachMessage)}</p>
    </blockquote>

    <footer class="workout-summary-actions">
      <button id="sessionSummaryHomeButton" class="ghost-btn" type="button">Accueil</button>
      <button id="sessionSummaryProgressButton" class="secondary-btn" type="button">Voir ma progression</button>
      <button id="sessionSummaryContinueButton" class="primary-btn" type="button">Continuer</button>
    </footer>
  `;

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("workout-summary-active");
  card.scrollTop = 0;
  return true;
};

window.FitnessRpgRender.renderPostCompletionRewards = function renderPostCompletionRewards() {
  if (window.FitnessRpgRender.isWorkoutSummaryVisible()) return;

  const levelPending = window.FitnessRpgProgress?.peekLevelUpModal?.();
  if (levelPending) {
    window.FitnessRpgRender.renderLevelUpOverlay?.();
    return;
  }

  const badgePending = window.FitnessRpgProgress?.peekBadgeRewardModal?.();
  if (badgePending) {
    window.FitnessRpgRender.renderBadgeRewardOverlay?.();
    return;
  }

  const chestReward = window.FitnessRpgRender.pendingSummaryChestReward;
  if (chestReward?.success) {
    window.FitnessRpgRender.pendingSummaryChestReward = null;
    window.FitnessRpgRender.showChestRewardModal?.(chestReward);
  }
};

window.FitnessRpgRender.closeWorkoutSummaryOverlay = function closeWorkoutSummaryOverlay(destination = null) {
  const overlay = document.querySelector("#workoutSummaryOverlay");

  if (overlay) {
    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");
  }

  document.body.classList.remove("workout-summary-active");
  window.FitnessRpgRender.consumeWorkoutSummary();

  if (destination === "home") {
    window.FitnessRpgState?.setPose?.("idle");
    window.FitnessRpgState?.setPage?.("home");
    window.FitnessRpgRender.renderCurrentPage?.();
  } else if (destination === "progression") {
    window.FitnessRpgState?.setPage?.("progression");
    window.FitnessRpgRender.renderCurrentPage?.();
  }

  window.FitnessRpgRender.renderPostCompletionRewards();
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

window.FitnessRpgRender.renderLevelUpChestHtml = function renderLevelUpChestHtml(levelReward, familiar) {
 if (levelReward?.allCollected) {
  return `
    <div class="level-up-chest-slot is-open" id="levelUpChestSlot">
      <p class="level-up-chest-empty">
        🏆 Collection complète : tous les familiers sont déjà débloqués.
      </p>
    </div>
  `;
}

  if (!familiar) {
    return `
      <p class="level-up-chest-empty">
        Coffre de familier débloqué, mais aucun familier n’est disponible.
      </p>
    `;
  }

  const safeName = window.FitnessRpgRender.escapeHtml(familiar.name || "Familier");
  const safeImage = window.FitnessRpgRender.escapeHtml(familiar.image || "");

  return `
    <div class="level-up-chest-slot" id="levelUpChestSlot">
      <button
        class="level-up-chest-button"
        type="button"
        aria-label="Ouvrir le coffre de familier"
      >
        <div class="reward-chest-box is-closed">
          <div class="reward-chest-visual" aria-hidden="true">
            <div class="reward-chest-light"></div>
            <div class="reward-chest-lid"></div>
            <div class="reward-chest-base"></div>
            <div class="reward-chest-lock">✦</div>
          </div>
        </div>

        <span class="level-up-chest-hint">
          Toucher le coffre pour l’ouvrir
        </span>
      </button>

      <div class="level-up-chest-card hidden" id="levelUpChestCard">
        <img src="${safeImage}" alt="${safeName}" />
        <strong>${safeName}</strong>
        <span>Nouveau familier débloqué</span>
      </div>
    </div>
  `;
};

window.FitnessRpgRender.openLevelUpChestReward = function openLevelUpChestReward() {
  const slot = document.querySelector("#levelUpChestSlot");
  const button = document.querySelector(".level-up-chest-button");
  const chestBox = document.querySelector("#levelUpChestSlot .reward-chest-box");
  const card = document.querySelector("#levelUpChestCard");
  const hint = document.querySelector(".level-up-chest-hint");

  if (!slot || !button || !chestBox || !card) return;
  if (slot.classList.contains("is-open")) return;

  slot.classList.add("is-open");
  button.classList.add("is-open");

  chestBox.classList.remove("is-closed");
  chestBox.classList.add("is-open");

  if (hint) {
    hint.textContent = "Coffre ouvert !";
  }

  window.setTimeout(() => {
    card.classList.remove("hidden");
    card.classList.add("is-visible");

    window.FitnessRpgRender.renderFamiliarsPage?.();
  }, 950);
};
window.FitnessRpgRender.renderLevelUpOverlay = function renderLevelUpOverlay() {
  if (window.FitnessRpgRender.isWorkoutSummaryVisible?.()) return;

  const pending = window.FitnessRpgProgress.peekLevelUpModal?.();
  const overlay = document.querySelector("#levelUpOverlay");

  if (!overlay || !pending) return;

  const oldLevel = Number(pending.oldLevel || 1);
  const newLevel = Number(pending.newLevel || 1);
  const rank = window.FitnessRpgConfig.getRankTitle(newLevel);
  const hasChest = window.FitnessRpgProgress.hasChestReward(newLevel);
  const narrative = window.FitnessRpgProgress.getLevelUpNarrative?.(newLevel) || "";
  const profile = window.FitnessRpgState.getProfile?.();
  const levelReward = profile?.levelFamiliarRewards?.[String(newLevel)] || null;
  const familiar = levelReward?.familiarId
    ? (profile.familiars || []).find((item) => item.id === levelReward.familiarId)
    : null;

  const oldHeroImage = window.FitnessRpgRender.getHeroImagePathForLevel(oldLevel);
  const newHeroImage = window.FitnessRpgRender.getHeroImagePathForLevel(newLevel);

  const icon = document.querySelector("#levelUpIcon");
  const title = document.querySelector("#levelUpTitle");
  const text = document.querySelector("#levelUpText");
  const reward = document.querySelector("#levelUpReward");

  if (icon) {
    icon.textContent = "";
    icon.classList.add("hidden");
  }
  if (title) title.textContent = `Niveau ${newLevel} atteint !`;

 if (text) {
  text.innerHTML = `
    <div class="level-up-transform">
      <div class="level-up-hero-stage" id="levelUpHeroStage">
        <img
          src="${oldHeroImage}"
          alt="Héros niveau ${oldLevel}"
          class="level-up-hero-img level-up-hero-img-old"
        />

        <img
          src="${newHeroImage}"
          alt="Héros niveau ${newLevel}"
          class="level-up-hero-img level-up-hero-img-new"
        />

        <span class="level-up-stage-label">
          Niv. ${oldLevel} → Niv. ${newLevel}
        </span>
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

   ${
      hasChest
        ? window.FitnessRpgRender.renderLevelUpChestHtml(levelReward, familiar)
        : `<p>Nouvelle apparence héroïque débloquée.</p>`
    }

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
  const levelUpHeroStage = document.querySelector("#levelUpHeroStage");

  if (levelUpHeroStage) {
    requestAnimationFrame(() => {
      setTimeout(() => {
        levelUpHeroStage.classList.add("is-transitioning");
      }, 850);
    });
  }
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
  window.FitnessRpgRender.renderPostCompletionRewards?.();
};
// ============================================================
// Badge obtenu
// ============================================================

window.FitnessRpgRender.renderBadgeRewardOverlay = function renderBadgeRewardOverlay() {
  if (window.FitnessRpgRender.isWorkoutSummaryVisible?.()) return;

  const levelOverlay = document.querySelector("#levelUpOverlay");

  if (levelOverlay && !levelOverlay.classList.contains("hidden")) {
    return;
  }

  const badge = window.FitnessRpgProgress.peekBadgeRewardModal?.();
  const overlay = document.querySelector("#badgeRewardOverlay");

  if (!overlay || !badge) return;

  const image = document.querySelector("#badgeRewardImage");
  const title = document.querySelector("#badgeRewardTitle");
  const text = document.querySelector("#badgeRewardText");
  const fallbackIcon = document.querySelector("#badgeRewardFallbackIcon");

  if (image) {
    image.src = window.FitnessRpgProgress.getBadgeImagePath(badge);
    image.alt = badge.title || "Badge obtenu";
    image.classList.remove("hidden");

    image.onerror = function handleBadgeImageError() {
      image.classList.add("hidden");
      if (fallbackIcon) fallbackIcon.classList.remove("hidden");
    };

    image.onload = function handleBadgeImageLoad() {
      if (fallbackIcon) fallbackIcon.classList.add("hidden");
    };
  }

  if (fallbackIcon) {
    fallbackIcon.textContent = badge.icon || "🏅";
  }

  if (title) {
    title.textContent = badge.title || "Badge obtenu !";
  }

  if (text) {
    text.textContent = badge.description || "Une nouvelle récompense rejoint ta collection.";
  }

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("badge-reward-active");
};

window.FitnessRpgRender.closeBadgeRewardOverlay = function closeBadgeRewardOverlay() {
  const overlay = document.querySelector("#badgeRewardOverlay");

  if (overlay) {
    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");
  }

  document.body.classList.remove("badge-reward-active");
  window.FitnessRpgProgress.consumeBadgeRewardModal?.();

  window.FitnessRpgRender.renderCurrentPage?.();
  window.FitnessRpgRender.renderPostCompletionRewards?.();
};
// ============================================================
// Carrousel évolution du héros
// ============================================================

window.FitnessRpgRender.heroEvolutionLevel = null;



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

  window.FitnessRpgRewards?.ensureFamiliarProfileData?.();

  const unlockedFamiliars = window.FitnessRpgRewards?.getUnlockedFamiliars?.() || [];
  const unlockedCount = unlockedFamiliars.length;
  const activeFamiliar = window.FitnessRpgRewards?.getActiveFamiliar?.() || null;
  const activeInfo = activeFamiliar
    ? window.FitnessRpgRewards?.getFamiliarLevelInfo?.(activeFamiliar.id)
    : null;

  summary.innerHTML = `
    <p class="eyebrow">🐾 Ménagerie du héros</p>
    <h2>${unlockedCount} familier${unlockedCount > 1 ? "s" : ""} débloqué${unlockedCount > 1 ? "s" : ""}</h2>
    ${activeFamiliar ? `
      <div class="familiar-active-summary">
        <img src="${window.FitnessRpgRender.escapeHtml(activeFamiliar.image)}" alt="${window.FitnessRpgRender.escapeHtml(activeFamiliar.name)}">
        <div>
          <small>Compagnon actif</small>
          <strong>${window.FitnessRpgRender.escapeHtml(activeFamiliar.name)}</strong>
          <span>Affinité ${activeInfo?.points || 0} · Niv. ${activeInfo?.level || 1} ${window.FitnessRpgRender.escapeHtml(activeInfo?.title || "Compagnon")}</span>
        </div>
      </div>
    ` : `<p>Choisis un compagnon : il t’accompagnera ensuite pendant les séances.</p>`}
  `;

  if (!unlockedFamiliars.length) {
    grid.innerHTML = `
      <article class="card familiar-empty-card">
        <h2>Aucun familier pour l’instant</h2>
        <p>Gagne un niveau, ouvre un coffre, et ton premier compagnon apparaîtra ici.</p>
      </article>
    `;
    return;
  }

  const familiarCardsHtml = unlockedFamiliars.map((familiar) => {
    const safeId = window.FitnessRpgRender.escapeHtml(familiar.id);
    const safeName = window.FitnessRpgRender.escapeHtml(familiar.name);
    const safeImage = window.FitnessRpgRender.escapeHtml(familiar.image);
    const info = window.FitnessRpgRewards?.getFamiliarLevelInfo?.(familiar.id) || {};
    const isActive = activeFamiliar?.id === familiar.id;

    return `
      <button
        class="familiar-card unlocked ${isActive ? "active familiar-state-idle" : "familiar-state-sleep"}"
        type="button"
        data-familiar-id="${safeId}"
        aria-label="Voir ${safeName} en détail"
      >
        ${isActive ? `<span class="familiar-active-badge">À tes côtés</span>` : `<span class="familiar-sleep-badge" aria-hidden="true">💤</span>`}
        <div class="familiar-image-frame">
          <img src="${safeImage}" alt="${safeName}" class="familiar-image" />
        </div>
        <strong>${safeName}</strong>
        <span class="familiar-level-line">Niv. ${info.level || 1} · ${window.FitnessRpgRender.escapeHtml(info.title || "Compagnon")}</span>
        <span class="familiar-affinity-mini-track"><i style="width:${Number(info.progress || 0)}%"></i></span>
        <small>${Number(info.points || 0)} Affinité</small>
      </button>
    `;
  }).join("");

  grid.innerHTML = `
    <div class="familiar-carousel-shell">
      <button class="familiar-carousel-btn" type="button" data-direction="-1" aria-label="Familier précédent" ${unlockedFamiliars.length <= 1 ? "disabled" : ""}>‹</button>
      <div id="familiarCarouselTrack" class="familiar-carousel-track" tabindex="0" aria-label="Carrousel des familiers débloqués">
        ${familiarCardsHtml}
      </div>
      <button class="familiar-carousel-btn" type="button" data-direction="1" aria-label="Familier suivant" ${unlockedFamiliars.length <= 1 ? "disabled" : ""}>›</button>
    </div>
    <p class="familiar-carousel-help">Touche un familier pour voir son Affinité et le choisir comme compagnon actif.</p>
  `;
};

window.FitnessRpgRender.openFamiliarModal = function openFamiliarModal(familiarId) {
  const familiar = window.FitnessRpgRewards?.getFamiliarById?.(familiarId);
  if (!familiar || !window.FitnessRpgRewards?.hasFamiliar?.(familiarId)) return;

  let overlay = document.querySelector("#familiarDetailOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "familiarDetailOverlay";
    overlay.className = "familiar-detail-overlay hidden";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);
  }

  const safeName = window.FitnessRpgRender.escapeHtml(familiar.name);
  const safeImage = window.FitnessRpgRender.escapeHtml(familiar.image);
  const description = window.FitnessRpgRewards?.getFamiliarDescription?.(familiar) || "Compagnon de route du héros.";
  const info = window.FitnessRpgRewards?.getFamiliarLevelInfo?.(familiar.id) || {};
  const isActive = window.FitnessRpgRewards?.getActiveFamiliarId?.() === familiar.id;
  const nextText = info.nextThreshold == null
    ? "Affinité maximale atteinte"
    : `Encore ${info.remaining} point${info.remaining > 1 ? "s" : ""} avant le niveau ${Number(info.level || 1) + 1}`;

  overlay.innerHTML = `
    <section class="familiar-detail-modal ${isActive ? "familiar-state-idle" : "familiar-state-sleep"}" role="dialog" aria-modal="true">
      <button class="familiar-detail-close" type="button" aria-label="Fermer">×</button>
      ${isActive ? `<span class="familiar-detail-active-chip">🐾 Compagnon actif</span>` : ""}
      <img src="${safeImage}" alt="${safeName}" class="familiar-detail-image" />
      <h2>${safeName}</h2>
      <p class="familiar-detail-description">${window.FitnessRpgRender.escapeHtml(description)}</p>

      <section class="familiar-affinity-card" aria-label="Progression d’Affinité">
        <div>
          <span>Affinité</span>
          <strong>${Number(info.points || 0)} points</strong>
        </div>
        <div>
          <span>Niveau</span>
          <strong>${Number(info.level || 1)} · ${window.FitnessRpgRender.escapeHtml(info.title || "Compagnon")}</strong>
        </div>
        <div class="familiar-affinity-track"><i style="width:${Number(info.progress || 0)}%"></i></div>
        <small>${window.FitnessRpgRender.escapeHtml(nextText)}</small>
      </section>

      <button
        class="${isActive ? "secondary-btn" : "primary-btn"} set-active-familiar-btn"
        type="button"
        data-familiar-id="${window.FitnessRpgRender.escapeHtml(familiar.id)}"
        ${isActive ? "disabled" : ""}
      >
        ${isActive ? "✓ À tes côtés" : "Choisir comme compagnon"}
      </button>
    </section>
  `;

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

window.FitnessRpgRender.closeFamiliarModal = function closeFamiliarModal() {
  const overlay = document.querySelector("#familiarDetailOverlay");
  if (!overlay) return;

  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = "";
  document.body.classList.remove("modal-open");
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

    case "statistics":
      window.FitnessRpgStats?.renderPage?.();
      break;

    case "backup":
      window.FitnessRpgBackup?.renderPage?.();
      break;

    default:
      window.FitnessRpgState.setPage("home");
      window.FitnessRpgRender.renderHome();
      break;
  }
};

window.FitnessRpgRender.renderAll = function renderAll() {
  window.FitnessRpgRender.renderCurrentPage();
  window.FitnessRpgRender.renderWorkoutSummaryOverlay?.();
  window.FitnessRpgRender.renderPostCompletionRewards?.();
};
