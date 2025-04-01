// src/components/Home/HomeStyles.js
// Ce fichier contient les styles pour le composant Home, définis avec styled-components.
// Ces styles contrôlent l’apparence des sections, titres, formulaires, etc., et s’adaptent aux tailles d’écran.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer des styles.
 */
import styled from 'styled-components'; // Importe la bibliothèque styled-components pour écrire du CSS dans du JavaScript
import { theme } from '../Shared/Theme'; // Importe un fichier Theme.js qui contient des couleurs et polices utilisées dans tout le projet

/*
 * PARTIE 2 : STYLE DU CONTENEUR PRINCIPAL
 * Cette partie définit le style de la boîte qui contient toute la page d’accueil.
 */
export const Container = styled.div` // Crée un style nommé "Container" pour une balise <div>
  position: relative; // Permet de positionner les éléments à l’intérieur par rapport à ce conteneur
  height: 630vh; // Définit une hauteur très grande (630 fois la hauteur de l’écran) pour beaucoup de contenu
  @media (max-width: 480px) { // Si l’écran est petit (mobile, moins de 480 pixels de large)
    height: auto; // La hauteur s’ajuste automatiquement au contenu sur mobile
    min-height: 100vh; // Assure que la hauteur est au moins égale à l’écran complet
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette, entre 481 et 768 pixels)
    height: 550vh; // Réduit la hauteur à 550 fois la hauteur de l’écran pour tablettes
  }
`;

/*
 * PARTIE 3 : STYLE DE LA VIDÉO EN ARRIÈRE-PLAN
 * Cette partie stylise la vidéo qui apparaît derrière tout le contenu de la page.
 */
export const VideoBg = styled.video` // Crée un style nommé "VideoBg" pour une balise <video>
  position: fixed; // Fixe la vidéo en place, elle reste immobile même en défilant
  top: 0; // Place le haut de la vidéo tout en haut de l’écran
  left: 0; // Aligne le bord gauche de la vidéo à l’extrême gauche de l’écran
  width: 100%; // Étend la vidéo sur toute la largeur de l’écran
  height: 100%; // Étend la vidéo sur toute la hauteur de l’écran
  object-fit: cover; // Ajuste la vidéo pour remplir l’espace sans déformer ses proportions
  z-index: -1; // Place la vidéo derrière tout le contenu (niveau d’empilement négatif)
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    height: 50vh; // Réduit la hauteur à 50% de l’écran pour économiser de l’espace
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    height: 80vh; // Ajuste la hauteur à 80% pour un compromis entre mobile et grand écran
  }
`;

/*
 * PARTIE 4 : STYLE DE LA PREMIÈRE SECTION
 * Cette partie stylise la section qui contient le grand titre "Connectify".
 */
export const FirstSection = styled.div` // Crée un style nommé "FirstSection" pour une balise <div>
  position: relative; // Permet de positionner les éléments enfants par rapport à cette section
  height: 100vh; // Prend toute la hauteur de l’écran pour une grande section
  display: flex; // Utilise Flexbox pour organiser les éléments à l’intérieur
  justify-content: center; // Centre les éléments horizontalement dans la section
  align-items: center; // Centre les éléments verticalement dans la section
  z-index: 1; // Place cette section devant la vidéo (niveau 1)
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    height: 50vh; // Réduit la hauteur à 50% pour économiser de l’espace
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    height: 80vh; // Ajuste la hauteur à 80% pour les tablettes
  }
`;

/*
 * PARTIE 5 : STYLE DU TITRE PRINCIPAL
 * Cette partie stylise le texte "Connectify" affiché dans la première section.
 */
export const Title = styled.h1` // Crée un style nommé "Title" pour une balise <h1>
  font-family: ${theme.fonts.chicle}; // Utilise la police "Chicle" définie dans le fichier thème
  font-size: 8rem; // Définit une taille très grande (8 fois la taille de base, soit 128px)
  color: ${theme.colors.yellow}; // Applique la couleur jaune définie dans le thème
  opacity: 0.5; // Rend le texte semi-transparent (50% d’opacité) pour un effet subtil
  text-align: center; // Centre le texte horizontalement
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 4rem; // Réduit la taille à 4 fois la taille de base (64px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 6rem; // Ajuste la taille à 6 fois la taille de base (96px)
  }
`;

