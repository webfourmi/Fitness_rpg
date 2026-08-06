# Instructions pour les agents de code

Tu travailles sur Fitness RPG.

## Priorité

La priorité absolue est de préserver la stabilité de l'application.

## Interdictions

Ne jamais :

- supprimer une structure `days` ;
- supprimer des programmes ou exercices ;
- modifier des répétitions sans demande explicite ;
- renommer une clé de sauvegarde ;
- modifier l'XP ou les badges sans demande ;
- réécrire un fichier entier quand une modification ciblée suffit ;
- fusionner directement une pull request dans `main`.

## Avant toute modification

1. Lire `docs/ARCHITECTURE.md`.
2. Lire `docs/REGLES_PROJET.md`.
3. Identifier précisément les fichiers concernés.
4. Expliquer les modifications proposées.
5. Vérifier que la modification ne touche pas aux données des programmes.

## Images

Toutes les images d'exercices sont carrées.

Utiliser :

```css
aspect-ratio: 1 / 1;
object-fit: contain;
object-position: center;


Ne jamais utiliser object-fit: cover pour une image d'exercice.

CSS

Modifier les règles existantes dans app-v5.css.
Ne pas ajouter une succession de blocs de surcharge en fin de fichier.
Validation obligatoire

Après toute modification JavaScript :
node --check nom-du-fichier.js

Après une modification importante :
contrôler les identifiants en double ;
contrôler les fonctions en double ;
vérifier les références exerciseId ;
vérifier les chemins d'images ;
vérifier la cohérence des versions ;
afficher le diff.

Git

Travailler sur une branche dédiée.
Créer une pull request vers main.
Ne jamais fusionner automatiquement.
