import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const MovieCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="200px" />
      <CardBody>
        <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
      </CardBody>
    </Card>
  );
};

export default MovieCardSkeleton;
