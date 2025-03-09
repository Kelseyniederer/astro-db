import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNatalWheelChart } from "../../hooks/useNatalWheelChart";
import { usePlanetaryData } from "../../hooks/usePlanetaryData";

interface AstrologyProfileProps {
  birthday: string;
  name: string;
}

export const AstrologyProfile = ({ birthday, name }: AstrologyProfileProps) => {
  const hasLoaded = useRef(false);

  const {
    planetaryData,
    error: planetaryError,
    isLoading: planetaryLoading,
    fetchPlanetaryData,
  } = usePlanetaryData(birthday);

  const {
    chartUrl,
    error: chartError,
    isLoading: chartLoading,
    fetchNatalWheelChart,
  } = useNatalWheelChart(birthday);

  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      fetchPlanetaryData();
      fetchNatalWheelChart();
    }
  }, [fetchPlanetaryData, fetchNatalWheelChart]);

  const handleRetry = () => {
    fetchPlanetaryData();
    fetchNatalWheelChart();
  };

  return (
    <>
      <Heading as="h2" size="xl" mb={8}>
        Astrological Profile
      </Heading>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* Natal Wheel Chart */}
        <GridItem>
          <Box bg="gray.800" borderRadius="xl" p={6} height="100%" shadow="lg">
            <Heading as="h3" size="lg" mb={6}>
              Natal Chart
            </Heading>
            {chartLoading ? (
              <Flex height="400px" align="center" justify="center">
                <Text>Loading natal chart...</Text>
              </Flex>
            ) : chartError ? (
              <Flex
                height="400px"
                align="center"
                justify="center"
                direction="column"
                textAlign="center"
              >
                <Text color="red.500" mb={4}>
                  {chartError.includes("429")
                    ? "Rate limit exceeded. Please try again in a few minutes."
                    : `Error loading natal chart: ${chartError}`}
                </Text>
                {chartError.includes("429") && (
                  <Button
                    onClick={handleRetry}
                    colorScheme="purple"
                    size="sm"
                    mt={2}
                  >
                    Try Again
                  </Button>
                )}
              </Flex>
            ) : chartUrl ? (
              <Image
                src={chartUrl}
                alt={`${name}'s natal chart`}
                w="100%"
                h="auto"
                borderRadius="lg"
              />
            ) : null}
          </Box>
        </GridItem>

        {/* Planetary Positions */}
        <GridItem>
          <Box bg="gray.800" borderRadius="xl" p={6} height="100%" shadow="lg">
            <Heading as="h3" size="lg" mb={6}>
              Planetary Positions
            </Heading>
            {planetaryLoading ? (
              <Flex height="400px" align="center" justify="center">
                <Text>Loading planetary positions...</Text>
              </Flex>
            ) : planetaryError ? (
              <Flex
                height="400px"
                align="center"
                justify="center"
                direction="column"
                textAlign="center"
              >
                <Text color="red.500" mb={4}>
                  {planetaryError.includes("429")
                    ? "Rate limit exceeded. Please try again in a few minutes."
                    : planetaryError.includes("CORS")
                    ? "Error loading planetary data"
                    : `Error loading planetary data: ${planetaryError}`}
                </Text>
                {planetaryError.includes("429") ? (
                  <Button
                    onClick={handleRetry}
                    colorScheme="purple"
                    size="sm"
                    mt={2}
                  >
                    Try Again
                  </Button>
                ) : (
                  planetaryError.includes("CORS") && (
                    <Box p={4} bg="yellow.900" borderRadius="md" maxW="md">
                      <Text>
                        To view planetary positions, please first visit{" "}
                        <Link
                          to="https://cors-anywhere.herokuapp.com/corsdemo"
                          target="_blank"
                          style={{
                            color: "yellow",
                            textDecoration: "underline",
                          }}
                        >
                          this page
                        </Link>{" "}
                        and click the button to enable the demo server. Then
                        refresh this page.
                      </Text>
                    </Box>
                  )
                )}
              </Flex>
            ) : planetaryData?.length > 0 ? (
              <SimpleGrid columns={{ base: 2, md: 2 }} gap={4}>
                {planetaryData.map((planet) => (
                  <Box
                    key={planet.planet}
                    p={4}
                    borderWidth={1}
                    borderRadius="lg"
                    borderColor="gray.600"
                    bg="gray.700"
                  >
                    <Text fontWeight="bold" fontSize="lg" mb={1}>
                      {planet.planet}{" "}
                      {planet.isRetrograde && (
                        <Text as="span" color="gray.400">
                          (R)
                        </Text>
                      )}
                    </Text>
                    <Text color="gray.300">{planet.sign}</Text>
                  </Box>
                ))}
              </SimpleGrid>
            ) : null}
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};
