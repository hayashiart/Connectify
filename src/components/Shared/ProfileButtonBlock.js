// src/components/Shared/ProfileButtonBlock.js
// Ce fichier contient le composant ProfileButtonBlock, qui affiche une liste de boutons de navigation.
// Ces boutons redirigent vers différentes sections du profil (ex. Walls, Gallery).

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer et styliser le composant.
 */
import React from "react"; // Importe React pour créer le composant JSX
import { NavLink } from "react-router-dom"; // Importe NavLink pour créer des liens cliquables avec un état actif
import styled from "styled-components"; // Importe styled-components pour écrire du CSS dans JavaScript
import { theme } from "./Theme"; // Importe un fichier Theme.js avec des couleurs et polices définies

/*
 * PARTIE 2 : STYLES DU COMPOSANT PROFILE BUTTON BLOCK
 * Cette partie définit les styles pour le conteneur et les boutons de navigation.
 */
const ButtonContainer = styled.div` // Crée un style nommé "ButtonContainer" pour une balise <div>
  width: 30%; // Définit la largeur à 30% de l’espace disponible
  margin-top: 60vh; // Ajoute une marge en haut de 60% de l’écran pour positionner les boutons
  display: flex; // Utilise Flexbox pour organiser les boutons
  flex-direction: column; // Place les boutons les uns sous les autres
  align-items: flex-start; // Aligne les boutons à gauche
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 100%; // Prend toute la largeur disponible
    margin-top: 30vh; // Réduit la marge en haut à 30% de l’écran
    align-items: center; // Centre les boutons horizontalement
    padding: 0 1rem; // Ajoute 1rem (16px) d’espace à gauche et à droite
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 25%; // Réduit la largeur à 25%
    margin-top: 40vh; // Ajuste la marge en haut à 40% de l’écran
  }
`;

const ProfileButton = styled(NavLink)` // Crée un style nommé "ProfileButton" pour une balise <NavLink>
  background: ${({ isActive }) => (isActive ? "#c7b52e" : theme.colors.yellow)}; // Fond jaune foncé (#c7b52e) si actif, sinon jaune du thème
  color: ${theme.colors.white}; // Applique la couleur blanche pour le texte
  width: 80%; // Définit la largeur à 80% du conteneur
  padding: 1.5rem; // Ajoute 1.5rem (24px) d’espace intérieur
  text-align: center; // Centre le texte horizontalement
  text-decoration: none; // Enlève le soulignement pour un look propre
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 1.2rem; // Définit une taille de texte de 1.2 fois la taille de base (19.2px)
  border: none; // Enlève la bordure pour un look propre
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08); // Ajoute une ombre légère
  transition: box-shadow 0.3s ease; // Ajoute une transition fluide pour l’ombre au survol
  &:hover { // Style au survol de la souris
    background: #c7b52e; // Change le fond en jaune foncé
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08); // Augmente l’ombre pour un effet de surélévation
  }
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 90%; // Étend la largeur à 90%
    padding: 1rem; // Réduit l’espace intérieur à 1rem (16px)
    font-size: 1rem; // Réduit la taille à la taille de base (16px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 85%; // Ajuste la largeur à 85%
    padding: 1.2rem; // Ajuste l’espace intérieur à 1.2rem (19.2px)
    font-size: 1.1rem; // Ajuste la taille à 1.1 fois la taille de base (17.6px)
  }
`;

/*
 * PARTIE 3 : LOGIQUE DU COMPOSANT PROFILE BUTTON BLOCK
 * Cette partie définit comment le composant affiche une liste de boutons de navigation.
 */
/*
 * Description de la fonction ProfileButtonBlock :
 * Cette fonction est le composant principal qui affiche une colonne de boutons de navigation.
 * Chaque bouton redirige vers une section spécifique du profil.
 * Arguments :
 * - Aucun argument (composant statique).
 * Retour :
 * - Retourne le JSX qui affiche le conteneur avec les boutons de navigation.
 */
const ProfileButtonBlock = () => { // Crée une fonction "ProfileButtonBlock" qui est le composant principal
  /*
   * PARTIE 3.1 : RENDU JSX DU COMPOSANT
   * Cette sous-partie affiche une liste de boutons dans un conteneur.
   */
  return (
    <ButtonContainer> {/* Conteneur pour aligner les boutons verticalement */}
      <ProfileButton to="/profile" end>ALL</ProfileButton> {/* Lien vers "/profile", "end" pour correspondre exactement */}
      <ProfileButton to="/profile/walls">Walls</ProfileButton> {/* Lien vers "/profile/walls" */}
      <ProfileButton to="/profile/gallery">Gallery</ProfileButton> {/* Lien vers "/profile/gallery" */}
      <ProfileButton to="/profile/video">Video</ProfileButton> {/* Lien vers "/profile/video" */}
      <ProfileButton to="/profile/music">Music</ProfileButton> {/* Lien vers "/profile/music" */}
    </ButtonContainer>
  );
};

/*
 * PARTIE 4 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default ProfileButtonBlock; // Exporte la fonction "ProfileButtonBlock" pour qu’elle soit réutilisable ailleurs