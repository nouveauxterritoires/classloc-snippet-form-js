# Formulaire de demande en ligne Classloc SNIPPET : Documentation technique

## A - Liste des champs du formulaire

Les sections qui suives rassemblent l'ensemble des différents champs à remplir sur chaque partie du formulaire.
Il y est précisé pour chaque champ :
* Son label
* Son id
* Le type de donnée correspondant
* S'il est obligatoire ou non
* La clé correspondante à sa valeur dans le futur JSON.

### 2. Informations de l'hébergement

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