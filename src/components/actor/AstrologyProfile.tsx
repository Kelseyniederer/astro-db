import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { usePlanetaryData } from "../../hooks/usePlanetaryData";
import ZodiacPill from "../ZodiacPill";

interface AstrologyProfileProps {
  birthday: string;
  name: string;
  bio: string;
  imageUrl?: string;
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

  return (
    <>
      {/* Planetary Positions - Full width scroll */}
      <Box mt={8} mx={-6} px={6} overflowX="auto" whiteSpace="nowrap">
        <Flex gap={4} minW="max-content">
          {planetaryData?.map((planet) => (
            <Flex key={planet.name} align="center" gap={2}>
              <Text color="gray.400">{planet.name}</Text>
              <ZodiacPill sign={planet.sign} size="sm" />
            </Flex>
          ))}
        </Flex>
      </Box>
    </>
  );
};
