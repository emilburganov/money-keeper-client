import {
  Container,
  Spinner as ChakraSpinner,
  Stack,
  useColorMode,
} from "@chakra-ui/react";

export const Spinner = () => {
  const { colorMode } = useColorMode();

  return (
    <Container maxW="container.xl" minH="100vh">
      <Stack justify="center" align="center" minH="100vh">
        <ChakraSpinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color={colorMode === "light" ? "green.500" : "green.200"}
          size="xl"
        />
      </Stack>
    </Container>
  );
};
