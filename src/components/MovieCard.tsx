import { Movie } from "@/hooks/useMovies";
import { useColorMode } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import getCroppedImageUrl from "../services/image-url";
import styles from "../styles/MovieCard.module.css";
import { getZodiacSign } from "../utils/zodiac";
import CriticScore from "./CriticScore";
import ZodiacPill from "./ZodiacPill";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  const displayTitle = movie.title || movie.name || "Untitled";
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handleClick = () => {
    let type = movie.media_type;

    if (!type) {
      if (movie.title) type = "movie";
      else if (movie.name) type = "tv";
    }

    if (type === "movie") {
      navigate(`/movie/${movie.id}`);
    } else if (type === "tv") {
      navigate(`/tv/${movie.id}`);
    } else if (type === "person") {
      navigate(`/person/${movie.id}`);
    } else {
      console.error("Unknown media type:", movie);
      navigate("/");
    }
  };

  const imageUrl =
    movie.media_type === "person"
      ? movie.profile_path
        ? getCroppedImageUrl(movie.profile_path)
        : noImage
      : movie.poster_path
      ? getCroppedImageUrl(movie.poster_path)
      : noImage;

  const getZodiacInfo = (birthday: string) => {
    const date = new Date(birthday);
    return getZodiacSign({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  };

  return (
    <div
      className={`${styles.card} ${colorMode === "light" ? styles.light : ""}`}
      onClick={handleClick}
    >
      <div className={styles.imageContainer}>
        {movie.media_type === "person" && !movie.profile_path ? (
          <div className={styles.placeholderIcon}>
            <FaUser size={60} />
          </div>
        ) : (
          <>
            <img className={styles.image} src={imageUrl} alt={displayTitle} />
            <div className={styles.imageOverlay} />
          </>
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.content}>
          <div className={styles.titleRow}>
            <h3 className={styles.title}>{displayTitle}</h3>
            {movie.media_type !== "person" && movie.vote_average > 0 && (
              <CriticScore score={movie.vote_average} />
            )}
          </div>
          {movie.media_type === "person" && (
            <div className={styles.zodiacContainer}>
              <ZodiacPill
                sign={
                  movie.birthday
                    ? getZodiacInfo(movie.birthday).sign
                    : "Unknown"
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
