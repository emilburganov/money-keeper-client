import { useAccountStore } from "@/entities/account";
import { AccountBody } from "@/shared/api/account";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CreateAccountButtonProps {
	reset: () => void;
	isValid: boolean;
	isLoading: boolean;
	handleSubmit: UseFormHandleSubmit<AccountBody>;
	onSubmit: () => void;
}

export const CreateAccountButton = observer(
	(props: CreateAccountButtonProps) => {
		const { reset, isValid, isLoading, handleSubmit, onSubmit } = props;
		const { createAccount } = useAccountStore();
		const { t } = useTranslation();

		const handleCreate = (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			handleSubmit(createAccount)();

			if (isValid) {
				onSubmit();
				reset();
			}
		};

		return (
			<Button isLoading={isLoading} onClick={handleCreate}>
				{t("pages.accounts.createButton")}
			</Button>
		);
	},
);
