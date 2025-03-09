import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import noImage from "../../assets/no-image-placeholder-6f3882e0.webp";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
}

interface ActorFilmographyProps {
  movies: Movie[];
  error?: string;
}

export const ActorFilmography = ({ movies, error }: ActorFilmographyProps) => {
  return (
    <Box>
      <Heading as="h2" size="xl" mb={8}>
        Filmography
      </Heading>

      {error ? (
        <Text color="red.500">Error loading movies: {error}</Text>
      ) : movies.length > 0 ? (
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} gap={6}>
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <Box
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "xl",
                }}
                transition="all 0.2s"
                borderRadius="xl"
                overflow="hidden"
                bg="gray.800"
              >
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : noImage
                  }
                  alt={movie.title}
                  width="100%"
                  height="auto"
                  aspectRatio="2/3"
                  objectFit="cover"
                />
                <Box p={3}>
                  <Text
                    fontWeight="bold"
                    fontSize="sm"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {movie.title}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "N/A"}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize="lg" color="gray.400">
          No movies found.
        </Text>
      )}
    </Box>
  );
};
