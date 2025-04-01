// src/index.js
// Ce fichier est le point d’entrée de l’application React.
// Il configure le routage et rend le composant App dans le DOM.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour initialiser React et le routage.
 */
import React from 'react'; // Importe React pour créer des composants
import ReactDOM from 'react-dom/client'; // Importe ReactDOM pour rendre les composants dans le DOM
import { BrowserRouter } from 'react-router-dom'; // Importe BrowserRouter pour gérer le routage basé sur l’historique du navigateur
import App from './App'; // Importe le composant App comme point d’entrée principal (chemin relatif correct)

/*
 * PARTIE 2 : INITIALISATION ET RENDU
 * Cette partie crée la racine de rendu et affiche l’application avec le routage.
 */
const root = ReactDOM.createRoot(document.getElementById('root')); // Crée une racine de rendu attachée à l’élément HTML avec l’ID "root"
root.render( // Rend le contenu dans la racine
  <BrowserRouter> {/* Encapsule l’application dans BrowserRouter pour activer le routage */}
    <App /> {/* Affiche le composant App */}
  </BrowserRouter>
);