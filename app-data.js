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
        welcome: "assets/coach/violette/violette_welcome.jpg",
        explain: "assets/coach/violette/violette_explain.jpg",
        motivate: "assets/coach/violette/violette_motivate.jpg",
        victory: "assets/coach/violette/violette_victory.jpg",
        levelup: "assets/coach/violette/violette_levelup.jpg",
        warmup: "assets/coach/violette/violette_warmup.jpg",
        walk:"assets/coach/violette/violette_walk.jpg",
        bike: "assets/coach/violette/violette_bike.jpg",
        run: "assets/coach/violette/violette_run.jpg",
        squats: "assets/coach/violette/violette_squats.jpg",
        core: "assets/coach/violette/violette_core.jpg",
        stretch: "assets/coach/violette/violette_stretch.jpg"
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
// Catégories d’exercices libres
// ------------------------------------------------------------

  exerciseCategories: [
  {
    id: "warmup",
    
    title: "Échauffement",
    images: {
      male: "assets/categories/categorie_homme_echauffement.png",
      female:"assets/categories/categorie_femme_echauffement.png"
    },
    description: "Mobilité douce pour préparer la séance."
},
 {
    id: "cardio",
    
    title: "Cardio",
    images: {
      male: "assets/categories/categorie_homme_cardio.png",
      female:"assets/categories/categorie_femme_cardio.png"
    },
    description: "Faire monter le rythme sans brutalité."
},
     {
    id: "mobility",
    
    title: "Mobilité ",
     images: {
      male: "assets/categories/categorie_homme_mobilite.png",
      female:"assets/categories/categorie_femme_mobilite.png"
    },
    description: "Souplesse"
  },
  {
    id: "walk",
    
    title: "Marche",
    images: {
      male: "assets/categories/categorie_homme_marche.png",
      female:"assets/categories/categorie_femme_marche.png"
    },
    description: "Marche active dehors ou sur tapis."
  },
  {
    id: "run",
    
    title: "Course",
     images: {
      male: "assets/categories/categorie_homme_course.png",
      female:"assets/categories/categorie_femme_course.png"
    },
    description: "Course sur tapis ou en extérieur."
  },
  {
    id: "bike",
    
    title: "Vélo",
     images: {
      male: "assets/categories/categorie_homme_velo.png",
      female:"assets/categories/categorie_femme_velo.png"
    },
    description: "Vélo intérieur ou extérieur."
  },
  {
    id: "strength",
    
    title: "Renforcement",
     images: {
      male: "assets/categories/categorie_homme_renforcement.png",
      female:"assets/categories/categorie_femme_renforcement.png"
    },
    description: "Jambes, dos, posture et force générale."
  },
  {
    id: "arms",
    
    title: "Bras",
     images: {
      male: "assets/categories/categorie_homme_bras.png",
      female:"assets/categories/categorie_femme_bras.png"
    },
    description: "Bras, épaules, biceps et triceps."
  },
  {
    id: "core",
    
    title: "Abdos / gainage",
     images: {
      male: "assets/categories/categorie_homme_abdos.png",
      female:"assets/categories/categorie_femme_abdos.png"
    },
    description: "Centre du corps, gainage et stabilité."
  },
 
],
 
