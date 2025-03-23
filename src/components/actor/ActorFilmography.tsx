import {
  Box,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import noImage from "../../assets/no-image-placeholder-6f3882e0.webp";
import { Credit } from "../../hooks/usePersonMovies";
import CriticScore from "../CriticScore";

interface ActorFilmographyProps {
  movies: Credit[];
  error?: string;
  title?: string;
  columns?: { base: number; sm: number; md: number; lg: number };
}

const defaultColumns = { base: 2, sm: 3, md: 4, lg: 5 };

export const ActorFilmography = ({
  movies,
  error,
  title = "Filmography",
  columns = defaultColumns,
}: ActorFilmographyProps) => {
  // Sort movies by release date
  const sortedMovies = movies.sort((a, b) => {
    const dateA = a.release_date || a.first_air_date || "";
    const dateB = b.release_date || b.first_air_date || "";
    return dateB.localeCompare(dateA);
  });

  if (error) {
    return (
      <Text color="red.500">
        Error loading {title.toLowerCase()}: {error}
      </Text>
    );
  }

  return (
    <Box>
      <Heading
        as="h2"
        size="xl"
        mb={8}
        color="black"
        _dark={{ color: "white" }}
      >
        {title}
      </Heading>

      {sortedMovies.length > 0 ? (
        <SimpleGrid columns={columns} gap={6}>
          {sortedMovies.map((credit) => (
            <Link
              key={`${credit.id}-${credit.media_type}-${
                credit.character || ""
              }-${credit.release_date || credit.first_air_date || ""}`}
              to={`/${credit.media_type}/${credit.id}`}
            >
              <Box
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "xl",
                }}
                transition="all 0.2s"
                borderRadius="xl"
                overflow="hidden"
                bg="white"
                borderWidth="1px"
                borderColor="gray.200"
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
                    color="black"
                    _dark={{ color: "white" }}
                    mb={1}
                  >
                    {credit.title || credit.name}
                  </Text>
                  <HStack justify="space-between" align="center">
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
                    {credit.vote_average > 0 && (
                      <CriticScore score={credit.vote_average} />
                    )}
                  </HStack>
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize="lg" color="gray.700" _dark={{ color: "gray.400" }}>
          No {title.toLowerCase()} found.
        </Text>
      )}
    </Box>
  );
};
