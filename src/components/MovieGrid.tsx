import { MovieQuery } from "@/App";
import { Grid, Text, useBreakpointValue } from "@chakra-ui/react";
import useMovies, { Movie } from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Props {
  movieQuery: MovieQuery;
}

const MovieGrid = ({ movieQuery }: Props) => {
  const { movies, error, isLoading } = useMovies(movieQuery);
  const skeletons = Array(12).fill(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  console.log("Current breakpoint:", isMobile ? "mobile" : "desktop");
  console.log("Number of movies:", movies.length);
  console.log("Grid settings:", {
    columns: isMobile ? 3 : "auto-fill",
    gap: 1.5,
    padding: 1.5,
  });

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
      onLoad={(e) => {
        const grid = e.currentTarget;
        console.log("Grid dimensions:", {
          width: grid.offsetWidth,
          height: grid.offsetHeight,
          columnGap: window.getComputedStyle(grid).columnGap,
          padding: window.getComputedStyle(grid).padding,
        });
      }}
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
