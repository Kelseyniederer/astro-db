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
import apiClient from "../services/movieClient";
import CastScroll from "./CastScroll";
import GenrePill from "./common/GenrePill";

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
                return { ...member, birthday: data.birthday };
              } catch (error) {
                return member;
              }
            })
          );
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
    <Container maxW="container.xl" py={{ base: 4, md: 8 }}>
      {/* Header Section */}
      <Grid
        templateColumns={{ base: "120px 1fr", md: "250px 1fr" }}
        gap={{ base: 3, md: 6 }}
        mb={{ base: 6, lg: 8 }}
      >
        {/* TV Show Poster */}
        <GridItem>
          {tvShow.poster_path ? (
            <Box width="100%" borderRadius="lg" overflow="hidden" shadow="md">
              <Image
                src={`https://image.tmdb.org/t/p/w342${tvShow.poster_path}`}
                alt={tvShow.name}
                width="100%"
                height="auto"
                objectFit="cover"
              />
            </Box>
          ) : (
            <Box
              bg="gray.700"
              borderRadius="lg"
              p={3}
              textAlign="center"
              height={{ base: "180px", md: "300px" }}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }}>
                No Poster Available
              </Text>
            </Box>
          )}
        </GridItem>

        {/* TV Show Info */}
        <GridItem>
          <Stack gap={{ base: 1, lg: 4 }}>
            <Box>
              <Heading
                as="h1"
                size={{ base: "sm", md: "xl", lg: "2xl" }}
                mb={{ base: 0.5, lg: 2 }}
                textAlign="left"
              >
                {tvShow.name}
              </Heading>
              {tvShow.tagline && (
                <Text
                  fontSize={{ base: "xs", lg: "xl" }}
                  color="gray.400"
                  fontStyle="italic"
                  textAlign="left"
                >
                  {tvShow.tagline}
                </Text>
              )}
            </Box>

            {tvShow.first_air_date && (
              <Text fontSize={{ base: "xs", lg: "lg" }}>
                First Aired:{" "}
                {new Date(tvShow.first_air_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            )}

            {tvShow.number_of_seasons && (
              <Text fontSize={{ base: "xs", lg: "lg" }}>
                Seasons: {tvShow.number_of_seasons}
              </Text>
            )}

            {tvShow.vote_average && (
              <Text fontSize={{ base: "xs", lg: "lg" }}>
                Rating: {tvShow.vote_average.toFixed(1)}/10
              </Text>
            )}

            {tvShow.genres && tvShow.genres.length > 0 && (
              <Box>
                <Text
                  fontSize={{ base: "xs", lg: "lg" }}
                  fontWeight="bold"
                  mb={{ base: 0.5, lg: 2 }}
                >
                  Genres
                </Text>
                <Box display="flex" gap={{ base: 1, lg: 2 }} flexWrap="wrap">
                  {tvShow.genres.map((genre) => (
                    <GenrePill
                      key={genre.id}
                      genreId={genre.id}
                      name={genre.name}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Stack>
        </GridItem>
      </Grid>

      {/* Overview Section - Full Width on Mobile */}
      <Box width="100%" mb={{ base: 6, lg: 12 }}>
        <Text
          fontSize={{ base: "sm", lg: "lg" }}
          fontWeight="bold"
          mb={{ base: 2, lg: 3 }}
        >
          Overview
        </Text>
        <Text fontSize={{ base: "sm", lg: "lg" }} lineHeight="tall">
          {tvShow.overview}
        </Text>
      </Box>

      {/* Cast Section */}
      {castWithBirthdays.length > 0 && (
        <Box>
          <Text
            fontSize={{ base: "sm", lg: "lg" }}
            fontWeight="bold"
            mb={{ base: 2, lg: 3 }}
          >
            Cast
          </Text>
          <CastScroll cast={castWithBirthdays} />
        </Box>
      )}
    </Container>
  );
};

export default TvDetails;
