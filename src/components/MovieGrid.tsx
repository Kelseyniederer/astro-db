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
      templateColumns={{
        base: "repeat(3, 1fr)",
        md: "repeat(auto-fill, minmax(180px, 1fr))",
      }}
      gap={{ base: "8px", md: "24px" }}
      width="100%"
      alignItems="stretch"
      minH="200px"
      px={{ base: "4px", md: "24px" }}
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
