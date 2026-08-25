# Formulaire de demande en ligne Classloc SNIPPET : Documentation technique

## A - Liste des champs du formulaire

Les sections qui suives rassemblent l'ensemble des différents champs à remplir sur chaque partie du formulaire.
Il y est précisé pour chaque champ :
* Son label
* Son id
* Le type de donnée correspondant
* S'il est obligatoire ou non
* La clé correspondante à sa valeur dans le futur JSON.

### 3. Informations complémentaires

Il n'y a qu'un seul champ dans cette partie.<br>
L'utilisateur peut écrire des informations complémentaires comme par exemple un jour et une heure de rendez-vous.

| Label           | Id       | **Type** | **Obligatoire** | **Json**                   |
|-----------------|----------|----------|-----------------|----------------------------|
| **Commentaire** | #comment | `text`   |  **&cross;**    | `data > request > comment` |

Cette information sera enregistrée sous forme de commentaire qui sera accessible au responsable de la futur demande dans l'application Classloc.