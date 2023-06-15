"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  usePagePokemon,
  getNextPageNumber,
  useAllPokemon,
} from "@/getFunctions/getFunctions";

import Pokeball from "../public/file-pokeball-png-0.png";
import PokemonScreen from "../public/pokémon-minimalism-pixel-art-nintendo-wallpaper-preview.jpg";
import {
  ChakraProvider,
  Box,
  Input,
  InputGroup,
  Grid,
  Link,
  List,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import Arrow from "../public/icons8-back-arrow-100.png";
import Image from "next/image";
function PokemonList({ id }: PokemonProps) {
  const [pokemon, setPokemon] = useState<Array<pokemon>>([]);
  const [allPokemon, setAllPokemon] = useState<Array<pokemon>>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [input, setInput] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const { data, isLoading, isError } = usePagePokemon(id);
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

  //use input value to filter
  //add a filter option for abilities and type
  const filteredSearch = allPokemon.filter((item) =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );

  useEffect(() => {
    if (data) {
      setPokemon(data["content"]);
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
      <div className="animate-spin grid justify-center relative top-1/2 text-3xl ">
        <Image src={Pokeball} alt="Pokeball" width={110} height={110}></Image>
      </div>
    );
  }

  return (
    <ChakraProvider>
      <Box mt={16} p={10}>
        <InputGroup className="fixed left-[10%]">
          <Input
            variant="filled"
            placeholder="Search For Pokemon"
            w={300}
            onChange={handleInputChange}
          />
        </InputGroup>
        {showFilter ? (
          <div className="fixed left-[10%] max-h-24">
            <UnorderedList
              listStyleType="none"
              className="bg-white overflow-scroll border border-gray-300 rounded-md shadow-md w-[500px] max-h-72"
            >
              {filteredSearch.map((value, index) => (
                <Link href={`http://localhost:3000/pokedex/${value.id}`}>
                  <ListItem
                    key={index}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${value.id}.png`}
                      alt={value.name}
                      width={22}
                      height={22}
                      className="mr-2"
                    />
                    <div className="flex items-center">
                      <span className="mr-2">{value.name}</span>
                      <div className="flex">
                        {value.types.map((type, typeIndex) => (
                          <span
                            key={typeIndex}
                            className={`px-2 py-1 text-xs rounded-full text-white ${
                              typeColors[type.name.toLowerCase()]
                            }`}
                          >
                            {type.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ListItem>
                </Link>
              ))}
            </UnorderedList>
          </div>
        ) : (
          <></>
        )}
        <Link
          href={`http://localhost:3000/pokedex/home/${getNextPageNumber(
            Number(id),
            -1,
            0,
            totalPages
          )}`}
          className="arrow-link left"
        >
          <Image
            src={Arrow}
            alt="Pokeball"
            width={"70"}
            height={"70"}
            className="bg-white rounded-full transition-all ease-in-out hover:bg-transparent"
            onClick={() => {
              setPage((prevPageNum) =>
                getNextPageNumber(prevPageNum, -1, 0, totalPages)
              );
            }}
          ></Image>
        </Link>
        <Link
          href={`http://localhost:3000/pokedex/home/${getNextPageNumber(
            Number(id),
            1,
            0,
            totalPages
          )}`}
          className="arrow-link right"
        >
          <Image
            src={Arrow}
            alt="Pokeball"
            width={"70"}
            height={"70"}
            className="bg-white rounded-full rotate-180 transition-all ease-in-out hover:bg-transparent"
            onClick={() => {
              setPage((prevPageNum) =>
                getNextPageNumber(prevPageNum, 1, 0, totalPages)
              );
            }}
          ></Image>
        </Link>
        <Grid
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={4}
          p={6}
        >
          {pokemon.map((value, index) => {
            const types = value.types.map((type) => {
              const typeName = type.name.toLowerCase();
              const backgroundColor = typeColors[typeName] || "bg-gray-300";

              return (
                <ListItem
                  className={`flex px-2 py-0 mr-2 rounded-sm ${backgroundColor} text-center`}
                  key={index}
                  fontSize="sm"
                >
                  {type.name}
                </ListItem>
              );
            });

            return (
              <Link
                href={`/pokedex/${value.id}`}
                key={index}
                _hover={{ textDecoration: "none" }}
              >
                <Box
                  className="pokemon-card w-48 p-2 grid rounded-md mt-3 transition-all ease-in-out bg-black bg-opacity-70 text-white"
                  borderRadius="md"
                  _hover={{
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  <UnorderedList listStyleType="none">
                    <ListItem
                      className="text-center bg-slate-500 rounded-md"
                      px={2}
                    >
                      {value.name}
                    </ListItem>
                  </UnorderedList>
                  <Image
                    className="mx-auto"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${value.id}.png`}
                    alt=""
                    width="90"
                    height="110"
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Box># {value.id}</Box>
                    <List display="flex">{types}</List>
                  </Box>
                </Box>
              </Link>
            );
          })}
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default PokemonList;
