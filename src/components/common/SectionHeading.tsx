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
    <Box mb={noMargin ? 0 : 6}>
      <Heading
        size="lg"
        fontWeight="normal"
        color={useColorModeValue("gray.800", "white")}
        letterSpacing="-0.5px"
        fontSize="24px"
        {...props}
      >
        {children}
      </Heading>
    </Box>
  );
};

export default SectionHeading;
