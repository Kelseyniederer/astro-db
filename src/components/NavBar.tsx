import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { RefObject } from "react";
import { TbMovie } from "react-icons/tb";
import { Genre } from "../hooks/useGenres";
import ColorModeSwitch from "./ColorModeSwitch";
import GenreList from "./GenreList";
import Logo from "./Logo";
import SearchInput, { SearchInputHandle } from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
  resetQuery: () => void;
  onSelectGenre?: (genreId: number) => void;
  searchInputRef: RefObject<SearchInputHandle>;
  selectedGenre: Genre | null;
}

const NavBar = ({
  onSearch,
  resetQuery,
  onSelectGenre,
  searchInputRef,
  selectedGenre,
}: Props) => {
  const textColor = useColorModeValue("gray.800", "gray.200");
  const menuHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const menuBg = useColorModeValue("white", "gray.700");
  const activeColor = useColorModeValue("blue.500", "blue.300");

  const handleGenreSelect = (genre: Genre) => {
    if (searchInputRef.current) {
      searchInputRef.current.clearInput();
    }
    onSelectGenre?.(genre.id);
  };

  return (
    <Box
      padding="0.75rem 1rem"
      bg={useColorModeValue("white", "rgb(20, 24, 33)")}
    >
      <Flex justify="space-between" align="center">
        <HStack spacing={4}>
          <Logo resetQuery={resetQuery} />
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              leftIcon={<Icon as={TbMovie} boxSize={5} />}
              variant="ghost"
              color={selectedGenre ? activeColor : textColor}
              _hover={{ bg: menuHoverBg }}
              fontWeight={selectedGenre ? "bold" : "normal"}
              fontSize="16px"
              letterSpacing="-0.3px"
              sx={{ cursor: "pointer !important" }}
            >
              {selectedGenre ? selectedGenre.name : "Genres"}
            </MenuButton>
            <GenreList
              onSelectGenre={handleGenreSelect}
              selectedGenre={selectedGenre}
            />
          </Menu>
        </HStack>
        <HStack spacing={4}>
          <SearchInput
            ref={searchInputRef}
            onSearch={onSearch}
            resetQuery={resetQuery}
          />
          <ColorModeSwitch />
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
