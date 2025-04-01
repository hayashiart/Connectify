// src/components/Shared/ImageBlockSection.js
// Ce fichier contient le composant ImageBlockSection, qui affiche une section avec une image à gauche et un contenu à droite.
// Il est utilisé pour structurer des sections comme "Actualité" ou "Nous contacter" dans la page d’accueil.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer et styliser le composant.
 */
import React from 'react'; // Importe React pour créer le composant JSX
import styled from "styled-components"; // Importe styled-components pour écrire du CSS dans JavaScript
import { theme } from './Theme'; // Importe un fichier Theme.js avec des couleurs et polices définies

/*
 * PARTIE 2 : FILTRE DES PROPRIÉTÉS
 * Cette partie empêche certaines propriétés personnalisées d’être envoyées au DOM.
 */
const shouldForwardProp = (prop) => !["top", "imageUrl", "bgColor", "justify", "paddingTop"].includes(prop); // Crée une fonction qui retourne vrai si "prop" n’est pas dans la liste, pour éviter des erreurs

/*
 * PARTIE 3 : STYLE DE LA SECTION PRINCIPALE
 * Cette partie stylise le conteneur principal qui contient l’image et le bloc de contenu.
 */
const Section = styled.div.withConfig({ shouldForwardProp })` // Crée un style nommé "Section" pour une balise <div>, avec le filtre des props
  position: absolute; // Positionne la section à un endroit précis sur la page
  top: ${props => props.top.base}; // Définit la position verticale avec "top.base" (ex. "200vh")
  left: 0; // Aligne le bord gauche à l’extrême gauche
  width: 100%; // Prend toute la largeur de l’écran
  height: 100vh; // Prend toute la hauteur de l’écran
  display: flex; // Utilise Flexbox pour organiser l’image et le bloc côte à côte
  z-index: 1; // Place la section devant les éléments avec un z-index plus bas
  overflow: hidden; // Cache tout contenu qui dépasse la section
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    flex-direction: column; // Place l’image et le bloc l’un sous l’autre
    height: auto; // Ajuste la hauteur au contenu
    position: relative; // Change à "relative" pour suivre le flux normal
    top: ${props => props.top.phone || "0"}; // Utilise "top.phone" ou 0 par défaut
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    height: 90vh; // Réduit la hauteur à 90% de l’écran
    top: ${props => props.top.tablet || props.top.base}; // Utilise "top.tablet" ou "top.base"
  }
`;

/*
 * PARTIE 4 : STYLE DE L’IMAGE
 * Cette partie stylise l’image affichée à gauche de la section.
 */
const Image = styled.div.withConfig({ shouldForwardProp })` // Crée un style nommé "Image" pour une balise <div>, avec le filtre des props
  flex: 0 0 43%; // Définit une largeur fixe de 43% et empêche le redimensionnement
  height: 100%; // Prend toute la hauteur de la section
  background: url(${props => props.imageUrl}) no-repeat center center; // Utilise l’URL de l’image comme fond, centrée sans répétition
  background-size: cover; // Ajuste l’image pour couvrir toute la zone
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    flex: none; // Désactive le flex pour une largeur complète
    width: 100%; // Prend toute la largeur disponible
    height: 30vh; // Réduit la hauteur à 30% de l’écran
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    flex: 0 0 40%; // Réduit légèrement la largeur à 40%
  }
`;

/*
 * PARTIE 5 : STYLE DU BLOC DE CONTENU
 * Cette partie stylise le bloc à droite qui contient le texte ou les éléments enfants.
 */
const Block = styled.div.withConfig({ shouldForwardProp })` // Crée un style nommé "Block" pour une balise <div>, avec le filtre des props
  flex: 1; // Prend tout l’espace restant après l’image
  height: 100%; // Prend toute la hauteur de la section
  background: ${props => props.bgColor}; // Applique la couleur de fond spécifiée par "bgColor"
  display: flex; // Utilise Flexbox pour organiser les éléments enfants
  flex-direction: column; // Place les éléments enfants les uns sous les autres
  justify-content: ${props => props.justify || 'center'}; // Aligne verticalement avec "justify", ou "center" par défaut
  align-items: center; // Centre les éléments horizontalement
  padding-top: ${props => props.paddingTop.base || '0'}; // Ajoute un espace en haut avec "paddingTop.base", ou 0 par défaut
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 100%; // Prend toute la largeur disponible
    height: auto; // Ajuste la hauteur au contenu
    padding-top: ${props => props.paddingTop.phone || '1rem'}; // Utilise "paddingTop.phone" ou 1rem par défaut
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    padding-top: ${props => props.paddingTop.tablet || props.paddingTop.base || '1.5rem'}; // Utilise "paddingTop.tablet", ou "paddingTop.base", ou 1.5rem
  }
`;

/*
 * PARTIE 6 : LOGIQUE DU COMPOSANT IMAGE BLOCK SECTION
 * Cette partie définit comment le composant fonctionne et ce qu’il affiche.
 */
/*
 * Description de la fonction ImageBlockSection :
 * Cette fonction est le composant principal qui affiche une section avec une image et un bloc de contenu.
 * Elle prend des propriétés pour personnaliser la position, l’image, la couleur et l’alignement.
 * Arguments :
 * - top : un objet avec les positions verticales pour différents écrans (défaut : { base: "0" }).
 * - imageUrl : une chaîne avec l’URL de l’image à afficher.
 * - bgColor : une chaîne pour la couleur de fond du bloc.
 * - justify : une chaîne pour l’alignement vertical des éléments dans le bloc (optionnel).
 * - paddingTop : un objet avec les espacements en haut pour différents écrans (défaut : { base: "0" }).
 * - children : les éléments à afficher dans le bloc (ex. texte, formulaire).
 * Retour :
 * - Retourne directement le JSX qui affiche la section avec l’image et le bloc.
 */
const ImageBlockSection = ({ // Crée une fonction "ImageBlockSection" avec plusieurs props
  top = { base: "0" }, // Propriété "top" : position verticale, défaut "0"
  imageUrl, // Propriété "imageUrl" : URL de l’image
  bgColor, // Propriété "bgColor" : couleur de fond du bloc
  justify, // Propriété "justify" : alignement vertical dans le bloc
  paddingTop = { base: "0" }, // Propriété "paddingTop" : espace en haut, défaut "0"
  children // Propriété "children" : contenu du bloc
}) => ( // Utilise une flèche => pour définir la fonction, retourne directement le JSX
  /*
   * PARTIE 6.1 : RENDU JSX DU COMPOSANT
   * Cette sous-partie affiche la section avec une image à gauche et un bloc à droite.
   */
  <Section top={top}> 
    <Image imageUrl={imageUrl} /> {/* Affiche l’image avec l’URL spécifiée */}
    <Block bgColor={bgColor} justify={justify} paddingTop={paddingTop}> {/* Affiche le bloc avec couleur, alignement et padding */}
      {children} {/* Affiche les éléments enfants passés au composant (ex. titre, texte) */}
    </Block>
  </Section>
);

/*
 * PARTIE 7 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default ImageBlockSection; // Exporte la fonction "ImageBlockSection" pour qu’elle soit réutilisable ailleurs