import { Box, Heading } from "@chakra-ui/react";
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
}

const CastScroll = ({ cast, title = "Series Cast" }: Props) => {
  return (
    <Box>
      <Heading size="md" mb={4}>
        {title}
      </Heading>
      <ScrollContainer fullWidth>
        {cast.map((member) => (
          <Box key={member.id} mr={6}>
            <CastCard
              id={member.id}
              name={member.name}
              character={member.character}
              profilePath={member.profile_path}
              birthday={member.birthday}
              episodeCount={member.episode_count}
            />
          </Box>
        ))}
      </ScrollContainer>
    </Box>
  );
};

export default CastScroll;
