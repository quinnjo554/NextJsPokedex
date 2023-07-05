import { ChakraProvider, Box, Button } from "@chakra-ui/react";
import React from "react";

export function SpriteButtons({ setSpriteRender, id }: SpriteButtonsProps) {
  return (
    <ChakraProvider>
      <Box className="absolute top-28">
        <Button
          bg="rgb(148,163,184,1)"
          _hover={{ bgOpacity: "80" }}
          fontWeight="semibold"
          color="white"
          fontSize="lg"
          px="3"
          py="1"
          rounded="md"
          transition="duration.300"
          onClick={() => {
            setSpriteRender(
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            );
          }}
        >
          Original
        </Button>
        <Button
          bg="rgb(148,163,184,1)"
          _hover={{ bgOpacity: "80" }}
          fontWeight="semibold"
          color="white"
          fontSize="lg"
          px="3"
          py="1"
          rounded="md"
          transition="duration.300"
          onClick={() => {
            setSpriteRender(
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`
            );
          }}
        >
          Shiny
        </Button>
        <Button
          bg="rgb(148,163,184,1)"
          fontWeight="semibold"
          _hover={{ bgOpacity: "80" }}
          color="white"
          fontSize="lg"
          px="3"
          py="1"
          rounded="md"
          transition="duration.300"
          onClick={() => {
            setSpriteRender(
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            );
          }}
        >
          Sprite
        </Button>
        <Button
          bg="rgb(148,163,184,1)"
          fontWeight="semibold"
          _hover={{ bgOpacity: "80" }}
          color="white"
          fontSize="lg"
          px="3"
          py="1"
          rounded="md"
          transition="duration.300"
          onClick={() => {
            setSpriteRender(
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
            );
          }}
        >
          Shiny
        </Button>
      </Box>
    </ChakraProvider>
  );
}
