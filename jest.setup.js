/*
  Ce fichier sert à configurer Jest, un framework de test JavaScript.
  Jest est utilisé pour exécuter des tests automatisés sur le code, notamment avec React.
  
  Ici, on importe une extension de Jest pour améliorer les tests sur le DOM.
  - Jest est un framework de test qui permet d'écrire des tests unitaires et d'intégration.
  - `@testing-library/jest-dom` ajoute des méthodes spécifiques pour tester le DOM dans Jest.
    Exemples :
      - `expect(element).toBeInTheDocument();` permet de vérifier qu'un élément est bien présent dans la page.
      - `expect(element).toHaveTextContent("Hello World");` permet de tester le contenu d'un élément HTML.
*/

import '@testing-library/jest-dom'; // Ajoute des assertions DOM supplémentaires pour Jest
