# Règles du projet Fitness RPG

## Sécurité des données

Ne jamais supprimer de données, de programmes ou de structures sans prévenir l'utilisateur.

Ne jamais supprimer ou remplacer une structure `days` sans vérifier son utilisation.

Ne jamais modifier les programmes, exercices, répétitions, XP, badges ou boss sans demande explicite.

## Programmes

Une séance doit conserver sa structure prévue.

Pour Champion des Arènes, la structure attendue est :

1. Échauffement
2. Défi 1
3. Défi 2
4. Finisher
5. Retour au calme

Ne pas réécrire la structure complète d'un programme lorsqu'il est demandé de modifier seulement une quantité ou un nombre de répétitions.

## Images d'exercices

Les illustrations sont conçues en format carré 1024 × 1024.

Le format de diffusion utilisé par l'application est WebP. Les PNG d'origine ne doivent pas être supprimés avant validation visuelle et accord explicite.

Elles doivent toujours être :

- visibles entièrement ;
- centrées ;
- non déformées ;
- affichées dans un cadre carré.

Utiliser :

```css
object-fit: contain;
object-position: center;
aspect-ratio: 1 / 1;

Ne jamais utiliser object-fit: cover pour une image d'exercice.

Les fallbacks officiels sont :
assets/exercices/homme_default.webp
assets/exercices/femme_default.webp

CSS
Modifier les règles existantes dans app-v5.css.
Ne pas empiler des correctifs en fin de fichier.
Les blocs ajoutés temporairement pour tester doivent ensuite être fusionnés dans les bonnes sections.
Navigation
Les clics doivent rester centralisés dans app-navigation.js.
Éviter de créer plusieurs gestionnaires de clic pour la même action.

Sauvegarde

La séance active utilise la clé :
fitnessRpgV54ActiveProgramSession
Toute modification de la séance active doit être sauvegardée.

Version

La version doit être cohérente entre :
app-config.js ;
index.html ;
les paramètres de cache ?v=.
