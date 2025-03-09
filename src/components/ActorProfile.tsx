import { Box, Container, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useData from "../hooks/useData";
import usePersonMovies from "../hooks/usePersonMovies";
import { ActorFilmography } from "./actor/ActorFilmography";
import { ActorHeader } from "./actor/ActorHeader";
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
      <ActorHeader person={person} />

      {person.birthday && (
        <Box mb={12}>
          <AstrologyProfile birthday={person.birthday} name={person.name} />
        </Box>
      )}

      <ActorFilmography movies={movies} />
    </Container>
  );
};

export default ActorProfile;
