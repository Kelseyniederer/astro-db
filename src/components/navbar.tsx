import { HStack, Spacer } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import Logo from "./Logo";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
  resetQuery: () => void;
}

const NavBar = ({ onSearch, resetQuery }: Props) => {
  return (
    <HStack padding="15px" gap={6} alignItems="center">
      <Logo resetQuery={resetQuery}></Logo>
      <Spacer />
      <SearchInput onSearch={onSearch} />
      <Spacer />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
