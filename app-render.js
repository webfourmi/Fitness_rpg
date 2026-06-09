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

// ============================================================
// Création / modification du héros
// ============================================================

window.FitnessRpgRender.renderHeroSetup = function renderHeroSetup() {
  const profile = window.FitnessRpgState.getProfile?.();

  const title = document.querySelector("#heroSetupTitle");
  const help = document.querySelector("#heroSetupHelp");
  const saveButton = document.querySelector("#saveHeroButton");

  if (profile) {
    window.FitnessRpgRender.setText(title, "Modifier ton héros");
    window.FitnessRpgRender.setText(help, "Tu peux ajuster le nom, l’âge, le genre ou le coach.");
    window.FitnessRpgRender.setText(saveButton, "Enregistrer");

    const nameInput = document.querySelector("#heroNameInput");
    const ageInput = document.querySelector("#heroAgeInput");

    if (nameInput && !nameInput.value) nameInput.value = profile.name || "";
    if (ageInput && !ageInput.value && profile.age) ageInput.value = profile.age;

    const genderInput = document.querySelector(`input[name="heroGender"][value="${profile.gender || "homme"}"]`);
    if (genderInput) genderInput.checked = true;

    window.FitnessRpgState.selectedCoachId = profile.coachId || "korvan";
  } else {
    window.FitnessRpgRender.setText(title, "Créer ton héros");
    window.FitnessRpgRender.setText(help, "Choisis ton profil et ton coach pour commencer.");
    window.FitnessRpgRender.setText(saveButton, "Commencer l’aventure");
  }

  window.FitnessRpgRender.renderCoachChoices();
};

