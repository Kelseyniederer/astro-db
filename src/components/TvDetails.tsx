import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import CastGrid from "./CastGrid";

interface TvShow {
  id: number;
  name?: string;
  overview: string;
  backdrop_path?: string;
  poster_path?: string;
  vote_average?: number;
  first_air_date?: string;
  genres?: { id: number; name: string }[];
  tagline?: string;
  number_of_seasons?: number;
  credits?: { cast: CastMember[] };
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
  birthday?: string;
}

const TvDetails = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState<TvShow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchTvShowDetails = async () => {
      try {
        const response = await apiClient.get(`/tv/${id}`, {
          params: { append_to_response: "credits", language: "en-US" },
        });
        setTvShow(response.data);
      } catch (error) {
        console.error("Error fetching TV details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShowDetails();
  }, [id]);

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (!tvShow) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text color="red.500" fontSize="lg">
          TV Show not found
        </Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      {/* Header Section */}
      <Grid templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={8} mb={12}>
        {/* TV Show Poster */}
        <GridItem>
          {tvShow.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
              alt={tvShow.name}
              borderRadius="xl"
              width="100%"
              height="auto"
              objectFit="cover"
              shadow="lg"
            />
          ) : (
            <Box
              bg="gray.700"
              borderRadius="xl"
              p={4}
              textAlign="center"
              height="400px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="gray.400">No Poster Available</Text>
            </Box>
          )}
        </GridItem>

        {/* TV Show Info */}
        <GridItem>
          <Stack gap={6}>
            <Box>
              <Heading as="h1" size="2xl" mb={2}>
                {tvShow.name}
              </Heading>
              {tvShow.tagline && (
                <Text fontSize="xl" color="gray.400" fontStyle="italic">
                  {tvShow.tagline}
                </Text>
              )}
            </Box>

            {tvShow.first_air_date && (
              <Text fontSize="lg">
                First Aired:{" "}
                {new Date(tvShow.first_air_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            )}

            {tvShow.number_of_seasons && (
              <Text fontSize="lg">Seasons: {tvShow.number_of_seasons}</Text>
            )}

            {tvShow.vote_average && (
              <Text fontSize="lg">
                Rating: {tvShow.vote_average.toFixed(1)}/10
              </Text>
            )}

            {tvShow.genres && tvShow.genres.length > 0 && (
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Genres
                </Text>
                <Box display="flex" gap={2} flexWrap="wrap">
                  {tvShow.genres.map((genre) => (
                    <Box
                      key={genre.id}
                      bg="gray.700"
                      _light={{ bg: "gray.100" }}
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      <Text
                        fontSize="sm"
                        color="whiteAlpha.900"
                        _light={{ color: "gray.700" }}
                      >
                        {genre.name}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {tvShow.overview && (
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Overview
                </Text>
                <Text fontSize="lg" lineHeight="tall">
                  {tvShow.overview}
                </Text>
              </Box>
            )}
          </Stack>
        </GridItem>
      </Grid>

      {/* Cast Section */}
      {tvShow.credits?.cast && tvShow.credits.cast.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="xl" mb={8}>
            Cast
          </Heading>
          <CastGrid cast={tvShow.credits.cast} />
        </Box>
      )}
    </Container>
  );
};

export default TvDetails;
