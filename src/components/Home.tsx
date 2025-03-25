import { MovieQuery } from "@/App";
import { Box, Container, VStack } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import MovieGrid from "./MovieGrid";
import MovieHeading from "./MovieHeading";
import TrendingPeople from "./TrendingPeople";

const Home = () => {
  const movieQuery = useOutletContext<MovieQuery>();
  const isSearching = Boolean(movieQuery.searchText);
  const isFilteringByGenre = Boolean(movieQuery.genreId);
  const shouldShowTrendingPeople = !isSearching && !isFilteringByGenre;

  return (
    <Box
      pt={{ base: "44px", md: "48px" }}
      width="100%"
      maxW="100vw"
      overflowX="hidden"
    >
      <Container maxW="container.xl" py={{ base: 4, md: 6, lg: 8 }}>
        <VStack spacing={{ base: 4, md: 6 }} align="stretch" width="100%">
          {shouldShowTrendingPeople && <TrendingPeople />}
          <VStack spacing={{ base: 4, md: 6 }} align="stretch" width="100%">
            <MovieHeading movieQuery={movieQuery} />
            <MovieGrid movieQuery={movieQuery} />
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
