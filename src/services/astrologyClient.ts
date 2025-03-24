import axios from "axios";

export interface PlanetaryRequest {
  day: number;
  month: number;
  year: number;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone: number;
}

// Authentication setup exactly as in their docs
const username = "638992";
const password = "91d2bce66cd26c145a29d663e57c6faacb67e451";
const auth = btoa(`${username}:${password}`);

const astrologyClient = axios.create({
  baseURL: "https://json.astrologyapi.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${auth}`,
  },
});

// Add request interceptor for logging
astrologyClient.interceptors.request.use((request) => {
  return request;
});

// Add response interceptor for logging
astrologyClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.baseURL + error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
      },
    });
    throw error;
  }
);

export interface PlanetaryResponse {
  name: string;
  fullDegree: number;
  normDegree: number;
  speed: number;
  isRetro: string;
  sign: string;
  house: number;
}

interface MovieAPIRequest {
  day: number | null;
  month: number | null;
  year: number | null;
  hour: number;
  min: number;
  lat: number;
  lon: number;
  tzone: number;
}

interface BirthData {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  latitude: number;
  longitude: number;
  timezone: number;
  config?: {
    observation_point: string;
    ayanamsha: string;
    language: string;
  };
}

export const getPlanetaryPositions = async (
  data: BirthData
): Promise<PlanetaryResponse[]> => {
  try {

    const requestData: PlanetaryRequest = {
      day: data.date,
      month: data.month,
      year: data.year,
      hour: data.hours,
      min: data.minutes,
      lat: data.latitude,
      lon: data.longitude,
      tzone: data.timezone,
    };


    const response = await astrologyClient.post<PlanetaryResponse[]>(
      "/planets/tropical",
      requestData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching planetary positions:", error);
    throw error;
  }
};

export default astrologyClient;
