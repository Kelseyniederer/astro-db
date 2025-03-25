import { useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import ColorModeSwitch from "./ColorModeSwitch";
import Logo from "./Logo";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchText: string) => void;
  resetQuery: () => void;
}

const NavBar = ({ onSearch, resetQuery }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <nav
      className={`${styles.navbar} ${
        colorMode === "light" ? styles.light : ""
      }`}
    >
      <div className={styles.content}>
        <Link
          to="/"
          className={styles.logoLink}
          style={{ margin: 0, padding: 0 }}
        >
          <Logo resetQuery={resetQuery} />
        </Link>
        <div className={styles.searchContainer}>
          <SearchInput onSearch={onSearch} resetQuery={resetQuery} />
        </div>
        <div className={styles.colorModeContainer}>
          <ColorModeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
