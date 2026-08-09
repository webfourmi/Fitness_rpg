# Fitness RPG — V6.2A Sport

## Contenu

Cette passe ajoute un module sportif séparé :

- `app-sport.js`
- `app-sport.css`

Fonctions ajoutées :

- profil sportif simple dans le menu Héros ;
- niveau sportif ;
- objectif principal ;
- fréquence hebdomadaire souhaitée ;
- durée de séance préférée ;
- matériel disponible ;
- RPE simplifié après une séance de programme ou un boss ;
- historique des performances sauvegardé dans le profil existant ;
- dernières performances visibles dans Héros et Statistiques.

## Important

Aucune structure `days`, répétition prévue, XP, badge ou boss n'est modifiée.

Les nouvelles données sont stockées dans le profil existant :

- `profile.sportProfile`
- `profile.performanceHistory`

La sauvegarde/restauration existante du profil les transporte donc avec le reste des données.

## Installation

Ajouter dans `index.html`, après `app-v5.css` :

```html
<link rel="stylesheet" href="app-sport.css?v=6.2a">
```

Ajouter dans `index.html`, après `app-stats.js` et avant `app.js` :

```html
<script src="./app-sport.js?v=6.2a"></script>
```

Dans `app-config.js`, passer :

```js
version: "0.6.2-a",
displayVersion: "V6.2A",
assetVersion: "6.2a",
```
