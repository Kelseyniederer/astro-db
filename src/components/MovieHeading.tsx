import { VStack } from "@chakra-ui/react";
import { MovieQuery } from "../App";
import movieGenres from "../data/genres";
import SectionHeading from "./common/SectionHeading";

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
    <VStack gap={2} align="stretch">
      <SectionHeading pt={4}>{heading}</SectionHeading>
    </VStack>
  );
};

export default MovieHeading;
