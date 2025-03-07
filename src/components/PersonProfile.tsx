import { Box, Heading, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";

interface Person {
  id: number;
  name: string;
  biography: string;
  profile_path?: string;
  birthday?: string;
  known_for_department?: string;
}

const PersonProfile = () => {
  const { id } = useParams();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await apiClient.get(`/person/${id}`);
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
      <Heading as="h1" size="2xl">
        {person.name}
      </Heading>
      <Image
        src={
          person.profile_path
            ? `https://image.tmdb.org/t/p/original${person.profile_path}`
            : noImage
        }
        alt={person.name}
        width="200px"
        borderRadius="lg"
        my={4}
      />
      <Text fontSize="lg" fontWeight="bold">
        {person.known_for_department}
      </Text>
      <Text fontSize="md" maxWidth="800px" margin="auto">
        {person.biography || "No biography available."}
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        Birthday: {person.birthday || "Unknown"}
      </Text>
    </Box>
  );
};

export default PersonProfile;
