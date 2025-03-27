import { Box, BoxProps, HStack, useColorModeValue } from "@chakra-ui/react";
import { forwardRef, ReactNode, useEffect, useState } from "react";

interface ScrollContainerProps extends BoxProps {
  children: ReactNode;
  fullWidth?: boolean;
}

const ScrollContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(
  ({ children, fullWidth = false, ...props }, ref) => {
    const [showLeftBlur, setShowLeftBlur] = useState(false);
    const [showRightBlur, setShowRightBlur] = useState(true);
    const blurColor = useColorModeValue("white", "gray.800");

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      setShowLeftBlur(target.scrollLeft > 0);
      setShowRightBlur(
        target.scrollLeft < target.scrollWidth - target.clientWidth - 5
      );
    };

    useEffect(() => {
      const scrollContainer = (ref as React.RefObject<HTMLDivElement>)?.current;
      if (scrollContainer) {
        scrollContainer.addEventListener("scroll", handleScroll);
        // Check initial state
        handleScroll({ target: scrollContainer } as unknown as Event);
        return () =>
          scrollContainer.removeEventListener("scroll", handleScroll);
      }
    }, []);

    return (
      <Box position="relative" width="100%" overflow="hidden" {...props}>
        {/* Left blur gradient */}
        {showLeftBlur && (
          <Box
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            width="40px"
            zIndex={1}
            pointerEvents="none"
            bgGradient={`linear(to-r, ${blurColor} 0%, ${blurColor}90 30%, transparent 100%)`}
          />
        )}

        {/* Right blur gradient */}
        {showRightBlur && (
          <Box
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            width="40px"
            zIndex={1}
            pointerEvents="none"
            bgGradient={`linear(to-l, ${blurColor} 0%, ${blurColor}90 30%, transparent 100%)`}
          />
        )}

        {/* Scroll content */}
        <HStack
          ref={ref}
          spacing={4}
          overflowX="auto"
          py={4}
          alignItems="stretch"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            display: "flex",
            flexWrap: "nowrap",
            paddingInlineStart: "0",
            paddingInlineEnd: "40px",
          }}
        >
          {children}
        </HStack>
      </Box>
    );
  }
);

ScrollContainer.displayName = "ScrollContainer";

export default ScrollContainer;
