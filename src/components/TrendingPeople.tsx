import { Box, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import apiClient from "../services/movieClient";
import CastCard from "./CastCard";
import TrendingPeopleSkeleton from "./TrendingPeopleSkeleton";
import ScrollContainer from "./common/ScrollContainer";
import SectionHeading from "./common/SectionHeading";

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
  const cardSize = useBreakpointValue({ base: "small", md: "normal" }) as
    | "small"
    | "normal";

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
        setIsLoading(false);
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
    <Box width="100%" maxW="container.xl" mx="auto">
      <SectionHeading noMargin pt={{ base: 2, md: 4 }}>
        Trending People
      </SectionHeading>
      {isLoading ? (
        <TrendingPeopleSkeleton />
      ) : (
        <Box mt={{ base: 2, md: 4 }} px={{ base: 2, md: 2 }} width="100%">
          <ScrollContainer>
            {people.map((person) => (
              <Box
                key={person.id}
                minW={{ base: "90px", md: "140px" }}
                maxW={{ base: "90px", md: "140px" }}
                mr={{ base: 3, md: 4 }}
                className="person-card-container"
              >
                <CastCard
                  id={person.id}
                  name={person.name}
                  character=""
                  profilePath={person.profile_path}
                  birthday={person.birthday || undefined}
                  size={cardSize}
                />
              </Box>
            ))}
          </ScrollContainer>
        </Box>
      )}
    </Box>
  );
};

export default TrendingPeople;
