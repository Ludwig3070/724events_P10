import { render, screen } from "@testing-library/react"; // Import des fonctions de rendu et de recherche de l'API de test
import { DataProvider, api, useData } from "./index"; // Import du DataProvider, de l'API et du hook useData

describe("When a data context is created", () => { // Définition d'un bloc de tests
  it("a call is executed on the events.json file", async () => { // Première spécification de test
    api.loadData = jest.fn().mockReturnValue({ result: "ok" }); // Mock de la fonction loadData pour retourner une valeur
    const Component = () => { // Définition d'un composant de test
      const { data } = useData(); // Utilisation du hook useData pour obtenir les données du contexte
      return <div>{data?.result}</div>; // Rendu de la valeur des données
    };
    render( // Rendu du composant à tester
      <DataProvider> {/* Fournit le contexte de données aux enfants */}
        <Component /> {/* Composant à tester */}
      </DataProvider>
    );
    const dataDisplayed = await screen.findByText("ok"); // Recherche du texte affiché dans le composant
    expect(dataDisplayed).toBeInTheDocument(); // Vérification que le texte est présent dans le DOM
  });

  describe("and the events call failed", () => { // Définition d'un sous-bloc de tests
    it("the error is dispatched", async () => { // Deuxième spécification de test
      window.console.error = jest.fn(); // Mock de la fonction console.error
      api.loadData = jest.fn().mockRejectedValue("error on calling events"); // Mock de la fonction loadData pour simuler un appel en échec

      const Component = () => { // Définition d'un composant de test
        const { error } = useData(); // Utilisation du hook useData pour obtenir les erreurs du contexte
        return <div>{error}</div>; // Rendu de l'erreur
      };
      
      render( // Rendu du composant à tester
        <DataProvider>
          <Component />
        </DataProvider>
      );
      
      const dataDisplayed = await screen.findByText("error on calling events"); // Recherche du texte affiché dans le composant
      expect(dataDisplayed).toBeInTheDocument(); // Vérification que le texte est présent dans le DOM
    });
  });

  it("api.loadData", () => { // Troisième spécification de test
    window.console.error = jest.fn(); // Mock de la fonction console.error
    global.fetch = jest.fn().mockResolvedValue(() => // Mock de la fonction fetch pour simuler une réponse réussie
      Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }), // Mock de la méthode json pour retourner des données
      })
    );
    const Component = () => { // Définition d'un composant de test
      const { error } = useData(); // Utilisation du hook useData pour obtenir les erreurs du contexte
      return <div>{error}</div>; // Rendu de l'erreur
    };
    render( // Rendu du composant à tester
      <DataProvider>
        <Component />
      </DataProvider>
    );
  });
});
