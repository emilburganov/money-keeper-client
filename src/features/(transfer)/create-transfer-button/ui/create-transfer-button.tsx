import { useTransferStore } from "@/entities/transfer";
import { TransferBody } from "@/shared/api/transfer";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CreateTransferButtonProps {
	reset: () => void;
	isValid: boolean;
	isLoading: boolean;
	handleSubmit: UseFormHandleSubmit<TransferBody>;
	onSubmit: () => void;
}

export const CreateTransferButton = observer(
	(props: CreateTransferButtonProps) => {
		const { reset, isValid, isLoading, handleSubmit, onSubmit } = props;
		const { createTransfer } = useTransferStore();
		const { t } = useTranslation();

		const handleCreate = (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			handleSubmit(createTransfer)();

			if (isValid) {
				onSubmit();
				reset();
			}
		};

		return (
			<Button isLoading={isLoading} onClick={handleCreate}>
				{t("pages.transfers.createButton")}
			</Button>
		);
	},
);
