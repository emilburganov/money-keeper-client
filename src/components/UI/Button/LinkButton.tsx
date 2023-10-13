import {Button as ChakraButton} from "@chakra-ui/react";
import {ReactNode} from "react";

interface ButtonProps {
    children: ReactNode,
    props?: any,
}

const Button = ({children, ...props}: ButtonProps) => {
    return (
        <ChakraButton
            fontSize={"sm"}
            variant={"link"}
            {...props}
        >
            {children}
        </ChakraButton>
    );
};

export default Button;