import { Container, Spinner as ChakraSpinner, Stack } from "@chakra-ui/react";

export const Spinner = () => {
	return (
		<Container maxW={"container.xl"} minH={"100vh"}>
			<Stack justify={"center"} align={"center"} minH={"100vh"}>
				<ChakraSpinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="green.500"
					size="xl"
				/>
			</Stack>
		</Container>
	);
};
