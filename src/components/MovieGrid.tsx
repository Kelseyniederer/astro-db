import { MovieQuery } from "@/App";
import { Grid, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import useMovies, { Movie } from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Props {
  movieQuery: MovieQuery;
}

const MovieGrid = ({ movieQuery }: Props) => {
  const { movies, error, isLoading } = useMovies(movieQuery);
  const skeletons = Array(15).fill(null);

  useEffect(() => {
    // Log when loading state changes
    console.log("\n=== MovieGrid Render ===");
    console.log("Loading state:", isLoading);
    console.log("Movies length:", movies?.length);

    // Log grid items
    const gridElement = document.querySelector('[role="grid"]');
    if (gridElement) {
      const gridStyle = window.getComputedStyle(gridElement);
      const gridHtml = gridElement as HTMLElement;
      console.log("\n=== Grid Container ===");
      console.log("Grid computed style:", {
        display: gridStyle.display,
        gridTemplateColumns: gridStyle.gridTemplateColumns,
        gap: gridStyle.gap,
        alignItems: gridStyle.alignItems,
        width: gridStyle.width,
        maxWidth: gridStyle.maxWidth,
        padding: gridStyle.padding,
        margin: gridStyle.margin,
        position: gridStyle.position,
      });
      console.log("Grid dimensions:", {
        clientWidth: gridHtml.clientWidth,
        clientHeight: gridHtml.clientHeight,
        offsetWidth: gridHtml.offsetWidth,
        offsetHeight: gridHtml.offsetHeight,
        scrollWidth: gridHtml.scrollWidth,
        scrollHeight: gridHtml.scrollHeight,
      });
      console.log("Grid children count:", gridElement.children.length);

      // Log all card dimensions
      Array.from(gridElement.children).forEach((card, index) => {
        const cardStyle = window.getComputedStyle(card);
        const cardHtml = card as HTMLElement;
        console.log(`\n=== Card ${index} ===`);
        console.log("Card type:", isLoading ? "Skeleton" : "Movie");
        console.log("Card dimensions:", {
          clientWidth: cardHtml.clientWidth,
          clientHeight: cardHtml.clientHeight,
          offsetWidth: cardHtml.offsetWidth,
          offsetHeight: cardHtml.offsetHeight,
          scrollWidth: cardHtml.scrollWidth,
          scrollHeight: cardHtml.scrollHeight,
        });
        console.log("Card computed style:", {
          display: cardStyle.display,
          position: cardStyle.position,
          height: cardStyle.height,
          minHeight: cardStyle.minHeight,
          maxHeight: cardStyle.maxHeight,
          width: cardStyle.width,
          minWidth: cardStyle.minWidth,
          maxWidth: cardStyle.maxWidth,
          margin: cardStyle.margin,
          padding: cardStyle.padding,
        });

        // Log card children
        const cardChildren = Array.from(card.children);
        cardChildren.forEach((child, childIndex) => {
          const childStyle = window.getComputedStyle(child);
          const childHtml = child as HTMLElement;
          console.log(`Card child ${childIndex}:`, {
            tagName: childHtml.tagName,
            className: childHtml.className,
            display: childStyle.display,
            position: childStyle.position,
            height: childStyle.height,
            width: childStyle.width,
            margin: childStyle.margin,
            padding: childStyle.padding,
          });
        });
      });
    }
  }, [isLoading, movies]);

  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Grid
      role="grid"
      templateColumns={{
        base: "repeat(1, 250px)",
        sm: "repeat(2, 250px)",
        md: "repeat(3, 250px)",
        lg: "repeat(4, 250px)",
      }}
      gap={4}
      width="100%"
      alignItems="stretch"
      justifyContent="center"
      minH="200px"
    >
      {/* ✅ Show loading skeletons */}
      {isLoading &&
        skeletons.map((_, index) => <MovieCardSkeleton key={index} />)}

      {/* ✅ Ensure `movies` is an array before mapping */}
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
