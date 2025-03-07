import useData from "./useData";

export interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
}

const usePersonMovies = (personId: number | undefined) => {
  if (!personId) return { data: [], error: null, isLoading: false };

  return useData<Movie[]>(`/person/${personId}/movie_credits`, {}, [personId]);
};

export default usePersonMovies;
