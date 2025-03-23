import { MovieQuery } from "@/App";
import { Text } from "@chakra-ui/react";
import useMovies, { Movie } from "../hooks/useMovies";
import styles from "../styles/Home.module.css";
import MovieCard from "./MovieCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Props {
  movieQuery: MovieQuery;
}

const MovieGrid = ({ movieQuery }: Props) => {
  const { movies, error, isLoading } = useMovies(movieQuery);
  const skeletons = Array(15).fill(null);

  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <div className={styles.grid}>
      {/* ✅ Show loading skeletons */}
      {isLoading &&
        skeletons.map((_, index) => (
          <MovieCardContainer key={index}>
            <MovieCardSkeleton />
          </MovieCardContainer>
        ))}

      {/* ✅ Ensure `movies` is an array before mapping */}
      {!isLoading &&
        (movies.length > 0 ? (
          movies.map((movie: Movie) => (
            <MovieCardContainer key={movie.id}>
              <MovieCard movie={movie} />
            </MovieCardContainer>
          ))
        ) : (
          <Text fontSize="lg" color="gray.400">
            No movies found.
          </Text>
        ))}
    </div>
  );
};

export default MovieGrid;
