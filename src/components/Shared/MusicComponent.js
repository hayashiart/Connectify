// src/components/Shared/MusicComponent.js
// Ce fichier contient le composant MusicComponent, qui affiche une liste de musiques aléatoires.
// Il permet d’ajouter de nouveaux fichiers MP3 et les stocke dans Firebase.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les outils nécessaires pour créer, styliser et gérer les données du composant.
 */
import React, { useState, useEffect } from "react"; // Importe React pour créer le composant, useState pour les états, useEffect pour les actions au chargement
import styled from "styled-components"; // Importe styled-components pour écrire du CSS dans JavaScript
import { theme } from "../Shared/Theme"; // Importe un fichier Theme.js avec des couleurs et polices définies
import { auth, rtdb } from "../../firebase"; // Importe l’authentification (auth) et la base de données en temps réel (rtdb) depuis firebase.js
import { ref, push, onValue } from "firebase/database"; // Importe des fonctions Firebase : ref (référence), push (ajouter), onValue (lire)

/*
 * PARTIE 2 : STYLES DU COMPOSANT MUSIC
 * Cette partie définit les styles pour le titre, le conteneur, les éléments audio, et la zone d’upload.
 */
const MusicTitle = styled.h2` // Crée un style nommé "MusicTitle" pour une balise <h2>
  font-family: ${theme.fonts.chicle}; // Utilise la police "Chicle" du thème
  font-size: 2rem; // Définit une taille de texte de 2 fois la taille de base (32px)
  color: ${theme.colors.yellow}; // Applique la couleur jaune du thème
  margin: 1rem 0; // Ajoute 1rem (16px) d’espace au-dessus et en dessous
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    font-size: 1.5rem; // Réduit la taille à 1.5 fois la taille de base (24px)
    margin: 0.5rem 0; // Réduit l’espace à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    font-size: 1.8rem; // Ajuste la taille à 1.8 fois la taille de base (28.8px)
  }
`;

const MusicWrapper = styled.div` // Crée un style nommé "MusicWrapper" pour une balise <div>
  display: flex; // Utilise Flexbox pour organiser les éléments
  flex-direction: column; // Place les éléments les uns sous les autres
  align-items: center; // Centre les éléments horizontalement
  margin-bottom: 1rem; // Ajoute 1rem (16px) d’espace en bas
  width: 100%; // Prend toute la largeur disponible
`;

const MusicItem = styled.div` // Crée un style nommé "MusicItem" pour une balise <div>
  display: flex; // Utilise Flexbox pour organiser le nom et l’audio
  align-items: center; // Centre les éléments verticalement
  gap: 0.5rem; // Ajoute 0.5rem (8px) d’espace entre les éléments
  margin: 0.5rem 0; // Ajoute 0.5rem (8px) d’espace au-dessus et en dessous
  width: 100%; // Prend toute la largeur disponible
  justify-content: space-between; // Espace le nom et l’audio aux extrémités
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    flex-direction: column; // Place les éléments les uns sous les autres
    gap: 0.3rem; // Réduit l’espace à 0.3rem (4.8px)
  }
`;

const AudioElement = styled.audio` // Crée un style nommé "AudioElement" pour une balise <audio>
  width: 300px; // Définit une largeur fixe de 300 pixels
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    width: 100%; // Prend toute la largeur disponible
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    width: 250px; // Ajuste la largeur à 250 pixels
  }
`;

const UploadContainer = styled.div` // Crée un style nommé "UploadContainer" pour une balise <div>
  display: flex; // Utilise Flexbox pour organiser les éléments
  justify-content: center; // Centre les éléments horizontalement
  margin-bottom: 1rem; // Ajoute 1rem (16px) d’espace en bas
  width: 100%; // Prend toute la largeur disponible
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    flex-direction: column; // Place les éléments les uns sous les autres
    gap: 0.3rem; // Ajoute 0.3rem (4.8px) d’espace entre les éléments
    margin-bottom: 0.5rem; // Réduit l’espace en bas à 0.5rem (8px)
  }
  @media (min-width: 481px) and (max-width: 768px) { // Si l’écran est moyen (tablette)
    gap: 0.4rem; // Ajuste l’espace à 0.4rem (6.4px)
  }
`;

