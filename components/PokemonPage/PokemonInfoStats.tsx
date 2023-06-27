import {
  ChakraProvider,
  Grid,
  Box,
  Heading,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
import React from "react";

export function PokemonInfoStats(props: { pokeData: pokemon | undefined }) {
  return (
    <ChakraProvider>
      <Grid gridTemplateColumns="1fr 2fr" gap="6">
        <Box>
          <Heading as="h2" fontSize="xl" fontWeight="bold">
            Height
          </Heading>
          <Text>{props.pokeData?.height}</Text>
        </Box>
        <Box>
          <Heading as="h2" fontSize="xl" fontWeight="bold">
            Weight
          </Heading>
          <Text>{props.pokeData?.weight}</Text>
        </Box>
        <Box>
          <Heading as="h2" fontSize="xl" fontWeight="bold">
            Egg Groups
          </Heading>
          <List display="flex">
            {props.pokeData?.eggGroups.map((value, index) => (
              <ListItem className="mr-2 p-1 w-max rounded-sm" key={index}>
                {value.name}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <Heading as="h2" fontSize="xl" fontWeight="bold">
            Types
          </Heading>
          <List display="flex">
            {props.pokeData?.types.map((value, index) => (
              <ListItem className="mr-2 p-1 w-max rounded-sm" key={index}>
                {value.name}
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    </ChakraProvider>
  );
}
