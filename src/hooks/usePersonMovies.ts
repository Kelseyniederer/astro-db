import useData from "./useData";

export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
}

interface MovieCreditsResponse {
  cast: Movie[];
  crew: Movie[];
  id: number;
}

const usePersonMovies = (personId: number | undefined) => {
  if (!personId) return { data: [], error: null, isLoading: false };

  const { data, error, isLoading } = useData<MovieCreditsResponse>(
    `/person/${personId}/movie_credits`
  );

  return {
    data: data?.cast || [],
    error,
    isLoading,
  };
};

export default usePersonMovies;
