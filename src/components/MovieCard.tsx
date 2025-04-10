import { Movie } from "@/hooks/useMovies";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import useZodiacSign from "../hooks/useZodiacSign";
import getCroppedImageUrl from "../services/image-url";
import apiClient from "../services/movieClient";
import ZodiacPill from "./ZodiacPill";

interface Props {
  movie: Movie;
}

interface PersonDetails {
  birthday: string | null;
}

const MovieCard = ({ movie }: Props) => {
  const displayTitle = movie.title || movie.name || "Untitled";
  const navigate = useNavigate();
  const [personDetails, setPersonDetails] = useState<PersonDetails | null>(
    null
  );
  const { zodiacSign } = useZodiacSign(
    movie.media_type === "person"
      ? personDetails?.birthday || undefined
      : undefined
  );

  useEffect(() => {
    const fetchPersonDetails = async () => {
      if (movie.media_type === "person") {
        try {
          const response = await apiClient.get<PersonDetails>(
            `/person/${movie.id}`
          );
          setPersonDetails(response.data);
        } catch (error) {
          console.error("Error fetching person details:", error);
        }
      }
    };

    fetchPersonDetails();
  }, [movie.id, movie.media_type]);

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

  const isPerson = movie.media_type === "person";
  const hasImage = isPerson ? movie.profile_path : movie.poster_path;

  return (
    <Box onClick={handleClick} cursor="pointer" position="relative">
      <Box
        overflow="hidden"
        aspectRatio="2/3"
        width="100%"
        position="relative"
        borderRadius="md"
        _hover={{
          transform: "scale(1.03)",
          transition: "transform 0.15s ease-in",
        }}
      >
        {!hasImage ? (
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="gray.700"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            color="gray.400"
            p={4}
          >
            {isPerson ? (
              <FaUser size={60} />
            ) : (
              <Text
                fontSize="md"
                fontWeight="medium"
                textAlign="center"
                noOfLines={3}
              >
                {displayTitle}
              </Text>
            )}
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
      {isPerson && (
        <VStack spacing={1} align="center" mt={2}>
          <Text
            fontWeight="semibold"
            fontSize="md"
            noOfLines={1}
            textAlign="center"
            width="100%"
          >
            {displayTitle}
          </Text>
          <ZodiacPill sign={zodiacSign} size="sm" />
        </VStack>
      )}
      {!isPerson && !hasImage && (
        <Box mt={2} textAlign="center">
          <Text fontSize="xs" color="gray.500">
            No poster available
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default MovieCard;
