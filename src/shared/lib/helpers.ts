import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const sendErrorNotification = (title: string, description?: string) => {
	toast({
		title: title,
		description: description ?? title,
		status: "error",
		duration: 5000,
		isClosable: true,
		position: "bottom-left",
	});
};

export const sendSuccessNotification = (title: string, description?: string) => {
	toast({
		title: title,
		description: description  ?? title,
		status: "success",
		duration: 5000,
		isClosable: true,
		position: "bottom-left",
	});
};
