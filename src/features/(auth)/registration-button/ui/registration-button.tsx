import {useAuthStore} from "@/entities/auth";
import {RegistrationCredentials} from "@/shared/api/auth";
import {Button} from "@/shared/ui/(button)/button";
import {observer} from "mobx-react-lite";
import {MouseEvent, useState} from "react";
import {UseFormHandleSubmit} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

interface RegistrationButtonProps {
    handleSubmit: UseFormHandleSubmit<RegistrationCredentials>;
}

export const RegistrationButton = observer(
    ({handleSubmit}: RegistrationButtonProps) => {
        const {t} = useTranslation();
        const {registration} = useAuthStore();
        const [isLoading, setLoading] = useState<boolean>(false);
        const navigate = useNavigate();

        const handleRegistration = async (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            setLoading(true);

            await handleSubmit(registration)();
            if (localStorage.getItem("token")) {
                navigate("/profile")
            }

            setLoading(false);
        };

        return (
            <Button
                fontSize="md"
                w="100%"
                onClick={handleRegistration}
                type="submit"
                size="lg"
                isLoading={isLoading}
            >
                {t("pages.registration.form.button")}
            </Button>
        );
    },
);
