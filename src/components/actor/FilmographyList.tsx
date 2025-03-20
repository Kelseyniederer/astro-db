import { Box, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import noImage from "../../assets/no-image-placeholder-6f3882e0.webp";
import { Credit } from "../../hooks/usePersonMovies";

interface Props {
  movies: Credit[];
  error?: string;
}

const FilmographyList = ({ movies, error }: Props) => {
  const navigate = useNavigate();

  // Ensure movies is an array and filter out invalid credits
  const movieArray = (Array.isArray(movies) ? movies : []).filter(
    (credit): credit is Credit =>
      credit &&
      typeof credit === "object" &&
      "id" in credit &&
      "media_type" in credit &&
      (credit.media_type === "movie" || credit.media_type === "tv")
  );

  // Sort by release date by default
  const sortedMovies = [...movieArray].sort((a, b) => {
    const dateA = a.release_date || a.first_air_date || "";
    const dateB = b.release_date || b.first_air_date || "";
    return dateB.localeCompare(dateA);
  });

  if (error) {
    return <Text color="red.500">Error loading filmography: {error}</Text>;
  }

  return (
    <Box width="100%">
      <Box mb={8}>
        <Heading as="h2" size="xl" color="black" _dark={{ color: "white" }}>
          Filmography
        </Heading>
      </Box>

      {sortedMovies.length > 0 ? (
        <SimpleGrid
          gap={6}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {sortedMovies.map((credit) => (
            <Box
              key={`${credit.media_type}-${credit.id}`}
              onClick={() => navigate(`/${credit.media_type}/${credit.id}`)}
              cursor="pointer"
              borderRadius="12px"
              overflow="hidden"
              bg="gray.50"
              boxShadow="md"
              borderWidth="1px"
              borderColor="gray.200"
              transition="all 0.2s"
              _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
              _dark={{
                bg: "gray.800",
                borderColor: "gray.700",
              }}
            >
              <Image
                src={
                  credit.poster_path
                    ? `https://image.tmdb.org/t/p/w300${credit.poster_path}`
                    : noImage
                }
                alt={credit.title || credit.name || ""}
                width="100%"
                height="auto"
                objectFit="cover"
                aspectRatio="2/3"
              />
              <Box p={3} bg="white" _dark={{ bg: "gray.800" }}>
                <Text
                  fontWeight="bold"
                  fontSize="sm"
                  color="black"
                  _dark={{ color: "white" }}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  mb={1}
                >
                  {credit.title || credit.name}
                </Text>
                <Text
                  fontSize="xs"
                  color="gray.700"
                  _dark={{ color: "gray.400" }}
                >
                  {credit.release_date || credit.first_air_date
                    ? new Date(
                        credit.release_date || credit.first_air_date || ""
                      ).getFullYear()
                    : "N/A"}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize="lg" color="gray.700" _dark={{ color: "gray.400" }}>
          No credits found.
        </Text>
      )}
    </Box>
  );
};

export default FilmographyList;
