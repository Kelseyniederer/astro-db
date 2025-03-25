import {
  Button,
  Heading,
  HStack,
  Icon,
  List,
  ListItem,
} from "@chakra-ui/react";
import movieGenres from "../data/genres";
import { Genre } from "../hooks/useGenres";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  return (
    <>
      <Heading as="h2" paddingBottom={1} fontSize="lg">
        Genres
      </Heading>
      <List spacing={0.5}>
        {movieGenres.map((genre: Genre) => (
          <ListItem key={genre.id}>
            <HStack spacing={2}>
              {genre.icon && (
                <Icon
                  as={genre.icon}
                  boxSize={4}
                  color={
                    genre.id === selectedGenre?.id ? "blue.500" : "gray.500"
                  }
                />
              )}
              <Button
                width="full"
                justifyContent="flex-start"
                variant="ghost"
                onClick={() => onSelectGenre(genre)}
                fontSize="sm"
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                color={genre.id === selectedGenre?.id ? "blue.500" : undefined}
                height="32px"
                padding={2}
                _hover={{
                  color: "blue.400",
                  bg: "whiteAlpha.100",
                  _light: { bg: "blackAlpha.50" },
                }}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
