import {NavItem} from "@/components/UI/Nav/DesktopNav";
import MobileNavItem from "@/components/UI/Nav/MobileNavItem";
import useStores from "@/hooks/useStores";
import {Stack, useColorModeValue} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const MobileNav = observer(({onToggle}: () => void) => {
    const {t} = useTranslation();
    const {authStore} = useStores();
    const navigate = useNavigate();

    const logout = async (): Promise<void> => {
        await authStore.logout();
        navigate("/login");
    };

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
        <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{md: "none"}}>
            {PUBLIC_NAV_ITEMS.map((navItem) => (
                <MobileNavItem onToggle={onToggle} key={navItem.label} {...navItem}/>
            ))}
            {authStore.isAuth && PRIVATE_NAV_ITEMS.map((navItem) => (
                <MobileNavItem onToggle={onToggle} key={navItem.label} {...navItem}/>
            ))}
            {authStore.isAuth ?
                <MobileNavItem
                    onToggle={onToggle}
                    onClick={logout}
                    label={t("header.buttons.auth.logout")}
                />
                :
                <>
                    <MobileNavItem
                        onToggle={onToggle}
                        label={t("header.buttons.auth.login")}
                        href="/login"
                    />
                    <MobileNavItem
                        onToggle={onToggle}
                        label={t("header.buttons.auth.registration")}
                        href="/registration"
                    />
                </>
            }
        </Stack>
    );
});

export default MobileNav;