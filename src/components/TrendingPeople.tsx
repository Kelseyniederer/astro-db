import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import apiClient from "../services/api-client";
import CastCard from "./CastCard";
import TrendingPeopleSkeleton from "./TrendingPeopleSkeleton";
import ScrollContainer from "./common/ScrollContainer";

interface Person {
  id: number;
  name: string;
  profile_path: string;
  birthday: string | null;
}

const TrendingPeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchTrendingPeople = async () => {
      try {
        const response = await apiClient.get("/trending/person/day");
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
        // Filter out people without birthdays
        const filteredPeople = peopleWithBirthdays.filter(
          (person) => person.birthday !== null
        );
        setPeople(filteredPeople);
      } catch (error) {
        console.error("Error fetching trending people:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingPeople();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;
      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  if (people.length === 0 && !isLoading) return null;

  return (
    <Box>
      <Heading size="md" mb={4}>
        Trending People
      </Heading>
      {isLoading ? (
        <TrendingPeopleSkeleton />
      ) : (
        <ScrollContainer>
          {people.map((person) => (
            <CastCard
              key={person.id}
              id={person.id}
              name={person.name}
              character=""
              profilePath={person.profile_path}
              birthday={person.birthday || undefined}
            />
          ))}
        </ScrollContainer>
      )}
    </Box>
  );
};

export default TrendingPeople;
