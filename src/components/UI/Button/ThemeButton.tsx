import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {Button as ChakraButton, useColorMode} from "@chakra-ui/react";

const ThemeButton = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <ChakraButton onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon/> : <SunIcon/>}
        </ChakraButton>
    );
};

export default ThemeButton;