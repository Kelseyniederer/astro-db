import { Box, ChakraProvider, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./app.css";
import ColorModeManager from "./components/ColorModeManager";
import NavBar from "./components/NavBar";
import { SearchInputHandle } from "./components/SearchInput";
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
  const searchInputRef = useRef<SearchInputHandle>(null);

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

  // Clear search and scroll to top when location changes
  useEffect(() => {
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Clear search and genre if navigating to a detail page
    if (
      location.pathname.startsWith("/movie/") ||
      location.pathname.startsWith("/tv/") ||
      location.pathname.startsWith("/person/")
    ) {
      setMovieQuery((prev) => ({
        ...prev,
        searchText: undefined,
        genreId: undefined,
      }));
      setSelectedGenre(null);
      setSearchParams({});

      // Clear the search input
      if (searchInputRef.current) {
        searchInputRef.current.clearInput();
      }
    }
  }, [location.pathname, setSearchParams]);

  const handleSearch = (searchText: string) => {
    // Ignore empty searches completely
    if (!searchText.trim()) return;

    const isDetailPage =
      location.pathname.startsWith("/movie/") ||
      location.pathname.startsWith("/tv/") ||
      location.pathname.startsWith("/person/");

    // Set search state
    setMovieQuery((prev) => ({
      ...prev,
      searchText,
      genreId: undefined,
    }));

    // If on detail page, navigate after a small delay to ensure state is set
    if (isDetailPage) {
      setTimeout(() => {
        setSelectedGenre(null);
        setSearchParams({ search: searchText });
        navigate("/");
      }, 0);
    }
  };

  const handleSelectGenre = (genreId: number) => {
    const genre = movieGenres.find((g) => g.id === genreId);
    if (genre) {
      // Reset everything first
      setMovieQuery({});
      setSelectedGenre(null);
      setSearchParams({});

      // Then set the new genre state
      setTimeout(() => {
        setSelectedGenre(genre);
        setMovieQuery({ genreId });
        setSearchParams({ genre: genreId.toString() });
      }, 0);

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
            searchInputRef={searchInputRef}
            selectedGenre={selectedGenre}
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
