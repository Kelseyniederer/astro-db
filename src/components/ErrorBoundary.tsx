import { Box, Heading, Text } from "@chakra-ui/react";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box p={5} textAlign="center">
          <Heading size="lg" mb={4} color="red.500">
            Something went wrong
          </Heading>
          <Text>
            {this.state.error?.message || "An unexpected error occurred"}
          </Text>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
