import useData from "./useData";

export interface Credit {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  media_type: "movie" | "tv";
  vote_average: number;
  character?: string;
}

interface CreditsResponse {
  cast: Credit[];
  crew: Credit[];
  id: number;
}

const usePersonMovies = (personId: number | undefined) => {
  if (!personId) return { data: [], error: null, isLoading: false };

  const {
    data: movieCredits,
    error: movieError,
    isLoading: movieLoading,
  } = useData<CreditsResponse>(`/person/${personId}/movie_credits`);

  const {
    data: tvCredits,
    error: tvError,
    isLoading: tvLoading,
  } = useData<CreditsResponse>(`/person/${personId}/tv_credits`);

  const combinedCredits = [
    ...(movieCredits?.cast?.map((credit) => ({
      ...credit,
      media_type: "movie" as const,
    })) || []),
    ...(tvCredits?.cast?.map((credit) => ({
      ...credit,
      media_type: "tv" as const,
    })) || []),
  ].sort((a, b) => {
    const dateA = a.release_date || a.first_air_date || "";
    const dateB = b.release_date || b.first_air_date || "";
    return dateB.localeCompare(dateA);
  });

  return {
    data: combinedCredits,
    error: movieError || tvError,
    isLoading: movieLoading || tvLoading,
  };
};

export default usePersonMovies;
