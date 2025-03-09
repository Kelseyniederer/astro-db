import { useState } from "react";
import { getNatalWheelChart } from "../services/astrologyClient";

const defaultConfig = {
  observation_point: "geocentric" as const,
  ayanamsha: "tropical" as const,
  house_system: "Placidus" as const,
  language: "en" as const,
  wheel_chart_colors: {
    zodiac_sign_background_color: "#303036",
    chart_background_color: "#303036",
    zodiac_signs_text_color: "#FFFFFF",
    dotted_line_color: "#FFFAFF",
    planets_icon_color: "#FFFAFF",
  },
  allowed_aspects: ["Conjunction", "Opposition", "Trine", "Square", "Sextile"],
  aspect_line_colors: {
    Conjunction: "#558B6E",
    Opposition: "#88A09E",
    Square: "#704C5E",
    Trine: "#B88C9E",
    Sextile: "#F1C8DB",
  },
  orb_values: {
    Conjunction: 8,
    Opposition: 8,
    Square: 7,
    Trine: 7,
    Sextile: 6,
  },
};

export const useNatalWheelChart = (birthday: string | undefined) => {
  const [chartUrl, setChartUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNatalWheelChart = async () => {
    if (!birthday) return;

    setIsLoading(true);
    setError(null);

    try {
      const birthDate = new Date(birthday);
      const data = await getNatalWheelChart({
        year: birthDate.getFullYear(),
        month: birthDate.getMonth() + 1,
        date: birthDate.getDate(),
        hours: 12,
        minutes: 0,
        seconds: 0,
        latitude: 41.8781, // Chicago
        longitude: -87.6298,
        timezone: -5,
        config: defaultConfig,
      });

      if (data.statusCode === 200 && data.output) {
        setChartUrl(data.output);
      } else {
        setError("Failed to generate natal wheel chart");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch natal wheel chart"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chartUrl,
    error,
    isLoading,
    fetchNatalWheelChart,
  };
};
