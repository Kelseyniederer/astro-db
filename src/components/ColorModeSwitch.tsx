import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, IconButton, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        variant="ghost"
        size="sm"
      />
    </HStack>
  );
};

export default ColorModeSwitch;
