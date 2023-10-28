import useStores from "@/hooks/useStores";
import {Box, Popover, PopoverTrigger, Stack, useColorModeValue} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import {Link, To} from "react-router-dom";

export interface NavItem {
    label: string;
    to?: To;
}

const DesktopNav = observer(() => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");
    const {t} = useTranslation();
    const {authStore} = useStores();

    const PRIVATE_NAV_ITEMS: Array<NavItem> = [
        {
            label: t("header.navigation.profile"),
            to: "/profile",
        },
        {
            label: t("header.navigation.categories"),
            to: "/categories",
        },
    ];

    const PUBLIC_NAV_ITEMS: Array<NavItem> = [
        {
            label: t("header.navigation.home"),
            to: "/",
        },
    ];

    return (
        <Stack direction={"row"} spacing={4}>
            {authStore.isAuth ?
                PRIVATE_NAV_ITEMS.map((navItem) => (
                    <Box key={navItem.label}>
                        <Popover trigger={"hover"} placement={"bottom-start"}>
                            <PopoverTrigger>
                                <Box
                                    as={Link}
                                    to={navItem.to}
                                    p={2}
                                    fontSize={"sm"}
                                    fontWeight={500}
                                    color={linkColor}
                                    _hover={{
                                        textDecoration: "none",
                                        color: linkHoverColor,
                                    }}
                                >
                                    {navItem.label}
                                </Box>
                            </PopoverTrigger>
                        </Popover>
                    </Box>
                ))
                :
                PUBLIC_NAV_ITEMS.map((navItem) => (
                    <Box key={navItem.label}>
                        <Popover trigger={"hover"} placement={"bottom-start"}>
                            <PopoverTrigger>
                                <Box
                                    as={Link}
                                    to={navItem.to}
                                    p={2}
                                    fontSize={"sm"}
                                    fontWeight={500}
                                    color={linkColor}
                                    _hover={{
                                        textDecoration: "none",
                                        color: linkHoverColor,
                                    }}
                                >
                                    {navItem.label}
                                </Box>
                            </PopoverTrigger>
                        </Popover>
                    </Box>
                ))
            }
        </Stack>
    );
});

export default DesktopNav;