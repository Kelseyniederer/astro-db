import { MovieQuery } from "@/App";
import { GridItem } from "@chakra-ui/react";
import MovieGrid from "./MovieGrid";
import MovieHeading from "./MovieHeading";

interface Props {
  movieQuery: MovieQuery;
  onSelectGenre: (genre: any) => void;
}

const Home = ({ movieQuery, onSelectGenre }: Props) => {
  return (
    <>
      <GridItem area="main">
        <MovieHeading movieQuery={movieQuery} />
        <MovieGrid movieQuery={movieQuery} />
      </GridItem>
    </>
  );
};

export default Home;
