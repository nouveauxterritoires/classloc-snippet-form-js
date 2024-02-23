### 1 - Informations du demandeur :

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