import { useState } from "react";
import {
  getPlanetaryPositions,
  PlanetaryResponse,
} from "../services/astrologyClient";

// List of planets in traditional order
const INCLUDED_PLANETS = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
];

export const usePlanetaryData = (birthday: string | undefined) => {
  const [planetaryData, setPlanetaryData] = useState<PlanetaryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlanetaryData = async () => {
    if (!birthday) return;

    setIsLoading(true);
    setError(null);

    try {
      const [year, month, day] = birthday.split("-").map(Number);
      const data = await getPlanetaryPositions({
        year,
        month,
        date: day,
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

      // Filter and sort planets in the traditional order
      const positions = INCLUDED_PLANETS.map((planetName) => {
        const planetData = data.find((item) => item.name === planetName);
        return planetData;
      }).filter((position): position is PlanetaryResponse => position !== null);

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
