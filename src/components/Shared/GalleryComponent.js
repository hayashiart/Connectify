// src/components/Shared/GalleryComponent.js
// Ce fichier contient le composant GalleryComponent, qui affiche une galerie d’images.
// Il permet d’ajouter, supprimer et agrandir des images, en utilisant Firebase pour stocker les données.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer, styliser et gérer les données du composant.
 */
import React, { useState, useEffect } from "react"; // Importe React pour créer le composant, useState pour les variables qui changent, useEffect pour les actions au chargement
import styled, { keyframes } from "styled-components"; // Importe styled-components pour le style et keyframes pour les animations
import { ref, push, onValue, remove } from "firebase/database"; // Importe des fonctions Firebase : ref (référence), push (ajouter), onValue (lire), remove (supprimer)
import { auth, rtdb } from "../../firebase"; // Importe l’authentification (auth) et la base de données en temps réel (rtdb) depuis un fichier firebase.js
import { theme } from "../Shared/Theme"; // Importe un fichier Theme.js avec des couleurs et polices définies

/*
 * PARTIE 2 : ANIMATION ET FILTRE DES PROPRIÉTÉS
 * Cette partie définit une animation pour agrandir les images et filtre les propriétés personnalisées.
 */
const fadeInScale = keyframes` // Crée une animation nommée "fadeInScale" pour agrandir une image
  from { // Point de départ de l’animation
    opacity: 0; // L’image est invisible (opacité 0)
    transform: translate(-50%, -50%) scale(0.8); // Déplace l’image au centre (-50%) et la réduit à 80% de sa taille
  }
  to { // Point d’arrivée de l’animation
    opacity: 1; // L’image devient complètement visible (opacité 100%)
    transform: translate(-50%, -50%) scale(1); // L’image est centrée et à sa taille normale (100%)
  }
`;

const shouldForwardProp = (prop) => !["top", "imageUrl", "bgColor", "marginBottom", "paddingTop", "align", "isValid", "gap"].includes(prop); // Crée une fonction qui retourne vrai si "prop" n’est pas dans la liste, pour éviter des erreurs dans le DOM

/*
 * PARTIE 3 : STYLES DU COMPOSANT GALERIE
 * Cette partie définit les styles pour le titre, la grille d’images, et les éléments d’upload.
 */
const GalleryTitle = styled.h2.withConfig({ shouldForwardProp })` // Crée un style nommé "GalleryTitle" pour une balise <h2>, avec le filtre des props
  font-family: ${theme.fonts.chicle}; // Utilise la police "Chicle" définie dans le thème
  font-size: 2rem; // Définit une taille de texte de 2 fois la taille de base (32px)
  color: ${theme.colors.yellow}; // Applique la couleur jaune du thème
  margin: 1rem 0; // Ajoute 1rem (16px) d’espace au-dessus et en dessous
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 1.5rem; // Réduit la taille à 1.5 fois la taille de base (24px)
    margin: 0.5rem 0; // Réduit l’espace à 0.5rem (8px) au-dessus et en dessous
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 1.8rem; // Ajuste la taille à 1.8 fois la taille de base (28.8px)
  }
`;

const GalleryContainer = styled.div.withConfig({ shouldForwardProp })` // Crée un style nommé "GalleryContainer" pour une balise <div>, avec le filtre des props
  display: grid; // Utilise une grille CSS pour organiser les images
  grid-template-columns: repeat(2, 1fr); // Crée 2 colonnes de même taille (1fr = une fraction égale)
  grid-gap: 0; // Définit aucun espace entre les éléments de la grille
  width: 80%; // Définit la largeur à 80% de l’espace disponible
  margin-top: 2rem; // Ajoute 2rem (32px) d’espace au-dessus
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    grid-template-columns: 1fr; // Passe à 1 seule colonne
    width: 90%; // Étend à 90% pour plus d’espace
    margin-top: 1rem; // Réduit l’espace au-dessus à 1rem (16px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 85%; // Ajuste la largeur à 85%
    margin-top: 1.5rem; // Ajuste l’espace au-dessus à 1.5rem (24px)
  }
`;

const GalleryImageWrapper = styled.div.withConfig({ shouldForwardProp })` // Crée un style nommé "GalleryImageWrapper" pour une balise <div>, avec le filtre des props
  position: relative; // Permet de positionner des éléments (comme un bouton) par rapport à cette boîte
  width: 300px; // Définit une largeur fixe de 300 pixels
  height: 300px; // Définit une hauteur fixe de 300 pixels
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 100%; // Prend toute la largeur disponible
    height: 200px; // Réduit la hauteur à 200 pixels
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 250px; // Ajuste la largeur à 250 pixels
    height: 250px; // Ajuste la hauteur à 250 pixels
  }
`;

