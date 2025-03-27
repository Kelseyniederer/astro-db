import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
    body: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "normal",
        letterSpacing: "-0.5px",
      },
    },
    Text: {
      baseStyle: {
        fontWeight: "normal",
        letterSpacing: "-0.3px",
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "normal",
        letterSpacing: "-0.3px",
      },
    },
  },
  styles: {
    global: {
      body: {
        transition: "background-color 0.2s ease-in-out",
        letterSpacing: "-0.3px",
        fontWeight: "normal",
      },
    },
  },
});

export default theme;
