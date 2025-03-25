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
  job?: string;
  department?: string;
  credit_id?: string;
  roles?: { job?: string; character?: string; department?: string }[];
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

  // Helper function to create a unique key for a movie/show
  const getMediaKey = (credit: Credit) => {
    return `${credit.id}-${credit.media_type}`;
  };

  // Combine and deduplicate credits
  const processCredits = () => {
    const creditMap = new Map<string, Credit>();

    // Process movie credits
    if (movieCredits) {
      // Process cast credits
      movieCredits.cast?.forEach((credit) => {
        const key = getMediaKey(credit);
        if (creditMap.has(key)) {
          const existing = creditMap.get(key)!;
          existing.roles = [
            ...(existing.roles || []),
            { character: credit.character },
          ];
        } else {
          creditMap.set(key, {
            ...credit,
            media_type: "movie" as const,
            roles: [{ character: credit.character }],
          });
        }
      });

      // Process crew credits
      movieCredits.crew?.forEach((credit) => {
        const key = getMediaKey(credit);
        if (creditMap.has(key)) {
          const existing = creditMap.get(key)!;
          existing.roles = [
            ...(existing.roles || []),
            { job: credit.job, department: credit.department },
          ];
        } else {
          creditMap.set(key, {
            ...credit,
            media_type: "movie" as const,
            roles: [{ job: credit.job, department: credit.department }],
          });
        }
      });
    }

    // Process TV credits
    if (tvCredits) {
      // Process cast credits
      tvCredits.cast?.forEach((credit) => {
        const key = getMediaKey(credit);
        if (creditMap.has(key)) {
          const existing = creditMap.get(key)!;
          existing.roles = [
            ...(existing.roles || []),
            { character: credit.character },
          ];
        } else {
          creditMap.set(key, {
            ...credit,
            media_type: "tv" as const,
            roles: [{ character: credit.character }],
          });
        }
      });

      // Process crew credits
      tvCredits.crew?.forEach((credit) => {
        const key = getMediaKey(credit);
        if (creditMap.has(key)) {
          const existing = creditMap.get(key)!;
          existing.roles = [
            ...(existing.roles || []),
            { job: credit.job, department: credit.department },
          ];
        } else {
          creditMap.set(key, {
            ...credit,
            media_type: "tv" as const,
            roles: [{ job: credit.job, department: credit.department }],
          });
        }
      });
    }

    // Convert map to array and sort by date
    return Array.from(creditMap.values()).sort((a, b) => {
      const dateA = a.release_date || a.first_air_date || "";
      const dateB = b.release_date || b.first_air_date || "";
      return dateB.localeCompare(dateA);
    });
  };

  const combinedCredits = processCredits();

  return {
    data: combinedCredits,
    error: movieError || tvError,
    isLoading: movieLoading || tvLoading,
  };
};

export default usePersonMovies;
