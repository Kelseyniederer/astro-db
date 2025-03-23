interface ZodiacSign {
  sign: string;
  element: "fire" | "earth" | "air" | "water";
}

interface DateComponents {
  year: number;
  month: number;
  day: number;
}

export const getZodiacSign = ({ month, day }: DateComponents): ZodiacSign => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { sign: "Aries ♈", element: "fire" };
  }
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { sign: "Taurus ♉", element: "earth" };
  }
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { sign: "Gemini ♊", element: "air" };
  }
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { sign: "Cancer ♋", element: "water" };
  }
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { sign: "Leo ♌", element: "fire" };
  }
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { sign: "Virgo ♍", element: "earth" };
  }
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { sign: "Libra ♎", element: "air" };
  }
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { sign: "Scorpio ♏", element: "water" };
  }
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { sign: "Sagittarius ♐", element: "fire" };
  }
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { sign: "Capricorn ♑", element: "earth" };
  }
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { sign: "Aquarius ♒", element: "air" };
  }
  return { sign: "Pisces ♓", element: "water" }; // February 19 - March 20
};
