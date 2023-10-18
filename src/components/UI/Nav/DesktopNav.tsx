import {useStores} from "@/hooks/useStores";
import {Box, Popover, PopoverTrigger, Stack, useColorModeValue} from "@chakra-ui/react";
import i18n from "i18next";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export interface NavItem {
    label: string;
    href?: string;
}

const DesktopNav = observer(() => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");
    const {t} = useTranslation();
    const {authStore} = useStores();

    const PRIVATE_NAV_ITEMS: Array<NavItem> = [
        {
            label: t("header.navigation.profile"),
            href: "/profile",
        },
        {
            label: t("header.navigation.categories"),
            href: "/categories",
        },
    ];

    const PUBLIC_NAV_ITEMS: Array<NavItem> = [
        {
            label: t("header.navigation.home"),
            href: "/",
        },
    ];

    return (
        <Stack direction={"row"} spacing={4}>
            {PUBLIC_NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <Box
                                as={Link}
                                to={navItem.href}
                                p={2}
                                href={navItem.href ?? "#"}
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
            ))}
            {authStore.isAuth && PRIVATE_NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <Box
                                as={Link}
                                to={navItem.href}
                                p={2}
                                href={navItem.href ?? "#"}
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
            ))}
        </Stack>
    );
});

export default DesktopNav;