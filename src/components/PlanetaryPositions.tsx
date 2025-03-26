import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
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
    <Box>
      <Heading size="xl" mb={4} color="white">
        Planetary Positions
      </Heading>
      <Grid templateColumns="1fr" gap={2}>
        {planets.map((planet) => {
          const Icon = zodiacIcons[planet.sign as keyof typeof zodiacIcons];
          const bgColor = getElementColor(planet.sign);

          return (
            <Box
              key={planet.name}
              bg="gray.700"
              borderRadius="md"
              p={2.5}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontSize="md" color="white">
                {planet.name}
                {planet.isRetrograde && (
                  <Text as="span" color="gray.400" ml={1}>
                    (R)
                  </Text>
                )}
              </Text>
              <Flex
                align="center"
                gap={1.5}
                bg={bgColor}
                px={2.5}
                py={0.5}
                borderRadius="full"
              >
                {Icon && <Icon color="white" size={16} />}
                <Text color="white" fontSize="sm">
                  {planet.sign}
                </Text>
              </Flex>
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
};
