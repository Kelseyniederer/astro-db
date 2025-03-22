import axios from "axios";

const apiKey = import.meta.env.VITE_ASTROLOGY_API_KEY;

if (!apiKey) {
  throw new Error(
    "VITE_ASTROLOGY_API_KEY is not defined in environment variables. Please add it to your .env file."
  );
}

const isDevelopment = import.meta.env.DEV;

const astrologyClient = axios.create({
  baseURL: isDevelopment
    ? "/astrology"
    : "https://cors-anywhere.herokuapp.com/https://json.freeastrologyapi.com",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    Origin: "https://kelseyniederer.github.io",
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

export interface NatalWheelChartRequest {
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
    exclude_planets?: string[];
    allowed_aspects?: string[];
    aspect_line_colors?: {
      Conjunction?: string;
      Opposition?: string;
      Square?: string;
      Trine?: string;
      Sextile?: string;
      "Semi-Sextile"?: string;
      Quintile?: string;
      Septile?: string;
      Octile?: string;
      Novile?: string;
      Quincunx?: string;
      Sesquiquadrate?: string;
    };
    wheel_chart_colors?: {
      zodiac_sign_background_color: string;
      chart_background_color: string;
      zodiac_signs_text_color: string;
      dotted_line_color: string;
      planets_icon_color: string;
    };
    orb_values?: {
      Conjunction?: number;
      Opposition?: number;
      Square?: number;
      Trine?: number;
      Sextile?: number;
      "Semi-Sextile"?: number;
      Quintile?: number;
      Septile?: number;
      Octile?: number;
      Novile?: number;
      Quincunx?: number;
      Sesquiquadrate?: number;
    };
  };
}

export interface NatalWheelChartResponse {
  statusCode: number;
  output: string; // URL to the SVG chart
}

export const getNatalWheelChart = async (
  data: NatalWheelChartRequest
): Promise<NatalWheelChartResponse> => {
  const response = await astrologyClient.post<NatalWheelChartResponse>(
    "/western/natal-wheel-chart",
    data
  );
  return response.data;
};

export default astrologyClient;
