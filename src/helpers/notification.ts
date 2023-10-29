import {createStandaloneToast} from "@chakra-ui/react";

const {toast} = createStandaloneToast();

export const notification = (title: string, description: string, success = true) => {
    toast({
        title: title,
        description: description,
        status: success ? "success" : "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
    });
};