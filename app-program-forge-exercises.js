// Fitness RPG | Les Épreuves de la Forge | bibliothèque d'exercices
// Module de données additionnel : aucun changement aux règles du jeu.
(function registerForgeExercises() {
  const data = window.FitnessRpgData;
  if (!Array.isArray(data?.exercises)) return;
  const exercises = [
  {
    "id": "forge_goblet_squat",
    "categoryId": "muscle",
    "title": "Squat goblet avec haltère",
    "images": {
      "homme": "assets/exercices/homme_default.webp",
      "femme": "assets/exercices/exercice_femme_forge_goblet_squat.webp",
      "male": "assets/exercices/homme_default.webp",
      "female": "assets/exercices/exercice_femme_forge_goblet_squat.webp"
    },
    "unit": "répétitions",
    "defaultValue": 10,
    "min": 1,
    "step": 1,
    "xpPerUnit": 1.4,
    "stat": "Jambes / force",
    "pose": "squats",
    "shortDescription": "Squat goblet avec haltère",
    "description": "Départ : debout, pieds environ largeur des épaules, haltère vertical contre la poitrine, coudes près du corps. Mouvement : fléchis hanches et genoux en reculant légèrement les fesses ; garde les pieds au sol et descends dans une amplitude confortable. Remonte en poussant le sol. Respiration : inspire en descendant, expire en remontant. À éviter : talons décollés, dos arrondi et genoux qui s'effondrent vers l'intérieur.",
    "coachTip": "Commence sans charge ou avec 1 kg ; la qualité du mouvement prime sur la profondeur.",
    "difficultyVariants": [
      {
        "label": "Débutant",
        "description": "Assis-debout sur banc stable sans charge ou avec 1 kg."
      },
      {
        "label": "Intermédiaire",
        "description": "Goblet squat avec 2 kg ou sac à dos léger bien fermé."
      },
      {
        "label": "Avancé",
        "description": "Progression de charge uniquement si l'alignement reste maîtrisé."
      },
      {
        "label": "Adaptation",
        "description": "Si l'équilibre est difficile, utiliser le banc comme repère et limiter l'amplitude."
      }
    ]
  },
  {
    "id": "forge_dumbbell_bench_press",
    "categoryId": "muscle",
    "title": "Développé couché avec haltères sur banc",
    "images": {
      "homme": "assets/exercices/homme_default.webp",
      "femme": "assets/exercices/exercice_femme_forge_dumbbell_bench_press.webp",
      "male": "assets/exercices/homme_default.webp",
      "female": "assets/exercices/exercice_femme_forge_dumbbell_bench_press.webp"
    },
    "unit": "répétitions",
    "defaultValue": 10,
    "min": 1,
    "step": 1,
    "xpPerUnit": 1.5,
    "stat": "Pectoraux / triceps",
    "pose": "pushups",
    "shortDescription": "Développé couché avec haltères sur banc",
    "description": "Départ : allongé sur un banc stable, pieds au sol, un haltère dans chaque main au niveau de la poitrine. Mouvement : pousse les haltères au-dessus de la poitrine sans les cogner, puis redescends lentement avec les poignets droits et les coudes modérément ouverts. Respiration : expire à la poussée et inspire au retour. À éviter : cambrure excessive, coudes trop écartés, rebond et banc instable.",
    "coachTip": "Choisis une paire de 1 kg au départ ; le développé couché au sol limite l'amplitude.",
    "difficultyVariants": [
      {
        "label": "Débutant",
        "description": "Développé au sol avec 1 kg, ou pompes contre un mur."
      },
      {
        "label": "Intermédiaire",
        "description": "Deux haltères de 2 kg, descente lente et contrôlée."
      },
      {
        "label": "Avancé",
        "description": "Augmenter la charge progressivement lorsque 12 répétitions propres sont faciles."
      },
      {
        "label": "Adaptation",
        "description": "En cas d'inconfort d'épaule, prise neutre et amplitude réduite sans douleur."
      }
    ]
  },
  {
    "id": "forge_one_arm_row",
    "categoryId": "muscle",
    "title": "Rowing unilatéral sur banc",
    "images": {
      "homme": "assets/exercices/homme_default.webp",
      "femme": "assets/exercices/exercice_femme_forge_one_arm_row.webp",
      "male": "assets/exercices/homme_default.webp",
      "female": "assets/exercices/exercice_femme_forge_one_arm_row.webp"
    },
    "unit": "répétitions",
    "defaultValue": 10,
    "min": 1,
    "step": 1,
    "xpPerUnit": 1.3,
    "stat": "Dos / posture",
    "pose": "core",
    "shortDescription": "Rowing unilatéral sur banc",
    "description": "Départ : une main et un genou en appui sur un banc stable, pied opposé au sol, dos neutre. Le bras chargé pend naturellement. Mouvement : tire le coude vers la hanche sans tourner le buste, puis redescends lentement jusqu'à presque tendre le bras. Respiration : expire en tirant et inspire en redescendant. Répète de l'autre côté. À éviter : haussement d'épaule, élan et rotation du tronc.",
    "coachTip": "Avec 2 kg, ralentis la descente plutôt que de tirer plus haut.",
    "difficultyVariants": [
      {
        "label": "Débutant",
        "description": "Haltère de 1 kg avec appui large, ou sac très léger."
      },
      {
        "label": "Intermédiaire",
        "description": "Haltère de 2 kg et maintien une seconde en haut."
      },
      {
        "label": "Avancé",
        "description": "Progression graduelle du poids sans rotation du tronc."
      },
      {
        "label": "Adaptation",
        "description": "Appui debout d'une main sur une surface stable si le banc est inconfortable."
      }
    ]
  },
  {
    "id": "forge_romanian_deadlift",
    "categoryId": "muscle",
    "title": "Soulevé de terre roumain avec haltères",
    "images": {
      "homme": "assets/exercices/homme_default.webp",
      "femme": "assets/exercices/exercice_femme_forge_romanian_deadlift.webp",
      "male": "assets/exercices/homme_default.webp",
      "female": "assets/exercices/exercice_femme_forge_romanian_deadlift.webp"
    },
    "unit": "répétitions",
    "defaultValue": 10,
    "min": 1,
    "step": 1,
    "xpPerUnit": 1.4,
    "stat": "Hanches / chaîne postérieure",
    "pose": "squats",
    "shortDescription": "Soulevé de terre roumain avec haltères",
    "description": "Départ : debout, pieds largeur des hanches, haltères devant les cuisses, genoux légèrement fléchis. Mouvement : recule les hanches en penchant le buste, dos neutre et haltères proches des jambes. Arrête la descente avant que le dos ne s'arrondisse puis redresse-toi en avançant les hanches. Respiration : inspire en descendant, expire en remontant. À éviter : chercher à toucher le sol, arrondir le dos ou transformer le mouvement en squat.",
    "coachTip": "Apprends d'abord la charnière de hanche sans charge.",
    "difficultyVariants": [
      {
        "label": "Débutant",
        "description": "Faire le mouvement sans poids, mains sur les plis des hanches."
      },
      {
        "label": "Intermédiaire",
        "description": "Deux haltères de 2 kg ou un sac léger bien fermé."
      },
      {
        "label": "Avancé",
        "description": "Augmenter légèrement la charge et contrôler la descente."
      },
      {
        "label": "Adaptation",
        "description": "Limiter l'amplitude à mi-cuisse ou aux genoux en cas de mobilité réduite."
      }
    ]
  },
  {
    "id": "forge_farmer_carry",
    "categoryId": "muscle",
    "title": "Marche du fermier avec haltères",
    "images": {
      "homme": "assets/exercices/homme_default.webp",
      "femme": "assets/exercices/exercice_femme_forge_farmer_carry.webp",
      "male": "assets/exercices/homme_default.webp",
      "female": "assets/exercices/exercice_femme_forge_farmer_carry.webp"
    },
    "unit": "sec",
    "defaultValue": 30,
    "min": 5,
    "step": 5,
    "xpPerUnit": 0.15,
    "stat": "Préhension / posture",
    "pose": "core",
    "hasTimer": true,
    "shortDescription": "Marche du fermier avec haltères",
    "description": "Départ : debout, un haltère dans chaque main, bras près du corps, regard horizontal et épaules relâchées. Mouvement : marche à petits pas réguliers dans un espace plat et dégagé en gardant le buste vertical. Respire normalement pendant toute la marche. À éviter : se pencher, laisser les poids se balancer, bloquer sa respiration ou marcher trop vite. Pose les haltères si tu perds l'équilibre.",
    "coachTip": "Prépare un trajet sans obstacle ; 20 à 30 secondes suffisent pour débuter.",
    "difficultyVariants": [
      {
        "label": "Débutant",
        "description": "15 à 20 secondes avec 1 kg de chaque côté, voire sans charge."
      },
      {
        "label": "Intermédiaire",
        "description": "30 à 45 secondes avec 2 kg dans chaque main."
      },
      {
        "label": "Avancé",
        "description": "Augmenter graduellement la charge en conservant la posture."
      },
      {
        "label": "Adaptation",
        "description": "Équilibre fragile : tenir les charges immobile près d'un appui fixe."
      }
    ]
  },
  {
    "id": "forge_seated_shoulder_press",
    "categoryId": "muscle",
    "title": "Développé épaules assis avec haltères",
    "images": {
      "homme": "assets/exercices/homme_default.webp",
      "femme": "assets/exercices/exercice_femme_forge_seated_shoulder_press.webp",
      "male": "assets/exercices/homme_default.webp",
      "female": "assets/exercices/exercice_femme_forge_seated_shoulder_press.webp"
    },
    "unit": "répétitions",
    "defaultValue": 8,
    "min": 1,
    "step": 1,
    "xpPerUnit": 1.3,
    "stat": "Épaules / tronc",
    "pose": "core",
    "shortDescription": "Développé épaules assis avec haltères",
    "description": "Départ : assis sur un banc stable, pieds posés au sol, un haltère dans chaque main à hauteur des épaules. Mouvement : pousse vers le plafond dans une amplitude confortable, puis redescends lentement, dos stable et ventre légèrement engagé. Respiration : expire en poussant et inspire à la descente. À éviter : cambrer le bas du dos, hausser les épaules ou forcer une amplitude douloureuse.",
    "coachTip": "Commence avec 1 kg ; conserve deux ou trois répétitions possibles en fin de série.",
    "difficultyVariants": [
      {
        "label": "Débutant",
        "description": "Un bras à la fois avec 1 kg, ou sans charge."
      },
      {
        "label": "Intermédiaire",
        "description": "Deux haltères de 2 kg avec contrôle."
      },
      {
        "label": "Avancé",
        "description": "Charge légèrement supérieure après maîtrise de la posture."
      },
      {
        "label": "Adaptation",
        "description": "Épaules sensibles : limiter l'amplitude ou choisir une poussée horizontale sans douleur."
      }
    ]
  },
  {
    "id": "forge_assisted_pullup",
    "categoryId": "muscle",
    "title": "Tirage assisté à la station de traction",
    "images": {
      "homme": "assets/exercices/homme_default.webp",
      "femme": "assets/exercices/exercice_femme_forge_assisted_pullup.webp",
      "male": "assets/exercices/homme_default.webp",
      "female": "assets/exercices/exercice_femme_forge_assisted_pullup.webp"
    },
    "unit": "répétitions",
    "defaultValue": 5,
    "min": 1,
    "step": 1,
    "xpPerUnit": 1.8,
    "stat": "Dos / bras",
    "pose": "core",
    "shortDescription": "Tirage assisté à la station de traction",
    "description": "Départ : sur une station correctement fixée, prends la barre avec les mains un peu plus larges que les épaules. Garde les pieds sur un support stable conçu pour l'assistance. Mouvement : engage les omoplates, tire le buste vers la barre en t'aidant des jambes, puis redescends lentement et avec contrôle. Respiration : expire en tirant, inspire en redescendant. À éviter : sauter, se balancer, forcer les épaules ou utiliser un appui instable.",
    "coachTip": "Si l'assistance des pieds n'est pas sûre, remplace cet exercice par le rowing unilatéral sur banc.",
    "difficultyVariants": [
      {
        "label": "Débutant",
        "description": "Petites rétractions des omoplates, pieds solidement en appui."
      },
      {
        "label": "Intermédiaire",
        "description": "Tractions partielles avec forte assistance des jambes."
      },
      {
        "label": "Avancé",
        "description": "Réduire progressivement l'assistance sans balancer le corps."
      },
      {
        "label": "Adaptation",
        "description": "En cas d'épaule sensible ou de station non adaptée, choisir le rowing sur banc."
      }
    ]
  },
  {
    "id": "forge_reverse_lunge",
    "categoryId": "muscle",
    "title": "Fente arrière avec haltères",
    "images": {
      "homme": "assets/exercices/homme_default.webp",
      "femme": "assets/exercices/exercice_femme_forge_reverse_lunge.webp",
      "male": "assets/exercices/homme_default.webp",
      "female": "assets/exercices/exercice_femme_forge_reverse_lunge.webp"
    },
    "unit": "répétitions",
    "defaultValue": 8,
    "min": 1,
    "step": 1,
    "xpPerUnit": 1.3,
    "stat": "Jambes / équilibre",
    "pose": "squats",
    "shortDescription": "Fente arrière avec haltères",
    "description": "Départ : debout, pieds largeur du bassin, mains libres ou haltères le long du corps. Mouvement : fais un pas en arrière, fléchis les genoux jusqu'à une amplitude confortable et garde le genou avant aligné avec le pied. Pousse sur le pied avant pour revenir debout, puis change de côté. Respiration : inspire en descendant, expire en remontant. À éviter : perte d'équilibre, genou qui s'effondre ou descente brusque.",
    "coachTip": "Commence sans charge près d'un appui fixe avant d'utiliser les haltères.",
    "difficultyVariants": [
      {
        "label": "Débutant",
        "description": "Fente arrière avec appui et amplitude réduite, sans poids."
      },
      {
        "label": "Intermédiaire",
        "description": "Haltères de 1 ou 2 kg, mouvement contrôlé."
      },
      {
        "label": "Avancé",
        "description": "Augmenter graduellement la charge après bonne stabilité des deux côtés."
      },
      {
        "label": "Adaptation",
        "description": "Si l'équilibre ou les genoux gênent, remplacer par un assis-debout sur banc."
      }
    ]
  }
];
  const knownIds = new Set(data.exercises.map((exercise) => exercise.id));
  for (const exercise of exercises) {
    if (knownIds.has(exercise.id)) continue;
    data.exercises.push(exercise);
    knownIds.add(exercise.id);
  }
})();
