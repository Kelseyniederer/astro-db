import { MovieQuery } from "@/App";
import { VStack } from "@chakra-ui/react";
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
    <VStack spacing={{ base: 4, md: 6 }} align="stretch" width="100%">
      {shouldShowTrendingPeople && <TrendingPeople />}
      <VStack spacing={{ base: 4, md: 6 }} align="stretch" width="100%">
        <MovieHeading movieQuery={movieQuery} />
        <MovieGrid movieQuery={movieQuery} />
      </VStack>
    </VStack>
  );
};

export default Home;
