/*
  Ce fichier configure Webpack, un outil de "module bundling" qui optimise, transforme et regroupe les fichiers JavaScript,
  CSS et autres ressources pour une application web. Webpack permet :
  - De définir un point d'entrée (`entry`) où commence la compilation.
  - De spécifier un fichier de sortie (`output`) où sera généré le code optimisé.
  - D'utiliser des "loaders" (`module.rules`) pour transformer le code (ex: convertir ES6+ en ES5 avec Babel).
  - D'ajouter des "plugins" (`plugins`) pour gérer des tâches comme l'injection de variables d'environnement.
  - De configurer un serveur de développement local (`devServer`) pour tester l'application.

  Ce fichier est écrit en JavaScript, ce qui permet d'ajouter une logique dynamique dans la configuration.
*/

// Importation des modules Node.js et Webpack
const path = require("path"); // Module Node.js pour manipuler les chemins de fichiers
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Plugin pour générer un fichier HTML automatiquement
const CopyWebpackPlugin = require("copy-webpack-plugin"); // Plugin pour copier des fichiers statiques dans le dossier de sortie
const webpack = require("webpack"); // Webpack lui-même
require("dotenv").config({ path: ".env.local" }); // Charge les variables d'environnement depuis le fichier .env.local

// Exportation de la configuration Webpack
module.exports = {
  mode: "production", // Définition du mode Webpack : "development" (debug) ou "production" (optimisé pour la mise en ligne)

  entry: "./src/index.js", // Définit le fichier principal qui servira de point d'entrée pour Webpack

  output: {
    filename: "bundle.js", // Nom du fichier de sortie contenant tout le code JavaScript transformé
    path: path.resolve(__dirname, "dist"), // Emplacement du fichier de sortie (le dossier "dist")
    publicPath: "/", // Chemin de base pour charger les fichiers (utile pour les applications avec du routage)
  },

  cache: {
    type: "filesystem", // Utilise un cache sur le disque pour accélérer les builds successifs
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/, // Applique cette règle aux fichiers `.js` et `.jsx`
        exclude: /node_modules/, // Exclut les fichiers du dossier `node_modules` (non transformés par Babel)
        use: {
          loader: "babel-loader", // Utilise Babel pour convertir le code JavaScript ES6+ en version compatible avec les navigateurs
        },
      },
    ],
  },

  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"), // Remplace le module `path` de Node.js par une version compatible navigateur
      "os": require.resolve("os-browserify/browser"), // Fait de même pour le module `os`
      "crypto": require.resolve("crypto-browserify"), // Remplace `crypto`
      "stream": require.resolve("stream-browserify"), // Remplace `stream`
      "vm": require.resolve("vm-browserify"), // Remplace `vm`
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Utilise ce fichier comme base pour générer le fichier HTML final
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public", // Dossier source contenant les fichiers statiques
          to: ".", // Copie ces fichiers à la racine du dossier de sortie
          globOptions: {
            ignore: [
              "**/index.html", // Ignore le fichier index.html (géré par HtmlWebpackPlugin)
              "**/*.mp4", "**/*.jpg", "**/*.png", "**/*.jpeg", "**/*.mp3", // Ignore les fichiers multimédia
            ],
          },
        },
      ],
    }),

    new webpack.ProvidePlugin({
      process: "process/browser", // Ajoute automatiquement `process` dans le navigateur (utile pour certaines librairies)
    }),

    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env), // Injecte les variables d'environnement dans le code de l'application
    }),
  ],

  devServer: {
    static: { directory: path.resolve(__dirname, "public") }, // Sert les fichiers statiques depuis "public"
    port: 3000, // Définit le port du serveur de développement (http://localhost:3000)
    historyApiFallback: true, // Permet aux applications SPA d'afficher correctement leurs pages avec le routage
    watchFiles: ["src/**/*", "public/**/*"], // Surveille les fichiers pour un rechargement automatique en cas de modification
  },

  watchOptions: {
    poll: 1000, // Vérifie les modifications toutes les 1000ms (1 seconde)
  },
};
