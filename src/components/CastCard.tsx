import { Text } from "@chakra-ui/react";
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
  size?: "small" | "normal";
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

  const cardWidth = size === "small" ? "75px" : "140px";
  const imageHeight = size === "small" ? "110px" : "210px";
  const infoHeight = size === "small" ? "50px" : "80px";
  const infoPadding = size === "small" ? 0.75 : 2;
  const nameSize = size === "small" ? "9px" : "sm";
  const marginBottom = size === "small" ? "2px" : 1;

  return (
    <Link to={`/person/${id}`}>
      <div className={styles.card} style={{ width: cardWidth }}>
        <div className={styles.content}>
          <div
            style={{
              width: cardWidth,
              height: imageHeight,
              overflow: "hidden",
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
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div
            className={styles.info}
            style={{
              minHeight: infoHeight,
              padding: `${infoPadding * 0.25}rem`,
              display: "flex",
              flexDirection: "column",
              gap: size === "small" ? "2px" : "4px",
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
            >
              {name}
            </Text>
            {character && (
              <Text
                fontSize={size === "small" ? "7px" : "xs"}
                className={styles.character}
                textAlign="center"
                width="100%"
                noOfLines={1}
                mb={size === "small" ? "2px" : 1}
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
                marginTop: size === "small" ? "2px" : "auto",
                transform: size === "small" ? "scale(0.85)" : "none",
                transformOrigin: "center",
              }}
            >
              <ZodiacPill
                sign={zodiacSign}
                size={size === "small" ? "xs" : "sm"}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CastCard;
