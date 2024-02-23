### 1bis - Informations du propriétaire :

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