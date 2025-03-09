import { useState } from "react";
import { getPlanetaryPositions } from "../services/astrologyClient";

interface PlanetaryPosition {
  planet: string;
  sign: string;
  isRetrograde: boolean;
}

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

      // Filter and sort planets in the traditional order
      const positions = INCLUDED_PLANETS.map((planetName) => {
        const planetData = data.output.find(
          (item) => item.planet.en === planetName
        );
        if (!planetData) return null;

        return {
          planet: planetData.planet.en,
          sign: planetData.zodiac_sign.name.en,
          isRetrograde: planetData.isRetro === "true",
        };
      }).filter((position): position is PlanetaryPosition => position !== null);

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
