import { MovieQuery } from "@/App";
import { useOutletContext } from "react-router-dom";
import styles from "../styles/Home.module.css";
import MovieGrid from "./MovieGrid";
import MovieHeading from "./MovieHeading";
import TrendingPeople from "./TrendingPeople";

const Home = () => {
  const movieQuery = useOutletContext<MovieQuery>();
  const isSearching = Boolean(movieQuery.searchText);
  const isFilteringByGenre = Boolean(movieQuery.genreId);
  const shouldShowTrendingPeople = !isSearching && !isFilteringByGenre;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {shouldShowTrendingPeople && <TrendingPeople />}
        <div className={styles.movieSection}>
          <MovieHeading movieQuery={movieQuery} />
          <MovieGrid movieQuery={movieQuery} />
        </div>
      </div>
    </div>
  );
};

export default Home;
