import { Box, Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

const MovieCardSkeleton = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      const card = cardRef.current;
      const cardStyle = window.getComputedStyle(card);

      console.log("\n=== MovieCardSkeleton Component ===");
      console.log("Card dimensions:", {
        clientWidth: card.clientWidth,
        clientHeight: card.clientHeight,
        offsetWidth: card.offsetWidth,
        offsetHeight: card.offsetHeight,
        scrollWidth: card.scrollWidth,
        scrollHeight: card.scrollHeight,
      });
      console.log("Card computed style:", {
        display: cardStyle.display,
        position: cardStyle.position,
        height: cardStyle.height,
        minHeight: cardStyle.minHeight,
        maxHeight: cardStyle.maxHeight,
        width: cardStyle.width,
        minWidth: cardStyle.minWidth,
        maxWidth: cardStyle.maxWidth,
        margin: cardStyle.margin,
        padding: cardStyle.padding,
        boxSizing: cardStyle.boxSizing,
        overflow: cardStyle.overflow,
      });

      // Log all child elements
      Array.from(card.children).forEach((child, index) => {
        const childStyle = window.getComputedStyle(child);
        console.log(`Skeleton child ${index}:`, {
          tagName: child.tagName,
          className: child.className,
          display: childStyle.display,
          position: childStyle.position,
          height: childStyle.height,
          width: childStyle.width,
          margin: childStyle.margin,
          padding: childStyle.padding,
          boxSizing: childStyle.boxSizing,
          overflow: childStyle.overflow,
        });

        // Log grandchildren (skeleton elements)
        Array.from(child.children).forEach((grandchild, gIndex) => {
          const grandchildStyle = window.getComputedStyle(grandchild);
          console.log(`Skeleton grandchild ${index}-${gIndex}:`, {
            tagName: grandchild.tagName,
            className: grandchild.className,
            display: grandchildStyle.display,
            position: grandchildStyle.position,
            height: grandchildStyle.height,
            width: grandchildStyle.width,
            margin: grandchildStyle.margin,
            padding: grandchildStyle.padding,
            boxSizing: grandchildStyle.boxSizing,
            overflow: grandchildStyle.overflow,
          });
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
