// src/components/Shared/MessageWallComponent.js
// Ce fichier contient le composant MessageWallComponent, qui affiche un mur de messages.
// Il permet d’envoyer des messages texte ou des images, stockés dans Firebase Realtime Database.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer, styliser et gérer les données du composant.
 */
import React, { useState, useEffect } from "react"; // Importe React pour créer le composant, useState pour les états, useEffect pour les actions au chargement
import styled from "styled-components"; // Importe styled-components pour écrire du CSS dans JavaScript
import { theme } from "./Theme"; // Importe un fichier Theme.js avec des couleurs et polices définies
import { auth, rtdb } from "../../firebase"; // Importe l’authentification (auth) et la base de données en temps réel (rtdb) depuis firebase.js
import { ref, push, onValue } from "firebase/database"; // Importe des fonctions Firebase : ref (référence), push (ajouter), onValue (lire)

/*
 * PARTIE 2 : STYLES DU COMPOSANT MESSAGE WALL
 * Cette partie définit les styles pour le conteneur, le titre, la boîte de messages, et la zone d’entrée.
 */
const MessageWallWrapper = styled.div` // Crée un style nommé "MessageWallWrapper" pour une balise <div>
  display: flex; // Utilise Flexbox pour organiser les éléments
  flex-direction: column; // Place les éléments les uns sous les autres
  align-items: center; // Centre les éléments horizontalement
  width: 100%; // Prend toute la largeur disponible
`;

const MessageTitle = styled.h2` // Crée un style nommé "MessageTitle" pour une balise <h2>
  font-family: ${theme.fonts.chicle}; // Utilise la police "Chicle" du thème
  font-size: 2rem; // Définit une taille de texte de 2 fois la taille de base (32px)
  color: ${theme.colors.yellow}; // Applique la couleur jaune du thème
  margin-bottom: 0.5rem; // Ajoute 0.5rem (8px) d’espace en bas
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 1.5rem; // Réduit la taille à 1.5 fois la taille de base (24px)
    margin-bottom: 0.3rem; // Réduit l’espace en bas à 0.3rem (4.8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 1.8rem; // Ajuste la taille à 1.8 fois la taille de base (28.8px)
  }
`;

const MessageBox = styled.div` // Crée un style nommé "MessageBox" pour une balise <div>
  width: 80%; // Définit la largeur à 80% de l’espace disponible
  height: 50vh; // Définit la hauteur à 50% de l’écran
  overflow-y: auto; // Ajoute un défilement vertical si le contenu dépasse
  background: #f0f0f0; // Applique une couleur gris clair comme fond
  border-radius: 10px; // Arrondit les coins de 10 pixels
  padding: 1rem; // Ajoute 1rem (16px) d’espace intérieur
  margin-bottom: 0.5rem; // Ajoute 0.5rem (8px) d’espace en bas
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 90%; // Étend la largeur à 90%
    height: 30vh; // Réduit la hauteur à 30% de l’écran
    padding: 0.5rem; // Réduit l’espace intérieur à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 85%; // Ajuste la largeur à 85%
    height: 40vh; // Ajuste la hauteur à 40% de l’écran
  }
`;

const MessageInputContainer = styled.div` // Crée un style nommé "MessageInputContainer" pour une balise <div>
  width: 80%; // Définit la largeur à 80% de l’espace disponible
  background: ${theme.colors.lightGreen}; // Applique une couleur vert clair du thème comme fond
  padding: 0.5rem; // Ajoute 0.5rem (8px) d’espace intérieur
  border-radius: 10px; // Arrondit les coins de 10 pixels
  display: flex; // Utilise Flexbox pour organiser les éléments
  align-items: center; // Centre les éléments verticalement
  gap: 0.3rem; // Ajoute 0.3rem (4.8px) d’espace entre les éléments
  flex-wrap: wrap; // Permet aux éléments de passer à la ligne si nécessaire
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 90%; // Étend la largeur à 90%
    padding: 0.3rem; // Réduit l’espace intérieur à 0.3rem (4.8px)
    gap: 0.2rem; // Réduit l’espace entre les éléments à 0.2rem (3.2px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 85%; // Ajuste la largeur à 85%
    padding: 0.4rem; // Ajuste l’espace intérieur à 0.4rem (6.4px)
  }
`;

