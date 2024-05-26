import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { api, DataProvider } from "../../contexts/DataContext";
import EventList from ".";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },
    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description: "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
};

//SCENARIO 1
describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    // Mocking the API call
    api.loadData = jest.fn().mockReturnValue(data);

    // Wrapping the render call in act() to ensure all state updates are processed
    await act(async () => {
      render(
        <DataProvider>
          <EventList />
        </DataProvider>
      );
    });

    // Using findAllByText which is async, so we await its result
    expect(await screen.findAllByText("avril")).toHaveLength(2);
  });

  //SCENARIO 2
  describe("and an error occurred", () => {
    it("an error message is displayed", async () => {
      // Mocking the API call to return a rejected promise
      api.loadData = jest.fn().mockRejectedValue(new Error("Failed to load data"));

      // Wrapping the render call in act() to ensure all state updates are processed
      await act(async () => {
        render(
          <DataProvider>
            <EventList />
          </DataProvider>
        );
      });

      // Using findByText to find the error message which is async
      expect(await screen.findByText("An error occured")).toBeInTheDocument();
    });
  });

  //SCENARIO 3
  describe("and we select a category", () => {
    it("a filtered list is displayed", async () => {
      // Mocking the API call
      api.loadData = jest.fn().mockReturnValue(data);

      // Wrapping the render call in act() to ensure all state updates are processed
      await act(async () => {
        render(
          <DataProvider>
            <EventList />
          </DataProvider>
        );
      });

      // Waiting for the initial render to complete
      await screen.findByText("Forum #productCON");

      // Wrapping fireEvent in act() to ensure state updates are processed
      await act(async () => {
        fireEvent.click(await screen.findByTestId("collapse-button-testid"));
      });

      // Wrapping fireEvent in act() to ensure state updates are processed
      await act(async () => {
        fireEvent.click((await screen.findAllByText("soirée entreprise"))[0]);
      });

      // Ensuring the correct event is displayed after filtering
      await screen.findByText("Conférence #productCON");
      expect(screen.queryByText("Forum #productCON")).not.toBeInTheDocument();
    });
  });


  //SCENARIO 4
  describe("and we click on an event", () => {
    it("the event detail is displayed", async () => {
      // Mocking the API call
      api.loadData = jest.fn().mockReturnValue(data);

      // Wrapping the render call in act() to ensure all state updates are processed
      await act(async () => {
        render(
          <DataProvider>
            <EventList />
          </DataProvider>
        );
      });

      // Wrapping fireEvent in act() to ensure state updates are processed
      await act(async () => {
        fireEvent.click(await screen.findByText("Conférence #productCON"));
      });

      // Ensuring the details of the selected event are displayed
      await screen.findByText("24-25-26 Février");
      await screen.findByText("1 site web dédié");
    });
  });
});
/* Explications des commentaires
Mocking the API call : Les appels à l'API sont simulés pour retourner des données spécifiques ou des erreurs.
Wrapping the render call in act() to ensure all state updates are processed : Chaque appel à render est enveloppé dans act() pour garantir que toutes les mises à jour de l'état sont traitées avant de continuer.
Using findByText which is async, so we await its result : Les méthodes findBy... sont asynchrones et nécessitent l'utilisation de await.
Wrapping fireEvent in act() to ensure state updates are processed : Les interactions utilisateur déclenchées par fireEvent sont également enveloppées dans act() pour garantir que les mises à jour de l'état sont correctement gérées. */