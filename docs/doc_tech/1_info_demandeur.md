### 1 - Informations du demandeur :

| Label | Id | **Type** | **Obligatoire** | **Json** |
| --- | --- | --- | --- | --- |
| Civilité | #civilite | `select/string` | OUI | `data>accommodation>applicant>civility` |
| Raison Sociale | #raison | `string` | NON | `data>accommodation>applicant>businessName` |
| Nom | #nom | `string` | NON | `data>accommodation>applicant>lastname` |
| Prénom | #prenom | `string` | NON | `data>accommodation>applicant>firstname` |
| Ajouter un SIRET/SIREN (optionnel) | #siret | `string` | NON | `data>accommodation>applicant>siret` |
| Courriel principal | #email | `string` | OUI | `data>accommodation>applicant>mail` |
| Tél principal | #tel | `string` | NON | `data>accommodation>applicant>phone` |
| Adesse | #adresse | `string` | OUI | `data>accommodation>applicant>address` |
| Complément d'adresse | #complement-ad | `string` | NON | `data>accommodation>applicant>additionnalAddress` |
| Code postal | #code-postal | `string` | OUI | `data>accommodation>applicant>postalCode` |
| Pays | #pays | `select/string` | OUI | `data>accommodation>applicant>country` |
| Nom de la commune | #commune | `string` | OUI | `data>accommodation>applicant>city` |