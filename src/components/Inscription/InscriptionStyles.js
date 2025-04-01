// src/components/InscriptionStyles.js
// Ce fichier contient les styles pour le composant Inscription, définis avec styled-components.
// Ces styles sont utilisés pour la page d’inscription.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer des styles.
 */
import styled from 'styled-components'; // Importe styled-components pour écrire du CSS dans JavaScript
import { NavLink } from 'react-router-dom'; // Importe NavLink pour créer des liens cliquables
import { theme } from '../Shared/Theme'; // Importe un fichier Theme.js avec des couleurs et polices définies

/*
 * PARTIE 2 : STYLE DU CONTENEUR PRINCIPAL
 * Cette partie stylise le conteneur global de la page d’inscription.
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
 * PARTIE 3 : STYLE DU CONTENEUR DES CHAMPS D’ENTRÉE
 * Cette partie stylise le conteneur qui regroupe les champs "Nom" et "Prénom".
 */
export const InputWrapper = styled.div` // Crée un style nommé "InputWrapper" pour une balise <div>
  display: flex; // Utilise Flexbox pour organiser les champs côte à côte
  width: 80%; // Définit la largeur à 80% du conteneur parent
  gap: 3rem; // Ajoute 3rem (48px) d’espace entre les champs
  margin-bottom: 1rem; // Ajoute 1rem (16px) d’espace en bas
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    flex-direction: column; // Place les champs les uns sous les autres
    gap: 0.5rem; // Réduit l’espace à 0.5rem (8px)
    width: 90%; // Étend la largeur à 90%
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    gap: 2rem; // Ajuste l’espace à 2rem (32px)
    width: 85%; // Ajuste la largeur à 85%
  }
`;

/*
 * PARTIE 4 : STYLE DU CONTENEUR DES BOUTONS RADIO
 * Cette partie stylise le conteneur qui regroupe les boutons radio pour le genre.
 */
export const RadioWrapper = styled.div` // Crée un style nommé "RadioWrapper" pour une balise <div>
  width: 80%; // Définit la largeur à 80% du conteneur parent
  display: flex; // Utilise Flexbox pour organiser les éléments côte à côte
  gap: 2rem; // Ajoute 2rem (32px) d’espace entre les éléments
  margin-bottom: 1rem; // Ajoute 1rem (16px) d’espace en bas
  align-items: center; // Centre les éléments verticalement
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    flex-direction: column; // Place les éléments les uns sous les autres
    gap: 0.5rem; // Réduit l’espace à 0.5rem (8px)
    width: 90%; // Étend la largeur à 90%
    align-items: flex-start; // Aligne les éléments à gauche
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    gap: 1.5rem; // Ajuste l’espace à 1.5rem (24px)
    width: 85%; // Ajuste la largeur à 85%
  }
`;

/*
 * PARTIE 5 : STYLE DE L’ÉTIQUETTE "GENRE"
 * Cette partie stylise l’étiquette "Genre:" avant les boutons radio.
 */
export const InscriptionLabel = styled.label` // Crée un style nommé "InscriptionLabel" pour une balise <label>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 0.9rem; // Définit une taille de texte de 0.9 fois la taille de base (14.4px)
  color: ${theme.colors.white}; // Applique la couleur blanche pour contraste
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 0.8rem; // Réduit la taille à 0.8 fois la taille de base (12.8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 0.85rem; // Ajuste la taille à 0.85 fois la taille de base (13.6px)
  }
`;

/*
 * PARTIE 6 : STYLE DES ÉTIQUETTES DES BOUTONS RADIO
 * Cette partie stylise les étiquettes "Homme" et "Femme" à côté des boutons radio.
 */
export const RadioLabel = styled.label` // Crée un style nommé "RadioLabel" pour une balise <label>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 1rem; // Définit une taille de texte standard (16px)
  color: ${theme.colors.white}; // Applique la couleur blanche pour contraste
  display: flex; // Utilise Flexbox pour aligner le bouton radio et le texte
  align-items: center; // Centre le texte et le bouton verticalement
  gap: 0.5rem; // Ajoute 0.5rem (8px) d’espace entre le bouton et le texte
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 0.9rem; // Réduit la taille à 0.9 fois la taille de base (14.4px)
    gap: 0.3rem; // Réduit l’espace à 0.3rem (4.8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 0.95rem; // Ajuste la taille à 0.95 fois la taille de base (15.2px)
  }
`;

/*
 * PARTIE 7 : STYLE DES BOUTONS RADIO
 * Cette partie stylise les boutons radio eux-mêmes.
 */
export const RadioInput = styled.input` // Crée un style nommé "RadioInput" pour une balise <input>
  margin: 0; // Supprime les marges par défaut pour un alignement précis
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    transform: scale(0.8); // Réduit légèrement la taille du bouton radio (80%)
  }
`;

/*
 * PARTIE 8 : STYLE DU TEXTE DE CONNEXION
 * Cette partie stylise le texte invitant à se connecter sous le formulaire.
 */
export const LoginText = styled.p` // Crée un style nommé "LoginText" pour une balise <p>
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
 * PARTIE 9 : STYLE DU LIEN DE CONNEXION
 * Cette partie stylise le lien cliquable dans le texte de connexion.
 */
export const LoginLink = styled(NavLink)` // Crée un style nommé "LoginLink" pour une balise <NavLink>
  color: ${theme.colors.yellow}; // Applique la couleur jaune du thème
  text-decoration: none; // Enlève le soulignement par défaut
  &:hover { // Style au survol de la souris
    text-decoration: underline; // Ajoute un soulignement au survol
  }
`;

/*
 * PARTIE 10 : STYLE DU MESSAGE D’ERREUR
 * Cette partie stylise le texte affiché en cas d’erreur lors de la soumission.
 */
export const ErrorMessage = styled.p` // Crée un style nommé "ErrorMessage" pour une balise <p>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 0.9rem; // Définit une taille de texte de 0.9 fois la taille de base (14.4px)
  color: #ff4444; // Applique une couleur rouge pour indiquer une erreur
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