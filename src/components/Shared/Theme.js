// src/components/Shared/Theme.js
// Ce fichier définit un objet "theme" qui contient les couleurs et polices utilisées dans l’application.
// Il est importé dans d’autres fichiers pour appliquer un style cohérent.

/*
 * PARTIE 1 : DÉFINITION DU THÈME
 * Cette partie crée et exporte un objet avec des couleurs et polices prédéfinies.
 */
export const theme = { // Crée un objet "theme" pour regrouper les styles
  colors: { // Sous-objet "colors" pour les couleurs utilisées
    yellow: '#daca3bff', // Couleur jaune spécifique en hexadécimal (RGB: 218, 202, 59)
    darkGreen: '#216249ff', // Couleur vert foncé en hexadécimal (RGB: 33, 98, 73)
    lightGreen: '#20835D', // Couleur vert clair en hexadécimal (RGB: 32, 131, 93)
    white: '#ffffff', // Couleur blanche en hexadécimal (RGB: 255, 255, 255)
    grayLight: '#e0e0e0', // Couleur gris clair en hexadécimal (RGB: 224, 224, 224)
    grayDark: '#333', // Couleur gris foncé en hexadécimal (RGB: 51, 51, 51)
    grayPlaceholder: '#b0b0b0', // Couleur gris pour placeholders en hexadécimal (RGB: 176, 176, 176)
    blackOpaque: 'rgba(0, 0, 0, 0.8)', // Couleur noire semi-transparente (80% d’opacité)
    yellowOpaque: 'rgba(218, 202, 59, 0.5)', // Couleur jaune semi-transparente (50% d’opacité)
  },
  fonts: { // Sous-objet "fonts" pour les polices utilisées
    chicle: "'Chicle', cursive", // Police "Chicle" avec style cursive
    inter: "'Inter', sans-serif", // Police "Inter" avec style sans-serif
  },
}; // Exporte l’objet "theme" pour qu’il soit accessible dans d’autres fichiers