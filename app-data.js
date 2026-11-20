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
      "fallbackImage": "assets/coach/korvan/idle.jpg",
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
      "fallbackImage": "assets/coach/xara/xara_idle.jpg",
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
        "stretch": "assets/coach/xara/xara_stretchup.jpg",
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
      "fallbackImage": "assets/coach/violette/violette_idle.jpg",
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
        "run": "assets/coach/violette/violette_idle.jpg",
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
      "fallbackImage": "assets/coach/elmin/elmin_idle.jpg",
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
        "run": "assets/coach/bazul/bazul_idle.jpg",
        "squats": "assets/coach/bazul/bazul_squats.jpg",
        "core": "assets/coach/bazul/bazul_core.jpg",
        "stretch": "assets/coach/bazul/bazul_strechup.jpg"
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
        "motivate": "assets/coach/satyne/satyne_motivation.jpg",
        "victory": "assets/coach/satyne/satyne_victoire.jpg",
        "levelup": "assets/coach/satyne/satyne_levelup.jpg",
        "warmup": "assets/coach/satyne/satyne_idle.jpg",
        "walk": "assets/coach/satyne/satyne_walk.jpg",
        "bike": "assets/coach/satyne/satyne_bike.jpg",
        "run": "assets/coach/satyne/satyne_idle.jpg",
        "squats": "assets/coach/satyne/satyne_squats.jpg",
        "core": "assets/coach/satyne/satyne_core.jpg",
        "stretch": "assets/coach/satyne/satyne_stretchup.jpg"
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
        "homme": "assets/categories/categorie_homme_echauffement.webp",
        "femme": "assets/categories/categorie_femme_echauffement.webp",
        "male": "assets/categories/categorie_homme_echauffement.webp",
        "female": "assets/categories/categorie_femme_echauffement.webp"
      },
      "description": "Préparer le corps avant l’effort."
    },
    {
      "id": "mobility",
      "title": "Mobilité",
      "icon": "🌀",
      "color": "#7db7ff",
      "images": {
        "homme": "assets/categories/categorie_homme_mobilite.webp",
        "femme": "assets/categories/categorie_femme_mobilite.webp",
        "male": "assets/categories/categorie_homme_mobilite.webp",
        "female": "assets/categories/categorie_femme_mobilite.webp"
      },
      "description": "Bouger mieux, délier les articulations."
    },
    {
      "id": "cardio",
      "title": "Cardio",
      "icon": "❤️‍🔥",
      "color": "#ef6b6b",
      "images": {
        "homme": "assets/categories/categorie_homme_cardio.webp",
        "femme": "assets/categories/categorie_femme_cardio.webp",
        "male": "assets/categories/categorie_homme_cardio.webp",
        "female": "assets/categories/categorie_femme_cardio.webp"
      },
      "description": "Faire monter le souffle sans brutalité."
    },
    {
      "id": "strength",
      "title": "Renforcement",
      "icon": "🛡️",
      "color": "#76d672",
      "images": {
        "homme": "assets/categories/categorie_homme_renforcement.webp",
        "femme": "assets/categories/categorie_femme_renforcement.webp",
        "male": "assets/categories/categorie_homme_renforcement.webp",
        "female": "assets/categories/categorie_femme_renforcement.webp"
      },
      "description": "Gainage, jambes, posture et stabilité."
    },
    {
      "id": "muscle",
      "title": "Musculation",
      "icon": "💪",
      "color": "#c27dff",
      "images": {
        "homme": "assets/categories/categorie_homme_bras.webp",
        "femme": "assets/categories/categorie_femme_bras.webp",
        "male": "assets/categories/categorie_homme_bras.webp",
        "female": "assets/categories/categorie_femme_bras.webp"
      },
      "description": "Bras, épaules, force ciblée."
    },
    {
      "id": "stretch",
      "title": "Étirement",
      "icon": "🌿",
      "color": "#78d6c6",
      "images": {
        "homme": "assets/categories/categorie_homme_etirement.webp",
        "femme": "assets/categories/categorie_femme_etirement.webp",
        "male": "assets/categories/categorie_homme_etirement.webp",
        "female": "assets/categories/categorie_femme_etirement.webp"
      },
      "description": "Retour au calme et récupération."
    },
    {
      "id": "walk",
      "title": "Marche & course",
      "icon": "🏃",
      "color": "#a7d672",
      "images": {
        "homme": "assets/categories/categorie_homme_marche.webp",
        "femme": "assets/categories/categorie_femme_marche.webp",
        "male": "assets/categories/categorie_homme_marche.webp",
        "female": "assets/categories/categorie_femme_marche.webp"
      },
      "description": "Marche et course, sur tapis ou en extérieur."
    },
    {
      "id": "pilates",
      "title": "Pilates",
      "icon": "🧘",
      "color": "#b7a7ff",
      "images": {
        "homme": "assets/categories/categorie_homme_abdos.webp",
        "femme": "assets/categories/categorie_femme_abdos.webp",
        "male": "assets/categories/categorie_homme_abdos.webp",
        "female": "assets/categories/categorie_femme_abdos.webp"
      },
      "description": "Contrôle du centre, respiration, précision et fluidité."
    },
    {
      "id": "bike",
      "title": "Vélo",
      "icon": "🚴",
      "color": "#66d9ef",
      "images": {
        "homme": "assets/categories/categorie_homme_velo.webp",
        "femme": "assets/categories/categorie_femme_velo.webp",
        "male": "assets/categories/categorie_homme_velo.webp",
        "female": "assets/categories/categorie_femme_velo.webp"
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
        "male": "assets/exercices/exercice_homme_marche.webp",
        "female": "assets/exercices/exercice_femme_marchesurplace.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_cercledebras.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_ouverturefermeturedesbras.webp"
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
        "male": "assets/exercices/exercice_homme_marche.webp",
        "female": "assets/exercices/exercice_femme_marchedynamique.webp"
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
      "id": "slow_knee_raises",
      "categoryId": "warmup",
      "title": "Montées de genoux lentes",
      "images": {
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_monteegedeouxlentes.webp"
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
      "id": "side_steps",
      "categoryId": "cardio",
      "title": "Pas chassés",
      "images": {
        "male": "assets/exercices/exercice_homme_side_steps.webp",
        "female": "assets/exercices/exercice_femme_paschasses.webp"
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
      "id": "mountain_climber_slow",
      "categoryId": "cardio",
      "title": "Mountain climber lent",
      "images": {
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_moutainclimberlent.webp"
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
        "male": "assets/exercices/exercice_homme_stomping.webp",
        "female": "assets/exercices/exercice_femme_stomping.webp"
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
        "male": "assets/exercices/exercice_homme_butt_kicks.webp",
        "female": "assets/exercices/exercice_femme_butt_kicks.webp"
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
        "male": "assets/exercices/exercice_homme_cross_knee_tap.webp",
        "female": "assets/exercices/exercice_femme_cross_knee_tap.webp"
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
        "male": "assets/exercices/exercice_homme_step_touch.webp",
        "female": "assets/exercices/exercice_femme_step_touch.webp"
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
      "id": "ranger_step",
      "categoryId": "cardio",
      "title": "Pas du Rôdeur",
      "images": {
        "male": "assets/exercices/exercice_homme_ranger_step.webp",
        "female": "assets/exercices/exercice_femme_ranger_step.webp"
      },
      "unit": "sec",
      "defaultValue": 45,
      "min": 30,
      "step": 15,
      "xpPerUnit": 0.25,
      "stat": "Cardio coordination",
      "pose": "walk",
      "hasTimer": true,
      "description": "Déplace-toi latéralement en croisant le pied arrière derrière le pied d’appui. Garde le buste droit et les mouvements fluides. Alterne droite et gauche.",
      "shortDescription": "Déplacement latéral avec pied croisé derrière.",
      "coachTip": "Reste souple, buste droit, sans précipiter les pas."
    },
    {
      "id": "lateral_steps",
      "categoryId": "cardio",
      "title": "Pas latéraux",
      "images": {
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_paslateraux.webp"
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
        "male": "assets/exercices/exercice_homme_skater_steps.webp",
        "female": "assets/exercices/exercice_femme_skater_steps.webp"
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
        "male": "assets/exercices/exercice_homme_light_boxer.webp",
        "female": "assets/exercices/exercice_femme_light_boxer.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_marcheactive.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_jumpingjacksanssaut.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_marchesurplace.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_marchedynamique.webp"
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
      "categoryId": "walk",
      "title": "Course sur tapis",
      "images": {
        "male": "assets/exercices/exercice_homme_run_treadmill.webp",
        "female": "assets/exercices/exercice_femme_run_treadmill.webp"
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
      "categoryId": "walk",
      "title": "Course extérieure",
      "images": {
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_courseexterieure.webp"
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
        "male": "assets/exercices/exercice_homme_velo.webp",
        "female": "assets/exercices/exercice_femme_velo.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_squats.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_cerclesdechevilles.webp"
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
      "id": "shoulder_rolls",
      "categoryId": "mobility",
      "title": "Enroulement des épaules",
      "images": {
        "male": "assets/exercices/exercice_homme_shoulder_rolls.webp",
        "female": "assets/exercices/exercice_femme__cerclesdepaules.webp"
      },
      "unit": "sec",
      "defaultValue": 60,
      "min": 30,
      "step": 30,
      "xpPerUnit": 0.15,
      "stat": "Mobilité épaules",
      "pose": "stretch",
      "hasTimer": true,
      "description": "Fais rouler les épaules lentement vers l’arrière puis vers l’avant.",
      "shortDescription": "Roulements lents des épaules.",
      "coachTip": "Cherche l’amplitude douce, pas le craquement de donjon."
    },
    {
      "id": "child_pose_stretch",
      "categoryId": "stretch",
      "title": "Étirement du chat",
      "images": {
        "male": "assets/exercices/exercice_homme_child_pose_stretch.webp",
        "female": "assets/exercices/exercice_femme_child_pose_stretch.webp"
      },
      "unit": "min",
      "defaultValue": 1,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Dos / récupération",
      "pose": "stretch",
      "hasTimer": true,
      "description": "Position de l’enfant : assieds-toi vers les talons, bras devant, dos relâché.",
      "shortDescription": "Position de l’enfant pour relâcher le dos.",
      "coachTip": "Respire dans le dos, sans forcer les épaules."
    },
    {
      "id": "gentle_neck_rotation",
      "categoryId": "mobility",
      "title": "Rotation cervicale douce",
      "images": {
        "male": "assets/exercices/exercice_homme_gentle_neck_rotation.webp",
        "female": "assets/exercices/exercice_femme_gentle_neck_rotation.webp"
      },
      "unit": "sec",
      "defaultValue": 60,
      "min": 30,
      "step": 30,
      "xpPerUnit": 0.15,
      "stat": "Nuque / mobilité",
      "pose": "stretch",
      "hasTimer": true,
      "description": "Tourne lentement la tête à droite puis à gauche, sans aller en arrière.",
      "shortDescription": "Rotation lente de la nuque.",
      "coachTip": "Mouvement minuscule et confortable. La nuque n’aime pas les duels."
    },
    {
      "id": "chest_stretch",
      "categoryId": "stretch",
      "title": "Étirement poitrine",
      "images": {
        "male": "assets/exercices/exercice_homme_chest_stretch.webp",
        "female": "assets/exercices/exercice_femme_chest_stretch.webp"
      },
      "unit": "min",
      "defaultValue": 1,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Poitrine / posture",
      "pose": "stretch",
      "hasTimer": true,
      "description": "Ouvre doucement la poitrine, épaules basses, sans cambrer le bas du dos.",
      "shortDescription": "Ouvre doucement la poitrine.",
      "coachTip": "Grandis-toi sans pousser les côtes en avant."
    },
    {
  "id": "ballet_preparatory_arms",
  "categoryId": "mobility",
  "title": "Position préparatoire des bras",
  "images": {
    "male": "assets/exercices/exercice_ballet_preparatory_arms.webp",
    "female": "assets/exercices/exercice_ballet_preparatory_arms.webp"
  },
  "unit": "sec",
  "defaultValue": 30,
  "min": 10,
  "step": 5,
  "xpPerUnit": 0.15,
  "stat": "Posture / épaules",
  "pose": "stretch",
  "hasTimer": true,
  "description": "Debout, pieds parallèles ou légèrement ouverts, allonge la nuque et relâche les épaules. Arrondis les bras devant le bas du ventre comme pour entourer un ballon, coudes souples, mains détendues, sans toucher le corps. Respire tranquillement, puis ouvre progressivement vers la seconde position et reviens. Variante débutant : exécuter le mouvement assis sur une chaise stable.",
  "shortDescription": "Bras arrondis devant le bas du ventre, épaules relâchées.",
  "coachTip": "Ne hausse pas les épaules et ne serre pas les omoplates. Image existante provisoire : vérifier la correspondance visuelle."
},
{
  "id": "ballet_gliding_tendu",
  "categoryId": "mobility",
  "title": "Dégagé glissé au sol (tendu préparatoire)",
  "images": {
    "male": "assets/exercices/exercice_ballet_gliding_tendu.webp",
    "female": "assets/exercices/exercice_ballet_gliding_tendu.webp"
  },
  "unit": "répétitions",
  "defaultValue": 8,
  "min": 2,
  "step": 2,
  "xpPerUnit": 0.8,
  "stat": "Mobilité / coordination",
  "pose": "walk",
  "description": "Une main sur une chaise stable, pieds parallèles ou en ouverture naturelle. Garde le poids sur la jambe d'appui et fais glisser l'autre pied vers l'avant ou le côté jusqu'à tendre doucement la jambe, orteils restant en contact avec le sol. Ramène le pied par le même chemin sans basculer le bassin. Fais quatre passages de chaque côté. Variante débutant : glisser sur une distance plus courte. Ce geste est un tendu préparatoire, sans décoller le pied.",
  "shortDescription": "Glisser un pied au sol, tendre doucement la jambe puis revenir.",
  "coachTip": "Le pied reste au sol : ne pas confondre avec un dégagé décollé. Image existante provisoire à revoir."
},
{
  "id": "ballet_weight_transfer",
  "categoryId": "mobility",
  "title": "Transfert de poids du danseur",
  "images": {
    "male": "assets/exercices/exercice_ballet_weight_transfer.webp",
    "female": "assets/exercices/exercice_ballet_weight_transfer.webp"
  },
  "unit": "répétitions",
  "defaultValue": 8,
  "min": 2,
  "step": 2,
  "xpPerUnit": 0.8,
  "stat": "Équilibre / coordination",
  "pose": "walk",
  "description": "Debout, pieds écartés de la largeur des hanches et une main près d'une chaise. Fléchis très légèrement les genoux puis déplace lentement le poids vers le pied droit, sans incliner le buste. Ramène le poids au centre et recommence à gauche. Garde les deux pieds au sol au début ; ensuite seulement, allège le pied libre. Variante débutant : mains en appui pendant tout l'exercice.",
  "shortDescription": "Déplacer le poids d'un pied à l'autre sans perdre l'alignement.",
  "coachTip": "Bassin horizontal, genoux souples, mouvement contrôlé. Illustration existante provisoire."
},
{
  "id": "ballet_eight_count_phrase",
  "categoryId": "cardio",
  "title": "Phrase dansée sur huit temps",
  "images": {
    "male": "assets/exercices/exercice_ballet_eight_count_phrase.webp",
    "female": "assets/exercices/exercice_ballet_eight_count_phrase.webp"
  },
  "unit": "tours",
  "defaultValue": 2,
  "min": 1,
  "step": 1,
  "xpPerUnit": 4,
  "stat": "Coordination / rythme",
  "pose": "walk",
  "description": "Compte régulièrement de 1 à 8, à voix haute si besoin. Temps 1-2 : ouvrir doucement les bras depuis la position préparatoire. Temps 3-4 : réaliser un petit demi-plié et revenir debout. Temps 5-6 : glisser un pied sur le côté puis le ramener. Temps 7-8 : transférer légèrement le poids, revenir stable et refermer les bras. Répéter lentement avec une pause entre les passages. Variante débutant : sans musique, une main près d'une chaise. Les mouvements peuvent être simplifiés si nécessaire.",
  "shortDescription": "Huit temps : bras, plié, glissé, transfert et retour stable.",
  "coachTip": "Le rythme doit rester régulier ; commence sans musique avant d'accélérer."
},
{
  id: "demi_plie",
  categoryId: "strength",
  title: "Demi-plié",
  images: {
    male: "assets/exercices/exercice_homme_demiplie.webp",
    female: "assets/exercices/femme_default.webp"
  },
  unit: "répétitions",
  defaultValue: 10,
  min: 6,
  step: 1,
  xpPerUnit: 0.8,
  stat: "Jambes / posture",
  pose: "squats",
  description: "Debout, près d'une chaise stable, place les pieds dans une première position naturelle peu ouverte ou parallèles si c'est plus confortable. Grandis la colonne, garde le bassin neutre et répartis le poids sur tout le pied. Fléchis doucement les genoux dans la direction des orteils, sans décoller les talons ni forcer l'ouverture des hanches. Remonte en allongeant les jambes sans verrouiller les genoux. Inspire en descendant et expire en remontant. Variante débutant : petit plié en parallèle avec une main en appui.",
  shortDescription: "Flexion peu profonde, talons au sol, genoux alignés avec les pieds.",
  coachTip: "Ce n'est pas un squat profond : garde le buste vertical, le bassin neutre et l'en-dehors naturel."
},
{
  id: "second_position_arms",
  categoryId: "mobility",
  title: "Bras en seconde",
  images: {
    male: "assets/exercices/exercice_homme_brasenseconde.webp",
    female: "assets/exercices/femme_default.webp"
  },
  unit: "sec",
  defaultValue: 30,
  min: 20,
  step: 5,
  xpPerUnit: 0.15,
  stat: "Posture / épaules",
  pose: "stretch",
  hasTimer: true,
  description: "Tiens-toi debout, le dos droit. Ouvre les bras de chaque côté à hauteur des épaules en gardant les coudes légèrement arrondis et les mains souples, comme si tu entourais un grand ballon invisible.",
  shortDescription: "Bras ouverts, coudes doux, posture allongée.",
  coachTip: "Épaules basses, nuque longue, respiration calme."
},
{
  id: "swan_step",
  categoryId: "cardio",
  title: "Pas du cygne",
  images: {
    male: "assets/exercices/exercice_homme_pasducygne.webp",
    female: "assets/exercices/femme_default.webp"
  },
  unit: "sec",
  defaultValue: 45,
  min: 30,
  step: 15,
  xpPerUnit: 0.22,
  stat: "Cardio doux / coordination",
  pose: "walk",
  hasTimer: true,
  description: "Marche lentement en posant chaque pied avec précision, comme sur une ligne imaginaire. Accompagne chaque pas d’un mouvement fluide des bras, ouverts puis légèrement refermés devant toi.",
  shortDescription: "Marche fluide avec mouvement doux des bras.",
  coachTip: "Cherche la fluidité plutôt que la vitesse."
},
{
  id: "arabesque_simplified",
  categoryId: "strength",
  title: "Arabesque simplifiée",
  images: {
    male: "assets/exercices/exercice_homme_arabesquesimplifiee.webp",
    female: "assets/exercices/femme_default.webp"
  },
  unit: "sec",
  defaultValue: 40,
  min: 20,
  step: 10,
  xpPerUnit: 0.3,
  stat: "Équilibre / posture",
  pose: "core",
  hasTimer: true,
  description: "Place une main sur le dossier d'une chaise stable. Tiens-toi droit sur la jambe d'appui, genou souple. Glisse l'autre pied vers l'arrière, pointe au sol, puis soulève-le de quelques centimètres seulement si l'équilibre reste confortable. Allonge la jambe derrière sans cambrer les lombaires ni basculer le bassin. Reviens lentement et change de côté. Variante débutant : garder les orteils au sol pendant tout le mouvement.",
  shortDescription: "Jambe allongée derrière, pointe au sol ou légèrement levée, avec appui.",
  coachTip: "Bassin stable, dos long, jambe basse : la hauteur n'est jamais l'objectif."
},
{
  id: "front_developpe_simplified",
  categoryId: "strength",
  title: "Développé avant simplifié",
  images: {
    male: "assets/exercices/exercice_homme_developpeavantsimplifie.webp",
    female: "assets/exercices/femme_default.webp"
  },
  unit: "répétitions",
  defaultValue: 16,
  min: 8,
  step: 2,
  xpPerUnit: 1,
  stat: "Jambes / contrôle",
  pose: "squats",
  description: "Monte un genou devant toi jusqu’à environ la hauteur de la hanche. Tends ensuite lentement la jambe vers l’avant avant de revenir doucement à la position de départ.",
  shortDescription: "Genou levé puis jambe tendue vers l’avant.",
  coachTip: "Pas d’élan. Le mouvement doit rester contrôlé."
},
{
  id: "court_bow",
  categoryId: "mobility",
  title: "Révérence de la Cour",
  images: {
    male: "assets/exercices/exercice_homme_reverencedelacour.webp",
    female: "assets/exercices/femme_default.webp"
  },
  unit: "répétitions",
  defaultValue: 8,
  min: 4,
  step: 1,
  xpPerUnit: 0.8,
  stat: "Mobilité / coordination",
  pose: "stretch",
  description: "Place un pied légèrement derrière l’autre. Fléchis doucement les deux genoux en inclinant légèrement le buste, puis ouvre élégamment les bras avant de revenir à la position de départ.",
  shortDescription: "Petite révérence lente et fluide.",
  coachTip: "Buste long, descente douce, bras souples."
},
{
  id: "dancer_sway",
  categoryId: "mobility",
  title: "Balancé du danseur",
  images: {
    male: "assets/exercices/exercice_homme_dancer_sway.webp",
    female: "assets/exercices/exercice_femme_dancer_sway.webp"
  },
  unit: "sec",
  defaultValue: 45,
  min: 30,
  step: 15,
  xpPerUnit: 0.2,
  stat: "Coordination / mobilité",
  pose: "walk",
  hasTimer: true,
  description: "Transfère doucement le poids du corps d’une jambe à l’autre en accompagnant le mouvement avec les bras.",
  shortDescription: "Transfert de poids fluide d’un côté à l’autre.",
  coachTip: "Bouge comme une vague calme, pas comme une porte qui grince."
},
{
  id: "passe_simplified",
  categoryId: "strength",
  title: "Retiré bas (préparation au passé)",
  images: {
    male: "assets/exercices/exercice_homme_passe_simplified.webp",
    female: "assets/exercices/exercice_femme_passe_simplified.webp"
  },
  unit: "sec",
  defaultValue: 40,
  min: 20,
  step: 10,
  xpPerUnit: 0.3,
  stat: "Équilibre",
  pose: "core",
  hasTimer: true,
  description: "Près d'une chaise stable, répartis d'abord le poids sur les deux pieds. Transfère-le progressivement sur la jambe d'appui puis fais glisser la pointe de l'autre pied jusqu'à la cheville de la jambe porteuse, sans pousser sur son genou. Garde le bassin de face, la colonne allongée et le regard fixe. Maintiens quelques secondes, repose le pied et change de côté. Variante débutant : pointe du pied mobile au sol et main en appui. Le passé désigne le passage du pied ; ici on apprend surtout la position basse du retiré.",
  shortDescription: "Équilibre assisté, pointe du pied près de la cheville.",
  coachTip: "Ne pose pas le pied contre le genou et ne force pas l'ouverture de la hanche."
},
{
  id: "ballet_sequence",
  categoryId: "cardio",
  title: "Petit enchaînement de ballet",
  images: {
    male: "assets/exercices/exercice_homme_ballet_sequence.webp",
    female: "assets/exercices/exercice_femme_ballet_sequence.webp"
  },
  unit: "tours",
  defaultValue: 3,
  min: 1,
  step: 1,
  xpPerUnit: 4,
  stat: "Coordination / danse",
  pose: "walk",
  description: "Enchaîne lentement : demi-plié, montée sur pointes, pas du cygne, passé simplifié, arabesque simplifiée puis révérence.",
  shortDescription: "Mini chorégraphie douce avec les mouvements appris.",
  coachTip: "Garde le rythme lent. Ce n’est pas une course, c’est une variation."
},
    {
      "id": "single_leg_balance",
      "categoryId": "strength",
      "title": "Équilibre sur une jambe",
      "images": {
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_equilibresurunejambe.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_monteessurpointes.webp"
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
        "male": "assets/exercices/exercice_homme_chair_squat.webp",
        "female": "assets/exercices/exercice_femme_squatchaise.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_squats.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_squatchaise.webp"
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
        "male": "assets/exercices/exercice_homme_assisted_reverse_lunges.webp",
        "female": "assets/exercices/exercice_femme_fentesarriereassistees.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_fentesarriere.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_monteessurpointes.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_pontdehanches.webp"
      },
      "unit": "répétitions",
      "defaultValue": 12,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Fessiers",
      "pose": "core",
      "description": "Allongez-vous sur le dos, pliez les genoux et gardez les pieds à plat au sol. Poussez sur vos talons pour lever le bassin vers le haut. Serrez les fesses en haut pour former une ligne droite des genoux aux épaules."
    },
    {
      "id": "single_leg_bridge_alternate",
      "categoryId": "strength",
      "title": "Pont de hanches une jambe alternée",
      "images": {
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_pontdehanchessurunejambealternee.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_superman.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_pompesmurales.webp"
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
        "male": "assets/exercices/exercice_homme_pompesinclinees.webp",
        "female": "assets/exercices/exercice_femme_pompeinclinees.jpg"
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
        "male": "assets/exercices/exercice_homme_pushups.webp",
        "female": "assets/exercices/exercice_femme_pushups.webp"
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
        "male": "assets/exercices/exercice_homme_curlbiceps.webp",
        "female": "assets/exercices/exercice_femme_curlbiceps.webp"
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
        "male": "assets/exercices/exercice_homme_curlmarteau.webp",
        "female": "assets/exercices/exercice_femme_curlmarteau.webp"
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
        "male": "assets/exercices/exercice_homme_elevationlaterales.webp",
        "female": "assets/exercices/exercice_femme_elevationslaterales.webp"
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
        "male": "assets/exercices/exercice_homme_elevatiosnfrontales.webp",
        "female": "assets/exercices/exercice_femme_elevationsfrontales.webp"
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
        "male": "assets/exercices/exercice_homme_kickbacktriceps.webp",
        "female": "assets/exercices/exercice_femme_kickbacktriceps.webp"
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
        "male": "assets/exercices/exercice_homme_developpeepaules.webp",
        "female": "assets/exercices/exercice_femme_developpeepaules.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_extensiontricepscontreunmur.webp"
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
        "male": "assets/exercices/exercice_homme_tapsepaules.webp",
        "female": "assets/exercices/exercice_femme_tapsepaulesappuiincline.jpg"
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
        "male": "assets/exercices/exercice_homme_planche.webp",
        "female": "assets/exercices/exercice_femme_plancheclassique.webp"
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
        "male": "assets/exercices/exercice_homme_planchesurlesgenoux.webp",
        "female": "assets/exercices/exercice_femme_planchesurlesgenoux.jpg"
      },
      "unit": "sec",
      "defaultValue": 20,
      "min": 10,
      "step": 5,
      "xpPerUnit": 0.22,
      "stat": "Stabilité",
      "pose": "core",
      "hasTimer": true,
      "description": "Placez vos avant-bras et vos genoux au sol. Alignez vos coudes sous vos épaules. Rentrez le ventre, aspirez le nombril et contractez les fesses pour garder le dos bien droit, sans creuser les lombaires."
    },
    {
      "id": "bird_dog",
      "categoryId": "strength",
      "title": "Bird Dog",
      "images": {
        "male": "assets/exercices/exercice_homme_birddog.webp",
        "female": "assets/exercices/exercice_femme_birdog.webp"
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
        "male": "assets/exercices/exercice_homme_gainagelateralgenoux.webp",
        "female": "assets/exercices/exercice_femme_gainagelateralgenoux.webp"
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
        "male": "assets/exercices/exercice_homme_gainagelateral.webp",
        "female": "assets/exercices/exercice_femme_gainagelateral.webp"
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
        "male": "assets/exercices/exercice_homme_deadbugcomplet.webp",
        "female": "assets/exercices/exercice_femme_deadbugcomplet.webp"
      },
      "unit": "répétitions",
      "defaultValue": 20,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1,
      "stat": "Gainage",
      "pose": "core",
      "description": "Allonge-toi sur le dos, bras tendus vers le plafond et genoux fléchis à 90°. Tends lentement une jambe devant toi tout en abaissant le bras opposé derrière la tête. Reviens à la position de départ puis alterne de l'autre côté.",
      
      "coachTip": "Garde les lombaires plaquées au sol."
    },
    {
      "id": "dead_bug_simplified",
      "categoryId": "strength",
      "title": "Dead bug simplifié",
      "images": {
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_deadbugsimplifie.webp"
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
        "male": "assets/exercices/exercice_homme_basculebassinausol.webp",
        "female": "assets/exercices/exercice_femme_basculedubassinausol.webp"
      },
      "unit": "répétitions",
      "defaultValue": 10,
      "min": 2,
      "step": 2,
      "xpPerUnit": 0.8,
      "stat": "Activation abdos",
      "pose": "core",
      "description": "Creusez le bas du dos comme pour passer votre main sous celui-ci, sans décoller les fesses. Puis écrasez le bas du dos sur le sol."
    },
    {
      "id": "pelvic_lift_floor",
      "categoryId": "strength",
      "title": "Relevé de bassin contrôlé",
      "images": {
        "male": "assets/exercices/exercice_homme_relevedebassin.webp",
        "female": "assets/exercices/exercice_femme_relevedebassinausol.webp"
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
        "male": "assets/exercices/exercice_homme_crunchcontrole.webp",
        "female": "assets/exercices/exercice_femme_crunchcontrole.webp"
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
        "male": "assets/exercices/exercice_homme_hollowholdsimplifie.webp",
        "female": "assets/exercices/exercice_femme_hollowholdsimplifie.webp"
      },
      "unit": "sec",
      "defaultValue": 45,
      "min": 10,
      "step": 5,
      "xpPerUnit": 0.4,
      "stat": "Finisher abdos",
      "pose": "core",
      "hasTimer": true,
      "description": "Allongé sur le dos, Contracte les abdominaux pour plaquer les lombaires au sol. Décolle légèrement les épaules et les jambes en gardant les bras le long du corps ou tendus devant toi. Maintiens la position pendant toute la durée.",
      "shortDescription": "Sur le dos, décolle bras et jambes.",
      "coachTip": "Les lombaires restent toujours en contact avec le sol."
    },
    {
  "id": "the_hundred",
  "categoryId": "pilates",
  "title": "The Hundred",
  "images": {
    "male": "assets/exercices/homme_default.webp",
    "female": "assets/exercices/femme_default.webp"
  },
  "unit": "cycles respiratoires",
  "defaultValue": 10,
  "min": 1,
  "step": 1,
  "xpPerUnit": 1,
  "stat": "Abdominaux / respiration / échauffement global",
  "pose": "core",
  "description": "Allongé sur le dos, tête et épaules relevées. Les bras tendus le long du corps effectuent de petites pulsations : 5 battements sur l’inspiration, 5 sur l’expiration, ×10. Le placement des jambes dépend de la version choisie. Après la série, récupérez 30 secondes allongé sur le dos, les bras le long du corps, les jambes tendues avec les pieds joints.",
  "shortDescription": "100 petites pulsations des bras coordonnées à la respiration.",
  "coachTip": "Gardez les lombaires et le milieu du dos plaqués contre le sol. Il ne faut absolument pas cambrer durant tout le maintien de la posture.",
  "keywords": ["Abdominaux", "respiration", "échauffement global"],
  "recoverySeconds": 30,
  "difficultyVariants": [
    { "version": 1, "label": "Version 1", "description": "Jambes fléchies avec pieds à hauteur des genoux, talons et genoux en contact l’un contre l’autre." },
    { "version": 2, "label": "Version 2", "description": "Jambes tendues à la verticale, talons en contact l’un contre l’autre." },
    { "version": 3, "label": "Version 3", "description": "Jambes fléchies avec pointes des pieds à quelques centimètres du sol (angle de flexion de 90° au niveau des genoux), talons et genoux en contact l’un contre l’autre." },
    { "version": 4, "label": "Version 4", "description": "Jambes tendues inclinées à 45° environ, talons en contact l’un contre l’autre." },
    { "version": 5, "label": "Version 5", "description": "Jambes tendues avec pieds à hauteur du visage (ou plus bas si vous pouvez), talons en contact l’un contre l’autre." }
  ]
},
{
  "id": "swimming",
  "categoryId": "pilates",
  "title": "Swimming",
  "images": {
    "male": "assets/exercices/homme_default.webp",
    "female": "assets/exercices/femme_default.webp"
  },
  "unit": "sec",
  "defaultValue": 20,
  "min": 10,
  "step": 5,
  "xpPerUnit": 0.35,
  "stat": "Dos / centre",
  "pose": "core",
  "hasTimer": true,
  "description": "Allongé sur le ventre, alterne bras et jambes opposés comme si tu nageais doucement.",
  "shortDescription": "Nage au sol, bras et jambes alternés.",
  "coachTip": "Garde le mouvement petit et contrôlé, sans cambrer brutalement."
},
{
  "id": "toe_taps",
  "categoryId": "pilates",
  "title": "Toe Taps",
  "images": {
    "male": "assets/exercices/homme_default.webp",
    "female": "assets/exercices/femme_default.webp"
  },
  "unit": "répétitions",
  "defaultValue": 20,
  "min": 2,
  "step": 2,
  "xpPerUnit": 1,
  "stat": "Abdos profonds",
  "pose": "core",
  "description": "Allongé sur le dos, genoux levés à 90°, touche le sol avec une pointe de pied puis remonte.",
  "shortDescription": "Pointe de pied au sol depuis la position jambes levées.",
  "coachTip": "Le bas du dos reste stable. La lenteur vaut de l’or."
},
{
  "id": "side_leg_lift",
  "categoryId": "pilates",
  "title": "Side Leg Lift",
  "images": {
    "male": "assets/exercices/homme_default.webp",
    "female": "assets/exercices/femme_default.webp"
  },
  "unit": "répétitions",
  "defaultValue": 24,
  "min": 2,
  "step": 2,
  "xpPerUnit": 1,
  "stat": "Hanches / stabilité",
  "pose": "core",
  "description": "Allongé sur le côté, lève la jambe supérieure puis redescends lentement.",
  "shortDescription": "Élévation latérale de jambe.",
  "coachTip": "Bassin stable, mouvement propre, pas de coup de fouet."
},
{
  "id": "roll_up_simplified",
  "categoryId": "pilates",
  "title": "Roll Up simplifié",
  "images": {
    "male": "assets/exercices/homme_default.webp",
    "female": "assets/exercices/femme_default.webp"
  },
  "unit": "répétitions",
  "defaultValue": 10,
  "min": 1,
  "step": 1,
  "xpPerUnit": 1.2,
  "stat": "Centre / mobilité",
  "pose": "core",
  "description": "Allongé sur le dos, remonte progressivement le buste avec contrôle, puis redescends lentement.",
  "shortDescription": "Remontée contrôlée du buste.",
  "coachTip": "Monte vertèbre après vertèbre. Pas d’élan, pas de lutte héroïque inutile."
},
    {
  id: "bicycle_crunch",
  categoryId: "strength",
  title: "Crunch vélo",
  images: {
    male: "assets/exercices/exercice_homme_bicycle_crunch.webp",
    female: "assets/exercices/exercice_femme_bicycle_crunch.webp"
  },
  unit: "répétitions",
  defaultValue: 20,
  min: 8,
  step: 2,
  xpPerUnit: 1,
  stat: "Abdominaux / obliques",
  pose: "core",
  description: "Allongé sur le dos, ramène un genou vers la poitrine pendant que le coude opposé s’en approche. Alterne les côtés lentement, sans tirer sur la nuque.",
  shortDescription: "Genou et coude opposés en alternance.",
  coachTip: "Contrôle le mouvement. Les obliques travaillent, la nuque reste tranquille."
},
{
  id: "plank_shoulder_taps",
  categoryId: "strength",
  title: "Planche avec toucher d’épaule",
  images: {
    male: "assets/exercices/exercice_homme_plank_shoulder_taps.webp",
    female: "assets/exercices/exercice_femme_plank_shoulder_taps.webp"
  },
  unit: "répétitions",
  defaultValue: 20,
  min: 8,
  step: 2,
  xpPerUnit: 1.1,
  stat: "Gainage / anti-rotation",
  pose: "core",
  description: "Place-toi en position de planche sur les mains. Sans laisser les hanches bouger, décolle une main pour toucher l’épaule opposée puis repose-la au sol. Alterne les côtés.",
  shortDescription: "En planche haute, touche l’épaule opposée.",
  coachTip: "Écarte légèrement les pieds et garde le bassin stable."
},
{
  id: "dynamic_plank",
  categoryId: "strength",
  title: "Planche dynamique",
  images: {
    male: "assets/exercices/exercice_homme_dynamic_plank.webp",
    female: "assets/exercices/exercice_femme_dynamic_plank.webp"
  },
  unit: "répétitions",
  defaultValue: 10,
  min: 4,
  step: 1,
  xpPerUnit: 1.4,
  stat: "Gainage dynamique",
  pose: "core",
  description: "Commence en planche sur les avant-bras. Monte lentement sur une main puis sur l’autre jusqu’à être en planche haute. Redescends ensuite un avant-bras puis l’autre pour revenir à la position de départ. Alterne le bras qui commence le mouvement.",
  shortDescription: "Avant-bras vers mains, puis retour en planche.",
  coachTip: "Monte et descends lentement. Les hanches ne doivent pas danser la gigue."
},
    {
      "id": "single_leg_stretch",
      "categoryId": "pilates",
      "title": "Single Leg Stretch",
      "images": {
        "male": "assets/exercices/exercice_homme_single_leg_stretch.webp",
        "female": "assets/exercices/exercice_femme_single_leg_stretch.webp"
      },
      "unit": "répétitions",
      "defaultValue": 16,
      "min": 4,
      "step": 2,
      "xpPerUnit": 1.1,
      "stat": "Centre / coordination",
      "pose": "core",
      "description": "Allongé sur le dos, ramène un genou vers la poitrine pendant que l’autre jambe s’allonge. Alterne lentement les côtés en gardant le bassin stable.",
      "shortDescription": "Alterne une jambe pliée et une jambe allongée.",
      "coachTip": "Le ventre reste engagé. La jambe qui s’allonge part loin sans creuser le dos."
    },
    {
      "id": "double_leg_stretch",
      "categoryId": "pilates",
      "title": "Double Leg Stretch",
      "images": {
        "male": "assets/exercices/exercice_homme_double_leg_stretch.webp",
        "female": "assets/exercices/exercice_femme_double_leg_stretch.webp"
      },
      "unit": "répétitions",
      "defaultValue": 10,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1.2,
      "stat": "Centre / leviers longs",
      "pose": "core",
      "description": "Allongé sur le dos, regroupe les genoux vers la poitrine puis tends bras et jambes simultanément avant de revenir au point de départ.",
      "shortDescription": "Bras et jambes s’allongent puis reviennent ensemble.",
      "coachTip": "Ne tends les jambes que si les lombaires restent stables et plaquées."
    },
    {
      "id": "roll_up_full",
      "categoryId": "pilates",
      "title": "Roll Up complet",
      "images": {
        "male": "assets/exercices/exercice_homme_roll_up_simplifie.webp",
        "female": "assets/exercices/exercice_femme_roll_up_simplifie.webp"
      },
      "unit": "répétitions",
      "defaultValue": 6,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1.4,
      "stat": "Centre / articulation du rachis",
      "pose": "core",
      "description": "Allongé sur le dos, décolle les bras puis enroule la colonne vertèbre après vertèbre pour venir t’asseoir avant de redescendre avec contrôle.",
      "shortDescription": "Enroule la colonne pour monter puis redescendre lentement.",
      "coachTip": "Cherche la fluidité. Monte sans élan et redescends aussi lentement que possible."
    },
    {
      "id": "criss_cross",
      "categoryId": "pilates",
      "title": "Criss Cross",
      "images": {
        "male": "assets/exercices/exercice_homme_criss_cross.webp",
        "female": "assets/exercices/exercice_femme_criss_cross.webp"
      },
      "unit": "répétitions",
      "defaultValue": 16,
      "min": 4,
      "step": 2,
      "xpPerUnit": 1.2,
      "stat": "Obliques / rotation",
      "pose": "core",
      "description": "Allongé sur le dos, mains derrière la tête, rapproche le coude opposé d’un genou pendant que l’autre jambe s’allonge. Alterne les côtés avec contrôle.",
      "shortDescription": "Rotation contrôlée coude-genou opposés.",
      "coachTip": "La rotation vient du buste, pas d’un tirage sur la nuque."
    },
    {
      "id": "scissors",
      "categoryId": "pilates",
      "title": "Scissors",
      "images": {
        "male": "assets/exercices/exercice_homme_scissors.webp",
        "female": "assets/exercices/exercice_femme_scissors.webp"
      },
      "unit": "répétitions",
      "defaultValue": 16,
      "min": 4,
      "step": 2,
      "xpPerUnit": 1.2,
      "stat": "Abdos / contrôle jambes tendues",
      "pose": "core",
      "description": "Allongé sur le dos, une jambe tendue monte vers le plafond pendant que l’autre s’abaisse sans toucher le sol. Alterne lentement les deux jambes.",
      "shortDescription": "Alternance de jambes tendues en ciseaux.",
      "coachTip": "Garde le bassin immobile et baisse la jambe seulement si le dos reste stable."
    },
    {
      "id": "double_straight_leg_lower_lift",
      "categoryId": "pilates",
      "title": "Double Straight Leg Lower & Lift",
      "images": {
        "male": "assets/exercices/exercice_homme_double_straight_leg_lower_lift.webp",
        "female": "assets/exercices/exercice_femme_double_straight_leg_lower_lift.webp"
      },
      "unit": "répétitions",
      "defaultValue": 6,
      "min": 2,
      "step": 1,
      "xpPerUnit": 1.4,
      "stat": "Centre / leviers longs",
      "pose": "core",
      "description": "Allongé sur le dos, abaisse les deux jambes tendues jusqu’au point où le bas du dos reste stable, puis remonte-les avec contrôle.",
      "shortDescription": "Deux jambes tendues qui s’abaissent puis remontent.",
      "coachTip": "Amplitude courte au début. Si le dos se cambre, remonte immédiatement."
    },
    {
      "id": "leg_pull_front",
      "categoryId": "pilates",
      "title": "Leg Pull Front",
      "images": {
        "male": "assets/exercices/exercice_homme_leg_pull_front.webp",
        "female": "assets/exercices/exercice_femme_leg_pull_front.webp"
      },
      "unit": "répétitions",
      "defaultValue": 8,
      "min": 2,
      "step": 2,
      "xpPerUnit": 1.4,
      "stat": "Gainage / épaules / fessiers",
      "pose": "core",
      "description": "En planche bras tendus, lève une jambe de quelques centimètres sans laisser le bassin tourner, puis repose-la et alterne.",
      "shortDescription": "En planche haute, lève une jambe en gardant le bassin stable.",
      "coachTip": "Pousse fort dans le sol et serre les fesses pour éviter l’affaissement."
    },
    {
      "id": "teaser_i",
      "categoryId": "pilates",
      "title": "Teaser I",
      "images": {
        "male": "assets/exercices/exercice_homme_teaser_i.webp",
        "female": "assets/exercices/exercice_femme_teaser_i.webp"
      },
      "unit": "répétitions",
      "defaultValue": 5,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1.8,
      "stat": "Équilibre / centre / coordination",
      "pose": "core",
      "description": "Depuis la position allongée, enroule la colonne pour venir en équilibre assis avec les jambes levées et les bras tendus vers l’avant, puis redescends lentement.",
      "shortDescription": "Monte en équilibre assis, jambes levées, puis redescends avec contrôle.",
      "coachTip": "Reste petit si besoin. L’objectif est la maîtrise, pas la hauteur des jambes."
    },
    {
      "id": "pilates",
      "categoryId": "pilates",
      "title": "Pilates",
      "images": {
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_pilates.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_chatvache.webp"
      },
      "unit": "min",
      "defaultValue": 1,
      "min": 1,
      "step": 1,
      "xpPerUnit": 2,
      "stat": "Mobilité",
      "pose": "stretch",
      "hasTimer": true,
      "description": "Inspirez en creusant le bas du dos, en poussant le ventre vers le sol et en ouvrant la poitrine vers l'avant tout en levant la tête. Expirez en rentrant le ventre, en arrondissant le haut et le milieu du dos vers le plafond, et en relâchant la tête vers le sol."
    },
    {
      "id": "hip_circles",
      "categoryId": "mobility",
      "title": "Cercles de hanches",
      "images": {
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_cerclesdehanches.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_rotationthoracique.webp"
      },
      "unit": "min",
      "defaultValue": 1,
      "min": 1,
      "step": 1,
      "xpPerUnit": 2,
      "stat": "Mobilité",
      "pose": "stretch",
      "hasTimer": true,
      "description": "Pour le réaliser, tenez-vous droit avec les pieds écartés, et pivotez lentement le buste d'un côté puis de l'autre en gardant le bassin stable."
    },
    {
      "id": "abdominal_breathing",
      "categoryId": "mobility",
      "title": "Respiration abdominale",
      "images": {
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_respirationabdominalecontrolee.webp"
      },
      "unit": "min",
      "defaultValue": 1,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Respiration / posture",
      "pose": "core",
      "hasTimer": true,
      "description": "Inspirez lentement par le nez. Sentez votre ventre se gonfler. La main sur la poitrine doit bouger le moins possible. Soufflez doucement par la bouche ou le nez en rentrant le ventre."
    },
    {
      "id": "slow_breathing",
      "categoryId": "stretch",
      "title": "Respiration profonde",
      "images": {
        "male": "assets/exercices/exercice_homme_respirationfinale.webp",
        "female": "assets/exercices/exercice_femme_respirationfinale.webp"
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
        "male": "assets/exercices/homme_default.webp",
        "female": "assets/exercices/exercice_femme_respirationfinale.webp"
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
        "male": "assets/exercices/exercice_homme_etirementcuissesmollets.webp",
        "female": "assets/exercices/exercice_femme_etirementcuissesmollets.webp"
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
        "male": "assets/exercices/exercice_homme_etirementhanchesquadriceps.webp",
        "female": "assets/exercices/exercice_femme_etirementhanchesquadriceps.webp"
      },
      "unit": "min",
      "defaultValue": 3,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Récupération",
      "pose": "stretch",
      "hasTimer": true,
      "description": "Gardez le dos bien droit et avancez doucement le bassin vers l'avant jusqu'à sentir une tension à l'avant de la hanche."
    },
    {
      "id": "gentle_back_stretch",
      "categoryId": "stretch",
      "title": "Étirement doux du dos",
      "images": {
        "male": "assets/exercices/exercice_homme_etirementdouxdudos.webp",
        "female": "assets/exercices/exercice_femme_etirementdouxdudos.webp"
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
        "male": "assets/exercices/exercice_homme_etirementepaulesbras.webp",
        "female": "assets/exercices/exercice_femme_etirementsepaulesbras.webp"
      },
      "unit": "min",
      "defaultValue": 2,
      "min": 1,
      "step": 1,
      "xpPerUnit": 1,
      "stat": "Retour au calme",
      "pose": "stretch",
      "hasTimer": true,
      "description": "Passez un bras devant vous, au-dessus de l'épaule opposée, puis placez votre main sur le coude et exercez une pression vers vous."
    },
    {
      "id": "advanced_standard_warmup",
      "categoryId": "warmup",
      "title": "Échauffement standard avancé",
      "images": {
        "homme": "assets/exercices/exercice_homme_advanced_standard_warmup.webp",
        "femme": "assets/exercices/exercice_femme_advanced_standard_warmup.webp",
        "male": "assets/exercices/exercice_homme_advanced_standard_warmup.webp",
        "female": "assets/exercices/exercice_femme_advanced_standard_warmup.webp"
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
        "homme": "assets/exercices/exercice_homme_advanced_standard_cooldown.webp",
        "femme": "assets/exercices/exercice_femme_advanced_standard_cooldown.webp",
        "male": "assets/exercices/exercice_homme_advanced_standard_cooldown.webp",
        "female": "assets/exercices/exercice_femme_advanced_standard_cooldown.webp"
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
      "categoryId": "muscle",
      "title": "Goblet Squat",
      "images": {
        "homme": "assets/exercices/exercice_homme_goblet_squat.webp",
        "femme": "assets/exercices/exercice_femme_goblet_squat.webp",
        "male": "assets/exercices/exercice_homme_goblet_squat.webp",
        "female": "assets/exercices/exercice_femme_goblet_squat.webp"
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
        "homme": "assets/exercices/exercice_homme_bench_press.webp",
        "femme": "assets/exercices/exercice_femme_bench_press.webp",
        "male": "assets/exercices/exercice_homme_bench_press.webp",
        "female": "assets/exercices/exercice_femme_bench_press.webp"
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
        "homme": "assets/exercices/exercice_homme_resistance_band_row.webp",
        "femme": "assets/exercices/exercice_femme_resistance_band_row.webp",
        "male": "assets/exercices/exercice_homme_resistance_band_row.webp",
        "female": "assets/exercices/exercice_femme_resistance_band_row.webp"
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
      "categoryId": "muscle",
      "title": "Swing kettlebell",
      "images": {
        "homme": "assets/exercices/exercice_homme_kettlebell_swing.webp",
        "femme": "assets/exercices/exercice_femme_kettlebell_swing.webp",
        "male": "assets/exercices/exercice_homme_kettlebell_swing.webp",
        "female": "assets/exercices/exercice_femme_kettlebell_swing.webp"
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
        "homme": "assets/exercices/exercice_homme_kettlebell_military_press.webp",
        "femme": "assets/exercices/exercice_femme_kettlebell_military_press.webp",
        "male": "assets/exercices/exercice_homme_kettlebell_military_press.webp",
        "female": "assets/exercices/exercice_femme_kettlebell_military_press.webp"
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
      "categoryId": "muscle",
      "title": "Soulevé de terre kettlebell",
      "images": {
        "homme": "assets/exercices/exercice_homme_kettlebell_deadlift.webp",
        "femme": "assets/exercices/exercice_femme_kettlebell_deadlift.webp",
        "male": "assets/exercices/exercice_homme_kettlebell_deadlift.webp",
        "female": "assets/exercices/exercice_femme_kettlebell_deadlift.webp"
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
      "categoryId": "muscle",
      "title": "Turkish Get-Up",
      "images": {
        "homme": "assets/exercices/exercice_homme_turkish_get_up.webp",
        "femme": "assets/exercices/exercice_femme_turkish_get_up.webp",
        "male": "assets/exercices/exercice_homme_turkish_get_up.webp",
        "female": "assets/exercices/exercice_femme_turkish_get_up.webp"
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
        "homme": "assets/exercices/exercice_homme_heavy_bag_rounds.webp",
        "femme": "assets/exercices/exercice_femme_heavy_bag_rounds.webp",
        "male": "assets/exercices/exercice_homme_heavy_bag_rounds.webp",
        "female": "assets/exercices/exercice_femme_heavy_bag_rounds.webp"
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
        "homme": "assets/exercices/exercice_homme_walking_lunges.webp",
        "femme": "assets/exercices/exercice_femme_walking_lunges.webp",
        "male": "assets/exercices/exercice_homme_walking_lunges.webp",
        "female": "assets/exercices/exercice_femme_walking_lunges.webp"
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
        "homme": "assets/exercices/exercice_homme_assisted_pullups.webp",
        "femme": "assets/exercices/exercice_femme_assisted_pullups.webp",
        "male": "assets/exercices/exercice_homme_assisted_pullups.webp",
        "female": "assets/exercices/exercice_femme_assisted_pullups.webp"
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
        "homme": "assets/exercices/exercice_homme_pullups_clean_max.webp",
        "femme": "assets/exercices/exercice_femme_pullups_clean_max.webp",
        "male": "assets/exercices/exercice_homme_pullups_clean_max.webp",
        "female": "assets/exercices/exercice_femme_pullups_clean_max.webp"
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
        "homme": "assets/exercices/exercice_homme_face_pull.webp",
        "femme": "assets/exercices/exercice_femme_face_pull.webp",
        "male": "assets/exercices/exercice_homme_face_pull.webp",
        "female": "assets/exercices/exercice_femme_face_pull.webp"
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
        "homme": "assets/exercices/exercice_homme_bike_acceleration.webp",
        "femme": "assets/exercices/exercice_femme_bike_acceleration.webp",
        "male": "assets/exercices/exercice_homme_bike_acceleration.webp",
        "female": "assets/exercices/exercice_femme_bike_acceleration.webp"
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
  "subtitle": "Reprise très progressive pour personne sédentaire, sans prérequis sportif.",
  "unlockLevel": 1,
  "duration": "10 à 25 min selon la semaine (pauses incluses, estimation)",
  "frequency": "3 séances essentielles par semaine · 4 semaines, rythme adaptable",
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
      "progression": "Découvrir des mouvements simples, avec appui et pauses à volonté.",
      "days": [
        {
          "day": 1,
          "title": "Réveil du Corps",
          "xp": 50,
          "difficultyLabel": "≈ 10–12 min",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Mobilité",
              "exerciseId": "arm_circles",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Mobilité",
              "exerciseId": "hip_circles",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Jambes",
              "exerciseId": "chair_squat",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Cardio doux",
              "exerciseId": "slow_knee_raises",
              "amount": 12,
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
          "title": "Fondation du Héros",
          "xp": 50,
          "difficultyLabel": "≈ 10–12 min",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Haut du corps",
              "exerciseId": "wall_pushups",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Jambes",
              "exerciseId": "chair_squat",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Coordination",
              "exerciseId": "bird_dog",
              "amount": 8,
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
          "title": "Endurance de l’Aventurier",
          "xp": 50,
          "difficultyLabel": "≈ 11–14 min",
          "exercises": [
            {
              "phase": "Endurance",
              "exerciseId": "walk",
              "amount": 8,
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
              "amount": 2,
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
      "progression": "Consolider les gestes, augmenter légèrement la marche et les répétitions.",
      "days": [
        {
          "day": 1,
          "title": "Réveil du Corps",
          "xp": 60,
          "difficultyLabel": "≈ 12–15 min",
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
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Mobilité",
              "exerciseId": "hip_circles",
              "amount": 12,
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
              "amount": 16,
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
          "title": "Fondation du Héros",
          "xp": 60,
          "difficultyLabel": "≈ 12–15 min",
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
              "exerciseId": "chair_squat",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Coordination",
              "exerciseId": "bird_dog",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Gainage doux",
              "exerciseId": "wall_sit",
              "amount": 10,
              "unit": "sec"
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
          "title": "Endurance de l’Aventurier",
          "xp": 60,
          "difficultyLabel": "≈ 15–18 min",
          "exercises": [
            {
              "phase": "Endurance",
              "exerciseId": "walk",
              "amount": 12,
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
              "amount": 2,
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
      "progression": "Introduire un second petit tour de renforcement, sans mouvement technique nouveau.",
      "days": [
        {
          "day": 1,
          "title": "Réveil du Corps",
          "xp": 70,
          "difficultyLabel": "≈ 15–18 min",
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
              "amount": 14,
              "unit": "répétitions"
            },
            {
              "phase": "Jambes · Tour 1",
              "exerciseId": "chair_squat",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Cardio doux · Tour 1",
              "exerciseId": "slow_knee_raises",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Récupération",
              "exerciseId": "march_on_spot",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Jambes · Tour 2",
              "exerciseId": "chair_squat",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Cardio doux · Tour 2",
              "exerciseId": "slow_knee_raises",
              "amount": 12,
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
          "title": "Fondation du Héros",
          "xp": 70,
          "difficultyLabel": "≈ 15–18 min",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "march_on_spot",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Haut du corps · Tour 1",
              "exerciseId": "wall_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Coordination · Tour 1",
              "exerciseId": "bird_dog",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Récupération",
              "exerciseId": "march_on_spot",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Haut du corps · Tour 2",
              "exerciseId": "wall_pushups",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Coordination · Tour 2",
              "exerciseId": "bird_dog",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Stabilité",
              "exerciseId": "wall_sit",
              "amount": 15,
              "unit": "sec"
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
          "title": "Endurance de l’Aventurier",
          "xp": 70,
          "difficultyLabel": "≈ 19–22 min",
          "exercises": [
            {
              "phase": "Endurance",
              "exerciseId": "walk",
              "amount": 16,
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
              "amount": 2,
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
      "progression": "Consolider l'autonomie et la marche confortable, sans obligation de performance.",
      "days": [
        {
          "day": 1,
          "title": "Réveil du Corps",
          "xp": 80,
          "difficultyLabel": "≈ 17–20 min",
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
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Jambes · Tour 1",
              "exerciseId": "chair_squat",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Cardio doux · Tour 1",
              "exerciseId": "slow_knee_raises",
              "amount": 20,
              "unit": "répétitions"
            },
            {
              "phase": "Récupération",
              "exerciseId": "march_on_spot",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Jambes · Tour 2",
              "exerciseId": "chair_squat",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Cardio doux · Tour 2",
              "exerciseId": "slow_knee_raises",
              "amount": 16,
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
          "xp": 80,
          "difficultyLabel": "≈ 17–20 min",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "march_on_spot",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Haut du corps · Tour 1",
              "exerciseId": "wall_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Coordination · Tour 1",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Récupération",
              "exerciseId": "march_on_spot",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Haut du corps · Tour 2",
              "exerciseId": "wall_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Coordination · Tour 2",
              "exerciseId": "bird_dog",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Stabilité",
              "exerciseId": "wall_sit",
              "amount": 20,
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
          "xp": 80,
          "difficultyLabel": "≈ 23–25 min",
          "exercises": [
            {
              "phase": "Endurance",
              "exerciseId": "walk",
              "amount": 20,
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
              "amount": 2,
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
      "difficultyLabel": "Boss semaine 1 · ≈ 7–10 min",
      "instructions": "Débloqué après les 3 séances essentielles de la semaine 1. Circuit unique, pauses libres. Réaliser le défi après récupération suffisante, sans rechercher la vitesse.",
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
          "phase": "Défi doux",
          "exerciseId": "chair_squat",
          "amount": 6,
          "unit": "répétitions"
        },
        {
          "phase": "Défi doux",
          "exerciseId": "wall_pushups",
          "amount": 6,
          "unit": "répétitions"
        },
        {
          "phase": "Défi doux",
          "exerciseId": "slow_knee_raises",
          "amount": 12,
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
      "week": 2,
      "title": "Le Loup Solitaire",
      "xp": 40,
      "badgeId": "loup-solitaire-vaincu",
      "difficultyLabel": "Boss semaine 2 · ≈ 8–11 min",
      "instructions": "Débloqué après les 3 séances essentielles de la semaine 2. Circuit unique, pauses libres. Réaliser le défi après récupération suffisante, sans rechercher la vitesse.",
      "lockedMessage": "Le loup observe les faibles. Termine ta semaine, puis montre-lui qu’il se trompe.",
      "coachLine": "Le loup observe les faibles. Aujourd’hui, montre-lui qu’il se trompe.",
      "exercises": [
        {
          "phase": "Échauffement",
          "exerciseId": "march_on_spot",
          "amount": 2,
          "unit": "min"
        },
        {
          "phase": "Défi doux",
          "exerciseId": "chair_squat",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Défi doux",
          "exerciseId": "wall_pushups",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Défi doux",
          "exerciseId": "bird_dog",
          "amount": 8,
          "unit": "répétitions"
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
          "amount": 2,
          "unit": "min"
        }
      ]
    },
    {
      "week": 3,
      "title": "Le Sanglier des Fourrés",
      "xp": 50,
      "badgeId": "sanglier-fourres-vaincu",
      "difficultyLabel": "Boss semaine 3 · ≈ 9–12 min",
      "instructions": "Débloqué après les 3 séances essentielles de la semaine 3. Circuit unique, pauses libres. Réaliser le défi après récupération suffisante, sans rechercher la vitesse.",
      "lockedMessage": "Le sanglier charge sans réfléchir. Toi, avance avec méthode : termine d’abord ta semaine.",
      "coachLine": "Le sanglier charge sans réfléchir. Toi, tu avances avec méthode.",
      "exercises": [
        {
          "phase": "Échauffement",
          "exerciseId": "march_on_spot",
          "amount": 3,
          "unit": "min"
        },
        {
          "phase": "Défi doux",
          "exerciseId": "chair_squat",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Défi doux",
          "exerciseId": "wall_pushups",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Défi doux",
          "exerciseId": "slow_knee_raises",
          "amount": 16,
          "unit": "répétitions"
        },
        {
          "phase": "Défi doux",
          "exerciseId": "bird_dog",
          "amount": 10,
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
      "difficultyLabel": "Boss final · ≈ 11–15 min",
      "instructions": "Débloqué après les 3 séances essentielles de la semaine 4. Circuit unique, pauses libres. Réaliser le défi après récupération suffisante, sans rechercher la vitesse.",
      "lockedMessage": "L’ogre paraît invincible de loin. Termine ta préparation, puis approche-toi.",
      "coachLine": "L’ogre paraît invincible quand on le regarde de loin. Approche-toi et tu verras qu’il tombe comme les autres.",
      "exercises": [
        {
          "phase": "Échauffement",
          "exerciseId": "march_on_spot",
          "amount": 3,
          "unit": "min"
        },
        {
          "phase": "Défi final",
          "exerciseId": "chair_squat",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Défi final",
          "exerciseId": "wall_pushups",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Défi final",
          "exerciseId": "slow_knee_raises",
          "amount": 20,
          "unit": "répétitions"
        },
        {
          "phase": "Défi final",
          "exerciseId": "bird_dog",
          "amount": 12,
          "unit": "répétitions"
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
    }
  ],
  "progression": [
    "Semaine 1 : découvrir les mouvements et marcher 8 minutes confortablement.",
    "Semaine 2 : augmenter légèrement le volume et marcher 12 minutes.",
    "Semaine 3 : deux petits tours de renforcement, marche de 16 minutes.",
    "Semaine 4 : consolider les acquis, marche de 20 minutes et boss final accessible.",
    "En cas de difficulté, répéter la semaine au lieu de forcer la progression ; cette souplesse doit aussi être prise en charge par la logique de planning.",
    "Chaque boss est un circuit court, sans séries supplémentaires obligatoires.",
    "Récompense : badge Héros Éveillé et coffre après accomplissement du programme."
  ],
  "notes": [
    "Public : personne sédentaire ou en reprise après une longue interruption.",
    "Trois séances essentielles par semaine ; deux séances complémentaires de marche ou mobilité restent facultatives et ne conditionnent pas le boss.",
    "Conserver au moins un jour de récupération entre deux séances de renforcement quand c'est possible.",
    "Marcher à une allure permettant de parler ; fractionner la marche si nécessaire.",
    "Les répétitions sont des repères : réduire l'amplitude ou le nombre si besoin, sans douleur.",
    "Utiliser une chaise stable pour les assis-debout et un mur pour les pompes ; privilégier la technique à la vitesse.",
    "Prévoir de courtes pauses entre les mouvements et davantage selon le ressenti.",
    "Arrêter en cas de douleur thoracique, malaise ou essoufflement inhabituel et demander un avis médical adapté.",
    "Répétition d'une semaine sans pénalité : règle pédagogique validée, à vérifier dans le moteur de progression avant activation."
  ]
},


    "sanctuaire-voyageur": {
  "id": "sanctuaire-voyageur",
  "subtitle": "Routines courtes pour retrouver une mobilité confortable du dos, des épaules et des hanches, sans recherche de performance.",
  "unlockLevel": 1,
  "duration": "5 à 12 min",
  "frequency": "3 routines essentielles par semaine · 2 compléments facultatifs selon l’objectif · rythme adaptable",
  "material": "Aucun matériel obligatoire. Tapis confortable conseillé ; chaise stable possible pour certaines adaptations.",
  "reward": {
    "badgeId": "sanctuaire-serenite-mage",
    "badgeTitle": "Sérénité du Mage",
    "chest": false,
    "nextPrograms": []
  },
  "weeks": [
    {
      "week": 1,
      "title": "Délier les Chaînes",
      "xp": 30,
      "progression": "Découvrir les mouvements dans une amplitude confortable et retrouver une respiration calme ; pauses autorisées.",
      "days": [
        {
          "day": 1,
          "title": "Dos Délié",
          "xp": 30,
          "difficultyLabel": "≈ 6 min",
          "instructions": "Enchaîne lentement les mouvements, à amplitude confortable. Tu peux faire une pause entre chacun. Arrête si la douleur augmente.",
          "exercises": [
            { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Mobilité", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Mobilité", "exerciseId": "thoracic_rotation", "amount": 2, "unit": "min" },
            { "phase": "Étirement", "exerciseId": "gentle_back_stretch", "amount": 1, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        },
        {
          "day": 2,
          "title": "Épaules Légères",
          "xp": 30,
          "difficultyLabel": "≈ 6 min",
          "instructions": "Réalise des cercles de bras de petite amplitude si nécessaire. Épaules basses et respiration libre, sans forcer.",
          "exercises": [
            { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Mobilité épaules", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Mobilité", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Étirement", "exerciseId": "chest_stretch", "amount": 1, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        },
        {
          "day": 3,
          "title": "Hanches Calmes",
          "xp": 30,
          "difficultyLabel": "≈ 7 min",
          "instructions": "Effectue la bascule du bassin puis le pont sans cambrer ni pousser dans la douleur. Fais une pause au besoin ; étire chaque côté progressivement.",
          "exercises": [
            { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Mobilité bassin", "exerciseId": "pelvic_tilt", "amount": 10, "unit": "répétitions" },
            { "phase": "Activation douce", "exerciseId": "bridge", "amount": 10, "unit": "répétitions" },
            { "phase": "Étirement", "exerciseId": "hip_quad_stretch", "amount": 1, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        }
      ]
    },
    {
      "week": 2,
      "title": "Les Chemins Oubliés",
      "xp": 35,
      "progression": "Introduire les roulements d’épaules sans accélérer ; privilégier la fluidité plutôt que la durée.",
      "days": [
        {
          "day": 1,
          "title": "Chemin du Dos",
          "xp": 35,
          "difficultyLabel": "≈ 7 min",
          "instructions": "Nouveau mouvement : roulements des épaules, lents et de faible amplitude. Ne cherche ni la vitesse ni le craquement.",
          "exercises": [
            { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Mobilité épaules", "exerciseId": "shoulder_rolls", "amount": 60, "unit": "sec" },
            { "phase": "Mobilité", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Mobilité", "exerciseId": "thoracic_rotation", "amount": 2, "unit": "min" },
            { "phase": "Étirement", "exerciseId": "gentle_back_stretch", "amount": 1, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        },
        {
          "day": 2,
          "title": "Bassin Paisible",
          "xp": 35,
          "difficultyLabel": "≈ 7 min",
          "instructions": "Mobilise le bassin doucement ; le pont peut rester de faible amplitude. Respire librement et repose-toi si nécessaire.",
          "exercises": [
            { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Mobilité bassin", "exerciseId": "pelvic_tilt", "amount": 10, "unit": "répétitions" },
            { "phase": "Activation douce", "exerciseId": "bridge", "amount": 10, "unit": "répétitions" },
            { "phase": "Étirement", "exerciseId": "hip_quad_stretch", "amount": 1, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 2, "unit": "min" }
          ]
        },
        {
          "day": 3,
          "title": "Haut du Dos",
          "xp": 35,
          "difficultyLabel": "≈ 7 min",
          "instructions": "Épaules, poitrine et mobilité thoracique.",
          "exercises": [
            { "phase": "Mobilité épaules", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Mobilité épaules", "exerciseId": "shoulder_rolls", "amount": 60, "unit": "sec" },
            { "phase": "Étirement", "exerciseId": "chest_stretch", "amount": 1, "unit": "min" },
            { "phase": "Mobilité", "exerciseId": "thoracic_rotation", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 2, "unit": "min" }
          ]
        }
      ]
    },
    {
      "week": 3,
      "title": "Le Souffle des Anciens",
      "xp": 40,
      "progression": "Découvrir la position de l’enfant sans forcer les genoux, le dos ni les épaules ; adapter l’amplitude.",
      "days": [
        {
          "day": 1,
          "title": "Souffle Long",
          "xp": 40,
          "difficultyLabel": "≈ 7 à 8 min",
          "instructions": "Découvre la position de l’enfant, parfois appelée étirement du chat. Ne force pas sur les genoux ou les épaules ; interromps-la si elle est inconfortable.",
          "exercises": [
            { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Mobilité", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Étirement", "exerciseId": "child_pose_stretch", "amount": 1, "unit": "min" },
            { "phase": "Mobilité", "exerciseId": "thoracic_rotation", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 2, "unit": "min" }
          ]
        },
        {
          "day": 2,
          "title": "Chaînes Invisibles",
          "xp": 40,
          "difficultyLabel": "≈ 8 min",
          "instructions": "Tous les mouvements doivent rester lents et contrôlés.",
          "exercises": [
            { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Mobilité épaules", "exerciseId": "shoulder_rolls", "amount": 60, "unit": "sec" },
            { "phase": "Mobilité bassin", "exerciseId": "pelvic_tilt", "amount": 10, "unit": "répétitions" },
            { "phase": "Étirement", "exerciseId": "child_pose_stretch", "amount": 1, "unit": "min" },
            { "phase": "Étirement", "exerciseId": "hip_quad_stretch", "amount": 1, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 2, "unit": "min" }
          ]
        },
        {
          "day": 3,
          "title": "Repos du Mage",
          "xp": 40,
          "difficultyLabel": "≈ 8 min",
          "instructions": "Routine de jour calme : choisis une amplitude très réduite et allonge les pauses si tu es fatigué. Aucune cadence à tenir.",
          "exercises": [
            { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Mobilité", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Mobilité", "exerciseId": "thoracic_rotation", "amount": 2, "unit": "min" },
            { "phase": "Étirement", "exerciseId": "gentle_back_stretch", "amount": 1, "unit": "min" },
            { "phase": "Étirement", "exerciseId": "child_pose_stretch", "amount": 1, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 2, "unit": "min" }
          ]
        }
      ]
    },
    {
      "week": 4,
      "title": "Le Sanctuaire",
      "xp": 45,
      "progression": "Compléter la routine par des rotations cervicales limitées et confortables, sans cercle complet de la tête.",
      "days": [
        {
          "day": 1,
          "title": "Nuque et Épaules",
          "xp": 45,
          "difficultyLabel": "≈ 8 à 10 min",
          "instructions": "Nouveau mouvement : tourner lentement la tête de droite à gauche, sans faire de cercle complet ni basculer la tête en arrière. Reste dans le confort.",
          "exercises": [
            { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Nuque", "exerciseId": "gentle_neck_rotation", "amount": 60, "unit": "sec" },
            { "phase": "Mobilité épaules", "exerciseId": "shoulder_rolls", "amount": 60, "unit": "sec" },
            { "phase": "Mobilité", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Étirement", "exerciseId": "chest_stretch", "amount": 1, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 2, "unit": "min" }
          ]
        },
        {
          "day": 2,
          "title": "Sanctuaire du Dos",
          "xp": 45,
          "difficultyLabel": "≈ 8 à 10 min",
          "instructions": "Routine complète de relâchement.",
          "exercises": [
            { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Nuque", "exerciseId": "gentle_neck_rotation", "amount": 60, "unit": "sec" },
            { "phase": "Mobilité", "exerciseId": "thoracic_rotation", "amount": 2, "unit": "min" },
            { "phase": "Mobilité bassin", "exerciseId": "pelvic_tilt", "amount": 10, "unit": "répétitions" },
            { "phase": "Étirement", "exerciseId": "child_pose_stretch", "amount": 1, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 2, "unit": "min" }
          ]
        },
        {
          "day": 3,
          "title": "Veillée du Mage",
          "xp": 45,
          "difficultyLabel": "≈ 10 min",
          "instructions": "Routine finale de retour au calme, à suivre à son rythme. Si un mouvement gêne, réduis son amplitude ou interromps-le.",
          "exercises": [
            { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Nuque", "exerciseId": "gentle_neck_rotation", "amount": 60, "unit": "sec" },
            { "phase": "Mobilité épaules", "exerciseId": "shoulder_rolls", "amount": 60, "unit": "sec" },
            { "phase": "Mobilité", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Mobilité", "exerciseId": "thoracic_rotation", "amount": 2, "unit": "min" },
            { "phase": "Étirement", "exerciseId": "gentle_back_stretch", "amount": 1, "unit": "min" },
            { "phase": "Étirement", "exerciseId": "child_pose_stretch", "amount": 1, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 2, "unit": "min" }
          ]
        }
      ]
    }
  ],
  "bosses": [
    {
      "week": 1,
      "title": "Le Nœud du Voyageur",
      "xp": 30,
      "badgeId": "sanctuaire-epaules-liberees",
      "difficultyLabel": "Mission douce · routine complète",
      "instructions": "Rituel : parcourir les mouvements tranquillement, avec autant de pauses que nécessaire. Le confort prime sur la continuité.",
      "lockedMessage": "Le nœud attend que tu aies pris le temps de délier ton corps cette semaine.",
      "exercises": [
        { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
        { "phase": "Mobilité", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
        { "phase": "Mobilité", "exerciseId": "thoracic_rotation", "amount": 2, "unit": "min" },
        { "phase": "Étirement", "exerciseId": "gentle_back_stretch", "amount": 1, "unit": "min" },
        { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
      ]
    },
    {
      "week": 2,
      "title": "Le Dos de Pierre",
      "xp": 35,
      "badgeId": "sanctuaire-colonne-assouplie",
      "difficultyLabel": "Mission douce · 10 min",
      "instructions": "Rituel : environ 10 minutes de mobilité douce, pauses incluses. Il n’est pas nécessaire de tenir un chronomètre sans arrêt.",
      "lockedMessage": "Le Dos de Pierre ne se fissure pas sous la force. Il s’assouplit avec patience.",
      "exercises": [
        { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
        { "phase": "Mobilité épaules", "exerciseId": "shoulder_rolls", "amount": 60, "unit": "sec" },
        { "phase": "Mobilité", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
        { "phase": "Mobilité", "exerciseId": "thoracic_rotation", "amount": 2, "unit": "min" },
        { "phase": "Étirement", "exerciseId": "chest_stretch", "amount": 1, "unit": "min" },
        { "phase": "Étirement", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
        { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 2, "unit": "min" }
      ]
    },
    {
      "week": 3,
      "title": "Les Chaînes Invisibles",
      "xp": 40,
      "badgeId": "sanctuaire-souffle-retrouve",
      "difficultyLabel": "Mission douce · contrôle lent",
      "instructions": "Rituel : réaliser des mouvements lents et maîtrisés, sans rechercher d’amplitude maximale. Les pauses sont libres.",
      "lockedMessage": "Les chaînes invisibles se défont lentement. Termine tes routines avant de revenir.",
      "exercises": [
        { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
        { "phase": "Mobilité épaules", "exerciseId": "shoulder_rolls", "amount": 60, "unit": "sec" },
        { "phase": "Mobilité", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
        { "phase": "Étirement", "exerciseId": "child_pose_stretch", "amount": 1, "unit": "min" },
        { "phase": "Mobilité", "exerciseId": "thoracic_rotation", "amount": 2, "unit": "min" },
        { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 2, "unit": "min" }
      ]
    },
    {
      "week": 4,
      "title": "Le Sage du Repos",
      "xp": 50,
      "badgeId": "sanctuaire-serenite-mage",
      "chest": false,
      "difficultyLabel": "Mission finale · récupération complète",
      "instructions": "Rituel final : retrouver les mouvements confortables appris pendant quatre semaines. Arrêter ou adapter au moindre inconfort croissant.",
      "lockedMessage": "Le Sage du Repos n’ouvre son sanctuaire qu’aux voyageurs patients.",
      "exercises": [
        { "phase": "Respiration", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
        { "phase": "Nuque", "exerciseId": "gentle_neck_rotation", "amount": 60, "unit": "sec" },
        { "phase": "Mobilité épaules", "exerciseId": "shoulder_rolls", "amount": 60, "unit": "sec" },
        { "phase": "Mobilité", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
        { "phase": "Mobilité", "exerciseId": "thoracic_rotation", "amount": 2, "unit": "min" },
        { "phase": "Étirement", "exerciseId": "child_pose_stretch", "amount": 1, "unit": "min" },
        { "phase": "Étirement", "exerciseId": "gentle_back_stretch", "amount": 1, "unit": "min" },
        { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 2, "unit": "min" }
      ]
    }
  ],
  "progression": [
    "Semaine 1 : Délier les Chaînes · respirer, mobiliser, relâcher.",
    "Semaine 2 : Les Chemins Oubliés · ajout de l’enroulement des épaules.",
    "Semaine 3 : Le Souffle des Anciens · ajout de l’étirement du chat.",
    "Semaine 4 : Le Sanctuaire · ajout de la rotation cervicale douce.",
    "Programme utilisable librement, surtout les jours de fatigue, de bureau ou de récupération."
  ],
  "notes": [
    "Ce programme est dédié à la mobilité douce et à la récupération, non au renforcement musculaire.",
    "Ce n’est pas du Pilates.",
    "Ce n’est pas du cardio.",
    "Objectif : améliorer le confort de mouvement et favoriser la récupération ; ce programme ne remplace pas une prise en charge médicale.",
    "Les mouvements restent lents, avec une amplitude confortable ; les pauses sont toujours autorisées, y compris pendant les défis.",
    "Arrêter la routine si la douleur augmente ou irradie, si apparaissent des fourmillements, une faiblesse ou des vertiges.",
    "En cas de douleur intense, persistante, nocturne, de traumatisme ou de signe neurologique, demander un avis médical adapté."
  ]
},

    "ballet-sylphes": {
  "id": "ballet-sylphes",
  "subtitle": "Initiation progressive à la danse classique : posture, mobilité, équilibre, coordination et variation finale.",
  "unlockLevel": 1,
  "duration": "15 à 25 min",
  "frequency": "3 séances par semaine + boss le samedi",
  "material": "Chaise stable pour l'appui, espace dégagé et tenue confortable. Ne pas forcer l'en-dehors.",
  "reward": {
    "badgeId": "ballet-reine-sylphes",
    "badgeTitle": "Ballet des Sylphes",
    "chest": true,
    "nextPrograms": [
      "tour-mage",
      "maitre-flux",
      "marche-aventurier"
    ]
  },
  "weeks": [
    {
      "week": 1,
      "title": "Les Premiers Pas",
      "xp": 60,
      "progression": "Posture, positions adaptées, demi-pliés et premiers ports de bras.",
      "days": [
        {
          "title": "L’Éveil de la Sylphe",
          "xp": 60,
          "difficultyLabel": "≈ 15 min",
          "instructions": "Découvrir l'alignement et la première position naturelle. Garder les pieds légèrement ouverts sans chercher un en-dehors forcé. Prendre 20 à 40 secondes de récupération entre les blocs. Ne jamais forcer l'en-dehors ni l'amplitude. Utiliser une chaise stable pour les équilibres.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "walk",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
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
              "phase": "Technique",
              "exerciseId": "demi_plie",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "ballet_preparatory_arms",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "demi_plie",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "second_position_arms",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "thigh_calf_stretch",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ],
          "day": 1
        },
        {
          "title": "Les Bras du Vent",
          "xp": 60,
          "difficultyLabel": "≈ 15 min",
          "instructions": "Coordonner les bras et les jambes sans crisper les épaules. Ouvrir les bras doucement depuis une position préparatoire. Prendre 20 à 40 secondes de récupération entre les blocs. Ne jamais forcer l'en-dehors ni l'amplitude. Utiliser une chaise stable pour les équilibres.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "walk",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
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
              "phase": "Technique",
              "exerciseId": "ballet_preparatory_arms",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "demi_plie",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "calf_raises",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "demi_plie",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "second_position_arms",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "demi_plie",
              "amount": 4,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "thigh_calf_stretch",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ],
          "day": 2
        },
        {
          "title": "Le Premier Envol",
          "xp": 60,
          "difficultyLabel": "≈ 15 min",
          "instructions": "Assembler une première phrase dansée. Phrase : ouvrir les bras, demi-plié, tendre les jambes, pas latéral, revenir au centre. Trois passages. Prendre 20 à 40 secondes de récupération entre les blocs. Ne jamais forcer l'en-dehors ni l'amplitude. Utiliser une chaise stable pour les équilibres.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "walk",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
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
              "phase": "Technique",
              "exerciseId": "demi_plie",
              "amount": 6,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "second_position_arms",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "lateral_steps",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "swan_step",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "swan_step",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "swan_step",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "thigh_calf_stretch",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ],
          "day": 3
        }
      ]
    },
    {
      "week": 2,
      "title": "Le Cygne Prend son Envol",
      "xp": 60,
      "progression": "Déplacements glissés, transferts de poids et équilibre assisté.",
      "days": [
        {
          "title": "Les Pas du Cygne",
          "xp": 60,
          "difficultyLabel": "≈ 18 min",
          "instructions": "Apprendre les déplacements glissés au sol. Sur les pas latéraux, faire glisser le pied au sol comme un dégagé simplifié, quatre fois de chaque côté. Prendre 20 à 40 secondes de récupération entre les blocs. Ne jamais forcer l'en-dehors ni l'amplitude. Utiliser une chaise stable pour les équilibres.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "walk",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
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
              "phase": "Technique",
              "exerciseId": "demi_plie",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "ballet_gliding_tendu",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "swan_step",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "lateral_steps",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "swan_step",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "swan_step",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "thigh_calf_stretch",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ],
          "day": 1
        },
        {
          "title": "L’Équilibre des Plumes",
          "xp": 60,
          "difficultyLabel": "≈ 18 min",
          "instructions": "Développer la stabilité avec un appui. Pour chaque équilibre, viser dix secondes par côté avec appui. Arabesque basse, pied au sol si nécessaire. Prendre 20 à 40 secondes de récupération entre les blocs. Ne jamais forcer l'en-dehors ni l'amplitude. Utiliser une chaise stable pour les équilibres.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "walk",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
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
              "phase": "Technique",
              "exerciseId": "calf_raises",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "ballet_weight_transfer",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "single_leg_balance",
              "amount": 20,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "arabesque_simplified",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "dancer_sway",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "second_position_arms",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "thigh_calf_stretch",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ],
          "day": 2
        },
        {
          "title": "L’Envol du Cygne",
          "xp": 60,
          "difficultyLabel": "≈ 18 min",
          "instructions": "Danser une phrase simple sur huit temps. Sur huit temps : ouvrir les bras, glisser un pied, transférer le poids, revenir en position stable. Quatre passages à vitesse confortable. Prendre 20 à 40 secondes de récupération entre les blocs. Ne jamais forcer l'en-dehors ni l'amplitude. Utiliser une chaise stable pour les équilibres.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "walk",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
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
              "phase": "Technique",
              "exerciseId": "demi_plie",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "ballet_eight_count_phrase",
              "amount": 2,
              "unit": "tours"
            },
            {
              "phase": "Technique",
              "exerciseId": "second_position_arms",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "swan_step",
              "amount": 45,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "swan_step",
              "amount": 45,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "swan_step",
              "amount": 45,
              "unit": "sec"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "thigh_calf_stretch",
              "amount": 2,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ],
          "day": 3
        }
      ]
    },
    {
      "week": 3,
      "title": "L’Élégance",
      "xp": 60,
      "progression": "Retiré simplifié, arabesque basse et coordination sur huit temps.",
      "days": [
        {
          "title": "Le Secret du Retiré",
          "xp": 60,
          "difficultyLabel": "≈ 20 min",
          "instructions": "Introduire le retiré simplifié sans monter le genou trop haut. Placer la pointe du pied près de la cheville, avec appui. Équilibre de quinze secondes par côté. Prendre 20 à 40 secondes de récupération entre les blocs. Ne jamais forcer l'en-dehors ni l'amplitude. Utiliser une chaise stable pour les équilibres.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "walk",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
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
              "phase": "Technique",
              "exerciseId": "demi_plie",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "passe_simplified",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "single_leg_balance",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "second_position_arms",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "swan_step",
              "amount": 45,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "second_position_arms",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "thigh_calf_stretch",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ],
          "day": 1
        },
        {
          "title": "La Grâce du Vent",
          "xp": 60,
          "difficultyLabel": "≈ 20 min",
          "instructions": "Coordonner le déplacement des bras et des jambes. Développé devant très bas et contrôlé, sans chercher à lever haut la jambe. Prendre 20 à 40 secondes de récupération entre les blocs. Ne jamais forcer l'en-dehors ni l'amplitude. Utiliser une chaise stable pour les équilibres.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "walk",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
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
              "phase": "Technique",
              "exerciseId": "ballet_gliding_tendu",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "arabesque_simplified",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "front_developpe_simplified",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "second_position_arms",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "dancer_sway",
              "amount": 45,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "swan_step",
              "amount": 45,
              "unit": "sec"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "thigh_calf_stretch",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ],
          "day": 2
        },
        {
          "title": "La Danse des Feuilles",
          "xp": 60,
          "difficultyLabel": "≈ 20 min",
          "instructions": "Relier deux phrases de huit temps. Inclure un déplacement, un port de bras et un équilibre assisté. Deux passages, puis un troisième uniquement si confortable. Prendre 20 à 40 secondes de récupération entre les blocs. Ne jamais forcer l'en-dehors ni l'amplitude. Utiliser une chaise stable pour les équilibres.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "walk",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
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
              "phase": "Technique",
              "exerciseId": "passe_simplified",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "arabesque_simplified",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "demi_plie",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "ballet_eight_count_phrase",
              "amount": 2,
              "unit": "tours"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "ballet_sequence",
              "amount": 1,
              "unit": "tour"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "thigh_calf_stretch",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ],
          "day": 3
        }
      ]
    },
    {
      "week": 4,
      "title": "Le Ballet des Sylphes",
      "xp": 60,
      "progression": "Révérence et préparation d'une petite représentation finale.",
      "days": [
        {
          "title": "La Révérence",
          "xp": 60,
          "difficultyLabel": "≈ 20 min",
          "instructions": "Apprendre une révérence simple et stable. Révérence peu profonde, sans déséquilibre. Prendre 20 à 40 secondes de récupération entre les blocs. Ne jamais forcer l'en-dehors ni l'amplitude. Utiliser une chaise stable pour les équilibres.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "walk",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
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
              "phase": "Technique",
              "exerciseId": "demi_plie",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "lateral_steps",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "court_bow",
              "amount": 4,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "second_position_arms",
              "amount": 45,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "ballet_eight_count_phrase",
              "amount": 2,
              "unit": "tours"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "court_bow",
              "amount": 2,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "thigh_calf_stretch",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ],
          "day": 1
        },
        {
          "title": "La Répétition Générale",
          "xp": 60,
          "difficultyLabel": "≈ 22 min",
          "instructions": "Assembler entrée en scène, deux phrases de huit temps et révérence. Deux répétitions avec une minute de récupération entre les deux. Prendre 20 à 40 secondes de récupération entre les blocs. Ne jamais forcer l'en-dehors ni l'amplitude. Utiliser une chaise stable pour les équilibres.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "walk",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
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
              "phase": "Technique",
              "exerciseId": "demi_plie",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "swan_step",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "passe_simplified",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "ballet_eight_count_phrase",
              "amount": 2,
              "unit": "tours"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "court_bow",
              "amount": 2,
              "unit": "répétitions"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "ballet_sequence",
              "amount": 1,
              "unit": "tour"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "thigh_calf_stretch",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ],
          "day": 2
        },
        {
          "title": "La Danse des Sylphes",
          "xp": 60,
          "difficultyLabel": "≈ 25 min",
          "instructions": "Présenter la variation complète avec fluidité. Variation : entrée, ouverture des bras, demi-pliés, déplacement, transfert de poids, retiré, arabesque préparatoire, révérence. Deux passages maximum. Prendre 20 à 40 secondes de récupération entre les blocs. Ne jamais forcer l'en-dehors ni l'amplitude. Utiliser une chaise stable pour les équilibres.",
          "exercises": [
            {
              "phase": "Échauffement",
              "exerciseId": "walk",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Échauffement",
              "exerciseId": "arm_circles",
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
              "phase": "Technique",
              "exerciseId": "demi_plie",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Technique",
              "exerciseId": "lateral_steps",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "arabesque_simplified",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Technique",
              "exerciseId": "passe_simplified",
              "amount": 40,
              "unit": "sec"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "ballet_eight_count_phrase",
              "amount": 2,
              "unit": "tours"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "court_bow",
              "amount": 2,
              "unit": "répétitions"
            },
            {
              "phase": "Combinaison dansée",
              "exerciseId": "ballet_sequence",
              "amount": 1,
              "unit": "tour"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "thigh_calf_stretch",
              "amount": 3,
              "unit": "min"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ],
          "day": 3
        }
      ]
    }
  ],
  "bosses": [
    {
      "week": 1,
      "title": "La Petite Sylphe",
      "xp": 50,
      "badgeId": "ballet-petite-sylphe",
      "difficultyLabel": "Boss semaine 1 · un passage",
      "instructions": "Présenter six demi-pliés, quatre ouvertures de bras et une courte phrase dansée. Un passage suffit, appui et pauses autorisés.",
      "lockedMessage": "La Petite Sylphe attend une danseuse régulière. Termine les 3 séances de la semaine.",
      "exercises": [
        {
          "phase": "Épreuve chorégraphique",
          "exerciseId": "demi_plie",
          "amount": 6,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve chorégraphique",
          "exerciseId": "second_position_arms",
          "amount": 30,
          "unit": "sec"
        },
        {
          "phase": "Épreuve chorégraphique",
          "exerciseId": "swan_step",
          "amount": 40,
          "unit": "sec"
        }
      ]
    },
    {
      "week": 2,
      "title": "Le Cygne Argenté",
      "xp": 60,
      "badgeId": "ballet-cygne-argente",
      "difficultyLabel": "Boss semaine 2 · un passage",
      "instructions": "Présenter huit demi-pliés, quatre dégagés de chaque côté, deux équilibres assistés de dix secondes et une phrase de huit temps.",
      "lockedMessage": "Le Cygne Argenté ne prend son envol qu’après une semaine complète.",
      "exercises": [
        {
          "phase": "Épreuve chorégraphique",
          "exerciseId": "demi_plie",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve chorégraphique",
          "exerciseId": "ballet_gliding_tendu",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve chorégraphique",
          "exerciseId": "single_leg_balance",
          "amount": 20,
          "unit": "sec"
        },
        {
          "phase": "Épreuve chorégraphique",
          "exerciseId": "swan_step",
          "amount": 45,
          "unit": "sec"
        }
      ]
    },
    {
      "week": 3,
      "title": "L’Esprit du Théâtre",
      "xp": 70,
      "badgeId": "ballet-esprit-theatre",
      "difficultyLabel": "Boss semaine 3 · un passage",
      "instructions": "Présenter deux phrases de huit temps : déplacement, demi-plié, port de bras et équilibre assisté. Contrôle plutôt que perfection.",
      "lockedMessage": "L’Esprit du Théâtre attend une variation maîtrisée.",
      "exercises": [
        {
          "phase": "Épreuve chorégraphique",
          "exerciseId": "demi_plie",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve chorégraphique",
          "exerciseId": "passe_simplified",
          "amount": 30,
          "unit": "sec"
        },
        {
          "phase": "Épreuve chorégraphique",
          "exerciseId": "second_position_arms",
          "amount": 30,
          "unit": "sec"
        },
        {
          "phase": "Épreuve chorégraphique",
          "exerciseId": "ballet_eight_count_phrase",
          "amount": 2,
          "unit": "tours"
        }
      ]
    },
    {
      "week": 4,
      "title": "La Reine des Sylphes",
      "xp": 100,
      "badgeId": "ballet-reine-sylphes",
      "chest": true,
      "nextPrograms": [
        "tour-mage",
        "maitre-flux",
        "marche-aventurier"
      ],
      "difficultyLabel": "Boss final · variation de 16 à 24 temps",
      "instructions": "Après échauffement, présenter une variation de 16 à 24 temps et la révérence finale. Un second passage est possible après récupération, sans récompense supplémentaire.",
      "lockedMessage": "La Reine des Sylphes n’apparaît qu’à la fin du ballet.",
      "exercises": [
        {
          "phase": "Variation finale",
          "exerciseId": "walk",
          "amount": 3,
          "unit": "min"
        },
        {
          "phase": "Variation finale",
          "exerciseId": "demi_plie",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Variation finale",
          "exerciseId": "swan_step",
          "amount": 45,
          "unit": "sec"
        },
        {
          "phase": "Variation finale",
          "exerciseId": "passe_simplified",
          "amount": 30,
          "unit": "sec"
        },
        {
          "phase": "Variation finale",
          "exerciseId": "arabesque_simplified",
          "amount": 30,
          "unit": "sec"
        },
        {
          "phase": "Variation finale",
          "exerciseId": "ballet_eight_count_phrase",
          "amount": 2,
          "unit": "tours"
        },
        {
          "phase": "Variation finale",
          "exerciseId": "court_bow",
          "amount": 2,
          "unit": "répétitions"
        },
        {
          "phase": "Variation finale",
          "exerciseId": "slow_breathing",
          "amount": 2,
          "unit": "min"
        }
      ]
    }
  ],
  "progression": [
    "Semaine 1 : Les Premiers Pas · Posture, positions adaptées, demi-pliés et premiers ports de bras.",
    "Semaine 2 : Le Cygne Prend son Envol · Déplacements glissés, transferts de poids et équilibre assisté.",
    "Semaine 3 : L’Élégance · Retiré simplifié, arabesque basse et coordination sur huit temps.",
    "Semaine 4 : Le Ballet des Sylphes · Révérence et préparation d'une petite représentation finale."
  ],
  "notes": [
    "Programme d'initiation à la danse classique pour débutants complets.",
    "Objectif principal : mobilité et souplesse fonctionnelle. Objectif secondaire : équilibre et coordination.",
    "Trois séances essentielles par semaine. Deux séances complémentaires facultatives selon les objectifs personnels.",
    "Chaise stable recommandée pour les équilibres. Ne jamais forcer l'en-dehors ou l'amplitude.",
    "Les durées comprennent transitions et récupérations ; respecter les limites de confort.",
    "Les boss sont des épreuves chorégraphiques réalisables en un passage."
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
      "duration": "20 à 60 min (hors boss)",
      "frequency": "3 séances essentielles par semaine, 2 complémentaires facultatives, 1 boss à programmer après récupération",
      "material": "Vélo intérieur ou extérieur, tapis et chaise stable; aucun haltère nécessaire.",
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
          "progression": "Découvrir la posture et pédaler à une allure permettant de parler; une séance douce de force et deux séances de vélo.",
          "days": [
            {
              "day": 1,
              "title": "Force du Cycliste",
              "xp": 60,
              "difficultyLabel": "≈ 20 min",
              "instructions": "Squats assistés, fessiers et stabilité; gestes contrôlés. Réalise 2 cycles, en récupérant 45 à 90 secondes entre les cycles. Réduis les répétitions si la technique se dégrade.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Marche tranquillement."
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "hip_circles",
                  "amount": 30,
                  "unit": "sec",
                  "cue": "Mobilise les hanches sans forcer."
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "slow_knee_raises",
                  "amount": 30,
                  "unit": "sec",
                  "cue": "Lève les genoux sans vitesse."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "chair_squat",
                  "amount": 8,
                  "unit": "répétitions",
                  "cue": "Utilise une chaise stable, sans douleur."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 8,
                  "unit": "répétitions",
                  "cue": "Amplitude réduite et contrôle."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "bridge",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "Pousse doucement sur les talons."
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 12,
                  "unit": "répétitions",
                  "cue": "Montée et descente lentes."
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "bird_dog",
                  "amount": 8,
                  "unit": "répétitions",
                  "cue": "4 par côté; bassin stable."
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "core",
                  "amount": 15,
                  "unit": "sec",
                  "cue": "Gainage confortable, respiration libre."
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "chair_squat",
                  "amount": 8,
                  "unit": "répétitions",
                  "cue": "Utilise une chaise stable, sans douleur."
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 8,
                  "unit": "répétitions",
                  "cue": "Amplitude réduite et contrôle."
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "bridge",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "Pousse doucement sur les talons."
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 12,
                  "unit": "répétitions",
                  "cue": "Montée et descente lentes."
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "bird_dog",
                  "amount": 8,
                  "unit": "répétitions",
                  "cue": "4 par côté; bassin stable."
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "core",
                  "amount": 15,
                  "unit": "sec",
                  "cue": "Gainage confortable, respiration libre."
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "hip_quad_stretch",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Étirement doux, sans à-coups."
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 1,
                  "unit": "min",
                  "cue": "Respire régulièrement."
                }
              ]
            },
            {
              "day": 2,
              "title": "Premiers Tours de Roue",
              "xp": 60,
              "difficultyLabel": "≈ 20 min",
              "instructions": "Vélo intérieur ou extérieur. Effort facile, pédalage souple; réglage de selle confortable.",
              "exercises": [
                {
                  "phase": "Échauffement facile",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Départ doux, respiration calme.",
                  "distanceOptional": true
                },
                {
                  "phase": "Pédalage régulier",
                  "exerciseId": "bike",
                  "amount": 12,
                  "unit": "min",
                  "cue": "Allure à laquelle tu peux parler en phrases complètes.",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "bike",
                  "amount": 3,
                  "unit": "min",
                  "cue": "Ralentis progressivement.",
                  "distanceOptional": true
                }
              ]
            },
            {
              "day": 3,
              "title": "Première Sortie",
              "xp": 60,
              "difficultyLabel": "≈ 25 min",
              "instructions": "Première sortie d'endurance à intensité facile; priorité au confort et à la régularité.",
              "exercises": [
                {
                  "phase": "Départ facile",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Pédale tranquillement.",
                  "distanceOptional": true
                },
                {
                  "phase": "Sortie confortable",
                  "exerciseId": "bike",
                  "amount": 15,
                  "unit": "min",
                  "cue": "Garde une allure de conversation.",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Réduis progressivement ton allure.",
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
          "progression": "Ajouter les fentes assistées et quatre relances de 30 secondes sans sprint; faire durer la sortie confortable.",
          "days": [
            {
              "day": 1,
              "title": "Jambes de Grimpeur",
              "xp": 70,
              "difficultyLabel": "≈ 25 min",
              "instructions": "Fentes assistées et renforcement pour conserver des appuis stables. Réalise 2 cycles, en récupérant 45 à 90 secondes entre les cycles. Réduis les répétitions si la technique se dégrade.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Marche tranquillement."
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "hip_circles",
                  "amount": 30,
                  "unit": "sec",
                  "cue": "Mobilise les hanches sans forcer."
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "slow_knee_raises",
                  "amount": 30,
                  "unit": "sec",
                  "cue": "Lève les genoux sans vitesse."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "squats",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "Descends selon ton amplitude confortable."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "Garde les genoux alignés."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 8,
                  "unit": "répétitions",
                  "cue": "4 par côté avec appui si nécessaire."
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "bridge",
                  "amount": 12,
                  "unit": "répétitions",
                  "cue": "Bassin stable."
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 15,
                  "unit": "répétitions",
                  "cue": "Reste près d'un appui."
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "core",
                  "amount": 20,
                  "unit": "sec",
                  "cue": "Respire normalement."
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "squats",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "Descends selon ton amplitude confortable."
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "Garde les genoux alignés."
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 8,
                  "unit": "répétitions",
                  "cue": "4 par côté avec appui si nécessaire."
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "bridge",
                  "amount": 12,
                  "unit": "répétitions",
                  "cue": "Bassin stable."
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 15,
                  "unit": "répétitions",
                  "cue": "Reste près d'un appui."
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "core",
                  "amount": 20,
                  "unit": "sec",
                  "cue": "Respire normalement."
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "hip_quad_stretch",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Étirement doux, sans à-coups."
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 1,
                  "unit": "min",
                  "cue": "Respire régulièrement."
                }
              ]
            },
            {
              "day": 2,
              "title": "Maîtrise du Pédalage",
              "xp": 70,
              "difficultyLabel": "≈ 25 min",
              "instructions": "Quatre relances modérées de 30 secondes, séparées par 2 min faciles. Pas de sprint.",
              "exercises": [
                {
                  "phase": "Échauffement facile",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Échauffe-toi en pédalant tranquillement.",
                  "distanceOptional": true
                },
                {
                  "phase": "Relance 1 · modérée",
                  "exerciseId": "bike",
                  "amount": 30,
                  "unit": "sec",
                  "cue": "Accélère légèrement, sans perdre la maîtrise.",
                  "distanceOptional": true
                },
                {
                  "phase": "Récupération 1 · facile",
                  "exerciseId": "bike",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Reviens au souffle calme.",
                  "distanceOptional": true
                },
                {
                  "phase": "Relance 2 · modérée",
                  "exerciseId": "bike",
                  "amount": 30,
                  "unit": "sec",
                  "cue": "Accélère légèrement, sans perdre la maîtrise.",
                  "distanceOptional": true
                },
                {
                  "phase": "Récupération 2 · facile",
                  "exerciseId": "bike",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Reviens au souffle calme.",
                  "distanceOptional": true
                },
                {
                  "phase": "Relance 3 · modérée",
                  "exerciseId": "bike",
                  "amount": 30,
                  "unit": "sec",
                  "cue": "Accélère légèrement, sans perdre la maîtrise.",
                  "distanceOptional": true
                },
                {
                  "phase": "Récupération 3 · facile",
                  "exerciseId": "bike",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Reviens au souffle calme.",
                  "distanceOptional": true
                },
                {
                  "phase": "Relance 4 · modérée",
                  "exerciseId": "bike",
                  "amount": 30,
                  "unit": "sec",
                  "cue": "Accélère légèrement, sans perdre la maîtrise.",
                  "distanceOptional": true
                },
                {
                  "phase": "Récupération 4 · facile",
                  "exerciseId": "bike",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Reviens au souffle calme.",
                  "distanceOptional": true
                },
                {
                  "phase": "Allure régulière",
                  "exerciseId": "bike",
                  "amount": 7,
                  "unit": "min",
                  "cue": "Maintiens une intensité confortable.",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "bike",
                  "amount": 3,
                  "unit": "min",
                  "cue": "Ralentis peu à peu.",
                  "distanceOptional": true
                }
              ]
            },
            {
              "day": 3,
              "title": "Sortie des Collines",
              "xp": 70,
              "difficultyLabel": "≈ 35 min",
              "instructions": "Augmenter la durée, pas la vitesse; parcours plutôt plat si nécessaire.",
              "exercises": [
                {
                  "phase": "Départ facile",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Départ progressif.",
                  "distanceOptional": true
                },
                {
                  "phase": "Sortie confortable",
                  "exerciseId": "bike",
                  "amount": 25,
                  "unit": "min",
                  "cue": "Reste à une allure permettant de parler.",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Fin tranquille.",
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
          "progression": "Consolider la stabilité et quatre relances d'une minute; progresser jusqu'à 45 minutes de vélo facile.",
          "days": [
            {
              "day": 1,
              "title": "Force de Montagne",
              "xp": 80,
              "difficultyLabel": "≈ 30 min",
              "instructions": "Deux circuits contrôlés; pont de hanches alterné sans charge. Réalise 2 cycles, en récupérant 45 à 90 secondes entre les cycles. Réduis les répétitions si la technique se dégrade.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Marche tranquillement."
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "hip_circles",
                  "amount": 30,
                  "unit": "sec",
                  "cue": "Mobilise les hanches sans forcer."
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "slow_knee_raises",
                  "amount": 30,
                  "unit": "sec",
                  "cue": "Lève les genoux sans vitesse."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "squats",
                  "amount": 12,
                  "unit": "répétitions",
                  "cue": "Réduis l'amplitude si besoin."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "5 de chaque côté; garde un appui."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "Reste régulier."
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "single_leg_bridge_alternate",
                  "amount": 12,
                  "unit": "répétitions",
                  "cue": "6 par côté sans cambrer."
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "slow_calf_raises",
                  "amount": 15,
                  "unit": "répétitions",
                  "cue": "Mouvement lent."
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "core",
                  "amount": 20,
                  "unit": "sec",
                  "cue": "Bassin stable; respire."
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "squats",
                  "amount": 12,
                  "unit": "répétitions",
                  "cue": "Réduis l'amplitude si besoin."
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "5 de chaque côté; garde un appui."
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "Reste régulier."
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "single_leg_bridge_alternate",
                  "amount": 12,
                  "unit": "répétitions",
                  "cue": "6 par côté sans cambrer."
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "slow_calf_raises",
                  "amount": 15,
                  "unit": "répétitions",
                  "cue": "Mouvement lent."
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "core",
                  "amount": 20,
                  "unit": "sec",
                  "cue": "Bassin stable; respire."
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "hip_quad_stretch",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Étirement doux, sans à-coups."
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 1,
                  "unit": "min",
                  "cue": "Respire régulièrement."
                }
              ]
            },
            {
              "day": 2,
              "title": "Contrôle du Vélo",
              "xp": 80,
              "difficultyLabel": "≈ 30 min",
              "instructions": "Quatre intervalles modérés d'une minute avec 2 minutes faciles entre les efforts.",
              "exercises": [
                {
                  "phase": "Échauffement facile",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Pédalage souple.",
                  "distanceOptional": true
                },
                {
                  "phase": "Effort 1 · modéré",
                  "exerciseId": "bike",
                  "amount": 1,
                  "unit": "min",
                  "cue": "Augmente un peu l'effort, sans sprinter.",
                  "distanceOptional": true
                },
                {
                  "phase": "Récupération 1 · facile",
                  "exerciseId": "bike",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Ralentis pour retrouver ton souffle.",
                  "distanceOptional": true
                },
                {
                  "phase": "Effort 2 · modéré",
                  "exerciseId": "bike",
                  "amount": 1,
                  "unit": "min",
                  "cue": "Augmente un peu l'effort, sans sprinter.",
                  "distanceOptional": true
                },
                {
                  "phase": "Récupération 2 · facile",
                  "exerciseId": "bike",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Ralentis pour retrouver ton souffle.",
                  "distanceOptional": true
                },
                {
                  "phase": "Effort 3 · modéré",
                  "exerciseId": "bike",
                  "amount": 1,
                  "unit": "min",
                  "cue": "Augmente un peu l'effort, sans sprinter.",
                  "distanceOptional": true
                },
                {
                  "phase": "Récupération 3 · facile",
                  "exerciseId": "bike",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Ralentis pour retrouver ton souffle.",
                  "distanceOptional": true
                },
                {
                  "phase": "Effort 4 · modéré",
                  "exerciseId": "bike",
                  "amount": 1,
                  "unit": "min",
                  "cue": "Augmente un peu l'effort, sans sprinter.",
                  "distanceOptional": true
                },
                {
                  "phase": "Récupération 4 · facile",
                  "exerciseId": "bike",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Ralentis pour retrouver ton souffle.",
                  "distanceOptional": true
                },
                {
                  "phase": "Allure régulière",
                  "exerciseId": "bike",
                  "amount": 8,
                  "unit": "min",
                  "cue": "Reste confortable.",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Pédale doucement pour finir.",
                  "distanceOptional": true
                }
              ]
            },
            {
              "day": 3,
              "title": "Sortie Endurance",
              "xp": 80,
              "difficultyLabel": "≈ 45 min",
              "instructions": "45 minutes faciles, sur plat ou terrain adapté. Si nécessaire, répète la semaine précédente.",
              "exercises": [
                {
                  "phase": "Départ facile",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Installe le rythme.",
                  "distanceOptional": true
                },
                {
                  "phase": "Sortie confortable",
                  "exerciseId": "bike",
                  "amount": 35,
                  "unit": "min",
                  "cue": "Le souffle reste contrôlé.",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Fin progressive.",
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
          "progression": "Consolider la force sans surcharge; pratiquer un pédalage régulier et viser une sortie confortable d'une heure.",
          "days": [
            {
              "day": 1,
              "title": "Jambes de Fer",
              "xp": 90,
              "difficultyLabel": "≈ 25–30 min",
              "instructions": "Dernière séance de renforcement : privilégier la qualité plutôt que l'accumulation de répétitions. Réalise 2 cycles, en récupérant 45 à 90 secondes entre les cycles. Réduis les répétitions si la technique se dégrade.",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Marche tranquillement."
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "hip_circles",
                  "amount": 30,
                  "unit": "sec",
                  "cue": "Mobilise les hanches sans forcer."
                },
                {
                  "phase": "Échauffement",
                  "exerciseId": "slow_knee_raises",
                  "amount": 30,
                  "unit": "sec",
                  "cue": "Lève les genoux sans vitesse."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "squats",
                  "amount": 12,
                  "unit": "répétitions",
                  "cue": "Mouvement contrôlé."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "wall_sit",
                  "amount": 20,
                  "unit": "sec",
                  "cue": "Ne descends pas trop bas si inconfort."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "reverse_lunges",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "5 par jambe; version assistée possible."
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "bridge",
                  "amount": 12,
                  "unit": "répétitions",
                  "cue": "Sans forcer le bas du dos."
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "calf_raises",
                  "amount": 15,
                  "unit": "répétitions",
                  "cue": "Appui possible."
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "bird_dog",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "5 par côté, mouvements lents."
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "squats",
                  "amount": 12,
                  "unit": "répétitions",
                  "cue": "Mouvement contrôlé."
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "wall_sit",
                  "amount": 20,
                  "unit": "sec",
                  "cue": "Ne descends pas trop bas si inconfort."
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "reverse_lunges",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "5 par jambe; version assistée possible."
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "bridge",
                  "amount": 12,
                  "unit": "répétitions",
                  "cue": "Sans forcer le bas du dos."
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "calf_raises",
                  "amount": 15,
                  "unit": "répétitions",
                  "cue": "Appui possible."
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "bird_dog",
                  "amount": 10,
                  "unit": "répétitions",
                  "cue": "5 par côté, mouvements lents."
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "hip_quad_stretch",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Étirement doux, sans à-coups."
                },
                {
                  "phase": "Respiration",
                  "exerciseId": "slow_breathing",
                  "amount": 1,
                  "unit": "min",
                  "cue": "Respire régulièrement."
                }
              ]
            },
            {
              "day": 2,
              "title": "Maîtrise de la Monture",
              "xp": 90,
              "difficultyLabel": "≈ 30 min",
              "instructions": "Trois séquences à cadence souple de trois minutes, avec récupération de deux minutes; jamais à fond.",
              "exercises": [
                {
                  "phase": "Échauffement facile",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Commence lentement.",
                  "distanceOptional": true
                },
                {
                  "phase": "Pédalage souple",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Cherche une cadence régulière.",
                  "distanceOptional": true
                },
                {
                  "phase": "Cadence régulière 1",
                  "exerciseId": "bike",
                  "amount": 3,
                  "unit": "min",
                  "cue": "Tourne les jambes avec souplesse.",
                  "distanceOptional": true
                },
                {
                  "phase": "Récupération 1",
                  "exerciseId": "bike",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Reviens au rythme facile.",
                  "distanceOptional": true
                },
                {
                  "phase": "Cadence régulière 2",
                  "exerciseId": "bike",
                  "amount": 3,
                  "unit": "min",
                  "cue": "Tourne les jambes avec souplesse.",
                  "distanceOptional": true
                },
                {
                  "phase": "Récupération 2",
                  "exerciseId": "bike",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Reviens au rythme facile.",
                  "distanceOptional": true
                },
                {
                  "phase": "Cadence régulière 3",
                  "exerciseId": "bike",
                  "amount": 3,
                  "unit": "min",
                  "cue": "Tourne les jambes avec souplesse.",
                  "distanceOptional": true
                },
                {
                  "phase": "Récupération 3",
                  "exerciseId": "bike",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Reviens au rythme facile.",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Ralentis progressivement.",
                  "distanceOptional": true
                }
              ]
            },
            {
              "day": 3,
              "title": "Grande Expédition",
              "xp": 90,
              "difficultyLabel": "≈ 60 min",
              "instructions": "Objectif : une heure confortable, sans recherche de vitesse. Si la fatigue persiste, réduire ou répéter la semaine.",
              "exercises": [
                {
                  "phase": "Départ facile",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Échauffement progressif.",
                  "distanceOptional": true
                },
                {
                  "phase": "Grande sortie",
                  "exerciseId": "bike",
                  "amount": 50,
                  "unit": "min",
                  "cue": "Parcours accessible, intensité de conversation, pauses possibles.",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Termine en douceur.",
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
          "instructions": "Débloqué après les 3 séances essentielles de la semaine. Le boss peut être reporté pour récupérer.",
          "lockedMessage": "Le Gobelin des Pavés attend que tes roues soient prêtes. Termine les 3 séances de la semaine.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Gobelin des Pavés",
              "mission": "Deux circuits de renforcement maîtrisé, récupération de 60 à 90 secondes entre les cycles.",
              "difficultyLabel": "≈ 20-30 min · 2 cycles",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Marche en place avant le circuit."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "chair_squat",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "bird_dog",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "bridge",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "calf_raises",
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
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "chair_squat",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "bird_dog",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "bridge",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "calf_raises",
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
                  "exerciseId": "thigh_calf_stretch",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Étire doucement les jambes."
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Sortie contre le Gobelin",
              "mission": "Sortie de 30 min à intensité confortable, sans vitesse imposée.",
              "difficultyLabel": "≈ 30 min",
              "exercises": [
                {
                  "phase": "Départ facile",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Départ progressif.",
                  "distanceOptional": true
                },
                {
                  "phase": "Parcours confortable",
                  "exerciseId": "bike",
                  "amount": 20,
                  "unit": "min",
                  "cue": "Allure de conversation; terrain adapté.",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Fin progressive.",
                  "distanceOptional": true
                }
              ],
              "instructions": "Programme le défi après une récupération suffisante, plutôt qu'au lendemain d'une longue sortie."
            }
          }
        },
        {
          "week": 2,
          "title": "L’Orque de la Côte",
          "xp": 60,
          "badgeId": "grimpeur-novice",
          "difficultyLabel": "Boss semaine 2",
          "instructions": "Débloqué après les 3 séances essentielles de la semaine. Le boss peut être reporté pour récupérer.",
          "lockedMessage": "L’Orque de la Côte garde la montée. Termine les 3 séances de la semaine avant de le défier.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Côte en salle",
              "mission": "Deux circuits de renforcement maîtrisé, récupération de 60 à 90 secondes entre les cycles.",
              "difficultyLabel": "≈ 20-30 min · 2 cycles",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Marche en place avant le circuit."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "squats",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 10,
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
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "core",
                  "amount": 20,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "squats",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "assisted_reverse_lunges",
                  "amount": 8,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "cyclist_half_squat",
                  "amount": 10,
                  "unit": "répétitions"
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
                  "amount": 15,
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
                  "exerciseId": "thigh_calf_stretch",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Étire doucement les jambes."
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Côte extérieure",
              "mission": "Sortie de 40 min à intensité confortable, sans vitesse imposée.",
              "difficultyLabel": "≈ 40 min",
              "exercises": [
                {
                  "phase": "Départ facile",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Départ progressif.",
                  "distanceOptional": true
                },
                {
                  "phase": "Parcours confortable",
                  "exerciseId": "bike",
                  "amount": 30,
                  "unit": "min",
                  "cue": "Allure de conversation; terrain adapté.",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Fin progressive.",
                  "distanceOptional": true
                }
              ],
              "instructions": "Programme le défi après une récupération suffisante, plutôt qu'au lendemain d'une longue sortie."
            }
          }
        },
        {
          "week": 3,
          "title": "Troll du Col Noir",
          "xp": 70,
          "badgeId": "maitre-collines",
          "difficultyLabel": "Boss semaine 3",
          "instructions": "Débloqué après les 3 séances essentielles de la semaine. Le boss peut être reporté pour récupérer.",
          "lockedMessage": "Le Troll du Col Noir ne laisse passer que les cyclistes réguliers.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Col Noir en salle",
              "mission": "Deux circuits de renforcement maîtrisé, récupération de 60 à 90 secondes entre les cycles.",
              "difficultyLabel": "≈ 20-30 min · 2 cycles",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Marche en place avant le circuit."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "squats",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "assisted_reverse_lunges",
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
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "single_leg_bridge_alternate",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "slow_calf_raises",
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "core",
                  "amount": 20,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "squats",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "assisted_reverse_lunges",
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
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "single_leg_bridge_alternate",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "slow_calf_raises",
                  "amount": 15,
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
                  "exerciseId": "thigh_calf_stretch",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Étire doucement les jambes."
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Col Noir extérieur",
              "mission": "Sortie de 50 min à intensité confortable, sans vitesse imposée.",
              "difficultyLabel": "≈ 50 min",
              "exercises": [
                {
                  "phase": "Départ facile",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Départ progressif.",
                  "distanceOptional": true
                },
                {
                  "phase": "Parcours confortable",
                  "exerciseId": "bike",
                  "amount": 40,
                  "unit": "min",
                  "cue": "Allure de conversation; terrain adapté.",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Fin progressive.",
                  "distanceOptional": true
                }
              ],
              "instructions": "Programme le défi après une récupération suffisante, plutôt qu'au lendemain d'une longue sortie."
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
          "instructions": "Débloqué après les 3 séances essentielles de la semaine. Le boss peut être reporté pour récupérer.",
          "lockedMessage": "Le Cavalier Noir attend au bout de la route. Termine d’abord ta préparation.",
          "variants": {
            "indoor": {
              "id": "indoor",
              "label": "🏠 Boss Intérieur",
              "title": "Duel contre le Cavalier Noir",
              "mission": "Deux circuits de renforcement maîtrisé, récupération de 60 à 90 secondes entre les cycles.",
              "difficultyLabel": "≈ 20-30 min · 2 cycles",
              "exercises": [
                {
                  "phase": "Échauffement",
                  "exerciseId": "march_on_spot",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Marche en place avant le circuit."
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "squats",
                  "amount": 12,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "wall_sit",
                  "amount": 20,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 1",
                  "exerciseId": "reverse_lunges",
                  "amount": 10,
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
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 1",
                  "exerciseId": "bird_dog",
                  "amount": 10,
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
                  "exerciseId": "wall_sit",
                  "amount": 20,
                  "unit": "sec"
                },
                {
                  "phase": "Défi 1 · Cycle 2",
                  "exerciseId": "reverse_lunges",
                  "amount": 10,
                  "unit": "répétitions"
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
                  "amount": 15,
                  "unit": "répétitions"
                },
                {
                  "phase": "Défi 2 · Cycle 2",
                  "exerciseId": "bird_dog",
                  "amount": 10,
                  "unit": "répétitions"
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "thigh_calf_stretch",
                  "amount": 2,
                  "unit": "min",
                  "cue": "Étire doucement les jambes."
                }
              ]
            },
            "outdoor": {
              "id": "outdoor",
              "label": "🌲 Boss Extérieur",
              "title": "Grande chevauchée",
              "mission": "Grande expédition : 60 min faciles. Tu peux prolonger à 75 min si tu as récupéré et te sens bien; seule l'heure est obligatoire.",
              "difficultyLabel": "≈ 60 min",
              "instructions": "Programme le défi après une récupération suffisante, plutôt qu'au lendemain d'une longue sortie.",
              "exercises": [
                {
                  "phase": "Départ facile",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Départ progressif.",
                  "distanceOptional": true
                },
                {
                  "phase": "Parcours confortable",
                  "exerciseId": "bike",
                  "amount": 50,
                  "unit": "min",
                  "cue": "Allure de conversation; terrain adapté.",
                  "distanceOptional": true
                },
                {
                  "phase": "Retour au calme",
                  "exerciseId": "bike",
                  "amount": 5,
                  "unit": "min",
                  "cue": "Fin progressive.",
                  "distanceOptional": true
                }
              ]
            }
          }
        }
      ],
      "progression": [
        "Semaine 1 : force douce, premiers tours de roue et sortie de 25 min.",
        "Semaine 2 : relances de 30 secondes et sortie de 35 min.",
        "Semaine 3 : efforts modérés d'une minute et sortie de 45 min.",
        "Semaine 4 : consolider sans surcharge et viser 60 min de vélo facile.",
        "Trois séances essentielles débloquent le boss de la semaine, sans obligation de compléter les deux séances facultatives.",
        "Les défis extérieurs doivent être placés après récupération, pas forcément le lendemain de la sortie longue.",
        "Récompense finale inchangée : badge Cavalier de la Route, coffre et XP prévus."
      ],
      "notes": [
        "Objectifs : endurance cardiovasculaire et force utile au pédalage.",
        "Chaque semaine : une séance de renforcement, une séance de vélo technique et une sortie d'endurance.",
        "Les deux séances complémentaires du planning sont facultatives et personnalisées selon l'objectif.",
        "Sur le vélo facile, le pratiquant doit pouvoir converser; accélérations modérées sans sprint.",
        "Des intervalles courts sont séparés en étapes distinctes pour permettre le chronométrage et la reprise.",
        "Si douleur, malaise, gêne respiratoire inhabituelle ou fatigue persistante, interrompre la séance et demander un avis adapté.",
        "Les boss extérieurs peuvent être reportés après récupération; ne pas imposer deux sorties longues deux jours consécutifs.",
        "Le boss final demande 60 min, avec une prolongation facultative jusqu'à 75 min; aucune validation fictive sur 15 km.",
        "Les exercices par jambe sont comptés en répétitions totales. Réduire l'amplitude et les répétitions si nécessaire."
      ],
      "workoutRevision": "cavalier-route-v2-20261120",
      "legacyWorkouts": {
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
        ]
      }
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

            { phase: "Activation Pilates · Version 1", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },

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

            { phase: "Activation Pilates · Version 1", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },

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

            { phase: "Activation Pilates · Version 1", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },

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

            { phase: "Activation Pilates · Version 1", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },

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

            { phase: "Activation Pilates · Version 1", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },

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

            { phase: "Activation Pilates · Version 1", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },

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

            { phase: "Activation Pilates · Version 1", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },

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

            { phase: "Activation Pilates · Version 1", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },

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

            { phase: "Activation Pilates · Version 1", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },

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

            { phase: "Activation Pilates · Version 1", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },

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

            { phase: "Activation Pilates · Version 1", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },

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

            { phase: "Activation Pilates · Version 1", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },

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

    "maitre-flux": {
  "id": "maitre-flux",
  "subtitle": "Pilates intermédiaire : contrôle, stabilité, équilibre et centre du corps.",
  "unlockLevel": 2,
  "duration": "25 à 30 min",
  "frequency": "3 séances par semaine + boss le samedi",
  "material": "Aucun matériel. Tapis conseillé.",
  "reward": {
    "badgeId": "flux-dragon-astral",
    "badgeTitle": "Dragon Astral",
    "chest": true,
    "nextPrograms": [
      "archimage-corps",
      "forge-guerrier",
      "champion-arenes"
    ]
  },

  "weeks": [
    {
      "week": 1,
      "title": "Le Courant Intérieur",
      "xp": 70,
      "progression": "Passage vers le Pilates intermédiaire. Nouvel exercice : Swimming.",
      "days": [
        {
          "day": 1,
          "title": "Centre de Gravité",
          "xp": 70,
          "difficultyLabel": "≈ 25 à 30 min",
          "instructions": "Centre profond, stabilité et extension contrôlée.",
          "exercises": [
            { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "hollow_hold_simplified", "amount": 20, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "dead_bug", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "pelvic_lift_floor", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "hollow_hold_simplified", "amount": 20, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "dead_bug", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "pelvic_lift_floor", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "swimming", "amount": 20, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "side_plank_knees", "amount": 40, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "swimming", "amount": 20, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "side_plank_knees", "amount": 40, "unit": "sec" },
            { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
            { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        },
        {
          "day": 2,
          "title": "Souplesse du Mage",
          "xp": 70,
          "difficultyLabel": "≈ 25 à 30 min",
          "instructions": "Mobilité, dos et centre du corps.",
          "exercises": [
            { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "cat_cow", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "thoracic_rotation", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "swimming", "amount": 20, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "cat_cow", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "thoracic_rotation", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "swimming", "amount": 20, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "bridge", "amount": 15, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "dead_bug", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "bridge", "amount": 15, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "dead_bug", "amount": 20, "unit": "répétitions" },
            { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
            { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        },
        {
          "day": 3,
          "title": "Équilibre",
          "xp": 70,
          "difficultyLabel": "≈ 25 à 30 min",
          "instructions": "Équilibre, maintien et contrôle.",
          "exercises": [
            { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "single_leg_balance", "amount": 60, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "hollow_hold_simplified", "amount": 20, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "single_leg_balance", "amount": 60, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "hollow_hold_simplified", "amount": 20, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "swimming", "amount": 20, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "pelvic_lift_floor", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "side_plank_knees", "amount": 40, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "swimming", "amount": 20, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "pelvic_lift_floor", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "side_plank_knees", "amount": 40, "unit": "sec" },
            { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
            { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        }
      ]
    },

    {
      "week": 2,
      "title": "Les Vents Invisibles",
      "xp": 80,
      "progression": "Contrôle plus précis du centre. Nouvel exercice : Toe Taps.",
      "days": [
        {
          "day": 1,
          "title": "Contrôle",
          "xp": 80,
          "difficultyLabel": "≈ 25 à 30 min",
          "instructions": "Stabilité abdominale et maintien.",
          "exercises": [
            { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "toe_taps", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "hollow_hold_simplified", "amount": 25, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "pelvic_lift_floor", "amount": 15, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "toe_taps", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "hollow_hold_simplified", "amount": 25, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "pelvic_lift_floor", "amount": 15, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "swimming", "amount": 25, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "side_plank", "amount": 50, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "swimming", "amount": 25, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "side_plank", "amount": 50, "unit": "sec" },
            { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
            { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        },
        {
          "day": 2,
          "title": "Souffle et Précision",
          "xp": 80,
          "difficultyLabel": "≈ 25 à 30 min",
          "instructions": "Coordination du souffle, du bassin et des jambes.",
          "exercises": [
            { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "dead_bug", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "bridge", "amount": 15, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "dead_bug", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "bridge", "amount": 15, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "swimming", "amount": 25, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "thoracic_rotation", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "side_plank_knees", "amount": 50, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "swimming", "amount": 25, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "thoracic_rotation", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "side_plank_knees", "amount": 50, "unit": "sec" },
            { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
            { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        },
        {
          "day": 3,
          "title": "Équilibre des Vents",
          "xp": 80,
          "difficultyLabel": "≈ 25 à 30 min",
          "instructions": "Stabilité sur appuis et contrôle latéral.",
          "exercises": [
            { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "single_leg_balance", "amount": 70, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "single_leg_balance", "amount": 70, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "hollow_hold_simplified", "amount": 25, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "swimming", "amount": 25, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "side_plank", "amount": 50, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "hollow_hold_simplified", "amount": 25, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "swimming", "amount": 25, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "side_plank", "amount": 50, "unit": "sec" },
            { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
            { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        }
      ]
    },

    {
      "week": 3,
      "title": "Les Arcanes du Mouvement",
      "xp": 90,
      "progression": "Stabilité latérale et contrôle des hanches. Nouvel exercice : Side Leg Lift.",
      "days": [
        {
          "day": 1,
          "title": "Ligne Latérale",
          "xp": 90,
          "difficultyLabel": "≈ 25 à 30 min",
          "instructions": "Travail des hanches, des obliques et du centre.",
          "exercises": [
            { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "side_leg_lift", "amount": 16, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "side_plank", "amount": 50, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "side_leg_lift", "amount": 16, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "side_plank", "amount": 50, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "swimming", "amount": 30, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "pelvic_lift_floor", "amount": 15, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "swimming", "amount": 30, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "pelvic_lift_floor", "amount": 15, "unit": "répétitions" },
            { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
            { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        },
        {
          "day": 2,
          "title": "Arc du Mage",
          "xp": 90,
          "difficultyLabel": "≈ 25 à 30 min",
          "instructions": "Contrôle latéral, mobilité et équilibre.",
          "exercises": [
            { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "side_leg_lift", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "single_leg_balance", "amount": 70, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "dead_bug", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "side_leg_lift", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "single_leg_balance", "amount": 70, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "dead_bug", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "bridge", "amount": 18, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "swimming", "amount": 30, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "side_plank_knees", "amount": 60, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "bridge", "amount": 18, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "swimming", "amount": 30, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "side_plank_knees", "amount": 60, "unit": "sec" },
            { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
            { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        },
        {
          "day": 3,
          "title": "Flux Croisé",
          "xp": 90,
          "difficultyLabel": "≈ 25 à 30 min",
          "instructions": "Coordination croisée et stabilité du bassin.",
          "exercises": [
            { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "side_leg_lift", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "side_leg_lift", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "hollow_hold_simplified", "amount": 30, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "swimming", "amount": 30, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "side_plank", "amount": 60, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "hollow_hold_simplified", "amount": 30, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "swimming", "amount": 30, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "side_plank", "amount": 60, "unit": "sec" },
            { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
            { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        }
      ]
    },

    {
      "week": 4,
      "title": "Maître du Flux",
      "xp": 100,
      "progression": "Enchaînements plus fluides et contrôle du tronc. Nouvel exercice : Roll Up simplifié.",
      "days": [
        {
          "day": 1,
          "title": "Ascension Contrôlée",
          "xp": 100,
          "difficultyLabel": "≈ 25 à 30 min",
          "instructions": "Roll Up simplifié, centre profond et stabilité.",
          "exercises": [
            { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "roll_up_simplified", "amount": 10, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "side_leg_lift", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "roll_up_simplified", "amount": 10, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "side_leg_lift", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "swimming", "amount": 30, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "side_plank", "amount": 60, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "swimming", "amount": 30, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "side_plank", "amount": 60, "unit": "sec" },
            { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
            { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        },
        {
          "day": 2,
          "title": "Flux Continu",
          "xp": 100,
          "difficultyLabel": "≈ 25 à 30 min",
          "instructions": "Enchaîner sans perdre le contrôle du bassin ni du souffle.",
          "exercises": [
            { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "roll_up_simplified", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "dead_bug", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "pelvic_lift_floor", "amount": 18, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "roll_up_simplified", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "dead_bug", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "pelvic_lift_floor", "amount": 18, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "side_leg_lift", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "swimming", "amount": 35, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "hollow_hold_simplified", "amount": 30, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "side_leg_lift", "amount": 20, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "swimming", "amount": 35, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "hollow_hold_simplified", "amount": 30, "unit": "sec" },
            { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
            { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        },
        {
          "day": 3,
          "title": "Maîtrise Astrale",
          "xp": 100,
          "difficultyLabel": "≈ 25 à 30 min",
          "instructions": "Synthèse du programme avant le Dragon Astral.",
          "exercises": [
            { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
            { "phase": "Échauffement", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
            { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "roll_up_simplified", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "toe_taps", "amount": 30, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 1", "exerciseId": "side_plank", "amount": 60, "unit": "sec" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "roll_up_simplified", "amount": 12, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "toe_taps", "amount": 30, "unit": "répétitions" },
            { "phase": "Défi 1 · Cycle 2", "exerciseId": "side_plank", "amount": 60, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "side_leg_lift", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "swimming", "amount": 35, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 1", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "side_leg_lift", "amount": 24, "unit": "répétitions" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "swimming", "amount": 35, "unit": "sec" },
            { "phase": "Défi 2 · Cycle 2", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
            { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
            { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
            { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
          ]
        }
      ]
    }
  ],

  "bosses": [
    {
      "week": 1,
      "title": "L’Esprit du Lac",
      "xp": 70,
      "badgeId": "flux-courant-interieur",
      "difficultyLabel": "Boss semaine 1 · 3 cycles",
      "instructions": "Débloqué après les 3 séances de la semaine 1. The Hundred est réalisé en version 2 avant les 3 cycles.",
      "lockedMessage": "L’Esprit du Lac attend un corps stable et un souffle calme.",
      "exercises": [
        { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
        { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
        { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
        { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
        { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
        { "phase": "Cycle 1", "exerciseId": "swimming", "amount": 20, "unit": "sec" },
        { "phase": "Cycle 1", "exerciseId": "hollow_hold_simplified", "amount": 20, "unit": "sec" },
        { "phase": "Cycle 1", "exerciseId": "dead_bug", "amount": 20, "unit": "répétitions" },
        { "phase": "Cycle 1", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
        { "phase": "Cycle 1", "exerciseId": "side_plank_knees", "amount": 40, "unit": "sec" },
        { "phase": "Cycle 2", "exerciseId": "swimming", "amount": 20, "unit": "sec" },
        { "phase": "Cycle 2", "exerciseId": "hollow_hold_simplified", "amount": 20, "unit": "sec" },
        { "phase": "Cycle 2", "exerciseId": "dead_bug", "amount": 20, "unit": "répétitions" },
        { "phase": "Cycle 2", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
        { "phase": "Cycle 2", "exerciseId": "side_plank_knees", "amount": 40, "unit": "sec" },
        { "phase": "Cycle 3", "exerciseId": "swimming", "amount": 20, "unit": "sec" },
        { "phase": "Cycle 3", "exerciseId": "hollow_hold_simplified", "amount": 20, "unit": "sec" },
        { "phase": "Cycle 3", "exerciseId": "dead_bug", "amount": 20, "unit": "répétitions" },
        { "phase": "Cycle 3", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
        { "phase": "Cycle 3", "exerciseId": "side_plank_knees", "amount": 40, "unit": "sec" },
        { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
        { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
        { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
      ]
    },
    {
      "week": 2,
      "title": "Le Sylphe des Ruines",
      "xp": 80,
      "badgeId": "flux-vents-invisibles",
      "difficultyLabel": "Boss semaine 2 · 3 cycles",
      "instructions": "Débloqué après les 3 séances de la semaine 2. The Hundred est réalisé en version 2 avant les 3 cycles.",
      "lockedMessage": "Le Sylphe des Ruines n’apparaît qu’après les trois maîtrises de la semaine.",
      "exercises": [
        { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
        { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
        { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
        { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
        { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
        { "phase": "Cycle 1", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 1", "exerciseId": "swimming", "amount": 25, "unit": "sec" },
        { "phase": "Cycle 1", "exerciseId": "dead_bug", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 1", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
        { "phase": "Cycle 1", "exerciseId": "side_plank", "amount": 50, "unit": "sec" },
        { "phase": "Cycle 2", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 2", "exerciseId": "swimming", "amount": 25, "unit": "sec" },
        { "phase": "Cycle 2", "exerciseId": "dead_bug", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 2", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
        { "phase": "Cycle 2", "exerciseId": "side_plank", "amount": 50, "unit": "sec" },
        { "phase": "Cycle 3", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 3", "exerciseId": "swimming", "amount": 25, "unit": "sec" },
        { "phase": "Cycle 3", "exerciseId": "dead_bug", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 3", "exerciseId": "bird_dog", "amount": 20, "unit": "répétitions" },
        { "phase": "Cycle 3", "exerciseId": "side_plank", "amount": 50, "unit": "sec" },
        { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
        { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
        { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
      ]
    },
    {
      "week": 3,
      "title": "Le Gardien des Nuages",
      "xp": 90,
      "badgeId": "flux-arcanes-mouvement",
      "difficultyLabel": "Boss semaine 3 · 3 cycles",
      "instructions": "Débloqué après les 3 séances de la semaine 3. The Hundred est réalisé en version 2 avant les 3 cycles.",
      "lockedMessage": "Le Gardien des Nuages exige une maîtrise complète des Arcanes du Mouvement.",
      "exercises": [
        { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
        { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
        { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
        { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
        { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
        { "phase": "Cycle 1", "exerciseId": "side_leg_lift", "amount": 20, "unit": "répétitions" },
        { "phase": "Cycle 1", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 1", "exerciseId": "swimming", "amount": 30, "unit": "sec" },
        { "phase": "Cycle 1", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 1", "exerciseId": "side_plank", "amount": 60, "unit": "sec" },
        { "phase": "Cycle 2", "exerciseId": "side_leg_lift", "amount": 20, "unit": "répétitions" },
        { "phase": "Cycle 2", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 2", "exerciseId": "swimming", "amount": 30, "unit": "sec" },
        { "phase": "Cycle 2", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 2", "exerciseId": "side_plank", "amount": 60, "unit": "sec" },
        { "phase": "Cycle 3", "exerciseId": "side_leg_lift", "amount": 20, "unit": "répétitions" },
        { "phase": "Cycle 3", "exerciseId": "toe_taps", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 3", "exerciseId": "swimming", "amount": 30, "unit": "sec" },
        { "phase": "Cycle 3", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 3", "exerciseId": "side_plank", "amount": 60, "unit": "sec" },
        { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
        { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
        { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
      ]
    },
    {
      "week": 4,
      "title": "Le Dragon Astral Spirituel",
      "xp": 150,
      "badgeId": "flux-dragon-astral",
      "chest": true,
      "difficultyLabel": "Boss final · 30 à 40 min",
      "instructions": "Débloqué après les 3 séances de la semaine 4. The Hundred version 2 ouvre l’épreuve finale avant les 3 cycles.",
      "lockedMessage": "Le Dragon Astral ne descend que devant un Maître du Flux accompli.",
      "exercises": [
        { "phase": "Échauffement", "exerciseId": "abdominal_breathing", "amount": 1, "unit": "min" },
        { "phase": "Échauffement", "exerciseId": "march_on_spot", "amount": 1, "unit": "min" },
        { "phase": "Échauffement", "exerciseId": "cat_cow", "amount": 1, "unit": "min" },
        { "phase": "Échauffement", "exerciseId": "thoracic_rotation", "amount": 1, "unit": "min" },
        { "phase": "Échauffement", "exerciseId": "arm_circles", "amount": 60, "unit": "sec" },
        { "phase": "Activation Pilates · Version 2", "exerciseId": "the_hundred", "amount": 10, "unit": "cycles respiratoires" },
        { "phase": "Cycle 1", "exerciseId": "roll_up_simplified", "amount": 12, "unit": "répétitions" },
        { "phase": "Cycle 1", "exerciseId": "toe_taps", "amount": 30, "unit": "répétitions" },
        { "phase": "Cycle 1", "exerciseId": "side_leg_lift", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 1", "exerciseId": "swimming", "amount": 35, "unit": "sec" },
        { "phase": "Cycle 1", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 1", "exerciseId": "side_plank", "amount": 60, "unit": "sec" },
        { "phase": "Cycle 2", "exerciseId": "roll_up_simplified", "amount": 12, "unit": "répétitions" },
        { "phase": "Cycle 2", "exerciseId": "toe_taps", "amount": 30, "unit": "répétitions" },
        { "phase": "Cycle 2", "exerciseId": "side_leg_lift", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 2", "exerciseId": "swimming", "amount": 35, "unit": "sec" },
        { "phase": "Cycle 2", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 2", "exerciseId": "side_plank", "amount": 60, "unit": "sec" },
        { "phase": "Cycle 3", "exerciseId": "roll_up_simplified", "amount": 12, "unit": "répétitions" },
        { "phase": "Cycle 3", "exerciseId": "toe_taps", "amount": 30, "unit": "répétitions" },
        { "phase": "Cycle 3", "exerciseId": "side_leg_lift", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 3", "exerciseId": "swimming", "amount": 35, "unit": "sec" },
        { "phase": "Cycle 3", "exerciseId": "bird_dog", "amount": 24, "unit": "répétitions" },
        { "phase": "Cycle 3", "exerciseId": "side_plank", "amount": 60, "unit": "sec" },
        { "phase": "Retour au calme", "exerciseId": "gentle_back_stretch", "amount": 2, "unit": "min" },
        { "phase": "Retour au calme", "exerciseId": "hip_quad_stretch", "amount": 2, "unit": "min" },
        { "phase": "Respiration", "exerciseId": "slow_breathing", "amount": 1, "unit": "min" }
      ]
    }
  ],

  "progression": [
    "Semaine 1 : Le Courant Intérieur · ajout du Swimming.",
    "Semaine 2 : Les Vents Invisibles · ajout des Toe Taps.",
    "Semaine 3 : Les Arcanes du Mouvement · ajout du Side Leg Lift.",
    "Semaine 4 : Maître du Flux · ajout du Roll Up simplifié.",
    "The Hundred est réalisé en version 2 dans les 12 séances et les 4 Boss.",
    "Chaque séance régulière comprend un échauffement, The Hundred V2, deux défis en 2 cycles et un retour au calme.",
    "Chaque Boss comprend The Hundred V2 puis 3 cycles.",
    "Programme conçu comme la suite directe de Tour du Mage.",
    "Récompense finale : badge Dragon Astral, coffre mystique et +150 XP."
  ],

  "notes": [
    "The Hundred version 2 : jambes tendues à la verticale, talons en contact.",
    "Après The Hundred : 30 secondes de récupération allongé sur le dos.",
    "Objectif : Pilates intermédiaire.",
    "Tour du Mage devient le programme débutant de cette voie.",
    "Maître du Flux ajoute davantage de stabilité, de contrôle et d’équilibre.",
    "Les répétitions par côté sont converties en répétitions totales dans l’application.",
    "Les temps par côté sont convertis en durée totale.",
    "Swimming : nage au sol avec bras et jambes alternés.",
    "Toe Taps : pointe de pied au sol depuis la position jambes levées.",
    "Side Leg Lift : élévation latérale de jambe.",
    "Roll Up simplifié : remontée contrôlée du buste."
  ]
},
   "archimage-corps": {
  id: "archimage-corps",
  subtitle: "Pilates avancé : coordination, leviers plus longs, articulation du rachis et obliques.",
  unlockLevel: 3,
  duration: "25 à 30 min",
  frequency: "3 séances par semaine + boss le samedi",
  material: "Aucun matériel. Tapis conseillé.",
  reward: {
    badgeId: "archimage-corps-vaincu",
    badgeTitle: "Archimage du Corps",
    chest: true,
    nextPrograms: ["grand-maitre-arcanes"]
  },
  weeks: [
    {
      week: 1,
      title: "Le Sceau du Centre",
      xp: 80,
      progression: "Introduction du Single Leg Stretch et consolidation du contrôle du bassin.",
      days: [
        {
          day: 1,
          title: "Coordination du centre",
          xp: 80,
          difficultyLabel: "≈ 25 min",
          instructions: "4 échauffements, The Hundred V3, 2 cycles de 3 exercices, retour au calme.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "single_leg_stretch", amount: 16, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "swimming", amount: 30, unit: "sec" },
            { phase: "Cycle 1", exerciseId: "roll_up_simplified", amount: 10, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "toe_taps", amount: 24, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "side_leg_lift", amount: 20, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "side_plank", amount: 40, unit: "sec" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Centre stable",
          xp: 80,
          difficultyLabel: "≈ 25 min",
          instructions: "Même structure avec accent sur la stabilité lombo-pelvienne.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "pelvic_tilt", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "single_leg_stretch", amount: 16, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "swimming", amount: 30, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "bridge", amount: 14, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "side_leg_lift", amount: 20, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Allonger sans perdre le centre",
          xp: 80,
          difficultyLabel: "≈ 25 min",
          instructions: "Coordination plus longue et obliques sollicités.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "single_leg_stretch", amount: 20, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_simplified", amount: 10, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "toe_taps", amount: 24, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 30, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "side_leg_lift", amount: 20, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "side_plank", amount: 40, unit: "sec" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    },
    {
      week: 2,
      title: "Le Cercle des Deux Astres",
      xp: 90,
      progression: "Ajout du Double Leg Stretch : plus de levier et plus de contrôle.",
      days: [
        {
          day: 1,
          title: "Levier long",
          xp: 90,
          difficultyLabel: "≈ 25 min",
          instructions: "The Hundred V3 précède 2 cycles de 3 exercices.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "double_leg_stretch", amount: 10, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "single_leg_stretch", amount: 20, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_simplified", amount: 10, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 35, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "side_leg_lift", amount: 24, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "side_plank", amount: 45, unit: "sec" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Contrôle bilatéral",
          xp: 90,
          difficultyLabel: "≈ 25 min",
          instructions: "Progression du travail abdominal profond.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "pelvic_tilt", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "toe_taps", amount: 24, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "double_leg_stretch", amount: 10, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "dead_bug", amount: 24, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "bird_dog", amount: 24, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 35, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "bridge", amount: 16, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Précision abdominale",
          xp: 90,
          difficultyLabel: "≈ 25 min",
          instructions: "Le volume monte légèrement sans perdre la qualité.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "single_leg_stretch", amount: 20, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_simplified", amount: 12, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "side_leg_lift", amount: 24, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 35, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "side_plank", amount: 50, unit: "sec" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    },
    {
      week: 3,
      title: "Le Grimoire Déployé",
      xp: 100,
      progression: "Ajout du Roll Up complet, progression naturelle du Roll Up simplifié.",
      days: [
        {
          day: 1,
          title: "Articuler la colonne",
          xp: 100,
          difficultyLabel: "≈ 25-30 min",
          instructions: "Le Roll Up complet apparaît avec faible volume et contrôle maximal.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "pelvic_tilt", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 6, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "single_leg_stretch", amount: 20, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "swimming", amount: 35, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "side_leg_lift", amount: 24, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "side_plank", amount: 50, unit: "sec" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Déployer sans élan",
          xp: 100,
          difficultyLabel: "≈ 25-30 min",
          instructions: "Même structure, un peu plus de précision et de stabilité.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 6, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "toe_taps", amount: 24, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "bird_dog", amount: 24, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 40, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "side_leg_lift", amount: 24, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Fluidité contrôlée",
          xp: 100,
          difficultyLabel: "≈ 25-30 min",
          instructions: "Le Roll Up complet progresse légèrement.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "single_leg_stretch", amount: 24, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 40, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "side_plank", amount: 50, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "bridge", amount: 18, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    },
    {
      week: 4,
      title: "La Spirale de l’Archimage",
      xp: 110,
      progression: "Ajout du Criss Cross : rotation du tronc et coordination oblique.",
      days: [
        {
          day: 1,
          title: "Spirale contrôlée",
          xp: 110,
          difficultyLabel: "≈ 25-30 min",
          instructions: "The Hundred V3 puis 2 cycles de 3 exercices.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "criss_cross", amount: 16, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "single_leg_stretch", amount: 24, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 40, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "side_plank", amount: 60, unit: "sec" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Obliques et stabilité",
          xp: 110,
          difficultyLabel: "≈ 25-30 min",
          instructions: "Rotation et contrôle du bassin.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "pelvic_tilt", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "criss_cross", amount: 16, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "toe_taps", amount: 30, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "side_leg_lift", amount: 24, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 40, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Maîtrise oblique",
          xp: 110,
          difficultyLabel: "≈ 25-30 min",
          instructions: "La semaine se termine avec la version la plus dense du programme.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "single_leg_stretch", amount: 24, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "criss_cross", amount: 20, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "double_leg_stretch", amount: 14, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 45, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "side_plank", amount: 60, unit: "sec" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
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
      title: "Le Gardien du Sceau",
      xp: 90,
      badgeId: "archimage-sceau-centre",
      difficultyLabel: "Boss semaine 1 · 3 cycles",
      instructions: "The Hundred V3 ouvre l’épreuve avant 3 cycles centrés sur le Single Leg Stretch.",
      lockedMessage: "Le Gardien du Sceau attend la maîtrise des 3 séances de la semaine 1.",
      exercises: [
        { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
        { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
        { phase: "Cycle 1", exerciseId: "single_leg_stretch", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "swimming", amount: 30, unit: "sec" },
        { phase: "Cycle 1", exerciseId: "side_plank", amount: 40, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "single_leg_stretch", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "swimming", amount: 30, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "side_plank", amount: 40, unit: "sec" },
        { phase: "Cycle 3", exerciseId: "single_leg_stretch", amount: 20, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "swimming", amount: 30, unit: "sec" },
        { phase: "Cycle 3", exerciseId: "side_plank", amount: 40, unit: "sec" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
        { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
      ]
    },
    {
      week: 2,
      title: "Le Maître des Astres Jumeaux",
      xp: 100,
      badgeId: "archimage-cercle-astres",
      difficultyLabel: "Boss semaine 2 · 3 cycles",
      instructions: "The Hundred V3 puis 3 cycles autour du Double Leg Stretch.",
      lockedMessage: "Le Maître des Astres Jumeaux n’apparaît qu’après les 3 séances de la semaine 2.",
      exercises: [
        { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
        { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
        { phase: "Cycle 1", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "single_leg_stretch", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "swimming", amount: 35, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "single_leg_stretch", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "swimming", amount: 35, unit: "sec" },
        { phase: "Cycle 3", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "single_leg_stretch", amount: 20, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "swimming", amount: 35, unit: "sec" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
        { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
      ]
    },
    {
      week: 3,
      title: "Le Scribe du Grimoire",
      xp: 110,
      badgeId: "archimage-grimoire-deploye",
      difficultyLabel: "Boss semaine 3 · 3 cycles",
      instructions: "The Hundred V3 puis 3 cycles avec Roll Up complet.",
      lockedMessage: "Le Scribe du Grimoire attend la pleine maîtrise de la semaine 3.",
      exercises: [
        { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
        { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
        { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 6, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "swimming", amount: 40, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "roll_up_full", amount: 6, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "swimming", amount: 40, unit: "sec" },
        { phase: "Cycle 3", exerciseId: "roll_up_full", amount: 6, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "swimming", amount: 40, unit: "sec" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
        { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
      ]
    },
    {
      week: 4,
      title: "L’Archimage du Corps",
      xp: 180,
      badgeId: "archimage-corps-vaincu",
      chest: true,
      difficultyLabel: "Boss final · 30 min",
      instructions: "The Hundred V3 puis 3 cycles qui réunissent Single Leg Stretch, Double Leg Stretch, Roll Up complet et Criss Cross.",
      lockedMessage: "L’Archimage du Corps n’apparaît qu’après la semaine 4 complète.",
      exercises: [
        { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "arm_circles", amount: 1, unit: "min" },
        { phase: "Activation Pilates · Version 3", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
        { phase: "Cycle 1", exerciseId: "single_leg_stretch", amount: 24, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "double_leg_stretch", amount: 14, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "criss_cross", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "swimming", amount: 45, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "side_plank", amount: 60, unit: "sec" },
        { phase: "Cycle 3", exerciseId: "single_leg_stretch", amount: 24, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "double_leg_stretch", amount: 14, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "criss_cross", amount: 20, unit: "répétitions" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
        { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
      ]
    }
  ],
  progression: [
    "Semaine 1 : Le Sceau du Centre · ajout du Single Leg Stretch.",
    "Semaine 2 : Le Cercle des Deux Astres · ajout du Double Leg Stretch.",
    "Semaine 3 : Le Grimoire Déployé · ajout du Roll Up complet.",
    "Semaine 4 : La Spirale de l’Archimage · ajout du Criss Cross.",
    "The Hundred est réalisé en version 3 dans les 12 séances et les 4 Boss.",
    "Chaque séance régulière comprend 4 échauffements, The Hundred V3, 2 cycles de 3 exercices et un retour au calme.",
    "Chaque Boss comprend The Hundred V3 puis 3 cycles.",
    "Programme conçu comme la suite directe de Maître du Flux.",
    "Récompense finale : badge Archimage du Corps, coffre mystique et accès au niveau suivant."
  ],
  notes: [
    "The Hundred version 3 : jambes fléchies, pointes proches du sol, genoux et talons joints.",
    "Après The Hundred : 30 secondes de récupération allongé sur le dos.",
    "Objectif : Pilates avancé, sans perdre la qualité du contrôle.",
    "Si le contrôle se dégrade, revenir au Roll Up simplifié ou à The Hundred V2 ponctuellement.",
    "Single Leg Stretch : alterner une jambe pliée et une jambe allongée.",
    "Double Leg Stretch : allonger bras et jambes puis revenir au centre.",
    "Roll Up complet : monter et descendre vertèbre après vertèbre.",
    "Criss Cross : rotation contrôlée du buste, sans tirer sur la nuque."
  ]
},
   "grand-maitre-arcanes": {
  id: "grand-maitre-arcanes",
  subtitle: "Pilates avancé confirmé : jambes tendues, équilibre, gainage dynamique et maîtrise globale.",
  unlockLevel: 4,
  duration: "30 à 35 min",
  frequency: "3 séances par semaine + boss le samedi",
  material: "Aucun matériel. Tapis conseillé.",
  reward: {
    badgeId: "grand-maitre-arcanes-vaincu",
    badgeTitle: "Grand Maître des Arcanes",
    chest: true,
    nextPrograms: ["champion-arenes", "forge-guerrier"]
  },
  weeks: [
    {
      week: 1,
      title: "Les Lames du Vent",
      xp: 95,
      progression: "Ajout du Scissors : jambes tendues et bassin stable.",
      days: [
        {
          day: 1,
          title: "Ciseaux de contrôle",
          xp: 95,
          difficultyLabel: "≈ 30 min",
          instructions: "3 à 4 échauffements, The Hundred V4, 2 cycles de 3 exercices, retour au calme.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "pelvic_tilt", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "scissors", amount: 16, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "swimming", amount: 40, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "criss_cross", amount: 16, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "side_leg_lift", amount: 24, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Bassin immobile",
          xp: 95,
          difficultyLabel: "≈ 30 min",
          instructions: "Le travail sur jambes tendues devient central.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "scissors", amount: 16, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "single_leg_stretch", amount: 24, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 40, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "side_plank", amount: 50, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Amplitude maîtrisée",
          xp: 95,
          difficultyLabel: "≈ 30 min",
          instructions: "Fin de semaine avec un peu plus d’amplitude et de rotation.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "scissors", amount: 20, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "criss_cross", amount: 18, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 45, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "side_leg_lift", amount: 24, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    },
    {
      week: 2,
      title: "L’Orbite des Astres",
      xp: 105,
      progression: "Ajout du Double Straight Leg Lower & Lift.",
      days: [
        {
          day: 1,
          title: "Leviers longs",
          xp: 105,
          difficultyLabel: "≈ 30 min",
          instructions: "Les deux jambes travaillent ensemble, amplitude contrôlée.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "pelvic_tilt", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "double_straight_leg_lower_lift", amount: 6, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "scissors", amount: 20, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "criss_cross", amount: 20, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 45, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "side_leg_lift", amount: 24, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Abaissement contrôlé",
          xp: 105,
          difficultyLabel: "≈ 30 min",
          instructions: "La difficulté vient de la maîtrise, pas de la vitesse.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "double_straight_leg_lower_lift", amount: 6, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "toe_taps", amount: 30, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "double_leg_stretch", amount: 12, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "side_plank", amount: 50, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 45, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Levier avancé",
          xp: 105,
          difficultyLabel: "≈ 30 min",
          instructions: "Le nouvel exercice passe à 8 répétitions si le contrôle est solide.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "scissors", amount: 20, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "criss_cross", amount: 20, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 45, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "side_leg_lift", amount: 24, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    },
    {
      week: 3,
      title: "Le Dragon en Suspension",
      xp: 115,
      progression: "Ajout du Leg Pull Front : gainage dynamique et stabilité des épaules.",
      days: [
        {
          day: 1,
          title: "Planche vivante",
          xp: 115,
          difficultyLabel: "≈ 30-35 min",
          instructions: "Le gainage dynamique devient central.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "pelvic_tilt", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "leg_pull_front", amount: 8, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "criss_cross", amount: 20, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "scissors", amount: 20, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 45, unit: "sec" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Épaules gardiennes",
          xp: 115,
          difficultyLabel: "≈ 30-35 min",
          instructions: "Le bassin reste stable malgré les changements d’appui.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "leg_pull_front", amount: 10, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "scissors", amount: 20, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 45, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "side_plank", amount: 60, unit: "sec" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Suspension dynamique",
          xp: 115,
          difficultyLabel: "≈ 30-35 min",
          instructions: "La troisième séance densifie un peu le gainage dynamique.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "leg_pull_front", amount: 12, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "scissors", amount: 20, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 45, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "criss_cross", amount: 20, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    },
    {
      week: 4,
      title: "Le Trône de l’Archimage",
      xp: 130,
      progression: "Ajout du Teaser I : équilibre global et maîtrise du centre.",
      days: [
        {
          day: 1,
          title: "Teaser préparé",
          xp: 130,
          difficultyLabel: "≈ 30-35 min",
          instructions: "Le Teaser I apparaît avec très peu de répétitions. Reviens à une version préparatoire si besoin.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "pelvic_tilt", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "teaser_i", amount: 4, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "scissors", amount: 24, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "leg_pull_front", amount: 12, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "criss_cross", amount: 22, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Équilibre assis",
          xp: 130,
          difficultyLabel: "≈ 30-35 min",
          instructions: "Deuxième rencontre avec le Teaser I.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "teaser_i", amount: 5, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "toe_taps", amount: 30, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "leg_pull_front", amount: 12, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "swimming", amount: 45, unit: "sec" },
            { phase: "Cycle 2", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "shoulder_arm_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Trône de l’Archimage",
          xp: 130,
          difficultyLabel: "≈ 30-35 min",
          instructions: "Séance finale régulière : densité maximale mais contrôle prioritaire.",
          exercises: [
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "arm_circles", amount: 1, unit: "min" },
            { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
            { phase: "Cycle 1", exerciseId: "teaser_i", amount: 5, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "scissors", amount: 24, unit: "répétitions" },
            { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "leg_pull_front", amount: 12, unit: "répétitions" },
            { phase: "Cycle 2", exerciseId: "criss_cross", amount: 24, unit: "répétitions" },
            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
          ]
        }
      ]
    }
  ],
  bosses: [
    {
      week: 1,
      title: "Djinn des Lames",
      xp: 110,
      badgeId: "grand-djinn-lames",
      difficultyLabel: "Boss semaine 1 · 3 cycles",
      instructions: "The Hundred V4 puis 3 cycles centrés sur Scissors.",
      lockedMessage: "Le Djinn des Lames attend la maîtrise des 3 séances de la semaine 1.",
      exercises: [
        { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
        { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
        { phase: "Cycle 1", exerciseId: "scissors", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "swimming", amount: 40, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "scissors", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "swimming", amount: 40, unit: "sec" },
        { phase: "Cycle 3", exerciseId: "scissors", amount: 20, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "swimming", amount: 40, unit: "sec" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
        { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
      ]
    },
    {
      week: 2,
      title: "Gardien de l’Orbite",
      xp: 120,
      badgeId: "grand-orbite-astres",
      difficultyLabel: "Boss semaine 2 · 3 cycles",
      instructions: "The Hundred V4 puis 3 cycles autour du Double Straight Leg Lower & Lift.",
      lockedMessage: "Le Gardien de l’Orbite se présente après la semaine 2 complète.",
      exercises: [
        { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
        { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
        { phase: "Cycle 1", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "scissors", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "scissors", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "scissors", amount: 20, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
        { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
      ]
    },
    {
      week: 3,
      title: "Dragon Suspendu",
      xp: 130,
      badgeId: "grand-dragon-suspension",
      difficultyLabel: "Boss semaine 3 · 3 cycles",
      instructions: "The Hundred V4 puis 3 cycles avec Leg Pull Front.",
      lockedMessage: "Le Dragon Suspendu exige la maîtrise de la semaine 3.",
      exercises: [
        { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "hip_circles", amount: 1, unit: "min" },
        { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
        { phase: "Cycle 1", exerciseId: "leg_pull_front", amount: 10, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "leg_pull_front", amount: 10, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "leg_pull_front", amount: 10, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
        { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
      ]
    },
    {
      week: 4,
      title: "Grand Maître des Arcanes",
      xp: 220,
      badgeId: "grand-maitre-arcanes-vaincu",
      chest: true,
      difficultyLabel: "Boss final · 35 min",
      instructions: "The Hundred V4 ouvre l’épreuve finale. The Hundred V5 reste une option pour les pratiquants parfaitement stables. Puis 3 cycles réunissent Teaser I, Scissors, Double Straight Leg Lower & Lift et Leg Pull Front.",
      lockedMessage: "Le Grand Maître des Arcanes n’apparaît qu’après la semaine 4 complète.",
      exercises: [
        { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "arm_circles", amount: 1, unit: "min" },
        { phase: "Activation Pilates · Version 4", exerciseId: "the_hundred", amount: 10, unit: "cycles respiratoires" },
        { phase: "Cycle 1", exerciseId: "teaser_i", amount: 5, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "scissors", amount: 24, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "roll_up_full", amount: 8, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "double_straight_leg_lower_lift", amount: 8, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "leg_pull_front", amount: 12, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "criss_cross", amount: 24, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "teaser_i", amount: 5, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "scissors", amount: 24, unit: "répétitions" },
        { phase: "Cycle 3", exerciseId: "leg_pull_front", amount: 12, unit: "répétitions" },
        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
        { phase: "Respiration", exerciseId: "slow_breathing", amount: 1, unit: "min" }
      ]
    }
  ],
  progression: [
    "Semaine 1 : Les Lames du Vent · ajout du Scissors.",
    "Semaine 2 : L’Orbite des Astres · ajout du Double Straight Leg Lower & Lift.",
    "Semaine 3 : Le Dragon en Suspension · ajout du Leg Pull Front.",
    "Semaine 4 : Le Trône de l’Archimage · ajout du Teaser I.",
    "The Hundred est réalisé en version 4 dans les 12 séances et les 4 Boss.",
    "Chaque séance régulière comprend au moins 4 échauffements, The Hundred V4, 2 cycles de 3 exercices et un retour au calme.",
    "Chaque Boss comprend The Hundred V4 puis 3 cycles.",
    "Programme conçu comme la suite directe d’Archimage du Corps.",
    "Récompense finale : badge Grand Maître des Arcanes et coffre mystique."
  ],
  notes: [
    "The Hundred version 4 : jambes tendues inclinées à 45° environ, talons en contact.",
    "The Hundred version 5 peut être testé sur le boss final uniquement si le contrôle est parfait.",
    "Objectif : Pilates avancé confirmé, sans sacrifier la précision.",
    "Scissors : alterner les jambes tendues comme des ciseaux.",
    "Double Straight Leg Lower & Lift : descendre et remonter les deux jambes ensemble.",
    "Leg Pull Front : planche haute avec levée de jambe.",
    "Teaser I : équilibre assis et redescente contrôlée.",
    "Si le contrôle lombaire se perd, réduire l’amplitude ou revenir ponctuellement à une variante plus simple."
  ]

},
   "rempart-heros": {
  id: "rempart-heros",
  subtitle: "Ceinture abdominale intermédiaire : posture, gainage, obliques et protection du dos.",
  unlockLevel: 2,
  duration: "20 min",
  frequency: "3 séances par semaine + boss le samedi",
  material: "Aucun matériel. Tapis conseillé.",
  reward: {
    badgeId: "rempart-heros-vaincu",
    badgeTitle: "Rempart du Héros",
    chest: true,
    nextPrograms: [
      "forge-guerrier",
      "tour-mage",
      "maitre-flux"
    ]
  },
  weeks: [
    {
      week: 1,
      title: "Les Fondations",
      xp: 60,
      progression: "Installation du contrôle abdominal avec le Dead Bug.",
      days: [
        {
          day: 1,
          title: "Le Bouclier",
          xp: 60,
          difficultyLabel: "≈ 20 min",
          instructions: "Nouvel exercice : Dead Bug. Garde les lombaires proches du sol.",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 2, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },

            { phase: "Défi 1", exerciseId: "crunch_controlled", amount: 15, unit: "répétitions" },
            { phase: "Défi 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
            { phase: "Défi 1", exerciseId: "core", amount: 30, unit: "sec" },

            { phase: "Défi 2", exerciseId: "bridge", amount: 15, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "side_plank", amount: 40, unit: "sec" },
            { phase: "Défi 2", exerciseId: "superman", amount: 12, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Les Murailles",
          xp: 60,
          difficultyLabel: "≈ 20 min",
          instructions: "Travail des obliques et du contrôle du bassin.",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 2, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },

            { phase: "Défi 1", exerciseId: "bicycle_crunch", amount: 20, unit: "répétitions" },
            { phase: "Défi 1", exerciseId: "dead_bug", amount: 24, unit: "répétitions" },
            { phase: "Défi 1", exerciseId: "core", amount: 35, unit: "sec" },

            { phase: "Défi 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "bridge", amount: 15, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "side_plank", amount: 50, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Le Bastion",
          xp: 60,
          difficultyLabel: "≈ 20 min",
          instructions: "Séance plus dynamique, mais toujours contrôlée.",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 2, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },

            { phase: "Défi 1", exerciseId: "crunch_controlled", amount: 20, unit: "répétitions" },
            { phase: "Défi 1", exerciseId: "mountain_climber_slow", amount: 30, unit: "sec" },
            { phase: "Défi 1", exerciseId: "dead_bug", amount: 24, unit: "répétitions" },

            { phase: "Défi 2", exerciseId: "core", amount: 40, unit: "sec" },
            { phase: "Défi 2", exerciseId: "superman", amount: 15, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "bridge", amount: 15, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        }
      ]
    },
    {
      week: 2,
      title: "Le Rempart",
      xp: 70,
      progression: "Ajout de la planche avec toucher d’épaule pour travailler l’anti-rotation.",
      days: [
        {
          day: 1,
          title: "Pierres Stables",
          xp: 70,
          difficultyLabel: "≈ 20 min",
          instructions: "Nouvel exercice : planche avec toucher d’épaule.",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 2, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },

            { phase: "Défi 1", exerciseId: "bicycle_crunch", amount: 20, unit: "répétitions" },
            { phase: "Défi 1", exerciseId: "plank_shoulder_taps", amount: 20, unit: "répétitions" },
            { phase: "Défi 1", exerciseId: "dead_bug", amount: 24, unit: "répétitions" },

            { phase: "Défi 2", exerciseId: "core", amount: 40, unit: "sec" },
            { phase: "Défi 2", exerciseId: "bridge", amount: 18, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "side_plank", amount: 50, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Anti-rotation",
          xp: 70,
          difficultyLabel: "≈ 20 min",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 2, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },

            { phase: "Défi 1", exerciseId: "mountain_climber_slow", amount: 40, unit: "sec" },
            { phase: "Défi 1", exerciseId: "plank_shoulder_taps", amount: 24, unit: "répétitions" },
            { phase: "Défi 1", exerciseId: "superman", amount: 15, unit: "répétitions" },

            { phase: "Défi 2", exerciseId: "side_plank", amount: 60, unit: "sec" },
            { phase: "Défi 2", exerciseId: "crunch_controlled", amount: 20, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "dead_bug", amount: 24, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Muraille Active",
          xp: 70,
          difficultyLabel: "≈ 20 min",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 2, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },

            { phase: "Défi 1", exerciseId: "dead_bug", amount: 30, unit: "répétitions" },
            { phase: "Défi 1", exerciseId: "core", amount: 45, unit: "sec" },
            { phase: "Défi 1", exerciseId: "plank_shoulder_taps", amount: 24, unit: "répétitions" },

            { phase: "Défi 2", exerciseId: "bicycle_crunch", amount: 24, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "bird_dog", amount: 20, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "superman", amount: 15, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        }
      ]
    },
    {
      week: 3,
      title: "La Forteresse",
      xp: 80,
      progression: "Ajout du Hollow Hold simplifié pour renforcer le centre du corps.",
      days: [
        {
          day: 1,
          title: "Noyau de Pierre",
          xp: 80,
          difficultyLabel: "≈ 20 min",
          instructions: "Nouvel exercice : Hollow Hold simplifié.",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 2, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },

            { phase: "Défi 1", exerciseId: "hollow_hold_simplified", amount: 20, unit: "sec" },
            { phase: "Défi 1", exerciseId: "dead_bug", amount: 30, unit: "répétitions" },
            { phase: "Défi 1", exerciseId: "crunch_controlled", amount: 20, unit: "répétitions" },

            { phase: "Défi 2", exerciseId: "core", amount: 45, unit: "sec" },
            { phase: "Défi 2", exerciseId: "bridge", amount: 20, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "side_plank", amount: 60, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Forteresse Active",
          xp: 80,
          difficultyLabel: "≈ 20 min",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 2, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },

            { phase: "Défi 1", exerciseId: "hollow_hold_simplified", amount: 25, unit: "sec" },
            { phase: "Défi 1", exerciseId: "mountain_climber_slow", amount: 45, unit: "sec" },
            { phase: "Défi 1", exerciseId: "plank_shoulder_taps", amount: 28, unit: "répétitions" },

            { phase: "Défi 2", exerciseId: "superman", amount: 18, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "side_plank", amount: 60, unit: "sec" },
            { phase: "Défi 2", exerciseId: "dead_bug", amount: 30, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Rempart Intérieur",
          xp: 80,
          difficultyLabel: "≈ 20 min",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 2, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },

            { phase: "Défi 1", exerciseId: "hollow_hold_simplified", amount: 30, unit: "sec" },
            { phase: "Défi 1", exerciseId: "bicycle_crunch", amount: 24, unit: "répétitions" },
            { phase: "Défi 1", exerciseId: "core", amount: 50, unit: "sec" },

            { phase: "Défi 2", exerciseId: "bird_dog", amount: 24, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "dead_bug", amount: 30, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "bridge", amount: 20, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        }
      ]
    },
    {
      week: 4,
      title: "Le Bouclier du Héros",
      xp: 90,
      progression: "Ajout de la planche dynamique. Dernière étape avant le boss final.",
      days: [
        {
          day: 1,
          title: "Bouclier Mobile",
          xp: 90,
          difficultyLabel: "≈ 20 min",
          instructions: "Nouvel exercice : planche dynamique.",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 2, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },

            { phase: "Défi 1", exerciseId: "dynamic_plank", amount: 10, unit: "répétitions" },
            { phase: "Défi 1", exerciseId: "hollow_hold_simplified", amount: 30, unit: "sec" },
            { phase: "Défi 1", exerciseId: "crunch_controlled", amount: 25, unit: "répétitions" },

            { phase: "Défi 2", exerciseId: "dead_bug", amount: 30, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "superman", amount: 20, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "side_plank", amount: 60, unit: "sec" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        },
        {
          day: 2,
          title: "Assaut du Rempart",
          xp: 90,
          difficultyLabel: "≈ 20 min",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 2, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },

            { phase: "Défi 1", exerciseId: "mountain_climber_slow", amount: 60, unit: "sec" },
            { phase: "Défi 1", exerciseId: "core", amount: 60, unit: "sec" },
            { phase: "Défi 1", exerciseId: "dynamic_plank", amount: 12, unit: "répétitions" },

            { phase: "Défi 2", exerciseId: "bicycle_crunch", amount: 30, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "bridge", amount: 20, unit: "répétitions" },
            { phase: "Défi 2", exerciseId: "plank_shoulder_taps", amount: 24, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        },
        {
          day: 3,
          title: "Circuit du Héros",
          xp: 90,
          difficultyLabel: "≈ 20 min",
          instructions: "Circuit en 2 cycles.",
          exercises: [
            { phase: "Échauffement", exerciseId: "walk", amount: 2, unit: "min" },
            { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
            { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
            { phase: "Échauffement", exerciseId: "bird_dog", amount: 12, unit: "répétitions" },
            { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },

            { phase: "Défi 1 · Cycle 1", exerciseId: "dynamic_plank", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "hollow_hold_simplified", amount: 30, unit: "sec" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "dead_bug", amount: 24, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "crunch_controlled", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 1", exerciseId: "superman", amount: 15, unit: "répétitions" },

            { phase: "Défi 1 · Cycle 2", exerciseId: "dynamic_plank", amount: 10, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "hollow_hold_simplified", amount: 30, unit: "sec" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "dead_bug", amount: 24, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "crunch_controlled", amount: 20, unit: "répétitions" },
            { phase: "Défi 1 · Cycle 2", exerciseId: "superman", amount: 15, unit: "répétitions" },

            { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
            { phase: "Retour au calme", exerciseId: "hip_quad_stretch", amount: 1, unit: "min" },
            { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
          ]
        }
      ]
    }
  ],
  bosses: [
    {
      week: 1,
      title: "Le Gardien de Pierre",
      xp: 50,
      badgeId: "rempart-gardien-pierre",
      difficultyLabel: "Boss semaine 1 · 2 tours",
      instructions: "Débloqué après les 3 séances de la semaine 1.",
      lockedMessage: "Le Gardien de Pierre attend un socle solide. Termine les 3 séances de la semaine.",
      exercises: [
        { phase: "Cycle 1", exerciseId: "crunch_controlled", amount: 15, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "core", amount: 30, unit: "sec" },
        { phase: "Cycle 1", exerciseId: "side_plank", amount: 40, unit: "sec" },
        { phase: "Cycle 1", exerciseId: "superman", amount: 10, unit: "répétitions" },

        { phase: "Cycle 2", exerciseId: "crunch_controlled", amount: 15, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "dead_bug", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "core", amount: 30, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "side_plank", amount: 40, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "superman", amount: 10, unit: "répétitions" }
      ]
    },
    {
      week: 2,
      title: "Le Chevalier du Rempart",
      xp: 60,
      badgeId: "rempart-chevalier",
      difficultyLabel: "Boss semaine 2 · 2 tours",
      instructions: "Débloqué après les 3 séances de la semaine 2.",
      lockedMessage: "Le Chevalier du Rempart n’affronte que les héros réguliers.",
      exercises: [
        { phase: "Cycle 1", exerciseId: "core", amount: 40, unit: "sec" },
        { phase: "Cycle 1", exerciseId: "plank_shoulder_taps", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "dead_bug", amount: 24, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "crunch_controlled", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "superman", amount: 12, unit: "répétitions" },

        { phase: "Cycle 2", exerciseId: "core", amount: 40, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "plank_shoulder_taps", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "dead_bug", amount: 24, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "crunch_controlled", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "superman", amount: 12, unit: "répétitions" }
      ]
    },
    {
      week: 3,
      title: "La Forteresse Vivante",
      xp: 70,
      badgeId: "rempart-forteresse-vivante",
      difficultyLabel: "Boss semaine 3 · 2 tours",
      instructions: "Débloqué après les 3 séances de la semaine 3.",
      lockedMessage: "La Forteresse Vivante attend un centre du corps solide.",
      exercises: [
        { phase: "Cycle 1", exerciseId: "hollow_hold_simplified", amount: 20, unit: "sec" },
        { phase: "Cycle 1", exerciseId: "core", amount: 45, unit: "sec" },
        { phase: "Cycle 1", exerciseId: "crunch_controlled", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "side_plank", amount: 60, unit: "sec" },
        { phase: "Cycle 1", exerciseId: "superman", amount: 15, unit: "répétitions" },

        { phase: "Cycle 2", exerciseId: "hollow_hold_simplified", amount: 20, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "core", amount: 45, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "crunch_controlled", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "side_plank", amount: 60, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "superman", amount: 15, unit: "répétitions" }
      ]
    },
    {
      week: 4,
      title: "Le Rempart du Héros",
      xp: 100,
      badgeId: "rempart-heros-vaincu",
      chest: true,
      difficultyLabel: "Boss final · 25 à 30 min",
      instructions: "Débloqué après les 3 séances de la semaine 4. Boss final du programme.",
      lockedMessage: "Le Rempart du Héros ne se dresse qu’après une préparation complète.",
      exercises: [
        { phase: "Échauffement", exerciseId: "walk", amount: 2, unit: "min" },
        { phase: "Échauffement", exerciseId: "hip_circles", amount: 30, unit: "sec" },
        { phase: "Échauffement", exerciseId: "cat_cow", amount: 1, unit: "min" },
        { phase: "Échauffement", exerciseId: "abdominal_breathing", amount: 1, unit: "min" },

        { phase: "Cycle 1", exerciseId: "dead_bug", amount: 30, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "core", amount: 60, unit: "sec" },
        { phase: "Cycle 1", exerciseId: "plank_shoulder_taps", amount: 24, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "hollow_hold_simplified", amount: 30, unit: "sec" },
        { phase: "Cycle 1", exerciseId: "bicycle_crunch", amount: 25, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "superman", amount: 20, unit: "répétitions" },
        { phase: "Cycle 1", exerciseId: "dynamic_plank", amount: 10, unit: "répétitions" },

        { phase: "Cycle 2", exerciseId: "dead_bug", amount: 30, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "core", amount: 60, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "plank_shoulder_taps", amount: 24, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "hollow_hold_simplified", amount: 30, unit: "sec" },
        { phase: "Cycle 2", exerciseId: "bicycle_crunch", amount: 25, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "superman", amount: 20, unit: "répétitions" },
        { phase: "Cycle 2", exerciseId: "dynamic_plank", amount: 10, unit: "répétitions" },

        { phase: "Retour au calme", exerciseId: "gentle_back_stretch", amount: 2, unit: "min" },
        { phase: "Retour au calme", exerciseId: "thoracic_rotation", amount: 1, unit: "min" },
        { phase: "Respiration", exerciseId: "slow_breathing", amount: 2, unit: "min" }
      ]
    }
  ],
  progression: [
    "Semaine 1 : Les Fondations · ajout du Dead Bug.",
    "Semaine 2 : Le Rempart · ajout de la planche avec toucher d’épaule.",
    "Semaine 3 : La Forteresse · ajout du Hollow Hold simplifié.",
    "Semaine 4 : Le Bouclier du Héros · ajout de la planche dynamique.",
    "Chaque séance dure environ 20 minutes avec échauffement et retour au calme.",
    "Les boss sont réalisés en 2 cycles.",
    "Aucun temps de gainage frontal ne dépasse 60 secondes."
  ],
  notes: [
    "Programme intermédiaire centré sur la ceinture abdominale.",
    "Objectif : renforcer le transverse, les obliques, le grand droit, les lombaires et les stabilisateurs du bassin.",
    "Les répétitions par côté sont converties en répétitions totales dans l’application.",
    "Pour le gainage latéral, la durée affichée correspond au total gauche + droite.",
    "Si les lombaires se creusent pendant le Dead Bug ou le Hollow Hold, réduire l’amplitude.",
    "La priorité est la qualité du mouvement, pas la vitesse."
  ]
},
   "marche-aventurier": {
  "id": "marche-aventurier",
  "subtitle": "Marche très progressive pour personne très sédentaire, sans recherche de performance.",
  "unlockLevel": 1,
  "duration": "5 à 20 min selon la semaine (indicatif, pauses possibles)",
  "frequency": "3 séances essentielles par semaine · 4 semaines + boss hebdomadaire",
  "material": "Chaussures confortables. Terrain plat recommandé.",
  "reward": {
    "badgeId": "marcheur-royaumes-vaincu",
    "badgeTitle": "Marcheur des Royaumes",
    "chest": true,
    "nextPrograms": [
      "coeur-dragon",
      "cavalier-route",
      "messager-sentiers"
    ]
  },
  "weeks": [
    {
      "week": 1,
      "title": "Les premiers pas",
      "xp": 60,
      "progression": "Marche sur terrain plat, allure confortable, pauses libres. Répéter la semaine si nécessaire.",
      "days": [
        {
          "day": 1,
          "title": "Le sentier s'ouvre",
          "xp": 60,
          "difficultyLabel": "≈ 5 min",
          "instructions": "Marche douce à allure permettant de parler. Terrain plat, pauses autorisées. La durée est indicative et peut être fractionnée.",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 5,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        {
          "day": 2,
          "title": "Sur la route",
          "xp": 60,
          "difficultyLabel": "≈ 7 min",
          "instructions": "Marche douce à allure permettant de parler. Terrain plat, pauses autorisées. La durée est indicative et peut être fractionnée.",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 7,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        {
          "day": 3,
          "title": "La halte du voyageur",
          "xp": 60,
          "difficultyLabel": "≈ 8 min",
          "instructions": "Marche douce à allure permettant de parler. Terrain plat, pauses autorisées. La durée est indicative et peut être fractionnée.",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 8,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        }
      ]
    },
    {
      "week": 2,
      "title": "Le pont des brumes",
      "xp": 60,
      "progression": "Marche sur terrain plat, allure confortable, pauses libres. Répéter la semaine si nécessaire.",
      "days": [
        {
          "day": 1,
          "title": "Le sentier s'ouvre",
          "xp": 60,
          "difficultyLabel": "≈ 8 min",
          "instructions": "Marche douce à allure permettant de parler. Terrain plat, pauses autorisées. La durée est indicative et peut être fractionnée.",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 8,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        {
          "day": 2,
          "title": "Sur la route",
          "xp": 60,
          "difficultyLabel": "≈ 10 min",
          "instructions": "Marche douce à allure permettant de parler. Terrain plat, pauses autorisées. La durée est indicative et peut être fractionnée.",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 10,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        {
          "day": 3,
          "title": "La halte du voyageur",
          "xp": 60,
          "difficultyLabel": "≈ 12 min",
          "instructions": "Marche douce à allure permettant de parler. Terrain plat, pauses autorisées. La durée est indicative et peut être fractionnée.",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 12,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        }
      ]
    },
    {
      "week": 3,
      "title": "Les collines oubliées",
      "xp": 60,
      "progression": "Marche sur terrain plat, allure confortable, pauses libres. Répéter la semaine si nécessaire.",
      "days": [
        {
          "day": 1,
          "title": "Le sentier s'ouvre",
          "xp": 60,
          "difficultyLabel": "≈ 12 min",
          "instructions": "Marche douce à allure permettant de parler. Terrain plat, pauses autorisées. La durée est indicative et peut être fractionnée.",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 12,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        {
          "day": 2,
          "title": "Sur la route",
          "xp": 60,
          "difficultyLabel": "≈ 15 min",
          "instructions": "Marche douce à allure permettant de parler. Terrain plat, pauses autorisées. La durée est indicative et peut être fractionnée.",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 15,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        {
          "day": 3,
          "title": "La halte du voyageur",
          "xp": 60,
          "difficultyLabel": "≈ 15 min",
          "instructions": "Marche douce à allure permettant de parler. Terrain plat, pauses autorisées. La durée est indicative et peut être fractionnée.",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 15,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        }
      ]
    },
    {
      "week": 4,
      "title": "La route de la citadelle",
      "xp": 60,
      "progression": "Marche sur terrain plat, allure confortable, pauses libres. Répéter la semaine si nécessaire.",
      "days": [
        {
          "day": 1,
          "title": "Le sentier s'ouvre",
          "xp": 60,
          "difficultyLabel": "≈ 15 min",
          "instructions": "Marche douce à allure permettant de parler. Terrain plat, pauses autorisées. La durée est indicative et peut être fractionnée.",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 15,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        {
          "day": 2,
          "title": "Sur la route",
          "xp": 60,
          "difficultyLabel": "≈ 18 min",
          "instructions": "Marche douce à allure permettant de parler. Terrain plat, pauses autorisées. La durée est indicative et peut être fractionnée.",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 18,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        {
          "day": 3,
          "title": "La halte du voyageur",
          "xp": 60,
          "difficultyLabel": "≈ 20 min",
          "instructions": "Marche douce à allure permettant de parler. Terrain plat, pauses autorisées. La durée est indicative et peut être fractionnée.",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 20,
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
      "title": "Le Rat des Sentiers",
      "xp": 50,
      "badgeId": "marche-bottes-cuir",
      "difficultyLabel": "Boss semaine 1 · ≈ 8 min",
      "instructions": "Débloqué après les trois séances essentielles de la semaine. À réaliser après récupération, sans obligation de le faire le samedi.",
      "lockedMessage": "Valide les trois marches essentielles pour débloquer cette rencontre.",
      "variants": {
        "indoor": {
          "id": "indoor",
          "label": "🏠 Boss Intérieur",
          "title": "Le Rat des Sentiers",
          "mission": "Marche douce en intérieur, pauses possibles.",
          "difficultyLabel": "≈ 8 min",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 8,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        "outdoor": {
          "id": "outdoor",
          "label": "🌲 Boss Extérieur",
          "title": "Le Rat des Sentiers",
          "mission": "Marche sur chemin plat à rythme confortable.",
          "difficultyLabel": "≈ 8 min",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 8,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        }
      }
    },
    {
      "week": 2,
      "title": "Le Loup Solitaire",
      "xp": 50,
      "badgeId": "marche-cape-voyage",
      "difficultyLabel": "Boss semaine 2 · ≈ 12 min",
      "instructions": "Débloqué après les trois séances essentielles de la semaine. À réaliser après récupération, sans obligation de le faire le samedi.",
      "lockedMessage": "Valide les trois marches essentielles pour débloquer cette rencontre.",
      "variants": {
        "indoor": {
          "id": "indoor",
          "label": "🏠 Boss Intérieur",
          "title": "Le Loup Solitaire",
          "mission": "Marche douce en intérieur, pauses possibles.",
          "difficultyLabel": "≈ 12 min",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 12,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        "outdoor": {
          "id": "outdoor",
          "label": "🌲 Boss Extérieur",
          "title": "Le Loup Solitaire",
          "mission": "Marche sur chemin plat à rythme confortable.",
          "difficultyLabel": "≈ 12 min",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 12,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        }
      }
    },
    {
      "week": 3,
      "title": "Le Sanglier des Fourrés",
      "xp": 50,
      "badgeId": "marche-baton-voyageur",
      "difficultyLabel": "Boss semaine 3 · ≈ 15 min",
      "instructions": "Débloqué après les trois séances essentielles de la semaine. À réaliser après récupération, sans obligation de le faire le samedi.",
      "lockedMessage": "Valide les trois marches essentielles pour débloquer cette rencontre.",
      "variants": {
        "indoor": {
          "id": "indoor",
          "label": "🏠 Boss Intérieur",
          "title": "Le Sanglier des Fourrés",
          "mission": "Marche douce en intérieur, pauses possibles.",
          "difficultyLabel": "≈ 15 min",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 15,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        "outdoor": {
          "id": "outdoor",
          "label": "🌲 Boss Extérieur",
          "title": "Le Sanglier des Fourrés",
          "mission": "Marche sur chemin plat à rythme confortable.",
          "difficultyLabel": "≈ 15 min",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 15,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        }
      }
    },
    {
      "week": 4,
      "title": "Le Rôdeur des Terres Sauvages",
      "xp": 50,
      "badgeId": "marcheur-royaumes-vaincu",
      "difficultyLabel": "Boss semaine 4 · ≈ 20 min",
      "instructions": "Débloqué après les trois séances essentielles de la semaine. À réaliser après récupération, sans obligation de le faire le samedi.",
      "lockedMessage": "Valide les trois marches essentielles pour débloquer cette rencontre.",
      "variants": {
        "indoor": {
          "id": "indoor",
          "label": "🏠 Boss Intérieur",
          "title": "Le Rôdeur des Terres Sauvages",
          "mission": "Marche douce en intérieur, pauses possibles.",
          "difficultyLabel": "≈ 20 min",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 20,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        },
        "outdoor": {
          "id": "outdoor",
          "label": "🌲 Boss Extérieur",
          "title": "Le Rôdeur des Terres Sauvages",
          "mission": "Marche sur chemin plat à rythme confortable.",
          "difficultyLabel": "≈ 20 min",
          "exercises": [
            {
              "phase": "Endurance douce",
              "exerciseId": "walk",
              "amount": 20,
              "unit": "min",
              "distanceOptional": true
            }
          ]
        }
      }
    }
  ],
  "progression": [
    "Trois séances essentielles par semaine ; deux activités liées à l’objectif restent facultatives.",
    "Le boss se débloque après les trois séances essentielles.",
    "Les marches peuvent être fractionnées, avec pauses, et les semaines répétées sans nouvelles récompenses.",
    "Arrêter en cas de douleur thoracique, malaise, vertiges ou essoufflement anormal."
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
      "image": "assets/familiers/familier_grenouille.webp"
    },
    {
      "id": "familier-02",
      "name": "Plumérion",
      "image": "assets/familiers/familier_hibou.webp"
    },
    {
      "id": "familier-03",
      "name": "Flambis",
      "image": "assets/familiers/familier_renard.webp"
    },
    {
      "id": "familier-04",
      "name": "Noxplume",
      "image": "assets/familiers/familier_corbeau.webp"
    },
    {
      "id": "familier-05",
      "name": "Bravouf",
      "image": "assets/familiers/familier_chien.webp"
    },
    {
      "id": "familier-06",
      "name": "Noctimaow",
      "image": "assets/familiers/familier_chat.webp"
    },
    {
      "id": "familier-07",
      "name": "Gribzouk",
      "image": "assets/familiers/familier_diablotin.webp"
    },
    {
      "id": "familier-08",
      "name": "Pyrolins",
      "image": "assets/familiers/familier_dragon.webp"
    },
     {
      "id": "familier-09",
      "name": "Lunminelle",
      "image": "assets/familiers/familier_axolot.webp"
    },
     {
      "id": "familier-10",
      "name": "Calmabulle",
      "image": "assets/familiers/familier_capybara.webp"
    },
     {
      "id": "familier-11",
      "name": "Sylvanelle",
      "image": "assets/familiers/familier_cerf.webp"
    },
     {
      "id": "familier-12",
      "name": "Crépuskule",
      "image": "assets/familiers/familier_chauvesouris.webp"
    },
     {
      "id": "familier-13",
      "name": "Corneliot",
      "image": "assets/familiers/familier_chevre.webp"
    },
     {
      "id": "familier-14",
      "name": "Grisvent",
      "image": "assets/familiers/familier_chien2.webp"
    },
     {
      "id": "familier-15",
      "name": "Grandcrocs",
      "image": "assets/familiers/familier_crocodile.webp"
    },
     {
      "id": "familier-16",
      "name": "Noiselys",
      "image": "assets/familiers/familier_ecureuil.webp"
    },
     {
      "id": "familier-17",
      "name": "Piquelune",
      "image": "assets/familiers/familier_herisson.webp"
    },
     {
      "id": "familier-18",
      "name": "Griffonus",
      "image": "assets/familiers/familier_hippogriffe.webp"
    },
     {
      "id": "familier-19",
      "name": "Eukalyptus",
      "image": "assets/familiers/familier_koala.webp"
    },
     {
      "id": "familier-20",
      "name": "Bondonyx",
      "image": "assets/familiers/familier_lapin.webp"
    },
     {
      "id": "familier-21",
      "name": "Etoilys",
      "image": "assets/familiers/familier_licorne.webp"
    },
     {
      "id": "familier-22",
      "name": "Silverine",
      "image": "assets/familiers/familier_loutre.webp"
    },
     {
      "id": "familier-23",
      "name": "Moumoute",
      "image": "assets/familiers/familier_mouton.webp"
    },
     {
      "id": "familier-24",
      "name": "Bamboulys",
      "image": "assets/familiers/familier_panda.webp"
    },
     {
      "id": "familier-25",
      "name": "Vifroux",
      "image": "assets/familiers/familier_pandaroux.webp"
    },
     {
      "id": "familier-26",
      "name": "Nuagelle",
      "image": "assets/familiers/familier_pegase.webp"
    },
     {
      "id": "familier-27",
      "name": "Fireflam",
      "image": "assets/familiers/familier_phenix.webp"
    },
     {
      "id": "familier-28",
      "name": "Ondinou",
      "image": "assets/familiers/familier_phoque.webp"
    },
     {
      "id": "familier-29",
      "name": "Masquille",
      "image": "assets/familiers/familier_ratonlaveur.webp"
    },
     {
      "id": "familier-30",
      "name": "Fiolys",
      "image": "assets/familiers/familier_souris.webp"
    },
     {
      "id": "familier-31",
      "name": "Carapazur",
      "image": "assets/familiers/familier_tortue.webp"
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
  id: "ballet-petite-sylphe",
  icon: "🩰",
  title: "Petite Sylphe",
  description: "Vaincre le boss de la semaine 1 du programme Ballet des Sylphes.",
  type: "program-boss",
  programId: "ballet-sylphes",
  weekNumber: 1,
  target: 1,
  image: "assets/badges/badge_petitesylphe.webp"
},
{
  id: "ballet-cygne-argente",
  icon: "🦢",
  title: "Cygne Argenté",
  description: "Vaincre le boss de la semaine 2 du programme Ballet des Sylphes.",
  type: "program-boss",
  programId: "ballet-sylphes",
  weekNumber: 2,
  target: 1,
  image: "assets/badges/badge_cygneargente.webp"
},
{
  id: "ballet-esprit-theatre",
  icon: "🎭",
  title: "Esprit du Théâtre",
  description: "Vaincre le boss de la semaine 3 du programme Ballet des Sylphes.",
  type: "program-boss",
  programId: "ballet-sylphes",
  weekNumber: 3,
  target: 1,
  image: "assets/badges/badge_espritdutheatre.webp"
},
{
  id: "ballet-reine-sylphes",
  icon: "👑",
  title: "Reine des Sylphes",
  description: "Vaincre le boss final du programme Ballet des Sylphes.",
  type: "program-boss",
  programId: "ballet-sylphes",
  weekNumber: 4,
  target: 1,
  image: "assets/badges/badge_reinedessylphes.webp"
},
    {
  id: "rempart-gardien-pierre",
  icon: "🪨",
  title: "Gardien de Pierre",
  description: "Vaincre le boss de la semaine 1 du programme Rempart du Héros.",
  type: "program-boss",
  programId: "rempart-heros",
  weekNumber: 1,
  target: 1,
  image: "assets/badges/badge_gardiendepierre.webp"
},
{
  id: "rempart-chevalier",
  icon: "🛡️",
  title: "Chevalier du Rempart",
  description: "Vaincre le boss de la semaine 2 du programme Rempart du Héros.",
  type: "program-boss",
  programId: "rempart-heros",
  weekNumber: 2,
  target: 1,
  image: "assets/badges/badge_chevalierdurempart.webp"
},
{
  id: "rempart-forteresse-vivante",
  icon: "🏰",
  title: "Forteresse Vivante",
  description: "Vaincre le boss de la semaine 3 du programme Rempart du Héros.",
  type: "program-boss",
  programId: "rempart-heros",
  weekNumber: 3,
  target: 1,
  image: "assets/badges/badge_forteressevivante.webp"
},
{
  id: "rempart-heros-vaincu",
  icon: "👑",
  title: "Rempart du Héros",
  description: "Vaincre le boss final du programme Rempart du Héros.",
  type: "program-boss",
  programId: "rempart-heros",
  weekNumber: 4,
  target: 1,
  image: "assets/badges/badge_rempartduheros.webp"
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
      "id": "pilates-5-seances",
      "icon": "🧘",
      "title": "Pilates",
      "description": "Valider 5 séances de programmes Pilates.",
      "type": "programGroup",
      "programIds": [
        "tour-mage",
        "maitre-flux"
      ],
      "target": 5
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
      id: "marche-bottes-cuir",
      icon: "🥾",
      title: "Bottes de Cuir",
      description: "Vaincre le boss de la semaine 1 du programme Marche de l’Aventurier.",
      type: "program-boss",
      programId: "marche-aventurier",
      weekNumber: 1,
      target: 1
    },
    {
      id: "marche-cape-voyage",
      icon: "🧥",
      title: "Cape de Voyage",
      description: "Vaincre le boss de la semaine 2 du programme Marche de l’Aventurier.",
      type: "program-boss",
      programId: "marche-aventurier",
      weekNumber: 2,
      target: 1
    },
    {
      id: "marche-baton-voyageur",
      icon: "🪵",
      title: "Bâton du Voyageur",
      description: "Vaincre le boss de la semaine 3 du programme Marche de l’Aventurier.",
      type: "program-boss",
      programId: "marche-aventurier",
      weekNumber: 3,
      target: 1
    },
    {
      id: "marcheur-royaumes-vaincu",
      icon: "🌲",
      title: "Marcheur des Royaumes",
      description: "Vaincre le boss final du programme Marche de l’Aventurier.",
      type: "program-boss",
      programId: "marche-aventurier",
      weekNumber: 4,
      target: 1
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
      "title": "Minotaure",
      "description": "Vaincre le boss de la semaine 2 du programme Champion des Arènes.",
      "type": "program-boss",
      "programId": "champion-arenes",
      "weekNumber": 2,
      "target": 1
    },
    {
      "id": "seigneur-fer-vaincu",
      "icon": "⚒️",
      "title": "Seigneur de Fer",
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
    },

    {
      "id": "sanctuaire-epaules-liberees",
      "icon": "🌿",
      "title": "Épaules Libérées",
      "description": "Terminer la mission douce de la semaine 1 du Sanctuaire du Voyageur.",
      "type": "program-boss",
      "programId": "sanctuaire-voyageur",
      "weekNumber": 1,
      "target": 1
    },
    {
      "id": "sanctuaire-colonne-assouplie",
      "icon": "🪶",
      "title": "Colonne Assouplie",
      "description": "Terminer la mission douce de la semaine 2 du Sanctuaire du Voyageur.",
      "type": "program-boss",
      "programId": "sanctuaire-voyageur",
      "weekNumber": 2,
      "target": 1
    },
    {
      "id": "sanctuaire-souffle-retrouve",
      "icon": "🌬️",
      "title": "Souffle Retrouvé",
      "description": "Terminer la mission douce de la semaine 3 du Sanctuaire du Voyageur.",
      "type": "program-boss",
      "programId": "sanctuaire-voyageur",
      "weekNumber": 3,
      "target": 1
    },
    {
      "id": "sanctuaire-serenite-mage",
      "icon": "🌙",
      "title": "Sérénité du Mage",
      "description": "Terminer la mission finale du Sanctuaire du Voyageur.",
      "type": "program-boss",
      "programId": "sanctuaire-voyageur",
      "weekNumber": 4,
      "target": 1
    },
    {
  "id": "flux-courant-interieur",
  "icon": "🌊",
  "title": "Courant Intérieur",
  "description": "Vaincre le boss de la semaine 1 du programme Maître du Flux.",
  "type": "program-boss",
  "programId": "maitre-flux",
  "weekNumber": 1,
  "target": 1
},
{
  "id": "flux-vents-invisibles",
  "icon": "💨",
  "title": "sylphe des ruines",
  "description": "Vaincre le boss de la semaine 2 du programme Maître du Flux.",
  "type": "program-boss",
  "programId": "maitre-flux",
  "weekNumber": 2,
  "target": 1
},
{
  "id": "flux-arcanes-mouvement",
  "icon": "✨",
  "title": "gardien des nuages",
  "description": "Vaincre le boss de la semaine 3 du programme Maître du Flux.",
  "type": "program-boss",
  "programId": "maitre-flux",
  "weekNumber": 3,
  "target": 1
},
{
  "id": "flux-dragon-astral",
  "icon": "🐉",
  "title": "Dragon Astral spirituel",
  "description": "Vaincre le boss final du programme Maître du Flux.",
  "type": "program-boss",
  "programId": "maitre-flux",
  "weekNumber": 4,
  "target": 1
},
{
  "id": "archimage-sceau-centre",
  "icon": "🜂",
  "title": "Gardien du Sceau",
  "description": "Vaincre le boss de la semaine 1 du programme Archimage du Corps.",
  "type": "program-boss",
  "programId": "archimage-corps",
  "weekNumber": 1,
  "target": 1
},
{
  "id": "archimage-cercle-astres",
  "icon": "🌗",
  "title": "Maître des Astres Jumeaux",
  "description": "Vaincre le boss de la semaine 2 du programme Archimage du Corps.",
  "type": "program-boss",
  "programId": "archimage-corps",
  "weekNumber": 2,
  "target": 1
},
{
  "id": "archimage-grimoire-deploye",
  "icon": "📜",
  "title": "Scribe du Grimoire",
  "description": "Vaincre le boss de la semaine 3 du programme Archimage du Corps.",
  "type": "program-boss",
  "programId": "archimage-corps",
  "weekNumber": 3,
  "target": 1
},
{
  "id": "archimage-corps-vaincu",
  "icon": "🧙",
  "title": "Archimage du Corps",
  "description": "Vaincre le boss final du programme Archimage du Corps.",
  "type": "program-boss",
  "programId": "archimage-corps",
  "weekNumber": 4,
  "target": 1
},
{
  "id": "grand-djinn-lames",
  "icon": "🌪️",
  "title": "Djinn des Lames",
  "description": "Vaincre le boss de la semaine 1 du programme Grand Maître des Arcanes.",
  "type": "program-boss",
  "programId": "grand-maitre-arcanes",
  "weekNumber": 1,
  "target": 1
},
{
  "id": "grand-orbite-astres",
  "icon": "🌙",
  "title": "Gardien de l’Orbite",
  "description": "Vaincre le boss de la semaine 2 du programme Grand Maître des Arcanes.",
  "type": "program-boss",
  "programId": "grand-maitre-arcanes",
  "weekNumber": 2,
  "target": 1
},
{
  "id": "grand-dragon-suspension",
  "icon": "🐲",
  "title": "Dragon Suspendu",
  "description": "Vaincre le boss de la semaine 3 du programme Grand Maître des Arcanes.",
  "type": "program-boss",
  "programId": "grand-maitre-arcanes",
  "weekNumber": 3,
  "target": 1
},
{
  "id": "grand-maitre-arcanes-vaincu",
  "icon": "🔮",
  "title": "Grand Maître des Arcanes",
  "description": "Vaincre le boss final du programme Grand Maître des Arcanes.",
  "type": "program-boss",
  "programId": "grand-maitre-arcanes",
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

// Conserver les étapes et leurs indices pour les séances commencées avant la révision.
{
  const legacy = window.FitnessRpgData.programDetails["coeur-dragon"];
  const frequency = "3 séances essentielles, 2 compléments facultatifs et 1 boss";
  const safety = "Tu dois pouvoir parler en phrases. Ralentis ou marche sur place si le souffle devient trop court. Fais une pause si nécessaire. Arrête en cas de douleur ou de malaise.";
  const movementCues = {
    stomping: "Marche sur place à petits pas. Pose les pieds doucement et garde toujours un pied au sol.",
    slow_knee_raises: "Monte les genoux à une hauteur confortable, sans saut. Utilise un appui stable si besoin.",
    lateral_steps: "Fais de petits pas de côté, sans croiser les pieds. Reviens au centre sans tourner sur le genou.",
    cross_knee_tap: "Approche la main du genou opposé, sans forcer le contact. Alterne lentement.",
    step_touch: "Fais un pas de côté puis rapproche l’autre pied. Réduis la largeur du pas au besoin.",
    butt_kicks: "Ramène un talon vers l’arrière en gardant l’autre pied au sol. Alterne doucement.",
    skater_steps: "Transfère le poids d’un pied à l’autre avec un petit pas latéral, sans saut.",
    light_boxer: "Fais de petits pas alternés, pieds près du sol. Laisse les bras accompagner le mouvement."
  };
  const step = (phase, exerciseId, seconds, cue) => ({
    phase,
    exerciseId,
    amount: seconds % 60 === 0 ? seconds / 60 : seconds,
    unit: seconds % 60 === 0 ? "min" : "sec",
    cue
  });
  const warmup = step("Échauffement", "dynamic_walk", 240, "Commence en marchant lentement. Accélère un peu seulement si tu restes à l’aise.");
  const cooldown = step("Retour au calme", "walk", 120, "Ralentis progressivement jusqu’à retrouver un souffle facile.");
  const walk = (phase, seconds) => step(phase, "walk", seconds, "Marche à allure facile, dehors sur du plat ou sur place à l’intérieur.");
  const recovery = (phase, seconds) => step(phase, "walk", seconds, "Reviens à une marche lente. Prolonge la récupération si tu ne peux pas encore parler facilement.");
  const movement = (phase, id, seconds) => step(phase, id, seconds, movementCues[id]);
  const workout = (instructions, exercises) => {
    const seconds = exercises.reduce((total, item) => total + item.amount * (item.unit === "min" ? 60 : 1), 0);
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return {
      instructions: instructions + " " + safety,
      difficultyLabel: minutes + " min" + (remainder ? " " + remainder + " s" : ""),
      exercises
    };
  };
  const intervals = (label, moves, effort, rest) => moves.flatMap((id, index) => {
    const phase = label + " · Cycle " + (index + 1);
    return [movement(phase, id, effort), recovery(phase, rest)];
  });
  const walkIntervals = (count, effort, rest, cue) => Array.from({ length: count }, (_, index) => {
    const phase = "Marche par blocs · Cycle " + (index + 1);
    return [step(phase, "walk_acceleration", effort, cue), recovery(phase, rest)];
  }).flat();

  const progressions = [
    "Trouve une allure à laquelle tu peux discuter et découvre les pas sans sauter.",
    "Alterne 30 secondes un peu plus actives et une minute de marche facile.",
    "Allonge les blocs d’effort à allure modérée. Garde assez de récupération pour parler aisément.",
    "Conserve l’allure de la semaine 3. Fais le dernier bloc à ton allure habituelle si tu as besoin de ménager ton souffle."
  ];
  const weeks = legacy.weeks.map((week, index) => {
    const cardioMoves = ["stomping", "slow_knee_raises", "lateral_steps", "step_touch"];
    if (index === 3) cardioMoves.push("light_boxer");
    const cardio = intervals("Cardio et récupération", cardioMoves, index < 2 ? 30 : 45, [45, 60, 75, 75][index]);
    const coordinationMoves = ["lateral_steps", "cross_knee_tap", "step_touch", "slow_knee_raises", "butt_kicks", "skater_steps", "cross_knee_tap"];
    const coordination = coordinationMoves.slice(0, index + 3).flatMap((id, cycle) => {
      const phase = "Coordination · Cycle " + (cycle + 1);
      return [movement(phase, id, 30), movement(phase, coordinationMoves[cycle + 1], 30), recovery(phase, 60)];
    });
    const endurance = index === 2
      ? walkIntervals(3, 240, 60, "Marche d’un pas régulier, un peu plus soutenu si tu peux toujours parler.")
      : [step("Endurance", "walk", [600, 780, 900, 1080][index], "Choisis un terrain plat. Garde une allure que tu peux tenir jusqu’au bout et ralentis si nécessaire.")];
    const warmupMobility = walk("Échauffement", 120);
    const mobilityMoves = ["lateral_steps", "slow_knee_raises", "cross_knee_tap", "step_touch"];
    const essentialWorkouts = [
      workout("Fais les mouvements à petite amplitude, puis récupère en marchant."
        + (index === 3 ? " Fais le cinquième bloc à allure modérée seulement si la semaine 3 a été bien tolérée. Sinon, marche tranquillement." : ""), [
        warmup, ...cardio, walk("Marche facile", index === 0 ? 120 : 180), cooldown
      ]),
      workout("Travaille la fluidité avant la vitesse. Fais les pas près d’un mur si tu as besoin d’un appui.", [
        warmup, ...coordination, walk("Marche facile", 60), cooldown
      ]),
      workout("Fais la marche sur terrain plat ou à l’intérieur, à ton rythme. Tu peux couper un bloc en plusieurs passages.", [
        warmup, ...endurance, cooldown
      ])
    ];
    const optionalDays = [
      {
        day: 4,
        title: "Marche de récupération",
        optional: true,
        xp: 0,
        ...workout("Choisis un jour sans séance essentielle. Avance à une allure qui te permet de discuter facilement.", [
          walk("Échauffement", 120), walk("Récupération active", [240, 300, 360, 480][index]), cooldown
        ])
      },
      {
        day: 5,
        title: "Mobilité et coordination",
        optional: true,
        xp: 0,
        ...workout("Répète les pas lentement pour gagner en aisance. Garde les mouvements petits et confortables.", [
          warmupMobility,
          ...intervals("Pas tranquilles", mobilityMoves.slice(0, 2 + Math.floor(index / 2)), 30, index === 3 ? 60 : 30),
          cooldown
        ])
      }
    ];
    return {
      ...week,
      progression: progressions[index],
      days: [...week.days.map((day, dayIndex) => ({ ...day, ...essentialWorkouts[dayIndex] })), ...optionalDays]
    };
  });

  const bosses = legacy.bosses.map((boss, index) => {
    const indoorMoves = ["step_touch", "slow_knee_raises", "lateral_steps", "cross_knee_tap", "skater_steps"].slice(0, index + 2);
    const indoor = [
      warmup,
      ...intervals("Parcours intérieur", indoorMoves, index < 2 ? 30 : 45, index < 2 ? 60 : 75),
      walk("Marche facile", [240, 330, 300, 360][index]),
      cooldown
    ];
    const outdoor = [
      warmup,
      walk("Parcours sur terrain plat", [420, 330, 360, 540][index]),
      ...walkIntervals([0, 3, 4, 4][index], index < 2 ? 30 : 45, index < 2 ? 60 : 75,
        "Augmente légèrement l’allure en restant capable de parler. Tu peux garder ta marche habituelle."),
      cooldown
    ];
    return {
      ...boss,
      variants: {
        indoor: { ...boss.variants.indoor, ...workout("Reprends des pas connus dans un espace dégagé. Garde un pied au sol.", indoor) },
        outdoor: { ...boss.variants.outdoor, ...workout("Choisis un terrain plat. Suis les blocs guidés et ralentis dès que parler devient difficile.", outdoor) }
      }
    };
  });

  window.FitnessRpgData.programDetails["coeur-dragon"] = {
    ...legacy,
    legacyWorkouts: { weeks: legacy.weeks, bosses: legacy.bosses },
    workoutRevision: 1,
    subtitle: "Quatre semaines pour apprendre à doser le souffle, coordonner les pas et tenir une marche régulière.",
    duration: "12 à 25 min par séance essentielle",
    frequency,
    weeks,
    bosses,
    progression: [
      "Espace les trois séances essentielles, par exemple lundi, mercredi et vendredi.",
      "Les deux compléments sont facultatifs. Les trois séances essentielles débloquent le boss de la semaine.",
      "Choisis la variante intérieure ou extérieure et place le boss un jour où tu te sens reposé.",
      "Refais une semaine à la même allure si tu as besoin de plus de temps pour t’y sentir à l’aise."
    ],
    notes: ["Les récupérations figurent dans le minuteur. Reste à une allure où tu peux parler en phrases."]
  };
}

// Les séances enregistrées avant cette révision conservent l'ordre de leurs exercices.
{
  const legacy = window.FitnessRpgData.programDetails["tour-mage"];
  const reps = (exerciseId, amount, cue) => ({ exerciseId, amount, unit: "répétitions", cue });
  const seconds = (exerciseId, amount, cue) => ({ exerciseId, amount, unit: "sec", cue });
  const phase = (name, items) => items.map((item) => ({ ...item, phase: name }));

  const warmup = phase("Échauffement", [
    seconds("march_on_spot", 90, "Marche à allure facile. Garde un appui stable à portée de main."),
    reps("cat_cow", 6, "À quatre pattes, arrondis et relâche doucement le dos. Garde une petite amplitude.")
  ]);
  const cooldown = phase("Retour au calme", [
    seconds("slow_breathing", 60, "Laisse le souffle ralentir naturellement, sans apnée.")
  ]);
  const safety = "Respire pendant l’effort. Prends environ 30 s entre exercices et 45 à 60 s entre les tours. Réduis l’amplitude ou le temps si tu perds la position. Arrête en cas de douleur ou de malaise.";
  const sides = (exerciseId, duration, cue) => ["gauche", "droit"].map((side) =>
    seconds(exerciseId, duration, "Côté " + side + ". " + cue)
  );
  const rotation = reps("thoracic_rotation", 8, "Alterne 4 fois par côté. Debout, tourne le buste lentement, bassin stable, sans forcer.");
  const tilt = reps("pelvic_tilt", 6, "Sur le dos, genoux pliés, bascule doucement le bassin en expirant, puis relâche.");
  const makeWorkout = (name, items, rounds) => [
    ...warmup,
    ...Array.from({ length: rounds }, (_, index) =>
      phase(name + " · Cycle " + (index + 1), items)
    ).flat(),
    ...cooldown
  ];

  const progressions = [
    "Apprends à stabiliser le bassin en respirant. Garde une petite amplitude et un appui pour l’équilibre.",
    "Introduis le gainage latéral sur les genoux et répète les mouvements de la première semaine.",
    "Passe à deux tours si un tour reste confortable, avec une respiration et une posture stables.",
    "Conserve deux tours. Allonge légèrement les maintiens et ajoute deux répétitions aux mouvements alternés si la technique reste stable."
  ];
  const weeks = legacy.weeks.map((week, index) => {
    const rounds = index < 2 ? 1 : 2;
    const dose = [6, 8, 8, 10][index];
    const bridge = reps("bridge", dose, "Pieds au sol, expire en montant les hanches. Arrête avant de cambrer et redescends lentement.");
    const deadBug = reps("dead_bug", dose, "Alterne, moitié des répétitions par côté. Garde la tête au sol et raccourcis le trajet. Au besoin, déplace une jambe à la fois, bras immobiles.");
    const birdDog = reps("bird_dog", dose, "Alterne, moitié des répétitions par côté. Garde le bassin face au sol. Au besoin, tends un seul membre ou fais glisser le pied au sol.");
    const front = seconds("knee_plank", index === 3 ? 20 : 15, "Avant-bras et genoux au sol, coudes sous les épaules. Garde les hanches dans l’alignement et respire.");
    const lateral = index === 0 ? [front] : sides("side_plank_knees", index === 3 ? 15 : 10,
      "Coude sous l’épaule, genoux pliés. Soulève les hanches juste assez pour aligner le tronc. Repose les hanches avant de changer de côté.");
    const balance = sides("single_leg_balance", index === 3 ? 20 : 15,
      "Près d’un mur, tiens-toi sur cette jambe, genou souple. Pose les doigts au mur ou le pied libre au sol si nécessaire.");
    const day = (slot, title, focus, items) => ({
      day: slot,
      title,
      xp: week.days[slot - 1].xp,
      difficultyLabel: rounds === 1 ? "8 à 13 min" : "12 à 19 min",
      instructions: focus + " " + safety + " Si le deuxième tour est trop exigeant, arrête et reprends la semaine précédente lors de ta prochaine séance.",
      exercises: makeWorkout(title, items, rounds)
    });
    return {
      ...week,
      progression: progressions[index],
      days: [
        day(1, "Centre et bassin", "Laisse un jour de récupération entre les séances essentielles.", [tilt, deadBug, bridge, front]),
        day(2, "Mobilité et stabilité latérale", "Cherche un mouvement fluide et confortable.", [rotation, birdDog, ...lateral]),
        day(3, "Équilibre et contrôle", "Reste près d’un mur ou d’un appui stable.", [...balance, deadBug, birdDog, bridge]),
        {
          day: 4,
          optional: true,
          title: "Mobilité douce",
          xp: 20,
          difficultyLabel: "5 à 8 min",
          instructions: "Complément facultatif pour un jour sans séance essentielle. Fais un seul passage, à allure facile et sans chercher à gagner en amplitude. " + safety,
          exercises: [...warmup, ...phase("Mobilité", [rotation, tilt]), ...cooldown]
        }
      ]
    };
  });

  const bosses = legacy.bosses.map((boss, index) => ({
    ...boss,
    optional: true,
    difficultyLabel: "Stabilité · un tour",
    instructions: "Complément facultatif après les trois séances essentielles. Place-le un autre jour, si tu te sens reposé. " + safety,
    lockedMessage: "Termine les trois séances essentielles pour débloquer ce défi facultatif.",
    exercises: makeWorkout("Stabilité", weeks[index].days[1].exercises.filter(
      (item) => item.phase.endsWith("Cycle 1")
    ), 1)
  }));

  window.FitnessRpgData.programDetails["tour-mage"] = {
    ...legacy,
    legacyWorkouts: { weeks: legacy.weeks, bosses: legacy.bosses },
    workoutRevision: 1,
    subtitle: "Mobilité, gainage et équilibre sur quatre semaines.",
    duration: "8 à 19 min",
    frequency: "3 séances essentielles et 2 compléments facultatifs",
    material: "Tapis conseillé et mur ou appui stable pour l’équilibre.",
    weeks,
    bosses,
    progression: [
      ...progressions.map((line, index) => "Semaine " + (index + 1) + " · " + line),
      "Répartis les trois séances essentielles sur des jours non consécutifs, par exemple lundi, mercredi et vendredi.",
      "Mobilité douce et boss de stabilité sont facultatifs. Les trois séances essentielles suffisent pour passer à la semaine suivante.",
      "Les boss gardent leurs récompenses. Le Dragon Astral donne accès au badge Tour du Mage et au coffre final.",
      "Garde les doses de la semaine précédente si la technique ou la respiration se dégrade. En cas de douleur ou de malaise, arrête."
    ],
    notes: [
      "Pour les exercices alternés, le total indiqué se partage entre les deux côtés.",
      "Les maintiens de chaque côté sont affichés et chronométrés séparément."
    ]
  };
}

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

window.FitnessRpgData.exerciseImageOverrides = {
  arm_circles: { male: "assets/exercices/exercice_homme_cerclesdebras.webp" },
  arm_open_close: { male: "assets/exercices/exercice_homme_cerclesdebras.webp" },
  slow_knee_raises: { male: "assets/exercices/exercice_homme_monteesdegenouxlentes.webp" },
  mountain_climber_slow: { male: "assets/exercices/exercice_homme_mountainclimberlent.webp" },
  lateral_steps: { male: "assets/exercices/exercice_homme_paslateraux.webp" },
  walk_acceleration: { male: "assets/exercices/exercice_homme_marcheactive.webp" },
  no_jump_jacks: { male: "assets/exercices/exercice_homme_jumpingjacksanssaut.webp" },
  slow_walk: { male: "assets/exercices/exercice_homme_marche.webp" },
  walk: { male: "assets/exercices/exercice_homme_marcheactive.webp" },
  run_outdoor: { male: "assets/exercices/exercice_homme_courseexterieure.webp" },
  cyclist_half_squat: { male: "assets/exercices/exercice_homme_demisquatcycliste.webp" },
  ankle_circles: { male: "assets/exercices/exercice_homme_cerclesdechevilles.webp" },
  demi_plie: { female: "assets/exercices/exercice_femme_demiplie.webp" },
  second_position_arms: { female: "assets/exercices/exercice_femme_brasenseconde.webp" },
  swan_step: { female: "assets/exercices/exercice_femme_pasducygne.webp" },
  arabesque_simplified: { female: "assets/exercices/exercice_femme_arabesquesimplifiee.webp" },
  front_developpe_simplified: { female: "assets/exercices/exercice_femme_developpeavantsimplifie.webp" },
  court_bow: { female: "assets/exercices/exercice_femme_reverencedelacour.webp" },
  single_leg_balance: { male: "assets/exercices/exercice_homme_equilibresurunejambe.webp" },
  slow_calf_raises: { male: "assets/exercices/exercice_homme_monteessurpointeslentes.webp" },
  squats: { male: "assets/exercices/exercice_homme_squats.webp" },
  wall_sit: { male: "assets/exercices/exercice_homme_chaisecontremur.webp" },
  reverse_lunges: { male: "assets/exercices/exercice_homme_fentesarriere.webp" },
  calf_raises: { male: "assets/exercices/exercice_homme_monteessurpointes.webp" },
  bridge: { male: "assets/exercices/exercice_homme_pontdehanches.webp" },
  single_leg_bridge_alternate: { male: "assets/exercices/exercice_homme_pontdehanchesunejambealternee.webp" },
  superman: { male: "assets/exercices/exercice_homme_superman.webp" },
  wall_pushups: { male: "assets/exercices/exercice_homme_pompesmurales.webp" },
  wall_triceps_extension: { male: "assets/exercices/exercice_homme_extensiontricepsmur.webp" },
  dead_bug_simplified: { male: "assets/exercices/exercice_homme_deadbugsimplifie.webp" },
  the_hundred: { male: "assets/exercices/exercice_homme_the_hundred.webp", female: "assets/exercices/exercice_femme_the_hundred.webp" },
  swimming: { male: "assets/exercices/exercice_homme_swimming.webp", female: "assets/exercices/exercice_femme_swimming.webp" },
  toe_taps: { male: "assets/exercices/exercice_homme_toe_taps.webp", female: "assets/exercices/exercice_femme_toe_taps.webp" },
  side_leg_lift: { male: "assets/exercices/exercice_homme_side_leg_lift.webp", female: "assets/exercices/exercice_femme_side_leg_lift.webp" },
  roll_up_simplified: { male: "assets/exercices/exercice_homme_roll_up_simplifie.webp", female: "assets/exercices/exercice_femme_roll_up_simplifie.webp" },
  pilates: { male: "assets/exercices/exercice_homme_pilates.webp" },
  cat_cow: { male: "assets/exercices/exercice_homme_chatvache.webp" },
  hip_circles: { male: "assets/exercices/exercice_homme_cerclesdehanches.webp" },
  thoracic_rotation: { male: "assets/exercices/exercice_homme_rotationthoracique.webp" },
  abdominal_breathing: { male: "assets/exercices/exercice_homme_respirationabdominale.webp" },
  slow_breathing_extended: { male: "assets/exercices/exercice_homme_respirationfinale.webp" }
};

window.FitnessRpgData.applyExerciseImageOverrides = function applyExerciseImageOverrides() {
  const exercises = Array.isArray(window.FitnessRpgData.exercises) ? window.FitnessRpgData.exercises : [];
  const overrides = window.FitnessRpgData.exerciseImageOverrides || {};

  exercises.forEach((exercise) => {
    const patch = overrides[exercise.id];
    if (!patch) return;

    exercise.images = {
      ...(exercise.images || {}),
      ...patch
    };
  });
};

window.FitnessRpgData.applyExerciseImageOverrides();

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

  const ownedIds = [...new Set(
    alreadyOwnedIds
      .map((item) => {
        return typeof item === "string" ? item : item?.id;
      })
      .filter(Boolean)
  )];

  const remainingFamiliars = allFamiliars.filter((familiar) => {
    return familiar?.id && !ownedIds.includes(familiar.id);
  });

  if (!remainingFamiliars.length) {
    return {
      familiar: null,
      isNew: false,
      allCollected: true
    };
  }

  const randomIndex = Math.floor(Math.random() * remainingFamiliars.length);
  const selected = remainingFamiliars[randomIndex];

  return {
    familiar: selected,
    isNew: true,
    allCollected: false
  };
};
// ============================================================
// Vérification d’intégrité des données
// ============================================================

window.FitnessRpgData.checkIntegrity = async function checkIntegrity(options = {}) {
  const data = window.FitnessRpgData || {};
  const config = window.FitnessRpgConfig || {};
  const checkImages = options.checkImages === true;

  const report = {
    errors: [],
    warnings: [],
    info: []
  };

  const addError = (message) => report.errors.push(message);
  const addWarning = (message) => report.warnings.push(message);
  const addInfo = (message) => report.info.push(message);

  const exercises = Array.isArray(data.exercises) ? data.exercises : [];
  const badges = Array.isArray(data.badges) ? data.badges : [];
  const familiars = Array.isArray(data.rewardFamiliars) ? data.rewardFamiliars : [];
  const categories = Array.isArray(data.exerciseCategories) ? data.exerciseCategories : [];
  const programDetails = data.programDetails || {};
  const configPrograms = Array.isArray(config.programs) ? config.programs : [];

  const exerciseIds = new Set(exercises.map((exercise) => exercise.id).filter(Boolean));
  const badgeIds = new Set(badges.map((badge) => badge.id).filter(Boolean));
  const categoryIds = new Set(categories.map((category) => category.id).filter(Boolean));
  const programDetailIds = new Set(Object.keys(programDetails));
  const configProgramIds = new Set(configPrograms.map((program) => program.id).filter(Boolean));

  const imagePaths = new Set();

  function checkDuplicateIds(list, typeName) {
    const seen = new Set();
    const duplicates = new Set();

    list.forEach((item) => {
      if (!item || !item.id) return;

      if (seen.has(item.id)) {
        duplicates.add(item.id);
      }

      seen.add(item.id);
    });

    duplicates.forEach((id) => {
      addError(`Doublon ${typeName} : "${id}"`);
    });
  }

  function collectImage(path, context) {
    if (!path || typeof path !== "string") return;

    imagePaths.add(path);

    if (!/\.(png|jpg|jpeg|webp|gif|svg)$/i.test(path)) {
      addWarning(`Image avec extension suspecte : ${context} -> ${path}`);
    }

    if (path.includes(" ")) {
      addWarning(`Image avec espace dans le chemin : ${context} -> ${path}`);
    }

    if (path.includes(".pn")) {
      addWarning(`Image probablement tronquée .pn : ${context} -> ${path}`);
    }

    if (path.includes("holss") || path.includes("hols")) {
      addWarning(`Image possiblement mal orthographiée : ${context} -> ${path}`);
    }
  }

  function checkExerciseList(exerciseList, context) {
    if (!Array.isArray(exerciseList)) {
      addWarning(`${context} : liste d’exercices absente ou invalide`);
      return;
    }

    exerciseList.forEach((item, index) => {
      const location = `${context} · exercice ${index + 1}`;

      if (!item.exerciseId) {
        addError(`${location} : exerciseId manquant`);
        return;
      }

      if (!exerciseIds.has(item.exerciseId)) {
        addError(`${location} : exercice introuvable "${item.exerciseId}"`);
      }

      if (item.amount === undefined || item.amount === null) {
        addWarning(`${location} : amount manquant pour "${item.exerciseId}"`);
      }

      if (!item.unit) {
        addWarning(`${location} : unit manquante pour "${item.exerciseId}"`);
      }
    });
  }

  function checkNextPrograms(nextPrograms, context) {
    if (!Array.isArray(nextPrograms)) return;

    nextPrograms.forEach((programId) => {
      if (!programDetailIds.has(programId) && !configProgramIds.has(programId)) {
        addWarning(`${context} : programme débloqué introuvable "${programId}"`);
      }
    });
  }

  function checkProgram(program, programId) {
    if (!program) {
      addError(`Programme invalide : "${programId}"`);
      return;
    }

    if (program.id && program.id !== programId) {
      addWarning(`Programme "${programId}" : id interne différent "${program.id}"`);
    }

    if (program.reward?.badgeId && !badgeIds.has(program.reward.badgeId)) {
      addWarning(`Programme "${programId}" : badge de récompense introuvable "${program.reward.badgeId}"`);
    }

    checkNextPrograms(program.reward?.nextPrograms, `Programme "${programId}" reward`);

    if (Array.isArray(program.days)) {
      program.days.forEach((day) => {
        checkExerciseList(day.exercises, `Programme "${programId}" · Jour ${day.day || "?"} · ${day.title || "Sans titre"}`);
      });
    }

    if (Array.isArray(program.weeks)) {
      program.weeks.forEach((week) => {
        if (!Array.isArray(week.days)) {
          addWarning(`Programme "${programId}" · semaine ${week.week || "?"} : days manquant`);
          return;
        }

        week.days.forEach((day) => {
          checkExerciseList(
            day.exercises,
            `Programme "${programId}" · Semaine ${week.week || "?"} · Jour ${day.day || "?"} · ${day.title || "Sans titre"}`
          );
        });
      });
    }

    if (Array.isArray(program.bosses)) {
      program.bosses.forEach((boss) => {
        const bossContext = `Programme "${programId}" · Boss semaine ${boss.week || "?"} · ${boss.title || "Sans titre"}`;

        if (boss.badgeId && !badgeIds.has(boss.badgeId)) {
          addWarning(`${bossContext} : badge introuvable "${boss.badgeId}"`);
        }

        checkNextPrograms(boss.nextPrograms, bossContext);

        if (boss.variants) {
          Object.values(boss.variants).forEach((variant) => {
            checkExerciseList(variant.exercises, `${bossContext} · Variante ${variant.label || variant.id || "?"}`);
          });
        } else {
          checkExerciseList(boss.exercises, bossContext);
        }
      });
    }
  }

  // Doublons
  checkDuplicateIds(exercises, "exercice");
  checkDuplicateIds(badges, "badge");
  checkDuplicateIds(familiars, "familier");
  checkDuplicateIds(configPrograms, "programme app-config");

  // Exercices
  exercises.forEach((exercise) => {
    if (!exercise.id) {
      addError("Exercice sans id");
      return;
    }

    if (!exercise.title) {
      addWarning(`Exercice "${exercise.id}" : title manquant`);
    }

    if (!exercise.categoryId) {
      addWarning(`Exercice "${exercise.id}" : categoryId manquant`);
    } else if (!categoryIds.has(exercise.categoryId)) {
      addWarning(`Exercice "${exercise.id}" : catégorie introuvable "${exercise.categoryId}"`);
    }

    if (exercise.images) {
      Object.entries(exercise.images).forEach(([gender, path]) => {
        collectImage(path, `Exercice "${exercise.id}" · ${gender}`);
      });

      const femaleImage = exercise.images.female || exercise.images.femme;
      if (femaleImage && femaleImage.includes("femme_default")) {
        addWarning(`Exercice "${exercise.id}" : image femme encore par défaut`);
      }
    } else {
      addWarning(`Exercice "${exercise.id}" : images manquant`);
    }
  });

  // Programmes app-config <-> programDetails
  configProgramIds.forEach((programId) => {
    if (!programDetailIds.has(programId)) {
      addWarning(`app-config : programme sans détail "${programId}"`);
    }
  });

  programDetailIds.forEach((programId) => {
    if (!configProgramIds.has(programId)) {
      addWarning(`programDetails : programme absent de app-config "${programId}"`);
    }

    checkProgram(programDetails[programId], programId);
  });

  // Badges
  badges.forEach((badge) => {
    if (!badge.id) {
      addError("Badge sans id");
      return;
    }

    if (!badge.title) {
      addWarning(`Badge "${badge.id}" : title manquant`);
    }

    if (badge.programId && !programDetailIds.has(badge.programId) && !configProgramIds.has(badge.programId)) {
      addWarning(`Badge "${badge.id}" : programme introuvable "${badge.programId}"`);
    }

    if (badge.type === "program-boss" && !badge.weekNumber) {
      addWarning(`Badge "${badge.id}" : weekNumber manquant`);
    }

    if (badge.image) {
      collectImage(badge.image, `Badge "${badge.id}"`);
    } else {
      addWarning(`Badge "${badge.id}" : image manquante`);
    }
  });

  // Familiers
  familiars.forEach((familiar) => {
    if (!familiar.id) {
      addError("Familier sans id");
      return;
    }

    if (!familiar.name) {
      addWarning(`Familier "${familiar.id}" : name manquant`);
    }

    collectImage(familiar.image, `Familier "${familiar.id}"`);
  });

  // Coachs
  Object.values(data.coaches || {}).forEach((coach) => {
    if (!coach.id) return;

    collectImage(coach.image, `Coach "${coach.id}" image`);
    collectImage(coach.fallbackImage, `Coach "${coach.id}" fallbackImage`);

    Object.entries(coach.poses || {}).forEach(([pose, path]) => {
      collectImage(path, `Coach "${coach.id}" pose "${pose}"`);
    });
  });

  // Catégories
  categories.forEach((category) => {
    if (!category.id) {
      addError("Catégorie sans id");
      return;
    }

    Object.entries(category.images || {}).forEach(([gender, path]) => {
      collectImage(path, `Catégorie "${category.id}" · ${gender}`);
    });
  });

  // Vérification réelle des images, optionnelle
  if (checkImages) {
    const paths = Array.from(imagePaths);

    for (const path of paths) {
      try {
        let response = await fetch(path, {
          method: "HEAD",
          cache: "no-store"
        });

        if (!response.ok || response.status === 405) {
          response = await fetch(path, {
            method: "GET",
            cache: "no-store"
          });
        }

        if (!response.ok) {
          addWarning(`Image inaccessible : ${path} · HTTP ${response.status}`);
        }
      } catch (error) {
        addWarning(`Image impossible à vérifier : ${path}`);
      }
    }
  }

  addInfo(`${exercises.length} exercices analysés`);
  addInfo(`${Object.keys(programDetails).length} programmes détaillés analysés`);
  addInfo(`${badges.length} badges analysés`);
  addInfo(`${familiars.length} familiers analysés`);
  addInfo(`${imagePaths.size} chemins d’images recensés`);

  console.group("🛡️ Fitness RPG · Vérification d’intégrité");
  console.log(`Erreurs : ${report.errors.length}`);
  console.log(`Avertissements : ${report.warnings.length}`);
  console.log(`Infos : ${report.info.length}`);

  if (report.errors.length) {
    console.group("❌ Erreurs");
    console.table(report.errors.map((message) => ({ message })));
    console.groupEnd();
  }

  if (report.warnings.length) {
    console.group("⚠️ Avertissements");
    console.table(report.warnings.map((message) => ({ message })));
    console.groupEnd();
  }

  if (report.info.length) {
    console.group("ℹ️ Infos");
    console.table(report.info.map((message) => ({ message })));
    console.groupEnd();
  }

  console.groupEnd();

  return report;
};

// ============================================================
// Optimisation Forge du guerrier - revision 2 (20/11/2026)
// Les anciennes séances et leurs récompenses ne sont pas modifiées.
// Aucun asset graphique n'est créé ou remplacé.
// ============================================================
{
  const data = window.FitnessRpgData;
  const previous = data.programDetails["forge-guerrier"];
  if (previous && !data.exercises.some((exercise) => exercise.id === "supported_row_water_bottle")) {
    data.exercises.push({
  "id": "supported_row_water_bottle",
  "categoryId": "strength",
  "title": "Rowing unilatéral avec bouteille",
  "images": {
    "male": "assets/exercices/homme_default.png",
    "female": "assets/exercices/femme_default.png"
  },
  "description": "Tirage du dos avec une bouteille d’eau légère, buste soutenu et dos neutre. Répartis le total entre les deux bras.",
  "unit": "répétitions",
  "defaultValue": 12,
  "min": 2,
  "step": 2,
  "xpPerUnit": 0.8,
  "stat": "Dos / omoplates",
  "pose": "core"
});
  }
  if (previous && Number(previous.workoutRevision || 0) < 2) {
    const improved = {
  "workoutRevision": 2,
  "subtitle": "Force générale progressive : jambes, dos, poitrine, épaules et stabilité.",
  "duration": "20 à 35 min (récupérations comprises)",
  "frequency": "3 séances essentielles + 2 compléments facultatifs par semaine · boss après les 3 essentielles",
  "material": "Chaise stable, tapis et petite bouteille d’eau (ou haltère léger).",
  "weeks": [
    {
      "week": 1,
      "title": "L’Apprenti Forgeron",
      "xp": 60,
      "progression": "Apprendre les gestes : deux séries courtes, amplitude confortable et appuis stables.",
      "days": [
        {
          "day": 1,
          "title": "Les fondations de fer",
          "xp": 60,
          "difficultyLabel": "≈ 20 à 30 min, pauses comprises",
          "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
          "exercises": [
            {
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min",
              "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "arm_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Petits cercles progressifs, épaules détendues.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "hip_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Mouvements lents, pieds bien ancrés.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "slow_knee_raises",
              "amount": 60,
              "unit": "sec",
              "cue": "Alterne les jambes avec un support si nécessaire.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "chair_squat",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Descends seulement aussi bas que tu peux maintenir tes genoux alignés.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Pousse par les talons sans cambrer le dos.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "knee_plank",
              "amount": 15,
              "unit": "sec",
              "cue": "Garde le bassin stable, respire.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 60,
              "unit": "sec",
              "cue": "Récupération libre, sans te presser."
            },
            {
              "exerciseId": "chair_squat",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Descends seulement aussi bas que tu peux maintenir tes genoux alignés.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Pousse par les talons sans cambrer le dos.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "knee_plank",
              "amount": 15,
              "unit": "sec",
              "cue": "Garde le bassin stable, respire.",
              "phase": "Récupération"
            },
            {
              "exerciseId": "slow_walk",
              "amount": 1,
              "unit": "min",
              "cue": "Marche lentement, laisse le souffle revenir.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min",
              "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min",
              "cue": "Respiration naturelle, sans apnée.",
              "phase": "Retour au calme"
            }
          ]
        },
        {
          "day": 2,
          "title": "Le marteau du guerrier",
          "xp": 60,
          "difficultyLabel": "≈ 20 à 30 min, pauses comprises",
          "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
          "exercises": [
            {
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min",
              "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "arm_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Petits cercles progressifs, épaules détendues.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "hip_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Mouvements lents, pieds bien ancrés.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "slow_knee_raises",
              "amount": 60,
              "unit": "sec",
              "cue": "Alterne les jambes avec un support si nécessaire.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "wall_pushups",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Support fixé et stable. Garde les épaules abaissées.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 12,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "shoulder_press_1kg",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Petite charge ou bouteilles légères. Si douleur à l’épaule, garde une amplitude réduite.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "dead_bug_simplified",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Alterne droite/gauche et maintiens le bas du dos confortable.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 60,
              "unit": "sec",
              "cue": "Récupération libre, sans te presser."
            },
            {
              "exerciseId": "wall_pushups",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Support fixé et stable. Garde les épaules abaissées.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 12,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "shoulder_press_1kg",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Petite charge ou bouteilles légères. Si douleur à l’épaule, garde une amplitude réduite.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "dead_bug_simplified",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Alterne droite/gauche et maintiens le bas du dos confortable.",
              "phase": "Récupération"
            },
            {
              "exerciseId": "slow_walk",
              "amount": 1,
              "unit": "min",
              "cue": "Marche lentement, laisse le souffle revenir.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min",
              "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min",
              "cue": "Respiration naturelle, sans apnée.",
              "phase": "Retour au calme"
            }
          ]
        },
        {
          "day": 3,
          "title": "L’armure du héros",
          "xp": 60,
          "difficultyLabel": "≈ 20 à 30 min, pauses comprises",
          "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
          "exercises": [
            {
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min",
              "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "arm_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Petits cercles progressifs, épaules détendues.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "hip_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Mouvements lents, pieds bien ancrés.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "slow_knee_raises",
              "amount": 60,
              "unit": "sec",
              "cue": "Alterne les jambes avec un support si nécessaire.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "chair_squat",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Contrôle la descente, évite de rebondir.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "wall_pushups",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Variante murale autorisée à tout moment.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 12,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Pieds stables, bassin contrôlé.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "knee_plank",
              "amount": 15,
              "unit": "sec",
              "cue": "Respire régulièrement.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 60,
              "unit": "sec",
              "cue": "Récupération libre, sans te presser."
            },
            {
              "exerciseId": "chair_squat",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Contrôle la descente, évite de rebondir.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "wall_pushups",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Variante murale autorisée à tout moment.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 12,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Pieds stables, bassin contrôlé.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "knee_plank",
              "amount": 15,
              "unit": "sec",
              "cue": "Respire régulièrement.",
              "phase": "Récupération"
            },
            {
              "exerciseId": "slow_walk",
              "amount": 1,
              "unit": "min",
              "cue": "Marche lentement, laisse le souffle revenir.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min",
              "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min",
              "cue": "Respiration naturelle, sans apnée.",
              "phase": "Retour au calme"
            }
          ]
        }
      ]
    },
    {
      "week": 2,
      "title": "Le Compagnon",
      "xp": 70,
      "progression": "Ajouter une à deux répétitions si la technique reste propre et introduire les fentes assistées.",
      "days": [
        {
          "day": 1,
          "title": "Les fondations de fer",
          "xp": 70,
          "difficultyLabel": "≈ 20 à 30 min, pauses comprises",
          "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
          "exercises": [
            {
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min",
              "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "arm_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Petits cercles progressifs, épaules détendues.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "hip_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Mouvements lents, pieds bien ancrés.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "slow_knee_raises",
              "amount": 60,
              "unit": "sec",
              "cue": "Alterne les jambes avec un support si nécessaire.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Descends seulement aussi bas que tu peux maintenir tes genoux alignés.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "assisted_reverse_lunges",
              "amount": 12,
              "unit": "répétitions",
              "cue": "6 à 8 répétitions par jambe, aide-toi d’un support fixe.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "bridge",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Pousse par les talons sans cambrer le dos.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "knee_plank",
              "amount": 20,
              "unit": "sec",
              "cue": "Garde le bassin stable, respire.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 60,
              "unit": "sec",
              "cue": "Récupération libre, sans te presser."
            },
            {
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Descends seulement aussi bas que tu peux maintenir tes genoux alignés.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "assisted_reverse_lunges",
              "amount": 12,
              "unit": "répétitions",
              "cue": "6 à 8 répétitions par jambe, aide-toi d’un support fixe.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "bridge",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Pousse par les talons sans cambrer le dos.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "knee_plank",
              "amount": 20,
              "unit": "sec",
              "cue": "Garde le bassin stable, respire.",
              "phase": "Récupération"
            },
            {
              "exerciseId": "slow_walk",
              "amount": 1,
              "unit": "min",
              "cue": "Marche lentement, laisse le souffle revenir.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min",
              "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min",
              "cue": "Respiration naturelle, sans apnée.",
              "phase": "Retour au calme"
            }
          ]
        },
        {
          "day": 2,
          "title": "Le marteau du guerrier",
          "xp": 70,
          "difficultyLabel": "≈ 20 à 30 min, pauses comprises",
          "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
          "exercises": [
            {
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min",
              "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "arm_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Petits cercles progressifs, épaules détendues.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "hip_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Mouvements lents, pieds bien ancrés.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "slow_knee_raises",
              "amount": 60,
              "unit": "sec",
              "cue": "Alterne les jambes avec un support si nécessaire.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Support fixé et stable. Garde les épaules abaissées.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 14,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "shoulder_press_1kg",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Petite charge ou bouteilles légères. Si douleur à l’épaule, garde une amplitude réduite.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "dead_bug",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Alterne droite/gauche et maintiens le bas du dos confortable.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 60,
              "unit": "sec",
              "cue": "Récupération libre, sans te presser."
            },
            {
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Support fixé et stable. Garde les épaules abaissées.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 14,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "shoulder_press_1kg",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Petite charge ou bouteilles légères. Si douleur à l’épaule, garde une amplitude réduite.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "dead_bug",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Alterne droite/gauche et maintiens le bas du dos confortable.",
              "phase": "Récupération"
            },
            {
              "exerciseId": "slow_walk",
              "amount": 1,
              "unit": "min",
              "cue": "Marche lentement, laisse le souffle revenir.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min",
              "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min",
              "cue": "Respiration naturelle, sans apnée.",
              "phase": "Retour au calme"
            }
          ]
        },
        {
          "day": 3,
          "title": "L’armure du héros",
          "xp": 70,
          "difficultyLabel": "≈ 20 à 30 min, pauses comprises",
          "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
          "exercises": [
            {
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min",
              "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "arm_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Petits cercles progressifs, épaules détendues.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "hip_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Mouvements lents, pieds bien ancrés.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "slow_knee_raises",
              "amount": 60,
              "unit": "sec",
              "cue": "Alterne les jambes avec un support si nécessaire.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Contrôle la descente, évite de rebondir.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Variante murale autorisée à tout moment.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 14,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "bridge",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Pieds stables, bassin contrôlé.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "knee_plank",
              "amount": 20,
              "unit": "sec",
              "cue": "Respire régulièrement.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 60,
              "unit": "sec",
              "cue": "Récupération libre, sans te presser."
            },
            {
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Contrôle la descente, évite de rebondir.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions",
              "cue": "Variante murale autorisée à tout moment.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 14,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "bridge",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Pieds stables, bassin contrôlé.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "knee_plank",
              "amount": 20,
              "unit": "sec",
              "cue": "Respire régulièrement.",
              "phase": "Récupération"
            },
            {
              "exerciseId": "slow_walk",
              "amount": 1,
              "unit": "min",
              "cue": "Marche lentement, laisse le souffle revenir.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min",
              "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min",
              "cue": "Respiration naturelle, sans apnée.",
              "phase": "Retour au calme"
            }
          ]
        }
      ]
    },
    {
      "week": 3,
      "title": "Le Maître Artisan",
      "xp": 80,
      "progression": "Élargir progressivement l’amplitude ou ajouter une courte série ciblée, sans aller à l’échec.",
      "days": [
        {
          "day": 1,
          "title": "Les fondations de fer",
          "xp": 80,
          "difficultyLabel": "≈ 25 à 35 min, pauses comprises",
          "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
          "exercises": [
            {
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min",
              "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "arm_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Petits cercles progressifs, épaules détendues.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "hip_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Mouvements lents, pieds bien ancrés.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "slow_knee_raises",
              "amount": 60,
              "unit": "sec",
              "cue": "Alterne les jambes avec un support si nécessaire.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "squats",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Descends seulement aussi bas que tu peux maintenir tes genoux alignés.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "assisted_reverse_lunges",
              "amount": 14,
              "unit": "répétitions",
              "cue": "6 à 8 répétitions par jambe, aide-toi d’un support fixe.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "bridge",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Pousse par les talons sans cambrer le dos.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "core",
              "amount": 20,
              "unit": "sec",
              "cue": "Variantes sur genoux possibles.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 60,
              "unit": "sec",
              "cue": "Récupération libre, sans te presser."
            },
            {
              "exerciseId": "squats",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Descends seulement aussi bas que tu peux maintenir tes genoux alignés.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "assisted_reverse_lunges",
              "amount": 14,
              "unit": "répétitions",
              "cue": "6 à 8 répétitions par jambe, aide-toi d’un support fixe.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "bridge",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Pousse par les talons sans cambrer le dos.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "core",
              "amount": 20,
              "unit": "sec",
              "cue": "Variantes sur genoux possibles.",
              "phase": "Récupération"
            },
            {
              "exerciseId": "squats",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Descends seulement aussi bas que tu peux maintenir tes genoux alignés. Série ciblée facultativement allégée, jamais à l’échec.",
              "phase": "Défi 2 · Cycle 3"
            },
            {
              "exerciseId": "slow_walk",
              "amount": 1,
              "unit": "min",
              "cue": "Marche lentement, laisse le souffle revenir.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min",
              "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min",
              "cue": "Respiration naturelle, sans apnée.",
              "phase": "Retour au calme"
            }
          ]
        },
        {
          "day": 2,
          "title": "Le marteau du guerrier",
          "xp": 80,
          "difficultyLabel": "≈ 25 à 35 min, pauses comprises",
          "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
          "exercises": [
            {
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min",
              "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "arm_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Petits cercles progressifs, épaules détendues.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "hip_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Mouvements lents, pieds bien ancrés.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "slow_knee_raises",
              "amount": 60,
              "unit": "sec",
              "cue": "Alterne les jambes avec un support si nécessaire.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "incline_pushups",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Support fixé et stable. Garde les épaules abaissées.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 16,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "shoulder_press_1kg",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Petite charge ou bouteilles légères. Si douleur à l’épaule, garde une amplitude réduite.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "dead_bug",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Alterne droite/gauche et maintiens le bas du dos confortable.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 60,
              "unit": "sec",
              "cue": "Récupération libre, sans te presser."
            },
            {
              "exerciseId": "incline_pushups",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Support fixé et stable. Garde les épaules abaissées.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 16,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "shoulder_press_1kg",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Petite charge ou bouteilles légères. Si douleur à l’épaule, garde une amplitude réduite.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "dead_bug",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Alterne droite/gauche et maintiens le bas du dos confortable.",
              "phase": "Récupération"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 16,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras. Série ciblée facultativement allégée, jamais à l’échec.",
              "phase": "Défi 2 · Cycle 3"
            },
            {
              "exerciseId": "slow_walk",
              "amount": 1,
              "unit": "min",
              "cue": "Marche lentement, laisse le souffle revenir.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min",
              "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min",
              "cue": "Respiration naturelle, sans apnée.",
              "phase": "Retour au calme"
            }
          ]
        },
        {
          "day": 3,
          "title": "L’armure du héros",
          "xp": 80,
          "difficultyLabel": "≈ 25 à 35 min, pauses comprises",
          "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
          "exercises": [
            {
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min",
              "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "arm_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Petits cercles progressifs, épaules détendues.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "hip_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Mouvements lents, pieds bien ancrés.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "slow_knee_raises",
              "amount": 60,
              "unit": "sec",
              "cue": "Alterne les jambes avec un support si nécessaire.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "squats",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Contrôle la descente, évite de rebondir.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "incline_pushups",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Variante murale autorisée à tout moment.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 16,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "bridge",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Pieds stables, bassin contrôlé.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "side_plank_knees",
              "amount": 30,
              "unit": "sec",
              "cue": "15 secondes de chaque côté, sans basculer l’épaule.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 60,
              "unit": "sec",
              "cue": "Récupération libre, sans te presser."
            },
            {
              "exerciseId": "squats",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Contrôle la descente, évite de rebondir.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "incline_pushups",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Variante murale autorisée à tout moment.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 16,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "bridge",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Pieds stables, bassin contrôlé.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "side_plank_knees",
              "amount": 30,
              "unit": "sec",
              "cue": "15 secondes de chaque côté, sans basculer l’épaule.",
              "phase": "Récupération"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 16,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras. Série ciblée facultativement allégée, jamais à l’échec.",
              "phase": "Défi 2 · Cycle 3"
            },
            {
              "exerciseId": "slow_walk",
              "amount": 1,
              "unit": "min",
              "cue": "Marche lentement, laisse le souffle revenir.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min",
              "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min",
              "cue": "Respiration naturelle, sans apnée.",
              "phase": "Retour au calme"
            }
          ]
        }
      ]
    },
    {
      "week": 4,
      "title": "Le Guerrier Forgé",
      "xp": 90,
      "progression": "Consolider et comparer les sensations à la première semaine, sans imposer une intensité maximale.",
      "days": [
        {
          "day": 1,
          "title": "Les fondations de fer",
          "xp": 90,
          "difficultyLabel": "≈ 25 à 35 min, pauses comprises",
          "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
          "exercises": [
            {
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min",
              "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "arm_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Petits cercles progressifs, épaules détendues.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "hip_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Mouvements lents, pieds bien ancrés.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "slow_knee_raises",
              "amount": 60,
              "unit": "sec",
              "cue": "Alterne les jambes avec un support si nécessaire.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "squats",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Descends seulement aussi bas que tu peux maintenir tes genoux alignés.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "assisted_reverse_lunges",
              "amount": 16,
              "unit": "répétitions",
              "cue": "6 à 8 répétitions par jambe, aide-toi d’un support fixe.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "bridge",
              "amount": 14,
              "unit": "répétitions",
              "cue": "Pousse par les talons sans cambrer le dos.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "core",
              "amount": 25,
              "unit": "sec",
              "cue": "Variantes sur genoux possibles.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 60,
              "unit": "sec",
              "cue": "Récupération libre, sans te presser."
            },
            {
              "exerciseId": "squats",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Descends seulement aussi bas que tu peux maintenir tes genoux alignés.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "assisted_reverse_lunges",
              "amount": 16,
              "unit": "répétitions",
              "cue": "6 à 8 répétitions par jambe, aide-toi d’un support fixe.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "bridge",
              "amount": 14,
              "unit": "répétitions",
              "cue": "Pousse par les talons sans cambrer le dos.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "core",
              "amount": 25,
              "unit": "sec",
              "cue": "Variantes sur genoux possibles.",
              "phase": "Récupération"
            },
            {
              "exerciseId": "squats",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Descends seulement aussi bas que tu peux maintenir tes genoux alignés. Série ciblée facultativement allégée, jamais à l’échec.",
              "phase": "Défi 2 · Cycle 3"
            },
            {
              "exerciseId": "slow_walk",
              "amount": 1,
              "unit": "min",
              "cue": "Marche lentement, laisse le souffle revenir.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min",
              "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min",
              "cue": "Respiration naturelle, sans apnée.",
              "phase": "Retour au calme"
            }
          ]
        },
        {
          "day": 2,
          "title": "Le marteau du guerrier",
          "xp": 90,
          "difficultyLabel": "≈ 25 à 35 min, pauses comprises",
          "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
          "exercises": [
            {
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min",
              "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "arm_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Petits cercles progressifs, épaules détendues.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "hip_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Mouvements lents, pieds bien ancrés.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "slow_knee_raises",
              "amount": 60,
              "unit": "sec",
              "cue": "Alterne les jambes avec un support si nécessaire.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "incline_pushups",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Support fixé et stable. Garde les épaules abaissées.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 16,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "shoulder_press_1kg",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Petite charge ou bouteilles légères. Si douleur à l’épaule, garde une amplitude réduite.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "dead_bug",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Alterne droite/gauche et maintiens le bas du dos confortable.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 60,
              "unit": "sec",
              "cue": "Récupération libre, sans te presser."
            },
            {
              "exerciseId": "incline_pushups",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Support fixé et stable. Garde les épaules abaissées.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 16,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "shoulder_press_1kg",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Petite charge ou bouteilles légères. Si douleur à l’épaule, garde une amplitude réduite.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "dead_bug",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Alterne droite/gauche et maintiens le bas du dos confortable.",
              "phase": "Récupération"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 16,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras. Série ciblée facultativement allégée, jamais à l’échec.",
              "phase": "Défi 2 · Cycle 3"
            },
            {
              "exerciseId": "slow_walk",
              "amount": 1,
              "unit": "min",
              "cue": "Marche lentement, laisse le souffle revenir.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min",
              "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min",
              "cue": "Respiration naturelle, sans apnée.",
              "phase": "Retour au calme"
            }
          ]
        },
        {
          "day": 3,
          "title": "L’armure du héros",
          "xp": 90,
          "difficultyLabel": "≈ 25 à 35 min, pauses comprises",
          "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
          "exercises": [
            {
              "exerciseId": "march_on_spot",
              "amount": 2,
              "unit": "min",
              "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "arm_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Petits cercles progressifs, épaules détendues.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "hip_circles",
              "amount": 30,
              "unit": "sec",
              "cue": "Mouvements lents, pieds bien ancrés.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "slow_knee_raises",
              "amount": 60,
              "unit": "sec",
              "cue": "Alterne les jambes avec un support si nécessaire.",
              "phase": "Échauffement"
            },
            {
              "exerciseId": "squats",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Contrôle la descente, évite de rebondir.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "incline_pushups",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Variante murale autorisée à tout moment.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 16,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "bridge",
              "amount": 14,
              "unit": "répétitions",
              "cue": "Pieds stables, bassin contrôlé.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "side_plank_knees",
              "amount": 30,
              "unit": "sec",
              "cue": "15 secondes de chaque côté, sans basculer l’épaule.",
              "phase": "Défi 1 · Cycle 1"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 60,
              "unit": "sec",
              "cue": "Récupération libre, sans te presser."
            },
            {
              "exerciseId": "squats",
              "amount": 12,
              "unit": "répétitions",
              "cue": "Contrôle la descente, évite de rebondir.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "incline_pushups",
              "amount": 10,
              "unit": "répétitions",
              "cue": "Variante murale autorisée à tout moment.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 16,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "bridge",
              "amount": 14,
              "unit": "répétitions",
              "cue": "Pieds stables, bassin contrôlé.",
              "phase": "Défi 1 · Cycle 2"
            },
            {
              "exerciseId": "side_plank_knees",
              "amount": 30,
              "unit": "sec",
              "cue": "15 secondes de chaque côté, sans basculer l’épaule.",
              "phase": "Récupération"
            },
            {
              "exerciseId": "supported_row_water_bottle",
              "amount": 16,
              "unit": "répétitions",
              "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras. Série ciblée facultativement allégée, jamais à l’échec.",
              "phase": "Défi 2 · Cycle 3"
            },
            {
              "exerciseId": "slow_walk",
              "amount": 1,
              "unit": "min",
              "cue": "Marche lentement, laisse le souffle revenir.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min",
              "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
              "phase": "Retour au calme"
            },
            {
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min",
              "cue": "Respiration naturelle, sans apnée.",
              "phase": "Retour au calme"
            }
          ]
        }
      ]
    }
  ],
  "bosses": [
    {
      "week": 1,
      "xp": 50,
      "difficultyLabel": "Boss semaine 1 · 2 cycles",
      "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
      "lockedMessage": "Le boss se débloque après les trois séances essentielles de cette semaine.",
      "exercises": [
        {
          "exerciseId": "march_on_spot",
          "amount": 2,
          "unit": "min",
          "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "arm_circles",
          "amount": 30,
          "unit": "sec",
          "cue": "Petits cercles progressifs, épaules détendues.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "hip_circles",
          "amount": 30,
          "unit": "sec",
          "cue": "Mouvements lents, pieds bien ancrés.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "slow_knee_raises",
          "amount": 60,
          "unit": "sec",
          "cue": "Alterne les jambes avec un support si nécessaire.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "chair_squat",
          "amount": 8,
          "unit": "répétitions",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "wall_pushups",
          "amount": 8,
          "unit": "répétitions",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "supported_row_water_bottle",
          "amount": 12,
          "unit": "répétitions",
          "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "bridge",
          "amount": 10,
          "unit": "répétitions",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "knee_plank",
          "amount": 15,
          "unit": "sec",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "chair_squat",
          "amount": 8,
          "unit": "répétitions",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "wall_pushups",
          "amount": 8,
          "unit": "répétitions",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "supported_row_water_bottle",
          "amount": 12,
          "unit": "répétitions",
          "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "bridge",
          "amount": 10,
          "unit": "répétitions",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "knee_plank",
          "amount": 15,
          "unit": "sec",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "slow_walk",
          "amount": 1,
          "unit": "min",
          "cue": "Marche lentement, laisse le souffle revenir.",
          "phase": "Retour au calme"
        },
        {
          "exerciseId": "gentle_back_stretch",
          "amount": 1,
          "unit": "min",
          "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
          "phase": "Retour au calme"
        },
        {
          "exerciseId": "slow_breathing",
          "amount": 1,
          "unit": "min",
          "cue": "Respiration naturelle, sans apnée.",
          "phase": "Retour au calme"
        }
      ]
    },
    {
      "week": 2,
      "xp": 60,
      "difficultyLabel": "Boss semaine 2 · 2 cycles",
      "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
      "lockedMessage": "Le boss se débloque après les trois séances essentielles de cette semaine.",
      "exercises": [
        {
          "exerciseId": "march_on_spot",
          "amount": 2,
          "unit": "min",
          "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "arm_circles",
          "amount": 30,
          "unit": "sec",
          "cue": "Petits cercles progressifs, épaules détendues.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "hip_circles",
          "amount": 30,
          "unit": "sec",
          "cue": "Mouvements lents, pieds bien ancrés.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "slow_knee_raises",
          "amount": 60,
          "unit": "sec",
          "cue": "Alterne les jambes avec un support si nécessaire.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "chair_squat",
          "amount": 10,
          "unit": "répétitions",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "incline_pushups",
          "amount": 8,
          "unit": "répétitions",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "supported_row_water_bottle",
          "amount": 14,
          "unit": "répétitions",
          "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "bridge",
          "amount": 12,
          "unit": "répétitions",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "knee_plank",
          "amount": 20,
          "unit": "sec",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "chair_squat",
          "amount": 10,
          "unit": "répétitions",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "incline_pushups",
          "amount": 8,
          "unit": "répétitions",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "supported_row_water_bottle",
          "amount": 14,
          "unit": "répétitions",
          "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "bridge",
          "amount": 12,
          "unit": "répétitions",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "knee_plank",
          "amount": 20,
          "unit": "sec",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "slow_walk",
          "amount": 1,
          "unit": "min",
          "cue": "Marche lentement, laisse le souffle revenir.",
          "phase": "Retour au calme"
        },
        {
          "exerciseId": "gentle_back_stretch",
          "amount": 1,
          "unit": "min",
          "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
          "phase": "Retour au calme"
        },
        {
          "exerciseId": "slow_breathing",
          "amount": 1,
          "unit": "min",
          "cue": "Respiration naturelle, sans apnée.",
          "phase": "Retour au calme"
        }
      ]
    },
    {
      "week": 3,
      "xp": 70,
      "difficultyLabel": "Boss semaine 3 · 2 cycles",
      "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
      "lockedMessage": "Le boss se débloque après les trois séances essentielles de cette semaine.",
      "exercises": [
        {
          "exerciseId": "march_on_spot",
          "amount": 2,
          "unit": "min",
          "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "arm_circles",
          "amount": 30,
          "unit": "sec",
          "cue": "Petits cercles progressifs, épaules détendues.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "hip_circles",
          "amount": 30,
          "unit": "sec",
          "cue": "Mouvements lents, pieds bien ancrés.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "slow_knee_raises",
          "amount": 60,
          "unit": "sec",
          "cue": "Alterne les jambes avec un support si nécessaire.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "squats",
          "amount": 10,
          "unit": "répétitions",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "incline_pushups",
          "amount": 10,
          "unit": "répétitions",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "supported_row_water_bottle",
          "amount": 16,
          "unit": "répétitions",
          "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "bridge",
          "amount": 12,
          "unit": "répétitions",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "core",
          "amount": 20,
          "unit": "sec",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "squats",
          "amount": 10,
          "unit": "répétitions",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "incline_pushups",
          "amount": 10,
          "unit": "répétitions",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "supported_row_water_bottle",
          "amount": 16,
          "unit": "répétitions",
          "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "bridge",
          "amount": 12,
          "unit": "répétitions",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "core",
          "amount": 20,
          "unit": "sec",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "slow_walk",
          "amount": 1,
          "unit": "min",
          "cue": "Marche lentement, laisse le souffle revenir.",
          "phase": "Retour au calme"
        },
        {
          "exerciseId": "gentle_back_stretch",
          "amount": 1,
          "unit": "min",
          "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
          "phase": "Retour au calme"
        },
        {
          "exerciseId": "slow_breathing",
          "amount": 1,
          "unit": "min",
          "cue": "Respiration naturelle, sans apnée.",
          "phase": "Retour au calme"
        }
      ]
    },
    {
      "week": 4,
      "xp": 90,
      "difficultyLabel": "Boss semaine 4 · 3 cycles",
      "instructions": "Expire pendant l’effort. Prends 45 à 90 secondes de repos entre les séries, davantage si nécessaire. Termine avec environ deux répétitions possibles en réserve. Arrête en cas de douleur inhabituelle, vertige ou malaise.",
      "lockedMessage": "Le boss se débloque après les trois séances essentielles de cette semaine.",
      "exercises": [
        {
          "exerciseId": "march_on_spot",
          "amount": 2,
          "unit": "min",
          "cue": "Reste à une allure facile, sans chercher à accélérer le souffle.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "arm_circles",
          "amount": 30,
          "unit": "sec",
          "cue": "Petits cercles progressifs, épaules détendues.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "hip_circles",
          "amount": 30,
          "unit": "sec",
          "cue": "Mouvements lents, pieds bien ancrés.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "slow_knee_raises",
          "amount": 60,
          "unit": "sec",
          "cue": "Alterne les jambes avec un support si nécessaire.",
          "phase": "Échauffement"
        },
        {
          "exerciseId": "squats",
          "amount": 12,
          "unit": "répétitions",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "incline_pushups",
          "amount": 10,
          "unit": "répétitions",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "supported_row_water_bottle",
          "amount": 16,
          "unit": "répétitions",
          "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "bridge",
          "amount": 14,
          "unit": "répétitions",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "core",
          "amount": 25,
          "unit": "sec",
          "phase": "Cycle 1"
        },
        {
          "exerciseId": "squats",
          "amount": 12,
          "unit": "répétitions",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "incline_pushups",
          "amount": 10,
          "unit": "répétitions",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "supported_row_water_bottle",
          "amount": 16,
          "unit": "répétitions",
          "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "bridge",
          "amount": 14,
          "unit": "répétitions",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "core",
          "amount": 25,
          "unit": "sec",
          "phase": "Cycle 2"
        },
        {
          "exerciseId": "squats",
          "amount": 12,
          "unit": "répétitions",
          "phase": "Cycle 3"
        },
        {
          "exerciseId": "incline_pushups",
          "amount": 10,
          "unit": "répétitions",
          "phase": "Cycle 3"
        },
        {
          "exerciseId": "supported_row_water_bottle",
          "amount": 16,
          "unit": "répétitions",
          "cue": "En appui sur une chaise stable, tire une petite bouteille d’eau vers la hanche, dos neutre. Répartis les répétitions entre les deux bras.",
          "phase": "Cycle 3"
        },
        {
          "exerciseId": "bridge",
          "amount": 14,
          "unit": "répétitions",
          "phase": "Cycle 3"
        },
        {
          "exerciseId": "core",
          "amount": 25,
          "unit": "sec",
          "phase": "Cycle 3"
        },
        {
          "exerciseId": "slow_walk",
          "amount": 1,
          "unit": "min",
          "cue": "Marche lentement, laisse le souffle revenir.",
          "phase": "Retour au calme"
        },
        {
          "exerciseId": "gentle_back_stretch",
          "amount": 1,
          "unit": "min",
          "cue": "Sans forcer la colonne ni chercher une amplitude maximale.",
          "phase": "Retour au calme"
        },
        {
          "exerciseId": "slow_breathing",
          "amount": 1,
          "unit": "min",
          "cue": "Respiration naturelle, sans apnée.",
          "phase": "Retour au calme"
        }
      ]
    }
  ],
  "progression": [
    "Semaine 1 : Apprendre les gestes : deux séries courtes, amplitude confortable et appuis stables.",
    "Semaine 2 : Ajouter une à deux répétitions si la technique reste propre et introduire les fentes assistées.",
    "Semaine 3 : Élargir progressivement l’amplitude ou ajouter une courte série ciblée, sans aller à l’échec.",
    "Semaine 4 : Consolider et comparer les sensations à la première semaine, sans imposer une intensité maximale."
  ],
  "notes": [
    "Les séances A, B et C sont essentielles. Les deux compléments du planning sont facultatifs.",
    "Le boss se débloque uniquement après A, B et C, jamais grâce aux compléments.",
    "Échauffe-toi avant les séries. Prends entre 45 et 90 secondes de repos, voire plus si nécessaire.",
    "Les répétitions de rowing sont comptées pour les deux bras réunis. Une bouteille légère suffit.",
    "Variantes faciles : squat sur chaise, pompes murales, gainage sur genoux. Répète une semaine si nécessaire.",
    "L’objectif est le contrôle, pas l’épuisement. Si douleur inhabituelle, vertige ou malaise : arrête et adapte.",
    "Le programme conserve les noms et récompenses des quatre boss historiques."
  ]
};
    data.programDetails["forge-guerrier"] = {
      ...previous,
      ...improved,
      // Garder l'ancien déroulement pour une séance entamée avant la mise à jour.
      legacyWorkouts: previous.legacyWorkouts || { weeks: previous.weeks, bosses: previous.bosses },
      bosses: improved.bosses.map((boss, index) => ({
        ...previous.bosses[index], ...boss,
        badgeId: previous.bosses[index]?.badgeId || null,
        title: previous.bosses[index]?.title || "Boss de la Forge",
        xp: previous.bosses[index]?.xp ?? boss.xp,
        chest: previous.bosses[index]?.chest
      }))
    };
  }
}
