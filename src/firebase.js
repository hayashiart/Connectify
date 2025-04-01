// src/firebase.js
// Ce fichier initialise l’application Firebase et exporte les services utilisés (authentification, Firestore, etc.).
// Il utilise des variables d’environnement pour configurer Firebase de manière sécurisée.

/*
 * PARTIE 1 : IMPORTATIONS
 * Cette partie charge les fonctions nécessaires pour initialiser Firebase et ses services.
 */
import { initializeApp } from "firebase/app"; // Importe la fonction pour initialiser l’application Firebase
import { getAuth } from "firebase/auth"; // Importe la fonction pour obtenir le service d’authentification
import { getFirestore } from "firebase/firestore"; // Importe la fonction pour obtenir le service Firestore
import { getAnalytics } from "firebase/analytics"; // Importe la fonction pour obtenir le service Analytics
import { getStorage } from "firebase/storage"; // Importe la fonction pour obtenir le service Storage
import { getDatabase } from "firebase/database"; // Importe la fonction pour obtenir le service Realtime Database

/*
 * PARTIE 2 : CONFIGURATION FIREBASE
 * Cette partie définit l’objet de configuration en utilisant des variables d’environnement.
 */
const firebaseConfig = { // Crée un objet "firebaseConfig" avec les paramètres de configuration
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // Clé API de Firebase, chargée depuis les variables d’environnement
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, // Domaine d’authentification Firebase
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, // ID du projet Firebase
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, // Bucket de stockage Firebase
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, // ID de l’expéditeur pour les messages
  appId: process.env.REACT_APP_FIREBASE_APP_ID, // ID de l’application Firebase
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, // ID pour Analytics
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL, // URL de la base de données Realtime
};

// Affiche les valeurs exactes pour vérification dans la console
console.log("Firebase Config Loaded:", JSON.stringify(firebaseConfig, null, 2)); // Affiche la configuration en JSON formaté pour débogage

/*
 * PARTIE 3 : INITIALISATION ET EXPORTATION
 * Cette partie initialise l’application Firebase et exporte les services.
 */
const app = initializeApp(firebaseConfig); // Initialise l’application Firebase avec la configuration

export const auth = getAuth(app); // Crée et exporte le service d’authentification
export const db = getFirestore(app); // Crée et exporte le service Firestore
export const analytics = getAnalytics(app); // Crée et exporte le service Analytics
export const storage = getStorage(app); // Crée et exporte le service Storage
export const rtdb = getDatabase(app); // Crée et exporte le service Realtime Database