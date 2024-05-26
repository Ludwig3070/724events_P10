// Importation des fonctions et modules nécessaires depuis @testing-library/react
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import Home from "./index"; // Importation du composant Home
import { DataProvider } from "../../contexts/DataContext"; // Importation du DataProvider depuis le contexte
import Page from "./index"; // Importation du composant Page (non utilisé dans le code actif)

//SCENARIO 8
// Début de la suite de tests pour le composant Home
describe("When Form is created", () => {
  // Test pour vérifier que la liste des champs du formulaire est affichée
  it("a list of fields card is displayed", async () => {
    render(<Home />); // Rendu du composant Home
    await screen.findByText("Email"); // Vérification que le champ "Email" est affiché
    await screen.findByText("Nom"); // Vérification que le champ "Nom" est affiché
    await screen.findByText("Prénom"); // Vérification que le champ "Prénom" est affiché
    await screen.findByText("Personnel / Entreprise"); // Vérification que le champ "Personnel / Entreprise" est affiché
  });

  /* SCENARIO 9 */
  // Début de la sous-suite de tests pour la soumission du formulaire
  describe("and a click is triggered on the submit button", () => {
    // Test pour vérifier que le message de succès est affiché après la soumission
    it("the success message is displayed", async () => {
      render(
        <DataProvider> 
          <Home />
        </DataProvider> // Rendu du composant Home avec le contexte DataProvider
      );

      // Utilisation de 'act' pour regrouper les mises à jour de l'état et rendre le test plus fiable
      await act(async () => {
        fireEvent.click(await screen.findByText("Envoyer")); // Simule un clic sur le bouton "Envoyer"
      });
      
      // Vérification des messages affichés après la soumission du formulaire
      await screen.findByText("En cours"); // Vérification que le message "En cours" est affiché
      await screen.findByText("Message envoyé !"); // Vérification que le message "Message envoyé !" est affiché
    });
  });

  // SCENARIO 10 optionnel
  
  describe("When a page is created", () => {
    it("a list of events is displayed", async () => {
      await act( async () => {
        render( 
          <DataProvider>
            <Home />
          </DataProvider>);
      })
      

      await screen.findByText("Conférences"); 
      await screen.findByText("Experience digitale"); 
      /* await screen.findByText("conférence");  */
      /* await screen.findByText("expérience digitale");  */
      /* expect(screen.getByText("conférence")).toBeInTheDocument() */
      // Utilisation de waitFor pour attendre l'apparition de l'élément
       /*   await waitFor(() => {
          expect(screen.getByText("Conférence")).toBeInTheDocument(); // Vérification que l'événement "Conférence" est affiché
        });*/
    }); 
 
    it("a list of people is displayed", () => {
      // to implement
    });

    it("a footer is displayed", () => {
      // to implement
    });

    it("an event card, with the last event, is displayed", () => {
      // to implement
    });
  }); 
  
});
