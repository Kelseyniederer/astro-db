import {
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import useData from "../hooks/useData";
import usePersonMovies from "../hooks/usePersonMovies"; // ✅ New Hook

interface Person {
  id: number;
  name: string;
  biography?: string;
  profile_path?: string; // ✅ Profile image might be missing
  known_for_department?: string;
}

const PersonProfile = () => {
  const { id } = useParams();
  const personId = id ? parseInt(id) : undefined;

  const { data: person, isLoading: personLoading } = useData<Person>(
    `/person/${id}`,
    {},
    [id]
  );

  const { data: movies, isLoading: moviesLoading } = usePersonMovies(personId);

  if (personLoading || moviesLoading) return <Spinner />;
  if (!person) return <Text>Person not found</Text>;

  return (
    <VStack gap={4} align="center" p={5}>
      {/* Profile Image (Optional) */}
      {person.profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
          alt={person.name}
          borderRadius="lg"
        />
      ) : (
        <Text>No Profile Image</Text>
      )}

      <Heading>{person.name}</Heading>
      <Text fontSize="lg" fontWeight="bold">
        {person.known_for_department || "Unknown"}
      </Text>
      <Text textAlign="center" maxW="600px">
        {person.biography || "No biography available."}
      </Text>

      {/* Movies Section */}
      <Heading size="md" mt={5} alignSelf="start">
        Movies
      </Heading>
      {movies && movies.length > 0 ? (
        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
          gap={6}
          width="100%"
        >
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <VStack
                gap={2}
                align="start"
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
                <Text fontWeight="bold" fontSize="sm" noOfLines={1}>
                  {movie.title}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                </Text>
              </VStack>
            </Link>
          ))}
        </SimpleGrid>
      ) : (
        <Text>No movies found.</Text>
      )}
    </VStack>
  );
};

export default PersonProfile;
