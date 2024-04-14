import { Button as ChakraButton } from "@chakra-ui/react";
import { ReactNode } from "react";

interface LinkButtonProps {
	children: ReactNode;

	[props: string]: unknown;
}

export const LinkButton = ({ children, ...props }: LinkButtonProps) => {
	return (
		<ChakraButton fontSize="sm" colorScheme="green" variant="link" {...props}>
			{children}
		</ChakraButton>
	);
};
