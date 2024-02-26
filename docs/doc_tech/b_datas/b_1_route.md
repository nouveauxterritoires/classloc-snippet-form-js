# Formulaire de demande en ligne Classloc SNIPPET : Documentation technique

## B - Envoi des données du formulaire

### 1. Route, format et condition

Une fois le formulaire, l'utilisateur va envoyer le tout en cliquant sur le bouton "**Vlalider la demande**".
Au clique, les données entrées dans le formulaire seront envoyées à l'application Classloc :
* Via la route `/api/v1/create_outsider_demand`
* Avec la méthode `POST`
* Au format `JSON` (`'Content-Type': 'application/json'`)

Lorsque l'application Classloc sera appelée, celle-ci va vérifier la clé API entrée lors de l'installation du formulaire (cf. [Installation](../../install.md)).
Si la clé API n'est pas correct, une erreur s'affichera en bas du formulaire et l'application Classloc ne recevra pas les données.