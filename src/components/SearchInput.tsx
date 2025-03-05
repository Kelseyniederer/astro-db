import { Input } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { InputGroup } from "./ui/input-group";

interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          onSearch(ref.current.value.trim()); // ✅ Trim extra spaces before search
        }
      }}
    >
      <InputGroup width={"100%"} flex="1" startElement={<BsSearch />}>
        <Input
          ref={ref}
          placeholder="Search movies or shows..."
          variant={"outline"}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
