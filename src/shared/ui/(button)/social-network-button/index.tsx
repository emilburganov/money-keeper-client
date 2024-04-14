import { chakra, useColorMode, VisuallyHidden } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SocialNetworkButtonProps {
	children: ReactNode;
	label: string;
	href: string;
}

export const SocialNetworkButton = ({
	children,
	label,
	href,
}: SocialNetworkButtonProps) => {
	const { colorMode } = useColorMode();

	return (
		<chakra.button
			bg={colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100"}
			rounded="full"
			w={8}
			h={8}
			cursor="pointer"
			as="a"
			href={href}
			display="inline-flex"
			alignItems="center"
			justifyContent="center"
			transition="background 0.3s ease"
			_hover={{
				bg: colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200",
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	);
};
