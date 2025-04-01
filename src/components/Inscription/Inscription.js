// src/components/Inscription/Inscription.js
// Ce fichier contient le composant Inscription, qui affiche une page d’inscription.
// Il crée un utilisateur dans Firebase Auth et enregistre ses données dans Firestore, puis redirige vers le profil.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer le composant et gérer l’inscription.
 */
import React, { useState } from "react"; // Importe React pour créer le composant, useState pour gérer les états
import * as S from "./InscriptionStyles"; // Importe tous les styles définis dans InscriptionStyles.js avec l’alias "S"
import Header from "../Shared/Header"; // Importe le composant Header pour la barre de navigation
import Footer from "../Shared/Footer"; // Importe le composant Footer pour le pied de page
import ImageBlockSection from "../Shared/ImageBlockSection"; // Importe le composant ImageBlockSection pour structurer la page
import FormField from "../Shared/FormField"; // Importe le composant FormField pour les champs de formulaire
import FormContainer from "../Shared/FormContainer"; // Importe le composant FormContainer pour le conteneur du formulaire
import Title from "../Shared/Title"; // Importe le composant Title pour le titre
import { theme } from "../Shared/Theme"; // Importe un fichier Theme.js avec des couleurs et polices définies
import { auth, db } from "../../firebase"; // Importe l’authentification (auth) et la base de données Firestore (db) depuis firebase.js
import { createUserWithEmailAndPassword } from "firebase/auth"; // Importe la fonction pour créer un utilisateur avec email et mot de passe
import { doc, setDoc } from "firebase/firestore"; // Importe des fonctions Firestore : doc (référence à un document), setDoc (définir un document)
import { useNavigate } from "react-router-dom"; // Importe useNavigate pour rediriger l’utilisateur

/*
 * PARTIE 2 : LOGIQUE DU COMPOSANT INSCRIPTION
 * Cette partie définit la logique pour gérer l’inscription et l’affichage de la page.
 */
