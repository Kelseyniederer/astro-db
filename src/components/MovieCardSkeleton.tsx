import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

const MovieCardSkeleton = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const card = cardRef.current;
      Array.from(card.children).forEach((child, index) => {
        // Log grandchildren (skeleton elements)
        Array.from(child.children).forEach((grandchild, gIndex) => {});
      });
    }
  }, []);

  return (
    <Box
      cursor="pointer"
      position="relative"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform 0.15s ease-in",
      }}
    >
      <Box
        overflow="hidden"
        aspectRatio="2/3"
        width="100%"
        position="relative"
        borderRadius="md"
      >
        <Skeleton height="100%" width="100%" />
      </Box>
      <Box mt={2} textAlign="center">
        <SkeletonText noOfLines={1} width="80%" margin="0 auto" />
      </Box>
    </Box>
  );
};

export default MovieCardSkeleton;
