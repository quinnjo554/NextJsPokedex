"use client";
import React, { useEffect, useState } from "react";
import Pokeball from "../public/file-pokeball-png-0.png";
import Link from "next/link";
import { useRandomPokemon } from "@/getFunctions/getFunctions";
import {
  ChakraProvider,
  Box,
  Flex,
  Image,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
function LandingNav(props: { hasButtons: boolean }) {
  //set up isLoading and is Error
  const { data, isLoading, isError } = useRandomPokemon();
  const [id, setId] = useState(1);
  useEffect(() => {
    if (data) {
      setId(data["id"]);
    }
  }, []);

  return (
    <ChakraProvider>
      <Box className="fixed top-0 w-full h-20 rounded-md z-20 bg-black shadow-md shadow-gray-400">
        <Flex className="content">
          <Flex>
            <Link href="/">
              <Image
                src={Pokeball.src}
                alt="Pokeball"
                width={45}
                height={45}
                position={"fixed"}
                top={5}
                left={"16"}
                ml={3}
              />
            </Link>
            <Heading
              as="h1"
              size="xl"
              color="white"
              className="fixed left-32 top-5 text-2xl w-max font-semibold"
            >
              Pokedex
            </Heading>
          </Flex>
          <Flex className="list flex justify-end mr-14 mt-5">
            {props.hasButtons && (
              <Menu>
                <MenuButton
                  ml="2"
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                  className="bg-white"
                />
                <MenuList className="z-20">
                  <Link href="http://localhost:3000/whosthatpokemon/">
                    <MenuItem>Whos That Pokemon</MenuItem>
                  </Link>
                  <Link href={`http://localhost:3000/pokedex/${id}`}>
                    <MenuItem className="z-20">Random Pokemon</MenuItem>
                  </Link>
                  <Link href="http://localhost:3000/other">
                    <MenuItem className="z-20">Pokemon Info</MenuItem>
                  </Link>
                  <Link href="http://localhost:3000/weather">
                    <MenuItem>Pokemon Weather</MenuItem>
                  </Link>
                  <Link href="http://localhost:3000/captured-pokemon">
                    <MenuItem>My Pokemon</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default LandingNav;
