import { useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";

const ColorModeManager = () => {
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    const savedColorMode = localStorage.getItem("chakra-ui-color-mode");
    if (savedColorMode && savedColorMode !== colorMode) {
      setColorMode(savedColorMode as "light" | "dark");
    }
  }, [colorMode, setColorMode]);

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", colorMode);
  }, [colorMode]);

  return null;
};

export default ColorModeManager;
