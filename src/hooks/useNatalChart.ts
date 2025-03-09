import { useState } from "react";
import { getNatalChart, NatalChartRequest } from "../services/astrologyClient";

interface UseNatalChartResult {
  chartUrl: string | null;
  error: string | null;
  isLoading: boolean;
  generateChart: (
    birthData: Omit<NatalChartRequest, "config">
  ) => Promise<void>;
}

const defaultConfig: NatalChartRequest["config"] = {
  observation_point: "topocentric",
  ayanamsha: "tropical",
  house_system: "Placidus",
  language: "en",
  wheel_chart_colors: {
    zodiac_sign_background_color: "#303036",
    chart_background_color: "#303036",
    zodiac_signs_text_color: "#FFFFFF",
    dotted_line_color: "#FFFAFF",
    planets_icon_color: "#FFFAFF",
  },
};

export const useNatalChart = (): UseNatalChartResult => {
  const [chartUrl, setChartUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateChart = async (
    birthData: Omit<NatalChartRequest, "config">
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getNatalChart({
        ...birthData,
        config: defaultConfig,
      });

      if (response.statusCode === 200 && response.output) {
        setChartUrl(response.output);
      } else {
        setError("Failed to generate natal chart");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while generating the natal chart"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chartUrl,
    error,
    isLoading,
    generateChart,
  };
};
