import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
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
    genre: null,
    searchText: "",
  });
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [, setSearchParams] = useSearchParams();

  const handleMovieQuery = (query: MovieQuery) => {
    setMovieQuery(query);
    setSearchParams({
      genre: query.genre?.id.toString() || "",
      searchText: query.searchText || "",
    });
  };

  const resetGenre = () => handleMovieQuery({ ...movieQuery, genre: null });

  return (
    <Box minH="100vh">
      <NavBar
        onSearch={(searchText) =>
          handleMovieQuery({ ...movieQuery, searchText })
        }
        resetQuery={resetGenre}
      />
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
        }}
        paddingTop={{ base: "60px", md: "80px" }}
        gap={{ base: 4, md: 6 }}
      >
        {isHomePage && (
          <GridItem
            area="aside"
            paddingX={{ base: 4, lg: 5 }}
            paddingBottom={{ base: 4, lg: 0 }}
          >
            <GenreList
              selectedGenre={movieQuery.genre}
              onSelectGenre={(genre: Genre) =>
                handleMovieQuery({ ...movieQuery, genre })
              }
            />
          </GridItem>
        )}
        <GridItem area="main" paddingX={{ base: 4, md: 6 }} paddingBottom={6}>
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <Home movieQuery={movieQuery} />
                </ErrorBoundary>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <ErrorBoundary>
                  <MovieDetails />
                </ErrorBoundary>
              }
            />
            <Route
              path="/tv/:id"
              element={
                <ErrorBoundary>
                  <TvDetails />
                </ErrorBoundary>
              }
            />
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
  );
}

export default App;
