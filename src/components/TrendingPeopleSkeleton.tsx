import {
  Box,
  Card,
  CardBody,
  HStack,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const TrendingPeopleSkeleton = () => {
  // Create an array of 10 skeleton items
  const skeletons = Array(10).fill(null);

  return (
    <HStack
      spacing={4}
      overflowX="auto"
      py={4}
      px={2}
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
      {skeletons.map((_, index) => (
        <Card
          key={index}
          variant="elevated"
          overflow="hidden"
          height="290px"
          width="140px"
          _hover={{
            transform: "scale(1.05)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          <Box position="relative" height="210px" bg="gray.700">
            <Skeleton height="100%" width="100%" />
          </Box>
          <CardBody height="80px" py={2}>
            <Box display="flex" flexDirection="column" gap={2}>
              <SkeletonText noOfLines={2} spacing={2} />
            </Box>
          </CardBody>
        </Card>
      ))}
    </HStack>
  );
};

export default TrendingPeopleSkeleton;
