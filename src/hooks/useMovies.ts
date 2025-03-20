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

interface MovieApiResponse {
  results: Movie[]; // ✅ Matches API response structure
}

const useMovies = (movieQuery: MovieQuery) => {
  const endpoint = movieQuery.searchText ? "/search/multi" : "/discover/movie";

  const { data, error, isLoading } = useData<MovieApiResponse>(
    endpoint,
    {
      params: {
        query: movieQuery.searchText || undefined,
        with_genres: movieQuery.genre?.id || undefined,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    },
    [movieQuery]
  );

  return { movies: data && data.results ? data.results : [], error, isLoading };
};

export default useMovies;
