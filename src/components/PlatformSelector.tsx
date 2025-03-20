import { Box, Button, Text } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useData from "../hooks/useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  onSelectPlatform: (platform: Platform) => void;
  selectedPlatform?: Platform | null;
}

const PlatformSelector = ({ onSelectPlatform, selectedPlatform }: Props) => {
  const { data: platforms = [], error } = useData<Platform[]>(
    "/platforms/lists/parents"
  );

  if (error) return null;

  return (
    <Box position="relative">
      <Button
        onClick={(e) =>
          e.currentTarget.nextElementSibling?.classList.toggle("show")
        }
      >
        {selectedPlatform?.name || "Platforms"}{" "}
        <BsChevronDown style={{ marginLeft: "8px" }} />
      </Button>
      <Box
        position="absolute"
        top="100%"
        left={0}
        bg="white"
        boxShadow="md"
        borderRadius="md"
        width="200px"
        display="none"
        className="show"
        zIndex={1}
      >
        {platforms?.map((platform) => (
          <Box
            key={platform.id}
            px={4}
            py={2}
            cursor="pointer"
            _hover={{ bg: "gray.100" }}
            onClick={() => {
              onSelectPlatform(platform);
              document.querySelector(".show")?.classList.remove("show");
            }}
          >
            <Text>{platform.name}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PlatformSelector;
