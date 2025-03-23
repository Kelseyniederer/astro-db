import { Box, ChakraProvider, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import theme from "../theme";
import NavBar from "./NavBar";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <ChakraProvider theme={theme}>
      <NavBar onSearch={() => {}} resetQuery={() => {}} />
      <Box padding={5}>
        <Heading>Oops</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "An unexpected error occurred."}
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default ErrorPage;
