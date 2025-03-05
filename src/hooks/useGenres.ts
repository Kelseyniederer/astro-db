import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import apiClient from "../services/api-client";

export interface Genre {
  id: number;
  name: string;
  icon: IconType;
}

const useGenres = () => {
  const [data, setData] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    apiClient
      .get("/genre/movie/list", { params: { language: "en-US" } })
      .then((res) => {
        setData(res.data.genres);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
};

export default useGenres;
