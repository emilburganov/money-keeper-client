import {Button as ChakraButton}  from "@chakra-ui/button";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

const HideButton = ({show, setShow}) => {
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