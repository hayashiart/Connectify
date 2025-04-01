// src/components/Shared/FormContainer.js
// Ce fichier contient le composant FormContainer, une boîte qui regroupe les champs d’un formulaire.
// Il stylise cette boîte et la transforme en <form> pour gérer les soumissions.

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
const shouldForwardProp = (prop) => !["width", "height", "justify", "align"].includes(prop); // Crée une fonction qui retourne vrai si "prop" n’est pas dans la liste, pour éviter des erreurs

/*
 * PARTIE 3 : STYLE DU CONTENEUR DU FORMULAIRE
 * Cette partie définit le style de la boîte qui contient les champs du formulaire.
 */
const Box = styled.div.withConfig({ shouldForwardProp })` // Crée un style nommé "Box" pour une balise <div>, avec le filtre des props
  width: ${props => props.width.base || '70%'}; // Définit la largeur avec "width.base", ou 70% par défaut
  height: ${props => props.height.base || '50%'}; // Définit la hauteur avec "height.base", ou 50% par défaut
  background: ${theme.colors.darkGreen}; // Utilise une couleur vert foncé du thème comme fond
  border-radius: 10px; // Arrondit les coins de 10 pixels pour un look moderne
  display: flex; // Utilise Flexbox pour organiser les éléments à l’intérieur
  flex-direction: column; // Place les éléments les uns sous les autres (en colonne)
  justify-content: ${props => props.justify || 'center'}; // Aligne les éléments verticalement avec "justify", ou "center" par défaut
  align-items: ${props => props.align || 'center'}; // Aligne les éléments horizontalement avec "align", ou "center" par défaut
  padding: 2rem; // Ajoute 2rem (32px) d’espace intérieur
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: ${props => props.width.phone || '90%'}; // Utilise "width.phone" pour la largeur, ou 90% par défaut
    height: ${props => props.height.phone || 'auto'}; // Utilise "height.phone" pour la hauteur, ou "auto" par défaut
    padding: 1rem; // Réduit l’espace intérieur à 1rem (16px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: ${props => props.width.tablet || '80%'}; // Utilise "width.tablet" pour la largeur, ou 80% par défaut
    height: ${props => props.height.tablet || '60%'}; // Utilise "height.tablet" pour la hauteur, ou 60% par défaut
    padding: 1.5rem; // Ajuste l’espace intérieur à 1.5rem (24px)
  }
`;

/*
 * PARTIE 4 : LOGIQUE DU COMPOSANT FORMULAIRE
 * Cette partie définit comment le composant fonctionne et ce qu’il affiche.
 */
/*
 * Description de la fonction FormContainer :
 * Cette fonction est le composant principal qui crée une boîte pour un formulaire.
 * Elle prend des propriétés pour personnaliser la taille, l’alignement et la soumission.
 * Arguments :
 * - width : un objet avec les largeurs pour différents écrans (défaut : { base: "70%" }).
 * - height : un objet avec les hauteurs pour différents écrans (défaut : { base: "50%" }).
 * - justify : une chaîne pour l’alignement vertical des éléments (optionnel).
 * - align : une chaîne pour l’alignement horizontal des éléments (optionnel).
 * - onSubmit : une fonction à appeler quand le formulaire est soumis (optionnel).
 * - children : les éléments à afficher dans la boîte (ex. champs de formulaire).
 * Retour :
 * - Retourne directement le JSX qui affiche la boîte stylisée en tant que <form>.
 */
const FormContainer = ({ // Crée une fonction "FormContainer" qui est le composant, avec plusieurs propriétés (props)
  width = { base: "70%" }, // Propriété "width" : objet avec largeurs, 70% par défaut
  height = { base: "50%" }, // Propriété "height" : objet avec hauteurs, 50% par défaut
  justify, // Propriété "justify" : alignement vertical des éléments
  align, // Propriété "align" : alignement horizontal des éléments
  onSubmit, // Propriété "onSubmit" : fonction à appeler quand le formulaire est soumis
  children // Propriété "children" : contenu à afficher dans la boîte (ex. champs)
}) => ( // Utilise une flèche => pour définir la fonction, retourne directement le JSX
  /*
   * PARTIE 4.1 : RENDU JSX DU COMPOSANT
   * Cette sous-partie affiche la boîte stylisée transformée en formulaire.
   */
  <Box // Utilise le style "Box" pour créer la boîte
    width={width} // Passe la propriété "width" pour définir la largeur
    height={height} // Passe la propriété "height" pour définir la hauteur
    justify={justify} // Passe la propriété "justify" pour l’alignement vertical
    align={align} // Passe la propriété "align" pour l’alignement horizontal
    as="form" // Transforme la balise <div> en <form> pour gérer les soumissions
    onSubmit={onSubmit} // Passe la fonction "onSubmit" pour l’événement de soumission
  >
    {children} {/* Affiche les éléments enfants passés au composant, comme des champs ou boutons */}
  </Box>
);

/*
 * PARTIE 5 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default FormContainer; // Exporte la fonction "FormContainer" pour qu’elle soit réutilisable ailleurs