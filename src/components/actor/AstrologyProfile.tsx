import {
  Box,
  Flex,
  Hide,
  Show,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { usePlanetaryData } from "../../hooks/usePlanetaryData";
import { ScrollContainer } from "../PlanetsScrollContainer";
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
      ml={{ base: 0, md: 0 }}
      mt={{ base: 4, md: 6 }}
      pb={{ base: 4, md: 8 }}
      width="100%"
      overflow="hidden"
    >
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="semibold"
        mb={{ base: 2, md: 3 }}
        color={headingColor}
        pl={0}
      >
        Planets
      </Text>
      <ScrollContainer>
        <Flex
          gap={{ base: 2, md: 3 }}
          minW="max-content"
          justifyContent="flex-start"
          pl={0}
        >
          {planetaryData
            ?.filter((planet) => planets.includes(planet.name))
            .map((planet) => (
              <Flex key={planet.name} align="center" gap={{ base: 1, md: 1.5 }}>
                <Text
                  color={textColor}
                  fontSize={{ base: "xs", md: "sm" }}
                  minW={{ base: "5px", md: "auto" }}
                >
                  {planet.name}
                </Text>
                <Hide above="md">
                  <ZodiacPill sign={planet.sign} size="xs" />
                </Hide>
                <Show above="md">
                  <ZodiacPill sign={planet.sign} size="sm" />
                </Show>
                {planet.isRetro === "true" && (
                  <Text color={textColor} fontSize={{ base: "xs", md: "sm" }}>
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
