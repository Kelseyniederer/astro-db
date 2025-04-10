import { useEffect, useState } from "react";

const getZodiacSign = (month: number, day: number): string => {
  // Zodiac date ranges
  if ((month === 3 && day >= 21) || (month === 4 && day < 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  return "Unknown";
};

/**
 * Custom hook to get the formatted birthday and zodiac sign.
 */
const useZodiacSign = (birthday?: string) => {
  const [zodiacSign, setZodiacSign] = useState<string>("Unknown");
  const [formattedBirthday, setFormattedBirthday] = useState<string>("N/A");

  useEffect(() => {
    if (!birthday) {
      setZodiacSign("Unknown");
      return;
    }

    const date = new Date(birthday);
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();

    setZodiacSign(getZodiacSign(month, day + 1));

    setFormattedBirthday(
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date)
    );
  }, [birthday]);

  return { zodiacSign, formattedBirthday };
};

export default useZodiacSign;
