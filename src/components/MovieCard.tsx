import { Card, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { Movie } from "@/hooks/useMovies";
import getCroppedImageUrl from "../services/image-url";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp"; // Fallback image
import { FaUser } from "react-icons/fa"; // Icon for missing celebrity images
import CriticScore from "./CriticScore";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const displayTitle = movie.title || movie.name || "Untitled";
  const isPerson = movie.media_type === "person";

  // ✅ Use profile image for people, poster for movies
  const imagePath = isPerson ? movie.profile_path : movie.poster_path;
  const imageUrl = imagePath ? getCroppedImageUrl(imagePath) : noImage;

  return (
    <Card.Root bg="gray.900" borderRadius="lg" overflow="hidden">
      {isPerson && !movie.profile_path ? (
        <HStack
          justify="center"
          align="center"
          height="200px"
          bg="gray.800"
          color="gray.500"
        >
          <FaUser size={60} /> {/* User icon for missing profile images */}
        </HStack>
      ) : (
        <Image src={imageUrl} alt={displayTitle} />
      )}

      <Card.Body padding="4">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading fontSize="lg" fontWeight="bold" color="white" maxWidth="80%">
            {displayTitle}
          </Heading>

          {/* ✅ Show score for movies, "Celebrity" for people */}
          {!isPerson ? (
            <Text fontSize="sm" color="gray.400">
              <CriticScore score={movie.vote_average} />
            </Text>
          ) : (
            <Text fontSize="sm" color="yellow.400">
              Celebrity
            </Text>
          )}
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default MovieCard;
