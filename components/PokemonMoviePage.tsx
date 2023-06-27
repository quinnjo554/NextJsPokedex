"use client";
import { useMoviesDetails } from "@/getFunctions/getFunctions";
import { ChakraProvider, Box, Text, Image, Badge } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function PokemonMoviePage({ id }: PokemonProps) {
  const { data, isLoading, isError } = useMoviesDetails(id);
  const [details, setDetails] = useState<MovieDetails>();

  useEffect(() => {
    if (data) {
      setDetails(data);
    }
  }, [data]);

  return (
    <ChakraProvider>
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        bg="gray.800"
        color="white"
        textAlign="center" // Center the content
        mx="auto" // Center the box horizontally
        mt={10} // Add top margin for spacing
      >
        {isLoading ? (
          <Text>Loading...</Text>
        ) : isError ? (
          <Text>Error loading movie details</Text>
        ) : (
          <>
            <Image src={details?.Poster} alt={details?.Title} ml={14} mb={4} />
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              {details?.Title}
            </Text>
            <Text>
              <strong>Year:</strong> {details?.Year}
            </Text>
            <Text>
              <strong>Rated:</strong> {details?.Rated}
            </Text>
            <Text>
              <strong>Director:</strong> {details?.Director}
            </Text>
            <Text>
              <strong>Actors:</strong> {details?.Actors}
            </Text>
            <Text>
              <strong>Plot:</strong> {details?.Plot}
            </Text>
            <Box mt={4}>
              <Text fontSize="lg" fontWeight="bold">
                Rating
              </Text>
              <Badge
                variant="solid"
                colorScheme={getRatingColorScheme(details?.imdbRating || "0")}
                px={3} // Add padding to the badge
                py={1} // Add padding to the badge
                mx="auto" // Center the badge horizontally
              >
                {details?.imdbRating || "N/A"}
              </Badge>
            </Box>
          </>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default PokemonMoviePage;

function getRatingColorScheme(rating: string) {
  const numericRating = parseFloat(rating);
  if (numericRating >= 7) {
    return "green";
  } else if (numericRating >= 6) {
    return "yellow";
  } else {
    return "red";
  }
}
