import { MovieQuery } from "../App";
import useData from "./useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

const useGames = (movieQuery: MovieQuery) => {
  const {
    data: games,
    error,
    isLoading,
  } = useData<Game[]>(
    "/games",
    {
      params: {
        genres: movieQuery.genre?.id,
        search: movieQuery.searchText,
      },
    },
    [movieQuery]
  );

  return { games, error, isLoading };
};

export default useGames;
