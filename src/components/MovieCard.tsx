import { Movie } from "@/hooks/useMovies";
import { Box, Card, Heading, HStack, Image } from "@chakra-ui/react";
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
      height="100%"
      bg="gray.900"
      borderRadius="lg"
      overflow="hidden"
      onClick={handleClick}
      cursor="pointer"
    >
      <Box position="relative" paddingTop="150%">
        {movie.media_type === "person" && !movie.profile_path ? (
          <HStack
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            justify="center"
            align="center"
            bg="gray.800"
            color="gray.500"
          >
            <FaUser size={60} />
          </HStack>
        ) : (
          <Image
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            src={imageUrl}
            alt={displayTitle}
            objectFit="cover"
          />
        )}
      </Box>

      <Card.Body padding={4}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <Heading
            fontSize="md"
            fontWeight="semibold"
            color="white"
            isTruncated
          >
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
