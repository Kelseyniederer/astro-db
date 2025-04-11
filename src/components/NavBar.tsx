import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Hide,
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
      position="relative"
      zIndex={1}
      width="100%"
    >
      <Flex
        height="100%"
        justify="space-between"
        align="center"
        px={0}
        maxW="100%"
        mx="auto"
        position="relative"
      >
        {/* Left Section: Logo and Genre Menu */}
        <HStack
          spacing={{ base: 2, md: 6 }}
          height="100%"
          pl={{ base: 2, md: 4 }}
        >
          {/* Mobile Search Toggle */}
          <Hide above="md">
            <Box position="relative" width="100%" height="100%">
              <Flex
                alignItems="center"
                height="100%"
                opacity={isOpen ? 0 : 1}
                visibility={isOpen ? "hidden" : "visible"}
                transition="all 0.2s"
              >
                <Logo resetQuery={resetQuery} />
              </Flex>

              <Box
                position={isOpen ? "fixed" : "absolute"}
                top={0}
                left={0}
                right={0}
                height="60px"
                bg={useColorModeValue("white", "rgb(20, 24, 33)")}
                display="flex"
                alignItems="center"
                px={4}
                transform={isOpen ? "translateY(0)" : "translateY(-100%)"}
                opacity={isOpen ? 1 : 0}
                visibility={isOpen ? "visible" : "hidden"}
                transition="all 0.2s"
                zIndex={2}
              >
                <SearchInput
                  ref={searchInputRef}
                  onSearch={onSearch}
                  resetQuery={resetQuery}
                  autoFocus={isOpen}
                  onClose={onToggle}
                />
              </Box>
            </Box>
          </Hide>

          {/* Desktop/Tablet Navigation */}
          <Show above="md">
            <Box height="100%" display="flex" alignItems="center">
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
                fontSize={{ base: "sm", md: "md" }}
                letterSpacing="-0.3px"
                px={{ base: 2, md: 4 }}
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

        {/* Right Section: Search and Theme Switch */}
        <HStack
          spacing={{ base: 1, md: 3 }}
          height="100%"
          alignItems="center"
          pr={{ base: 2, md: 4 }}
        >
          <Hide above="md">
            <Box
              opacity={isOpen ? 0 : 1}
              transform={isOpen ? "scale(0)" : "scale(1)"}
              transition="all 0.2s"
              pointerEvents={isOpen ? "none" : "auto"}
            >
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                onClick={onToggle}
                variant="ghost"
          <Show above="md">
            <Box minW={{ md: "200px", lg: "300px" }}>
              <SearchInput
                ref={searchInputRef}
          <Show above="md">
            <Box minW={{ md: "200px", lg: "300px" }}>
              <SearchInput
                ref={searchInputRef}
                onSearch={onSearch}
                resetQuery={resetQuery}
              />
            </Box>
          </Show>
                onSearch={onSearch}
                resetQuery={resetQuery}
              />
            </Box>
          </Show>
};

export default NavBar;
