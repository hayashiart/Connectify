// src/components/Shared/ProfileBannerComponent.js
// Ce fichier contient le composant ProfileBannerComponent, qui affiche une bannière de profil.
// Il récupère et affiche le nom et prénom de l’utilisateur connecté depuis Firebase Firestore.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer, styliser et gérer les données du composant.
 */
import React, { useState, useEffect } from "react"; // Importe React pour créer le composant, useState pour les états, useEffect pour les actions au chargement
import styled from "styled-components"; // Importe styled-components pour écrire du CSS dans JavaScript
import { theme } from "./Theme"; // Importe un fichier Theme.js avec des couleurs et polices définies
import { auth, db } from "../../firebase"; // Importe l’authentification (auth) et la base de données Firestore (db) depuis firebase.js
import { doc, getDoc } from "firebase/firestore"; // Importe des fonctions Firestore : doc (référence à un document), getDoc (récupérer un document)
import { useNavigate } from "react-router-dom"; // Importe useNavigate pour rediriger l’utilisateur

/*
 * PARTIE 2 : STYLES DU COMPOSANT PROFILE BANNER
 * Cette partie définit les styles pour la bannière, la boîte de profil, l’avatar et le texte.
 */
const ProfileBanner = styled.div` // Crée un style nommé "ProfileBanner" pour une balise <div>
  position: absolute; // Positionne la bannière à un endroit précis
  top: 0; // Place le haut tout en haut de l’écran
  left: 0; // Aligne le bord gauche à l’extrême gauche
  width: 100vw; // Prend toute la largeur de l’écran (vw = viewport width)
  height: 50vh; // Définit la hauteur à 50% de l’écran (vh = viewport height)
  background-image: url("/Connectify/PageProfil/banner_profil.png"); // Utilise une image de bannière comme fond
  background-size: cover; // Ajuste l’image pour couvrir toute la zone
  background-position: center; // Centre l’image dans la bannière
  z-index: 0; // Place la bannière derrière les autres éléments
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    height: 30vh; // Réduit la hauteur à 30% de l’écran
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    height: 40vh; // Ajuste la hauteur à 40% de l’écran
  }
`;

const ProfileBox = styled.div` // Crée un style nommé "ProfileBox" pour une balise <div>
  background: rgba(255, 255, 255, 0.6); // Fond blanc semi-transparent (60% d’opacité)
  width: 80vw; // Définit la largeur à 80% de l’écran
  height: 20vh; // Définit la hauteur à 20% de l’écran
  border-radius: 10px; // Arrondit les coins de 10 pixels
  display: flex; // Utilise Flexbox pour organiser les éléments
  align-items: center; // Centre les éléments verticalement
  position: absolute; // Positionne la boîte précisément dans la bannière
  top: calc(15vh + 2rem); // Place le haut à 15vh + 2rem (32px) pour un décalage
  left: 50%; // Place la gauche à 50% de l’écran
  transform: translateX(-50%); // Déplace la boîte de -50% à gauche pour la centrer
  margin: 0 2rem; // Ajoute 2rem (32px) d’espace à gauche et à droite
  padding: 2rem; // Ajoute 2rem (32px) d’espace intérieur
  z-index: 1; // Place la boîte devant la bannière
  justify-content: flex-start; // Aligne les éléments à gauche
  gap: 0; // Aucun espace entre les éléments
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 90vw; // Étend la largeur à 90% de l’écran
    height: auto; // Ajuste la hauteur au contenu
    flex-direction: column; // Place les éléments les uns sous les autres
    top: calc(10vh + 1rem); // Réduit le décalage à 10vh + 1rem (16px)
    padding: 1rem; // Réduit l’espace intérieur à 1rem (16px)
    margin: 0 1rem; // Réduit l’espace extérieur à 1rem (16px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 85vw; // Ajuste la largeur à 85% de l’écran
    height: 15vh; // Réduit la hauteur à 15% de l’écran
    top: calc(12vh + 1.5rem); // Ajuste le décalage à 12vh + 1.5rem (24px)
    padding: 1.5rem; // Ajuste l’espace intérieur à 1.5rem (24px)
  }
`;

const AvatarCircle = styled.div` // Crée un style nommé "AvatarCircle" pour une balise <div>
  width: 160px; // Définit une largeur fixe de 160 pixels
  height: 160px; // Définit une hauteur fixe de 160 pixels
  background-image: url("/Connectify/PageProfil/avatar.png"); // Utilise une image d’avatar comme fond
  background-size: cover; // Ajuste l’image pour couvrir toute la zone
  background-position: center; // Centre l’image dans le cercle
  border-radius: 50%; // Rend le conteneur rond
  margin-left: 2rem; // Ajoute 2rem (32px) d’espace à gauche
  margin-right: 4rem; // Ajoute 4rem (64px) d’espace à droite
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 100px; // Réduit la largeur à 100 pixels
    height: 100px; // Réduit la hauteur à 100 pixels
    margin: 0 0 1rem 0; // Supprime les marges latérales, ajoute 1rem (16px) en bas
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 120px; // Ajuste la largeur à 120 pixels
    height: 120px; // Ajuste la hauteur à 120 pixels
    margin-left: 1.5rem; // Réduit l’espace à gauche à 1.5rem (24px)
    margin-right: 2rem; // Réduit l’espace à droite à 2rem (32px)
  }
`;

