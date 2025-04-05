import { Flex, Text } from "@chakra-ui/react";
import {
  TbZodiacAquarius,
  TbZodiacAries,
  TbZodiacCancer,
  TbZodiacCapricorn,
  TbZodiacGemini,
  TbZodiacLeo,
  TbZodiacLibra,
  TbZodiacPisces,
  TbZodiacSagittarius,
  TbZodiacScorpio,
  TbZodiacTaurus,
  TbZodiacVirgo,
} from "react-icons/tb";
import ZodiacPill from "./ZodiacPill";

interface Planet {
  name: string;
  sign: string;
  isRetrograde?: boolean;
}

interface PlanetaryPositionsProps {
  planets: Planet[];
}

const zodiacIcons = {
  Aries: TbZodiacAries,
  Taurus: TbZodiacTaurus,
  Gemini: TbZodiacGemini,
  Cancer: TbZodiacCancer,
  Leo: TbZodiacLeo,
  Virgo: TbZodiacVirgo,
  Libra: TbZodiacLibra,
  Scorpio: TbZodiacScorpio,
  Sagittarius: TbZodiacSagittarius,
  Capricorn: TbZodiacCapricorn,
  Aquarius: TbZodiacAquarius,
  Pisces: TbZodiacPisces,
};

const getElementColor = (sign: string) => {
  const fireSigns = ["Aries", "Leo", "Sagittarius"];
  const waterSigns = ["Cancer", "Scorpio", "Pisces"];
  const earthSigns = ["Taurus", "Virgo", "Capricorn"];
  const airSigns = ["Gemini", "Libra", "Aquarius"];

  if (fireSigns.includes(sign)) return "red.600";
  if (waterSigns.includes(sign)) return "blue.600";
  if (earthSigns.includes(sign)) return "green.600";
  if (airSigns.includes(sign)) return "gray.400"; // Lighter gray for air signs
  return "gray.600";
};

export const PlanetaryPositions = ({ planets }: PlanetaryPositionsProps) => {
  return (
    <Flex gap={4} flexWrap="wrap" justify="flex-start">
      {planets.map((planet) => (
        <Flex key={planet.name} align="center" gap={2}>
          <Text fontSize="md" color="gray.100">
            {planet.name}
          </Text>
          <ZodiacPill sign={planet.sign} size="sm" />
        </Flex>
      ))}
    </Flex>
  );
};
