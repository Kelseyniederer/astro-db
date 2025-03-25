import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, Image, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import noImage from "../../assets/no-image-placeholder-6f3882e0.webp";
import { Credit } from "../../hooks/usePersonMovies";
import CriticScore from "../CriticScore";
import ScrollContainer from "../common/ScrollContainer";

interface ActorFilmographyProps {
  movies: Credit[];
  error?: string;
  title?: string;
}

export const ActorFilmography = ({
  movies,
  error,
  title = "Filmography",
}: ActorFilmographyProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Sort movies by release date
  const sortedMovies = movies.sort((a, b) => {
    const dateA = a.release_date || a.first_air_date || "";
    const dateB = b.release_date || b.first_air_date || "";
    return dateB.localeCompare(dateA);
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;
      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  if (error) {
    return (
      <Text color="red.500">
        Error loading {title.toLowerCase()}: {error}
      </Text>
    );
  }

  return (
    <Box>
      <Heading
        as="h2"
        size="xl"
        mb={8}
        color="black"
        _dark={{ color: "white" }}
      >
        {title}
      </Heading>

      {sortedMovies.length > 0 ? (
        <Box position="relative">
          <IconButton
            aria-label="Scroll left"
            icon={<ChevronLeftIcon />}
            position="absolute"
            left={2}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            onClick={() => scroll("left")}
            display={scrollPosition <= 0 ? "none" : "flex"}
            colorScheme="blackAlpha"
          />
          <IconButton
            aria-label="Scroll right"
            icon={<ChevronRightIcon />}
            position="absolute"
            right={2}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            onClick={() => scroll("right")}
            colorScheme="blackAlpha"
          />
          <ScrollContainer ref={scrollRef} fullWidth>
            {sortedMovies.map((credit) => (
              <Box
                key={`${credit.id}-${credit.media_type}-${
                  credit.character || ""
                }-${credit.release_date || credit.first_air_date || ""}`}
                minW="200px"
                maxW="200px"
              >
                <Link to={`/${credit.media_type}/${credit.id}`}>
                  <Box
                    _hover={{
                      transform: "scale(1.03)",
                      transition: "transform 0.15s ease-in",
                    }}
                    borderRadius="xl"
                    overflow="hidden"
                    bg="white"
                    borderWidth="1px"
                    borderColor="gray.200"
                    _dark={{
                      bg: "gray.800",
                      borderColor: "gray.700",
                    }}
                  >
                    <Image
                      src={
                        credit.poster_path
                          ? `https://image.tmdb.org/t/p/w300${credit.poster_path}`
                          : noImage
                      }
                      alt={credit.title || credit.name}
                      width="100%"
                      height="300px"
                      objectFit="cover"
                    />
                    <Box p={3}>
                      <Text
                        fontWeight="bold"
                        fontSize="sm"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        color="black"
                        _dark={{ color: "white" }}
                        mb={1}
                      >
                        {credit.title || credit.name}
                      </Text>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          fontSize="xs"
                          color="gray.700"
                          _dark={{ color: "gray.400" }}
                        >
                          {credit.release_date || credit.first_air_date
                            ? new Date(
                                credit.release_date ||
                                  credit.first_air_date ||
                                  ""
                              ).getFullYear()
                            : "N/A"}
                        </Text>
                        {credit.vote_average > 0 && (
                          <CriticScore score={credit.vote_average} />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Box>
            ))}
          </ScrollContainer>
        </Box>
      ) : (
        <Text fontSize="lg" color="gray.700" _dark={{ color: "gray.400" }}>
          No {title.toLowerCase()} found.
        </Text>
      )}
    </Box>
  );
};
