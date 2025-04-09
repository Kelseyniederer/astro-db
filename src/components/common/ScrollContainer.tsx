import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
  HStack,
  IconButton,
  useColorMode,
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
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const { colorMode } = useColorMode();

    const arrowBg = useColorModeValue("white", "gray.800");
    const arrowColor = useColorModeValue("gray.800", "white");
    const arrowHoverBg = useColorModeValue("gray.100", "gray.700");
    const gradientStart = useColorModeValue(
      "rgba(255, 255, 255, 0.95)",
      "rgba(26, 32, 44, 0.95)"
    );

    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 5);
        setShowRightArrow(
          Math.ceil(scrollLeft) < scrollWidth - clientWidth - 5
        );
      }
    };

    const scroll = (direction: "left" | "right") => {
      if (scrollRef.current) {
        const scrollAmount = 300;
        scrollRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    };

    // Initial check on mount
    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
      }
    }, []);

    return (
      <Box position="relative" width="100%" overflow="hidden" {...props}>
        {showLeftArrow && (
          <>
            <Box
              position="absolute"
              left={0}
              top={0}
              bottom={0}
              width="120px"
              zIndex={1}
              pointerEvents="none"
              background={`linear-gradient(to right, ${gradientStart}, transparent)`}
              transition="opacity 0.2s"
            />
            <IconButton
              aria-label="Scroll left"
              icon={<ChevronLeftIcon boxSize={6} />}
              position="absolute"
              left={4}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              rounded="full"
              bg={arrowBg}
              color={arrowColor}
              _hover={{ bg: arrowHoverBg }}
              onClick={() => scroll("left")}
              size="sm"
              boxShadow="lg"
            />
          </>
        )}

        <HStack
          ref={scrollRef}
          spacing={0}
          overflowX="auto"
          py={4}
          px={6}
          alignItems="stretch"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            display: "flex",
            flexWrap: "nowrap",
          }}
          onScroll={handleScroll}
        >
          {children}
        </HStack>

        {showRightArrow && (
          <>
            <Box
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              width="120px"
              zIndex={1}
              pointerEvents="none"
              background={`linear-gradient(to left, ${gradientStart}, transparent)`}
              transition="opacity 0.2s"
            />
            <IconButton
              aria-label="Scroll right"
              icon={<ChevronRightIcon boxSize={6} />}
              position="absolute"
              right={4}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              rounded="full"
              bg={arrowBg}
              color={arrowColor}
              _hover={{ bg: arrowHoverBg }}
              onClick={() => scroll("right")}
              size="sm"
              boxShadow="lg"
            />
          </>
        )}
      </Box>
    );
  }
);

ScrollContainer.displayName = "ScrollContainer";

export default ScrollContainer;
