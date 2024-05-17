import { fireEvent, render, screen } from "@testing-library/react"; /* Import des fonctions nécessaires depuis la bibliothèque de tests @testing-library/react. */
import Button, { BUTTON_TYPES } from "./index";/* Import du composant Button et de la constante BUTTON_TYPES depuis le fichier index.js (le composant à tester).  */

describe("When a button is created", () => {
  it("the button must include a title", () => {
    render(<Button title="my-button" type={BUTTON_TYPES.DEFAULT} />);//Cette ligne rend le composant Button avec les props title et type. Dans ce cas, le titre est "my-button" et le type est par défaut.
    const buttonElement = screen.getByTitle("my-button");//  Cette ligne récupère l'élément du bouton avec le titre "my-button" dans le document.
    expect(buttonElement).toBeInTheDocument(); // Cette ligne vérifie que l'élément buttonElement est présent dans le document. Si le bouton avec le titre "my-button" est trouvé, le test passe ; sinon, il échoue.
  });
  it("the button must display a label", () => {
    render(<Button>label</Button>);
    const buttonElement = screen.getByText(/label/); // Cette ligne récupère l'élément du bouton qui contient le texte "label". screen.getByText() est une fonction fournie par Testing Library qui recherche un élément dans le document par son texte.
    expect(buttonElement).toBeInTheDocument();
  });
  describe("and it's clicked", () => {
    it("an event onClick it executed", () => {
      const onClick = jest.fn();// Crée un mock de fonction pour onClick
      render(<Button onClick={onClick} />);// Rend le composant Button avec la fonction onClick
      const buttonElement = screen.getByTestId("button-test-id");// Récupère le bouton avec l'attribut data-testid="button-test-id"
      fireEvent( // Déclenche un événement sur le bouton
        buttonElement, // Élément cible
        new MouseEvent("click", { // Crée un nouvel événement de type "click"
          bubbles: true, // Permet à l'événement de remonter dans la hiérarchie des éléments
          cancelable: true, // Permet d'annuler l'événement
        })
      );
      expect(onClick.mock.calls.length).toBeGreaterThan(0); // Vérifie que la fonction onClick a été appelée au moins une fois
    });
    });
  });
  describe("and selected type is submit", () => { // Définit un bloc de tests avec une description
    it("an input submit is created", () => { // Définit un test avec une description
      render(<Button type={BUTTON_TYPES.SUBMIT}>label</Button>); // Rend le composant Button avec le type "submit"
      const buttonElement = screen.getByTestId("button-test-id"); // Récupère le bouton avec l'attribut data-testid="button-test-id"
      expect(buttonElement.type).toEqual("submit"); // Vérifie que le type du bouton est "submit"
    });
  });

