// src/components/Contact/Contact.js
// Ce fichier contient le composant Contact, qui affiche une page de formulaire de contact.
// Il envoie les données saisies à Firebase Firestore et affiche un message de succès ou d’erreur.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer le composant et gérer les données.
 */
import React, { useState } from "react"; // Importe React pour créer le composant, useState pour gérer les états
import * as S from "./ContactStyles"; // Importe tous les styles définis dans ContactStyles.js avec l’alias "S"
import Header from "../Shared/Header"; // Importe le composant Header pour la barre de navigation
import Footer from "../Shared/Footer"; // Importe le composant Footer pour le pied de page
import ImageBlockSection from "../Shared/ImageBlockSection"; // Importe le composant ImageBlockSection pour structurer la page
import FormField from "../Shared/FormField"; // Importe le composant FormField pour les champs de formulaire
import FormContainer from "../Shared/FormContainer"; // Importe le composant FormContainer pour le conteneur du formulaire
import Title from "../Shared/Title"; // Importe le composant Title pour le titre
import { theme } from "../Shared/Theme"; // Importe un fichier Theme.js avec des couleurs et polices définies
import { db } from "../../firebase"; // Importe la base de données Firestore depuis firebase.js
import { collection, addDoc } from "firebase/firestore"; // Importe des fonctions Firestore : collection (référence à une collection), addDoc (ajouter un document)

/*
 * PARTIE 2 : LOGIQUE DU COMPOSANT CONTACT
 * Cette partie définit la logique pour gérer la soumission du formulaire et l’affichage.
 */
const Contact = () => { // Crée une fonction "Contact" qui est le composant principal
  const [isSubmitted, setIsSubmitted] = useState(false); // Crée une variable "isSubmitted" (faux au départ) et "setIsSubmitted" pour indiquer si le formulaire est envoyé
  const [error, setError] = useState(""); // Crée une variable "error" (vide) et "setError" pour afficher les messages d’erreur

  /*
   * Description de la fonction handleSubmit :
   * Cette fonction gère la soumission du formulaire de contact.
   * Elle envoie les données à Firestore et affiche un message de succès temporaire ou une erreur.
   * Arguments :
   * - e : un objet événement qui contient les données du formulaire soumis.
   * Retour :
   * - Ne retourne rien, mais modifie les états "isSubmitted" et "error".
   */
  const handleSubmit = async (e) => { // Crée une fonction "handleSubmit" pour gérer la soumission, "async" pour attendre des actions lentes
    e.preventDefault(); // Empêche le rechargement de la page par défaut lors de la soumission
    const email = e.target[0].value; // Récupère la valeur du premier champ (email) du formulaire
    const sujet = e.target[1].value; // Récupère la valeur du deuxième champ (sujet) du formulaire
    const message = e.target[2].value; // Récupère la valeur du troisième champ (message) du formulaire
    try { // Essaie d’exécuter le code suivant et attrape les erreurs
      await addDoc(collection(db, "contacts"), { // Ajoute un nouveau document à la collection "contacts" dans Firestore
        email, // Champ email
        sujet, // Champ sujet
        message, // Champ message
        submittedAt: new Date().toISOString(), // Ajoute la date et l’heure actuelles au format ISO
      }); // Attend la confirmation de l’ajout
      setIsSubmitted(true); // Met "isSubmitted" à vrai pour afficher le message de succès
      setTimeout(() => { // Définit un minuteur pour réinitialiser "isSubmitted" après 3 secondes
        setIsSubmitted(false); // Remet "isSubmitted" à faux
      }, 3000); // 3000 millisecondes = 3 secondes
    } catch (err) { // Attrape une erreur si elle se produit
      setError(err.message); // Met à jour "error" avec le message d’erreur de Firestore
    }
  };

  /*
   * PARTIE 3 : RENDU JSX DU COMPOSANT
   * Cette partie affiche la page de contact avec un en-tête, un formulaire, et un pied de page.
   */
  return (
    <S.Container> {/* Conteneur principal de la page */}
      {/* PARTIE 3.1 : SECTION PRINCIPALE AVEC FORMULAIRE
         Cette sous-partie affiche une section avec une image et le formulaire de contact */}
      <ImageBlockSection
        top="0" // Positionne la section en haut de la page
        imageUrl="/Connectify/PageContact/fd_contact.jpg" // Image de fond à gauche
        bgColor={theme.colors.lightGreen} // Fond vert clair pour le bloc de droite
        paddingTop={{ base: "2rem", phone: "1rem", tablet: "1.5rem" }} // Espace en haut ajusté selon l’écran
      >
        <Title size={{ base: "3rem", phone: "2rem", tablet: "2.5rem" }}>Nous contacter</Title> {/* Titre "Nous contacter" */}
        <FormContainer
          align="center" // Centre les éléments horizontalement
          onSubmit={handleSubmit} // Appelle handleSubmit lors de la soumission
          width={{ base: "70%", phone: "90%", tablet: "80%" }} // Largeur ajustée selon l’écran
          height={{ base: "50%", phone: "auto", tablet: "60%" }} // Hauteur ajustée selon l’écran
        >
          <FormField
            label="Email:" // Étiquette au-dessus du champ
            type="email" // Type de champ pour email
            placeholder="Entrez votre Email..." // Texte indicatif dans le champ
            width={{ base: "80%", phone: "100%", tablet: "90%" }} // Largeur ajustée selon l’écran
            size={{ base: "1.2rem", phone: "1rem", tablet: "1.1rem" }} // Taille de police ajustée
            align="center" // Centre le champ horizontalement
            validateType="email" // Applique la validation pour les emails
          />
          <FormField
            label="Sujet:" // Étiquette au-dessus du champ
            type="text" // Type de champ pour texte
            placeholder="Sujet de votre message..." // Texte indicatif dans le champ
            width={{ base: "80%", phone: "100%", tablet: "90%" }} // Largeur ajustée selon l’écran
            size={{ base: "1.2rem", phone: "1rem", tablet: "1.1rem" }} // Taille de police ajustée
            align="center" // Centre le champ horizontalement
            validateType="text" // Applique la validation pour le texte
          />
          <FormField
            label="Message:" // Étiquette au-dessus du champ
            type="textarea" // Type de champ pour texte multiligne
            placeholder="Ecrivez votre message..." // Texte indicatif dans le champ
            width={{ base: "80%", phone: "100%", tablet: "90%" }} // Largeur ajustée selon l’écran
            size={{ base: "1.2rem", phone: "1rem", tablet: "1.1rem" }} // Taille de police ajustée
            align="center" // Centre le champ horizontalement
            validateType="message" // Applique la validation pour les messages
          />
          <FormField
            type="submit" // Type de champ pour le bouton de soumission
            width={{ base: "60%", phone: "80%", tablet: "70%" }} // Largeur ajustée selon l’écran
            gap="1rem" // Espace entre le bouton et les autres éléments
            align="center" // Centre le bouton horizontalement
          >
            Envoyer {/* Texte du bouton */}
          </FormField>
          {/* Affiche un message de succès en vert si "isSubmitted" est vrai */}
          {isSubmitted && <S.SuccessMessage>Message envoyé avec succès !</S.SuccessMessage>}
          {/* Affiche un message d’erreur en rouge si "error" n’est pas vide */}
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </FormContainer>
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
export default Contact; // Exporte la fonction "Contact" pour qu’elle soit réutilisable ailleurs