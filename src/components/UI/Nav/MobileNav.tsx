import {NavItem} from "@/components/UI/Nav/DesktopNav";
import MobileNavItem from "@/components/UI/Nav/MobileNavItem";
import useStores from "@/hooks/useStores";
import {Stack, useColorModeValue} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

interface MobileNavProps {
    onToggle: () => void;
}

const MobileNav: FC<MobileNavProps> = observer(({onToggle}) => {
    const {t} = useTranslation();
    const {authStore} = useStores();
    const navigate = useNavigate();

    const logout = async (): Promise<void> => {
        await authStore.logout();
        navigate("/login");
    };

    const PRIVATE_NAV_ITEMS: NavItem[] = [
        {
            label: t("header.navigation.profile"),
            to: "/profile",
        },
        {
            label: t("header.navigation.categories"),
            to: "/categories",
        },
    ];

    const PUBLIC_NAV_ITEMS: NavItem[] = [
        {
            label: t("header.navigation.home"),
            to: "/",
        },
    ];

    return (
        <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{md: "none"}}>
            {PUBLIC_NAV_ITEMS.map((navItem) => (
                <MobileNavItem
                    key={navItem.label}
                    to={navItem.to}
                    onToggle={onToggle}
                    label={navItem.label}
                />
            ))}
            {authStore.isAuth && PRIVATE_NAV_ITEMS.map((navItem) => (
                <MobileNavItem
                    key={navItem.label}
                    to={navItem.to}
                    onToggle={onToggle}
                    label={navItem.label}
                />
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
                        to="/login"
                    />
                    <MobileNavItem
                        onToggle={onToggle}
                        label={t("header.buttons.auth.registration")}
                        to="/registration"
                    />
                </>
            }
        </Stack>
    );
});

export default MobileNav;