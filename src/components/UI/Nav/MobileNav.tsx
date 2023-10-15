import {PRIVATE_NAV_ITEMS, PUBLIC_NAV_ITEMS} from "@/components/UI/Nav/DesktopNav";
import MobileNavItem from "@/components/UI/Nav/MobileNavItem";
import {useStores} from "@/hooks/useStores";
import {Stack, useColorModeValue} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const MobileNav = observer(({onToggle}: void) => {
    const {authStore} = useStores();
    const navigate = useNavigate();

    const logout = async (): Promise<void> => {
        await authStore.logout();
        navigate("/login");
    };

    return (
        <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{md: "none"}}>
            {PUBLIC_NAV_ITEMS.map((navItem) => (
                <MobileNavItem onToggle={onToggle} key={navItem.label} {...navItem}/>
            ))}
            {authStore.isAuth && PRIVATE_NAV_ITEMS.map((navItem) => (
                <MobileNavItem onToggle={onToggle} key={navItem.label} {...navItem}/>
            ))}
            {authStore.isAuth ?
                <MobileNavItem onToggle={onToggle} onClick={logout} label="Logout"/>
                :
                <>
                    <MobileNavItem onToggle={onToggle} label="Login" href="/login"/>
                    <MobileNavItem onToggle={onToggle} label="Register" href="/register"/>
                </>
            }
        </Stack>
    );
});

export default MobileNav;