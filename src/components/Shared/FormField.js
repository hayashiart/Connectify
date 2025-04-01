// src/components/Shared/FormField.js
// Ce fichier contient le composant FormField, utilisé pour créer des champs dans un formulaire (comme email, texte, bouton).
// Il gère la saisie, la validation, et le style des champs.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer et styliser le composant.
 */
import React, { useState } from 'react'; // Importe React pour créer le composant et useState pour gérer des variables qui changent
import styled from 'styled-components'; // Importe styled-components pour écrire du CSS dans JavaScript
import { theme } from './Theme'; // Importe un fichier Theme.js avec des couleurs et polices définies
import { validateInput } from './Validation'; // Importe une fonction validateInput pour vérifier si les saisies sont correctes

/*
 * PARTIE 2 : FILTRE DES PROPRIÉTÉS
 * Cette partie empêche certaines propriétés personnalisées d’être envoyées au DOM (la page HTML).
 */
const shouldForwardProp = (prop) => !["direction", "width", "gap", "align", "size", "isValid"].includes(prop); // Crée une fonction qui retourne vrai si la propriété "prop" n’est pas dans la liste, pour éviter des erreurs

/*
 * PARTIE 3 : STYLE DU CONTENEUR PRINCIPAL
 * Cette partie définit le style de la boîte qui contient le label, le champ ou le bouton.
 */
const Container = styled.div.withConfig({ shouldForwardProp })` // Crée un style nommé "Container" pour une balise <div>, avec le filtre des props
  display: flex; // Utilise Flexbox pour organiser les éléments à l’intérieur
  flex-direction: ${props => props.direction || 'column'}; // Définit si les éléments sont en colonne ou en ligne, utilise "direction" ou "column" par défaut
  width: ${props => props.width.base || 'auto'}; // Définit la largeur avec "width.base", ou "auto" si rien n’est spécifié
  gap: ${props => props.gap || '0.5rem'}; // Ajoute un espace entre les éléments avec "gap", ou 0.5rem (8px) par défaut
  margin-bottom: 1rem; // Ajoute 1rem (16px) d’espace en bas pour séparer des autres éléments
  align-items: ${props => props.align || 'center'}; // Aligne les éléments horizontalement avec "align", ou "center" par défaut
  @media (max-width: 480px) { // Si l’écran est petit (mobile, moins de 480 pixels)
    width: ${props => props.width.phone || '100%'}; // Utilise "width.phone" pour la largeur, ou 100% par défaut
    gap: 0.3rem; // Réduit l’espace entre éléments à 0.3rem (4.8px)
    margin-bottom: 0.5rem; // Réduit l’espace en bas à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: ${props => props.width.tablet || '90%'}; // Utilise "width.tablet" pour la largeur, ou 90% par défaut
    gap: 0.4rem; // Ajuste l’espace entre éléments à 0.4rem (6.4px)
  }
`;

/*
 * PARTIE 4 : STYLE DU LABEL
 * Cette partie stylise le texte affiché au-dessus du champ (ex. "Email :").
 */
const Label = styled.label.withConfig({ shouldForwardProp })` // Crée un style nommé "Label" pour une balise <label>, avec le filtre des props
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" définie dans le thème
  font-size: ${props => props.size.base || '1.2rem'}; // Définit la taille du texte avec "size.base", ou 1.2rem (19.2px) par défaut
  color: ${theme.colors.white}; // Applique la couleur blanche définie dans le thème
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: ${props => props.size.phone || '1rem'}; // Utilise "size.phone" pour la taille, ou 1rem (16px) par défaut
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: ${props => props.size.tablet || '1.1rem'}; // Utilise "size.tablet" pour la taille, ou 1.1rem (17.6px) par défaut
  }
`;

/*
 * PARTIE 5 : STYLE DE L’INPUT
 * Cette partie stylise les champs de saisie classiques (comme texte ou email).
 */
const Input = styled.input.withConfig({ shouldForwardProp })` // Crée un style nommé "Input" pour une balise <input>, avec le filtre des props
  width: ${props => props.width.base || '100%'}; // Définit la largeur avec "width.base", ou 100% par défaut
  padding: 0.5rem; // Ajoute 0.5rem (8px) d’espace intérieur pour le confort
  background: ${props => props.isValid ? theme.colors.grayLight : '#ffcccc'}; // Si "isValid" est vrai, fond gris clair, sinon rouge clair
  border: ${props => props.isValid ? 'none' : `1px solid ${theme.colors.grayDark}`}; // Pas de bordure si valide, sinon bordure grise de 1px
  border-radius: 5px; // Arrondit les coins de 5 pixels pour un look moderne
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 1rem; // Définit une taille de texte standard (16px)
  color: ${theme.colors.grayDark}; // Applique une couleur gris foncé pour le texte tapé
  &::placeholder { // Style spécial pour le texte indicatif quand le champ est vide
    color: ${theme.colors.grayPlaceholder}; // Utilise une couleur grise claire pour le placeholder
  }
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: ${props => props.width.phone || '100%'}; // Utilise "width.phone" pour la largeur, ou 100% par défaut
    padding: 0.3rem; // Réduit l’espace intérieur à 0.3rem (4.8px)
    font-size: 0.9rem; // Réduit la taille à 0.9 fois la taille de base (14.4px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: ${props => props.width.tablet || '90%'}; // Utilise "width.tablet" pour la largeur, ou 90% par défaut
    padding: 0.4rem; // Ajuste l’espace intérieur à 0.4rem (6.4px)
  }
`;

