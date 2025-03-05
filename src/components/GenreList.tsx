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
      <Heading as="h2" paddingBottom={1}>
        Genres
      </Heading>
      <List.Root listStyleType={"none"}>
        {movieGenres.map((genre: Genre) => (
          <ListItem key={genre.id} paddingY="5px">
            <HStack>
              {genre.icon && (
                <Icon
                  as={genre.icon}
                  boxSize={6}
                  color={
                    genre.id === selectedGenre?.id
                      ? "white" // ✅ Highlight selected genre
                      : "gray.500"
                  }
                />
              )}
              <Button
                variant="ghost"
                onClick={() => onSelectGenre(genre)}
                fontSize="lg"
                paddingX={2}
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
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
