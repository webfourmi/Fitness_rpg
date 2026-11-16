# Les Épreuves de la Forge · intégration de données (brouillon)

Cette branche ajoute sans changement du moteur Fitness RPG :

- un programme classé **Débutant**, disponible dès le niveau 1 ;
- **8 semaines × 3 séances = 24 séances**, les lundi, mercredi et vendredi via le planning existant ;
- **8 boss spécifiques** (un par semaine), affichés par la mécanique de boss existante après les trois séances validées ;
- un exercice nouvellement introduit chaque semaine et réutilisé ensuite ;
- **4 badges** de progression avec les conditions déjà prises en charge (1, 8, 16 et 32 validations du programme, boss compris) ;
- **8 fiches d'exercices** détaillées, chacune avec quatre variantes et des consignes de sécurité.

## Fichiers de données ajoutés

- `app-program-forge-exercises.js` : catalogue de huit exercices de musculation.
- `app-program-forge.js` : configuration du programme, séances, boss, badges.
- `index.html` charge ces deux modules après `app-data.js`, avant le moteur.

Aucune modification des fichiers `app-progress.js`, `app-programs.js`, `app-state.js`, `app-render.js` ou des règles d'XP.

## Images à téléverser AVANT toute fusion (non présentes dans cette branche)

Les fichiers sont préparés dans les archives livrées dans la conversation. Conserver les PNG sources séparément et déposer les WebP aux chemins :

### Exercices
```
assets/exercices/exercice_femme_forge_goblet_squat.webp
assets/exercices/exercice_femme_forge_dumbbell_bench_press.webp
assets/exercices/exercice_femme_forge_one_arm_row.webp
assets/exercices/exercice_femme_forge_romanian_deadlift.webp
assets/exercices/exercice_femme_forge_farmer_carry.webp
assets/exercices/exercice_femme_forge_seated_shoulder_press.webp
assets/exercices/exercice_femme_forge_assisted_pullup.webp
assets/exercices/exercice_femme_forge_reverse_lunge.webp
```

### Boss (dossier existant `assets/boss/`)
```
assets/boss/forge-boss-semaine-01-gardien-fondations.webp
assets/boss/forge-boss-semaine-02-gardien-fondations-revanche.webp
assets/boss/forge-boss-semaine-03-veilleur-tour.webp
assets/boss/forge-boss-semaine-04-veilleur-tour-revanche.webp
assets/boss/forge-boss-semaine-05-maitre-trois-armes.webp
assets/boss/forge-boss-semaine-06-maitre-trois-armes-revanche.webp
assets/boss/forge-boss-semaine-07-gardienne-forge.webp
assets/boss/forge-boss-semaine-08-gardienne-forge-ultime.webp
```

### Badges
```
assets/badges/forge-premier.webp
assets/badges/forge-apprenti.webp
assets/badges/forge-compagnon.webp
assets/badges/forge-maitre.webp
```

Les noms des boss/badges reprennent les fichiers de l'archive graphique. Les huit exercices prennent leur WebP depuis l'archive « fitness-rpg-forge-exercices-catalogue.zip ». Les avatars masculins d'exercice utilisent provisoirement l'illustration générique existante.

## Contrôles effectués (automatisés via les données)

- Initialisation réelle de `app-config.js`, `app-data.js` et des deux nouveaux modules : OK.
- Lancement répété des modules : aucun doublon créé.
- 24 séances, 8 boss, 4 badges : OK.
- Toutes les références d'exercices du programme et des boss sont résolues : OK.
- Boss semaine 1 verrouillé avant les séances, déverrouillé après 3 séances, puis accès à la semaine 2 après victoire : OK.
- **Test navigateur complet non effectué**. Images non encore téléversées.

## Avant publication

1. Intégrer les 20 WebP ci-dessus, sans supprimer les PNG originaux.
2. Vérifier la qualité et l'exactitude anatomique des mouvements avant de les publier.
3. Tester dans un vrai navigateur l'affichage des fiches, des boss, des badges et la progression.
4. Mettre à jour de manière cohérente la version et le cache PWA au moment du déploiement, sans modifier les règles du jeu.
5. Conserver la PR en brouillon jusqu'à validation explicite.

## Relecture graphique du 16 novembre 2026

Le contrôle par comparaison avec les visuels d'exercices du dépôt révèle que la première série de huit exercices (tenue moderne et décor extérieur) n'est pas conforme au style de Fitness RPG : personnages médiévaux sur fond noir. Une nouvelle planche médiévale est préparée dans le fichier de conversation `fitness-forge-20-visuels-style-medieval-BROUILLON.zip`, mais **elle reste à valider** : les huit exercices ont été découpés depuis une planche source (environ 438 px par case), puis agrandis à 1024 px ; ce n'est pas un rendu natif 1024 px. La traction assistée comporte également une représentation ambiguë de la hauteur du support des pieds. Éviter toute fusion tant que ce visuel n'a pas été corrigé et qu'un test d'affichage n'a pas été réalisé.

Les nouveaux WebP ne sont **pas** téléversés sur GitHub. Les trois dossiers cibles existants sont `assets/exercices/`, `assets/boss/` et `assets/badges/`.
