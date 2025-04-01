/*
  Ce fichier configure Jest, un framework de test JavaScript.
  Jest est utilisé pour exécuter des tests automatisés sur le code, notamment avec React.

  - Jest permet d'exécuter des tests unitaires et d'intégration pour s'assurer que le code fonctionne comme prévu.
  - Il fonctionne avec Node.js et peut être configuré pour simuler un environnement de navigateur (utile pour tester des composants React).
  - Ce fichier de configuration indique à Jest quel environnement utiliser et quels fichiers charger avant d'exécuter les tests.

  Explication des options de configuration :
  - `testEnvironment`: Définit l'environnement dans lequel les tests seront exécutés.
  - `setupFilesAfterEnv`: Permet de charger un fichier de configuration supplémentaire après l'initialisation de Jest.
*/

module.exports = {
  testEnvironment: 'jsdom', // Définit l'environnement de test sur `jsdom`, qui simule un navigateur dans Node.js.
  
  /*
    - `jsdom` est une bibliothèque qui recrée un DOM virtuel en JavaScript.
    - Cela permet de tester des composants React comme s'ils étaient exécutés dans un vrai navigateur.
    - Si on testait uniquement du code backend (ex: API, bases de données), on utiliserait `testEnvironment: 'node'` à la place.
  */

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'] // Spécifie un fichier de configuration à charger après l'initialisation de Jest.
  
  /*
    - `<rootDir>` représente le répertoire racine du projet.
    - `jest.setup.js` est un fichier qui permet d'ajouter des configurations supplémentaires avant d'exécuter les tests.
    - Par exemple, il peut être utilisé pour importer des extensions Jest comme `@testing-library/jest-dom` 
      qui ajoute des méthodes pour tester le DOM.
  */
};
