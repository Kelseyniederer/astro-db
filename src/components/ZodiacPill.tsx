import { Box, Icon as ChakraIcon, HStack, Text } from "@chakra-ui/react";
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

const elementColors = {
  fire: {
    bg: "red.800",
    lightBg: "red.50",
    icon: "red.500",
    lightIcon: "red.500",
    text: "white",
    lightText: "red.800",
  },
  water: {
    bg: "blue.800",
    lightBg: "blue.50",
    icon: "blue.400",
    lightIcon: "blue.500",
    text: "white",
    lightText: "blue.800",
  },
  earth: {
    bg: "green.800",
    lightBg: "green.50",
    icon: "green.300",
    lightIcon: "green.600",
    text: "white",
    lightText: "green.800",
  },
  air: {
    bg: "gray.700",
    lightBg: "gray.100",
    icon: "gray.400",
    lightIcon: "gray.500",
    text: "white",
    lightText: "gray.700",
  },
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
  return "air"; // default
};

const sizeMap = {
  sm: { padding: 2, fontSize: "xs", iconSize: 3.5 },
  md: { padding: 3, fontSize: "sm", iconSize: 4 },
  lg: { padding: 4, fontSize: "md", iconSize: 5 },
};

export const ZodiacPill = ({ sign, size = "md" }: ZodiacPillProps) => {
  const element = getElement(sign);
  const colors = elementColors[element];
  const { padding, fontSize, iconSize } = sizeMap[size];
  const ZodiacIcon = zodiacIcons[sign as keyof typeof zodiacIcons];

  return (
    <Box
      bg={colors.bg}
      _light={{ bg: colors.lightBg }}
      px={padding}
      py={padding - 1}
      borderRadius="full"
      width="fit-content"
    >
      <HStack gap={1} justify="center">
        {ZodiacIcon && (
          <ChakraIcon
            as={ZodiacIcon}
            boxSize={iconSize}
            color={colors.icon}
            _light={{ color: colors.lightIcon }}
          />
        )}
        <Text
          fontSize={fontSize}
          fontWeight="medium"
          color={colors.text}
          _light={{ color: colors.lightText }}
        >
          {sign}
        </Text>
      </HStack>
    </Box>
  );
};

export default ZodiacPill;
