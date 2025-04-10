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
      spacing={8}
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
        <Box
          key={index}
          minW={{ base: "120px", md: "160px" }}
          maxW={{ base: "120px", md: "160px" }}
        >
          <Card variant="elevated" overflow="hidden">
            <Box
              position="relative"
              bg="gray.700"
              aspectRatio="2/3"
              width="100%"
            >
              <Skeleton height="100%" width="100%" />
            </Box>
            <CardBody py={2}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
              >
                <SkeletonText noOfLines={1} width="80%" />
                <Skeleton height="20px" width="60px" />
              </Box>
            </CardBody>
          </Card>
        </Box>
      ))}
    </HStack>
  );
};

export default TrendingPeopleSkeleton;