/*
 * PARTIE 6 : STYLE DU TEXTAREA
 * Cette partie stylise les champs de saisie multilignes (comme un message long).
 */
const Textarea = styled.textarea.withConfig({ shouldForwardProp })` // Crée un style nommé "Textarea" pour une balise <textarea>, avec le filtre des props
  width: ${props => props.width.base || '100%'}; // Définit la largeur avec "width.base", ou 100% par défaut
  height: 40%; // Définit la hauteur à 40% de la boîte qui le contient
  padding: 0.5rem; // Ajoute 0.5rem (8px) d’espace intérieur
  background: ${props => props.isValid ? theme.colors.grayLight : '#ffcccc'}; // Si "isValid" est vrai, fond gris clair, sinon rouge clair
  border: ${props => props.isValid ? 'none' : `1px solid ${theme.colors.grayDark}`}; // Pas de bordure si valide, sinon bordure grise de 1px
  border-radius: 5px; // Arrondit les coins de 5 pixels
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 1rem; // Définit une taille de texte standard (16px)
  color: ${theme.colors.grayDark}; // Applique une couleur gris foncé pour le texte
  resize: none; // Empêche l’utilisateur de redimensionner le champ avec la souris
  &::placeholder { // Style spécial pour le texte indicatif
    color: ${theme.colors.grayPlaceholder}; // Utilise une couleur grise claire pour le placeholder
  }
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: ${props => props.width.phone || '100%'}; // Utilise "width.phone" pour la largeur, ou 100% par défaut
    height: 20vh; // Réduit la hauteur à 20% de l’écran
    padding: 0.3rem; // Réduit l’espace intérieur à 0.3rem (4.8px)
    font-size: 0.9rem; // Réduit la taille à 0.9 fois la taille de base (14.4px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: ${props => props.width.tablet || '90%'}; // Utilise "width.tablet" pour la largeur, ou 90% par défaut
    height: 30vh; // Ajuste la hauteur à 30% de l’écran
    padding: 0.4rem; // Ajuste l’espace intérieur à 0.4rem (6.4px)
  }
`;

/*
 * PARTIE 7 : STYLE DU BOUTON
 * Cette partie stylise le bouton de soumission (ex. "Envoyer").
 */
const Button = styled.button` // Crée un style nommé "Button" pour une balise <button>
  width: ${props => props.width.base || '50%'}; // Définit la largeur avec "width.base", ou 50% par défaut
  padding: 0.5rem; // Ajoute 0.5rem (8px) d’espace intérieur
  background: ${theme.colors.yellow}; // Utilise une couleur jaune du thème comme fond
  border: none; // Enlève la bordure pour un look épuré
  border-radius: 5px; // Arrondit les coins de 5 pixels
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 1rem; // Définit une taille de texte standard (16px)
  color: ${theme.colors.white}; // Applique la couleur blanche pour contraste sur le fond jaune
  cursor: pointer; // Change le curseur en main pour indiquer qu’on peut cliquer
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: ${props => props.width.phone || '70%'}; // Utilise "width.phone" pour la largeur, ou 70% par défaut
    padding: 0.3rem; // Réduit l’espace intérieur à 0.3rem (4.8px)
    font-size: 0.9rem; // Réduit la taille à 0.9 fois la taille de base (14.4px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: ${props => props.width.tablet || '60%'}; // Utilise "width.tablet" pour la largeur, ou 60% par défaut
    padding: 0.4rem; // Ajuste l’espace intérieur à 0.4rem (6.4px)
  }
`;

/*
 * PARTIE 8 : STYLE DU MESSAGE D’ERREUR
 * Cette partie stylise le texte qui apparaît si la saisie est incorrecte.
 */
const ErrorMessage = styled.span` // Crée un style nommé "ErrorMessage" pour une balise <span>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 0.8rem; // Définit une petite taille de texte (12.8px)
  color: #ff4444; // Utilise une couleur rouge pour indiquer une erreur
  text-align: center; // Centre le texte horizontalement
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 0.7rem; // Réduit la taille à 0.7 fois la taille de base (11.2px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 0.75rem; // Ajuste la taille à 0.75 fois la taille de base (12px)
  }
`;

