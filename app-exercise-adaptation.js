// Classification du grimoire et variantes explicites pour les parcours adaptatifs.
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
    breathing: "Respiration",
    lunge: "Fente", heelRaise: "Montée sur pointes", hipExtension: "Extension de hanche",
    hinge: "Charnière de hanche", pull: "Tirage horizontal", verticalPull: "Tirage vertical",
    overhead: "Poussée verticale", elbowFlexion: "Flexion du coude", elbowExtension: "Extension du coude",
    shoulderRaise: "Élévation du bras", lowMobility: "Mobilité des membres inférieurs",
    neckMobility: "Mobilité cervicale", carry: "Porté", sequence: "Enchaînement"

  });
  const difficulty = { beginner: 0, intermediate: 1, advanced: 2 };
  const intensity = { light: 0, moderate: 1, vigorous: 2 };
  const legs = ["knees", "hips", "ankles"];
  const upper = ["shoulders", "elbows", "wrists"];

  const mainMuscles = {
    squat: ["quadriceps", "fessiers"], push: ["pectoraux", "triceps", "épaules"],
    cardio: ["membres inférieurs"], trunk: ["abdominaux", "muscles stabilisateurs du dos"],
    balance: ["stabilisateurs de hanche et de cheville"], breathing: ["diaphragme"],
    shoulderMobility: ["ceinture scapulaire"], hipMobility: ["muscles de la hanche"],
    backMobility: ["muscles du dos"], neckMobility: ["muscles cervicaux"],
    lowMobility: ["muscles des membres inférieurs"], lunge: ["quadriceps", "fessiers"],
    heelRaise: ["mollets"], hipExtension: ["fessiers", "ischio-jambiers"],
    hinge: ["ischio-jambiers", "fessiers"], pull: ["haut du dos", "fléchisseurs du coude"],
    verticalPull: ["grand dorsal", "fléchisseurs du coude"], overhead: ["épaules", "triceps"],
    elbowFlexion: ["fléchisseurs du coude"], elbowExtension: ["triceps"],
    shoulderRaise: ["épaules"], carry: ["avant-bras", "tronc"], sequence: ["selon les mouvements"]
  };

  function movement(family, level, effort, joints, options = {}) {
    return Object.freeze({
      family,
      muscles: Object.freeze(options.muscles || mainMuscles[family]),
      supports: Object.freeze(options.supports || (options.equipment || []).filter((id) =>
        ["chair", "wall", "stable-support", "bench", "mat", "pull-up-bar", "assist-machine"].includes(id))),
      automatic: options.automatic !== false,
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

  const existing = {
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
    bird_dog: movement("trunk", "beginner", "light", ["back", "hips", "knees", ...upper], { balance: "moderate", supports: ["floor"] }),
    single_leg_balance: movement("balance", "beginner", "light", legs, { balance: "high" }),
    slow_breathing: movement("breathing", "beginner", "light", [])
  };

  const lower = [...legs, "back"];
  const core = ["back", "hips"];
  const floor = { supports: ["floor"] };
  // Les regroupements décrivent les mouvements. Les substitutions exigent une paire explicite.
  const groups = [
    ["arm_open_close shoulder_rolls ballet_preparatory_arms second_position_arms shoulder_arm_stretch chest_stretch", "shoulderMobility", "beginner", "light", ["shoulders"]],
    ["ankle_circles thigh_calf_stretch hip_quad_stretch", "lowMobility", "beginner", "light", legs],
    ["gentle_neck_rotation", "neckMobility", "beginner", "light", ["neck"]],
    ["child_pose_stretch cat_cow thoracic_rotation", "backMobility", "beginner", "light", [...core, ...upper, "knees"], floor],
    ["abdominal_breathing slow_breathing_extended", "breathing", "beginner", "light", []],
    ["side_steps ranger_step swan_step", "cardio", "intermediate", "moderate", legs, { balance: "moderate", limitedSpace: false, variants: ["march_on_spot"] }],
    ["mountain_climber_slow", "cardio", "intermediate", "moderate", [...lower, ...upper], { ...floor, variants: ["march_on_spot"] }],
    ["ballet_weight_transfer ballet_gliding_tendu dancer_sway court_bow", "balance", "beginner", "light", lower, { balance: "moderate" }],
    ["arabesque_simplified front_developpe_simplified passe_simplified", "balance", "intermediate", "moderate", lower, { balance: "high" }],
    ["ballet_eight_count_phrase ballet_sequence pilates advanced_standard_warmup advanced_standard_cooldown", "sequence", "intermediate", "moderate", [...lower, ...upper], { automatic: false }],
    ["demi_plie cyclist_half_squat", "squat", "intermediate", "moderate", legs, { variants: ["chair_squat"] }],
    ["assisted_reverse_lunges", "lunge", "beginner", "light", lower, { equipment: ["stable-support"], balance: "moderate" }],
    ["reverse_lunges", "lunge", "intermediate", "moderate", lower, { balance: "high", variants: ["assisted_reverse_lunges"] }],
    ["walking_lunges", "lunge", "intermediate", "moderate", lower, { balance: "high", limitedSpace: false, variants: ["reverse_lunges", "assisted_reverse_lunges"] }],
    ["forge_reverse_lunge", "lunge", "intermediate", "moderate", lower, { equipment: ["dumbbells"], balance: "high", variants: ["reverse_lunges", "assisted_reverse_lunges"] }],
    ["slow_calf_raises", "heelRaise", "beginner", "light", ["ankles"], { balance: "moderate" }],
    ["calf_raises", "heelRaise", "intermediate", "moderate", ["ankles"], { balance: "moderate", variants: ["slow_calf_raises"] }],
    ["bridge pelvic_lift_floor", "hipExtension", "beginner", "light", lower, floor],
    ["single_leg_bridge_alternate", "hipExtension", "intermediate", "moderate", lower, { ...floor, variants: ["bridge"] }],
    ["dead_bug_simplified pelvic_tilt", "trunk", "beginner", "light", core, floor],
    ["dead_bug toe_taps", "trunk", "intermediate", "moderate", core, { ...floor, variants: ["dead_bug_simplified"] }],
    ["superman swimming side_leg_lift crunch_controlled roll_up_simplified bicycle_crunch single_leg_stretch double_leg_stretch scissors hollow_hold_simplified the_hundred", "trunk", "intermediate", "moderate", [...core, "shoulders"], floor],
    ["double_straight_leg_lower_lift teaser_i roll_up_full criss_cross", "trunk", "advanced", "moderate", core, floor],
    ["knee_plank side_plank_knees", "trunk", "beginner", "moderate", [...core, ...upper, "knees"], floor],
    ["core", "trunk", "intermediate", "moderate", [...core, ...upper], { ...floor, variants: ["knee_plank"] }],
    ["side_plank", "trunk", "intermediate", "moderate", [...core, ...upper], { ...floor, variants: ["side_plank_knees"] }],
    ["plank_shoulder_taps dynamic_plank leg_pull_front", "trunk", "advanced", "moderate", [...core, ...upper], floor],
    ["incline_shoulder_taps", "trunk", "intermediate", "moderate", [...core, ...upper], { equipment: ["stable-support"] }],
    ["biceps_curl_1kg hammer_curl_1kg", "elbowFlexion", "beginner", "moderate", upper, { equipment: ["dumbbells"] }],
    ["lateral_raises_1kg front_raises_1kg", "shoulderRaise", "beginner", "moderate", upper, { equipment: ["dumbbells"] }],
    ["wall_triceps_extension", "elbowExtension", "beginner", "light", upper, { equipment: ["wall"] }],
    ["triceps_kickback_1kg", "elbowExtension", "beginner", "moderate", upper, { equipment: ["dumbbells"] }],
    ["shoulder_press_1kg", "overhead", "beginner", "moderate", upper, { equipment: ["dumbbells"] }],
    ["kettlebell_military_press", "overhead", "intermediate", "moderate", [...upper, "back"], { equipment: ["kettlebell"], variants: ["shoulder_press_1kg"] }],
    ["forge_seated_shoulder_press", "overhead", "intermediate", "moderate", upper, { equipment: ["dumbbells", "bench"] }],
    ["bench_press forge_dumbbell_bench_press", "push", "intermediate", "moderate", upper, { equipment: ["dumbbells", "bench"] }],
    ["resistance_band_row face_pull", "pull", "intermediate", "moderate", [...upper, "back"], { equipment: ["resistance-band"] }],
    ["supported_row_water_bottle", "pull", "beginner", "light", [...upper, "back"], { equipment: ["water-bottle", "stable-support"] }],
    ["forge_one_arm_row", "pull", "intermediate", "moderate", [...upper, "back"], { equipment: ["dumbbells", "bench"], variants: ["supported_row_water_bottle"] }],
    ["assisted_pullups", "verticalPull", "intermediate", "moderate", upper, { equipment: ["pull-up-bar", "resistance-band"] }],
    ["pullups_clean_max", "verticalPull", "advanced", "vigorous", upper, { equipment: ["pull-up-bar"], variants: ["assisted_pullups"] }],
    ["forge_assisted_pullup", "verticalPull", "intermediate", "moderate", upper, { equipment: ["assist-machine"] }],
    ["forge_goblet_squat", "squat", "intermediate", "moderate", [...lower, ...upper], { equipment: ["dumbbells"], variants: ["squats", "chair_squat"] }],
    ["kettlebell_deadlift", "hinge", "intermediate", "moderate", lower, { equipment: ["kettlebell"] }],
    ["forge_romanian_deadlift", "hinge", "intermediate", "moderate", lower, { equipment: ["dumbbells"] }],
    ["kettlebell_swing", "hinge", "advanced", "vigorous", [...lower, ...upper], { equipment: ["kettlebell"], automatic: false }],
    ["turkish_get_up", "sequence", "advanced", "moderate", [...lower, ...upper], { equipment: ["kettlebell"], automatic: false }],
    ["forge_farmer_carry", "carry", "intermediate", "moderate", [...lower, ...upper], { equipment: ["dumbbells"], limitedSpace: false }],
    ["heavy_bag_rounds", "cardio", "advanced", "vigorous", [...lower, ...upper], { equipment: ["punching-bag"], automatic: false, muscles: ["épaules", "tronc", "membres inférieurs"] }],
    ["bike_acceleration", "cardio", "intermediate", "vigorous", legs, { equipment: ["bicycle"], variants: ["bike", "slow_walk"], limitedSpace: false }]
  ];
  const catalogue = Object.freeze({
    ...existing,
    ...Object.fromEntries(groups.flatMap(([ids, ...metadata]) =>
      ids.split(" ").map((id) => [id, movement(...metadata)])))
  });

  const programmeIds = Object.freeze(["eveil-heros", "marche-aventurier", "coeur-dragon"]);
  const getMetadata = (id) => Object.hasOwn(catalogue, id) ? catalogue[id] : null;

  function unitKind(unit) {
    if (["min", "minutes", "sec", "s", "secondes"].includes(unit)) return "time";
    if (["répétitions", "reps"].includes(unit)) return "repetitions";
    return unit;
  }

  function resolveMovement(item, sport, options = {}) {
    const profile = sport?.trainingProfile;
    if (profile?.medicalRestriction) return { status: "professional-review" };

    const source = getMetadata(item?.exerciseId);
    if (!source || !source.automatic) return { status: "unreviewed" };

    const level = difficulty[sport?.level] ?? difficulty.beginner;
    const maxIntensity = profile?.activity === "inactive" || options.maxIntensity === "light" ? intensity.light : intensity.moderate;
    const equipment = new Set(sport?.equipment || []);
    const limitations = new Set(profile?.limitations || []);
    if (sport?.kneeFriendly) limitations.add("knees");

    const candidates = [item.exerciseId, ...source.variants];
    const id = candidates.find((candidateId) => {
      const movement = catalogue[candidateId];
      const exercise = data.getExerciseById(candidateId);
      return exercise && movement?.automatic && movement.family === source.family
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
    const lines = [`${family} · ${metadata.automatic ? impact : "adaptation manuelle"}`];
    if (metadata.automatic) lines.push(`Zone principale · ${metadata.muscles.join(", ")}.`);
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
