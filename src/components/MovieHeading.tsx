import { HStack, Heading, Icon, VStack } from "@chakra-ui/react";
import { BiCameraMovie } from "react-icons/bi";
import { PiPlanet } from "react-icons/pi";
import { MovieQuery } from "../App";

interface Props {
  movieQuery: MovieQuery;
}

const MovieHeading = ({ movieQuery }: Props) => {
  const heading = movieQuery.searchText
    ? `Search Results for "${movieQuery.searchText}"`
    : movieQuery.genre
    ? `${movieQuery.genre.name} Movies`
    : "Discover Movies & TV Shows";

  return (
    <VStack mb={8} gap={2} align="center">
      <HStack gap={2} display={{ base: "flex", md: "none" }}>
        <Icon as={BiCameraMovie} boxSize={8} color="white.400" />
        <Heading as="h1" size="2xl" fontWeight="bold">
          AstroDB
        </Heading>
        <Icon as={PiPlanet} boxSize={6} color="white.400" />
      </HStack>
      <Heading as="h2" size="lg" color="gray.600" _dark={{ color: "gray.400" }}>
        {heading}
      </Heading>
    </VStack>
  );
};

export default MovieHeading;