const MessageInput = styled.input` // Crée un style nommé "MessageInput" pour une balise <input>
  flex: 1; // Prend tout l’espace disponible dans le conteneur
  padding: 0.3rem; // Ajoute 0.3rem (4.8px) d’espace intérieur
  border: none; // Enlève la bordure pour un look propre
  border-radius: 5px; // Arrondit les coins de 5 pixels
  min-width: 0; // Permet au champ de rétrécir sans forcer une largeur minimale
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    padding: 0.2rem; // Réduit l’espace intérieur à 0.2rem (3.2px)
    font-size: 0.9rem; // Réduit la taille à 0.9 fois la taille de base (14.4px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    padding: 0.25rem; // Ajuste l’espace intérieur à 0.25rem (4px)
  }
`;

const SendButton = styled.button` // Crée un style nommé "SendButton" pour une balise <button>
  background: ${theme.colors.yellow}; // Applique une couleur jaune du thème comme fond
  color: ${theme.colors.white}; // Applique la couleur blanche pour le texte
  padding: 0.3rem 0.6rem; // Ajoute 0.3rem (4.8px) en haut/bas, 0.6rem (9.6px) à gauche/droite
  border: none; // Enlève la bordure pour un look propre
  border-radius: 5px; // Arrondit les coins de 5 pixels
  cursor: pointer; // Change le curseur en main pour indiquer qu’on peut cliquer
  white-space: nowrap; // Empêche le texte de passer à la ligne
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    padding: 0.2rem 0.4rem; // Réduit l’espace à 0.2rem (3.2px) en haut/bas, 0.4rem (6.4px) à gauche/droite
    font-size: 0.8rem; // Réduit la taille à 0.8 fois la taille de base (12.8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    padding: 0.25rem 0.5rem; // Ajuste l’espace à 0.25rem (4px) en haut/bas, 0.5rem (8px) à gauche/droite
  }
`;

const AttachmentImage = styled.img` // Crée un style nommé "AttachmentImage" pour une balise <img>
  max-width: 200px; // Limite la largeur maximale à 200 pixels
  width: 100%; // Prend toute la largeur disponible jusqu’à la limite
  height: auto; // Ajuste la hauteur proportionnellement
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    max-width: 150px; // Réduit la largeur maximale à 150 pixels
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    max-width: 180px; // Ajuste la largeur maximale à 180 pixels
  }
`;

/*
 * PARTIE 3 : LOGIQUE DU COMPOSANT MESSAGE WALL
 * Cette partie définit la logique pour afficher, ajouter et gérer les messages.
 */
