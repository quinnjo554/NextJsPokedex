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
  InputRightElement,
  Button,
  Grid,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  List,
  ListItem,
  UnorderedList,
  Flex,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Arrow from "../public/icons8-back-arrow-100.png";
import Image from "next/image";

function PokemonList({ id }: PokemonProps) {
  const [pokemon, setPokemon] = useState<Array<pokemon>>([]);
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

  const filteredSearch = allPokemon.filter((item) => {
    const lowercaseName = item.name.toLowerCase();
    const lowercaseInput = input.toLowerCase();

    if (searchFilter === "Type") {
      return item.types.some((type) =>
        type.name.toLowerCase().includes(lowercaseInput)
      );
    } else if (searchFilter === "Ability") {
      return item.abilities.some((ability) =>
        ability.name.toLowerCase().includes(lowercaseInput)
      );
    } else if (searchFilter === "Name") {
      return lowercaseName.includes(lowercaseInput);
    } else {
      return lowercaseName.includes(lowercaseInput);
    }
  });

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
      <Box mt={16} className="" p={10}>
        <InputGroup className="fixed left-[40%] w-[100px] inputMobile">
          <Input
            variant="filled"
            placeholder="Search For Pokemon"
            w={300}
            onChange={handleInputChange}
          />
          <InputRightElement className="relative left-[17rem]">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                className="bg-white"
              />
              <MenuList className="">
                <MenuItem value="Type" onClick={() => setSearchFilter("Type")}>
                  Type
                </MenuItem>
                <MenuItem
                  value="Ability"
                  onClick={() => setSearchFilter("Ability")}
                >
                  Ability
                </MenuItem>
                <MenuItem value="Name" onClick={() => setSearchFilter("Name")}>
                  Name
                </MenuItem>
              </MenuList>
            </Menu>
          </InputRightElement>
        </InputGroup>
        {showFilter && (
          <Box
            className="fixed left-[40%] max-h-24 inputMobile"
            bg="white"
            border="1px"
            borderColor="gray.300"
            rounded="md"
            shadow="md"
            overflowY="scroll"
            maxW="500px"
            maxH="72"
          >
            <UnorderedList listStyleType="none">
              {filteredSearch.map((value, index) => (
                <Link
                  href={`http://localhost:3000/pokedex/${value.id}`}
                  key={index}
                >
                  <ListItem className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${value.id}.png`}
                      alt={value.name}
                      width={22}
                      height={22}
                      className="mr-2"
                    />
                    <Box className="flex items-center">
                      <span className="mr-2">{value.name}</span>
                      <Flex>
                        {value.types.map((type, typeIndex) => (
                          <Box
                            key={typeIndex}
                            px={2}
                            py={1}
                            fontSize="xs"
                            rounded="full"
                            color="white"
                            mr={1}
                            className={`${typeColors[type.name]}`}
                          >
                            {type.name}
                          </Box>
                        ))}
                      </Flex>
                    </Box>
                  </ListItem>
                </Link>
              ))}
            </UnorderedList>
          </Box>
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
            width={70}
            height={70}
            className="bg-white rounded-full transition-all ease-in-out hover:bg-transparent"
            onClick={() => {
              setPage((prevPageNum) =>
                getNextPageNumber(prevPageNum, -1, 0, totalPages)
              );
            }}
          />
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
            width={70}
            height={70}
            className="bg-white rounded-full rotate-180 transition-all ease-in-out hover:bg-transparent"
            onClick={() => {
              setPage((prevPageNum) =>
                getNextPageNumber(prevPageNum, 1, 0, totalPages)
              );
            }}
          />
        </Link>
        <Grid
          className="mobile-center"
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={3}
          p={6}
        >
          {pokemon.map((value, index) => {
            const types = value.types.map((type) => {
              const typeName = type.name.toLowerCase();
              const backgroundColor = typeColors[typeName] || "bg-gray-300";

              return (
                <ListItem
                  key={value.id}
                  className={`flex px-2 py-0 mr-2 rounded-sm ${backgroundColor} text-center`}
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
                      key={value.id}
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
                  <Flex justifyContent="space-between">
                    <Box># {value.id}</Box>
                    <List display="flex">{types}</List>
                  </Flex>
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
