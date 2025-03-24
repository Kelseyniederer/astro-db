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
}

const CastCard = ({
  id,
  name,
  character,
  profilePath,
  birthday,
  episodeCount,
}: CastCardProps) => {
  const { zodiacSign } = useZodiacSign(birthday);

  return (
    <Link to={`/person/${id}`}>
      <div className={styles.card}>
        <div className={styles.content}>
          <img
            src={
              profilePath
                ? `https://image.tmdb.org/t/p/w185${profilePath}`
                : noImage
            }
            alt={name}
            className={styles.image}
          />
          <div className={styles.info}>
            <Text className={styles.name}>{name}</Text>
            <Text className={styles.character}>{character}</Text>
            {episodeCount && (
              <Text className={styles.episodes}>{episodeCount} Episodes</Text>
            )}
          </div>
          <ZodiacPill sign={zodiacSign} />
        </div>
      </div>
    </Link>
  );
};

export default CastCard;
