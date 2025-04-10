import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { usePlanetaryData } from "../../hooks/usePlanetaryData";
import { ScrollContainer } from "../ScrollContainer";
import { ZodiacPill } from "../ZodiacPill";

interface AstrologyProfileProps {
  birthday: string;
}

export const AstrologyProfile = ({ birthday }: AstrologyProfileProps) => {
  const hasLoaded = useRef(false);
  const { planetaryData, fetchPlanetaryData } = usePlanetaryData(birthday);
  const headingColor = useColorModeValue("gray.700", "gray.200");
  const textColor = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      fetchPlanetaryData();
    }
  }, [fetchPlanetaryData]);

  const planets = [
    "Sun",
    "Moon",
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Pluto",
  ];

  return (
    <Box
      ml={{ base: -14, md: 0 }}
      mt={{ base: 0, md: 0 }}
      pb={{ base: 8, md: 8 }}
    >
      <Text fontSize="2xl" fontWeight="semibold" mb={3} color={headingColor}>
        Planets
      </Text>
      <ScrollContainer>
        <Flex gap={3} minW="max-content" justifyContent="flex-start">
          {planetaryData
            ?.filter((planet) => planets.includes(planet.name))
            .map((planet) => (
              <Flex key={planet.name} align="center" gap={1.5}>
                <Text color={textColor} fontSize="sm">
                  {planet.name}
                </Text>
                <ZodiacPill sign={planet.sign} size="sm" />
                {planet.isRetro === "true" && (
                  <Text color={textColor} fontSize="sm">
                    (R)
                  </Text>
                )}
              </Flex>
            ))}
        </Flex>
      </ScrollContainer>
    </Box>
  );
};
