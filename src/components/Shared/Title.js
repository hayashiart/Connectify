// src/components/Shared/Title.js
// Ce fichier contient le composant Title, qui affiche un titre stylisé.
// Il est utilisé pour les titres principaux dans différentes sections de l’application.

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
const shouldForwardProp = (prop) => !["size", "marginBottom"].includes(prop); // Crée une fonction qui retourne vrai si "prop" n’est pas "size" ou "marginBottom", pour éviter des erreurs

/*
 * PARTIE 3 : STYLE DU TITRE
 * Cette partie stylise le titre avec une police, une taille et une couleur spécifiques.
 */
const StyledTitle = styled.h2.withConfig({ shouldForwardProp })` // Crée un style nommé "StyledTitle" pour une balise <h2>, avec le filtre des props
  font-family: ${theme.fonts.chicle}; // Utilise la police "Chicle" définie dans le thème
  font-size: ${props => props.size.base || '3rem'}; // Définit la taille avec "size.base", ou 3rem (48px) par défaut
  color: ${theme.colors.yellow}; // Applique la couleur jaune du thème
  margin-bottom: ${props => props.marginBottom || '2rem'}; // Ajoute un espace en bas avec "marginBottom", ou 2rem (32px) par défaut
  text-align: center; // Centre le texte horizontalement
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: ${props => props.size.phone || '2rem'}; // Utilise "size.phone" pour la taille, ou 2rem (32px) par défaut
    margin-bottom: 1rem; // Réduit l’espace en bas à 1rem (16px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: ${props => props.size.tablet || '2.5rem'}; // Utilise "size.tablet" pour la taille, ou 2.5rem (40px) par défaut
    margin-bottom: 1.5rem; // Ajuste l’espace en bas à 1.5rem (24px)
  }
`;

/*
 * PARTIE 4 : LOGIQUE DU COMPOSANT TITLE
 * Cette partie définit comment le composant affiche un titre avec des propriétés personnalisables.
 */
/*
 * Description de la fonction Title :
 * Cette fonction est le composant principal qui affiche un titre stylisé.
 * Elle prend des propriétés pour personnaliser la taille et la marge en bas.
 * Arguments :
 * - children : le contenu textuel à afficher dans le titre.
 * - size : un objet avec les tailles de police pour différents écrans (défaut : { base: "3rem" }).
 * - marginBottom : une chaîne pour l’espace en bas (optionnel, défaut "2rem" via StyledTitle).
 * Retour :
 * - Retourne directement le JSX qui affiche le titre stylisé.
 */
const Title = ({ children, size = { base: "3rem" }, marginBottom }) => ( // Crée une fonction "Title" avec des props "children", "size" et "marginBottom"
  /*
   * PARTIE 4.1 : RENDU JSX DU COMPOSANT
   * Cette sous-partie affiche le titre avec les styles appliqués.
   */
  <StyledTitle size={size} marginBottom={marginBottom}>
    {children} {/* Affiche le texte passé au composant (ex. "Connexion") */}
  </StyledTitle>
);

/*
 * PARTIE 5 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default Title; // Exporte la fonction "Title" pour qu’elle soit réutilisable ailleurs