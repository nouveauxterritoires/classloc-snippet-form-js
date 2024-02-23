## Formulaire de demande en ligne Classloc SNIPPET : Documentation technique

### Sommaire

#### 1 - [Informations du demandeur](#1_)
#### 1bis - [Informations du propriétaire](#1bis_)
#### 2 - [Informations de l'hébergement](#2_)
#### 3 - [Informations complémentaires](#3_)
#### 4 - [Envoi des données](#4_)

___

### 1 - Informations du demandeur : <a name="1_"></a>

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

___

### 1bis - Informations du propriétaire : <a name="1bis_"></a>

Cette partie concerne les informations du propriétaire.  
Elle n'est remplissable que si l'utilisateur clique sur le bouton "+ Coordonnées du propriétaire s'il n'est pas le demandeur".

Si l'utilisateur ne clique pas sur ce bouton, tous les champs de cette partie sont considérées comme OPTIONNELS.

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

___

### 2 - Informations de l'hébergement : <a name="2_"></a>

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
| **Nombre de pièces composant le meublé** | #nbpieces-hebergement       | `int`    | **&cross;**     | `data > accommodation > nbPiecesTo` <br>&&<br> `data > request > nbPiecesSupp`*   |
| **Nombre de chambre(s)/cabine(s)**       | #nbchambre-hebergement      | `int`    | **&cross;**     | `data > accommodation > nbCabine`                                                 |
| **Classement actuel**                    | #classement-hebergement     | `string` | **&check;**     | `data > accommodation > currentRanking`                                           |
| **Éligibilité demandée**                 | #eligibilite-demandee       | `int`    | **&check;**     | `data > request > eligDemandee`                                                   |
| **Surface totale**                       | #surface-hebergement        | `float`  | **&cross;**     | `data > accommodation > surface`                                                  |
| **Surface hors salle de bain et WC**     | #surface-ss-sdb-hebergement | `float`  | **&cross;**     | `data > accommodation > surfaceHsdb`                                              |

À noter : Pour le champ "**Nombre de pièces composant le meublé**", on récupère sa valeur soustrait de 1 pour `data > request > nbPiecesSupp`.

___

### 3 - Informations complémentaires : <a name="3_"></a>

| Label           | Id       | **Type** | **Obligatoire** | **Json**                   |
|-----------------|----------|----------|-----------------|----------------------------|
| **Commentaire** | #comment | `string` |  **&cross;**    | `data > request > comment` |

___

### 4- Envoi des données : <a name="4_"></a>

Les données remplies dans le formulaire sont envoyées à Classloc via la route suivante :

`POST: /api/v1/create_outsider_demand`

Les données sont formatées en JSON avec l'arborescence suivante :

``` json
{
    "data" : {
        "request": {
            "source",
            "snippet-token",
            "eligDemandee",
            "capClassee",
            "nbPiecesSupp",
            "comment"
        },
        "accommodation": {
            "name",
            "floor",
            "subtype",
            "phone",
            "address",
            "additionnalAddress",
            "codePostal",
            "city",
            "surface",
            "surfaceHsdb",
            "nbPersonsClasse",
            "nbCabine",
            "nbPiecesTot",
            "currentRanking",
            "owner": {
                "civility",
                "buisinessName",
                "firstName",
                "lastName",
                "siret",
                "mail",
                "phone",
                "address",
                "additionnalAddress",
                "postalCode",
                "city",
                "country"
            },
            "applicant": {
                "civility",
                "buisinessName",
                "firstName",
                "lastName",
                "siret",
                "mail",
                "phone",
                "address",
                "additionnalAddress",
                "postalCode",
                "city",
                "country"
            }
        }
    }
}
```

Si un problème survient lors de l'envoi, Classloc enverra un message qui apparaîtra en rouge sous le formulaire.

Exemple de données formattées en JSON :
``` json
{
    "data" : {
        "request": {
            "source": "snippet-form",
            "snippet-token": "VOTRE_CLÉ",
            "eligDemandee": 0,
            "capClassee": 4,
            "nbPiecesSupp": 3,
            "comment": "No comment"
        },
        "accommodation": {
            "name": "Test",
            "floor": 3,
            "subtype": "Appartement",
            "phone": "NC",
            "address": "38 avenue Maille",
            "additionnalAddress": null,
            "codePostal": "13005",
            "city": "Marseille",
            "surface": 93.3,
            "surfaceHsdb": 89.6,
            "nbPersonsClasse": 3,
            "nbCabine": 3,
            "nbPiecesTot": 2,
            "currentRanking": 2,
            "owner": {
                "civility": "Madame",
                "buisinessName": null,
                "firstName": "Germaine",
                "lastName": "Euge",
                "siret": null,
                "mail": "euge@gmail.com",
                "phone": null,
                "address": "218 Corkery Divide",
                "additionnalAddress": null,
                "postalCode": "96310",
                "city": "Lake Danielleshire",
                "country": "ETATS-UNIS"
            },
            "applicant": {
                "civility": "Monsieur",
                "buisinessName": "Nouveaux Territoires",
                "firstName": null,
                "lastName": null,
                "siret": null,
                "mail": "nt@nouveauxterritoires.fr",
                "phone": null,
                "address": "36 rue Antoine Maille",
                "additionnalAddress": null,
                "postalCode": "13005",
                "city": "Marseille",
                "country": "France"
            }
        }
    }
}
 ```