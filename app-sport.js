// ============================================================
// Fitness RPG - V6.2B - Séances adaptatives, profil sportif, RPE et performances
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
    console.warn("Fitness RPG Sport V6.2B : dépendances indisponibles.");
    return;
  }

  const Sport = window.FitnessRpgSport = window.FitnessRpgSport || {};

  Sport.version = "6.2b";
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
    ["mat", "Tapis", "assets/equipements/tapis.png"],
    ["resistance-band", "Élastique", "assets/equipements/elastique.png"],
    ["dumbbells", "Haltères", "assets/equipements/halteres.png"],
    ["kettlebell", "Kettlebell", "assets/equipements/kettlebell.png"],
    ["barbell", "Barre", "assets/equipements/barre.png"],
    ["pull-up-bar", "Barre de traction", "assets/equipements/barre_traction.png"],
    ["bench", "Banc", "assets/equipements/banc.png"],
    ["punching-bag", "Sac de frappe", "assets/equipements/sac_frappe.png"],
    ["bicycle", "Vélo", "assets/equipements/velo.png"],
    ["treadmill", "Tapis de marche/course", "assets/equipements/tapis_marche_course.png"]
  ]);


  // ------------------------------------------------------------
  // V6.2B - Adaptation prudente des séances
  // ------------------------------------------------------------

  Sport.adaptationVersion = "6.2b";

  // Les substitutions sont volontairement explicites et rares.
  // Aucune substitution n'est inventée à partir du nom d'un exercice.
  Sport.exerciseSubstitutions = Object.freeze({
    squats: Object.freeze({
      exerciseId: "goblet_squat",
      requires: ["kettlebell"],
      minLevel: "intermediate",
      label: "Goblet squat"
    }),
    shoulder_press_1kg: Object.freeze({
      exerciseId: "kettlebell_military_press",
      requires: ["kettlebell"],
      minLevel: "intermediate",
      label: "Développé militaire kettlebell"
    })
  });

  Sport.levelRank = Object.freeze({
    beginner: 0,
    intermediate: 1,
    advanced: 2
  });

  Sport.getProgramNominalMinutes = function getProgramNominalMinutes(program) {
    const duration = String(program?.duration || "");
    const values = [...duration.matchAll(/(\d+(?:[.,]\d+)?)/g)]
      .map((match) => Number(String(match[1]).replace(",", ".")))
      .filter((value) => Number.isFinite(value) && value > 0);

    if (!values.length) return 20;
    if (values.length === 1) return values[0];

    return (values[0] + values[1]) / 2;
  };

  Sport.getRecentComparableRpe = function getRecentComparableRpe(programId, type = "program") {
    const history = State.getPerformanceHistory?.() || [];
    const comparable = history
      .filter((item) => {
        if (!Number.isFinite(Number(item?.rpe))) return false;
        if (programId && item.programId !== programId) return false;
        return (item.type || "program") === type;
      })
      .slice(0, 3);

    if (!comparable.length) {
      return {
        count: 0,
        average: null,
        factor: 1,
        label: "Pas encore assez de RPE comparables"
      };
    }

    const average = comparable.reduce((sum, item) => sum + Number(item.rpe), 0) / comparable.length;
    let factor = 1;
    let label = "RPE récent stable";

    if (average >= 8) {
      factor = 0.90;
      label = "RPE récent élevé : volume légèrement réduit";
    } else if (average >= 7.2) {
      factor = 0.95;
      label = "RPE récent soutenu : progression suspendue";
    } else if (comparable.length >= 2 && average <= 4) {
      factor = 1.05;
      label = "RPE récent facile : légère progression";
    }

    return {
      count: comparable.length,
      average: Number(average.toFixed(1)),
      factor,
      label
    };
  };

  Sport.getDurationFactor = function getDurationFactor(preferredDuration, nominalDuration) {
    const preferred = Math.max(5, Number(preferredDuration) || 20);
    const nominal = Math.max(5, Number(nominalDuration) || 20);
    const raw = preferred / nominal;

    // Une préférence de durée ne doit jamais transformer brutalement la séance.
    return Math.min(1.08, Math.max(0.80, raw));
  };

  Sport.getLevelFactor = function getLevelFactor(heroLevel, program) {
    const heroRank = Sport.levelRank[heroLevel] ?? 0;
    const tier = window.FitnessRpgConfig?.getProgramTier?.(program) || "beginner";
    const programRank = Sport.levelRank[tier] ?? 0;
    const delta = heroRank - programRank;

    if (delta <= -2) return 0.88;
    if (delta === -1) return 0.94;
    if (delta === 1) return 1.04;
    if (delta >= 2) return 1.07;
    return 1;
  };

  Sport.isProtectedPhase = function isProtectedPhase(item = {}) {
    const phase = String(item.phase || "").toLowerCase();
    return [
      "échauff",
      "echauff",
      "warmup",
      "warm-up",
      "retour au calme",
      "récup",
      "recup",
      "cooldown",
      "cool-down"
    ].some((token) => phase.includes(token));
  };

  Sport.isCoreTimedExercise = function isCoreTimedExercise(item = {}, definition = null) {
    const text = `${item.exerciseId || ""} ${definition?.title || ""}`.toLowerCase();
    return ["plank", "gainage", "hollow", "core"].some((token) => text.includes(token));
  };

  Sport.roundAdaptedAmount = function roundAdaptedAmount(amount, unit, item, definition) {
    const safeAmount = Math.max(0, Number(amount) || 0);
    const normalizedUnit = String(unit || "").toLowerCase();

    if (["sec", "seconde", "secondes"].includes(normalizedUnit)) {
      let value = Math.max(5, Math.round(safeAmount / 5) * 5);
      if (Sport.isCoreTimedExercise(item, definition)) {
        value = Math.min(60, value);
      }
      return value;
    }

    if (["min", "minute", "minutes"].includes(normalizedUnit)) {
      return Math.max(1, Math.round(safeAmount));
    }

    return Math.max(1, Math.round(safeAmount));
  };

  Sport.getDeclaredSubstitution = function getDeclaredSubstitution(item, context) {
    const rule = Sport.exerciseSubstitutions[item?.exerciseId];
    if (!rule) return null;

    const heroRank = Sport.levelRank[context.level] ?? 0;
    const minRank = Sport.levelRank[rule.minLevel] ?? 0;
    if (heroRank < minRank) return null;

    const equipment = new Set(context.equipment || []);
    if (!(rule.requires || []).every((id) => equipment.has(id))) return null;

    const definition = Sport.getExerciseDefinition(rule.exerciseId);
    if (!definition) return null;

    return {
      ...rule,
      definition
    };
  };

  Sport.getHeroTrainingContext = function getHeroTrainingContext(session, workout) {
    const sportProfile = State.getSportProfile?.() || Sport.defaultSportProfile();
    const program = Programs.getProgram?.(session?.programId)
      || window.FitnessRpgConfig?.getProgramById?.(session?.programId)
      || null;
    const nominalDuration = Sport.getProgramNominalMinutes(program);
    const rpe = Sport.getRecentComparableRpe(
      session?.programId,
      session?.type === "program-boss" ? "program-boss" : "program"
    );

    return {
      level: sportProfile.level,
      goal: sportProfile.mainGoal,
      preferredDuration: sportProfile.preferredDuration,
      sessionsPerWeek: sportProfile.sessionsPerWeek,
      equipment: [...(sportProfile.equipment || [])],
      nominalDuration,
      durationFactor: Sport.getDurationFactor(sportProfile.preferredDuration, nominalDuration),
      levelFactor: Sport.getLevelFactor(sportProfile.level, program),
      rpe,
      programTier: window.FitnessRpgConfig?.getProgramTier?.(program) || "beginner",
      workoutTitle: workout?.title || workout?.subtitle || "Séance"
    };
  };

  Sport.adaptWorkoutForHero = function adaptWorkoutForHero(workout, context) {
    const sourceExercises = Array.isArray(workout?.exercises) ? workout.exercises : [];
    const substitutions = [];
    const changes = [];

    const adaptedExercises = sourceExercises.map((sourceItem, index) => {
      const item = { ...sourceItem };
      const sourceDefinition = Sport.getExerciseDefinition(item.exerciseId);
      const substitution = Sport.isProtectedPhase(item)
        ? null
        : Sport.getDeclaredSubstitution(item, context);

      if (substitution) {
        substitutions.push({
          index,
          fromExerciseId: item.exerciseId,
          toExerciseId: substitution.exerciseId,
          requires: [...(substitution.requires || [])]
        });
        item.exerciseId = substitution.exerciseId;
      }

      const definition = Sport.getExerciseDefinition(item.exerciseId) || substitution?.definition || sourceDefinition;
      const amount = Sport.getExerciseAmount(item);
      const unit = Sport.getExerciseUnit(item, definition);

      if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
        return item;
      }

      let factor = context.durationFactor * context.levelFactor * context.rpe.factor;

      // Échauffement et retour au calme changent très peu.
      if (Sport.isProtectedPhase(item)) {
        factor = 1 + ((factor - 1) * 0.30);
      }

      // Plafond prudent de variation par exercice.
      factor = Math.min(1.10, Math.max(0.78, factor));

      const adaptedAmount = Sport.roundAdaptedAmount(Number(amount) * factor, unit, item, definition);

      if (adaptedAmount !== Number(amount)) {
        changes.push({
          index,
          exerciseId: item.exerciseId,
          from: Number(amount),
          to: adaptedAmount,
          unit
        });
      }

      // Le moteur historique consomme principalement amount + unit.
      item.amount = adaptedAmount;
      if (unit) item.unit = unit;

      return item;
    });

    return {
      exercises: adaptedExercises,
      substitutions,
      changes
    };
  };

  Sport.getAdaptationSummary = function getAdaptationSummary(context, adapted) {
    const notes = [];

    if (Math.abs(context.durationFactor - 1) >= 0.03) {
      notes.push(`Durée cible ${context.preferredDuration} min`);
    }

    if (Math.abs(context.levelFactor - 1) >= 0.03) {
      notes.push(`Niveau ${Sport.levels[context.level] || context.level}`);
    }

    if (Math.abs(context.rpe.factor - 1) >= 0.03) {
      notes.push(context.rpe.label);
    }

    if (adapted.substitutions.length) {
      notes.push(`${adapted.substitutions.length} variante${adapted.substitutions.length > 1 ? "s" : ""} matériel`);
    }

    if (!notes.length) {
      notes.push("Profil compatible avec la séance prévue");
    }

    return notes;
  };

  Sport.applyAdaptationToSession = function applyAdaptationToSession(session) {
    if (!session || session.adaptation?.version === Sport.adaptationVersion) {
      return session;
    }

    const sourceWorkout = Sport.originalGetActiveProgramWorkout?.(session);
    if (!sourceWorkout || !Array.isArray(sourceWorkout.exercises) || !sourceWorkout.exercises.length) {
      return session;
    }

    const context = Sport.getHeroTrainingContext(session, sourceWorkout);
    const adapted = Sport.adaptWorkoutForHero(sourceWorkout, context);
    const summary = Sport.getAdaptationSummary(context, adapted);

    session.adaptedExercises = adapted.exercises;
    session.adaptation = {
      version: Sport.adaptationVersion,
      appliedAt: State.nowIso?.() || new Date().toISOString(),
      preferredDuration: context.preferredDuration,
      nominalDuration: context.nominalDuration,
      level: context.level,
      programTier: context.programTier,
      recentRpeAverage: context.rpe.average,
      recentRpeCount: context.rpe.count,
      factors: {
        duration: Number(context.durationFactor.toFixed(3)),
        level: Number(context.levelFactor.toFixed(3)),
        rpe: Number(context.rpe.factor.toFixed(3))
      },
      substitutions: adapted.substitutions,
      changedExerciseCount: adapted.changes.length,
      summary
    };

    State.saveActiveProgramSession?.();
    return session;
  };

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
  // Branchement V6.2B au moteur historique
  // ------------------------------------------------------------

  Sport.originalGetActiveProgramWorkout = Programs.getActiveProgramWorkout;
  if (typeof Sport.originalGetActiveProgramWorkout === "function") {
    Programs.getActiveProgramWorkout = function getAdaptiveProgramWorkout(session = null) {
      const activeSession = session || State.getActiveProgramSession?.();
      const sourceWorkout = Sport.originalGetActiveProgramWorkout.call(Programs, activeSession);

      if (!sourceWorkout || !activeSession) return sourceWorkout;

      if (
        activeSession.adaptation?.version === Sport.adaptationVersion
        && Array.isArray(activeSession.adaptedExercises)
      ) {
        return {
          ...sourceWorkout,
          exercises: activeSession.adaptedExercises.map((item) => ({ ...item }))
        };
      }

      return sourceWorkout;
    };
  }

  const originalStartProgramSession = State.startProgramSession;
  if (typeof originalStartProgramSession === "function") {
    State.startProgramSession = function startAdaptiveProgramSession() {
      const session = originalStartProgramSession.apply(State, arguments);
      Sport.applyAdaptationToSession(session);
      return session;
    };
  }

  const originalStartProgramBossSession = State.startProgramBossSession;
  if (typeof originalStartProgramBossSession === "function") {
    State.startProgramBossSession = function startAdaptiveProgramBossSession() {
      const session = originalStartProgramBossSession.apply(State, arguments);
      Sport.applyAdaptationToSession(session);
      return session;
    };
  }

  Sport.renderAdaptationBadge = function renderAdaptationBadge() {
    const session = State.getActiveProgramSession?.();
    const shell = document.querySelector("#activeProgramSession");

    if (!shell) return;

    shell.querySelector(".sport-adaptation-chip")?.remove();

    if (!session?.adaptation || session.adaptation.version !== Sport.adaptationVersion) {
      return;
    }

    const summary = Array.isArray(session.adaptation.summary)
      ? session.adaptation.summary
      : [];
    const chip = document.createElement("div");
    chip.className = "sport-adaptation-chip";
    chip.setAttribute("role", "status");
    chip.title = summary.join(" · ");
    chip.innerHTML = `
      <span aria-hidden="true">⚙️</span>
      <strong>Séance adaptée</strong>
      <small>${Number(session.adaptation.preferredDuration) || 20} min</small>
    `;

    shell.querySelector(".guided-session-header")?.insertAdjacentElement("afterend", chip);
  };

  const originalRenderActiveProgramSession = Render.renderActiveProgramSession;
  if (typeof originalRenderActiveProgramSession === "function") {
    Render.renderActiveProgramSession = function renderAdaptiveProgramSession() {
      const result = originalRenderActiveProgramSession.apply(Render, arguments);
      Sport.renderAdaptationBadge();
      return result;
    };
  }

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

    const equipmentInput = target.closest('input[name="sportEquipment"]');
    if (equipmentInput) {
      const card = equipmentInput.closest(".sport-equipment-card");
      card?.classList.toggle("selected", equipmentInput.checked);
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
          ${Sport.equipmentOptions.map(([id, label, image]) => `
            <label class="sport-equipment-card ${equipment.has(id) ? "selected" : ""}">
              <input
                type="checkbox"
                name="sportEquipment"
                value="${id}"
                ${equipment.has(id) ? "checked" : ""}
              >
              <span class="sport-equipment-visual">
                <img src="${image}" alt="${label}" loading="lazy">
                <span class="sport-equipment-check" aria-hidden="true">✓</span>
              </span>
              <span class="sport-equipment-name">${label}</span>
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
