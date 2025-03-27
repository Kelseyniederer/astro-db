import { HStack, Icon, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  // Round to one decimal place
  const displayScore = Math.round(score * 10) / 10;

  return (
    <HStack gap={1}>
      <Text
        fontSize="sm"
        fontWeight="normal"
        letterSpacing="-0.3px"
        color="white"
        _light={{ color: "gray.800" }}
      >
        {displayScore}
      </Text>
      <Icon as={FaStar} color="yellow.400" boxSize="12px" />
    </HStack>
  );
};

export default CriticScore;
