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
      <Heading as="h2" paddingBottom={1} fontSize="2xl">
        Genres
      </Heading>
      <List.Root listStyleType="none">
        {movieGenres.map((genre: Genre) => (
          <ListItem key={genre.id} paddingY="5px">
            <HStack>
              {genre.icon && (
                <Icon
                  as={genre.icon}
                  boxSize={5}
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
                fontSize="md"
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                color={genre.id === selectedGenre?.id ? "blue.500" : undefined}
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
      </List.Root>
    </>
  );
};

export default GenreList;
