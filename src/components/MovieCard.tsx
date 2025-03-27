import { Movie } from "@/hooks/useMovies";
import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import getCroppedImageUrl from "../services/image-url";
import { getZodiacSign } from "../utils/zodiac";
import CriticScore from "./CriticScore";
import ZodiacPill from "./ZodiacPill";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const displayTitle = movie.title || movie.name || "Untitled";
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const card = cardRef.current;
      const cardStyle = window.getComputedStyle(card);

      // Log all child elements
      Array.from(card.children).forEach((child, index) => {
        const childStyle = window.getComputedStyle(child);

        // Log grandchildren (image container and card body contents)
        Array.from(child.children).forEach((grandchild, gIndex) => {});
      });
    }
  }, [movie.media_type]);

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

  const getZodiacInfo = (birthday: string) => {
    const date = new Date(birthday);
    return getZodiacSign({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  };

  console.log("Movie data:", {
    mediaType: movie.media_type,
    birthday: movie.birthday,
    character: movie.character,
  });

  return (
    <Card
      ref={cardRef}
      onClick={handleClick}
      cursor="pointer"
      variant="elevated"
      overflow="hidden"
      height="420px"
      width="250px"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform 0.15s ease-in",
      }}
    >
      <Box position="relative" height="375px" bg="gray.700">
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
            position="absolute"
            top="0"
            width="100%"
            height="100%"
            objectFit="cover"
            bg="gray.700"
          />
        )}
      </Box>
      <CardBody py={2} height="45px" display="flex" alignItems="center">
        <Box display="flex" flexDirection="column" width="100%">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <Text fontSize="sm" noOfLines={2} flex="1" letterSpacing="-0.3px">
              {displayTitle}
            </Text>
            {movie.media_type !== "person" && movie.vote_average > 0 && (
              <Box flexShrink={0}>
                <CriticScore score={movie.vote_average} />
              </Box>
            )}
          </Box>
          {movie.media_type === "person" && (
            <Box mt={1}>
              <ZodiacPill sign="Unknown" size="sm" />
            </Box>
          )}
        </Box>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
