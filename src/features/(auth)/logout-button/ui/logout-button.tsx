import {useAuthStore} from "@/entities/auth";
import {Button} from "@/shared/ui/(button)/button";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

export const LogoutButton = () => {
    const {t} = useTranslation();
    const {logout} = useAuthStore();
    const [isLoading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);

        await logout();
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }

        setLoading(false);
    };

    return (
        <Button
            onClick={handleLogout}
            fontSize="sm"
            size="md"
            display={{base: "none", md: "flex"}}
            isLoading={isLoading}
        >
            {t("header.buttons.auth.logout")}
        </Button>
    );
};