/*
 * PARTIE 9 : LOGIQUE DU COMPOSANT FORM FIELD
 * Cette partie contient la logique pour gérer la saisie et la validation du champ.
 */
const FormField = ({ // Crée une fonction "FormField" qui est le composant, avec plusieurs propriétés (props)
  label, // Propriété "label" : texte à afficher au-dessus (ex. "Email")
  type, // Propriété "type" : type du champ (ex. "text", "textarea", "submit")
  placeholder, // Propriété "placeholder" : texte indicatif dans le champ
  width = { base: "auto" }, // Propriété "width" : objet avec largeurs pour différents écrans, "auto" par défaut
  direction, // Propriété "direction" : direction Flexbox (ex. "row" ou "column")
  size = { base: "1.2rem" }, // Propriété "size" : objet avec tailles de texte, 1.2rem par défaut
  gap, // Propriété "gap" : espace entre les éléments dans le conteneur
  align, // Propriété "align" : alignement horizontal des éléments
  validateType, // Propriété "validateType" : type de validation (ex. "email")
  onChange, // Propriété "onChange" : fonction à appeler quand la valeur change
  children // Propriété "children" : contenu du bouton (ex. "Envoyer")
}) => { // Utilise une flèche => pour définir la fonction
  const [value, setValue] = useState(''); // Crée une variable "value" (vide au départ) et "setValue" pour la changer, pour stocker ce que l’utilisateur tape
  const [validation, setValidation] = useState({ isValid: true, message: '' }); // Crée une variable "validation" (objet avec "isValid" vrai et "message" vide) et "setValidation" pour gérer si la saisie est valide

  /*
   * Description de la fonction handleChange :
   * Cette fonction est appelée quand l’utilisateur tape dans le champ.
   * Elle met à jour la valeur saisie, valide cette valeur si besoin, et appelle une fonction externe si fournie.
   * Arguments :
   * - e : un objet événement qui contient des informations sur ce que l’utilisateur a fait (ex. ce qu’il a tapé).
   * Retour :
   * - Ne retourne rien directement, mais modifie les états "value" et "validation", et peut appeler "onChange".
   */
  const handleChange = (e) => { // Crée une fonction "handleChange" pour gérer quand l’utilisateur tape quelque chose
    const newValue = e.target.value; // Récupère ce que l’utilisateur a tapé dans le champ (e.target est le champ, .value est son contenu)
    setValue(newValue); // Met à jour "value" avec ce que l’utilisateur a tapé
    if (validateType) { // Si une validation est demandée (ex. "email")
      const result = validateInput(newValue, validateType); // Appelle validateInput avec la nouvelle valeur et le type de validation, stocke le résultat
      setValidation(result); // Met à jour "validation" avec le résultat (ex. { isValid: false, message: "Email invalide" })
    }
    if (onChange) onChange(newValue, validation.isValid); // Si une fonction "onChange" est fournie, l’appelle avec la nouvelle valeur et si elle est valide
  };

  /*
   * PARTIE 10 : RENDU JSX DU COMPOSANT
   * Cette partie affiche le champ (input, textarea ou bouton) selon les propriétés.
   */
  return (
    <Container width={width} direction={direction} gap={gap} align={align}>
      {/* Si "label" est fourni, affiche un texte au-dessus du champ */}
      {label && <Label size={size}>{label}</Label>}
      {/* Condition pour choisir quel type de champ afficher */}
      {type === 'textarea' ? (
        <Textarea
          placeholder={placeholder} // Texte qui apparaît quand le champ est vide
          width={width} // Largeur personnalisée selon l’écran
          value={value} // Lie le contenu du champ à la variable "value"
          onChange={handleChange} // Appelle "handleChange" à chaque modification
          isValid={validation.isValid} // Change le style selon si la saisie est valide
        />
      ) : type === 'submit' ? (
        <Button type="submit" width={width}>
          {children} {/* Affiche le contenu du bouton, comme "Envoyer" */}
        </Button>
      ) : (
        /* Par défaut, affiche un champ <input> si ce n’est ni textarea ni submit */
        <Input
          type={type} // Définit le type (ex. "text", "email")
          placeholder={placeholder} // Texte indicatif
          width={width} // Largeur personnalisée
          value={value} // Lie au state "value"
          onChange={handleChange} // Met à jour à chaque saisie
          isValid={validation.isValid} // Style selon la validité
        />
      )}
      {/* Affiche un message d’erreur si la saisie n’est pas valide */}
      {!validation.isValid && <ErrorMessage>{validation.message}</ErrorMessage>}
    </Container>
  );
};

/*
 * PARTIE 11 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default FormField; // Exporte la fonction "FormField" pour qu’elle soit réutilisable ailleurs