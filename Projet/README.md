# Services web - Projet

---
### Composition du groupe

- **Evans Paul : paul.evans@etu.univ-nantes.fr**
- **Sallou Theo : theo.sallou@etu.univ-nantes.fr**

---

## Exécution

### A l'aide de docker (docker-compose)

Pour lancer l'application (API & Client) de manière simplifiée, un fichier `dockjer-compose.yaml` est présent à la racine du dossier.
Ce fichier utilise deux fichiers `Dockerfile` : Un pour l'API et un pour le client, respectivement `/API/Dockerfile` et `/Client/Dockerfile`, accompagnés chacun d'un fichier `.dockerignore` pour éviter l'import de fichiers inutles à l'exécution des deux parties.

A exécuter à la racine du projet (au niveau du fichier `docker-compose.yaml`)
```
docker-compose up
```

L'API est accessible à l'adresse *[localhost:3000](http://www.localhost:3000)*  
Le site est accessible à l'adresse *[localhost:8080](http://www.localhost:8080)* (Note : le client est distribué sur un serveur nginx)

### Manuellement

Chaque partie reste également exécutable à la main :  

Dans le dossier `/API` :
```
npm run start
```

Dans le dossier `/Client` :
```
npm run start
```
---

## Synthèse

### Structure générale

La structuration initiale du projet n'a pas été modifiée, et le projet est séparé en deux parties :
- L'API (`/API`), développé à l'aide du framework ExpressJS, destiné à gérer les interactions avec la base de données
- Le client (`/Client`), développé en Angular 11, destiné à gérer les interactions entre l'utilisateur et l'API

### Modification effectuées

L'intégralité des fonctionnalités on été implémentées, et les modèles de données n'ont nullement été modifiés.
Quelques fonctionnalités ont été ajoutées afin de faciliter le fonctionnement général de l'application :
- Création d'une route `/copies/:copyId/book`, pour récupérer le livre à l'origine d'une copie (utilisé pour afficher les informations d'un livre dans la liste des emprunts).
- Ajout de la gestion des utilisateurs :
  - Dans l'API -> CRUD
  - Dans le client -> page `/users`

### Notes suplémentaires

Un fichier insomnia est disponnible dans le dossier `/API` afin de faciliter l'énumération et le test des différentes routes que propose l'API : `/API/insomnia_API.json` à importer directement dans insomnia.

