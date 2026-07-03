// ============================================================
// Fitness RPG - Add-on Programme : Champion des Arènes
// ------------------------------------------------------------
// À charger après app-config.js et app-data.js.
// Rôle : ajoute un programme avancé, ses exercices et ses badges.
// ============================================================

(function addChampionArenesProgram() {
  const data = window.FitnessRpgData;
  const config = window.FitnessRpgConfig;

  if (!data || !config) {
    console.warn("Champion des Arènes : FitnessRpgData ou FitnessRpgConfig introuvable.");
    return;
  }

  data.exercises = Array.isArray(data.exercises) ? data.exercises : [];
  data.badges = Array.isArray(data.badges) ? data.badges : [];
  data.programDetails = data.programDetails || {};
  config.programs = Array.isArray(config.programs) ? config.programs : [];

  function upsertById(list, item) {
    const index = list.findIndex((existing) => existing.id === item.id);

    if (index >= 0) {
      list[index] = {
        ...list[index],
        ...item
      };
      return;
    }

    list.push(item);
  }

  function addExercise(item) {
    upsertById(data.exercises, item);
  }

  function addBadge(item) {
    upsertById(data.badges, item);
  }

  function addNextProgram(programId, nextProgramId) {
    const detail = data.programDetails?.[programId];
    if (!detail) return;

    detail.reward = detail.reward || {};
    detail.reward.nextPrograms = Array.isArray(detail.reward.nextPrograms)
      ? detail.reward.nextPrograms
      : [];

    if (!detail.reward.nextPrograms.includes(nextProgramId)) {
      detail.reward.nextPrograms.push(nextProgramId);
    }

    const finalBoss = Array.isArray(detail.bosses)
      ? detail.bosses.find((boss) => Number(boss.week) === 4)
      : null;

    if (finalBoss) {
      finalBoss.nextPrograms = Array.isArray(finalBoss.nextPrograms)
        ? finalBoss.nextPrograms
        : [];

      if (!finalBoss.nextPrograms.includes(nextProgramId)) {
        finalBoss.nextPrograms.push(nextProgramId);
      }
    }
  }

  function imageSet() {
    return {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    };
  }

  function challenge(number, cycles, items) {
    const list = [];

    for (let cycle = 1; cycle <= cycles; cycle += 1) {
      items.forEach((item) => {
        list.push({
          phase: `Défi ${number} · Cycle ${cycle}`,
          exerciseId: item.exerciseId,
          amount: item.amount,
          unit: item.unit
        });
      });
    }

    return list;
  }

  function workout(items = {}) {
    const cycles = Number(items.cycles || 3);

    return [
      { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
      ...challenge(1, cycles, items.defi1 || []),
      ...challenge(2, cycles, items.defi2 || []),
      ...(items.finisher || []).map((item) => ({
        phase: "Finisher",
        exerciseId: item.exerciseId,
        amount: item.amount,
        unit: item.unit,
        distanceOptional: item.distanceOptional || false
      })),
      { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
    ];
  }

  function reps(week) {
    return ({
      1: 10,
      2: 14,
      3: 16,
      4: 20
    })[Number(week)] || 10;
  }

  function coreSeconds(week) {
    return ({
      1: 30,
      2: 40,
      3: 50,
      4: 60
    })[Number(week)] || 30;
  }

  function pullups(week) {
    return ({
      1: 5,
      2: 6,
      3: 8,
      4: 10
    })[Number(week)] || 5;
  }

  function tgu(week) {
    return ({
      1: 5,
      2: 6,
      3: 8,
      4: 10
    })[Number(week)] || 5;
  }

  function bagMinutes(week) {
    return ({
      1: 5,
      2: 7,
      3: 9,
      4: 12
    })[Number(week)] || 5;
  }

  function e(exerciseId, amount, unit = "répétitions", extra = {}) {
    return {
      exerciseId,
      amount,
      unit,
      ...extra
    };
  }

  function day(week, dayNumber, title, xp, difficultyLabel, instructions, defi1, defi2, finisher = null) {
    return {
      day: dayNumber,
      title,
      xp,
      difficultyLabel,
      instructions,
      exercises: workout({
        cycles: 3,
        defi1,
        defi2,
        finisher: finisher || [e("heavy_bag_rounds", bagMinutes(week), "min")]
      })
    };
  }

  function indoorBoss(week, title, mission, defi1, defi2) {
    return {
      id: "indoor",
      label: "🏠 Boss Intérieur",
      title,
      mission,
      difficultyLabel: week === 4 ? "≈ 60 à 75 min" : "≈ 45 à 70 min",
      exercises: workout({
        cycles: 3,
        defi1,
        defi2,
        finisher: [e("heavy_bag_rounds", bagMinutes(week), "min")]
      })
    };
  }

  function outdoorBoss(week, title, mission, bikeMinutes, accelerationMinutes) {
    return {
      id: "outdoor",
      label: "🌲 Boss Extérieur",
      title,
      mission,
      difficultyLabel: `≈ ${bikeMinutes + accelerationMinutes + 10} min`,
      exercises: workout({
        cycles: 1,
        defi1: [e("bike", bikeMinutes, "min", { distanceOptional: true })],
        defi2: [e("bike_acceleration", accelerationMinutes, "min")],
        finisher: [e("bike", 5, "min", { distanceOptional: true })]
      })
    };
  }

  // ------------------------------------------------------------
  // Exercices avancés
  // ------------------------------------------------------------

  addExercise({
    id: "advanced_standard_warmup",
    categoryId: "warmup",
    title: "Échauffement standard avancé",
    images: imageSet(),
    unit: "min",
    defaultValue: 5,
    min: 5,
    step: 1,
    xpPerUnit: 1,
    stat: "Préparation complète",
    pose: "warmup",
    hasTimer: true,
    description: "Routine standard avant chaque séance avancée : 1 min de marche active, 30 sec de cercles d’épaules avant, 30 sec arrière, 30 sec de cercles de hanches, 30 sec de montées de genoux, 30 sec de talons-fesses, 5 Bird Dog par côté, 10 squats poids du corps et 10 pompes murales.",
    shortDescription: "Routine complète de 5 min avant l’effort.",
    coachTip: "Monte progressivement en température. Le but est de préparer les articulations, pas de te fatiguer avant la bataille."
  });

  addExercise({
    id: "advanced_standard_cooldown",
    categoryId: "stretch",
    title: "Retour au calme standard avancé",
    images: imageSet(),
    unit: "min",
    defaultValue: 5,
    min: 5,
    step: 1,
    xpPerUnit: 1,
    stat: "Récupération",
    pose: "stretch",
    hasTimer: true,
    description: "Routine standard après chaque séance avancée : 1 min de marche lente, 30 sec d’étirement quadriceps par jambe, 30 sec d’étirement mollets par jambe, 30 sec d’étirement poitrine, 30 sec d’étirement dos, 30 sec d’étirement épaules par bras, puis 1 min de respiration profonde avec inspiration 4 sec et expiration 6 sec.",
    shortDescription: "Routine complète de récupération de 5 min.",
    coachTip: "La récupération scelle l’entraînement. Respire lentement et laisse le rythme redescendre."
  });

  addExercise({
    id: "goblet_squat",
    categoryId: "strength",
    title: "Goblet Squat",
    images: imageSet(),
    unit: "répétitions",
    defaultValue: 12,
    min: 1,
    step: 1,
    xpPerUnit: 1.4,
    stat: "Jambes / force",
    pose: "squats",
    description: "Tiens la kettlebell contre la poitrine. Descends en squat puis remonte en gardant le buste solide.",
    shortDescription: "Squat avec kettlebell contre la poitrine.",
    coachTip: "Garde les talons au sol et les genoux souples."
  });

  addExercise({
    id: "bench_press",
    categoryId: "muscle",
    title: "Développé couché",
    images: imageSet(),
    unit: "répétitions",
    defaultValue: 10,
    min: 1,
    step: 1,
    xpPerUnit: 1.5,
    stat: "Pectoraux / triceps",
    pose: "core",
    description: "Allongé sur le banc, pousse la charge au-dessus de la poitrine puis contrôle la descente.",
    shortDescription: "Pousser une charge depuis le banc.",
    coachTip: "Contrôle la descente et garde les épaules stables."
  });

  addExercise({
    id: "resistance_band_row",
    categoryId: "muscle",
    title: "Rowing élastique",
    images: imageSet(),
    unit: "répétitions",
    defaultValue: 15,
    min: 1,
    step: 1,
    xpPerUnit: 1.1,
    stat: "Dos / posture",
    pose: "core",
    description: "Tire l’élastique vers toi en rapprochant les omoplates, puis reviens lentement.",
    shortDescription: "Tirage élastique vers le buste.",
    coachTip: "Ne hausse pas les épaules. Pense à serrer les omoplates."
  });

  addExercise({
    id: "kettlebell_swing",
    categoryId: "strength",
    title: "Swing kettlebell",
    images: imageSet(),
    unit: "répétitions",
    defaultValue: 15,
    min: 1,
    step: 1,
    xpPerUnit: 1.4,
    stat: "Hanches / explosivité",
    pose: "squats",
    description: "Propulse la kettlebell grâce aux hanches. Les bras guident, les jambes et les hanches produisent le mouvement.",
    shortDescription: "Mouvement explosif de hanches avec kettlebell.",
    coachTip: "Le mouvement vient des jambes et des hanches, pas des bras."
  });

  addExercise({
    id: "kettlebell_military_press",
    categoryId: "muscle",
    title: "Développé militaire",
    images: imageSet(),
    unit: "répétitions",
    defaultValue: 10,
    min: 1,
    step: 1,
    xpPerUnit: 1.4,
    stat: "Épaules / gainage",
    pose: "core",
    description: "Pousse la kettlebell au-dessus de la tête en gardant le tronc stable.",
    shortDescription: "Poussée verticale avec kettlebell.",
    coachTip: "Contracte les abdos pendant le mouvement."
  });

  addExercise({
    id: "kettlebell_deadlift",
    categoryId: "strength",
    title: "Soulevé de terre kettlebell",
    images: imageSet(),
    unit: "répétitions",
    defaultValue: 12,
    min: 1,
    step: 1,
    xpPerUnit: 1.5,
    stat: "Chaîne postérieure",
    pose: "squats",
    description: "Ramasse la kettlebell depuis le sol en gardant le dos droit, puis redresse-toi avec les hanches.",
    shortDescription: "Soulevé depuis le sol avec kettlebell.",
    coachTip: "Pousse les hanches vers l’arrière et garde le dos fier."
  });

  addExercise({
    id: "turkish_get_up",
    categoryId: "strength",
    title: "Turkish Get-Up",
    images: imageSet(),
    unit: "répétitions",
    defaultValue: 10,
    min: 1,
    step: 1,
    xpPerUnit: 2,
    stat: "Technique / stabilité",
    pose: "core",
    description: "Passe progressivement de la position allongée à debout en gardant la kettlebell bras tendu. Redescends avec contrôle.",
    shortDescription: "Transition allongé-debout avec charge stabilisée.",
    coachTip: "Privilégie la technique avant la vitesse. Charge légère, mouvement propre."
  });

  addExercise({
    id: "heavy_bag_rounds",
    categoryId: "cardio",
    title: "Sac de frappe",
    images: imageSet(),
    unit: "min",
    defaultValue: 5,
    min: 1,
    step: 1,
    xpPerUnit: 2,
    stat: "Combat / cardio",
    pose: "core",
    hasTimer: true,
    description: "Enchaîne coups simples, garde active et déplacements. Travaille proprement plutôt que fort.",
    shortDescription: "Rounds au sac de frappe.",
    coachTip: "Respire à chaque frappe et bouge les pieds."
  });

  addExercise({
    id: "walking_lunges",
    categoryId: "strength",
    title: "Fentes marchées",
    images: imageSet(),
    unit: "répétitions",
    defaultValue: 20,
    min: 2,
    step: 2,
    xpPerUnit: 1.3,
    stat: "Jambes / stabilité",
    pose: "squats",
    description: "Avance en fente, remonte, puis enchaîne avec l’autre jambe. Garde le buste droit.",
    shortDescription: "Fentes en avançant.",
    coachTip: "Cherche la stabilité avant la profondeur."
  });

  addExercise({
    id: "assisted_pullups",
    categoryId: "muscle",
    title: "Tractions assistées",
    images: imageSet(),
    unit: "répétitions",
    defaultValue: 5,
    min: 1,
    step: 1,
    xpPerUnit: 2,
    stat: "Dos / bras",
    pose: "core",
    description: "Utilise un élastique, un appui ou une assistance pour réaliser une traction contrôlée.",
    shortDescription: "Tractions avec assistance.",
    coachTip: "Descends lentement et garde les épaules actives."
  });

  addExercise({
    id: "pullups_clean_max",
    categoryId: "muscle",
    title: "Tractions propres",
    images: imageSet(),
    unit: "répétitions",
    defaultValue: 5,
    min: 1,
    step: 1,
    xpPerUnit: 2.2,
    stat: "Dos / force",
    pose: "core",
    description: "Réalise le maximum de tractions propres, sans balancer le corps. Arrête quand la technique se dégrade.",
    shortDescription: "Maximum propre de tractions.",
    coachTip: "La dernière répétition correcte vaut mieux que trois répétitions tordues."
  });

  addExercise({
    id: "face_pull",
    categoryId: "muscle",
    title: "Face Pull",
    images: imageSet(),
    unit: "répétitions",
    defaultValue: 15,
    min: 1,
    step: 1,
    xpPerUnit: 1.1,
    stat: "Épaules / posture",
    pose: "core",
    description: "Tire l’élastique vers le visage, coudes ouverts, en contrôlant le retour.",
    shortDescription: "Tirage visage avec élastique.",
    coachTip: "Garde les épaules basses et les omoplates actives."
  });

  addExercise({
    id: "bike_acceleration",
    categoryId: "bike",
    title: "Accélérations vélo",
    images: imageSet(),
    unit: "min",
    defaultValue: 3,
    min: 1,
    step: 1,
    xpPerUnit: 2,
    stat: "Vélo / intensité",
    pose: "bike",
    hasTimer: true,
    hasDistance: false,
    description: "Pendant une sortie vélo, ajoute des accélérations courtes puis reviens à ton rythme confortable.",
    shortDescription: "Accélérations courtes à vélo.",
    coachTip: "Accélère franchement, sans transformer la sortie en sprint suicidaire."
  });

  // ------------------------------------------------------------
  // Programme : Champion des Arènes
  // ------------------------------------------------------------

  data.programDetails["champion-arenes"] = {
    id: "champion-arenes",
    subtitle: "Programme avancé de force, kettlebell, traction, banc, élastique et sac de frappe.",
    unlockLevel: 8,
    duration: "45 à 75 min",
    frequency: "3 séances par semaine + boss hebdomadaire",
    material: "Kettlebell, banc de musculation, élastique, barre de traction, sac de frappe, poids du corps.",
    reward: {
      badgeId: "champion-arenes-vaincu",
      badgeTitle: "Champion des Arènes",
      chest: true,
      nextPrograms: []
    },
    standardWarmup: "advanced_standard_warmup",
    standardCooldown: "advanced_standard_cooldown",

    weeks: [
      {
        week: 1,
        title: "Entrée dans l’Arène",
        xp: 100,
        progression: "Structure fixe : échauffement, défi 1, défi 2, finisher, retour au calme. Les répétitions démarrent à 10 par passage.",
        days: [
          day(1, 1, "Force du Champion", 100, "≈ 45 à 60 min", "Force de base, tirage, poussée et premier finisher au sac.",
            [e("goblet_squat", 10), e("bench_press", 10), e("resistance_band_row", 10)],
            [e("walking_lunges", 10), e("core", 30, "sec"), e("calf_raises", 10)]
          ),
          day(1, 2, "Marteau et Bouclier", 100, "≈ 45 à 60 min", "Épaules, dos, charnière de hanches et stabilité.",
            [e("kettlebell_deadlift", 10), e("kettlebell_military_press", 10), e("face_pull", 10)],
            [e("kettlebell_swing", 10), e("bird_dog", 10), e("side_plank", 30, "sec")]
          ),
          day(1, 3, "Chaîne de l’Arène", 100, "≈ 45 à 60 min", "Tractions assistées, squat, poussée et technique contrôlée.",
            [e("assisted_pullups", 5), e("goblet_squat", 10), e("bench_press", 10)],
            [e("turkish_get_up", 5), e("resistance_band_row", 10), e("core", 30, "sec")]
          )
        ]
      },
      {
        week: 2,
        title: "La Corne du Minotaure",
        xp: 115,
        progression: "Progression à 14 répétitions maximum par passage. Développé militaire et Face Pull passent à 14.",
        days: [
          day(2, 1, "Épaules du Minotaure", 115, "≈ 50 à 65 min", "Poussée verticale, tirage assisté, posture et sac de frappe.",
            [e("kettlebell_military_press", 14), e("assisted_pullups", 6), e("face_pull", 14)],
            [e("kettlebell_swing", 14), e("bird_dog", 14), e("side_plank", 40, "sec")]
          ),
          day(2, 2, "Hanches de Bronze", 115, "≈ 50 à 60 min", "Charnière de hanches, jambes et force de poussée.",
            [e("kettlebell_deadlift", 14), e("goblet_squat", 14), e("walking_lunges", 14)],
            [e("bench_press", 14), e("resistance_band_row", 14), e("core", 40, "sec")]
          ),
          day(2, 3, "Combat du Cercle", 115, "≈ 45 à 60 min", "Conditionnement, posture et noyau solide.",
            [e("kettlebell_swing", 14), e("goblet_squat", 14), e("face_pull", 14)],
            [e("core", 40, "sec"), e("side_plank", 40, "sec"), e("bird_dog", 14)]
          )
        ]
      },
      {
        week: 3,
        title: "Le Fer et la Cendre",
        xp: 130,
        progression: "Progression à 16 répétitions maximum par passage. Les tractions propres restent limitées à 8.",
        days: [
          day(3, 1, "Force du Seigneur de Fer", 130, "≈ 55 à 70 min", "Jambes, poussée, traction et sac de frappe plus long.",
            [e("kettlebell_deadlift", 16), e("goblet_squat", 16), e("calf_raises", 16)],
            [e("bench_press", 16), e("pullups_clean_max", 8), e("core", 50, "sec")]
          ),
          day(3, 2, "Forge du Corps Entier", 130, "≈ 50 à 65 min", "Puissance de hanches, épaules et stabilité.",
            [e("kettlebell_swing", 16), e("kettlebell_military_press", 16), e("walking_lunges", 16)],
            [e("resistance_band_row", 16), e("face_pull", 16), e("side_plank", 50, "sec")]
          ),
          day(3, 3, "Technique du Maître", 130, "≈ 50 à 65 min", "Technique kettlebell, traction et posture.",
            [e("turkish_get_up", 8), e("goblet_squat", 16), e("bench_press", 16)],
            [e("pullups_clean_max", 8), e("face_pull", 16), e("core", 50, "sec")]
          )
        ]
      },
      {
        week: 4,
        title: "Champion des Arènes",
        xp: 150,
        progression: "Semaine finale : 20 répétitions maximum par passage. Gainage plafonné à 60 secondes.",
        days: [
          day(4, 1, "Jambes du Champion", 150, "≈ 55 à 70 min", "Jambes, chaîne postérieure, noyau et finisher.",
            [e("goblet_squat", 20), e("kettlebell_deadlift", 20), e("walking_lunges", 20)],
            [e("calf_raises", 20), e("core", 60, "sec"), e("side_plank", 60, "sec")]
          ),
          day(4, 2, "Armes du Champion", 150, "≈ 55 à 70 min", "Poussée, tirage, épaules et posture.",
            [e("bench_press", 20), e("kettlebell_military_press", 20), e("resistance_band_row", 20)],
            [e("pullups_clean_max", 10), e("face_pull", 20), e("core", 60, "sec")]
          ),
          day(4, 3, "Raid des Arènes", 150, "≈ 60 à 75 min", "Séance complète avant le boss final.",
            [e("goblet_squat", 20), e("bench_press", 20), e("resistance_band_row", 20)],
            [e("kettlebell_military_press", 20), e("face_pull", 20), e("turkish_get_up", 10)]
          )
        ]
      }
    ],

    bosses: [
      {
        week: 1,
        title: "L’Ogre des Fosses",
        subtitle: "Premier raid de l’arène.",
        xp: 100,
        badgeId: "ogre-fosses-vaincu",
        difficultyLabel: "Boss semaine 1 · 45 à 60 min",
        instructions: "Débloqué après les 3 séances de la semaine 1.",
        lockedMessage: "L’Ogre des Fosses attend un adversaire préparé. Termine tes 3 séances avant d’entrer dans l’arène.",
        variants: {
          indoor: indoorBoss(1, "Fosse d’entraînement", "Même structure que les séances : échauffement, deux défis, finisher et retour au calme.",
            [e("goblet_squat", 10), e("bench_press", 10), e("resistance_band_row", 10)],
            [e("walking_lunges", 10), e("core", 30, "sec"), e("calf_raises", 10)]
          ),
          outdoor: outdoorBoss(1, "Charge hors des fosses", "Vélo 45 min, accélérations, finisher court et récupération complète.", 45, 3)
        }
      },
      {
        week: 2,
        title: "Le Minotaure",
        subtitle: "Le gardien du labyrinthe d’acier.",
        xp: 125,
        badgeId: "minotaure-vaincu",
        difficultyLabel: "Boss semaine 2 · 50 à 65 min",
        instructions: "Débloqué après les 3 séances de la semaine 2.",
        lockedMessage: "Le Minotaure attend au centre du labyrinthe. Termine les 3 séances de la semaine 2.",
        variants: {
          indoor: indoorBoss(2, "Labyrinthe de force", "Développé militaire et Face Pull à 14 répétitions, puis finisher au sac.",
            [e("kettlebell_military_press", 14), e("assisted_pullups", 6), e("face_pull", 14)],
            [e("kettlebell_swing", 14), e("bird_dog", 14), e("side_plank", 40, "sec")]
          ),
          outdoor: outdoorBoss(2, "Charge du Minotaure", "Vélo 60 min avec accélérations, finisher court et récupération complète.", 60, 5)
        }
      },
      {
        week: 3,
        title: "Le Seigneur de Fer",
        subtitle: "Le gardien des chaînes et des enclumes.",
        xp: 150,
        badgeId: "seigneur-fer-vaincu",
        difficultyLabel: "Boss semaine 3 · 55 à 70 min",
        instructions: "Débloqué après les 3 séances de la semaine 3.",
        lockedMessage: "Le Seigneur de Fer ne s’incline pas devant les entraînements incomplets.",
        variants: {
          indoor: indoorBoss(3, "Forge de l’arène", "Défis à 16 répétitions, tractions propres limitées à 8 et finisher au sac.",
            [e("kettlebell_deadlift", 16), e("goblet_squat", 16), e("calf_raises", 16)],
            [e("bench_press", 16), e("pullups_clean_max", 8), e("core", 50, "sec")]
          ),
          outdoor: outdoorBoss(3, "Route du Fer", "Vélo 75 min avec accélérations, finisher court et récupération complète.", 75, 6)
        }
      },
      {
        week: 4,
        title: "Champion des Arènes",
        subtitle: "Boss final : le raid complet.",
        xp: 250,
        badgeId: "champion-arenes-vaincu",
        chest: true,
        difficultyLabel: "Boss final · 60 à 75 min",
        instructions: "Débloqué après les 3 séances de la semaine 4.",
        lockedMessage: "La foule attend un champion, pas un héros à moitié préparé. Termine ta semaine.",
        variants: {
          indoor: indoorBoss(4, "Raid final des Arènes", "Défis à 20 répétitions maximum, gainage à 60 secondes maximum et finisher final.",
            [e("goblet_squat", 20), e("bench_press", 20), e("resistance_band_row", 20)],
            [e("kettlebell_military_press", 20), e("face_pull", 20), e("turkish_get_up", 10)]
          ),
          outdoor: outdoorBoss(4, "La Route des Héros", "Mission vélo finale : 90 min ou objectif personnel équivalent, avec accélérations et récupération.", 90, 8)
        }
      }
    ],

    progression: [
      "Semaine 1 : Entrée dans l’Arène · 10 répétitions par passage, sauf tractions et Turkish Get-Up.",
      "Semaine 2 : La Corne du Minotaure · 14 répétitions par passage, développé militaire et Face Pull inclus.",
      "Semaine 3 : Le Fer et la Cendre · 16 répétitions par passage, tractions propres limitées à 8.",
      "Semaine 4 : Champion des Arènes · 20 répétitions maximum par passage, gainage limité à 60 sec.",
      "Chaque séance suit toujours le même schéma : échauffement, défi 1, défi 2, finisher, retour au calme.",
      "Chaque exercice est référencé dans les données, afin d’afficher son image cliquable et son explication.",
      "Récompense finale : badge légendaire Champion des Arènes, coffre épique et +250 XP."
    ],

    notes: [
      "Programme avancé : réservé aux joueurs déjà à l’aise avec les mouvements de base.",
      "Choisir des charges permettant de garder une technique propre.",
      "Progression des répétitions : 10 en semaine 1, 14 en semaine 2, 16 en semaine 3, 20 maximum en semaine 4.",
      "Les valeurs affichées sont les répétitions d’un exercice sur un passage, pas le total cumulé des cycles.",
      "Tractions et Turkish Get-Up restent volontairement plus bas : 5, 6, 8 puis 10 répétitions maximum.",
      "Pour les tractions max propre : arrêter dès que la posture se dégrade.",
      "Pour le Turkish Get-Up : privilégier une charge légère et un mouvement lent."
    ]
  };

  // ------------------------------------------------------------
  // Entrée du catalogue programmes
  // ------------------------------------------------------------

  upsertById(config.programs, {
    id: "champion-arenes",
    icon: "🏟️",
    title: "Champion des Arènes",
    objective: "Musculation avancée + combat",
    level: "Avancé",
    tier: "advanced",
    unlockLevel: 8,
    duration: "45-75 min",
    frequency: "3 séances par semaine + boss hebdomadaire",
    coachAdvice: "Korvan, Xara ou Bazul",
    xp: 90,
    reward: {
      badgeId: "champion-arenes-vaincu",
      title: "Champion des Arènes",
      chest: true,
      nextPrograms: []
    }
  });

  // ------------------------------------------------------------
  // Badges du programme
  // ------------------------------------------------------------

  addBadge({
    id: "ogre-fosses-vaincu",
    icon: "👹",
    title: "Ogre des Fosses",
    description: "Vaincre le boss de la semaine 1 du programme Champion des Arènes.",
    type: "program-boss",
    programId: "champion-arenes",
    weekNumber: 1,
    target: 1
  });

  addBadge({
    id: "minotaure-vaincu",
    icon: "🐂",
    title: "Minotaure",
    description: "Vaincre le boss de la semaine 2 du programme Champion des Arènes.",
    type: "program-boss",
    programId: "champion-arenes",
    weekNumber: 2,
    target: 1
  });

  addBadge({
    id: "seigneur-fer-vaincu",
    icon: "⚒️",
    title: "Seigneur de Fer",
    description: "Vaincre le boss de la semaine 3 du programme Champion des Arènes.",
    type: "program-boss",
    programId: "champion-arenes",
    weekNumber: 3,
    target: 1
  });

  addBadge({
    id: "champion-arenes-vaincu",
    icon: "🏟️",
    title: "Champion des Arènes",
    description: "Vaincre le boss final du programme Champion des Arènes.",
    type: "program-boss",
    programId: "champion-arenes",
    weekNumber: 4,
    target: 1
  });

  addNextProgram("maitre-flux", "champion-arenes");
})();
