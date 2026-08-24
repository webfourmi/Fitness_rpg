// ============================================================
// Fitness RPG - V6.5.2 - Coach vivant + Familiers vivants
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
    console.warn("Fitness RPG Sport V6.5.1 : dépendances indisponibles.");
    return;
  }

  const Sport = window.FitnessRpgSport = window.FitnessRpgSport || {};

  Sport.version = window.FitnessRpgConfig?.assetVersion || "6.5.1";
  Sport.pendingPerformanceDraft = null;
  Sport.pendingExercisePerformance = null;
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
    ["mat", "Tapis", "assets/equipements/tapis.webp"],
    ["resistance-band", "Élastique", "assets/equipements/elastique.webp"],
    ["dumbbells", "Haltères", "assets/equipements/halteres.webp"],
    ["kettlebell", "Kettlebell", "assets/equipements/kettlebell.webp"],
    ["barbell", "Barre", "assets/equipements/barre.webp"],
    ["pull-up-bar", "Barre de traction", "assets/equipements/barre_traction.webp"],
    ["bench", "Banc", "assets/equipements/banc.webp"],
    ["punching-bag", "Sac de frappe", "assets/equipements/sac_frappe.webp"],
    ["bicycle", "Vélo", "assets/equipements/velo.webp"],
    ["treadmill", "Tapis de marche/course", "assets/equipements/tapis_marche_course.webp"]
  ]);


  // ------------------------------------------------------------
  // V6.2F - Durée prédictive + variantes intelligentes + progression ciblée
  // ------------------------------------------------------------

  Sport.adaptationVersion = "6.3";

  // Les substitutions sont une liste blanche : chaque paire est validée
  // explicitement. Le moteur ne déduit jamais une variante depuis le nom.
  // L'ordre des règles compte : les préférences de confort passent avant
  // l'enrichissement par matériel.
  Sport.exerciseSubstitutions = Object.freeze({
    squats: Object.freeze([
      Object.freeze({
        exerciseId: "chair_squat",
        whenPreference: "kneeFriendly",
        label: "Squat chaise",
        reason: "genoux sensibles"
      }),
      Object.freeze({
        exerciseId: "goblet_squat",
        requires: ["kettlebell"],
        minLevel: "intermediate",
        label: "Goblet squat",
        reason: "kettlebell disponible"
      })
    ]),
    goblet_squat: Object.freeze([
      Object.freeze({
        exerciseId: "chair_squat",
        whenPreference: "kneeFriendly",
        label: "Squat chaise",
        reason: "genoux sensibles"
      }),
      Object.freeze({
        exerciseId: "squats",
        missingEquipment: ["kettlebell"],
        label: "Squats poids du corps",
        reason: "sans kettlebell"
      })
    ]),
    reverse_lunges: Object.freeze([
      Object.freeze({
        exerciseId: "assisted_reverse_lunges",
        whenPreference: "kneeFriendly",
        label: "Fentes arrière assistées",
        reason: "genoux sensibles"
      })
    ]),
    walking_lunges: Object.freeze([
      Object.freeze({
        exerciseId: "assisted_reverse_lunges",
        whenPreferences: ["kneeFriendly", "smallSpace"],
        preferenceMode: "any",
        label: "Fentes arrière assistées",
        reason: "confort ou espace réduit"
      })
    ]),
    shoulder_press_1kg: Object.freeze([
      Object.freeze({
        exerciseId: "kettlebell_military_press",
        requires: ["kettlebell"],
        minLevel: "intermediate",
        label: "Développé militaire kettlebell",
        reason: "kettlebell disponible"
      })
    ]),
    kettlebell_military_press: Object.freeze([
      Object.freeze({
        exerciseId: "shoulder_press_1kg",
        missingEquipment: ["kettlebell"],
        requires: ["dumbbells"],
        label: "Développé épaules haltères",
        reason: "haltères disponibles, sans kettlebell"
      })
    ])
  });

  Sport.levelRank = Object.freeze({
    beginner: 0,
    intermediate: 1,
    advanced: 2
  });

  // La durée prédite informe l’utilisateur mais ne modifie pas encore le volume.
  // Cela évite une boucle : prédiction courte -> volume réduit -> prédiction encore plus courte.
  Sport.durationPredictionRules = Object.freeze({
    maxSamples: 5,
    minimumPersonalizedSamples: 2,
    minValidMinutes: 5,
    maxValidMinutes: 180,
    outlierRatioLow: 0.55,
    outlierRatioHigh: 1.65
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

  // ------------------------------------------------------------
  // V6.2D - Historique ciblé par exercice
  // ------------------------------------------------------------

  Sport.exerciseProgressionRules = Object.freeze({
    historyDepth: 3,
    minimumSamples: 2,
    successRatio: 0.98,
    struggleRatio: 0.90,
    moderateRpeMin: 4,
    moderateRpeMax: 6.5,
    highRpeMin: 8,
    progressFactor: 1.03,
    reduceFactor: 0.97
  });

  Sport.getRecentExercisePerformances = function getRecentExercisePerformances(
    exerciseId,
    limit = Sport.exerciseProgressionRules.historyDepth
  ) {
    const wantedId = String(exerciseId || "");
    if (!wantedId) return [];

    const history = State.getPerformanceHistory?.() || [];
    const samples = [];

    // Une séance compte pour une occurrence, même si l'exercice apparaît
    // plusieurs fois dans différents cycles. On agrège alors prévu/réalisé.
    for (const record of history) {
      const exercises = Array.isArray(record?.exercises) ? record.exercises : [];
      const matching = exercises.filter((item) => item?.exerciseId === wantedId);

      if (!matching.length) continue;

      let plannedTotal = 0;
      let actualTotal = 0;
      let validAmounts = 0;
      const loads = [];

      matching.forEach((item) => {
        const planned = Number(item?.plannedAmount);
        const actual = Number(item?.actualAmount);

        if (Number.isFinite(planned) && planned > 0 && Number.isFinite(actual) && actual >= 0) {
          plannedTotal += planned;
          actualTotal += actual;
          validAmounts += 1;
        }

        const load = Number(item?.loadKg);
        if (Number.isFinite(load) && load > 0) {
          loads.push(load);
        }
      });

      if (!validAmounts || plannedTotal <= 0) continue;

      samples.push({
        date: record?.date || record?.completedAt || null,
        sourceSessionId: record?.sourceSessionId || null,
        programId: record?.programId || null,
        rpe: Number.isFinite(Number(record?.rpe)) ? Number(record.rpe) : null,
        plannedAmount: plannedTotal,
        actualAmount: actualTotal,
        completionRatio: actualTotal / plannedTotal,
        loadKg: loads.length
          ? Number((loads.reduce((sum, value) => sum + value, 0) / loads.length).toFixed(1))
          : null
      });

      if (samples.length >= Math.max(1, Number(limit) || 1)) break;
    }

    return samples;
  };

  Sport.getExerciseProgressionSignal = function getExerciseProgressionSignal(exerciseId) {
    const rules = Sport.exerciseProgressionRules;
    const samples = Sport.getRecentExercisePerformances(exerciseId, rules.historyDepth);

    const neutral = {
      exerciseId,
      sampleCount: samples.length,
      direction: "hold",
      factor: 1,
      averageCompletion: null,
      averageRpe: null,
      label: samples.length < rules.minimumSamples
        ? "Historique insuffisant : maintien"
        : "Progression stable : maintien",
      samples
    };

    if (samples.length < rules.minimumSamples) return neutral;

    const ratios = samples
      .map((sample) => Number(sample.completionRatio))
      .filter(Number.isFinite);
    const rpes = samples
      .map((sample) => Number(sample.rpe))
      .filter(Number.isFinite);

    if (!ratios.length) return neutral;

    const averageCompletion = ratios.reduce((sum, value) => sum + value, 0) / ratios.length;
    const averageRpe = rpes.length
      ? rpes.reduce((sum, value) => sum + value, 0) / rpes.length
      : null;

    const result = {
      ...neutral,
      averageCompletion: Number(averageCompletion.toFixed(3)),
      averageRpe: averageRpe == null ? null : Number(averageRpe.toFixed(1))
    };

    // Progression seulement si les dernières occurrences sont toutes réussies
    // et que le RPE est modéré. Une seule bonne séance ne suffit jamais.
    const allSuccessful = ratios.every((ratio) => ratio >= rules.successRatio);
    const allRpeUsable = rpes.length === samples.length;
    const moderateRpe = allRpeUsable
      && averageRpe >= rules.moderateRpeMin
      && averageRpe <= rules.moderateRpeMax
      && rpes.every((value) => value <= 7);

    if (allSuccessful && moderateRpe) {
      return {
        ...result,
        direction: "progress",
        factor: rules.progressFactor,
        label: `Objectif atteint ${samples.length} fois : légère progression`
      };
    }

    // Réduction seulement si au moins deux occurrences récentes sont nettement
    // sous l'objectif ET que l'effort global est élevé. Sinon on maintient.
    const recentTwo = samples.slice(0, 2);
    const recentTwoStruggled = recentTwo.length >= 2
      && recentTwo.every((sample) => Number(sample.completionRatio) < rules.struggleRatio);
    const highRpe = rpes.length >= 2
      && averageRpe >= rules.highRpeMin
      && rpes.slice(0, 2).every((value) => value >= 7);

    if (recentTwoStruggled && highRpe) {
      return {
        ...result,
        direction: "reduce",
        factor: rules.reduceFactor,
        label: "Objectif non atteint avec effort élevé : légère réduction"
      };
    }

    return result;
  };

  Sport.getDurationSessionKey = function getDurationSessionKey(record = {}) {
    const programId = String(record.programId || "");
    const type = record.type === "program-boss" ? "program-boss" : "program";

    if (!programId) return "";

    if (type === "program-boss") {
      return `${programId}|program-boss`;
    }

    const dayNumber = Math.max(0, Number(record.dayNumber) || 0);
    return `${programId}|program|day-${dayNumber || "any"}`;
  };

  Sport.getValidDurationHistory = function getValidDurationHistory() {
    const rules = Sport.durationPredictionRules;
    return (State.getPerformanceHistory?.() || [])
      .filter((record) => {
        const minutes = Number(record?.durationMinutes);
        return Number.isFinite(minutes)
          && minutes >= rules.minValidMinutes
          && minutes <= rules.maxValidMinutes;
      });
  };

  Sport.filterDurationOutliers = function filterDurationOutliers(records = []) {
    if (!Array.isArray(records) || records.length < 3) return records.slice();

    const sorted = records
      .map((record) => Number(record.durationMinutes))
      .filter(Number.isFinite)
      .sort((a, b) => a - b);

    if (!sorted.length) return [];

    const middle = Math.floor(sorted.length / 2);
    const median = sorted.length % 2
      ? sorted[middle]
      : (sorted[middle - 1] + sorted[middle]) / 2;

    const low = median * Sport.durationPredictionRules.outlierRatioLow;
    const high = median * Sport.durationPredictionRules.outlierRatioHigh;

    return records.filter((record) => {
      const minutes = Number(record.durationMinutes);
      return minutes >= low && minutes <= high;
    });
  };

  Sport.weightedDurationAverage = function weightedDurationAverage(records = []) {
    if (!records.length) return null;

    let weightedTotal = 0;
    let totalWeight = 0;
    const size = records.length;

    records.forEach((record, index) => {
      // Les séances les plus récentes comptent davantage.
      const weight = Math.max(1, size - index);
      weightedTotal += Number(record.durationMinutes) * weight;
      totalWeight += weight;
    });

    if (!totalWeight) return null;
    return weightedTotal / totalWeight;
  };

  Sport.predictSessionDuration = function predictSessionDuration(session, workout, context = {}) {
    const rules = Sport.durationPredictionRules;
    const baseline = Math.max(
      rules.minValidMinutes,
      Number(context.preferredDuration)
        || Number(context.nominalDuration)
        || 20
    );
    const history = Sport.getValidDurationHistory();
    const currentKey = Sport.getDurationSessionKey(session);
    const type = session?.type === "program-boss" ? "program-boss" : "program";
    const programId = String(session?.programId || "");

    const exact = history.filter((record) => {
      return currentKey && Sport.getDurationSessionKey(record) === currentKey;
    });

    const sameProgram = history.filter((record) => {
      return String(record?.programId || "") === programId
        && (record?.type === "program-boss" ? "program-boss" : "program") === type;
    });

    let source = "baseline";
    let candidates = [];

    if (exact.length >= rules.minimumPersonalizedSamples) {
      source = "same-session-type";
      candidates = exact;
    } else if (sameProgram.length >= rules.minimumPersonalizedSamples) {
      source = "same-program";
      candidates = sameProgram;
    } else if (exact.length) {
      source = "learning";
      candidates = exact;
    } else if (sameProgram.length) {
      source = "learning";
      candidates = sameProgram;
    }

    candidates = Sport.filterDurationOutliers(candidates)
      .slice(0, rules.maxSamples);

    if (!candidates.length) {
      return {
        minutes: Math.round(baseline),
        source: "baseline",
        sampleCount: 0,
        confidence: "baseline",
        label: `Durée cible ${Math.round(baseline)} min`,
        samples: []
      };
    }

    const learnedAverage = Sport.weightedDurationAverage(candidates);
    const sampleCount = candidates.length;
    let learnedWeight = 0.45;

    if (sampleCount >= 2) learnedWeight = 0.72;
    if (sampleCount >= 3) learnedWeight = 0.86;
    if (sampleCount >= 5) learnedWeight = 0.92;

    const rawPrediction = (learnedAverage * learnedWeight) + (baseline * (1 - learnedWeight));
    const prediction = Math.round(Math.min(
      rules.maxValidMinutes,
      Math.max(rules.minValidMinutes, rawPrediction)
    ));

    const confidence = sampleCount >= 3 && source === "same-session-type"
      ? "high"
      : sampleCount >= 2
        ? "medium"
        : "learning";

    const sourceLabel = source === "same-session-type"
      ? `${sampleCount} séance${sampleCount > 1 ? "s" : ""} similaire${sampleCount > 1 ? "s" : ""}`
      : source === "same-program"
        ? `${sampleCount} séance${sampleCount > 1 ? "s" : ""} du programme`
        : "première donnée personnelle";

    return {
      minutes: prediction,
      source,
      sampleCount,
      confidence,
      learnedAverage: Number(learnedAverage.toFixed(1)),
      label: `Durée estimée ≈ ${prediction} min · ${sourceLabel}`,
      samples: candidates.map((record) => ({
        id: record.id || null,
        date: record.date || null,
        durationMinutes: Number(record.durationMinutes)
      }))
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

  Sport.matchesSubstitutionRule = function matchesSubstitutionRule(rule, context) {
    if (!rule || !context) return false;

    const heroRank = Sport.levelRank[context.level] ?? 0;
    const minRank = Sport.levelRank[rule.minLevel] ?? 0;
    if (heroRank < minRank) return false;

    const equipment = new Set(context.equipment || []);
    if (!(rule.requires || []).every((id) => equipment.has(id))) return false;
    if ((rule.missingEquipment || []).some((id) => equipment.has(id))) return false;

    const preferences = context.preferences || {};
    if (rule.whenPreference && !preferences[rule.whenPreference]) return false;

    if (Array.isArray(rule.whenPreferences) && rule.whenPreferences.length) {
      const matches = rule.whenPreferences.map((id) => Boolean(preferences[id]));
      const preferenceMode = rule.preferenceMode === "all" ? "all" : "any";
      if (preferenceMode === "all" && !matches.every(Boolean)) return false;
      if (preferenceMode === "any" && !matches.some(Boolean)) return false;
    }

    return true;
  };

  Sport.getDeclaredSubstitution = function getDeclaredSubstitution(item, context) {
    const rules = Sport.exerciseSubstitutions[item?.exerciseId];
    if (!Array.isArray(rules) || !rules.length) return null;

    for (const rule of rules) {
      if (!Sport.matchesSubstitutionRule(rule, context)) continue;

      const definition = Sport.getExerciseDefinition(rule.exerciseId);
      if (!definition) continue;

      return {
        ...rule,
        definition
      };
    }

    return null;
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

    const context = {
      level: sportProfile.level,
      goal: sportProfile.mainGoal,
      preferredDuration: sportProfile.preferredDuration,
      sessionsPerWeek: sportProfile.sessionsPerWeek,
      equipment: [...(sportProfile.equipment || [])],
      preferences: {
        kneeFriendly: Boolean(sportProfile.kneeFriendly),
        smallSpace: Boolean(sportProfile.smallSpace)
      },
      nominalDuration,
      durationFactor: Sport.getDurationFactor(sportProfile.preferredDuration, nominalDuration),
      levelFactor: Sport.getLevelFactor(sportProfile.level, program),
      rpe,
      programTier: window.FitnessRpgConfig?.getProgramTier?.(program) || "beginner",
      workoutTitle: workout?.title || workout?.subtitle || "Séance",
      durationPrediction: null
    };

    context.durationPrediction = Sport.predictSessionDuration(session, workout, context);
    return context;
  };

  Sport.adaptWorkoutForHero = function adaptWorkoutForHero(workout, context) {
    const sourceExercises = Array.isArray(workout?.exercises) ? workout.exercises : [];
    const substitutions = [];
    const changes = [];
    const exerciseProgressions = [];

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
          label: substitution.label || substitution.definition?.title || substitution.exerciseId,
          reason: substitution.reason || "variante déclarée",
          requires: [...(substitution.requires || [])],
          missingEquipment: [...(substitution.missingEquipment || [])]
        });
        item.exerciseId = substitution.exerciseId;
      }

      const definition = Sport.getExerciseDefinition(item.exerciseId) || substitution?.definition || sourceDefinition;
      const amount = Sport.getExerciseAmount(item);
      const unit = Sport.getExerciseUnit(item, definition);

      if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
        return item;
      }

      const exerciseProgression = Sport.isProtectedPhase(item)
        ? {
            exerciseId: item.exerciseId,
            sampleCount: 0,
            direction: "hold",
            factor: 1,
            averageCompletion: null,
            averageRpe: null,
            label: "Phase protégée : maintien",
            samples: []
          }
        : Sport.getExerciseProgressionSignal(item.exerciseId);

      exerciseProgressions.push({
        index,
        exerciseId: item.exerciseId,
        direction: exerciseProgression.direction,
        factor: exerciseProgression.factor,
        sampleCount: exerciseProgression.sampleCount,
        averageCompletion: exerciseProgression.averageCompletion,
        averageRpe: exerciseProgression.averageRpe,
        label: exerciseProgression.label
      });

      let factor = (
        context.durationFactor
        * context.levelFactor
        * context.rpe.factor
        * exerciseProgression.factor
      );

      // Échauffement et retour au calme changent très peu.
      if (Sport.isProtectedPhase(item)) {
        factor = 1 + ((factor - 1) * 0.30);
      }

      // Plafond prudent de variation globale par exercice.
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
      changes,
      exerciseProgressions
    };
  };

  Sport.getAdaptationSummary = function getAdaptationSummary(context, adapted) {
    const notes = [];

    if (context.durationPrediction?.sampleCount > 0) {
      notes.push(context.durationPrediction.label);
    } else if (Math.abs(context.durationFactor - 1) >= 0.03) {
      notes.push(`Durée cible ${context.preferredDuration} min`);
    }

    if (Math.abs(context.levelFactor - 1) >= 0.03) {
      notes.push(`Niveau ${Sport.levels[context.level] || context.level}`);
    }

    if (Math.abs(context.rpe.factor - 1) >= 0.03) {
      notes.push(context.rpe.label);
    }

    if (adapted.substitutions.length) {
      const variantLabels = adapted.substitutions
        .slice(0, 2)
        .map((item) => `${item.label} · ${item.reason}`);
      notes.push(...variantLabels);
      if (adapted.substitutions.length > 2) {
        notes.push(`+${adapted.substitutions.length - 2} autre${adapted.substitutions.length > 3 ? "s" : ""} variante${adapted.substitutions.length > 3 ? "s" : ""}`);
      }
    }

    const progressions = (adapted.exerciseProgressions || []).filter((item) => item.direction === "progress");
    const reductions = (adapted.exerciseProgressions || []).filter((item) => item.direction === "reduce");

    if (progressions.length) {
      notes.push(`${progressions.length} exercice${progressions.length > 1 ? "s" : ""} en légère progression`);
    }

    if (reductions.length) {
      notes.push(`${reductions.length} exercice${reductions.length > 1 ? "s" : ""} légèrement allégé${reductions.length > 1 ? "s" : ""}`);
    }

    if (!notes.length) {
      notes.push("Profil compatible avec la séance prévue");
    }

    return notes;
  };

  Sport.getEquipmentLabel = function getEquipmentLabel(equipmentId) {
    const option = Sport.equipmentOptions.find(([id]) => id === equipmentId);
    return option?.[1] || equipmentId;
  };

  Sport.getAverageVolumeChangePercent = function getAverageVolumeChangePercent(sourceWorkout, adaptedExercises) {
    const sourceExercises = Array.isArray(sourceWorkout?.exercises) ? sourceWorkout.exercises : [];
    const targetExercises = Array.isArray(adaptedExercises) ? adaptedExercises : [];
    const ratios = [];

    sourceExercises.forEach((sourceItem, index) => {
      const targetItem = targetExercises[index];
      if (!targetItem) return;

      const sourceDefinition = Sport.getExerciseDefinition(sourceItem.exerciseId);
      const targetDefinition = Sport.getExerciseDefinition(targetItem.exerciseId) || sourceDefinition;
      const sourceAmount = Number(Sport.getExerciseAmount(sourceItem));
      const targetAmount = Number(Sport.getExerciseAmount(targetItem));
      const sourceUnit = Sport.getExerciseUnit(sourceItem, sourceDefinition);
      const targetUnit = Sport.getExerciseUnit(targetItem, targetDefinition);

      if (!Number.isFinite(sourceAmount) || sourceAmount <= 0) return;
      if (!Number.isFinite(targetAmount) || targetAmount <= 0) return;
      if (sourceUnit && targetUnit && sourceUnit !== targetUnit) return;

      ratios.push(targetAmount / sourceAmount);
    });

    if (!ratios.length) return 0;

    const averageRatio = ratios.reduce((sum, value) => sum + value, 0) / ratios.length;
    const percent = Math.round((averageRatio - 1) * 100);

    return Math.abs(percent) < 2 ? 0 : percent;
  };

  Sport.getAdaptiveEquipmentUsed = function getAdaptiveEquipmentUsed(adapted) {
    const ids = new Set();

    (adapted?.substitutions || []).forEach((item) => {
      (item.requires || []).forEach((id) => ids.add(id));
    });

    return [...ids];
  };

  Sport.buildAdaptiveCoachHeadline = function buildAdaptiveCoachHeadline(adaptation) {
    if (!adaptation) return "";

    const parts = [];
    const minutes = Number(adaptation.estimatedDurationMinutes) || Number(adaptation.preferredDuration) || 20;
    const approximate = adaptation.durationPrediction?.sampleCount > 0 ? "≈ " : "";
    parts.push(`${approximate}${minutes} min`);

    const volume = Number(adaptation.volumeChangePercent || 0);
    if (volume >= 2) {
      parts.push(`volume +${volume} %`);
    } else if (volume <= -2) {
      parts.push(`volume ${volume} %`);
    } else {
      parts.push("volume stable");
    }

    const equipmentUsed = Array.isArray(adaptation.equipmentUsed)
      ? adaptation.equipmentUsed
      : [];

    if (equipmentUsed.length === 1) {
      parts.push(`${Sport.getEquipmentLabel(equipmentUsed[0]).toLowerCase()} dispo`);
    } else if (equipmentUsed.length > 1) {
      parts.push(`${equipmentUsed.length} matériels utilisés`);
    }

    return parts.join(" · ");
  };

  Sport.getAdaptiveCoachDetails = function getAdaptiveCoachDetails(session) {
    const adaptation = session?.adaptation;
    if (!adaptation) return [];

    const details = [];
    const minutes = Number(adaptation.estimatedDurationMinutes) || Number(adaptation.preferredDuration) || 20;
    const predictionCount = Number(adaptation.durationPrediction?.sampleCount || 0);

    if (predictionCount > 0) {
      details.push(`Durée probable : environ ${minutes} min, estimée à partir de ${predictionCount} séance${predictionCount > 1 ? "s" : ""} comparable${predictionCount > 1 ? "s" : ""}.`);
    } else {
      details.push(`Durée cible : ${minutes} min selon ton profil sportif.`);
    }

    const volume = Number(adaptation.volumeChangePercent || 0);
    if (volume >= 2) {
      details.push(`Volume prévu légèrement augmenté : +${volume} % en moyenne.`);
    } else if (volume <= -2) {
      details.push(`Volume prévu légèrement réduit : ${volume} % en moyenne.`);
    } else {
      details.push("Volume prévu globalement stable.");
    }

    const summary = Array.isArray(adaptation.summary) ? adaptation.summary : [];
    summary.forEach((line) => {
      if (line && !details.some((existing) => existing.includes(line))) {
        details.push(line);
      }
    });

    const equipmentUsed = Array.isArray(adaptation.equipmentUsed)
      ? adaptation.equipmentUsed
      : [];
    if (equipmentUsed.length) {
      const labels = equipmentUsed.map((id) => Sport.getEquipmentLabel(id));
      details.push(`Matériel utilisé pour une variante : ${labels.join(", ")}.`);
    }

    details.push("Les programmes sources restent inchangés : cette adaptation ne vaut que pour cette séance.");
    return details;
  };

  Sport.openAdaptiveCoachDetails = function openAdaptiveCoachDetails() {
    const session = State.getActiveProgramSession?.();
    if (!session?.adaptation) return;

    const coachId = State.getCoachId?.();
    const coach = window.FitnessRpgData?.getCoach?.(coachId);
    const coachName = coach?.fullName || coach?.name || "Coach";

    Render.showModal?.({
      icon: "⚙️",
      title: `${coachName} · Pourquoi cette séance ?`,
      message: Sport.getAdaptiveCoachDetails(session),
      okText: "Compris"
    });
  };

  Sport.applyAdaptationToSession = function applyAdaptationToSession(session) {
    // Une séance déjà adaptée reste figée, même si elle a été créée par
    // V6.2B/C. On ne recalcule jamais une séance en cours après mise à jour.
    if (!session || (session.adaptation && Array.isArray(session.adaptedExercises))) {
      return session;
    }

    const sourceWorkout = Sport.originalGetActiveProgramWorkout?.(session);
    if (!sourceWorkout || !Array.isArray(sourceWorkout.exercises) || !sourceWorkout.exercises.length) {
      return session;
    }

    const context = Sport.getHeroTrainingContext(session, sourceWorkout);
    const adapted = Sport.adaptWorkoutForHero(sourceWorkout, context);
    const summary = Sport.getAdaptationSummary(context, adapted);
    const volumeChangePercent = Sport.getAverageVolumeChangePercent(sourceWorkout, adapted.exercises);
    const equipmentUsed = Sport.getAdaptiveEquipmentUsed(adapted);

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
      estimatedDurationMinutes: context.durationPrediction?.minutes || context.preferredDuration,
      durationPrediction: context.durationPrediction || null,
      factors: {
        duration: Number(context.durationFactor.toFixed(3)),
        level: Number(context.levelFactor.toFixed(3)),
        rpe: Number(context.rpe.factor.toFixed(3))
      },
      substitutions: adapted.substitutions,
      exerciseProgressions: adapted.exerciseProgressions,
      changedExerciseCount: adapted.changes.length,
      volumeChangePercent,
      equipmentUsed,
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
      kneeFriendly: false,
      smallSpace: false,
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
      kneeFriendly: Boolean(value?.kneeFriendly),
      smallSpace: Boolean(value?.smallSpace),
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
      predictedDurationMinutes: Number.isFinite(Number(record.predictedDurationMinutes))
        ? Math.max(0, Number(record.predictedDurationMinutes))
        : null,
      durationPredictionSource: record.durationPredictionSource || null,
      durationPredictionSampleCount: Math.max(0, Number(record.durationPredictionSampleCount) || 0),
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
        activeSession.adaptation
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

    if (!session?.adaptation || !Array.isArray(session.adaptedExercises)) {
      return;
    }

    const headline = Sport.buildAdaptiveCoachHeadline(session.adaptation);
    const chip = document.createElement("button");
    chip.className = "sport-adaptation-chip";
    chip.type = "button";
    chip.setAttribute("aria-label", `Séance adaptée. ${headline}. Voir pourquoi.`);
    chip.title = "Voir pourquoi cette séance a été adaptée";
    chip.innerHTML = `
      <span aria-hidden="true">⚙️</span>
      <strong>Séance adaptée</strong>
      <small>${headline}</small>
      <span class="sport-adaptation-chip-more" aria-hidden="true">›</span>
    `;

    chip.addEventListener("click", Sport.openAdaptiveCoachDetails);
    shell.querySelector(".guided-session-header")?.insertAdjacentElement("afterend", chip);
  };


  // ------------------------------------------------------------
  // V6.5 - Familier vivant dans la séance guidée
  // ------------------------------------------------------------

  Sport.familiarMessageBanks = {
  "familier-01": {
    "idle": [
      "Batraglyphe gonfle la gorge et marque tranquillement le rythme de la séance.",
      "Un petit bond de Batraglyphe, puis un autre : il semble compter tes efforts à sa façon.",
      "Batraglyphe reste bas sur ses pattes, attentif, prêt à bondir avec toi vers l’exercice suivant.",
      "Le regard rond de Batraglyphe ne te lâche pas. Visiblement, pas question de sécher cette étape."
    ],
    "happy": [
      "Batraglyphe fait un bond victorieux et manque de transformer la séance en concours de grenouilles.",
      "Un croassement satisfait : Batraglyphe valide clairement cette étape.",
      "Batraglyphe rebondit sur place, beaucoup trop fier de ce que tu viens de faire.",
      "La gorge de Batraglyphe se gonfle comme un petit tambour de victoire."
    ],
    "victory": [
      "Batraglyphe enchaîne trois bonds triomphants. Pour lui, cette séance mérite une mare entière d’applaudissements.",
      "Batraglyphe se pose enfin, très digne, avec l’air d’avoir personnellement supervisé toute la séance.",
      "Un dernier croassement solennel : Batraglyphe proclame la quête accomplie.",
      "Batraglyphe trône fièrement à tes côtés. La victoire a manifestement bon goût."
    ]
  },
  "familier-02": {
    "idle": [
      "Plumérion observe chacun de tes mouvements avec le sérieux d’un vieux maître de bibliothèque.",
      "Plumérion incline la tête. Rien ne lui échappe, pas même la répétition un peu moins propre.",
      "Les grands yeux de Plumérion suivent ton rythme pendant qu’il garde ses ailes parfaitement immobiles.",
      "Plumérion veille en silence. Son regard dit très clairement : continue, je compte."
    ],
    "happy": [
      "Plumérion ébouriffe ses plumes avec satisfaction. Étape approuvée.",
      "Un petit hululement grave de Plumérion accompagne ta validation.",
      "Plumérion ferme les yeux une seconde, comme un professeur satisfait d’une bonne réponse.",
      "Les ailes de Plumérion s’entrouvrent : c’est son équivalent d’une ovation."
    ],
    "victory": [
      "Plumérion déploie ses ailes avec majesté. La séance peut être classée dans les réussites du jour.",
      "Plumérion pousse un hululement victorieux et reprend aussitôt son air savant.",
      "Plumérion te fixe avec une gravité comique : selon lui, cette victoire était parfaitement prévisible.",
      "Plumérion lisse une plume puis te regarde. Dossier clôturé : séance réussie."
    ]
  },
  "familier-03": {
    "idle": [
      "Flambis trottine autour de toi, la queue vive comme une flamme qui refuse de rester tranquille.",
      "Flambis te précède de deux pas puis se retourne : manifestement, tu es prié de suivre.",
      "Les oreilles de Flambis se dressent à chaque nouvel exercice. La curiosité le tient aussi bien que toi.",
      "Flambis tourne autour de la séance avec l’air de chercher le raccourci le plus élégant vers la réussite."
    ],
    "happy": [
      "Flambis fait claquer sa queue dans l’air et bondit de côté, ravi de cette étape.",
      "Un petit tour sur lui-même : Flambis estime que ça mérite clairement une célébration.",
      "Flambis te lance un regard brillant avant de repartir d’un pas léger. Bien joué.",
      "La queue de Flambis frétille si vite qu’elle pourrait presque servir de ventilateur."
    ],
    "victory": [
      "Flambis bombe le poitrail comme s’il avait déjoué un piège particulièrement compliqué. Séance gagnée.",
      "Flambis fait un dernier cercle autour de toi puis s’assied, satisfait de son expédition.",
      "La queue de Flambis se dresse comme une bannière : victoire propre et nette.",
      "Flambis te regarde avec son petit air rusé. Il savait évidemment depuis le début que tu finirais."
    ]
  },
  "familier-04": {
    "idle": [
      "Noxplume reste perché tout près, silencieux, et semble compter les répétitions mieux que toi.",
      "Noxplume penche la tête et suit ton mouvement avec une attention presque inquiétante.",
      "Une plume noire tombe doucement tandis que Noxplume surveille la suite de la séance.",
      "Noxplume garde le poste d’observation. Rien ne passe sous son bec sans être remarqué."
    ],
    "happy": [
      "Noxplume claque du bec deux fois. Dans son langage, c’est pratiquement une standing ovation.",
      "Un croassement bref de Noxplume ponctue la validation comme un sceau officiel.",
      "Noxplume ouvre les ailes puis les replie aussitôt, satisfait de ton avancée.",
      "Noxplume récupère une petite plume brillante et la dépose près de toi comme trophée improvisé."
    ],
    "victory": [
      "Noxplume lance un grand croassement et prend de la hauteur. La quête est officiellement close.",
      "Noxplume reste perché au-dessus de toi comme une sombre bannière de victoire.",
      "Noxplume te regarde longuement puis incline la tête. Approbation accordée.",
      "Un battement d’ailes noir traverse l’écran : Noxplume célèbre la séance à sa manière."
    ]
  },
  "familier-05": {
    "idle": [
      "Bravouf trotte à côté de toi avec l’enthousiasme de quelqu’un qui pense que chaque exercice est une promenade.",
      "Bravouf te regarde, queue battante. Pour lui, tu viens clairement de dire le mot magique : séance.",
      "Bravouf reste à tes pieds, prêt à repartir dès que tu bouges d’un centimètre.",
      "Les oreilles de Bravouf se redressent. Il est beaucoup trop motivé pour te laisser abandonner maintenant."
    ],
    "happy": [
      "Bravouf remue la queue à toute vitesse. Cette validation est officiellement la meilleure chose de sa journée.",
      "Bravouf fait un petit bond et revient aussitôt se coller à toi. Étape réussie, humain approuvé.",
      "Un jappement joyeux de Bravouf accompagne ton progrès.",
      "Bravouf tourne sur lui-même, incapable de contenir sa satisfaction."
    ],
    "victory": [
      "Bravouf fête la fin de séance comme ton retour après dix ans d’absence. Victoire totale.",
      "Bravouf se plante fièrement à côté de toi, queue haute : mission accomplie.",
      "Bravouf réclame visiblement une récompense pour son soutien moral absolument indispensable.",
      "Bravouf pose une patte près de toi. Équipe victorieuse, aucune discussion possible."
    ]
  },
  "familier-06": {
    "idle": [
      "Noctimaow s’étire longuement, puis te regarde comme si ton échauffement manquait encore de professionnalisme.",
      "Noctimaow s’installe à proximité avec l’air de ne pas s’intéresser du tout à toi. Il surveille pourtant chaque geste.",
      "Une oreille de Noctimaow pivote dans ta direction. Tu as donc toute son attention, ou presque.",
      "Noctimaow te laisse travailler pendant qu’il perfectionne l’art très exigeant de rester parfaitement posé."
    ],
    "happy": [
      "Noctimaow consent à ronronner. Tu peux considérer cela comme une excellente note.",
      "La queue de Noctimaow se redresse une seconde : validation acceptée.",
      "Noctimaow cligne lentement des yeux. Félicitations, tu viens d’obtenir son approbation officielle.",
      "Noctimaow se frotte brièvement contre toi puis retrouve aussitôt sa dignité."
    ],
    "victory": [
      "Noctimaow s’allonge de tout son long. Puisque tu as fini, il peut enfin commencer sa récupération à ta place.",
      "Noctimaow ronronne avec satisfaction devant cette séance correctement menée.",
      "Noctimaow te regarde comme si cette victoire était évidemment le résultat de ses conseils silencieux.",
      "Noctimaow replie les pattes sous lui. La quête est terminée, l’heure du repos est déclarée."
    ]
  },
  "familier-07": {
    "idle": [
      "Gribzouk ricane doucement et te suit de près. Il espère probablement que l’exercice devienne un peu plus chaotique.",
      "Gribzouk tapote du pied, impatient. La discipline n’est pas son fort, mais il adore l’action.",
      "Une petite étincelle court entre les doigts de Gribzouk pendant qu’il observe ta séance.",
      "Gribzouk te fait signe d’accélérer, puis prétend immédiatement n’avoir rien fait."
    ],
    "happy": [
      "Gribzouk bondit en ricanant. Une étape de plus, et aucune catastrophe : presque décevant pour lui.",
      "Une étincelle éclate au-dessus de Gribzouk. Il jure que c’était prévu pour célébrer.",
      "Gribzouk applaudit beaucoup trop fort pour un si petit diablotin.",
      "Gribzouk fait une grimace triomphante. Il semble très fier de votre petit complot contre la fatigue."
    ],
    "victory": [
      "Gribzouk lève les bras comme s’il venait personnellement de vaincre un démon majeur. Séance terminée.",
      "Une pluie de minuscules étincelles accompagne la danse de victoire très peu réglementaire de Gribzouk.",
      "Gribzouk ricane devant la fatigue vaincue. Pour une fois, le chaos a produit quelque chose de propre.",
      "Gribzouk s’incline théâtralement. Le spectacle est terminé, et il réclame déjà le rappel."
    ]
  },
  "familier-08": {
    "idle": [
      "Pyrolins laisse échapper un mince filet de fumée. Le moteur est chaud, à toi de jouer.",
      "Une petite flamme danse entre les crocs de Pyrolins pendant qu’il garde les yeux sur ton exercice.",
      "Pyrolins gratte le sol d’une griffe. Manifestement, il considère cette séance comme son territoire.",
      "Les écailles de Pyrolins prennent un léger éclat à mesure que tu avances."
    ],
    "happy": [
      "Pyrolins souffle une flammèche joyeuse. Rien n’a brûlé : excellente célébration.",
      "Les ailes de Pyrolins frémissent et une étincelle file dans l’air. Étape validée.",
      "Pyrolins pousse un petit grondement satisfait, beaucoup plus mignon qu’il ne voudrait l’admettre.",
      "Une lueur rouge court sur les écailles de Pyrolins. Ton progrès nourrit clairement sa flamme."
    ],
    "victory": [
      "Pyrolins lève la tête et crache une flamme triomphante. Voilà une fin de séance digne d’un dragon.",
      "Les ailes de Pyrolins se déploient comme une bannière brûlante : victoire.",
      "Pyrolins enroule sa queue près de toi, gardien satisfait d’une quête accomplie.",
      "Un grondement fier résonne dans la gorge de Pyrolins. Le trésor du jour, c’était cette séance terminée."
    ]
  },
  "familier-09": {
    "idle": [
      "Lunminelle avance doucement, ses branchies lumineuses ondulant au rythme de ta respiration.",
      "Une lueur pâle accompagne Lunminelle tandis qu’elle flotte presque autour de la séance.",
      "Lunminelle te suit avec ce calme étrange qui donne envie de ralentir juste assez pour mieux contrôler le mouvement.",
      "Les petites franges de Lunminelle frémissent. Elle semble parfaitement accordée à ton rythme."
    ],
    "happy": [
      "Lunminelle scintille un peu plus fort. Étape réussie, lumière gagnée.",
      "Une petite ondulation joyeuse parcourt Lunminelle après ta validation.",
      "Lunminelle fait un gracieux demi-tour, comme une vague miniature satisfaite.",
      "Les branchies de Lunminelle brillent doucement : elle approuve cette avancée."
    ],
    "victory": [
      "Lunminelle diffuse une lumière douce autour de toi. La séance se termine dans un calme presque lunaire.",
      "Lunminelle tourne lentement près de toi, auréolée d’un éclat de victoire.",
      "Une dernière lueur traverse Lunminelle : quête terminée, énergie apaisée.",
      "Lunminelle se pose tout près, lumineuse et tranquille. Belle fin de séance."
    ]
  },
  "familier-10": {
    "idle": [
      "Calmabulle avance à son rythme, parfaitement convaincu que la précipitation est une invention inutile.",
      "Calmabulle te regarde avec une sérénité désarmante. Respire, fais le mouvement, puis le suivant.",
      "Rien ne semble pouvoir perturber Calmabulle, pas même ton exercice le moins apprécié.",
      "Calmabulle reste près de toi avec l’énergie tranquille d’un compagnon qui sait que tu vas y arriver."
    ],
    "happy": [
      "Calmabulle remue doucement les oreilles. Chez lui, c’est déjà une explosion de joie.",
      "Un petit pas satisfait de Calmabulle suffit à célébrer cette étape.",
      "Calmabulle se rapproche tranquillement. Validation acceptée, niveau de sérénité inchangé.",
      "Calmabulle semble sourire. Ou alors il est simplement capybara. Dans les deux cas, bien joué."
    ],
    "victory": [
      "Calmabulle s’installe paisiblement à côté de toi. La séance est finie, le monde peut recommencer à tourner doucement.",
      "Calmabulle contemple la victoire avec la même sérénité qu’un étang sans vent.",
      "Aucune fanfare pour Calmabulle. Juste ce regard tranquille qui dit : tu l’as fait.",
      "Calmabulle se pose enfin. La meilleure récompense après l’effort reste manifestement de ne plus se presser."
    ]
  },
  "familier-11": {
    "idle": [
      "Sylvanelle avance avec légèreté, attentive au moindre changement de ton rythme.",
      "Les oreilles de Sylvanelle bougent doucement tandis qu’elle garde une présence calme à tes côtés.",
      "Sylvanelle semble ouvrir un sentier invisible devant toi : un exercice, puis le suivant.",
      "Le pas souple de Sylvanelle donne à la séance un petit parfum de clairière."
    ],
    "happy": [
      "Sylvanelle relève fièrement la tête. Cette étape mérite son approbation.",
      "Un léger bond de Sylvanelle accompagne ta validation.",
      "Sylvanelle gratte doucement le sol puis reprend sa place, visiblement satisfaite.",
      "Les bois de Sylvanelle captent la lumière un instant : joli progrès."
    ],
    "victory": [
      "Sylvanelle se tient droite à tes côtés, noble et calme. Le chemin du jour est parcouru.",
      "Sylvanelle fait quelques pas légers autour de toi avant de s’arrêter, mission accomplie.",
      "Une présence paisible entoure Sylvanelle. La séance est terminée, la forêt peut se rendormir.",
      "Sylvanelle incline la tête devant ta victoire, avec toute l’élégance d’un gardien des bois."
    ]
  },
  "familier-12": {
    "idle": [
      "Crépuskule reste suspendu tout près, les oreilles aux aguets et le monde à l’envers.",
      "Crépuskule émet un petit clic et semble cartographier chacun de tes mouvements par écho.",
      "Un battement d’ailes discret de Crépuskule accompagne le début de cette nouvelle étape.",
      "Crépuskule suit ton rythme depuis son perchoir. Même dans l’ombre, il ne perd rien de la séance."
    ],
    "happy": [
      "Crépuskule fait un petit tour aérien après ta validation. Écho positif reçu.",
      "Un cri aigu de Crépuskule résonne comme une minuscule fanfare nocturne.",
      "Crépuskule bat rapidement des ailes, ravi de ton avancée.",
      "Crépuskule se repose une seconde puis repart : pour lui, cette étape mérite clairement un vol d’honneur."
    ],
    "victory": [
      "Crépuskule décrit un grand cercle au-dessus de toi. La séance s’achève sous de bons auspices nocturnes.",
      "Un dernier écho de Crépuskule confirme la nouvelle : victoire complète.",
      "Crépuskule replie ses ailes avec satisfaction. Tout est calme, tout est validé.",
      "Crépuskule retrouve son perchoir, tête en bas et mission accomplie."
    ]
  },
  "familier-13": {
    "idle": [
      "Corneliot fixe l’exercice avec l’air d’envisager sérieusement de lui donner un coup de corne.",
      "Corneliot gratte le sol. Pour lui, tout obstacle est probablement une petite montagne à escalader.",
      "La barbiche de Corneliot frémit tandis qu’il attend la prochaine répétition.",
      "Corneliot reste juste assez près pour te rappeler qu’abandonner serait mauvais pour ton honneur montagnard."
    ],
    "happy": [
      "Corneliot bondit sur place avec une énergie franchement excessive. Étape validée.",
      "Un petit coup de sabot de Corneliot ponctue ta réussite.",
      "Corneliot secoue fièrement ses cornes. Voilà qui grimpe dans la bonne direction.",
      "Corneliot te pousse presque du museau vers l’exercice suivant. Il a apprécié, visiblement."
    ],
    "victory": [
      "Corneliot se dresse comme au sommet d’un pic imaginaire. La séance est conquise.",
      "Corneliot frappe le sol puis relève la tête, champion autoproclamé de cette ascension sportive.",
      "Un dernier bond de Corneliot célèbre la victoire avant qu’il ne retrouve son sérieux.",
      "Corneliot contemple la séance terminée avec l’air d’avoir gravi une montagne entière."
    ]
  },
  "familier-14": {
    "idle": [
      "Grisvent marche près de toi d’un pas régulier, concentré et silencieux.",
      "Grisvent garde les yeux devant. Pas de détour, pas de dispersion : la séance continue.",
      "Le souffle calme de Grisvent accompagne ton rythme comme une cadence de marche.",
      "Grisvent reste en alerte à tes côtés, compagnon sérieux pour une séance sérieuse."
    ],
    "happy": [
      "Grisvent remue brièvement la queue. Une petite récompense rare, donc précieuse.",
      "Grisvent te donne un léger coup de museau : étape reconnue.",
      "Les oreilles de Grisvent se dressent après ta validation. Il est prêt pour la suite.",
      "Grisvent fait deux pas rapides autour de toi puis reprend sa place, satisfait."
    ],
    "victory": [
      "Grisvent s’assied à tes côtés, calme et fier. La meute a terminé sa mission.",
      "Grisvent relève la tête et pousse un bref appel de victoire.",
      "Un regard de Grisvent suffit : parcours terminé, travail propre.",
      "Grisvent reste près de toi après l’effort, gardien silencieux d’une séance réussie."
    ]
  },
  "familier-15": {
    "idle": [
      "Grandcrocs ne bouge presque pas. Il économise son énergie et juge probablement que tu devrais faire pareil entre deux séries.",
      "Les yeux de Grandcrocs restent fixés sur toi, patients et impassibles.",
      "Grandcrocs avance lentement, mais chaque pas semble annoncer qu’il ne compte pas lâcher la séance.",
      "Un battement de queue lourd de Grandcrocs ponctue ton rythme. Pas besoin de se presser pour être redoutable."
    ],
    "happy": [
      "Grandcrocs entrouvre la mâchoire dans ce qui ressemble dangereusement à un sourire satisfait.",
      "Un coup de queue de Grandcrocs accompagne ta validation. Le sol aussi l’a sentie passer.",
      "Grandcrocs cligne lentement des yeux. Approbation crocodilienne obtenue.",
      "Grandcrocs avance d’un pas, puis s’immobilise. C’est peu, mais venant de lui, c’est une fête."
    ],
    "victory": [
      "Grandcrocs reste immobile devant la séance vaincue. La patience a encore gagné.",
      "Un claquement sec des mâchoires de Grandcrocs marque la fin de la quête.",
      "Grandcrocs s’allonge lourdement. Travail terminé, marais sécurisé.",
      "Le regard de Grandcrocs dit tout : tu as tenu jusqu’au bout, comme un vrai prédateur de canapé."
    ]
  },
  "familier-16": {
    "idle": [
      "Noiselys file d’un côté à l’autre, occupé à stocker une quantité absurde d’énergie pour la suite.",
      "Noiselys serre quelque chose d’invisible entre ses pattes et semble compter tes répétitions comme des noisettes.",
      "La queue de Noiselys frémit sans arrêt. Difficile de rester immobile avec autant d’enthousiasme.",
      "Noiselys grimpe, redescend et revient près de toi. Toi aussi, tu peux faire encore une série."
    ],
    "happy": [
      "Noiselys fait un bond de côté comme s’il venait de découvrir une réserve secrète de noisettes.",
      "Une petite danse nerveuse de Noiselys célèbre ta validation.",
      "Noiselys agite sa queue en panache. Cette étape rejoint immédiatement son stock de bonnes nouvelles.",
      "Noiselys te regarde, ravi, puis repart déjà inspecter la suite."
    ],
    "victory": [
      "Noiselys se pose enfin une seconde. Exploit remarquable : la séance est finie et l’écureuil aussi s’arrête.",
      "Noiselys bombe le torse avec la fierté d’un gardien de trésor. Aujourd’hui, le trésor, c’est la séance terminée.",
      "La grande queue de Noiselys se dresse comme un drapeau de victoire.",
      "Noiselys fait un dernier tour rapide avant de déclarer, à sa façon, le stock d’efforts complet."
    ]
  },
  "familier-17": {
    "idle": [
      "Piquelune avance à petits pas décidés. Pas besoin d’être grand pour être tenace.",
      "Piquelune renifle l’air et reste près de toi, ses piquants parfaitement rangés.",
      "Piquelune se roule presque en boule, puis se ravise : la séance n’est pas finie.",
      "Le petit museau de Piquelune suit chacun de tes mouvements avec une concentration appliquée."
    ],
    "happy": [
      "Piquelune frétille de tout son petit corps. Étape franchie sans sortir les piquants.",
      "Un minuscule bond de Piquelune accompagne ta validation.",
      "Piquelune tourne sur lui-même, très fier et légèrement hérissé de joie.",
      "Les piquants de Piquelune semblent presque briller. Joli progrès."
    ],
    "victory": [
      "Piquelune se met en boule une seconde, puis ressort le museau : victoire confirmée.",
      "Piquelune trottine fièrement à tes côtés. Petite taille, grande séance.",
      "Un dernier frémissement de piquants célèbre la fin de la quête.",
      "Piquelune s’installe enfin près de toi, satisfait d’avoir piqué la fatigue au bon endroit."
    ]
  },
  "familier-18": {
    "idle": [
      "Griffonus se tient droit à tes côtés, ailes repliées et regard noble.",
      "Un souffle puissant soulève quelques plumes de Griffonus pendant qu’il observe ton effort.",
      "Griffonus gratte le sol d’une serre. La prochaine étape semble déjà trop petite pour lui.",
      "Le regard de Griffonus reste fixé devant. Cette séance a des allures de chevauchée héroïque."
    ],
    "happy": [
      "Griffonus déploie brièvement ses ailes après ta validation. Beau passage.",
      "Un cri fier de Griffonus salue ton avancée.",
      "Griffonus frappe le sol d’une serre puis relève la tête, satisfait.",
      "Les plumes de Griffonus frémissent dans un souffle d’enthousiasme contenu."
    ],
    "victory": [
      "Griffonus déploie ses ailes dans toute leur ampleur. Cette séance mérite une vraie entrée triomphale.",
      "Un grand cri de Griffonus annonce la fin victorieuse de la quête.",
      "Griffonus se tient près de toi comme une monture héroïque attendant le retour au château.",
      "Griffonus incline fièrement la tête. Voyage terminé, honneur intact."
    ]
  },
  "familier-19": {
    "idle": [
      "Eukalyptus s’accroche confortablement et te regarde travailler avec une sérénité presque provocante.",
      "Eukalyptus bâille discrètement. Il soutient ton effort, mais pas au point de renoncer à son art de vivre.",
      "Eukalyptus ajuste sa prise et te suit du regard. Lent ne veut pas dire absent.",
      "Le calme d’Eukalyptus rappelle qu’une séance n’a pas besoin d’être frénétique pour compter."
    ],
    "happy": [
      "Eukalyptus remue les oreilles avec satisfaction. C’est une réaction très énergique selon ses standards.",
      "Un petit mouvement de patte d’Eukalyptus accompagne ta validation.",
      "Eukalyptus te regarde avec un air paisiblement approbateur. Étape réussie.",
      "Eukalyptus se redresse un peu, puis décide que c’était déjà beaucoup d’émotion pour aujourd’hui."
    ],
    "victory": [
      "Eukalyptus ferme les yeux avec bonheur. Tu as fini, il peut enfin récupérer de ton effort.",
      "Eukalyptus s’installe confortablement. Séance terminée, repos hautement recommandé par le koala.",
      "Un dernier regard satisfait d’Eukalyptus confirme la victoire avant la sieste.",
      "Eukalyptus serre sa branche imaginaire et semble penser que tu as bien mérité la tienne."
    ]
  },
  "familier-20": {
    "idle": [
      "Bondonyx trépigne déjà. Il aimerait probablement faire trois exercices pendant que tu en fais un.",
      "Les oreilles de Bondonyx restent dressées, prêtes à capter le moindre signal de départ.",
      "Bondonyx fait deux petits bonds d’impatience puis s’arrête juste assez longtemps pour te regarder.",
      "Bondonyx semble considérer chaque exercice comme une ligne de départ. À toi de suivre le rythme."
    ],
    "happy": [
      "Bondonyx bondit haut après ta validation. Son nom n’était manifestement pas une publicité mensongère.",
      "Les oreilles de Bondonyx se dressent encore plus. Oui, c’est apparemment possible.",
      "Bondonyx enchaîne trois petits sauts de joie autour de toi.",
      "Un rapide demi-tour de Bondonyx célèbre cette étape avant la suivante."
    ],
    "victory": [
      "Bondonyx réalise un dernier bond spectaculaire. Ligne d’arrivée franchie.",
      "Bondonyx se pose enfin, oreilles hautes et regard fier. Course terminée.",
      "Une petite rafale de bonds annonce la victoire selon le protocole officiel de Bondonyx.",
      "Bondonyx reste près de toi, encore prêt à repartir alors que la séance est déjà gagnée."
    ]
  },
  "familier-21": {
    "idle": [
      "Etoilys avance dans un léger éclat, transformant presque l’exercice en rituel enchanté.",
      "La corne d’Etoilys capte une lueur douce pendant qu’elle suit ton mouvement.",
      "Etoilys reste près de toi avec une élégance irréprochable, même quand l’exercice l’est beaucoup moins.",
      "Quelques étincelles pâles suivent les pas d’Etoilys. La séance gagne soudain un peu de magie."
    ],
    "happy": [
      "Etoilys fait jaillir une petite pluie d’étincelles après ta validation.",
      "La crinière d’Etoilys semble briller davantage. Étape enchantée avec succès.",
      "Etoilys incline doucement la tête et une lueur court le long de sa corne.",
      "Quelques étoiles minuscules apparaissent autour d’Etoilys avant de disparaître. Joli passage."
    ],
    "victory": [
      "Etoilys illumine un instant toute la fin de séance. Victoire digne d’une légende.",
      "Une traînée d’étincelles accompagne Etoilys tandis qu’elle célèbre la quête accomplie.",
      "Etoilys se tient fièrement près de toi, lumineuse et calme. Le sort est complet.",
      "La corne d’Etoilys brille une dernière fois : séance achevée, enchantement réussi."
    ]
  },
  "familier-22": {
    "idle": [
      "Silverine glisse joyeusement autour de toi, comme si chaque exercice pouvait devenir un jeu d’eau.",
      "Silverine se roule presque sur le dos avant de se rappeler qu’elle est censée t’accompagner sérieusement.",
      "Les moustaches de Silverine frémissent tandis qu’elle suit ton rythme avec curiosité.",
      "Silverine reste près de toi, vive et légère, prête à transformer la moindre pause en pirouette."
    ],
    "happy": [
      "Silverine fait une petite pirouette de joie après ta validation.",
      "Un mouvement rapide de Silverine ressemble beaucoup à un applaudissement de loutre.",
      "Silverine bondit et retombe avec l’air ravi. Étape réussie, jeu gagné.",
      "Silverine te regarde, moustaches frémissantes, très satisfaite de cette avancée."
    ],
    "victory": [
      "Silverine célèbre la fin de séance avec une série de roulades parfaitement inutiles et donc indispensables.",
      "Silverine s’étire puis se rapproche, heureuse de cette quête terminée.",
      "Une dernière pirouette de Silverine signe la victoire avec panache.",
      "Silverine semble déjà chercher où ranger cette nouvelle réussite parmi ses trésors préférés."
    ]
  },
  "familier-23": {
    "idle": [
      "Moumoute avance doucement à côté de toi, nuage de laine très sérieux dans sa mission d’accompagnement.",
      "Moumoute te suit sans se presser. La régularité, visiblement, peut aussi être très moelleuse.",
      "Un petit bêlement de Moumoute ponctue le début de l’exercice.",
      "Moumoute reste tout près, paisible, avec l’air de considérer que tu t’en sors plutôt bien."
    ],
    "happy": [
      "Moumoute fait un petit saut qui secoue toute sa laine. Étape validée avec rebond.",
      "Un bêlement joyeux de Moumoute accompagne ta réussite.",
      "Moumoute se rapproche et secoue la tête, manifestement ravie.",
      "La laine de Moumoute frémit dans un petit bond de satisfaction."
    ],
    "victory": [
      "Moumoute s’installe près de toi comme un trophée particulièrement confortable. Séance terminée.",
      "Un dernier bêlement triomphant de Moumoute annonce la victoire.",
      "Moumoute semble deux fois plus moelleuse maintenant que la quête est accomplie.",
      "Moumoute te regarde calmement. Tu as fini, elle approuve, tout est doux dans le royaume."
    ]
  },
  "familier-24": {
    "idle": [
      "Bamboulys avance avec une force tranquille, sans gaspiller un gramme d’énergie.",
      "Bamboulys te regarde comme s’il évaluait si cet exercice mérite une pause bambou ensuite.",
      "Un pas lourd mais calme de Bamboulys accompagne ton rythme.",
      "Bamboulys reste à côté de toi, solide et posé. La séance peut venir."
    ],
    "happy": [
      "Bamboulys lève les pattes avec enthousiasme. Étape approuvée par le conseil du bambou.",
      "Un petit balancement joyeux de Bamboulys suit ta validation.",
      "Bamboulys semble soudain beaucoup plus réveillé. C’est dire si l’étape était réussie.",
      "Bamboulys te donne un regard satisfait avant de reprendre son calme légendaire."
    ],
    "victory": [
      "Bamboulys s’assied avec dignité. Séance finie, bambou imaginaire mérité.",
      "Un grand étirement de Bamboulys célèbre la victoire mieux qu’une fanfare.",
      "Bamboulys reste près de toi, massif et paisible. La quête est dans la poche.",
      "Bamboulys hoche lentement la tête. Travail accompli, énergie bien dépensée."
    ]
  },
  "familier-25": {
    "idle": [
      "Vifroux grimpe presque partout sauf là où il devrait rester, mais garde toujours un œil sur ta séance.",
      "La longue queue de Vifroux oscille pendant qu’il observe ton prochain mouvement.",
      "Vifroux se déplace avec agilité autour de toi, curieux de voir jusqu’où tu vas aller.",
      "Vifroux s’installe un instant en hauteur, parfait petit guetteur de progression."
    ],
    "happy": [
      "Vifroux bondit avec souplesse après ta validation. Étape franchie avec style.",
      "La queue de Vifroux dessine un grand arc de satisfaction dans l’air.",
      "Vifroux fait une petite course circulaire avant de revenir près de toi.",
      "Un regard vif de Vifroux accompagne ta réussite. Il est clairement partant pour la suite."
    ],
    "victory": [
      "Vifroux se perche fièrement pour contempler la séance terminée.",
      "La grande queue de Vifroux se dresse comme un panache de victoire.",
      "Vifroux bondit une dernière fois puis se pose, mission accomplie.",
      "Vifroux te regarde depuis son perchoir imaginaire. Beau parcours, belle arrivée."
    ]
  },
  "familier-26": {
    "idle": [
      "Nuagelle marche avec légèreté, comme si le sol n’avait qu’une importance toute relative.",
      "Les ailes de Nuagelle frémissent doucement pendant qu’elle accompagne ton rythme.",
      "Nuagelle relève la tête et semble déjà voir la fin de la séance au-delà des nuages.",
      "Un souffle léger accompagne Nuagelle à tes côtés. Continue, l’horizon se rapproche."
    ],
    "happy": [
      "Nuagelle entrouvre les ailes et soulève un petit souffle de victoire.",
      "Un mouvement gracieux de Nuagelle accompagne ta validation.",
      "La crinière de Nuagelle semble flotter un instant. Belle étape.",
      "Nuagelle piaffe légèrement, prête à prendre de la hauteur avec toi."
    ],
    "victory": [
      "Nuagelle déploie ses ailes comme si la séance venait d’ouvrir tout le ciel.",
      "Un souffle clair entoure Nuagelle. La quête est terminée, cap sur les nuages.",
      "Nuagelle se cabre légèrement, fière de cette arrivée victorieuse.",
      "Les ailes de Nuagelle se replient doucement. Vol terminé, objectif atteint."
    ]
  },
  "familier-27": {
    "idle": [
      "Fireflam laisse tomber une petite braise qui s’éteint avant de toucher le sol. L’énergie monte.",
      "Les plumes de Fireflam ondulent comme de petites flammes pendant qu’il veille sur ta séance.",
      "Fireflam garde une chaleur régulière à tes côtés. Pas besoin d’incendie, juste d’un bon effort.",
      "Une lueur orange parcourt Fireflam au rythme de tes mouvements."
    ],
    "happy": [
      "Fireflam secoue ses ailes et libère quelques étincelles de joie.",
      "Une flamme vive traverse le plumage de Fireflam après ta validation.",
      "Fireflam pousse un cri clair et lumineux. Étape franchie.",
      "Les braises autour de Fireflam dansent un instant, ravies de ton progrès."
    ],
    "victory": [
      "Fireflam s’embrase sans brûler, magnifique signature pour une séance terminée.",
      "Un cercle d’étincelles accompagne Fireflam tandis qu’il célèbre ta victoire.",
      "Fireflam déploie ses ailes ardentes. Fatigue consommée, énergie renouvelée.",
      "La flamme de Fireflam se calme peu à peu. La quête renaît demain, mais celle-ci est gagnée."
    ]
  },
  "familier-28": {
    "idle": [
      "Ondinou avance en se dandinant avec une bonne humeur totalement incompatible avec la gravité de l’entraînement.",
      "Ondinou te regarde avec de grands yeux ronds, prêt à applaudir avec ses nageoires à la moindre occasion.",
      "Un petit mouvement de nageoire d’Ondinou semble te donner le départ.",
      "Ondinou reste près de toi, tranquille et rebondi, excellent antidote à une séance trop sérieuse."
    ],
    "happy": [
      "Ondinou applaudit avec ses nageoires. C’est bruyant, maladroit et absolument parfait.",
      "Un petit bond d’Ondinou accompagne ta validation.",
      "Ondinou se dandine de joie après cette étape réussie.",
      "Les moustaches d’Ondinou frémissent tandis qu’il te lance son regard le plus enthousiaste."
    ],
    "victory": [
      "Ondinou applaudit si fort avec ses nageoires qu’il mérite presque des XP lui aussi.",
      "Un dernier dandinement triomphant d’Ondinou conclut la séance.",
      "Ondinou s’allonge avec satisfaction. La plage de récupération est officiellement ouverte.",
      "Ondinou te regarde, ravi. Mission accomplie, poisson imaginaire non requis."
    ]
  },
  "familier-29": {
    "idle": [
      "Masquille observe la séance derrière son masque naturel avec l’air de préparer un coup parfaitement légal.",
      "Les petites pattes de Masquille inspectent tout ce qui passe à portée. Ton attention comprise.",
      "Masquille reste près de toi, curieux et beaucoup trop intéressé par les objets autour.",
      "Un regard vif de Masquille suit tes mouvements. Il semble chercher où tu caches les répétitions restantes."
    ],
    "happy": [
      "Masquille lève les pattes comme s’il venait de réussir le casse du siècle. Étape validée.",
      "Un petit bond de Masquille accompagne ta réussite, suivi d’une inspection immédiate des alentours.",
      "Masquille se frotte les pattes avec satisfaction. Beau travail d’équipe.",
      "La queue rayée de Masquille frétille. Cette validation rejoint son butin moral."
    ],
    "victory": [
      "Masquille bombe le torse comme s’il avait volé la victoire sous le nez de la fatigue.",
      "Masquille inspecte la séance terminée puis semble conclure qu’il n’y a plus rien à récupérer. Beau travail.",
      "La queue de Masquille se dresse fièrement : opération réussie.",
      "Masquille s’installe près de toi, très satisfait du butin du jour : une quête complète."
    ]
  },
  "familier-30": {
    "idle": [
      "Fiolys trottine tout près, minuscule mais concentrée comme si la séance dépendait entièrement d’elle.",
      "Les moustaches de Fiolys frémissent pendant qu’elle suit ton rythme avec une attention méticuleuse.",
      "Fiolys se dresse sur ses pattes arrière pour mieux voir l’exercice en cours.",
      "Un petit pas rapide de Fiolys accompagne chaque nouvelle étape. Taille réduite, présence maximale."
    ],
    "happy": [
      "Fiolys fait un minuscule bond de joie. Il fallait être attentif pour le voir, mais il était splendide.",
      "Les moustaches de Fiolys vibrent à toute vitesse après ta validation.",
      "Fiolys tourne sur elle-même et repart aussitôt, ravie de ton progrès.",
      "Un petit couinement satisfait de Fiolys ponctue cette étape réussie."
    ],
    "victory": [
      "Fiolys se dresse fièrement. Toute petite silhouette, très grande victoire.",
      "Un dernier tour rapide de Fiolys célèbre la séance terminée.",
      "Fiolys s’installe près de toi avec l’air d’avoir déplacé une montagne à l’échelle souris.",
      "Les moustaches de Fiolys frémissent une dernière fois. Quête accomplie, miettes de gloire partout."
    ]
  },
  "familier-31": {
    "idle": [
      "Carapazur avance lentement mais sûrement. Impossible de lui expliquer le concept d’abandon.",
      "Carapazur garde son cap sans se presser. Une répétition après l’autre suffit largement.",
      "La carapace de Carapazur semble parfaitement immobile, mais ses petites pattes continuent d’avancer.",
      "Carapazur te rappelle silencieusement qu’une progression lente reste une progression."
    ],
    "happy": [
      "Carapazur allonge le cou avec satisfaction. Cette étape est officiellement derrière vous.",
      "Un petit mouvement de patte de Carapazur célèbre ta validation avec une sobriété exemplaire.",
      "Carapazur accélère presque. Enfin, selon les standards d’une tortue enthousiaste.",
      "Carapazur relève fièrement la tête. Joli pas en avant."
    ],
    "victory": [
      "Carapazur atteint tranquillement la ligne d’arrivée. Comme prévu, la patience gagne encore.",
      "Carapazur s’immobilise avec majesté. Séance terminée, carapace intacte, mission réussie.",
      "Un dernier pas de Carapazur suffit à conclure la quête. Lentement, sûrement, complètement.",
      "Carapazur rentre presque la tête dans sa carapace. Pas pour fuir : pour savourer la victoire au calme."
    ]
  }
};

  Sport.getFamiliarCompanionMessage = function getFamiliarCompanionMessage(familiar, mood, session) {
    const bank = Sport.familiarMessageBanks?.[familiar?.id] || null;
    const messages = Array.isArray(bank?.[mood]) ? bank[mood] : [];

    if (!messages.length) {
      return `${familiar?.name || "Ton familier"} reste près de toi pendant la séance.`;
    }

    const completedCount = Number(State.getProgramSessionCompletedCount?.() || 0);
    const sessionSeed = String(session?.id || session?.startedAt || session?.programId || "session");
    const familiarSeed = String(familiar?.id || "familiar");
    let baseIndex = 0;

    for (const char of `${sessionSeed}|${familiarSeed}`) {
      baseIndex = (baseIndex * 31 + char.charCodeAt(0)) >>> 0;
    }

    const moodOffset = mood === "victory" ? 2 : mood === "happy" ? 1 : 0;
    const index = (baseIndex + completedCount + moodOffset) % messages.length;
    const message = messages[index];

    if (session?.type === "program-boss" && mood === "idle") {
      return `Face au Boss, ${message.charAt(0).toLowerCase()}${message.slice(1)}`;
    }

    return message;
  };

  Sport.renderGuidedFamiliarCompanion = function renderGuidedFamiliarCompanion() {
    const session = State.getActiveProgramSession?.();
    const shell = document.querySelector("#activeProgramSession");
    const familiar = window.FitnessRpgRewards?.getActiveFamiliar?.();

    shell?.querySelector(".guided-familiar-companion")?.remove();
    if (!session || !shell || !familiar) return;

    const info = window.FitnessRpgRewards?.getFamiliarLevelInfo?.(familiar.id) || {};
    const workout = Programs.getActiveProgramWorkout?.(session);
    const total = Array.isArray(workout?.exercises) ? workout.exercises.length : 0;
    const done = State.getProgramSessionCompletedCount?.() || 0;
    const complete = total > 0 && done >= total;
    const moodIsFresh = Number(session.familiarMoodUntil || 0) > Date.now();
    const mood = complete ? "victory" : moodIsFresh ? "happy" : "idle";

    const message = Sport.getFamiliarCompanionMessage(familiar, mood, session);

    const escape = Render.escapeHtml || ((value) => String(value ?? ""));
    const card = document.createElement("aside");
    card.className = `guided-familiar-companion familiar-state-${mood}`;
    card.setAttribute("aria-label", `Familier actif : ${familiar.name}`);
    card.innerHTML = `
      <div class="guided-familiar-portrait">
        <img src="${escape(familiar.image)}" alt="${escape(familiar.name)}">
        <span aria-hidden="true">${mood === "victory" ? "✨" : mood === "happy" ? "💛" : "🐾"}</span>
      </div>
      <div class="guided-familiar-copy">
        <small>Ton compagnon · Affinité ${Number(info.points || 0)}</small>
        <strong>${escape(familiar.name)}</strong>
        <p>${escape(message)}</p>
      </div>
      <span class="guided-familiar-level">Niv. ${Number(info.level || 1)}</span>
    `;

    const img = card.querySelector("img");
    Render.setSafeImage?.(img, familiar.image, familiar.image);
    shell.querySelector(".guided-progress-panel")?.insertAdjacentElement("afterend", card);
  };

  const originalRenderActiveProgramSession = Render.renderActiveProgramSession;
  if (typeof originalRenderActiveProgramSession === "function") {
    Render.renderActiveProgramSession = function renderAdaptiveProgramSession() {
      const result = originalRenderActiveProgramSession.apply(Render, arguments);
      Sport.renderAdaptationBadge();
      Sport.installGuidedPerformanceButton?.();
      Sport.renderLivingCoachCard?.();
      Sport.renderGuidedFamiliarCompanion?.();
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

  Sport.getExercisePerformanceKey = function getExercisePerformanceKey(exerciseId, exerciseKey = null) {
    return String(exerciseKey || exerciseId || "");
  };

  Sport.getSessionExercisePerformance = function getSessionExercisePerformance(session) {
    if (!session || typeof session !== "object") return {};

    if (!session.exercisePerformance || typeof session.exercisePerformance !== "object") {
      session.exercisePerformance = {};
    }

    return session.exercisePerformance;
  };

  Sport.getExerciseItemFromSession = function getExerciseItemFromSession(
    session,
    exerciseId,
    exerciseKey = null
  ) {
    const workout = Programs.getActiveProgramWorkout?.(session);
    const exercises = Array.isArray(workout?.exercises) ? workout.exercises : [];
    const key = Sport.getExercisePerformanceKey(exerciseId, exerciseKey);
    const indexMatch = key.match(/^(\d+)-/);
    const index = indexMatch ? Number(indexMatch[1]) : -1;

    if (Number.isInteger(index) && index >= 0 && exercises[index]) {
      return {
        item: exercises[index],
        index,
        workout
      };
    }

    const fallbackIndex = exercises.findIndex((item) => item?.exerciseId === exerciseId);

    return {
      item: fallbackIndex >= 0 ? exercises[fallbackIndex] : null,
      index: fallbackIndex,
      workout
    };
  };

  Sport.exerciseSupportsLoad = function exerciseSupportsLoad(definition, item = {}) {
    const category = String(definition?.categoryId || "").toLowerCase();
    const text = `${definition?.title || ""} ${item.exerciseId || ""}`.toLowerCase();

    if (["strength", "arms", "renforcement", "musculation"].includes(category)) {
      return true;
    }

    return [
      "squat",
      "goblet",
      "kettlebell",
      "haltère",
      "haltere",
      "curl",
      "rowing",
      "tirage",
      "développ",
      "developp",
      "press",
      "fente",
      "deadlift",
      "soulevé",
      "souleve"
    ].some((token) => text.includes(token));
  };

  Sport.getActualAmountStep = function getActualAmountStep(unit) {
    const normalized = String(unit || "").toLowerCase();
    if (["sec", "seconde", "secondes"].includes(normalized)) return 5;
    if (["min", "minute", "minutes"].includes(normalized)) return 1;
    return 1;
  };

  Sport.formatExerciseAmount = function formatExerciseAmount(amount, unit) {
    const value = Number(amount);
    if (!Number.isFinite(value)) return "—";
    return `${value} ${unit || ""}`.trim();
  };

  Sport.closeExercisePerformancePanel = function closeExercisePerformancePanel() {
    document.querySelector("#sportExercisePerformanceOverlay")?.remove();
    Sport.pendingExercisePerformance = null;
  };

  Sport.recordExercisePerformance = function recordExercisePerformance(options = {}) {
    const pending = Sport.pendingExercisePerformance;
    const session = State.getActiveProgramSession?.();

    if (!pending || !session) {
      Sport.closeExercisePerformancePanel();
      return null;
    }

    const actualValue = Number(options.actualAmount);
    const plannedValue = Number(pending.plannedAmount);
    const actualAmount = Number.isFinite(actualValue) && actualValue >= 0
      ? actualValue
      : plannedValue;
    const loadValue = Number(options.loadKg);
    const loadKg = Number.isFinite(loadValue) && loadValue > 0
      ? Math.round(loadValue * 10) / 10
      : null;

    const performance = Sport.getSessionExercisePerformance(session);
    performance[pending.exerciseKey] = {
      exerciseKey: pending.exerciseKey,
      exerciseId: pending.exerciseId,
      title: pending.title,
      order: pending.index + 1,
      phase: pending.phase || null,
      plannedAmount: plannedValue,
      actualAmount,
      unit: pending.unit || "",
      loadKg,
      recordedAt: State.nowIso?.() || new Date().toISOString(),
      recordingMode: "modified"
    };

    session.familiarMood = "happy";
    session.familiarMoodUntil = Date.now() + 2200;
    State.saveActiveProgramSession?.();

    const originalValidate = Sport.originalValidateProgramExercise;
    const exerciseId = pending.exerciseId;
    const exerciseKey = pending.exerciseKey;

    Sport.closeExercisePerformancePanel();

    if (typeof originalValidate === "function") {
      return originalValidate.call(Programs, exerciseId, exerciseKey);
    }

    return null;
  };

  Sport.openExercisePerformancePanel = function openExercisePerformancePanel(
    exerciseId,
    exerciseKey = null
  ) {
    const session = State.getActiveProgramSession?.();
    if (!session) return false;

    const resolved = Sport.getExerciseItemFromSession(session, exerciseId, exerciseKey);
    const item = resolved.item;
    if (!item) return false;

    const definition = Sport.getExerciseDefinition(item.exerciseId);
    const plannedAmount = Sport.getExerciseAmount(item);
    const unit = Sport.getExerciseUnit(item, definition);
    const key = Sport.getExercisePerformanceKey(item.exerciseId, exerciseKey || `${resolved.index}-${item.exerciseId}`);
    const performance = Sport.getSessionExercisePerformance(session);
    const existing = performance[key] || null;
    const actualAmount = Number.isFinite(Number(existing?.actualAmount))
      ? Number(existing.actualAmount)
      : Number(plannedAmount);
    const loadKg = Number.isFinite(Number(existing?.loadKg))
      ? Number(existing.loadKg)
      : "";
    const title = definition?.title || item.title || item.exerciseId || "Exercice";
    const supportsLoad = Sport.exerciseSupportsLoad(definition, item);
    const step = Sport.getActualAmountStep(unit);

    Sport.pendingExercisePerformance = {
      exerciseKey: key,
      exerciseId: item.exerciseId,
      title,
      index: resolved.index,
      phase: item.phase || null,
      plannedAmount: Number(plannedAmount),
      unit
    };

    document.querySelector("#sportExercisePerformanceOverlay")?.remove();

    const overlay = document.createElement("div");
    overlay.id = "sportExercisePerformanceOverlay";
    overlay.className = "sport-exercise-performance-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", `Performance réelle : ${title}`);
    overlay.innerHTML = `
      <section class="sport-exercise-performance-card">
        <header class="sport-exercise-performance-heading">
          <div>
            <p class="eyebrow">Performance réelle</p>
            <h3>${Render.escapeHtml?.(title) || title}</h3>
          </div>
          <button
            class="sport-exercise-performance-close icon-button"
            type="button"
            aria-label="Fermer sans valider"
          >×</button>
        </header>

        <div class="sport-performance-planned">
          <span>Prévu</span>
          <strong>${Sport.formatExerciseAmount(plannedAmount, unit)}</strong>
        </div>

        <label class="sport-performance-field">
          <span>Réalisé</span>
          <div class="sport-performance-number-input">
            <input
              id="sportActualAmountInput"
              type="number"
              min="0"
              step="${step}"
              value="${Number.isFinite(actualAmount) ? actualAmount : ""}"
              inputmode="decimal"
            >
            <small>${Render.escapeHtml?.(unit) || unit}</small>
          </div>
        </label>

        ${supportsLoad ? `
          <label class="sport-performance-field">
            <span>Charge <small>optionnelle</small></span>
            <div class="sport-performance-number-input">
              <input
                id="sportLoadKgInput"
                type="number"
                min="0"
                step="0.5"
                value="${loadKg}"
                placeholder="0"
                inputmode="decimal"
              >
              <small>kg</small>
            </div>
          </label>
        ` : ""}

        <div class="sport-exercise-performance-actions">
          <button class="sport-performance-as-planned secondary-btn" type="button">
            ✓ Comme prévu
          </button>
          <button class="sport-performance-save primary-btn" type="button">
            Enregistrer et continuer
          </button>
        </div>
      </section>
    `;

    document.body.appendChild(overlay);
    window.setTimeout(() => overlay.querySelector("#sportActualAmountInput")?.select?.(), 0);
    return true;
  };

  // V6.3.1 - Validation rapide : par défaut, on enregistre "comme prévu".
  // Le panneau de performance réelle ne s'ouvre que via le bouton Modifier.
  Sport.recordExerciseAsPlanned = function recordExerciseAsPlanned(exerciseId, exerciseKey = null) {
    const session = State.getActiveProgramSession?.();
    if (!session) return null;

    const resolved = Sport.getExerciseItemFromSession(session, exerciseId, exerciseKey);
    const item = resolved.item;
    if (!item) return null;

    const definition = Sport.getExerciseDefinition(item.exerciseId);
    const plannedAmount = Sport.getExerciseAmount(item);
    const unit = Sport.getExerciseUnit(item, definition);
    const key = Sport.getExercisePerformanceKey(
      item.exerciseId,
      exerciseKey || `${resolved.index}-${item.exerciseId}`
    );
    const title = definition?.title || item.title || item.exerciseId || "Exercice";
    const performance = Sport.getSessionExercisePerformance(session);

    performance[key] = {
      exerciseKey: key,
      exerciseId: item.exerciseId,
      title,
      order: resolved.index + 1,
      phase: item.phase || null,
      plannedAmount: Number(plannedAmount),
      actualAmount: Number(plannedAmount),
      unit: unit || "",
      loadKg: null,
      recordedAt: State.nowIso?.() || new Date().toISOString(),
      recordingMode: "as-planned"
    };

    State.saveActiveProgramSession?.();
    return performance[key];
  };

  // Intercepte uniquement la validation d'une séance guidée.
  // Le moteur historique reste la source de vérité pour marquer l'étape comme terminée.
  Sport.originalValidateProgramExercise = Programs.validateProgramExercise;
  if (typeof Sport.originalValidateProgramExercise === "function") {
    Programs.validateProgramExercise = function validateProgramExerciseWithActualPerformance(
      exerciseId,
      exerciseKey = null
    ) {
      Sport.recordExerciseAsPlanned(exerciseId, exerciseKey);

      const session = State.getActiveProgramSession?.();
      if (session) {
        session.familiarMood = "happy";
        session.familiarMoodUntil = Date.now() + 2200;
        State.saveActiveProgramSession?.();
      }

      return Sport.originalValidateProgramExercise.call(Programs, exerciseId, exerciseKey);
    };
  }

  // Ajoute le bouton Modifier entre Timer et Valider, sans toucher à app-render.js.
  Sport.installGuidedPerformanceButton = function installGuidedPerformanceButton() {
    const session = State.getActiveProgramSession?.();
    if (!session) return;

    const actions = document.querySelector(
      ".active-program-session .guided-action-dock, .active-program-session .program-session-actions"
    );
    if (!actions) return;

    const validateButton = actions.querySelector(".validate-program-exercise-btn");
    if (!validateButton || validateButton.disabled) return;

    const exerciseId = validateButton.dataset.exerciseId;
    const exerciseKey = validateButton.dataset.exerciseKey || "";
    if (!exerciseId) return;

    actions.classList.add("sport-performance-actions-enabled");

    let modifyButton = actions.querySelector(".sport-modify-performance-btn");
    if (!modifyButton) {
      modifyButton = document.createElement("button");
      modifyButton.type = "button";
      modifyButton.className = "ghost-btn sport-modify-performance-btn";
      modifyButton.innerHTML = `<span aria-hidden="true">✏️</span><span>Modifier</span>`;
      modifyButton.setAttribute("aria-label", "Modifier la performance réelle");
      modifyButton.setAttribute("title", "Modifier la quantité réalisée ou la charge");
      actions.insertBefore(modifyButton, validateButton);
    }

    modifyButton.dataset.exerciseId = exerciseId;
    modifyButton.dataset.exerciseKey = exerciseKey;
  };


  // ------------------------------------------------------------
  // V6.4 - Coach vivant pendant la séance guidée
  // ------------------------------------------------------------

  Sport.coachVoices = Object.freeze({
    korvan: Object.freeze({
      halfway: "La moitié du champ de bataille est derrière toi. Garde une exécution propre.",
      above: "Tu as dépassé le plan. Bien. La maîtrise avant l'orgueil.",
      below: "Tu as réduit aujourd'hui. Bon choix si la technique commençait à céder.",
      changed: "Modification enregistrée. On s'entraîne avec le corps du jour, pas avec celui d'hier.",
      adaptive: "J'ai ajusté la bataille du jour.",
      rpe3: "Tu avais encore de la réserve. Si cela se confirme, on pourra monter légèrement le défi.",
      rpe5: "Dosage juste. C'est ainsi qu'on bâtit de la force sans brûler les réserves.",
      rpe7: "Séance dure mais tenue. On consolide avant de charger davantage.",
      rpe9: "Très rude. Je le note : la prochaine séance comparable sera légèrement allégée."
    }),
    xara: Object.freeze({
      halfway: "Mi-séance. Posture propre, respiration stable, et on continue.",
      above: "Plus que prévu, c'est noté. Garde surtout la qualité du mouvement.",
      below: "Moins que prévu aujourd'hui, c'est noté. La bonne quantité est celle que tu peux faire proprement.",
      changed: "Modification enregistrée. On ajuste sans perdre le fil de la séance.",
      adaptive: "J'ai ajusté la séance à tes données récentes.",
      rpe3: "Tu avais beaucoup de marge. Si cela se répète, on pourra progresser doucement.",
      rpe5: "Parfaitement dosée. C'est exactement la zone recherchée.",
      rpe7: "Exigeante, mais acceptable. On garde le niveau avant d'en rajouter.",
      rpe9: "Très difficile. Ce signal comptera : la prochaine séance comparable sera légèrement allégée."
    }),
    violette: Object.freeze({
      halfway: "La moitié est dans la besace ! Garde du souffle pour la suite.",
      above: "Un peu de rab aujourd'hui ! Très bien, tant que le mouvement reste joli et contrôlé.",
      below: "On a raccourci la portion. Aucun souci : mieux vaut une bonne étape qu'une mauvaise chute.",
      changed: "C'est modifié et rangé dans le carnet. On repart !",
      adaptive: "J'ai allégé ou corsé le sac selon tes dernières aventures.",
      rpe3: "Tu avais encore des biscuits dans la poche. Si ça continue, on pourra relever doucement le défi.",
      rpe5: "Pile comme il faut. Une aventure utile sans finir roulé dans un tapis.",
      rpe7: "Ça a bien piqué. On garde le cap sans augmenter tout de suite.",
      rpe9: "Très costaud aujourd'hui. Je garde ce signal : la prochaine séance comparable sera légèrement allégée."
    }),
    elmin: Object.freeze({
      halfway: "Mi-parcours. La régularité reste plus importante que la précipitation.",
      above: "Objectif dépassé. Donnée utile, mais la qualité technique reste le critère principal.",
      below: "Objectif réduit. Ajustement pertinent si cela préserve la technique et le contrôle.",
      changed: "Performance réelle enregistrée. Cette donnée affinera les prochaines décisions.",
      adaptive: "J'ai recalibré cette séance à partir de ton historique récent.",
      rpe3: "Réserve importante. Si plusieurs séances comparables confirment ce signal, une légère progression sera pertinente.",
      rpe5: "Charge d'effort bien calibrée. Nous conservons cette trajectoire.",
      rpe7: "Effort soutenu. La priorité devient la consolidation plutôt que l'augmentation immédiate.",
      rpe9: "Effort très élevé. Ce RPE sera pris en compte : la prochaine séance comparable sera légèrement allégée."
    }),
    bazul: Object.freeze({
      halfway: "La pièce est à moitié forgée. Même rythme, même précision.",
      above: "Tu as frappé un peu plus fort que prévu. Bien, si l'enclume reste stable.",
      below: "Moins de coups aujourd'hui. Une forge propre vaut mieux qu'un métal massacré.",
      changed: "Mesure corrigée. On forge avec des chiffres vrais.",
      adaptive: "J'ai réglé la forge selon tes dernières séances.",
      rpe3: "La forge était encore tiède. Si ça se répète, on ajoutera un peu de matière.",
      rpe5: "Bonne température. On garde ce réglage.",
      rpe7: "La forge a bien chauffé. On stabilise avant d'augmenter la charge.",
      rpe9: "Trop chaud pour pousser davantage. Ce signal allégera légèrement la prochaine séance comparable."
    }),
    satyne: Object.freeze({
      halfway: "Le rituel est à moitié accompli. Reste précise, le corps écoute tout.",
      above: "Tu as dépassé l'incantation prévue. Intéressant, mais ne sacrifie jamais le contrôle.",
      below: "Tu as réduit le rituel. Sage choix si le corps demandait moins aujourd'hui.",
      changed: "La mesure réelle est inscrite. Les prochains rituels en tiendront compte.",
      adaptive: "J'ai ajusté le rituel selon les signes laissés par tes dernières séances.",
      rpe3: "Beaucoup de réserve. Si le signe se répète, le prochain rituel pourra gagner légèrement en intensité.",
      rpe5: "Équilibre juste. L'effort nourrit la progression sans la dévorer.",
      rpe7: "Le rituel était exigeant. On stabilise l'énergie avant de l'augmenter.",
      rpe9: "Signal très fort. Je le garde en mémoire : la prochaine séance comparable sera légèrement adoucie."
    })
  });

  Sport.getCoachVoice = function getCoachVoice(coachId) {
    return Sport.coachVoices[coachId] || Sport.coachVoices.korvan;
  };

  Sport.pickStableCoachLine = function pickStableCoachLine(list, seed = "") {
    if (!Array.isArray(list) || !list.length) return "";
    const source = String(seed || "fitness-rpg");
    let hash = 0;
    for (let index = 0; index < source.length; index += 1) {
      hash = ((hash << 5) - hash + source.charCodeAt(index)) | 0;
    }
    return list[Math.abs(hash) % list.length] || list[0] || "";
  };

  Sport.getCoachExerciseLine = function getCoachExerciseLine(coach, definition, session, index) {
    if (!coach) return "Prêt pour la prochaine étape.";

    const keys = [
      definition?.id,
      definition?.pose,
      definition?.categoryId
    ].filter(Boolean);

    for (const key of keys) {
      const list = coach.byExercise?.[key];
      if (Array.isArray(list) && list.length) {
        return Sport.pickStableCoachLine(
          list,
          `${session?.id || session?.startedAt || "session"}:${index}:${key}`
        );
      }
    }

    return Sport.pickStableCoachLine(
      coach.start,
      `${session?.id || session?.startedAt || "session"}:${index}:start`
    ) || "Prêt pour la prochaine étape.";
  };

  Sport.getCoachPoseForExercise = function getCoachPoseForExercise(coach, definition) {
    const requested = definition?.pose || definition?.categoryId || "explain";
    if (coach?.poses?.[requested]) return requested;

    const category = String(definition?.categoryId || "").toLowerCase();
    if (category.includes("warm")) return coach?.poses?.warmup ? "warmup" : "explain";
    if (category.includes("stretch") || category.includes("mobility") || category.includes("recovery")) {
      return coach?.poses?.stretch ? "stretch" : "explain";
    }
    if (category.includes("bike")) return coach?.poses?.bike ? "bike" : "explain";
    if (category.includes("walk")) return coach?.poses?.walk ? "walk" : "explain";
    if (category.includes("run")) return coach?.poses?.run ? "run" : "explain";
    return coach?.poses?.explain ? "explain" : "idle";
  };

  Sport.styleCoachTip = function styleCoachTip(coachId, tip) {
    const cleanTip = String(tip || "").trim();
    if (!cleanTip) return "";

    const labels = {
      korvan: "Technique",
      xara: "Point technique",
      violette: "Petit rappel",
      elmin: "Point de contrôle",
      bazul: "Réglage de forge",
      satyne: "Rituel technique"
    };

    return `${labels[coachId] || "Conseil"} : ${cleanTip}`;
  };

  Sport.getModifiedPerformanceReaction = function getModifiedPerformanceReaction(coachId, record) {
    if (!record) return "";

    const planned = Number(record.plannedAmount);
    const actual = Number(record.actualAmount);
    const unit = record.unit || "";
    const voice = Sport.getCoachVoice(coachId);
    const plannedText = Sport.formatExerciseAmount(planned, unit);
    const actualText = Sport.formatExerciseAmount(actual, unit);
    const loadText = Number(record.loadKg) > 0 ? ` Charge enregistrée : ${Number(record.loadKg)} kg.` : "";

    if (Number.isFinite(planned) && Number.isFinite(actual)) {
      if (actual > planned) {
        return `${voice.above} Bilan : ${actualText}, objectif ${plannedText}.${loadText}`;
      }
      if (actual < planned) {
        return `${voice.below} Bilan : ${actualText}, objectif ${plannedText}.${loadText}`;
      }
    }

    return `${voice.changed}${loadText}`;
  };

  Sport.getRpeCoachResponse = function getRpeCoachResponse(coachId, value) {
    const voice = Sport.getCoachVoice(coachId);
    const rpe = Number(value);
    if (rpe >= 9) return voice.rpe9;
    if (rpe >= 7) return voice.rpe7;
    if (rpe >= 5) return voice.rpe5;
    return voice.rpe3;
  };

  Sport.renderLivingCoachCard = function renderLivingCoachCard() {
    const session = State.getActiveProgramSession?.();
    const shell = document.querySelector("#activeProgramSession");
    if (!session || !shell) return;

    shell.querySelector(".guided-live-coach")?.remove();

    const workout = Programs.getActiveProgramWorkout?.(session);
    const exercises = Array.isArray(workout?.exercises) ? workout.exercises : [];
    if (!exercises.length) return;

    const completedKeys = Programs.getCompletedExerciseKeys?.(session) || [];
    const isDone = (item, index) => {
      const key = `${index}-${item.exerciseId}`;
      return completedKeys.includes(key) || completedKeys.includes(item.exerciseId);
    };
    const doneCount = exercises.reduce((count, item, index) => count + (isDone(item, index) ? 1 : 0), 0);
    const activeIndex = exercises.findIndex((item, index) => !isDone(item, index));
    const complete = activeIndex < 0;

    const coachId = State.getCoachId?.() || "korvan";
    const coach = window.FitnessRpgData?.getCoach?.(coachId);
    if (!coach) return;

    let pose = "victory";
    let message = Sport.pickStableCoachLine(
      coach.complete,
      `${session.id || session.startedAt || "session"}:complete`
    ) || "Tous les exercices sont validés.";
    let tip = complete ? "Tous les exercices sont validés. Termine la séance pour enregistrer ta progression." : "";
    let status = complete ? "Séance prête à terminer" : "Coach en direct";

    if (!complete) {
      const activeItem = exercises[activeIndex];
      const definition = Sport.getExerciseDefinition(activeItem.exerciseId);
      pose = Sport.getCoachPoseForExercise(coach, definition);
      message = Sport.getCoachExerciseLine(coach, definition, session, activeIndex);
      tip = Sport.styleCoachTip(coachId, definition?.coachTip);
      status = `Exercice ${activeIndex + 1} sur ${exercises.length}`;

      const previousIndex = activeIndex - 1;
      if (previousIndex >= 0) {
        const previousItem = exercises[previousIndex];
        const previousKey = `${previousIndex}-${previousItem.exerciseId}`;
        const previousRecord = session.exercisePerformance?.[previousKey];
        if (previousRecord?.recordingMode === "modified") {
          message = Sport.getModifiedPerformanceReaction(coachId, previousRecord);
        } else if (doneCount === Math.ceil(exercises.length / 2) && doneCount < exercises.length) {
          message = Sport.getCoachVoice(coachId).halfway;
        }
      } else if (session.adaptation) {
        const adaptation = session.adaptation;
        const meaningfulAdaptation = Math.abs(Number(adaptation.volumeChangePercent || 0)) >= 2
          || Number(adaptation.changedExerciseCount || 0) > 0
          || Object.values(adaptation.factors || {}).some((factor) => Math.abs(Number(factor || 1) - 1) >= 0.03);

        if (meaningfulAdaptation) {
          const headline = Sport.buildAdaptiveCoachHeadline(adaptation);
          const reason = (adaptation.summary || []).find((line) => line && line !== "Profil compatible avec la séance prévue");
          message = `${Sport.getCoachVoice(coachId).adaptive} ${headline}.${reason ? ` ${reason}.` : ""}`;
        }
      }
    }

    const image = window.FitnessRpgData?.getCoachImage?.(coachId, pose)
      || coach.fallbackImage
      || coach.image;
    const escape = Render.escapeHtml || ((value) => String(value ?? ""));

    const card = document.createElement("aside");
    card.className = "guided-live-coach";
    card.setAttribute("aria-live", "polite");
    card.innerHTML = `
      <img class="guided-live-coach-image" src="${escape(image)}" alt="${escape(coach.fullName || coach.name || "Coach")}">
      <div class="guided-live-coach-copy">
        <div class="guided-live-coach-heading">
          <strong>${escape(coach.name || "Coach")}</strong>
          <span>${escape(status)}</span>
        </div>
        <p class="guided-live-coach-message">${escape(message)}</p>
        ${tip ? `<p class="guided-live-coach-tip">${escape(tip)}</p>` : ""}
      </div>
    `;

    const img = card.querySelector("img");
    Render.setSafeImage?.(img, image, coach.fallbackImage || coach.image);

    const stage = shell.querySelector(".guided-exercise-stage");
    if (stage) {
      stage.insertAdjacentElement("beforebegin", card);
    } else {
      shell.querySelector(".guided-progress-panel")?.insertAdjacentElement("afterend", card);
    }
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
      predictedDurationMinutes: Number(session.adaptation?.estimatedDurationMinutes) || null,
      durationPredictionSource: session.adaptation?.durationPrediction?.source || null,
      durationPredictionSampleCount: Number(session.adaptation?.durationPrediction?.sampleCount) || 0,
      exercises: exercises.map((item, index) => {
        const definition = Sport.getExerciseDefinition(item.exerciseId);
        const plannedAmount = Sport.getExerciseAmount(item);
        const exerciseKey = `${index}-${item.exerciseId}`;
        const recorded = session.exercisePerformance?.[exerciseKey] || null;
        const actualAmount = Number.isFinite(Number(recorded?.actualAmount))
          ? Number(recorded.actualAmount)
          : plannedAmount;
        const loadKg = Number.isFinite(Number(recorded?.loadKg)) && Number(recorded.loadKg) > 0
          ? Number(recorded.loadKg)
          : null;

        return {
          order: index + 1,
          exerciseKey,
          exerciseId: item.exerciseId || null,
          title: definition?.title || item.title || item.exerciseId || `Exercice ${index + 1}`,
          phase: item.phase || null,
          plannedAmount,
          actualAmount,
          unit: Sport.getExerciseUnit(item, definition),
          loadKg
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

    const modifyPerformanceButton = target.closest(".sport-modify-performance-btn");
    if (modifyPerformanceButton) {
      const exerciseId = modifyPerformanceButton.dataset.exerciseId;
      const exerciseKey = modifyPerformanceButton.dataset.exerciseKey || null;
      if (exerciseId) {
        Sport.openExercisePerformancePanel(exerciseId, exerciseKey);
      }
      return;
    }

    if (target.closest(".sport-exercise-performance-close")) {
      Sport.closeExercisePerformancePanel();
      return;
    }

    if (target.closest(".sport-performance-as-planned")) {
      const pending = Sport.pendingExercisePerformance;
      if (!pending) return;

      Sport.recordExercisePerformance({
        actualAmount: pending.plannedAmount,
        loadKg: null
      });
      return;
    }

    if (target.closest(".sport-performance-save")) {
      const overlay = target.closest("#sportExercisePerformanceOverlay")
        || document.querySelector("#sportExercisePerformanceOverlay");
      const actualAmount = Number(overlay?.querySelector("#sportActualAmountInput")?.value);
      const loadValue = overlay?.querySelector("#sportLoadKgInput")?.value;

      Sport.recordExercisePerformance({
        actualAmount,
        loadKg: loadValue === "" || loadValue == null ? null : Number(loadValue)
      });
      return;
    }

    if (target.id === "sportExercisePerformanceOverlay") {
      Sport.closeExercisePerformancePanel();
      return;
    }

    const rpeButton = target.closest(".sport-rpe-btn");
    if (rpeButton) {
      const value = Number(rpeButton.dataset.rpe);
      const label = rpeButton.dataset.rpeLabel || "";
      Sport.savePendingPerformance(value, label);

      const panel = rpeButton.closest(".sport-rpe-panel");
      if (panel) {
        const coachId = State.getCoachId?.() || "korvan";
        const coach = window.FitnessRpgData?.getCoach?.(coachId);
        const coachImage = window.FitnessRpgData?.getCoachImage?.(coachId, "motivate")
          || coach?.fallbackImage
          || coach?.image
          || "";
        const coachResponse = Sport.getRpeCoachResponse(coachId, value);
        const escape = Render.escapeHtml || ((item) => String(item ?? ""));

        panel.innerHTML = `
          <div class="sport-rpe-saved">
            <span>✓</span>
            <div>
              <strong>Effort enregistré</strong>
              <small>${escape(label)} · RPE ${value}/10</small>
            </div>
          </div>
          <div class="sport-rpe-coach-response">
            <img src="${escape(coachImage)}" alt="${escape(coach?.fullName || coach?.name || "Coach")}">
            <div>
              <strong>${escape(coach?.name || "Coach")}</strong>
              <p>${escape(coachResponse)}</p>
            </div>
          </div>
        `;

        const coachImg = panel.querySelector(".sport-rpe-coach-response img");
        Render.setSafeImage?.(coachImg, coachImage, coach?.fallbackImage || coach?.image);
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

    const preferenceInput = target.closest("#sportKneeFriendlyInput, #sportSmallSpaceInput");
    if (preferenceInput) {
      const card = preferenceInput.closest(".sport-preference-card");
      card?.classList.toggle("selected", preferenceInput.checked);
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
        equipment,
        kneeFriendly: Boolean(panel.querySelector("#sportKneeFriendlyInput")?.checked),
        smallSpace: Boolean(panel.querySelector("#sportSmallSpaceInput")?.checked)
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

      <div class="sport-training-preferences" aria-label="Préférences d’entraînement">
        <label class="sport-preference-card ${sport.kneeFriendly ? "selected" : ""}">
          <input id="sportKneeFriendlyInput" type="checkbox" ${sport.kneeFriendly ? "checked" : ""}>
          <span aria-hidden="true">🦵</span>
          <strong>Genoux sensibles</strong>
          <small>Privilégier les variantes assistées déjà validées.</small>
        </label>

        <label class="sport-preference-card ${sport.smallSpace ? "selected" : ""}">
          <input id="sportSmallSpaceInput" type="checkbox" ${sport.smallSpace ? "checked" : ""}>
          <span aria-hidden="true">↔️</span>
          <strong>Espace réduit</strong>
          <small>Éviter les déplacements quand une variante existe.</small>
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
    const predicted = Number(item.predictedDurationMinutes) > 0
      ? ` · prévu ≈ ${Number(item.predictedDurationMinutes)} min`
      : "";
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
        <span>${duration}${predicted}<br>${rpe}</span>
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
      Sport.installGuidedPerformanceButton();
      Sport.renderLivingCoachCard?.();
      Sport.renderGuidedFamiliarCompanion?.();
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
    Sport.installGuidedPerformanceButton();
    Sport.renderLivingCoachCard?.();
    Sport.renderGuidedFamiliarCompanion?.();
  }, 0);
})();
