import { Box, ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./app.css";
import ColorModeManager from "./components/ColorModeManager";
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
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleSelectGenre = (genreId: number) => {
    const genre = movieGenres.find((g) => g.id === genreId);
    if (genre) {
      setSelectedGenre(genre);
      setMovieQuery((prev) => ({ ...prev, genreId }));
      setSearchParams({ genre: genreId.toString() });
      if (location.pathname !== "/") {
        navigate("/");
      }
    }
  };

  const resetQuery = () => {
    setMovieQuery({});
    setSelectedGenre(null);
    setSearchParams({});
    navigate("/");
  };

  return (
    <ChakraProvider theme={theme}>
      <ColorModeManager />
      <Box minH="100vh">
        <Box position="sticky" top={0} zIndex={2} bg="gray.900">
          <NavBar
            onSearch={handleSearch}
            resetQuery={resetQuery}
            onSelectGenre={handleSelectGenre}
          />
        </Box>
        <Box px={5} pt={4}>
          <Outlet context={movieQuery} />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
