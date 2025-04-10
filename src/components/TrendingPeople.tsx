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
      <SectionHeading noMargin pt={4}>
        Trending People
      </SectionHeading>
      {isLoading ? (
        <TrendingPeopleSkeleton />
      ) : (
        <Box mt={{ base: 2, md: 4 }} px={{ base: 0, md: 2 }} width="100%">
          <ScrollContainer>
            {people.map((person) => (
              <Box
                key={person.id}
                minW={{ base: "75px", md: "160px" }}
                maxW={{ base: "75px", md: "160px" }}
                mr={{ base: 2, md: 4 }}
                className="person-card-container"
                sx={{
                  '[class*="card_card"]': {
                    width: { base: "75px !important", md: "140px" },
                  },
                  '[class*="card_image"]': {
                    width: { base: "75px !important", md: "140px" },
                    height: { base: "110px !important", md: "210px" },
                  },
                  '[class*="card_info"]': {
                    minHeight: { base: "50px", md: "80px" },
                    padding: { base: "0.25rem", md: 2 },
                  },
                  '[class*="card_name"]': {
                    fontSize: { base: "9px", md: "sm" },
                    marginBottom: { base: "2px", md: 1 },
                    lineHeight: { base: 1.2, md: 1.2 },
                  },
                  '[class*="card_zodiacContainer"]': {
                    marginTop: { base: "2px", md: "auto" },
                    transform: { base: "scale(0.85)", md: "none" },
                    transformOrigin: "center",
                  },
                }}
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
