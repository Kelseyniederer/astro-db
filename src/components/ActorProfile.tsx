import { Box, Button, Container, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
        borderRadius="md"
        p={4}
        textAlign="center"
        height="180px"
        width="120px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        _light={{ bg: "gray.100" }}
      >
        <Text color="gray.400">No Image</Text>
      </Box>
    );
  }

  return (
    <Box
      borderRadius="md"
      overflow="hidden"
      shadow="md"
      width="120px"
      height="180px"
      position="relative"
    >
      <img
        src={`https://image.tmdb.org/t/p/w185${src}`}
        alt={alt}
        style={{
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

const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
};

const BioSection = ({
  name,
  department,
  birthday,
  biography,
}: BioSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300;

  const shouldShowButton = biography && biography.length > maxLength;
  const displayedBio = isExpanded ? biography : biography?.slice(0, maxLength);

  return (
    <Box>
      <Box>
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
        <Text
          fontSize="xl"
          color="gray.600"
          _dark={{ color: "gray.400" }}
          mb={2}
        >
          {department || "Actor"}
        </Text>
        {birthday && (
          <Text
            fontSize="lg"
            mb={2}
            color="gray.700"
            _dark={{ color: "gray.300" }}
          >
            Born: {formatDate(birthday)}
          </Text>
        )}
      </Box>
      {biography && (
        <Box>
          <Text
            fontSize="lg"
            lineHeight="tall"
            color="gray.800"
            _dark={{ color: "gray.100" }}
          >
            {displayedBio}
            {!isExpanded && shouldShowButton && "..."}
          </Text>
          {shouldShowButton && (
            <Button
              variant="link"
              colorScheme="blue"
              mt={2}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show Less" : "Read More"}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

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
          base: "120px 1fr",
          md: "120px 1fr",
        }}
        gap={6}
        mb={8}
        alignItems="start"
      >
        <Box>
          <ProfileImage src={person.profile_path} alt={person.name} />
        </Box>

        <BioSection
          name={person.name}
          department={person.known_for_department}
          birthday={person.birthday}
          biography={person.biography}
        />
      </Grid>
      {person.birthday && <AstrologyProfile birthday={person.birthday} />}
      <ActorFilmography movies={movies} title="Filmography" />
    </Container>
  );
};

export default ActorProfile;
