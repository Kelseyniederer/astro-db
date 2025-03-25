import { Heading, VStack } from "@chakra-ui/react";
import { MovieQuery } from "../App";
import movieGenres from "../data/genres";

interface Props {
  movieQuery: MovieQuery;
}

const MovieHeading = ({ movieQuery }: Props) => {
  const selectedGenre = movieGenres.find((g) => g.id === movieQuery.genreId);

  const heading = movieQuery.searchText
    ? `Search Results for "${movieQuery.searchText}"`
    : selectedGenre
    ? `${selectedGenre.name} Movies & TV Shows`
    : "Discover Movies & TV Shows";

  return (
    <VStack mb={8} gap={2} align="center">
      <Heading
        as="h2"
        size="lg"
        color="gray.600"
        _dark={{ color: "gray.400" }}
        alignSelf="flex-start"
        mb={4}
      >
        {heading}
      </Heading>
    </VStack>
  );
};

export default MovieHeading;
