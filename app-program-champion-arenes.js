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

  // ------------------------------------------------------------
  // Exercices avancés
  // ------------------------------------------------------------

  addExercise({
    id: "advanced_standard_warmup",
    categoryId: "warmup",
    title: "Échauffement standard avancé",
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    images: {
      homme: "assets/exercices/homme_default.png",
      femme: "assets/exercices/femme_default.png",
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
        progression: "On installe les bases avancées : force contrôlée, tirage, poussée et premier finisher au sac.",
        days: [
          {
            day: 1,
            title: "Force du Champion",
            xp: 100,
            difficultyLabel: "≈ 45 à 60 min",
            instructions: "Échauffement standard, deux défis en 3 cycles, sac de frappe, puis retour au calme standard.",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Défi 1 · Cycle 1", exerciseId: "goblet_squat", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 1", exerciseId: "bench_press", amount: 10, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 1", exerciseId: "resistance_band_row", amount: 15, unit: "répétitions" },
              { phase: "Repos", exerciseId: "slow_breathing", amount: 1, unit: "min" },
              { phase: "Défi 1 · Cycle 2", exerciseId: "goblet_squat", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 2", exerciseId: "bench_press", amount: 10, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 2", exerciseId: "resistance_band_row", amount: 15, unit: "répétitions" },
              { phase: "Repos", exerciseId: "slow_breathing", amount: 1, unit: "min" },
              { phase: "Défi 1 · Cycle 3", exerciseId: "goblet_squat", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 3", exerciseId: "bench_press", amount: 10, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 3", exerciseId: "resistance_band_row", amount: 15, unit: "répétitions" },
              { phase: "Défi 2 · Cycle 1", exerciseId: "walking_lunges", amount: 20, unit: "répétitions" },
              { phase: "Défi 2 · Cycle 1", exerciseId: "core", amount: 30, unit: "sec" },
              { phase: "Défi 2 · Cycle 1", exerciseId: "calf_raises", amount: 25, unit: "répétitions" },
              { phase: "Défi 2 · Cycle 2", exerciseId: "walking_lunges", amount: 20, unit: "répétitions" },
              { phase: "Défi 2 · Cycle 2", exerciseId: "core", amount: 30, unit: "sec" },
              { phase: "Défi 2 · Cycle 2", exerciseId: "calf_raises", amount: 25, unit: "répétitions" },
              { phase: "Défi 2 · Cycle 3", exerciseId: "walking_lunges", amount: 20, unit: "répétitions" },
              { phase: "Défi 2 · Cycle 3", exerciseId: "core", amount: 30, unit: "sec" },
              { phase: "Défi 2 · Cycle 3", exerciseId: "calf_raises", amount: 25, unit: "répétitions" },
              { phase: "Finisher · Sac 3 rounds", exerciseId: "heavy_bag_rounds", amount: 5, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          },
          {
            day: 2,
            title: "Marteau et Bouclier",
            xp: 100,
            difficultyLabel: "≈ 45 à 60 min",
            instructions: "Travail épaules, dos et charnière de hanches.",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Défi 1 · Cycle 1", exerciseId: "kettlebell_deadlift", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 1", exerciseId: "kettlebell_military_press", amount: 10, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 1", exerciseId: "face_pull", amount: 15, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 2", exerciseId: "kettlebell_deadlift", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 2", exerciseId: "kettlebell_military_press", amount: 10, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 2", exerciseId: "face_pull", amount: 15, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 3", exerciseId: "kettlebell_deadlift", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 3", exerciseId: "kettlebell_military_press", amount: 10, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 3", exerciseId: "face_pull", amount: 15, unit: "répétitions" },
              { phase: "Défi 2 · Cycle 1", exerciseId: "kettlebell_swing", amount: 15, unit: "répétitions" },
              { phase: "Défi 2 · Cycle 1", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
              { phase: "Défi 2 · Cycle 1", exerciseId: "side_plank", amount: 40, unit: "sec" },
              { phase: "Défi 2 · Cycle 2", exerciseId: "kettlebell_swing", amount: 15, unit: "répétitions" },
              { phase: "Défi 2 · Cycle 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
              { phase: "Défi 2 · Cycle 2", exerciseId: "side_plank", amount: 40, unit: "sec" },
              { phase: "Finisher · Sac 4 rounds", exerciseId: "heavy_bag_rounds", amount: 6, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          },
          {
            day: 3,
            title: "Chaîne de l’Arène",
            xp: 100,
            difficultyLabel: "≈ 45 à 60 min",
            instructions: "Séance complète avec traction assistée et technique kettlebell.",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Défi 1 · Cycle 1", exerciseId: "assisted_pullups", amount: 5, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 1", exerciseId: "goblet_squat", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 1", exerciseId: "bench_press", amount: 10, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 2", exerciseId: "assisted_pullups", amount: 5, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 2", exerciseId: "goblet_squat", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 2", exerciseId: "bench_press", amount: 10, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 3", exerciseId: "assisted_pullups", amount: 5, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 3", exerciseId: "goblet_squat", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 3", exerciseId: "bench_press", amount: 10, unit: "répétitions" },
              { phase: "Technique", exerciseId: "turkish_get_up", amount: 4, unit: "répétitions" },
              { phase: "Finisher · Sac 4 rounds", exerciseId: "heavy_bag_rounds", amount: 6, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          }
        ]
      },
      {
        week: 2,
        title: "La Corne du Minotaure",
        xp: 115,
        progression: "On augmente les cycles et on introduit plus d’épaules, de tractions et de gainage latéral.",
        days: [
          {
            day: 1,
            title: "Épaules du Minotaure",
            xp: 115,
            difficultyLabel: "≈ 50 à 65 min",
            instructions: "Poussée verticale, tirage assisté, posture et sac de frappe.",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Défi 1 · 4 cycles", exerciseId: "kettlebell_military_press", amount: 48, unit: "répétitions" },
              { phase: "Défi 1 · 4 cycles", exerciseId: "assisted_pullups", amount: 20, unit: "répétitions" },
              { phase: "Défi 1 · 4 cycles", exerciseId: "face_pull", amount: 60, unit: "répétitions" },
              { phase: "Défi 2 · 4 cycles", exerciseId: "kettlebell_swing", amount: 60, unit: "répétitions" },
              { phase: "Défi 2 · 4 cycles", exerciseId: "bird_dog", amount: 40, unit: "répétitions" },
              { phase: "Défi 2 · 4 cycles", exerciseId: "side_plank", amount: 160, unit: "sec" },
              { phase: "Combat final · Sac 5 rounds", exerciseId: "heavy_bag_rounds", amount: 7, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          },
          {
            day: 2,
            title: "Hanches de Bronze",
            xp: 115,
            difficultyLabel: "≈ 50 à 60 min",
            instructions: "Charnière de hanches, jambes et force de poussée.",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Défi 1 · Cycle 1", exerciseId: "kettlebell_deadlift", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 1", exerciseId: "goblet_squat", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 1", exerciseId: "walking_lunges", amount: 20, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 2", exerciseId: "kettlebell_deadlift", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 2", exerciseId: "goblet_squat", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 2", exerciseId: "walking_lunges", amount: 20, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 3", exerciseId: "kettlebell_deadlift", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 3", exerciseId: "goblet_squat", amount: 12, unit: "répétitions" },
              { phase: "Défi 1 · Cycle 3", exerciseId: "walking_lunges", amount: 20, unit: "répétitions" },
              { phase: "Défi 2 · 3 cycles", exerciseId: "bench_press", amount: 30, unit: "répétitions" },
              { phase: "Défi 2 · 3 cycles", exerciseId: "resistance_band_row", amount: 45, unit: "répétitions" },
              { phase: "Défi 2 · 3 cycles", exerciseId: "core", amount: 120, unit: "sec" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          },
          {
            day: 3,
            title: "Combat du Cercle",
            xp: 115,
            difficultyLabel: "≈ 45 à 60 min",
            instructions: "Séance orientée conditionnement : swings, gainage et sac.",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Puissance · 4 cycles", exerciseId: "kettlebell_swing", amount: 60, unit: "répétitions" },
              { phase: "Puissance · 4 cycles", exerciseId: "goblet_squat", amount: 48, unit: "répétitions" },
              { phase: "Posture · 4 cycles", exerciseId: "face_pull", amount: 60, unit: "répétitions" },
              { phase: "Noyau · 4 cycles", exerciseId: "core", amount: 120, unit: "sec" },
              { phase: "Combat final · Sac 5 rounds", exerciseId: "heavy_bag_rounds", amount: 7, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          }
        ]
      },
      {
        week: 3,
        title: "Le Fer et la Cendre",
        xp: 130,
        progression: "Le programme devient plus dense : tractions propres, deadlift, gainage long et sac de frappe plus présent.",
        days: [
          {
            day: 1,
            title: "Force du Seigneur de Fer",
            xp: 130,
            difficultyLabel: "≈ 55 à 70 min",
            instructions: "Gros bloc jambes, puis haut du corps et sac de frappe.",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Défi 1 · 4 cycles", exerciseId: "kettlebell_deadlift", amount: 48, unit: "répétitions" },
              { phase: "Défi 1 · 4 cycles", exerciseId: "goblet_squat", amount: 60, unit: "répétitions" },
              { phase: "Défi 1 · 4 cycles", exerciseId: "calf_raises", amount: 100, unit: "répétitions" },
              { phase: "Défi 2 · 4 cycles", exerciseId: "bench_press", amount: 40, unit: "répétitions" },
              { phase: "Défi 2 · 4 cycles", exerciseId: "pullups_clean_max", amount: 20, unit: "répétitions" },
              { phase: "Défi 2 · 4 cycles", exerciseId: "core", amount: 160, unit: "sec" },
              { phase: "Combat final · Sac 6 rounds", exerciseId: "heavy_bag_rounds", amount: 9, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          },
          {
            day: 2,
            title: "Forge du Corps Entier",
            xp: 130,
            difficultyLabel: "≈ 50 à 65 min",
            instructions: "Puissance de hanches, épaules et stabilité.",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Défi 1 · 4 cycles", exerciseId: "kettlebell_swing", amount: 60, unit: "répétitions" },
              { phase: "Défi 1 · 4 cycles", exerciseId: "kettlebell_military_press", amount: 40, unit: "répétitions" },
              { phase: "Défi 1 · 4 cycles", exerciseId: "walking_lunges", amount: 80, unit: "répétitions" },
              { phase: "Défi 2 · 4 cycles", exerciseId: "resistance_band_row", amount: 60, unit: "répétitions" },
              { phase: "Défi 2 · 4 cycles", exerciseId: "face_pull", amount: 60, unit: "répétitions" },
              { phase: "Défi 2 · 4 cycles", exerciseId: "side_plank", amount: 160, unit: "sec" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          },
          {
            day: 3,
            title: "Technique du Maître",
            xp: 130,
            difficultyLabel: "≈ 50 à 65 min",
            instructions: "Technique kettlebell, traction et sac de frappe.",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Technique", exerciseId: "turkish_get_up", amount: 8, unit: "répétitions" },
              { phase: "Force · 3 cycles", exerciseId: "goblet_squat", amount: 45, unit: "répétitions" },
              { phase: "Force · 3 cycles", exerciseId: "bench_press", amount: 30, unit: "répétitions" },
              { phase: "Force · 3 cycles", exerciseId: "pullups_clean_max", amount: 15, unit: "répétitions" },
              { phase: "Combat final · Sac 6 rounds", exerciseId: "heavy_bag_rounds", amount: 9, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          }
        ]
      },
      {
        week: 4,
        title: "Champion des Arènes",
        xp: 150,
        progression: "Dernière semaine : le joueur assemble force, endurance, technique et combat.",
        days: [
          {
            day: 1,
            title: "Jambes du Champion",
            xp: 150,
            difficultyLabel: "≈ 55 à 70 min",
            instructions: "Séance dense pour les jambes et la chaîne postérieure.",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Épreuve jambes · 3 cycles", exerciseId: "goblet_squat", amount: 45, unit: "répétitions" },
              { phase: "Épreuve jambes · 3 cycles", exerciseId: "kettlebell_deadlift", amount: 36, unit: "répétitions" },
              { phase: "Épreuve jambes · 3 cycles", exerciseId: "walking_lunges", amount: 72, unit: "répétitions" },
              { phase: "Épreuve jambes · 3 cycles", exerciseId: "calf_raises", amount: 75, unit: "répétitions" },
              { phase: "Noyau", exerciseId: "core", amount: 180, unit: "sec" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          },
          {
            day: 2,
            title: "Armes du Champion",
            xp: 150,
            difficultyLabel: "≈ 55 à 70 min",
            instructions: "Poussée, tirage, épaules et posture.",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Épreuve haut du corps · 3 cycles", exerciseId: "bench_press", amount: 30, unit: "répétitions" },
              { phase: "Épreuve haut du corps · 3 cycles", exerciseId: "kettlebell_military_press", amount: 30, unit: "répétitions" },
              { phase: "Épreuve haut du corps · 3 cycles", exerciseId: "resistance_band_row", amount: 45, unit: "répétitions" },
              { phase: "Épreuve haut du corps · 3 cycles", exerciseId: "pullups_clean_max", amount: 15, unit: "répétitions" },
              { phase: "Posture", exerciseId: "face_pull", amount: 45, unit: "répétitions" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          },
          {
            day: 3,
            title: "Raid des Arènes",
            xp: 150,
            difficultyLabel: "≈ 60 à 75 min",
            instructions: "Séance complète avant le boss final.",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Épreuve force · 3 cycles", exerciseId: "goblet_squat", amount: 45, unit: "répétitions" },
              { phase: "Épreuve force · 3 cycles", exerciseId: "bench_press", amount: 30, unit: "répétitions" },
              { phase: "Épreuve force · 3 cycles", exerciseId: "resistance_band_row", amount: 45, unit: "répétitions" },
              { phase: "Épreuve technique", exerciseId: "turkish_get_up", amount: 10, unit: "répétitions" },
              { phase: "Combat · Sac 8 rounds", exerciseId: "heavy_bag_rounds", amount: 12, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          }
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
          indoor: {
            id: "indoor",
            label: "🏠 Boss Intérieur",
            title: "Fosse d’entraînement",
            mission: "Routine standard, deux épreuves de force, puis sac de frappe.",
            difficultyLabel: "≈ 45 à 60 min",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Épreuve 1 · 3 cycles", exerciseId: "goblet_squat", amount: 36, unit: "répétitions" },
              { phase: "Épreuve 1 · 3 cycles", exerciseId: "bench_press", amount: 30, unit: "répétitions" },
              { phase: "Épreuve 1 · 3 cycles", exerciseId: "resistance_band_row", amount: 45, unit: "répétitions" },
              { phase: "Épreuve 2 · 3 cycles", exerciseId: "walking_lunges", amount: 60, unit: "répétitions" },
              { phase: "Épreuve 2 · 3 cycles", exerciseId: "core", amount: 90, unit: "sec" },
              { phase: "Épreuve 2 · 3 cycles", exerciseId: "calf_raises", amount: 75, unit: "répétitions" },
              { phase: "Combat final · Sac 4 rounds", exerciseId: "heavy_bag_rounds", amount: 6, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          },
          outdoor: {
            id: "outdoor",
            label: "🌲 Boss Extérieur",
            title: "Charge hors des fosses",
            mission: "Vélo 45 min avec 5 accélérations de 30 sec, puis récupération complète.",
            difficultyLabel: "≈ 50 min",
            exercises: [
              { phase: "Sortie vélo", exerciseId: "bike", amount: 45, unit: "min", distanceOptional: true },
              { phase: "5 accélérations de 30 sec", exerciseId: "bike_acceleration", amount: 3, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          }
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
        lockedMessage: "Le Minotaure ne charge que les héros réguliers. Termine tes 3 séances de la semaine.",
        variants: {
          indoor: {
            id: "indoor",
            label: "🏠 Boss Intérieur",
            title: "Labyrinthe d’acier",
            mission: "Routine standard, épaules, tractions, swings, gainage latéral et sac.",
            difficultyLabel: "≈ 50 à 65 min",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Épreuve 1 · 4 cycles", exerciseId: "kettlebell_military_press", amount: 48, unit: "répétitions" },
              { phase: "Épreuve 1 · 4 cycles", exerciseId: "assisted_pullups", amount: 20, unit: "répétitions" },
              { phase: "Épreuve 1 · 4 cycles", exerciseId: "face_pull", amount: 60, unit: "répétitions" },
              { phase: "Épreuve 2 · 4 cycles", exerciseId: "kettlebell_swing", amount: 60, unit: "répétitions" },
              { phase: "Épreuve 2 · 4 cycles", exerciseId: "bird_dog", amount: 40, unit: "répétitions" },
              { phase: "Épreuve 2 · 4 cycles", exerciseId: "side_plank", amount: 160, unit: "sec" },
              { phase: "Combat final · Sac 5 rounds", exerciseId: "heavy_bag_rounds", amount: 7, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          },
          outdoor: {
            id: "outdoor",
            label: "🌲 Boss Extérieur",
            title: "Charge du Minotaure",
            mission: "Vélo 60 min avec 6 accélérations de 45 sec.",
            difficultyLabel: "≈ 65 min",
            exercises: [
              { phase: "Sortie vélo", exerciseId: "bike", amount: 60, unit: "min", distanceOptional: true },
              { phase: "6 accélérations de 45 sec", exerciseId: "bike_acceleration", amount: 5, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          }
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
          indoor: {
            id: "indoor",
            label: "🏠 Boss Intérieur",
            title: "Forge de l’arène",
            mission: "Deadlift, squat, tirage, gainage et combat final.",
            difficultyLabel: "≈ 55 à 70 min",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Épreuve 1 · 4 cycles", exerciseId: "kettlebell_deadlift", amount: 48, unit: "répétitions" },
              { phase: "Épreuve 1 · 4 cycles", exerciseId: "goblet_squat", amount: 60, unit: "répétitions" },
              { phase: "Épreuve 1 · 4 cycles", exerciseId: "calf_raises", amount: 100, unit: "répétitions" },
              { phase: "Épreuve 2 · 4 cycles", exerciseId: "bench_press", amount: 40, unit: "répétitions" },
              { phase: "Épreuve 2 · 4 cycles", exerciseId: "pullups_clean_max", amount: 20, unit: "répétitions" },
              { phase: "Épreuve 2 · 4 cycles", exerciseId: "core", amount: 160, unit: "sec" },
              { phase: "Combat final · Sac 6 rounds", exerciseId: "heavy_bag_rounds", amount: 9, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          },
          outdoor: {
            id: "outdoor",
            label: "🌲 Boss Extérieur",
            title: "Route du Fer",
            mission: "Vélo 75 min avec 8 accélérations de 45 sec.",
            difficultyLabel: "≈ 80 min",
            exercises: [
              { phase: "Sortie vélo", exerciseId: "bike", amount: 75, unit: "min", distanceOptional: true },
              { phase: "8 accélérations de 45 sec", exerciseId: "bike_acceleration", amount: 6, unit: "min" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          }
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
          indoor: {
            id: "indoor",
            label: "🏠 Boss Intérieur",
            title: "Raid final des Arènes",
            mission: "Épreuves jambes, haut du corps, noyau, sac de frappe et Turkish Get-Up.",
            difficultyLabel: "≈ 60 à 75 min",
            exercises: [
              { phase: "Échauffement", exerciseId: "advanced_standard_warmup", amount: 5, unit: "min" },
              { phase: "Épreuve des jambes · 3 cycles", exerciseId: "goblet_squat", amount: 45, unit: "répétitions" },
              { phase: "Épreuve des jambes · 3 cycles", exerciseId: "kettlebell_deadlift", amount: 36, unit: "répétitions" },
              { phase: "Épreuve des jambes · 3 cycles", exerciseId: "walking_lunges", amount: 72, unit: "répétitions" },
              { phase: "Épreuve des jambes · 3 cycles", exerciseId: "calf_raises", amount: 75, unit: "répétitions" },
              { phase: "Épreuve du haut du corps · 3 cycles", exerciseId: "bench_press", amount: 30, unit: "répétitions" },
              { phase: "Épreuve du haut du corps · 3 cycles", exerciseId: "kettlebell_military_press", amount: 30, unit: "répétitions" },
              { phase: "Épreuve du haut du corps · 3 cycles", exerciseId: "resistance_band_row", amount: 45, unit: "répétitions" },
              { phase: "Épreuve du haut du corps · 3 cycles", exerciseId: "pullups_clean_max", amount: 15, unit: "répétitions" },
              { phase: "Épreuve du noyau · 3 cycles", exerciseId: "bird_dog", amount: 36, unit: "répétitions" },
              { phase: "Épreuve du noyau · 3 cycles", exerciseId: "superman", amount: 45, unit: "répétitions" },
              { phase: "Épreuve du noyau · 3 cycles", exerciseId: "core", amount: 135, unit: "sec" },
              { phase: "Épreuve du noyau · 3 cycles", exerciseId: "side_plank", amount: 180, unit: "sec" },
              { phase: "Épreuve du guerrier · Sac 8 rounds", exerciseId: "heavy_bag_rounds", amount: 12, unit: "min" },
              { phase: "Épreuve du maître", exerciseId: "turkish_get_up", amount: 10, unit: "répétitions" },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          },
          outdoor: {
            id: "outdoor",
            label: "🌲 Boss Extérieur",
            title: "La Route des Héros",
            mission: "Mission au choix : vélo 90 min, ou 25 km, ou 1 000 m de dénivelé cumulé sur vélo d’appartement. Valide dès qu’un objectif est atteint.",
            difficultyLabel: "≈ 90 min ou objectif atteint",
            instructions: "Choisis l’un des trois objectifs et termine par la récupération complète.",
            exercises: [
              { phase: "Route des Héros", exerciseId: "bike", amount: 90, unit: "min", distanceOptional: true },
              { phase: "Option distance", exerciseId: "bike", amount: 25, unit: "km", distanceOptional: true },
              { phase: "Retour au calme", exerciseId: "advanced_standard_cooldown", amount: 5, unit: "min" }
            ]
          }
        }
      }
    ],

    progression: [
      "Semaine 1 : Entrée dans l’Arène · bases avancées et premier finisher au sac.",
      "Semaine 2 : La Corne du Minotaure · plus de cycles, épaules, tractions et swings.",
      "Semaine 3 : Le Fer et la Cendre · densité, tractions propres et sac plus long.",
      "Semaine 4 : Champion des Arènes · raid complet de force, technique et combat.",
      "Chaque séance utilise l’échauffement standard de 5 min et le retour au calme standard de 5 min.",
      "Chaque semaine propose un boss intérieur et une version extérieure à vélo.",
      "Récompense finale : badge légendaire Champion des Arènes, coffre épique et +250 XP."
    ],

    notes: [
      "Programme avancé : réservé aux joueurs déjà à l’aise avec les mouvements de base.",
      "Choisir des charges permettant de garder une technique propre.",
      "Les quantités par côté sont converties en répétitions totales.",
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
    duration: "45-75 min",
    frequency: "3 séances par semaine",
    weeklySlots: [0, 2, 4],
    coachAdvice: "Korvan, Xara ou Bazul",
    xp: 90
  });

  // ------------------------------------------------------------
  // Badges du programme
  // ------------------------------------------------------------

  addBadge({
    id: "ogre-fosses-vaincu",
    icon: "👹",
    title: "Ogre des Fosses vaincu",
    description: "Vaincre le boss de la semaine 1 du programme Champion des Arènes.",
    type: "program-boss",
    programId: "champion-arenes",
    weekNumber: 1,
    target: 1
  });

  addBadge({
    id: "minotaure-vaincu",
    icon: "🐂",
    title: "Minotaure vaincu",
    description: "Vaincre le boss de la semaine 2 du programme Champion des Arènes.",
    type: "program-boss",
    programId: "champion-arenes",
    weekNumber: 2,
    target: 1
  });

  addBadge({
    id: "seigneur-fer-vaincu",
    icon: "⚒️",
    title: "Seigneur de Fer vaincu",
    description: "Vaincre le boss de la semaine 3 du programme Champion des Arènes.",
    type: "program-boss",
    programId: "champion-arenes",
    weekNumber: 3,
    target: 1
  });

  addBadge({
    id: "champion-arenes-vaincu",
    icon: "👑",
    title: "Champion des Arènes",
    description: "Vaincre le boss final du programme Champion des Arènes.",
    type: "program-boss",
    programId: "champion-arenes",
    weekNumber: 4,
    target: 1
  });

  // Déblocage conseillé depuis les programmes de préparation.
  addNextProgram("coeur-dragon", "champion-arenes");
  addNextProgram("cavalier-route", "champion-arenes");
  addNextProgram("forge-guerrier", "champion-arenes");

  console.log("Programme ajouté : Champion des Arènes");
})();
