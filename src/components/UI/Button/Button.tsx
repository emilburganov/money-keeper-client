import {Button as ChakraButton} from "@chakra-ui/react";

const Button = ({children, ...props}) => {
    return (
        <ChakraButton
            size="lg"
            bg={"green.400"}
            color={"white"}
            _hover={{
                bg: "green.500",
            }}
            {...props}
        >
            {children}
        </ChakraButton>
    );
};

export default Button;