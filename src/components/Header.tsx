import Button from "@/components/UI/Button/Button";
import LinkButton from "@/components/UI/Button/LinkButton";
import ThemeButton from "@/components/UI/Button/ThemeButton";
import Logo from "@/components/UI/Logo/Logo";
import DesktopNav from "@/components/UI/Nav/DesktopNav";
import MobileNav from "@/components/UI/Nav/MobileNav";
import {useStores} from "@/hooks/useStores";
import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons";
import {Box, Collapse, Flex, IconButton, Stack, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";


const Header = observer(() => {
    const {isOpen, onToggle} = useDisclosure();
    const {authStore} = useStores();
    const navigate = useNavigate();

    const logout = async () => {
        await authStore.logout();
        navigate("/profile");
    };

    return (
        <Box>
            <Flex
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                py={{base: 2}}
                px={{base: 4}}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align={"center"}
            >
                <Flex
                    flex={{base: 1, md: "auto"}}
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
                    flex={{base: 1}}
                    align={"center"}
                    justify={{base: "end", md: "start"}}
                >
                    <Logo/>
                    <Flex display={{base: "none", md: "flex"}} ml={10}>
                        <DesktopNav/>
                    </Flex>
                </Flex>
                <Stack
                    flex={{base: 1, md: 0}}
                    justify={"flex-end"}
                    align={"center"}
                    direction={"row"}
                    spacing={6}
                    g={6}
                >
                    {authStore.isAuth ?
                        <Button
                            onClick={logout}
                            fontSize={"sm"}
                            size={"md"}
                            display={{base: "none", md: "flex"}}
                        >
                            Logout
                        </Button>
                        :
                        <>
                            <LinkButton
                                as={Link}
                                to="/login"
                                display={{base: "none", md: "flex"}}
                            >
                                Login
                            </LinkButton>
                            <Button
                                as={Link}
                                to="/register"
                                fontSize={"sm"}
                                size={"md"}
                                display={{base: "none", md: "flex"}}
                            >
                                Register
                            </Button>
                        </>
                    }
                    <ThemeButton/>
                </Stack>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <MobileNav/>
            </Collapse>
        </Box>
    );
});

export default Header;