"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ChakraBaseProvider,
  List,
  ListItem,
} from "@chakra-ui/react";
import { getPokemonById } from "@/queries/getFunctions";
import PokedexArray from "../PokemonList/PokedexArray";
function CapturedList() {
  const [pokemon, setPokemon] = useState<pokemon[]>([]);
  const [pokemonIds, setPokemonIds] = useState<string[] | null>(null);
  useEffect(() => {
    const capturedIds = Object.keys(localStorage).map(
      (key) => localStorage.getItem(key) || ""
    );
    setPokemonIds(capturedIds);
    setAllPokemonData();
  }, [pokemon]);
  async function setAllPokemonData(): Promise<void> {
    if (!pokemonIds) return;
    const pokemonPromises = pokemonIds
      .filter((value) => value !== "light") //why is this always in my local storeage
      .map(async (value) => {
        return await getPokemonById(value);
      });
    const pokemonList = await Promise.all(pokemonPromises);
    setPokemon(pokemonList);
  }
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
  return (
    <Box position={"fixed"} top={"24"}>
      <PokedexArray pokemon={pokemon} typeColors={typeColors}></PokedexArray>
      <Button
        onClick={() => {
          window.localStorage.clear();
        }}
      >
        Clear
      </Button>
    </Box>
  );
}

export default CapturedList;