const NameText = styled.p` // Crée un style nommé "NameText" pour une balise <p>
  font-family: ${theme.fonts.inter}; // Utilise la police "Inter" du thème
  font-size: 2rem; // Définit une taille de texte de 2 fois la taille de base (32px)
  color: ${theme.colors.white}; // Applique la couleur blanche pour contraste
  margin: 0; // Supprime les marges par défaut
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 1.5rem; // Réduit la taille à 1.5 fois la taille de base (24px)
    text-align: center; // Centre le texte horizontalement
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 1.8rem; // Ajuste la taille à 1.8 fois la taille de base (28.8px)
  }
`;

/*
 * PARTIE 3 : LOGIQUE DU COMPOSANT PROFILE BANNER
 * Cette partie définit la logique pour récupérer et afficher les données de l’utilisateur.
 */
const ProfileBannerComponent = () => { // Crée une fonction "ProfileBannerComponent" qui est le composant principal
  const [userData, setUserData] = useState(null); // Crée une variable "userData" (null au départ) et "setUserData" pour les données de l’utilisateur
  const navigate = useNavigate(); // Crée une fonction "navigate" pour rediriger l’utilisateur

  /*
   * Description de la fonction useEffect (ici utilisée anonymement) :
   * Cette fonction s’exécute au chargement pour récupérer les données de l’utilisateur depuis Firestore.
   * Elle vérifie si l’utilisateur est connecté et redirige vers "/auth" si ce n’est pas le cas.
   * Arguments :
   * - Aucun argument explicite, mais dépend de "navigate" dans le tableau de dépendances.
   * Retour :
   * - Ne retourne rien directement, mais modifie l’état "userData" ou redirige.
   */
  useEffect(() => { // Crée un effet avec useEffect pour exécuter du code au chargement
    /*
     * Description de la fonction fetchUserData :
     * Cette fonction interne récupère les données de l’utilisateur connecté depuis Firestore.
     * Elle est asynchrone car elle attend une réponse de la base de données.
     * Arguments :
     * - Aucun argument explicite.
     * Retour :
     * - Ne retourne rien, mais modifie "userData" ou redirige via "navigate".
     */
    const fetchUserData = async () => { // Crée une fonction "fetchUserData" pour récupérer les données, "async" pour attendre
      const user = auth.currentUser; // Récupère l’utilisateur actuellement connecté
      if (!user) { // Vérifie si aucun utilisateur n’est connecté
        navigate("/auth"); // Redirige vers la page de connexion
        return; // Sort de la fonction
      }
      try { // Essaie d’exécuter le code suivant et attrape les erreurs
        const userDoc = await getDoc(doc(db, "users", user.uid)); // Récupère le document de l’utilisateur dans Firestore avec son ID
        if (userDoc.exists()) { // Vérifie si le document existe
          setUserData(userDoc.data()); // Met à jour "userData" avec les données (ex. nom, prénom)
        } else { // Si le document n’existe pas
          console.log("Aucune donnée trouvée pour cet utilisateur"); // Affiche un message dans la console
        }
      } catch (err) { // Attrape une erreur si elle se produit
        console.error("Erreur lors de la récupération des données :", err); // Affiche l’erreur dans la console
      }
    };
    fetchUserData(); // Appelle la fonction pour exécuter la récupération
  }, [navigate]); // Dépendance "navigate" : l’effet se relance si "navigate" change

  /*
   * PARTIE 4 : RENDU JSX DU COMPOSANT
   * Cette partie affiche la bannière avec une boîte contenant l’avatar et le nom de l’utilisateur.
   */
  return (
    <ProfileBanner> {/* Affiche la bannière de fond */}
      <ProfileBox> {/* Boîte semi-transparente contenant l’avatar et le nom */}
        <AvatarCircle /> {/* Cercle avec l’image d’avatar par défaut */}
        {userData ? ( // Condition : si "userData" est chargé
          <NameText>{`${userData.nom} ${userData.prenom}`}</NameText> // Affiche "Nom Prénom" de l’utilisateur
        ) : ( // Sinon (en chargement ou erreur)
          <NameText>Chargement...</NameText> // Affiche un texte temporaire
        )}
      </ProfileBox>
    </ProfileBanner>
  );
};

/*
 * PARTIE 5 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default ProfileBannerComponent; // Exporte la fonction "ProfileBannerComponent" pour qu’elle soit réutilisable ailleurs