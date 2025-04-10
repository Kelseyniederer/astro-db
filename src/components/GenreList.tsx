import { Icon, MenuItem, MenuList, useColorModeValue } from "@chakra-ui/react";
import movieGenres from "../data/genres";
import { Genre } from "../hooks/useGenres";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const menuHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const menuBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const activeColor = useColorModeValue("blue.500", "blue.300");

  return (
    <MenuList maxH="400px" overflowY="auto" bg={menuBg}>
      {movieGenres.map((genre) => (
        <MenuItem
          key={genre.id}
          onClick={() => onSelectGenre(genre)}
          _hover={{ bg: menuHoverBg }}
          color={genre.id === selectedGenre?.id ? activeColor : textColor}
          fontSize="16px"
          fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
          letterSpacing="-0.3px"
          sx={{ cursor: "pointer !important" }}
        >
          {genre.icon && (
            <Icon
              as={genre.icon}
              boxSize={4}
              mr={2}
              color={genre.id === selectedGenre?.id ? activeColor : "gray.500"}
            />
          )}
          {genre.name}
        </MenuItem>
      ))}
    </MenuList>
  );
};

export default GenreList;
