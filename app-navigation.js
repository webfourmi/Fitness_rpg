// ============================================================
// Fitness RPG - app-navigation.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - gérer la navigation entre les pages ;
// - brancher les boutons principaux ;
// - gérer création / modification du héros ;
// - ouvrir le programme recommandé depuis la quête du jour ;
// - gérer les boutons simples : journal, poids, coach, accueil.
//
// Règle importante :
// ce fichier ne contient aucune version.
// Il ne modifie jamais document.title.
// ============================================================

window.FitnessRpgNavigation = {};

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


//bouton retour
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

// ============================================================
// Navigation principale
// ============================================================

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
    alert("Entre un poids valide en kg.");
    return;
  }

  const entry = window.FitnessRpgState.addWeight(value);

  if (!entry) {
    alert("Impossible d’enregistrer ce poids.");
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
// Délégation de clics
// ============================================================

window.FitnessRpgNavigation.handleDocumentClick = function handleDocumentClick(event) {
   const target = event.target;

    if (target.closest("#rpgModalOkButton")) {
    window.FitnessRpgRender?.closeModal?.();
    return;
  }

  if (target.id === "rpgModalOverlay") {
    window.FitnessRpgRender?.closeModal?.();
    return;
  }

    // Programmes : retour à la liste
  if (target.closest("#backToProgramListBtn")) {
    event.preventDefault();
    window.FitnessRpgPrograms?.openProgramList?.();
    return;
  }
  
  const startBossButton = target.closest(".start-program-boss-btn");

  if (startBossButton) {
    event.preventDefault();
    event.stopPropagation();
  
    const programId = startBossButton.dataset.programId;
    const weekNumber = Number(startBossButton.dataset.weekNumber || 1);
    const variantId = startBossButton.dataset.variantId || "indoor";
  
    window.FitnessRpgPrograms?.startProgramBossSession?.(
      programId,
      weekNumber,
      variantId
    );
  
    return;
  }

  // Programmes : ouvrir le détail d’un programme
  const openProgramDetailButton = target.closest(".open-program-detail-btn");

  if (openProgramDetailButton) {
    event.preventDefault();

    const programId = openProgramDetailButton.dataset.programId;

    if (programId) {
      window.FitnessRpgPrograms?.openProgramDetail?.(programId);
    }

    return;
  }

  // Programmes : carrousel des semaines
  const weekCarouselButton = target.closest(".program-week-carousel-btn");

  if (weekCarouselButton) {
    event.preventDefault();

    const delta = Number(weekCarouselButton.dataset.delta || 0);
    window.FitnessRpgPrograms?.changeProgramWeek?.(delta);

    return;
  }

  // Programmes : carrousel des jours
  const dayCarouselButton = target.closest(".program-day-carousel-btn");

  if (dayCarouselButton) {
    event.preventDefault();

    const delta = Number(dayCarouselButton.dataset.delta || 0);
    window.FitnessRpgPrograms?.changeProgramDay?.(delta);

    return;
  }

    // Programmes : timer d’un exercice dans une séance active
  const programTimerButton = target.closest(".start-program-exercise-timer-btn");

  if (programTimerButton) {
    event.preventDefault();

    const exerciseId = programTimerButton.dataset.exerciseId;
    const exerciseKey = programTimerButton.dataset.exerciseKey;

    window.FitnessRpgPrograms?.openProgramExerciseTimer?.(exerciseId, exerciseKey);
    return;
  }

  // Programmes : valider un exercice dans une séance active
  const validateProgramExerciseButton = target.closest(".validate-program-exercise-btn");

  if (validateProgramExerciseButton) {
    event.preventDefault();

    const exerciseId = validateProgramExerciseButton.dataset.exerciseId;
    const exerciseKey = validateProgramExerciseButton.dataset.exerciseKey;

    window.FitnessRpgPrograms?.validateProgramExercise?.(exerciseId, exerciseKey);
    return;
  }
  const finishProgramSessionButton = target.closest("#finishProgramSessionButton");
  
  if (finishProgramSessionButton) {
    event.preventDefault();
  
    window.FitnessRpgPrograms?.finishProgramSession?.();
    return;
  }
  
   //levelup
  if (target.closest("#closeLevelUpButton")) {
    window.FitnessRpgRender.closeLevelUpOverlay();
    return;
  }
 
  if (target.id === "levelUpOverlay") {
    window.FitnessRpgRender.closeLevelUpOverlay();
    return;
  }
  
  
  // Header
  const headerProgramsButton = event.target.closest("#headerProgramsButton");

  if (headerProgramsButton) {
    event.preventDefault();
    window.FitnessRpgNavigation.openPrograms?.();
    return;
  }
  
  const headerGoalButton = event.target.closest("#headerGoalButton");
  
 if (headerGoalButton) {
  event.preventDefault();
  window.FitnessRpgNavigation.openGoal();
  return;
}
  if (target.closest("#backButton")) {
    window.FitnessRpgNavigation.goBack();
    return;
  }
  if (target.closest("#homeButton")) {
    window.FitnessRpgNavigation.goHome();
    return;
  }

  // Accueil
  if (target.closest("#startTrainingButton")) {
    window.FitnessRpgNavigation.goTraining();
    return;
  }

  if (target.closest("#chooseCoachButton")) {
    window.FitnessRpgNavigation.openHeroSetup();
    return;
  }

  if (target.closest("#newHeroButton")) {
    window.FitnessRpgNavigation.startNewHero();
    return;
  }

  // Création héros
  if (target.closest("#saveHeroButton")) {
    window.FitnessRpgNavigation.saveHeroFromForm();
    return;
  }

  if (target.closest("#cancelHeroSetupButton")) {
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
    window.FitnessRpgNavigation.openExercises();
    return;
  }

  if (target.closest("#openProgramsButton")) {
    window.FitnessRpgNavigation.openPrograms();
    return;
  }

  if (target.closest("#openGoalButton")) {
    window.FitnessRpgNavigation.openGoal();
    return;
  }
  
  if (target.closest("#openPlanningButton")) {
    window.FitnessRpgNavigation.openPlanning();
    return;
  }

  if (target.closest("#openMusicButton")) {
    window.FitnessRpgNavigation.openMusic();
    return;
  }

  if (target.closest("#openBadgesButton")) {
    window.FitnessRpgNavigation.openBadges();
    return;
  }

  if (target.closest("#openJournalButton")) {
    window.FitnessRpgNavigation.openJournal();
    return;
  }

  if (target.closest("#openWeightButton")) {
    window.FitnessRpgNavigation.openWeight();
    return;
  }
  if (target.closest("#openProgressionButton")) {
    window.FitnessRpgNavigation.openProgression();
    return;
  }

  const headerPlanningButton = event.target.closest("#headerPlanningButton");

  if (headerPlanningButton) {
    event.preventDefault();
    window.FitnessRpgNavigation.openPlanning();
    return;
  }

  // Programmes
  const chooseProgramButton = target.closest(".choose-program-btn");

  if (chooseProgramButton) {
    event.preventDefault();
    event.stopPropagation();
  
    const programId = chooseProgramButton.dataset.programId;
  
    if (programId && window.FitnessRpgPrograms?.chooseProgram) {
      window.FitnessRpgPrograms.chooseProgram(programId);
    }
  
    return;
  }
  const programCard = target.closest(".program-card");
  if (programCard) {
    const programId = programCard.dataset.programId;
    window.FitnessRpgState.selectedProgramId = programId;
    window.FitnessRpgRender.renderProgramDetail(programId);

    window.setTimeout(() => {
      document.querySelector("#programDetail")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 80);

    return;
  }

  //Objectifs
  const goalButton = target.closest(".choose-goal-btn, .goal-choice-card");
  if (goalButton) {
    const goalId = goalButton.dataset.goalId || goalButton.closest(".goal-choice-card")?.dataset.goalId;
  
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

  //planning
  const planningButton = target.closest(".planning-program-btn");
  if (planningButton) {
    const programId = planningButton.dataset.programId;
  
    if (programId) {
      window.FitnessRpgNavigation.openPrograms(programId);
    }
  
    return;
  }
  
  // Journal
  if (target.closest("#clearJournalButton")) {
    window.FitnessRpgNavigation.clearJournal();
    return;
  }

  // Poids
  if (target.closest("#saveWeightButton")) {
    window.FitnessRpgNavigation.saveWeight();
  }
};
 
// ============================================================
// Clavier
// ============================================================

window.FitnessRpgNavigation.handleDocumentKeydown = function handleDocumentKeydown(event) {
  const target = event.target;
    if (event.key === "Escape") {
      window.FitnessRpgRender?.closeModal?.();
    }

  if (target.closest("#todayCard") && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    window.FitnessRpgNavigation.openRecommendedProgram();
  }
};

// ============================================================
// Initialisation navigation
// ============================================================

window.FitnessRpgNavigation.init = function initNavigation() {
  document.addEventListener("click", window.FitnessRpgNavigation.handleDocumentClick);
  document.addEventListener("keydown", window.FitnessRpgNavigation.handleDocumentKeydown);
};
