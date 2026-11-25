// Métadonnées revues pour les exercices du parcours perte de poids.
(() => {
  "use strict";

  const data = window.FitnessRpgData;
  const families = Object.freeze({
    squat: "Flexion des jambes",
    push: "Poussée du haut du corps",
    cardio: "Endurance",
    shoulderMobility: "Mobilité des épaules",
    hipMobility: "Mobilité des hanches",
    backMobility: "Mobilité du dos",
    trunk: "Stabilité du tronc",
    balance: "Équilibre",
    breathing: "Respiration"
  });
  const difficulty = { beginner: 0, intermediate: 1, advanced: 2 };
  const intensity = { light: 0, moderate: 1, vigorous: 2 };
  const legs = ["knees", "hips", "ankles"];
  const upper = ["shoulders", "elbows", "wrists"];

  function movement(family, level, effort, joints, options = {}) {
    return Object.freeze({
      family,
      difficulty: level,
      intensity: effort,
      impact: options.impact || "low",
      equipment: Object.freeze(options.equipment || []),
      joints: Object.freeze([...joints]),
      balance: options.balance || "low",
      variants: Object.freeze(options.variants || []),
      limitedSpace: options.limitedSpace ?? true
    });
  }

  const catalogue = Object.freeze({
    chair_squat: movement("squat", "beginner", "light", legs, { equipment: ["chair"], variants: ["squats", "goblet_squat"] }),
    squats: movement("squat", "intermediate", "moderate", [...legs, "back"], { balance: "moderate", variants: ["chair_squat", "goblet_squat"] }),
    goblet_squat: movement("squat", "intermediate", "moderate", [...legs, "back", "shoulders"], { equipment: ["kettlebell"], balance: "moderate", variants: ["squats", "chair_squat"] }),
    wall_sit: movement("squat", "intermediate", "moderate", legs, { equipment: ["wall"] }),
    wall_pushups: movement("push", "beginner", "light", upper, { equipment: ["wall"], variants: ["incline_pushups", "pushups"] }),
    incline_pushups: movement("push", "intermediate", "moderate", [...upper, "back"], { equipment: ["stable-support"], variants: ["wall_pushups", "pushups"] }),
    pushups: movement("push", "intermediate", "moderate", [...upper, "back"], { variants: ["incline_pushups", "wall_pushups"] }),
    march_on_spot: movement("cardio", "beginner", "light", legs, { variants: ["slow_walk"] }),
    slow_walk: movement("cardio", "beginner", "light", legs, { limitedSpace: false, variants: ["march_on_spot"] }),
    walk: movement("cardio", "beginner", "moderate", legs, { limitedSpace: false, variants: ["slow_walk", "march_on_spot"] }),
    dynamic_walk: movement("cardio", "beginner", "moderate", legs, { limitedSpace: false, variants: ["slow_walk", "march_on_spot"] }),
    walk_acceleration: movement("cardio", "intermediate", "moderate", legs, { limitedSpace: false, variants: ["walk", "march_on_spot"] }),
    stomping: movement("cardio", "beginner", "moderate", legs, { variants: ["march_on_spot", "slow_walk"] }),
    slow_knee_raises: movement("cardio", "beginner", "light", legs, { balance: "moderate", variants: ["march_on_spot"] }),
    lateral_steps: movement("cardio", "beginner", "light", legs, { balance: "moderate", limitedSpace: false, variants: ["march_on_spot"] }),
    step_touch: movement("cardio", "beginner", "light", legs, { balance: "moderate", limitedSpace: false, variants: ["march_on_spot"] }),
    cross_knee_tap: movement("cardio", "intermediate", "moderate", [...legs, "back", "shoulders"], { balance: "moderate", variants: ["march_on_spot"] }),
    butt_kicks: movement("cardio", "intermediate", "moderate", legs, { balance: "moderate", variants: ["march_on_spot"] }),
    skater_steps: movement("cardio", "intermediate", "moderate", legs, { balance: "moderate", limitedSpace: false, variants: ["step_touch", "march_on_spot"] }),
    light_boxer: movement("cardio", "intermediate", "moderate", legs, { balance: "moderate", variants: ["march_on_spot"] }),
    no_jump_jacks: movement("cardio", "beginner", "moderate", [...legs, "shoulders"], { balance: "moderate", variants: ["march_on_spot"] }),
    run_outdoor: movement("cardio", "intermediate", "vigorous", legs, { impact: "high", balance: "moderate", limitedSpace: false, variants: ["walk", "slow_walk", "march_on_spot"] }),
    run_treadmill: movement("cardio", "intermediate", "vigorous", legs, { impact: "high", balance: "moderate", equipment: ["treadmill"], variants: ["march_on_spot", "walk"] }),
    bike: movement("cardio", "beginner", "moderate", legs, { balance: "moderate", equipment: ["bicycle"], limitedSpace: false, variants: ["walk", "slow_walk"] }),
    arm_circles: movement("shoulderMobility", "beginner", "light", ["shoulders"]),
    hip_circles: movement("hipMobility", "beginner", "light", ["hips", "back"], { balance: "moderate" }),
    gentle_back_stretch: movement("backMobility", "beginner", "light", ["back"]),
    bird_dog: movement("trunk", "beginner", "light", ["back", "hips", "knees", ...upper], { balance: "moderate" }),
    single_leg_balance: movement("balance", "beginner", "light", legs, { balance: "high" }),
    slow_breathing: movement("breathing", "beginner", "light", [])
  });

  const programmeIds = Object.freeze(["eveil-heros", "marche-aventurier", "coeur-dragon"]);
  const getMetadata = (id) => Object.hasOwn(catalogue, id) ? catalogue[id] : null;

  function unitKind(unit) {
    if (["min", "minutes", "sec", "s", "secondes"].includes(unit)) return "time";
    if (["répétitions", "reps"].includes(unit)) return "repetitions";
    return unit;
  }

  function resolveMovement(item, sport) {
    const profile = sport?.trainingProfile;
    if (profile?.medicalRestriction) return { status: "professional-review" };

    const source = getMetadata(item?.exerciseId);
    if (!source) return { status: "unreviewed" };

    const level = difficulty[sport?.level] ?? difficulty.beginner;
    const maxIntensity = profile?.activity === "inactive" ? intensity.light : intensity.moderate;
    const equipment = new Set(sport?.equipment || []);
    const limitations = new Set(profile?.limitations || []);
    if (sport?.kneeFriendly) limitations.add("knees");

    const candidates = [item.exerciseId, ...source.variants];
    const id = candidates.find((candidateId) => {
      const movement = catalogue[candidateId];
      const exercise = data.getExerciseById(candidateId);
      return exercise && movement.family === source.family
        && (candidateId === item.exerciseId || unitKind(item.unit) === unitKind(exercise.unit))
        && difficulty[movement.difficulty] <= level
        && intensity[movement.intensity] <= Math.min(maxIntensity, intensity[source.intensity])
        && (source.impact === "high" || movement.impact === "low")
        && (!profile?.noImpact || movement.impact === "low")
        && (!sport?.smallSpace || movement.limitedSpace)
        && (!limitations.has("balance") || movement.balance === "low")
        && movement.equipment.every((required) => equipment.has(required))
        && movement.joints.every((joint) => !limitations.has(joint));
    });

    if (!id) return { status: "skip" };
    if (id === item.exerciseId) return { status: "keep", item };
    // La durée conserve l’unité de la séance. Les distances sont propres au mouvement initial.
    const { distanceOptional, distanceKm, ...dose } = item;
    return { status: "replace", item: { ...dose, exerciseId: id } };
  }

  function assessWorkout(workout, sport) {
    return {
      workout,
      movements: (workout?.exercises || []).map((item) => resolveMovement(item, sport))
    };
  }

  function describeExercise(exercise, sport) {
    const metadata = getMetadata(exercise.id);
    if (!metadata) return [];

    const names = metadata.variants.map((id) => data.getExerciseById(id)?.title).filter(Boolean);
    const family = families[metadata.family];
    const impact = metadata.impact === "high" ? "impact élevé" : "sans sauts";
    const lines = [`${family} · ${impact}`];
    if (names.length) lines.push(`Variantes du même mouvement · ${names.join(", ")}.`);

    if (!sport?.trainingProfile) return lines;
    const result = resolveMovement({ exerciseId: exercise.id, unit: exercise.unit }, sport);
    if (result.status === "replace") {
      lines.push(`Option selon ton profil · ${data.getExerciseById(result.item.exerciseId).title}.`);
    } else if (result.status === "skip") {
      lines.push("Passe ce mouvement dans ton parcours si les contraintes indiquées s’appliquent.");
    } else if (result.status === "professional-review") {
      lines.push("Demande un avis professionnel avant de choisir une variante.");
    }
    lines.push("Arrête le mouvement si une douleur ou un inconfort apparaît.");
    return lines;
  }

  window.FitnessRpgExerciseAdaptation = { programmeIds, getMetadata, resolveMovement, assessWorkout, describeExercise };
})();
