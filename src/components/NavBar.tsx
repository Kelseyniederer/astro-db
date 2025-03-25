import { useColorMode } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
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
  const navRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Log nav dimensions and styling
    if (navRef.current) {
      const navStyle = window.getComputedStyle(navRef.current);
      console.log("\n=== NavBar ===");
      console.log("Nav dimensions:", {
        width: navRef.current.offsetWidth,
        height: navRef.current.offsetHeight,
        clientWidth: navRef.current.clientWidth,
        clientHeight: navRef.current.clientHeight,
      });
      console.log("Nav computed style:", {
        padding: navStyle.padding,
        margin: navStyle.margin,
        position: navStyle.position,
        left: navStyle.left,
        right: navStyle.right,
      });
    }

    // Log content container dimensions and styling
    if (contentRef.current) {
      const contentStyle = window.getComputedStyle(contentRef.current);
      console.log("\n=== Content Container ===");
      console.log("Content dimensions:", {
        width: contentRef.current.offsetWidth,
        height: contentRef.current.offsetHeight,
      });
      console.log("Content computed style:", {
        padding: contentStyle.padding,
        margin: contentStyle.margin,
        display: contentStyle.display,
        justifyContent: contentStyle.justifyContent,
      });
    }

    // Log logo link dimensions and styling
    if (logoLinkRef.current) {
      const logoLinkStyle = window.getComputedStyle(logoLinkRef.current);
      console.log("\n=== Logo Link ===");
      console.log("Logo Link dimensions:", {
        width: logoLinkRef.current.offsetWidth,
        height: logoLinkRef.current.offsetHeight,
      });
      console.log("Logo Link computed style:", {
        padding: logoLinkStyle.padding,
        margin: logoLinkStyle.margin,
        display: logoLinkStyle.display,
      });
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className={`${styles.navbar} ${
        colorMode === "light" ? styles.light : ""
      }`}
    >
      <div ref={contentRef} className={styles.content}>
        <Link
          ref={logoLinkRef}
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
