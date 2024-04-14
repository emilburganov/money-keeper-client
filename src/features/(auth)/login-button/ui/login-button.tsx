import { useAuthStore } from "@/entities/auth";
import { LoginCredentials } from "@/shared/api/auth";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface LoginButtonProps {
	handleSubmit: UseFormHandleSubmit<LoginCredentials>;
}

export const LoginButton = observer(({ handleSubmit }: LoginButtonProps) => {
	const { t } = useTranslation();
	const { login } = useAuthStore();
	const [isLoading, setLoading] = useState<boolean>(false);

	const handleLogin = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setLoading(true);
		await handleSubmit(login)();
		setLoading(false);
	};

	return (
		<Button
			fontSize="md"
			w="100%"
			onClick={handleLogin}
			type="submit"
			size="lg"
			isLoading={isLoading}
		>
			{t("pages.login.form.button")}
		</Button>
	);
});
