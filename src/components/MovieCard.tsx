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

      console.log("\n=== MovieCard Component ===");
      console.log("Movie type:", movie.media_type);
      console.log("Card dimensions:", {
        clientWidth: card.clientWidth,
        clientHeight: card.clientHeight,
        offsetWidth: card.offsetWidth,
        offsetHeight: card.offsetHeight,
        scrollWidth: card.scrollWidth,
        scrollHeight: card.scrollHeight,
      });
      console.log("Card computed style:", {
        display: cardStyle.display,
        position: cardStyle.position,
        height: cardStyle.height,
        minHeight: cardStyle.minHeight,
        maxHeight: cardStyle.maxHeight,
        width: cardStyle.width,
        minWidth: cardStyle.minWidth,
        maxWidth: cardStyle.maxWidth,
        margin: cardStyle.margin,
        padding: cardStyle.padding,
        boxSizing: cardStyle.boxSizing,
        overflow: cardStyle.overflow,
      });

      // Log all child elements
      Array.from(card.children).forEach((child, index) => {
        const childStyle = window.getComputedStyle(child);
        console.log(`Card child ${index}:`, {
          tagName: child.tagName,
          className: child.className,
          display: childStyle.display,
          position: childStyle.position,
          height: childStyle.height,
          width: childStyle.width,
          margin: childStyle.margin,
          padding: childStyle.padding,
          boxSizing: childStyle.boxSizing,
          overflow: childStyle.overflow,
        });

        // Log grandchildren (image container and card body contents)
        Array.from(child.children).forEach((grandchild, gIndex) => {
          const grandchildStyle = window.getComputedStyle(grandchild);
          console.log(`Card grandchild ${index}-${gIndex}:`, {
            tagName: grandchild.tagName,
            className: grandchild.className,
            display: grandchildStyle.display,
            position: grandchildStyle.position,
            height: grandchildStyle.height,
            width: grandchildStyle.width,
            margin: grandchildStyle.margin,
            padding: grandchildStyle.padding,
            boxSizing: grandchildStyle.boxSizing,
            overflow: grandchildStyle.overflow,
          });
        });
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

  return (
    <Card
      ref={cardRef}
      onClick={handleClick}
      cursor="pointer"
      variant="elevated"
      overflow="hidden"
      height="264px"
      width="250px"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform 0.15s ease-in",
      }}
    >
      <Box position="relative" height="200px" bg="gray.700">
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
      <CardBody height="64px" py={2}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
            height="24px"
          >
            <Text fontWeight="semibold" fontSize="md" noOfLines={2}>
              {displayTitle}
            </Text>
            {movie.media_type !== "person" && movie.vote_average > 0 && (
              <CriticScore score={movie.vote_average} />
            )}
          </Box>
          {movie.media_type === "person" && movie.birthday && (
            <Box height="24px">
              <ZodiacPill sign={getZodiacInfo(movie.birthday).sign} />
            </Box>
          )}
        </Box>
      </CardBody>
    </Card>
  );
};

export default MovieCard;
