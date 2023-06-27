import { ChakraProvider, Box, Button } from "@chakra-ui/react";
import React from "react";

export function SpriteButtons({ setSpriteRender, id }: SpriteButtonsProps) {
  return (
    <ChakraProvider>
      <Box className="absolute top-28">
        <Button
          className=" bg-slate-400 hover:bg-opacity-60"
          bg="slate.200"
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
          className=" bg-slate-400 hover:bg-opacity-60"
          bg="slate.200"
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
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`
            );
          }}
        >
          Shiny
        </Button>
        <Button
          className="bg-slate-400 hover:bg-opacity-60"
          bg="slate.200"
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
          className=" bg-slate-400 hover:bg-opacity-60"
          bg="slate.200"
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
