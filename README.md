# Fitness RPG — V6.1F

Fitness RPG est une application web mobile-first qui transforme l'entraînement sportif en aventure RPG.

La série V6.1 a principalement consolidé l'expérience mobile, les séances guidées, les écrans secondaires, les images d'exercices et la stabilité générale de l'application.

## Version actuelle

**V6.1F — validation et nettoyage**

Cette version ne modifie pas le contenu sportif des programmes. Elle consolide le socle technique avant les évolutions suivantes.

### Travaux V6.1F

- nettoyage et consolidation de `app-v5.css` ;
- correction des chemins d'images manifestement erronés ;
- utilisation des fallbacks officiels pour les illustrations réellement absentes ;
- sécurisation de `activeProgramSession` ;
- suppression de la définition redondante de `getHeroImagePathForLevel` ;
- harmonisation de la version et du cache en V6.1F.

## Principes du projet

- application mobile-first ;
- programmes sportifs scénarisés comme des aventures ;
- progression par XP, niveaux, badges, boss et familiers ;
- séances guidées ;
- reprise d'une séance interrompue ;
- planning ;
- statistiques ;
- journal ;
- sauvegarde et restauration.

## Fichiers principaux

- `index.html` : structure générale de l'application ;
- `app-config.js` : configuration et version ;
- `app-state.js` : état, profil, sauvegarde et séance active ;
- `app-data.js` : exercices, coachs, badges, boss et programmes ;
- `app-render.js` : rendu de l'interface ;
- `app-navigation.js` : navigation ;
- `app-programs.js` : programmes et séances guidées ;
- `app-exercises.js` : bibliothèque d'exercices et programmes personnalisés ;
- `app-progress.js` : XP, niveaux et badges ;
- `app-rewards.js` : familiers et récompenses ;
- `app-v5.css` : styles de l'application.

## Règles importantes

Les structures `days`, les programmes, les répétitions, l'XP, les badges et les clés de sauvegarde historiques ne doivent pas être modifiés sans besoin explicite.

Les illustrations d'exercices sont conçues en format carré 1024 × 1024 et doivent rester entièrement visibles :

```css
aspect-ratio: 1 / 1;
object-fit: contain;
object-position: center;
```

Fallbacks officiels :

```text
assets/exercices/homme_default.png
assets/exercices/femme_default.png
```

La clé de sauvegarde historique de la séance active reste :

```text
fitnessRpgV54ActiveProgramSession
```

## Documentation

La documentation technique du projet se trouve dans :

- `AGENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/REGLES_PROJET.md`
- `docs/AUDIT_V6.1F.md`

## Validation

Après modification JavaScript, lancer :

```bash
node --check nom-du-fichier.js
```

La priorité actuelle du projet est la stabilité du socle V6.1F avant l'ajout de nouvelles fonctionnalités.
