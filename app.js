// ============================================================
// Fitness RPG - app.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - initialiser toute l’application ;
// - appeler les modules dans le bon ordre ;
// - lancer le premier rendu ;
// - fournir quelques outils globaux de debug.
//
// Règle importante :
// ce fichier ne contient aucune version.
// La version officielle est uniquement dans app-config.js.
// ============================================================

window.FitnessRpgApp = {
  ready: false
};

// ============================================================
// Vérification des modules
// ============================================================

window.FitnessRpgApp.requiredModules = [
  "FitnessRpgConfig",
  "FitnessRpgData",
  "FitnessRpgState",
  "FitnessRpgProgress",
  "FitnessRpgRender",
  "FitnessRpgNavigation",
  "FitnessRpgExercises",
  "FitnessRpgPrograms",
  "FitnessRpgMedia"
];

window.FitnessRpgApp.checkModules = function checkModules() {
  const missing = window.FitnessRpgApp.requiredModules.filter((moduleName) => {
    return !window[moduleName];
  });

  if (missing.length) {
    console.error("Modules Fitness RPG manquants :", missing);
    alert(`Erreur de chargement Fitness RPG : modules manquants ${missing.join(", ")}`);
    return false;
  }

  return true;
};

// ============================================================
// Initialisation visuelle de base
// ============================================================

window.FitnessRpgApp.applyVersion = function applyVersion() {
  window.FitnessRpgConfig?.setVersionLabels?.();
};

window.FitnessRpgApp.ensureInitialPage = function ensureInitialPage() {
  if (window.FitnessRpgState.hasProfile()) {
    window.FitnessRpgState.setPage("home");
  } else {
    window.FitnessRpgState.setPage("hero-setup");
  }
};

window.FitnessRpgApp.prepareDom = function prepareDom() {
  document.body.classList.add("fitness-rpg-v5");
  
  const backButton = document.querySelector("#backButton");
  const homeButton = document.querySelector("#homeButton");

  if (backButton) {
    backButton.innerHTML = "←";
    backButton.setAttribute("aria-label", "Retour");
    backButton.setAttribute("title", "Retour");
  }

  if (homeButton) {
    homeButton.innerHTML = "🏠";
    homeButton.setAttribute("aria-label", "Accueil");
    homeButton.setAttribute("title", "Accueil");
  }
};

// ============================================================
// Mises à jour de données légères
// ============================================================

