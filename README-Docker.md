# Lancement avec Docker

## Prérequis

- Docker Desktop
- Docker Compose (inclus avec Docker Desktop)

## Démarrer le projet

Depuis la racine du projet :

```bash
docker compose up --build -d
```

Le formulaire est ensuite disponible à l'adresse :

```text
http://localhost:8080
```

## Arrêter le projet

```bash
docker compose down
```

## Afficher les logs

```bash
docker compose logs -f app
```

## Reconstruire l'image

Après une modification des fichiers :

```bash
docker compose up --build -d
```

## Utiliser un autre port

Le port par défaut est `8080`. Pour utiliser le port `8081` :

```bash
APP_PORT=8081 docker compose up --build -d
```

Le site sera alors disponible sur `http://localhost:8081`.

## API Classloc

Le fichier `classloc-form-snippet.js` envoie actuellement le formulaire vers :

```text
https://www.classloc.fr/api/v1/create_outsider_demand
```

Docker ne modifie pas cette URL. Le navigateur doit donc être autorisé par la configuration CORS de l'API Classloc lorsqu'il charge le formulaire depuis `localhost`.
