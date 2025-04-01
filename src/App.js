// src/components/App.js
// Ce fichier contient le composant App, qui est le point d’entrée principal de l’application.
// Il gère le routage, l’état de connexion de l’utilisateur, et rend les composants selon les routes.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer le composant, gérer les routes, et l’authentification.
 */
import React, { useState, useEffect } from "react"; // Importe React pour créer le composant, useState pour les états, useEffect pour les actions au chargement
import { Route, Routes } from "react-router-dom"; // Importe Route et Routes pour gérer le routage dans l’application
import { auth } from "./firebase"; // Importe l’objet d’authentification Firebase depuis firebase.js
import { onAuthStateChanged } from "firebase/auth"; // Importe la fonction pour écouter les changements d’état de connexion
import Header from "./components/Shared/Header"; // Importe le composant Header pour la barre de navigation
import Home from "./components/Home/Home"; // Importe le composant Home pour la page d’accueil
import Inscription from "./components/Inscription/Inscription"; // Importe le composant Inscription pour la page d’inscription
import Auth from "./components/Auth/Auth"; // Importe le composant Auth pour la page de connexion
import Profile from "./components/Profile/Profile"; // Importe le composant Profile pour la page de profil principale
import Walls from "./components/Profile/Walls"; // Importe le composant Walls pour la section "Walls" du profil
import Gallery from "./components/Profile/Gallery"; // Importe le composant Gallery pour la section "Gallery" du profil
import Video from "./components/Profile/Video"; // Importe le composant Video pour la section "Video" du profil
import Music from "./components/Profile/Music"; // Importe le composant Music pour la section "Music" du profil
import Contact from "./components/Contact/Contact"; // Importe le composant Contact pour la page de contact

/*
 * PARTIE 2 : LOGIQUE DU COMPOSANT APP
 * Cette partie définit la logique pour gérer l’état de connexion et le routage de l’application.
 */
const App = () => { // Crée une fonction "App" qui est le composant principal
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Crée une variable "isLoggedIn" (null au départ) et "setIsLoggedIn" pour suivre l’état de connexion

  /*
   * Description de la fonction useEffect (ici utilisée anonymement) :
   * Cette fonction s’exécute au chargement pour écouter les changements d’état de connexion via Firebase.
   * Elle met à jour "isLoggedIn" avec true ou false selon la présence d’un utilisateur connecté.
   * Arguments :
   * - Aucun argument explicite, tableau de dépendances vide pour exécution unique.
   * Retour :
   * - Retourne une fonction pour arrêter l’écouteur quand le composant est démonté.
   */
  useEffect(() => { // Crée un effet avec useEffect pour exécuter du code au chargement
    const unsubscribe = onAuthStateChanged(auth, (user) => { // Écoute les changements d’état de connexion avec auth, "user" est l’utilisateur actuel
      setIsLoggedIn(!!user); // Met à jour "isLoggedIn" : true si "user" existe, false sinon (opérateur !! convertit en booléen)
      console.log("État de connexion mis à jour :", !!user); // Affiche l’état dans la console pour débogage
    });
    return () => unsubscribe(); // Retourne une fonction qui arrête l’écouteur quand le composant est démonté
  }, []); // Tableau vide signifie que l’effet ne s’exécute qu’une fois au chargement

  /*
   * Description de la fonction handleLogout :
   * Cette fonction gère la déconnexion de l’utilisateur via Firebase Auth.
   * Elle appelle la méthode signOut et affiche un message de succès ou d’erreur dans la console.
   * Arguments :
   * - Aucun argument explicite.
   * Retour :
   * - Ne retourne rien, mais effectue la déconnexion et met à jour l’état via Firebase.
   */
  const handleLogout = () => { // Crée une fonction "handleLogout" pour déconnecter l’utilisateur
    auth.signOut() // Appelle la méthode signOut de Firebase pour déconnecter l’utilisateur
      .then(() => console.log("Utilisateur déconnecté avec succès")) // Si succès, affiche un message dans la console
      .catch((error) => console.error("Erreur lors de la déconnexion :", error)); // Si erreur, affiche l’erreur dans la console
  };

  /*
   * PARTIE 3 : RENDU JSX DU COMPOSANT
   * Cette partie affiche l’application avec un en-tête et les routes définies.
   */
  if (isLoggedIn === null) { // Vérifie si l’état de connexion est encore en cours de chargement
    return <div>Chargement...</div>; // Affiche un message temporaire pendant le chargement
  }

  return (
    <> {/* Fragments vides <> pour regrouper les éléments sans balise supplémentaire */}
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} /> {/* Affiche la barre de navigation avec l’état de connexion et la fonction de déconnexion */}
      <Routes> {/* Conteneur pour définir les routes de l’application */}
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} onLogout={handleLogout} />} /> {/* Route pour la page d’accueil */}
        <Route path="/inscription" element={<Inscription />} /> {/* Route pour la page d’inscription */}
        <Route path="/auth" element={<Auth />} /> {/* Route pour la page de connexion */}
        <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} onLogout={handleLogout} />} /> {/* Route pour la page de profil */}
        <Route path="/profile/walls" element={<Walls isLoggedIn={isLoggedIn} onLogout={handleLogout} />} /> {/* Route pour la section "Walls" */}
        <Route path="/profile/gallery" element={<Gallery isLoggedIn={isLoggedIn} onLogout={handleLogout} />} /> {/* Route pour la section "Gallery" */}
        <Route path="/profile/video" element={<Video isLoggedIn={isLoggedIn} onLogout={handleLogout} />} /> {/* Route pour la section "Video" */}
        <Route path="/profile/music" element={<Music isLoggedIn={isLoggedIn} onLogout={handleLogout} />} /> {/* Route pour la section "Music" */}
        <Route path="/contact" element={<Contact />} /> {/* Route pour la page de contact */}
      </Routes>
    </>
  );
};

/*
 * PARTIE 4 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default App; // Exporte la fonction "App" pour qu’elle soit utilisée comme point d’entrée principal