# Les Épreuves de la Forge · intégration de données (brouillon)

## État actuel · 20 WebP déposés et contrôlés

Le lot déposé sur la branche `feature/forge-exercices-bibliotheque-20261116` au commit `0334f5615c4f65f3512c2170205ac59e590c179a` contient les **8 exercices, 8 boss et 4 badges attendus**.

- Les 20 chemins sont résolus dans les deux modules Forge ; aucun nouveau visuel ne manque au raccordement technique.
- Chaque fichier a été lu en base64 puis contrôlé : signature RIFF/WebP, taille de fichier, dimensions **1024 × 1024** et SHA-1 Git recalculé identique au blob annoncé par GitHub.
- Volume total du lot : **2 586 776 octets**.
- Les 18 scripts de `index.html` figurent au pré-cache de `service-worker.js`. Les versions de la configuration, des ressources HTML et du service worker restent cohérentes en **6.6.3**.
- Les données des programmes, les répétitions, les règles générales d'XP, les clés de sauvegarde et le moteur ne sont pas modifiés par ce dépôt d'images.

### Réserves graphiques

Les huit images d'exercices déposées ont été examinées visuellement. Elles appartiennent au lot WebP antérieur aux huit PNG individuels les plus récents : sept sont issus de la planche agrandie. **La dimension de diffusion 1024 × 1024 ne constitue pas une résolution source native 1024 × 1024.**

L'illustration `exercice_femme_forge_assisted_pullup.webp` présente le support des pieds à deux hauteurs différentes entre le départ et l'arrivée. Cette ambiguïté pédagogique reste à corriger ; ne pas présenter ce dessin comme validé.

Les huit PNG individuels `image-gen-1(20261116-220516).png` à `image-gen-8(20261116-220538).png` ne sont pas présents sur cette branche, notamment pas dans `assets/exercices/forge-sources/`. Leur contrôle, leur association aux exercices et leur conversion restent à faire pour la série définitive.

### Validation restante

Les contrôles de progression et de cache simulé déjà décrits ci-dessous restent applicables, les sources de jeu étant inchangées. Ils ne remplacent pas `node --check` ni un vrai test navigateur/PWA, qui ne sont toujours pas disponibles dans cette session. **Conserver la PR en brouillon, sans fusion ni publication.**

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
- **Test navigateur complet non effectué**. Les 20 WebP sont maintenant présents ; la série graphique définitive reste à finaliser.

## Avant publication

1. Finaliser la série graphique à partir des huit PNG individuels, sans supprimer les originaux.
2. Vérifier la qualité et l'exactitude anatomique des mouvements avant de les publier.
3. Tester dans un vrai navigateur l'affichage des fiches, des boss, des badges et la progression.
4. Vérifier la V6.6.3 et le pré-cache PWA déjà préparés au moment du futur déploiement, sans modifier les règles du jeu.
5. Conserver la PR en brouillon jusqu'à validation explicite.

