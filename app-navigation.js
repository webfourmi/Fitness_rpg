// ============================================================
// Fitness RPG - app-navigation.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - gérer la navigation entre les pages ;
// - brancher les boutons principaux ;
// - gérer création / modification du héros ;
// - ouvrir le programme recommandé depuis la quête du jour ;
// - centraliser les clics des programmes, séances et boss ;
// - gérer les boutons simples : journal, poids, coach, accueil.
//
// Règle importante :
// ce fichier ne contient aucune version.
// Il ne modifie jamais document.title.
// ============================================================

window.FitnessRpgNavigation = window.FitnessRpgNavigation || {};

// ============================================================
// Raccourcis
// ============================================================

window.FitnessRpgNavigation.render = function render() {
  window.FitnessRpgRender?.renderAll?.();
};

window.FitnessRpgNavigation.setPage = function setPage(pageId) {
  const config = window.FitnessRpgConfig;
  const allowedPages = config?.pages || [];
  const safePage = allowedPages.includes(pageId) ? pageId : "home";

  window.FitnessRpgState.setPage(safePage);
  window.FitnessRpgNavigation.render();
};

window.FitnessRpgNavigation.getInputValue = function getInputValue(selector) {
  return document.querySelector(selector)?.value?.trim() || "";
};

window.FitnessRpgNavigation.getCheckedValue = function getCheckedValue(name, fallback = "") {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || fallback;
};

window.FitnessRpgNavigation.showMessage = function showMessage(options = {}) {
  if (window.FitnessRpgRender?.showModal) {
    window.FitnessRpgRender.showModal(options);
    return;
  }

  window.alert(options.message || options.title || "Message");
};

window.FitnessRpgNavigation.stopEvent = function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();

  if (typeof event.stopImmediatePropagation === "function") {
    event.stopImmediatePropagation();
  }
};

// ============================================================
// Navigation principale
// ============================================================

window.FitnessRpgNavigation.goBack = function goBack() {
  const currentPage = window.FitnessRpgState.getPage();

  if (currentPage === "home") {
    return;
  }

  if (currentPage === "training") {
    window.FitnessRpgNavigation.goHome();
    return;
  }

  if (currentPage === "hero-setup") {
    if (window.FitnessRpgState.hasProfile()) {
      window.FitnessRpgNavigation.goHome();
    }

    return;
  }

  window.FitnessRpgNavigation.goTraining();
};

window.FitnessRpgNavigation.goHome = function goHome() {
  window.FitnessRpgState.setPose("idle");
  window.FitnessRpgNavigation.setPage("home");
};

window.FitnessRpgNavigation.goTraining = function goTraining() {
  if (!window.FitnessRpgState.hasProfile()) {
    window.FitnessRpgNavigation.openHeroSetup();
    return;
  }

  window.FitnessRpgState.setPose("idle");
  window.FitnessRpgNavigation.setPage("training");
};

window.FitnessRpgNavigation.openHeroSetup = function openHeroSetup() {
  window.FitnessRpgNavigation.setPage("hero-setup");
};

window.FitnessRpgNavigation.openPrograms = function openPrograms(programId = null) {
  window.FitnessRpgNavigation.setPage("programs");

  window.setTimeout(() => {
    if (programId) {
      window.FitnessRpgPrograms?.openProgramDetail?.(programId);
    } else {
      window.FitnessRpgPrograms?.openProgramList?.();
    }
  }, 0);
};

window.FitnessRpgNavigation.openExercises = function openExercises() {
  window.FitnessRpgNavigation.setPage("exercises");
  window.FitnessRpgExercises.currentCategoryId = null;

  window.setTimeout(() => {
    window.FitnessRpgExercises?.renderCategories?.();
  }, 0);
};

window.FitnessRpgNavigation.openMusic = function openMusic() {
  window.FitnessRpgNavigation.setPage("music");
};

window.FitnessRpgNavigation.openBadges = function openBadges() {
  window.FitnessRpgNavigation.setPage("badges");
};

