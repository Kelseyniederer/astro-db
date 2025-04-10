import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface ScrollContainerProps {
  children: React.ReactNode;
}

export const ScrollContainer = ({ children }: ScrollContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);
  const showArrows = useBreakpointValue({ base: false, md: true });

  // Use color mode aware styles
  const gradientColor = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(26, 32, 44, 0.95)"
  );
  const arrowColor = useColorModeValue("gray.600", "gray.400");
  const arrowHoverColor = useColorModeValue("gray.800", "white");
  const arrowHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const isAtStart = scrollLeft <= 5;
    const isAtEnd = Math.ceil(scrollLeft) >= scrollWidth - clientWidth - 5;

    setShowLeftGradient(!isAtStart);
    setShowRightGradient(!isAtEnd);
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
    <Flex position="relative" width="100%" mx={2}>
      {/* Outer container with fixed gradients */}
      <Box position="relative" width="100%" overflow="hidden">
        {/* Left gradient */}
        {showLeftGradient && (
          <Box
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            width="40px"
            pointerEvents="none"
            zIndex={10}
            bgGradient={`linear(to-r, ${gradientColor}, transparent)`}
            transition="opacity 0.2s"
          />
        )}

        {/* Right gradient */}
        {showRightGradient && (
          <Box
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            width="40px"
            pointerEvents="none"
            zIndex={10}
            bgGradient={`linear(to-l, ${gradientColor}, transparent)`}
            transition="opacity 0.2s"
          />
        )}

        {/* Scrollable content */}
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
      </Box>

      {/* Arrow buttons */}
      {showArrows && showLeftGradient && (
        <IconButton
          aria-label="Scroll left"
          icon={<ChevronLeftIcon boxSize={4} />}
          position="absolute"
          left={-8}
          top="50%"
          transform="translateY(-50%)"
          zIndex={11}
          onClick={() => scroll("left")}
          size="sm"
          variant="ghost"
          color={arrowColor}
          _hover={{ bg: arrowHoverBg, color: arrowHoverColor }}
          borderRadius="md"
        />
      )}
      {showArrows && showRightGradient && (
        <IconButton
          aria-label="Scroll right"
          icon={<ChevronRightIcon boxSize={4} />}
          position="absolute"
          right={-8}
          top="50%"
          transform="translateY(-50%)"
          zIndex={11}
          onClick={() => scroll("right")}
          size="sm"
          variant="ghost"
          color={arrowColor}
          _hover={{ bg: arrowHoverBg, color: arrowHoverColor }}
          borderRadius="md"
        />
      )}
    </Flex>
  );
};
