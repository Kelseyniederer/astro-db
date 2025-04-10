import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { RefObject } from "react";
import { TbMovie } from "react-icons/tb";
import movieGenres from "../data/genres";
import ColorModeSwitch from "./ColorModeSwitch";
import Logo from "./Logo";
import SearchInput, { SearchInputHandle } from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
  resetQuery: () => void;
  onSelectGenre?: (genreId: number) => void;
  searchInputRef: RefObject<SearchInputHandle>;
}

const NavBar = ({
  onSearch,
  resetQuery,
  onSelectGenre,
  searchInputRef,
}: Props) => {
  const textColor = useColorModeValue("gray.800", "gray.200");
  const menuHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const menuBg = useColorModeValue("white", "gray.700");

  const handleGenreSelect = (genreId: number) => {
    if (searchInputRef.current) {
      searchInputRef.current.clearInput();
    }
    onSelectGenre?.(genreId);
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
              color={textColor}
              _hover={{ bg: menuHoverBg }}
              fontWeight="normal"
              fontSize="16px"
              letterSpacing="-0.3px"
              sx={{ cursor: "pointer !important" }}
            >
              Genres
            </MenuButton>
            <MenuList maxH="400px" overflowY="auto" bg={menuBg}>
              {movieGenres.map((genre) => (
                <MenuItem
                  key={genre.id}
                  onClick={() => handleGenreSelect(genre.id)}
                  _hover={{ bg: menuHoverBg }}
                  color={textColor}
                  fontSize="16px"
                  fontWeight="normal"
                  letterSpacing="-0.3px"
                  sx={{ cursor: "pointer !important" }}
                >
                  {genre.name}
                </MenuItem>
              ))}
            </MenuList>
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
