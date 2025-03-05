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
  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

  if (error) return <Text>{error}</Text>;

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} padding={10} gap={6}>
      {isLoading &&
        skeletons.map((skeleton) => (
          <MovieCardContainer key={skeleton}>
            <MovieCardSkeleton />
          </MovieCardContainer>
        ))}
      {data.map((movie) => (
        <MovieCardContainer key={movie.id}>
          <MovieCard movie={movie}></MovieCard>
        </MovieCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