window.FitnessRpgRender.renderCoachChoices = function renderCoachChoices() {
  const grid = document.querySelector("#coachChoiceGrid");
  if (!grid) return;

  const coaches = window.FitnessRpgData.coaches || {};
  const selectedCoachId = window.FitnessRpgState.getCoachId?.() || window.FitnessRpgState.selectedCoachId || "korvan";

  grid.innerHTML = "";

  Object.values(coaches).forEach((coach) => {
    const label = document.createElement("label");
    label.className = `coach-choice-card${coach.id === selectedCoachId ? " active" : ""}`;
    label.dataset.coachId = coach.id;

    label.innerHTML = `
      <input type="radio" name="coachChoice" value="${coach.id}" ${coach.id === selectedCoachId ? "checked" : ""} />
      <img src="${coach.image}" alt="${coach.fullName}" />
      <div>
        <strong>${coach.name}</strong>
        <span>${coach.fullName}</span>
      </div>
    `;

    const img = label.querySelector("img");
    window.FitnessRpgRender.setSafeImage(img, coach.image, coach.fallbackImage);

    grid.appendChild(label);
  });
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

  if (heroFrame) {
    heroFrame.innerHTML = `
      <img
        id="heroImage"
        class="hero-image${levelUpClass}"
        src="${heroPath}"
        alt="${profile.name}"
      />
      <span class="hero-level-badge">Niv. ${info.level}</span>
    `;
  }

  window.FitnessRpgRender.setText(
    "#heroIdentityLine",
    window.FitnessRpgProgress.getIdentityLine()
  );

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
  const program = window.FitnessRpgState.getRecommendedProgram?.()
    || window.FitnessRpgConfig.getProgramById("eveil-heros");

  if (!program) return;

  window.FitnessRpgRender.setText("#todayProgramTitle", program.title);

  window.FitnessRpgRender.setText(
    "#todayProgramDescription",
    `${program.objective} · ${program.duration} · ${program.frequency || "séance conseillée"}`
  );

  const todayCard = document.querySelector("#todayCard");
  if (todayCard) todayCard.dataset.programId = program.id;

  const openButton = document.querySelector("#openTodayProgramButton");
  if (openButton) openButton.dataset.programId = program.id;
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
  const day = window.FitnessRpgPrograms.getProgramDay(session.programId, session.dayNumber);

  if (!program || !day) return;

  const difficulty = window.FitnessRpgProgress.getProgramDayDifficulty(day);
  const xp = window.FitnessRpgProgress.calculateProgramSessionXp(session.programId, session.dayNumber);
  const complete = window.FitnessRpgState.isProgramSessionComplete();

  const exercisesHtml = day.exercises.map((item, index) => {
    const exercise = window.FitnessRpgData.getExerciseById(item.exerciseId);
    const done = window.FitnessRpgState.isProgramSessionExerciseDone(item.exerciseId);

    return `
      <article class="program-session-exercise${done ? " done" : ""}">
        <div class="program-session-index">${index + 1}</div>

        <div>
          <strong>${item.phase}</strong>
          <h3>${exercise?.title || item.exerciseId}</h3>
          <p>${item.amount} ${item.unit}</p>
        </div>

        <button
          class="${done ? "ghost-btn" : "secondary-btn"} validate-program-exercise-btn"
          type="button"
          data-exercise-id="${item.exerciseId}"
        >
          ${done ? "Validé" : "Valider"}
        </button>
      </article>
    `;
  }).join("");

  const doneCount = session.completedExerciseIds.length;
  const totalCount = day.exercises.length;

  const sessionHtml = `
    <section id="activeProgramSession" class="active-program-session card">
      <p class="eyebrow">${program.icon} Séance en cours</p>
      <h2>${program.title} · Jour ${day.day}</h2>
      <p>${day.title}</p>

      <div class="program-session-meta">
        <span>${day.difficultyLabel || difficulty.label}</span>
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
        ${complete ? `Terminer la séance · +${xp} XP` : "Valide tous les exercices pour terminer"}
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

  window.FitnessRpgRender.getWeeklyPlan = function getWeeklyPlan(goalId) {
    const plans = {
      "perte-poids": [
        ["Lun", "Marche douce", "marche-aventurier"],
        ["Mar", "Éveil du héros", "eveil-heros"],
        ["Mer", "Marche active", "marche-aventurier"],
        ["Jeu", "Tour de mage", "tour-mage"],
        ["Ven", "Marche ou vélo léger", "marche-aventurier"],
        ["Sam", "Cœur de dragon", "coeur-dragon"],
        ["Dim", "Repos actif", "tour-mage"]
      ],
      "reprise-douce": [
        ["Lun", "Éveil du héros", "eveil-heros"],
        ["Mar", "Repos ou marche douce", "marche-aventurier"],
        ["Mer", "Éveil du héros", "eveil-heros"],
        ["Jeu", "Tour de mage", "tour-mage"],
        ["Ven", "Repos", null],
        ["Sam", "Éveil du héros", "eveil-heros"],
        ["Dim", "Marche tranquille", "marche-aventurier"]
      ],
      "cardio": [
        ["Lun", "Cœur de dragon", "coeur-dragon"],
        ["Mar", "Tour de mage", "tour-mage"],
        ["Mer", "Course ou vélo", "coeur-dragon"],
        ["Jeu", "Repos actif", "marche-aventurier"],
        ["Ven", "Cœur de dragon", "coeur-dragon"],
        ["Sam", "Marche longue", "marche-aventurier"],
        ["Dim", "Repos", null]
      ],
      "renforcement": [
        ["Lun", "Forge du guerrier", "forge-guerrier"],
        ["Mar", "Tour de mage", "tour-mage"],
        ["Mer", "Forge du guerrier", "forge-guerrier"],
        ["Jeu", "Marche douce", "marche-aventurier"],
        ["Ven", "Forge du guerrier", "forge-guerrier"],
        ["Sam", "Défi boss hebdo", "boss-hebdo"],
        ["Dim", "Repos", null]
      ],
      "regularite": [
        ["Lun", "Marche de l’aventurier", "marche-aventurier"],
        ["Mar", "Éveil du héros", "eveil-heros"],
        ["Mer", "Marche courte", "marche-aventurier"],
        ["Jeu", "Tour de mage", "tour-mage"],
        ["Ven", "Marche de l’aventurier", "marche-aventurier"],
        ["Sam", "Programme libre", "eveil-heros"],
        ["Dim", "Repos actif", "tour-mage"]
      ],
      "mobilite": [
        ["Lun", "Tour de mage", "tour-mage"],
        ["Mar", "Marche douce", "marche-aventurier"],
        ["Mer", "Tour de mage", "tour-mage"],
        ["Jeu", "Repos", null],
        ["Ven", "Tour de mage", "tour-mage"],
        ["Sam", "Éveil du héros", "eveil-heros"],
        ["Dim", "Respiration et étirements", "tour-mage"]
      ]
    };
  
    return plans[goalId] || plans["reprise-douce"];
  };
  
  window.FitnessRpgRender.renderPlanningPage = function renderPlanningPage() {
    const summary = document.querySelector("#planningSummary");
    const grid = document.querySelector("#planningWeekGrid");
    if (!summary || !grid) return;
  
    const goalId = window.FitnessRpgState.getGoalId?.() || "reprise-douce";
    const goal = window.FitnessRpgConfig.getGoalById(goalId);
    const recommended = window.FitnessRpgState.getRecommendedProgram?.();
    const plan = window.FitnessRpgRender.getWeeklyPlan(goalId);
  
    summary.innerHTML = `
      <p class="eyebrow">${goal?.icon || "🎯"} Objectif actuel</p>
      <h2>${goal?.title || "Reprise douce"}</h2>
      <p>${goal?.rhythm || "3 séances courtes par semaine"}</p>
      <p class="planning-recommendation">
        Programme recommandé : <strong>${recommended?.title || "Éveil du héros"}</strong>
      </p>
    `;
  
    grid.innerHTML = "";
  
    plan.forEach(([day, title, programId]) => {
      const program = programId ? window.FitnessRpgConfig.getProgramById(programId) : null;
  
      const card = document.createElement("article");
      card.className = `planning-day-card card${programId ? "" : " rest-day"}`;
      card.dataset.programId = programId || "";
  
      card.innerHTML = `
        <strong>${day}</strong>
        <h2>${title}</h2>
        <p>${program ? `${program.objective} · ${program.duration}` : "Repos ou récupération douce."}</p>
        ${
          program
            ? `<button class="secondary-btn planning-program-btn" type="button" data-program-id="${program.id}">
                Ouvrir ${program.title}
              </button>`
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
  if (!list) return;

  list.innerHTML = "";

  const programs = window.FitnessRpgConfig.programs || [];

  programs.forEach((program) => {
    const card = document.createElement("article");
    card.className = "program-card card";
    card.dataset.programId = program.id;

    card.innerHTML = `
      <div class="program-icon">${program.icon}</div>
      <div>
        <h2>${program.title}</h2>
        <p>${program.objective}</p>
        <ul>
          <li><strong>Niveau :</strong> ${program.level}</li>
          <li><strong>Durée :</strong> ${program.duration}</li>
          <li><strong>Coach conseillé :</strong> ${program.coachAdvice || "Libre"}</li>
        </ul>
      </div>
    `;

    list.appendChild(card);
  });
};

window.FitnessRpgRender.renderProgramDetail = function renderProgramDetail(programId) {
  const detail = document.querySelector("#programDetail");
  if (!detail) return;

  const program = window.FitnessRpgConfig.getProgramById(programId);
  const programDetail = window.FitnessRpgData.getProgramDetail(programId);

  if (!program || !programDetail) {
    detail.classList.add("hidden");
    detail.innerHTML = "";
    return;
  }

  detail.classList.remove("hidden");
  detail.dataset.programId = programId;

  const daysHtml = programDetail.days.map((day) => {
    const exercisesHtml = day.exercises.map((item) => {
      const exercise = window.FitnessRpgData.getExerciseById(item.exerciseId);

      return `
        <li>
          <strong>${item.phase}</strong>
          <span>${exercise?.title || item.exerciseId}</span>
          <em>${item.amount} ${item.unit}</em>
        </li>
      `;
    }).join("");

    return `
      <article class="program-day-card">
        <h3>Jour ${day.day} · ${day.title}</h3>
        <ul>${exercisesHtml}</ul>
        <button class="primary-btn start-program-day-btn" type="button" data-program-id="${programId}" data-day="${day.day}">
          Valider cette séance
        </button>
      </article>
    `;
  }).join("");

  const progressionHtml = (programDetail.progression || [])
    .map((line) => `<li>${line}</li>`)
    .join("");

  detail.innerHTML = `
    <header class="program-detail-header">
      <p class="eyebrow">${program.icon} ${program.objective}</p>
      <h2>${program.title}</h2>
      <p>${program.duration} · ${program.frequency}</p>
    </header>

    <section class="program-days">
      ${daysHtml}
    </section>

    <section class="program-progression">
      <h3>Progression</h3>
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

  list.innerHTML = "";

  const sports = window.FitnessRpgData.sports || [];

  sports.forEach((sport) => {
    const section = document.createElement("section");
    section.className = "exercise-sport-card card";
    section.dataset.sportId = sport.id;

    const exercisesHtml = sport.exercises.map((exercise) => {
      const distanceField = exercise.hasDistance
        ? `
          <label>
            Distance km
            <input class="exercise-distance-input" type="number" min="0" step="0.1" value="0" data-exercise-id="${exercise.id}" />
          </label>
        `
        : "";

      const timerButton = exercise.hasTimer
        ? `<button class="ghost-btn start-timer-btn" type="button" data-exercise-id="${exercise.id}">Timer</button>`
        : "";

      return `
        <article class="exercise-card">
          <h3>${exercise.title}</h3>
          <p>${exercise.stat}</p>

          <label>
            ${exercise.unit}
            <input class="exercise-amount-input" type="number" min="${exercise.min}" step="${exercise.step}" value="${exercise.defaultValue}" data-exercise-id="${exercise.id}" />
          </label>

          ${distanceField}

          <div class="exercise-actions">
            ${timerButton}
            <button class="primary-btn validate-exercise-btn" type="button" data-exercise-id="${exercise.id}">
              Valider
            </button>
          </div>
        </article>
      `;
    }).join("");

    section.innerHTML = `
      <header>
        <p class="eyebrow">${sport.icon} ${sport.title}</p>
        <p>${sport.description}</p>
      </header>

      <div class="exercise-card-grid">
        ${exercisesHtml}
      </div>
    `;

    list.appendChild(section);
  });
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

window.FitnessRpgRender.renderLevelUpOverlay = function renderLevelUpOverlay() {
  const pending = window.FitnessRpgProgress.peekLevelUpModal?.();
  const overlay = document.querySelector("#levelUpOverlay");

  if (!overlay || !pending) return;

  const newLevel = Number(pending.newLevel || 1);
  const rank = window.FitnessRpgConfig.getRankTitle(newLevel);
  const hasChest = window.FitnessRpgProgress.hasChestReward(newLevel);

  const icon = document.querySelector("#levelUpIcon");
  const title = document.querySelector("#levelUpTitle");
  const text = document.querySelector("#levelUpText");
  const reward = document.querySelector("#levelUpReward");

  if (icon) icon.textContent = hasChest ? "🎁" : "✨";
  if (title) title.textContent = `Niveau ${newLevel} atteint !`;
  if (text) text.textContent = `Ton héros devient ${rank}.`;
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

    case "journal":
      window.FitnessRpgRender.renderJournal();
      break;

    case "weight":
      window.FitnessRpgRender.renderWeight();
      break;

    case "music":
      window.FitnessRpgRender.setText("#musicStatus", window.FitnessRpgState.musicStatus);
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
