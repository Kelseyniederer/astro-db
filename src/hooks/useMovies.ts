import { MovieQuery } from "@/App";
import useData from "./useData";

export interface Movie {
  backdrop_path: string;
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  vote_average: number;
  vote_count: number;
}

const useMovies = (movieQuery: MovieQuery) => {
  const endpoint = movieQuery.searchText
    ? "/search/multi" // ✅ Search endpoint when searching
    : "/discover/movie"; // ✅ Filtered movies by genre

  return useData<Movie>(
    endpoint,
    {
      params: {
        query: movieQuery.searchText || undefined, // Only include if searching
        with_genres: movieQuery.genre?.id || undefined, // ✅ Filter by selected genre
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    },
    [movieQuery]
  );
};

export default useMovies;
