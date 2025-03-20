import { MovieQuery } from "@/App";
import { Container } from "@chakra-ui/react";
import MovieGrid from "./MovieGrid";
import MovieHeading from "./MovieHeading";

interface Props {
  movieQuery: MovieQuery;
}

const Home = ({ movieQuery }: Props) => {
  return (
    <Container maxW="container.xl" py={8}>
      <MovieHeading movieQuery={movieQuery} />
      <MovieGrid movieQuery={movieQuery} />
    </Container>
  );
};

export default Home;
