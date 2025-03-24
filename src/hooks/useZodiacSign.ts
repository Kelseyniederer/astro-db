import { useEffect, useState } from "react";
import { getPlanetaryPositions } from "../services/astrologyClient";

/**
 * Custom hook to get the formatted birthday and zodiac sign.
 */
const useZodiacSign = (birthday?: string) => {
  const [zodiacSign, setZodiacSign] = useState<string>("Unknown");
  const [formattedBirthday, setFormattedBirthday] = useState<string>("N/A");

  useEffect(() => {
    const fetchZodiacSign = async () => {
      if (!birthday) {
        setZodiacSign("Unknown");
        return;
      }

      try {
        const date = new Date(birthday);
        const planetaryData = await getPlanetaryPositions({
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          hour: 12,
          min: 0,
          lat: 41.8781,
          lon: -87.6298,
          tzone: -5,
        });

        // Find the Sun's position
        const sunData = planetaryData.find((planet) => planet.name === "Sun");
        setZodiacSign(sunData?.sign || "Unknown");
      } catch (error) {
        console.error("Error fetching zodiac sign:", error);
        setZodiacSign("Unknown");
      }
    };

    fetchZodiacSign();
  }, [birthday]);

  useEffect(() => {
    if (birthday) {
      const dateObj = new Date(birthday);
      setFormattedBirthday(
        new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(dateObj)
      );
    }
  }, [birthday]);

  return { zodiacSign, formattedBirthday };
};

export default useZodiacSign;
