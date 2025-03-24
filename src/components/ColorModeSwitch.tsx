import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Text, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack spacing={2}>
      <Text display={{ base: "none", md: "block" }} fontSize="sm">
        {colorMode === "dark" ? "Dark Mode" : "Light Mode"}
      </Text>
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </HStack>
  );
};

export default ColorModeSwitch;
