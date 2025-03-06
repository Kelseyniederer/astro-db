import { Box, Heading, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import CastGrid from "./CastGrid";

interface TvShow {
  id: number;
  name?: string;
  overview: string;
  backdrop_path?: string;
  poster_path?: string;
  vote_average?: number;
  first_air_date?: string;
  credits?: { cast: CastMember[] };
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

const TvDetails = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState<TvShow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTvShowDetails = async () => {
      try {
        const response = await apiClient.get(`/tv/${id}`, {
          params: { append_to_response: "credits", language: "en-US" },
        });
        setTvShow(response.data);
      } catch (error) {
        console.error("Error fetching TV details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShowDetails();
  }, [id]);

  if (loading) return <Spinner size="xl" />;

  if (!tvShow) return <Text>TV Show not found.</Text>;

  return (
    <Box padding={5} textAlign="center">
      <Heading as="h1" size="2xl">
        {tvShow.name}
      </Heading>
      <Image
        src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`}
        alt={tvShow.name}
        width="100%"
        borderRadius="lg"
        my={4}
      />
      <Text fontSize="lg">{tvShow.overview}</Text>
      <VStack gap={3} mt={5}>
        <Text fontWeight="bold">First Air Date: {tvShow.first_air_date}</Text>
        <Text fontWeight="bold">
          Rating: {tvShow.vote_average?.toFixed(1)}/10
        </Text>
      </VStack>

      {/* ✅ Display Cast Grid */}
      {tvShow.credits?.cast && (
        <>
          <Heading as="h2" size="lg" mt={10} mb={4}>
            Top Billed Cast
          </Heading>
          <CastGrid cast={tvShow.credits.cast} />
        </>
      )}
    </Box>
  );
};

export default TvDetails;
