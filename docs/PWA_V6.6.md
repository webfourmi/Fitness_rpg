# Fitness RPG — PWA V6.6

## Objectif

V6.6 rend Fitness RPG installable depuis un navigateur mobile et utilisable hors connexion après une première ouverture en ligne.

Cette évolution ne modifie ni les programmes, ni les exercices, ni les répétitions, ni l’XP, ni les badges, ni les clés de sauvegarde locale.

## Fichiers PWA

- `manifest.webmanifest` : identité de l’application, couleurs, icônes, écran de lancement et périmètre d’installation ;
- `service-worker.js` : cache du socle de l’application et des images consultées ;
- `app-pwa.js` : invitation d’installation, état de connexion et cycle de mise à jour ;
- `assets/pwa/` : icônes 192, 512 et Apple Touch Icon.

## Stratégies de cache

- navigation : réseau en priorité, puis `index.html` en secours hors ligne ;
- JavaScript, CSS et manifeste : cache de version ;
- images : affichage depuis le cache puis actualisation en arrière-plan ;
- données utilisateur : aucune intervention du service worker.

Le cache d’images reste distinct du cache de version. L’activation d’une nouvelle version supprime uniquement les anciens caches appartenant à Fitness RPG. Elle ne supprime jamais `localStorage`.

## Cycle des futures mises à jour

1. Conserver le nom `service-worker.js`.
2. Mettre à jour la version dans `app-config.js` et tous les paramètres `?v=` de `index.html`.
3. Mettre à jour `APP_VERSION` et les chemins versionnés de `CORE_ASSETS` dans `service-worker.js`.
4. Publier la nouvelle version.
5. Le nouveau service worker s’installe en attente.
6. L’application propose « Mettre à jour ».
7. Le rechargement ne peut pas être lancé pendant une séance ou un minuteur actif.

`skipWaiting()` n’est donc jamais exécuté automatiquement. Il est déclenché uniquement après l’action explicite de l’utilisateur, hors séance.

## Installation Android

1. Ouvrir l’adresse HTTPS de Fitness RPG dans Chrome ou un navigateur compatible.
2. Attendre l’invitation « Installer Fitness RPG ».
3. Toucher « Installer ».
4. Lancer ensuite Fitness RPG depuis son icône sur l’écran d’accueil.

## Contrôles de publication

- manifeste JSON valide ;
- icônes réellement produites en 192 × 192, 512 × 512 et 180 × 180 ;
- tous les fichiers `CORE_ASSETS` disponibles ;
- syntaxe JavaScript valide ;
- chargement en ligne puis rechargement hors ligne ;
- installation en mode `standalone` ;
- mise à jour différée lorsqu’une séance est active ;
- clés `localStorage`, programmes, exercices, XP et badges inchangés.
