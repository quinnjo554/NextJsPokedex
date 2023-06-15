"use client";
import React from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Text,
  Heading,
  Link as ChakraLink,
  Link,
} from "@chakra-ui/react";
import LandingNav from "./NavBar";
function LandingPage() {
  return (
    <ChakraProvider>
      <LandingNav hasButtons={true}></LandingNav>
      <Box className="hero fixed top-20 z-[-1] w-full h-full landingpage">
        <Box className="card" id="pokecard">
          <Box className="card-content">
            <Heading className="title">Pokedex</Heading>
            <Text className="card-body">Battle with Your favorite pokemon</Text>
            <ChakraLink as={Link} href={"/battle/landing"} className="button">
              Battle
            </ChakraLink>
          </Box>
        </Box>
        <Box className="heroText fixed w-max left-[15%]">
          <Box className="hero-content w-1/2">
            <Heading
              as="h1"
              size="3xl"
              className="text-white mb-3 font-semibold font-sans"
            >
              Pokedex
            </Heading>
            <Text size="lg" className="text-white text-lg font-medium">
              tenetur suscipit rem ducimus aliquam possimus nobis illo natus
              quos ad libero doloremque eligendi facere aperiam, optio fuga
              architecto atque officia molestias culpa nihil. Ducimus.
            </Text>
            <ChakraLink as={Link} href={"/pokedex/home/0"}>
              <Button className="button text-white mt-4 shadow-md shadow-white hover:shadow-none ease-in-out">
                Try For Free
              </Button>
            </ChakraLink>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default LandingPage;
