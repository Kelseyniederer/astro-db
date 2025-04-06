import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface ScrollContainerProps {
  children: React.ReactNode;
}

export const ScrollContainer = ({ children }: ScrollContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
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
    <Flex position="relative" width="100%" mx={8}>
      {showArrows && showLeftArrow && (
        <IconButton
          aria-label="Scroll left"
          icon={<ChevronLeftIcon boxSize={4} />}
          position="absolute"
          left={-8}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          onClick={() => scroll("left")}
          size="sm"
          variant="ghost"
          color="gray.400"
          _hover={{ bg: "transparent", color: "white" }}
        />
      )}
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
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "30px",
          background:
            "linear-gradient(to right, rgba(26, 32, 44, 0.9), transparent)",
          pointerEvents: "none",
          opacity: showLeftArrow ? 1 : 0,
          transition: "opacity 0.2s",
          zIndex: 1,
        }}
        _after={{
          content: '""',
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "30px",
          background:
            "linear-gradient(to left, rgba(26, 32, 44, 0.9), transparent)",
          pointerEvents: "none",
          opacity: showRightArrow ? 1 : 0,
          transition: "opacity 0.2s",
          zIndex: 1,
        }}
      >
        {children}
      </Box>
      {showArrows && showRightArrow && (
        <IconButton
          aria-label="Scroll right"
          icon={<ChevronRightIcon boxSize={4} />}
          position="absolute"
          right={-8}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          onClick={() => scroll("right")}
          size="sm"
          variant="ghost"
          color="gray.400"
          _hover={{ bg: "transparent", color: "white" }}
        />
      )}
    </Flex>
  );
};
