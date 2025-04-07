import { Box, Flex, Text } from "@chakra-ui/react";
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
      ml={{ base: -8, md: 0 }}
      mt={{ base: 0, md: 0 }}
      pb={{ base: 4, md: 0 }}
    >
      <ScrollContainer>
        <Flex gap={6} minW="max-content">
          {planetaryData
            ?.filter((planet) => planets.includes(planet.name))
            .map((planet) => (
              <Flex key={planet.name} align="center" gap={2}>
                <Text color="gray.400">{planet.name}</Text>
                <ZodiacPill sign={planet.sign} size="sm" />
                {planet.isRetro === "true" && (
                  <Text color="gray.400" fontSize="sm">
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
