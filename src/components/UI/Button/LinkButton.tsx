import {Button as ChakraButton} from "@chakra-ui/react";
import {FC, ReactNode} from "react";

interface LinkButtonProps {
    children: ReactNode;

    [props: string]: any;
}

const LinkButton: FC<LinkButtonProps> = ({children, ...props}) => {
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

export default LinkButton;