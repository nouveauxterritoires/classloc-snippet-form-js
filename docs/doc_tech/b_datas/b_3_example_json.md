# Formulaire de demande en ligne Classloc SNIPPET : Documentation technique

## B - Envoi des données du formulaire

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