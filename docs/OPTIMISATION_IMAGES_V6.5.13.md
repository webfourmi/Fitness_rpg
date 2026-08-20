# Optimisation des images — V6.5.13

## Périmètre

L'audit porte sur les 396 fichiers PNG présents dans `assets/` sur la branche `main` au commit `af215f1717c758d6ee7617237fab00aa310e808a`.

Les programmes, les exercices, les répétitions, l'XP, les badges et les clés de sauvegarde ne sont pas modifiés.

## Mesures avant conversion

- 396 PNG ;
- 564,98 Mio ;
- 341 images en 1254 × 1254 ;
- 34 images utilisent réellement la transparence.

Répartition principale :

| Famille | PNG | Poids PNG |
|---|---:|---:|
| Exercices | 228 | 306,91 Mio |
| Badges | 56 | 128,34 Mio |
| Familiers | 32 | 56,83 Mio |
| Catégories | 21 | 42,84 Mio |

## Profil retenu

- format WebP ;
- qualité 88 ;
- préréglage `picture` de libwebp ;
- grandes illustrations carrées limitées à 1024 × 1024 ;
- proportions conservées ;
- transparence conservée ;
- fichiers plus petits que 1024 px non agrandis.

## Résultat mesuré

| Famille | Poids PNG | Poids WebP | Réduction |
|---|---:|---:|---:|
| Exercices | 306,91 Mio | 18,40 Mio | 94,0 % |
| Badges | 128,34 Mio | 13,25 Mio | 89,7 % |
| Familiers | 56,83 Mio | 2,76 Mio | 95,1 % |
| Catégories | 42,84 Mio | 3,41 Mio | 92,0 % |
| Ensemble des 396 images | 564,98 Mio | 40,67 Mio | 92,8 % |

Les 396 sorties ont été générées. Les 34 transparences utiles sont toujours présentes.

## Migration effectuée

1. Ajouter les WebP et basculer les références de l'application.
2. Vérifier les chemins, les fallbacks et les principaux écrans sur mobile.
3. Conserver les PNG pendant cette validation.
4. Ne supprimer les PNG qu'après accord explicite et sur une branche dédiée.

Les étapes 1 à 3 ont été contrôlées sur la branche `v6.5.13-image-webp-optimization`. Après accord explicite, les 396 PNG ont été retirés de cette branche. Ils restent récupérables depuis l'historique Git antérieur.

Cette suppression réduit l'arborescence courante, mais pas l'historique Git déjà publié. Réécrire l'historique pour réduire la taille totale du dépôt serait une opération distincte et destructive.
