import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNatalChart } from "../hooks/useNatalChart";

const NatalChart = () => {
  const { chartUrl, error, isLoading, generateChart } = useNatalChart();
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: 0,
    latitude: 0,
    longitude: 0,
    timezone: new Date().getTimezoneOffset() / -60,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateChart(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  return (
    <Container maxW="container.lg" py={6}>
      <Stack spacing={8}>
        <Heading as="h1" size="xl" textAlign="center">
          Natal Chart Generator
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Box flex={1}>
                <Text mb={2}>Year</Text>
                <Input
                  type="number"
                  min={1900}
                  max={2100}
                  value={formData.year}
                  onChange={(e) => handleChange("year", e.target.value)}
                  required
                />
              </Box>

              <Box flex={1}>
                <Text mb={2}>Month</Text>
                <Input
                  type="number"
                  min={1}
                  max={12}
                  value={formData.month}
                  onChange={(e) => handleChange("month", e.target.value)}
                  required
                />
              </Box>

              <Box flex={1}>
                <Text mb={2}>Date</Text>
                <Input
                  type="number"
                  min={1}
                  max={31}
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  required
                />
              </Box>
            </Stack>

            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Box flex={1}>
                <Text mb={2}>Hours</Text>
                <Input
                  type="number"
                  min={0}
                  max={23}
                  value={formData.hours}
                  onChange={(e) => handleChange("hours", e.target.value)}
                  required
                />
              </Box>

              <Box flex={1}>
                <Text mb={2}>Minutes</Text>
                <Input
                  type="number"
                  min={0}
                  max={59}
                  value={formData.minutes}
                  onChange={(e) => handleChange("minutes", e.target.value)}
                  required
                />
              </Box>

              <Box flex={1}>
                <Text mb={2}>Seconds</Text>
                <Input
                  type="number"
                  min={0}
                  max={59}
                  value={formData.seconds}
                  onChange={(e) => handleChange("seconds", e.target.value)}
                  required
                />
              </Box>
            </Stack>

            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Box flex={1}>
                <Text mb={2}>Latitude</Text>
                <Input
                  type="number"
                  min={-90}
                  max={90}
                  step="0.000001"
                  value={formData.latitude}
                  onChange={(e) => handleChange("latitude", e.target.value)}
                  required
                />
              </Box>

              <Box flex={1}>
                <Text mb={2}>Longitude</Text>
                <Input
                  type="number"
                  min={-180}
                  max={180}
                  step="0.000001"
                  value={formData.longitude}
                  onChange={(e) => handleChange("longitude", e.target.value)}
                  required
                />
              </Box>

              <Box flex={1}>
                <Text mb={2}>Timezone</Text>
                <Input
                  type="number"
                  min={-12}
                  max={14}
                  step="0.5"
                  value={formData.timezone}
                  onChange={(e) => handleChange("timezone", e.target.value)}
                  required
                />
              </Box>
            </Stack>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              isLoading={isLoading}
            >
              Generate Chart
            </Button>
          </Stack>
        </form>

        {error && (
          <Text color="red.500" textAlign="center">
            {error}
          </Text>
        )}

        {chartUrl && (
          <Box
            borderWidth={1}
            borderRadius="lg"
            p={4}
            bg="white"
            boxShadow="lg"
          >
            <Image
              src={chartUrl}
              alt="Natal Chart"
              width="100%"
              height="auto"
            />
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default NatalChart;
