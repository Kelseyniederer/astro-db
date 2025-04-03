import { Box, ChakraProvider, useColorModeValue } from "@chakra-ui/react";
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
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          zIndex={1000}
          bg={useColorModeValue("rgba(255, 255, 255, 0.8)", "rgb(20, 24, 33)")}
          backdropFilter="blur(8px)"
        >
          <NavBar
            onSearch={handleSearch}
            resetQuery={resetQuery}
            onSelectGenre={handleSelectGenre}
          />
        </Box>
        <Box maxW="1400px" mx="auto" px={6} pt="80px">
          <Outlet context={movieQuery} />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