window.FitnessRpgNavigation.openFamiliars = function openFamiliars() {
  window.FitnessRpgNavigation.setPage("familiars");
};

window.FitnessRpgNavigation.openJournal = function openJournal() {
  window.FitnessRpgNavigation.setPage("journal");
};

window.FitnessRpgNavigation.openWeight = function openWeight() {
  window.FitnessRpgNavigation.setPage("weight");
};

window.FitnessRpgNavigation.openGoal = function openGoal() {
  window.FitnessRpgNavigation.setPage("goal");
};

window.FitnessRpgNavigation.openPlanning = function openPlanning() {
  window.FitnessRpgNavigation.setPage("planning");
};

window.FitnessRpgNavigation.openProgression = function openProgression() {
  window.FitnessRpgNavigation.setPage("progression");
};

window.FitnessRpgNavigation.openCoach = function openCoach() {
  const coachId = window.FitnessRpgState.getCoachId?.() || "korvan";

  window.FitnessRpgState.selectedCoachId = coachId;
  window.FitnessRpgState.setPose?.("explain");

  window.FitnessRpgNavigation.setPage("hero-setup");
};
// ============================================================
// Quête du jour → programme recommandé
// ============================================================

window.FitnessRpgNavigation.openRecommendedProgram = function openRecommendedProgram() {
  if (window.FitnessRpgPrograms?.openTodayProgram) {
    window.FitnessRpgPrograms.openTodayProgram();
    return;
  }

  window.FitnessRpgNavigation.openPrograms("eveil-heros");
};

// ============================================================
// Création / modification du héros
// ============================================================

window.FitnessRpgNavigation.readHeroForm = function readHeroForm() {
  const name = window.FitnessRpgNavigation.getInputValue("#heroNameInput") || "Héros";
  const ageRaw = window.FitnessRpgNavigation.getInputValue("#heroAgeInput");
  const age = ageRaw ? Number(ageRaw) : null;
  const gender = window.FitnessRpgNavigation.getCheckedValue("heroGender", "homme");
  const coachId = window.FitnessRpgNavigation.getCheckedValue(
    "coachChoice",
    window.FitnessRpgState.selectedCoachId || "korvan"
  );

  return {
    name,
    age: Number.isFinite(age) && age > 0 ? age : null,
    gender,
    coachId
  };
};

window.FitnessRpgNavigation.saveHeroFromForm = function saveHeroFromForm() {
  const data = window.FitnessRpgNavigation.readHeroForm();

  if (window.FitnessRpgState.hasProfile()) {
    window.FitnessRpgState.updateProfile(data);

    window.FitnessRpgState.addJournalEntry({
      type: "profile",
      title: "Profil mis à jour",
      text: `Profil mis à jour pour ${data.name}.`,
      xp: 0
    });
  } else {
    window.FitnessRpgState.createProfile(data);
  }

  window.FitnessRpgState.setPose("welcome");
  window.FitnessRpgNavigation.setPage("training");
};

window.FitnessRpgNavigation.startNewHero = function startNewHero() {
  const hasProfile = window.FitnessRpgState.hasProfile();

  if (hasProfile) {
    const ok = window.confirm("Créer un nouveau héros ? L’ancien profil sera supprimé de cet appareil.");

    if (!ok) return;

    window.FitnessRpgState.clearProfile();
  }

  const nameInput = document.querySelector("#heroNameInput");
  const ageInput = document.querySelector("#heroAgeInput");
  const maleInput = document.querySelector('input[name="heroGender"][value="homme"]');

  if (nameInput) nameInput.value = "";
  if (ageInput) ageInput.value = "";
  if (maleInput) maleInput.checked = true;

  window.FitnessRpgState.selectedCoachId = "korvan";
  window.FitnessRpgState.setPose("idle");
  window.FitnessRpgNavigation.setPage("hero-setup");
};

