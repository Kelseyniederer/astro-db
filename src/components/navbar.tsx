import { Box, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
import Logo from "./Logo";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
  resetQuery: () => void;
}

const NavBar = ({ onSearch, resetQuery }: Props) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      bg="gray.800"
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)"
      _light={{
        bg: "white",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <HStack
        padding={4}
        maxW="container.xl"
        margin="0 auto"
        gap={4}
        justify="space-between"
      >
        <Link to="/">
          <Logo resetQuery={resetQuery} />
        </Link>
        <SearchInput onSearch={onSearch} resetQuery={resetQuery} />
        <ColorModeSwitch />
      </HStack>
    </Box>
  );
};

export default NavBar;
