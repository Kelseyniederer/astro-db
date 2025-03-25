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
  birthday?: string;
}

interface MovieApiResponse {
  results: Movie[]; // ✅ Matches API response structure
}

const useMovies = (movieQuery: MovieQuery) => {
  const endpoint = movieQuery.searchText
    ? "/search/multi"
    : movieQuery.genreId
    ? "/discover/movie"
    : "/trending/all/day";

  const { data, error, isLoading } = useData<MovieApiResponse>(
    endpoint,
    {
      params: {
        query: movieQuery.searchText || undefined,
        with_genres: movieQuery.genreId || undefined,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    },
    [movieQuery]
  );

  // Consider initial state (when data is null) as loading
  const effectiveLoading = isLoading || !data;
  return { movies: data?.results || [], error, isLoading: effectiveLoading };
};

export default useMovies;
