"use client";
import React, { useEffect, useState } from "react";
import Pokeball from "../public/file-pokeball-png-0.png";
import Image from "next/image";
import Link from "next/link";
import { useRandomPokemon } from "@/queries/getFunctions";
import {
  ChakraProvider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
function LandingNav(props: { hasButtons: boolean }) {
  const { data, isLoading, isError } = useRandomPokemon();
  const [id, setId] = useState(1);
  useEffect(() => {
    if (data) {
      setId(data["id"]);
    }
  }, []);

  return (
    <ChakraProvider>
      <Box
        position={"fixed"}
        top={"0"}
        w={"full"}
        h={"20"}
        rounded={"md"}
        zIndex={"20"}
        bg={"black"}
        boxShadow={"dark-lg"}
      >
        <Box className="content">
          <Box>
            <Box position={"fixed"} top={"2"} left={"5"}>
              <Link href="/">
                <Image
                  src={Pokeball}
                  alt="Pokeball"
                  width={"60"}
                  height={"60"}
                />
              </Link>
            </Box>
            <Heading
              as={"h1"}
              textColor={"white"}
              fontWeight={"semibold"}
              w={"max"}
              fontSize={"2xl"}
              top={"5"}
              left={"24"}
              position={"fixed"}
            >
              Pokedex
            </Heading>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"end"}
            marginRight={"14"}
            marginTop={"5"}
          >
            {props.hasButtons && (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                  bg={"white"}
                />
                <MenuList zIndex={"20"}>
                  <Link href={`http://localhost:3000/whosthatpokemon/`}>
                    <MenuItem>Whos That Pokemon</MenuItem>
                  </Link>
                  <Link href={`http://localhost:3000/pokedex/${id}`}>
                    <MenuItem zIndex={"20"}>
                      Random Pokemon
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            )}
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default LandingNav;
