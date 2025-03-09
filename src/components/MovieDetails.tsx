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
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useData from "../hooks/useData";
import CastGrid, { CastMember } from "./CastGrid";

interface Movie {
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  release_date?: string;
  vote_average?: number;
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
}

interface CreditsResponse {
  cast: CastMember[];
}

const MovieDetails = () => {
  const { id } = useParams();
  const { data: movie, isLoading: movieLoading } = useData<Movie>(
    `/movie/${id}`,
    {},
    [id]
  );

  const { data: credits, isLoading: creditsLoading } = useData<CreditsResponse>(
    `/movie/${id}/credits`,
    {},
    [id]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (movieLoading || creditsLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text color="red.500" fontSize="lg">
          Movie not found
        </Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      {/* Header Section */}
      <Grid templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={8} mb={12}>
        {/* Movie Poster */}
        <GridItem>
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
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

        {/* Movie Info */}
        <GridItem>
          <Stack gap={6}>
            <Box>
              <Heading as="h1" size="2xl" mb={2}>
                {movie.title}
              </Heading>
              {movie.tagline && (
                <Text fontSize="xl" color="gray.400" fontStyle="italic">
                  {movie.tagline}
                </Text>
              )}
            </Box>

            {movie.release_date && (
              <Text fontSize="lg">
                Released:{" "}
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            )}

            {movie.runtime && (
              <Text fontSize="lg">
                Runtime: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </Text>
            )}

            {movie.vote_average && (
              <Text fontSize="lg">
                Rating: {movie.vote_average.toFixed(1)}/10
              </Text>
            )}

            {movie.genres && movie.genres.length > 0 && (
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Genres
                </Text>
                <Box display="flex" gap={2} flexWrap="wrap">
                  {movie.genres.map((genre) => (
                    <Box
                      key={genre.id}
                      bg="gray.700"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      <Text fontSize="sm">{genre.name}</Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {movie.overview && (
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Overview
                </Text>
                <Text fontSize="lg" lineHeight="tall">
                  {movie.overview}
                </Text>
              </Box>
            )}
          </Stack>
        </GridItem>
      </Grid>

      {/* Cast Section */}
      {credits?.cast && credits.cast.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="xl" mb={8}>
            Cast
          </Heading>
          <CastGrid cast={credits.cast} />
        </Box>
      )}
    </Container>
  );
};

export default MovieDetails;
