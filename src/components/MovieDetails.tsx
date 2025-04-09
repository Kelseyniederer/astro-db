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
import useData from "../hooks/useData";
import apiClient from "../services/movieClient";
import CastScroll from "./CastScroll";
import GenrePill from "./common/GenrePill";

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

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
  birthday?: string;
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

  const [castWithBirthdays, setCastWithBirthdays] = useState<CastMember[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (credits?.cast) {
      const fetchBirthdays = async () => {
        const updatedCast = await Promise.all(
          credits.cast.map(async (member) => {
            try {
              const { data } = await apiClient.get(`/person/${member.id}`);
              return { ...member, birthday: data.birthday };
            } catch (error) {
              return member;
            }
          })
        );
        setCastWithBirthdays(updatedCast);
      };
      fetchBirthdays();
    }
  }, [credits?.cast]);

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
      <Grid
        templateColumns={{ base: "200px 1fr", lg: "300px 1fr" }}
        gap={{ base: 4, lg: 8 }}
        mb={12}
      >
        {/* Movie Poster */}
        <GridItem>
          {movie.poster_path ? (
            <Box width="100%" borderRadius="xl" overflow="hidden" shadow="lg">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width="100%"
                height="auto"
                objectFit="cover"
              />
            </Box>
          ) : (
            <Box
              bg="gray.700"
              borderRadius="xl"
              p={4}
              textAlign="center"
              height={{ base: "300px", lg: "400px" }}
              width="100%"
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
          <Stack gap={{ base: 2, lg: 4 }}>
            <Box>
              <Heading
                as="h1"
                size={{ base: "lg", md: "xl", lg: "2xl" }}
                mb={2}
                textAlign="left"
              >
                {movie.title}
              </Heading>
              {movie.tagline && (
                <Text
                  fontSize={{ base: "md", lg: "xl" }}
                  color="gray.400"
                  fontStyle="italic"
                  textAlign="left"
                >
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
                    <GenrePill
                      key={genre.id}
                      genreId={genre.id}
                      name={genre.name}
                    />
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
      {castWithBirthdays.length > 0 && (
        <Box mb={8}>
          <CastScroll cast={castWithBirthdays} title="Cast" />
        </Box>
      )}
    </Container>
  );
};

export default MovieDetails;
