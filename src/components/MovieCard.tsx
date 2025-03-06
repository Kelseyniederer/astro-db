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
    const mediaType = movie.media_type || "movie"; // ✅ Default to "movie"

    switch (mediaType) {
      case "movie":
        navigate(`/movie/${movie.id}`);
        break;
      case "tv":
        navigate(`/tv/${movie.id}`);
        break;
      case "person":
        navigate(`/person/${movie.id}`);
        break;
      default:
        console.warn("Unknown media type:", movie);
        navigate("/"); // ✅ Redirect to home if media type is unknown
    }
  };

  // ✅ Ensure correct image selection
  const imagePath =
    movie.media_type === "person" ? movie.profile_path : movie.poster_path;
  const imageUrl = imagePath ? getCroppedImageUrl(imagePath) : noImage;

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
        <Image src={imageUrl} alt={displayTitle} title={displayTitle} />
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
