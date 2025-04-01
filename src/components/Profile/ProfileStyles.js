// src/components/Profile/ProfileStyles.js
// Ce fichier contient les styles pour le composant Profile, définis avec styled-components.
// Ces styles sont utilisés pour la page principale du profil.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer des styles.
 */
import styled from "styled-components"; // Importe styled-components pour écrire du CSS dans JavaScript
import { theme } from "../Shared/Theme"; // Importe un fichier Theme.js avec des couleurs et polices définies

/*
 * PARTIE 2 : FILTRE DES PROPRIÉTÉS
 * Cette partie empêche certaines propriétés personnalisées d’être envoyées au DOM.
 */
const shouldForwardProp = (prop) => prop !== "top"; // Crée une fonction qui retourne vrai si "prop" n’est pas "top", pour éviter des erreurs

/*
 * PARTIE 3 : STYLE DU CONTENEUR PRINCIPAL
 * Cette partie stylise le conteneur global de la page de profil.
 */
export const ProfileContainer = styled.div.withConfig({ shouldForwardProp })` // Crée un style nommé "ProfileContainer" pour une balise <div>, avec le filtre des props
  position: relative; // Permet de positionner les enfants par rapport à ce conteneur
  min-height: 100vh; // Assure une hauteur minimale de 100% de l’écran
  width: 100%; // Prend toute la largeur disponible
  margin: 0; // Supprime les marges par défaut
  padding: 0; // Supprime les padding par défaut
  display: flex; // Utilise Flexbox pour organiser les éléments
  flex-wrap: wrap; // Permet aux éléments de passer à la ligne si nécessaire
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    flex-direction: column; // Place les éléments les uns sous les autres
    min-height: auto; // Laisse la hauteur s’ajuster au contenu
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    min-height: 90vh; // Réduit la hauteur minimale à 90% de l’écran
  }
`;

/*
 * PARTIE 4 : STYLE DU CONTENEUR DE CONTENU
 * Cette partie stylise la zone qui contient les composants comme le mur de messages ou la galerie.
 */
export const ContentContainer = styled.div.withConfig({ shouldForwardProp })` // Crée un style nommé "ContentContainer" pour une balise <div>, avec le filtre des props
  width: 70%; // Définit la largeur à 70% du conteneur parent
  margin-top: 50vh; // Ajoute une marge en haut de 50% de l’écran pour décaler sous la bannière
  padding: 1rem; // Ajoute 1rem (16px) d’espace intérieur
  display: flex; // Utilise Flexbox pour organiser les éléments
  flex-direction: column; // Place les éléments les uns sous les autres
  align-items: center; // Centre les éléments horizontalement
  margin-left: 30%; // Décale le conteneur de 30% à droite pour laisser place aux boutons
  position: absolute; // Positionne précisément par rapport au parent
  left: 0; // Aligne le bord gauche à l’extrême gauche
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 100%; // Prend toute la largeur disponible
    margin-top: 30vh; // Réduit la marge en haut à 30% de l’écran
    margin-left: 0; // Supprime le décalage à gauche
    position: relative; // Change à "relative" pour suivre le flux normal
    padding: 0.5rem; // Réduit l’espace intérieur à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 80%; // Ajuste la largeur à 80%
    margin-top: 40vh; // Ajuste la marge en haut à 40% de l’écran
    margin-left: 20%; // Réduit le décalage à gauche à 20%
  }
`;