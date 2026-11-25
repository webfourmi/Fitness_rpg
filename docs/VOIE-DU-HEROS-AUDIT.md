# La Voie du Héros · Audit de l’existant

Phase 1 du cahier des charges du 25 novembre 2026. Base auditée : Fitness RPG 7.0.20, branche main, commit `742607e892dbb03ee494221b4a9830fae455d47c`.

Le catalogue chargé par l’application contient **15 programmes**, **125 exercices**, **6 coaches** et **8 objectifs**. Le catalogue spécialisé dispose de métadonnées pour **30 exercices**. Le niveau du catalogue et l’étape du parcours Perte de poids sont deux notions distinctes. Marche de l’aventurier est classé débutant dans le catalogue et sert d’étape intermédiaire dans ce parcours.

## Matrice actuelle

Les objectifs proviennent des parcours configurés. La dernière colonne compte les identifiants d’exercices distincts disposant de métadonnées adaptatives, parmi les références du programme, de ses boss et de ses variantes historiques lorsqu’elles sont intégrées aux données. Cette couverture indique la disponibilité des métadonnées, pas une validation clinique.

| Programme | Niveau | Objectifs actuels | Couverture |
| --- | --- | --- | ---: |
| Éveil du héros | Débutant | Reprise douce, Cardio, Renforcement, Régularité, Perte de poids | 11/11 |
| Cœur de dragon | Intermédiaire | Reprise douce, Cardio, Régularité, Perte de poids | 13/13 |
| Ballet des Sylphes | Débutant | Mobilité / récupération | 6/21 |
| Cavalier de la route | Intermédiaire | Cardio | 11/23 |
| Champion des Arènes | Avancé | Reprise douce, Renforcement, Régularité, Perte de poids | 8/28 |
| Forge du guerrier | Intermédiaire | Reprise douce, Renforcement, Régularité, Perte de poids | 13/28 |
| Rempart du Héros | Intermédiaire | Gainage et posture | 5/23 |
| Bras du héros | Intermédiaire | Renforcement | 6/19 |
| Sanctuaire du Voyageur | Débutant | Mobilité / récupération | 3/13 |
| Tour du Mage | Débutant | Gainage et posture, Pilates et équilibre, Mobilité / récupération | 7/22 |
| Maître du Flux | Intermédiaire | Pilates et équilibre, Mobilité / récupération | 6/21 |
| Archimage du Corps | Avancé | Pilates et équilibre, Mobilité / récupération | 5/23 |
| Grand Maître des Arcanes | Avancé | Pilates et équilibre, Mobilité / récupération | 5/24 |
| Marche de l’aventurier | Débutant | Reprise douce, Cardio, Régularité, Perte de poids | 1/1 |
| Les Épreuves de la Forge | Intermédiaire | Reprise douce, Renforcement, Régularité, Perte de poids | 8/19 |

## Passage proposé aux neuf objectifs

La table ci-dessous est une proposition de continuité. Les anciens identifiants restent lisibles. Une correspondance ambiguë est présentée à l’utilisateur lors du choix d’objectif, avec son programme en cours toujours accessible.

| Objectif du PDF | Source actuelle | Point de migration |
| --- | --- | --- |
| Perte de poids | Perte de poids | Conserver le parcours, ses données et ses trophées. |
| Prise de muscle | Renforcement | Proposer un choix entre prise de muscle et force. |
| Force | Renforcement | Conserver les programmes et l’historique de charges. |
| Endurance | Cardio | Reprendre les parcours marche, cardio et vélo. |
| Souplesse | Mobilité / récupération | Proposer le choix en fonction de l’intention. |
| Remise en forme | Reprise douce | Garder les programmes de reprise accessibles. |
| Équilibre et autonomie | Pilates et équilibre, Mobilité / récupération | Proposer le choix, en conservant l’accès aux campagnes Pilates. |
| Entretien physique | Régularité | Conserver les parcours de régularité. |
| Posture et stabilité | Gainage et posture, Pilates et équilibre | Garder les parcours de gainage et Pilates accessibles. |

## Fonctions à réutiliser et écarts

| Domaine | Socle actuel | Travail restant |
| --- | --- | --- |
| Profil | `app-sport.js` gère niveau, activité, matériel, préférences, limitations, restrictions médicales et mesures facultatives. | Le profil a un objectif distinct de celui du héros. Faire du héros la source de vérité pour la planification et conserver l’ancienne valeur en lecture de compatibilité. Prévoir la confirmation de la récupération avant une séance. |
| Exercices | `app-exercise-adaptation.js` valide famille de mouvement, difficulté, impact, articulations, matériel, intensité, équilibre et variantes. | Compléter groupes musculaires et appuis. Auditer les 95 exercices sans fiche adaptative avant de les ouvrir à la substitution. |
| Planning et boss | `app-programs.js` gère les programmes, les compléments, les boss et la révision. `app-weight-planning.js` adapte la durée et dédoublonne l’endurance externe par jour et activité. | Brancher l’adaptation sur le programme principal réellement choisi, étendre les compléments et indicateurs, conserver les conditions propres à chaque campagne. |
| Coach | `app-adaptive-coach.js` conserve bilans, décisions et exclusions de sécurité. `app-sport.js` conserve les performances et un ancien calcul d’effort comparable. | Centraliser la décision de charge afin de ne pas appliquer deux progressions à la même séance. Donner priorité à la sécurité et aux décisions explicites. |
| Suivi | `app-stats.js` affiche les historiques et `app-weight-dashboard.js` ajoute les indicateurs du parcours spécialisé. | Prévoir des métriques par objectif, distinguer absence de mesure et zéro, conserver les historiques. |
| Récompenses | `app-state.js` enregistre la séance et protège son crédit. `app-camp.js` gère inventaire, repos, boutique, titres et trophées. | Réutiliser les quatre identifiants de trophées Perte de poids pour éviter un second crédit. Protéger la révision et les anciens acquis. |
| PWA et sauvegardes | `app-backup.js` exporte les données locales. `service-worker.js` met les ressources de la PWA en cache. La CI exécute les tests Node et le scénario Chrome. | Ajouter des assertions de migration et une recette navigateur avec coupure réseau et réouverture. Tester l’installation d’une mise à jour par-dessus la version actuelle. |

## Migration progressive

1. Faire évoluer le profil de manière additive, avec normalisation des champs existants. Préserver les clés locales, les mesures, l’historique du coach et la sauvegarde des séances actives.
2. Introduire un référentiel d’objectifs versionné, indépendant du rendu. Conserver les identifiants historiques comme alias et demander un choix en cas de correspondance multiple. Les calibres sportifs seront sourcés et testés avant activation.
3. Étendre les métadonnées et n’appliquer l’adaptation qu’aux exercices audités. Une absence de métadonnées est repérable et doit empêcher la substitution spéculative.
4. Persister la séance adaptée au démarrage. Un changement de profil, d’objectif ou de version ne doit pas modifier la séance en cours ni déplacer les validations de boss. Les compléments et la révision conservent leurs règles de crédit.
5. Réutiliser les écritures existantes du journal, des titres et des trophées. Tester deux validations successives, un import de sauvegarde ancienne et une reprise hors connexion avant la mise en production.

La phase d’audit est documentaire. Elle ne nécessite pas de migration ni de nouveau numéro de version de l’application.
