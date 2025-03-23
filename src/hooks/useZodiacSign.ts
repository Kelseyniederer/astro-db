import { useEffect, useState } from "react";

/**
 * Returns the zodiac sign based on a given date.
 */
const getZodiacSign = (month: number, day: number): string => {
  const zodiacSigns = [
    { sign: "Capricorn", start: [12, 22], end: [1, 19] },
    { sign: "Aquarius", start: [1, 20], end: [2, 18] },
    { sign: "Pisces", start: [2, 19], end: [3, 20] },
    { sign: "Aries", start: [3, 21], end: [4, 19] },
    { sign: "Taurus", start: [4, 20], end: [5, 20] },
    { sign: "Gemini", start: [5, 21], end: [6, 20] },
    { sign: "Cancer", start: [6, 21], end: [7, 22] },
    { sign: "Leo", start: [7, 23], end: [8, 22] },
    { sign: "Virgo", start: [8, 23], end: [9, 22] },
    { sign: "Libra", start: [9, 23], end: [10, 22] },
    { sign: "Scorpio", start: [10, 23], end: [11, 21] },
    { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
  ];

  return (
    zodiacSigns.find(
      ({ start, end }) =>
        (month === start[0] && day >= start[1]) ||
        (month === end[0] && day <= end[1])
    )?.sign || "Unknown"
  );
};

/**
 * Custom hook to get the formatted birthday and zodiac sign.
 */
const useZodiacSign = (birthday?: string) => {
  const [zodiacSign, setZodiacSign] = useState<string>("Unknown");
  const [formattedBirthday, setFormattedBirthday] = useState<string>("N/A");

  useEffect(() => {
    if (birthday) {
      const dateObj = new Date(birthday);
      setFormattedBirthday(
        dateObj.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
      );

      // Extract month and day for zodiac sign calculation
      const month = dateObj.getUTCMonth() + 1;
      const day = dateObj.getUTCDate();
      setZodiacSign(getZodiacSign(month, day));
    }
  }, [birthday]);

  return { formattedBirthday, zodiacSign };
};

export default useZodiacSign;
