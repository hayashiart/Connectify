// src/components/Home/Home.js
// Ce fichier contient le composant principal de la page d'accueil de Connectify.
// Il affiche différentes sections (titre, bienvenue, actualité, etc.) et gère des formulaires pour contacter ou s'inscrire à une newsletter.
// Il utilise Firestore pour sauvegarder les données des formulaires dans une base de données en ligne.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge tous les outils nécessaires pour que le composant fonctionne.
 */
import React, { useState } from "react"; // Importe React (pour créer le composant) et useState (pour gérer des variables qui changent)
import * as S from "./HomeStyles"; // Importe tous les styles définis dans HomeStyles.js sous le nom "S" pour les utiliser ici
import Header from "../Shared/Header"; // Importe le composant Header qui affiche la barre de navigation en haut
import Footer from "../Shared/Footer"; // Importe le composant Footer qui affiche le bas de page
import ImageBlockSection from "../Shared/ImageBlockSection"; // Importe un composant réutilisable pour afficher une section avec une image et du texte
import FormField from "../Shared/FormField"; // Importe un composant pour créer des champs de formulaire (comme email, texte)
import FormContainer from "../Shared/FormContainer"; // Importe un composant qui sert de boîte pour regrouper les champs de formulaire
import Title from "../Shared/Title"; // Importe un composant pour afficher des titres avec un style particulier
import { theme } from "../Shared/Theme"; // Importe un fichier qui contient des couleurs et polices utilisées partout dans l'application
import { db } from "../../firebase"; // Importe la connexion à la base de données Firestore depuis un fichier firebase.js
import { collection, addDoc } from "firebase/firestore"; // Importe des outils de Firestore : "collection" pour choisir une table, "addDoc" pour ajouter des données

/*
 * PARTIE 2 : LOGIQUE DU COMPOSANT
 * Cette partie contient la logique principale : variables qui changent (états) et fonctions pour gérer les formulaires.
 */
