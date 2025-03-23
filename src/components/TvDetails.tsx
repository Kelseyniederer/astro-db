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
import CastScroll from "./CastScroll";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
  birthday?: string;
}

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

const TvDetails = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState<TvShow | null>(null);
  const [loading, setLoading] = useState(true);
  const [castWithBirthdays, setCastWithBirthdays] = useState<CastMember[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchTvShowDetails = async () => {
      try {
        const response = await apiClient.get(`/tv/${id}`, {
          params: { append_to_response: "credits", language: "en-US" },
        });
        const show = response.data;
        setTvShow(show);

        // Fetch birthdays for cast members
        if (show.credits?.cast) {
          const updatedCast = await Promise.all(
            show.credits.cast.map(async (member: CastMember) => {
              try {
                const { data } = await apiClient.get(`/person/${member.id}`);
                console.log(
                  `Fetched birthday for ${member.name}:`,
                  data.birthday
                );
                return { ...member, birthday: data.birthday };
              } catch (error) {
                console.error(
                  `Error fetching birthday for ${member.name}:`,
                  error
                );
                return member;
              }
            })
          );
          console.log("Updated cast with birthdays:", updatedCast);
          setCastWithBirthdays(updatedCast);
        }
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
      <Grid
        templateColumns={{ base: "200px 1fr", lg: "300px 1fr" }}
        gap={{ base: 4, lg: 8 }}
        mb={12}
      >
        {/* TV Show Poster */}
        <GridItem>
          {tvShow.poster_path ? (
            <Box width="100%" borderRadius="xl" overflow="hidden" shadow="lg">
              <Image
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
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

        {/* TV Show Info */}
        <GridItem>
          <Stack gap={{ base: 2, lg: 4 }}>
            <Box>
              <Heading
                as="h1"
                size={{ base: "lg", md: "xl", lg: "2xl" }}
                mb={2}
                textAlign="left"
              >
                {tvShow.name}
              </Heading>
              {tvShow.tagline && (
                <Text
                  fontSize={{ base: "md", lg: "xl" }}
                  color="gray.400"
                  fontStyle="italic"
                  textAlign="left"
                >
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
      {castWithBirthdays.length > 0 && (
        <Box mb={8}>
          <CastScroll cast={castWithBirthdays} title="Cast" />
        </Box>
      )}
    </Container>
  );
};

export default TvDetails;
