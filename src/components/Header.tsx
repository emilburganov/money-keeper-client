import Button from "@/components/UI/Button/Button";
import LinkButton from "@/components/UI/Button/LinkButton";
import ThemeButton from "@/components/UI/Button/ThemeButton";
import Logo from "@/components/UI/Logo/Logo";
import DesktopNav from "@/components/UI/Nav/DesktopNav";
import MobileNav from "@/components/UI/Nav/MobileNav";
import LanguageSwitch from "@/components/UI/Switch/LanguageSwitch";
import useStores from "@/hooks/useStores";
import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons";
import {Box, Collapse, Flex, Hide, IconButton, Stack, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";

const Header = observer(() => {
    const {isOpen, onToggle} = useDisclosure();
    const {authStore} = useStores();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const logout = async () => {
        await authStore.logout();
        navigate("/login");
    };

    return (
        <Box
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.900")}
        >
            <Flex
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                py={{base: 4, md: 2}}
                px={{base: 4}}
                align={"center"}
                justify={"space-between"}
                maxW={"container.xl"}
                margin={"auto"}
            >
                <Flex
                    ml={{base: -2}}
                    display={{base: "flex", md: "none"}}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3}/> : <HamburgerIcon w={5} h={5}/>}
                        variant={"ghost"}
                        aria-label={"Toggle Navigation"}
                    />
                </Flex>
                <Flex
                    align={"center"}
                    justify={{base: "center", md: "start"}}
                >
                    <Logo/>
                    <Flex display={{base: "none", md: "flex"}} ml={10}>
                        <DesktopNav/>
                    </Flex>
                </Flex>
                <Stack
                    as={Flex}
                    justify={"flex-end"}
                    align={"center"}
                    direction={"row"}
                    spacing={3}
                >
                    {authStore.isAuth ?
                        <Button
                            onClick={logout}
                            fontSize={"sm"}
                            size={"md"}
                            display={{base: "none", md: "flex"}}
                        >
                            {t("header.buttons.auth.logout")}
                        </Button>
                        :
                        <>
                            <LinkButton
                                as={Link}
                                to="/login"
                                display={{base: "none", md: "flex"}}
                            >
                                {t("header.buttons.auth.login")}
                            </LinkButton>
                            <Button
                                as={Link}
                                to="/registration"
                                fontSize={"sm"}
                                size={"md"}
                                display={{base: "none", md: "flex"}}
                            >
                                {t("header.buttons.auth.registration")}
                            </Button>
                        </>
                    }
                    <Hide below="sm">
                        <ThemeButton/>
                    </Hide>
                    <LanguageSwitch/>
                </Stack>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav onToggle={onToggle}/>
            </Collapse>
        </Box>
    );
});

export default Header;