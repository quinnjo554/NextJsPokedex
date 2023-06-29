"use client";
import { useMovies } from "@/getFunctions/getFunctions";
import {
  ChakraProvider,
  Link,
  Box,
  Text,
  Image,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
//TODO set up is loading and is error
function PokemonInfo() {
  const { data, isLoading, isError } = useMovies();
  const [movies, setMovies] = useState<Array<MovieApi>>([]);

  useEffect(() => {
    if (data) {
      setMovies(data.Search || []);
      console.log(data);
    }
  }, [data]);

  return (
    <ChakraProvider>
      <Box py={6} px={8} maxW="1200px" mx="auto" className="movieSelect">
        <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
          {movies.map((value, index) => (
            <Link
              key={index}
              href={`http://localhost:3000/other/${value.imdbID}`}
            >
              <Box
                p={4}
                borderWidth="1px"
                borderRadius="md"
                cursor="pointer"
                transition="all 0.3s ease-in-out"
                _hover={{ transform: "scale(1.05)" }}
              >
                <Image
                  src={value.Poster}
                  alt={value.Title}
                  mb={4}
                  borderRadius="md"
                />
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {value.Title}
                </Text>
                <Text color="gray.500">{value.Year}</Text>
                <Text color="gray.500">{value.Type}</Text>
              </Box>
            </Link>
          ))}
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default PokemonInfo;
