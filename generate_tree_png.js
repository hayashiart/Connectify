const { createCanvas } = require('canvas');
const fs = require('fs');

// Arborescence textuelle
const tree = `
connectify/
├── .dockerignore
│   # Liste les fichiers/dossiers à exclure lors de la création d'une image Docker (ex. node_modules, .env, logs).
├── .firebaserc
│   # Configure le projet Firebase par défaut (ici, "siteconnectify") pour le déploiement avec Firebase CLI.
├── .gitignore
│   # Spécifie les fichiers/dossiers à ignorer par Git (ex. node_modules, .env.local, dist, logs).
├── .babelrc
│   # Configure Babel pour transpiler le code ES6+/JSX avec les presets @babel/preset-env et @babel/preset-react.
├── .prettierrc
│   # Configure Prettier pour le formatage du code (guillemets simples, point-virgule).
├── eslint.config.mjs
│   # Configure ESLint pour l'analyse statique du code JavaScript/JSX, avec des règles pour React et l'environnement navigateur.
├── firebase.json
│   # Configure Firebase Hosting pour déployer le dossier dist, avec des règles de réécriture pour une application SPA.
├── jest.config.js
│   # Configure Jest pour les tests unitaires, utilisant jsdom pour simuler un environnement de navigateur.
├── jest.setup.js
│   # Ajoute des assertions DOM (@testing-library/jest-dom) pour les tests Jest.
├── package.json
│   # Liste les dépendances (React, Firebase, styled-components) et scripts (build, start, test, lint, format).
├── package-lock.json
│   # Verrouille les versions des dépendances pour une installation cohérente.
├── serve.json
│   # Configure les redirections pour tester localement le build avec le serveur \`serve\`, adapté aux SPA.
├── webpack.config.js
│   # Configure Webpack pour bundler l'application, avec babel-loader, plugins (HtmlWebpackPlugin, CopyWebpackPlugin), et devServer.
├── Dockerfile
│   # Définit une image Docker basée sur node:18-alpine pour exécuter l'application (installe dépendances, expose port 3000).
├── public/
│   ├── index.html
│   │   # Fichier HTML principal, servant de modèle pour l'application React (inclus dans le build par HtmlWebpackPlugin).
│   ├── Connectify/
│   │   ├── PageInscription/
│   │   │   ├── fd_inscription.jpg
│   │   │   # Image utilisée dans la page d'inscription (Inscription.js).
│   │   ├── PageContact/
│   │   │   ├── fd_contact.jpg
│   │   │   # Image utilisée dans la page de contact (Home.js, Contact.js).
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Auth.js
│   │   │   # Composant pour la page de connexion, gère l'authentification via Firebase Auth (email/mot de passe).
│   │   ├── Contact/
│   │   │   ├── Contact.js
│   │   │   # Composant pour la page de contact, avec formulaire pour envoyer des messages à Firestore.
│   │   ├── Home/
│   │   │   ├── Home.js
│   │   │   # Composant pour la page d'accueil, affiche des sections statiques et un formulaire de newsletter (Firestore).
│   │   ├── Inscription/
│   │   │   ├── Inscription.js
│   │   │   # Composant pour la page d'inscription, crée un utilisateur dans Firebase Auth et enregistre les données dans Firestore.
│   │   ├── Profile/
│   │   │   ├── Gallery.js
│   │   │   # Composant pour la page de la galerie, affiche une bannière et GalleryComponent.
│   │   │   ├── Music.js
│   │   │   # Composant pour la page de musique, affiche une bannière et MusicComponent.
│   │   │   ├── Profile.js
│   │   │   # Composant principal du profil, regroupe toutes les sections (mur, galerie, GIFs, musique).
│   │   │   ├── Video.js
│   │   │   # Composant pour la page de vidéos, affiche une bannière et GifComponent (substitut pour vidéos).
│   │   │   ├── Walls.js
│   │   │   # Composant pour la page du mur de messages, affiche une bannière et MessageWallComponent.
│   │   ├── Shared/
│   │   │   ├── Footer.js
│   │   │   # Composant pour le pied de page, affiché sur toutes les pages avec position ajustable.
│   │   │   ├── FormContainer.js
│   │   │   # Composant conteneur pour les formulaires, transformé en <form> avec styles responsives.
│   │   │   ├── FormField.js
│   │   │   # Composant pour les champs de formulaire (input, textarea, bouton) avec validation intégrée.
│   │   │   ├── GalleryComponent.js
│   │   │   # Composant pour afficher et gérer une galerie d'images (ajout/suppression) dans la Realtime Database.
│   │   │   ├── GifComponent.js
│   │   │   # Composant pour afficher et ajouter des GIFs (stockés en base64 dans la Realtime Database).
│   │   │   ├── Header.js
│   │   │   # Composant pour la barre de navigation, avec menu burger et options dynamiques selon l'état de connexion.
│   │   │   ├── ImageBlockSection.js
│   │   │   # Composant pour structurer une section avec une image à gauche et du contenu à droite.
│   │   │   ├── MessageWallComponent.js
│   │   │   # Composant pour le mur de messages, gère l'envoi/affichage de messages texte/images (Realtime Database).
│   │   │   ├── MusicComponent.js
│   │   │   # Composant pour afficher et ajouter des fichiers MP3 (stockés en base64 dans la Realtime Database).
│   │   │   ├── ProfileBannerComponent.js
│   │   │   # Composant pour la bannière de profil, affiche le nom/prénom de l'utilisateur depuis Firestore.
│   │   │   ├── ProfileButtonBlock.js
│   │   │   # Composant pour les boutons de navigation du profil (All, Walls, Gallery, Video, Music).
│   │   │   ├── Theme.js
│   │   │   # Définit les couleurs (jaune, vert foncé) et polices (Chicle, Inter) utilisées globalement.
│   │   │   ├── Title.js
│   │   │   # Composant pour afficher des titres stylisés avec police et taille personnalisables.
│   │   │   ├── Validation.js
│   │   │   # Fournit des règles de validation côté client pour email, mot de passe, texte, et messages.
│   ├── App.js
│   │   # Composant principal, gère le routage des pages et l'état de connexion via Firebase Auth.
│   ├── firebase.js
│   │   # Initialise Firebase (Auth, Firestore, Realtime Database, Storage, Analytics) avec les variables d'environnement.
│   ├── index.js
│   │   # Point d'entrée de l'application, rend App.js dans le DOM avec BrowserRouter pour le routage.
`;

// Configurer le canvas
const canvasWidth = 1400; // Largeur augmentée pour les commentaires longs
const canvasHeight = 2000; // Hauteur suffisante pour l'arborescence
const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');

// Style de l'image
ctx.fillStyle = '#ffffff'; // Fond blanc
ctx.fillRect(0, 0, canvasWidth, canvasHeight); // Remplir le fond
ctx.font = '16px Arial'; // Police lisible, taille augmentée pour clarté
ctx.fillStyle = '#000000'; // Texte noir

// Dessiner l'arborescence
const lines = tree.split('\n');
let y = 30; // Position initiale avec marge
const lineHeight = 24; // Hauteur par ligne pour espacement
const indentWidth = 24; // Largeur de l'indentation pour hiérarchie claire

lines.forEach(line => {
  const indentLevel = line.match(/^(│\s*│?\s*│?\s*)/)?.[0].length / 2 || 0; // Calculer le niveau d'indentation
  const x = indentLevel * indentWidth; // Position x basée sur l'indentation
  ctx.fillText(line, x, y); // Dessiner la ligne avec indentation
  y += lineHeight; // Passer à la ligne suivante
});

// Enregistrer l'image
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('project_structure.png', buffer);

console.log('Arborescence générée dans project_structure.png');