import { Image } from "@chakra-ui/react";
import { Person } from "../hooks/useTrendingPeople";
import styles from "../styles/MovieCard.module.css";
import ZodiacPill from "./ZodiacPill";

interface Props {
  person: Person;
}

const PersonCard = ({ person }: Props) => {
  const imageUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
    : "";

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={person.name}
            className={styles.image}
            objectFit="cover"
          />
        ) : (
          <div className={styles.placeholderIcon}>No Image</div>
        )}
      </div>
      <div className={styles.cardBody}>
        <div className={styles.content}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{person.name}</h3>
          </div>
          <div className={styles.zodiacContainer}>
            <ZodiacPill birthday={person.birthday} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
