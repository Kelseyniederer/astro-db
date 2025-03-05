import { MovieQuery } from "@/App";
import { Heading } from "@chakra-ui/react";

interface Props {
  movieQuery: MovieQuery;
}
const MovieHeading = ({}: Props) => {
  const heading = "Movies";
  return (
    <Heading as="h1" marginY={1} marginX={31} fontSize={"3xl"}>
      {heading}
    </Heading>
  );
};

export default MovieHeading;
