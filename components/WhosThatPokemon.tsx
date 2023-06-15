"use client";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Image,
  Heading,
  Link as ChakraLink,
  Link,
  Input,
  Flex,
} from "@chakra-ui/react";
import { useAllPokemon, useRandomPokemon } from "@/getFunctions/getFunctions";

function WhosThatPokemon() {
  const [inputValue, setInputValue] = useState("");
  const [guessed, setGuessed] = useState(false);
  const [pokemonData, setPokemonData] = useState<pokemon>();
  const [isBlurred, setIsBlurred] = useState(true);
  const [responseText, setResponseText] = useState("");
  const [score, setScore] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const [pokemonArray, setPokemonArray] = useState<Array<pokemon>>([]);
  const { data, isLoading, isError, refetch } = useRandomPokemon();
  const {
    data: allPokemon,
    isLoading: allLoading,
    isError: allError,
  } = useAllPokemon();
  useEffect(() => {
    if (data) {
      setPokemonData(data);
    }
  }, [data, score]);

  useEffect(() => {
    if (allPokemon) {
      setPokemonArray(allPokemon["content"]);
    }
  }, [allPokemon]);

  const filteredSearch = pokemonArray.filter((item: pokemon) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleFilterClick = (value: string) => {
    setInputValue(value);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleGuess = () => {
    setIsBlurred(false);
    if (pokemonData) {
      if (inputValue.toLowerCase() === pokemonData?.name.toLowerCase()) {
        setResponseText("You Got It");
        setScore((prev) => prev + 1);
        setGuessed(true);
      } else {
        setResponseText("Its " + pokemonData.name);
      }
    }
  };

  const handleNext = () => {
    setInputValue("");
    setIsBlurred(true);
    setGuessed(false);
    setResponseText("");
    setCanProceed(true);
    refetch();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ChakraProvider>
      <Flex
        className="whosThatPokemon"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Text className="text-black" fontSize="2xl">
          Score: {score}
        </Text>
        <Image
          className={`translate-x-[-27rem] ${
            isBlurred ? `contrastImg` : `filter-none`
          } transition-all ease-in-out`}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData?.id}.png`}
          maxW="80vw" 
          h="auto"
        />
        <Text
          className="text-black"
          fontSize="2xl"
          maxW="80vw"
          textAlign="center"
        >
          {pokemonData?.description.replace(pokemonData.name, "-------")}
        </Text>
        <Box className="fixed bottom-28" maxW="80vw" w="full">
          <Input
            placeholder="Enter your guess"
            variant={"filled"}
            value={inputValue}
            onChange={handleInputChange}
            mb={2} // Add margin bottom
          />
          {inputValue && (
            <Box h={100} overflowY="auto" bg="white">
              <Text>
                {filteredSearch.map((value, index) => (
                  <li
                    onClick={() => handleFilterClick(value.name)}
                    key={index}
                    className=" px-2 py-1 my-1 cursor-pointer"
                  >
                    {value.name}
                  </li>
                ))}
              </Text>
            </Box>
          )}
          {!guessed && (
            <Button onClick={handleGuess} disabled={guessed} w="full">
              Guess
            </Button>
          )}
          {guessed && (
            <>
              <Button onClick={handleNext} w="full">
                Next
              </Button>
            </>
          )}
          <Text>{responseText}</Text>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default WhosThatPokemon;
