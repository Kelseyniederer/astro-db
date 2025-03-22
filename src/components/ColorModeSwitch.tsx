import { HStack, Text } from "@chakra-ui/react";
import { ColorModeButton, useColorMode } from "./ui/color-mode";

const ColorModeSwitch = () => {
  const { colorMode } = useColorMode();
  return (
    <HStack>
      <ColorModeButton />
      <Text whiteSpace="nowrap" display={{ base: "none", md: "block" }}>
        {colorMode === "light" ? "Light Mode" : "Dark Mode"}
      </Text>
    </HStack>
  );
};

export default ColorModeSwitch;
