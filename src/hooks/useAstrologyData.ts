import { useCallback, useState } from "react";
import astrologyCache from "../services/astrologyCache";
import {
  getNatalChart,
  getNatalWheelChart,
  getPlanetaryPositions,
  NatalChartResponse,
  NatalWheelChartResponse,
  PlanetaryResponse,
} from "../services/astrologyClient";
import useDebounce from "./useDebounce";

interface AstrologyData {
  natalChart: string | null;
  wheelChart: string | null;
  planetaryData: Array<{
    planet: string;
    sign: string;
    isRetrograde: boolean;
  }>;
}

interface UseAstrologyDataResult {
  data: AstrologyData | null;
  error: string | null;
  isLoading: boolean;
  fetchData: () => Promise<void>;
}

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

export const useAstrologyData = (
  birthday: string | undefined
): UseAstrologyDataResult => {
  const [data, setData] = useState<AstrologyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the birthday to prevent rapid API calls
  const debouncedBirthday = useDebounce(birthday, 500);

  const fetchData = useCallback(async () => {
    if (!debouncedBirthday) return;

    setIsLoading(true);
    setError(null);

    try {
      const birthDate = new Date(debouncedBirthday);
      const requestData = {
        year: birthDate.getFullYear(),
        month: birthDate.getMonth() + 1,
        date: birthDate.getDate(),
        hours: 12,
        minutes: 0,
        seconds: 0,
        latitude: 41.8781, // Chicago
        longitude: -87.6298,
        timezone: -5,
      };

      // Check cache first
      const cachedNatalChart = astrologyCache.get<NatalChartResponse>(
        requestData,
        "natal"
      );
      const cachedWheelChart = astrologyCache.get<NatalWheelChartResponse>(
        requestData,
        "wheel"
      );
      const cachedPlanetary = astrologyCache.get<PlanetaryResponse>(
        requestData,
        "planetary"
      );

      // Fetch only what's not in cache
      const [natalChart, wheelChart, planetary] = await Promise.all([
        cachedNatalChart ||
          getNatalChart({
            ...requestData,
            config: {
              observation_point: "topocentric",
              ayanamsha: "tropical",
              house_system: "Placidus",
              language: "en",
            },
          }).then((response) => {
            astrologyCache.set(requestData, "natal", response);
            return response;
          }),
        cachedWheelChart ||
          getNatalWheelChart({
            ...requestData,
            config: {
              observation_point: "geocentric",
              ayanamsha: "tropical",
              house_system: "Placidus",
              language: "en",
            },
          }).then((response) => {
            astrologyCache.set(requestData, "wheel", response);
            return response;
          }),
        cachedPlanetary ||
          getPlanetaryPositions({
            ...requestData,
            config: {
              observation_point: "geocentric",
              ayanamsha: "tropical",
              language: "en",
            },
          }).then((response) => {
            astrologyCache.set(requestData, "planetary", response);
            return response;
          }),
      ]);

      // Process planetary data
      const planetaryData = INCLUDED_PLANETS.map((planetName) => {
        const planetData = planetary.output.find(
          (item) => item.planet.en === planetName
        );
        if (!planetData) return null;

        return {
          planet: planetData.planet.en,
          sign: planetData.zodiac_sign.name.en,
          isRetrograde: planetData.isRetro === "true",
        };
      }).filter(
        (position): position is NonNullable<typeof position> =>
          position !== null
      );

      setData({
        natalChart: natalChart.output,
        wheelChart: wheelChart.output,
        planetaryData,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch astrological data"
      );
    } finally {
      setIsLoading(false);
    }
  }, [debouncedBirthday]);

  return {
    data,
    error,
    isLoading,
    fetchData,
  };
};
