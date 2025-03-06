import { Box, Heading, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/api-client";
import CastGrid from "./CastGrid"; // ✅ Import CastGrid

interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path?: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
  cast?: CastMember[];
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await apiClient.get(`/movie/${id}`, {
          params: { append_to_response: "credits", language: "en-US" },
        });
        setMovie({
          ...response.data,
          cast: response.data.credits?.cast || [], // ✅ Extract cast list correctly
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <Spinner size="xl" />;

  if (!movie) return <Text>Movie not found.</Text>;

  return (
    <Box padding={5} textAlign="center">
      <Heading as="h1" size="2xl">
        {movie.title || movie.name}
      </Heading>
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        width="100%"
        borderRadius="lg"
        my={4}
      />
      <Text fontSize="lg">{movie.overview}</Text>
      <VStack gap={3} mt={5}>
        <Text fontWeight="bold">Release Date: {movie.release_date}</Text>
        <Text fontWeight="bold">
          Rating: {movie.vote_average?.toFixed(1)}/10
        </Text>
      </VStack>

      {/* ✅ Display Cast Grid */}
      {movie.cast && (
        <>
          <Heading as="h2" size="lg" mt={10} mb={4}>
            Top Billed Cast
          </Heading>
          <CastGrid cast={movie.cast} />
        </>
      )}
    </Box>
  );
};

export default MovieDetails;
