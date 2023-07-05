"use client";
import React, { ChangeEvent, useEffect, useState } from "react";

import {
  usePagePokemon,
  useAllPokemon,
  usePokemonInfinite,
} from "@/queries/getFunctions";
import Pikachu from "../../public/pikachu_run_avatar_by_thefandomdude_d809mbc.gif";
import { ChakraProvider, Box, Button } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import Image from "next/image";
import PokedexArray from "./PokedexArray";
function PokemonList({ id }: PokemonProps) {
  const [allPokemon, setAllPokemon] = useState<Array<pokemon>>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [input, setInput] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const { data, isLoading, isError } = usePagePokemon(id, "32");
  const {
    data: allPokemonData,
    isLoading: allPokemonLoading,
    isError: pokemonError,
  } = useAllPokemon();
  const typeColors: TypeColors = {
    normal: "bg-gray-500",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-500",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-600",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-blue-300",
    psychic: "bg-pink-500",
    bug: "bg-green-700",
    rock: "bg-gray-700",
    ghost: "bg-indigo-700",
    dragon: "bg-indigo-500",
    dark: "bg-gray-900",
    steel: "bg-gray-400",
    fairy: "bg-pink-300",
  };

  const {
    data: infiniteData,
    isLoading: infiniteIsLoading,
    fetchNextPage,
  } = usePokemonInfinite();

  const pokemon: pokemon[] | undefined = infiniteData?.pages.flatMap(
    ({ content }) => content
  );

  const filteredSearch = allPokemon.filter((item) => {
    const lowercaseName = item.name.toLowerCase();
    const lowercaseInput = input.toLowerCase();
    if (searchFilter === "Type") {
      return item.types.some((type) =>
        type.name.toLowerCase().includes(lowercaseInput)
      );
    }

    if (searchFilter === "Ability") {
      return item.abilities.some((ability) =>
        ability.name.toLowerCase().includes(lowercaseInput)
      );
    }

    return lowercaseName.includes(lowercaseInput);
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data["totalPages"]);
      setPage(Number(id));
    }
  }, [data]);

  useEffect(() => {
    if (allPokemonData) {
      setAllPokemon(allPokemonData["content"]);
    }
  }, [allPokemonData]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const current = event.target.value;
    setShowFilter(false);
    if (current !== "") {
      setInput(current);
      setShowFilter(true);
    }
  }

  if (isLoading) {
    return (
      <div
        className=" grid justify-center relative top-1/2 text-3xl"
        style={{ transform: "scaleX(-1)" }}
      >
        <Image src={Pikachu} alt="pika" width={110} height={110}></Image>
      </div>
    );
  }

  return (
    <ChakraProvider>
      <Box mt={16} w={"100%"} p={10}>
        <SearchBar
          handleInputChange={handleInputChange}
          setSearchFilter={setSearchFilter}
          filteredSearch={filteredSearch}
          showFilter={showFilter}
          typeColors={typeColors}
        ></SearchBar>
        <PokedexArray pokemon={pokemon} typeColors={typeColors}></PokedexArray>
        <Box textAlign={"center"} mt={"8"}>
          <Button onClick={() => fetchNextPage()}>Load More</Button>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default PokemonList;