/*
 * PARTIE 6 : STYLE DE LA DEUXIÈME SECTION
 * Cette partie stylise la section avec le texte "Bienvenue" et le sous-titre.
 */
export const SecondSection = styled.div` // Crée un style nommé "SecondSection" pour une balise <div>
  position: absolute; // Positionne cette section à un endroit précis sur la page
  top: 100vh; // Place le haut juste après la première section (100% de la hauteur de l’écran)
  left: 0; // Aligne le bord gauche à l’extrême gauche
  width: 100%; // Prend toute la largeur disponible de l’écran
  height: 100vh; // Prend toute la hauteur de l’écran pour une section pleine page
  background: ${theme.colors.yellowOpaque}; // Utilise une couleur jaune semi-transparente définie dans le thème
  display: flex; // Utilise Flexbox pour organiser les éléments à l’intérieur
  flex-direction: column; // Place les éléments les uns sous les autres (en colonne)
  justify-content: center; // Centre les éléments verticalement
  align-items: center; // Centre les éléments horizontalement
  z-index: 1; // Place cette section devant la vidéo (niveau 1)
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    top: 50vh; // Déplace le haut à 50% pour suivre la première section réduite
    height: 60vh; // Réduit la hauteur à 60% pour mieux s’adapter
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    top: 80vh; // Ajuste le haut à 80% pour suivre la première section
    height: 80vh; // Réduit la hauteur à 80% pour un compromis
  }
`;

/*
 * PARTIE 7 : STYLE DU TEXTE DE BIENVENUE
 * Cette partie stylise le texte "Bienvenue" dans la deuxième section.
 */
export const WelcomeText = styled.h2` // Crée un style nommé "WelcomeText" pour une balise <h2>
  font-family: 'Gravitas One', cursive; // Utilise la police externe "Gravitas One" avec un style manuscrit
  font-size: 4rem; // Définit une grande taille de texte (4 fois la taille de base, soit 64px)
  color: ${theme.colors.darkGreen}; // Applique la couleur vert foncé définie dans le thème
  margin-bottom: 1rem; // Ajoute 1rem (16px) d’espace en bas pour séparer du sous-titre
  position: relative; // Permet d’ajuster la position par rapport à son emplacement normal
  top: -10%; // Déplace le texte vers le haut de 10% pour un effet visuel
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 2.5rem; // Réduit la taille à 2.5 fois la taille de base (40px)
    top: -5%; // Réduit le décalage vers le haut à 5%
    margin-bottom: 0.5rem; // Réduit l’espace en bas à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 3rem; // Ajuste la taille à 3 fois la taille de base (48px)
  }
`;

/*
 * PARTIE 8 : STYLE DU SOUS-TITRE
 * Cette partie stylise le texte sous "Bienvenue".
 */
export const Subtitle = styled.p` // Crée un style nommé "Subtitle" pour une balise <p>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" définie dans le thème, simple et lisible
  font-size: 1.5rem; // Définit une taille de texte de 1.5 fois la taille de base (24px)
  color: ${theme.colors.white}; // Applique la couleur blanche pour un bon contraste
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 1rem; // Réduit la taille à la taille de base (16px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 1.2rem; // Ajuste la taille à 1.2 fois la taille de base (19.2px)
  }
`;

/*
 * PARTIE 9 : STYLE DES TEXTES FICTIFS
 * Cette partie stylise les textes placeholder (Lorem Ipsum) dans certaines sections.
 */
export const LoremText = styled.p` // Crée un style nommé "LoremText" pour une balise <p>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" définie dans le thème
  font-size: 1rem; // Définit une taille de texte standard (16px)
  color: ${theme.colors.white}; // Applique la couleur blanche pour contraste
  text-align: center; // Centre le texte horizontalement
  padding: 0 1rem; // Ajoute 1rem (16px) d’espace à gauche et à droite
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 0.8rem; // Réduit la taille à 0.8 fois la taille de base (12.8px)
    padding: 0 0.5rem; // Réduit l’espace à 0.5rem (8px) à gauche et à droite
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 0.9rem; // Ajuste la taille à 0.9 fois la taille de base (14.4px)
  }
`;

