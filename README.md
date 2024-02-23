# Formulaire en ligne Classloc SNIPPET

### Documentation :
#### - [Installation](docs/install.md)
#### - [Documentation technique](docs/doc_tech.md)

___

## Installation du formulaire

Pour installer le snippet, vous devez ajouter 2 choses à votre page web :

### Dans votre header

Dans votre balise ``<head></head>``, ajouter la ligne suivante :

```
<link href="https://cdn.jsdelivr.net/gh/nouveauxterritoires/classloc-snippet-form-js@add-data-to-send/css/style.css" rel="stylesheet">
```
Dans l'idéal, juste avant la balise de fermeture ``</head>``

### Dans votre footer

Juste avant votre balise ``</body>``, ajouter la ligne suivante :
```
<script src="https://cdn.jsdelivr.net/gh/nouveauxterritoires/classloc-snippet-form-js@add-data-to-send/classloc-form-snippet.js"></script>
```

### À l'endroit où vous souhaitez afficher votre formulaire

Pour afficher le formulaire, placez vous dans la balise de votre choix, et ajoutez une balise :
```
<div id='loader'></div>
<div id="classloc-form" data-cltoken="XXXXX"></div>
```
Remplacez simplement XXXXX par le token que vous trouverez dans votre espace d’administration ou qui vous aura été envoyé par le support ClassLoc.