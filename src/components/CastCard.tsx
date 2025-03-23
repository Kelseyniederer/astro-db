import { Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import useZodiacSign from "../hooks/useZodiacSign";
import ZodiacPill from "./ZodiacPill";

interface CastCardProps {
  id: number;
  name: string;
  character: string;
  profilePath?: string;
  birthday?: string;
  episodeCount?: number;
}

const CastCard = ({
  id,
  name,
  character,
  profilePath,
  birthday,
  episodeCount,
}: CastCardProps) => {
  const { zodiacSign } = useZodiacSign(birthday);

  return (
    <Link to={`/person/${id}`}>
      {" "}
      {/* ✅ Clickable Link */}
      <VStack width="140px" gap={3} cursor="pointer">
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
        <VStack gap={1} align="center" width="100%">
          <Text
            fontSize="sm"
            fontWeight="bold"
            textAlign="center"
            width="100%"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {name}
          </Text>
          <Text
            fontSize="xs"
            color="gray.400"
            textAlign="center"
            width="100%"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {character}
          </Text>
          {episodeCount && (
            <Text
              fontSize="xs"
              color="gray.500"
              textAlign="center"
              width="100%"
            >
              {episodeCount} Episodes
            </Text>
          )}
        </VStack>
        {zodiacSign && zodiacSign !== "Unknown" && (
          <ZodiacPill sign={zodiacSign} size="sm" />
        )}
      </VStack>
    </Link>
  );
};

export default CastCard;
