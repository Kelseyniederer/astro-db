import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import useData from "../hooks/useData";
import { useNatalWheelChart } from "../hooks/useNatalWheelChart";
import usePersonMovies from "../hooks/usePersonMovies";
import { usePlanetaryData } from "../hooks/usePlanetaryData";

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

  const {
    data: movies = [],
    error: moviesError,
    isLoading: moviesLoading,
  } = usePersonMovies(personId);

  const {
    planetaryData,
    error: planetaryError,
    isLoading: planetaryLoading,
    fetchPlanetaryData,
  } = usePlanetaryData(person?.birthday);

  const {
    chartUrl,
    error: chartError,
    isLoading: chartLoading,
    fetchNatalWheelChart,
  } = useNatalWheelChart(person?.birthday);

  useEffect(() => {
    if (person?.birthday) {
      fetchPlanetaryData();
      fetchNatalWheelChart();
    }
  }, [person?.birthday]);

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
      {/* Header Section */}
      <Grid templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={8} mb={12}>
        {/* Profile Image */}
        <GridItem>
          {person.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
              alt={person.name}
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
              <Text color="gray.400">No Profile Image Available</Text>
            </Box>
          )}
        </GridItem>

        {/* Actor Info */}
        <GridItem>
          <Stack gap={6}>
            <Box>
              <Heading as="h1" size="2xl" mb={2}>
                {person.name}
              </Heading>
              <Text fontSize="xl" color="gray.400" fontWeight="medium">
                {person.known_for_department || "Actor"}
              </Text>
            </Box>

            {person.birthday && (
              <Text fontSize="lg">
                Born:{" "}
                {new Date(person.birthday).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            )}

            {person.biography && (
              <Box>
                <Text fontSize="lg" lineHeight="tall">
                  {person.biography}
                </Text>
              </Box>
            )}
          </Stack>
        </GridItem>
      </Grid>

      {/* Astrological Section */}
      {person.birthday && (
        <Box mb={12}>
          <Heading as="h2" size="xl" mb={8}>
            Astrological Profile
          </Heading>
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
            {/* Natal Wheel Chart */}
            <GridItem>
              <Box
                bg="gray.800"
                borderRadius="xl"
                p={6}
                height="100%"
                shadow="lg"
              >
                <Heading as="h3" size="lg" mb={6}>
                  Natal Chart
                </Heading>
                {chartLoading ? (
                  <Flex height="400px" align="center" justify="center">
                    <Text>Loading natal chart...</Text>
                  </Flex>
                ) : chartError ? (
                  <Flex height="400px" align="center" justify="center">
                    <Text color="red.500">
                      Error loading natal chart: {chartError}
                    </Text>
                  </Flex>
                ) : chartUrl ? (
                  <Image
                    src={chartUrl}
                    alt={`${person.name}'s natal chart`}
                    w="100%"
                    h="auto"
                    borderRadius="lg"
                  />
                ) : null}
              </Box>
            </GridItem>

            {/* Planetary Positions */}
            <GridItem>
              <Box
                bg="gray.800"
                borderRadius="xl"
                p={6}
                height="100%"
                shadow="lg"
              >
                <Heading as="h3" size="lg" mb={6}>
                  Planetary Positions
                </Heading>
                {planetaryLoading ? (
                  <Flex height="400px" align="center" justify="center">
                    <Text>Loading planetary positions...</Text>
                  </Flex>
                ) : planetaryError ? (
                  <Flex
                    height="400px"
                    align="center"
                    justify="center"
                    direction="column"
                  >
                    <Text color="red.500" mb={4}>
                      Error loading planetary data
                    </Text>
                    {planetaryError.includes("CORS") && (
                      <Box p={4} bg="yellow.900" borderRadius="md" maxW="md">
                        <Text>
                          To view planetary positions, please first visit{" "}
                          <Link
                            to="https://cors-anywhere.herokuapp.com/corsdemo"
                            target="_blank"
                            style={{
                              color: "yellow",
                              textDecoration: "underline",
                            }}
                          >
                            this page
                          </Link>{" "}
                          and click the button to enable the demo server. Then
                          refresh this page.
                        </Text>
                      </Box>
                    )}
                  </Flex>
                ) : planetaryData.length > 0 ? (
                  <SimpleGrid columns={{ base: 2, md: 2 }} gap={4}>
                    {planetaryData.map((planet) => (
                      <Box
                        key={planet.planet}
                        p={4}
                        borderWidth={1}
                        borderRadius="lg"
                        borderColor="gray.600"
                        bg="gray.700"
                      >
                        <Text fontWeight="bold" fontSize="lg" mb={1}>
                          {planet.planet}{" "}
                          {planet.isRetrograde && (
                            <Text as="span" color="gray.400">
                              (R)
                            </Text>
                          )}
                        </Text>
                        <Text color="gray.300">{planet.sign}</Text>
                      </Box>
                    ))}
                  </SimpleGrid>
                ) : null}
              </Box>
            </GridItem>
          </Grid>
        </Box>
      )}

      {/* Movies Section */}
      <Box>
        <Heading as="h2" size="xl" mb={8}>
          Filmography
        </Heading>

        {moviesError ? (
          <Text color="red.500">Error loading movies: {moviesError}</Text>
        ) : movies.length > 0 ? (
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} gap={6}>
            {movies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <Box
                  _hover={{
                    transform: "translateY(-4px)",
                    shadow: "xl",
                  }}
                  transition="all 0.2s"
                  borderRadius="xl"
                  overflow="hidden"
                  bg="gray.800"
                >
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : noImage
                    }
                    alt={movie.title}
                    width="100%"
                    height="auto"
                    aspectRatio="2/3"
                    objectFit="cover"
                  />
                  <Box p={3}>
                    <Text
                      fontWeight="bold"
                      fontSize="sm"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                    >
                      {movie.title}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "N/A"}
                    </Text>
                  </Box>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize="lg" color="gray.400">
            No movies found.
          </Text>
        )}
      </Box>
    </Container>
  );
};

export default ActorProfile;
