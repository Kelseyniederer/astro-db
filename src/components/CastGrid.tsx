import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client"; // ✅ Axios instance
import CastCard from "./CastCard"; // ✅ Import CastCard

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

interface CastWithBirthday extends CastMember {
  birthday?: string;
}

const CastGrid = ({ cast }: { cast: CastMember[] }) => {
  const [castDetails, setCastDetails] = useState<CastWithBirthday[]>([]);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const details = await Promise.all(
          cast.map(async (actor) => {
            const response = await apiClient.get(`/person/${actor.id}`);
            return { ...actor, birthday: response.data.birthday };
          })
        );
        setCastDetails(details);
      } catch (error) {
        console.error("Error fetching actor details:", error);
      }
    };

    fetchBirthdays();
  }, [cast]);

  return (
    <SimpleGrid
      columns={{ base: 2, sm: 3, md: 4, lg: 6, xl: 7 }}
      gap={6}
      paddingY={4}
    >
      {castDetails.map((actor) => (
        <CastCard
          key={actor.id}
          name={actor.name}
          character={actor.character}
          profilePath={actor.profile_path}
          birthday={actor.birthday}
        />
      ))}
    </SimpleGrid>
  );
};

export default CastGrid;
