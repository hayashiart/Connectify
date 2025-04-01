// src/components/Shared/Footer.js
// Ce fichier contient le composant Footer, qui affiche un pied de page avec un texte de copyright.
// Il stylise ce pied de page et ajuste sa position selon l’écran.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer et styliser le composant.
 */
import React from 'react'; // Importe React pour créer le composant JSX
import styled from 'styled-components'; // Importe styled-components pour écrire du CSS dans JavaScript
import { theme } from './Theme'; // Importe un fichier Theme.js avec des couleurs et polices définies

/*
 * PARTIE 2 : FILTRE DES PROPRIÉTÉS
 * Cette partie empêche certaines propriétés personnalisées d’être envoyées au DOM.
 */
const shouldForwardProp = (prop) => prop !== "top"; // Crée une fonction qui retourne vrai si "prop" n’est pas "top", pour éviter des erreurs

/*
 * PARTIE 3 : STYLE DU CONTENEUR DU FOOTER
 * Cette partie stylise le conteneur principal du footer avec ses ajustements responsive.
 */
const FooterSection = styled.div.withConfig({ shouldForwardProp })` // Crée un style nommé "FooterSection" pour une balise <div>, avec le filtre des props
  position: absolute; // Positionne le footer à un endroit précis par rapport au parent
  left: 0; // Aligne le bord gauche à l’extrême gauche
  width: 100%; // Prend toute la largeur de l’écran
  height: 30vh; // Définit la hauteur à 30% de l’écran
  background: ${theme.colors.darkGreen}; // Utilise une couleur vert foncé du thème comme fond
  display: flex; // Utilise Flexbox pour organiser les éléments à l’intérieur
  justify-content: center; // Centre les éléments horizontalement
  align-items: center; // Centre les éléments verticalement
  z-index: 1; // Place le footer devant les éléments avec un z-index plus bas
  top: ${props => props.top.base || "0"}; // Positionne le haut avec "top.base", ou 0 par défaut
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    position: relative; // Change à "relative" pour suivre le flux normal sur mobile
    height: 20vh; // Réduit la hauteur à 20% sur mobile
    top: ${props => props.top.phone || "auto"}; // Utilise "top.phone" ou "auto" sur mobile
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    height: 25vh; // Ajuste la hauteur à 25% sur tablette
    top: ${props => props.top.tablet || props.top.base}; // Utilise "top.tablet" ou "top.base" sur tablette
  }
`;

/*
 * PARTIE 4 : STYLE DU TEXTE DU FOOTER
 * Cette partie stylise le texte affiché dans le footer (ex. copyright).
 */
const FooterText = styled.p` // Crée un style nommé "FooterText" pour une balise <p>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 1rem; // Définit une taille de texte standard (16px)
  color: ${theme.colors.white}; // Applique la couleur blanche pour contraste sur fond vert
  text-align: center; // Centre le texte horizontalement
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 0.8rem; // Réduit la taille à 0.8 fois la taille de base (12.8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 0.9rem; // Ajuste la taille à 0.9 fois la taille de base (14.4px)
  }
`;

/*
 * PARTIE 5 : LOGIQUE DU COMPOSANT FOOTER
 * Cette partie définit comment le composant fonctionne et ce qu’il affiche.
 */
/*
 * Description de la fonction Footer :
 * Cette fonction est le composant principal qui affiche un pied de page simple.
 * Elle prend une propriété pour ajuster sa position verticale.
 * Arguments :
 * - top : un objet avec les positions verticales pour différents écrans (défaut : { base: "0" }).
 * Retour :
 * - Retourne directement le JSX qui affiche le footer avec le texte de copyright.
 */
const Footer = ({ top = { base: "0" } }) => ( // Crée une fonction "Footer" avec une prop "top" par défaut
  /*
   * PARTIE 5.1 : RENDU JSX DU COMPOSANT
   * Cette sous-partie affiche le footer avec son texte centré.
   */
  <FooterSection top={top}>
    <FooterText>© 2023 Connectify. Tous Droits Réservés</FooterText> {/* Texte fixe de copyright */}
  </FooterSection>
);

/*
 * PARTIE 6 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default Footer; // Exporte la fonction "Footer" pour qu’elle soit réutilisable ailleurs