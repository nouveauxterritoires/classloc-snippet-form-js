# Formulaire de demande en ligne Classloc SNIPPET : Documentation technique

## Sommaire

### A - [Liste des champs du formulaire](#a_)
1. [Informations du demandeur et du propriétaire](#a_1) 
2. [Informations de l'hébergement](#a_2)
3. [Informations complémentaires](#a_3)
### B - [Envoi des données du formulaire](#b_)
1. [Route, format et condition](#b_1)
2. [Les données formattées en JSON](#b_2)
* [Request](#b_21)
* [Accommodation](#b_22)
* [Applicant](#b_23)
* [Owner](#b_24)
* [JSON Complet](#b_25)
3. [Exemple de données](#b_3)

___
___

## A - Liste des champs du formulaire <a name="a_"></a>

Les sections qui suives rassemblent l'ensemble des différents champs à remplir sur chaque partie du formulaire.
Il y est précisé pour chaque champ : 
* Son label
* Son id
* Le type de donnée correspondant
* S'il est obligatoire ou non
* La clé correspondante à sa valeur dans le futur JSON.

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
| **Nombre de pièces composant le meublé** | #nbpieces-hebergement       | `int`    | **&cross;**     | `data > accommodation > nbPiecesTo` <br>&&<br> `data > request > nbPiecesSupp`*   |
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

___
___

## B - Envoi des données du formulaire <a name="b_"></a>

### 1. Route, format et condition <a name="b_1"></a>

Une fois le formulaire, l'utilisateur va envoyer le tout en cliquant sur le bouton "**Vlalider la demande**".
Au clique, les données entrées dans le formulaire seront envoyées à l'application Classloc :
* Via la route `/api/v1/create_outsider_demand`
* Avec la méthode `POST`
* Au format `JSON` (`'Content-Type': 'application/json'`)

Lorsque l'application Classloc sera appelée, celle-ci va vérifier la clé API entrée lors de l'installation du formulaire (cf. [Installation](../../install.md)).
Si la clé API n'est pas correct, une erreur s'affichera en bas du formulaire et l'application Classloc ne recevra pas les données.

### 2. Les données formattées en JSON <a name="b_2"></a>


### Request <a name="b_21"></a>

Cette partie concerne les informations propre à la demande de classement, piochant ainsi des informations de l'hébergement et complémentaires.<br>
Certaines sont automatiques et ne sont pas à entrer dans le formulaire.

``` json
{
    "data" : {
        "request": {
            "source": 'string' | Source d`où proviennent les données,
            "snippet-token": 'string' | Clé API entrée à l`installation,
            "eligDemandee": 'string' | Valeur du champ "Éligibilité demandée" des informations de l`hébergement,
            "capClassee": 'int' | Valeur du champ "Capacité classée demandée" des informations de l`hébergement,
            "nbPiecesSupp": 'int' | Valeur du champ "Nombre de pièces composant le meublé" des informations de l`hébergement - 1,
            "comment": 'text|null' | Valeur du champ "Commentaire" des informations complémentaires
        }
    }
}
```

### Accommodation <a name="b_22"></a>

Cette partie concerne la section **Informations de l'hébergement** du formulaire.<br>
Elle contient également les parties **Informations du demandeur** et **Informations du propriétaire** détaillées plus bas.

``` json
{
    "data" : {
        "accommodation": {
            "name": 'string|null' | Valeur du champ "Nom",
            "floor": 'int' | Valeur du champ "Étage",
            "subtype": 'string' | Valeur du champ "Type de logement du meublé",
            "phone": 'string|null' | Valeur du champ "Téléphone",
            "address": 'string' | Valeur du champ "Adresse",
            "additionnalAddress": 'string|null' | Valeur du champ "Complément d'adresse",
            "codePostal": 'string' | Valeur du champ "Code Postal",
            "city": 'string' | Valeur du champ "Nom de la commune",
            "surface": 'float|null' | Valeur du champ "Surface totale",
            "surfaceHsdb": 'float|null' | Valeur du champ "Surface hors salle de bain et WC",
            "nbPersonsClasse": 'int' | Valeur du champ "Capacité classée demandée",
            "nbCabine": 'int|null' | Valeur du champ "Nombre de chambre(s)/cabine(s)",
            "nbPiecesTot": 'int|null' | Valeur du champ "Nombre de pièces composant le meublé",
            "currentRanking": 'string' | Valeur du champ "Classement actuel",
            "owner": {
                ...
            },
            "applicant": {
                ...
            }
        }
    }
}
```

### Applicant <a name="b_23"></a>

Cette partie concerne la section **Informations du demandeur** du formulaire.

``` json
{
    "data" : {
        "accommodation": {
            "applicant": {
                "civility": 'string' | Valeur du champ "Civilité",
                "buisinessName": 'string|null' | Valeur du champ "Raison Sociale",
                "firstName": 'string|null' | Valeur du champ "Prénom",
                "lastName": 'string|null' | Valeur du champ "Nom",
                "siret": 'string|null' | Valeur du champ "Ajouter un SIRET/SIREN (optionnel)",
                "mail": 'string' | Valeur du champ "Courriel principal",
                "phone": 'string|null' | Valeur du champ "Tél principal",
                "address": 'string' | Valeur du champ "Adresse",
                "additionnalAddress": 'string|null' | Valeur du champ "Complément d'adresse",
                "postalCode": 'string' | Valeur du champ "Code postal",
                "city": 'string' | Valeur du champ "Nom de la commune",
                "country": 'string' | Valeur du champ "Pays"
            }
        }
    }
}
```

### Owner <a name="b_24"></a>

Cette partie concerne la section **Informations du propriétaire** du formulaire, dont la structure JSON est la même que celle de la partie **Applicant**.

``` json
{
    "data": {
        "accommodation": {
            "owner": {
                "civility": 'string' | Valeur du champ "Civilité",
                "buisinessName": 'string|null' | Valeur du champ "Raison Sociale",
                "firstName": 'string|null' | Valeur du champ "Prénom",
                "lastName": 'string|null' | Valeur du champ "Nom",
                "siret": 'string|null' | Valeur du champ "Ajouter un SIRET/SIREN (optionnel)",
                "mail": 'string' | Valeur du champ "Courriel principal",
                "phone": 'string|null' | Valeur du champ "Tél principal",
                "address": 'string' | Valeur du champ "Adresse",
                "additionnalAddress": 'string|null' | Valeur du champ "Complément d'adresse",
                "postalCode": 'string' | Valeur du champ "Code postal",
                "city": 'string' | Valeur du champ "Nom de la commune",
                "country": 'string' | Valeur du champ "Pays"
            }
        }
    }
}
```

Si la section **Informations du propriétaire** du formulaire n'a pas été rempli, cette section sera tout simplement vide.

``` json
{
    "data": {
        "accommodation": {
            "owner": {}
        }
    }
}
```

#### JSON Complet <a name="b_25"></a>

``` json
{
    "data" : {
        "request": {
            "source": 'string',
            "snippet-token": 'string',
            "eligDemandee": 'string',
            "capClassee": 'int',
            "nbPiecesSupp": 'int',
            "comment": 'text|null'
        }
        "accommodation": {
            "name": 'string|null',
            "floor": 'int',
            "subtype": 'string',
            "phone": 'string|null',
            "address": 'string',
            "additionnalAddress": 'string|null',
            "codePostal": 'string',
            "city": 'string',
            "surface": 'float|null',
            "surfaceHsdb": 'float|null',
            "nbPersonsClasse": 'int',
            "nbCabine": 'int|null',
            "nbPiecesTot": 'int|null',
            "currentRanking": 'string',
            "owner": {
                "civility": 'string',
                "buisinessName": 'string|null',
                "firstName": 'string|null',
                "lastName": 'string|null',
                "siret": 'string|null',
                "mail": 'string',
                "phone": 'string|null',
                "address": 'string',
                "additionnalAddress": 'string|null',
                "postalCode": 'string',
                "city": 'string',
                "country": 'string'
            },
            "applicant": {
                "civility": 'string',
                "buisinessName": 'string|null',
                "firstName": 'string|null',
                "lastName": 'string|null',
                "siret": 'string|null',
                "mail": 'string',
                "phone": 'string|null',
                "address": 'string',
                "additionnalAddress": 'string|null',
                "postalCode": 'string',
                "city": 'string',
                "country": 'string'
            }
        }
    }
}
```

___

### 3. Exemple de données formattées en JSON <a name="b_3"></a>

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