window.FitnessRpgNavigation.cancelHeroSetup = function cancelHeroSetup() {
  if (window.FitnessRpgState.hasProfile()) {
    window.FitnessRpgNavigation.goHome();
  } else {
    window.FitnessRpgNavigation.setPage("hero-setup");
  }
};

// ============================================================
// Coach
// ============================================================

window.FitnessRpgNavigation.selectCoachCard = function selectCoachCard(card) {
  if (!card) return;

  const coachId = card.dataset.coachId;
  if (!coachId) return;

  window.FitnessRpgState.selectedCoachId = coachId;

  const input = card.querySelector('input[name="coachChoice"]');
  if (input) input.checked = true;

  document.querySelectorAll(".coach-choice-card").forEach((item) => {
    item.classList.toggle("active", item.dataset.coachId === coachId);
  });
};

window.FitnessRpgNavigation.newCoachMessage = function newCoachMessage() {
  const profile = window.FitnessRpgState.getProfile?.();
  if (!profile) return;

  const coachId = window.FitnessRpgState.getCoachId();
  const message = window.FitnessRpgData.getCoachMessage(coachId, "start");

  window.FitnessRpgState.setPose("motivate");

  const messageNode = document.querySelector("#coachMessage");
  if (messageNode) messageNode.textContent = message;

  window.FitnessRpgRender.renderCoachPanel();
};

// ============================================================
// Journal
// ============================================================

window.FitnessRpgNavigation.clearJournal = function clearJournal() {
  const ok = window.confirm("Vider le journal du héros ?");

  if (!ok) return;

  window.FitnessRpgState.clearJournal();
  window.FitnessRpgRender.renderJournal();
};

// ============================================================
// Poids
// ============================================================

window.FitnessRpgNavigation.saveWeight = function saveWeight() {
  const input = document.querySelector("#weightInput");
  if (!input) return;

  const value = Number(input.value);

  if (!Number.isFinite(value) || value <= 0) {
    window.FitnessRpgNavigation.showMessage({
      icon: "⚖️",
      title: "Poids invalide",
      message: "Entre un poids valide en kg.",
      okText: "Compris"
    });
    return;
  }

  const entry = window.FitnessRpgState.addWeight(value);

  if (!entry) {
    window.FitnessRpgNavigation.showMessage({
      icon: "⚠️",
      title: "Enregistrement impossible",
      message: "Impossible d’enregistrer ce poids.",
      okText: "Compris"
    });
    return;
  }

  input.value = "";

  if (window.FitnessRpgState.hasProfile()) {
    window.FitnessRpgState.addJournalEntry({
      type: "weight",
      title: "Poids enregistré",
      text: `Poids du jour : ${value} kg.`,
      xp: 0
    });
  }

  window.FitnessRpgRender.renderWeight();
};

// ============================================================
// Clics : overlays et modales
// ============================================================

window.FitnessRpgNavigation.handleOverlayClick = function handleOverlayClick(event, target) {
  if (target.closest("#rpgModalOkButton")) {
    window.FitnessRpgRender?.closeModal?.();
    return true;
  }

  if (target.id === "rpgModalOverlay") {
    window.FitnessRpgRender?.closeModal?.();
    return true;
  }

  if (target.closest("#closeLevelUpButton")) {
    window.FitnessRpgRender?.closeLevelUpOverlay?.();
    return true;
  }

  if (target.id === "levelUpOverlay") {
    window.FitnessRpgRender?.closeLevelUpOverlay?.();
    return true;
  }

  return false;
};

// ============================================================
// Clics : programmes, séances, boss
// ============================================================

