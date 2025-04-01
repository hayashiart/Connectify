// src/components/Profile/Profile.js
// Ce fichier contient le composant Profile, qui affiche la page principale du profil.
// Il inclut une bannière, des boutons de navigation, et plusieurs composants (mur, galerie, GIFs, musique).

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer le composant et gérer l’état de l’utilisateur.
 */
import React, { useState, useEffect } from "react"; // Importe React pour créer le composant, useState pour les états, useEffect pour les actions au chargement
import Footer from "../Shared/Footer"; // Importe le composant Footer pour le pied de page
import { ProfileContainer, ContentContainer } from "./ProfileStyles"; // Importe les styles définis dans ProfileStyles.js
import ProfileBannerComponent from "../Shared/ProfileBannerComponent"; // Importe le composant ProfileBannerComponent pour la bannière
import ProfileButtonBlock from "../Shared/ProfileButtonBlock"; // Importe le composant ProfileButtonBlock pour les boutons de navigation
import MessageWallComponent from "../Shared/MessageWallComponent"; // Importe le composant MessageWallComponent pour le mur de messages
import GalleryComponent from "../Shared/GalleryComponent"; // Importe le composant GalleryComponent pour la galerie
import GifComponent from "../Shared/GifComponent"; // Importe le composant GifComponent pour les GIFs
import MusicComponent from "../Shared/MusicComponent"; // Importe le composant MusicComponent pour les musiques
import { auth } from "../../firebase"; // Importe l’objet d’authentification Firebase

/*
 * PARTIE 2 : LOGIQUE DU COMPOSANT PROFILE
 * Cette partie définit la logique pour vérifier l’état de connexion et afficher la page.
 */
const Profile = ({ isLoggedIn, onLogout }) => { // Crée une fonction "Profile" avec des props "isLoggedIn" et "onLogout"
  const [user, setUser] = useState(null); // Crée une variable "user" (null au départ) et "setUser" pour stocker l’utilisateur connecté

  /*
   * Description de la fonction useEffect (ici utilisée anonymement) :
   * Cette fonction s’exécute au chargement pour vérifier l’état de connexion de l’utilisateur.
   * Elle met à jour "user" avec les données de l’utilisateur actuel ou null si déconnecté.
   * Arguments :
   * - Aucun argument explicite, tableau de dépendances vide pour exécution unique.
   * Retour :
   * - Retourne une fonction pour arrêter l’écouteur quand le composant est démonté.
   */
  useEffect(() => { // Crée un effet avec useEffect pour exécuter du code au chargement
    const unsubscribe = auth.onAuthStateChanged((currentUser) => { // Écoute les changements de connexion avec auth, "currentUser" est l’utilisateur actuel
      setUser(currentUser); // Met à jour "user" avec l’utilisateur connecté ou null
    });
    return () => unsubscribe(); // Retourne une fonction qui arrête l’écouteur quand le composant est démonté
  }, []); // Tableau vide signifie que l’effet ne s’exécute qu’une fois au chargement

  /*
   * PARTIE 3 : RENDU JSX DU COMPOSANT
   * Cette partie affiche la page principale du profil avec tous ses composants.
   */
  return (
    <ProfileContainer> {/* Conteneur principal de la page */}
      <ProfileBannerComponent /> {/* Affiche la bannière de profil */}
      <ProfileButtonBlock /> {/* Affiche les boutons de navigation */}
      <ContentContainer> {/* Zone dédiée au contenu principal */}
        <MessageWallComponent /> {/* Affiche le mur de messages */}
        <GalleryComponent /> {/* Affiche la galerie */}
        <GifComponent /> {/* Affiche les GIFs */}
        <MusicComponent /> {/* Affiche les musiques */}
      </ContentContainer>
      <Footer top={{ base: "470vh", phone: "auto", tablet: "400vh" }} /> {/* Pied de page avec position ajustée */}
    </ProfileContainer>
  );
};

/*
 * PARTIE 4 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default Profile; // Exporte la fonction "Profile" pour qu’elle soit réutilisable ailleurs