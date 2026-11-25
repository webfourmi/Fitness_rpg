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

## Phase 2 · Grimoire et variantes

Périmètre audité : Éveil du héros, Marche de l’aventurier et Cœur du dragon, y compris leurs boss et compléments. Le catalogue couvre les 20 exercices distincts de ces programmes et les variantes associées. Les identifiants et les illustrations sont ceux du grimoire existant.

Dans le grimoire, le bouton de détails affiche les variantes de la même famille et, si le profil complémentaire est renseigné, une suggestion adaptée aux données déclarées. La chaise, le mur et le support surélevé sont sélectionnables dans le profil. Les recommandations sont à considérer selon la tolérance au mouvement.

Le moteur conserve la dose, l’unité et la phase lors d’une substitution, avec conservation de la séance source et de ses récompenses. Il demande au futur planning de passer le mouvement lorsque les filtres excluent toutes les options, et réserve une réponse distincte aux exercices non audités et aux demandes d’avis professionnel. Aucun remplacement automatique n’est appliqué aux séances historiques dans cette phase.

- [Assurance Maladie · Activité physique progressive selon les capacités](https://www.ameli.fr/assure/sante/themes/surpoids-obesite-adulte/modifier-quotidien)

## Phase 3 · Planning hebdomadaire

Dans Planning, l’objectif Perte de poids donne accès à un planning personnalisé. Les campagnes réutilisées suivent l’ordre Éveil du héros, Marche de l’aventurier et Cœur du dragon. Les intitulés débutant, intermédiaire et avancé décrivent les étapes de ce parcours. Chaque passage s’appuie sur les séances essentielles et les boss requis de la campagne précédente.

Les jours proposés réunissent trois séances essentielles, deux compléments facultatifs, le boss et un jour de repos. Les séances peuvent être étalées sur plusieurs semaines, avec variantes, mobilité et équilibre selon le profil. Les blocs de renforcement sont proposés les jours 1 et 3 selon les mouvements et le matériel disponibles. Les durées guidées sont ajustées au budget saisi, sur la base d’une estimation qui laisse une marge de transition. Les longues pauses peuvent nécessiter de fractionner la séance. Recommencer une semaine réutilise le mécanisme de révision existant et conserve les acquis.

Les totaux d’endurance quotidiens saisis sont inclus dans les futures sauvegardes. Chaque total couvre une journée et une activité, journal compris. Le rapprochement par date et activité retient la valeur la plus élevée entre journal et saisie plutôt que de les additionner. Le repère hebdomadaire est progressif, limité par les disponibilités déclarées et sans conséquence sur les récompenses ou les boss.

- [OMS · Activité physique et repères hebdomadaires](https://www.who.int/europe/news-room/fact-sheets/item/physical-activity)

## Phase 4 · Coach adaptatif

Les séances personnalisées proposent un bilan facultatif après la séance. L’effort de 1 à 10, la douleur inhabituelle, la fatigue et la récupération ressentie guident le conseil affiché par le coach choisi. Les bilans et décisions sont enregistrés dans le profil et inclus dans les futures sauvegardes.

Un effort d’au moins 8 sur 10, une fatigue importante, une récupération difficile ou une douleur légère réduisent la prochaine durée cible de 25 %. Deux bilans faciles et bien tolérés pour le même programme et le même type de séance peuvent proposer une évolution. Après accord, un seul bloc d’endurance augmente de 10 % au maximum, dans la limite d’une minute et du temps disponible. Les seuils sont des choix de conception.

L’arrêt en séance retire la séance active et son minuteur avant toute validation et conserve les acquis. Une douleur importante ou persistante écarte le mouvement concerné des séances adaptées. Si le mouvement est inconnu ou si un signe d’alerte est signalé, le parcours personnalisé est suspendu. La reprise demande une confirmation après avis professionnel. Le bilan et les décisions de sécurité ne donnent aucune récompense.

- [Assurance Maladie · Reconnaître les douleurs thoraciques nécessitant des soins urgents](https://www.ameli.fr/assure/sante/themes/douleur-thoracique/reconnaitre-agit-urgence)

## Phase 5 · Suivi et trophées

Le suivi dans le planning affiche l’endurance, les jours de renforcement adaptés, les jours actifs, les campagnes terminées, le repos prévu et la dernière récupération renseignée. Le poids et le tour de taille sont masqués par défaut et n’interviennent dans aucun calcul de progression, d’XP ou de pièces. L’affichage reprend les pesées déjà saisies dans Statistiques. Pour le tour de taille, une nouvelle valeur remplace la mesure de la journée.

Les quatre noms proposés par le PDF ont été retenus. Chaque trophée se récupère une seule fois et rejoint le vestiaire. Les Bottes du voyageur sont un emblème équipable en accessoire, sur les emplacements existants du héros. Répartition des récompenses :

- Bottes du voyageur · 30 minutes d’endurance sur deux jours de la même semaine, 20 XP et 10 PO.
- Gardien de la force · deux jours de renforcement du parcours dans la même semaine, 25 XP et 10 PO.
- Sage du campement · un jour de repos prévu enregistré, 15 XP et 5 PO.
- Phénix de la renaissance · les trois campagnes terminées et une variante utilisée dans une séance validée, 50 XP et 25 PO.

Les gains des trophées sont indépendants des gains de séance. Les durées et mesures corporelles sont facultatives, et les mouvements suspendus par le coach restent soumis aux règles de sécurité de la phase 4.
