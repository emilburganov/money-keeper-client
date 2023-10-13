import {Button as ChakraButton}  from "@chakra-ui/button";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

interface HideButtonProps {
    show: boolean,
    setShow: void,
}

const HideButton = ({show, setShow}: HideButtonProps) => {
    return (
        <ChakraButton
            onClick={() => setShow((show) => !show)}
            variant={'ghost'}
            _hover={{
                bg: 'transparent',
            }}
        >
            {show ? <ViewIcon/> : <ViewOffIcon/>}
        </ChakraButton>
    );
};

export default HideButton;