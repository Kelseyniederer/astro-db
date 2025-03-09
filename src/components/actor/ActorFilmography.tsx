import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import noImage from "../../assets/no-image-placeholder-6f3882e0.webp";
import { Credit } from "../../hooks/usePersonMovies";

interface ActorFilmographyProps {
  movies: Credit[];
  error?: string;
}

export const ActorFilmography = ({ movies, error }: ActorFilmographyProps) => {
  return (
    <Box>
      <Heading as="h2" size="xl" mb={8}>
        Filmography
      </Heading>

      {error ? (
        <Text color="red.500">Error loading filmography: {error}</Text>
      ) : movies.length > 0 ? (
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} gap={6}>
          {movies.map((credit) => (
            <Link key={credit.id} to={`/${credit.media_type}/${credit.id}`}>
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
                    credit.poster_path
                      ? `https://image.tmdb.org/t/p/w300${credit.poster_path}`
                      : noImage
                  }
                  alt={credit.title || credit.name}
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
                    {credit.title || credit.name}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    {credit.release_date || credit.first_air_date
                      ? new Date(
                          credit.release_date || credit.first_air_date || ""
                        ).getFullYear()
                      : "N/A"}
                  </Text>
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize="lg" color="gray.400">
          No credits found.
        </Text>
      )}
    </Box>
  );
};
