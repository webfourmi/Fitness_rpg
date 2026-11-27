# Rapport d’audit V6.1F

Périmètre : branche `main`, commit [`81b3db8`](https://github.com/webfourmi/Fitness_rpg/commit/81b3db89f7bff5f5e8876220e8ab97e3d38e3df4), 396 fichiers suivis. Audit intégralement réalisé en lecture seule.

## Synthèse

| Contrôle | Résultat |
|---|---|
| Cohérence des versions | ⚠️ Runtime cohérent en V6.1E, mais V6.1F non appliquée et documentation obsolète |
| Syntaxe JavaScript | ✅ 15 fichiers valides avec `node --check` |
| Fonctions en double | ⚠️ 1 doublon interne et 6 définitions dupliquées dans un fichier non chargé |
| Identifiants HTML en double | ✅ 148 IDs statiques, tous uniques |
| Références `exerciseId` | ✅ 67 identifiants référencés, tous résolus |
| Images manquantes | ❌ 57 chemins statiques absents |
| Fallbacks | ⚠️ Plusieurs fallbacks inexistants ou inadaptés |
| `activeProgramSession` | ⚠️ Fonctionnel, avec deux lacunes mineures de normalisation |
| CSS contradictoire | ❌ Duplication intégrale et nombreuses règles concurrentes |
| Fichiers temporaires/inutiles | ⚠️ 2 sources orphelines et 14 `.gitkeep` superflus |

## Constats détaillés

### 1. Versions

La version d’exécution est cohérente en **V6.1E** :

- `version: "0.6.1-e"`, `displayVersion: "V6.1E"` et `assetVersion: "6.1e"` dans [`app-config.js`](https://github.com/webfourmi/Fitness_rpg/blob/81b3db89f7bff5f5e8876220e8ab97e3d38e3df4/app-config.js#L17-L24) ;
- titre et paramètres `?v=6.1e` cohérents dans [`index.html`](https://github.com/webfourmi/Fitness_rpg/blob/81b3db89f7bff5f5e8876220e8ab97e3d38e3df4/index.html#L5-L15) ;
- en-tête CSS en V6.1E.

En revanche :

- aucune valeur V6.1F n’est encore présente ;
- [`README.md`](https://github.com/webfourmi/Fitness_rpg/blob/81b3db89f7bff5f5e8876220e8ab97e3d38e3df4/README.md#L1) annonce V5 ;
- le workflow reste nommé V6.1B ;
- la majorité des fichiers JavaScript portent encore l’en-tête `Version V5-clean` ;
- `app-stats.js` indique V5.9 et `exercise-explainer.css` V4.4.2.

Les clés de sauvegarde V5/V54 ne constituent pas une incohérence : elles sont historiques et ne doivent pas être renommées.

### 2. Syntaxe JavaScript

Les 15 fichiers `.js`, y compris `app-stats.js`, passent la vérification syntaxique Node sur leurs octets UTF-8 exacts. Aucune erreur de syntaxe confirmée.

### 3. Fonctions en double

Dans [`app-render.js`](https://github.com/webfourmi/Fitness_rpg/blob/81b3db89f7bff5f5e8876220e8ab97e3d38e3df4/app-render.js#L2864), `getHeroImagePathForLevel` est redéfinie à la ligne 3142. La seconde version est protégée par `||`, donc sans écrasement actuel, mais reste redondante.

[`app-session-resume.js`](https://github.com/webfourmi/Fitness_rpg/blob/81b3db89f7bff5f5e8876220e8ab97e3d38e3df4/app-session-resume.js) redéfinit six fonctions déjà présentes dans les modules chargés :

- `resumeActiveProgramSession` ;
- `abandonActiveProgramSession` ;
- `startProgramBossSession` ;
- `validateProgramDay` ;
- `renderTraining` ;
- `renderActiveSessionResumeCard`.

Ce fichier n’est pas chargé par `index.html`, donc aucun écrasement n’a lieu actuellement. Il deviendrait dangereux s’il était réactivé sans consolidation.

### 4. Identifiants HTML

- 148 attributs `id` statiques dans `index.html` ;
- 148 valeurs uniques ;
- aucun doublon simultané confirmé dans les fragments HTML générés.

Les IDs répétés dans certains templates correspondent à des branches de rendu mutuellement exclusives.

### 5. Références `exerciseId`

- 103 exercices de base, tous avec un identifiant unique ;
- 67 `exerciseId` distincts référencés ;
- aucune référence invalide détectée, y compris dans Champion des Arènes.

### 6. Images manquantes

57 chemins uniques référencés ne figurent pas dans l’arbre GitHub ; aucune différence de casse n’a été détectée.

Répartition :

- [`app-data.js`](https://github.com/webfourmi/Fitness_rpg/blob/81b3db89f7bff5f5e8876220e8ab97e3d38e3df4/app-data.js) : 41 chemins ;
- [`app.js`](https://github.com/webfourmi/Fitness_rpg/blob/81b3db89f7bff5f5e8876220e8ab97e3d38e3df4/app.js) : 9 chemins, dont 2 déjà comptés dans `app-data.js` ;
- [`app-progress.js`](https://github.com/webfourmi/Fitness_rpg/blob/81b3db89f7bff5f5e8876220e8ab97e3d38e3df4/app-progress.js#L214-L219) : `assets/badges/badge_default.png` ;
- [`app-rewards.js`](https://github.com/webfourmi/Fitness_rpg/blob/81b3db89f7bff5f5e8876220e8ab97e3d38e3df4/app-rewards.js#L78-L120) : huit familiers numérotés inexistants.

Les 35 images d’exercices absentes comprennent plusieurs fautes de chemin manifestes : préfixes `exercise_` ou `xercice_` au lieu de `exercice_`, double `_`, et variations singulier/pluriel.

Treize chemins de coach sont absents :

- quatre `fallbackImage` : Korvan, Xara, Violette et Elmin ;
- neuf poses : Bazul (2), Satyne (5), Xara (1) et Violette (1).

### 7. Fallbacks incohérents

Les fallbacks officiels d’exercice existent et sont correctement utilisés :

- `assets/exercices/homme_default.png` ;
- `assets/exercices/femme_default.png`.

Incohérences restantes :

- une image de catégorie en erreur utilise un fallback d’exercice, alors que `assets/categories/default.png` existe ;
- `assets/badges/badge_default.png` n’existe pas ;
- les huit fallbacks numérotés de familiers n’existent pas ;
- Xara et Violette possèdent chacune une pose absente et un `fallbackImage` également absent ;
- les fallbacks de Korvan et Elmin sont invalides, même si leurs poses actuellement référencées existent.

### 8. Persistance `activeProgramSession`

Le fonctionnement principal est cohérent :

- clé officielle `fitnessRpgV54ActiveProgramSession` utilisée dans la configuration, l’état et les sauvegardes ;
- chargement lors de l’initialisation ;
- sauvegarde au démarrage et après validation ;
- suppression lors de l’abandon ou de la fin ;
- inclusion dans l’export/restauration.

Deux points mineurs subsistent dans [`app-state.js`](https://github.com/webfourmi/Fitness_rpg/blob/81b3db89f7bff5f5e8876220e8ab97e3d38e3df4/app-state.js#L811-L847) :

- la session chargée est normalisée en mémoire sans être immédiatement réenregistrée ;
- une valeur invalide place l’état en mémoire à `null`, mais ne supprime pas la valeur corrompue du stockage.

La validation d’un exercice déclenche également deux sauvegardes successives, sans conséquence fonctionnelle.

### 9. CSS contradictoire

[`app-v5.css`](https://github.com/webfourmi/Fitness_rpg/blob/81b3db89f7bff5f5e8876220e8ab97e3d38e3df4/app-v5.css) contient :

- une première feuille de 9 272 lignes ;
- quatre lignes parasites `Bibliothèque / Appli sport /app-v5.css` ;
- une seconde copie pratiquement identique commençant à la ligne 9 279 ;
- 18 552 lignes au total.

Dans une seule copie, l’analyse relève 247 couples `sélecteur/propriété` redéfinis avec des valeurs différentes au même niveau de cascade, dont 120 concernant exercices ou programmes. Exemples :

- `.program-session-actions` : `flex` puis `grid` ;
- grilles d’exercices : 3 colonnes puis 2 ;
- `.exercise-control-row` : `flex` puis `grid` ;
- boutons : largeur fixe de 38 px puis largeur 100 % ;
- titres d’exercices : fond coloré puis transparent ;
- `.exercise-detail-overlay` : `z-index: 130` puis `100`.

Toutes les règles ciblant explicitement les images d’exercices utilisent néanmoins `object-fit: contain`. Les occurrences de `cover` concernent les coachs, badges, familiers ou visuels d’accueil.

### 10. Fichiers temporaires ou inutiles

Aucun fichier `.tmp`, `.bak`, `.orig`, `.log` ou copie nommée comme telle.

Deux sources sont orphelines :

- `app-session-resume.js`, non chargé et largement dupliqué ;
- `exercise-explainer.css`, non chargé et dont les sélecteurs ne sont référencés nulle part.

Quatorze `.gitkeep` sont devenus inutiles, leurs répertoires contenant désormais d’autres fichiers :

- `assets/{badges,categories,coach,ecran,exercices,familiers,joueur,joueuse}/.gitkeep` ;
- `assets/coach/{bazul,elmin,korvan,satyne,violette,xara}/.gitkeep`.

## Fichiers pouvant nécessiter une correction

Corrections fonctionnelles ou structurelles :

- `app-v5.css`
- `app-data.js`
- `app.js`
- `app-progress.js`
- `app-rewards.js`
- `app-exercises.js`
- `app-render.js`
- `app-state.js`
- `app-session-resume.js`
- `exercise-explainer.css`

Cohérence V6.1F et documentation :

- `app-config.js`
- `index.html`
- `README.md`
- `.github/workflows/v61b-source-export.yml`
- les en-têtes versionnels des fichiers `app-*.js`

Nettoyage possible :

- les 14 fichiers `.gitkeep` listés ci-dessus ;
- ajout ou correction des ressources manquantes sous `assets/exercices`, `assets/coach`, `assets/badges` et `assets/familiers`.

Aucun fichier, commit ou branche n’a été modifié pendant l’audit.
