import { Input } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { InputGroup } from "./ui/input-group";

const SearchInput = () => {
  return (
    <InputGroup flex="1" startElement={<BsSearch />}>
      <Input placeholder="Search games..." variant={"outline"}></Input>
    </InputGroup>
  );
};

export default SearchInput;
