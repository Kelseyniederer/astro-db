import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { CastMember } from "../components/CastGrid"; // 🔄 Try this if needed
import useData from "../hooks/useData";
import CastGrid from "./CastGrid";

interface Movie {
  title: string;
  overview: string;
  poster_path: string;
  release_date?: string;
}

interface CreditsResponse {
  cast: CastMember[];
}

const MovieDetails = () => {
  const { id } = useParams();
  const { data: movie, isLoading: movieLoading } = useData<Movie>(
    `/movie/${id}`,
    {},
    [id]
  );

  const { data: credits, isLoading: creditsLoading } = useData<CreditsResponse>(
    `/movie/${id}/credits`,
    {},
    [id]
  );

  if (movieLoading || creditsLoading) return <Spinner />;
  if (!movie) return <Text>Movie not found</Text>;

  const formattedReleaseDate = movie.release_date
    ? new Date(movie.release_date).toDateString()
    : "Unknown Release Date";

  return (
    <Box p={5} textAlign="center">
      <Heading>{movie.title}</Heading>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{
            borderRadius: "10px",
            width: "auto",
            maxHeight: "500px",
            margin: "0 auto",
          }}
        />
      )}
      <Text fontWeight="bold" mt={2}>
        Released: {formattedReleaseDate}
      </Text>
      <Text mt={3}>{movie.overview || "No description available."}</Text>

      {/* ✅ Use CastGrid to Display the Cast */}
      <Heading size="md" mt={5}>
        Cast
      </Heading>
      <CastGrid cast={credits?.cast || []} />
    </Box>
  );
};

export default MovieDetails;
