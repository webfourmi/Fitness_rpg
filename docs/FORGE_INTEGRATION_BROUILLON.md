# Les Épreuves de la Forge · intégration (brouillon)

## État actuel · huit illustrations individuelles intégrées

La branche `feature/forge-exercices-bibliotheque-20261116` contient les **24 séances, 8 boss, 4 badges et 8 fiches d’exercices** du parcours. La V6.6.3 et le pré-cache des deux modules Forge sont préparés.

- Sept WebP ont été remplacés par des exports des PNG individuels de 1254 × 1254 pixels, sans agrandissement de planche, en WebP 1024 × 1024, qualité 94 et filtre Lanczos.
- La huitième illustration, la traction assistée, a été corrigée à partir du dernier PNG : les pieds restent sur le même appui fixe dans les deux positions, en cohérence avec la fiche existante.
- L’association des fichiers a été contrôlée visuellement : `image-gen-7(20261116-220534).png` représente la fente arrière, tandis que `image-gen-8(20261116-220538).png` est la source de la correction de traction. Ne pas inverser ces deux visuels.
- Les huit PNG initiaux et le PNG de traction corrigée sont conservés dans l’archive complète remise en conversation. Aucun original PNG n’a été supprimé.
- Les 8 boss et 4 badges déjà déposés sont conservés à l’identique.
- Les données des programmes, les répétitions, les XP, les clés de sauvegarde et le moteur restent inchangés pendant cette reprise.
- `docs/FORGE_IMAGES_MANIFEST.json` recense les 20 chemins, dimensions, tailles et SHA-256 ; les huit nouvelles illustrations y sont reliées à leurs sources.

### Vérifications réellement exécutées

- `node --check` : les 19 scripts applicatifs passent ; le nouveau fichier de tests passe aussi.
- `node --test tests/*.test.cjs` : **19 tests réussis, 0 échec**, dont 8 tests Forge et 11 tests de régression poids/favoris/sauvegarde.
- Conservation des programmes, exercices, badges, règles générales d’XP et clés existants ; rechargement des modules sans doublon.
- Huit semaines de trois séances, un nouveau mouvement chaque semaine, références d’exercices résolues et 20 images WebP présentes.
- Déverrouillage des boss après trois séances distinctes, progression jusqu’à la fin de S8, absence de déverrouillage indu par une séance répétée ou un autre programme.
- Seuils des quatre badges vérifiés avec le moteur existant ; reprise d’une séance et de l’exercice coché après rechargement de la sauvegarde simulée.
- HTML des cartes de bibliothèque et de séance vérifié : les huit illustrations sont référencées correctement.

### Limite de validation

**Le test dans un vrai navigateur et le test PWA réel restent à effectuer.** Chromium local ne peut pas démarrer dans cet environnement et le navigateur distant refuse l’ouverture des fichiers locaux. Les tests Node et les contrôles de fichiers ne remplacent pas cette vérification.

La PR reste en brouillon, sans fusion ni publication, jusqu’à validation explicite.

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

## Chemins des 20 images présentes sur la branche

Les fichiers suivants ont été déposés et leur intégrité binaire a été vérifiée. Conserver les PNG sources séparément :

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
- **Test navigateur complet non effectué**. Les huit illustrations individuelles sont désormais intégrées ; la validation dans le navigateur reste à faire.

## Avant publication

1. Vérifier dans un navigateur l’affichage complet des illustrations, les fiches, les boss et les badges, sur mobile et ordinateur.
2. Vérifier le cycle de mise à jour PWA 6.6.3 et la reprise d’une séance avec le stockage du navigateur.
3. Obtenir la validation explicite avant toute fusion dans `main`.
