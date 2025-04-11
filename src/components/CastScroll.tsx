import { Box } from "@chakra-ui/react";
import CastCard from "./CastCard";
import ScrollContainer from "./common/ScrollContainer";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
  episode_count?: number;
  birthday?: string;
}

interface Props {
  cast: CastMember[];
  title?: string;
  size?: "small" | "normal" | "large" | { base: "small"; md: "large" };
}

const CastScroll = ({ cast }: Props) => {
  return (
    <Box>
      <ScrollContainer fullWidth>
        {cast.map((member) => (
          <Box
            key={member.id}
            minW={{ base: "90px", md: "180px" }}
            maxW={{ base: "90px", md: "180px" }}
            mr={{ base: 3, md: 4 }}
          >
            <CastCard
              id={member.id}
              name={member.name}
              character={member.character}
              profilePath={member.profile_path}
              birthday={member.birthday}
              episodeCount={member.episode_count}
              size={{ base: "small", md: "large" }}
            />
          </Box>
        ))}
      </ScrollContainer>
    </Box>
  );
};

export default CastScroll;