window.FitnessRpgNavigation.handleProgramClick = function handleProgramClick(event, target) {
  const backToProgramListButton = target.closest("#backToProgramListBtn");

  if (backToProgramListButton) {
    window.FitnessRpgNavigation.stopEvent(event);
    window.FitnessRpgPrograms?.openProgramList?.();
    return true;
  }

  const startProgramPlanningButton = target.closest("#startProgramPlanningButton");

  if (startProgramPlanningButton) {
    window.FitnessRpgNavigation.stopEvent(event);
    window.FitnessRpgNavigation.openPlanning();
    return true;
  }

  const openProgramDetailButton = target.closest(".open-program-detail-btn");

  if (openProgramDetailButton) {
    window.FitnessRpgNavigation.stopEvent(event);

    const programId = openProgramDetailButton.dataset.programId;

    if (programId) {
      window.FitnessRpgPrograms?.openProgramDetail?.(programId);
    }

    return true;
  }

  const chooseProgramButton = target.closest(".choose-program-btn");

  if (chooseProgramButton) {
    window.FitnessRpgNavigation.stopEvent(event);

    const programId = chooseProgramButton.dataset.programId;

    if (programId) {
      window.FitnessRpgPrograms?.chooseProgram?.(programId);
    }

    return true;
  }

  

  const weekCarouselButton = target.closest(".program-week-carousel-btn");

  if (weekCarouselButton) {
    window.FitnessRpgNavigation.stopEvent(event);

    const delta = Number(weekCarouselButton.dataset.delta || 0);
    window.FitnessRpgPrograms?.changeProgramWeek?.(delta);

    return true;
  }

  const dayCarouselButton = target.closest(".program-day-carousel-btn");

  if (dayCarouselButton) {
    window.FitnessRpgNavigation.stopEvent(event);

    const delta = Number(dayCarouselButton.dataset.delta || 0);
    window.FitnessRpgPrograms?.changeProgramDay?.(delta);

    return true;
  }

  const resetProgramButton = target.closest(".reset-program-progress-btn");

if (resetProgramButton) {
  window.FitnessRpgNavigation.stopEvent(event);

  const programId = resetProgramButton.dataset.programId;

  if (programId) {
    window.FitnessRpgPrograms?.resetProgramProgress?.(programId);
  }

  return true;
}

  const startProgramDayButton = target.closest(".start-program-day-btn");

  if (startProgramDayButton) {
    window.FitnessRpgNavigation.stopEvent(event);

    const programId = startProgramDayButton.dataset.programId;
    const weekNumber = Number(
      startProgramDayButton.dataset.week
      || startProgramDayButton.dataset.weekNumber
      || 1
    );
    const dayNumber = Number(
      startProgramDayButton.dataset.day
      || startProgramDayButton.dataset.dayNumber
      || 1
    );

    window.FitnessRpgPrograms?.validateProgramDay?.(
      programId,
      dayNumber,
      weekNumber
    );

    return true;
  }

  const startBossButton = target.closest(".start-program-boss-btn");

  if (startBossButton) {
    window.FitnessRpgNavigation.stopEvent(event);

    const programId = startBossButton.dataset.programId;
    const weekNumber = Number(startBossButton.dataset.weekNumber || 1);
    const variantId = startBossButton.dataset.variantId || "indoor";

    window.FitnessRpgPrograms?.startProgramBossSession?.(
      programId,
      weekNumber,
      variantId
    );

    return true;
  }

  const programTimerButton = target.closest(".start-program-exercise-timer-btn");

  if (programTimerButton) {
    window.FitnessRpgNavigation.stopEvent(event);

    const exerciseId = programTimerButton.dataset.exerciseId;
    const exerciseKey = programTimerButton.dataset.exerciseKey;

    window.FitnessRpgPrograms?.openProgramExerciseTimer?.(
      exerciseId,
      exerciseKey
    );

    return true;
  }

  const validateProgramExerciseButton = target.closest(".validate-program-exercise-btn");

  if (validateProgramExerciseButton) {
    window.FitnessRpgNavigation.stopEvent(event);

    const exerciseId = validateProgramExerciseButton.dataset.exerciseId;
    const exerciseKey = validateProgramExerciseButton.dataset.exerciseKey;

    window.FitnessRpgPrograms?.validateProgramExercise?.(
      exerciseId,
      exerciseKey
    );

    return true;
  }

  const finishProgramSessionButton = target.closest("#finishProgramSessionButton");

  if (finishProgramSessionButton) {
    window.FitnessRpgNavigation.stopEvent(event);
    window.FitnessRpgPrograms?.finishProgramSession?.();
    return true;
  }

  const programCard = target.closest(".program-card");

  if (
    programCard
    && !target.closest("button")
    && !target.closest("a")
    && !target.closest("input")
    && !target.closest("select")
    && !target.closest("textarea")
  ) {
    window.FitnessRpgNavigation.stopEvent(event);

    const programId = programCard.dataset.programId;

    if (programId) {
      window.FitnessRpgPrograms?.openProgramDetail?.(programId);
    }

    return true;
  }

  return false;
};

