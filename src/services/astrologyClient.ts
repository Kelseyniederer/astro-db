import axios from "axios";

const apiKey = import.meta.env.VITE_ASTROLOGY_API_KEY;

if (!apiKey) {
  throw new Error(
    "VITE_ASTROLOGY_API_KEY is not defined in environment variables. Please add it to your .env file."
  );
}

const astrologyClient = axios.create({
  baseURL: "/astrology",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
  },
});

export interface NatalChartRequest {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  latitude: number;
  longitude: number;
  timezone: number;
  config?: {
    observation_point?: "topocentric" | "geocentric";
    ayanamsha?: "tropical" | "lahiri";
    house_system?:
      | "Placidus"
      | "Koch"
      | "Whole Signs"
      | "Equal Houses"
      | "Regiomontanus"
      | "Vehlow";
    language?: "en";
    wheel_chart_colors?: {
      zodiac_sign_background_color: string;
      chart_background_color: string;
      zodiac_signs_text_color: string;
      dotted_line_color: string;
      planets_icon_color: string;
    };
  };
}

export interface NatalChartResponse {
  statusCode: number;
  output: string; // URL to the SVG chart
}

export const getNatalChart = async (
  data: NatalChartRequest
): Promise<NatalChartResponse> => {
  const response = await astrologyClient.post<NatalChartResponse>(
    "/western/chart",
    data
  );
  return response.data;
};

export interface PlanetaryResponse {
  statusCode: number;
  output: Array<{
    planet: {
      en: string;
    };
    zodiac_sign: {
      name: {
        en: string;
      };
    };
    isRetro: string;
  }>;
}

export interface PlanetaryRequest {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  latitude: number;
  longitude: number;
  timezone: number;
  config?: {
    observation_point?: "topocentric" | "geocentric";
    ayanamsha?: "tropical" | "lahiri";
    language?: "en";
  };
}

export const getPlanetaryPositions = async (
  data: PlanetaryRequest
): Promise<PlanetaryResponse> => {
  const response = await astrologyClient.post<PlanetaryResponse>(
    "/western/planets",
    data
  );
  return response.data;
};

export default astrologyClient;
