import { Badge } from "@chakra-ui/react";

interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  const percentage = Math.round(score * 10); // Convert to percentage

  let color = percentage >= 85 ? "green" : percentage >= 75 ? "yellow" : "";

  return (
    <Badge color={color} fontSize={"14px"} paddingX={2} borderRadius={"4px"}>
      {percentage}%
    </Badge>
  );
};

export default CriticScore;