// ============================================================
// Clics : planning
// ============================================================

window.FitnessRpgNavigation.handlePlanningClick = function handlePlanningClick(event, target) {
  const startTodayPlanningButton = target.closest("#startTodayPlanningButton");

  if (startTodayPlanningButton) {
    window.FitnessRpgNavigation.stopEvent(event);
    window.FitnessRpgPrograms?.startTodayPlanningSession?.();
    return true;
  }

  const startWeeklyCatchupButton = target.closest("#startWeeklyCatchupButton");

  if (startWeeklyCatchupButton) {
    window.FitnessRpgNavigation.stopEvent(event);
    window.FitnessRpgPrograms?.startWeeklyCatchupSession?.();
    return true;
  }

const planningButton = target.closest(".planning-program-btn");

if (planningButton) {
  window.FitnessRpgNavigation.stopEvent(event);

  const programId = planningButton.dataset.programId;
  const source = planningButton.dataset.source || "planning";
  const weekNumber = Number(planningButton.dataset.weekNumber || 1);

  if (!programId) return true;

  if (source === "program-boss") {
    window.FitnessRpgPrograms?.openProgramDetail?.(programId, {
      weekNumber,
      dayNumber: 1
    });

    window.setTimeout(() => {
      document.querySelector(".program-boss-choice")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 120);

    return true;
  }

  window.FitnessRpgPrograms?.openPlanningProgram?.({
    programId,
    planningDateKey: planningButton.dataset.dateKey || "",
    planningSource: source
  });

  return true;
}

  return false;
};

// ============================================================
// Délégation de clics principale
// ============================================================

window.FitnessRpgNavigation.handleDocumentClick = function handleDocumentClick(event) {
  const target = event.target instanceof Element
    ? event.target
    : event.target?.parentElement;

  if (!target) return;

  // ============================================================
  // COFFRE RECOMPENSE FERMETURE
  // ============================================================
  const closeChestRewardButton = target.closest(".close-chest-reward-modal-btn");

  if (closeChestRewardButton || target.id === "chestRewardOverlay") {
    window.FitnessRpgNavigation.stopEvent(event);
    window.FitnessRpgRender?.closeChestRewardModal?.();
    return;
  }

  const heroLevelCarouselButton = target.closest(".hero-level-carousel-btn");

  if (heroLevelCarouselButton) {
    window.FitnessRpgNavigation.stopEvent(event);
  
    const delta = Number(heroLevelCarouselButton.dataset.delta || 0);
    window.FitnessRpgRender?.changeHeroEvolutionLevel?.(delta);
  
    return;
  }

  // ============================================================
  // Modales / overlays
  // ============================================================
  if (window.FitnessRpgNavigation.handleOverlayClick(event, target)) return;
  if (window.FitnessRpgNavigation.handleProgramClick(event, target)) return;
  if (window.FitnessRpgNavigation.handlePlanningClick(event, target)) return;

  // Header
  if (target.closest("#headerProgramsButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openPrograms();
    return;
  }

  if (target.closest("#headerGoalButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openGoal();
    return;
  }

  if (target.closest("#headerPlanningButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openPlanning();
    return;
  }

  if (target.closest("#backButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.goBack();
    return;
  }

  if (target.closest("#homeButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.goHome();
    return;
  }

  // Accueil
  if (target.closest("#startTrainingButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.goTraining();
    return;
  }

  if (target.closest("#chooseCoachButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openHeroSetup();
    return;
  }

  if (target.closest("#newHeroButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.startNewHero();
    return;
  }

  // Création héros
  if (target.closest("#saveHeroButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.saveHeroFromForm();
    return;
  }

  if (target.closest("#cancelHeroSetupButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.cancelHeroSetup();
    return;
  }

  const coachCard = target.closest(".coach-choice-card");

  if (coachCard) {
    window.FitnessRpgNavigation.selectCoachCard(coachCard);
    return;
  }

  // Entraînement
  if (target.closest("#newCoachMessageButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.newCoachMessage();
    return;
  }

  if (target.closest("#todayCard") || target.closest("#openTodayProgramButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openRecommendedProgram();
    return;
  }

  // Barre outils entraînement
  if (target.closest("#openExercisesButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openExercises();
    return;
  }

  if (target.closest("#openFamiliarsButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openFamiliars();
    return;
  }
  if (target.closest(".open-progression-from-levelup-btn")) {
    window.FitnessRpgNavigation.stopEvent(event);
    window.FitnessRpgRender?.closeLevelUpOverlay?.();
    window.FitnessRpgNavigation.openProgression();
    return;
  }

  if (target.closest("#openProgramsButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openPrograms();
    return;
  }

  if (target.closest("#openGoalButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openGoal();
    return;
  }

  if (target.closest("#openPlanningButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openPlanning();
    return;
  }

  if (target.closest("#openMusicButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openMusic();
    return;
  }

  if (target.closest("#openBadgesButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openBadges();
    return;
  }

  if (target.closest("#openJournalButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openJournal();
    return;
  }

  if (target.closest("#openWeightButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openWeight();
    return;
  }

  if (target.closest("#openProgressionButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openProgression();
    return;
  }

  // Objectifs
  const goalButton = target.closest(".choose-goal-btn, .goal-choice-card");

  if (goalButton) {
    event.preventDefault();

    const goalId = goalButton.dataset.goalId
      || goalButton.closest(".goal-choice-card")?.dataset.goalId;

    if (goalId) {
      window.FitnessRpgState.setGoal(goalId);

      const goal = window.FitnessRpgConfig.getGoalById(goalId);
      const program = window.FitnessRpgState.getRecommendedProgram();

      if (window.FitnessRpgState.hasProfile()) {
        window.FitnessRpgState.addJournalEntry({
          type: "goal",
          title: "Objectif mis à jour",
          text: `Objectif choisi : ${goal?.title || goalId}. Programme recommandé : ${program?.title || "Éveil du héros"}.`,
          xp: 0
        });
      }

      window.FitnessRpgRender.renderGoalPage();
      window.FitnessRpgRender.renderTodayCard();
    }

    return;
  }

  // Journal
  if (target.closest("#clearJournalButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.clearJournal();
    return;
  }

  // Poids
  if (target.closest("#saveWeightButton")) {
    event.preventDefault();
    window.FitnessRpgNavigation.saveWeight();
    return;
  }
};

// ============================================================
// Clavier
// ============================================================

window.FitnessRpgNavigation.handleDocumentKeydown = function handleDocumentKeydown(event) {
  const target = event.target instanceof Element
    ? event.target
    : event.target?.parentElement;

  if (event.key === "Escape") {
    window.FitnessRpgRender?.closeModal?.();
    return;
  }

  if (!target) return;

  if (target.closest("#todayCard") && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openRecommendedProgram();
  }
};

// ============================================================
// Initialisation navigation
// ============================================================

window.FitnessRpgNavigation.init = function initNavigation() {
  if (window.FitnessRpgNavigation.isInitialized) return;

  document.addEventListener("click", window.FitnessRpgNavigation.handleDocumentClick);
  document.addEventListener("keydown", window.FitnessRpgNavigation.handleDocumentKeydown);

  window.FitnessRpgNavigation.isInitialized = true;
};
