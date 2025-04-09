import { SimpleGrid, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "../services/movieClient"; // ✅ Use Axios directly
import CastCard from "./CastCard";

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
  birthday?: string; // ✅ Add birthday field
}

const CastGrid = ({ cast }: { cast: CastMember[] }) => {
  const [castWithDetails, setCastWithDetails] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cast || cast.length === 0) {
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const details = await Promise.all(
          cast.map(async (actor) => {
            try {
              const response = await apiClient.get(`/person/${actor.id}`);
              return {
                ...actor,
                birthday: response.data.birthday || "N/A",
              };
            } catch (error) {
              console.error(`Error fetching details for ${actor.name}:`, error);
              return { ...actor, birthday: "N/A" }; // ✅ Prevents app from crashing
            }
          })
        );
        setCastWithDetails(details);
      } catch (error) {
        console.error("Error fetching actor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [cast]);

  if (loading) return <Spinner />;

  return (
    <SimpleGrid
      columns={{ base: 2, sm: 3, md: 4, lg: 6, xl: 7 }}
      gap={6}
      paddingY={4}
    >
      {castWithDetails.map((actor) => (
        <CastCard
          key={actor.id}
          id={actor.id}
          name={actor.name}
          character={actor.character}
          profilePath={actor.profile_path}
          birthday={actor.birthday} // ✅ Now birthday is correctly passed
        />
      ))}
    </SimpleGrid>
  );
};

export default CastGrid;
