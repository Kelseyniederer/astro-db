import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./app.css";
import ActorProfile from "./components/ActorProfile";
import ErrorBoundary from "./components/ErrorBoundary";
import GenreList from "./components/GenreList";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import NavBar from "./components/NavBar";
import TvDetails from "./components/TvDetails";
import { Genre } from "./hooks/useGenres";

export interface MovieQuery {
  genre: Genre | null;
  searchText: string;
}

function App() {
  const [movieQuery, setMovieQuery] = useState<MovieQuery>({
    searchText: "",
    genre: null,
  });
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const resetQuery = () => setMovieQuery({ searchText: "", genre: null });
  const resetGenre = () => setMovieQuery({ ...movieQuery, genre: null });

  return (
    <Box>
      <NavBar
        onSearch={(searchText) => setMovieQuery({ ...movieQuery, searchText })}
        resetQuery={resetGenre}
      />

      <Box paddingTop="72px">
        <Grid
          templateAreas={{
            base: `"main"`,
            lg: isHomePage ? `"aside main"` : "main",
          }}
          templateColumns={{
            base: "1fr",
            lg: isHomePage ? "200px 1fr" : "1fr",
          }}
        >
          {isHomePage && (
            <GridItem
              area="aside"
              display={{ base: "none", lg: "block" }}
              paddingX={5}
              paddingTop={5}
            >
              <GenreList
                selectedGenre={movieQuery.genre}
                onSelectGenre={(genre) =>
                  setMovieQuery({ ...movieQuery, genre })
                }
              />
            </GridItem>
          )}

          <GridItem area="main" padding={5}>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    movieQuery={movieQuery}
                    onSelectGenre={(genre) =>
                      setMovieQuery({ ...movieQuery, genre })
                    }
                  />
                }
              />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/tv/:id" element={<TvDetails />} />
              <Route
                path="/person/:id"
                element={
                  <ErrorBoundary>
                    <ActorProfile />
                  </ErrorBoundary>
                }
              />
            </Routes>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
