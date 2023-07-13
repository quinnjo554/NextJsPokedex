"use client";
import React, { useEffect } from "react";
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
//Break up components try not to exceed 100 lines

function LandingPage() {
  return (
    <ChakraProvider>
      <LandingNav hasButtons={true}></LandingNav>
      <Box
        className="hero landingpage"
        position={"fixed"}
        top={"20"}
        zIndex={"-1"}
        w={"full"}
        h={"full"}
      >
        <Box className="card" id="pokecard">
          <Box className="card-content">
            <Heading className="title">Pokedex</Heading>
            <Text className="card-body">Battle with Your favorite pokemon</Text>
            <ChakraLink as={Link} href={"/battle/landing"} className="button">
              Battle
            </ChakraLink>
          </Box>
        </Box>
        <Box className="heroText" position={"fixed"} w={"max"} left={"15%"}>
          <Box className="hero-content" w={"50%"}>
            <Heading
              as="h1"
              size="3xl"
              mb={"3"}
              fontWeight={"semibold"}
              textColor={"white"}
              fontFamily={"sans-serif"}
            >
              Pokedex
            </Heading>
            <Text
              size="lg"
              textColor={"white"}
              fontSize={"lg"}
              fontWeight={"medium"}
            >
              tenetur suscipit rem ducimus aliquam possimus nobis illo natus
              quos ad libero doloremque eligendi facere aperiam, optio fuga
              architecto atque officia molestias culpa nihil. Ducimus.
            </Text>
            <ChakraLink as={Link} href={"/pokedex/home/0"}>
              <Button
                textColor={"white"}
                mt={"4"}
                bg={"green.500"}
                _hover={{ bg: "green.300" }}
                animation={"ease-in-out"}
                marginTop={"4"}
                className="button"
              >
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
