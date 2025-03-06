import { Image, Text, VStack } from "@chakra-ui/react";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp"; // ✅ Fallback image
import useZodiacSign from "../hooks/useZodiacSign";

interface CastCardProps {
  name: string;
  character: string;
  profilePath?: string;
  birthday?: string;
}

const CastCard = ({
  name,
  character,
  profilePath,
  birthday,
}: CastCardProps) => {
  const { formattedBirthday, zodiacSign } = useZodiacSign(birthday);
  return (
    <>
      <VStack width="140px" gap={2}>
        <Image
          src={
            profilePath
              ? `https://image.tmdb.org/t/p/w185${profilePath}`
              : noImage
          }
          alt={name}
          borderRadius="md"
          width="140px"
          height="210px"
          objectFit="cover"
        />
        <Text fontSize="sm" fontWeight="bold" textAlign="center">
          {name}
        </Text>
        <Text fontSize="xs" color="gray.400" textAlign="center">
          {character}
        </Text>
        <Text fontSize="xs" color="gray.500" textAlign="center">
          {formattedBirthday}
        </Text>
        <Text fontSize="xs" color="yellow.400" textAlign="center">
          {zodiacSign}
        </Text>
      </VStack>
    </>
  );
};

export default CastCard;
