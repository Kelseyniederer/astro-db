import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  Show,
  useColorModeValue,
  useDisclosure,
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
  const menuBg = useColorModeValue("white", "rgb(20, 24, 33)");
  const activeColor = useColorModeValue("blue.500", "blue.300");
  const { isOpen, onToggle } = useDisclosure();

  const handleGenreSelect = (genre: Genre) => {
    if (searchInputRef.current) {
      searchInputRef.current.clearInput();
    }
    onSelectGenre?.(genre.id);
  };

  return (
    <Box
      height={{ base: "60px", md: "72px" }}
      bg={useColorModeValue("white", "rgb(20, 24, 33)")}
    >
      <Flex
        height="100%"
        justify="space-between"
        align="center"
        px={{ base: "0.5rem", md: "1rem" }}
      >
        <HStack spacing={{ base: 2, md: 4 }} flex={1} height="100%">
          <Show below="md">
            <Flex
              width="100%"
              transition="all 0.2s"
              alignItems="center"
              height="100%"
              position="relative"
            >
              <Box
                opacity={isOpen ? 0 : 1}
                transform={isOpen ? "translateX(-100%)" : "translateX(0)"}
                transition="all 0.2s"
                position="absolute"
                left={0}
                height="100%"
                display="flex"
                alignItems="center"
                fontSize={{ base: "xl", md: "2xl" }}
              >
                <Logo resetQuery={resetQuery} />
              </Box>
              <Box
                position="absolute"
                left={0}
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                transition="all 0.2s"
                transform={isOpen ? "translateX(0)" : "translateX(100%)"}
                opacity={isOpen ? 1 : 0}
              >
                {isOpen && (
                  <SearchInput
                    ref={searchInputRef}
                    onSearch={(text) => {
                      onSearch(text);
                      if (!text) onToggle();
                    }}
                    resetQuery={() => {
                      resetQuery();
                      onToggle();
                    }}
                  />
                )}
              </Box>
            </Flex>
          </Show>
          <Show above="md">
            <Box
              fontSize={{ base: "xl", md: "2xl" }}
              height="100%"
              display="flex"
              alignItems="center"
            >
              <Logo resetQuery={resetQuery} />
            </Box>
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
          </Show>
        </HStack>

        <HStack spacing={{ base: 1, md: 2 }} height="100%" alignItems="center">
          <Show above="md">
            <SearchInput
              ref={searchInputRef}
              onSearch={onSearch}
              resetQuery={resetQuery}
            />
          </Show>
          <Show below="md">
            <IconButton
              aria-label="Search"
              icon={<SearchIcon />}
              onClick={onToggle}
              variant="ghost"
              size="sm"
            />
          </Show>
          <ColorModeSwitch />
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