// ------------------------------------------------------------
// Exercices libres
// ------------------------------------------------------------
exercises: [
  // Échauffement
  {
    id: "march_on_spot",
    categoryId: "warmup",
    title: "Marche sur place",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercice_femme_marchedelaventurier.jpg"
    },
    unit: "min",
    defaultValue: 2,
    min: 1,
    step: 1,
    xpPerUnit: 2,
    stat: "Échauffement",
    pose: "warmup",
    hasTimer: true,
    description: "Marche sans avancer en levant naturellement les pieds.",
    shortDescription: "Marche sans bouger de ta position.",
    coachTip: "Commence tranquille, puis trouve ton rythme."
  },
  {
    id: "arm_circles",
    categoryId: "warmup",
    title: "Cercles de bras",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "sec",
    defaultValue: 60,
    min: 30,
    step: 30,
    xpPerUnit: 0.2,
    stat: "Échauffement épaules",
    pose: "warmup",
    hasTimer: true,
    description: "Tends les bras et dessine de grands cercles vers l’avant puis l’arrière.",
    shortDescription: "Dessine des cercles avec les bras.",
    coachTip: "Fais des cercles lents, sans hausser les épaules."
  },
  {
    id: "arm_open_close",
    categoryId: "warmup",
    title: "Ouverture / fermeture des bras",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "min",
    defaultValue: 1,
    min: 1,
    step: 1,
    xpPerUnit: 2,
    stat: "Mobilité haut du corps",
    pose: "warmup",
    hasTimer: true
  },
  {
    id: "dynamic_walk",
    categoryId: "warmup",
    title: "Marche dynamique",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "min",
    defaultValue: 3,
    min: 1,
    step: 1,
    xpPerUnit: 2,
    stat: "Échauffement",
    pose: "walk",
    hasTimer: true,
    description: "Marche énergique avec les bras qui accompagnent le mouvement.",
    shortDescription: "Marche énergique avec les bras.",
    coachTip: "Garde le regard devant et les épaules basses."
  },

  // Cardio doux
  {
    id: "side_steps",
    categoryId: "cardio",
    title: "Pas chassés",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercice_femme_paschasses.jpg"
    },
    unit: "sec",
    defaultValue: 90,
    min: 30,
    step: 30,
    xpPerUnit: 0.25,
    stat: "Cardio doux",
    pose: "walk",
    hasTimer: true
  },
  {
    id: "slow_knee_raises",
    categoryId: "cardio",
    title: "Montées de genoux lentes",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercice_femme_monteegenouxlente.jpg"
    },
    unit: "sec",
    defaultValue: 60,
    min: 30,
    step: 30,
    xpPerUnit: 0.15,
    stat: "Cardio doux",
    pose: "warmup",
    hasTimer: true,
    description: "Monte alternativement les genoux devant toi à hauteur confortable.",
    shortDescription: "Monte les genoux alternativement.",
    coachTip: "Reste droit et garde une respiration régulière."
  },
  {
    id: "mountain_climber_slow",
    categoryId: "cardio",
    title: "Mountain climber lent",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercice_femme_montagneclimberlent.jpg"
    },
    unit: "sec",
    defaultValue: 90,
    min: 15,
    step: 15,
    xpPerUnit: 0.3,
    stat: "Dynamique / gainage",
    pose: "core",
    hasTimer: true
  },

  // Marche
  {
    id: "walk",
    categoryId: "walk",
    title: "Marche active",
   images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "min",
    defaultValue: 30,
    min: 5,
    step: 5,
    xpPerUnit: 1.2,
    stat: "Endurance",
    pose: "walk",
    hasTimer: true,
    hasDistance: true,
    description: "Marche à un rythme soutenu permettant encore de parler.",
    shortDescription: "Marche à rythme soutenu.",
    coachTip: "Tu dois pouvoir parler, mais pas chanter."
  },

  // Course
  {
    id: "run_treadmill",
    categoryId: "run",
    title: "Course sur tapis",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    categoryId: "run",
    title: "Course extérieure",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercice_femme_courseext.jpg"
    },
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

  // Vélo
  {
    id: "bike",
    categoryId: "bike",
    title: "Vélo",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "min",
    defaultValue: 15,
    min: 5,
    step: 5,
    xpPerUnit: 1.7,
    stat: "Cardio",
    pose: "bike",
    hasTimer: true,
    hasDistance: true
  },

  // Renforcement
  {
    id: "chair_squat",
    categoryId: "strength",
    title: "Squat chaise",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 8,
    min: 1,
    step: 1,
    xpPerUnit: 1,
    stat: "Jambes",
    pose: "squats",
    description: "Assieds-toi légèrement vers l’arrière en t’aidant d’une chaise ou d’un mur.",
    shortDescription: "Assieds-toi puis relève-toi avec aide.",
    coachTip: "Garde les talons au sol."
  },
  {
    id: "squats",
    categoryId: "strength",
    title: "Squats",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 10,
    min: 1,
    step: 1,
    xpPerUnit: 1.1,
    stat: "Force",
    pose: "squats",
    description: "Fléchis les jambes comme pour t’asseoir puis remonte.",
    shortDescription: "Descends comme pour t’asseoir puis remonte.",
    coachTip: "Genoux souples, dos fier, mouvement propre."
  },
  {
  id: "wall_sit",
  categoryId: "strength",
  title: "Chaise contre un mur",
  images: {
    male: "assets/exercices/homme_default.png",
    female: "assets/exercices/femme_default.png"
  },
  unit: "sec",
  defaultValue: 20,
  min: 10,
  step: 5,
  xpPerUnit: 0.35,
  stat: "Jambes / endurance",
  pose: "squats",
  hasTimer: true,
  description: "Dos au mur, reste assis dans une position imaginaire.",
  shortDescription: "Tiens une position assise contre un mur.",
  coachTip: "Garde le dos contre le mur et respire calmement."
},
  {
    id: "assisted_reverse_lunges",
    categoryId: "strength",
    title: "Fentes arrière assistées",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 16,
    min: 2,
    step: 2,
    xpPerUnit: 1.1,
    stat: "Jambes",
    pose: "squats",
    description: "Fais un pas en arrière et plie légèrement les jambes en gardant un appui.",
    shortDescription: "Fente avec appui pour garder l’équilibre.",
    coachTip: "Utilise une chaise ou un mur si besoin."
  },
  {
    id: "reverse_lunges",
    categoryId: "strength",
    title: "Fentes arrière",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 16,
    min: 2,
    step: 2,
    xpPerUnit: 1.3,
    stat: "Jambes",
    pose: "squats",
    description: "Fais un grand pas en arrière puis descends le genou arrière vers le sol.",
    shortDescription: "Grand pas arrière puis descente contrôlée.",
    coachTip: "Descends peu au début. La maîtrise d’abord."
  },
  {
    id: "calf_raises",
    categoryId: "strength",
    title: "Montées sur pointes",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 15,
    min: 5,
    step: 5,
    xpPerUnit: 0.8,
    stat: "Mollets",
    pose: "squats"
  },
  {
    id: "bridge",
    categoryId: "strength",
    title: "Pont de hanches",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 12,
    min: 1,
    step: 1,
    xpPerUnit: 1,
    stat: "Fessiers",
    pose: "core"
  },
  {
    id: "single_leg_bridge_alternate",
    categoryId: "strength",
    title: "Pont de hanches une jambe alternée",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 16,
    min: 2,
    step: 2,
    xpPerUnit: 1.2,
    stat: "Fessiers",
    pose: "core"
  },
  {
    id: "superman",
    categoryId: "strength",
    title: "Superman",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 10,
    min: 1,
    step: 1,
    xpPerUnit: 1,
    stat: "Dos",
    pose: "core",
    description: "Allongé sur le ventre, soulève légèrement bras et jambes.",
    shortDescription: "Soulève bras et jambes au sol.",
    coachTip: "Monte peu, sans forcer le bas du dos."
  },

  // Bras
  {
    id: "wall_pushups",
    categoryId: "arms",
    title: "Pompes murales",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 8,
    min: 1,
    step: 1,
    xpPerUnit: 1,
    stat: "Haut du corps",
    pose: "core",
    description: "Pompes réalisées contre un mur pour réduire la difficulté.",
    shortDescription: "Pompes contre un mur.",
    coachTip: "Le mouvement doit rester fluide."
  },
  {
    id: "incline_pushups",
    categoryId: "arms",
    title: "Pompes inclinées",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 8,
    min: 1,
    step: 1,
    xpPerUnit: 1.2,
    stat: "Haut du corps",
    pose: "core",
    description: "Pompes avec les mains sur une table ou un support surélevé.",
    shortDescription: "Pompes sur un support surélevé.",
    coachTip: "Plus le support est haut, plus c’est facile."
  },
  {
    id: "pushups",
    categoryId: "arms",
    title: "Pompes",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 10,
    min: 1,
    step: 1,
    xpPerUnit: 1.2,
    stat: "Force",
    pose: "core"
  },
  {
    id: "biceps_curl_1kg",
    categoryId: "arms",
    title: "Curl biceps",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 36,
    min: 2,
    step: 2,
    xpPerUnit: 0.9,
    stat: "Biceps",
    pose: "core"
  },
  {
    id: "hammer_curl_1kg",
    categoryId: "arms",
    title: "Curl marteau",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 24,
    min: 2,
    step: 2,
    xpPerUnit: 0.9,
    stat: "Biceps / avant-bras",
    pose: "core"
  },
  {
    id: "lateral_raises_1kg",
    categoryId: "arms",
    title: "Élévations latérales",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 20,
    min: 2,
    step: 2,
    xpPerUnit: 1,
    stat: "Épaules",
    pose: "core"
  },
  {
    id: "front_raises_1kg",
    categoryId: "arms",
    title: "Élévations frontales",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 20,
    min: 2,
    step: 2,
    xpPerUnit: 1,
    stat: "Épaules",
    pose: "core"
  },
  {
    id: "triceps_kickback_1kg",
    categoryId: "arms",
    title: "Kickback triceps",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 20,
    min: 2,
    step: 2,
    xpPerUnit: 1,
    stat: "Triceps",
    pose: "core"
  },
  {
    id: "shoulder_press_1kg",
    categoryId: "arms",
    title: "Développé épaules",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 20,
    min: 2,
    step: 2,
    xpPerUnit: 1,
    stat: "Épaules / bras",
    pose: "core"
  },
  {
    id: "wall_triceps_extension",
    categoryId: "arms",
    title: "Extension triceps contre un mur",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 16,
    min: 2,
    step: 2,
    xpPerUnit: 1,
    stat: "Triceps",
    pose: "core"
  },
  {
    id: "incline_shoulder_taps",
    categoryId: "arms",
    title: "Taps épaules en appui incliné",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 20,
    min: 2,
    step: 2,
    xpPerUnit: 1,
    stat: "Épaules / gainage bras",
    pose: "core"
    
  },

  // Abdos / gainage
  {
    id: "core",
    categoryId: "core",
    title: "Gainage",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "sec",
    defaultValue: 20,
    min: 10,
    step: 5,
    xpPerUnit: 0.28,
    stat: "Stabilité",
    pose: "core",
    hasTimer: true,
    description: "Maintiens le corps droit en appui sur les avant-bras ou les mains.",
    shortDescription: "Corps droit et immobile.",
    coachTip: "Mieux vaut 20 secondes propres qu’une minute bancale."
  },
  {
    id: "knee_plank",
    categoryId: "core",
    title: "Planche genoux",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercise_femme_planchesurlesgenoux.png"
    },
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
    id: "bird_dog",
    categoryId: "core",
    title: "Bird Dog",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "répétitions",
    defaultValue: 12,
    min: 2,
    step: 2,
    xpPerUnit: 1,
    stat: "Équilibre / dos",
    pose: "core",
    description: "À quatre pattes, tends simultanément un bras et la jambe opposée.",
    shortDescription: "Bras et jambe opposés tendus.",
    coachTip: "Cherche l’équilibre avant la vitesse."
  },
  {
    id: "side_plank_knees",
    categoryId: "core",
    title: "Gainage latéral genoux",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercise_femme_gainagelateralgenoux.png"
    },
    unit: "sec",
    defaultValue: 60,
    min: 10,
    step: 5,
    xpPerUnit: 0.25,
    stat: "Obliques",
    pose: "core",
    hasTimer: true
  },
  {
    id: "side_plank",
    categoryId: "core",
    title: "Gainage latéral",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercise_femme_gainagelateral.png"
    },
    unit: "sec",
    defaultValue: 40,
    min: 10,
    step: 5,
    xpPerUnit: 0.35,
    stat: "Obliques",
    pose: "core",
    hasTimer: true
  },
  {
    id: "dead_bug",
    categoryId: "core",
    title: "Dead bug",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercise_femme_deadbugcomplet.png"
    },
    unit: "répétitions",
    defaultValue: 20,
    min: 2,
    step: 2,
    xpPerUnit: 1,
    stat: "Gainage",
    pose: "core"
  },
  {
    id: "dead_bug_simplified",
    categoryId: "core",
    title: "Dead bug simplifié",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercise_femme_deadbugsimplifie.png"
    },
    unit: "répétitions",
    defaultValue: 16,
    min: 2,
    step: 2,
    xpPerUnit: 1,
    stat: "Abdos doux",
    pose: "core"
  },
  {
    id: "pelvic_tilt",
    categoryId: "core",
    title: "Bascule du bassin au sol",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercise_femme_basculebassinsol.png"
    },
    unit: "répétitions",
    defaultValue: 10,
    min: 2,
    step: 2,
    xpPerUnit: 0.8,
    stat: "Activation abdos",
    pose: "core"
  },
  {
    id: "pelvic_lift_floor",
    categoryId: "core",
    title: "Relevé de bassin au sol",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercise_femme_relevedebassinausol.png"
    },
    unit: "répétitions",
    defaultValue: 12,
    min: 2,
    step: 2,
    xpPerUnit: 1,
    stat: "Contrôle du centre",
    pose: "core"
  },
  {
    id: "crunch_controlled",
    categoryId: "core",
    title: "Crunch contrôlé",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercise_femme_crunchcontrole.png"
    },
    unit: "répétitions",
    defaultValue: 15,
    min: 2,
    step: 1,
    xpPerUnit: 1,
    stat: "Abdos",
    pose: "core"
  },
  {
    id: "hollow_hold_simplified",
    categoryId: "core",
    title: "Hollow hold simplifié",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercise_femme_hollowholssimplifie.png"
    },
    unit: "sec",
    defaultValue: 45,
    min: 10,
    step: 5,
    xpPerUnit: 0.4,
    stat: "Finisher abdos",
    pose: "core",
    hasTimer: true
  },

  // Mobilité / récupération
  {
    id: "pilates",
    categoryId: "mobility",
    title: "Pilates",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    categoryId: "mobility",
    title: "Chat-vache",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercice_femme_chatvache.jpg"
    },
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
    categoryId: "mobility",
    title: "Cercles de hanches",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercice_femme_cerclehanches.jpg"
    },
    unit: "sec",
    defaultValue: 60,
    min: 30,
    step: 30,
    xpPerUnit: 0.15,
    stat: "Mobilité hanches",
    pose: "stretch",
    hasTimer: true,
    description: "Mains sur les hanches, fais des cercles lents avec le bassin.",
    shortDescription: "Fais tourner ton bassin lentement.",
    coachTip: "Le mouvement doit rester doux et contrôlé."
  },
  {
    id: "thoracic_rotation",
    categoryId: "mobility",
    title: "Rotation thoracique",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/exercice_femme_rotationthoracique.jpg"
    },    unit: "min",
    defaultValue: 1,
    min: 1,
    step: 1,
    xpPerUnit: 2,
    stat: "Mobilité",
    pose: "stretch",
    hasTimer: true
  },
  {
    id: "abdominal_breathing",
    categoryId: "mobility",
    title: "Respiration abdominale",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "min",
    defaultValue: 1,
    min: 1,
    step: 1,
    xpPerUnit: 1,
    stat: "Respiration / posture",
    pose: "core",
    hasTimer: true
  },
{
    id: "slow_breathing",
    categoryId: "mobility",
    title: "Respiration profonde",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "min",
    defaultValue: 1,
    min: 1,
    step: 1,
    xpPerUnit: 1,
    stat: "Respiration / posture",
    pose: "core",
    hasTimer: true,
    description: "Inspire lentement par le nez puis expire doucement par la bouche.",
    shortDescription: "Inspire calmement, expire lentement.",
    coachTip: "Allonge surtout l’expiration."
  },
  {
    id: "slow_breathing_extended",
    categoryId: "mobility",
    title: "Respiration lente",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    categoryId: "mobility",
    title: "Étirement cuisses / mollets",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    categoryId: "mobility",
    title: "Étirement hanches / quadriceps",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
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
    id: "gentle_back_stretch",
    categoryId: "mobility",
    title: "Étirement doux du dos",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "min",
    defaultValue: 2,
    min: 1,
    step: 1,
    xpPerUnit: 1,
    stat: "Retour au calme",
    pose: "stretch",
    hasTimer: true,
    description: "Étire doucement les muscles sans douleur ni à-coups.",
    shortDescription: "Allonge doucement les muscles.",
    coachTip: "Tu dois sentir l’étirement, jamais la douleur." 
  },
  {
    id: "shoulder_arm_stretch",
    categoryId: "mobility",
    title: "Étirement épaules / bras",
    images: {
      male: "assets/exercices/homme_default.png",
      female: "assets/exercices/femme_default.png"
    },
    unit: "min",
    defaultValue: 2,
    min: 1,
    step: 1,
    xpPerUnit: 1,
    stat: "Retour au calme",
    pose: "stretch",
    hasTimer: true
  }
],
 
  // ------------------------------------------------------------
  // Programmes détaillés
  // ------------------------------------------------------------
  programDetails: {
    "eveil-heros": {
      id: "eveil-heros",
      subtitle: "Une reprise douce pour débutant complet ou retour après plusieurs mois.",
      unlockLevel: 1,
      duration: "15 à 30 min",
      frequency: "3 séances par semaine",
      reward: {
        badgeId: "heros-eveille",
        badgeTitle: "Héros Éveillé",
        chest: true,
        nextPrograms: ["forge-guerrier", "marche-aventurier"]
      },
  
   
  
   weeks: [
      {
        week: 1,
        title: "L’Appel de l’Aventure",
        xp: 50,
        progression: "Découverte douce, aucun exercice punitif. On réveille le corps sans le brusquer.",
        days: [
          {
            day: 1,
            title: "Réveil du Corps",
            xp: 50,
            difficultyLabel: "≈ 15 min",
            exercises: [
              { phase: "Échauffement", exerciseId: "march_on_spot", amount: 3, unit: "min" },
              { phase: "Mobilité", exerciseId: "arm_circles", amount: 20, unit: "répétitions" },
              { phase: "Mobilité", exerciseId: "hip_circles", amount: 20, unit: "répétitions" },
              { phase: "Jambes", exerciseId: "chair_squat", amount: 8, unit: "répétitions" },
              { phase: "Cardio doux", exerciseId: "slow_knee_raises", amount: 20, unit: "répétitions" },
              { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 3, unit: "min" }
            ]
          },
          {
            day: 2,
            title: "Fondation du Héros",
            xp: 50,
            difficultyLabel: "≈ 15 min",
            exercises: [
              { phase: "Échauffement", exerciseId: "march_on_spot", amount: 3, unit: "min" },
              { phase: "Haut du corps", exerciseId: "wall_pushups", amount: 8, unit: "répétitions" },
              { phase: "Jambes", exerciseId: "wall_sit", amount: 20, unit: "sec" },
              { phase: "Dos / équilibre", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
              { phase: "Gainage", exerciseId: "core", amount: 15, unit: "sec" },
              { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 3, unit: "min" }
            ]
          },
          {
            day: 3,
            title: "Endurance de l’Aventurier",
            xp: 50,
            difficultyLabel: "≈ 20 min",
            exercises: [
              { phase: "Endurance", exerciseId: "walk", amount: 15, unit: "min", distanceOptional: true },
              { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" },
              { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 3, unit: "min" }
            ]
          }
        ]
      },

      {
        week: 2,
        title: "Premiers Pas du Héros",
        xp: 60,
        progression: "On augmente un peu le volume, sans changer l’esprit : propre, accessible, rassurant.",
        days: [
          {
            day: 1,
            title: "Réveil du Corps",
            xp: 60,
            difficultyLabel: "≈ 18 min",
            exercises: [
              { phase: "Échauffement", exerciseId: "march_on_spot", amount: 4, unit: "min" },
              { phase: "Mobilité", exerciseId: "arm_circles", amount: 30, unit: "répétitions" },
              { phase: "Mobilité", exerciseId: "hip_circles", amount: 30, unit: "répétitions" },
              { phase: "Jambes", exerciseId: "squats", amount: 12, unit: "répétitions" },
              { phase: "Cardio doux", exerciseId: "slow_knee_raises", amount: 30, unit: "répétitions" },
              { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 4, unit: "min" }
            ]
          },
          {
            day: 2,
            title: "Fondation du Héros",
            xp: 60,
            difficultyLabel: "≈ 18 min",
            exercises: [
              { phase: "Échauffement", exerciseId: "walk", amount: 4, unit: "min" },
              { phase: "Haut du corps", exerciseId: "wall_pushups", amount: 12, unit: "répétitions" },
              { phase: "Jambes", exerciseId: "wall_sit", amount: 30, unit: "sec" },
              { phase: "Dos / équilibre", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
              { phase: "Gainage", exerciseId: "core", amount: 20, unit: "sec" },
              { phase: "Dos", exerciseId: "superman", amount: 8, unit: "répétitions" }
            ]
          },
          {
            day: 3,
            title: "Endurance de l’Aventurier",
            xp: 60,
            difficultyLabel: "≈ 24 min",
            exercises: [
              { phase: "Endurance", exerciseId: "walk", amount: 20, unit: "min", distanceOptional: true },
              { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 4, unit: "min" }
            ]
          }
        ]
      },

      {
        week: 3,
        title: "Entraînement du Novice",
        xp: 70,
        progression: "Le héros prend confiance : un peu plus de jambes, un peu plus de souffle, toujours sans punition.",
        days: [
          {
            day: 1,
            title: "Réveil du Corps",
            xp: 70,
            difficultyLabel: "≈ 22 min",
            exercises: [
              { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 5, unit: "min" },
              { phase: "Jambes", exerciseId: "squats", amount: 15, unit: "répétitions" },
              { phase: "Jambes", exerciseId: "assisted_reverse_lunges", amount: 16, unit: "répétitions" },
              { phase: "Cardio doux", exerciseId: "slow_knee_raises", amount: 40, unit: "répétitions" },
              { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 4, unit: "min" }
            ]
          },
          {
            day: 2,
            title: "Fondation du Héros",
            xp: 70,
            difficultyLabel: "≈ 22 min",
            exercises: [
              { phase: "Haut du corps", exerciseId: "incline_pushups", amount: 10, unit: "répétitions" },
              { phase: "Jambes", exerciseId: "wall_sit", amount: 40, unit: "sec" },
              { phase: "Dos / équilibre", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
              { phase: "Dos", exerciseId: "superman", amount: 10, unit: "répétitions" },
              { phase: "Gainage", exerciseId: "core", amount: 25, unit: "sec" }
            ]
          },
          {
            day: 3,
            title: "Endurance de l’Aventurier",
            xp: 70,
            difficultyLabel: "≈ 30 min",
            exercises: [
              { phase: "Endurance", exerciseId: "dynamic_walk", amount: 25, unit: "min", distanceOptional: true },
              { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 5, unit: "min" }
            ]
          }
        ]
      },

      {
        week: 4,
        title: "Le Héros s’Éveille",
        xp: 80,
        progression: "Dernière semaine : le héros termine la reprise et peut choisir sa prochaine voie.",
        days: [
          {
            day: 1,
            title: "Réveil du Corps",
            xp: 80,
            difficultyLabel: "≈ 25 min",
            exercises: [
              { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 5, unit: "min" },
              { phase: "Jambes", exerciseId: "squats", amount: 20, unit: "répétitions" },
              { phase: "Jambes", exerciseId: "reverse_lunges", amount: 20, unit: "répétitions" },
              { phase: "Cardio doux", exerciseId: "slow_knee_raises", amount: 50, unit: "répétitions" },
              { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 5, unit: "min" }
            ]
          },
          {
            day: 2,
            title: "Fondation du Héros",
            xp: 80,
            difficultyLabel: "≈ 25 min",
            exercises: [
              { phase: "Haut du corps", exerciseId: "incline_pushups", amount: 12, unit: "répétitions" },
              { phase: "Jambes", exerciseId: "wall_sit", amount: 45, unit: "sec" },
              { phase: "Dos / équilibre", exerciseId: "bird_dog", amount: 24, unit: "répétitions" },
              { phase: "Dos", exerciseId: "superman", amount: 12, unit: "répétitions" },
              { phase: "Gainage", exerciseId: "core", amount: 30, unit: "sec" }
            ]
          },
          {
            day: 3,
            title: "Endurance de l’Aventurier",
            xp: 80,
            difficultyLabel: "≈ 35 min",
            exercises: [
              { phase: "Endurance", exerciseId: "dynamic_walk", amount: 30, unit: "min", distanceOptional: true },
              { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 5, unit: "min" }
            ]
          }
        ]
      }
    ],

       bosses: [
    {
      week: 1,
      title: "Le Rat des Caves",
      subtitle: "Premier ennemi du héros.",
      xp: 30,
      badgeId: "rat-caves-vaincu",
      difficultyLabel: "Boss semaine 1 · 12 à 15 min",
      instructions: "Débloqué après les 3 séances de la semaine 1.",
      lockedMessage: "Même les plus grands héros ont commencé par chasser les rats. Termine tes entraînements, puis reviens.",
      coachLine: "Même les plus grands héros ont commencé par chasser les rats.",
      exercises: [
        { phase: "Échauffement", exerciseId: "march_on_spot", amount: 2, unit: "min" },

        { phase: "Tour 1", exerciseId: "chair_squat", amount: 6, unit: "répétitions" },
        { phase: "Tour 1", exerciseId: "wall_pushups", amount: 6, unit: "répétitions" },
        { phase: "Tour 1", exerciseId: "slow_knee_raises", amount: 20, unit: "répétitions" },
        { phase: "Tour 1 · Récupération", exerciseId: "march_on_spot", amount: 1, unit: "min" },

        { phase: "Tour 2", exerciseId: "chair_squat", amount: 6, unit: "répétitions" },
        { phase: "Tour 2", exerciseId: "wall_pushups", amount: 6, unit: "répétitions" },
        { phase: "Tour 2", exerciseId: "slow_knee_raises", amount: 20, unit: "répétitions" },
        { phase: "Tour 2 · Récupération", exerciseId: "march_on_spot", amount: 1, unit: "min" },

        { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 3, unit: "min" }
      ]
    },

    {
      week: 2,
      title: "Le Loup Solitaire",
      xp: 40,
      badgeId: "loup-solitaire-vaincu",
      difficultyLabel: "Boss semaine 2 · 15 à 18 min",
      instructions: "Débloqué après les 3 séances de la semaine 2.",
      lockedMessage: "Le loup observe les faibles. Termine ta semaine, puis montre-lui qu’il se trompe.",
      coachLine: "Le loup observe les faibles. Aujourd’hui, montre-lui qu’il se trompe.",
      exercises: [
        { phase: "Échauffement", exerciseId: "walk", amount: 3, unit: "min", distanceOptional: true },

        { phase: "Tour 1", exerciseId: "squats", amount: 10, unit: "répétitions" },
        { phase: "Tour 1", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },
        { phase: "Tour 1", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
        { phase: "Tour 1", exerciseId: "slow_knee_raises", amount: 30, unit: "répétitions" },
        { phase: "Tour 1 · Récupération", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 2", exerciseId: "squats", amount: 10, unit: "répétitions" },
        { phase: "Tour 2", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },
        { phase: "Tour 2", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
        { phase: "Tour 2", exerciseId: "slow_knee_raises", amount: 30, unit: "répétitions" },
        { phase: "Tour 2 · Récupération", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 3, unit: "min" }
      ]
    },

    {
      week: 3,
      title: "Le Sanglier des Fourrés",
      xp: 50,
      badgeId: "sanglier-fourres-vaincu",
      difficultyLabel: "Boss semaine 3 · 20 à 25 min",
      instructions: "Débloqué après les 3 séances de la semaine 3.",
      lockedMessage: "Le sanglier charge sans réfléchir. Toi, avance avec méthode : termine d’abord ta semaine.",
      coachLine: "Le sanglier charge sans réfléchir. Toi, tu avances avec méthode.",
      exercises: [
        { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 4, unit: "min", distanceOptional: true },

        { phase: "Tour 1", exerciseId: "squats", amount: 10, unit: "répétitions" },
        { phase: "Tour 1", exerciseId: "assisted_reverse_lunges", amount: 12, unit: "répétitions" },
        { phase: "Tour 1", exerciseId: "incline_pushups", amount: 8, unit: "répétitions" },
        { phase: "Tour 1", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
        { phase: "Tour 1 · Récupération", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 2", exerciseId: "squats", amount: 10, unit: "répétitions" },
        { phase: "Tour 2", exerciseId: "assisted_reverse_lunges", amount: 12, unit: "répétitions" },
        { phase: "Tour 2", exerciseId: "incline_pushups", amount: 8, unit: "répétitions" },
        { phase: "Tour 2", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
        { phase: "Tour 2 · Récupération", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 3", exerciseId: "squats", amount: 10, unit: "répétitions" },
        { phase: "Tour 3", exerciseId: "assisted_reverse_lunges", amount: 12, unit: "répétitions" },
        { phase: "Tour 3", exerciseId: "incline_pushups", amount: 8, unit: "répétitions" },
        { phase: "Tour 3", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
        { phase: "Tour 3 · Récupération", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 4, unit: "min" }
      ]
    },

    {
      week: 4,
      title: "L’Ogre Endormi",
      subtitle: "Le premier véritable adversaire.",
      xp: 75,
      badgeId: "ogre-endormi-vaincu",
      chest: true,
      nextPrograms: ["coeur-dragon", "forge-guerrier", "marche-aventurier"],
      difficultyLabel: "Boss final · 25 à 30 min",
      instructions: "Débloqué après les 3 séances de la semaine 4.",
      lockedMessage: "L’ogre paraît invincible de loin. Termine ta préparation, puis approche-toi.",
      coachLine: "L’ogre paraît invincible quand on le regarde de loin. Approche-toi et tu verras qu’il tombe comme les autres.",
      exercises: [
        { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 5, unit: "min", distanceOptional: true },

        { phase: "Tour 1", exerciseId: "squats", amount: 15, unit: "répétitions" },
        { phase: "Tour 1", exerciseId: "reverse_lunges", amount: 16, unit: "répétitions" },
        { phase: "Tour 1", exerciseId: "incline_pushups", amount: 10, unit: "répétitions" },
        { phase: "Tour 1", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
        { phase: "Tour 1", exerciseId: "core", amount: 20, unit: "sec" },
        { phase: "Tour 1 · Récupération", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 2", exerciseId: "squats", amount: 15, unit: "répétitions" },
        { phase: "Tour 2", exerciseId: "reverse_lunges", amount: 16, unit: "répétitions" },
        { phase: "Tour 2", exerciseId: "incline_pushups", amount: 10, unit: "répétitions" },
        { phase: "Tour 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
        { phase: "Tour 2", exerciseId: "core", amount: 20, unit: "sec" },
        { phase: "Tour 2 · Récupération", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 3", exerciseId: "squats", amount: 15, unit: "répétitions" },
        { phase: "Tour 3", exerciseId: "reverse_lunges", amount: 16, unit: "répétitions" },
        { phase: "Tour 3", exerciseId: "incline_pushups", amount: 10, unit: "répétitions" },
        { phase: "Tour 3", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
        { phase: "Tour 3", exerciseId: "core", amount: 20, unit: "sec" },
        { phase: "Tour 3 · Récupération", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 5, unit: "min" }
      ]
    }
  ], 
  
    progression: [
      "Semaine 1 : L’Appel de l’Aventure · découvrir sans se punir.",
      "Semaine 2 : Premiers Pas du Héros · augmenter doucement.",
      "Semaine 3 : Entraînement du Novice · construire la régularité.",
      "Semaine 4 : Le Héros s’Éveille · terminer la reprise.",
      "Récompense : badge Héros Éveillé, coffre de récompense, puis choix entre Forge du Guerrier ou Marche de l’Aventurier."
    ],
  
    notes: [
      "Objectif : débutant complet ou reprise après plusieurs mois.",
      "3 séances différentes par semaine.",
      "Progression douce.",
      "Aucune séance punitive."
    ]
  },
  
    "coeur-dragon": {
  id: "coeur-dragon",
  subtitle: "Cardio progressif sans impact violent, idéal après Éveil du héros.",
  unlockLevel: 2,
  duration: "20 à 35 min",
  frequency: "3 séances par semaine · boss hebdomadaire",
  reward: {
    badgeId: "coeur-dragon",
    badgeTitle: "Cœur de Dragon",
    chest: true,
    nextPrograms: ["messager-sentiers", "cavalier-route", "forge-guerrier"]
  },

  days: [
    {
      day: 1,
      title: "Souffle du Dragon",
      xp: 60,
      difficultyLabel: "Semaine 1 · ≈ 20 min",
      instructions: "Cardio continu doux : effort court, marche active, puis nouvel effort.",
      exercises: [
        { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 5, unit: "min" },
        { phase: "Cardio doux", exerciseId: "lateral_steps", amount: 30, unit: "sec" },
        { phase: "Récupération active", exerciseId: "walk", amount: 2, unit: "min", distanceOptional: true },
        { phase: "Cardio doux", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
        { phase: "Récupération active", exerciseId: "walk", amount: 2, unit: "min", distanceOptional: true },
        { phase: "Cardio sans impact", exerciseId: "no_jump_jacks", amount: 30, unit: "sec" },
        { phase: "Récupération active", exerciseId: "walk", amount: 2, unit: "min", distanceOptional: true },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 3, unit: "min" }
      ]
    },
    {
      day: 2,
      title: "Battement d’Ailes",
      xp: 60,
      difficultyLabel: "Semaine 1 · ≈ 20 min",
      instructions: "Intervalles faciles avec marche lente de récupération.",
      exercises: [
        { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 5, unit: "min" },
        { phase: "Intervalles", exerciseId: "side_steps", amount: 30, unit: "sec" },
        { phase: "Récupération", exerciseId: "slow_walk", amount: 1, unit: "min" },
        { phase: "Intervalles", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
        { phase: "Récupération", exerciseId: "slow_walk", amount: 1, unit: "min" },
        { phase: "Intervalles", exerciseId: "lateral_steps", amount: 30, unit: "sec" },
        { phase: "Récupération", exerciseId: "slow_walk", amount: 1, unit: "min" },
        { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
      ]
    },
    {
      day: 3,
      title: "Marche du Dragon",
      xp: 60,
      difficultyLabel: "Semaine 1 · ≈ 30 min",
      instructions: "Endurance longue, sans impact.",
      exercises: [
        { phase: "Endurance", exerciseId: "dynamic_walk", amount: 25, unit: "min", distanceOptional: true },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 5, unit: "min" }
      ]
    }
  ],

  weeks: [
    {
      week: 1,
      title: "Le Dragon s’Éveille",
      xp: 60,
      progression: "On découvre le cardio sans impact : souffle, rythme, récupération active.",
      days: [
        {
          day: 1,
          title: "Souffle du Dragon",
          xp: 60,
          difficultyLabel: "≈ 20 min",
          instructions: "Cardio continu doux : effort court, marche active, puis nouvel effort.",
          exercises: [
            { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 5, unit: "min" },
            { phase: "Cardio doux", exerciseId: "lateral_steps", amount: 30, unit: "sec" },
            { phase: "Récupération active", exerciseId: "walk", amount: 2, unit: "min", distanceOptional: true },
            { phase: "Cardio doux", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Récupération active", exerciseId: "walk", amount: 2, unit: "min", distanceOptional: true },
            { phase: "Cardio sans impact", exerciseId: "no_jump_jacks", amount: 30, unit: "sec" },
            { phase: "Récupération active", exerciseId: "walk", amount: 2, unit: "min", distanceOptional: true },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 3, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Battement d’Ailes",
          xp: 60,
          difficultyLabel: "≈ 20 min",
          instructions: "Intervalles faciles avec marche lente de récupération.",
          exercises: [
            { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 5, unit: "min" },
            { phase: "Intervalles", exerciseId: "side_steps", amount: 30, unit: "sec" },
            { phase: "Récupération", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Intervalles", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Récupération", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Intervalles", exerciseId: "lateral_steps", amount: 30, unit: "sec" },
            { phase: "Récupération", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Marche du Dragon",
          xp: 60,
          difficultyLabel: "≈ 30 min",
          instructions: "Marche rapide continue.",
          exercises: [
            { phase: "Endurance", exerciseId: "dynamic_walk", amount: 25, unit: "min", distanceOptional: true },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 5, unit: "min" }
          ]
        }
      ]
    },

    {
      week: 2,
      title: "Les Premières Flammes",
      xp: 70,
      progression: "On augmente doucement les efforts courts, sans impact violent.",
      days: [
        {
          day: 1,
          title: "Souffle du Dragon",
          xp: 70,
          difficultyLabel: "≈ 23 min",
          instructions: "Même structure que la semaine 1, avec des efforts de 45 secondes.",
          exercises: [
            { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 5, unit: "min" },
            { phase: "Cardio doux", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
            { phase: "Récupération active", exerciseId: "walk", amount: 2, unit: "min", distanceOptional: true },
            { phase: "Cardio doux", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Récupération active", exerciseId: "walk", amount: 2, unit: "min", distanceOptional: true },
            { phase: "Cardio sans impact", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
            { phase: "Récupération active", exerciseId: "walk", amount: 2, unit: "min", distanceOptional: true },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 3, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Battement d’Ailes",
          xp: 70,
          difficultyLabel: "≈ 25 min · 2 tours",
          instructions: "Effectuer 2 tours : pas chassés, marche, montées de genoux, marche, pas latéraux, marche.",
          exercises: [
            { phase: "Tour 1", exerciseId: "side_steps", amount: 30, unit: "sec" },
            { phase: "Tour 1 · Récupération", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Tour 1", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Tour 1 · Récupération", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Tour 1", exerciseId: "lateral_steps", amount: 30, unit: "sec" },
            { phase: "Tour 1 · Récupération", exerciseId: "slow_walk", amount: 1, unit: "min" },

            { phase: "Tour 2", exerciseId: "side_steps", amount: 30, unit: "sec" },
            { phase: "Tour 2 · Récupération", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Tour 2", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Tour 2 · Récupération", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Tour 2", exerciseId: "lateral_steps", amount: 30, unit: "sec" },
            { phase: "Tour 2 · Récupération", exerciseId: "slow_walk", amount: 1, unit: "min" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 3, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Marche du Dragon",
          xp: 70,
          difficultyLabel: "≈ 35 min",
          instructions: "Endurance longue.",
          exercises: [
            { phase: "Endurance", exerciseId: "dynamic_walk", amount: 30, unit: "min", distanceOptional: true },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 5, unit: "min" }
          ]
        }
      ]
    },

    {
      week: 3,
      title: "Le Dragon Prend Son Envol",
      xp: 80,
      progression: "Le souffle commence à tenir, les tours deviennent plus réguliers.",
      days: [
        {
          day: 1,
          title: "Souffle du Dragon",
          xp: 80,
          difficultyLabel: "≈ 25 min · 3 tours",
          instructions: "Effectuer 3 tours : pas latéraux, montées de genoux, jumping jack sans saut, marche active.",
          exercises: [
            { phase: "Tour 1", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
            { phase: "Tour 1", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 1", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
            { phase: "Tour 1 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

            { phase: "Tour 2", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
            { phase: "Tour 2", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 2", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
            { phase: "Tour 2 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

            { phase: "Tour 3", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
            { phase: "Tour 3", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 3", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
            { phase: "Tour 3 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 3, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Battement d’Ailes",
          xp: 80,
          difficultyLabel: "≈ 25 min · 3 tours",
          instructions: "Effectuer 3 tours : pas chassés, marche, montées de genoux, marche.",
          exercises: [
            { phase: "Tour 1", exerciseId: "side_steps", amount: 45, unit: "sec" },
            { phase: "Tour 1 · Récupération", exerciseId: "slow_walk", amount: 45, unit: "sec" },
            { phase: "Tour 1", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 1 · Récupération", exerciseId: "slow_walk", amount: 45, unit: "sec" },

            { phase: "Tour 2", exerciseId: "side_steps", amount: 45, unit: "sec" },
            { phase: "Tour 2 · Récupération", exerciseId: "slow_walk", amount: 45, unit: "sec" },
            { phase: "Tour 2", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 2 · Récupération", exerciseId: "slow_walk", amount: 45, unit: "sec" },

            { phase: "Tour 3", exerciseId: "side_steps", amount: 45, unit: "sec" },
            { phase: "Tour 3 · Récupération", exerciseId: "slow_walk", amount: 45, unit: "sec" },
            { phase: "Tour 3", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 3 · Récupération", exerciseId: "slow_walk", amount: 45, unit: "sec" },

            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Marche du Dragon",
          xp: 80,
          difficultyLabel: "≈ 40 min",
          instructions: "Endurance longue.",
          exercises: [
            { phase: "Endurance", exerciseId: "dynamic_walk", amount: 35, unit: "min", distanceOptional: true },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 5, unit: "min" }
          ]
        }
      ]
    },

    {
      week: 4,
      title: "Cœur de Dragon",
      xp: 90,
      progression: "Le joueur termine avec une vraie base cardio.",
      days: [
        {
          day: 1,
          title: "Souffle du Dragon",
          xp: 90,
          difficultyLabel: "≈ 30 min · 4 tours",
          instructions: "Effectuer 4 tours : pas latéraux, montées de genoux, jumping jack sans saut, marche active.",
          exercises: [
            { phase: "Tour 1", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
            { phase: "Tour 1", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 1", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
            { phase: "Tour 1 · Récupération active", exerciseId: "walk", amount: 45, unit: "sec", distanceOptional: true },

            { phase: "Tour 2", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
            { phase: "Tour 2", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 2", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
            { phase: "Tour 2 · Récupération active", exerciseId: "walk", amount: 45, unit: "sec", distanceOptional: true },

            { phase: "Tour 3", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
            { phase: "Tour 3", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 3", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
            { phase: "Tour 3 · Récupération active", exerciseId: "walk", amount: 45, unit: "sec", distanceOptional: true },

            { phase: "Tour 4", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
            { phase: "Tour 4", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 4", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
            { phase: "Tour 4 · Récupération active", exerciseId: "walk", amount: 45, unit: "sec", distanceOptional: true },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 4, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Battement d’Ailes",
          xp: 90,
          difficultyLabel: "≈ 30 min · 4 tours",
          instructions: "Effectuer 4 tours : pas chassés, montées de genoux, jumping jack sans saut, marche.",
          exercises: [
            { phase: "Tour 1", exerciseId: "side_steps", amount: 45, unit: "sec" },
            { phase: "Tour 1", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 1", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
            { phase: "Tour 1 · Récupération", exerciseId: "slow_walk", amount: 45, unit: "sec" },

            { phase: "Tour 2", exerciseId: "side_steps", amount: 45, unit: "sec" },
            { phase: "Tour 2", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 2", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
            { phase: "Tour 2 · Récupération", exerciseId: "slow_walk", amount: 45, unit: "sec" },

            { phase: "Tour 3", exerciseId: "side_steps", amount: 45, unit: "sec" },
            { phase: "Tour 3", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 3", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
            { phase: "Tour 3 · Récupération", exerciseId: "slow_walk", amount: 45, unit: "sec" },

            { phase: "Tour 4", exerciseId: "side_steps", amount: 45, unit: "sec" },
            { phase: "Tour 4", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
            { phase: "Tour 4", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
            { phase: "Tour 4 · Récupération", exerciseId: "slow_walk", amount: 45, unit: "sec" },

            { phase: "Respiration", exerciseId: "slow_breathing", amount: 3, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Marche du Dragon",
          xp: 90,
          difficultyLabel: "≈ 45 min",
          instructions: "Endurance longue finale.",
          exercises: [
            { phase: "Endurance", exerciseId: "dynamic_walk", amount: 40, unit: "min", distanceOptional: true },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 5, unit: "min" }
          ]
        }
      ]
    }
  ],

  bosses: [
    {
      week: 1,
      title: "Le Dragon Endormi",
      xp: 50,
      badgeId: "ecaille-dragon",
      difficultyLabel: "Boss semaine 1 · ≈ 20 min",
      instructions: "Débloqué après les 3 séances de la semaine 1.",
      lockedMessage: "Le Dragon refuse encore de t’affronter. Termine ton entraînement et reviens me voir.",
      exercises: [
        { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 3, unit: "min" },

        { phase: "Tour 1", exerciseId: "lateral_steps", amount: 30, unit: "sec" },
        { phase: "Tour 1", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
        { phase: "Tour 1 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 2", exerciseId: "lateral_steps", amount: 30, unit: "sec" },
        { phase: "Tour 2", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
        { phase: "Tour 2 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 3", exerciseId: "lateral_steps", amount: 30, unit: "sec" },
        { phase: "Tour 3", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
        { phase: "Tour 3 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Fin", exerciseId: "slow_walk", amount: 3, unit: "min" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 3, unit: "min" }
      ]
    },
    {
      week: 2,
      title: "Le Gardien des Flammes",
      xp: 60,
      badgeId: "gardien-flammes",
      difficultyLabel: "Boss semaine 2 · ≈ 25 min",
      instructions: "Débloqué après les 3 séances de la semaine 2.",
      lockedMessage: "Le Dragon refuse encore de t’affronter. Termine ton entraînement et reviens me voir.",
      exercises: [
        { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 5, unit: "min" },

        { phase: "Tour 1", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
        { phase: "Tour 1", exerciseId: "side_steps", amount: 45, unit: "sec" },
        { phase: "Tour 1", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
        { phase: "Tour 1 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 2", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
        { phase: "Tour 2", exerciseId: "side_steps", amount: 45, unit: "sec" },
        { phase: "Tour 2", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
        { phase: "Tour 2 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 3", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
        { phase: "Tour 3", exerciseId: "side_steps", amount: 45, unit: "sec" },
        { phase: "Tour 3", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
        { phase: "Tour 3 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 3, unit: "min" }
      ]
    },
    {
      week: 3,
      title: "Le Drake Rouge",
      xp: 70,
      badgeId: "drake-rouge",
      difficultyLabel: "Boss semaine 3 · ≈ 30 min",
      instructions: "Débloqué après les 3 séances de la semaine 3.",
      lockedMessage: "Le Dragon refuse encore de t’affronter. Termine ton entraînement et reviens me voir.",
      exercises: [
        { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 5, unit: "min" },

        { phase: "Tour 1", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
        { phase: "Tour 1", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
        { phase: "Tour 1", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
        { phase: "Tour 1 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 2", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
        { phase: "Tour 2", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
        { phase: "Tour 2", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
        { phase: "Tour 2 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 3", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
        { phase: "Tour 3", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
        { phase: "Tour 3", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
        { phase: "Tour 3 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 4", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
        { phase: "Tour 4", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
        { phase: "Tour 4", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
        { phase: "Tour 4 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Fin", exerciseId: "slow_walk", amount: 3, unit: "min" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 4, unit: "min" }
      ]
    },
    {
      week: 4,
      title: "Cœur de Dragon",
      xp: 100,
      badgeId: "coeur-dragon",
      chest: true,
      nextPrograms: ["messager-sentiers", "cavalier-route", "forge-guerrier"],
      difficultyLabel: "Boss final · ≈ 35 min",
      instructions: "Débloqué après les 3 séances de la semaine 4.",
      lockedMessage: "Le Dragon refuse encore de t’affronter. Termine ton entraînement et reviens me voir.",
      exercises: [
        { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 5, unit: "min" },

        { phase: "Tour 1", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
        { phase: "Tour 1", exerciseId: "side_steps", amount: 45, unit: "sec" },
        { phase: "Tour 1", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
        { phase: "Tour 1", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
        { phase: "Tour 1 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 2", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
        { phase: "Tour 2", exerciseId: "side_steps", amount: 45, unit: "sec" },
        { phase: "Tour 2", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
        { phase: "Tour 2", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
        { phase: "Tour 2 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 3", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
        { phase: "Tour 3", exerciseId: "side_steps", amount: 45, unit: "sec" },
        { phase: "Tour 3", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
        { phase: "Tour 3", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
        { phase: "Tour 3 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 4", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
        { phase: "Tour 4", exerciseId: "side_steps", amount: 45, unit: "sec" },
        { phase: "Tour 4", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
        { phase: "Tour 4", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
        { phase: "Tour 4 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Tour 5", exerciseId: "lateral_steps", amount: 45, unit: "sec" },
        { phase: "Tour 5", exerciseId: "side_steps", amount: 45, unit: "sec" },
        { phase: "Tour 5", exerciseId: "slow_knee_raises", amount: 45, unit: "sec" },
        { phase: "Tour 5", exerciseId: "no_jump_jacks", amount: 45, unit: "sec" },
        { phase: "Tour 5 · Récupération active", exerciseId: "walk", amount: 1, unit: "min", distanceOptional: true },

        { phase: "Fin", exerciseId: "slow_walk", amount: 5, unit: "min" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 5, unit: "min" }
      ]
    }
  ],

  progression: [
    "Semaine 1 : Le Dragon s’Éveille · découvrir le cardio sans impact.",
    "Semaine 2 : Les Premières Flammes · augmenter les efforts à 45 secondes.",
    "Semaine 3 : Le Dragon Prend Son Envol · consolider le souffle.",
    "Semaine 4 : Cœur de Dragon · tenir une vraie base cardio.",
    "Chaque samedi : boss hebdomadaire débloqué après les 3 séances de la semaine.",
    "Récompense finale : badge Cœur de Dragon, coffre de récompense, puis programmes conseillés : Messager des Sentiers, Cavalier de la Route ou Forge du Guerrier."
  ],

  notes: [
    "Objectif : préparer à la course, au vélo, à la randonnée ou aux programmes plus sportifs.",
    "Cardio progressif sans impact violent.",
    "Structure principale : effort court puis récupération active.",
    "Les marches répétées sont volontairement séparées pour créer une vraie alternance cardio.",
    "Les boss sont stockés séparément dans bosses pour ne pas compter comme séances normales."
  ]
},
      "bras-heros": {
        id: "bras-heros",
        subtitle: "Renforce tes bras, stabilise tes épaules, prépare-toi au prochain combat.",
        material: "Poids du corps au début, puis haltères de 1 kg à partir de la semaine 3.",
        days: [
          {
            day: 1,
            title: "Phase 1 · Poids du corps",
            xp: 35,
            difficultyLabel: "Séance bras complète",
            exercises: [
              { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
              { phase: "Échauffement", exerciseId: "arm_open_close", amount: 1, unit: "min" },
              { phase: "Bras / poitrine", exerciseId: "wall_pushups", amount: 20, unit: "répétitions" },
              { phase: "Bras / poitrine", exerciseId: "incline_pushups", amount: 16, unit: "répétitions" },
              { phase: "Épaules", exerciseId: "incline_shoulder_taps", amount: 20, unit: "répétitions" },
              { phase: "Triceps", exerciseId: "wall_triceps_extension", amount: 16, unit: "répétitions" },
              { phase: "Gainage bras", exerciseId: "knee_plank", amount: 40, unit: "sec" },
              { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 2, unit: "min" }
            ]
          },
          {
            day: 2,
            title: "Phase 2 · Haltères 1 kg",
            xp: 40,
            difficultyLabel: "Séance avec haltères",
            exercises: [
              { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
              { phase: "Biceps", exerciseId: "biceps_curl_1kg", amount: 36, unit: "répétitions" },
              { phase: "Biceps / avant-bras", exerciseId: "hammer_curl_1kg", amount: 24, unit: "répétitions" },
              { phase: "Épaules", exerciseId: "lateral_raises_1kg", amount: 20, unit: "répétitions" },
              { phase: "Épaules", exerciseId: "front_raises_1kg", amount: 20, unit: "répétitions" },
              { phase: "Triceps", exerciseId: "triceps_kickback_1kg", amount: 20, unit: "répétitions" },
              { phase: "Épaules / bras", exerciseId: "shoulder_press_1kg", amount: 20, unit: "répétitions" },
              { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 2, unit: "min" }
            ]
          },
          {
            day: 3,
            title: "Séance express",
            xp: 20,
            difficultyLabel: "Séance bras courte",
            exercises: [
              { phase: "Bras / poitrine", exerciseId: "wall_pushups", amount: 20, unit: "répétitions" },
              { phase: "Biceps", exerciseId: "biceps_curl_1kg", amount: 24, unit: "répétitions" },
              { phase: "Épaules", exerciseId: "lateral_raises_1kg", amount: 20, unit: "répétitions" },
              { phase: "Triceps", exerciseId: "triceps_kickback_1kg", amount: 20, unit: "répétitions" },
              { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" }
            ]
          }
        ],
        progression: [
          "Semaine 1 : poids du corps facile.",
          "Semaine 2 : poids du corps avec une série en plus si tout va bien.",
          "Semaine 3 : introduction des haltères de 1 kg.",
          "Semaine 4 : haltères 1 kg avec répétitions plus lentes."
        ],
        notes: [
          "Pompes murales : mains contre un mur, poitrine vers le mur, repousse lentement.",
          "Taps épaules inclinés : en appui sur table ou mur, touche l’épaule opposée sans bouger le bassin.",
          "Extension triceps contre un mur : garde les coudes près du corps.",
          "Curl biceps : monte les haltères sans balancer le corps.",
          "Élévations latérales et frontales : monte jusqu’à hauteur des épaules, puis redescends lentement.",
          "Kickback triceps : coude près du corps, tends le bras vers l’arrière.",
          "Développé épaules : pousse vers le haut sans cambrer le dos."
        ]
      },
      "cavalier-route": {
        id: "cavalier-route",
        subtitle: "Prépare tes jambes, renforce ton souffle, roule plus longtemps.",
        material: "Poids du corps, éventuellement haltères 1 kg à partir de la semaine 3.",
        days: [
          {
            day: 1,
            title: "Séance débutant",
            xp: 25,
            difficultyLabel: "Séance préparation vélo courte",
            exercises: [
              { phase: "Échauffement", exerciseId: "march_on_spot", amount: 2, unit: "min" },
              { phase: "Mobilité", exerciseId: "hip_circles", amount: 60, unit: "sec" },
              { phase: "Mobilité", exerciseId: "slow_knee_raises", amount: 60, unit: "sec" },
              { phase: "Jambes", exerciseId: "chair_squat", amount: 20, unit: "répétitions" },
              { phase: "Jambes", exerciseId: "assisted_reverse_lunges", amount: 16, unit: "répétitions" },
              { phase: "Fessiers", exerciseId: "bridge", amount: 24, unit: "répétitions" },
              { phase: "Mollets", exerciseId: "calf_raises", amount: 30, unit: "répétitions" },
              { phase: "Gainage", exerciseId: "knee_plank", amount: 40, unit: "sec" },
              { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 3, unit: "min" }
            ]
          },
          {
            day: 2,
            title: "Séance intermédiaire",
            xp: 40,
            difficultyLabel: "Séance complète",
            exercises: [
              { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 3, unit: "min" },
              { phase: "Cardio", exerciseId: "side_steps", amount: 90, unit: "sec" },
              { phase: "Jambes", exerciseId: "squats", amount: 36, unit: "répétitions" },
              { phase: "Jambes", exerciseId: "reverse_lunges", amount: 24, unit: "répétitions" },
              { phase: "Fessiers", exerciseId: "single_leg_bridge_alternate", amount: 16, unit: "répétitions" },
              { phase: "Mollets", exerciseId: "calf_raises", amount: 45, unit: "répétitions" },
              { phase: "Gainage", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
              { phase: "Gainage", exerciseId: "core", amount: 75, unit: "sec" },
              { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 3, unit: "min" }
            ]
          },
          {
            day: 3,
            title: "Mini-quête vélo réel",
            xp: 30,
            difficultyLabel: "Sortie vélo facile",
            exercises: [
              { phase: "Échauffement très facile", exerciseId: "bike", amount: 5, unit: "min", distanceOptional: true },
              { phase: "Rythme confortable", exerciseId: "bike", amount: 20, unit: "min", distanceOptional: true },
              { phase: "Petites accélérations", exerciseId: "bike", amount: 1, unit: "min", distanceOptional: true },
              { phase: "Retour au calme", exerciseId: "bike", amount: 5, unit: "min", distanceOptional: true }
            ]
          },
          {
            day: 4,
            title: "Sortie longue du week-end",
            xp: 50,
            difficultyLabel: "Sortie vélo longue",
            exercises: [
              { phase: "Vélo facile à modéré", exerciseId: "bike", amount: 45, unit: "min", distanceOptional: true }
            ]
          }
        ],
        progression: [
          "Semaine 1 : apprendre les mouvements et protéger les genoux.",
          "Semaine 2 : ajouter quelques répétitions.",
          "Semaine 3 : ajouter les haltères 1 kg ou allonger la sortie vélo.",
          "Semaine 4 : ajouter une séance vélo bonus ou une série de plus.",
          "Avec 1 kg, l’objectif n’est pas la force brute, mais le contrôle et la stabilité."
        ],
        notes: [
          "Les haltères 1 kg peuvent être utilisés sur les squats, les fentes arrière, les montées sur pointes et la marche dynamique.",
          "Pas d’haltères sur le gainage.",
          "Ce programme complète Marche de l’aventurier et Forge du guerrier."
        ]
      },

    "forge-guerrier": {
      id: "forge-guerrier",
      days: [
        {
          day: 1,
          title: "Renforcement complet",
          exercises: [
            { phase: "Échauffement", exerciseId: "dynamic_walk", amount: 4, unit: "min" },
            { phase: "Jambes", exerciseId: "squats", amount: 12, unit: "répétitions" },
            { phase: "Haut du corps", exerciseId: "incline_pushups", amount: 8, unit: "répétitions" },
            { phase: "Dos", exerciseId: "superman", amount: 10, unit: "répétitions" },
            { phase: "Centre", exerciseId: "core", amount: 20, unit: "sec" },
            { phase: "Fessiers", exerciseId: "bridge", amount: 12, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 4, unit: "min" }
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
            { phase: "Étirement", exerciseId: "gentle_back_stretch", amount: 5, unit: "min" }
          ]
        }
      ],
      progression: [
        "Très utile pour les jours de fatigue.",
        "Objectif : sauver la série sans se punir."
      ]
    },

    "rempart-heros": {
      id: "rempart-heros",
      subtitle: "Renforce ton centre, protège ton dos, tiens la ligne.",
      material: "Poids du corps. Tapis conseillé.",
      days: [
        {
          day: 1,
          title: "Séance débutant",
          xp: 20,
          difficultyLabel: "Séance abdos courte",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Activation", exerciseId: "pelvic_tilt", amount: 10, unit: "répétitions" },
            { phase: "Abdos doux", exerciseId: "dead_bug_simplified", amount: 32, unit: "répétitions" },
            { phase: "Gainage", exerciseId: "knee_plank", amount: 60, unit: "sec" },
            { phase: "Obliques", exerciseId: "side_plank_knees", amount: 60, unit: "sec" },
            { phase: "Bas du corps / centre", exerciseId: "bridge", amount: 24, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Séance intermédiaire",
          xp: 35,
          difficultyLabel: "Séance abdos normale",
          exercises: [
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Abdos", exerciseId: "dead_bug", amount: 60, unit: "répétitions" },
            { phase: "Gainage", exerciseId: "core", amount: 90, unit: "sec" },
            { phase: "Obliques", exerciseId: "side_plank", amount: 80, unit: "sec" },
            { phase: "Dynamique", exerciseId: "mountain_climber_slow", amount: 90, unit: "sec" },
            { phase: "Contrôle", exerciseId: "pelvic_lift_floor", amount: 24, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Séance avancée",
          xp: 50,
          difficultyLabel: "Séance abdos avancée",
          exercises: [
            { phase: "Gainage", exerciseId: "core", amount: 135, unit: "sec" },
            { phase: "Obliques", exerciseId: "side_plank", amount: 180, unit: "sec" },
            { phase: "Dynamique", exerciseId: "mountain_climber_slow", amount: 120, unit: "sec" },
            { phase: "Abdos", exerciseId: "crunch_controlled", amount: 45, unit: "répétitions" },
            { phase: "Contrôle", exerciseId: "dead_bug", amount: 60, unit: "répétitions" },
            { phase: "Finisher", exerciseId: "hollow_hold_simplified", amount: 45, unit: "sec" }
          ]
        }
      ],
      progression: [
        "Semaine 1 : apprendre les mouvements en version douce.",
        "Semaine 2 : ajouter 5 à 10 secondes de gainage.",
        "Semaine 3 : ajouter une série sur dead bug ou planche.",
        "Semaine 4 : passer à la version intermédiaire.",
        "Objectif : renforcer le centre sans brutaliser le dos."
      ],
      notes: [
        "Dead bug : garde le bas du dos proche du sol et alterne sans cambrer.",
        "Bascule du bassin : contracte doucement les abdos pour rapprocher le bas du dos du sol.",
        "Planche genoux : corps aligné des épaules aux genoux, abdos serrés.",
        "Gainage latéral genoux : appui avant-bras et genoux, hanches levées.",
        "Mountain climber lent : dos stable, genou ramené lentement vers la poitrine."
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
      id: "heros-eveille",
      icon: "🌅",
      title: "Héros Éveillé",
      description: "Terminer les 12 séances du programme Éveil du héros.",
      type: "program",
      programId: "eveil-heros",
      target: 12
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
      id: "bras-heros",
      icon: "💪",
      title: "Bras du héros",
      description: "Terminer une séance du programme Bras du héros.",
      type: "program",
      programId: "bras-heros",
      target: 1
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
      id: "rempart-heros",
      icon: "🛡️",
      title: "Rempart du héros",
      description: "Terminer une séance du programme Rempart du héros.",
      type: "program",
      programId: "rempart-heros",
      target: 1
    },
    {
      id: "rat-caves-vaincu",
      icon: "🐀",
      title: "Rat des Caves vaincu",
      description: "Vaincre le boss de la semaine 1 du programme Éveil du héros.",
      type: "program-boss",
      programId: "eveil-heros",
      weekNumber: 1,
      target: 1
    },
    {
      id: "loup-solitaire-vaincu",
      icon: "🐺",
      title: "Loup Solitaire vaincu",
      description: "Vaincre le boss de la semaine 2 du programme Éveil du héros.",
      type: "program-boss",
      programId: "eveil-heros",
      weekNumber: 2,
      target: 1
    },
    {
      id: "sanglier-fourres-vaincu",
      icon: "🐗",
      title: "Sanglier des Fourrés vaincu",
      description: "Vaincre le boss de la semaine 3 du programme Éveil du héros.",
      type: "program-boss",
      programId: "eveil-heros",
      weekNumber: 3,
      target: 1
    },
    {
      id: "ogre-endormi-vaincu",
      icon: "🧌",
      title: "Ogre Endormi vaincu",
      description: "Vaincre le boss final du programme Éveil du héros.",
      type: "program-boss",
      programId: "eveil-heros",
      weekNumber: 4,
      target: 1
    },
    {
      id: "ecaille-dragon",
      icon: "🐉",
      title: "Écaille du Dragon",
      description: "Vaincre le boss de la semaine 1 du programme Cœur de Dragon.",
      type: "program-boss",
      programId: "coeur-dragon",
      weekNumber: 1,
      target: 1
    },
    {
      id: "gardien-flammes",
      icon: "🔥",
      title: "Gardien des Flammes",
      description: "Vaincre le boss de la semaine 2 du programme Cœur de Dragon.",
      type: "program-boss",
      programId: "coeur-dragon",
      weekNumber: 2,
      target: 1
    },
    {
      id: "drake-rouge",
      icon: "🐲",
      title: "Drake Rouge",
      description: "Vaincre le boss de la semaine 3 du programme Cœur de Dragon.",
      type: "program-boss",
      programId: "coeur-dragon",
      weekNumber: 3,
      target: 1
    },
    {
      id: "coeur-dragon",
      icon: "❤️‍🔥",
      title: "Cœur de Dragon",
      description: "Vaincre le boss final du programme Cœur de Dragon.",
      type: "program-boss",
      programId: "coeur-dragon",
      weekNumber: 4,
      target: 1
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
  return (window.FitnessRpgData.exercises || []).map((exercise) => {
    const category = window.FitnessRpgData.exerciseCategories.find((item) => {
      return item.id === exercise.categoryId;
    });

    return {
      ...exercise,
      sportId: exercise.categoryId,
      sportTitle: category?.title || "Exercice",
      sportIcon: category?.icon || "⚔️"
    };
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
