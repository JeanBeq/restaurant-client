# Projet de Gestion de Restaurants

## Introduction

Ce projet est une application de gestion de restaurants développée avec Nuxt.js. Il permet aux utilisateurs de s'inscrire, se connecter, parcourir les restaurants, ajouter des plats au panier et passer des commandes. Les administrateurs peuvent gérer les restaurants et les utilisateurs.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/) ou [bun](https://bun.sh/)

## Récupération du Projet

Pour récupérer le projet, clonez le dépôt GitHub :

```bash
git clone <URL_DU_DEPOT_GITHUB>
cd <NOM_DU_REPERTOIRE_CLONE>
```

## Installation des Dépendances

Installez les dépendances nécessaires avec l'un des gestionnaires de paquets suivants :

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Configuration

Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement nécessaires. Par exemple :

```env
API_URL=http://localhost:8081/api
```

## Lancement du Serveur de Développement

Démarrez le serveur de développement sur `http://localhost:3000` :

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Construction pour la Production

Construisez l'application pour la production :

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Prévisualisez localement la build de production :

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Utilisation de l'Application

1. **Inscription et Connexion :** Les utilisateurs peuvent s'inscrire et se connecter via les pages `/register` et `/login`.
2. **Parcourir les Restaurants :** Les utilisateurs peuvent parcourir la liste des restaurants sur la page d'accueil.
3. **Ajouter des Plats au Panier :** Les utilisateurs peuvent ajouter des plats au panier depuis la page de détail d'un restaurant.
4. **Passer des Commandes :** Les utilisateurs peuvent confirmer leur commande depuis la page `/cart`.
5. **Gestion des Restaurants (Admin) :** Les administrateurs peuvent ajouter, supprimer et gérer les restaurants via la page `/admin`.

## Remarques

- Assurez-vous que l'API backend est en cours d'exécution et accessible à l'URL spécifiée dans le fichier `.env`.
- Les utilisateurs doivent avoir les rôles appropriés pour accéder à certaines fonctionnalités (par exemple, `ADMIN` pour accéder à la page d'administration).

Merci de votre attention et bonne correction !