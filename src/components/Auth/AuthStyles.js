// src/components/AuthStyles.js
// Ce fichier contient les styles pour le composant Auth, définis avec styled-components.
// Ces styles sont utilisés pour la page de connexion.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer des styles.
 */
import styled from 'styled-components'; // Importe styled-components pour écrire du CSS dans JavaScript
import { NavLink } from 'react-router-dom'; // Importe NavLink pour créer des liens cliquables
import { theme } from '../Shared/Theme'; // Importe un fichier Theme.js avec des couleurs et polices définies

/*
 * PARTIE 2 : STYLE DU CONTENEUR PRINCIPAL
 * Cette partie stylise le conteneur global de la page de connexion.
 */
export const Container = styled.div` // Crée un style nommé "Container" pour une balise <div>
  position: relative; // Permet de positionner les enfants par rapport à ce conteneur
  height: 130vh; // Définit une hauteur de 130% de l’écran pour accueillir tout le contenu
  @media (max-width: 480px) { /* Téléphones */
    height: auto; // Laisse la hauteur s’ajuster au contenu
    min-height: 100vh; // Assure une hauteur minimale de 100% de l’écran
  }
  @media (min-width: 481px) and (max-width: 768px) { /* Tablettes */
    height: 110vh; // Réduit la hauteur à 110% de l’écran
  }
`;

/*
 * PARTIE 3 : STYLE DU TEXTE D’INSCRIPTION
 * Cette partie stylise le texte invitant à s’inscrire sous le formulaire.
 */
export const SignUpText = styled.p` // Crée un style nommé "SignUpText" pour une balise <p>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 0.9rem; // Définit une taille de texte de 0.9 fois la taille de base (14.4px)
  color: ${theme.colors.white}; // Applique la couleur blanche pour contraste
  text-align: center; // Centre le texte horizontalement
  margin-top: 1rem; // Ajoute 1rem (16px) d’espace au-dessus
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 0.8rem; // Réduit la taille à 0.8 fois la taille de base (12.8px)
    margin-top: 0.5rem; // Réduit l’espace au-dessus à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 0.85rem; // Ajuste la taille à 0.85 fois la taille de base (13.6px)
  }
`;

/*
 * PARTIE 4 : STYLE DU LIEN D’INSCRIPTION
 * Cette partie stylise le lien cliquable dans le texte d’inscription.
 */
export const SignUpLink = styled(NavLink)` // Crée un style nommé "SignUpLink" pour une balise <NavLink>
  color: ${theme.colors.yellow}; // Applique la couleur jaune du thème
  text-decoration: none; // Enlève le soulignement par défaut
  &:hover { // Style au survol de la souris
    text-decoration: underline; // Ajoute un soulignement au survol
  }
`;

/*
 * PARTIE 5 : STYLE DU MESSAGE D’ERREUR
 * Cette partie stylise le texte d’erreur affiché sous le formulaire.
 */
export const ErrorMessage = styled.p` // Crée un style nommé "ErrorMessage" pour une balise <p>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 0.9rem; // Définit une taille de texte de 0.9 fois la taille de base (14.4px)
  color: #ff4444; // Applique une couleur rouge pour indiquer une erreur
  text-align: center; // Centre le texte horizontalement
  margin-top: 1rem; // Ajoute 1rem (16px) d’espace au-dessus
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 0.75rem; // Réduit la taille à 0.75 fois la taille de base (12px)
    margin-top: 0.5rem; // Réduit l’espace au-dessus à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 0.8rem; // Ajuste la taille à 0.8 fois la taille de base (12.8px)
  }
`;