const Home = () => { // Crée une fonction nommée "Home" qui est le composant principal (une flèche => signifie qu'elle ne prend pas d'arguments ici)
  const [isSubmitted, setIsSubmitted] = useState(false); // Crée une variable "isSubmitted" (faux au départ) et une fonction "setIsSubmitted" pour la changer, pour savoir si le formulaire est envoyé
  const [error, setError] = useState(""); // Crée une variable "error" (vide au départ) et "setError" pour stocker un message si quelque chose va mal
  const [newsletterEmail, setNewsletterEmail] = useState(""); // Crée une variable "newsletterEmail" (vide) et "setNewsletterEmail" pour stocker l’email saisi pour la newsletter
  const [newsletterSuccess, setNewsletterSuccess] = useState(false); // Crée une variable "newsletterSuccess" (faux) et "setNewsletterSuccess" pour indiquer si l’inscription réussit
  const [newsletterError, setNewsletterError] = useState(""); // Crée une variable "newsletterError" (vide) et "setNewsletterError" pour un message d’erreur de la newsletter

  const handleSubmit = async (e) => { // Crée une fonction "handleSubmit" pour gérer l’envoi du formulaire de contact, "async" signifie qu’elle peut attendre des actions lentes
    e.preventDefault(); // Empêche la page de se recharger quand on clique sur "envoyer" (comportement par défaut des formulaires)
    const email = e.target[0].value; // Récupère ce que l’utilisateur a tapé dans le premier champ (email) du formulaire
    const sujet = e.target[1].value; // Récupère le texte du deuxième champ (sujet)
    const message = e.target[2].value; // Récupère le texte du troisième champ (message)
    try { // Démarre un bloc "try" pour essayer d’envoyer les données et attraper les erreurs si elles arrivent
      await addDoc(collection(db, "contacts"), { // Utilise "addDoc" pour ajouter un nouvel enregistrement dans la table "contacts" de Firestore, "await" attend que ce soit fini
        email, // Ajoute la valeur de "email" dans le nouvel enregistrement
        sujet, // Ajoute la valeur de "sujet"
        message, // Ajoute la valeur de "message"
        submittedAt: new Date().toISOString(), // Ajoute la date et l’heure actuelles au format ISO (une chaîne compréhensible par les ordinateurs)
      }); // Ferme l’objet envoyé à Firestore
      setIsSubmitted(true); // Change "isSubmitted" à vrai pour montrer un message de succès
      setTimeout(() => { // Lance une minuterie pour exécuter une action après un délai
        setIsSubmitted(false); // Remet "isSubmitted" à faux après 3 secondes pour cacher le message
      }, 3000); // Définit le délai à 3000 millisecondes (3 secondes)
    } catch (err) { // Si une erreur se produit dans le "try", ce bloc "catch" récupère l’erreur dans "err"
      setError(err.message); // Met le message d’erreur dans la variable "error" pour l’afficher
    }
  }; // "handleSubmit" prend un argument "e" (l’événement de soumission) et ne retourne rien directement, mais modifie les états

  const handleNewsletterSubmit = async (e) => { // Crée une fonction "handleNewsletterSubmit" pour gérer l’inscription à la newsletter, aussi asynchrone
    e.preventDefault(); // Empêche le rechargement de la page au clic sur "valider"
    if (!newsletterEmail) { // Vérifie si "newsletterEmail" est vide (rien n’a été tapé)
      setNewsletterError("Veuillez entrer un email."); // Met un message d’erreur dans "newsletterError" si aucun email n’est saisi
      return; // Sort de la fonction pour ne pas continuer si l’email manque
    }
    try { // Essaie d’envoyer l’email à Firestore
      await addDoc(collection(db, "newsletter"), { // Ajoute un nouvel enregistrement dans la table "newsletter"
        email: newsletterEmail, // Ajoute l’email saisi dans le nouvel enregistrement
        subscribedAt: new Date().toISOString(), // Ajoute la date actuelle au format ISO
      }); // Ferme l’objet envoyé
      setNewsletterSuccess(true); // Change "newsletterSuccess" à vrai pour montrer un message de succès
      setNewsletterEmail(""); // Vide la variable "newsletterEmail" pour effacer le champ après envoi
      setNewsletterError(""); // Vide "newsletterError" pour effacer tout message d’erreur précédent
      setTimeout(() => { // Lance une minuterie
        setNewsletterSuccess(false); // Remet "newsletterSuccess" à faux après 3 secondes
      }, 3000); // Délai de 3 secondes
    } catch (err) { // Attrape une erreur si elle se produit
      setNewsletterError(err.message); // Met le message d’erreur dans "newsletterError"
    }
  }; // "handleNewsletterSubmit" prend "e" (événement) et modifie les états sans retourner de valeur

  /*
   * PARTIE 3 : RENDU DU COMPOSANT
   * Cette partie contient tout le code qui définit ce qui s’affiche à l’écran, divisé en sous-parties.
   */
  return (
    <S.Container>
      {/* PARTIE 3.1 : STRUCTURE PRINCIPALE
         Cette sous-partie affiche la vidéo en fond, le titre principal et la section de bienvenue */}
      <S.VideoBg autoPlay loop muted>
        <source src="/Connectify/PageAccueil/fd_accueil.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo.
      </S.VideoBg>
      <S.FirstSection>
        <S.Title>Connectify</S.Title>
      </S.FirstSection>
      <S.SecondSection>
        <S.WelcomeText>Bienvenue</S.WelcomeText>
        <S.Subtitle>Harmonisez vos passions, partagez vos émotions avec Connectify !</S.Subtitle>
      </S.SecondSection>

      {/* PARTIE 3.2 : SECTIONS AVEC IMAGES
         Cette sous-partie affiche les sections "Actualité" et "Qui sommes-nous ?" avec des images */}
      <ImageBlockSection
        top={{ base: "200vh", phone: "110vh", tablet: "160vh" }}
        imageUrl="/Connectify/PageAccueil/fd_actualite.jpg"
        bgColor="#20835D"
      >
        <Title size={{ base: "3rem", phone: "2rem", tablet: "2.5rem" }}>Actualité</Title>
        <S.LoremText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</S.LoremText>
      </ImageBlockSection>
      <ImageBlockSection
        top={{ base: "300vh", phone: "170vh", tablet: "240vh" }}
        imageUrl="/Connectify/PageAccueil/fd_qsn.jpg"
        bgColor="#216249ff"
      >
        <Title size={{ base: "2.5rem", phone: "1.8rem", tablet: "2rem" }} marginBottom="1rem">Qui sommes nous?</Title>
        <S.QsnText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</S.QsnText>
      </ImageBlockSection>

      {/* PARTIE 3.3 : FORMULAIRE DE CONTACT
         Cette sous-partie affiche une section avec un formulaire pour envoyer un message */}
      <ImageBlockSection
        top={{ base: "400vh", phone: "230vh", tablet: "320vh" }}
        imageUrl="/Connectify/PageContact/fd_contact.jpg"
        bgColor={theme.colors.lightGreen}
        paddingTop={{ base: "2rem", phone: "1rem", tablet: "1.5rem" }}
      >
        <Title size={{ base: "3rem", phone: "2rem", tablet: "2.5rem" }}>Nous contacter</Title>
        <FormContainer
          align="center"
          onSubmit={handleSubmit}
          width={{ base: "70%", phone: "90%", tablet: "80%" }}
          height={{ base: "50%", phone: "auto", tablet: "60%" }}
        >
          <FormField
            label="Email:"
            type="email"
            placeholder="Entrez votre Email..."
            width={{ base: "80%", phone: "100%", tablet: "90%" }}
            size={{ base: "1.2rem", phone: "1rem", tablet: "1.1rem" }}
            align="center"
            validateType="email"
          />
          <FormField
            label="Sujet:"
            type="text"
            placeholder="Sujet de votre message..."
            width={{ base: "80%", phone: "100%", tablet: "90%" }}
            size={{ base: "1.2rem", phone: "1rem", tablet: "1.1rem" }}
            align="center"
            validateType="text"
          />
          <FormField
            label="Message:"
            type="textarea"
            placeholder="Écrivez votre message..."
            width={{ base: "80%", phone: "100%", tablet: "90%" }}
            size={{ base: "1.2rem", phone: "1rem", tablet: "1.1rem" }}
            align="center"
            validateType="message"
          />
          <FormField
            type="submit"
            width={{ base: "60%", phone: "80%", tablet: "70%" }}
            gap="1rem"
            align="center"
          >
            Envoyer
          </FormField>
          {isSubmitted && <S.SuccessMessage>Message envoyé avec succès !</S.SuccessMessage>}
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        </FormContainer>
      </ImageBlockSection>

      {/* PARTIE 3.4 : FORMULAIRE NEWSLETTER ET PIED DE PAGE
         Cette sous-partie affiche le formulaire d’inscription à la newsletter et le pied de page */}
      <S.SixthSection>
        <S.BlackBox as="form" onSubmit={handleNewsletterSubmit}>
          <S.NewsletterTitle>Newsletter</S.NewsletterTitle>
          <S.NewsletterText>Inscrivez-vous à notre Newsletter</S.NewsletterText>
          <S.NewsletterInput
            type="email"
            placeholder="Entrez votre Email..."
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
          />
          <S.NewsletterButton type="submit">Valider</S.NewsletterButton>
          {newsletterSuccess && <S.SuccessMessage>Inscription réussie !</S.SuccessMessage>}
          {newsletterError && <S.ErrorMessage>{newsletterError}</S.ErrorMessage>}
        </S.BlackBox>
      </S.SixthSection>
      <Footer top={{ base: "600vh", phone: "auto", tablet: "500vh" }} />
    </S.Container>
  );
};

/*
 * PARTIE 4 : EXPORTATION
 * Cette partie permet d’utiliser ce composant dans d’autres fichiers.
 */
export default Home; // Exporte la fonction "Home" pour qu’elle soit réutilisable ailleurs


/* <ImageBlockSection top="400vh" imageUrl="/Connectify/PageContact/fd_contact.jpg" bgColor="#20835D" paddingTop="2rem">
        <S.ContactTitle>Nous contacter</S.ContactTitle>
        <S.ContactBox as="form">
          <S.FormLabel>Email:</S.FormLabel>
          <S.FormInput type="email" placeholder="Entrez votre Email..." />
          <S.FormLabel>Sujet:</S.FormLabel>
          <S.FormInput type="text" placeholder="Sujet de votre message..." />
          <S.FormLabel>Message:</S.FormLabel>
          <S.FormTextarea placeholder="Ecrivez votre message..." />
          <S.SubmitButton type="submit">Envoyer</S.SubmitButton>
        </S.ContactBox>
      </ImageBlockSection> */