import { Box, Input } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  onSearch: (searchText: string) => void;
  resetQuery: () => void;
}

const SearchInput = ({ onSearch, resetQuery }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only clear search when navigating to detail pages
    if (
      location.pathname.startsWith("/movie/") ||
      location.pathname.startsWith("/tv/") ||
      location.pathname.startsWith("/person/")
    ) {
      if (ref.current) {
        ref.current.value = "";
        onSearch("");
      }
    }
  }, [location.pathname]);

  const handleSearch = () => {
    if (ref.current) {
      const searchText = ref.current.value.trim();
      if (location.pathname !== "/") {
        resetQuery();
        navigate("/");
        onSearch(searchText);
      } else {
        onSearch(searchText);
      }
    }
  };

  return (
    <Box position="relative" width="100%">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
        style={{ width: "100%" }}
      >
        <Box position="relative" width="100%">
          <Box
            position="absolute"
            left={{ base: 2, md: 4 }}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            color="gray.400"
          >
            <BsSearch />
          </Box>
          <Input
            ref={ref}
            type="search"
            enterKeyHint="search"
            placeholder="Search movies, TV shows, or people..."
            variant="outline"
            bg="gray.700"
            _hover={{ bg: "gray.600" }}
            _focus={{ bg: "gray.600", borderColor: "blue.300" }}
            _placeholder={{ color: "gray.400" }}
            color="white"
            _light={{
              bg: "gray.100",
              _hover: { bg: "gray.200" },
              _focus: { bg: "gray.200" },
              color: "gray.800",
            }}
            borderRadius="full"
            size={{ base: "md", md: "lg" }}
            pl={{ base: 8, md: 10 }}
            fontSize={{ base: "sm", md: "md" }}
          />
        </Box>
      </form>
    </Box>
  );
};

export default SearchInput;