const MessageWallComponent = () => { // Crée une fonction "MessageWallComponent" qui est le composant principal
  const [messages, setMessages] = useState([]); // Crée une variable "messages" (tableau vide) et "setMessages" pour les messages
  const [newMessage, setNewMessage] = useState(""); // Crée une variable "newMessage" (vide) et "setNewMessage" pour le texte du nouveau message
  const [file, setFile] = useState(null); // Crée une variable "file" (null) et "setFile" pour une pièce jointe
  const [errorMessage, setErrorMessage] = useState(""); // Crée une variable "errorMessage" (vide) et "setErrorMessage" pour les messages d’erreur
  const user = auth.currentUser; // Récupère l’utilisateur actuellement connecté

  /*
   * Description de la fonction useEffect (ici utilisée anonymement) :
   * Cette fonction s’exécute au chargement pour récupérer les messages de l’utilisateur depuis Firebase.
   * Elle écoute les changements dans la base de données et met à jour la liste des messages.
   * Arguments :
   * - Aucun argument explicite, mais dépend de "user" dans le tableau de dépendances.
   * Retour :
   * - Ne retourne rien directement, mais modifie l’état "messages".
   */
  useEffect(() => { // Crée un effet avec useEffect pour exécuter du code au chargement
    if (user) { // Vérifie si un utilisateur est connecté
      const messagesRef = ref(rtdb, `profileMessages/${user.uid}/messages`); // Crée une référence à la table des messages de l’utilisateur dans Firebase
      onValue(messagesRef, (snapshot) => { // Écoute les changements dans cette table, "snapshot" contient les données actuelles
        const data = snapshot.val(); // Récupère les données brutes de Firebase sous forme d’objet
        if (data) { // Si des données existent
          const messageList = Object.entries(data).map(([id, value]) => ({ id, ...value })); // Transforme l’objet en tableau de messages avec leurs ID
          setMessages(messageList); // Met à jour "messages" avec la liste
        } else { // Si aucune donnée n’existe
          setMessages([{ id: "default", text: "Aucun message pour l’instant", timestamp: new Date().toISOString() }]); // Ajoute un message par défaut
        }
      }, (error) => { // Si une erreur se produit lors de la lecture
        console.error("Erreur lors du chargement des messages :", error); // Affiche l’erreur dans la console
      });
    }
  }, [user]); // Dépendance "user" : l’effet se relance si "user" change

  /*
   * Description de la fonction fileToBase64 :
   * Cette fonction convertit un fichier image en texte base64 pour l’envoyer à Firebase comme pièce jointe.
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
   * Description de la fonction sendMessage :
   * Cette fonction gère l’envoi d’un nouveau message ou d’une image à Firebase.
   * Elle vérifie si l’utilisateur est connecté et si le message ou la pièce jointe est valide.
   * Arguments :
   * - Aucun argument explicite (utilise les états "newMessage" et "file").
   * Retour :
   * - Ne retourne rien, mais modifie les états "newMessage", "file", "errorMessage" et ajoute un message dans Firebase.
   */
  const sendMessage = async () => { // Crée une fonction "sendMessage" pour envoyer un message, "async" pour attendre des actions lentes
    if (!user) { // Vérifie si aucun utilisateur n’est connecté
      console.log("Utilisateur non connecté"); // Affiche un message dans la console
      setErrorMessage("Vous devez être connecté"); // Met un message d’erreur
      return; // Sort de la fonction
    }
    if (!newMessage.trim() && !file) { // Vérifie si le message est vide (après suppression des espaces) et s’il n’y a pas de fichier
      console.log("Rien à envoyer par l'utilisateur"); // Affiche un message dans la console
      setErrorMessage("Rien à envoyer"); // Met un message d’erreur
      return; // Sort de la fonction
    }
    const messageData = { // Crée un objet "messageData" pour structurer le message
      senderId: user.uid, // Ajoute l’ID de l’utilisateur comme expéditeur
      text: newMessage || "", // Ajoute le texte du message, ou une chaîne vide si aucun texte
      timestamp: new Date().toISOString(), // Ajoute l’heure actuelle au format ISO
      attachment: null // Initialise la pièce jointe à null
    };
    try { // Essaie d’exécuter le code suivant et attrape les erreurs
      if (file) { // Vérifie s’il y a une pièce jointe
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"]; // Crée une liste des types d’images acceptés
        if (!validImageTypes.includes(file.type)) { // Vérifie si le type du fichier n’est pas dans la liste
          setErrorMessage("Seules les images JPEG, PNG ou GIF sont acceptées"); // Met un message d’erreur
          throw new Error("Seules les images JPEG, PNG ou GIF sont acceptées"); // Lance une erreur pour arrêter
        }
        if (file.size > 7 * 1024 * 1024) { // Vérifie si le fichier dépasse 7 mégaoctets
          setErrorMessage("L’image dépasse la limite de 7 Mo"); // Met un message d’erreur
          throw new Error("L’image dépasse la limite de 7 Mo"); // Lance une erreur pour arrêter
        }
        const base64Image = await fileToBase64(file); // Convertit le fichier en base64 et attend le résultat
        messageData.attachment = base64Image; // Ajoute l’image base64 comme pièce jointe
      }
      await push(ref(rtdb, `profileMessages/${user.uid}/messages`), messageData); // Ajoute le message à Firebase et attend la confirmation
      console.log(`Message envoyé par ${user.uid}: texte "${messageData.text}", pièce jointe ${file ? file.name : "aucune"}`); // Affiche un message de succès
      setNewMessage(""); // Remet "newMessage" à vide
      setFile(null); // Remet "file" à null
      setErrorMessage(""); // Efface le message d’erreur
    } catch (error) { // Attrape une erreur si elle se produit
      console.error(`Erreur lors de l’envoi du message par ${user.uid}:`, error); // Affiche l’erreur dans la console
      setErrorMessage(error.message); // Met le message d’erreur dans "errorMessage"
    }
  };

  /*
   * Description de la fonction handleFileChange :
   * Cette fonction est appelée quand l’utilisateur sélectionne un fichier via l’input.
   * Elle vérifie si le fichier est une image valide et ne dépasse pas 7 Mo, puis met à jour l’état.
   * Arguments :
   * - e : un objet événement qui contient le fichier sélectionné.
   * Retour :
   * - Ne retourne rien, mais modifie les états "file" et "errorMessage".
   */
  const handleFileChange = (e) => { // Crée une fonction "handleFileChange" pour gérer la sélection d’un fichier
    const file = e.target.files[0]; // Récupère le premier fichier sélectionné dans le champ
    if (file) { // Si un fichier est sélectionné
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"]; // Crée une liste des types d’images acceptés
      if (!validImageTypes.includes(file.type)) { // Vérifie si le type n’est pas dans la liste
        setErrorMessage("Seules les images JPEG, PNG ou GIF sont acceptées"); // Met un message d’erreur
        setFile(null); // Remet "file" à null
      } else if (file.size > 7 * 1024 * 1024) { // Vérifie si le fichier dépasse 7 mégaoctets
        setErrorMessage("L’image dépasse la limite de 7 Mo"); // Met un message d’erreur
        setFile(null); // Remet "file" à null
      } else { // Si le fichier est valide
        setFile(file); // Met à jour "file" avec le fichier sélectionné
        setErrorMessage(""); // Efface le message d’erreur
      }
    }
  };

  /*
   * PARTIE 4 : RENDU JSX DU COMPOSANT
   * Cette partie affiche le mur de messages avec un titre, une boîte de messages, et une zone d’entrée.
   */
  return (
    <MessageWallWrapper>
      {/* PARTIE 4.1 : TITRE
         Cette sous-partie affiche le titre "My Walls" */}
      <MessageTitle>My Walls</MessageTitle>

      {/* PARTIE 4.2 : BOÎTE DE MESSAGES
         Cette sous-partie affiche la liste des messages avec texte et pièces jointes */}
      <MessageBox>
        {messages.map((msg) => ( // Parcourt chaque message dans "messages"
          <div key={msg.id}> {/* Utilise l’ID comme clé unique pour React */}
            {msg.text && <p>{msg.text}</p>} {/* Affiche le texte s’il existe */}
            {msg.attachment && ( // Condition : affiche l’image si une pièce jointe existe
              <AttachmentImage 
                src={msg.attachment} // URL base64 de l’image
                alt="Attachment" // Texte alternatif pour l’accessibilité
              />
            )}
            <small>{new Date(msg.timestamp).toLocaleTimeString()}</small> {/* Affiche l’heure du message au format local */}
          </div>
        ))}
      </MessageBox>

      {/* PARTIE 4.3 : ZONE D’ENTRÉE
         Cette sous-partie affiche un champ texte, un input fichier, et des boutons pour envoyer */}
      <MessageInputContainer>
        <MessageInput
          value={newMessage} // Lie la valeur au texte saisi dans "newMessage"
          onChange={(e) => setNewMessage(e.target.value)} // Met à jour "newMessage" à chaque saisie
          placeholder="Écrire un message..." // Texte indicatif quand le champ est vide
        />
        <input 
          type="file" 
          accept="image/*" // Limite la sélection aux fichiers image (JPEG, PNG, GIF)
          onChange={handleFileChange} // Appelle handleFileChange quand un fichier est sélectionné
        />
        <SendButton onClick={sendMessage}>Envoyer</SendButton> {/* Bouton pour envoyer le message */}
        <SendButton>Partager</SendButton> {/* Bouton placeholder pour une fonctionnalité future */}
        {/* Affiche un message d’erreur en rouge si "errorMessage" n’est pas vide */}
        {errorMessage && (
          <p style={{ color: "red", fontSize: "0.8rem" }}>
            {errorMessage} {/* Montre le message spécifique, ex. "Vous devez être connecté" */}
          </p>
        )}
      </MessageInputContainer>
    </MessageWallWrapper>
  );
};

/*
 * PARTIE 5 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default MessageWallComponent; // Exporte la fonction "MessageWallComponent" pour qu’elle soit réutilisable ailleurs