// ============================================================
// Fitness RPG - app-data.js
// Version V5-clean
// ------------------------------------------------------------
// Rôle de ce fichier :
// - stocker les données de jeu ;
// - stocker les coachs ;
// - stocker les exercices ;
// - stocker les programmes détaillés ;
// - stocker les badges.
//
// Règle importante :
// ce fichier ne modifie jamais le DOM.
// Il ne contient aucune version.
// ============================================================

window.FitnessRpgData = {
  // ------------------------------------------------------------
  // Genres disponibles
  // ------------------------------------------------------------
  genderLabels: {
    homme: "Homme",
    femme: "Femme"
  },

  // ------------------------------------------------------------
  // Coachs
  // ------------------------------------------------------------
  coaches: {
    korvan: {
      id: "korvan",
      name: "Korvan",
      fullName: "Coach Korvan le Barbare",
      image: "assets/coach/korvan/idle.jpg",
      fallbackImage: "assets/coach/korvan/image.jpg",
      poses: {
        idle: "assets/coach/korvan/idle.jpg",
        welcome: "assets/coach/korvan/welcome.jpg",
        explain: "assets/coach/korvan/explain.jpg",
        motivate: "assets/coach/korvan/motivate.jpg",
        warmup: "assets/coach/korvan/warmup.jpg",
        walk: "assets/coach/korvan/walk.jpg",
        bike: "assets/coach/korvan/bike.jpg",
        run: "assets/coach/korvan/walk.jpg",
        squats: "assets/coach/korvan/squats.jpg",
        core: "assets/coach/korvan/core.jpg",
        stretch: "assets/coach/korvan/stretch.jpg",
        victory: "assets/coach/korvan/victory.jpg",
        levelup: "assets/coach/korvan/levelup.jpg"
      },
      start: [
        "Debout. Le corps ne devient pas fort en négociant avec le canapé.",
        "Aujourd’hui, tu gagnes ta ration de gloire.",
        "Les muscles dorment. Réveille-les."
      ],
      complete: [
        "Quête accomplie. Tu n’es pas venu pour rien.",
        "La faiblesse recule d’un pas. Continue."
      ],
      levelUp: [
        "Niveau supérieur. Ton nom mérite une ligne de plus dans la saga.",
        "Ton corps se renforce. Les ennemis prennent des notes."
      ],
      byExercise: {
        warmup: ["Échauffe-toi. Même une hache doit être levée avant la bataille."],
        walk: ["Marche. Chaque pas écrase un peu plus l’ancien toi."],
        bike: ["Pédale. Que tes jambes deviennent des roues de guerre."],
        run_treadmill: ["Course sur tapis. Garde le rythme, comme un tambour de guerre."],
        run_outdoor: ["Course extérieure. Le monde devient ta piste d’entraînement."],
        pilates: ["Contrôle et discipline. Même un barbare doit tenir son centre."],
        pushups: ["Les pompes ont parlé. Le sol a perdu."],
        mountain: ["Mountain climbing. La montagne n’a qu’à bien se tenir."],
        squats: ["Les jambes forgent leur réputation."],
        core: ["Tiens. Un tronc solide porte mieux la légende."],
        bridge: ["Pont de hanches. Une forteresse commence par des fondations solides."],
        stretch: ["La récupération n’est pas une faiblesse. C’est l’affûtage de la lame."]
      }
    },

    xara: {
      id: "xara",
      name: "Xara",
      fullName: "Coach Xara la Guerrière",
      image: "assets/coach/xara/xara_idle.jpg",
      fallbackImage: "assets/coach/xara/image.jpg",
      poses: {
        idle: "assets/coach/xara/xara_idle.jpg",
        welcome: "assets/coach/xara/xara_welcome.jpg",
        explain: "assets/coach/xara/xara_explain.jpg",
        motivate: "assets/coach/xara/xara_motivate.jpg",
        warmup: "assets/coach/xara/xara_warmup.jpg",
        walk: "assets/coach/xara/xara_walk.jpg",
        bike: "assets/coach/xara/xara_bike.jpg",
        run: "assets/coach/xara/xara_walk.jpg",
        squats: "assets/coach/xara/xara_squats.jpg",
        core: "assets/coach/xara/xara_core.jpg",
        stretch: "assets/coach/xara/xara_stretchup.jpg",
        victory: "assets/coach/xara/xara_victory.jpg",
        levelup: "assets/coach/xara/xara_levelup.jpg"
      },
      start: [
        "Allez, guerrier. On commence proprement, on finit fièrement.",
        "Pas besoin d’être parfait. Besoin d’être présent."
      ],
      complete: [
        "Bien joué. Ton futur toi vient d’applaudir.",
        "Tu as tenu. C’est comme ça qu’on construit une légende."
      ],
      levelUp: [
        "Niveau supérieur ! Tu avances avec panache."
      ],
      byExercise: {
        warmup: ["Une bonne guerrière ne charge pas à froid."],
        walk: ["Garde l’allure. La régularité gagne plus de combats que l’orgueil."],
        bike: ["Trouve ton rythme. Respiration stable, jambes efficaces."],
        run_treadmill: ["Course sur tapis. Stable, propre, efficace."],
        run_outdoor: ["Course extérieure. Garde la posture, garde le souffle."],
        pilates: ["Contrôle précis. Très bon choix."],
        pushups: ["Pompes propres. Appuis solides."],
        mountain: ["Rythme propre, bassin stable."],
        squats: ["Les jambes construisent la victoire."],
        core: ["Tiens la position. Le combat se gagne aussi dans l’immobilité."],
        bridge: ["Pont de hanches. Solide et contrôlé."],
        stretch: ["Récupère avec sérieux. La souplesse protège le guerrier."]
      }
    },

    violette: {
      id: "violette",
      name: "Violette",
      fullName: "Coach Violette la Halfeline",
      image: "assets/coach/violette/violette_idle.jpg",
      fallbackImage: "assets/coach/violette/image.jpg",
      poses: {
        idle: "assets/coach/violette/violette_idle.jpg",
        welcome: "assets/coach/violette/violette_idle.jpg",
        explain: "assets/coach/violette/violette_idle.jpg",
        motivate: "assets/coach/violette/violette_idle.jpg",
        victory: "assets/coach/violette/violette_idle.jpg",
        levelup: "assets/coach/violette/violette_idle.jpg"
      },
      start: [
        "On y va doucement, mais on y va vraiment !",
        "Petit pas, grand progrès. Aujourd’hui, on avance."
      ],
      complete: [
        "Bravo ! Une quête de plus dans la besace.",
        "Tu avances mieux que tu ne le crois, continue !"
      ],
      levelUp: [
        "Niveau supérieur ! Ça mérite presque un second petit déjeuner."
      ],
      byExercise: {
        warmup: ["On réveille doucement la machine."],
        walk: ["Une bonne marche, c’est une aventure qui a mis de bonnes chaussures."],
        bike: ["Tes jambes tournent, ton XP monte. Belle affaire !"],
        run_treadmill: ["Course sur tapis : doucement au début, fièrement à la fin."],
        run_outdoor: ["Course dehors : chaque foulée est une petite victoire."],
        pilates: ["Pilates bien placé. Petit effort, vrai progrès."],
        stretch: ["On s’étire, on respire, on remet le corps en mode velours."]
      }
    },

    elmin: {
      id: "elmin",
      name: "Elmin",
      fullName: "Coach Elmin le Mage",
      image: "assets/coach/elmin/elmin_idle.jpg",
      fallbackImage: "assets/coach/elmin/image.jpg",
      poses: {
        idle: "assets/coach/elmin/elmin_idle.jpg",
        welcome: "assets/coach/elmin/elmin_idle.jpg",
        explain: "assets/coach/elmin/elmin_idle.jpg",
        motivate: "assets/coach/elmin/elmin_idle.jpg",
        victory: "assets/coach/elmin/elmin_idle.jpg",
        levelup: "assets/coach/elmin/elmin_idle.jpg"
      },
      start: [
        "Concentre-toi. Chaque répétition est un sort bien exécuté.",
        "La régularité est une magie discrète, mais puissante."
      ],
      complete: [
        "Excellent. L’effort a été canalisé avec précision.",
        "Très bien. Tu gagnes en maîtrise autant qu’en force."
      ],
      levelUp: [
        "Niveau supérieur. Les résultats suivent la discipline."
      ],
      byExercise: {
        warmup: ["Le rituel commence par la préparation."],
        walk: ["La marche est une magie ancienne : simple, lente, efficace."],
        bike: ["Pédale avec méthode. Le souffle est ton métronome."],
        run_treadmill: ["Course sur tapis. Observe ton rythme, ajuste ton sort."],
        run_outdoor: ["Course extérieure. Le souffle guide l’incantation."],
        pilates: ["Le centre s’éveille."],
        core: ["Le gainage est une concentration mise en forme."],
        stretch: ["La souplesse est une magie lente. Ne la brusque pas."]
      }
    },

    bazul: {
      id: "bazul",
      name: "Bazul",
      fullName: "Coach Bazul le Nain",
      image: "assets/coach/bazul/bazul_idle.jpg",
      fallbackImage: "assets/coach/bazul/image.jpg",
      poses: {
        idle: "assets/coach/bazul/bazul_idle.jpg",
        welcome: "assets/coach/bazul/bazul_idle.jpg",
        explain: "assets/coach/bazul/bazul_idle.jpg",
        motivate: "assets/coach/bazul/bazul_idle.jpg",
        victory: "assets/coach/bazul/bazul_idle.jpg",
        levelup: "assets/coach/bazul/bazul_idle.jpg"
      },
      start: [
        "Allez, on s’y met. Une montagne ne se taille pas en la regardant.",
        "Pieds au sol, souffle stable. On construit solide.",
        "Pas besoin d’élégance. Besoin de régularité et de pierre dure."
      ],
      complete: [
        "Bon travail. C’est propre, dense, compact. Du vrai ouvrage nain.",
        "Une entrée de plus dans la pierre. Ça compte."
      ],
      levelUp: [
        "Niveau supérieur ! Voilà une progression qu’on pourrait graver sur une enclume."
      ],
      byExercise: {
        warmup: ["On chauffe les articulations. Même le granit fissure si on le brusque."],
        walk: ["Marche ferme. Talon solide, regard devant."],
        bike: ["Pédale rond. Une roue bien menée vaut un marteau bien tenu."],
        run_treadmill: ["Course sur tapis. Garde une cadence de forge."],
        run_outdoor: ["Course extérieure. Solide sur les appuis."],
        pushups: ["Pompes validées. Bras solides, poitrine haute."],
        squats: ["Squats. Les jambes sont les piliers de la forteresse."],
        core: ["Gainage. Tronc verrouillé comme une porte de mine."],
        bridge: ["Pont de hanches. Une arche solide, pas une planche branlante."],
        stretch: ["Étirements. On entretient l’outil après le travail."]
      }
    },

    satyne: {
      id: "satyne",
      name: "Satyne",
      fullName: "Coach Satyne la Sorcière",
      image: "assets/coach/satyne/image.jpg",
      fallbackImage: "assets/coach/satyne/image.jpg",
      poses: {
        idle: "assets/coach/satyne/image.jpg",
        welcome: "assets/coach/satyne/image.jpg",
        explain: "assets/coach/satyne/image.jpg",
        motivate: "assets/coach/satyne/image.jpg",
        victory: "assets/coach/satyne/image.jpg",
        levelup: "assets/coach/satyne/image.jpg"
      },
      start: [
        "Viens, mon petit sort d’endurance. On va réveiller les muscles endormis.",
        "Un souffle, un geste, une goutte d’effort. La potion commence.",
        "Aujourd’hui, on transforme la fatigue en poussière d’étoile."
      ],
      complete: [
        "Rituel accompli. Ton corps vient de gagner un ingrédient rare.",
        "Très bien. Je sens l’énergie circuler, et elle a de jolies dents."
      ],
      levelUp: [
        "Niveau supérieur ! La métamorphose est en marche."
      ],
      byExercise: {
        warmup: ["Échauffement lancé. On délie les charnières du pantin héroïque."],
        walk: ["Marche active. Chaque pas trace un glyphe sous tes pieds."],
        bike: ["Vélo. Fais tourner la roue, fais monter l’incantation."],
        run_treadmill: ["Course sur tapis. La roue tourne, le sort accélère."],
        run_outdoor: ["Course extérieure. Le vent entre dans la potion."],
        pilates: ["Pilates. Le centre du corps devient un petit chaudron stable."],
        pushups: ["Pompes. La terre reçoit ton pacte, puis te repousse."],
        squats: ["Squats. Plie, remonte, cueille la force dans les genoux."],
        core: ["Gainage. Ne bouge plus. Même les ombres prennent exemple."],
        stretch: ["Étirements. On rallonge les fils de la marionnette sans les casser."]
      }
    }
  },

  // ------------------------------------------------------------
  // Exercices libres
  // ------------------------------------------------------------
  sports: [
    {
      id: "warmup",
      icon: "🔥",
      title: "Échauffement",
      description: "Mobilité douce pour préparer la séance.",
      exercises: [
        {
          id: "warmup",
          title: "Échauffement",
          unit: "min",
          defaultValue: 5,
          min: 1,
          step: 1,
          xpPerUnit: 2,
          stat: "Discipline",
          pose: "warmup",
          hasTimer: true
        }
      ]
    },

    {
      id: "march_on_spot",
      title: "Marche sur place",
      unit: "min",
      defaultValue: 2,
      min: 1,
      step: 1,
      xpPerUnit: 2,
      stat: "Échauffement",
      pose: "warmup",
      hasTimer: true
    },
    {
      id: "dynamic_walk",
      title: "Marche dynamique",
      unit: "min",
      defaultValue: 3,
      min: 1,
      step: 1,
      xpPerUnit: 2,
      stat: "Échauffement",
      pose: "walk",
      hasTimer: true
    },

    {
      id: "walk",
      icon: "🚶",
      title: "Marche active",
      description: "Dehors ou sur tapis.",
      exercises: [
        {
          id: "walk",
          title: "Marche active",
          unit: "min",
          defaultValue: 30,
          min: 5,
          step: 5,
          xpPerUnit: 1.2,
          stat: "Endurance",
          pose: "walk",
          hasTimer: true,
          hasDistance: true
        }
      ]
    },

    {
      id: "run",
      icon: "🏃",
      title: "Course",
      description: "Course sur tapis ou en extérieur.",
      exercises: [
        {
          id: "run_treadmill",
          title: "Course sur tapis",
          unit: "min",
          defaultValue: 15,
          min: 5,
          step: 5,
          xpPerUnit: 2,
          stat: "Cardio",
          pose: "run",
          hasTimer: true,
          hasDistance: true
        },
        {
          id: "run_outdoor",
          title: "Course extérieure",
          unit: "min",
          defaultValue: 20,
          min: 5,
          step: 5,
          xpPerUnit: 2.1,
          stat: "Cardio",
          pose: "run",
          hasTimer: true,
          hasDistance: true
        },
        {
          id: "side_steps",
          title: "Pas chassés",
          unit: "sec",
          defaultValue: 90,
          min: 30,
          step: 30,
          xpPerUnit: 0.25,
          stat: "Cardio",
          pose: "walk",
          hasTimer: true
        }
      ]
    },

    {
      id: "bike",
      icon: "🚴",
      title: "Vélo",
      description: "Intérieur ou extérieur, rythme confortable.",
      exercises: [
        {
          id: "bike",
          title: "Vélo",
          unit: "min",
          defaultValue: 15,
          min: 5,
          step: 5,
          xpPerUnit: 1.7,
          stat: "Cardio",
          pose: "bike",
          hasTimer: true,
          hasDistance: true
        }
      ]
    },

    {
      id: "mobility",
      icon: "🧘",
      title: "Mobilité",
      description: "Souplesse, posture et récupération.",
      exercises: [
        {
          id: "pilates",
          title: "Pilates",
          unit: "min",
          defaultValue: 10,
          min: 5,
          step: 5,
          xpPerUnit: 1.3,
          stat: "Stabilité",
          pose: "core",
          hasTimer: true
        },
        {
          id: "cat_cow",
          title: "Chat-vache",
          unit: "min",
          defaultValue: 1,
          min: 1,
          step: 1,
          xpPerUnit: 2,
          stat: "Mobilité",
          pose: "stretch",
          hasTimer: true
        },
        {
          id: "hip_circles",
          title: "Cercles de hanches",
          unit: "sec",
          defaultValue: 60,
          min: 30,
          step: 30,
          xpPerUnit: 0.15,
          stat: "Mobilité hanches",
          pose: "stretch",
          hasTimer: true
        },
        {
          id: "slow_knee_raises",
          title: "Montées de genoux lentes",
          unit: "sec",
          defaultValue: 60,
          min: 30,
          step: 30,
          xpPerUnit: 0.15,
          stat: "Mobilité / cardio doux",
          pose: "warmup",
          hasTimer: true
        },
        {
          id: "thoracic_rotation",
          title: "Rotation thoracique",
          unit: "min",
          defaultValue: 1,
          min: 1,
          step: 1,
          xpPerUnit: 2,
          stat: "Mobilité",
          pose: "stretch",
          hasTimer: true
        }
      ]
    },

    {
      id: "strength",
      icon: "💪",
      title: "Renforcement",
      description: "Pompes, squats, gainage et fessiers.",
      exercises: [
        {
          id: "chair_squat",
          title: "Squat chaise",
          unit: "répétitions",
          defaultValue: 8,
          min: 1,
          step: 1,
          xpPerUnit: 1,
          stat: "Jambes",
          pose: "squats"
        },
        {
          id: "squats",
          title: "Squats",
          unit: "répétitions",
          defaultValue: 10,
          min: 1,
          step: 1,
          xpPerUnit: 1.1,
          stat: "Force",
          pose: "squats"
        },
        {
          id: "wall_pushups",
          title: "Pompes murales",
          unit: "répétitions",
          defaultValue: 8,
          min: 1,
          step: 1,
          xpPerUnit: 1,
          stat: "Haut du corps",
          pose: "core"
        },
        {
          id: "incline_pushups",
          title: "Pompes inclinées",
          unit: "répétitions",
          defaultValue: 8,
          min: 1,
          step: 1,
          xpPerUnit: 1.2,
          stat: "Haut du corps",
          pose: "core"
        },
        {
          id: "pushups",
          title: "Pompes",
          unit: "répétitions",
          defaultValue: 10,
          min: 1,
          step: 1,
          xpPerUnit: 1.2,
          stat: "Force",
          pose: "core"
        },
        {
          id: "core",
          title: "Gainage",
          unit: "sec",
          defaultValue: 20,
          min: 10,
          step: 5,
          xpPerUnit: 0.28,
          stat: "Stabilité",
          pose: "core",
          hasTimer: true
        },
        {
          id: "knee_plank",
          title: "Planche genoux",
          unit: "sec",
          defaultValue: 20,
          min: 10,
          step: 5,
          xpPerUnit: 0.22,
          stat: "Stabilité",
          pose: "core",
          hasTimer: true
        },
        {
          id: "assisted_reverse_lunges",
          title: "Fentes arrière assistées",
          unit: "répétitions",
          defaultValue: 16,
          min: 2,
          step: 2,
          xpPerUnit: 1.1,
          stat: "Jambes",
          pose: "squats"
        },
        {
          id: "reverse_lunges",
          title: "Fentes arrière",
          unit: "répétitions",
          defaultValue: 16,
          min: 2,
          step: 2,
          xpPerUnit: 1.3,
          stat: "Jambes",
          pose: "squats"
        },
        {
          id: "calf_raises",
          title: "Montées sur pointes",
          unit: "répétitions",
          defaultValue: 15,
          min: 5,
          step: 5,
          xpPerUnit: 0.8,
          stat: "Mollets",
          pose: "squats"
        },
        {
          id: "slow_calf_raises",
          title: "Montées sur pointes lentes",
          unit: "répétitions",
          defaultValue: 15,
          min: 5,
          step: 5,
          xpPerUnit: 1,
          stat: "Mollets",
          pose: "squats"
        },
        {
          id: "single_leg_bridge_alternate",
          title: "Pont de hanches une jambe alternée",
          unit: "répétitions",
          defaultValue: 16,
          min: 2,
          step: 2,
          xpPerUnit: 1.2,
          stat: "Fessiers",
          pose: "core"
        },
        {
          id: "dead_bug",
          title: "Dead bug",
          unit: "répétitions",
          defaultValue: 20,
          min: 2,
          step: 2,
          xpPerUnit: 1,
          stat: "Gainage",
          pose: "core"
        },
        {
          id: "bridge",
          title: "Pont de hanches",
          unit: "répétitions",
          defaultValue: 12,
          min: 1,
          step: 1,
          xpPerUnit: 1,
          stat: "Fessiers",
          pose: "core"
        },
        {
          id: "superman",
          title: "Superman",
          unit: "répétitions",
          defaultValue: 10,
          min: 1,
          step: 1,
          xpPerUnit: 1,
          stat: "Dos",
          pose: "core"
        }
      ]
    },

    {
      id: "stretch",
      icon: "🌿",
      title: "Étirements",
      description: "Retour au calme et récupération.",
      exercises: [
        {
          id: "slow_breathing",
          title: "Respiration lente",
          unit: "min",
          defaultValue: 2,
          min: 1,
          step: 1,
          xpPerUnit: 1,
          stat: "Récupération",
          pose: "stretch",
          hasTimer: true
        },
        {
          id: "thigh_calf_stretch",
          title: "Étirement cuisses / mollets",
          unit: "min",
          defaultValue: 3,
          min: 1,
          step: 1,
          xpPerUnit: 1,
          stat: "Récupération",
          pose: "stretch",
          hasTimer: true
        },
        {
          id: "hip_quad_stretch",
          title: "Étirement hanches / quadriceps",
          unit: "min",
          defaultValue: 3,
          min: 1,
          step: 1,
          xpPerUnit: 1,
          stat: "Récupération",
          pose: "stretch",
          hasTimer: true
        },
        {
          id: "stretch",
          title: "Étirements",
          unit: "min",
          defaultValue: 10,
          min: 5,
          step: 5,
          xpPerUnit: 1.5,
          stat: "Souplesse",
          pose: "stretch",
          hasTimer: true
        }
      ]
    }
  ],

  // ------------------------------------------------------------
  // Programmes détaillés
  // ------------------------------------------------------------
  programDetails: {
    "eveil-heros": {
      id: "eveil-heros",
      days: [
        {
          day: 1,
          title: "Découverte douce",
          exercises: [
            { phase: "Échauffement", exerciseId: "warmup", amount: 2, unit: "min" },
            { phase: "Mobilité", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Renfo doux", exerciseId: "chair_squat", amount: 8, unit: "répétitions" },
            { phase: "Renfo doux", exerciseId: "wall_pushups", amount: 8, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Remise en mouvement",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 5, unit: "min" },
            { phase: "Mobilité", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Renfo doux", exerciseId: "chair_squat", amount: 10, unit: "répétitions" },
            { phase: "Renfo doux", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "stretch", amount: 5, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Première vraie quête",
          exercises: [
            { phase: "Échauffement", exerciseId: "warmup", amount: 3, unit: "min" },
            { phase: "Cardio doux", exerciseId: "walk", amount: 10, unit: "min" },
            { phase: "Renfo doux", exerciseId: "chair_squat", amount: 10, unit: "répétitions" },
            { phase: "Fessiers", exerciseId: "bridge", amount: 12, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        }
      ],
      progression: [
        "Semaine 1 : découverte, peu de répétitions.",
        "Semaine 2 : +1 série sur squat chaise.",
        "Semaine 3 : +30 sec de cardio.",
        "Semaine 4 : passage vers Forge du guerrier ou Cœur de dragon."
      ]
    },

    "coeur-dragon": {
      id: "coeur-dragon",
      days: [
        {
          day: 1,
          title: "Cardio sans saut",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 5, unit: "min" },
            { phase: "Cardio", exerciseId: "run_treadmill", amount: 10, unit: "min" },
            { phase: "Renfo", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Gainage", exerciseId: "knee_plank", amount: 20, unit: "sec" },
            { phase: "Retour au calme", exerciseId: "stretch", amount: 5, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Souffle du dragon",
          exercises: [
            { phase: "Échauffement", exerciseId: "warmup", amount: 3, unit: "min" },
            { phase: "Cardio", exerciseId: "run_outdoor", amount: 15, unit: "min" },
            { phase: "Jambes", exerciseId: "squats", amount: 12, unit: "répétitions" },
            { phase: "Centre", exerciseId: "core", amount: 20, unit: "sec" },
            { phase: "Retour au calme", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        }
      ],
      progression: [
        "Niveaux 1-5 : sans saut.",
        "Niveaux 6-10 : temps de cardio augmenté.",
        "Niveaux 11-15 : ajout de burpees simplifiés.",
        "Niveaux 16-20 : version intense avec intervalles."
      ]
    },

    "forge-guerrier": {
      id: "forge-guerrier",
      days: [
        {
          day: 1,
          title: "Renforcement complet",
          exercises: [
            { phase: "Échauffement", exerciseId: "warmup", amount: 4, unit: "min" },
            { phase: "Jambes", exerciseId: "squats", amount: 12, unit: "répétitions" },
            { phase: "Haut du corps", exerciseId: "incline_pushups", amount: 8, unit: "répétitions" },
            { phase: "Dos", exerciseId: "superman", amount: 10, unit: "répétitions" },
            { phase: "Centre", exerciseId: "core", amount: 20, unit: "sec" },
            { phase: "Fessiers", exerciseId: "bridge", amount: 12, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "stretch", amount: 4, unit: "min" }
          ]
        }
      ],
      progression: [
        "Débutant : pompes contre un mur, gainage genoux, squats sur chaise.",
        "Avancé : pompes classiques, fentes, gainage latéral, squat sauté."
      ]
    },

    "tour-mage": {
      id: "tour-mage",
      days: [
        {
          day: 1,
          title: "Mobilité et posture",
          exercises: [
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" },
            { phase: "Mobilité", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Mobilité", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Gainage", exerciseId: "knee_plank", amount: 20, unit: "sec" },
            { phase: "Étirement", exerciseId: "stretch", amount: 5, unit: "min" }
          ]
        }
      ],
      progression: [
        "Très utile pour les jours de fatigue.",
        "Objectif : sauver la série sans se punir."
      ]
    },

    "marche-aventurier": {
      id: "marche-aventurier",
      days: [
        {
          day: 1,
          title: "Marche douce",
          exercises: [
            { phase: "Endurance", exerciseId: "walk", amount: 20, unit: "min", distanceOptional: true }
          ]
        },
        {
          day: 2,
          title: "Marche active",
          exercises: [
            { phase: "Endurance", exerciseId: "walk", amount: 30, unit: "min", distanceOptional: true }
          ]
        },
        {
          day: 3,
          title: "Marche longue",
          exercises: [
            { phase: "Endurance", exerciseId: "walk", amount: 45, unit: "min", distanceOptional: true }
          ]
        }
      ],
      progression: [
        "Débutant : 15-20 min de marche.",
        "Intermédiaire : 30 min.",
        "Avancé : 45 min.",
        "Bonus quête : 6000 à 10000 pas."
      ]
    },

    "boss-hebdo": {
      id: "boss-hebdo",
      days: [
        {
          day: 1,
          title: "Boss du Donjon des Courbatures",
          exercises: [
            { phase: "Jambes", exerciseId: "squats", amount: 20, unit: "répétitions" },
            { phase: "Haut du corps", exerciseId: "incline_pushups", amount: 12, unit: "répétitions" },
            { phase: "Centre", exerciseId: "core", amount: 30, unit: "sec" },
            { phase: "Fessiers", exerciseId: "bridge", amount: 20, unit: "répétitions" },
            { phase: "Respiration finale", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        }
      ],
      progression: [
        "+50 XP.",
        "Badge Boss vaincu.",
        "Déblocage image joueur niveau suivant si seuil atteint."
      ]
    }
  },

  // ------------------------------------------------------------
  // Badges
  // ------------------------------------------------------------
  badges: [
    {
      id: "first-step",
      icon: "👣",
      title: "Premier pas",
      description: "Valider une première entrée.",
      type: "totalEntries",
      target: 1
    },
    {
      id: "hero-spark",
      icon: "🔥",
      title: "Élan du héros",
      description: "Valider 3 entrées au total.",
      type: "totalEntries",
      target: 3
    },
    {
      id: "regular",
      icon: "📅",
      title: "Régulier",
      description: "Atteindre 3 jours de série.",
      type: "streak",
      target: 3
    },
    {
      id: "walker",
      icon: "🥾",
      title: "Marcheur de l’aventure",
      description: "Valider 5 marches.",
      type: "exerciseCount",
      exerciseId: "walk",
      target: 5
    },
    {
      id: "cyclist",
      icon: "🚴",
      title: "Cycliste novice",
      description: "Valider 5 séances de vélo.",
      type: "exerciseCount",
      exerciseId: "bike",
      target: 5
    },
    {
      id: "runner",
      icon: "🏃",
      title: "Souffle du dragon",
      description: "Valider 5 courses.",
      type: "exerciseGroupCount",
      exerciseIds: ["run_treadmill", "run_outdoor"],
      target: 5
    },
    {
      id: "strength",
      icon: "💪",
      title: "Force tranquille",
      description: "Valider 10 exercices de renforcement.",
      type: "sportCount",
      sportId: "strength",
      target: 10
    },
    {
      id: "boss",
      icon: "👹",
      title: "Boss vaincu",
      description: "Valider un défi boss hebdo.",
      type: "program",
      programId: "boss-hebdo",
      target: 1
    }
  ]
};

// ============================================================
// Fonctions utilitaires de données
// ============================================================

window.FitnessRpgData.getCoach = function getCoach(coachId) {
  return window.FitnessRpgData.coaches[coachId] || window.FitnessRpgData.coaches.korvan;
};

window.FitnessRpgData.getExerciseList = function getExerciseList() {
  return window.FitnessRpgData.sports.flatMap((sport) => {
    return sport.exercises.map((exercise) => ({
      ...exercise,
      sportId: sport.id,
      sportTitle: sport.title,
      sportIcon: sport.icon
    }));
  });
};

window.FitnessRpgData.getExerciseById = function getExerciseById(exerciseId) {
  return window.FitnessRpgData.getExerciseList().find((exercise) => exercise.id === exerciseId) || null;
};

window.FitnessRpgData.getProgramDetail = function getProgramDetail(programId) {
  return window.FitnessRpgData.programDetails[programId] || null;
};

window.FitnessRpgData.getCoachImage = function getCoachImage(coachId, pose = "idle") {
  const coach = window.FitnessRpgData.getCoach(coachId);
  return coach.poses?.[pose] || coach.fallbackImage || coach.image;
};

window.FitnessRpgData.getCoachMessage = function getCoachMessage(coachId, type = "start", exerciseId = null) {
  const coach = window.FitnessRpgData.getCoach(coachId);

  let list = coach[type];

  if (exerciseId && coach.byExercise?.[exerciseId]) {
    list = coach.byExercise[exerciseId];
  }

  if (!Array.isArray(list) || list.length === 0) {
    list = coach.start || ["Prêt pour la prochaine quête."];
  }

  return list[Math.floor(Math.random() * list.length)];
};
