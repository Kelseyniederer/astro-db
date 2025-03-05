import { MovieQuery } from "@/App";
import useData from "./useData";

export interface Movie {
  backdrop_path?: string;
  profile_path?: string;
  id: number;
  title?: string;
  name?: string;
  media_type: string;
  vote_average: number;
  poster_path: string;
}

const useMovies = (movieQuery: MovieQuery) => {
  const endpoint = movieQuery.searchText
    ? "/search/multi" // ✅ Search endpoint includes movies & people
    : "/discover/movie"; // ✅ Discover movies by genre

  return useData<Movie>(
    endpoint,
    {
      params: {
        query: movieQuery.searchText || undefined,
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
