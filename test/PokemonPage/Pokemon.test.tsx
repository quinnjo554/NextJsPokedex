import AllProviders from "@/components/AllProviders";
import PokemonPage from "@/components/PokemonPage/PokemonPage";
import userEvent from "@testing-library/user-event";
import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
describe("Buttons send to correct location", () => {
  it("sends you to pokedex", async () => {
    render(
      <AllProviders>
        <PokemonPage id="0"></PokemonPage>
      </AllProviders>
    );
    const mockData = {
      name: "Bulbasaur",
      id: 1,
      height: 7,
      weigth: 69,
      eggGroup: ["monster", "plant"],
      types: ["poison", "grass"],
    };

    setTimeout(async () => {
      let name: HTMLElement;
      await waitFor(() => {
        name = screen.getByTestId("pokemon-name");
        console.log(name.innerHTML);
        const id = expect(name.innerHTML).toMatch(/bublasaur #1/i);
      });
    });
  }, 200);
});
