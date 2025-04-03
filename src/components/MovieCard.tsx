import { Movie } from "@/hooks/useMovies";
import { Box } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const displayTitle = movie.title || movie.name || "Untitled";
  const navigate = useNavigate();

  const handleClick = () => {
    let type = movie.media_type;

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
    <Box
      onClick={handleClick}
      cursor="pointer"
      overflow="hidden"
      height="375px"
      width="250px"
      position="relative"
      borderRadius="lg"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform 0.15s ease-in",
      }}
    >
      {movie.media_type === "person" && !movie.profile_path ? (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="gray.400"
        >
          <FaUser size={60} />
        </Box>
      ) : (
        <Box
          as="img"
          src={imageUrl}
          alt={displayTitle}
          width="100%"
          height="100%"
          objectFit="cover"
        />
      )}
    </Box>
  );
};

export default MovieCard;
