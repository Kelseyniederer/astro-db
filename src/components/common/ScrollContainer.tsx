import {
  Box,
  BoxProps,
  HStack,
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
    const [showLeftBlur, setShowLeftBlur] = useState(false);
    const [showRightBlur, setShowRightBlur] = useState(true);
    const { colorMode } = useColorMode();

    const gradientStart = useColorModeValue(
      "rgba(255, 255, 255, 0.5)",
      "rgba(26, 32, 44, 0.9)"
    );

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      const scrollLeft = target.scrollLeft;
      const scrollWidth = target.scrollWidth;
      const clientWidth = target.clientWidth;

      console.log(
        `Scroll position: ${scrollLeft}/${scrollWidth - clientWidth}`
      );

      // Only show left blur if we've scrolled right
      const shouldShowLeft = scrollLeft > 5;
      // Only show right blur if we haven't scrolled all the way right
      const shouldShowRight =
        Math.ceil(scrollLeft) < scrollWidth - clientWidth - 5;

      console.log(
        `Should show left: ${shouldShowLeft}, right: ${shouldShowRight}`
      );

      setShowLeftBlur(shouldShowLeft);
      setShowRightBlur(shouldShowRight);
    };

    // Initial check on mount
    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (scrollContainer) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        setShowRightBlur(scrollLeft < scrollWidth - clientWidth - 5);
      }
    }, []);

    return (
      <Box position="relative" width="100%" overflow="hidden" {...props}>
        {showLeftBlur && (
          <Box
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            width="60px"
            zIndex={2}
            pointerEvents="none"
            background={`linear-gradient(to right, ${gradientStart}, transparent)`}
            transition="opacity 0.2s"
          />
        )}

        {showRightBlur && (
          <Box
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            width="60px"
            zIndex={2}
            pointerEvents="none"
            background={`linear-gradient(to left, ${gradientStart}, transparent)`}
            transition="opacity 0.2s"
          />
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
      </Box>
    );
  }
);

ScrollContainer.displayName = "ScrollContainer";

export default ScrollContainer;
