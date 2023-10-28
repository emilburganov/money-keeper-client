import EnglishFlagIcon from "@/components/UI/Icon/EnglishFlagIcon";
import RussianFlagIcon from "@/components/UI/Icon/RussianFlagIcon";
import {
    Button,
    Flex,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const languagesIcons = {
    "ru": <RussianFlagIcon/>,
    "en": <EnglishFlagIcon/>,
};

const LanguageSwitch = () => {
    const {t, i18n} = useTranslation();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };

    return (
        <Flex justifyContent="center">
            <Popover placement="bottom" isLazy>
                {({onClose}) => (
                    <>
                        <PopoverTrigger>
                            <Flex
                                align={"center"}
                                justify={"center"}
                                w={"40px"}
                                h={"40px"}
                                cursor={"pointer"}
                                borderRadius={"10px"}
                            >
                                {languagesIcons[i18n.language]}
                            </Flex>
                        </PopoverTrigger>
                        <PopoverContent marginRight={4} w="fit-content" _focus={{boxShadow: "none"}}>
                            <PopoverArrow marginLeft={2}/>
                            <PopoverBody p={2}>
                                <Stack align={"baseline"} onClick={onClose}>
                                    <Button
                                        onClick={() => changeLanguage("ru")}
                                        color={useColorModeValue("gray.600", "gray.200")}
                                        display={"flex"}
                                        justifyContent={"start"}
                                        w={"full"}
                                        variant="ghost"
                                        gap={2}
                                        p={2}
                                        fontSize={"14px"}
                                    >
                                        <RussianFlagIcon/> {t("header.buttons.lang.ru")}
                                    </Button>
                                    <Button
                                        onClick={() => changeLanguage("en")}
                                        color={useColorModeValue("gray.600", "gray.200")}
                                        display={"flex"}
                                        justifyContent={"start"}
                                        w={"full"}
                                        variant="ghost"
                                        gap={2}
                                        p={2}
                                        fontSize={"14px"}
                                    >
                                        <EnglishFlagIcon/> {t("header.buttons.lang.en")}
                                    </Button>
                                </Stack>
                            </PopoverBody>
                        </PopoverContent>
                    </>
                )}
            </Popover>
        </Flex>
    );
};

export default LanguageSwitch;