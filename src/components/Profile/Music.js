// src/components/Profile/Music.js
// Ce fichier contient le composant Music, qui affiche une page de musique dans le profil.
// Il inclut une bannière, des boutons de navigation, et un composant de musique.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer et styliser le composant.
 */
import React from "react"; // Importe React pour créer le composant JSX
import styled from "styled-components"; // Importe styled-components pour écrire du CSS dans JavaScript
import Footer from "../Shared/Footer"; // Importe le composant Footer pour le pied de page
import ProfileBannerComponent from "../Shared/ProfileBannerComponent"; // Importe le composant ProfileBannerComponent pour la bannière
import ProfileButtonBlock from "../Shared/ProfileButtonBlock"; // Importe le composant ProfileButtonBlock pour les boutons de navigation
import MusicComponent from "../Shared/MusicComponent"; // Importe le composant MusicComponent pour afficher les musiques

/*
 * PARTIE 2 : STYLES DU COMPOSANT MUSIC
 * Cette partie définit les styles pour le conteneur, le contenu principal, et la zone de musique.
 */
const MusicContainer = styled.div` // Crée un style nommé "MusicContainer" pour une balise <div>
  position: relative; // Permet de positionner les enfants par rapport à ce conteneur
  min-height: 100vh; // Assure une hauteur minimale de 100% de l’écran
  width: 100%; // Prend toute la largeur disponible
  margin: 0; // Supprime les marges par défaut
  padding: 0; // Supprime les padding par défaut
  display: flex; // Utilise Flexbox pour organiser les éléments
  flex-direction: column; // Place les éléments les uns sous les autres
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    min-height: auto; // Laisse la hauteur s’ajuster au contenu
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    min-height: 90vh; // Réduit la hauteur minimale à 90% de l’écran
  }
`;

const MainContent = styled.div` // Crée un style nommé "MainContent" pour une balise <div>
  display: flex; // Utilise Flexbox pour organiser les boutons et la musique côte à côte
  flex-grow: 1; // Permet au contenu principal de prendre tout l’espace disponible
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    flex-direction: column; // Place les éléments les uns sous les autres
  }
`;

const MusicContent = styled.div` // Crée un style nommé "MusicContent" pour une balise <div>
  width: 70%; // Définit la largeur à 70% du conteneur parent
  padding: 1rem; // Ajoute 1rem (16px) d’espace intérieur
  display: flex; // Utilise Flexbox pour organiser les éléments
  flex-direction: column; // Place les éléments les uns sous les autres
  align-items: center; // Centre les éléments horizontalement
  margin-top: 50vh; // Ajoute une marge en haut de 50% de l’écran pour décaler sous la bannière
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 100%; // Prend toute la largeur disponible
    margin-top: 30vh; // Réduit la marge en haut à 30% de l’écran
    padding: 0.5rem; // Réduit l’espace intérieur à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 80%; // Ajuste la largeur à 80%
    margin-top: 40vh; // Ajuste la marge en haut à 40% de l’écran
  }
`;

/*
 * PARTIE 3 : LOGIQUE DU COMPOSANT MUSIC
 * Cette partie définit comment le composant affiche la page de musique dans le profil.
 */
/*
 * Description de la fonction Music :
 * Cette fonction est le composant principal qui affiche une page de musique dans le profil.
 * Elle inclut une bannière, des boutons de navigation, et un composant de musique.
 * Arguments :
 * - isLoggedIn : un booléen indiquant si l’utilisateur est connecté (optionnel).
 * - onLogout : une fonction à appeler pour déconnecter l’utilisateur (optionnel).
 * Retour :
 * - Retourne le JSX qui affiche la page avec la bannière, les boutons, la musique, et le footer.
 */
const Music = ({ isLoggedIn, onLogout }) => { // Crée une fonction "Music" avec des props "isLoggedIn" et "onLogout"
  /*
   * PARTIE 3.1 : RENDU JSX DU COMPOSANT
   * Cette sous-partie affiche la page avec ses différentes sections.
   */
  return (
    <MusicContainer> {/* Conteneur principal de la page */}
      <ProfileBannerComponent /> {/* Affiche la bannière de profil */}
      <MainContent> {/* Conteneur pour les boutons et la musique */}
        <ProfileButtonBlock /> {/* Affiche les boutons de navigation */}
        <MusicContent> {/* Zone dédiée à la musique */}
          <MusicComponent /> {/* Affiche le composant de musique */}
        </MusicContent>
      </MainContent>
      <Footer top={{ base: "150vh", phone: "auto", tablet: "130vh" }} /> {/* Pied de page avec position ajustée */}
    </MusicContainer>
  );
};

/*
 * PARTIE 4 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default Music; // Exporte la fonction "Music" pour qu’elle soit réutilisable ailleurs