const Inscription = () => { // Crée une fonction "Inscription" qui est le composant principal
  const [error, setError] = useState(""); // Crée une variable "error" (vide) et "setError" pour afficher les messages d’erreur
  const navigate = useNavigate(); // Crée une fonction "navigate" pour rediriger l’utilisateur

  /*
   * Description de la fonction handleSubmit :
   * Cette fonction gère la soumission du formulaire d’inscription.
   * Elle crée un utilisateur dans Firebase Auth, enregistre ses données dans Firestore, et redirige ou affiche une erreur.
   * Arguments :
   * - e : un objet événement qui contient les données du formulaire soumis.
   * Retour :
   * - Ne retourne rien, mais modifie l’état "error" ou redirige via "navigate".
   */
  const handleSubmit = async (e) => { // Crée une fonction "handleSubmit" pour gérer la soumission, "async" pour attendre des actions lentes
    e.preventDefault(); // Empêche le rechargement de la page par défaut lors de la soumission
    const nom = e.target[0].value; // Récupère la valeur du premier champ (nom)
    const prenom = e.target[1].value; // Récupère la valeur du deuxième champ (prénom)
    const email = e.target[2].value; // Récupère la valeur du troisième champ (email)
    const gender = e.target.elements.gender.value; // Récupère la valeur du bouton radio sélectionné (genre)
    const password = e.target[5].value; // Récupère la valeur du cinquième champ (mot de passe)
    const confirmPassword = e.target[6].value; // Récupère la valeur du sixième champ (confirmation du mot de passe)
    if (password !== confirmPassword) { // Vérifie si les mots de passe correspondent
      setError("Les mots de passe ne correspondent pas"); // Met un message d’erreur si non
      return; // Sort de la fonction
    }
    try { // Essaie d’exécuter le code suivant et attrape les erreurs
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Crée un utilisateur dans Firebase Auth, attend la réponse
      const user = userCredential.user; // Récupère l’objet utilisateur créé
      await setDoc(doc(db, "users", user.uid), { // Enregistre les données dans Firestore sous l’ID de l’utilisateur
        nom, // Champ nom
        prenom, // Champ prénom
        email, // Champ email
        gender, // Champ genre
        createdAt: new Date().toISOString(), // Date de création au format ISO
      }); // Attend la confirmation de l’enregistrement
      navigate("/profile"); // Redirige vers la page de profil si tout réussit
    } catch (err) { // Attrape une erreur si elle se produit
      setError(err.message); // Met à jour "error" avec le message d’erreur de Firebase
    }
  };

  /*
   * PARTIE 3 : RENDU JSX DU COMPOSANT
   * Cette partie affiche la page d’inscription avec un en-tête, un formulaire, et un pied de page.
   */
  return (
    <S.Container> {/* Conteneur principal de la page */}
      {/* PARTIE 3.1 : SECTION PRINCIPALE AVEC FORMULAIRE
         Cette sous-partie affiche une section avec une image et le formulaire d’inscription */}
      <ImageBlockSection
        top="0" // Positionne la section en haut de la page
        imageUrl="/Connectify/PageInscription/imageInscription.jpg" // Image de fond à gauche
        bgColor={theme.colors.lightGreen} // Fond vert clair pour le bloc de droite
        justify="flex-start" // Aligne les éléments en haut du bloc
        paddingTop={{ base: "2rem", phone: "1rem", tablet: "1.5rem" }} // Espace en haut ajusté selon l’écran
      >
        <Title size={{ base: "3rem", phone: "2rem", tablet: "2.5rem" }}>Inscription</Title> {/* Titre "Inscription" */}
        <FormContainer
          height={{ base: "60%", phone: "auto", tablet: "70%" }} // Hauteur ajustée selon l’écran
          align="flex-start" // Aligne les éléments à gauche
          onSubmit={handleSubmit} // Appelle handleSubmit lors de la soumission
          width={{ base: "70%", phone: "90%", tablet: "80%" }} // Largeur ajustée selon l’écran
        >
          <S.InputWrapper> {/* Conteneur pour aligner "Nom" et "Prénom" côte à côte */}
            <FormField
              label="Nom:" // Étiquette au-dessus du champ
              type="text" // Type de champ pour texte
              placeholder="Entrez votre nom..." // Texte indicatif dans le champ
              width={{ base: "150px", phone: "100%", tablet: "45%" }} // Largeur ajustée selon l’écran
              size={{ base: "0.9rem", phone: "0.8rem", tablet: "0.85rem" }} // Taille de police ajustée
              align="flex-start" // Aligne à gauche
              validateType="text" // Applique la validation pour le texte
            />
            <FormField
              label="Prénom:" // Étiquette au-dessus du champ
              type="text" // Type de champ pour texte
              placeholder="Entrez votre prénom..." // Texte indicatif dans le champ
              width={{ base: "150px", phone: "100%", tablet: "45%" }} // Largeur ajustée selon l’écran
              size={{ base: "0.9rem", phone: "0.8rem", tablet: "0.85rem" }} // Taille de police ajustée
              align="flex-start" // Aligne à gauche
              validateType="text" // Applique la validation pour le texte
            />
          </S.InputWrapper>
          <FormField
            label="Email:" // Étiquette au-dessus du champ
            type="email" // Type de champ pour email
            placeholder="Entrez votre email..." // Texte indicatif dans le champ
            width={{ base: "460px", phone: "100%", tablet: "90%" }} // Largeur ajustée selon l’écran
            size={{ base: "0.9rem", phone: "0.8rem", tablet: "0.85rem" }} // Taille de police ajustée
            align="flex-start" // Aligne à gauche
            validateType="email" // Applique la validation pour les emails
          />
          <S.RadioWrapper> {/* Conteneur pour les boutons radio "Genre" */}
            <S.InscriptionLabel>Genre:</S.InscriptionLabel> {/* Étiquette "Genre:" */}
            <S.RadioLabel>
              <S.RadioInput type="radio" name="gender" value="homme" /> Homme {/* Bouton radio pour "Homme" */}
            </S.RadioLabel>
            <S.RadioLabel>
              <S.RadioInput type="radio" name="gender" value="femme" /> Femme {/* Bouton radio pour "Femme" */}
            </S.RadioLabel>
          </S.RadioWrapper>
          <FormField
            label="Mot de passe:" // Étiquette au-dessus du champ
            type="password" // Type de champ pour mot de passe (texte masqué)
            placeholder="Entrez votre mot de passe..." // Texte indicatif dans le champ
            width={{ base: "400px", phone: "100%", tablet: "90%" }} // Largeur ajustée selon l’écran
            size={{ base: "0.9rem", phone: "0.8rem", tablet: "0.85rem" }} // Taille de police ajustée
            align="flex-start" // Aligne à gauche
            validateType="password" // Applique la validation pour les mots de passe
          />
          <FormField
            label="Vérification de mot de passe:" // Étiquette au-dessus du champ
            type="password" // Type de champ pour mot de passe (texte masqué)
            placeholder="Entrez votre mot de passe..." // Texte indicatif dans le champ
            width={{ base: "400px", phone: "100%", tablet: "90%" }} // Largeur ajustée selon l’écran
            size={{ base: "0.9rem", phone: "0.8rem", tablet: "0.85rem" }} // Taille de police ajustée
            align="flex-start" // Aligne à gauche
            validateType="password" // Applique la validation pour les mots de passe
          />
          <FormField
            type="submit" // Type de champ pour le bouton de soumission
            width={{ base: "60%", phone: "80%", tablet: "70%" }} // Largeur ajustée selon l’écran
            gap="1rem" // Espace entre le bouton et les autres éléments
            align="flex-start" // Aligne à gauche
          >
            Valider {/* Texte du bouton */}
          </FormField>
          {/* Affiche un message d’erreur en rouge si "error" n’est pas vide */}
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </FormContainer>
        <S.LoginText>
          Déjà inscrit? <S.LoginLink to="/auth">Connectez-vous</S.LoginLink> {/* Texte avec lien vers la connexion */}
        </S.LoginText>
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
export default Inscription; // Exporte la fonction "Inscription" pour qu’elle soit réutilisable ailleurs