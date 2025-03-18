import { Box, Container, Grid, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useData from "../hooks/useData";
import usePersonMovies from "../hooks/usePersonMovies";
import { ActorFilmography } from "./actor/ActorFilmography";
import { AstrologyProfile } from "./actor/AstrologyProfile";

interface Actor {
  id: number;
  name: string;
  biography?: string;
  profile_path?: string;
  known_for_department?: string;
  birthday?: string;
}

const ActorProfile = () => {
  const { id } = useParams();
  const personId = id ? parseInt(id) : undefined;

  const {
    data: person,
    error: personError,
    isLoading: personLoading,
  } = useData<Actor>(`/person/${id}`, {}, [id]);

  const { data: movies = [], isLoading: moviesLoading } =
    usePersonMovies(personId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (personLoading || moviesLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text fontSize="lg">Loading actor details...</Text>
      </Container>
    );
  }

  if (personError || !person) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text color="red.500" fontSize="lg">
          Error loading actor details: {personError || "Actor not found"}
        </Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Grid
        templateColumns={{ base: "1fr", lg: "300px 1fr 400px" }}
        gap={8}
        mb={12}
      >
        {/* Profile Image */}
        <Box>
          {person.profile_path ? (
            <Box borderRadius="xl" overflow="hidden" shadow="lg">
              <img
                src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                alt={person.name}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </Box>
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
              <Text color="gray.400">No Profile Image Available</Text>
            </Box>
          )}
        </Box>

        {/* Bio Section */}
        <Box>
          <Box mb={6}>
            <Text as="h1" fontSize="3xl" fontWeight="bold" mb={2}>
              {person.name}
            </Text>
            <Text fontSize="xl" color="gray.500" mb={2}>
              {person.known_for_department || "Actor"}
            </Text>
            {person.birthday && (
              <Text fontSize="lg" mb={4}>
                Born:{" "}
                {new Date(person.birthday).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            )}
          </Box>
          {person.biography && (
            <Text fontSize="lg" lineHeight="tall">
              {person.biography}
            </Text>
          )}
        </Box>

        {/* Planetary Positions */}
        {person.birthday && (
          <Box>
            <AstrologyProfile birthday={person.birthday} name={person.name} />
          </Box>
        )}
      </Grid>

      <ActorFilmography movies={movies} />
    </Container>
  );
};

export default ActorProfile;
