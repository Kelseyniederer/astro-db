import {
  Button,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const SortSelector = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          Order by: Relevance <BsChevronDown />
        </Button>
      </MenuTrigger>
      <MenuContent width="max-content" position="absolute" zIndex="popover">
        <MenuItem value="1">Relevance</MenuItem>
        <MenuItem value="2">Date Added</MenuItem>
        <MenuItem value="3">Name</MenuItem>
        <MenuItem value="4">Release Date</MenuItem>
        <MenuItem value="5">Popularity</MenuItem>
        <MenuItem value="6">Average Rating</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default SortSelector;
