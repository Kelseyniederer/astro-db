import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
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
    await generateChart(formData);
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
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Birth Date</FormLabel>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Birth Time</FormLabel>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </FormControl>
            </Box>

            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              gap={4}
              mt={6}
            >
              <FormControl isRequired>
                <FormLabel>Latitude</FormLabel>
                <Input
                  type="text"
                  value={formData.latitude}
                  onChange={(e) =>
                    setFormData({ ...formData, latitude: e.target.value })
                  }
                  placeholder="e.g., 40.7128"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Longitude</FormLabel>
                <Input
                  type="text"
                  value={formData.longitude}
                  onChange={(e) =>
                    setFormData({ ...formData, longitude: e.target.value })
                  }
                  placeholder="e.g., -74.0060"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Timezone</FormLabel>
                <Input
                  type="text"
                  value={formData.timezone}
                  onChange={(e) =>
                    setFormData({ ...formData, timezone: e.target.value })
                  }
                  placeholder="e.g., -5"
                />
              </FormControl>
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
