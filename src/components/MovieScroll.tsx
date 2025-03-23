import {
  Box,
  Heading,
  Image,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface Credit {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  character?: string;
  media_type: "movie" | "tv";
  release_date?: string;
  first_air_date?: string;
}

interface Props {
  credits: Credit[];
  title: string;
}

const MovieScroll = ({ credits, title }: Props) => {
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box>
      <Heading size="lg" mb={4}>
        {title}
      </Heading>
      <Box
        overflowX="auto"
        css={{
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: useColorModeValue("#CBD5E0", "#4A5568"),
            borderRadius: "4px",
          },
          // Prevent content from wrapping
          whiteSpace: "nowrap",
          // Hide scrollbar for Firefox
          scrollbarWidth: "thin",
          // Hide scrollbar for IE/Edge
          "-ms-overflow-style": "none",
        }}
      >
        <Box display="inline-flex" gap={4} pb={4}>
          {credits.map((credit) => (
            <Box
              key={`${credit.id}-${credit.media_type}`}
              minW="150px"
              maxW="150px"
              bg={cardBg}
              borderRadius="lg"
              overflow="hidden"
              shadow="md"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
              display="inline-block"
            >
              <Link
                as={RouterLink}
                to={`/${credit.media_type}/${credit.id}`}
                _hover={{ textDecoration: "none" }}
                display="block"
              >
                <VStack align="stretch" height="100%" spacing={0}>
                  {credit.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w342${credit.poster_path}`}
                      alt={credit.title || credit.name}
                      width="100%"
                      height="225px"
                      objectFit="cover"
                    />
                  ) : (
                    <Box
                      height="225px"
                      bg="gray.600"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        color="gray.400"
                        fontSize="sm"
                        p={2}
                        textAlign="center"
                      >
                        No Image
                      </Text>
                    </Box>
                  )}
                  <VStack p={2} align="start" spacing={1} flex={1}>
                    <Text
                      color={textColor}
                      fontSize="sm"
                      fontWeight="bold"
                      noOfLines={2}
                      whiteSpace="normal"
                      height="2.5em"
                    >
                      {credit.title || credit.name}
                    </Text>
                    {credit.character && (
                      <Text
                        fontSize="xs"
                        color="gray.500"
                        noOfLines={1}
                        whiteSpace="normal"
                      >
                        as {credit.character}
                      </Text>
                    )}
                    <Text fontSize="xs" color="gray.500">
                      {credit.release_date
                        ? new Date(credit.release_date).getFullYear()
                        : credit.first_air_date
                        ? new Date(credit.first_air_date).getFullYear()
                        : "N/A"}
                    </Text>
                  </VStack>
                </VStack>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MovieScroll;