const DeleteButton = styled.button.withConfig({ shouldForwardProp })` // Crée un style nommé "DeleteButton" pour une balise <button>, avec le filtre des props
  position: absolute; // Positionne le bouton précisément dans son conteneur
  top: 5px; // Place le haut du bouton à 5 pixels du haut du conteneur
  right: 5px; // Place la droite du bouton à 5 pixels de la droite du conteneur
  background: red; // Définit un fond rouge pour le bouton
  color: white; // Définit la couleur du texte en blanc pour contraste
  border: none; // Enlève la bordure pour un look simple
  border-radius: 50%; // Rend le bouton rond avec un rayon de 50%
  width: 20px; // Définit une largeur de 20 pixels
  height: 20px; // Définit une hauteur de 20 pixels
  cursor: pointer; // Change le curseur en main pour indiquer qu’on peut cliquer
  font-size: 12px; // Définit une taille de texte de 12 pixels
  display: flex; // Utilise Flexbox pour centrer le contenu du bouton
  align-items: center; // Centre le contenu verticalement
  justify-content: center; // Centre le contenu horizontalement
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 16px; // Réduit la largeur à 16 pixels
    height: 16px; // Réduit la hauteur à 16 pixels
    font-size: 10px; // Réduit la taille du texte à 10 pixels
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 18px; // Ajuste la largeur à 18 pixels
    height: 18px; // Ajuste la hauteur à 18 pixels
  }
`;

const EnlargedImage = styled.img.withConfig({ shouldForwardProp })` // Crée un style nommé "EnlargedImage" pour une balise <img>, avec le filtre des props
  position: fixed; // Fixe l’image en place, elle reste visible même en défilant
  top: 50%; // Place le haut de l’image à 50% de l’écran
  left: 50%; // Place la gauche de l’image à 50% de l’écran
  transform: translate(-50%, -50%); // Déplace l’image de -50% en haut et à gauche pour la centrer parfaitement
  width: 80vw; // Définit la largeur à 80% de la largeur de l’écran (vw = viewport width)
  max-height: 80vh; // Limite la hauteur maximale à 80% de la hauteur de l’écran (vh = viewport height)
  object-fit: contain; // Ajuste l’image pour qu’elle rentre dans la zone sans être coupée
  z-index: 1000; // Place l’image loin devant tous les autres éléments (niveau 1000)
  cursor: zoom-out; // Change le curseur en "zoom-out" pour indiquer qu’on peut réduire
  animation: ${fadeInScale} 0.3s ease-in-out; // Applique l’animation "fadeInScale" pendant 0.3 seconde avec un effet doux
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 90vw; // Étend la largeur à 90% de l’écran
    max-height: 70vh; // Réduit la hauteur maximale à 70% de l’écran
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 85vw; // Ajuste la largeur à 85% de l’écran
    max-height: 75vh; // Ajuste la hauteur maximale à 75% de l’écran
  }
`;

const UploadContainer = styled.div` // Crée un style nommé "UploadContainer" pour une balise <div>
  display: flex; // Utilise Flexbox pour organiser les éléments
  justify-content: center; // Centre les éléments horizontalement
  margin-bottom: 1rem; // Ajoute 1rem (16px) d’espace en bas
  width: 100%; // Prend toute la largeur disponible
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    flex-direction: column; // Place les éléments les uns sous les autres (en colonne)
    gap: 0.3rem; // Ajoute 0.3rem (4.8px) d’espace entre les éléments
    margin-bottom: 0.5rem; // Réduit l’espace en bas à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    gap: 0.4rem; // Ajuste l’espace entre les éléments à 0.4rem (6.4px)
  }
`;

const UploadWrapper = styled.div` // Crée un style nommé "UploadWrapper" pour une balise <div>
  display: flex; // Utilise Flexbox pour organiser les éléments
  flex-direction: column; // Place les éléments les uns sous les autres (en colonne)
  align-items: center; // Centre les éléments horizontalement
  gap: 0.5rem; // Ajoute 0.5rem (8px) d’espace entre les éléments
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    gap: 0.3rem; // Réduit l’espace entre les éléments à 0.3rem (4.8px)
  }
`;

