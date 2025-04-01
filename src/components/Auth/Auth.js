// src/components/Auth/Auth.js
// Ce fichier contient le composant Auth, qui affiche une page de connexion.
// Il gère la connexion avec Firebase Auth et redirige vers le profil si réussie.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer le composant et gérer l’authentification.
 */
import React, { useState } from 'react'; // Importe React pour créer le composant, useState pour gérer les états
import * as S from './AuthStyles'; // Importe tous les styles définis dans AuthStyles.js avec l’alias "S"
import Header from '../Shared/Header'; // Importe le composant Header pour la barre de navigation
import Footer from '../Shared/Footer'; // Importe le composant Footer pour le pied de page
import ImageBlockSection from '../Shared/ImageBlockSection'; // Importe le composant ImageBlockSection pour structurer la page
import FormField from '../Shared/FormField'; // Importe le composant FormField pour les champs de formulaire
import FormContainer from '../Shared/FormContainer'; // Importe le composant FormContainer pour le conteneur du formulaire
import Title from '../Shared/Title'; // Importe le composant Title pour le titre
import { theme } from '../Shared/Theme'; // Importe un fichier Theme.js avec des couleurs et polices définies
import { auth } from "../../firebase"; // Importe l’objet d’authentification Firebase
import { signInWithEmailAndPassword } from "firebase/auth"; // Importe la fonction pour connecter un utilisateur avec email et mot de passe
import { useNavigate } from "react-router-dom"; // Importe useNavigate pour rediriger l’utilisateur

/*
 * PARTIE 2 : LOGIQUE DU COMPOSANT AUTH
 * Cette partie définit la logique pour gérer la connexion et l’affichage de la page.
 */
const Auth = () => { // Crée une fonction "Auth" qui est le composant principal
  const [error, setError] = useState(""); // Crée une variable "error" (vide) et "setError" pour afficher les messages d’erreur
  const navigate = useNavigate(); // Crée une fonction "navigate" pour rediriger l’utilisateur

  /*
   * Description de la fonction handleSubmit :
   * Cette fonction gère la soumission du formulaire de connexion.
   * Elle tente de connecter l’utilisateur avec Firebase et redirige ou affiche une erreur.
   * Arguments :
   * - e : un objet événement qui contient les données du formulaire soumis.
   * Retour :
   * - Ne retourne rien, mais modifie l’état "error" ou redirige via "navigate".
   */
  const handleSubmit = async (e) => { // Crée une fonction "handleSubmit" pour gérer la soumission, "async" pour attendre des actions lentes
    e.preventDefault(); // Empêche le rechargement de la page par défaut lors de la soumission
    const email = e.target[0].value; // Récupère la valeur du premier champ (email) du formulaire
    const password = e.target[1].value; // Récupère la valeur du deuxième champ (mot de passe) du formulaire
    try { // Essaie d’exécuter le code suivant et attrape les erreurs
      await signInWithEmailAndPassword(auth, email, password); // Tente de connecter l’utilisateur avec Firebase, attend la réponse
      navigate("/profile"); // Redirige vers la page de profil si la connexion réussit
    } catch (err) { // Attrape une erreur si elle se produit
      setError(err.message); // Met à jour "error" avec le message d’erreur de Firebase
    }
  };

  /*
   * PARTIE 3 : RENDU JSX DU COMPOSANT
   * Cette partie affiche la page de connexion avec un en-tête, un formulaire, et un pied de page.
   */
  return (
    <S.Container> {/* Conteneur principal de la page */}
      {/* PARTIE 3.1 : SECTION PRINCIPALE AVEC FORMULAIRE
         Cette sous-partie affiche une section avec une image et le formulaire de connexion */}
      <ImageBlockSection
        top="0" // Positionne la section en haut de la page
        imageUrl="/Connectify/PageConnexion/fd_connexion.jpg" // Image de fond à gauche
        bgColor={theme.colors.lightGreen} // Fond vert clair pour le bloc de droite
      >
        <Title>Connexion</Title> {/* Titre "Connexion" au-dessus du formulaire */}
        <FormContainer 
          width={{ base: "70%", phone: "90%", tablet: "80%" }} // Largeur ajustée selon l’écran
          height="50%" // Hauteur fixe de 50%
          align="center" // Centre les éléments horizontalement
          onSubmit={handleSubmit} // Appelle handleSubmit lors de la soumission
        >
          <FormField
            label="Email:" // Étiquette au-dessus du champ
            type="email" // Type de champ pour email
            placeholder="Entrez votre Email" // Texte indicatif dans le champ
            width={{ base: "60%", phone: "90%", tablet: "80%" }} // Largeur ajustée selon l’écran
            size={{ base: "1.2rem", phone: "1rem", tablet: "1.1rem" }} // Taille de police ajustée
            align="center" // Centre le champ horizontalement
            validateType="email" // Applique la validation pour les emails
          />
          <FormField
            label="Mot de passe:" // Étiquette au-dessus du champ
            type="password" // Type de champ pour mot de passe (texte masqué)
            placeholder="Entrez votre mot de passe..." // Texte indicatif dans le champ
            width={{ base: "60%", phone: "90%", tablet: "80%" }} // Largeur ajustée selon l’écran
            size={{ base: "1.2rem", phone: "1rem", tablet: "1.1rem" }} // Taille de police ajustée
            align="center" // Centre le champ horizontalement
            validateType="password" // Applique la validation pour les mots de passe
          />
          <FormField 
            type="submit" // Type de champ pour le bouton de soumission
            width={{ base: "40%", phone: "60%", tablet: "50%" }} // Largeur ajustée selon l’écran
            gap="1rem" // Espace entre le bouton et les autres éléments
            align="center" // Centre le bouton horizontalement
          >
            Se Connecter {/* Texte du bouton */}
          </FormField>
          {/* Affiche un message d’erreur en rouge si "error" n’est pas vide */}
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </FormContainer>
        <S.SignUpText>
          Pas de compte? <S.SignUpLink to="/inscription">Inscrivez-vous</S.SignUpLink> {/* Texte avec lien vers l’inscription */}
        </S.SignUpText>
      </ImageBlockSection>

      {/* PARTIE 3.2 : PIED DE PAGE
         Cette sous-partie affiche le footer en bas de la page */}
      <Footer top={{ base: "100vh", phone: "auto", tablet: "90vh" }} /> {/* Position ajustée selon l’écran */}
    </S.Container>
  );
};

/*
 * PARTIE 4 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default Auth; // Exporte la fonction "Auth" pour qu’elle soit réutilisable ailleurs