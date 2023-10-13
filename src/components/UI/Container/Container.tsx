import {Box, Container as ChakraContainer, useColorModeValue} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface ContainerProps {
    children: ReactNode,
    props?: any,
}

const Container: FC = ({children, ...props}: ContainerProps) => {
    return (
        <Box
            w={"full"}
            bg={useColorModeValue("gray.50", "gray.800")}
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