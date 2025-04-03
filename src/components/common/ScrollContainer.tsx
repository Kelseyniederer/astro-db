import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";

interface ScrollContainerProps extends BoxProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const ScrollContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(
  ({ children, fullWidth = false, ...props }, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftBlur, setShowLeftBlur] = useState(false);
    const [showRightBlur, setShowRightBlur] = useState(true);

    // Use theme-aware colors with stronger opacity
    const startColor = useColorModeValue(
      "rgba(255, 255, 255, 0.95)",
      "rgba(26, 32, 44, 0.95)"
    );
    const endColor = useColorModeValue(
      "rgba(255, 255, 255, 0)",
      "rgba(26, 32, 44, 0)"
    );

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      const { scrollLeft, scrollWidth, clientWidth } = target;

      setShowLeftBlur(scrollLeft > 0);
      setShowRightBlur(scrollLeft < scrollWidth - clientWidth - 5);
    };

    const scroll = (direction: "left" | "right") => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      const scrollAmount = scrollContainer.clientWidth * 0.75;
      const newScrollLeft =
        direction === "left"
          ? Math.max(0, scrollContainer.scrollLeft - scrollAmount)
          : Math.min(
              scrollContainer.scrollWidth - scrollContainer.clientWidth,
              scrollContainer.scrollLeft + scrollAmount
            );

      scrollContainer.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    };

    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        scrollContainer.addEventListener("scroll", handleScroll);
        handleScroll({ target: scrollContainer } as unknown as Event);
        return () =>
          scrollContainer.removeEventListener("scroll", handleScroll);
      }
    }, []);

    return (
      <Box position="relative" width="100%" overflow="hidden" {...props}>
        {/* Left blur gradient and button */}
        {showLeftBlur && (
          <>
            <Box
              position="absolute"
              left={0}
              top={0}
              bottom={0}
              width="60px"
              zIndex={2}
              pointerEvents="none"
              background={`linear-gradient(to right, ${startColor}, ${endColor})`}
            />
            <IconButton
              aria-label="Scroll left"
              icon={<ChevronLeftIcon boxSize={6} />}
              position="absolute"
              left={6}
              top="50%"
              transform="translateY(-50%)"
              zIndex={3}
              onClick={() => scroll("left")}
              rounded="full"
              size="sm"
              bg="blackAlpha.700"
              _hover={{ bg: "blackAlpha.800" }}
              _active={{ bg: "blackAlpha.900" }}
              color="white"
            />
          </>
        )}

        {/* Right blur gradient and button */}
        {showRightBlur && (
          <>
            <Box
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              width="60px"
              zIndex={2}
              pointerEvents="none"
              background={`linear-gradient(to left, ${startColor}, ${endColor})`}
            />
            <IconButton
              aria-label="Scroll right"
              icon={<ChevronRightIcon boxSize={6} />}
              position="absolute"
              right={6}
              top="50%"
              transform="translateY(-50%)"
              zIndex={3}
              onClick={() => scroll("right")}
              rounded="full"
              size="sm"
              bg="blackAlpha.700"
              _hover={{ bg: "blackAlpha.800" }}
              _active={{ bg: "blackAlpha.900" }}
              color="white"
            />
          </>
        )}

        {/* Scroll content */}
        <HStack
          ref={scrollRef}
          spacing={4}
          overflowX="auto"
          py={4}
          px={6} // Match the container padding
          alignItems="stretch"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            display: "flex",
            flexWrap: "nowrap",
          }}
          onScroll={(e) => handleScroll(e as unknown as Event)}
        >
          {children}
        </HStack>
      </Box>
    );
  }
);

ScrollContainer.displayName = "ScrollContainer";

export default ScrollContainer;
