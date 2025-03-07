import { Movie } from "@/hooks/useMovies";
import { Card, Heading, HStack, Image } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const displayTitle = movie.title || movie.name || "Untitled";
  const navigate = useNavigate();

  const handleClick = () => {
    let type = movie.media_type;

    // ✅ If media_type is missing, determine type based on available fields
    if (!type) {
      if (movie.title) type = "movie";
      else if (movie.name) type = "tv";
    }

    if (type === "movie") {
      navigate(`/movie/${movie.id}`);
    } else if (type === "tv") {
      navigate(`/tv/${movie.id}`);
    } else if (type === "person") {
      navigate(`/person/${movie.id}`);
    } else {
      console.error("Unknown media type:", movie);
      navigate("/");
    }
  };

  const imageUrl =
    movie.media_type === "person"
      ? movie.profile_path
        ? getCroppedImageUrl(movie.profile_path)
        : noImage
      : movie.poster_path
      ? getCroppedImageUrl(movie.poster_path)
      : noImage;

  return (
    <Card.Root
      bg="gray.900"
      borderRadius="lg"
      overflow="hidden"
      onClick={handleClick}
      cursor="pointer"
    >
      {movie.media_type === "person" && !movie.profile_path ? (
        <HStack
          justify="center"
          align="center"
          height="200px"
          bg="gray.800"
          color="gray.500"
        >
          <FaUser size={60} />
        </HStack>
      ) : (
        <Image src={imageUrl} alt={displayTitle} />
      )}

      <Card.Body padding="4">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading fontSize="lg" fontWeight="bold" color="white" maxWidth="80%">
            {displayTitle}
          </Heading>
          {movie.media_type === "movie" && (
            <CriticScore score={movie.vote_average} />
          )}
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default MovieCard;
