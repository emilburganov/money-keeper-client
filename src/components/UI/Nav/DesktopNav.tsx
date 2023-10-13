import {useStores} from "@/hooks/useStores";
import {Box, Popover, PopoverTrigger, Stack, useColorModeValue} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";

export interface NavItem {
    label: string;
    href?: string;
}

export const PUBLIC_NAV_ITEMS: Array<NavItem> = [
    {
        label: "Home",
        href: "/",
    },
];

export const PRIVATE_NAV_ITEMS: Array<NavItem> = [
    {
        label: "Profile",
        href: "/profile",
    },
];

const DesktopNav = observer(() => {
    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");
    const {authStore} = useStores();

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