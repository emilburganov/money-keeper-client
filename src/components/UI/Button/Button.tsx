import {Button as ChakraButton} from "@chakra-ui/react";
import {ReactNode} from "react";

interface ButtonProps {
    children: ReactNode;

    [props: string]: any;
}

const Button = ({children, ...props}: ButtonProps) => {
    return (
        <ChakraButton
            size="md"
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