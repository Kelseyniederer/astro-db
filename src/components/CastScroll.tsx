import { Box, HStack, Text } from "@chakra-ui/react";
import CastCard from "./CastCard";

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
      <Text
        fontSize="2xl"
        fontWeight="bold"
        mb={4}
        color="white"
        _light={{ color: "gray.800" }}
      >
        {title}
      </Text>
      <Box
        overflowX="auto"
        pb={4}
        css={{
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(0, 0, 0, 0.1)",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgba(255, 255, 255, 0.3)",
          },
        }}
      >
        <HStack gap={4} minW="max-content" px={1}>
          {cast.map((member) => (
            <CastCard
              key={member.id}
              id={member.id}
              name={member.name}
              character={member.character}
              profilePath={member.profile_path}
              birthday={member.birthday}
              episodeCount={member.episode_count}
            />
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default CastScroll;