export const QsnText = styled.p` // Crée un style nommé "QsnText" pour une balise <p>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" définie dans le thème
  font-size: 1rem; // Définit une taille de texte standard (16px)
  color: ${theme.colors.white}; // Applique la couleur blanche pour contraste
  text-align: center; // Centre le texte horizontalement
  padding: 0 1rem; // Ajoute 1rem (16px) d’espace à gauche et à droite
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 0.8rem; // Réduit la taille à 0.8 fois la taille de base (12.8px)
    padding: 0 0.5rem; // Réduit l’espace à 0.5rem (8px) à gauche et à droite
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 0.9rem; // Ajuste la taille à 0.9 fois la taille de base (14.4px)
  }
`;

/*
 * PARTIE 10 : STYLE DE LA SIXIÈME SECTION (NEWSLETTER)
 * Cette partie stylise la section qui contient le formulaire de newsletter.
 */
export const SixthSection = styled.div` // Crée un style nommé "SixthSection" pour une balise <div>
  position: absolute; // Positionne cette section à un endroit précis sur la page
  top: 500vh; // Place le haut à 500% de la hauteur de l’écran
  left: 0; // Aligne le bord gauche à l’extrême gauche
  width: 100%; // Prend toute la largeur disponible
  height: 100vh; // Prend toute la hauteur de l’écran
  display: flex; // Utilise Flexbox pour organiser les éléments
  justify-content: center; // Centre les éléments horizontalement
  align-items: center; // Centre les éléments verticalement
  z-index: 1; // Place cette section devant les éléments avec un z-index plus bas
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    top: auto; // Laisse la section suivre l’ordre normal au lieu d’une position absolue
    height: auto; // Ajuste la hauteur au contenu
    padding: 1rem 0; // Ajoute 1rem (16px) d’espace en haut et en bas
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    top: 450vh; // Ajuste le haut à 450% pour les tablettes
    height: 80vh; // Réduit la hauteur à 80% de l’écran
  }
`;

export const BlackBox = styled.div` // Crée un style nommé "BlackBox" pour une balise <div>
  width: 70%; // Définit la largeur à 70% pour un effet centré
  height: 30%; // Définit la hauteur à 30% pour contenir le formulaire
  background: ${theme.colors.blackOpaque}; // Utilise une couleur noire semi-transparente du thème
  border-radius: 15px; // Arrondit les coins de 15 pixels pour un design moderne
  display: flex; // Utilise Flexbox pour organiser les éléments
  flex-direction: column; // Place les éléments les uns sous les autres (en colonne)
  justify-content: center; // Centre les éléments verticalement
  align-items: center; // Centre les éléments horizontalement
  padding: 1rem; // Ajoute 1rem (16px) d’espace intérieur
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 90%; // Étend à 90% pour maximiser l’espace sur mobile
    height: auto; // Ajuste la hauteur au contenu
    padding: 0.5rem; // Réduit l’espace intérieur à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 80%; // Ajuste à 80% pour un compromis sur tablette
    height: 40%; // Augmente la hauteur à 40% pour plus d’espace
  }
`;

/*
 * PARTIE 11 : STYLE DES ÉLÉMENTS DE LA NEWSLETTER
 * Cette partie stylise les éléments spécifiques au formulaire de newsletter (titre, texte, champ, bouton).
 */
export const NewsletterTitle = styled.h2` // Crée un style nommé "NewsletterTitle" pour une balise <h2>
  font-family: ${theme.fonts.chicle}; // Utilise la police "Chicle" définie dans le thème
  font-size: 3rem; // Définit une taille de 3 fois la taille de base (48px)
  color: ${theme.colors.yellow}; // Applique la couleur jaune du thème
  margin-bottom: 0.5rem; // Ajoute 0.5rem (8px) d’espace en bas
  width: 90%; // Prend 90% de la largeur pour rester centré
  text-align: center; // Centre le texte horizontalement
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 2rem; // Réduit la taille à 2 fois la taille de base (32px)
    margin-bottom: 0.3rem; // Réduit l’espace en bas à 0.3rem (4.8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 2.5rem; // Ajuste la taille à 2.5 fois la taille de base (40px)
  }
`;

export const NewsletterText = styled.p` // Crée un style nommé "NewsletterText" pour une balise <p>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" définie dans le thème
  font-size: 0.9rem; // Définit une taille légèrement plus petite (14.4px)
  color: ${theme.colors.white}; // Applique la couleur blanche pour contraste
  margin-bottom: 1rem; // Ajoute 1rem (16px) d’espace en bas
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 0.8rem; // Réduit la taille à 0.8 fois la taille de base (12.8px)
    margin-bottom: 0.5rem; // Réduit l’espace en bas à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 0.85rem; // Ajuste la taille à 0.85 fois la taille de base (13.6px)
  }
`;