/*
 * PARTIE 4 : LOGIQUE DU COMPOSANT GALERIE
 * Cette partie contient la logique pour gérer l’affichage, l’ajout et la suppression des images.
 */
const GalleryComponent = () => { // Crée une fonction "GalleryComponent" qui est le composant principal
  const [galleryImages, setGalleryImages] = useState([]); // Crée une variable "galleryImages" (tableau vide) et "setGalleryImages" pour stocker les images
  const [file, setFile] = useState(null); // Crée une variable "file" (null au départ) et "setFile" pour le fichier sélectionné
  const [enlargedImage, setEnlargedImage] = useState(null); // Crée une variable "enlargedImage" (null) et "setEnlargedImage" pour l’image agrandie
  const [errorMessage, setErrorMessage] = useState(""); // Crée une variable "errorMessage" (vide) et "setErrorMessage" pour les messages d’erreur

  /*
   * Description de la fonction useEffect (ici utilisée anonymement) :
   * Cette fonction s’exécute une fois quand le composant est chargé pour récupérer les images depuis Firebase.
   * Elle écoute les changements d’authentification et met à jour les images affichées en prenant 4 images aléatoires.
   * Arguments :
   * - Aucun argument explicite, mais elle utilise une fonction interne avec "currentUser".
   * Retour :
   * - Retourne une fonction pour arrêter l’écouteur quand le composant est démonté.
   */
  useEffect(() => { // Crée un effet avec useEffect pour exécuter du code au chargement du composant
    const unsubscribe = auth.onAuthStateChanged((currentUser) => { // Écoute les changements de connexion avec auth, "currentUser" est l’utilisateur actuel
      if (currentUser) { // Si un utilisateur est connecté
        const galleryRef = ref(rtdb, "galleryImagesNew"); // Crée une référence à la table "galleryImagesNew" dans Firebase
        onValue(galleryRef, (snapshot) => { // Écoute les changements dans cette table, "snapshot" contient les données actuelles
          const data = snapshot.val(); // Récupère les données brutes de Firebase sous forme d’objet
          if (data) { // Si des données existent
            const allImages = Object.entries(data).map(([id, value]) => ({ id, ...value })); // Transforme l’objet en tableau d’images avec leurs ID
            const shuffled = allImages.sort(() => 0.5 - Math.random()); // Mélange les images aléatoirement avec un algorithme simple
            setGalleryImages(shuffled.slice(0, 4)); // Garde les 4 premières images et met à jour "galleryImages"
          } else { // Si aucune donnée n’existe
            setGalleryImages([]); // Remet "galleryImages" à un tableau vide
          }
        }, (error) => { // Si une erreur se produit lors de la lecture
          console.error("Erreur lors du chargement des images :", error); // Affiche l’erreur dans la console
        });
      }
    });
    return () => unsubscribe(); // Retourne une fonction qui arrête l’écouteur quand le composant est démonté
  }, []); // Tableau vide signifie que l’effet ne s’exécute qu’une fois au chargement

  /*
   * Description de la fonction fileToBase64 :
   * Cette fonction convertit un fichier image en texte base64 pour l’envoyer à Firebase.
   * Elle utilise un FileReader pour lire le fichier de manière asynchrone.
   * Arguments :
   * - file : le fichier image sélectionné par l’utilisateur.
   * Retour :
   * - Retourne une promesse qui donne le texte base64 si réussi, ou une erreur si échoué.
   */
  const fileToBase64 = (file) => { // Crée une fonction "fileToBase64" pour convertir un fichier en texte base64
    return new Promise((resolve, reject) => { // Retourne une promesse pour gérer une action qui prend du temps
      const reader = new FileReader(); // Crée un objet "reader" pour lire le fichier
      reader.readAsDataURL(file); // Demande à "reader" de lire le fichier comme une URL base64
      reader.onload = () => resolve(reader.result); // Quand la lecture est finie, envoie le résultat (base64)
      reader.onerror = (error) => reject(error); // Si une erreur se produit, envoie l’erreur
    });
  };

  /*
   * Description de la fonction handleAddImage :
   * Cette fonction gère l’ajout d’une nouvelle image dans la galerie.
   * Elle vérifie si le fichier est valide (type et taille), le convertit en base64, et l’envoie à Firebase.
   * Arguments :
   * - Aucun argument explicite (utilise l’état "file").
   * Retour :
   * - Ne retourne rien, mais modifie les états "file", "errorMessage" et ajoute une image dans Firebase.
   */
  const handleAddImage = async () => { // Crée une fonction "handleAddImage" pour ajouter une image, "async" pour attendre des actions lentes
    if (!file) { // Vérifie si aucun fichier n’est sélectionné
      console.log("Aucune image sélectionnée par l'utilisateur"); // Affiche un message dans la console
      setErrorMessage("Aucune image sélectionnée"); // Met un message d’erreur dans "errorMessage"
      return; // Sort de la fonction si aucun fichier
    }
    try { // Essaie d’exécuter le code suivant et attrape les erreurs
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"]; // Crée une liste des types d’images acceptés
      if (!validImageTypes.includes(file.type)) { // Vérifie si le type du fichier n’est pas dans la liste
        setErrorMessage("Seules les images JPEG, PNG ou GIF sont acceptées"); // Met un message d’erreur
        throw new Error("Seules les images JPEG, PNG ou GIF sont acceptées"); // Lance une erreur pour arrêter
      }
      if (file.size > 7 * 1024 * 1024) { // Vérifie si le fichier est plus grand que 7 mégaoctets (7 * 1024 * 1024 bytes)
        setErrorMessage("L’image dépasse la limite de 7 Mo"); // Met un message d’erreur
        throw new Error("L’image dépasse la limite de 7 Mo"); // Lance une erreur pour arrêter
      }
      const base64Image = await fileToBase64(file); // Convertit le fichier en base64 et attend le résultat
      const imageData = { url: base64Image }; // Crée un objet avec l’URL base64 de l’image
      const userId = auth.currentUser?.uid || "unknown"; // Récupère l’ID de l’utilisateur connecté, ou "unknown" si aucun
      await push(ref(rtdb, "galleryImagesNew"), imageData); // Ajoute l’image à Firebase et attend la confirmation
      console.log(`Image ajoutée par ${userId}: taille ${file.size} octets`); // Affiche un message de succès dans la console
      setFile(null); // Remet "file" à null pour vider la sélection
      setErrorMessage(""); // Efface le message d’erreur
    } catch (error) { // Attrape une erreur si elle se produit
      console.error(`Erreur lors de l’ajout de l’image par ${auth.currentUser?.uid || "unknown"}:`, error); // Affiche l’erreur dans la console
      setErrorMessage(error.message); // Met le message d’erreur dans "errorMessage"
    }
  };

  /*
   * Description de la fonction handleDeleteImage :
   * Cette fonction supprime une image de la galerie dans Firebase.
   * Elle vérifie aussi si l’image supprimée était agrandie pour la retirer de l’affichage.
   * Arguments :
   * - imageId : l’identifiant unique de l’image à supprimer.
   * Retour :
   * - Ne retourne rien, mais modifie Firebase et potentiellement l’état "enlargedImage".
   */
  const handleDeleteImage = async (imageId) => { // Crée une fonction "handleDeleteImage" pour supprimer une image, "async" pour attendre
    try { // Essaie d’exécuter le code suivant
      const userId = auth.currentUser?.uid || "unknown"; // Récupère l’ID de l’utilisateur connecté, ou "unknown" si aucun
      await remove(ref(rtdb, `galleryImagesNew/${imageId}`)); // Supprime l’image de Firebase avec son ID et attend la confirmation
      console.log(`Image supprimée par ${userId}: ID ${imageId}`); // Affiche un message de succès dans la console
      if (enlargedImage && enlargedImage.id === imageId) setEnlargedImage(null); // Si l’image agrandie est celle supprimée, remet "enlargedImage" à null
    } catch (error) { // Attrape une erreur si elle se produit
      console.error(`Erreur lors de la suppression de l’image par ${auth.currentUser?.uid || "unknown"}:`, error); // Affiche l’erreur dans la console
    }
  };

  /*
   * Description de la fonction handleFileChange :
   * Cette fonction est appelée quand l’utilisateur sélectionne un fichier via l’input.
   * Elle vérifie si le fichier est valide (type et taille) et met à jour l’état "file".
   * Arguments :
   * - e : un objet événement qui contient le fichier sélectionné.
   * Retour :
   * - Ne retourne rien, mais modifie les états "file" et "errorMessage".
   */
  const handleFileChange = (e) => { // Crée une fonction "handleFileChange" pour gérer la sélection d’un fichier
    const file = e.target.files[0]; // Récupère le premier fichier sélectionné dans le champ (e.target est le champ, files[0] est le fichier)
    if (file) { // Si un fichier est sélectionné
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"]; // Crée une liste des types d’images acceptés
      if (!validImageTypes.includes(file.type)) { // Vérifie si le type du fichier n’est pas dans la liste
        setErrorMessage("Seules les images JPEG, PNG ou GIF sont acceptées"); // Met un message d’erreur
        setFile(null); // Remet "file" à null pour vider la sélection
      } else if (file.size > 7 * 1024 * 1024) { // Vérifie si le fichier dépasse 7 mégaoctets
        setErrorMessage("L’image dépasse la limite de 7 Mo"); // Met un message d’erreur
        setFile(null); // Remet "file" à null pour vider la sélection
      } else { // Si le fichier est valide
        setFile(file); // Met à jour "file" avec le fichier sélectionné
        setErrorMessage(""); // Efface le message d’erreur
      }
    }
  };

  /*
   * Description de la fonction handleImageClick :
   * Cette fonction gère le clic sur une image pour l’agrandir ou la réduire.
   * Si l’image est déjà agrandie, elle la réduit, sinon elle l’agrandit.
   * Arguments :
   * - image : l’objet image cliquée (contient id et url).
   * Retour :
   * - Ne retourne rien, mais modifie l’état "enlargedImage".
   */
  const handleImageClick = (image) => { // Crée une fonction "handleImageClick" pour gérer le clic sur une image
    setEnlargedImage(enlargedImage && enlargedImage.id === image.id ? null : image); // Si l’image est déjà agrandie, la réduit (null), sinon l’agrandit
  };

  /*
   * PARTIE 5 : RENDU JSX DU COMPOSANT
   * Cette partie affiche la galerie avec ses éléments (titre, upload, images, image agrandie).
   */
  return (
    <div>
      {/* PARTIE 5.1 : TITRE ET ZONE D’UPLOAD
         Cette sous-partie affiche le titre "Gallery" et la zone pour ajouter une image */}
      <GalleryTitle>Gallery</GalleryTitle>
      <UploadContainer>
        <UploadWrapper>
          <input 
            type="file" 
            accept="image/*" // Limite la sélection aux fichiers image (JPEG, PNG, GIF, etc.)
            onChange={handleFileChange} // Appelle handleFileChange quand un fichier est sélectionné
            style={{ display: "block" }} // Force l’input à être visible sur une ligne complète
          />
          <button 
            onClick={handleAddImage} // Appelle handleAddImage quand on clique pour ajouter l’image
            style={{ display: "block" }} // Force le bouton à être visible sur une ligne complète
          >
            Ajouter Image
          </button>
          {/* Affiche un message d’erreur en rouge si "errorMessage" n’est pas vide */}
          {errorMessage && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errorMessage} {/* Montre le message spécifique, ex. "Seules les images JPEG, PNG ou GIF sont acceptées" */}
            </p>
          )}
        </UploadWrapper>
      </UploadContainer>

      {/* PARTIE 5.2 : GRILLE DES IMAGES
         Cette sous-partie affiche les images dans une grille avec un bouton de suppression */}
      <GalleryContainer>
        {galleryImages.map((image) => ( // Parcourt chaque image dans "galleryImages" avec map
          <GalleryImageWrapper key={image.id}> {/* Utilise l’ID comme clé unique pour React */}
            <img
              src={image.url} // URL base64 de l’image stockée dans Firebase
              alt="Gallery item" // Texte alternatif pour l’accessibilité
              style={{ width: "100%", height: "100%", objectFit: "cover" }} // Style inline pour remplir le conteneur
              onClick={() => handleImageClick(image)} // Appelle handleImageClick pour agrandir/réduire
            />
            <DeleteButton 
              onClick={() => handleDeleteImage(image.id)} // Appelle handleDeleteImage avec l’ID de l’image
            >
              ✖ {/* Symbole de croix pour supprimer */}
            </DeleteButton>
          </GalleryImageWrapper>
        ))}
      </GalleryContainer>

      {/* PARTIE 5.3 : IMAGE AGRANDIE
         Cette sous-partie affiche une version agrandie de l’image cliquée */}
      {enlargedImage && ( // Condition : affiche seulement si "enlargedImage" n’est pas null
        <EnlargedImage
          src={enlargedImage.url} // URL base64 de l’image agrandie
          alt="Enlarged item" // Texte alternatif pour l’accessibilité
          onClick={() => setEnlargedImage(null)} // Réduit l’image en remettant "enlargedImage" à null
        />
      )}
    </div>
  );
};

/*
 * PARTIE 6 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default GalleryComponent; // Exporte la fonction "GalleryComponent" pour qu’elle soit réutilisable ailleurs