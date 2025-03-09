import { Box, Heading } from "@chakra-ui/react";
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
    <Box mb={8}>
      <Heading as="h1" size="2xl">
        {heading}
      </Heading>
    </Box>
  );
};

export default MovieHeading;
