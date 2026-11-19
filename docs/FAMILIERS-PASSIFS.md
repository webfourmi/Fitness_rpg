# Familiers actifs — V6.6.6

Le compagnon actif apporte +1 XP aux niveaux d’Affinité 1 et 2, +2 au niveau 3 et +3 au niveau 4. Le jeu utilise le compagnon et son niveau au moment de la validation, avant d’ajouter l’Affinité gagnée pour cette séance.

Le bonus est accordé à la première nouvelle séance de programme guidée validée dans la journée locale. Le plafond est commun à tous les familiers. La date réelle de validation s’applique aussi aux séances rattachées au planning d’un autre jour. Les exercices libres, les programmes personnalisés, les boss et les révisions de semaine utilisent le parcours de récompense existant.

Le profil mémorise la dernière date de bonus et les jours de programme ayant déjà reçu le bonus. Ces marqueurs sont inclus dans la sauvegarde JSON existante. Une validation créditée reste identifiable si le navigateur recharge avant la suppression de la séance active. Le récapitulatif détaille le bonus du compagnon, et la fiche de la ménagerie indique le montant et les conditions.

## Vérifications

- 28 tests Node réussis, dont 9 nouveaux. Ils couvrent les quatre paliers, le plafond après changement de compagnon, les rejouements et l’effacement d’une entrée, la reprise après rechargement, les imports anciens et récents, la navigation de la fiche, les familiers verrouillés, les séances incomplètes, les boss, les révisions et un échec d’écriture suivi d’une nouvelle tentative.
- Les 19 tests existants couvrent notamment les parcours Forge, les références d’exercices et les images Forge, les pesées, les favoris et leur sauvegarde.
- Syntaxe des fichiers JavaScript modifiés, cohérence des versions du socle PWA et contrôle du diff. Les données des programmes, les règles XP de base, les clés historiques et les illustrations conservent leurs fichiers existants.

## Limites

- Les sauvegardes remplacent l’état courant. Restaurer une archive antérieure à un gain remet donc aussi l’XP et les marqueurs à la date de cette archive.
- Le profil repose sur le stockage local du navigateur. Les validations simultanées dans plusieurs onglets ou appareils restent hors du fonctionnement vérifié.
- Le PDF cité dans la conversation de référence n’était joint ni au chat ni au dépôt. Le développement reprend le contenu de la demande et le code du dépôt.

- Le contrôle de la fiche en navigateur réel à 360 px a été tenté. Edge a interrompu la navigation dans l’environnement de test. L’ouverture, le contenu et la fermeture de la fiche ont été vérifiés avec un DOM simulé. La mise en page sur téléphone et le cycle d’installation PWA restent à vérifier sur appareil.
