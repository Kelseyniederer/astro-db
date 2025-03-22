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
          base: `"main"`,
          lg: isHomePage ? `"aside main"` : `"main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: isHomePage ? "250px 1fr" : "1fr",
        }}
        paddingTop={{ base: "60px", md: "80px" }}
        gap={{ base: 4, md: 6 }}
      >
        {isHomePage && (
          <GridItem
            area="aside"
            paddingX={5}
            display={{ base: "none", lg: "block" }}
            position="sticky"
            top="80px"
            height="calc(100vh - 80px)"
            overflowY="auto"
          >
            <GenreList
              selectedGenre={movieQuery.genre}
              onSelectGenre={(genre: Genre) =>
                handleMovieQuery({ ...movieQuery, genre })
              }
            />
          </GridItem>
        )}

        <GridItem area="main" paddingX={{ base: 4, lg: 5 }}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home movieQuery={movieQuery} />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/tv/:id" element={<TvDetails />} />
              <Route path="/person/:id" element={<ActorProfile />} />
            </Routes>
          </ErrorBoundary>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default App;
