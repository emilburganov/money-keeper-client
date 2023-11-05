import {createStandaloneToast} from "@chakra-ui/react";

const {toast} = createStandaloneToast();

export const sendSuccessNotification = (title: string, description: string) => {
    toast({
        title: title,
        description: description,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
    });
};