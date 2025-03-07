import { MovieQuery } from "@/App";
import { SimpleGrid, Text } from "@chakra-ui/react";
import useMovies, { Movie } from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Props {
  movieQuery: MovieQuery;
}

const MovieGrid = ({ movieQuery }: Props) => {
  const { movies, error, isLoading } = useMovies(movieQuery);
  const skeletons = Array(16).fill(null);

  console.log("Movies in MovieGrid.tsx:", movies); // ✅ Confirm `movies` is passed

  if (error) return <Text>{error}</Text>;

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding={7} gap={5}>
      {/* ✅ Show loading skeletons */}
      {isLoading &&
        skeletons.map((_, index) => (
          <MovieCardContainer key={index}>
            <MovieCardSkeleton />
          </MovieCardContainer>
        ))}

      {/* ✅ Ensure `movies` is an array before mapping */}
      {
        movies.length > 0
          ? movies.map((movie: Movie) => (
              <MovieCardContainer key={movie.id}>
                <MovieCard movie={movie} />
              </MovieCardContainer>
            ))
          : !isLoading && <Text>No movies found.</Text> // ✅ Show message if no movies
      }
    </SimpleGrid>
  );
};

export default MovieGrid;
