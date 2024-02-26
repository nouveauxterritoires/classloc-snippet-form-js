# Formulaire de demande en ligne Classloc SNIPPET : Documentation technique

## A - Liste des champs du formulaire

Les sections qui suives rassemblent l'ensemble des différents champs à remplir sur chaque partie du formulaire.
Il y est précisé pour chaque champ :
* Son label
* Son id
* Le type de donnée correspondant
* S'il est obligatoire ou non
* La clé correspondante à sa valeur dans le futur JSON.

___

### Accès rapide
1. [Informations du demandeur et du propriétaire](#a_1)
2. [Informations de l'hébergement](#a_2)
3. [Informations complémentaires](#a_3)

### 1. Informations du demandeur et du propriétaire <a name="a_1"></a>

| Label                                  | Id             | **Type** | **Obligatoire** | **Json**                                                |
|----------------------------------------|----------------|----------|-----------------|---------------------------------------------------------|
| **Civilité**                           | #civilite      | `string` | **&check;**     | `data > accommodation > applicant > civility`           |
| **Raison Sociale**                     | #raison        | `string` | **&cross;**     | `data > accommodation > applicant > businessName`       |
| **Nom**                                | #nom           | `string` | **&cross;**     | `data > accommodation > applicant > lastname`           |
| **Prénom**                             | #prenom        | `string` | **&cross;**     | `data > accommodation > applicant > firstname`          |
| **Ajouter un SIRET/SIREN (optionnel)** | #siret         | `string` | **&cross;**     | `data > accommodation > applicant > siret`              |
| **Courriel principal**                 | #email         | `string` | **&check;**     | `data > accommodation > applicant > mail`               |
| **Tél principal**                      | #tel           | `string` | **&cross;**     | `data > accommodation > applicant > phone`              |
| **Adresse**                            | #adresse       | `string` | **&check;**     | `data > accommodation > applicant > address`            |
| **Complément d'adresse**               | #complement-ad | `string` | **&cross;**     | `data > accommodation > applicant > additionnalAddress` |
| **Code postal**                        | #code-postal   | `string` | **&check;**     | `data > accommodation > applicant > postalCode`         |
| **Pays**                               | #pays          | `string` | **&check;**     | `data > accommodation > applicant > country`            |
| **Nom de la commune**                  | #commune       | `string` | **&check;**     | `data > accommodation > applicant > city`               |

Si l'hébergement est rattaché à un mandataire, le demandeur (dont les informations vient d'être remplies) est considéré comme tel. <br>
Une balise `<a></a>` se trouve en-dessous de cette section, sous forme de bouton, avec pour label "**+ Cliquez ici si le demandeur n'est pas le propriétaire**".<br>
Au clique sur ce bouton, son label devient "**- Le demandeur est le propriétaire**", et la section suivante "**Information du propriétaire** apparaît et peut être rempli.

| Label                                  | Id             | **Type** | **Obligatoire** | **Json**                                            |
|----------------------------------------|----------------|----------|-----------------|-----------------------------------------------------|
| **Civilité**                           | #civilite      | `string` | **&check;**     | `data > accommodation > owner > civility`           |
| **Raison Sociale**                     | #raison        | `string` | **&cross;**     | `data > accommodation > owner > businessName`       |
| **Nom**                                | #nom           | `string` | **&cross;**     | `data > accommodation > owner > lastname`           |
| **Prénom**                             | #prenom        | `string` | **&cross;**     | `data > accommodation > owner > firstname`          |
| **Ajouter un SIRET/SIREN (optionnel)** | #siret         | `string` | **&cross;**     | `data > accommodation > owner > siret`              |
| **Courriel principal**                 | #email         | `string` | **&check;**     | `data > accommodation > owner > mail`               |
| **Tél principal**                      | #tel           | `string` | **&cross;**     | `data > accommodation > owner > phone`              |
| **Adresse**                            | #adresse       | `string` | **&check;**     | `data > accommodation > owner > address`            |
| **Complément d'adresse**               | #complement-ad | `string` | **&cross;**     | `data > accommodation > owner > additionnalAddress` |
| **Code postal**                        | #code-postal   | `string` | **&check;**     | `data > accommodation > owner > postalCode`         |
| **Pays**                               | #pays          | `string` | **&check;**     | `data > accommodation > owner > country`            |
| **Nom de la commune**                  | #commune       | `string` | **&check;**     | `data > accommodation > owner > city`               |

Si l'hébergement n'est pas rattaché à un mandataire, le demandeur est considéré comme étant également le propriétaire.
Ainsi, dans le JSON, toute la partie `data > accommodation > owner` sera vide.

**L'application Classloc fera la distinction une fois les données réceptionnées.**

___

### 2. Informations de l'hébergement <a name="a_2"></a>

| Label                                    | Id                          | **Type** | **Obligatoire** | **Json**                                                                          |
|------------------------------------------|-----------------------------|----------|-----------------|-----------------------------------------------------------------------------------|
| **Nom**                                  | #nom-heberfement            | `string` | **&cross;**     | `data > accommodation > name`                                                     |
| **Adresse**                              | #adresse-hebergement        | `string` | **&check;**     | `data > accommodation > address`                                                  |
| **Complément d'adresse**                 | #complement-ad-hebergement  | `string` | **&cross;**     | `data > accommodation > additionnalAddress`                                       |
| **Code Postal**                          | #code-postal-hebergement    | `string` | **&check;**     | `data > accommodation > codePostal`                                               |
| **Nom de la commune**                    | #siret-hebergeur            | `string` | **&check;**     | `data > accommodation > city`                                                     |
| **Téléphone**                            | #tel-hebergement            | `string` | **&cross;**     | `data > accommodation > phone`                                                    |
| **Étage**                                | #etage-hebergement          | `int`    | **&check;**     | `data > accommodation > floor`                                                    |
| **Type de logement du meublé**           | #type-hebergement           | `string` | **&check;**     | `data > accommodation > subtype`                                                  |
| **Capacité classée demandée**            | #capacite-hebergement       | `int`    | **&check;**     | `data > accommodation > nbPersonsClasse` <br>&&<br>` data > request > capClassee` |
| **Nombre de pièces composant le meublé** | #nbpieces-hebergement       | `int`    | **&cross;**     | `data > accommodation > nbPiecesTot` <br>&&<br> `data > request > nbPiecesSupp`*  |
| **Nombre de chambre(s)/cabine(s)**       | #nbchambre-hebergement      | `int`    | **&cross;**     | `data > accommodation > nbCabine`                                                 |
| **Classement actuel**                    | #classement-hebergement     | `string` | **&check;**     | `data > accommodation > currentRanking`                                           |
| **Éligibilité demandée**                 | #eligibilite-demandee       | `int`    | **&check;**     | `data > request > eligDemandee`                                                   |
| **Surface totale**                       | #surface-hebergement        | `float`  | **&cross;**     | `data > accommodation > surface`                                                  |
| **Surface hors salle de bain et WC**     | #surface-ss-sdb-hebergement | `float`  | **&cross;**     | `data > accommodation > surfaceHsdb`                                              |

**À noter** : Pour le champ "**Nombre de pièces composant le meublé**", on récupère sa valeur soustrait de 1 pour `data > request > nbPiecesSupp`.

___

### 3. Informations complémentaires <a name="a_3"></a>

Il n'y a qu'un seul champ dans cette partie.<br>
L'utilisateur peut écrire des informations complémentaires comme par exemple un jour et une heure de rendez-vous.


| Label           | Id       | **Type** | **Obligatoire** | **Json**                   |
|-----------------|----------|----------|-----------------|----------------------------|
| **Commentaire** | #comment | `text`   |  **&cross;**    | `data > request > comment` |

Cette information sera enregistrée sous forme de commentaire qui sera accessible au responsable de la futur demande dans l'application Classloc.

