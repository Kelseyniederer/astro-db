import { Box, Image, Text, VStack } from "@chakra-ui/react";
import { Person } from "../hooks/useTrendingPeople";
import useZodiacSign from "../hooks/useZodiacSign";
import ZodiacPill from "./ZodiacPill";

interface Props {
  person: Person;
}

const PersonCard = ({ person }: Props) => {
  const imageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
    : "";

  const { zodiacSign } = useZodiacSign(person.birthday || undefined);

  return (
    <Box>
      <Box
        overflow="hidden"
        borderRadius="lg"
        position="relative"
        aspectRatio="2/3"
        mb={2}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={person.name}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        ) : (
          <Box
            width="100%"
            height="100%"
            bg="gray.700"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="gray.400"
          >
            No Image
          </Box>
        )}
      </Box>
      <VStack spacing={1} align="center">
        <Text
          fontWeight="semibold"
          fontSize="md"
          noOfLines={1}
          textAlign="center"
          width="100%"
        >
          {person.name}
        </Text>
        <ZodiacPill sign={zodiacSign} size="sm" />
      </VStack>
    </Box>
  );
};

export default PersonCard;
