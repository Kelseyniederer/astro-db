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

interface ProfileImageProps {
  src?: string;
  alt: string;
}

const ProfileImage = ({ src, alt }: ProfileImageProps) => {
  if (!src) {
    return (
      <Box
        bg="gray.700"
        borderRadius="xl"
        p={4}
        textAlign="center"
        height="300px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        _light={{ bg: "gray.100" }}
      >
        <Text color="gray.400">No Profile Image Available</Text>
      </Box>
    );
  }

  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      shadow="lg"
      width="100%"
      position="relative"
      paddingBottom="150%"
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${src}`}
        alt={alt}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

interface BioSectionProps {
  name: string;
  department?: string;
  birthday?: string;
  biography?: string;
}

const BioSection = ({
  name,
  department,
  birthday,
  biography,
}: BioSectionProps) => (
  <Box>
    <Box mb={6}>
      <Text
        as="h1"
        fontSize="3xl"
        fontWeight="bold"
        mb={2}
        color="black"
        _dark={{ color: "white" }}
      >
        {name}
      </Text>
      <Text fontSize="xl" color="gray.600" _dark={{ color: "gray.400" }} mb={2}>
        {department || "Actor"}
      </Text>
      {birthday && (
        <Text
          fontSize="lg"
          mb={4}
          color="gray.700"
          _dark={{ color: "gray.300" }}
        >
          Born:{" "}
          {new Date(birthday).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      )}
    </Box>
    {biography && (
      <Text
        fontSize="lg"
        lineHeight="tall"
        color="gray.800"
        _dark={{ color: "gray.100" }}
      >
        {biography}
      </Text>
    )}
  </Box>
);

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
        templateColumns={{
          base: "repeat(auto-fit, minmax(200px, 1fr))",
          md: "300px 1fr",
          lg: "300px 1fr 400px",
        }}
        gap={6}
        mb={12}
        alignItems="start"
      >
        <Box maxW="300px" width="100%" mx={{ base: "auto", md: 0 }}>
          <ProfileImage src={person.profile_path} alt={person.name} />
        </Box>

        <BioSection
          name={person.name}
          department={person.known_for_department}
          birthday={person.birthday}
          biography={person.biography}
        />

        {person.birthday && (
          <Box>
            <AstrologyProfile birthday={person.birthday} />
          </Box>
        )}
      </Grid>

      <ActorFilmography
        movies={movies}
        title="Filmography"
        columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
      />
    </Container>
  );
};

export default ActorProfile;
