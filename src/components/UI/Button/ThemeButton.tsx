import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {Button as ChakraButton, useColorMode} from "@chakra-ui/react";
import {FC} from "react";

const ThemeButton: FC = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <ChakraButton w={6} onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon/> : <SunIcon/>}
        </ChakraButton>
    );
};

export default ThemeButton;