import { Movie } from "@/hooks/useMovies";
import { Card, Heading, HStack, Image } from "@chakra-ui/react";
import getCroppedImageUrl from "../services/image-url";
import CriticScore from "./CriticScore";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const displayTitle = movie.title || movie.name || "Untitled";

  return (
    <Card.Root bg="gray.900" borderRadius="lg" overflow="hidden">
      <Image src={getCroppedImageUrl(movie.poster_path)} alt={displayTitle} />

      <Card.Body padding="4">
        <HStack justifyContent="space-between" alignItems="center">
          <Heading
            fontSize="2xlg"
            fontWeight="bold"
            color="white"
            maxWidth="80%"
          >
            {displayTitle}
          </Heading>

          <CriticScore score={movie.vote_average} />
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default MovieCard;