window.FitnessRpgApp.applyDataUpdates = function applyDataUpdates() {
  const data = window.FitnessRpgData;
  const config = window.FitnessRpgConfig;

  if (!data) return;

  data.exercises = Array.isArray(data.exercises) ? data.exercises : [];
  data.badges = Array.isArray(data.badges) ? data.badges : [];
  data.programDetails = data.programDetails || {};

  const upsertById = function upsertById(list, item) {
    if (!Array.isArray(list) || !item?.id) return;

    const index = list.findIndex((entry) => entry?.id === item.id);

    if (index >= 0) {
      list[index] = {
        ...list[index],
        ...item
      };
    } else {
      list.push(item);
    }
  };

  const setExerciseImage = function setExerciseImage(exerciseId, femalePath, malePath = "assets/exercices/homme_default.webp") {
    const exercise = data.exercises.find((item) => item?.id === exerciseId);
    if (!exercise) return;

    exercise.images = {
      ...(exercise.images || {}),
      homme: exercise.images?.homme || malePath,
      femme: femalePath,
      male: exercise.images?.male || malePath,
      female: femalePath
    };
  };

  [
    ["arm_circles", "assets/exercices/exercice_femme_cercledebras.webp"],
    ["slow_knee_raises", "assets/exercices/exercice_femme_monteegenouxlente.jpg"],
    ["mountain_climber_slow", "assets/exercices/exercice_femme_moutainclimberlent.webp"],
    ["single_leg_bridge_alternate", "assets/exercices/exercice_femme_pontdehanchessurunejambealternee.webp"],
    ["knee_plank", "assets/exercices/exercice_femme_planchesurlesgenoux.jpg"],
    ["incline_shoulder_taps", "assets/exercices/exercice_femme_tapsepaulesappuiincline.jpg"],
    ["hollow_hold_simplified", "assets/exercices/exercice_femme_hollowholdsimplifie.webp"]
  ].forEach(([exerciseId, femalePath]) => setExerciseImage(exerciseId, femalePath));

  const newPilatesExercises = [
    {
      id: "swimming",
      categoryId: "strength",
      title: "Swimming",
      images: {
        homme: "assets/exercices/homme_default.webp",
        femme: "assets/exercices/femme_default.webp",
        male: "assets/exercices/homme_default.webp",
        female: "assets/exercices/femme_default.webp"
      },
      unit: "sec",
      defaultValue: 20,
      min: 10,
      step: 5,
      xpPerUnit: 0.35,
      stat: "Dos / centre",
      pose: "core",
      hasTimer: true,
      description: "Allongé sur le ventre, alterne bras et jambes comme une nage lente.",
      shortDescription: "Nage au sol, bras et jambes alternés.",
      coachTip: "Reste bas, allonge le corps, ne force pas les lombaires."
    },
    {
      id: "toe_taps",
      categoryId: "strength",
      title: "Toe Taps",
      images: {
        homme: "assets/exercices/homme_default.webp",
        femme: "assets/exercices/femme_default.webp",
        male: "assets/exercices/homme_default.webp",
        female: "assets/exercices/femme_default.webp"
      },
      unit: "répétitions",
      defaultValue: 20,
      min: 2,
      step: 2,
      xpPerUnit: 1,
      stat: "Abdos profonds",
      pose: "core",
      description: "Allongé sur le dos, jambes en tablette, touche le sol avec une pointe de pied puis alterne.",
      shortDescription: "Pointe de pied au sol en alternance.",
      coachTip: "Garde le bas du dos stable et le ventre engagé."
    },
    {
      id: "side_leg_lift",
      categoryId: "strength",
      title: "Side Leg Lift",
      images: {
        homme: "assets/exercices/homme_default.webp",
        femme: "assets/exercices/femme_default.webp",
        male: "assets/exercices/homme_default.webp",
        female: "assets/exercices/femme_default.webp"
      },
      unit: "répétitions",
      defaultValue: 24,
      min: 2,
      step: 2,
      xpPerUnit: 1,
      stat: "Hanches / équilibre",
      pose: "core",
      description: "Allongé sur le côté ou debout avec appui, élève lentement la jambe latérale puis redescends.",
      shortDescription: "Élévation latérale de jambe.",
      coachTip: "Bassin stable, mouvement lent, amplitude confortable."
    },
    {
      id: "roll_up_simplified",
      categoryId: "strength",
      title: "Roll Up simplifié",
      images: {
        homme: "assets/exercices/homme_default.webp",
        femme: "assets/exercices/femme_default.webp",
        male: "assets/exercices/homme_default.webp",
        female: "assets/exercices/femme_default.webp"
      },
      unit: "répétitions",
      defaultValue: 10,
      min: 1,
      step: 1,
      xpPerUnit: 1.2,
      stat: "Centre / contrôle",
      pose: "core",
      description: "Depuis le dos, déroule le buste progressivement jusqu’à une position assise partielle, puis redescends lentement.",
      shortDescription: "Montée contrôlée du buste.",
      coachTip: "Utilise les bras si besoin et évite tout élan brusque."
    }
  ];

  newPilatesExercises.forEach((exercise) => upsertById(data.exercises, exercise));

  const ex = function ex(phase, exerciseId, amount, unit, extra = {}) {
    return {
      phase,
      exerciseId,
      amount,
      unit,
      ...extra
    };
  };

  const repeatCycles = function repeatCycles(phase, count, items) {
    const output = [];

    for (let cycle = 1; cycle <= count; cycle += 1) {
      items.forEach((item) => {
        output.push(ex(`${phase} · Cycle ${cycle}`, item[0], item[1], item[2], item[3] || {}));
      });
    }

    return output;
  };

  const warmup = function warmup() {
    return [
      ex("Échauffement", "abdominal_breathing", 1, "min"),
      ex("Échauffement", "march_on_spot", 1, "min"),
      ex("Échauffement", "cat_cow", 1, "min"),
      ex("Échauffement", "thoracic_rotation", 1, "min"),
      ex("Échauffement", "arm_circles", 60, "sec")
    ];
  };

  const cooldown = function cooldown() {
    return [
      ex("Retour au calme", "gentle_back_stretch", 2, "min"),
      ex("Retour au calme", "hip_quad_stretch", 1, "min"),
      ex("Retour au calme", "shoulder_arm_stretch", 1, "min"),
      ex("Respiration", "slow_breathing", 1, "min")
    ];
  };

  const makeDay = function makeDay(day, title, xp, instructions, challenge1, challenge2) {
    return {
      day,
      title,
      xp,
      difficultyLabel: "≈ 25 à 30 min",
      instructions,
      exercises: [
        ...warmup(),
        ex("Activation Pilates · Version 2", "the_hundred", 10, "cycles respiratoires", { variantVersion: 2 }),
        ...repeatCycles("Défi 1", 2, challenge1),
        ...repeatCycles("Défi 2", 2, challenge2),
        ...cooldown()
      ]
    };
  };

  const makeBossExercises = function makeBossExercises(items, includeFinalWarmup = false) {
    return [
      ...(includeFinalWarmup ? warmup() : []),
      ex("Activation Pilates · Version 2", "the_hundred", 10, "cycles respiratoires", { variantVersion: 2 }),
      ...repeatCycles("Cycle", 3, items),
      ...(includeFinalWarmup ? cooldown() : [])
    ];
  };

  data.programDetails["maitre-flux"] = {
    id: "maitre-flux",
    subtitle: "Pilates intermédiaire : stabilité, contrôle, équilibre et fluidité.",
    unlockLevel: 2,
    duration: "25 à 30 min",
    frequency: "3 séances par semaine + boss le samedi",
    material: "Aucun matériel. Tapis conseillé.",
    reward: {
      badgeId: "flux-dragon-astral",
      badgeTitle: "Dragon Astral",
      chest: true,
      xp: 150,
      nextPrograms: ["archimage-corps", "forge-guerrier", "champion-arenes"]
    },
    weeks: [
      {
        week: 1,
        title: "Le Courant Intérieur",
        xp: 80,
        progression: "Progression après Tour du Mage. Nouvel exercice : Swimming.",
        days: [
          makeDay(1, "Centre de Gravité", 80, "Nouveau mouvement : Swimming. Centre, dos et gainage latéral genoux.", [
            ["hollow_hold_simplified", 20, "sec"],
            ["dead_bug", 20, "répétitions"],
            ["pelvic_lift_floor", 12, "répétitions"]
          ], [
            ["swimming", 20, "sec"],
            ["bird_dog", 20, "répétitions"],
            ["side_plank_knees", 40, "sec"]
          ]),
          makeDay(2, "Souplesse du Mage", 80, "Mobilité contrôlée et centre solide.", [
            ["cat_cow", 12, "répétitions"],
            ["thoracic_rotation", 12, "répétitions"],
            ["swimming", 20, "sec"]
          ], [
            ["bridge", 15, "répétitions"],
            ["bird_dog", 20, "répétitions"],
            ["dead_bug", 20, "répétitions"]
          ]),
          makeDay(3, "Équilibre", 80, "Équilibre, hollow hold et stabilité latérale.", [
            ["single_leg_balance", 60, "sec"],
            ["hollow_hold_simplified", 20, "sec"],
            ["bird_dog", 20, "répétitions"]
          ], [
            ["swimming", 20, "sec"],
            ["pelvic_lift_floor", 12, "répétitions"],
            ["side_plank_knees", 40, "sec"]
          ])
        ]
      },
      {
        week: 2,
        title: "Les Vents Invisibles",
        xp: 90,
        progression: "On ajoute Toe Taps pour renforcer le contrôle abdominal.",
        days: [
          makeDay(1, "Contrôle", 90, "Nouveau mouvement : Toe Taps.", [
            ["toe_taps", 20, "répétitions"],
            ["hollow_hold_simplified", 25, "sec"],
            ["pelvic_lift_floor", 15, "répétitions"]
          ], [
            ["swimming", 25, "sec"],
            ["bird_dog", 20, "répétitions"],
            ["side_plank", 50, "sec"]
          ]),
          makeDay(2, "Fluidité", 90, "Mobilité, dos et gainage.", [
            ["thoracic_rotation", 15, "répétitions"],
            ["toe_taps", 20, "répétitions"],
            ["superman", 15, "répétitions"]
          ], [
            ["bridge", 15, "répétitions"],
            ["dead_bug", 20, "répétitions"],
            ["core", 25, "sec"]
          ]),
          makeDay(3, "Stabilité", 90, "Stabilité active et contrôle du centre.", [
            ["single_leg_balance", 70, "sec"],
            ["toe_taps", 20, "répétitions"],
            ["hollow_hold_simplified", 25, "sec"]
          ], [
            ["swimming", 25, "sec"],
            ["bird_dog", 20, "répétitions"],
            ["side_plank", 50, "sec"]
          ])
        ]
      },
      {
        week: 3,
        title: "Les Arcanes du Mouvement",
        xp: 100,
        progression: "On ajoute Side Leg Lift pour travailler hanches, équilibre et contrôle latéral.",
        days: [
          makeDay(1, "Force du Centre", 100, "Nouveau mouvement : Side Leg Lift.", [
            ["side_leg_lift", 24, "répétitions"],
            ["hollow_hold_simplified", 25, "sec"],
            ["toe_taps", 24, "répétitions"]
          ], [
            ["bird_dog", 24, "répétitions"],
            ["swimming", 30, "sec"],
            ["side_plank", 50, "sec"]
          ]),
          makeDay(2, "Maîtrise", 100, "Mobilité et maîtrise du centre.", [
            ["side_leg_lift", 24, "répétitions"],
            ["thoracic_rotation", 15, "répétitions"],
            ["superman", 15, "répétitions"]
          ], [
            ["dead_bug", 24, "répétitions"],
            ["bridge", 15, "répétitions"],
            ["core", 30, "sec"]
          ]),
          makeDay(3, "Harmonie", 100, "Équilibre et fluidité.", [
            ["single_leg_balance", 80, "sec"],
            ["hollow_hold_simplified", 30, "sec"],
            ["side_leg_lift", 24, "répétitions"]
          ], [
            ["swimming", 30, "sec"],
            ["bird_dog", 24, "répétitions"],
            ["side_plank", 50, "sec"]
          ])
        ]
      },
      {
        week: 4,
        title: "Maître du Flux",
        xp: 110,
        progression: "Dernière semaine : Roll Up simplifié et épreuve complète du Maître.",
        days: [
          makeDay(1, "Concentration", 110, "Nouveau mouvement : Roll Up simplifié.", [
            ["roll_up_simplified", 10, "répétitions"],
            ["hollow_hold_simplified", 30, "sec"],
            ["toe_taps", 24, "répétitions"]
          ], [
            ["side_leg_lift", 30, "répétitions"],
            ["swimming", 30, "sec"],
            ["side_plank", 60, "sec"]
          ]),
          makeDay(2, "Contrôle Total", 110, "Contrôle total, mobilité et gainage.", [
            ["roll_up_simplified", 10, "répétitions"],
            ["thoracic_rotation", 15, "répétitions"],
            ["superman", 15, "répétitions"]
          ], [
            ["bird_dog", 24, "répétitions"],
            ["core", 35, "sec"],
            ["bridge", 15, "répétitions"]
          ]),
          makeDay(3, "Épreuve du Maître", 110, "Dernière épreuve avant le Dragon Astral.", [
            ["roll_up_simplified", 10, "répétitions"],
            ["hollow_hold_simplified", 30, "sec"],
            ["side_leg_lift", 30, "répétitions"]
          ], [
            ["swimming", 30, "sec"],
            ["toe_taps", 24, "répétitions"],
            ["side_plank", 60, "sec"]
          ])
        ]
      }
    ],
    bosses: [
      {
        week: 1,
        title: "L’Esprit du Lac",
        xp: 60,
        badgeId: "flux-courant-interieur",
        difficultyLabel: "Boss semaine 1 · 3 cycles",
        instructions: "Débloqué après les 3 séances de la semaine 1.",
        lockedMessage: "L’Esprit du Lac attend un centre stable. Termine les 3 séances de la semaine.",
        exercises: makeBossExercises([
          ["swimming", 20, "sec"],
          ["hollow_hold_simplified", 20, "sec"],
          ["dead_bug", 20, "répétitions"],
          ["bird_dog", 20, "répétitions"],
          ["side_plank_knees", 40, "sec"]
        ])
      },
      {
        week: 2,
        title: "Le Sylphe des Ruines",
        xp: 70,
        badgeId: "flux-vents-invisibles",
        difficultyLabel: "Boss semaine 2 · 3 cycles",
        instructions: "Débloqué après les 3 séances de la semaine 2.",
        lockedMessage: "Le Sylphe des Ruines ne suit que les mouvements fluides. Termine les 3 séances.",
        exercises: makeBossExercises([
          ["toe_taps", 20, "répétitions"],
          ["hollow_hold_simplified", 25, "sec"],
          ["swimming", 25, "sec"],
          ["bird_dog", 20, "répétitions"],
          ["superman", 15, "répétitions"]
        ])
      },
      {
        week: 3,
        title: "Le Gardien des Nuages",
        xp: 80,
        badgeId: "flux-arcanes-mouvement",
        difficultyLabel: "Boss semaine 3 · 3 cycles",
        instructions: "Débloqué après les 3 séances de la semaine 3.",
        lockedMessage: "Le Gardien des Nuages attend une vraie harmonie. Termine les 3 séances.",
        exercises: makeBossExercises([
          ["side_leg_lift", 24, "répétitions"],
          ["hollow_hold_simplified", 30, "sec"],
          ["swimming", 30, "sec"],
          ["toe_taps", 24, "répétitions"],
          ["side_plank", 50, "sec"]
        ])
      },
      {
        week: 4,
        title: "Le Dragon Astral",
        xp: 150,
        badgeId: "flux-dragon-astral",
        chest: true,
        nextPrograms: ["archimage-corps", "forge-guerrier", "champion-arenes"],
        difficultyLabel: "Boss final · 30 à 40 min",
        instructions: "Débloqué après les 3 séances de la semaine 4. Coffre mystique final.",
        lockedMessage: "Le Dragon Astral ne descend que devant un Maître du Flux prêt.",
        exercises: makeBossExercises([
          ["roll_up_simplified", 10, "répétitions"],
          ["hollow_hold_simplified", 30, "sec"],
          ["toe_taps", 24, "répétitions"],
          ["side_leg_lift", 30, "répétitions"],
          ["bird_dog", 24, "répétitions"],
          ["swimming", 30, "sec"],
          ["side_plank", 60, "sec"],
          ["pelvic_lift_floor", 15, "répétitions"]
        ], true)
      }
    ],
    progression: [
      "Semaine 1 : Le Courant Intérieur · ajout de Swimming.",
      "Semaine 2 : Les Vents Invisibles · ajout de Toe Taps.",
      "Semaine 3 : Les Arcanes du Mouvement · ajout de Side Leg Lift.",
      "Semaine 4 : Maître du Flux · ajout du Roll Up simplifié.",
      "Chaque séance suit le format : échauffement, The Hundred V2, défi 1, défi 2, retour au calme.",
      "The Hundred est réalisé en version 2 dans les 12 séances et les 4 Boss.",
      "Les défis sont réalisés en 2 cycles.",
      "Chaque Boss commence par The Hundred V2 avant ses 3 cycles.",
      "Le boss du samedi se débloque après les 3 séances de la semaine.",
      "Récompense finale : badge Dragon Astral, coffre mystique et +150 XP."
    ],
    notes: [
      "Programme Pilates intermédiaire, à faire après Tour du Mage.",
      "The Hundred version 2 : jambes tendues à la verticale, talons en contact l’un contre l’autre.",
      "Après The Hundred : 30 secondes de récupération allongé sur le dos.",
      "Objectif : stabilité, contrôle, équilibre et posture.",
      "Les répétitions par côté sont converties en répétitions totales dans l’application.",
      "Les temps par côté sont convertis en durée totale.",
      "Swimming : alterne bras et jambes au sol, sans forcer les lombaires.",
      "Toe Taps : touche le sol avec une pointe de pied en gardant le bassin stable.",
      "Side Leg Lift : élève la jambe latéralement avec contrôle.",
      "Roll Up simplifié : déroule le buste lentement, sans élan brusque."
    ]
  };


  // Les parcours déjà commencés restent identiques (coches, XP, badge).
  const fluxLegacy = data.programDetails["maitre-flux"];
  const fluxSafety = "Respire librement pendant l'effort. Prends 30 à 60 secondes entre les séries. "
    + "Réduis l'amplitude si le bassin ou les lombaires perdent leur stabilité ; arrête en cas de douleur.";
  const fluxMove = (phase, exerciseId, amount, unit, cue) =>
    ex(phase, exerciseId, amount, unit, { cue });

  const fluxComplement = (dayNumber, title, focus, items) => ({
    day: dayNumber,
    title,
    optional: true,
    xp: 0,
    difficultyLabel: dayNumber === 4 ? "≈ 10 à 12 min" : "≈ 12 à 15 min",
    instructions: focus + " Séance facultative, sans XP et sans effet sur le déblocage du boss. " + fluxSafety,
    exercises: [
      fluxMove("Échauffement", "abdominal_breathing", 1, "min", "Respire calmement, sans retenir le souffle."),
      fluxMove("Échauffement", "march_on_spot", 1, "min", "Marche tranquillement pour délier les articulations."),
      ...[1, 2].flatMap((cycle) => items.map(([id, amount, unit, cue]) =>
        fluxMove("Complément · Cycle " + cycle, id, amount, unit, cue)
      )),
      fluxMove("Retour au calme", "gentle_back_stretch", 1, "min", "Détends doucement le dos."),
      fluxMove("Respiration", "slow_breathing", 1, "min", "Ralentis progressivement le rythme respiratoire.")
    ]
  });
  const fluxWeeks = fluxLegacy.weeks.map((week) => ({
    ...week,
    days: [
      ...week.days.map((day) => ({
        ...day,
        exercises: day.exercises.map((item) => item.exerciseId === "roll_up_simplified"
          ? { ...item, amount: day.day === 2 ? 6 : 8,
            cue: "Déroule lentement, genoux pliés si besoin ; aucun élan." }
          : item)
      })),
      fluxComplement(4, "Le Souffle du Courant",
        "Mobilité du dos et récupération active, idéalement un jour sans séance essentielle.", [
          ["cat_cow", 8, "répétitions", "Enroule et redresse doucement la colonne, sans forcer."],
          ["thoracic_rotation", 10, "répétitions", "Cinq rotations par côté, bassin stable."],
          ["pelvic_tilt", 10, "répétitions", "Bascule le bassin dans une amplitude confortable."],
          ["gentle_back_stretch", 60, "sec", "Respire profondément sans tirer sur le dos."]
        ]),
      fluxComplement(5, "L'Équilibre du Courant",
        "Coordination et stabilité avec un appui à proximité.", [
          ["single_leg_balance", 40, "sec", "Vingt secondes par jambe. Garde un appui si nécessaire."],
          ["bird_dog", 12, "répétitions", "Six répétitions par côté, sans cambrer."],
          ["bridge", 12, "répétitions", "Monte et redescends lentement, bassin stable."],
          ["side_leg_lift", 16, "répétitions", "Huit par côté, sans basculer le bassin."]
        ])
    ]
  }));

  const fluxBosses = fluxLegacy.bosses.map((boss) => boss.week !== 4 ? boss : {
    ...boss,
    difficultyLabel: "Boss final · environ 20 à 30 min",
    instructions: "Débloqué après les trois séances essentielles de la semaine 4. "
      + "Deux cycles maîtrisés plutôt que trois, avec pauses libres. Coffre mystique final. " + fluxSafety,
    exercises: [
      ...warmup(),
      fluxMove("Activation Pilates · Version 2", "the_hundred", 10,
        "cycles respiratoires", "Fléchis les genoux si le dos se cambre ; évite de forcer sur la nuque."),
      ...repeatCycles("Cycle", 2, [
        ["roll_up_simplified", 6, "répétitions", { cue: "Monter sans élan, genoux pliés si nécessaire." }],
        ["toe_taps", 20, "répétitions", { cue: "Dix par côté, bassin stable." }],
        ["side_leg_lift", 20, "répétitions", { cue: "Dix par côté, sans déplacer le bassin." }],
        ["bird_dog", 20, "répétitions", { cue: "Dix par côté, gardez le dos neutre." }],
        ["swimming", 20, "sec", { cue: "Petite amplitude, relâche si le bas du dos tire." }],
        ["side_plank_knees", 40, "sec", { cue: "Vingt secondes par côté, genoux au sol." }],
        ["pelvic_lift_floor", 12, "répétitions", { cue: "Déroule progressivement sans cambrer." }]
      ]),
      ...cooldown()
    ]
  });
  data.programDetails["maitre-flux"] = {
    ...fluxLegacy,
    legacyWorkouts: { weeks: fluxLegacy.weeks, bosses: fluxLegacy.bosses },
    workoutRevision: 1,
    subtitle: "Pilates intermédiaire : stabilité du centre, mobilité, coordination et fluidité.",
    duration: "20 à 30 min pour les séances essentielles",
    frequency: "3 séances essentielles et 2 compléments facultatifs par semaine + boss",
    reward: {
      ...fluxLegacy.reward,
      nextPrograms: ["archimage-corps", "forge-guerrier", "champion-arenes"]
    },
    weeks: fluxWeeks,
    bosses: fluxBosses,
    progression: [
      ...fluxLegacy.progression.map((line) => line.startsWith("Chaque Boss commence")
        ? "Les boss des semaines 1 à 3 utilisent trois cycles ; le Dragon Astral en utilise deux."
        : line),
      "Les séances du mardi et du jeudi sont facultatives, sans XP et sans influence sur les boss.",
      "Les trois séances essentielles débloquent le boss de la semaine.",
      "Le Dragon Astral demande désormais deux cycles au lieu de trois, pour privilégier le contrôle."
    ],
    notes: [
      ...fluxLegacy.notes,
      "Objectifs principaux : mobilité et coordination ; objectif secondaire : renforcement du tronc.",
      "Pour The Hundred V2, fléchis les genoux si tu ne peux pas conserver le dos stable.",
      fluxSafety
    ]
  };

  const fluxBadges = [
    {
      id: "flux-courant-interieur",
      icon: "🌊",
      title: "Courant Intérieur",
      description: "Vaincre L’Esprit du Lac, boss de la semaine 1 du programme Maître du Flux.",
      type: "program-boss",
      programId: "maitre-flux",
      weekNumber: 1,
      target: 1,
      imageId: "courantinterieur"
    },
    {
      id: "flux-vents-invisibles",
      icon: "🍃",
      title: "Vents Invisibles",
      description: "Vaincre Le Sylphe des Ruines, boss de la semaine 2 du programme Maître du Flux.",
      type: "program-boss",
      programId: "maitre-flux",
      weekNumber: 2,
      target: 1,
      imageId: "ventsinvisibles"
    },
    {
      id: "flux-arcanes-mouvement",
      icon: "✨",
      title: "Arcanes du Mouvement",
      description: "Vaincre Le Gardien des Nuages, boss de la semaine 3 du programme Maître du Flux.",
      type: "program-boss",
      programId: "maitre-flux",
      weekNumber: 3,
      target: 1,
      imageId: "arcanesdumouvement"
    },
    {
      id: "flux-dragon-astral",
      icon: "🐉",
      title: "Dragon Astral",
      description: "Vaincre le Dragon Astral, boss final du programme Maître du Flux.",
      type: "program-boss",
      programId: "maitre-flux",
      weekNumber: 4,
      target: 1,
      imageId: "dragonastral"
    }
  ];

  fluxBadges.forEach((badge) => upsertById(data.badges, badge));

  if (config) {
    config.programs = Array.isArray(config.programs) ? config.programs : [];
    upsertById(config.programs, {
      id: "maitre-flux",
      icon: "✨",
      title: "Maître du Flux",
      objective: "Pilates intermédiaire · stabilité du centre, mobilité et coordination",
      level: "Niveau 2 · Intermédiaire",
      tier: "intermediate",
      unlockLevel: 2,
      duration: "20-30 min",
      frequency: "3 séances essentielles + 2 compléments facultatifs · 4 semaines + boss",
      coachAdvice: "Elmin ou Satyne",
      xp: 150,
      reward: {
        badgeId: "flux-dragon-astral",
        title: "Dragon Astral",
        chest: true,
        nextPrograms: ["archimage-corps", "forge-guerrier", "champion-arenes"]
      }
    });
  }
};

