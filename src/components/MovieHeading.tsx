import { MovieQuery } from "@/App";
import { Box, Heading } from "@chakra-ui/react";

interface Props {
  movieQuery: MovieQuery;
}

const MovieHeading = ({ movieQuery }: Props) => {
  const heading = movieQuery.genre
    ? movieQuery.genre.name + " Movies"
    : "Movies";

  return (
    <Box mb={8}>
      <Heading as="h1" size="2xl">
        {heading}
      </Heading>
    </Box>
  );
};

export default MovieHeading;
