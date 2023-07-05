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
      mt={10}
    >
      {props.pokemon?.map((value, index) => {
        const types = value.types.map((type) => {
          const typeName = type.name.toLowerCase();
          const backgroundColor = props.typeColors[typeName] || "bg-gray-300";

          return (
            <ListItem
              key={value.id + Math.random()}
              display={"flex"}
              px={"2"}
              py={"0"}
              rounded={"sm"}
              textAlign={"center"}
              className={`${backgroundColor}`}
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
              className="pokemon-card"
              borderRadius="md"
              w={"48"}
              p={"2"}
              display={"grid"}
              rounded={"md"}
              mt={"3"}
              transition={"all"}
              animation={"ease-in-out"}
              bg={"rgba(0,0,0,0.7)"}
              textColor={"white"}
              _hover={{
                transform: "scale(1.05)",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <UnorderedList listStyleType="none">
                <ListItem
                  px={2}
                  textAlign={"center"}
                  bg={"rgba(100,116,139,1)"}
                  key={value.id}
                  rounded={"md"}
                >
                  {value.name}
                </ListItem>
              </UnorderedList>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${value.id}.png`}
                alt={value.name}
                width="90"
                mx={"auto"}
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
