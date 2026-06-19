// ============================================================
// Fitness RPG - app-data.js
// Version V5-clean - MAJ Champion des Arènes
// ------------------------------------------------------------
// Rôle de ce fichier :
// - stocker les données de jeu ;
// - stocker les coachs ;
// - stocker les catégories et exercices ;
// - stocker les programmes détaillés ;
// - stocker les familiers de récompense ;
// - stocker les badges.
//
// Règle importante :
// ce fichier ne modifie jamais le DOM.
// Il ne contient aucune version.
// ============================================================

window.FitnessRpgData = {
  "genderLabels": {
    "homme": "Homme",
    "femme": "Femme"
  },
  "coaches": {
    "korvan": {
      "id": "korvan",
      "name": "Korvan",
      "fullName": "Coach Korvan le Barbare",
      "image": "assets/coach/korvan/idle.jpg",
      "fallbackImage": "assets/coach/korvan/image.jpg",
      "poses": {
        "idle": "assets/coach/korvan/idle.jpg",
        "welcome": "assets/coach/korvan/welcome.jpg",
        "explain": "assets/coach/korvan/explain.jpg",
        "motivate": "assets/coach/korvan/motivate.jpg",
        "warmup": "assets/coach/korvan/warmup.jpg",
        "walk": "assets/coach/korvan/walk.jpg",
        "bike": "assets/coach/korvan/bike.jpg",
        "run": "assets/coach/korvan/walk.jpg",
        "squats": "assets/coach/korvan/squats.jpg",
        "core": "assets/coach/korvan/core.jpg",
        "stretch": "assets/coach/korvan/stretch.jpg",
        "victory": "assets/coach/korvan/victory.jpg",
        "levelup": "assets/coach/korvan/levelup.jpg"
      },
      "start": [
        "Debout. Le corps ne devient pas fort en négociant avec le canapé.",
        "Aujourd’hui, tu gagnes ta ration de gloire.",
        "Les muscles dorment. Réveille-les."
      ],
      "complete": [
        "Quête accomplie. Tu n’es pas venu pour rien.",
        "La faiblesse recule d’un pas. Continue."
      ],
      "levelUp": [
        "Niveau supérieur. Ton nom mérite une ligne de plus dans la saga.",
        "Ton corps se renforce. Les ennemis prennent des notes."
      ],
      "byExercise": {
        "warmup": [
          "Échauffe-toi. Même une hache doit être levée avant la bataille."
        ],
        "walk": [
          "Marche. Chaque pas écrase un peu plus l’ancien toi."
        ],
        "bike": [
          "Pédale. Que tes jambes deviennent des roues de guerre."
        ],
        "run_treadmill": [
          "Course sur tapis. Garde le rythme, comme un tambour de guerre."
        ],
        "run_outdoor": [
          "Course extérieure. Le monde devient ta piste d’entraînement."
        ],
        "pilates": [
          "Contrôle et discipline. Même un barbare doit tenir son centre."
        ],
        "pushups": [
          "Les pompes ont parlé. Le sol a perdu."
        ],
        "mountain": [
          "Mountain climbing. La montagne n’a qu’à bien se tenir."
        ],
        "squats": [
          "Les jambes forgent leur réputation."
        ],
        "core": [
          "Tiens. Un tronc solide porte mieux la légende."
        ],
        "bridge": [
          "Pont de hanches. Une forteresse commence par des fondations solides."
        ],
        "stretch": [
          "La récupération n’est pas une faiblesse. C’est l’affûtage de la lame."
        ]
      }
    },
    "xara": {
      "id": "xara",
      "name": "Xara",
      "fullName": "Coach Xara la Guerrière",
      "image": "assets/coach/xara/xara_idle.jpg",
      "fallbackImage": "assets/coach/xara/image.jpg",
      "poses": {
        "idle": "assets/coach/xara/xara_idle.jpg",
        "welcome": "assets/coach/xara/xara_welcome.jpg",
        "explain": "assets/coach/xara/xara_explain.jpg",
        "motivate": "assets/coach/xara/xara_motivate.jpg",
        "warmup": "assets/coach/xara/xara_warmup.jpg",
        "walk": "assets/coach/xara/xara_walk.jpg",
        "bike": "assets/coach/xara/xara_bike.jpg",
        "run": "assets/coach/xara/xara_walk.jpg",
        "squats": "assets/coach/xara/xara_squats.jpg",
        "core": "assets/coach/xara/xara_core.jpg",
        "stretch": "assets/coach/xara/xara_stretch.jpg",
        "victory": "assets/coach/xara/xara_victory.jpg",
        "levelup": "assets/coach/xara/xara_levelup.jpg"
      },
      "start": [
        "Allez, guerrier. On commence proprement, on finit fièrement.",
        "Pas besoin d’être parfait. Besoin d’être présent."
      ],
      "complete": [
        "Bien joué. Ton futur toi vient d’applaudir.",
        "Tu as tenu. C’est comme ça qu’on construit une légende."
      ],
      "levelUp": [
        "Niveau supérieur ! Tu avances avec panache."
      ],
      "byExercise": {
        "warmup": [
          "Une bonne guerrière ne charge pas à froid."
        ],
        "walk": [
          "Garde l’allure. La régularité gagne plus de combats que l’orgueil."
        ],
        "bike": [
          "Trouve ton rythme. Respiration stable, jambes efficaces."
        ],
        "run_treadmill": [
          "Course sur tapis. Stable, propre, efficace."
        ],
        "run_outdoor": [
          "Course extérieure. Garde la posture, garde le souffle."
        ],
        "pilates": [
          "Contrôle précis. Très bon choix."
        ],
        "pushups": [
          "Pompes propres. Appuis solides."
        ],
        "mountain": [
          "Rythme propre, bassin stable."
        ],
        "squats": [
          "Les jambes construisent la victoire."
        ],
        "core": [
          "Tiens la position. Le combat se gagne aussi dans l’immobilité."
        ],
        "bridge": [
          "Pont de hanches. Solide et contrôlé."
        ],
        "stretch": [
          "Récupère avec sérieux. La souplesse protège le guerrier."
        ]
      }
    },
    "violette": {
      "id": "violette",
      "name": "Violette",
      "fullName": "Coach Violette la Halfeline",
      "image": "assets/coach/violette/violette_idle.jpg",
      "fallbackImage": "assets/coach/violette/image.jpg",
      "poses": {
        "idle": "assets/coach/violette/violette_idle.jpg",
        "welcome": "assets/coach/violette/violette_welcome.jpg",
        "explain": "assets/coach/violette/violette_explain.jpg",
        "motivate": "assets/coach/violette/violette_motivate.jpg",
        "victory": "assets/coach/violette/violette_victory.jpg",
        "levelup": "assets/coach/violette/violette_levelup.jpg",
        "warmup": "assets/coach/violette/violette_warmup.jpg",
        "walk": "assets/coach/violette/violette_walk.jpg",
        "bike": "assets/coach/violette/violette_bike.jpg",
        "run": "assets/coach/violette/violette_run.jpg",
        "squats": "assets/coach/violette/violette_squats.jpg",
        "core": "assets/coach/violette/violette_core.jpg",
        "stretch": "assets/coach/violette/violette_stretch.jpg"
      },
      "start": [
        "On y va doucement, mais on y va vraiment !",
        "Petit pas, grand progrès. Aujourd’hui, on avance."
      ],
      "complete": [
        "Bravo ! Une quête de plus dans la besace.",
        "Tu avances mieux que tu ne le crois, continue !"
      ],
      "levelUp": [
        "Niveau supérieur ! Ça mérite presque un second petit déjeuner."
      ],
      "byExercise": {
        "warmup": [
          "On réveille doucement la machine."
        ],
        "walk": [
          "Une bonne marche, c’est une aventure qui a mis de bonnes chaussures."
        ],
        "bike": [
          "Tes jambes tournent, ton XP monte. Belle affaire !"
        ],
        "run_treadmill": [
          "Course sur tapis : doucement au début, fièrement à la fin."
        ],
        "run_outdoor": [
          "Course dehors : chaque foulée est une petite victoire."
        ],
        "pilates": [
          "Pilates bien placé. Petit effort, vrai progrès."
        ],
        "stretch": [
          "On s’étire, on respire, on remet le corps en mode velours."
        ]
      }
    },
    "elmin": {
      "id": "elmin",
      "name": "Elmin",
      "fullName": "Coach Elmin le Mage",
      "image": "assets/coach/elmin/elmin_idle.jpg",
      "fallbackImage": "assets/coach/elmin/image.jpg",
      "poses": {
        "idle": "assets/coach/elmin/elmin_idle.jpg",
        "welcome": "assets/coach/elmin/elmin_welcome.jpg",
        "explain": "assets/coach/elmin/elmin_explain.jpg",
        "motivate": "assets/coach/elmin/elmin_motivate.jpg",
        "warmup": "assets/coach/elmin/elmin_warmup.jpg",
        "walk": "assets/coach/elmin/elmin_walk.jpg",
        "bike": "assets/coach/elmin/elmin_bike.jpg",
        "run": "assets/coach/elmin/elmin_walk.jpg",
        "squats": "assets/coach/elmin/elmin_squats.jpg",
        "core": "assets/coach/elmin/elmin_core.jpg",
        "stretch": "assets/coach/elmin/elmin_stretch.jpg",
        "victory": "assets/coach/elmin/elmin_victory.jpg",
        "levelup": "assets/coach/elmin/elmin_levelup.jpg"
      },
      "start": [
        "Concentre-toi. Chaque répétition est un sort bien exécuté.",
        "La régularité est une magie discrète, mais puissante."
      ],
      "complete": [
        "Excellent. L’effort a été canalisé avec précision.",
        "Très bien. Tu gagnes en maîtrise autant qu’en force."
      ],
      "levelUp": [
        "Niveau supérieur. Les résultats suivent la discipline."
      ],
      "byExercise": {
        "warmup": [
          "Le rituel commence par la préparation."
        ],
        "walk": [
          "La marche est une magie ancienne : simple, lente, efficace."
        ],
        "bike": [
          "Pédale avec méthode. Le souffle est ton métronome."
        ],
        "run_treadmill": [
          "Course sur tapis. Observe ton rythme, ajuste ton sort."
        ],
        "run_outdoor": [
          "Course extérieure. Le souffle guide l’incantation."
        ],
        "pilates": [
          "Le centre s’éveille."
        ],
        "core": [
          "Le gainage est une concentration mise en forme."
        ],
        "stretch": [
          "La souplesse est une magie lente. Ne la brusque pas."
        ]
      }
    },
    "bazul": {
      "id": "bazul",
      "name": "Bazul",
      "fullName": "Coach Bazul le Nain",
      "image": "assets/coach/bazul/bazul_idle.jpg",
      "fallbackImage": "assets/coach/bazul/bazul_idle.jpg",
      "poses": {
        "idle": "assets/coach/bazul/bazul_idle.jpg",
        "welcome": "assets/coach/bazul/bazul_welcome.jpg",
        "explain": "assets/coach/bazul/bazul_explain.jpg",
        "motivate": "assets/coach/bazul/bazul_motivate.jpg",
        "victory": "assets/coach/bazul/bazul_victory.jpg",
        "levelup": "assets/coach/bazul/bazul_levelup.jpg",
        "warmup": "assets/coach/bazul/bazul_warmup.jpg",
        "walk": "assets/coach/bazul/bazul_walk.jpg",
        "bike": "assets/coach/bazul/bazul_bike.jpg",
        "run": "assets/coach/bazul/bazul_run.jpg",
        "squats": "assets/coach/bazul/bazul_squats.jpg",
        "core": "assets/coach/bazul/bazul_core.jpg",
        "stretch": "assets/coach/bazul/bazul_stretch.jpg"
      },
      "start": [
        "Allez, on s’y met. Une montagne ne se taille pas en la regardant.",
        "Pieds au sol, souffle stable. On construit solide.",
        "Pas besoin d’élégance. Besoin de régularité et de pierre dure."
      ],
      "complete": [
        "Bon travail. C’est propre, dense, compact. Du vrai ouvrage nain.",
        "Une entrée de plus dans la pierre. Ça compte."
      ],
      "levelUp": [
        "Niveau supérieur ! Voilà une progression qu’on pourrait graver sur une enclume."
      ],
      "byExercise": {
        "warmup": [
          "On chauffe les articulations. Même le granit fissure si on le brusque."
        ],
        "walk": [
          "Marche ferme. Talon solide, regard devant."
        ],
        "bike": [
          "Pédale rond. Une roue bien menée vaut un marteau bien tenu."
        ],
        "run_treadmill": [
          "Course sur tapis. Garde une cadence de forge."
        ],
        "run_outdoor": [
          "Course extérieure. Solide sur les appuis."
        ],
        "pushups": [
          "Pompes validées. Bras solides, poitrine haute."
        ],
        "squats": [
          "Squats. Les jambes sont les piliers de la forteresse."
        ],
        "core": [
          "Gainage. Tronc verrouillé comme une porte de mine."
        ],
        "bridge": [
          "Pont de hanches. Une arche solide, pas une planche branlante."
        ],
        "stretch": [
          "Étirements. On entretient l’outil après le travail."
        ]
      }
    },
    "satyne": {
      "id": "satyne",
      "name": "Satyne",
      "fullName": "Coach Satyne la Sorcière",
      "image": "assets/coach/satyne/satyne_idle.jpg",
      "fallbackImage": "assets/coach/satyne/satyne_idle.jpg",
      "poses": {
        "idle": "assets/coach/satyne/satyne_idle.jpg",
        "welcome": "assets/coach/satyne/satyne_welcome.jpg",
        "explain": "assets/coach/satyne/satyne_explain.jpg",
        "motivate": "assets/coach/satyne/satyne_motivate.jpg",
        "victory": "assets/coach/satyne/satyne_victory.jpg",
        "levelup": "assets/coach/satyne/satyne_levelup.jpg",
        "warmup": "assets/coach/satyne/satyne_warmup.jpg",
        "walk": "assets/coach/satyne/satyne_walk.jpg",
        "bike": "assets/coach/satyne/satyne_bike.jpg",
        "run": "assets/coach/satyne/satyne_run.jpg",
        "squats": "assets/coach/satyne/satyne_squats.jpg",
        "core": "assets/coach/satyne/satyne_core.jpg",
        "stretch": "assets/coach/satyne/satyne_stretch.jpg"
      },
      "start": [
        "Viens, mon petit sort d’endurance. On va réveiller les muscles endormis.",
        "Un souffle, un geste, une goutte d’effort. La potion commence.",
        "Aujourd’hui, on transforme la fatigue en poussière d’étoile."
      ],
      "complete": [
        "Rituel accompli. Ton corps vient de gagner un ingrédient rare.",
        "Très bien. Je sens l’énergie circuler, et elle a de jolies dents."
      ],
      "levelUp": [
        "Niveau supérieur ! La métamorphose est en marche."
      ],
      "byExercise": {
        "warmup": [
          "Échauffement lancé. On délie les charnières du pantin héroïque."
        ],
        "walk": [
          "Marche active. Chaque pas trace un glyphe sous tes pieds."
        ],
        "bike": [
          "Vélo. Fais tourner la roue, fais monter l’incantation."
        ],
        "run_treadmill": [
          "Course sur tapis. La roue tourne, le sort accélère."
        ],
        "run_outdoor": [
          "Course extérieure. Le vent entre dans la potion."
        ],
        "pilates": [
          "Pilates. Le centre du corps devient un petit chaudron stable."
        ],
        "pushups": [
          "Pompes. La terre reçoit ton pacte, puis te repousse."
        ],
        "squats": [
          "Squats. Plie, remonte, cueille la force dans les genoux."
        ],
        "core": [
          "Gainage. Ne bouge plus. Même les ombres prennent exemple."
        ],
        "stretch": [
          "Étirements. On rallonge les fils de la marionnette sans les casser."
        ]
      }
    }
  },
  "exerciseCategories": [
    {
      "id": "warmup",
      "title": "Échauffement",
      "icon": "🔥",
      "color": "#f0b84f",
      "images": {
        "homme": "assets/categories/categorie_homme_echauffement.png",
        "femme": "assets/categories/categorie_femme_echauffement.png",
        "male": "assets/categories/categorie_homme_echauffement.png",
        "female": "assets/categories/categorie_femme_echauffement.png"
      },
      "description": "Préparer le corps avant l’effort."
    },
    {
      "id": "mobility",
      "title": "Mobilité",
      "icon": "🌀",
      "color": "#7db7ff",
      "images": {
        "homme": "assets/categories/categorie_homme_mobilite.png",
        "femme": "assets/categories/categorie_femme_mobilite.png",
        "male": "assets/categories/categorie_homme_mobilite.png",
        "female": "assets/categories/categorie_femme_mobilite.png"
      },
      "description": "Bouger mieux, délier les articulations."
    },
    {
      "id": "cardio",
      "title": "Cardio",
      "icon": "❤️‍🔥",
      "color": "#ef6b6b",
      "images": {
        "homme": "assets/categories/categorie_homme_cardio.png",
        "femme": "assets/categories/categorie_femme_cardio.png",
        "male": "assets/categories/categorie_homme_cardio.png",
        "female": "assets/categories/categorie_femme_cardio.png"
      },
      "description": "Faire monter le souffle sans brutalité."
    },
    {
      "id": "strength",
      "title": "Renforcement",
      "icon": "🛡️",
      "color": "#76d672",
      "images": {
        "homme": "assets/categories/categorie_homme_renforcement.png",
        "femme": "assets/categories/categorie_femme_renforcement.png",
        "male": "assets/categories/categorie_homme_renforcement.png",
        "female": "assets/categories/categorie_femme_renforcement.png"
      },
      "description": "Gainage, jambes, posture et stabilité."
    },
    {
      "id": "muscle",
      "title": "Musculation",
      "icon": "💪",
      "color": "#c27dff",
      "images": {
        "homme": "assets/categories/categorie_homme_bras.png",
        "femme": "assets/categories/categorie_femme_bras.png",
        "male": "assets/categories/categorie_homme_bras.png",
        "female": "assets/categories/categorie_femme_bras.png"
      },
      "description": "Bras, épaules, force ciblée."
    },
    {
      "id": "stretch",
      "title": "Étirement",
      "icon": "🌿",
      "color": "#78d6c6",
      "images": {
        "homme": "assets/categories/categorie_homme_etirement.png",
        "femme": "assets/categories/categorie_femme_etirement.png",
        "male": "assets/categories/categorie_homme_etirement.png",
        "female": "assets/categories/categorie_femme_etirement.png"
      },
      "description": "Retour au calme et récupération."
    },
    {
      "id": "walk",
      "title": "Marche",
      "icon": "🥾",
      "color": "#a7d672",
      "images": {
        "homme": "assets/categories/categorie_homme_marche.png",
        "femme": "assets/categories/categorie_femme_marche.png",
        "male": "assets/categories/categorie_homme_marche.png",
        "female": "assets/categories/categorie_femme_marche.png"
      },
      "description": "Marche active dehors ou sur tapis."
    },
    {
      "id": "run",
      "title": "Course",
      "icon": "🏃",
      "color": "#ff8a5b",
      "images": {
        "homme": "assets/categories/categorie_homme_course.png",
        "femme": "assets/categories/categorie_femme_course.png",
        "male": "assets/categories/categorie_homme_course.png",
        "female": "assets/categories/categorie_femme_course.png"
      },
      "description": "Course sur tapis ou en extérieur."
    },
    {
      "id": "bike",
      "title": "Vélo",
      "icon": "🚴",
      "color": "#66d9ef",
      "images": {
        "homme": "assets/categories/categorie_homme_velo.png",
        "femme": "assets/categories/categorie_femme_velo.png",
        "male": "assets/categories/categorie_homme_velo.png",
        "female": "assets/categories/categorie_femme_velo.png"
      },
      "description": "Vélo intérieur ou extérieur."
    }
  ],
  "exercises": [
    {
      "id": "march_on_spot",
      "categoryId": "warmup",
      "title": "Marche sur place",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercice_femme_marchesurplace.jpg"
      },
      "unit": "min",
      "defaultValue": 2,
      "min": 1,
      "step": 1,
      "xpPerUnit": 2,
      "stat": "Échauffement",
      "pose": "warmup",
      "hasTimer": true,
      "description": "Marche sans avancer en levant naturellement les pieds.",
      "shortDescription": "Marche sans bouger de ta position.",
      "coachTip": "Commence tranquille, puis trouve ton rythme."
    },
    {
      "id": "arm_circles",
      "categoryId": "warmup",
      "title": "Cercles de bras",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_cercledebras.png"
      },
      "unit": "sec",
      "defaultValue": 60,
      "min": 30,
      "step": 30,
      "xpPerUnit": 0.2,
      "stat": "Échauffement épaules",
      "pose": "warmup",
      "hasTimer": true,
      "description": "Tends les bras et dessine de grands cercles vers l’avant puis l’arrière.",
      "shortDescription": "Dessine des cercles avec les bras.",
      "coachTip": "Fais des cercles lents, sans hausser les épaules."
    },
    {
      "id": "arm_open_close",
      "categoryId": "warmup",
      "title": "Ouverture / fermeture des bras",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 1,
      "min": 1,
      "step": 1,
      "xpPerUnit": 2,
      "stat": "Mobilité haut du corps",
      "pose": "warmup",
      "hasTimer": true
    },
    {
      "id": "dynamic_walk",
      "categoryId": "warmup",
      "title": "Marche dynamique",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercice_femme_marchedynamique.jpg"
      },
      "unit": "min",
      "defaultValue": 3,
      "min": 1,
      "step": 1,
      "xpPerUnit": 2,
      "stat": "Échauffement",
      "pose": "walk",
      "hasTimer": true,
      "description": "Marche énergique avec les bras qui accompagnent le mouvement.",
      "shortDescription": "Marche énergique avec les bras.",
      "coachTip": "Garde le regard devant et les épaules basses."
    },
    {
      "id": "side_steps",
      "categoryId": "cardio",
      "title": "Pas chassés",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercice_femme_paschasses.jpg"
      },
      "unit": "sec",
      "defaultValue": 90,
      "min": 30,
      "step": 30,
      "xpPerUnit": 0.25,
      "stat": "Cardio doux",
      "pose": "walk",
      "hasTimer": true,
      "description": "Déplace-toi latéralement en rapprochant les pieds à chaque pas.",
      "shortDescription": "Pas chassés de côté.",
      "coachTip": "Reste fluide, sans chercher la vitesse."
    },
    {
      "id": "slow_knee_raises",
      "categoryId": "warmup",
      "title": "Montées de genoux lentes",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercice_femme_monteegenouxlente.jpg"
      },
      "unit": "sec",
      "defaultValue": 60,
      "min": 30,
      "step": 30,
      "xpPerUnit": 0.15,
      "stat": "Cardio doux",
      "pose": "warmup",
      "hasTimer": true,
      "description": "Monte alternativement les genoux devant toi à hauteur confortable.",
      "shortDescription": "Monte les genoux alternativement.",
      "coachTip": "Reste droit et garde une respiration régulière."
    },
    {
      "id": "mountain_climber_slow",
      "categoryId": "cardio",
      "title": "Mountain climber lent",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercice_femme_montagneclimberlent.jpg"
      },
      "unit": "sec",
      "defaultValue": 90,
      "min": 15,
      "step": 15,
      "xpPerUnit": 0.3,
      "stat": "Dynamique / gainage",
      "pose": "core",
      "hasTimer": true
    },
    {
      "id": "stomping",
      "categoryId": "cardio",
      "title": "Piétinement",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "sec",
      "defaultValue": 30,
      "min": 15,
      "step": 15,
      "xpPerUnit": 0.25,
      "stat": "Cardio doux",
      "pose": "walk",
      "hasTimer": true,
      "description": "Marche très rapide sur place avec de petits pas.",
      "shortDescription": "Petits pas rapides sur place.",
      "coachTip": "Garde les bras actifs et reste léger sur les pieds."
    },
    {
      "id": "butt_kicks",
      "categoryId": "cardio",
      "title": "Talons-fesses",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "sec",
      "defaultValue": 30,
      "min": 15,
      "step": 15,
      "xpPerUnit": 0.25,
      "stat": "Cardio doux",
      "pose": "walk",
      "hasTimer": true,
      "description": "Ramène alternativement les talons vers les fesses.",
      "shortDescription": "Talons vers les fesses en alternance.",
      "coachTip": "Garde le buste droit et le rythme régulier."
    },
    {
      "id": "cross_knee_tap",
      "categoryId": "cardio",
      "title": "Toucher genou-main opposée",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "sec",
      "defaultValue": 30,
      "min": 15,
      "step": 15,
      "xpPerUnit": 0.25,
      "stat": "Coordination",
      "pose": "walk",
      "hasTimer": true,
      "description": "Monte un genou et touche-le avec la main opposée.",
      "shortDescription": "Genou + main opposée.",
      "coachTip": "Cherche la coordination plutôt que la vitesse."
    },
    {
      "id": "step_touch",
      "categoryId": "cardio",
      "title": "Step Touch",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "sec",
      "defaultValue": 45,
      "min": 15,
      "step": 15,
      "xpPerUnit": 0.25,
      "stat": "Cardio doux",
      "pose": "walk",
      "hasTimer": true,
      "description": "Fais un pas sur le côté puis rapproche l’autre pied.",
      "shortDescription": "Pas sur le côté puis rapprochement.",
      "coachTip": "Garde un rythme fluide comme une danse simple."
    },
    {
      "id": "lateral_steps",
      "categoryId": "cardio",
      "title": "Pas latéraux",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "sec",
      "defaultValue": 30,
      "min": 15,
      "step": 15,
      "xpPerUnit": 0.25,
      "stat": "Cardio doux",
      "pose": "walk",
      "hasTimer": true,
      "description": "Déplace-toi de quelques pas à droite puis à gauche.",
      "shortDescription": "Déplacements latéraux.",
      "coachTip": "Reste légèrement fléchi sur les jambes."
    },
    {
      "id": "skater_steps",
      "categoryId": "cardio",
      "title": "Pas du patineur",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "sec",
      "defaultValue": 30,
      "min": 15,
      "step": 15,
      "xpPerUnit": 0.3,
      "stat": "Cardio coordination",
      "pose": "walk",
      "hasTimer": true,
      "description": "Grand pas à droite puis à gauche avec transfert du poids du corps.",
      "shortDescription": "Déplacements façon patineur.",
      "coachTip": "Imagine que tu glisses sur la glace, sans sauter."
    },
    {
      "id": "light_boxer",
      "categoryId": "cardio",
      "title": "Boxeur léger",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "sec",
      "defaultValue": 45,
      "min": 15,
      "step": 15,
      "xpPerUnit": 0.3,
      "stat": "Agilité",
      "pose": "walk",
      "hasTimer": true,
      "description": "Adopte une garde de boxeur et effectue de petits pas rapides sur place.",
      "shortDescription": "Petits pas rapides en garde.",
      "coachTip": "Garde les bras actifs et le corps détendu."
    },
    {
      "id": "walk_acceleration",
      "categoryId": "walk",
      "title": "Accélération",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 1,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1.5,
      "stat": "Endurance / intensité",
      "pose": "walk",
      "hasTimer": true,
      "hasDistance": false,
      "description": "Augmente franchement l’allure pendant une courte durée.",
      "shortDescription": "Accélération courte.",
      "coachTip": "Accélère sans sprinter, puis reviens à ton rythme."
    },
    {
      "id": "no_jump_jacks",
      "categoryId": "cardio",
      "title": "Jumping jack sans saut",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "sec",
      "defaultValue": 30,
      "min": 15,
      "step": 15,
      "xpPerUnit": 0.3,
      "stat": "Cardio sans impact",
      "pose": "walk",
      "hasTimer": true,
      "description": "Écarte une jambe et lève les bras, puis reviens au centre sans quitter le sol.",
      "shortDescription": "Ouvre jambe et bras sans sauter.",
      "coachTip": "Reste léger, sans claquer les pieds au sol."
    },
    {
      "id": "slow_walk",
      "categoryId": "walk",
      "title": "Marche lente",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 1,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Récupération active",
      "pose": "walk",
      "hasTimer": true,
      "description": "Marche doucement pour récupérer entre deux efforts.",
      "shortDescription": "Marche douce de récupération.",
      "coachTip": "Profite de cette minute pour retrouver ton souffle."
    },
    {
      "id": "walk",
      "categoryId": "walk",
      "title": "Marche active",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 30,
      "min": 5,
      "step": 5,
      "xpPerUnit": 1.2,
      "stat": "Endurance",
      "pose": "walk",
      "hasTimer": true,
      "hasDistance": true,
      "description": "Marche à un rythme soutenu permettant encore de parler.",
      "shortDescription": "Marche à rythme soutenu.",
      "coachTip": "Tu dois pouvoir parler, mais pas chanter."
    },
    {
      "id": "run_treadmill",
      "categoryId": "run",
      "title": "Course sur tapis",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 15,
      "min": 5,
      "step": 5,
      "xpPerUnit": 2,
      "stat": "Cardio",
      "pose": "run",
      "hasTimer": true,
      "hasDistance": true
    },
    {
      "id": "run_outdoor",
      "categoryId": "run",
      "title": "Course extérieure",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercice_femme_courseext.jpg"
      },
      "unit": "min",
      "defaultValue": 20,
      "min": 5,
      "step": 5,
      "xpPerUnit": 2.1,
      "stat": "Cardio",
      "pose": "run",
      "hasTimer": true,
      "hasDistance": true
    },
    {
      "id": "bike",
      "categoryId": "bike",
      "title": "Vélo",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 15,
      "min": 5,
      "step": 5,
      "xpPerUnit": 1.7,
      "stat": "Cardio",
      "pose": "bike",
      "hasTimer": true,
      "hasDistance": true
    },
    {
      "id": "cyclist_half_squat",
      "categoryId": "strength",
      "title": "Demi-squat cycliste",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 10,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1,
      "stat": "Jambes / vélo",
      "pose": "squats",
      "description": "Descends légèrement comme si tu te mettais en danseuse sur un vélo, puis remonte.",
      "shortDescription": "Petit squat contrôlé façon cycliste.",
      "coachTip": "Garde les genoux souples et le dos fier."
    },
    {
      "id": "ankle_circles",
      "categoryId": "mobility",
      "title": "Cercles de chevilles",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_cerclecheville.png"
      },
      "unit": "sec",
      "defaultValue": 30,
      "min": 15,
      "step": 15,
      "xpPerUnit": 0.15,
      "stat": "Mobilité chevilles",
      "pose": "stretch",
      "hasTimer": true,
      "description": "Fais tourner une cheville puis l’autre dans les deux sens.",
      "shortDescription": "Fais tourner les chevilles.",
      "coachTip": "Mouvement lent, sans forcer."
    },
    {
      "id": "single_leg_balance",
      "categoryId": "strength",
      "title": "Équilibre sur une jambe",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "sec",
      "defaultValue": 40,
      "min": 10,
      "step": 5,
      "xpPerUnit": 0.25,
      "stat": "Équilibre",
      "pose": "core",
      "hasTimer": true,
      "description": "Tiens debout sur une seule jambe sans te balancer.",
      "shortDescription": "Tiens en équilibre sur une jambe.",
      "coachTip": "Fixe un point devant toi."
    },
    {
      "id": "slow_calf_raises",
      "categoryId": "strength",
      "title": "Montées sur pointes lentes",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 20,
      "min": 5,
      "step": 5,
      "xpPerUnit": 0.9,
      "stat": "Mollets / contrôle",
      "pose": "squats",
      "description": "Monte sur la pointe des pieds puis redescends lentement.",
      "shortDescription": "Montée et descente contrôlées.",
      "coachTip": "Ne retombe pas : contrôle la descente."
    },
    {
      "id": "chair_squat",
      "categoryId": "strength",
      "title": "Squat chaise",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 8,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Jambes",
      "pose": "squats",
      "description": "Assieds-toi légèrement vers l’arrière en t’aidant d’une chaise ou d’un mur.",
      "shortDescription": "Assieds-toi puis relève-toi avec aide.",
      "coachTip": "Garde les talons au sol."
    },
    {
      "id": "squats",
      "categoryId": "strength",
      "title": "Squats",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 10,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1.1,
      "stat": "Force",
      "pose": "squats",
      "description": "Fléchis les jambes comme pour t’asseoir puis remonte.",
      "shortDescription": "Descends comme pour t’asseoir puis remonte.",
      "coachTip": "Genoux souples, dos fier, mouvement propre."
    },
    {
      "id": "wall_sit",
      "categoryId": "strength",
      "title": "Chaise contre un mur",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "sec",
      "defaultValue": 20,
      "min": 10,
      "step": 5,
      "xpPerUnit": 0.35,
      "stat": "Jambes / endurance",
      "pose": "squats",
      "hasTimer": true,
      "description": "Dos au mur, reste assis dans une position imaginaire.",
      "shortDescription": "Tiens une position assise contre un mur.",
      "coachTip": "Garde le dos contre le mur et respire calmement."
    },
    {
      "id": "assisted_reverse_lunges",
      "categoryId": "strength",
      "title": "Fentes arrière assistées",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 16,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1.1,
      "stat": "Jambes",
      "pose": "squats",
      "description": "Fais un pas en arrière et plie légèrement les jambes en gardant un appui.",
      "shortDescription": "Fente avec appui pour garder l’équilibre.",
      "coachTip": "Utilise une chaise ou un mur si besoin."
    },
    {
      "id": "reverse_lunges",
      "categoryId": "strength",
      "title": "Fentes arrière",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 16,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1.3,
      "stat": "Jambes",
      "pose": "squats",
      "description": "Fais un grand pas en arrière puis descends le genou arrière vers le sol.",
      "shortDescription": "Grand pas arrière puis descente contrôlée.",
      "coachTip": "Descends peu au début. La maîtrise d’abord."
    },
    {
      "id": "calf_raises",
      "categoryId": "strength",
      "title": "Montées sur pointes",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 15,
      "min": 5,
      "step": 5,
      "xpPerUnit": 0.8,
      "stat": "Mollets",
      "pose": "squats"
    },
    {
      "id": "bridge",
      "categoryId": "strength",
      "title": "Pont de hanches",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 12,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Fessiers",
      "pose": "core"
    },
    {
      "id": "single_leg_bridge_alternate",
      "categoryId": "strength",
      "title": "Pont de hanches une jambe alternée",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 16,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1.2,
      "stat": "Fessiers",
      "pose": "core"
    },
    {
      "id": "superman",
      "categoryId": "strength",
      "title": "Superman",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 10,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Dos",
      "pose": "core",
      "description": "Allongé sur le ventre, soulève légèrement bras et jambes.",
      "shortDescription": "Soulève bras et jambes au sol.",
      "coachTip": "Monte peu, sans forcer le bas du dos."
    },
    {
      "id": "wall_pushups",
      "categoryId": "muscle",
      "title": "Pompes murales",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 8,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Haut du corps",
      "pose": "core",
      "description": "Pompes réalisées contre un mur pour réduire la difficulté.",
      "shortDescription": "Pompes contre un mur.",
      "coachTip": "Le mouvement doit rester fluide."
    },
    {
      "id": "incline_pushups",
      "categoryId": "muscle",
      "title": "Pompes inclinées",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 8,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1.2,
      "stat": "Haut du corps",
      "pose": "core",
      "description": "Pompes avec les mains sur une table ou un support surélevé.",
      "shortDescription": "Pompes sur un support surélevé.",
      "coachTip": "Plus le support est haut, plus c’est facile."
    },
    {
      "id": "pushups",
      "categoryId": "muscle",
      "title": "Pompes",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 10,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1.2,
      "stat": "Force",
      "pose": "core"
    },
    {
      "id": "biceps_curl_1kg",
      "categoryId": "muscle",
      "title": "Curl biceps",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 36,
      "min": 2,
      "step": 2,
      "xpPerUnit": 0.9,
      "stat": "Biceps",
      "pose": "core"
    },
    {
      "id": "hammer_curl_1kg",
      "categoryId": "muscle",
      "title": "Curl marteau",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_curlmarteau.png"
      },
      "unit": "répétitions",
      "defaultValue": 24,
      "min": 2,
      "step": 2,
      "xpPerUnit": 0.9,
      "stat": "Biceps / avant-bras",
      "pose": "core"
    },
    {
      "id": "lateral_raises_1kg",
      "categoryId": "muscle",
      "title": "Élévations latérales",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 20,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1,
      "stat": "Épaules",
      "pose": "core"
    },
    {
      "id": "front_raises_1kg",
      "categoryId": "muscle",
      "title": "Élévations frontales",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 20,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1,
      "stat": "Épaules",
      "pose": "core"
    },
    {
      "id": "triceps_kickback_1kg",
      "categoryId": "muscle",
      "title": "Kickback triceps",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 20,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1,
      "stat": "Triceps",
      "pose": "core"
    },
    {
      "id": "shoulder_press_1kg",
      "categoryId": "muscle",
      "title": "Développé épaules",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 20,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1,
      "stat": "Épaules / bras",
      "pose": "core"
    },
    {
      "id": "wall_triceps_extension",
      "categoryId": "muscle",
      "title": "Extension triceps contre un mur",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 16,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1,
      "stat": "Triceps",
      "pose": "core"
    },
    {
      "id": "incline_shoulder_taps",
      "categoryId": "muscle",
      "title": "Taps épaules en appui incliné",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 20,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1,
      "stat": "Épaules / gainage bras",
      "pose": "core"
    },
    {
      "id": "core",
      "categoryId": "strength",
      "title": "Gainage",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "sec",
      "defaultValue": 20,
      "min": 10,
      "step": 5,
      "xpPerUnit": 0.28,
      "stat": "Stabilité",
      "pose": "core",
      "hasTimer": true,
      "description": "Maintiens le corps droit en appui sur les avant-bras ou les mains.",
      "shortDescription": "Corps droit et immobile.",
      "coachTip": "Mieux vaut 20 secondes propres qu’une minute bancale."
    },
    {
      "id": "knee_plank",
      "categoryId": "strength",
      "title": "Planche genoux",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercise_femme_planchesurlesgenoux.png"
      },
      "unit": "sec",
      "defaultValue": 20,
      "min": 10,
      "step": 5,
      "xpPerUnit": 0.22,
      "stat": "Stabilité",
      "pose": "core",
      "hasTimer": true
    },
    {
      "id": "bird_dog",
      "categoryId": "strength",
      "title": "Bird Dog",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_birddog.png"
      },
      "unit": "répétitions",
      "defaultValue": 12,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1,
      "stat": "Équilibre / dos",
      "pose": "core",
      "description": "À quatre pattes, tends simultanément un bras et la jambe opposée.",
      "shortDescription": "Bras et jambe opposés tendus.",
      "coachTip": "Cherche l’équilibre avant la vitesse."
    },
    {
      "id": "side_plank_knees",
      "categoryId": "strength",
      "title": "Gainage latéral genoux",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercise_femme_gainagelateralgenoux.png"
      },
      "unit": "sec",
      "defaultValue": 60,
      "min": 10,
      "step": 5,
      "xpPerUnit": 0.25,
      "stat": "Obliques",
      "pose": "core",
      "hasTimer": true
    },
    {
      "id": "side_plank",
      "categoryId": "strength",
      "title": "Gainage latéral",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercise_femme_gainagelateral.png"
      },
      "unit": "sec",
      "defaultValue": 40,
      "min": 10,
      "step": 5,
      "xpPerUnit": 0.35,
      "stat": "Obliques",
      "pose": "core",
      "hasTimer": true
    },

   
    {
      "id": "dead_bug",
      "categoryId": "strength",
      "title": "Dead bug",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercise_femme_deadbugcomplet.png"
      },
      "unit": "répétitions",
      "defaultValue": 20,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1,
      "stat": "Gainage",
      "pose": "core"
    },
    {
      "id": "dead_bug_simplified",
      "categoryId": "strength",
      "title": "Dead bug simplifié",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercise_femme_deadbugsimplifie.png"
      },
      "unit": "répétitions",
      "defaultValue": 16,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1,
      "stat": "Abdos doux",
      "pose": "core"
    },
    {
      "id": "pelvic_tilt",
      "categoryId": "strength",
      "title": "Bascule du bassin au sol",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercise_femme_basculebassinsol.png"
      },
      "unit": "répétitions",
      "defaultValue": 10,
      "min": 2,
      "step": 2,
      "xpPerUnit": 0.8,
      "stat": "Activation abdos",
      "pose": "core"
    },
    {
      "id": "pelvic_lift_floor",
      "categoryId": "strength",
      "title": "Relevé de bassin contrôlé",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercise_femme_relevedebassinausol.png"
      },
      "unit": "répétitions",
      "defaultValue": 12,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1,
      "stat": "Contrôle du centre",
      "pose": "core"
    },
    {
      "id": "crunch_controlled",
      "categoryId": "strength",
      "title": "Crunch contrôlé",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercise_femme_crunchcontrole.png"
      },
      "unit": "répétitions",
      "defaultValue": 15,
      "min": 2,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Abdos",
      "pose": "core"
    },
    {
      "id": "hollow_hold_simplified",
      "categoryId": "strength",
      "title": "Hollow hold simplifié",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercise_femme_hollowholssimplifie.png"
      },
      "unit": "sec",
      "defaultValue": 45,
      "min": 10,
      "step": 5,
      "xpPerUnit": 0.4,
      "stat": "Finisher abdos",
      "pose": "core",
      "hasTimer": true
    },
    {
      "id": "pilates",
      "categoryId": "mobility",
      "title": "Pilates",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 10,
      "min": 5,
      "step": 5,
      "xpPerUnit": 1.3,
      "stat": "Stabilité",
      "pose": "core",
      "hasTimer": true
    },
    {
      "id": "cat_cow",
      "categoryId": "mobility",
      "title": "Chat-vache",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercice_femme_chatvache.jpg"
      },
      "unit": "min",
      "defaultValue": 1,
      "min": 1,
      "step": 1,
      "xpPerUnit": 2,
      "stat": "Mobilité",
      "pose": "stretch",
      "hasTimer": true
    },
    {
      "id": "hip_circles",
      "categoryId": "mobility",
      "title": "Cercles de hanches",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercice_femme_cerclehanches.jpg"
      },
      "unit": "sec",
      "defaultValue": 60,
      "min": 30,
      "step": 30,
      "xpPerUnit": 0.15,
      "stat": "Mobilité hanches",
      "pose": "stretch",
      "hasTimer": true,
      "description": "Mains sur les hanches, fais des cercles lents avec le bassin.",
      "shortDescription": "Fais tourner ton bassin lentement.",
      "coachTip": "Le mouvement doit rester doux et contrôlé."
    },
    {
      "id": "thoracic_rotation",
      "categoryId": "mobility",
      "title": "Rotation thoracique",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/exercice_femme_rotationthoracique.jpg"
      },
      "unit": "min",
      "defaultValue": 1,
      "min": 1,
      "step": 1,
      "xpPerUnit": 2,
      "stat": "Mobilité",
      "pose": "stretch",
      "hasTimer": true
    },
    {
      "id": "abdominal_breathing",
      "categoryId": "mobility",
      "title": "Respiration abdominale",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 1,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Respiration / posture",
      "pose": "core",
      "hasTimer": true
    },
    {
      "id": "slow_breathing",
      "categoryId": "stretch",
      "title": "Respiration profonde",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 1,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Respiration / posture",
      "pose": "core",
      "hasTimer": true,
      "description": "Inspire lentement par le nez puis expire doucement par la bouche.",
      "shortDescription": "Inspire calmement, expire lentement.",
      "coachTip": "Allonge surtout l’expiration."
    },
    {
      "id": "slow_breathing_extended",
      "categoryId": "stretch",
      "title": "Respiration lente",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 2,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Récupération",
      "pose": "stretch",
      "hasTimer": true
    },
    {
      "id": "thigh_calf_stretch",
      "categoryId": "stretch",
      "title": "Étirement cuisses / mollets",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 3,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Récupération",
      "pose": "stretch",
      "hasTimer": true
    },
    {
      "id": "hip_quad_stretch",
      "categoryId": "stretch",
      "title": "Étirement hanches / quadriceps",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 3,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Récupération",
      "pose": "stretch",
      "hasTimer": true
    },
    {
      "id": "gentle_back_stretch",
      "categoryId": "stretch",
      "title": "Étirement doux du dos",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 2,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Retour au calme",
      "pose": "stretch",
      "hasTimer": true,
      "description": "Étire doucement les muscles sans douleur ni à-coups.",
      "shortDescription": "Allonge doucement les muscles.",
      "coachTip": "Tu dois sentir l’étirement, jamais la douleur."
    },
    {
      "id": "shoulder_arm_stretch",
      "categoryId": "stretch",
      "title": "Étirement épaules / bras",
      "images": {
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 2,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Retour au calme",
      "pose": "stretch",
      "hasTimer": true
    },
    {
      "id": "advanced_standard_warmup",
      "categoryId": "warmup",
      "title": "Échauffement standard avancé",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 5,
      "min": 5,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Préparation complète",
      "pose": "warmup",
      "hasTimer": true,
      "description": "Routine standard avant chaque séance avancée : 1 min de marche active, 30 sec de cercles d’épaules avant, 30 sec arrière, 30 sec de cercles de hanches, 30 sec de montées de genoux, 30 sec de talons-fesses, 5 Bird Dog par côté, 10 squats poids du corps et 10 pompes murales.",
      "shortDescription": "Routine complète de 5 min avant l’effort.",
      "coachTip": "Monte progressivement en température. Le but est de préparer les articulations, pas de te fatiguer avant la bataille."
    },
    {
      "id": "advanced_standard_cooldown",
      "categoryId": "stretch",
      "title": "Retour au calme standard avancé",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 5,
      "min": 5,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Récupération",
      "pose": "stretch",
      "hasTimer": true,
      "description": "Routine standard après chaque séance avancée : 1 min de marche lente, 30 sec d’étirement quadriceps par jambe, 30 sec d’étirement mollets par jambe, 30 sec d’étirement poitrine, 30 sec d’étirement dos, 30 sec d’étirement épaules par bras, puis 1 min de respiration profonde avec inspiration 4 sec et expiration 6 sec.",
      "shortDescription": "Routine complète de récupération de 5 min.",
      "coachTip": "La récupération scelle l’entraînement. Respire lentement et laisse le rythme redescendre."
    },
    {
      "id": "goblet_squat",
      "categoryId": "strength",
      "title": "Goblet Squat",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 12,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1.4,
      "stat": "Jambes / force",
      "pose": "squats",
      "description": "Tiens la kettlebell contre la poitrine. Descends en squat puis remonte en gardant le buste solide.",
      "shortDescription": "Squat avec kettlebell contre la poitrine.",
      "coachTip": "Garde les talons au sol et les genoux souples."
    },
    {
      "id": "bench_press",
      "categoryId": "muscle",
      "title": "Développé couché",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 10,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1.5,
      "stat": "Pectoraux / triceps",
      "pose": "core",
      "description": "Allongé sur le banc, pousse la charge au-dessus de la poitrine puis contrôle la descente.",
      "shortDescription": "Pousser une charge depuis le banc.",
      "coachTip": "Contrôle la descente et garde les épaules stables."
    },
    {
      "id": "resistance_band_row",
      "categoryId": "muscle",
      "title": "Rowing élastique",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 15,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1.1,
      "stat": "Dos / posture",
      "pose": "core",
      "description": "Tire l’élastique vers toi en rapprochant les omoplates, puis reviens lentement.",
      "shortDescription": "Tirage élastique vers le buste.",
      "coachTip": "Ne hausse pas les épaules. Pense à serrer les omoplates."
    },
    {
      "id": "kettlebell_swing",
      "categoryId": "strength",
      "title": "Swing kettlebell",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 15,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1.4,
      "stat": "Hanches / explosivité",
      "pose": "squats",
      "description": "Propulse la kettlebell grâce aux hanches. Les bras guident, les jambes et les hanches produisent le mouvement.",
      "shortDescription": "Mouvement explosif de hanches avec kettlebell.",
      "coachTip": "Le mouvement vient des jambes et des hanches, pas des bras."
    },
    {
      "id": "kettlebell_military_press",
      "categoryId": "muscle",
      "title": "Développé militaire",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 10,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1.4,
      "stat": "Épaules / gainage",
      "pose": "core",
      "description": "Pousse la kettlebell au-dessus de la tête en gardant le tronc stable.",
      "shortDescription": "Poussée verticale avec kettlebell.",
      "coachTip": "Contracte les abdos pendant le mouvement."
    },
    {
      "id": "kettlebell_deadlift",
      "categoryId": "strength",
      "title": "Soulevé de terre kettlebell",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 12,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1.5,
      "stat": "Chaîne postérieure",
      "pose": "squats",
      "description": "Ramasse la kettlebell depuis le sol en gardant le dos droit, puis redresse-toi avec les hanches.",
      "shortDescription": "Soulevé depuis le sol avec kettlebell.",
      "coachTip": "Pousse les hanches vers l’arrière et garde le dos fier."
    },
    {
      "id": "turkish_get_up",
      "categoryId": "strength",
      "title": "Turkish Get-Up",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 10,
      "min": 1,
      "step": 1,
      "xpPerUnit": 2,
      "stat": "Technique / stabilité",
      "pose": "core",
      "description": "Passe progressivement de la position allongée à debout en gardant la kettlebell bras tendu. Redescends avec contrôle.",
      "shortDescription": "Transition allongé-debout avec charge stabilisée.",
      "coachTip": "Privilégie la technique avant la vitesse. Charge légère, mouvement propre."
    },
    {
      "id": "heavy_bag_rounds",
      "categoryId": "cardio",
      "title": "Sac de frappe",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 5,
      "min": 1,
      "step": 1,
      "xpPerUnit": 2,
      "stat": "Combat / cardio",
      "pose": "core",
      "hasTimer": true,
      "description": "Enchaîne coups simples, garde active et déplacements. Travaille proprement plutôt que fort.",
      "shortDescription": "Rounds au sac de frappe.",
      "coachTip": "Respire à chaque frappe et bouge les pieds."
    },
    {
      "id": "walking_lunges",
      "categoryId": "strength",
      "title": "Fentes marchées",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 20,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1.3,
      "stat": "Jambes / stabilité",
      "pose": "squats",
      "description": "Avance en fente, remonte, puis enchaîne avec l’autre jambe. Garde le buste droit.",
      "shortDescription": "Fentes en avançant.",
      "coachTip": "Cherche la stabilité avant la profondeur."
    },
    {
      "id": "assisted_pullups",
      "categoryId": "muscle",
      "title": "Tractions assistées",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 5,
      "min": 1,
      "step": 1,
      "xpPerUnit": 2,
      "stat": "Dos / bras",
      "pose": "core",
      "description": "Utilise un élastique, un appui ou une assistance pour réaliser une traction contrôlée.",
      "shortDescription": "Tractions avec assistance.",
      "coachTip": "Descends lentement et garde les épaules actives."
    },
    {
      "id": "pullups_clean_max",
      "categoryId": "muscle",
      "title": "Tractions propres",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 5,
      "min": 1,
      "step": 1,
      "xpPerUnit": 2.2,
      "stat": "Dos / force",
      "pose": "core",
      "description": "Réalise le maximum de tractions propres, sans balancer le corps. Arrête quand la technique se dégrade.",
      "shortDescription": "Maximum propre de tractions.",
      "coachTip": "La dernière répétition correcte vaut mieux que trois répétitions tordues."
    },
    {
      "id": "face_pull",
      "categoryId": "muscle",
      "title": "Face Pull",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "répétitions",
      "defaultValue": 15,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1.1,
      "stat": "Épaules / posture",
      "pose": "core",
      "description": "Tire l’élastique vers le visage, coudes ouverts, en contrôlant le retour.",
      "shortDescription": "Tirage visage avec élastique.",
      "coachTip": "Garde les épaules basses et les omoplates actives."
    },
    {
      "id": "bike_acceleration",
      "categoryId": "bike",
      "title": "Accélérations vélo",
      "images": {
        "homme": "assets/exercices/homme_default.png",
        "femme": "assets/exercices/femme_default.png",
        "male": "assets/exercices/homme_default.png",
        "female": "assets/exercices/femme_default.png"
      },
      "unit": "min",
      "defaultValue": 3,
      "min": 1,
      "step": 1,
      "xpPerUnit": 2,
      "stat": "Vélo / intensité",
      "pose": "bike",
      "hasTimer": true,
      "hasDistance": false,
      "description": "Pendant une sortie vélo, ajoute des accélérations courtes puis reviens à ton rythme confortable.",
      "shortDescription": "Accélérations courtes à vélo.",
      "coachTip": "Accélère franchement, sans transformer la sortie en sprint suicidaire."
    }
  ],
  "programDetails": {
    "eveil-heros": {
      "id": "eveil-heros",
      "subtitle": "Une reprise douce pour débutant complet ou retour après plusieurs mois.",
      "unlockLevel": 1,
      "duration": "15 à 30 min",
      "frequency": "3 séances par semaine",
      "reward": {
        "badgeId": "heros-eveille",
        "badgeTitle": "Héros Éveillé",
        "chest": true,
        "nextPrograms": [
          "forge-guerrier",
          "marche-aventurier"
        ]
      },
      "weeks": [
        {
          "week": 1,
          "title": "L’Appel de l’Aventure",
          "xp": 50,
          "progression": "Découverte douce, aucun exercice punitif. On réveille le corps sans le brusquer.",
          "days": [
            {
              "day": 1,
              "title": "Réveil du Corps",
              "xp": 50,
              "difficultyLabel": "≈ 15 min",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 3,
                  "unit": "min"
                },
                {
                  "phase": "Mobilité",
                  "exerciseId": "arm_circles",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Mobilité",
                  "exerciseId": "hip_circles",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Jambes",
                  "exerciseId": "chair_squat",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cardio doux",
                  "exerciseId": "slow_knee_raises",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 3,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Fondation du Héros",
              "xp": 50,
              "difficultyLabel": "≈ 15 min",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 3,
                  "unit": "min"
                },
                {
                  "phase": "Haut du corps",
                  "exerciseId": "wall_pushups",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Jambes",
                  "exerciseId": "wall_sit",
                  "amount": 20,
                  "unit": "sec"
                },
                {
                  "phase": "Dos / équilibre",
                  "exerciseId": "bird_dog",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Gainage",
                  "exerciseId": "core",
                  "amount": 15,
                  "unit": "sec"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 3,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 3,
              "title": "Endurance de l’Aventurier",
              "xp": 50,
              "difficultyLabel": "≈ 20 min",
              "exercises": [
                {
                  "phase": "Endurance",
                  "exerciseId": "walk",
                  "amount": 15,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 3,
                  "unit": "min"
                }
              ]
            }
          ]
        },
        {
          "week": 2,
          "title": "Premiers Pas du Héros",
          "xp": 60,
          "progression": "On augmente un peu le volume, sans changer l’esprit : propre, accessible, rassurant.",
          "days": [
            {
              "day": 1,
              "title": "Réveil du Corps",
              "xp": 60,
              "difficultyLabel": "≈ 18 min",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 4,
                  "unit": "min"
                },
                {
                  "phase": "Mobilité",
                  "exerciseId": "arm_circles",
                  "amount": 30,
                  "unit": "répétitions"
                },
                {
                  "phase": "Mobilité",
                  "exerciseId": "hip_circles",
                  "amount": 30,
                  "unit": "répétitions"
                },
                {
                  "phase": "Jambes",
                  "exerciseId": "squats",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cardio doux",
                  "exerciseId": "slow_knee_raises",
                  "amount": 30,
                  "unit": "répétitions"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 4,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Fondation du Héros",
              "xp": 60,
              "difficultyLabel": "≈ 18 min",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "walk",
                  "amount": 4,
                  "unit": "min"
                },
                {
                  "phase": "Haut du corps",
                  "exerciseId": "wall_pushups",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Jambes",
                  "exerciseId": "wall_sit",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Dos / équilibre",
                  "exerciseId": "bird_dog",
                  "amount": 16,
                  "unit": "répétitions"
                },
                {
                  "phase": "Gainage",
                  "exerciseId": "core",
                  "amount": 20,
                  "unit": "sec"
                },
                {
                  "phase": "Dos",
                  "exerciseId": "superman",
                  "amount": 8,
                  "unit": "répétitions"
                }
              ]
            },
            {
              "day": 3,
              "title": "Endurance de l’Aventurier",
              "xp": 60,
              "difficultyLabel": "≈ 24 min",
              "exercises": [
                {
                  "phase": "Endurance",
                  "exerciseId": "walk",
                  "amount": 20,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 4,
                  "unit": "min"
                }
              ]
            }
          ]
        },
        {
          "week": 3,
          "title": "Entraînement du Novice",
          "xp": 70,
          "progression": "Le héros prend confiance : un peu plus de jambes, un peu plus de souffle, toujours sans punition.",
          "days": [
            {
              "day": 1,
              "title": "Réveil du Corps",
              "xp": 70,
              "difficultyLabel": "≈ 22 min",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "dynamic_walk",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Jambes",
                  "exerciseId": "squats",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Jambes",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 16,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cardio doux",
                  "exerciseId": "slow_knee_raises",
                  "amount": 40,
                  "unit": "répétitions"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 4,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Fondation du Héros",
              "xp": 70,
              "difficultyLabel": "≈ 22 min",
              "exercises": [
                {
                  "phase": "Haut du corps",
                  "exerciseId": "incline_pushups",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Jambes",
                  "exerciseId": "wall_sit",
                  "amount": 40,
                  "unit": "sec"
                },
                {
                  "phase": "Dos / équilibre",
                  "exerciseId": "bird_dog",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Dos",
                  "exerciseId": "superman",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Gainage",
                  "exerciseId": "core",
                  "amount": 25,
                  "unit": "sec"
                }
              ]
            },
            {
              "day": 3,
              "title": "Endurance de l’Aventurier",
              "xp": 70,
              "difficultyLabel": "≈ 30 min",
              "exercises": [
                {
                  "phase": "Endurance",
                  "exerciseId": "dynamic_walk",
                  "amount": 25,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            }
          ]
        },
        {
          "week": 4,
          "title": "Le Héros s’Éveille",
          "xp": 80,
          "progression": "Dernière semaine : le héros termine la reprise et peut choisir sa prochaine voie.",
          "days": [
            {
              "day": 1,
              "title": "Réveil du Corps",
              "xp": 80,
              "difficultyLabel": "≈ 25 min",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "dynamic_walk",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Jambes",
                  "exerciseId": "squats",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Jambes",
                  "exerciseId": "reverse_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cardio doux",
                  "exerciseId": "slow_knee_raises",
                  "amount": 50,
                  "unit": "répétitions"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Fondation du Héros",
              "xp": 80,
              "difficultyLabel": "≈ 25 min",
              "exercises": [
                {
                  "phase": "Haut du corps",
                  "exerciseId": "incline_pushups",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Jambes",
                  "exerciseId": "wall_sit",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Dos / équilibre",
                  "exerciseId": "bird_dog",
                  "amount": 24,
                  "unit": "répétitions"
                },
                {
                  "phase": "Dos",
                  "exerciseId": "superman",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Gainage",
                  "exerciseId": "core",
                  "amount": 30,
                  "unit": "sec"
                }
              ]
            },
            {
              "day": 3,
              "title": "Endurance de l’Aventurier",
              "xp": 80,
              "difficultyLabel": "≈ 35 min",
              "exercises": [
                {
                  "phase": "Endurance",
                  "exerciseId": "dynamic_walk",
                  "amount": 30,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            }
          ]
        }
      ],
      "bosses": [
        {
          "week": 1,
          "title": "Le Rat des Caves",
          "subtitle": "Premier ennemi du héros.",
          "xp": 30,
          "badgeId": "rat-caves-vaincu",
          "difficultyLabel": "Boss semaine 1 · 12 à 15 min",
          "instructions": "Débloqué après les 3 séances de la semaine 1.",
          "lockedMessage": "Même les plus grands héros ont commencé par chasser les rats. Termine tes entraînements, puis reviens.",
          "coachLine": "Même les plus grands héros ont commencé par chasser les rats.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Tour 1",
              "exerciseId": "chair_squat",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1",
              "exerciseId": "wall_pushups",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1",
              "exerciseId": "slow_knee_raises",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1 · Récupération",
              "exerciseId": "march_on_spot",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Tour 2",
              "exerciseId": "chair_squat",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2",
              "exerciseId": "wall_pushups",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2",
              "exerciseId": "slow_knee_raises",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2 · Récupération",
              "exerciseId": "march_on_spot",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Respiration",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 3,
              "unit": "min"
            }
          ]
        },
        {
          "week": 2,
          "title": "Le Loup Solitaire",
          "xp": 40,
          "badgeId": "loup-solitaire-vaincu",
          "difficultyLabel": "Boss semaine 2 · 15 à 18 min",
          "instructions": "Débloqué après les 3 séances de la semaine 2.",
          "lockedMessage": "Le loup observe les faibles. Termine ta semaine, puis montre-lui qu’il se trompe.",
          "coachLine": "Le loup observe les faibles. Aujourd’hui, montre-lui qu’il se trompe.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "walk",
              "amount": 3,
              "unit": "min",
              "distanceOptional": true
            },
            {
              "phase": "Tour 1",
              "exerciseId": "squats",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1",
              "exerciseId": "wall_pushups",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1",
              "exerciseId": "slow_knee_raises",
              "amount": 30,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1 · Récupération",
              "exerciseId": "walk",
              "amount": 1,
              "unit": "min",
              "distanceOptional": true
            },
            {
              "phase": "Tour 2",
              "exerciseId": "squats",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2",
              "exerciseId": "wall_pushups",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2",
              "exerciseId": "slow_knee_raises",
              "amount": 30,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2 · Récupération",
              "exerciseId": "walk",
              "amount": 1,
              "unit": "min",
              "distanceOptional": true
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 3,
              "unit": "min"
            }
          ]
        },
        {
          "week": 3,
          "title": "Le Sanglier des Fourrés",
          "xp": 50,
          "badgeId": "sanglier-fourres-vaincu",
          "difficultyLabel": "Boss semaine 3 · 20 à 25 min",
          "instructions": "Débloqué après les 3 séances de la semaine 3.",
          "lockedMessage": "Le sanglier charge sans réfléchir. Toi, avance avec méthode : termine d’abord ta semaine.",
          "coachLine": "Le sanglier charge sans réfléchir. Toi, tu avances avec méthode.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "dynamic_walk",
              "amount": 4,
              "unit": "min",
              "distanceOptional": true
            },
            {
              "phase": "Tour 1",
              "exerciseId": "squats",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1",
              "exerciseId": "assisted_reverse_lunges",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1",
              "exerciseId": "bird_dog",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1 · Récupération",
              "exerciseId": "walk",
              "amount": 1,
              "unit": "min",
              "distanceOptional": true
            },
            {
              "phase": "Tour 2",
              "exerciseId": "squats",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2",
              "exerciseId": "assisted_reverse_lunges",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2",
              "exerciseId": "bird_dog",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2 · Récupération",
              "exerciseId": "walk",
              "amount": 1,
              "unit": "min",
              "distanceOptional": true
            },
            {
              "phase": "Tour 3",
              "exerciseId": "squats",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 3",
              "exerciseId": "assisted_reverse_lunges",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 3",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 3",
              "exerciseId": "bird_dog",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 3 · Récupération",
              "exerciseId": "walk",
              "amount": 1,
              "unit": "min",
              "distanceOptional": true
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 4,
              "unit": "min"
            }
          ]
        },
        {
          "week": 4,
          "title": "L’Ogre Endormi",
          "subtitle": "Le premier véritable adversaire.",
          "xp": 75,
          "badgeId": "ogre-endormi-vaincu",
          "chest": true,
          "nextPrograms": [
            "coeur-dragon",
            "forge-guerrier",
            "marche-aventurier"
          ],
          "difficultyLabel": "Boss final · 25 à 30 min",
          "instructions": "Débloqué après les 3 séances de la semaine 4.",
          "lockedMessage": "L’ogre paraît invincible de loin. Termine ta préparation, puis approche-toi.",
          "coachLine": "L’ogre paraît invincible quand on le regarde de loin. Approche-toi et tu verras qu’il tombe comme les autres.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "dynamic_walk",
              "amount": 5,
              "unit": "min",
              "distanceOptional": true
            },
            {
              "phase": "Tour 1",
              "exerciseId": "squats",
              "amount": 15,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1",
              "exerciseId": "reverse_lunges",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1",
              "exerciseId": "incline_pushups",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1",
              "exerciseId": "bird_dog",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 1",
              "exerciseId": "core",
              "amount": 20,
              "unit": "sec"
            },
            {
              "phase": "Tour 1 · Récupération",
              "exerciseId": "walk",
              "amount": 1,
              "unit": "min",
              "distanceOptional": true
            },
            {
              "phase": "Tour 2",
              "exerciseId": "squats",
              "amount": 15,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2",
              "exerciseId": "reverse_lunges",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2",
              "exerciseId": "incline_pushups",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2",
              "exerciseId": "bird_dog",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 2",
              "exerciseId": "core",
              "amount": 20,
              "unit": "sec"
            },
            {
              "phase": "Tour 2 · Récupération",
              "exerciseId": "walk",
              "amount": 1,
              "unit": "min",
              "distanceOptional": true
            },
            {
              "phase": "Tour 3",
              "exerciseId": "squats",
              "amount": 15,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 3",
              "exerciseId": "reverse_lunges",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 3",
              "exerciseId": "incline_pushups",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 3",
              "exerciseId": "bird_dog",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Tour 3",
              "exerciseId": "core",
              "amount": 20,
              "unit": "sec"
            },
            {
              "phase": "Tour 3 · Récupération",
              "exerciseId": "walk",
              "amount": 1,
              "unit": "min",
              "distanceOptional": true
            },
            {
              "phase": "Respiration",
              "exerciseId": "slow_breathing",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 5,
              "unit": "min"
            }
          ]
        }
      ],
      "progression": [
        "Semaine 1 : L’Appel de l’Aventure · découvrir sans se punir.",
        "Semaine 2 : Premiers Pas du Héros · augmenter doucement.",
        "Semaine 3 : Entraînement du Novice · construire la régularité.",
        "Semaine 4 : Le Héros s’Éveille · terminer la reprise.",
        "Récompense : badge Héros Éveillé, coffre de récompense, puis choix entre Forge du Guerrier ou Marche de l’Aventurier."
      ],
      "notes": [
        "Objectif : débutant complet ou reprise après plusieurs mois.",
        "3 séances différentes par semaine.",
        "Progression douce.",
        "Aucune séance punitive."
      ]
    },
    "coeur-dragon": {
      "id": "coeur-dragon",
      "subtitle": "Cardio progressif sans impact violent, avec plus de variété et une vraie sensation d’aventure.",
      "unlockLevel": 2,
      "duration": "20 à 40 min",
      "frequency": "3 séances par semaine + boss hebdomadaire",
      "reward": {
        "badgeId": "coeur-dragon-legendaire",
        "badgeTitle": "Cœur de Dragon",
        "chest": true,
        "nextPrograms": [
          "messager-sentiers",
          "cavalier-route",
          "forge-guerrier",
          "champion-arenes"
        ]
      },
      "weeks": [
        {
          "week": 1,
          "title": "Le Dragon s’Éveille",
          "xp": 60,
          "progression": "Découverte du cardio varié, sans brutalité.",
          "days": [
            {
              "day": 1,
              "title": "Souffle du Dragon",
              "xp": 60,
              "difficultyLabel": "≈ 20 min",
              "instructions": "Cardio doux et progressif.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "dynamic_walk",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "stomping",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "slow_knee_raises",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "lateral_steps",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Marche active",
                  "exerciseId": "walk",
                  "amount": 2,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Étirements",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 3,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Danse des Flammes",
              "xp": 60,
              "difficultyLabel": "≈ 20 min",
              "instructions": "Coordination et mobilité légère.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "dynamic_walk",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Coordination",
                  "exerciseId": "cross_knee_tap",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "skater_steps",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "stomping",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Marche active",
                  "exerciseId": "walk",
                  "amount": 2,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 2,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 3,
              "title": "Piste du Dragon",
              "xp": 60,
              "difficultyLabel": "≈ 30 min",
              "instructions": "Endurance longue avec une petite accélération finale.",
              "exercises": [
                {
                  "phase": "Marche rapide",
                  "exerciseId": "walk",
                  "amount": 20,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Accélération",
                  "exerciseId": "walk_acceleration",
                  "amount": 1,
                  "unit": "min"
                },
                {
                  "phase": "Marche rapide",
                  "exerciseId": "walk",
                  "amount": 5,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Étirements",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 3,
                  "unit": "min"
                }
              ]
            }
          ]
        },
        {
          "week": 2,
          "title": "Les Premières Flammes",
          "xp": 70,
          "progression": "Un peu plus d’intensité avec les talons-fesses.",
          "days": [
            {
              "day": 1,
              "title": "Souffle du Dragon",
              "xp": 70,
              "difficultyLabel": "≈ 22 min",
              "instructions": "Nouveau mouvement : talons-fesses.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "dynamic_walk",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "butt_kicks",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "slow_knee_raises",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "lateral_steps",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "stomping",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Étirements",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 3,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Danse des Flammes",
              "xp": 70,
              "difficultyLabel": "≈ 22 min",
              "instructions": "Coordination et aisance cardio.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "dynamic_walk",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Coordination",
                  "exerciseId": "cross_knee_tap",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "skater_steps",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "butt_kicks",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Marche active",
                  "exerciseId": "walk",
                  "amount": 2,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 2,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 3,
              "title": "Piste du Dragon",
              "xp": 70,
              "difficultyLabel": "≈ 33 min",
              "instructions": "Endurance plus longue avec accélération.",
              "exercises": [
                {
                  "phase": "Marche rapide",
                  "exerciseId": "walk",
                  "amount": 25,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Accélération",
                  "exerciseId": "walk_acceleration",
                  "amount": 1,
                  "unit": "min"
                },
                {
                  "phase": "Marche rapide",
                  "exerciseId": "walk",
                  "amount": 5,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Étirements",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 3,
                  "unit": "min"
                }
              ]
            }
          ]
        },
        {
          "week": 3,
          "title": "Le Dragon Prend Son Envol",
          "xp": 80,
          "progression": "Le souffle tient mieux, les mouvements s’enchaînent avec plus de fluidité.",
          "days": [
            {
              "day": 1,
              "title": "Souffle du Dragon",
              "xp": 80,
              "difficultyLabel": "≈ 24 min",
              "instructions": "Nouveau mouvement : Step Touch.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "dynamic_walk",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "step_touch",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "butt_kicks",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "slow_knee_raises",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "lateral_steps",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Étirements",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 4,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Danse des Flammes",
              "xp": 80,
              "difficultyLabel": "≈ 24 min",
              "instructions": "Coordination et cardio varié.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "dynamic_walk",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Coordination",
                  "exerciseId": "cross_knee_tap",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "skater_steps",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "step_touch",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "stomping",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 2,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 3,
              "title": "Piste du Dragon",
              "xp": 80,
              "difficultyLabel": "≈ 35 min",
              "instructions": "Endurance longue avec accélération de 1 min.",
              "exercises": [
                {
                  "phase": "Marche rapide",
                  "exerciseId": "walk",
                  "amount": 30,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Accélération",
                  "exerciseId": "walk_acceleration",
                  "amount": 1,
                  "unit": "min"
                },
                {
                  "phase": "Marche rapide",
                  "exerciseId": "walk",
                  "amount": 5,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Étirements",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 4,
                  "unit": "min"
                }
              ]
            }
          ]
        },
        {
          "week": 4,
          "title": "Cœur de Dragon",
          "xp": 90,
          "progression": "Dernière semaine : mobilité, endurance et agilité se combinent.",
          "days": [
            {
              "day": 1,
              "title": "Souffle du Dragon",
              "xp": 90,
              "difficultyLabel": "≈ 25 min",
              "instructions": "Nouveau mouvement : Boxeur léger.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "dynamic_walk",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Agilité",
                  "exerciseId": "light_boxer",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "step_touch",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "butt_kicks",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "slow_knee_raises",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Étirements",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 4,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Danse des Flammes",
              "xp": 90,
              "difficultyLabel": "≈ 25 min",
              "instructions": "Mélange coordination et rapidité légère.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "dynamic_walk",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "skater_steps",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Coordination",
                  "exerciseId": "cross_knee_tap",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "stomping",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Agilité",
                  "exerciseId": "light_boxer",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 2,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 3,
              "title": "Piste du Dragon",
              "xp": 90,
              "difficultyLabel": "≈ 40 min",
              "instructions": "Marche rapide 35 min avec une accélération de 1 min toutes les 5 min.",
              "exercises": [
                {
                  "phase": "Marche rapide",
                  "exerciseId": "walk",
                  "amount": 35,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Accélérations régulières",
                  "exerciseId": "walk_acceleration",
                  "amount": 1,
                  "unit": "min"
                },
                {
                  "phase": "Étirements",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            }
          ]
        }
      ],
      "bosses": [
        {
          "week": 1,
          "title": "Le Rat des Braises",
          "subtitle": "Mission : nettoyer les caves du fort.",
          "xp": 50,
          "badgeId": "ecaille-braise",
          "difficultyLabel": "Boss semaine 1",
          "instructions": "Débloqué après les 3 séances de la semaine 1.",
          "lockedMessage": "Le feu n’est pas encore assez vif. Termine tes 3 séances avant d’affronter le Rat des Braises.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Caves du Fort",
              "mission": "Le dragon se cache dans les tunnels du fort. Affronte-le ici même !",
              "difficultyLabel": "≈ 15 à 20 min",
              "exercises": [
                {
                  "phase": "Parcours",
                  "exerciseId": "stomping",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Parcours",
                  "exerciseId": "slow_knee_raises",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Parcours",
                  "exerciseId": "lateral_steps",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Parcours",
                  "exerciseId": "cross_knee_tap",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Marche active",
                  "exerciseId": "walk",
                  "amount": 2,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 3,
                  "unit": "min"
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Patrouille autour du fort",
              "mission": "Le dragon rôde dans les terres sauvages. Pars à sa recherche !",
              "difficultyLabel": "≈ 20 min",
              "instructions": "Pendant la marche rapide, fais 3 accélérations de 30 secondes.",
              "exercises": [
                {
                  "phase": "Patrouille",
                  "exerciseId": "walk",
                  "amount": 20,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Accélérations",
                  "exerciseId": "walk_acceleration",
                  "amount": 1,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 3,
                  "unit": "min"
                }
              ]
            }
          }
        },
        {
          "week": 2,
          "title": "La Salamandre Rouge",
          "subtitle": "Mission : traverser le canyon brûlant.",
          "xp": 60,
          "badgeId": "salamandre-rouge",
          "difficultyLabel": "Boss semaine 2",
          "instructions": "Débloqué après les 3 séances de la semaine 2.",
          "lockedMessage": "La Salamandre Rouge t’attend encore. Termine d’abord ta semaine.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Canyon intérieur",
              "mission": "Le dragon se cache dans les tunnels du fort. Affronte-le ici même !",
              "difficultyLabel": "≈ 20 à 25 min",
              "exercises": [
                {
                  "phase": "Parcours",
                  "exerciseId": "butt_kicks",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Parcours",
                  "exerciseId": "lateral_steps",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Parcours",
                  "exerciseId": "slow_knee_raises",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Parcours",
                  "exerciseId": "cross_knee_tap",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Parcours",
                  "exerciseId": "stomping",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 3,
                  "unit": "min"
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Traversée des Terres Rouges",
              "mission": "Le dragon rôde dans les terres sauvages. Pars à sa recherche !",
              "difficultyLabel": "≈ 25 min",
              "instructions": "Marche rapide 25 minutes. Toutes les 5 minutes, fais une accélération de 45 secondes.",
              "exercises": [
                {
                  "phase": "Traversée",
                  "exerciseId": "walk",
                  "amount": 25,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Accélérations",
                  "exerciseId": "walk_acceleration",
                  "amount": 1,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 3,
                  "unit": "min"
                }
              ]
            }
          }
        },
        {
          "week": 3,
          "title": "Le Drake des Falaises",
          "subtitle": "Mission : gravir les hauteurs.",
          "xp": 70,
          "badgeId": "drake-falaises",
          "difficultyLabel": "Boss semaine 3",
          "instructions": "Débloqué après les 3 séances de la semaine 3.",
          "lockedMessage": "Le Drake des Falaises ne se montre qu’aux aventuriers réguliers.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Falaises simulées",
              "mission": "Le dragon se cache dans les tunnels du fort. Affronte-le ici même !",
              "difficultyLabel": "≈ 25 à 30 min",
              "exercises": [
                {
                  "phase": "Parcours",
                  "exerciseId": "step_touch",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Parcours",
                  "exerciseId": "butt_kicks",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Parcours",
                  "exerciseId": "stomping",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Parcours",
                  "exerciseId": "cross_knee_tap",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Parcours",
                  "exerciseId": "slow_knee_raises",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Parcours",
                  "exerciseId": "skater_steps",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 4,
                  "unit": "min"
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Ascension des Falaises",
              "mission": "Le dragon rôde dans les terres sauvages. Pars à sa recherche !",
              "difficultyLabel": "≈ 30 min",
              "instructions": "Marche rapide 30 minutes. Toutes les 5 minutes, fais une accélération de 1 minute.",
              "exercises": [
                {
                  "phase": "Ascension",
                  "exerciseId": "walk",
                  "amount": 30,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Accélérations",
                  "exerciseId": "walk_acceleration",
                  "amount": 1,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 4,
                  "unit": "min"
                }
              ]
            }
          }
        },
        {
          "week": 4,
          "title": "Le Cœur du Dragon",
          "subtitle": "Mission : atteindre le sommet du volcan.",
          "xp": 100,
          "badgeId": "coeur-dragon-legendaire",
          "chest": true,
          "nextPrograms": [
            "messager-sentiers",
            "cavalier-route",
            "forge-guerrier",
            "champion-arenes"
          ],
          "difficultyLabel": "Boss final",
          "instructions": "Débloqué après les 3 séances de la semaine 4.",
          "lockedMessage": "Le sommet du volcan n’est pas pour les hésitants. Termine d’abord ton entraînement.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Le Cœur dans les tunnels",
              "mission": "Le dragon se cache dans les tunnels du fort. Affronte-le ici même !",
              "difficultyLabel": "≈ 35 min",
              "exercises": [
                {
                  "phase": "Agilité",
                  "exerciseId": "light_boxer",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "step_touch",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "skater_steps",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "butt_kicks",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "slow_knee_raises",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Coordination",
                  "exerciseId": "cross_knee_tap",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "stomping",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Cardio",
                  "exerciseId": "lateral_steps",
                  "amount": 45,
                  "unit": "sec"
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Sommet du Dragon",
              "mission": "Le dragon rôde dans les terres sauvages. Pars à sa recherche !",
              "difficultyLabel": "≈ 40 min",
              "instructions": "Marche rapide 40 minutes. Toutes les 5 minutes, fais une accélération de 1 minute.",
              "exercises": [
                {
                  "phase": "Ascension",
                  "exerciseId": "walk",
                  "amount": 40,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Accélérations",
                  "exerciseId": "walk_acceleration",
                  "amount": 1,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            }
          }
        }
      ],
      "progression": [
        "Semaine 1 : découverte du cardio doux avec Piétinement.",
        "Semaine 2 : ajout de Talons-fesses.",
        "Semaine 3 : ajout de Step Touch.",
        "Semaine 4 : ajout de Boxeur léger.",
        "Chaque semaine, les 3 séances sont différentes.",
        "Chaque samedi, un boss se débloque après validation des 3 séances.",
        "Récompense finale : badge légendaire Cœur du Dragon, coffre de récompense, puis ouverture vers les programmes suivants."
      ],
      "notes": [
        "Programme cardio débutant progressif.",
        "Aucun impact violent.",
        "Accent mis sur la variété et la coordination.",
        "Les boss servent de jalons narratifs et de validation hebdomadaire.",
        "Pour la marche avec accélérations, le détail complet est donné dans le champ instructions."
      ]
    },
    "bras-heros": {
      "id": "bras-heros",
      "subtitle": "Renforce tes bras, stabilise tes épaules, prépare-toi au prochain combat.",
      "material": "Poids du corps au début, puis haltères de 1 kg à partir de la semaine 3.",
      "days": [
        {
          "day": 1,
          "title": "Phase 1 · Poids du corps",
          "xp": 35,
          "difficultyLabel": "Séance bras complète",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
              "amount": 60,
              "unit": "sec"
            },
            {
              "phase": "Échauffement",
              "exerciseId": "arm_open_close",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Bras / poitrine",
              "exerciseId": "wall_pushups",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Bras / poitrine",
              "exerciseId": "incline_pushups",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Épaules",
              "exerciseId": "incline_shoulder_taps",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Triceps",
              "exerciseId": "wall_triceps_extension",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Gainage bras",
              "exerciseId": "knee_plank",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "shoulder_arm_stretch",
              "amount": 2,
              "unit": "min"
            }
          ]
        },
        {
          "day": 2,
          "title": "Phase 2 · Haltères 1 kg",
          "xp": 40,
          "difficultyLabel": "Séance avec haltères",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
              "amount": 60,
              "unit": "sec"
            },
            {
              "phase": "Biceps",
              "exerciseId": "biceps_curl_1kg",
              "amount": 36,
              "unit": "répétitions"
            },
            {
              "phase": "Biceps / avant-bras",
              "exerciseId": "hammer_curl_1kg",
              "amount": 24,
              "unit": "répétitions"
            },
            {
              "phase": "Épaules",
              "exerciseId": "lateral_raises_1kg",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Épaules",
              "exerciseId": "front_raises_1kg",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Triceps",
              "exerciseId": "triceps_kickback_1kg",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Épaules / bras",
              "exerciseId": "shoulder_press_1kg",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "shoulder_arm_stretch",
              "amount": 2,
              "unit": "min"
            }
          ]
        },
        {
          "day": 3,
          "title": "Séance express",
          "xp": 20,
          "difficultyLabel": "Séance bras courte",
          "exercises": [
            {
              "phase": "Bras / poitrine",
              "exerciseId": "wall_pushups",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Biceps",
              "exerciseId": "biceps_curl_1kg",
              "amount": 24,
              "unit": "répétitions"
            },
            {
              "phase": "Épaules",
              "exerciseId": "lateral_raises_1kg",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Triceps",
              "exerciseId": "triceps_kickback_1kg",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "shoulder_arm_stretch",
              "amount": 1,
              "unit": "min"
            }
          ]
        }
      ],
      "progression": [
        "Semaine 1 : poids du corps facile.",
        "Semaine 2 : poids du corps avec une série en plus si tout va bien.",
        "Semaine 3 : introduction des haltères de 1 kg.",
        "Semaine 4 : haltères 1 kg avec répétitions plus lentes."
      ],
      "notes": [
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
      "id": "cavalier-route",
      "subtitle": "Prépare tes jambes, ton équilibre et ton souffle pour rouler plus longtemps.",
      "unlockLevel": 2,
      "duration": "20 à 75 min",
      "frequency": "3 séances par semaine + boss hebdomadaire",
      "material": "Poids du corps, vélo intérieur ou extérieur.",
      "reward": {
        "badgeId": "cavalier-route-vaincu",
        "badgeTitle": "Cavalier de la Route",
        "chest": true,
        "nextPrograms": [
          "coeur-dragon",
          "forge-guerrier",
          "marche-aventurier",
          "champion-arenes"
        ]
      },
      "weeks": [
        {
          "week": 1,
          "title": "Les Roues du Destin",
          "xp": 60,
          "progression": "Premiers appuis cyclistes : jambes, mollets, gainage et sortie facile.",
          "days": [
            {
              "day": 1,
              "title": "Force du Cycliste",
              "xp": 60,
              "difficultyLabel": "≈ 25 min",
              "instructions": "Nouveau mouvement : demi-squat cycliste. Effectuer les deux défis en 2 cycles.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "hip_circles",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "slow_knee_raises",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "chair_squat",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "bridge",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "chair_squat",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "bridge",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "bird_dog",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "core",
                  "amount": 15,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "bird_dog",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "core",
                  "amount": 15,
                  "unit": "sec"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "hip_quad_stretch",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "thigh_calf_stretch",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 1,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Équilibre de la Selle",
              "xp": 60,
              "difficultyLabel": "≈ 25 min",
              "instructions": "Stabilité, dos, équilibre et mollets. Effectuer les deux défis en 2 cycles.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "ankle_circles",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "hip_circles",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "bird_dog",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "single_leg_balance",
                  "amount": 20,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "bridge",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "bird_dog",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "single_leg_balance",
                  "amount": 20,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "bridge",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "superman",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "core",
                  "amount": 15,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "superman",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "core",
                  "amount": 15,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "thigh_calf_stretch",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 1,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 3,
              "title": "Première Sortie",
              "xp": 60,
              "difficultyLabel": "≈ 20 min",
              "instructions": "Vélo facile. Tu dois pouvoir tenir une conversation.",
              "exercises": [
                {
                  "phase": "Sortie vélo",
                  "exerciseId": "bike",
                  "amount": 20,
                  "unit": "min",
                  "distanceOptional": true
                }
              ]
            }
          ]
        },
        {
          "week": 2,
          "title": "La Route des Collines",
          "xp": 70,
          "progression": "On ajoute les fentes arrière assistées pour préparer les montées.",
          "days": [
            {
              "day": 1,
              "title": "Jambes de Grimpeur",
              "xp": 70,
              "difficultyLabel": "≈ 30 min",
              "instructions": "Nouveau mouvement : fentes arrière assistées. Effectuer les deux défis en 2 cycles.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "hip_circles",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "slow_knee_raises",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "squats",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 16,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "squats",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 16,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "bridge",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "core",
                  "amount": 20,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "bridge",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "core",
                  "amount": 20,
                  "unit": "sec"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "hip_quad_stretch",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "thigh_calf_stretch",
                  "amount": 2,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Maîtrise du Guidon",
              "xp": 70,
              "difficultyLabel": "≈ 30 min",
              "instructions": "Contrôle du buste et stabilité. Effectuer les deux défis en 2 cycles.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "ankle_circles",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "hip_circles",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "bird_dog",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "superman",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "single_leg_balance",
                  "amount": 25,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "bird_dog",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "superman",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "single_leg_balance",
                  "amount": 25,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "core",
                  "amount": 20,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "bridge",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "core",
                  "amount": 20,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "bridge",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 1,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 3,
              "title": "Sortie des Collines",
              "xp": 70,
              "difficultyLabel": "≈ 30 min",
              "instructions": "Vélo 30 min avec 3 accélérations de 30 secondes.",
              "exercises": [
                {
                  "phase": "Sortie vélo",
                  "exerciseId": "bike",
                  "amount": 30,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Accélérations",
                  "exerciseId": "bike",
                  "amount": 2,
                  "unit": "min",
                  "distanceOptional": true
                }
              ]
            }
          ]
        },
        {
          "week": 3,
          "title": "Les Longues Distances",
          "xp": 80,
          "progression": "On consolide l’endurance et le contrôle avec le pont une jambe alternée.",
          "days": [
            {
              "day": 1,
              "title": "Force de Montagne",
              "xp": 80,
              "difficultyLabel": "≈ 30 min",
              "instructions": "Nouveau mouvement : pont de hanches une jambe alternée.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "hip_circles",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "slow_knee_raises",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "squats",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "squats",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "single_leg_bridge_alternate",
                  "amount": 16,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "slow_calf_raises",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "core",
                  "amount": 25,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "single_leg_bridge_alternate",
                  "amount": 16,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "slow_calf_raises",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "core",
                  "amount": 25,
                  "unit": "sec"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "thigh_calf_stretch",
                  "amount": 3,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Contrôle du Vélo",
              "xp": 80,
              "difficultyLabel": "≈ 30 min",
              "instructions": "Stabilité, dos et contrôle de la posture.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "ankle_circles",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "bird_dog",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "superman",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "single_leg_balance",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "bird_dog",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "superman",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "single_leg_balance",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "core",
                  "amount": 25,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "bridge",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "core",
                  "amount": 25,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "bridge",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 1,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 3,
              "title": "Sortie Endurance",
              "xp": 80,
              "difficultyLabel": "≈ 45 min",
              "instructions": "Vélo 45 min à rythme régulier.",
              "exercises": [
                {
                  "phase": "Sortie vélo",
                  "exerciseId": "bike",
                  "amount": 45,
                  "unit": "min",
                  "distanceOptional": true
                }
              ]
            }
          ]
        },
        {
          "week": 4,
          "title": "Cavalier de la Route",
          "xp": 90,
          "progression": "Dernière semaine : jambes solides, posture stable, grande sortie.",
          "days": [
            {
              "day": 1,
              "title": "Jambes de Fer",
              "xp": 90,
              "difficultyLabel": "≈ 35 min",
              "instructions": "Nouveau mouvement : chaise contre un mur.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "hip_circles",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "slow_knee_raises",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "squats",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "wall_sit",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "squats",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "wall_sit",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "reverse_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "single_leg_bridge_alternate",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 25,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "reverse_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "single_leg_bridge_alternate",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 25,
                  "unit": "répétitions"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "thigh_calf_stretch",
                  "amount": 3,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Maîtrise de la Monture",
              "xp": 90,
              "difficultyLabel": "≈ 30 min",
              "instructions": "Contrôle, posture et gainage.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "ankle_circles",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "bird_dog",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "superman",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "single_leg_balance",
                  "amount": 40,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "bird_dog",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "superman",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "single_leg_balance",
                  "amount": 40,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "core",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "bridge",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 25,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "core",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "bridge",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 25,
                  "unit": "répétitions"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "gentle_back_stretch",
                  "amount": 2,
                  "unit": "min"
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 1,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 3,
              "title": "Grande Expédition",
              "xp": 90,
              "difficultyLabel": "≈ 60 min",
              "instructions": "Objectif : rouler confortablement pendant une heure.",
              "exercises": [
                {
                  "phase": "Sortie vélo",
                  "exerciseId": "bike",
                  "amount": 60,
                  "unit": "min",
                  "distanceOptional": true
                }
              ]
            }
          ]
        }
      ],
      "bosses": [
        {
          "week": 1,
          "title": "Gobelin des Pavés",
          "xp": 50,
          "badgeId": "roues-destin",
          "difficultyLabel": "Boss semaine 1",
          "instructions": "Débloqué après les 3 séances de la semaine 1.",
          "lockedMessage": "Le Gobelin des Pavés attend que tes roues soient prêtes. Termine les 3 séances de la semaine.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Gobelin des Pavés",
              "mission": "Affronte le pavé sans quitter le fort.",
              "difficultyLabel": "2 cycles",
              "exercises": [
                {
                  "phase": "Cycle 1",
                  "exerciseId": "chair_squat",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "bird_dog",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "bridge",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "core",
                  "amount": 15,
                  "unit": "sec"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "chair_squat",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "bird_dog",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "bridge",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "core",
                  "amount": 15,
                  "unit": "sec"
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Sortie contre le Gobelin",
              "mission": "Roule 25 minutes à rythme facile.",
              "difficultyLabel": "≈ 25 min",
              "exercises": [
                {
                  "phase": "Sortie vélo",
                  "exerciseId": "bike",
                  "amount": 25,
                  "unit": "min",
                  "distanceOptional": true
                }
              ]
            }
          }
        },
        {
          "week": 2,
          "title": "L’Orque de la Côte",
          "xp": 60,
          "badgeId": "grimpeur-novice",
          "difficultyLabel": "Boss semaine 2",
          "instructions": "Débloqué après les 3 séances de la semaine 2.",
          "lockedMessage": "L’Orque de la Côte garde la montée. Termine les 3 séances de la semaine avant de le défier.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Côte en salle",
              "mission": "Tous les exercices appris, 2 cycles.",
              "difficultyLabel": "2 cycles",
              "exercises": [
                {
                  "phase": "Cycle 1",
                  "exerciseId": "squats",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 16,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "bridge",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "core",
                  "amount": 20,
                  "unit": "sec"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "squats",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 16,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "bridge",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "core",
                  "amount": 20,
                  "unit": "sec"
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Côte extérieure",
              "mission": "Vélo 35 minutes.",
              "difficultyLabel": "≈ 35 min",
              "exercises": [
                {
                  "phase": "Sortie vélo",
                  "exerciseId": "bike",
                  "amount": 35,
                  "unit": "min",
                  "distanceOptional": true
                }
              ]
            }
          }
        },
        {
          "week": 3,
          "title": "Troll du Col Noir",
          "xp": 70,
          "badgeId": "maitre-collines",
          "difficultyLabel": "Boss semaine 3",
          "instructions": "Débloqué après les 3 séances de la semaine 3.",
          "lockedMessage": "Le Troll du Col Noir ne laisse passer que les cyclistes réguliers.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Col Noir en salle",
              "mission": "Tous les exercices appris, 2 cycles.",
              "difficultyLabel": "2 cycles",
              "exercises": [
                {
                  "phase": "Cycle 1",
                  "exerciseId": "squats",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "single_leg_bridge_alternate",
                  "amount": 16,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "slow_calf_raises",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "core",
                  "amount": 25,
                  "unit": "sec"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "squats",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "single_leg_bridge_alternate",
                  "amount": 16,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "slow_calf_raises",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "core",
                  "amount": 25,
                  "unit": "sec"
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Col Noir extérieur",
              "mission": "Vélo 50 minutes avec 5 accélérations de 30 secondes.",
              "difficultyLabel": "≈ 50 min",
              "exercises": [
                {
                  "phase": "Sortie vélo",
                  "exerciseId": "bike",
                  "amount": 50,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Accélérations",
                  "exerciseId": "bike",
                  "amount": 3,
                  "unit": "min",
                  "distanceOptional": true
                }
              ]
            }
          }
        },
        {
          "week": 4,
          "title": "Le Cavalier Noir",
          "xp": 100,
          "badgeId": "cavalier-route-vaincu",
          "chest": true,
          "nextPrograms": [
            "coeur-dragon",
            "forge-guerrier",
            "marche-aventurier",
            "champion-arenes"
          ],
          "difficultyLabel": "Boss final",
          "instructions": "Débloqué après les 3 séances de la semaine 4.",
          "lockedMessage": "Le Cavalier Noir attend au bout de la route. Termine d’abord ta préparation.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Duel contre le Cavalier Noir",
              "mission": "Tous les exercices du programme. 2 cycles complets.",
              "difficultyLabel": "2 cycles complets",
              "exercises": [
                {
                  "phase": "Cycle 1",
                  "exerciseId": "squats",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "wall_sit",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "reverse_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "single_leg_bridge_alternate",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 25,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "squats",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "wall_sit",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "reverse_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "single_leg_bridge_alternate",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 25,
                  "unit": "répétitions"
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Grande chevauchée",
              "mission": "Vélo 75 minutes ou 15 km selon ce qui est atteint en premier.",
              "difficultyLabel": "≈ 75 min ou 15 km",
              "instructions": "Valide la mission dès que tu atteins 75 minutes ou 15 km.",
              "exercises": [
                {
                  "phase": "Grande sortie vélo",
                  "exerciseId": "bike",
                  "amount": 75,
                  "unit": "min",
                  "distanceOptional": true
                }
              ]
            }
          }
        }
      ],
      "progression": [
        "Semaine 1 : Les Roues du Destin · apprendre les bases cyclistes.",
        "Semaine 2 : La Route des Collines · ajouter les fentes arrière assistées.",
        "Semaine 3 : Les Longues Distances · renforcer l’endurance et la stabilité.",
        "Semaine 4 : Cavalier de la Route · rouler confortablement pendant une heure.",
        "Chaque semaine, le boss propose une mission intérieure ou extérieure.",
        "Récompense finale : badge Cavalier de la Route, coffre de récompense, +100 XP."
      ],
      "notes": [
        "Objectif : préparer une balade vélo longue ou une reprise régulière.",
        "3 séances par semaine : deux séances de préparation physique et une sortie vélo.",
        "Un nouvel exercice est introduit chaque semaine.",
        "Les exercices par jambe ou par côté sont convertis en répétitions totales.",
        "Le boss extérieur final peut être validé à 75 minutes ou 15 km, selon ce qui est atteint en premier."
      ]
    },
"forge-guerrier": {
  id: "forge-guerrier",
  subtitle: "Renforcement complet sans matériel : jambes, bras, dos, gainage et posture.",
  unlockLevel: 2,
  duration: "20 à 25 min",
  frequency: "3 séances par semaine + boss hebdomadaire",
  material: "Aucun matériel. Tapis conseillé.",
  reward: {
    badgeId: "seigneur-forge-vaincu",
    badgeTitle: "Seigneur de la Forge",
    chest: true,
    nextPrograms: ["champion-arenes", "cavalier-route", "messager-sentiers"]
  },

  weeks: [
    {
      week: 1,
      title: "L’Apprenti Forgeron",
      xp: 60,
      progression: "Découverte du renforcement général. Nouvel exercice : pompes inclinées.",
      days: [
        {
          day: 1,
          title: "Force des Jambes",
          xp: 60,
          difficultyLabel: "≈ 20 à 25 min",
          instructions: "Échauffement standard, puis deux défis en 2 cycles, puis retour au calme.",
          exercises: [
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "butt_kicks", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "chair_squat", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "calf_raises", amount: 15, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "chair_squat", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "calf_raises", amount: 15, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "bridge", amount: 10, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "core", amount: 15, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bridge", amount: 10, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "core", amount: 15, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Haut du Corps",
          xp: 60,
          difficultyLabel: "≈ 20 à 25 min",
          instructions: "Nouvel exercice : pompes inclinées.",
          exercises: [
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "butt_kicks", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "incline_pushups", amount: 8, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "superman", amount: 8, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "incline_pushups", amount: 8, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "superman", amount: 8, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "arm_open_close", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "core", amount: 15, unit: "sec" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "arm_open_close", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "core", amount: 15, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Corps Entier",
          xp: 60,
          difficultyLabel: "≈ 20 à 25 min",
          instructions: "Renforcement général en 2 défis.",
          exercises: [
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "butt_kicks", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "bridge", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "bridge", amount: 10, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "calf_raises", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "superman", amount: 8, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "core", amount: 15, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "calf_raises", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "superman", amount: 8, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "core", amount: 15, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    },

    {
      week: 2,
      title: "Le Compagnon",
      xp: 70,
      progression: "On ajoute les fentes arrière assistées pour renforcer jambes et stabilité.",
      days: [
        {
          day: 1,
          title: "Jambes du Guerrier",
          xp: 70,
          difficultyLabel: "≈ 20 à 25 min",
          instructions: "Nouvel exercice : fentes arrière assistées.",
          exercises: [
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "butt_kicks", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "squats", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "assisted_reverse_lunges", amount: 16, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "calf_raises", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "squats", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "assisted_reverse_lunges", amount: 16, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "calf_raises", amount: 20, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "bridge", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "core", amount: 20, unit: "sec" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bridge", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "core", amount: 20, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Bras du Guerrier",
          xp: 70,
          difficultyLabel: "≈ 20 à 25 min",
          instructions: "Renforcement haut du corps, dos et gainage.",
          exercises: [
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "butt_kicks", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "incline_pushups", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "wall_pushups", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "superman", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "incline_pushups", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "wall_pushups", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "superman", amount: 10, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "arm_open_close", amount: 25, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "core", amount: 20, unit: "sec" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "arm_open_close", amount: 25, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "core", amount: 20, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Forge Complète",
          xp: 70,
          difficultyLabel: "≈ 20 à 25 min",
          instructions: "Séance complète jambes, haut du corps et centre.",
          exercises: [
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "butt_kicks", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "squats", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "incline_pushups", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "assisted_reverse_lunges", amount: 16, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "squats", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "incline_pushups", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "assisted_reverse_lunges", amount: 16, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "bridge", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "superman", amount: 10, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "core", amount: 20, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bridge", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "superman", amount: 10, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "core", amount: 20, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    },

    {
      week: 3,
      title: "Le Maître Artisan",
      xp: 80,
      progression: "On ajoute Dead Bug pour renforcer le centre sans brutaliser le dos.",
      days: [
        {
          day: 1,
          title: "Force",
          xp: 80,
          difficultyLabel: "≈ 20 à 25 min",
          instructions: "Nouvel exercice : Dead Bug.",
          exercises: [
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "butt_kicks", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "squats", amount: 15, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "calf_raises", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "squats", amount: 15, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "calf_raises", amount: 20, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "bridge", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "core", amount: 25, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bridge", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "core", amount: 25, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Haut du Corps",
          xp: 80,
          difficultyLabel: "≈ 20 à 25 min",
          instructions: "Haut du corps, dos et centre.",
          exercises: [
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "butt_kicks", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "incline_pushups", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "superman", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "incline_pushups", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "superman", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "arm_open_close", amount: 30, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "core", amount: 25, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "arm_open_close", amount: 30, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "core", amount: 25, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Corps Entier",
          xp: 80,
          difficultyLabel: "≈ 20 à 25 min",
          instructions: "Séance complète avec Dead Bug.",
          exercises: [
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "butt_kicks", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "squats", amount: 15, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "incline_pushups", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "squats", amount: 15, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "incline_pushups", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "bridge", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "superman", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bridge", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "superman", amount: 12, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    },

    {
      week: 4,
      title: "Le Guerrier Forgé",
      xp: 90,
      progression: "Dernière étape : gainage latéral genoux et forge finale.",
      days: [
        {
          day: 1,
          title: "Puissance",
          xp: 90,
          difficultyLabel: "≈ 20 à 25 min",
          instructions: "Nouvel exercice : gainage latéral genoux.",
          exercises: [
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "butt_kicks", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "squats", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "calf_raises", amount: 25, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "squats", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "calf_raises", amount: 25, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "bridge", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bridge", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Force du Haut",
          xp: 90,
          difficultyLabel: "≈ 20 à 25 min",
          instructions: "Haut du corps et gainage renforcé.",
          exercises: [
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "butt_kicks", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "incline_pushups", amount: 15, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "superman", amount: 15, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "incline_pushups", amount: 15, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "superman", amount: 15, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "arm_open_close", amount: 30, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "core", amount: 30, unit: "sec" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "arm_open_close", amount: 30, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "core", amount: 30, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Forge Finale",
          xp: 90,
          difficultyLabel: "≈ 20 à 25 min",
          instructions: "Dernière séance complète avant le boss final.",
          exercises: [
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "butt_kicks", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "squats", amount: 10, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "squats", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "incline_pushups", amount: 15, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "squats", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "incline_pushups", amount: 15, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "bridge", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bridge", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "slow_walk", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    }
  ],

  bosses: [
    {
      week: 1,
      title: "Le Gobelin Forgeron",
      xp: 50,
      badgeId: "forge-marteau-bois",
      difficultyLabel: "Boss semaine 1 · 3 cycles",
      instructions: "Débloqué après les 3 séances de la semaine 1.",
      lockedMessage: "Le Gobelin Forgeron attend que ton marteau soit prêt. Termine les 3 séances de la semaine.",
      exercises: [
        { phase: "Cycle 1", exerciseId: "squats", amount: 10, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "incline_pushups", amount: 8, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "bridge", amount: 10, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "superman", amount: 8, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "squats", amount: 10, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "incline_pushups", amount: 8, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "bridge", amount: 10, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "superman", amount: 8, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "squats", amount: 10, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "incline_pushups", amount: 8, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "bridge", amount: 10, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "superman", amount: 8, unit: "répétitions" }
      ]
    },
    {
      week: 2,
      title: "L’Orque du Marteau",
      xp: 60,
      badgeId: "forge-marteau-fer",
      difficultyLabel: "Boss semaine 2 · 3 cycles",
      instructions: "Débloqué après les 3 séances de la semaine 2.",
      lockedMessage: "L’Orque du Marteau ne défie que les guerriers réguliers.",
      exercises: [
        { phase: "Cycle 1", exerciseId: "squats", amount: 12, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "assisted_reverse_lunges", amount: 16, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "incline_pushups", amount: 10, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "bridge", amount: 12, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "superman", amount: 10, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "core", amount: 20, unit: "sec" },

        { phase: "Cycle 2", exerciseId: "squats", amount: 12, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "assisted_reverse_lunges", amount: 16, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "incline_pushups", amount: 10, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "bridge", amount: 12, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "superman", amount: 10, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "core", amount: 20, unit: "sec" },

        { phase: "Cycle 3", exerciseId: "squats", amount: 12, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "assisted_reverse_lunges", amount: 16, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "incline_pushups", amount: 10, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "bridge", amount: 12, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "superman", amount: 10, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "core", amount: 20, unit: "sec" }
      ]
    },
    {
      week: 3,
      title: "Le Troll de l’Enclume",
      xp: 70,
      badgeId: "forge-acier-trempe",
      difficultyLabel: "Boss semaine 3 · 3 cycles",
      instructions: "Débloqué après les 3 séances de la semaine 3.",
      lockedMessage: "Le Troll de l’Enclume attend que ton acier soit trempé.",
      exercises: [
        { phase: "Cycle 1", exerciseId: "squats", amount: 15, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "incline_pushups", amount: 12, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "bridge", amount: 15, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "superman", amount: 12, unit: "répétitions" },

        { phase: "Cycle 2", exerciseId: "squats", amount: 15, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "incline_pushups", amount: 12, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "bridge", amount: 15, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "superman", amount: 12, unit: "répétitions" },

        { phase: "Cycle 3", exerciseId: "squats", amount: 15, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "incline_pushups", amount: 12, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "bridge", amount: 15, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "superman", amount: 12, unit: "répétitions" }
      ]
    },
    {
      week: 4,
      title: "Le Seigneur de la Forge",
      xp: 100,
      badgeId: "seigneur-forge-vaincu",
      chest: true,
      nextPrograms: ["champion-arenes", "cavalier-route", "messager-sentiers"],
      difficultyLabel: "Boss final · 35 à 45 min",
      instructions: "Débloqué après les 3 séances de la semaine 4. Coffre de récompense final.",
      lockedMessage: "Le Seigneur de la Forge attend un guerrier complet. Termine d’abord la semaine.",
      exercises: [
        { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "arm_circles", amount: 60, unit: "sec" },
        { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
        { phase: "Échauffement", exerciseId: "slow_knee_raises", amount: 30, unit: "sec" },
        { phase: "Échauffement", exerciseId: "butt_kicks", amount: 30, unit: "sec" },
        { phase: "Échauffement", exerciseId: "squats", amount: 10, unit: "répétitions" },
        { phase: "Échauffement", exerciseId: "wall_pushups", amount: 10, unit: "répétitions" },

        { phase: "Cycle 1", exerciseId: "squats", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "incline_pushups", amount: 15, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "bridge", amount: 15, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "superman", amount: 15, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },

        { phase: "Cycle 2", exerciseId: "squats", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "incline_pushups", amount: 15, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "bridge", amount: 15, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "superman", amount: 15, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },

        { phase: "Cycle 3", exerciseId: "squats", amount: 20, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "assisted_reverse_lunges", amount: 20, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "incline_pushups", amount: 15, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "bridge", amount: 15, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "superman", amount: 15, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },

        { phase: "Retour au calme", exerciseId: "slow_walk", amount: 1, unit: "min" },
        { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
        { phase: "Retour au calme", exerciseId: "thigh_calf_stretch", amount: 1, unit: "min" },
        { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
        { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
      ]
    }
  ],

  progression: [
    "Semaine 1 : L’Apprenti Forgeron · introduction des pompes inclinées.",
    "Semaine 2 : Le Compagnon · ajout des fentes arrière assistées.",
    "Semaine 3 : Le Maître Artisan · ajout du Dead Bug.",
    "Semaine 4 : Le Guerrier Forgé · ajout du gainage latéral genoux.",
    "Chaque séance utilise un échauffement standard et un retour au calme standard.",
    "Chaque boss se débloque après validation des 3 séances de la semaine.",
    "Récompense finale : badge Seigneur de la Forge, coffre de récompense et accès aux programmes suivants."
  ],

  notes: [
    "Objectif : débutant à intermédiaire.",
    "Matériel : aucun.",
    "Les défis sont réalisés en 2 cycles.",
    "Les boss sont réalisés en 3 cycles.",
    "Les répétitions par jambe ou par côté sont converties en répétitions ou secondes totales dans l’application.",
    "Pompes inclinées : mains sur une table ou un support surélevé.",
    "Fentes arrière assistées : recule une jambe et descends doucement avec un support.",
    "Dead Bug : allongé sur le dos, tends bras et jambe opposés sans creuser le dos.",
    "Gainage latéral genoux : appui sur un avant-bras et les genoux, corps aligné sur le côté."
  ]
},
 "tour-mage": {
  id: "tour-mage",
  subtitle: "Pilates débutant à intermédiaire : centre du corps, posture, mobilité et équilibre.",
  unlockLevel: 1,
  duration: "20 min environ",
  frequency: "Lundi, mercredi, vendredi + boss le samedi",
  material: "Aucun matériel. Tapis conseillé.",
  reward: {
    badgeId: "tour-mage-vaincu",
    badgeTitle: "Tour du Mage",
    chest: true
  },

  weeks: [
    {
      week: 1,
      title: "L’Apprenti Mage",
      xp: 60,
      progression: "Découverte du centre du corps. Nouvel exercice : bascule du bassin au sol.",
      days: [
        {
          day: 1,
          title: "Le Centre",
          xp: 60,
          difficultyLabel: "≈ 20 min",
          instructions: "Échauffement 5 min, deux défis en 2 cycles, retour au calme 5 min.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "pelvic_tilt", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "bridge", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "dead_bug", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "pelvic_tilt", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "bridge", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "dead_bug", amount: 12, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "knee_plank", amount: 15, unit: "sec" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "superman", amount: 8, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "knee_plank", amount: 15, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "superman", amount: 8, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Mobilité",
          xp: 60,
          difficultyLabel: "≈ 20 min",
          instructions: "Mobilité douce et gainage profond.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "cat_cow", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "thoracic_rotation", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "cat_cow", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "thoracic_rotation", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "bridge", amount: 10, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "dead_bug", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "knee_plank", amount: 15, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bridge", amount: 10, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "dead_bug", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "knee_plank", amount: 15, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Équilibre",
          xp: 60,
          difficultyLabel: "≈ 20 min",
          instructions: "Contrôle, équilibre et stabilité.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "single_leg_balance", amount: 40, unit: "sec" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "dead_bug", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "single_leg_balance", amount: 40, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "dead_bug", amount: 12, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "pelvic_tilt", amount: 10, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "bridge", amount: 10, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "superman", amount: 8, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "pelvic_tilt", amount: 10, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bridge", amount: 10, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "superman", amount: 8, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    },

    {
      week: 2,
      title: "Le Cercle de Pierre",
      xp: 70,
      progression: "Stabilité latérale et contrôle du centre. Nouvel exercice : gainage latéral genoux.",
      days: [
        {
          day: 1,
          title: "Stabilité",
          xp: 70,
          difficultyLabel: "≈ 20 min",
          instructions: "Travail du centre et des obliques.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "pelvic_tilt", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "side_plank_knees", amount: 30, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "pelvic_tilt", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "side_plank_knees", amount: 30, unit: "sec" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "bridge", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "superman", amount: 10, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bridge", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "superman", amount: 10, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Mobilité du Mage",
          xp: 70,
          difficultyLabel: "≈ 20 min",
          instructions: "Mobilité contrôlée et gainage latéral.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "cat_cow", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "thoracic_rotation", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "side_plank_knees", amount: 30, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "cat_cow", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "thoracic_rotation", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "side_plank_knees", amount: 30, unit: "sec" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "bridge", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bridge", amount: 12, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Contrôle",
          xp: 70,
          difficultyLabel: "≈ 20 min",
          instructions: "Équilibre, contrôle et stabilité.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "single_leg_balance", amount: 50, unit: "sec" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "knee_plank", amount: 20, unit: "sec" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "single_leg_balance", amount: 50, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "knee_plank", amount: 20, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "pelvic_tilt", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "superman", amount: 10, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "pelvic_tilt", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "superman", amount: 10, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    },

    {
      week: 3,
      title: "Les Arcanes du Corps",
      xp: 80,
      progression: "Contrôle plus fin du bassin et gainage renforcé. Nouvel exercice : relevé de bassin contrôlé.",
      days: [
        {
          day: 1,
          title: "Force Intérieure",
          xp: 80,
          difficultyLabel: "≈ 20 min",
          instructions: "Centre du corps et contrôle du bassin.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "pelvic_lift_floor", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "pelvic_lift_floor", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "superman", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "core", amount: 25, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "superman", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "core", amount: 25, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Fluidité",
          xp: 80,
          difficultyLabel: "≈ 20 min",
          instructions: "Mobilité fluide et centre solide.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "cat_cow", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "thoracic_rotation", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "pelvic_lift_floor", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "cat_cow", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "thoracic_rotation", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "pelvic_lift_floor", amount: 12, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Maîtrise",
          xp: 80,
          difficultyLabel: "≈ 20 min",
          instructions: "Maîtrise du centre, équilibre et maintien.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "single_leg_balance", amount: 60, unit: "sec" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "core", amount: 25, unit: "sec" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "superman", amount: 12, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "single_leg_balance", amount: 60, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "core", amount: 25, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "superman", amount: 12, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "pelvic_lift_floor", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "pelvic_lift_floor", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    },

    {
      week: 4,
      title: "Tour du Mage",
      xp: 90,
      progression: "Épreuve finale de contrôle. Nouvel exercice : Hollow hold simplifié.",
      days: [
        {
          day: 1,
          title: "Concentration",
          xp: 90,
          difficultyLabel: "≈ 20 min",
          instructions: "Contrôle profond du centre du corps.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "hollow_hold_simplified", amount: 15, unit: "sec" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "hollow_hold_simplified", amount: 15, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "pelvic_lift_floor", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "superman", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "pelvic_lift_floor", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "superman", amount: 12, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Maîtrise Totale",
          xp: 90,
          difficultyLabel: "≈ 20 min",
          instructions: "Gainage, contrôle et mobilité.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "hollow_hold_simplified", amount: 15, unit: "sec" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "core", amount: 30, unit: "sec" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "hollow_hold_simplified", amount: 15, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "core", amount: 30, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "pelvic_lift_floor", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "thoracic_rotation", amount: 12, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "pelvic_lift_floor", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "thoracic_rotation", amount: 12, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Épreuve Finale",
          xp: 90,
          difficultyLabel: "≈ 20 min",
          instructions: "Dernière épreuve avant le Dragon Astral.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "hollow_hold_simplified", amount: 20, unit: "sec" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "superman", amount: 15, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "hollow_hold_simplified", amount: 20, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "superman", amount: 15, unit: "répétitions" },

            { phase: "Défi 2 · Cycle 1", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 1", exerciseId: "pelvic_lift_floor", amount: 15, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 2 · Cycle 2", exerciseId: "pelvic_lift_floor", amount: 15, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    }
  ],

  bosses: [
    {
      week: 1,
      title: "Le Grimoire Perdu",
      xp: 50,
      badgeId: "tour-apprenti-cercle",
      difficultyLabel: "Boss semaine 1 · 3 cycles",
      instructions: "Débloqué après les 3 séances de la semaine 1.",
      lockedMessage: "Le Grimoire Perdu reste fermé. Termine les 3 séances de la semaine.",
      exercises: [
        { phase: "Cycle 1", exerciseId: "pelvic_tilt", amount: 10, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "bridge", amount: 10, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "dead_bug", amount: 12, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "superman", amount: 8, unit: "répétitions" },

        { phase: "Cycle 2", exerciseId: "pelvic_tilt", amount: 10, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "bridge", amount: 10, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "dead_bug", amount: 12, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "superman", amount: 8, unit: "répétitions" },

        { phase: "Cycle 3", exerciseId: "pelvic_tilt", amount: 10, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "bridge", amount: 10, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "dead_bug", amount: 12, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "superman", amount: 8, unit: "répétitions" }
      ]
    },
    {
      week: 2,
      title: "Le Golem de Marbre",
      xp: 60,
      badgeId: "tour-cercle-pierre",
      difficultyLabel: "Boss semaine 2 · 3 cycles",
      instructions: "Débloqué après les 3 séances de la semaine 2.",
      lockedMessage: "Le Golem ne bougera pas tant que le Cercle de Pierre n’est pas achevé.",
      exercises: [
        { phase: "Cycle 1", exerciseId: "side_plank_knees", amount: 30, unit: "sec" },
        { phase: "Cycle 1", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "bridge", amount: 12, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "superman", amount: 10, unit: "répétitions" },

        { phase: "Cycle 2", exerciseId: "side_plank_knees", amount: 30, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "bridge", amount: 12, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "superman", amount: 10, unit: "répétitions" },

        { phase: "Cycle 3", exerciseId: "side_plank_knees", amount: 30, unit: "sec" },
        { phase: "Cycle 3", exerciseId: "dead_bug", amount: 16, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "bird_dog", amount: 16, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "bridge", amount: 12, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "superman", amount: 10, unit: "répétitions" }
      ]
    },
    {
      week: 3,
      title: "L’Élémentaire d’Air",
      xp: 70,
      badgeId: "tour-arcanes-corps",
      difficultyLabel: "Boss semaine 3 · 3 cycles",
      instructions: "Débloqué après les 3 séances de la semaine 3.",
      lockedMessage: "L’Élémentaire attend un corps stable et un souffle calme.",
      exercises: [
        { phase: "Cycle 1", exerciseId: "pelvic_lift_floor", amount: 12, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
        { phase: "Cycle 1", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "superman", amount: 12, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },

        { phase: "Cycle 2", exerciseId: "pelvic_lift_floor", amount: 12, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "superman", amount: 12, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },

        { phase: "Cycle 3", exerciseId: "pelvic_lift_floor", amount: 12, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
        { phase: "Cycle 3", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "superman", amount: 12, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "dead_bug", amount: 20, unit: "répétitions" }
      ]
    },
    {
      week: 4,
      title: "Le Dragon Astral",
      xp: 100,
      badgeId: "tour-mage-vaincu",
      chest: true,
      difficultyLabel: "Boss final · 30 à 40 min",
      instructions: "Débloqué après les 3 séances de la semaine 4. Coffre magique final.",
      lockedMessage: "Le Dragon Astral ne descend que devant un mage prêt.",
      exercises: [
        { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "march_on_spot", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "arm_circles", amount: 30, unit: "sec" },
        { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },

        { phase: "Cycle 1", exerciseId: "hollow_hold_simplified", amount: 20, unit: "sec" },
        { phase: "Cycle 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "pelvic_lift_floor", amount: 15, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
        { phase: "Cycle 1", exerciseId: "superman", amount: 15, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "bridge", amount: 15, unit: "répétitions" },

        { phase: "Cycle 2", exerciseId: "hollow_hold_simplified", amount: 20, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "pelvic_lift_floor", amount: 15, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "superman", amount: 15, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "bridge", amount: 15, unit: "répétitions" },

        { phase: "Cycle 3", exerciseId: "hollow_hold_simplified", amount: 20, unit: "sec" },
        { phase: "Cycle 3", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "pelvic_lift_floor", amount: 15, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "side_plank_knees", amount: 40, unit: "sec" },
        { phase: "Cycle 3", exerciseId: "superman", amount: 15, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "bridge", amount: 15, unit: "répétitions" },

        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
        { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
        { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
        { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
      ]
    }
  ],

  progression: [
    "Semaine 1 : L’Apprenti Mage · ajout de la bascule du bassin au sol.",
    "Semaine 2 : Le Cercle de Pierre · ajout du gainage latéral genoux.",
    "Semaine 3 : Les Arcanes du Corps · ajout du relevé de bassin contrôlé.",
    "Semaine 4 : Tour du Mage · ajout du Hollow Hold simplifié.",
    "Chaque séance suit le format : échauffement, défi 1, défi 2, retour au calme.",
    "Les défis sont réalisés en 2 cycles.",
    "Le boss du samedi se débloque après les 3 séances de la semaine.",
    "Récompense finale : badge Tour du Mage, coffre magique et +100 XP."
  ],

  notes: [
    "Objectif : Pilates débutant à intermédiaire.",
    "Renforce le centre du corps, améliore la posture et développe la mobilité.",
    "Les répétitions par côté sont converties en répétitions totales dans l’application.",
    "Les temps par côté sont convertis en durée totale.",
    "Bascule du bassin : plaque doucement le bas du dos contre le sol puis relâche.",
    "Gainage latéral genoux : appui sur un avant-bras et les genoux, corps aligné.",
    "Relevé de bassin contrôlé : monte les hanches vertèbre après vertèbre puis redescends lentement.",
    "Hollow Hold simplifié : épaules et pieds légèrement décollés, ventre contracté."
  ]
},
    "rempart-heros": {
      "id": "rempart-heros",
      "subtitle": "Renforce ton centre, protège ton dos, tiens la ligne.",
      "material": "Poids du corps. Tapis conseillé.",
      "days": [
        {
          "day": 1,
          "title": "Séance débutant",
          "xp": 20,
          "difficultyLabel": "Séance abdos courte",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "abdominal_breathing",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Activation",
              "exerciseId": "pelvic_tilt",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Abdos doux",
              "exerciseId": "dead_bug_simplified",
              "amount": 32,
              "unit": "répétitions"
            },
            {
              "phase": "Gainage",
              "exerciseId": "knee_plank",
              "amount": 60,
              "unit": "sec"
            },
            {
              "phase": "Obliques",
              "exerciseId": "side_plank_knees",
              "amount": 60,
              "unit": "sec"
            },
            {
              "phase": "Bas du corps / centre",
              "exerciseId": "bridge",
              "amount": 24,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 2,
              "unit": "min"
            }
          ]
        },
        {
          "day": 2,
          "title": "Séance intermédiaire",
          "xp": 35,
          "difficultyLabel": "Séance abdos normale",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "cat_cow",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Abdos",
              "exerciseId": "dead_bug",
              "amount": 60,
              "unit": "répétitions"
            },
            {
              "phase": "Gainage",
              "exerciseId": "core",
              "amount": 90,
              "unit": "sec"
            },
            {
              "phase": "Obliques",
              "exerciseId": "side_plank",
              "amount": 80,
              "unit": "sec"
            },
            {
              "phase": "Dynamique",
              "exerciseId": "mountain_climber_slow",
              "amount": 90,
              "unit": "sec"
            },
            {
              "phase": "Contrôle",
              "exerciseId": "pelvic_lift_floor",
              "amount": 24,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 2,
              "unit": "min"
            }
          ]
        },
        {
          "day": 3,
          "title": "Séance avancée",
          "xp": 50,
          "difficultyLabel": "Séance abdos avancée",
          "exercises": [
            {
              "phase": "Gainage",
              "exerciseId": "core",
              "amount": 135,
              "unit": "sec"
            },
            {
              "phase": "Obliques",
              "exerciseId": "side_plank",
              "amount": 180,
              "unit": "sec"
            },
            {
              "phase": "Dynamique",
              "exerciseId": "mountain_climber_slow",
              "amount": 120,
              "unit": "sec"
            },
            {
              "phase": "Abdos",
              "exerciseId": "crunch_controlled",
              "amount": 45,
              "unit": "répétitions"
            },
            {
              "phase": "Contrôle",
              "exerciseId": "dead_bug",
              "amount": 60,
              "unit": "répétitions"
            },
            {
              "phase": "Finisher",
              "exerciseId": "hollow_hold_simplified",
              "amount": 45,
              "unit": "sec"
            }
          ]
        }
      ],
      "progression": [
        "Semaine 1 : apprendre les mouvements en version douce.",
        "Semaine 2 : ajouter 5 à 10 secondes de gainage.",
        "Semaine 3 : ajouter une série sur dead bug ou planche.",
        "Semaine 4 : passer à la version intermédiaire.",
        "Objectif : renforcer le centre sans brutaliser le dos."
      ],
      "notes": [
        "Dead bug : garde le bas du dos proche du sol et alterne sans cambrer.",
        "Bascule du bassin : contracte doucement les abdos pour rapprocher le bas du dos du sol.",
        "Planche genoux : corps aligné des épaules aux genoux, abdos serrés.",
        "Gainage latéral genoux : appui avant-bras et genoux, hanches levées.",
        "Mountain climber lent : dos stable, genou ramené lentement vers la poitrine."
      ]
    },
    "marche-aventurier": {
      "id": "marche-aventurier",
      "days": [
        {
          "day": 1,
          "title": "Marche douce",
          "exercises": [
            {
              "phase": "Endurance",
              "exerciseId": "walk",
              "amount": 20,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        {
          "day": 2,
          "title": "Marche active",
          "exercises": [
            {
              "phase": "Endurance",
              "exerciseId": "walk",
              "amount": 30,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        {
          "day": 3,
          "title": "Marche longue",
          "exercises": [
            {
              "phase": "Endurance",
              "exerciseId": "walk",
              "amount": 45,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        }
      ],
      "progression": [
        "Débutant : 15-20 min de marche.",
        "Intermédiaire : 30 min.",
        "Avancé : 45 min.",
        "Bonus quête : 6000 à 10000 pas."
      ]
    },
    "boss-hebdo": {
      "id": "boss-hebdo",
      "days": [
        {
          "day": 1,
          "title": "Boss du Donjon des Courbatures",
          "exercises": [
            {
              "phase": "Jambes",
              "exerciseId": "squats",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Haut du corps",
              "exerciseId": "incline_pushups",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Centre",
              "exerciseId": "core",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Fessiers",
              "exerciseId": "bridge",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Respiration finale",
              "exerciseId": "slow_breathing",
              "amount": 2,
              "unit": "min"
            }
          ]
        }
      ],
      "progression": [
        "+50 XP.",
        "Badge Boss vaincu.",
        "Déblocage image joueur niveau suivant si seuil atteint."
      ]
    },
    "champion-arenes": {
      "id": "champion-arenes",
      "subtitle": "Programme avancé de force, kettlebell, traction, banc, élastique et sac de frappe.",
      "unlockLevel": 8,
      "duration": "45 à 75 min",
      "frequency": "3 séances par semaine + boss hebdomadaire",
      "material": "Kettlebell, banc de musculation, élastique, barre de traction, sac de frappe, poids du corps.",
      "reward": {
        "badgeId": "champion-arenes-vaincu",
        "badgeTitle": "Champion des Arènes",
        "chest": true,
        "nextPrograms": []
      },
      "standardWarmup": "advanced_standard_warmup",
      "standardCooldown": "advanced_standard_cooldown",
      "weeks": [
        {
          "week": 1,
          "title": "Entrée dans l’Arène",
          "xp": 100,
          "progression": "On installe les bases avancées : force contrôlée, tirage, poussée et premier finisher au sac.",
          "days": [
            {
              "day": 1,
              "title": "Force du Champion",
              "xp": 100,
              "difficultyLabel": "≈ 45 à 60 min",
              "instructions": "Échauffement standard, deux défis en 3 cycles, sac de frappe, puis retour au calme standard.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "goblet_squat",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "bench_press",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "resistance_band_row",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Repos",
                  "exerciseId": "slow_breathing",
                  "amount": 1,
                  "unit": "min"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "goblet_squat",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "bench_press",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "resistance_band_row",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Repos",
                  "exerciseId": "slow_breathing",
                  "amount": 1,
                  "unit": "min"
                },
                {
                  "phase": "Défi 1 · Cycle 3",
                  "exerciseId": "goblet_squat",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 3",
                  "exerciseId": "bench_press",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 3",
                  "exerciseId": "resistance_band_row",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "walking_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "core",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 25,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "walking_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "core",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 25,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 3",
                  "exerciseId": "walking_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 3",
                  "exerciseId": "core",
                  "amount": 30,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 3",
                  "exerciseId": "calf_raises",
                  "amount": 25,
                  "unit": "répétitions"
                },
                {
                  "phase": "Finisher · Sac 3 rounds",
                  "exerciseId": "heavy_bag_rounds",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Marteau et Bouclier",
              "xp": 100,
              "difficultyLabel": "≈ 45 à 60 min",
              "instructions": "Travail épaules, dos et charnière de hanches.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "kettlebell_deadlift",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "kettlebell_military_press",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "face_pull",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "kettlebell_deadlift",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "kettlebell_military_press",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "face_pull",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 3",
                  "exerciseId": "kettlebell_deadlift",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 3",
                  "exerciseId": "kettlebell_military_press",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 3",
                  "exerciseId": "face_pull",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "kettlebell_swing",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "bird_dog",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "side_plank",
                  "amount": 40,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "kettlebell_swing",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "bird_dog",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "side_plank",
                  "amount": 40,
                  "unit": "sec"
                },
                {
                  "phase": "Finisher · Sac 4 rounds",
                  "exerciseId": "heavy_bag_rounds",
                  "amount": 6,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 3,
              "title": "Chaîne de l’Arène",
              "xp": 100,
              "difficultyLabel": "≈ 45 à 60 min",
              "instructions": "Séance complète avec traction assistée et technique kettlebell.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "assisted_pullups",
                  "amount": 5,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "goblet_squat",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "bench_press",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "assisted_pullups",
                  "amount": 5,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "goblet_squat",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "bench_press",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 3",
                  "exerciseId": "assisted_pullups",
                  "amount": 5,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 3",
                  "exerciseId": "goblet_squat",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 3",
                  "exerciseId": "bench_press",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Technique",
                  "exerciseId": "turkish_get_up",
                  "amount": 4,
                  "unit": "répétitions"
                },
                {
                  "phase": "Finisher · Sac 4 rounds",
                  "exerciseId": "heavy_bag_rounds",
                  "amount": 6,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            }
          ]
        },
        {
          "week": 2,
          "title": "La Corne du Minotaure",
          "xp": 115,
          "progression": "On augmente les cycles et on introduit plus d’épaules, de tractions et de gainage latéral.",
          "days": [
            {
              "day": 1,
              "title": "Épaules du Minotaure",
              "xp": 115,
              "difficultyLabel": "≈ 50 à 65 min",
              "instructions": "Poussée verticale, tirage assisté, posture et sac de frappe.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Défi 1 · 4 cycles",
                  "exerciseId": "kettlebell_military_press",
                  "amount": 48,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · 4 cycles",
                  "exerciseId": "assisted_pullups",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · 4 cycles",
                  "exerciseId": "face_pull",
                  "amount": 60,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · 4 cycles",
                  "exerciseId": "kettlebell_swing",
                  "amount": 60,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · 4 cycles",
                  "exerciseId": "bird_dog",
                  "amount": 40,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · 4 cycles",
                  "exerciseId": "side_plank",
                  "amount": 160,
                  "unit": "sec"
                },
                {
                  "phase": "Combat final · Sac 5 rounds",
                  "exerciseId": "heavy_bag_rounds",
                  "amount": 7,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Hanches de Bronze",
              "xp": 115,
              "difficultyLabel": "≈ 50 à 60 min",
              "instructions": "Charnière de hanches, jambes et force de poussée.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "kettlebell_deadlift",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "goblet_squat",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "walking_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "kettlebell_deadlift",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "goblet_squat",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "walking_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 3",
                  "exerciseId": "kettlebell_deadlift",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 3",
                  "exerciseId": "goblet_squat",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 3",
                  "exerciseId": "walking_lunges",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · 3 cycles",
                  "exerciseId": "bench_press",
                  "amount": 30,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · 3 cycles",
                  "exerciseId": "resistance_band_row",
                  "amount": 45,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · 3 cycles",
                  "exerciseId": "core",
                  "amount": 120,
                  "unit": "sec"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 3,
              "title": "Combat du Cercle",
              "xp": 115,
              "difficultyLabel": "≈ 45 à 60 min",
              "instructions": "Séance orientée conditionnement : swings, gainage et sac.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Puissance · 4 cycles",
                  "exerciseId": "kettlebell_swing",
                  "amount": 60,
                  "unit": "répétitions"
                },
                {
                  "phase": "Puissance · 4 cycles",
                  "exerciseId": "goblet_squat",
                  "amount": 48,
                  "unit": "répétitions"
                },
                {
                  "phase": "Posture · 4 cycles",
                  "exerciseId": "face_pull",
                  "amount": 60,
                  "unit": "répétitions"
                },
                {
                  "phase": "Noyau · 4 cycles",
                  "exerciseId": "core",
                  "amount": 120,
                  "unit": "sec"
                },
                {
                  "phase": "Combat final · Sac 5 rounds",
                  "exerciseId": "heavy_bag_rounds",
                  "amount": 7,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            }
          ]
        },
        {
          "week": 3,
          "title": "Le Fer et la Cendre",
          "xp": 130,
          "progression": "Le programme devient plus dense : tractions propres, deadlift, gainage long et sac de frappe plus présent.",
          "days": [
            {
              "day": 1,
              "title": "Force du Seigneur de Fer",
              "xp": 130,
              "difficultyLabel": "≈ 55 à 70 min",
              "instructions": "Gros bloc jambes, puis haut du corps et sac de frappe.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Défi 1 · 4 cycles",
                  "exerciseId": "kettlebell_deadlift",
                  "amount": 48,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · 4 cycles",
                  "exerciseId": "goblet_squat",
                  "amount": 60,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · 4 cycles",
                  "exerciseId": "calf_raises",
                  "amount": 100,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · 4 cycles",
                  "exerciseId": "bench_press",
                  "amount": 40,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · 4 cycles",
                  "exerciseId": "pullups_clean_max",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · 4 cycles",
                  "exerciseId": "core",
                  "amount": 160,
                  "unit": "sec"
                },
                {
                  "phase": "Combat final · Sac 6 rounds",
                  "exerciseId": "heavy_bag_rounds",
                  "amount": 9,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Forge du Corps Entier",
              "xp": 130,
              "difficultyLabel": "≈ 50 à 65 min",
              "instructions": "Puissance de hanches, épaules et stabilité.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Défi 1 · 4 cycles",
                  "exerciseId": "kettlebell_swing",
                  "amount": 60,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · 4 cycles",
                  "exerciseId": "kettlebell_military_press",
                  "amount": 40,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · 4 cycles",
                  "exerciseId": "walking_lunges",
                  "amount": 80,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · 4 cycles",
                  "exerciseId": "resistance_band_row",
                  "amount": 60,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · 4 cycles",
                  "exerciseId": "face_pull",
                  "amount": 60,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · 4 cycles",
                  "exerciseId": "side_plank",
                  "amount": 160,
                  "unit": "sec"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 3,
              "title": "Technique du Maître",
              "xp": 130,
              "difficultyLabel": "≈ 50 à 65 min",
              "instructions": "Technique kettlebell, traction et sac de frappe.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Technique",
                  "exerciseId": "turkish_get_up",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Force · 3 cycles",
                  "exerciseId": "goblet_squat",
                  "amount": 45,
                  "unit": "répétitions"
                },
                {
                  "phase": "Force · 3 cycles",
                  "exerciseId": "bench_press",
                  "amount": 30,
                  "unit": "répétitions"
                },
                {
                  "phase": "Force · 3 cycles",
                  "exerciseId": "pullups_clean_max",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Combat final · Sac 6 rounds",
                  "exerciseId": "heavy_bag_rounds",
                  "amount": 9,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            }
          ]
        },
        {
          "week": 4,
          "title": "Champion des Arènes",
          "xp": 150,
          "progression": "Dernière semaine : le joueur assemble force, endurance, technique et combat.",
          "days": [
            {
              "day": 1,
              "title": "Jambes du Champion",
              "xp": 150,
              "difficultyLabel": "≈ 55 à 70 min",
              "instructions": "Séance dense pour les jambes et la chaîne postérieure.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Épreuve jambes · 3 cycles",
                  "exerciseId": "goblet_squat",
                  "amount": 45,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve jambes · 3 cycles",
                  "exerciseId": "kettlebell_deadlift",
                  "amount": 36,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve jambes · 3 cycles",
                  "exerciseId": "walking_lunges",
                  "amount": 72,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve jambes · 3 cycles",
                  "exerciseId": "calf_raises",
                  "amount": 75,
                  "unit": "répétitions"
                },
                {
                  "phase": "Noyau",
                  "exerciseId": "core",
                  "amount": 180,
                  "unit": "sec"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 2,
              "title": "Armes du Champion",
              "xp": 150,
              "difficultyLabel": "≈ 55 à 70 min",
              "instructions": "Poussée, tirage, épaules et posture.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Épreuve haut du corps · 3 cycles",
                  "exerciseId": "bench_press",
                  "amount": 30,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve haut du corps · 3 cycles",
                  "exerciseId": "kettlebell_military_press",
                  "amount": 30,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve haut du corps · 3 cycles",
                  "exerciseId": "resistance_band_row",
                  "amount": 45,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve haut du corps · 3 cycles",
                  "exerciseId": "pullups_clean_max",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Posture",
                  "exerciseId": "face_pull",
                  "amount": 45,
                  "unit": "répétitions"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            {
              "day": 3,
              "title": "Raid des Arènes",
              "xp": 150,
              "difficultyLabel": "≈ 60 à 75 min",
              "instructions": "Séance complète avant le boss final.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Épreuve force · 3 cycles",
                  "exerciseId": "goblet_squat",
                  "amount": 45,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve force · 3 cycles",
                  "exerciseId": "bench_press",
                  "amount": 30,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve force · 3 cycles",
                  "exerciseId": "resistance_band_row",
                  "amount": 45,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve technique",
                  "exerciseId": "turkish_get_up",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Combat · Sac 8 rounds",
                  "exerciseId": "heavy_bag_rounds",
                  "amount": 12,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            }
          ]
        }
      ],
      "bosses": [
        {
          "week": 1,
          "title": "L’Ogre des Fosses",
          "subtitle": "Premier raid de l’arène.",
          "xp": 100,
          "badgeId": "ogre-fosses-vaincu",
          "difficultyLabel": "Boss semaine 1 · 45 à 60 min",
          "instructions": "Débloqué après les 3 séances de la semaine 1.",
          "lockedMessage": "L’Ogre des Fosses attend un adversaire préparé. Termine tes 3 séances avant d’entrer dans l’arène.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Fosse d’entraînement",
              "mission": "Routine standard, deux épreuves de force, puis sac de frappe.",
              "difficultyLabel": "≈ 45 à 60 min",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Épreuve 1 · 3 cycles",
                  "exerciseId": "goblet_squat",
                  "amount": 36,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 1 · 3 cycles",
                  "exerciseId": "bench_press",
                  "amount": 30,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 1 · 3 cycles",
                  "exerciseId": "resistance_band_row",
                  "amount": 45,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 2 · 3 cycles",
                  "exerciseId": "walking_lunges",
                  "amount": 60,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 2 · 3 cycles",
                  "exerciseId": "core",
                  "amount": 90,
                  "unit": "sec"
                },
                {
                  "phase": "Épreuve 2 · 3 cycles",
                  "exerciseId": "calf_raises",
                  "amount": 75,
                  "unit": "répétitions"
                },
                {
                  "phase": "Combat final · Sac 4 rounds",
                  "exerciseId": "heavy_bag_rounds",
                  "amount": 6,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Charge hors des fosses",
              "mission": "Vélo 45 min avec 5 accélérations de 30 sec, puis récupération complète.",
              "difficultyLabel": "≈ 50 min",
              "exercises": [
                {
                  "phase": "Sortie vélo",
                  "exerciseId": "bike",
                  "amount": 45,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "5 accélérations de 30 sec",
                  "exerciseId": "bike_acceleration",
                  "amount": 3,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            }
          }
        },
        {
          "week": 2,
          "title": "Le Minotaure",
          "subtitle": "Le gardien du labyrinthe d’acier.",
          "xp": 125,
          "badgeId": "minotaure-vaincu",
          "difficultyLabel": "Boss semaine 2 · 50 à 65 min",
          "instructions": "Débloqué après les 3 séances de la semaine 2.",
          "lockedMessage": "Le Minotaure ne charge que les héros réguliers. Termine tes 3 séances de la semaine.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Labyrinthe d’acier",
              "mission": "Routine standard, épaules, tractions, swings, gainage latéral et sac.",
              "difficultyLabel": "≈ 50 à 65 min",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Épreuve 1 · 4 cycles",
                  "exerciseId": "kettlebell_military_press",
                  "amount": 48,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 1 · 4 cycles",
                  "exerciseId": "assisted_pullups",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 1 · 4 cycles",
                  "exerciseId": "face_pull",
                  "amount": 60,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 2 · 4 cycles",
                  "exerciseId": "kettlebell_swing",
                  "amount": 60,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 2 · 4 cycles",
                  "exerciseId": "bird_dog",
                  "amount": 40,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 2 · 4 cycles",
                  "exerciseId": "side_plank",
                  "amount": 160,
                  "unit": "sec"
                },
                {
                  "phase": "Combat final · Sac 5 rounds",
                  "exerciseId": "heavy_bag_rounds",
                  "amount": 7,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Charge du Minotaure",
              "mission": "Vélo 60 min avec 6 accélérations de 45 sec.",
              "difficultyLabel": "≈ 65 min",
              "exercises": [
                {
                  "phase": "Sortie vélo",
                  "exerciseId": "bike",
                  "amount": 60,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "6 accélérations de 45 sec",
                  "exerciseId": "bike_acceleration",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            }
          }
        },
        {
          "week": 3,
          "title": "Le Seigneur de Fer",
          "subtitle": "Le gardien des chaînes et des enclumes.",
          "xp": 150,
          "badgeId": "seigneur-fer-vaincu",
          "difficultyLabel": "Boss semaine 3 · 55 à 70 min",
          "instructions": "Débloqué après les 3 séances de la semaine 3.",
          "lockedMessage": "Le Seigneur de Fer ne s’incline pas devant les entraînements incomplets.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Forge de l’arène",
              "mission": "Deadlift, squat, tirage, gainage et combat final.",
              "difficultyLabel": "≈ 55 à 70 min",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Épreuve 1 · 4 cycles",
                  "exerciseId": "kettlebell_deadlift",
                  "amount": 48,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 1 · 4 cycles",
                  "exerciseId": "goblet_squat",
                  "amount": 60,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 1 · 4 cycles",
                  "exerciseId": "calf_raises",
                  "amount": 100,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 2 · 4 cycles",
                  "exerciseId": "bench_press",
                  "amount": 40,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 2 · 4 cycles",
                  "exerciseId": "pullups_clean_max",
                  "amount": 20,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve 2 · 4 cycles",
                  "exerciseId": "core",
                  "amount": 160,
                  "unit": "sec"
                },
                {
                  "phase": "Combat final · Sac 6 rounds",
                  "exerciseId": "heavy_bag_rounds",
                  "amount": 9,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Route du Fer",
              "mission": "Vélo 75 min avec 8 accélérations de 45 sec.",
              "difficultyLabel": "≈ 80 min",
              "exercises": [
                {
                  "phase": "Sortie vélo",
                  "exerciseId": "bike",
                  "amount": 75,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "8 accélérations de 45 sec",
                  "exerciseId": "bike_acceleration",
                  "amount": 6,
                  "unit": "min"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            }
          }
        },
        {
          "week": 4,
          "title": "Champion des Arènes",
          "subtitle": "Boss final : le raid complet.",
          "xp": 250,
          "badgeId": "champion-arenes-vaincu",
          "chest": true,
          "difficultyLabel": "Boss final · 60 à 75 min",
          "instructions": "Débloqué après les 3 séances de la semaine 4.",
          "lockedMessage": "La foule attend un champion, pas un héros à moitié préparé. Termine ta semaine.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Raid final des Arènes",
              "mission": "Épreuves jambes, haut du corps, noyau, sac de frappe et Turkish Get-Up.",
              "difficultyLabel": "≈ 60 à 75 min",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "advanced_standard_warmup",
                  "amount": 5,
                  "unit": "min"
                },
                {
                  "phase": "Épreuve des jambes · 3 cycles",
                  "exerciseId": "goblet_squat",
                  "amount": 45,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve des jambes · 3 cycles",
                  "exerciseId": "kettlebell_deadlift",
                  "amount": 36,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve des jambes · 3 cycles",
                  "exerciseId": "walking_lunges",
                  "amount": 72,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve des jambes · 3 cycles",
                  "exerciseId": "calf_raises",
                  "amount": 75,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve du haut du corps · 3 cycles",
                  "exerciseId": "bench_press",
                  "amount": 30,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve du haut du corps · 3 cycles",
                  "exerciseId": "kettlebell_military_press",
                  "amount": 30,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve du haut du corps · 3 cycles",
                  "exerciseId": "resistance_band_row",
                  "amount": 45,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve du haut du corps · 3 cycles",
                  "exerciseId": "pullups_clean_max",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve du noyau · 3 cycles",
                  "exerciseId": "bird_dog",
                  "amount": 36,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve du noyau · 3 cycles",
                  "exerciseId": "superman",
                  "amount": 45,
                  "unit": "répétitions"
                },
                {
                  "phase": "Épreuve du noyau · 3 cycles",
                  "exerciseId": "core",
                  "amount": 135,
                  "unit": "sec"
                },
                {
                  "phase": "Épreuve du noyau · 3 cycles",
                  "exerciseId": "side_plank",
                  "amount": 180,
                  "unit": "sec"
                },
                {
                  "phase": "Épreuve du guerrier · Sac 8 rounds",
                  "exerciseId": "heavy_bag_rounds",
                  "amount": 12,
                  "unit": "min"
                },
                {
                  "phase": "Épreuve du maître",
                  "exerciseId": "turkish_get_up",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "La Route des Héros",
              "mission": "Mission au choix : vélo 90 min, ou 25 km, ou 1 000 m de dénivelé cumulé sur vélo d’appartement. Valide dès qu’un objectif est atteint.",
              "difficultyLabel": "≈ 90 min ou objectif atteint",
              "instructions": "Choisis l’un des trois objectifs et termine par la récupération complète.",
              "exercises": [
                {
                  "phase": "Route des Héros",
                  "exerciseId": "bike",
                  "amount": 90,
                  "unit": "min",
                  "distanceOptional": true
                },
                {
                  "phase": "Option distance",
                  "exerciseId": "bike",
                  "amount": 25,
                  "unit": "km",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "advanced_standard_cooldown",
                  "amount": 5,
                  "unit": "min"
                }
              ]
            }
          }
        }
      ],
      "progression": [
        "Semaine 1 : Entrée dans l’Arène · bases avancées et premier finisher au sac.",
        "Semaine 2 : La Corne du Minotaure · plus de cycles, épaules, tractions et swings.",
        "Semaine 3 : Le Fer et la Cendre · densité, tractions propres et sac plus long.",
        "Semaine 4 : Champion des Arènes · raid complet de force, technique et combat.",
        "Chaque séance utilise l’échauffement standard de 5 min et le retour au calme standard de 5 min.",
        "Chaque semaine propose un boss intérieur et une version extérieure à vélo.",
        "Récompense finale : badge légendaire Champion des Arènes, coffre épique et +250 XP."
      ],
      "notes": [
        "Programme avancé : réservé aux joueurs déjà à l’aise avec les mouvements de base.",
        "Choisir des charges permettant de garder une technique propre.",
        "Les quantités par côté sont converties en répétitions totales.",
        "Pour les tractions max propre : arrêter dès que la posture se dégrade.",
        "Pour le Turkish Get-Up : privilégier une charge légère et un mouvement lent."
      ]
    }
  },
  "rewardFamiliars": [
    {
      "id": "familier-01",
      "name": "Batraglyphe",
      "image": "assets/familiers/familier_grenouille.png"
    },
    {
      "id": "familier-02",
      "name": "Plumérion",
      "image": "assets/familiers/familier_hibou.png"
    },
    {
      "id": "familier-03",
      "name": "Flambis",
      "image": "assets/familiers/familier_renard.png"
    },
    {
      "id": "familier-04",
      "name": "Noxplume",
      "image": "assets/familiers/familier_corbeau.png"
    },
    {
      "id": "familier-05",
      "name": "Bravouf",
      "image": "assets/familiers/familier_chien.png"
    },
    {
      "id": "familier-06",
      "name": "Noctimaow",
      "image": "assets/familiers/familier_chat.png"
    },
    {
      "id": "familier-07",
      "name": "Gribzouk",
      "image": "assets/familiers/familier_diablotin.png"
    },
    {
      "id": "familier-08",
      "name": "Pyrolins",
      "image": "assets/familiers/familier_dragon.png"
    }
  ],
  "badges": [
    {
      "id": "first-step",
      "icon": "👣",
      "title": "Premier pas",
      "description": "Valider une première entrée.",
      "type": "totalEntries",
      "target": 1
    },
    {
      "id": "hero-spark",
      "icon": "🔥",
      "title": "Élan du héros",
      "description": "Valider 3 entrées au total.",
      "type": "totalEntries",
      "target": 3
    },
    {
      "id": "regular",
      "icon": "📅",
      "title": "Régulier",
      "description": "Atteindre 3 jours de série.",
      "type": "streak",
      "target": 3
    },
    {
      "id": "walker",
      "icon": "🥾",
      "title": "Marcheur de l’aventure",
      "description": "Valider 5 marches.",
      "type": "exerciseCount",
      "exerciseId": "walk",
      "target": 5
    },
    {
      "id": "heros-eveille",
      "icon": "🌅",
      "title": "Héros Éveillé",
      "description": "Terminer les 12 séances du programme Éveil du héros.",
      "type": "program",
      "programId": "eveil-heros",
      "target": 12
    },
    {
      "id": "cyclist",
      "icon": "🚴",
      "title": "Cycliste novice",
      "description": "Valider 5 séances de vélo.",
      "type": "exerciseCount",
      "exerciseId": "bike",
      "target": 5
    },
    {
      "id": "bras-heros",
      "icon": "💪",
      "title": "Bras du héros",
      "description": "Terminer une séance du programme Bras du héros.",
      "type": "program",
      "programId": "bras-heros",
      "target": 1
    },
    {
      "id": "runner",
      "icon": "🏃",
      "title": "Souffle du dragon",
      "description": "Valider 5 courses.",
      "type": "exerciseGroupCount",
      "exerciseIds": [
        "run_treadmill",
        "run_outdoor"
      ],
      "target": 5
    },
    {
      "id": "strength",
      "icon": "💪",
      "title": "Force tranquille",
      "description": "Valider 10 exercices de renforcement.",
      "type": "sportCount",
      "sportId": "strength",
      "target": 10
    },
    {
      "id": "rempart-heros",
      "icon": "🛡️",
      "title": "Rempart du héros",
      "description": "Terminer une séance du programme Rempart du héros.",
      "type": "program",
      "programId": "rempart-heros",
      "target": 1
    },
    {
      "id": "rat-caves-vaincu",
      "icon": "🐀",
      "title": "Rat des Caves vaincu",
      "description": "Vaincre le boss de la semaine 1 du programme Éveil du héros.",
      "type": "program-boss",
      "programId": "eveil-heros",
      "weekNumber": 1,
      "target": 1
    },
    {
      "id": "loup-solitaire-vaincu",
      "icon": "🐺",
      "title": "Loup Solitaire vaincu",
      "description": "Vaincre le boss de la semaine 2 du programme Éveil du héros.",
      "type": "program-boss",
      "programId": "eveil-heros",
      "weekNumber": 2,
      "target": 1
    },
    {
      "id": "sanglier-fourres-vaincu",
      "icon": "🐗",
      "title": "Sanglier des Fourrés vaincu",
      "description": "Vaincre le boss de la semaine 3 du programme Éveil du héros.",
      "type": "program-boss",
      "programId": "eveil-heros",
      "weekNumber": 3,
      "target": 1
    },
    {
      "id": "ogre-endormi-vaincu",
      "icon": "🧌",
      "title": "Ogre Endormi vaincu",
      "description": "Vaincre le boss final du programme Éveil du héros.",
      "type": "program-boss",
      "programId": "eveil-heros",
      "weekNumber": 4,
      "target": 1
    },
    {
      "id": "ecaille-braise",
      "icon": "🔥",
      "title": "Écaille de Braise",
      "description": "Vaincre le boss de la semaine 1 du programme Cœur de Dragon.",
      "type": "program-boss",
      "programId": "coeur-dragon",
      "weekNumber": 1,
      "target": 1
    },
    {
      "id": "salamandre-rouge",
      "icon": "🦎",
      "title": "Salamandre Rouge",
      "description": "Vaincre le boss de la semaine 2 du programme Cœur de Dragon.",
      "type": "program-boss",
      "programId": "coeur-dragon",
      "weekNumber": 2,
      "target": 1
    },
    {
      "id": "drake-falaises",
      "icon": "🐲",
      "title": "Drake des Falaises",
      "description": "Vaincre le boss de la semaine 3 du programme Cœur de Dragon.",
      "type": "program-boss",
      "programId": "coeur-dragon",
      "weekNumber": 3,
      "target": 1
    },
    {
      "id": "coeur-dragon-legendaire",
      "icon": "❤️‍🔥",
      "title": "Cœur du Dragon",
      "description": "Vaincre le boss final du programme Cœur de Dragon.",
      "type": "program-boss",
      "programId": "coeur-dragon",
      "weekNumber": 4,
      "target": 1
    },
    {
      "id": "roues-destin",
      "icon": "🚴",
      "title": "Roues du Destin",
      "description": "Vaincre le boss de la semaine 1 du programme Cavalier de la Route.",
      "type": "program-boss",
      "programId": "cavalier-route",
      "weekNumber": 1,
      "target": 1
    },
    {
      "id": "grimpeur-novice",
      "icon": "🏔️",
      "title": "Grimpeur Novice",
      "description": "Vaincre le boss de la semaine 2 du programme Cavalier de la Route.",
      "type": "program-boss",
      "programId": "cavalier-route",
      "weekNumber": 2,
      "target": 1
    },
    {
      "id": "maitre-collines",
      "icon": "⛰️",
      "title": "Maître des Collines",
      "description": "Vaincre le boss de la semaine 3 du programme Cavalier de la Route.",
      "type": "program-boss",
      "programId": "cavalier-route",
      "weekNumber": 3,
      "target": 1
    },
    {
      "id": "cavalier-route-vaincu",
      "icon": "🚴‍♂️",
      "title": "Cavalier de la Route",
      "description": "Vaincre le boss final du programme Cavalier de la Route.",
      "type": "program-boss",
      "programId": "cavalier-route",
      "weekNumber": 4,
      "target": 1
    },
    {
      id: "forge-marteau-bois",
      icon: "🔨",
      title: "Marteau de Bois",
      description: "Vaincre le boss de la semaine 1 du programme Forge du Guerrier.",
      type: "program-boss",
      programId: "forge-guerrier",
      weekNumber: 1,
      target: 1
    },
    {
      id: "forge-marteau-fer",
      icon: "⚒️",
      title: "Marteau de Fer",
      description: "Vaincre le boss de la semaine 2 du programme Forge du Guerrier.",
      type: "program-boss",
      programId: "forge-guerrier",
      weekNumber: 2,
      target: 1
    },
    {
      id: "forge-acier-trempe",
      icon: "🛡️",
      title: "Acier Trempé",
      description: "Vaincre le boss de la semaine 3 du programme Forge du Guerrier.",
      type: "program-boss",
      programId: "forge-guerrier",
      weekNumber: 3,
      target: 1
    },
    {
      id: "tour-apprenti-cercle",
      icon: "🧘",
      title: "Apprenti du Cercle",
      description: "Vaincre le boss de la semaine 1 du programme Tour du Mage.",
      type: "program-boss",
      programId: "tour-mage",
      weekNumber: 1,
      target: 1
    },
    {
      id: "tour-cercle-pierre",
      icon: "🪨",
      title: "Cercle de Pierre",
      description: "Vaincre le boss de la semaine 2 du programme Tour du Mage.",
      type: "program-boss",
      programId: "tour-mage",
      weekNumber: 2,
      target: 1
    },
    {
      id: "tour-arcanes-corps",
      icon: "✨",
      title: "Arcanes du Corps",
      description: "Vaincre le boss de la semaine 3 du programme Tour du Mage.",
      type: "program-boss",
      programId: "tour-mage",
      weekNumber: 3,
      target: 1
    },
    {
      id: "tour-mage-vaincu",
      icon: "🐉",
      title: "Tour du Mage",
      description: "Vaincre le Dragon Astral, boss final du programme Tour du Mage.",
      type: "program-boss",
      programId: "tour-mage",
      weekNumber: 4,
      target: 1
    },
    {
      id: "seigneur-forge-vaincu",
      icon: "👑",
      title: "Seigneur de la Forge",
      description: "Vaincre le boss final du programme Forge du Guerrier.",
      type: "program-boss",
      programId: "forge-guerrier",
      weekNumber: 4,
      target: 1
    },
    {
      "id": "boss",
      "icon": "👹",
      "title": "Boss vaincu",
      "description": "Valider un défi boss hebdo.",
      "type": "program",
      "programId": "boss-hebdo",
      "target": 1
    },
    {
      "id": "ogre-fosses-vaincu",
      "icon": "👹",
      "title": "Ogre des Fosses vaincu",
      "description": "Vaincre le boss de la semaine 1 du programme Champion des Arènes.",
      "type": "program-boss",
      "programId": "champion-arenes",
      "weekNumber": 1,
      "target": 1
    },
    {
      "id": "minotaure-vaincu",
      "icon": "🐂",
      "title": "Minotaure vaincu",
      "description": "Vaincre le boss de la semaine 2 du programme Champion des Arènes.",
      "type": "program-boss",
      "programId": "champion-arenes",
      "weekNumber": 2,
      "target": 1
    },
    {
      "id": "seigneur-fer-vaincu",
      "icon": "⚒️",
      "title": "Seigneur de Fer vaincu",
      "description": "Vaincre le boss de la semaine 3 du programme Champion des Arènes.",
      "type": "program-boss",
      "programId": "champion-arenes",
      "weekNumber": 3,
      "target": 1
    },
    {
      "id": "champion-arenes-vaincu",
      "icon": "👑",
      "title": "Champion des Arènes",
      "description": "Vaincre le boss final du programme Champion des Arènes.",
      "type": "program-boss",
      "programId": "champion-arenes",
      "weekNumber": 4,
      "target": 1
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
      sportIcon: category?.icon || "⚔️",
      sportColor: category?.color || "#888888",
      categoryColor: category?.color || "#888888"
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

window.FitnessRpgData.getRewardFamiliars = function getRewardFamiliars() {
  return Array.isArray(window.FitnessRpgData.rewardFamiliars)
    ? [...window.FitnessRpgData.rewardFamiliars]
    : [];
};

window.FitnessRpgData.pickRandomFamiliar = function pickRandomFamiliar(alreadyOwnedIds = []) {
  const allFamiliars = window.FitnessRpgData.getRewardFamiliars();

  if (!allFamiliars.length) {
    return null;
  }

  const remainingFamiliars = allFamiliars.filter((familiar) => {
    return !alreadyOwnedIds.includes(familiar.id);
  });

  const pool = remainingFamiliars.length > 0 ? remainingFamiliars : allFamiliars;
  const randomIndex = Math.floor(Math.random() * pool.length);
  const selected = pool[randomIndex];

  return {
    familiar: selected,
    isNew: !alreadyOwnedIds.includes(selected.id),
    allCollected: remainingFamiliars.length === 0
  };
};
