### 1bis - Informations du propriétaire :

Cette partie concerne les informations du propriétaire.  
Elle n'est remplissable que si l'utilisateur clique sur le bouton "+ Coordonnées du propriétaire s'il n'est pas le demandeur".

Si l'utilisateur ne clique pas sur ce bouton, tous les champs de cette partie sont considérées comme OPTIONNELS.

| Label | Id | **Type** | **Obligatoire** | **Json** |
| --- | --- | --- | --- | --- |
| Civilité | #civilite-hebergeur | `string` | OUI | `data>accommodation>owner>civility` |
| Raison Sociale | #raison-hebergeur | `string` | NON | `data>accommodation>owner>businessName` |
| Nom | #nom-hebergeur | `string` | NON | `data>accommodation>owner>lastname` |
| Prénom | #prenom-hebergeur | `string` | NON | `data>accommodation>owner>firstname` |
| Ajouter un SIRET/SIREN (optionnel) | #siret-hebergeur | `string` | NON | `data>accommodation>owner>siret` |
| Courriel principal | #email-hebergeur | `string` | OUI | `data>accommodation>owner>mail` |
| Tél principal | #tel-hebergeur | `string` | NON | `data>accommodation>owner>phone` |
| Adesse | #adresse-hebergeur | `string` | OUI | `data>accommodation>owner>address` |
| Complément d'adresse | #complement-ad-hebergeur | `string` | NON | `data>accommodation>owner>additionnalAddress` |
| Code postal | #code-postal-hebergeur | `string` | OUI | `data>accommodation>owner>postalCode` |
| Pays | #pays-hebergeur | `string` | OUI | `data>accommodation owner>country` |
| Nom de la commune | #commune-hebergeur | `string` | OUI | `data accommodation>owner>city` |