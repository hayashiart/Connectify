// src/components/ContactStyles.js
// Ce fichier contient les styles pour le composant Contact, définis avec styled-components.
// Ces styles sont utilisés pour la page de contact.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer des styles.
 */
import styled from 'styled-components'; // Importe styled-components pour écrire du CSS dans JavaScript
import { theme } from '../Shared/Theme'; // Importe un fichier Theme.js avec des couleurs et polices définies

/*
 * PARTIE 2 : STYLE DU CONTENEUR PRINCIPAL
 * Cette partie stylise le conteneur global de la page de contact.
 */
export const Container = styled.div` // Crée un style nommé "Container" pour une balise <div>
  position: relative; // Permet de positionner les enfants par rapport à ce conteneur
  height: 130vh; // Définit une hauteur de 130% de l’écran pour accueillir tout le contenu
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    height: auto; // Laisse la hauteur s’ajuster au contenu
    min-height: 100vh; // Assure une hauteur minimale de 100% de l’écran
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    height: 110vh; // Réduit la hauteur à 110% de l’écran
  }
`;

/*
 * PARTIE 3 : STYLE DU MESSAGE DE SUCCÈS
 * Cette partie stylise le texte affiché quand le formulaire est envoyé avec succès.
 */
export const SuccessMessage = styled.p` // Crée un style nommé "SuccessMessage" pour une balise <p>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 1rem; // Définit une taille de texte standard (16px)
  color: #00cc00; // Applique une couleur verte pour indiquer un succès
  text-align: center; // Centre le texte horizontalement
  margin-top: 1rem; // Ajoute 1rem (16px) d’espace au-dessus
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 0.8rem; // Réduit la taille à 0.8 fois la taille de base (12.8px)
    margin-top: 0.5rem; // Réduit l’espace au-dessus à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 0.9rem; // Ajuste la taille à 0.9 fois la taille de base (14.4px)
  }
`;

/*
 * PARTIE 4 : STYLE DU MESSAGE D’ERREUR
 * Cette partie stylise le texte affiché en cas d’erreur lors de la soumission.
 */
export const ErrorMessage = styled.p` // Crée un style nommé "ErrorMessage" pour une balise <p>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 1rem; // Définit une taille de texte standard (16px)
  color: #ff4444; // Applique une couleur rouge pour indiquer une erreur
  text-align: center; // Centre le texte horizontalement
  margin-top: 1rem; // Ajoute 1rem (16px) d’espace au-dessus
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 0.8rem; // Réduit la taille à 0.8 fois la taille de base (12.8px)
    margin-top: 0.5rem; // Réduit l’espace au-dessus à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 0.9rem; // Ajuste la taille à 0.9 fois la taille de base (14.4px)
  }
`;