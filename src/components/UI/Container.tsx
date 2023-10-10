import {Box, Container as ChakraContainer, useColorModeValue} from "@chakra-ui/react";
import {FC} from "react";

const Container: FC = ({children}) => {
    return (
        <Box w={"full"} bg={useColorModeValue("gray.50", "gray.800")}>
            <ChakraContainer
                maxW={"container.xl"}
                minH={"100vh"}
            >
                {children}
            </ChakraContainer>
        </Box>
    );
};

export default Container;