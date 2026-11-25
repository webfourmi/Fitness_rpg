# Parcours perte de poids

## Phase 1 · Profil sportif et sécurité

Le profil est facultatif. Le formulaire se trouve dans Héros, sous Ton entraînement. Le planning de l’objectif Perte de poids affiche les repères enregistrés et donne accès au formulaire.

Les champs complémentaires sont stockés dans `profile.sportProfile.trainingProfile` avec `version: 1`. Un ancien profil conserve ses préférences et reçoit une valeur `null` pour ces champs. Le format de sauvegarde existant exporte le profil entier. Effacer les données complémentaires agit sur la copie locale et les futures sauvegardes. Les exports déjà téléchargés conservent leur contenu.

Les règles de recommandation servent à préparer le futur planning :

1. Une restriction médicale ou une fragilité déclarée suspend la proposition d’une durée initiale et invite à demander un avis professionnel.
2. Une faible activité habituelle ou une limitation déclarée donne un repère de reprise facile et fractionnable. Le plafond de démarrage de 10 minutes par bloc est un choix de conception, soumis à la tolérance et au temps disponible renseigné.
3. L’âge de 65 ans ou plus et les difficultés d’équilibre déclenchent un conseil d’équilibre. Le niveau reste celui renseigné par la personne.
4. La préférence sans sauts et les limitations liées aux genoux conduisent à privilégier les activités sans sauts. Les variantes par mouvement seront traitées en phase 2.
5. Le poids, la taille et le tour de taille sont facultatifs et indépendants du calcul. Les signes d’alerte font l’objet d’un conseil d’arrêt immédiat et, selon la situation, d’appel des secours.

Références vérifiées

- [OMS · Lignes directrices sur l’activité physique et la sédentarité](https://www.who.int/europe/publications/i/item/9789240014886)
- [HAS · Prescription d’activité physique, surpoids et obésité de l’adulte](https://www.has-sante.fr/jcms/p_3360220/fr/synthese-prescription-d-activite-physique-surpoids-obesite-de-l-adulte)
- [Assurance Maladie · Reconnaître une douleur thoracique urgente](https://www.ameli.fr/assure/sante/themes/douleur-thoracique/reconnaitre-agit-urgence)
