import { useAccountStore } from "@/entities/account";
import { AccountBody } from "@/shared/api/account";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CreateAccountButtonProps {
	reset: () => void;
	isValid: boolean;
	handleSubmit: UseFormHandleSubmit<AccountBody>;
	onSubmit: () => void;
}

export const CreateAccountButton = observer(
	(props: CreateAccountButtonProps) => {
		const { reset, isValid, handleSubmit, onSubmit } = props;
		const { createAccount } = useAccountStore();
		const { t } = useTranslation();
		const [isLoading, setLoading] = useState<boolean>(false);

		const handleCreate = async (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();

			setLoading(true);
			await handleSubmit(createAccount)();
			setLoading(false);

			if (isValid) {
				onSubmit();
				reset();
			}
		};

		return (
			<Button
				isLoading={isLoading}
				onClick={handleCreate}
				loadingText={t("crud.buttons.createButtonLoadingText")}
			>
				{t("crud.buttons.createButton")}
			</Button>
		);
	},
);
