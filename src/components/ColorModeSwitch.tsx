import { HStack, Text } from "@chakra-ui/react";
import { ColorModeButton, useColorMode } from "./ui/color-mode";

const ColorModeSwitch = () => {
  const { colorMode } = useColorMode();
  return (
    <HStack>
      <ColorModeButton />
      <Text whiteSpace={"nowrap"}>
        {colorMode === "light" ? "Light Mode" : "Dark Mode"}
      </Text>
    </HStack>
  );
};

export default ColorModeSwitch;
