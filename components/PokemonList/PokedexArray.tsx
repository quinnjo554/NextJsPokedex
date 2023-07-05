import React from "react";

import {
  Box,
  Grid,
  Link,
  Image,
  List,
  ListItem,
  UnorderedList,
  Flex,
} from "@chakra-ui/react";

function PokedexArray(props: {
  pokemon: pokemon[] | undefined;
  typeColors: TypeColors;
}) {
  return (
    <Grid
      className="mobile-center"
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      gap={3}
      p={6}
    >
      {props.pokemon?.map((value, index) => {
        const types = value.types.map((type) => {
          const typeName = type.name.toLowerCase();
          const backgroundColor = props.typeColors[typeName] || "bg-gray-300";

          return (
            <ListItem
              key={value.id + Math.random()}
              className={`flex px-2 py-0 mr-2 rounded-sm ${backgroundColor} text-center`}
              fontSize="sm"
            >
              {type.name}
            </ListItem>
          );
        });

        return (
          <Link
            href={`/pokedex/${value.id}`}
            key={index}
            _hover={{ textDecoration: "none" }}
          >
            <Box
              className="pokemon-card w-48 p-2 grid rounded-md mt-3 transition-all ease-in-out bg-black bg-opacity-70 text-white"
              borderRadius="md"
              _hover={{
                transform: "scale(1.05)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <UnorderedList listStyleType="none">
                <ListItem
                  className="text-center bg-slate-500 rounded-md"
                  px={2}
                  key={value.id}
                >
                  {value.name}
                </ListItem>
              </UnorderedList>
              <Image
                className="mx-auto"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${value.id}.png`}
                alt=""
                width="90"
                height="110"
              />
              <Flex justifyContent="space-between">
                <Box># {value.id}</Box>
                <List display="flex">{types}</List>
              </Flex>
            </Box>
          </Link>
        );
      })}
    </Grid>
  );
}

export default PokedexArray;
