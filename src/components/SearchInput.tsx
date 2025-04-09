import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  onSearch: (searchText: string) => void;
  resetQuery: () => void;
}

export interface SearchInputHandle {
  clearInput: () => void;
}

const SearchInput = forwardRef<SearchInputHandle, Props>(
  ({ onSearch, resetQuery }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const bg = useColorModeValue("gray.100", "whiteAlpha.200");
    const hoverBg = useColorModeValue("gray.200", "whiteAlpha.300");
    const focusBg = useColorModeValue("white", "whiteAlpha.400");
    const iconColor = useColorModeValue("gray.500", "gray.400");
    const focusIconColor = useColorModeValue("gray.600", "white");

    useEffect(() => {
      // Clear search input when navigating to detail pages
      if (
        location.pathname.startsWith("/movie/") ||
        location.pathname.startsWith("/tv/") ||
        location.pathname.startsWith("/person/")
      ) {
        if (inputRef.current) {
          inputRef.current.value = "";
          // Just clear the search state without affecting navigation
          onSearch("");
        }
      }
    }, [location.pathname, onSearch]);

    useImperativeHandle(ref, () => ({
      clearInput: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
          onSearch("");
        }
      },
    }));

    const handleSearch = () => {
      if (inputRef.current) {
        const searchText = inputRef.current.value.trim();
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
            ref={inputRef}
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
              } else {
                onSearch(value);
                // Only navigate to home when actively searching
                if (location.pathname !== "/") {
                  navigate("/");
                }
              }
            }}
          />
        </InputGroup>
      </form>
    );
  }
);

export default SearchInput;
