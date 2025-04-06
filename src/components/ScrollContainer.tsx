import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface ScrollContainerProps {
  children: React.ReactNode;
}

export const ScrollContainer = ({ children }: ScrollContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const showArrows = useBreakpointValue({ base: false, md: true });

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Box
      position="relative"
      width="100%"
      pr={12}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {showArrows && showLeftArrow && (
        <IconButton
          aria-label="Scroll left"
          icon={<ChevronLeftIcon boxSize={4} />}
          position="absolute"
          left={-2}
          top="-2px"
          zIndex={2}
          onClick={() => scroll("left")}
          size="sm"
          variant="ghost"
          color="gray.400"
          opacity={isHovering ? 1 : 0}
          transition="opacity 0.2s"
          _hover={{ bg: "transparent", color: "white" }}
        />
      )}
      <Box
        position="absolute"
        left={0}
        top={0}
        bottom={0}
        width="60px"
        pointerEvents="none"
        zIndex={1}
        opacity={showLeftArrow && isHovering ? 1 : 0}
        transition="opacity 0.2s"
        bg="linear-gradient(to right, rgba(26, 32, 44, 1), rgba(26, 32, 44, 0.8), transparent)"
      />
      <Box
        position="absolute"
        right={12}
        top={0}
        bottom={0}
        width="60px"
        pointerEvents="none"
        zIndex={1}
        opacity={showRightArrow && isHovering ? 1 : 0}
        transition="opacity 0.2s"
        bg="linear-gradient(to left, rgba(26, 32, 44, 1), rgba(26, 32, 44, 0.8), transparent)"
      />
      <Box
        ref={scrollRef}
        overflowX="auto"
        width="100%"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
        onScroll={checkScroll}
      >
        {children}
      </Box>
      {showArrows && showRightArrow && (
        <IconButton
          aria-label="Scroll right"
          icon={<ChevronRightIcon boxSize={4} />}
          position="absolute"
          right={2}
          top="-2px"
          zIndex={2}
          onClick={() => scroll("right")}
          size="sm"
          variant="ghost"
          color="gray.400"
          opacity={isHovering ? 1 : 0}
          transition="opacity 0.2s"
          _hover={{ bg: "transparent", color: "white" }}
        />
      )}
    </Box>
  );
};
