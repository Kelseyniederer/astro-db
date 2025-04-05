import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { usePlanetaryData } from "../../hooks/usePlanetaryData";
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

  // First row: Sun through Mars
  const firstRowPlanets = [
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
  // Second row: Jupiter through Pluto
  const secondRowPlanets: string | string[] = [];

  return (
    <Flex direction="column" gap={4}>
      {/* First Row */}
      <Flex gap={4} wrap="wrap">
        {planetaryData
          ?.filter((planet) => firstRowPlanets.includes(planet.name))
          .map((planet) => (
            <Flex key={planet.name} align="left" gap={2}>
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

      {/* Second Row */}
      <Flex gap={6} wrap="wrap">
        {planetaryData
          ?.filter((planet) => secondRowPlanets.includes(planet.name))
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
    </Flex>
  );
};
