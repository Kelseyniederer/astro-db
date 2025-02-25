import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ColorModeProvider } from "./components/ui/color-mode";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider forcedTheme="light">
        <App />
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>
);
