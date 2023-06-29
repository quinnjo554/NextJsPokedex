import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import PokemonList from "@/components/PokemonList";
describe("PokemonList", () => {
  const queryClient = new QueryClient();
  beforeEach(() => {
    localStorage.clear;
  });
  it("renders the component with loading state", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PokemonList id={"1"} />
      </QueryClientProvider>
    );

    const loadingImage = screen.getByAltText("pika");
    expect(loadingImage).toBeInTheDocument();
  });

  it("renders the component with fetched data", async () => {
    const mockData = {
      content: [
        {
          id: 1,
          name: "bulbasaur",
          types: [{ name: "grass" }, { name: "poison" }],
        },
        {
          id: 2,
          name: "charmander",
          types: [{ name: "fire" }],
        },
      ],
      totalPages: 1,
    };

    jest.mock("../../getFunctions/getFunctions", () => ({
      usePagePokemon: jest.fn(() => ({
        data: mockData,
        isLoading: false,
        isError: false,
      })),
      useAllPokemon: jest.fn(() => ({
        data: mockData,
        isLoading: false,
        isError: false,
      })),
      getNextPageNumber: jest.fn(),
    }));

    render(
      <QueryClientProvider client={queryClient}>
        <PokemonList id={"0"} />
      </QueryClientProvider>
    );
    //everytime i use waitfor element to be removed it says it timed out

    //When I use async await it dont work(I hate useing .then)
    waitForElementToBeRemoved(() => screen.getAllByAltText("pika")).then(
      async () => {
        const bulbasaurElement = await screen.findByText("bulbasaur");
        expect(bulbasaurElement).toBeInTheDocument();
      }
    );

    setTimeout(async () => {
      const charmanderElement = screen.findByText("Charmander");
      expect(charmanderElement).toBeInTheDocument();
    }, 200);
  });

  it("updates the input value and filters the Pokemon list", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PokemonList id={"0"} />
      </QueryClientProvider>
    );

    //confused on how and when to use waitfor. Sometimes I need to wait for a promise but it never does.

    setTimeout(() => {
      const searchInput = screen.getByTestId("search-bar");
      userEvent.type(searchInput, "bul");
    }, 200);
    setTimeout(async () => {
      const filteredPokemon = await screen.findAllByText(/bulbasaur/i);
      expect(filteredPokemon.length).toBe(1);
    }, 200);
  });
});