export const NewsletterInput = styled.input` // Crée un style nommé "NewsletterInput" pour une balise <input>
  width: 60%; // Définit la largeur à 60% de la boîte noire
  padding: 0.5rem; // Ajoute 0.5rem (8px) d’espace intérieur pour le confort
  margin-bottom: 1rem; // Ajoute 1rem (16px) d’espace en bas pour séparer du bouton
  background: ${theme.colors.grayLight}; // Utilise une couleur gris clair du thème comme fond
  border: none; // Enlève la bordure pour un look épuré
  border-radius: 5px; // Arrondit les coins de 5 pixels
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" définie dans le thème
  font-size: 1rem; // Définit une taille de texte standard (16px)
  color: ${theme.colors.grayDark}; // Applique une couleur gris foncé pour le texte tapé
  &::placeholder { // Style spécial pour le texte indicatif quand le champ est vide
    color: ${theme.colors.grayPlaceholder}; // Utilise une couleur grise claire pour le placeholder
  }
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 80%; // Étend à 80% pour maximiser l’espace
    padding: 0.3rem; // Réduit l’espace intérieur à 0.3rem (4.8px)
    font-size: 0.9rem; // Réduit la taille à 0.9 fois la taille de base (14.4px)
    margin-bottom: 0.5rem; // Réduit l’espace en bas à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 70%; // Ajuste à 70% pour un compromis
    padding: 0.4rem; // Ajuste l’espace intérieur à 0.4rem (6.4px)
  }
`;

export const NewsletterButton = styled.button` // Crée un style nommé "NewsletterButton" pour une balise <button>
  width: 30%; // Définit la largeur à 30% pour un bouton compact
  padding: 0.5rem; // Ajoute 0.5rem (8px) d’espace intérieur
  background: ${theme.colors.darkGreen}; // Utilise une couleur verte foncée du thème comme fond
  border: none; // Enlève la bordure pour un look simple
  border-radius: 5px; // Arrondit les coins de 5 pixels
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" définie dans le thème
  font-size: 1rem; // Définit une taille de texte standard (16px)
  color: ${theme.colors.white}; // Applique la couleur blanche pour contraste
  cursor: pointer; // Change le curseur en main pour indiquer qu’on peut cliquer
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 50%; // Étend à 50% pour plus de visibilité
    padding: 0.3rem; // Réduit l’espace intérieur à 0.3rem (4.8px)
    font-size: 0.9rem; // Réduit la taille à 0.9 fois la taille de base (14.4px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 40%; // Ajuste à 40% pour un compromis
    padding: 0.4rem; // Ajuste l’espace intérieur à 0.4rem (6.4px)
  }
`;

/*
 * PARTIE 12 : STYLE DES MESSAGES DE SUCCÈS ET D’ERREUR
 * Cette partie stylise les messages qui apparaissent après une action (succès ou erreur).
 */
export const SuccessMessage = styled.p` // Crée un style nommé "SuccessMessage" pour une balise <p>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" définie dans le thème
  font-size: 1rem; // Définit une taille de texte standard (16px)
  color: #00cc00; // Utilise une couleur verte pour indiquer un succès
  text-align: center; // Centre le texte horizontalement
  margin-top: 1rem; // Ajoute 1rem (16px) d’espace au-dessus pour séparation
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 0.8rem; // Réduit la taille à 0.8 fois la taille de base (12.8px)
    margin-top: 0.5rem; // Réduit l’espace au-dessus à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 0.9rem; // Ajuste la taille à 0.9 fois la taille de base (14.4px)
  }
`;

export const ErrorMessage = styled.p` // Crée un style nommé "ErrorMessage" pour une balise <p>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" définie dans le thème
  font-size: 1rem; // Définit une taille de texte standard (16px)
  color: #ff4444; // Utilise une couleur rouge pour indiquer une erreur
  text-align: center; // Centre le texte horizontalement
  margin-top: 1rem; // Ajoute 1rem (16px) d’espace au-dessus pour séparation
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 0.8rem; // Réduit la taille à 0.8 fois la taille de base (12.8px)
    margin-top: 0.5rem; // Réduit l’espace au-dessus à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 0.9rem; // Ajuste la taille à 0.9 fois la taille de base (14.4px)
  }
`;