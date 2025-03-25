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
      setShowLeftBlur(target.scrollLeft > 20);
      setShowRightBlur(
        target.scrollLeft < target.scrollWidth - target.clientWidth - 20
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
      <Box
        position="relative"
        maxW={fullWidth ? "100%" : "calc(100vw - 240px)"}
        ml={fullWidth ? 0 : "-6"}
        {...props}
      >
        {/* Left blur gradient */}
        {showLeftBlur && (
          <Box
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            width="60px"
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
            width="60px"
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
          pl={6}
          pr={6}
          alignItems="stretch"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            display: "flex",
            flexWrap: "nowrap",
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
