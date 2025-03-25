import { Box, ChakraProvider, Grid, GridItem, Show } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./app.css";
import ColorModeManager from "./components/ColorModeManager";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import movieGenres from "./data/genres";
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
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const genreParam = searchParams.get("genre");

    if (genreParam) {
      const genreId = parseInt(genreParam);
      const genre = movieGenres.find((g) => g.id === genreId);

      if (genre) {
        setSelectedGenre(genre);
        setMovieQuery((prev) => {
          const newQuery = { ...prev, genreId };
          return newQuery;
        });
      }
    }
  }, [searchParams]);

  const handleSearch = (searchText: string) => {
    setMovieQuery((prev) => ({ ...prev, searchText }));
  };

  const handleSelectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
    setMovieQuery((prev) => {
      const newQuery = { ...prev, genreId: genre.id };
      return newQuery;
    });
    setSearchParams({ genre: genre.id.toString() });
  };

  const resetQuery = () => {
    setMovieQuery({});
    setSelectedGenre(null);
    setSearchParams({});
    navigate("/");
  };

  // Log state changes
  useEffect(() => {
  }, [movieQuery, selectedGenre]);

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
              <GridItem area="aside" paddingX={5}>
                <Box position="fixed" top="80px" width="190px">
                  <GenreList
                    selectedGenre={selectedGenre}
                    onSelectGenre={handleSelectGenre}
                  />
                </Box>
              </GridItem>
            </Show>
          )}
          <GridItem area="main">
            <Box pt="80px">
              <Outlet context={movieQuery} />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
