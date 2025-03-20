import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNatalChart } from "../hooks/useNatalChart";

interface NatalChartFormData {
  name: string;
  date: string;
  time: string;
  latitude: string;
  longitude: string;
  timezone: string;
}

const NatalChart = () => {
  const { generateChart, isLoading, chartUrl, error } = useNatalChart();
  const [formData, setFormData] = useState<NatalChartFormData>({
    name: "",
    date: "",
    time: "",
    latitude: "",
    longitude: "",
    timezone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const [hours, minutes] = formData.time.split(":").map(Number);
    const [year, month, day] = formData.date.split("-").map(Number);

    await generateChart({
      year,
      month,
      date: day,
      hours: hours || 0,
      minutes: minutes || 0,
      seconds: 0,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      timezone: parseInt(formData.timezone),
    });
  };

  return (
    <Box maxW="container.lg" mx="auto" py={8}>
      <form onSubmit={handleSubmit}>
        <Box gap={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Generate Your Natal Chart
          </Text>

          <Box gap={6}>
            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={4}
            >
              <Box>
                <Text as="label" display="block" mb={2}>
                  Name *
                </Text>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </Box>

              <Box>
                <Text as="label" display="block" mb={2}>
                  Birth Date *
                </Text>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </Box>

              <Box>
                <Text as="label" display="block" mb={2}>
                  Birth Time *
                </Text>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  required
                />
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={4}
              mt={6}
            >
              <Box>
                <Text as="label" display="block" mb={2}>
                  Latitude *
                </Text>
                <Input
                  type="text"
                  value={formData.latitude}
                  onChange={(e) =>
                    setFormData({ ...formData, latitude: e.target.value })
                  }
                  placeholder="e.g., 40.7128"
                  required
                />
              </Box>

              <Box>
                <Text as="label" display="block" mb={2}>
                  Longitude *
                </Text>
                <Input
                  type="text"
                  value={formData.longitude}
                  onChange={(e) =>
                    setFormData({ ...formData, longitude: e.target.value })
                  }
                  placeholder="e.g., -74.0060"
                  required
                />
              </Box>

              <Box>
                <Text as="label" display="block" mb={2}>
                  Timezone *
                </Text>
                <Input
                  type="text"
                  value={formData.timezone}
                  onChange={(e) =>
                    setFormData({ ...formData, timezone: e.target.value })
                  }
                  placeholder="e.g., -5"
                  required
                />
              </Box>
            </Box>
          </Box>

          <Box mt={8}>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              loading={isLoading}
            >
              Generate Chart
            </Button>
          </Box>

          {error && (
            <Text color="red.500" mt={4}>
              Error: {error}
            </Text>
          )}

          {chartUrl && (
            <Box mt={8}>
              <img src={chartUrl} alt="Natal Chart" style={{ width: "100%" }} />
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default NatalChart;
