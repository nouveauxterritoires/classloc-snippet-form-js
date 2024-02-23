### 2 - Informations de l'hébergement

| Label | Id | **Type** | **Obligatoire** | **Json** |
| --- | --- | --- | --- | --- |
| Nom | #nom-heberfement | `string` | NON | `data>accommodation>name` |
| Adresse | #adresse-hebergement | `string` | OUI | `data>accommodation>address` |
| Complément d'adresse | #complement-ad-hebergement | `string` | NON | `data>accommodation>additionnalAddress` |
| Code Postal | #code-postal-hebergement | `string` | OUI | `data>accommodation>codePostal` |
| Nom de la commune | #siret-hebergeur | `string` | OUI | `data>accommodation>city` |
| Téléphone | #tel-hebergement | `string` | NON | `data>accommodation>phone` |
| Étage | #etage-hebergement | `int` | OUI | `data>accommodation>floor` |
| Type de logement du meublé | #type-hebergement | `string` | OUI | `data>accommodation>subtype` |
| Capacité classée demandée | #capacite-hebergement | `int` | OUI | `data>accommodation>nbPersonsClasse`  <br>&&  <br>`data>request>capClassee` |
| Nombre de pièces composant le meublé | #nbpieces-hebergement | `int` | NON | `data>accommodation>nbPiecesTo`  <br>&&  <br>`data>request>nbPiecesSupp`  <br>(La valeur de ce champ - 1) |
| Nombre de chambre(s)/cabine(s) | #nbchambre-hebergement | `int` | NON | `data>accommodation>nbCabine` |
| Classement actuel | #classement-hebergement | `string` | OUI | `data>accommodation>currentRanking` |
| Éligibilité demandée | #eligibilite-demandee | `int` | OUI | `data>request>eligDemandee` |
| Surface totale | #surface-hebergement | `float` | NON | `data>accommodation>surface` |
| Surface hors salle de bain et WC | #surface-ss-sdb-hebergement | `float` | NON | `data>accommodation>surfaceHsdb` |