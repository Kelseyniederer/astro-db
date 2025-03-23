import { Box, ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
  const [movieQuery, setMovieQuery] = useState<MovieQuery>({});
  const navigate = useNavigate();

  const handleSearch = (searchText: string) => {
    setMovieQuery((prev) => ({ ...prev, searchText }));
  };

  const resetQuery = () => {
    setMovieQuery({});
    navigate("/");
  };

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
            <NavBar onSearch={handleSearch} resetQuery={resetQuery} />
          </GridItem>
          <GridItem area="main" pt={{ base: "80px", md: "100px" }}>
            <Outlet context={movieQuery} />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
