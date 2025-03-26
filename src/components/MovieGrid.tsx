import { MovieQuery } from "@/App";
import { Grid, Text } from "@chakra-ui/react";
import useMovies, { Movie } from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Props {
  movieQuery: MovieQuery;
}

const MovieGrid = ({ movieQuery }: Props) => {
  const { movies, error, isLoading } = useMovies(movieQuery);
  const skeletons = Array(12).fill(null);

  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Grid
      role="grid"
      templateColumns={{
        base: "repeat(1, 250px)",
        sm: "repeat(2, 250px)",
        md: "repeat(3, 250px)",
        lg: "repeat(4, 250px)",
        xl: "repeat(5, 250px)",
      }}
      gap={6}
      width="100%"
      alignItems="stretch"
      justifyContent="center"
      minH="200px"
    >
      {isLoading &&
        skeletons.map((_, index) => <MovieCardSkeleton key={index} />)}

      {!isLoading &&
        (movies.length > 0 ? (
          movies.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <Text fontSize="lg" color="gray.400">
            No movies found.
          </Text>
        ))}
    </Grid>
  );
};

export default MovieGrid;
