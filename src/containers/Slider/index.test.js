import { render, screen } from "@testing-library/react";/* import de render et screen   render => rendu du composant pour utilitaire de test, screen =>utilitaires de test */
import Slider from "./index";//import de composants
import { api, DataProvider } from "../../contexts/DataContext";//import de composants

const data = {//donnees mockees
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ],
};
//SCENARIO 7
describe("When slider is created", () => {
  it("a list card is displayed", async () => {
    window.console.error = jest.fn();//evite l'affichage des erreurs en console
    api.loadData = jest.fn().mockReturnValue(data);//utilisation de donnees mockees pour remplacer un appel api 
    render(//acces au données fournies par le composant DataProvider
      <DataProvider>
        <Slider />
      </DataProvider>
    );
    await screen.findByText("World economic forum");
    await screen.findByText("janvier");
    await screen.findByText(
      "Oeuvre à la coopération entre le secteur public et le privé."
    );
  });
});