const UploadWrapper = styled.div` // Crée un style nommé "UploadWrapper" pour une balise <div>
  display: flex; // Utilise Flexbox pour organiser les éléments
  flex-direction: column; // Place les éléments les uns sous les autres
  align-items: center; // Centre les éléments horizontalement
  gap: 0.5rem; // Ajoute 0.5rem (8px) d’espace entre les éléments
  @media (max-width: 480px) { // Si l’écran est petit (mobile)
    gap: 0.3rem; // Réduit l’espace à 0.3rem (4.8px)
  }
`;

/*
 * PARTIE 3 : LOGIQUE DU COMPOSANT MUSIC
 * Cette partie définit la logique pour gérer l’ajout et l’affichage des musiques.
 */
const MusicComponent = () => { // Crée une fonction "MusicComponent" qui est le composant principal
  const [musicFile, setMusicFile] = useState(null); // Crée une variable "musicFile" (null au départ) et "setMusicFile" pour le fichier sélectionné
  const [randomMusics, setRandomMusics] = useState([]); // Crée une variable "randomMusics" (tableau vide) et "setRandomMusics" pour les musiques aléatoires
  const [errorMessage, setErrorMessage] = useState(""); // Crée une variable "errorMessage" (vide) et "setErrorMessage" pour les messages d’erreur

  /*
   * Description de la fonction useEffect (ici utilisée anonymement) :
   * Cette fonction s’exécute une fois au chargement pour récupérer deux musiques aléatoires depuis Firebase.
   * Elle écoute les changements d’authentification et les données dans "musicsNew".
   * Arguments :
   * - Aucun argument explicite, mais elle utilise une fonction interne avec "currentUser".
   * Retour :
   * - Retourne une fonction pour arrêter l’écouteur quand le composant est démonté.
   */
  useEffect(() => { // Crée un effet avec useEffect pour exécuter du code au chargement
    const unsubscribe = auth.onAuthStateChanged((currentUser) => { // Écoute les changements de connexion avec auth, "currentUser" est l’utilisateur actuel
      if (currentUser) { // Si un utilisateur est connecté
        const musicsRef = ref(rtdb, "musicsNew"); // Crée une référence à la table "musicsNew" dans Firebase
        onValue(musicsRef, (snapshot) => { // Écoute les changements dans cette table, "snapshot" contient les données actuelles
          const data = snapshot.val(); // Récupère les données brutes de Firebase sous forme d’objet
          if (data) { // Si des données existent
            const allMusics = Object.entries(data).map(([id, value]) => ({ id, ...value })); // Transforme l’objet en tableau de musiques avec leurs ID
            const shuffled = allMusics.sort(() => 0.5 - Math.random()); // Mélange les musiques aléatoirement
            setRandomMusics(shuffled.slice(0, 2)); // Garde les 2 premières musiques et met à jour "randomMusics"
          } else { // Si aucune donnée n’existe
            setRandomMusics([]); // Remet "randomMusics" à un tableau vide
          }
        }, (error) => { // Si une erreur se produit lors de la lecture
          console.error("Erreur lors du chargement des musiques :", error); // Affiche l’erreur dans la console
        });
      }
    });
    return () => unsubscribe(); // Retourne une fonction qui arrête l’écouteur quand le composant est démonté
  }, []); // Tableau vide signifie que l’effet ne s’exécute qu’une fois au chargement

  /*
   * Description de la fonction fileToBase64 :
   * Cette fonction convertit un fichier audio en texte base64 pour l’envoyer à Firebase.
   * Elle utilise un FileReader pour lire le fichier de manière asynchrone.
   * Arguments :
   * - file : le fichier audio sélectionné par l’utilisateur.
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
   * Description de la fonction handleAddMusic :
   * Cette fonction gère l’ajout d’un nouveau fichier MP3 dans Firebase.
   * Elle vérifie si le fichier est valide (type MP3, taille < 7 Mo) et l’envoie.
   * Arguments :
   * - Aucun argument explicite (utilise l’état "musicFile").
   * Retour :
   * - Ne retourne rien, mais modifie les états "musicFile", "errorMessage" et ajoute une musique dans Firebase.
   */
  const handleAddMusic = async () => { // Crée une fonction "handleAddMusic" pour ajouter une musique, "async" pour attendre des actions lentes
    if (!musicFile) { // Vérifie si aucun fichier n’est sélectionné
      console.log("Aucune musique sélectionnée par l'utilisateur"); // Affiche un message dans la console
      setErrorMessage("Aucune musique sélectionnée"); // Met un message d’erreur dans "errorMessage"
      return; // Sort de la fonction si aucun fichier
    }
    try { // Essaie d’exécuter le code suivant et attrape les erreurs
      if (musicFile.type !== "audio/mpeg") { // Vérifie si le type du fichier n’est pas "audio/mpeg" (MP3)
        setErrorMessage("Seuls les fichiers MP3 sont acceptés"); // Met un message d’erreur
        throw new Error("Seuls les fichiers MP3 sont acceptés"); // Lance une erreur pour arrêter
      }
      if (musicFile.size > 7 * 1024 * 1024) { // Vérifie si le fichier dépasse 7 mégaoctets
        setErrorMessage("La musique dépasse la limite de 7 Mo"); // Met un message d’erreur
        throw new Error("La musique dépasse la limite de 7 Mo"); // Lance une erreur pour arrêter
      }
      const base64Music = await fileToBase64(musicFile); // Convertit le fichier en base64 et attend le résultat
      const musicData = { url: base64Music, name: musicFile.name }; // Crée un objet avec l’URL base64 et le nom du fichier
      const userId = auth.currentUser?.uid || "unknown"; // Récupère l’ID de l’utilisateur connecté, ou "unknown" si aucun
      await push(ref(rtdb, "musicsNew"), musicData); // Ajoute la musique à Firebase et attend la confirmation
      console.log(`Musique ajoutée par ${userId}: ${musicFile.name}, taille: ${musicFile.size} octets`); // Affiche un message de succès dans la console
      setMusicFile(null); // Remet "musicFile" à null pour vider la sélection
      setErrorMessage(""); // Efface le message d’erreur
    } catch (error) { // Attrape une erreur si elle se produit
      console.error(`Erreur lors de l’ajout de la musique par ${auth.currentUser?.uid || "unknown"}:`, error); // Affiche l’erreur dans la console
      setErrorMessage(error.message); // Met le message d’erreur dans "errorMessage"
    }
  };

  /*
   * Description de la fonction handleMusicFileChange :
   * Cette fonction est appelée quand l’utilisateur sélectionne un fichier via l’input.
   * Elle vérifie si le fichier est un MP3 valide et ne dépasse pas 7 Mo, puis met à jour l’état.
   * Arguments :
   * - e : un objet événement qui contient le fichier sélectionné.
   * Retour :
   * - Ne retourne rien, mais modifie les états "musicFile" et "errorMessage".
   */
  const handleMusicFileChange = (e) => { // Crée une fonction "handleMusicFileChange" pour gérer la sélection d’un fichier
    const file = e.target.files[0]; // Récupère le premier fichier sélectionné dans le champ
    if (file) { // Si un fichier est sélectionné
      if (file.type !== "audio/mpeg") { // Vérifie si le type n’est pas "audio/mpeg" (MP3)
        setErrorMessage("Seuls les fichiers MP3 sont acceptés"); // Met un message d’erreur
        setMusicFile(null); // Remet "musicFile" à null pour vider la sélection
      } else if (file.size > 7 * 1024 * 1024) { // Vérifie si le fichier dépasse 7 mégaoctets
        setErrorMessage("La musique dépasse la limite de 7 Mo"); // Met un message d’erreur
        setMusicFile(null); // Remet "musicFile" à null pour vider la sélection
      } else { // Si le fichier est valide
        setMusicFile(file); // Met à jour "musicFile" avec le fichier sélectionné
        setErrorMessage(""); // Efface le message d’erreur
      }
    }
  };

  /*
   * Description de la fonction handleAudioClick :
   * Cette fonction gère le clic sur un élément audio pour jouer ou mettre en pause.
   * Elle bascule entre lecture et pause selon l’état actuel de l’audio.
   * Arguments :
   * - e : un objet événement qui contient l’élément audio cliqué.
   * Retour :
   * - Ne retourne rien, mais contrôle la lecture de l’audio.
   */
  const handleAudioClick = (e) => { // Crée une fonction "handleAudioClick" pour gérer le clic sur un audio
    const audio = e.target; // Récupère l’élément audio cliqué (e.target)
    if (audio.paused) { // Vérifie si l’audio est en pause
      audio.play(); // Si oui, lance la lecture
    } else { // Sinon (l’audio est en lecture)
      audio.pause(); // Met en pause
    }
  };

  /*
   * PARTIE 4 : RENDU JSX DU COMPOSANT
   * Cette partie affiche le composant avec un titre, une zone d’upload, et une liste de musiques.
   */
  return (
    <div>
      {/* PARTIE 4.1 : TITRE ET ZONE D’UPLOAD
         Cette sous-partie affiche le titre "Music" et la zone pour ajouter un fichier MP3 */}
      <MusicTitle>Music</MusicTitle>
      <UploadContainer>
        <UploadWrapper>
          <input 
            type="file" 
            accept="audio/mp3" // Limite la sélection aux fichiers MP3 uniquement
            onChange={handleMusicFileChange} // Appelle handleMusicFileChange quand un fichier est sélectionné
            style={{ display: "block" }} // Force l’input à être visible sur une ligne complète
          />
          <button 
            onClick={handleAddMusic} // Appelle handleAddMusic quand on clique pour ajouter le fichier
            style={{ display: "block" }} // Force le bouton à être visible sur une ligne complète
          >
            Ajouter Musique
          </button>
          {/* Affiche un message d’erreur en rouge si "errorMessage" n’est pas vide */}
          {errorMessage && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errorMessage} {/* Montre le message spécifique, ex. "Seuls les fichiers MP3 sont acceptés" */}
            </p>
          )}
        </UploadWrapper>
      </UploadContainer>

      {/* PARTIE 4.2 : LISTE DES MUSIQUES ALÉATOIRES
         Cette sous-partie affiche deux musiques aléatoires avec leurs noms et lecteurs audio */}
      <MusicWrapper>
        {randomMusics.length > 0 ? ( // Condition : si des musiques existent
          randomMusics.map((music) => ( // Parcourt chaque musique dans "randomMusics"
            <MusicItem key={music.id}> {/* Utilise l’ID comme clé unique pour React */}
              <span>{music.name}</span> {/* Affiche le nom du fichier MP3 */}
              <AudioElement 
                src={music.url} // URL base64 de la musique
                onClick={handleAudioClick} // Appelle handleAudioClick pour jouer/mettre en pause
                controls // Ajoute les contrôles par défaut (play, pause, volume)
              />
            </MusicItem>
          ))
        ) : ( // Sinon (aucune musique)
          <p>Aucune musique disponible</p>
        )}
      </MusicWrapper>
    </div>
  );
};

/*
 * PARTIE 5 : EXPORTATION
 * Cette partie permet d’utiliser le composant dans d’autres fichiers.
 */
export default MusicComponent; // Exporte la fonction "MusicComponent" pour qu’elle soit réutilisable ailleurs