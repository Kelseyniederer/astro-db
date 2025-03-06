import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import GenreList from "./components/GenreList";
import MovieDetails from "./components/MovieDetails";
import MovieGrid from "./components/MovieGrid";
import MovieHeading from "./components/MovieHeading";
import NavBar from "./components/NavBar";
import PersonDetails from "./components/PersonDetails";
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

  const resetQuery = () => setMovieQuery({ searchText: "", genre: null });

  return (
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
        <NavBar
          onSearch={(searchText) =>
            setMovieQuery({ ...movieQuery, searchText })
          }
          resetQuery={resetQuery}
        />
      </GridItem>

      {/* ✅ The "aside" only appears on the homepage */}
      <GridItem
        area="aside"
        display={{ base: "none", lg: "block" }}
        paddingX={5}
      >
        <GenreList
          selectedGenre={movieQuery.genre}
          onSelectGenre={(genre) => setMovieQuery({ ...movieQuery, genre })}
        />
      </GridItem>

      {/* ✅ Ensure all pages render correctly in the "main" section */}
      <GridItem area="main">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <MovieHeading movieQuery={movieQuery} />
                <MovieGrid movieQuery={movieQuery} />
              </>
            }
          />

          {/* Movie Details */}
          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* TV Details */}
          <Route path="/tv/:id" element={<TvDetails />} />

          {/* Person Details */}
          <Route path="/person/:id" element={<PersonDetails />} />
        </Routes>
      </GridItem>
    </Grid>
  );
}

export default App;
