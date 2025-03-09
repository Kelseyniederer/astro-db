import { Box, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
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
import { Link } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import useZodiacSign from "../hooks/useZodiacSign";

interface CastCardProps {
  id: number;
  name: string;
  character: string;
  profilePath?: string;
  birthday?: string;
}

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

const CastCard = ({
  id,
  name,
  character,
  profilePath,
  birthday,
}: CastCardProps) => {
  const { formattedBirthday, zodiacSign } = useZodiacSign(birthday);
  const ZodiacIcon = zodiacSign
    ? zodiacIcons[zodiacSign as keyof typeof zodiacIcons]
    : null;
  const element = zodiacSign ? getElement(zodiacSign) : "air";
  const colors = elementColors[element];

  return (
    <Link to={`/person/${id}`}>
      {" "}
      {/* ✅ Clickable Link */}
      <VStack width="140px" gap={3} cursor="pointer">
        <Image
          src={
            profilePath
              ? `https://image.tmdb.org/t/p/w185${profilePath}`
              : noImage
          }
          alt={name}
          borderRadius="md"
          width="140px"
          height="210px"
          objectFit="cover"
        />
        <VStack gap={1} align="center" width="100%">
          <Text
            fontSize="sm"
            fontWeight="bold"
            textAlign="center"
            width="100%"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {name}
          </Text>
          <Text
            fontSize="xs"
            color="gray.400"
            textAlign="center"
            width="100%"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {character}
          </Text>
        </VStack>
        {zodiacSign && (
          <Box
            bg={colors.bg}
            _light={{ bg: colors.lightBg }}
            px={3}
            py={1}
            borderRadius="full"
            width="fit-content"
          >
            <HStack gap={1} justify="center">
              {ZodiacIcon && (
                <Icon
                  as={ZodiacIcon}
                  boxSize={3.5}
                  color={colors.icon}
                  _light={{ color: colors.lightIcon }}
                />
              )}
              <Text
                fontSize="xs"
                fontWeight="medium"
                color={colors.text}
                _light={{ color: colors.lightText }}
              >
                {zodiacSign}
              </Text>
            </HStack>
          </Box>
        )}
      </VStack>
    </Link>
  );
};

export default CastCard;
