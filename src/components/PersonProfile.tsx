import { Box, Heading, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
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
      <Heading size="md" mt={5}>
        Movies
      </Heading>
      <VStack gap={3} align="start">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <Box key={movie.id} display="flex" alignItems="center">
              <Link
                to={`/movie/${movie.id}`}
                style={{ textDecoration: "none" }}
              >
                <Text fontWeight="bold" _hover={{ color: "blue.500" }}>
                  {movie.title} (
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "N/A"}
                  )
                </Text>
              </Link>
            </Box>
          ))
        ) : (
          <Text>No movies found.</Text>
        )}
      </VStack>
    </VStack>
  );
};

export default PersonProfile;
