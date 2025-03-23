import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack spacing={2}>
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      />
      <Text display={{ base: "none", md: "block" }} fontSize="sm">
        {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
      </Text>
    </HStack>
  );
};

export default ColorModeSwitch;
