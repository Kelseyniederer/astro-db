import { Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";

interface CastCardProps {
  id: number;
  name: string;
  character: string;
  profilePath?: string;
  birthday?: string;
}

const CastCard = ({
  id,
  name,
  character,
  profilePath,
  birthday,
}: CastCardProps) => {
  return (
    <Link to={`/person/${id}`}>
      <VStack width="140px" gap={2} cursor="pointer">
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
          {character}
        </Text>
        <Text fontSize="xs" color="gray.400" textAlign="center">
          {name}
        </Text>
        <Text fontSize="xs" color="gray.500" textAlign="center">
          {birthday ? birthday : "N/A"}
        </Text>
      </VStack>
    </Link>
  );
};

export default CastCard;
