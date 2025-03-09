import { useState } from "react";
import { getPlanetaryPositions } from "../services/astrologyClient";

interface PlanetaryPosition {
  planet: string;
  sign: string;
  isRetrograde: boolean;
}

export const usePlanetaryData = (birthday: string | undefined) => {
  const [planetaryData, setPlanetaryData] = useState<PlanetaryPosition[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlanetaryData = async () => {
    if (!birthday) return;

    setIsLoading(true);
    setError(null);

    try {
      const birthDate = new Date(birthday);
      const data = await getPlanetaryPositions({
        year: birthDate.getFullYear(),
        month: birthDate.getMonth() + 1,
        date: birthDate.getDate(),
        hours: 12,
        minutes: 0,
        seconds: 0,
        latitude: 41.8781, // Chicago
        longitude: -87.6298,
        timezone: -5,
        config: {
          observation_point: "geocentric",
          ayanamsha: "tropical",
          language: "en",
        },
      });

      const positions = data.output.map((item) => ({
        planet: item.planet.en,
        sign: item.zodiac_sign.name.en,
        isRetrograde: item.isRetro === "true",
      }));

      setPlanetaryData(positions);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch planetary data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    planetaryData,
    error,
    isLoading,
    fetchPlanetaryData,
  };
};
