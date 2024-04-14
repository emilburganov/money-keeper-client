import { useAccountStore } from "@/entities/account";
import { AccountBody } from "@/shared/api/account";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface UpdateAccountButtonProps {
	id: number;
	reset: () => void;
	isValid: boolean;
	handleSubmit: UseFormHandleSubmit<AccountBody>;
	onSubmit: () => void;
}

export const UpdateAccountButton = observer(
	(props: UpdateAccountButtonProps) => {
		const { t } = useTranslation();
		const { id, reset, isValid, handleSubmit, onSubmit } = props;
		const { updateAccount } = useAccountStore();
		const [isLoading, setLoading] = useState<boolean>(false);

		const handleUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			setLoading(true);
			await handleSubmit(data => updateAccount(data, id))();
			setLoading(false);

			if (isValid) {
				onSubmit();
				reset();
			}
		};

		return (
			<Button
				onClick={handleUpdate}
				isLoading={isLoading}
				loadingText={t("crud.buttons.updateButtonLoadingText")}
			>
				{t("crud.buttons.updateButton")}
			</Button>
		);
	},
);
