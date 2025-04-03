import {
  Box,
  Heading,
  HeadingProps,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props extends HeadingProps {
  children: React.ReactNode;
  noMargin?: boolean;
}

const SectionHeading = ({ children, noMargin = false, ...props }: Props) => {
  return (
    <Box mb={noMargin ? 0 : 4}>
      <Heading
        size="md"
        fontWeight="semibold"
        color={useColorModeValue("gray.800", "white")}
        letterSpacing="-0.3px"
        fontSize="16px"
        {...props}
      >
        {children}
      </Heading>
    </Box>
  );
};

export default SectionHeading;
