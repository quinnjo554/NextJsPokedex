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
import { useRandomPokemon } from "@/getFunctions/getFunctions";

function WhosThatPokemon() {
  const [inputValue, setInputValue] = useState("");
  const [guessed, setGuessed] = useState(false);
  const [pokemonData, setPokemonData] = useState<pokemon | undefined>(
    undefined
  );
  const [responseText, setResponseText] = useState("");
  const [score, setScore] = useState(0);
  const { data, isLoading, isError } = useRandomPokemon();

  //Fix next button so it only appears when u click guess and its right

  useEffect(() => {
    if (data) {
      setPokemonData(data);
    }
  }, [data]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleGuess = () => {
    if (pokemonData) {
      if (inputValue.toLowerCase() === pokemonData?.name.toLowerCase()) {
        setResponseText("You Got It");
        setScore((prev) => prev + 1);
      } else {
        setResponseText("Incorrect guess!");
      }
      setGuessed(true);
    }
  };

  const handleNext = () => {
    setInputValue("");
    setGuessed(false);
    setResponseText("");
  };

  if (isLoading) {
    return <Spinner></Spinner>;
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
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData?.id}.png`}
        />
        <p>Score: {score}</p>
        <Box className="fixed bottom-28">
          <Input
            placeholder="Enter your guess"
            variant={"filled"}
            value={inputValue}
            onChange={handleInputChange}
            w={500}
          />

          {guessed && (
            <>
              <Button onClick={handleNext}>Next</Button>
              <p>{responseText}</p>
            </>
          )}

          <Button onClick={handleGuess} disabled={inputValue === ""}>
            Guess
          </Button>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default WhosThatPokemon;
