// src/components/Shared/Validation.js
// Ce fichier contient des règles de validation et une fonction pour valider les entrées utilisateur.
// Il est utilisé pour vérifier les champs comme l’email ou le mot de passe.

/*
 * PARTIE 1 : DÉFINITION DES RÈGLES DE VALIDATION
 * Cette partie crée un objet avec des règles pour différents types d’entrées.
 */
export const validationRules = { // Crée un objet "validationRules" pour regrouper les règles
  email: { // Sous-objet pour la validation des emails
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Expression régulière : vérifie un format email (ex. "user@domain.com")
    message: "Veuillez entrer un email valide (ex. exemple@domaine.com)", // Message d’erreur si invalide
  },
  password: { // Sous-objet pour la validation des mots de passe
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, // Expression régulière : au moins 8 caractères, une minuscule, une majuscule, un chiffre
    message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre", // Message d’erreur si invalide
  },
  text: { // Sous-objet pour la validation de texte simple
    regex: /^.{1,50}$/, // Expression régulière : entre 1 et 50 caractères
    message: "Le texte doit contenir entre 1 et 50 caractères", // Message d’erreur si invalide
  },
  message: { // Sous-objet pour la validation de messages plus longs
    regex: /^.{1,500}$/, // Expression régulière : entre 1 et 500 caractères
    message: "Le message doit contenir entre 1 et 500 caractères", // Message d’erreur si invalide
  },
};

/*
 * PARTIE 2 : FONCTION DE VALIDATION
 * Cette partie définit une fonction pour tester les entrées selon les règles.
 */
/*
 * Description de la fonction validateInput :
 * Cette fonction valide une entrée utilisateur en fonction d’un type spécifié.
 * Elle utilise les règles définies dans "validationRules" pour vérifier la validité.
 * Arguments :
 * - value : la valeur à valider (ex. "user@domain.com").
 * - type : le type de validation à appliquer (ex. "email").
 * Retour :
 * - Retourne un objet avec "isValid" (booléen) et "message" (chaîne vide si valide, erreur sinon).
 */
export const validateInput = (value, type) => { // Crée une fonction "validateInput" avec "value" et "type" comme arguments
  const rule = validationRules[type]; // Récupère la règle correspondante au "type" dans "validationRules"
  if (!rule) return { isValid: true, message: '' }; // Si aucune règle n’existe pour ce type, retourne valide par défaut
  const isValid = rule.regex.test(value); // Teste la valeur avec l’expression régulière de la règle
  return { isValid, message: isValid ? '' : rule.message }; // Retourne un objet : "isValid" true/false, "message" vide ou erreur
};