"use client";
import { ChakraProvider, Box } from "@chakra-ui/react";
import React from "react";
import LandingNav from "../NavBar";
import CapturedList from "./CapturedList";
function CapturedPokemon() {
  return (
    <ChakraProvider>
      <LandingNav hasButtons={true}></LandingNav>
      <CapturedList></CapturedList>
    </ChakraProvider>
  );
}

export default CapturedPokemon;
