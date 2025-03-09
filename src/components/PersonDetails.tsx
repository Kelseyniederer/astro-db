import { Box, Heading, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import apiClient from "../services/api-client";

interface Person {
  id: number;
  name: string;
  biography: string;
  profile_path?: string;
  birthday?: string;
  known_for_department?: string;
  known_for: KnownFor[];
}

interface KnownFor {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
}

const PersonDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await apiClient.get(`/person/${id}`, {
          params: { language: "en-US" },
        });
        setPerson(response.data);
      } catch (error) {
        console.error("Error fetching person details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonDetails();
  }, [id]);

  if (loading) return <Spinner size="xl" />;

  if (!person) return <Text>Person not found.</Text>;

  return (
    <Box padding={5} textAlign="center">
      <Image
        src={
          person.profile_path
            ? `https://image.tmdb.org/t/p/original${person.profile_path}`
            : noImage
        }
        alt={person.name}
        borderRadius="full"
        boxSize="200px"
        mx="auto"
        my={4}
      />
      <Heading as="h1" size="2xl">
        {person.name}
      </Heading>
      <Text fontSize="lg" color="gray.400">
        {person.known_for_department}
      </Text>
      <Text fontSize="md" mt={4}>
        {person.biography || "No biography available."}
      </Text>
      <VStack gap={3} mt={5}>
        <Text fontWeight="bold">Birthday: {person.birthday || "N/A"}</Text>
      </VStack>

      {/* ✅ Known For Section */}
      {person.known_for.length > 0 && (
        <>
          <Heading as="h2" size="lg" mt={10} mb={4}>
            Known For
          </Heading>
          <Box display="flex" gap={4} flexWrap="wrap" justifyContent="center">
            {person.known_for.map((work) => (
              <VStack key={work.id} width="140px">
                <Image
                  src={
                    work.poster_path
                      ? `https://image.tmdb.org/t/p/w185${work.poster_path}`
                      : noImage
                  }
                  alt={work.title || work.name}
                  borderRadius="md"
                  width="140px"
                  height="210px"
                  objectFit="cover"
                />
                <Text fontSize="sm" fontWeight="bold" textAlign="center">
                  {work.title || work.name}
                </Text>
              </VStack>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default PersonDetails;
