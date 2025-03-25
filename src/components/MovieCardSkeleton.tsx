import { Box, Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

const MovieCardSkeleton = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const card = cardRef.current;
      Array.from(card.children).forEach((child, index) => {
 

        // Log grandchildren (skeleton elements)
        Array.from(child.children).forEach((grandchild, gIndex) => {
   
       
        });
      });
    }
  }, []);

  return (
    <Card
      ref={cardRef}
      variant="elevated"
      overflow="hidden"
      height="264px"
      width="250px"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform 0.15s ease-in",
      }}
    >
      <Box position="relative" height="200px" bg="gray.700">
        <Skeleton height="100%" width="100%" />
      </Box>
      <CardBody height="64px" py={2}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
            height="24px"
          >
            <SkeletonText noOfLines={2} width="70%" />
            <Skeleton height="24px" width="40px" />
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default MovieCardSkeleton;
