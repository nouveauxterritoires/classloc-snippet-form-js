# Formulaire de demande en ligne Classloc SNIPPET : Documentation technique

## B - Envoi des données du formulaire

___

### Accès rapide
* [Request](#b_21)
* [Accommodation](#b_22)
* [Applicant](#b_23)
* [Owner](#b_24)
* [JSON Complet](#b_25)

### 2. Les données formattées en JSON

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

### JSON Complet <a name="b_25"></a>

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