"use client";
import React, { useEffect, useState } from "react";
import Pokeball from "../public/file-pokeball-png-0.png";
import Image from "next/image";
import Link from "next/link";
import { useRandomPokemon } from "@/getFunctions/getFunctions";
import {
  ChakraProvider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
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
      <div className="fixed top-0 w-full h-20 rounded-md z-20 bg-black shadow-md shadow-gray-400">
        <div className="content">
          <div>
            <Link href="/">
              <Image
                src={Pokeball}
                alt="Pokeball"
                width={"60"}
                height={"60"}
                className="fixed top-2 ml-3"
              />
            </Link>
            <h1 className="fixed left-24 top-5 text-2xl w-max font-semibold text-white">
              Pokedex
            </h1>
          </div>
          <div className="list flex justify-end mr-14 mt-5">
            {props.hasButtons && (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                  className="bg-white"
                />
                <MenuList className="z-20">
                  <Link href={`http://localhost:3000/whosthatpokemon/`}>
                    <MenuItem>Whos That Pokemon</MenuItem>
                  </Link>
                  <Link href={`http://localhost:3000/pokedex/${id}`}>
                    <MenuItem className="z-20">Random Pokemon</MenuItem>
                  </Link>
                  <Link href={`http://localhost:3000/other`}>
                    <MenuItem className="z-20">Pokemon Info</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default LandingNav;
