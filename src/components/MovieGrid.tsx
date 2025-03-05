import { MovieQuery } from "@/App";
import { SimpleGrid, Text } from "@chakra-ui/react";
import useMovies from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardContainer from "./MovieCardContainer";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Props {
  movieQuery: MovieQuery;
}

const MovieGrid = ({ movieQuery }: Props) => {
  const { data, error, isLoading } = useMovies(movieQuery);
  const skeletons = Array(16).fill(null); // ✅ Simplified Skeleton Array

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

      {/* ✅ Show only movies or people */}
      {data.map((item) => (
        <MovieCardContainer key={item.id}>
          <MovieCard movie={item} />
        </MovieCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
