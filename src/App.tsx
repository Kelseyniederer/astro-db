import { Box, ChakraProvider, Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./app.css";
import ColorModeManager from "./components/ColorModeManager";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import { Genre } from "./hooks/useGenres";
import theme from "./theme";

export interface MovieQuery {
  genreId?: number;
  searchText?: string;
  sortOrder?: string;
}

function App() {
  const [movieQuery, setMovieQuery] = useState<MovieQuery>({});
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (searchText: string) => {
    setMovieQuery((prev) => ({ ...prev, searchText }));
  };

  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
    setMovieQuery((prev) => ({ ...prev, genreId: genre.id }));
  };

  const resetQuery = () => {
    setMovieQuery({});
    setSelectedGenre(null);
    navigate("/");
  };

  const shouldShowGenreList =
    location.pathname === "/" && !movieQuery.searchText;

  return (
    <ChakraProvider theme={theme}>
      <ColorModeManager />
      <Box minH="100vh">
        <Grid
          templateAreas={{
            base: `"nav" "main"`,
            lg: `"nav nav" "${shouldShowGenreList ? "aside" : ""} main"`,
          }}
          templateColumns={{
            base: "1fr",
            lg: shouldShowGenreList ? "200px 1fr" : "1fr",
          }}
        >
          <GridItem area="nav">
            <NavBar onSearch={handleSearch} resetQuery={resetQuery} />
          </GridItem>
          {shouldShowGenreList && (
            <Show above="lg">
              <GridItem area="aside" paddingX={5} paddingTop="100px">
                <GenreList
                  selectedGenre={selectedGenre}
                  onSelectGenre={handleSelectGenre}
                />
              </GridItem>
            </Show>
          )}
          <GridItem area="main" pt={{ base: "80px", md: "100px" }}>
            <Outlet context={movieQuery} />
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
