import { MovieQuery } from "@/App";
import { Container, VStack } from "@chakra-ui/react";
import MovieGrid from "./MovieGrid";
import MovieHeading from "./MovieHeading";
import TrendingPeople from "./TrendingPeople";

interface Props {
  movieQuery: MovieQuery;
}

const Home = ({ movieQuery }: Props) => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={16} align="stretch">
        <TrendingPeople />
        <VStack spacing={8} align="stretch">
          <MovieHeading movieQuery={movieQuery} />
          <MovieGrid movieQuery={movieQuery} />
        </VStack>
      </VStack>
    </Container>
  );
};

export default Home;
