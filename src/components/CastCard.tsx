import { Text, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import useZodiacSign from "../hooks/useZodiacSign";
import styles from "../styles/CastCard.module.css";
import ZodiacPill from "./ZodiacPill";

interface CastCardProps {
  id: number;
  name: string;
  character: string;
  profilePath?: string;
  birthday?: string;
  episodeCount?: number;
  size?:
    | "small"
    | "normal"
    | "large"
    | { base: "small"; md: "normal" | "large" };
}

const CastCard = ({
  id,
  name,
  character,
  profilePath,
  birthday,
  episodeCount,
  size = "normal",
}: CastCardProps) => {
  const { zodiacSign } = useZodiacSign(birthday);

  const currentSize = useBreakpointValue(
    typeof size === "object" ? size : { base: size, md: size }
  );

  const cardWidth =
    currentSize === "small"
      ? "90px"
      : currentSize === "large"
      ? "180px"
      : "140px";
  const imageHeight =
    currentSize === "small"
      ? "135px"
      : currentSize === "large"
      ? "220px"
      : "210px";
  const infoHeight =
    currentSize === "small"
      ? "65px"
      : currentSize === "large"
      ? "100px"
      : "80px";
  const infoPadding =
    currentSize === "small" ? 1 : currentSize === "large" ? 2.5 : 2;
  const nameSize =
    currentSize === "small" ? "6px" : currentSize === "large" ? "md" : "sm";
  const marginBottom =
    currentSize === "small" ? "2px" : currentSize === "large" ? 2 : 1;

  return (
    <Link to={`/person/${id}`}>
      <div className={styles.card} style={{ width: cardWidth }}>
        <div className={styles.content}>
          <div
            style={{
              width: cardWidth,
              height: imageHeight,
              overflow: "hidden",
              borderRadius: "12px",
            }}
          >
            <img
              src={
                profilePath
                  ? `https://image.tmdb.org/t/p/w185${profilePath}`
                  : noImage
              }
              alt={name}
              className={styles.image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>
          <div
            className={styles.info}
            style={{
              minHeight: infoHeight,
              padding: `${infoPadding * 0.25}rem`,
              display: "flex",
              flexDirection: "column",
              gap: currentSize === "small" ? "3px" : "4px",
            }}
          >
            <Text
              fontSize={nameSize}
              fontWeight="bold"
              textAlign="center"
              width="100%"
              mb={marginBottom}
              className={styles.name}
              lineHeight="1.2"
              noOfLines={2}
            >
              {name}
            </Text>
            {character && (
              <Text
                fontSize={currentSize === "small" ? "9px" : "xs"}
                className={styles.character}
                textAlign="center"
                width="100%"
                noOfLines={1}
                mb={currentSize === "small" ? "2px" : 1}
              >
                {character}
              </Text>
            )}
            {episodeCount && (
              <Text
                fontSize="xs"
                className={styles.episodes}
                textAlign="center"
                width="100%"
              >
                {episodeCount} Episodes
              </Text>
            )}
            <div
              className={styles.zodiacContainer}
              style={{
                marginTop: currentSize === "small" ? "3px" : "auto",
                transform: currentSize === "small" ? "scale(0.9)" : "none",
                transformOrigin: "center",
              }}
            >
              <ZodiacPill
                sign={zodiacSign}
                size={currentSize === "small" ? "xs" : "sm"}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CastCard;
