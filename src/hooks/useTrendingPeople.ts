import { useEffect, useState } from "react";
import apiClient from "../services/movieClient";

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  birthday: string | null;
}

interface TrendingPeopleResponse {
  results: Person[];
}

export default function useTrendingPeople() {
  const [data, setData] = useState<TrendingPeopleResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPeople = async () => {
      try {
        const response = await apiClient.get<TrendingPeopleResponse>(
          "/trending/person/day"
        );
        const peopleWithBirthdays = await Promise.all(
          response.data.results.map(async (person: Person) => {
            try {
              const personDetails = await apiClient.get(`/person/${person.id}`);
              return {
                ...person,
                birthday: personDetails.data.birthday,
              };
            } catch (error) {
              console.error(
                `Error fetching birthday for ${person.name}:`,
                error
              );
              return {
                ...person,
                birthday: null,
              };
            }
          })
        );
        setData({
          results: peopleWithBirthdays.filter(
            (person) => person.birthday !== null
          ),
        });
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingPeople();
  }, []);

  return { data, error, isLoading };
}
