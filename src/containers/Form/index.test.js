import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

//SCENARIO 5
describe("When Form is created", () => {
  it("should have a form displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise"); //MOFIF
    await screen.findByText("Message"); //AJOUT
  });


  //SCENARIO 6
  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      // Simuler le clic sur le bouton
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Attendre que le texte "En cours" apparaisse
      await screen.findByText("En cours");

      // Utiliser waitFor pour attendre que le texte "Envoyer" apparaisse à nouveau
      /* Explications des Ajustements
      Ajout de journaux de débogage : console.log("Checking for 'Envoyer' button"); permet de vérifier que le test atteint cette étape.
      Définir un délai dans waitFor : { timeout: 5000 } définit un délai maximal de 5000 millisecondes (5 secondes) pour que waitFor attende avant de rejeter l'erreur. Cela aide à éviter les tests qui échouent en raison de délais trop longs. */

      /* Points Clés
      Répétition de la Fonction dans waitFor : C'est normal et attendu. Cela permet de vérifier régulièrement la condition jusqu'à ce qu'elle soit remplie.
      Utilisation Correcte de await : Utilisez await avec des opérations asynchrones pour garantir que le test attend correctement la résolution avant de continuer.
      Débogage Temporaire : Utilisez console.log pour le débogage, mais retirez-le une fois que vous avez résolu les problèmes pour garder le code de test propre. */
      
        await waitFor(() => {
        /* console.log("Checking for 'Envoyer' button"); // Debugging line */
        expect(screen.getByText("Envoyer")).toBeInTheDocument();
      }, { timeout: 5000 });


      // Vérifier que la fonction onSuccess a été appelée
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
