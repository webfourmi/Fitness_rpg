// Fitness RPG · Les Épreuves de la Forge (8 semaines)
// Données additionnelles : 3 séances/semaine, 8 boss liés au programme, 4 badges.
// Ne modifie ni moteur de jeu, ni XP généraux, ni programmes existants.
(function registerForgeProgram() {
  const config = window.FitnessRpgConfig;
  const data = window.FitnessRpgData;
  if (!config || !data || !Array.isArray(config.programs) || !data.programDetails || !Array.isArray(data.badges)) return;
  const programConfig = {
  "id": "epreuves-forge",
  "icon": "⚒️",
  "title": "Les Épreuves de la Forge",
  "objective": "Renforcement musculaire et développement de la force · haltères et banc",
  "level": "Intermédiaire",
  "tier": "intermediate",
  "unlockLevel": 2,
  "duration": "30-50 min",
  "frequency": "3 séances par semaine + boss hebdomadaire · 8 semaines",
  "coachAdvice": "Xara ou Bazul",
  "xp": 55,
  "reward": {
    "badgeId": "forge-maitre",
    "title": "Maître de la Forge",
    "chest": true,
    "nextPrograms": [
      "forge-guerrier",
      "bras-heros"
    ]
  }
};
  const program = {
  "id": "epreuves-forge",
  "subtitle": "Musculation intermédiaire : progression individualisée des charges, maîtrise technique et renforcement complet.",
  "unlockLevel": 2,
  "duration": "30 à 50 min",
  "frequency": "3 séances par semaine + boss le samedi · 8 semaines",
  "material": "Haltères à charge adaptée et banc stable ; barre de traction facultative avec assistance sûre. Prévoir une charge permettant de garder 2 à 3 répétitions en réserve.",
  "reward": {
    "badgeId": "forge-maitre",
    "badgeTitle": "Maître de la Forge",
    "chest": true,
    "nextPrograms": [
      "forge-guerrier",
      "bras-heros"
    ]
  },
  "weeks": [
    {
      "week": 1,
      "title": "Les Premières Braises",
      "xp": 52,
      "progression": "Nouveauté : squat goblet. Apprends le geste, garde une charge légère et conserve des répétitions en réserve. Progression : 2 séries par mouvement ; conserve 2 à 3 répétitions en réserve. Augmente légèrement la charge seulement après avoir réussi toutes les séries avec une technique stable.",
      "days": [
        {
          "day": 1,
          "title": "Fondations et appuis",
          "xp": 52,
          "difficultyLabel": "≈ 25 à 35 min",
          "instructions": "Séance A · 2 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "L'étincelle contrôlée",
          "xp": 52,
          "difficultyLabel": "≈ 25 à 35 min",
          "instructions": "Séance B · 2 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 2 · Série 1",
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "Premier métal",
          "xp": 52,
          "difficultyLabel": "≈ 25 à 35 min",
          "instructions": "Séance C · 2 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "core",
              "amount": 22,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "core",
              "amount": 22,
              "unit": "sec"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Respiration",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ]
        }
      ]
    },
    {
      "week": 2,
      "title": "Le Banc de l'Apprenti",
      "xp": 54,
      "progression": "Nouveauté : développé couché. Apprends le geste, garde une charge légère et conserve des répétitions en réserve. Progression : 2 séries par mouvement ; conserve 2 à 3 répétitions en réserve. Augmente légèrement la charge seulement après avoir réussi toutes les séries avec une technique stable.",
      "days": [
        {
          "day": 1,
          "title": "La poussée précise",
          "xp": 54,
          "difficultyLabel": "≈ 25 à 35 min",
          "instructions": "Séance A · 2 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "Force en réserve",
          "xp": 54,
          "difficultyLabel": "≈ 25 à 35 min",
          "instructions": "Séance B · 2 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 2 · Série 1",
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "L'établi de la Forge",
          "xp": 54,
          "difficultyLabel": "≈ 25 à 35 min",
          "instructions": "Séance C · 2 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "core",
              "amount": 24,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "core",
              "amount": 24,
              "unit": "sec"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Respiration",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ]
        }
      ]
    },
    {
      "week": 3,
      "title": "Le Tirage du Veilleur",
      "xp": 56,
      "progression": "Nouveauté : rowing sur banc. Conserve le contrôle, puis augmente seulement les répétitions ou la charge si le mouvement est facile. Progression : 3 séries par mouvement ; conserve 2 à 3 répétitions en réserve. Augmente légèrement la charge seulement après avoir réussi toutes les séries avec une technique stable.",
      "days": [
        {
          "day": 1,
          "title": "Dos protecteur",
          "xp": 56,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance A · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "Équilibre des appuis",
          "xp": 56,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance B · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "La corde de la Tour",
          "xp": 56,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance C · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "core",
              "amount": 26,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "core",
              "amount": 26,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "core",
              "amount": 26,
              "unit": "sec"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Respiration",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ]
        }
      ]
    },
    {
      "week": 4,
      "title": "La Charnière d'Acier",
      "xp": 58,
      "progression": "Nouveauté : soulevé de terre roumain. Conserve le contrôle, puis augmente seulement les répétitions ou la charge si le mouvement est facile. Progression : 3 séries par mouvement ; conserve 2 à 3 répétitions en réserve. Augmente légèrement la charge seulement après avoir réussi toutes les séries avec une technique stable.",
      "days": [
        {
          "day": 1,
          "title": "Hanches solides",
          "xp": 58,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance A · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "Consolider les épaules",
          "xp": 58,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance B · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "Le chemin de l'Enclume",
          "xp": 58,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance C · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "core",
              "amount": 28,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "core",
              "amount": 28,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "core",
              "amount": 28,
              "unit": "sec"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Respiration",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ]
        }
      ]
    },
    {
      "week": 5,
      "title": "Porter les Métaux",
      "xp": 60,
      "progression": "Nouveauté : marche du fermier. Conserve le contrôle, puis augmente seulement les répétitions ou la charge si le mouvement est facile. Progression : 3 séries par mouvement ; conserve 2 à 3 répétitions en réserve. Augmente légèrement la charge seulement après avoir réussi toutes les séries avec une technique stable.",
      "days": [
        {
          "day": 1,
          "title": "Préhension et marche",
          "xp": 60,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance A · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "Soulever sans hâte",
          "xp": 60,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance B · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_farmer_carry",
              "amount": 20,
              "unit": "sec"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_farmer_carry",
              "amount": 20,
              "unit": "sec"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "forge_farmer_carry",
              "amount": 20,
              "unit": "sec"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "incline_pushups",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "Le transport de la Forge",
          "xp": 60,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance C · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_farmer_carry",
              "amount": 20,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_farmer_carry",
              "amount": 20,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_farmer_carry",
              "amount": 20,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Respiration",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ]
        }
      ]
    },
    {
      "week": 6,
      "title": "Les Épaules du Forgeron",
      "xp": 62,
      "progression": "Nouveauté : développé épaules assis. Conserve le contrôle, puis augmente seulement les répétitions ou la charge si le mouvement est facile. Progression : 3 séries par mouvement ; conserve 2 à 3 répétitions en réserve. Augmente légèrement la charge seulement après avoir réussi toutes les séries avec une technique stable.",
      "days": [
        {
          "day": 1,
          "title": "Poussée stable",
          "xp": 62,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance A · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "Contrôle du dos",
          "xp": 62,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance B · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_seated_shoulder_press",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_farmer_carry",
              "amount": 25,
              "unit": "sec"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_seated_shoulder_press",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_farmer_carry",
              "amount": 25,
              "unit": "sec"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "forge_seated_shoulder_press",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "forge_farmer_carry",
              "amount": 25,
              "unit": "sec"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "Haut et bas en harmonie",
          "xp": 62,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance C · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire.  Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_seated_shoulder_press",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_seated_shoulder_press",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_seated_shoulder_press",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Respiration",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ]
        }
      ]
    },
    {
      "week": 7,
      "title": "Vers le Sommet de la Tour",
      "xp": 64,
      "progression": "Nouveauté : tirage assisté à la station. Conserve le contrôle, puis augmente seulement les répétitions ou la charge si le mouvement est facile. Progression : 3 séries par mouvement ; conserve 2 à 3 répétitions en réserve. Augmente légèrement la charge seulement après avoir réussi toutes les séries avec une technique stable.",
      "days": [
        {
          "day": 1,
          "title": "Tirage progressif",
          "xp": 64,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance A · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire. Le tirage à la station peut être remplacé par un rowing si aucun appui sûr n'est disponible. Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "calf_raises",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "Épaules disponibles",
          "xp": 64,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance B · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire. Le tirage à la station peut être remplacé par un rowing si aucun appui sûr n'est disponible. Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_assisted_pullup",
              "amount": 4,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_assisted_pullup",
              "amount": 4,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "forge_assisted_pullup",
              "amount": 4,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "Le pied de l'Échelle",
          "xp": 64,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance C · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire. Le tirage à la station peut être remplacé par un rowing si aucun appui sûr n'est disponible. Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_farmer_carry",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_seated_shoulder_press",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_assisted_pullup",
              "amount": 4,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_farmer_carry",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_seated_shoulder_press",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_assisted_pullup",
              "amount": 4,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_farmer_carry",
              "amount": 30,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_seated_shoulder_press",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_assisted_pullup",
              "amount": 4,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "chair_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Respiration",
              "exerciseId": "slow_breathing",
              "amount": 1,
              "unit": "min"
            }
          ]
        }
      ]
    },
    {
      "week": 8,
      "title": "La Grande Forge",
      "xp": 66,
      "progression": "Nouveauté : fente arrière. Conserve le contrôle, puis augmente seulement les répétitions ou la charge si le mouvement est facile. Progression : 3 séries par mouvement ; conserve 2 à 3 répétitions en réserve. Augmente légèrement la charge seulement après avoir réussi toutes les séries avec une technique stable.",
      "days": [
        {
          "day": 1,
          "title": "Fentes maîtrisées",
          "xp": 66,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance A · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire. Le tirage à la station peut être remplacé par un rowing si aucun appui sûr n'est disponible. Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_reverse_lunge",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 1",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_reverse_lunge",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 2",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_reverse_lunge",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_dumbbell_bench_press",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 1 · Série 3",
              "exerciseId": "bridge",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "Ultime préparation",
          "xp": 66,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance B · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire. Le tirage à la station peut être remplacé par un rowing si aucun appui sûr n'est disponible. Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_assisted_pullup",
              "amount": 4,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "forge_seated_shoulder_press",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 1",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_assisted_pullup",
              "amount": 4,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "forge_seated_shoulder_press",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 2",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "forge_assisted_pullup",
              "amount": 4,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "forge_romanian_deadlift",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "forge_seated_shoulder_press",
              "amount": 8,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 2 · Série 3",
              "exerciseId": "bird_dog",
              "amount": 12,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
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
          "title": "La maîtrise tranquille",
          "xp": 66,
          "difficultyLabel": "≈ 35 à 50 min",
          "instructions": "Séance C · 3 séries des mouvements proposés. Repos 60 à 90 secondes entre les séries, davantage si nécessaire. Expire pendant l'effort. Utilise la variante la plus confortable sans douleur articulaire. Le tirage à la station peut être remplacé par un rowing si aucun appui sûr n'est disponible. Garde 2 à 3 répétitions en réserve ; augmente la charge seulement lorsque toutes les séries sont maîtrisées.",
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
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_reverse_lunge",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_farmer_carry",
              "amount": 35,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 1",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_reverse_lunge",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_farmer_carry",
              "amount": 35,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 2",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_reverse_lunge",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_farmer_carry",
              "amount": 35,
              "unit": "sec"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_goblet_squat",
              "amount": 10,
              "unit": "répétitions"
            },
            {
              "phase": "Défi 3 · Série 3",
              "exerciseId": "forge_one_arm_row",
              "amount": 16,
              "unit": "répétitions"
            },
            {
              "phase": "Retour au calme",
              "exerciseId": "gentle_back_stretch",
              "amount": 1,
              "unit": "min"
            },
            {
              "phase": "Respiration",
              "exerciseId": "slow_breathing",
              "amount": 1,
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
      "title": "Le Gardien des Fondations",
      "subtitle": "Épreuve de la semaine 1 : réaliser proprement les mouvements déjà appris, sans chercher un record.",
      "image": "assets/boss/forge-boss-semaine-01-gardien-fondations.webp",
      "xp": 55,
      "difficultyLabel": "≈ 15 min",
      "instructions": "Débloqué après les trois séances de la semaine. Priorité à la technique, récupère autant que nécessaire. Charge adaptée : 2 à 3 répétitions en réserve. Le boss valide la technique et la régularité, pas une performance maximale.",
      "lockedMessage": "Termine les 3 séances de la semaine 1 pour affronter ce boss.",
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
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_goblet_squat",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "incline_pushups",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "bridge",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Retour au calme",
          "exerciseId": "gentle_back_stretch",
          "amount": 1,
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
      "week": 2,
      "title": "Le Gardien des Fondations · Revanche",
      "subtitle": "Épreuve de la semaine 2 : réaliser proprement les mouvements déjà appris, sans chercher un record.",
      "image": "assets/boss/forge-boss-semaine-02-gardien-fondations-revanche.webp",
      "xp": 60,
      "difficultyLabel": "≈ 20 à 30 min",
      "instructions": "Débloqué après les trois séances de la semaine. Priorité à la technique, récupère autant que nécessaire. Charge adaptée : 2 à 3 répétitions en réserve. Le boss valide la technique et la régularité, pas une performance maximale.",
      "lockedMessage": "Termine les 3 séances de la semaine 2 pour affronter ce boss.",
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
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "chair_squat",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "incline_pushups",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_dumbbell_bench_press",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "chair_squat",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "incline_pushups",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_dumbbell_bench_press",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Retour au calme",
          "exerciseId": "gentle_back_stretch",
          "amount": 1,
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
      "week": 3,
      "title": "Le Veilleur de la Tour",
      "subtitle": "Épreuve de la semaine 3 : réaliser proprement les mouvements déjà appris, sans chercher un record.",
      "image": "assets/boss/forge-boss-semaine-03-veilleur-tour.webp",
      "xp": 65,
      "difficultyLabel": "≈ 20 à 30 min",
      "instructions": "Débloqué après les trois séances de la semaine. Priorité à la technique, récupère autant que nécessaire. Charge adaptée : 2 à 3 répétitions en réserve. Le boss valide la technique et la régularité, pas une performance maximale.",
      "lockedMessage": "Termine les 3 séances de la semaine 3 pour affronter ce boss.",
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
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_goblet_squat",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_one_arm_row",
          "amount": 16,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_dumbbell_bench_press",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_goblet_squat",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_one_arm_row",
          "amount": 16,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_dumbbell_bench_press",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Retour au calme",
          "exerciseId": "gentle_back_stretch",
          "amount": 1,
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
      "week": 4,
      "title": "Le Veilleur de la Tour · Revanche",
      "subtitle": "Épreuve de la semaine 4 : réaliser proprement les mouvements déjà appris, sans chercher un record.",
      "image": "assets/boss/forge-boss-semaine-04-veilleur-tour-revanche.webp",
      "xp": 70,
      "difficultyLabel": "≈ 20 à 30 min",
      "instructions": "Débloqué après les trois séances de la semaine. Priorité à la technique, récupère autant que nécessaire. Charge adaptée : 2 à 3 répétitions en réserve. Le boss valide la technique et la régularité, pas une performance maximale.",
      "lockedMessage": "Termine les 3 séances de la semaine 4 pour affronter ce boss.",
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
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_romanian_deadlift",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_dumbbell_bench_press",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "bird_dog",
          "amount": 12,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_romanian_deadlift",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_dumbbell_bench_press",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "bird_dog",
          "amount": 12,
          "unit": "répétitions"
        },
        {
          "phase": "Retour au calme",
          "exerciseId": "gentle_back_stretch",
          "amount": 1,
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
      "week": 5,
      "title": "Le Maître des Trois Armes",
      "subtitle": "Épreuve de la semaine 5 : réaliser proprement les mouvements déjà appris, sans chercher un record.",
      "image": "assets/boss/forge-boss-semaine-05-maitre-trois-armes.webp",
      "xp": 75,
      "difficultyLabel": "≈ 20 à 30 min",
      "instructions": "Débloqué après les trois séances de la semaine. Priorité à la technique, récupère autant que nécessaire. Charge adaptée : 2 à 3 répétitions en réserve. Le boss valide la technique et la régularité, pas une performance maximale.",
      "lockedMessage": "Termine les 3 séances de la semaine 5 pour affronter ce boss.",
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
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_romanian_deadlift",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_farmer_carry",
          "amount": 20,
          "unit": "sec"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "bird_dog",
          "amount": 12,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_romanian_deadlift",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_farmer_carry",
          "amount": 20,
          "unit": "sec"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "bird_dog",
          "amount": 12,
          "unit": "répétitions"
        },
        {
          "phase": "Retour au calme",
          "exerciseId": "gentle_back_stretch",
          "amount": 1,
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
      "week": 6,
      "title": "Le Maître des Trois Armes · Revanche",
      "subtitle": "Épreuve de la semaine 6 : réaliser proprement les mouvements déjà appris, sans chercher un record.",
      "image": "assets/boss/forge-boss-semaine-06-maitre-trois-armes-revanche.webp",
      "xp": 80,
      "difficultyLabel": "≈ 20 à 30 min",
      "instructions": "Débloqué après les trois séances de la semaine. Priorité à la technique, récupère autant que nécessaire. Charge adaptée : 2 à 3 répétitions en réserve. Le boss valide la technique et la régularité, pas une performance maximale.",
      "lockedMessage": "Termine les 3 séances de la semaine 6 pour affronter ce boss.",
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
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_romanian_deadlift",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_seated_shoulder_press",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "bridge",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_romanian_deadlift",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_seated_shoulder_press",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "bridge",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Retour au calme",
          "exerciseId": "gentle_back_stretch",
          "amount": 1,
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
      "week": 7,
      "title": "La Gardienne de la Forge",
      "subtitle": "Épreuve de la semaine 7 : réaliser proprement les mouvements déjà appris, sans chercher un record.",
      "image": "assets/boss/forge-boss-semaine-07-gardienne-forge.webp",
      "xp": 85,
      "difficultyLabel": "≈ 20 à 30 min",
      "instructions": "Débloqué après les trois séances de la semaine. Priorité à la technique, récupère autant que nécessaire. Charge adaptée : 2 à 3 répétitions en réserve. Le boss valide la technique et la régularité, pas une performance maximale.",
      "lockedMessage": "Termine les 3 séances de la semaine 7 pour affronter ce boss.",
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
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_goblet_squat",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_dumbbell_bench_press",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_one_arm_row",
          "amount": 16,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_goblet_squat",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_dumbbell_bench_press",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_one_arm_row",
          "amount": 16,
          "unit": "répétitions"
        },
        {
          "phase": "Retour au calme",
          "exerciseId": "gentle_back_stretch",
          "amount": 1,
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
      "week": 8,
      "title": "La Gardienne de la Forge · Ultime épreuve",
      "subtitle": "Épreuve de la semaine 8 : réaliser proprement les mouvements déjà appris, sans chercher un record.",
      "image": "assets/boss/forge-boss-semaine-08-gardienne-forge-ultime.webp",
      "xp": 90,
      "badgeId": "forge-maitre",
      "chest": true,
      "difficultyLabel": "≈ 20 à 30 min",
      "instructions": "Débloqué après les trois séances de la semaine. Priorité à la technique, récupère autant que nécessaire. Charge adaptée : 2 à 3 répétitions en réserve. Le boss valide la technique et la régularité, pas une performance maximale.",
      "lockedMessage": "Termine les 3 séances de la semaine 8 pour affronter ce boss.",
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
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_assisted_pullup",
          "amount": 4,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_romanian_deadlift",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 1",
          "exerciseId": "forge_seated_shoulder_press",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_assisted_pullup",
          "amount": 4,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_romanian_deadlift",
          "amount": 10,
          "unit": "répétitions"
        },
        {
          "phase": "Épreuve · Cycle 2",
          "exerciseId": "forge_seated_shoulder_press",
          "amount": 8,
          "unit": "répétitions"
        },
        {
          "phase": "Retour au calme",
          "exerciseId": "gentle_back_stretch",
          "amount": 1,
          "unit": "min"
        },
        {
          "phase": "Respiration",
          "exerciseId": "slow_breathing",
          "amount": 1,
          "unit": "min"
        }
      ]
    }
  ],
  "progression": [
    "Semaine 1 : Les Premières Braises · Nouveauté : squat goblet. Apprends le geste, garde une charge légère et conserve des répétitions en réserve.",
    "Semaine 2 : Le Banc de l'Apprenti · Nouveauté : développé couché. Apprends le geste, garde une charge légère et conserve des répétitions en réserve.",
    "Semaine 3 : Le Tirage du Veilleur · Nouveauté : rowing sur banc. Conserve le contrôle, puis augmente seulement les répétitions ou la charge si le mouvement est facile.",
    "Semaine 4 : La Charnière d'Acier · Nouveauté : soulevé de terre roumain. Conserve le contrôle, puis augmente seulement les répétitions ou la charge si le mouvement est facile.",
    "Semaine 5 : Porter les Métaux · Nouveauté : marche du fermier. Conserve le contrôle, puis augmente seulement les répétitions ou la charge si le mouvement est facile.",
    "Semaine 6 : Les Épaules du Forgeron · Nouveauté : développé épaules assis. Conserve le contrôle, puis augmente seulement les répétitions ou la charge si le mouvement est facile.",
    "Semaine 7 : Vers le Sommet de la Tour · Nouveauté : tirage assisté à la station. Conserve le contrôle, puis augmente seulement les répétitions ou la charge si le mouvement est facile.",
    "Semaine 8 : La Grande Forge · Nouveauté : fente arrière. Conserve le contrôle, puis augmente seulement les répétitions ou la charge si le mouvement est facile."
  ],
  "notes": [
    "Catégorie débutant : l'âge n'est pas un niveau de difficulté. Choisir chaque variante selon l'expérience et les capacités.",
    "Un nouveau mouvement est introduit chaque semaine ; les exercices appris auparavant sont réutilisés.",
    "Le boss lié à ce programme apparaît le samedi après validation des trois séances hebdomadaires.",
    "Les haltères de 1 et 2 kg conviennent pour apprendre certains mouvements ; une charge plus lourde n'est pas obligatoire.",
    "Aucun dip complet ni traction complète imposé. Pour les épaules sensibles, préférer le rowing sur banc.",
    "Une douleur articulaire n'est pas un objectif d'entraînement : modifier ou interrompre le mouvement."
  ]
};
  const newBadges = [
  {
    "id": "forge-premier",
    "icon": "🔨",
    "title": "Premier coup de marteau",
    "description": "Valider sa première séance des Épreuves de la Forge.",
    "type": "program",
    "programId": "epreuves-forge",
    "target": 1,
    "image": "assets/badges/forge-premier.webp"
  },
  {
    "id": "forge-apprenti",
    "icon": "⚒️",
    "title": "Apprenti de la Forge",
    "description": "Valider huit séances ou boss de la Forge.",
    "type": "program",
    "programId": "epreuves-forge",
    "target": 8,
    "image": "assets/badges/forge-apprenti.webp"
  },
  {
    "id": "forge-compagnon",
    "icon": "🛡️",
    "title": "Compagnon de la Forge",
    "description": "Valider seize séances ou boss de la Forge.",
    "type": "program",
    "programId": "epreuves-forge",
    "target": 16,
    "image": "assets/badges/forge-compagnon.webp"
  },
  {
    "id": "forge-maitre",
    "icon": "🏆",
    "title": "Maître de la Forge",
    "description": "Terminer les vingt-quatre séances et huit boss du parcours.",
    "type": "program",
    "programId": "epreuves-forge",
    "target": 32,
    "image": "assets/badges/forge-maitre.webp"
  }
];
  if (!config.programs.some((existing) => existing.id === programConfig.id)) config.programs.push(programConfig);
  if (!data.programDetails[program.id]) data.programDetails[program.id] = program;
  const existingBadges = new Set(data.badges.map((badge) => badge.id));
  for (const badge of newBadges) {
    if (existingBadges.has(badge.id)) continue;
    data.badges.push(badge);
    existingBadges.add(badge.id);
  }
})();
