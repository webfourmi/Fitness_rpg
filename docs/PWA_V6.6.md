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

## Cycle des futures mises à jour (depuis V6.6.12)

1. Incrémenter la version à chaque livraison affectant le code, les contenus ou les médias de l'application.
2. Aligner la version dans `app-config.js` (`version`, `displayVersion`, `assetVersion`), `index.html` (tous les `?v=`), `service-worker.js` (`APP_VERSION` et les ressources) et `version.json`.
3. Mettre à jour `version.json` avec une courte note de nouveauté destinée au joueur.
4. Les tests `tests/pwa-version.test.cjs` vérifient l'alignement. `scripts/check-version-bump.cjs`, exécuté en CI, vérifie qu'une PR contenant du code ou des ressources incrémente la version par rapport à `main`.
5. Après publication sur GitHub Pages, l'appli vérifie `version.json` en ligne, sans cache, au lancement, au retour au premier plan, au retour de la connexion et toutes les 15 minutes. Le service worker est aussi vérifié.
6. Quand une version plus récente est détectée, le bandeau « Nouvelle mise à jour disponible » et le bouton persistant « Installer MAJ » dans l'en-tête apparaissent. « Plus tard » masque seulement le bandeau. La version actuelle et la nouvelle sont affichées lorsque le manifeste les fournit.
7. « Installer MAJ » installe le nouveau service worker quand il attend, ou recharge avec un paramètre de version en secours pour les navigateurs sans worker en attente. Il reste inactif pendant une séance.
8. Le menu « Plus » propose « Vérifier les MAJ » pour déclencher le contrôle manuellement.

L'application n'efface pas le profil ni les sauvegardes. Si la connexion est absente, elle conserve l'ancienne version hors ligne et attend le retour du réseau.

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
