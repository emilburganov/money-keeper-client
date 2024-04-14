import { useAuthStore } from "@/entities/auth";
import { UpdateUserCredentials } from "@/shared/api/auth";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface UpdateUserButtonProps {
	handleSubmit: UseFormHandleSubmit<UpdateUserCredentials>;
}

export const UpdateUserButton = observer(
	({ handleSubmit }: UpdateUserButtonProps) => {
		const { t } = useTranslation();
		const { updateUser } = useAuthStore();
		const [isLoading, setLoading] = useState<boolean>(false);

		const handleUpdateUserProfile = async (
			event: MouseEvent<HTMLButtonElement>,
		) => {
			event.preventDefault();
			setLoading(true);
			await handleSubmit(updateUser)();
			setLoading(false);
		};

		return (
			<Button
				fontSize="md"
				w="100%"
				onClick={handleUpdateUserProfile}
				type="submit"
				size="lg"
				isLoading={isLoading}
			>
				{t("crud.buttons.updateButton")}
			</Button>
		);
	},
);
