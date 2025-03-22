import { Box, Text } from "@chakra-ui/react";

interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  const percentage = Math.round(score * 10);

  let color;
  if (percentage >= 75) {
    color = "green.400";
  } else if (percentage >= 60) {
    color = "yellow.400";
  } else {
    color = "red.400";
  }

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      bg="rgba(0, 0, 0, 0.15)"
      _light={{ bg: "rgba(0, 0, 0, 0.05)" }}
      backdropFilter="blur(8px)"
      px={2}
      py={0.5}
      borderRadius="md"
      transition="all 0.2s"
      _hover={{
        bg: "rgba(0, 0, 0, 0.25)",
        _light: { bg: "rgba(0, 0, 0, 0.1)" },
      }}
    >
      <Text fontSize="sm" fontWeight="bold" color={color}>
        {percentage}
      </Text>
    </Box>
  );
};

export default CriticScore;
