import {
	Box,
	Container as ChakraContainer,
	useColorMode,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ContainerProps {
	children: ReactNode;

	[props: string]: unknown;
}

export const Container = ({ children, ...props }: ContainerProps) => {
	const { colorMode } = useColorMode();

	return (
		<Box w={"full"} bg={colorMode === "light" ? "gray.50" : "gray.800"} py={4}>
			<ChakraContainer maxW={"container.xl"} minH={"100vh"} {...props}>
				{children}
			</ChakraContainer>
		</Box>
	);
};
