"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAllPokemon, usePokemonInfinite } from "@/queries/getFunctions";
import Pikachu from "../public/pikachu_run_avatar_by_thefandomdude_d809mbc (1).gif";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Grid,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  List,
  Text,
  ListItem,
  UnorderedList,
  Flex,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Image from "next/image";

function PokemonList({ id }: PokemonProps) {
  const [allPokemon, setAllPokemon] = useState<Array<pokemon>>([]);
  const [input, setInput] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
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
    isLoading: isInfinteLoading,
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

  if (isInfinteLoading) {
    return (

      <Box
        display={"grid"}
        justifyContent={"center"}
        position={"relative"}
        top={"50%"}
        fontSize={"3xl"}
        className="pokeballLoading"
      >
        <Image src={Pokeball} alt="Pokeball" width={110} height={110}></Image>
      </Box>
    );
  }

  return (
    <ChakraProvider>
      <Box mt={16} p={10}>
        <InputGroup
          position={"absolute"}
          left={"40%"}
          w={"200px"}
          className="inputMobile"
        >
          <Input
            data-testid="search-bar"
            variant="filled"
            placeholder="Search For Pokemon"
            w={300}
            onChange={handleInputChange}
          />
          <InputRightElement className="relative left-[15rem]">
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
            className=" inputMobile"
            position={"fixed"}
            left={"40%"}
            maxHeight={"24"}
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
                  <ListItem
                    display={"flex"}
                    alignItems={"center"}
                    px={"4"}
                    py={"2"}
                    _hover={{ bg: "gray.100" }}
                    cursor={"pointer"}
                  >
                    <Box marginRight={"2"}>
                      <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${value.id}.png`}
                        alt={value.name}
                        width={22}
                        height={22}
                      />
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                      <Text marginRight={"2"}>{value.name}</Text>
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
          <Box>
            <Image
              src={Arrow}
              alt="Pokeball"
              width={70}
              height={70}
              onClick={() => {
                setPage((prevPageNum) =>
                  getNextPageNumber(prevPageNum, -1, 0, totalPages)
                );
              }}
            />
          </Box>
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
          marginTop={"5"}
        >
          {pokemon?.map((value, index) => {
            const types = value.types.map((type) => {
              const typeName = type.name.toLowerCase();
              const backgroundColor = typeColors[typeName] || "bg-gray-300";

              return (
                <ListItem

                  display={"flex"}
                  px={"2"}
                  py={"0"}
                  mr={"2"}
                  rounded={"sm"}
                  textAlign={"center"}
                  key={index}
                  className={` ${backgroundColor}`}
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
                  borderRadius="md"
                  w={"48"}
                  p={"2"}
                  display={"grid"}
                  rounded={"md"}
                  mt={"3"}
                  transitionProperty={"all"}
                  transitionTimingFunction={"ease-in-out"}
                  bg="rgba(0,0,0,0.7)"
                  textColor={"white"}
                  _hover={{
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  <UnorderedList textAlign={"center"} listStyleType="none">
                    <ListItem
                      rounded={"md"}
                      textAlign={"center"}
                      bg={"rgb(100 116 139)"}
                      px={2}
                      key={value.id}
                    >
                      {value.name}
                    </ListItem>
                  </UnorderedList>
                  <Box mx={"auto"}>
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${value.id}.png`}
                      alt=""
                      width="90"
                      height="110"
                    />
                  </Box>
                  <Flex justifyContent="space-between">
                    <Box># {value.id}</Box>
                    <List display="flex">{types}</List>
                  </Flex>
                </Box>
              </Link>
            );
          })}
        </Grid>
        <Box className="text-center mt-4">
          <Button onClick={() => fetchNextPage()}>Next</Button>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default PokemonList;
