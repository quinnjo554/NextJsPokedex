"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getPokemonById, usePagePokemon } from "@/getFunctions/getFunctions";
import {
  ChakraProvider,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Image,
  UnorderedList,
  ListItem,
  Flex,
  Link,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

function BattleLanding() {
  const { data, isLoading, error } = usePagePokemon("0", "550");
  const [pokemon, setPokemon] = useState<Array<pokemon>>([]);
  const [playerPokemonId, setPlayerPokemonId] = useState("");
  const [aiPokemonId, setAiPokemonId] = useState("");
  const [playerPokemonDetails, setPlayerPokemonDetails] = useState<pokemon>();
  const [aiPokemonDetails, setAiPokemonDetails] = useState<pokemon>();
  const [input, setInput] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    if (data) {
      setPokemon(data["content"]);
    }
  }, [data]);

  useEffect(() => {
    async function getPokemonData() {
      if (playerPokemonId) {
        const data = await getPokemonById(playerPokemonId);
        setPlayerPokemonDetails(data);
      }
      if (aiPokemonId) {
        const data = await getPokemonById(aiPokemonId);
        setAiPokemonDetails(data);
      }
    }
    getPokemonData();
  }, [playerPokemonId, aiPokemonId]);

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

  const filteredSearch = pokemon.filter((item) => {
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

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const current = event.target.value;
    setShowFilter(false);
    if (current !== "") {
      setInput(current);
      setShowFilter(true);
    }
  }

  function handlePokemonClick(value: pokemon) {
    if (!playerPokemonId) {
      setPlayerPokemonId(value.id);
    } else {
      setAiPokemonId(value.id);
      
    }
  }

  return (
    <ChakraProvider>
      <div className="landingImg">
        <InputGroup className="fixed top-4 left-4 w-64 inputMobile">
          <Input
            variant="filled"
            placeholder="Search For Pokemon"
            onChange={handleInputChange}
          />
          <InputRightElement>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
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
            className="fixed top-16 left-4 max-h-72 max-w-64 inputMobile"
            bg="white"
            border="1px"
            borderColor="gray.300"
            rounded="md"
            shadow="md"
            overflowY="scroll">
            <UnorderedList listStyleType="none">
              {filteredSearch.map((value, index) => (
                <ListItem
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  key={index}
                  onClick={() => handlePokemonClick(value)}
                >
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
                          className={`${typeColors[type.name]} `}
                        >
                          {type.name}
                        </Box>
                      ))}
                    </Flex>
                  </Box>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        )}
        {playerPokemonId && (
          <div className="flex justify-between mt-4">
            <div className="w-1/2 bg-gray-200 p-4 rounded-lg">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${playerPokemonDetails?.id}.png`}
                alt={playerPokemonDetails?.name}
                width={120}
                height={120}
                className="mx-auto"
              />
              <h3 className="text-center">{playerPokemonDetails?.name}</h3>
              <div className="text-center mt-2">
                {playerPokemonDetails?.types.map((type, typeIndex) => (
                  <span
                    key={typeIndex}
                    className={`px-2 py-1 text-xs rounded-full text-white ${
                      typeColors[type.name]
                    }`}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
              <div className="text-center mt-2">
                <p>Attack: {playerPokemonDetails?.attack}</p>
                <p>Defense: {playerPokemonDetails?.defense}</p>
              </div>
            </div>
            <div className="w-1/2 bg-gray-200 p-4 rounded-lg">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${aiPokemonDetails?.id}.png`}
                alt={aiPokemonDetails?.name}
                width={120}
                height={120}
                className="mx-auto"
              />
              <h3 className="text-center">{aiPokemonDetails?.name}</h3>
              <div className="text-center mt-2">
                {aiPokemonDetails?.types.map((type, typeIndex) => (
                  <span
                    key={typeIndex}
                    className={`px-2 py-1 text-xs rounded-full text-white ${
                      typeColors[type.name]
                    }`}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
              <div className="text-center mt-2">
                <p>Attack: {aiPokemonDetails?.attack}</p>
                <p>Defense: {aiPokemonDetails?.defense}</p>
              </div>
            </div>
          </div>
        )}
        {playerPokemonId && aiPokemonId && (
          <Link href={`/battle/${playerPokemonId}&${aiPokemonId}`}>
            <Button className="mt-4">Next</Button>
          </Link>
        )}
      </div>
    </ChakraProvider>
  );
}

export default BattleLanding;
