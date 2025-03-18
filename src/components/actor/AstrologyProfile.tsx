import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { usePlanetaryData } from "../../hooks/usePlanetaryData";
import ZodiacPill from "../ZodiacPill";

interface AstrologyProfileProps {
  birthday: string;
  name: string;
}

const LoadingState = () => (
  <Flex height="400px" align="center" justify="center">
    <Text>Loading...</Text>
  </Flex>
);

const ErrorState = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => void;
}) => (
  <Flex
    height="400px"
    align="center"
    justify="center"
    direction="column"
    textAlign="center"
  >
    <Text color="red.500" mb={4}>
      {error.includes("429")
        ? "Rate limit exceeded. Please try again in a few minutes."
        : "Error loading data"}
    </Text>
    {error.includes("429") && (
      <Button onClick={onRetry} colorScheme="purple" size="sm" mt={2}>
        Try Again
      </Button>
    )}
  </Flex>
);

const ContentBox = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box
    bg="gray.800"
    borderRadius="xl"
    p={6}
    height="100%"
    shadow="lg"
    borderWidth={1}
    borderColor="gray.700"
    _light={{
      bg: "white",
      borderColor: "gray.200",
    }}
  >
    <Heading as="h3" size="lg" color="white" _light={{ color: "gray.800" }}>
      {title}
    </Heading>
    {children}
  </Box>
);

export const AstrologyProfile = ({ birthday, name }: AstrologyProfileProps) => {
  const hasLoaded = useRef(false);

  const {
    planetaryData,
    error: planetaryError,
    isLoading: planetaryLoading,
    fetchPlanetaryData,
  } = usePlanetaryData(birthday);

  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      fetchPlanetaryData();
    }
  }, [fetchPlanetaryData]);

  const handleRetry = () => {
    fetchPlanetaryData();
  };

  return (
    <>
      <Heading as="h2" size="xl" mb={8}>
        Astrological Profile
      </Heading>
      <Grid templateColumns="1fr" gap={8}>
        <ContentBox title="Planetary Positions">
          {planetaryLoading ? (
            <LoadingState />
          ) : planetaryError ? (
            <ErrorState error={planetaryError} onRetry={handleRetry} />
          ) : planetaryData?.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              {planetaryData.map((planet) => (
                <Flex
                  key={planet.planet}
                  p={4}
                  borderWidth={1}
                  borderRadius="lg"
                  borderColor="gray.600"
                  bg="gray.700"
                  align="center"
                  justify="space-between"
                  _light={{
                    borderColor: "gray.200",
                    bg: "gray.50",
                  }}
                >
                  <Text
                    fontWeight="bold"
                    fontSize="md"
                    color="white"
                    _light={{ color: "gray.800" }}
                  >
                    {planet.planet}
                    {planet.isRetrograde && (
                      <Text
                        as="span"
                        color="gray.400"
                        _light={{ color: "gray.500" }}
                      >
                        {" "}
                        (R)
                      </Text>
                    )}
                  </Text>
                  <ZodiacPill sign={planet.sign} size="sm" />
                </Flex>
              ))}
            </SimpleGrid>
          ) : null}
        </ContentBox>
      </Grid>
    </>
  );
};
