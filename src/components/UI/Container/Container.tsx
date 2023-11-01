import {Box, Container as ChakraContainer, useColorModeValue} from "@chakra-ui/react";
import {FC} from "react";

interface ContainerProps {
    [props: string]: any;
}

const Container: FC<ContainerProps> = ({children, ...props}) => {
    return (
        <Box
            w={"full"}
            bg={useColorModeValue("gray.50", "gray.800")}
            py={4}
        >
            <ChakraContainer
                maxW={"container.xl"}
                minH={"100vh"}
                {...props}
            >
                {children}
            </ChakraContainer>
        </Box>
    );
};

export default Container;