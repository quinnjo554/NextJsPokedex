"use client";
import {
  ChakraProvider,
  Box,
  Text,
  Image,
  UnorderedList,
  ListItem,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getLearnset } from "@/getFunctions/getFunctions";
import BattleArea from "./BattleArea";

function MoveSelect({ id }: PokemonProps) {
  const [playerPokemonId, setPlayerPokemonId] = useState<string | undefined>(
    ""
  );
  const [aiPokemonId, setAiPokemonId] = useState<string | undefined>("");
  const [aiMoves, setAiMoves] = useState<MoveLearnset[] | undefined>();
  const [playerMoves, setPlayerMoves] = useState<MoveLearnset[] | undefined>();
  const [selectedPlayer1Moves, setSelectedPlayer1Moves] = useState<
    Array<MoveLearnset>
  >([]);
  const [selectedAiMoves, setSelectedAiMoves] = useState<Array<MoveLearnset>>(
    []
  );

  useEffect(() => {
    const ids = id?.split("%26");
    if (ids && ids.length === 2) {
      setPlayerPokemonId(ids[0]);
      setAiPokemonId(ids[1]);
    }
  }, []);

  useEffect(() => {
    async function getMoves() {
      const playerMoves = await getLearnset(Number(playerPokemonId));
      const aiMoves = await getLearnset(Number(aiPokemonId));
      setPlayerMoves(playerMoves);
      setAiMoves(aiMoves);
    }
    getMoves();
  }, [aiPokemonId, playerPokemonId]);

  const handlePlayer1MoveClick = (move: MoveLearnset) => {
    if (selectedPlayer1Moves.length < 4) {
      setSelectedPlayer1Moves((prevMoves) => [...prevMoves, move]);
    }
  };

  const handleAiMoveClick = (move: MoveLearnset) => {
    if (selectedAiMoves.length < 4) {
      setSelectedAiMoves((prevMoves) => [...prevMoves, move]);
    }
  };

  return (
    <ChakraProvider>
      <Box
        maxW="500px"
        m="auto"
        p={4}
        textAlign="center"
        backgroundColor="gray.100"
        borderRadius="md"
        boxShadow="md"
      >
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Selected Pokemon ID: {aiPokemonId}
        </Text>
        <Flex justifyContent="space-between" mb={4}>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${playerPokemonId}.png`}
            alt="Player Pokemon"
            boxSize="200px"
          />
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${aiPokemonId}.png`}
            alt="AI Pokemon"
            boxSize="200px"
          />
        </Flex>
        <Flex justifyContent="space-between">
          <Box h={550}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Player Moves:
            </Text>
            <UnorderedList
              className="overflow-scroll h-1/6"
              borderRadius="md"
              boxShadow="sm"
              bg="white"
              p={2}
            >
              {playerMoves?.map((value, index) => (
                <ListItem
                  onClick={() => handlePlayer1MoveClick(value)}
                  key={index}
                  cursor="pointer"
                  _hover={{ bg: "gray.200" }}
                  borderRadius="md"
                  p={1}
                >
                  {value.move.name}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
          <Box h={550}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              AI Moves:
            </Text>
            <UnorderedList
              className="overflow-scroll h-1/6"
              borderRadius="md"
              boxShadow="sm"
              bg="white"
              p={2}
            >
              {aiMoves?.map((value, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleAiMoveClick(value)}
                  cursor="pointer"
                  _hover={{ bg: "gray.200" }}
                  borderRadius="md"
                  p={1}
                >
                  {value.move.name}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Flex>
        <Flex justifyContent="space-between" mt={4}>
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Selected Player Moves:
            </Text>
            <UnorderedList
              className="overflow-scroll"
              borderRadius="md"
              boxShadow="sm"
              bg="white"
              p={2}
            >
              {selectedPlayer1Moves.map((value, index) => (
                <ListItem key={index} borderRadius="md" p={1}>
                  {value.move.name}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Selected AI Moves:
            </Text>
            <UnorderedList
              className="overflow-scroll"
              borderRadius="md"
              boxShadow="sm"
              bg="white"
              p={2}
              top={3}
            >
              {selectedAiMoves.map((value, index) => (
                <ListItem key={index} borderRadius="md" p={1}>
                  {value.move.name}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Flex>
        {selectedAiMoves.length === 4 && selectedPlayer1Moves.length === 4 ? (
          <BattleArea
            player1={playerPokemonId}
            ai={aiPokemonId}
            player1Moves={selectedPlayer1Moves}
            aiMoveSet={selectedAiMoves}
          />
        ) : (
          <></>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default MoveSelect;
