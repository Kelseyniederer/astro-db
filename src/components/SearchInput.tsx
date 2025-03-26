import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  onSearch: (searchText: string) => void;
  resetQuery: () => void;
}

const SearchInput = ({ onSearch, resetQuery }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const bg = useColorModeValue("gray.100", "whiteAlpha.200");
  const hoverBg = useColorModeValue("gray.200", "whiteAlpha.300");
  const focusBg = useColorModeValue("white", "whiteAlpha.400");
  const iconColor = useColorModeValue("gray.500", "gray.400");
  const focusIconColor = useColorModeValue("gray.600", "white");

  useEffect(() => {
    // Only clear search input when navigating to detail pages
    if (
      location.pathname.startsWith("/movie/") ||
      location.pathname.startsWith("/tv/") ||
      location.pathname.startsWith("/person/")
    ) {
      if (ref.current) {
        ref.current.value = "";
      }
    }
  }, [location.pathname]);

  const handleSearch = () => {
    if (ref.current) {
      const searchText = ref.current.value.trim();
      onSearch(searchText);

      // Only navigate to home if we're searching and not already there
      if (searchText && location.pathname !== "/") {
        navigate("/");
      }
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
      style={{ width: "100%" }}
    >
      <InputGroup
        size="md"
        transition="all 0.2s ease-in-out"
        _focusWithin={{
          transform: "scale(1.02)",
        }}
      >
        <InputLeftElement
          pointerEvents="none"
          transition="all 0.2s ease-in-out"
          _groupFocusWithin={{
            color: focusIconColor,
          }}
        >
          <SearchIcon color={iconColor} />
        </InputLeftElement>
        <Input
          ref={ref}
          type="search"
          placeholder="Search movies..."
          variant="filled"
          bg={bg}
          transition="all 0.2s ease-in-out"
          _hover={{
            bg: hoverBg,
            transform: "scale(1.01)",
          }}
          _focus={{
            bg: focusBg,
            transform: "scale(1.02)",
            boxShadow: useColorModeValue(
              "0 0 10px rgba(0,0,0,0.1)",
              "0 0 10px rgba(255,255,255,0.1)"
            ),
            borderColor: "transparent",
            outline: "none",
          }}
          _focusVisible={{
            outline: "none",
          }}
          borderRadius="full"
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              resetQuery();
            }
          }}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
