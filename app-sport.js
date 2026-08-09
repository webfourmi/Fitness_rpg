// ============================================================
// Fitness RPG - V6.2A - Profil sportif, RPE et performances
// ------------------------------------------------------------
// Module additionnel, volontairement séparé du moteur historique.
// - enrichit le profil existant sans nouvelle clé localStorage ;
// - demande un RPE simple après une séance de programme/boss ;
// - enregistre un historique de performances dans le profil ;
// - affiche le profil sportif dans le menu Héros ;
// - affiche les dernières performances dans Statistiques.
// ============================================================

(() => {
  "use strict";

  const State = window.FitnessRpgState;
  const Render = window.FitnessRpgRender;
  const Programs = window.FitnessRpgPrograms;

  if (!State || !Render || !Programs) {
    console.warn("Fitness RPG Sport V6.2A : dépendances indisponibles.");
    return;
  }

  const Sport = window.FitnessRpgSport = window.FitnessRpgSport || {};

  Sport.version = "6.2a";
  Sport.pendingPerformanceDraft = null;
  Sport.summaryObserver = null;

  Sport.levels = Object.freeze({
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé"
  });

  Sport.goals = Object.freeze({
    "general-fitness": "Forme générale",
    strength: "Renforcement",
    endurance: "Endurance",
    mobility: "Mobilité",
    "body-composition": "Composition corporelle",
    "return-to-activity": "Reprise d’activité"
  });

  Sport.equipmentOptions = Object.freeze([
    ["mat", "Tapis"],
    ["resistance-band", "Élastique"],
    ["dumbbells", "Haltères"],
    ["kettlebell", "Kettlebell"],
    ["barbell", "Barre"],
    ["pull-up-bar", "Barre de traction"],
    ["bench", "Banc"],
    ["punching-bag", "Sac de frappe"],
    ["bicycle", "Vélo"],
    ["treadmill", "Tapis de marche/course"]
  ]);

  Sport.defaultSportProfile = function defaultSportProfile() {
    return {
      level: "beginner",
      mainGoal: "general-fitness",
      sessionsPerWeek: 3,
      preferredDuration: 20,
      equipment: [],
      lastUpdatedAt: null
    };
  };

  Sport.normalizeSportProfile = function normalizeSportProfile(value = {}) {
    const defaults = Sport.defaultSportProfile();
    const level = Sport.levels[value?.level] ? value.level : defaults.level;
    const mainGoal = Sport.goals[value?.mainGoal] ? value.mainGoal : defaults.mainGoal;
    const sessionsPerWeek = Math.min(7, Math.max(1, Number(value?.sessionsPerWeek) || defaults.sessionsPerWeek));
    const preferredDuration = Math.min(180, Math.max(5, Number(value?.preferredDuration) || defaults.preferredDuration));
    const validEquipment = new Set(Sport.equipmentOptions.map(([id]) => id));
    const equipment = Array.isArray(value?.equipment)
      ? [...new Set(value.equipment.filter((id) => validEquipment.has(id)))]
      : [];

    return {
      ...defaults,
      ...value,
      level,
      mainGoal,
      sessionsPerWeek,
      preferredDuration,
      equipment,
      lastUpdatedAt: value?.lastUpdatedAt || null
    };
  };

  Sport.ensureProfileData = function ensureProfileData(profile) {
    if (!profile || typeof profile !== "object") return profile;

    profile.sportProfile = Sport.normalizeSportProfile(profile.sportProfile);
    profile.performanceHistory = Array.isArray(profile.performanceHistory)
      ? profile.performanceHistory.filter((item) => item && typeof item === "object")
      : [];

    return profile;
  };

  // ------------------------------------------------------------
  // Intégration au profil existant
  // ------------------------------------------------------------

  const originalCreateDefaultProfile = State.createDefaultProfile;
  if (typeof originalCreateDefaultProfile === "function") {
    State.createDefaultProfile = function createDefaultProfileWithSport(data = {}) {
      const profile = originalCreateDefaultProfile.call(State, data);
      profile.sportProfile = Sport.normalizeSportProfile(data.sportProfile);
      profile.performanceHistory = Array.isArray(data.performanceHistory)
        ? data.performanceHistory
        : [];
      return profile;
    };
  }

  const originalLoadProfile = State.loadProfile;
  if (typeof originalLoadProfile === "function") {
    State.loadProfile = function loadProfileWithSport() {
      const profile = originalLoadProfile.call(State);
      if (!profile) return profile;

      Sport.ensureProfileData(profile);
      State.saveProfile?.();
      return profile;
    };
  }

  State.getSportProfile = function getSportProfile() {
    const profile = State.getProfile?.();
    if (!profile) return Sport.defaultSportProfile();
    Sport.ensureProfileData(profile);
    return profile.sportProfile;
  };

  State.updateSportProfile = function updateSportProfile(patch = {}) {
    const profile = State.getProfile?.();
    if (!profile) return null;

    Sport.ensureProfileData(profile);
    profile.sportProfile = Sport.normalizeSportProfile({
      ...profile.sportProfile,
      ...patch,
      lastUpdatedAt: State.nowIso?.() || new Date().toISOString()
    });

    State.saveProfile?.();
    return profile.sportProfile;
  };

  State.getPerformanceHistory = function getPerformanceHistory() {
    const profile = State.getProfile?.();
    if (!profile) return [];
    Sport.ensureProfileData(profile);
    return profile.performanceHistory;
  };

  State.addPerformanceRecord = function addPerformanceRecord(record = {}) {
    const profile = State.getProfile?.();
    if (!profile || !record || typeof record !== "object") return null;

    Sport.ensureProfileData(profile);

    const sourceSessionId = String(record.sourceSessionId || "");
    if (sourceSessionId) {
      const existing = profile.performanceHistory.find((item) => {
        return String(item?.sourceSessionId || "") === sourceSessionId;
      });
      if (existing) return existing;
    }

    const cleanRecord = {
      id: record.id || State.createId?.("performance") || `performance-${Date.now()}`,
      sourceSessionId: sourceSessionId || null,
      date: record.date || State.todayKey?.() || new Date().toISOString().slice(0, 10),
      completedAt: record.completedAt || State.nowIso?.() || new Date().toISOString(),
      type: record.type || "program",
      programId: record.programId || null,
      programTitle: record.programTitle || "Programme",
      weekNumber: Math.max(1, Number(record.weekNumber) || 1),
      dayNumber: Math.max(0, Number(record.dayNumber) || 0),
      sessionTitle: record.sessionTitle || "Séance",
      durationMinutes: Math.max(0, Number(record.durationMinutes) || 0),
      rpe: Number.isFinite(Number(record.rpe)) ? Math.min(10, Math.max(1, Number(record.rpe))) : null,
      rpeLabel: record.rpeLabel || null,
      exercises: Array.isArray(record.exercises) ? record.exercises : []
    };

    profile.performanceHistory.unshift(cleanRecord);

    // Garde une profondeur raisonnable sans perdre l'historique récent.
    if (profile.performanceHistory.length > 250) {
      profile.performanceHistory = profile.performanceHistory.slice(0, 250);
    }

    State.saveProfile?.();
    return cleanRecord;
  };

  // ------------------------------------------------------------
  // Helpers performance
  // ------------------------------------------------------------

  Sport.getExerciseDefinition = function getExerciseDefinition(exerciseId) {
    return window.FitnessRpgData?.getExerciseById?.(exerciseId)
      || (window.FitnessRpgData?.exercises || []).find((item) => item.id === exerciseId)
      || null;
  };

  Sport.getExerciseAmount = function getExerciseAmount(item = {}) {
    const candidates = [
      item.amount,
      item.value,
      item.reps,
      item.duration,
      item.seconds,
      item.minutes
    ];

    const amount = candidates
      .map(Number)
      .find((value) => Number.isFinite(value) && value >= 0);

    return Number.isFinite(amount) ? amount : null;
  };

  Sport.getExerciseUnit = function getExerciseUnit(item = {}, definition = null) {
    if (item.unit) return item.unit;
    if (definition?.unit) return definition.unit;
    if (item.seconds != null) return "sec";
    if (item.minutes != null) return "min";
    if (item.reps != null) return "répétitions";
    return "";
  };

  Sport.captureSessionDraft = function captureSessionDraft(session) {
    if (!session) return null;

    const workout = Programs.getActiveProgramWorkout?.(session);
    const exercises = Array.isArray(workout?.exercises) ? workout.exercises : [];
    const program = Programs.getProgram?.(session.programId);

    const startedAt = session.startedAt ? new Date(session.startedAt).getTime() : NaN;
    const durationMinutes = Number.isFinite(startedAt)
      ? Math.max(0, Math.round((Date.now() - startedAt) / 60000))
      : 0;

    return {
      sourceSessionId: session.id || null,
      date: session.planningDateKey || State.todayKey?.(),
      type: session.type || "program",
      programId: session.programId || null,
      programTitle: program?.title || "Programme",
      weekNumber: Math.max(1, Number(session.weekNumber) || 1),
      dayNumber: Math.max(0, Number(session.dayNumber) || 0),
      sessionTitle: workout?.title || session.bossTitle || "Séance",
      durationMinutes,
      exercises: exercises.map((item, index) => {
        const definition = Sport.getExerciseDefinition(item.exerciseId);
        const plannedAmount = Sport.getExerciseAmount(item);

        return {
          order: index + 1,
          exerciseId: item.exerciseId || null,
          title: definition?.title || item.title || item.exerciseId || `Exercice ${index + 1}`,
          phase: item.phase || null,
          plannedAmount,
          actualAmount: plannedAmount,
          unit: Sport.getExerciseUnit(item, definition),
          loadKg: null
        };
      })
    };
  };

  Sport.savePendingPerformance = function savePendingPerformance(rpe = null, rpeLabel = null) {
    const draft = Sport.pendingPerformanceDraft;
    if (!draft) return null;

    const record = State.addPerformanceRecord?.({
      ...draft,
      rpe,
      rpeLabel
    }) || null;

    Sport.pendingPerformanceDraft = null;
    Sport.renderPerformanceStatsCard();
    Sport.renderSportProfilePanel();

    return record;
  };

  // ------------------------------------------------------------
  // RPE de fin de séance
  // ------------------------------------------------------------

  Sport.rpeChoices = Object.freeze([
    { value: 3, label: "Facile", icon: "🟢", help: "J’aurais pu en faire nettement plus." },
    { value: 5, label: "Bien dosée", icon: "🔵", help: "Effort confortable et utile." },
    { value: 7, label: "Difficile", icon: "🟠", help: "Exigeante, mais technique correcte." },
    { value: 9, label: "Très difficile", icon: "🔴", help: "Très proche de ma limite du jour." }
  ]);

  Sport.renderRpePanel = function renderRpePanel() {
    if (!Sport.pendingPerformanceDraft) return;

    const card = document.querySelector("#workoutSummaryCard");
    const overlay = document.querySelector("#workoutSummaryOverlay");

    if (!card || !overlay || overlay.classList.contains("hidden")) return;
    if (card.querySelector(".sport-rpe-panel")) return;

    const panel = document.createElement("section");
    panel.className = "sport-rpe-panel";
    panel.innerHTML = `
      <div class="sport-rpe-heading">
        <div>
          <p class="eyebrow">Effort ressenti</p>
          <h3>Comment était cette séance ?</h3>
        </div>
        <small>RPE</small>
      </div>

      <div class="sport-rpe-grid">
        ${Sport.rpeChoices.map((choice) => `
          <button
            class="sport-rpe-btn"
            type="button"
            data-rpe="${choice.value}"
            data-rpe-label="${Render.escapeHtml?.(choice.label) || choice.label}"
          >
            <span>${choice.icon}</span>
            <strong>${choice.label}</strong>
            <small>${choice.help}</small>
          </button>
        `).join("")}
      </div>

      <button class="sport-rpe-skip ghost-btn" type="button">
        Ne pas renseigner
      </button>
    `;

    card.appendChild(panel);
  };

  Sport.scheduleRpePanel = function scheduleRpePanel() {
    window.setTimeout(() => Sport.renderRpePanel(), 30);
    window.setTimeout(() => Sport.renderRpePanel(), 180);
  };

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element
      ? event.target
      : event.target?.parentElement;

    if (!target) return;

    const rpeButton = target.closest(".sport-rpe-btn");
    if (rpeButton) {
      const value = Number(rpeButton.dataset.rpe);
      const label = rpeButton.dataset.rpeLabel || "";
      Sport.savePendingPerformance(value, label);

      const panel = rpeButton.closest(".sport-rpe-panel");
      if (panel) {
        panel.innerHTML = `
          <div class="sport-rpe-saved">
            <span>✓</span>
            <div>
              <strong>Effort enregistré</strong>
              <small>${label} · RPE ${value}/10</small>
            </div>
          </div>
        `;
      }
      return;
    }

    if (target.closest(".sport-rpe-skip")) {
      Sport.savePendingPerformance(null, null);
      target.closest(".sport-rpe-panel")?.remove();
      return;
    }

    if (target.closest("#saveSportProfileButton")) {
      const panel = document.querySelector("#sportProfilePanel");
      if (!panel) return;

      const equipment = Array.from(
        panel.querySelectorAll('input[name="sportEquipment"]:checked')
      ).map((input) => input.value);

      State.updateSportProfile?.({
        level: panel.querySelector("#sportLevelSelect")?.value,
        mainGoal: panel.querySelector("#sportGoalSelect")?.value,
        sessionsPerWeek: Number(panel.querySelector("#sportSessionsInput")?.value || 3),
        preferredDuration: Number(panel.querySelector("#sportDurationInput")?.value || 20),
        equipment
      });

      Sport.renderSportProfilePanel();
    }
  });

  // Si le résumé disparaît sans réponse, on garde quand même la séance,
  // simplement sans RPE.
  Sport.installSummaryObserver = function installSummaryObserver() {
    const overlay = document.querySelector("#workoutSummaryOverlay");
    if (!overlay || Sport.summaryObserver) return;

    Sport.summaryObserver = new MutationObserver(() => {
      const hidden = overlay.classList.contains("hidden")
        || overlay.getAttribute("aria-hidden") === "true";

      if (hidden && Sport.pendingPerformanceDraft) {
        Sport.savePendingPerformance(null, null);
      } else if (!hidden) {
        Sport.scheduleRpePanel();
      }
    });

    Sport.summaryObserver.observe(overlay, {
      attributes: true,
      attributeFilter: ["class", "aria-hidden"]
    });
  };

  // ------------------------------------------------------------
  // Capture après fin de séance sans modifier les règles sportives
  // ------------------------------------------------------------

  const originalFinishProgramSession = Programs.finishProgramSession;
  if (typeof originalFinishProgramSession === "function") {
    Programs.finishProgramSession = function finishProgramSessionWithSportTracking() {
      const sessionBefore = State.getActiveProgramSession?.();

      if (sessionBefore?.type === "program-boss") {
        return originalFinishProgramSession.apply(Programs, arguments);
      }

      const draft = Sport.captureSessionDraft(sessionBefore);
      const result = originalFinishProgramSession.apply(Programs, arguments);
      const sessionAfter = State.getActiveProgramSession?.();

      if (draft && sessionBefore && !sessionAfter) {
        Sport.pendingPerformanceDraft = draft;
        Sport.scheduleRpePanel();
      }

      return result;
    };
  }

  const originalFinishBossSession = Programs.finishProgramBossSession;
  if (typeof originalFinishBossSession === "function") {
    Programs.finishProgramBossSession = function finishProgramBossSessionWithSportTracking() {
      const sessionBefore = State.getActiveProgramSession?.();
      const draft = Sport.captureSessionDraft(sessionBefore);
      const result = originalFinishBossSession.apply(Programs, arguments);
      const sessionAfter = State.getActiveProgramSession?.();

      if (draft && sessionBefore && !sessionAfter) {
        Sport.pendingPerformanceDraft = draft;
        Sport.scheduleRpePanel();
      }

      return result;
    };
  }

  // ------------------------------------------------------------
  // Profil sportif dans le menu Héros
  // ------------------------------------------------------------

  Sport.renderSportProfilePanel = function renderSportProfilePanel() {
    const page = document.querySelector("#pageHeroMenu");
    const profile = State.getProfile?.();

    if (!page || !profile) return;

    Sport.ensureProfileData(profile);
    const sport = profile.sportProfile;
    const history = profile.performanceHistory.slice(0, 3);

    let panel = document.querySelector("#sportProfilePanel");
    if (!panel) {
      panel = document.createElement("section");
      panel.id = "sportProfilePanel";
      panel.className = "sport-profile-card card";
      page.appendChild(panel);
    }

    const equipment = new Set(sport.equipment || []);

    panel.innerHTML = `
      <div class="sport-profile-heading">
        <div>
          <p class="eyebrow">Profil sportif</p>
          <h2>Ton entraînement</h2>
        </div>
        <span class="status-chip">${Sport.levels[sport.level]}</span>
      </div>

      <div class="sport-profile-grid">
        <label>
          Niveau
          <select id="sportLevelSelect">
            ${Object.entries(Sport.levels).map(([id, label]) => `
              <option value="${id}" ${sport.level === id ? "selected" : ""}>${label}</option>
            `).join("")}
          </select>
        </label>

        <label>
          Objectif principal
          <select id="sportGoalSelect">
            ${Object.entries(Sport.goals).map(([id, label]) => `
              <option value="${id}" ${sport.mainGoal === id ? "selected" : ""}>${label}</option>
            `).join("")}
          </select>
        </label>

        <label>
          Séances / semaine
          <input id="sportSessionsInput" type="number" min="1" max="7" step="1" value="${sport.sessionsPerWeek}">
        </label>

        <label>
          Durée préférée
          <div class="sport-duration-input">
            <input id="sportDurationInput" type="number" min="5" max="180" step="5" value="${sport.preferredDuration}">
            <span>min</span>
          </div>
        </label>
      </div>

      <details class="sport-equipment-details">
        <summary>Matériel disponible <span>${equipment.size || "Aucun"}</span></summary>
        <div class="sport-equipment-grid">
          ${Sport.equipmentOptions.map(([id, label]) => `
            <label>
              <input type="checkbox" name="sportEquipment" value="${id}" ${equipment.has(id) ? "checked" : ""}>
              <span>${label}</span>
            </label>
          `).join("")}
        </div>
      </details>

      <button id="saveSportProfileButton" class="primary-btn" type="button">
        Enregistrer le profil sportif
      </button>

      <div class="sport-recent-performance">
        <div class="sport-recent-heading">
          <strong>Dernières séances</strong>
          <small>${profile.performanceHistory.length} enregistrée${profile.performanceHistory.length > 1 ? "s" : ""}</small>
        </div>

        ${history.length
          ? history.map((item) => Sport.performanceRowHtml(item)).join("")
          : `<p class="muted">Tes performances apparaîtront ici après tes prochaines séances.</p>`
        }
      </div>
    `;
  };

  Sport.performanceRowHtml = function performanceRowHtml(item) {
    const duration = item.durationMinutes > 0 ? `${item.durationMinutes} min` : "Durée non mesurée";
    const rpe = item.rpe ? `RPE ${item.rpe}/10` : "RPE non renseigné";
    const context = item.type === "program-boss"
      ? `Boss · Semaine ${item.weekNumber}`
      : `Semaine ${item.weekNumber} · Jour ${item.dayNumber}`;

    return `
      <article class="sport-performance-row">
        <div>
          <strong>${Render.escapeHtml?.(item.sessionTitle) || item.sessionTitle}</strong>
          <small>${Render.escapeHtml?.(item.programTitle) || item.programTitle} · ${context}</small>
        </div>
        <span>${duration}<br>${rpe}</span>
      </article>
    `;
  };

  const originalRenderHeroMenu = Render.renderHeroMenu;
  if (typeof originalRenderHeroMenu === "function") {
    Render.renderHeroMenu = function renderHeroMenuWithSportProfile() {
      const result = originalRenderHeroMenu.apply(Render, arguments);
      Sport.renderSportProfilePanel();
      return result;
    };
  }

  // ------------------------------------------------------------
  // Carte performance dans Statistiques
  // ------------------------------------------------------------

  Sport.renderPerformanceStatsCard = function renderPerformanceStatsCard() {
    const page = document.querySelector("#pageStatistics");
    const profile = State.getProfile?.();

    if (!page || !profile) return;

    Sport.ensureProfileData(profile);
    const history = profile.performanceHistory.slice(0, 5);

    let card = document.querySelector("#sportPerformanceStatsCard");
    if (!card) {
      card = document.createElement("section");
      card.id = "sportPerformanceStatsCard";
      card.className = "sport-performance-stats-card card";
      page.appendChild(card);
    }

    const rated = profile.performanceHistory.filter((item) => Number.isFinite(Number(item.rpe)));
    const avgRpe = rated.length
      ? (rated.reduce((sum, item) => sum + Number(item.rpe), 0) / rated.length).toFixed(1)
      : "—";

    card.innerHTML = `
      <div class="sport-performance-stats-heading">
        <div>
          <p class="eyebrow">Suivi sportif</p>
          <h2>Performance récente</h2>
        </div>
        <span><strong>${avgRpe}</strong><small>RPE moyen</small></span>
      </div>

      <div class="sport-performance-history">
        ${history.length
          ? history.map((item) => Sport.performanceRowHtml(item)).join("")
          : `<p class="muted">Aucune séance suivie pour l’instant.</p>`
        }
      </div>
    `;
  };

  const originalRenderAll = Render.renderAll;
  if (typeof originalRenderAll === "function") {
    Render.renderAll = function renderAllWithSport() {
      const result = originalRenderAll.apply(Render, arguments);
      Sport.renderSportProfilePanel();
      Sport.renderPerformanceStatsCard();
      Sport.installSummaryObserver();
      return result;
    };
  }

  // Initialisation tardive : app.js appellera ensuite renderAll,
  // mais cette passe rend le module robuste si le profil est déjà chargé.
  window.setTimeout(() => {
    const profile = State.getProfile?.();
    if (profile) {
      Sport.ensureProfileData(profile);
      State.saveProfile?.();
    }

    Sport.installSummaryObserver();
    Sport.renderSportProfilePanel();
    Sport.renderPerformanceStatsCard();
  }, 0);
})();
