import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import "./app.css";
import GenreList from "./components/GenreList";
import MovieGrid from "./components/MovieGrid";
import NavBar from "./components/NavBar";
import { Genre } from "./hooks/useGenres";

export interface MovieQuery {
  genre: Genre | null;
  searchText: string;
}

function App() {
  const [movieQuery, setMovieQuery] = useState<MovieQuery>({
    searchText: "",
  } as MovieQuery);

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
      {/* ✅ Pass onSearch function to NavBar */}
      <GridItem area="nav">
        <NavBar
          onSearch={(searchText) =>
            setMovieQuery({ ...movieQuery, searchText })
          }
        />
      </GridItem>

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

      <GridItem area="main">
        <MovieGrid movieQuery={movieQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
