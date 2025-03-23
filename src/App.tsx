import { Box, ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import "./app.css";
import ColorModeManager from "./components/ColorModeManager";
import NavBar from "./components/NavBar";
import theme from "./theme";

export interface MovieQuery {
  genreId?: number;
  searchText?: string;
  sortOrder?: string;
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeManager />
      <Box minH="100vh">
        <Grid
          templateAreas={{
            base: `"nav" "main"`,
            lg: `"nav nav" "aside main"`,
          }}
          templateColumns={{
            base: "1fr",
            lg: "200px 1fr",
          }}
        >
          <GridItem area="nav">
            <NavBar onSearch={() => {}} resetQuery={() => {}} />
          </GridItem>
          <GridItem area="main">
            <Outlet />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
