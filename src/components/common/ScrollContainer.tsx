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

    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
      }
    }, []);

    return (
      <Box position="relative" width="100%" overflow="hidden" {...props}>
        <HStack
          ref={scrollRef}
          spacing={0}
          overflowX="auto"
          py={4}
          px={{ base: 1, md: 4 }}
          alignItems="stretch"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            width: "100%",
            gap: { base: "0.5rem", md: "1rem" },
          }}
          onScroll={handleScroll}
        >
          {children}
        </HStack>

        {/* Navigation Controls */}
        {showLeftArrow && (
          <Box
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            width={{ base: "40px", md: "120px" }}
            display="flex"
            alignItems="center"
            paddingLeft={{ base: 1, md: 4 }}
            background={`linear-gradient(to right, ${gradientStart}, transparent)`}
            zIndex={2}
          >
            <IconButton
              aria-label="Scroll left"
              icon={<ChevronLeftIcon boxSize={6} />}
              onClick={() => scroll("left")}
              rounded="full"
              backgroundColor={arrowBg}
              color={arrowColor}
              _hover={{ bg: arrowHoverBg }}
              size="sm"
              boxShadow="lg"
              position="relative"
              zIndex={3}
            />
          </Box>
        )}

        {showRightArrow && (
          <Box
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            width={{ base: "40px", md: "120px" }}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            paddingRight={{ base: 1, md: 4 }}
            background={`linear-gradient(to left, ${gradientStart}, transparent)`}
            zIndex={2}
          >
            <IconButton
              aria-label="Scroll right"
              icon={<ChevronRightIcon boxSize={6} />}
              onClick={() => scroll("right")}
              rounded="full"
              backgroundColor={arrowBg}
              color={arrowColor}
              _hover={{ bg: arrowHoverBg }}
              size="sm"
              boxShadow="lg"
              position="relative"
              zIndex={3}
            />
          </Box>
        )}
      </Box>
    );
  }
);

ScrollContainer.displayName = "ScrollContainer";

export default ScrollContainer;
