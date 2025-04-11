import { Box, Button, Container, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useData from "../../hooks/useData";
import usePersonMovies from "../../hooks/usePersonMovies";
import { ActorFilmography } from "./ActorFilmography";
import { AstrologyProfile } from "./AstrologyProfile";

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
        height={{ base: "200px", md: "300px" }}
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
      paddingBottom={{ base: "150%", md: "150%" }}
      top={0}
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
          objectFit: "contain",
          backgroundColor: "rgb(20, 24, 33)",
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
  // Split the date string and convert to numbers
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
  // Use the exact numbers from the API without any conversion
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
    <Box maxW="100%" overflowX="hidden">
      <Box mb={{ base: 3, md: 6 }}>
        <Text
          as="h1"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          mb={2}
          color="black"
          _dark={{ color: "white" }}
        >
          {name}
        </Text>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="gray.600"
          _dark={{ color: "gray.400" }}
          mb={2}
        >
          {department || "Acting"}
        </Text>
        {birthday && (
          <Text
            fontSize={{ base: "sm", md: "md" }}
            mb={{ base: 2, md: 4 }}
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
            fontSize={{ base: "sm", md: "md" }}
            lineHeight="tall"
            color="gray.800"
            _dark={{ color: "gray.100" }}
            whiteSpace="pre-wrap"
            overflowWrap="break-word"
            wordBreak="break-word"
          >
            {displayedBio}
            {!isExpanded && shouldShowButton && "..."}
          </Text>
          {shouldShowButton && (
            <Button
              variant="link"
              colorScheme="blue"
              mt={2}
              size={{ base: "xs", md: "sm" }}
              fontSize={{ base: "sm", md: "md" }}
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
    <Container maxW="container.xl" py={{ base: 4, md: 8 }}>
      <Grid
        templateColumns={{
          base: "150px 1fr",
          md: "300px 1fr",
          lg: "2 1fr 400px",
        }}
        gap={{ base: 4, md: 6 }}
        mb={{ base: 6, md: 12 }}
        alignItems="start"
      >
        <Box
          maxW={{ base: "150px", md: "300px" }}
          width="100%"
          mx={{ base: 0, md: 0 }}
        >
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
