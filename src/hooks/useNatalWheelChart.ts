import axios from "axios";
import { useEffect, useState } from "react";
import { useColorMode } from "../components/ui/color-mode";

const astrologyClient = axios.create({
  baseURL: "/astrology",
  headers: {
    "Content-Type": "application/json",
  },
});

export const useNatalWheelChart = (birthday: string) => {
  const [chartUrl, setChartUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { colorMode } = useColorMode();

  const fetchNatalWheelChart = async () => {
    setIsLoading(true);
    const [year, month, day] = birthday.split("-").map(Number);

    try {
      const requestData = {
        year,
        month,
        date: day,
        hours: 12,
        minutes: 0,
        seconds: 0,
        latitude: 41.8781,
        longitude: -87.6298,
        timezone: -5,
        config: {
          observation_point: "topocentric",
          ayanamsha: "tropical",
          house_system: "Placidus",
          wheel_chart_colors:
            colorMode === "light"
              ? {
                  zodiac_sign_background_color: "#FFFFFF",
                  chart_background_color: "#FFFFFF",
                  zodiac_signs_text_color: "#1A202C",
                  dotted_line_color: "#2D3748",
                  planets_icon_color: "#2D3748",
                }
              : {
                  zodiac_sign_background_color: "#303036",
                  chart_background_color: "#303036",
                  zodiac_signs_text_color: "#FFFFFF",
                  dotted_line_color: "#FFFAFF",
                  planets_icon_color: "#FFFAFF",
                },
        },
      };

      const response = await astrologyClient.post(
        "/western/natal-wheel-chart",
        requestData
      );
      if (response?.data?.output) {
        setChartUrl(response.data.output);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Re-fetch chart when color mode changes
  useEffect(() => {
    if (birthday) {
      fetchNatalWheelChart();
    }
  }, [colorMode, birthday]);

  return {
    chartUrl,
    error,
    isLoading,
    fetchNatalWheelChart,
  };
};
