# Architecture de Fitness RPG

## Objectif

Fitness RPG est une application web mobile-first qui transforme l'entraînement sportif en aventure RPG.

## Fichiers principaux

### index.html

Structure générale de l'application et chargement des fichiers CSS et JavaScript.

### app-config.js

Configuration globale :

- version de l'application ;
- clés de sauvegarde locale ;
- règles XP ;
- objectifs ;
- liste des programmes.

### app-state.js

État de l'application :

- profil du héros ;
- progression ;
- journal ;
- séances ;
- sauvegarde locale ;
- séance de programme active.

### app-data.js

Données principales :

- exercices ;
- catégories ;
- badges ;
- coachs ;
- programmes détaillés ;
- boss.

### app-render.js

Génération et mise à jour de l'interface.

### app-navigation.js

Navigation entre les écrans et gestion centralisée des clics.

### app-programs.js

Gestion des programmes :

- semaines ;
- jours ;
- boss ;
- séances guidées ;
- validation ;
- timer ;
- récompenses.

### app-exercises.js

Bibliothèque des exercices :

- catégories ;
- cartes ;
- images ;
- explications ;
- timer ;
- programmes personnalisés.

### app-progress.js

Calcul et affichage :

- XP ;
- niveaux ;
- badges ;
- bonus ;
- progression.

### app-v5.css

Styles de l'application.

Les règles existantes doivent être modifiées directement.

Éviter d'ajouter des blocs de correction en fin de fichier, sauf pour un test temporaire.
