import {Button as ChakraButton} from "@chakra-ui/button";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {Dispatch, FC, SetStateAction} from "react";

interface HideButtonProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

const HideButton: FC<HideButtonProps> = ({show, setShow}) => {
    return (
        <ChakraButton
            onClick={() => setShow((show) => !show)}
            variant={"ghost"}
            _hover={{
                bg: "transparent",
            }}
        >
            {show ? <ViewIcon/> : <ViewOffIcon/>}
        </ChakraButton>
    );
};

export default HideButton;