// ============================================================
// Initialisation des modules
// ============================================================

window.FitnessRpgApp.initModules = function initModules() {
  window.FitnessRpgState?.init?.();
  window.FitnessRpgProgress?.init?.();
  window.FitnessRpgExercises?.init?.();
  window.FitnessRpgPrograms?.init?.();
  window.FitnessRpgMedia?.init?.();
  window.FitnessRpgNavigation?.init?.();
};
// ============================================================
// Rendu global
// ============================================================

window.FitnessRpgApp.render = function render() {
  window.FitnessRpgApp.applyVersion();
  window.FitnessRpgRender.renderAll?.();
  window.FitnessRpgPrograms.afterRender?.();
};

window.FitnessRpgApp.refresh = function refresh() {
  window.FitnessRpgApp.render();
};

// ============================================================
// Debug utile pendant la refonte
// ============================================================

window.FitnessRpgApp.debug = function debug() {
  return {
    ready: window.FitnessRpgApp.ready,
    version: window.FitnessRpgConfig?.displayVersion,
    page: window.FitnessRpgState?.getPage?.(),
    profile: window.FitnessRpgState?.getProfile?.(),
    modules: window.FitnessRpgApp.requiredModules.reduce((acc, moduleName) => {
      acc[moduleName] = Boolean(window[moduleName]);
      return acc;
    }, {})
  };
};

window.FitnessRpgApp.resetLocalData = function resetLocalData() {
  const ok = window.confirm("Supprimer les données locales Fitness RPG V5 ?");

  if (!ok) return;

  const keys = window.FitnessRpgConfig?.storageKeys || {};

  Object.values(keys).forEach((key) => {
    localStorage.removeItem(key);
  });

  window.location.reload();
};

// ============================================================
// Initialisation principale
// ============================================================

window.FitnessRpgApp.init = function init() {
  if (window.FitnessRpgApp.ready) return;

  if (!window.FitnessRpgApp.checkModules()) return;

  window.FitnessRpgApp.applyDataUpdates();
  window.FitnessRpgApp.prepareDom();
  window.FitnessRpgApp.initModules();
  window.FitnessRpgApp.ensureInitialPage();
  window.FitnessRpgApp.render();

  window.FitnessRpgApp.ready = true;

  console.info(`Fitness RPG chargé : ${window.FitnessRpgConfig.displayVersion}`);
};

// ============================================================
// Lancement
// ============================================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", window.FitnessRpgApp.init);
} else {
  window.FitnessRpgApp.init();
}
