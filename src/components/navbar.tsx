import { HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch";
import Logo from "./Logo";
import SearchInput from "./SearchInput";

const NavBar = () => {
  return (
    <HStack padding="10px">
      <Link to="/">
        <Logo
          resetQuery={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Link>
      <SearchInput
        onSearch={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Link
        to="/natal-chart"
        style={{ marginLeft: "auto", marginRight: "20px" }}
      >
        Natal Chart
      </Link>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
