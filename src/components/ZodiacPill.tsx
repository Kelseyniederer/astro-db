import { useColorMode } from "@chakra-ui/react";
import {
  TbZodiacAquarius,
  TbZodiacAries,
  TbZodiacCancer,
  TbZodiacCapricorn,
  TbZodiacGemini,
  TbZodiacLeo,
  TbZodiacLibra,
  TbZodiacPisces,
  TbZodiacSagittarius,
  TbZodiacScorpio,
  TbZodiacTaurus,
  TbZodiacVirgo,
} from "react-icons/tb";
import styles from "../styles/ZodiacPill.module.css";

interface ZodiacPillProps {
  sign: string;
  size?: "sm" | "md" | "lg";
}

const zodiacIcons = {
  Aries: TbZodiacAries,
  Taurus: TbZodiacTaurus,
  Gemini: TbZodiacGemini,
  Cancer: TbZodiacCancer,
  Leo: TbZodiacLeo,
  Virgo: TbZodiacVirgo,
  Libra: TbZodiacLibra,
  Scorpio: TbZodiacScorpio,
  Sagittarius: TbZodiacSagittarius,
  Capricorn: TbZodiacCapricorn,
  Aquarius: TbZodiacAquarius,
  Pisces: TbZodiacPisces,
};

const getElement = (sign: string) => {
  const fireSign = ["Aries", "Leo", "Sagittarius"];
  const waterSigns = ["Cancer", "Scorpio", "Pisces"];
  const earthSigns = ["Taurus", "Virgo", "Capricorn"];
  const airSigns = ["Gemini", "Libra", "Aquarius"];

  if (fireSign.includes(sign)) return "fire";
  if (waterSigns.includes(sign)) return "water";
  if (earthSigns.includes(sign)) return "earth";
  if (airSigns.includes(sign)) return "air";
  return "unknown";
};

export const ZodiacPill = ({ sign, size = "md" }: ZodiacPillProps) => {
  const { colorMode } = useColorMode();
  const element = getElement(sign);
  const Icon = zodiacIcons[sign as keyof typeof zodiacIcons];

  const iconClassName = `${styles.icon} ${styles[size]}`;
  const pillClassName = `${styles.pill} ${styles[element]} ${styles[size]} ${
    colorMode === "light" ? styles.light : ""
  }`;

  return (
    <div className={pillClassName}>
      <div className={styles.content}>
        {sign !== "Unknown" && <Icon className={iconClassName} />}
        <span className={styles.text}>{sign}</span>
      </div>
    </div>
  );
};

export default ZodiacPill;
