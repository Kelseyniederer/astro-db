import {
  Box,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import useData from "../hooks/useData";
import { useNatalWheelChart } from "../hooks/useNatalWheelChart";
import usePersonMovies, { Movie } from "../hooks/usePersonMovies";
import { usePlanetaryData } from "../hooks/usePlanetaryData";

interface Actor {
  id: number;
  name: string;
  biography?: string;
  profile_path?: string;
  known_for_department?: string;
  birthday?: string;
}

type SortOrder =
  | "release_date_desc"
  | "release_date_asc"
  | "title_asc"
  | "title_desc";

const ActorProfile = () => {
  const { id } = useParams();
  const personId = id ? parseInt(id) : undefined;
  const [sortOrder, setSortOrder] = useState<SortOrder>("release_date_desc");
  const [decadeFilter, setDecadeFilter] = useState<string>("all");

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
      <div>
        <Text>Loading actor details...</Text>
      </div>
    );
  }

  if (personError || !person) {
    return (
      <div>
        <Text color="red.500">
          Error loading actor details: {personError || "Actor not found"}
        </Text>
      </div>
    );
  }

  const sortMovies = (moviesToSort: Movie[]) => {
    return [...moviesToSort].sort((a, b) => {
      switch (sortOrder) {
        case "release_date_desc":
          return (
            new Date(b.release_date || "").getTime() -
            new Date(a.release_date || "").getTime()
          );
        case "release_date_asc":
          return (
            new Date(a.release_date || "").getTime() -
            new Date(b.release_date || "").getTime()
          );
        case "title_asc":
          return a.title.localeCompare(b.title);
        case "title_desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  };

  const filterMoviesByDecade = (moviesToFilter: Movie[]) => {
    if (decadeFilter === "all") return moviesToFilter;

    const decade = parseInt(decadeFilter);
    return moviesToFilter.filter((movie) => {
      if (!movie.release_date) return false;
      const year = new Date(movie.release_date).getFullYear();
      return year >= decade && year < decade + 10;
    });
  };

  const decades = Array.from(
    new Set(
      movies
        .filter((m) => m.release_date)
        .map(
          (m) => Math.floor(new Date(m.release_date!).getFullYear() / 10) * 10
        )
    )
  ).sort((a, b) => b - a);

  const filteredMovies = filterMoviesByDecade(movies);
  const sortedMovies = sortMovies(filteredMovies);

  return (
    <Container maxW="container.xl" py={6}>
      <Stack gap={8}>
        <Stack direction={{ base: "column", md: "row" }} gap={8} align="start">
          <Box>
            {person.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                alt={person.name}
                borderRadius="lg"
                maxW="300px"
              />
            ) : (
              <Text>No Profile Image</Text>
            )}
          </Box>

          <Stack gap={4} flex={1}>
            <Heading as="h1" size="xl">
              {person.name}
            </Heading>
            <Text fontSize="lg" fontWeight="bold">
              {person.known_for_department || "Unknown"}
            </Text>
            {person.birthday && (
              <Text>
                Born: {new Date(person.birthday).toLocaleDateString()}
              </Text>
            )}
            <Text>{person.biography || "No biography available."}</Text>

            {/* Natal Wheel Chart */}
            {person.birthday && (
              <Box mt={6}>
                <Heading as="h3" size="md" mb={4}>
                  Natal Chart
                </Heading>
                {chartLoading ? (
                  <Text>Loading natal chart...</Text>
                ) : chartError ? (
                  <Box>
                    <Text color="red.500" mb={2}>
                      Error loading natal chart: {chartError}
                    </Text>
                  </Box>
                ) : chartUrl ? (
                  <Box
                    maxW="600px"
                    mx="auto"
                    borderWidth={1}
                    borderRadius="lg"
                    p={4}
                    bg="gray.800"
                  >
                    <Image
                      src={chartUrl}
                      alt={`${person.name}'s natal chart`}
                      w="100%"
                      h="auto"
                    />
                  </Box>
                ) : null}
              </Box>
            )}

            {/* Planetary Positions */}
            {planetaryLoading ? (
              <Text>Loading planetary positions...</Text>
            ) : planetaryError ? (
              <Box>
                <Text color="red.500" mb={2}>
                  Error loading planetary data
                </Text>
                {planetaryError.includes("CORS") && (
                  <Box p={4} bg="yellow.100" borderRadius="md">
                    <Text>
                      To view planetary positions, please first visit{" "}
                      <Link
                        to="https://cors-anywhere.herokuapp.com/corsdemo"
                        target="_blank"
                        style={{ color: "blue", textDecoration: "underline" }}
                      >
                        this page
                      </Link>{" "}
                      and click the button to enable the demo server. Then
                      refresh this page.
                    </Text>
                  </Box>
                )}
              </Box>
            ) : planetaryData.length > 0 ? (
              <Box>
                <Heading as="h3" size="md" mb={4}>
                  Planetary Positions
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  {planetaryData.map((planet) => (
                    <Box
                      key={planet.planet}
                      p={3}
                      borderWidth={1}
                      borderRadius="md"
                    >
                      <Text fontWeight="bold">
                        {planet.planet}{" "}
                        {planet.isRetrograde && (
                          <Text as="span" color="gray.500">
                            (R)
                          </Text>
                        )}
                      </Text>
                      <Text>{planet.sign}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            ) : null}
          </Stack>
        </Stack>

        {/* Movies Section */}
        <Box w="100%">
          <Stack
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            mb={6}
          >
            <Heading as="h2" size="lg">
              Movies ({sortedMovies.length})
            </Heading>
            <Stack direction={{ base: "column", md: "row" }} gap={4}>
              <select
                value={decadeFilter}
                onChange={(e) => setDecadeFilter(e.target.value)}
                style={{ padding: "8px" }}
              >
                <option value="all">All Decades</option>
                {decades.map((decade) => (
                  <option key={decade} value={decade}>
                    {decade}s
                  </option>
                ))}
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                style={{ padding: "8px" }}
              >
                <option value="release_date_desc">Newest First</option>
                <option value="release_date_asc">Oldest First</option>
                <option value="title_asc">Title A-Z</option>
                <option value="title_desc">Title Z-A</option>
              </select>
            </Stack>
          </Stack>

          {moviesError ? (
            <Text color="red.500">Error loading movies: {moviesError}</Text>
          ) : sortedMovies.length > 0 ? (
            <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} gap={6}>
              {sortedMovies.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <Box
                    _hover={{ transform: "scale(1.05)" }}
                    transition="transform 0.2s"
                  >
                    <Image
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                          : noImage
                      }
                      alt={movie.title}
                      borderRadius="lg"
                      width="100%"
                      height="auto"
                      aspectRatio="2/3"
                      objectFit="cover"
                    />
                    <Text fontWeight="bold" fontSize="sm" maxLines={1} mt={2}>
                      {movie.title}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "N/A"}
                    </Text>
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          ) : (
            <Text>No movies found for the selected filters.</Text>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default ActorProfile;
