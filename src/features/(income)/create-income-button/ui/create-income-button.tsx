import { useIncomeStore } from "@/entities/income";
import { IncomeBody } from "@/shared/api/income";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CreateIncomeButtonProps {
	reset: () => void;
	isValid: boolean;
	isLoading: boolean;
	handleSubmit: UseFormHandleSubmit<IncomeBody>;
	onSubmit: () => void;
}

export const CreateIncomeButton = observer((props: CreateIncomeButtonProps) => {
	const { reset, isValid, isLoading, handleSubmit, onSubmit } = props;
	const { createIncome } = useIncomeStore();
	const { t } = useTranslation();

	const handleCreate = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		handleSubmit(createIncome)();

		if (isValid) {
			onSubmit();
			reset();
		}
	};

	return (
		<Button isLoading={isLoading} onClick={handleCreate}>
			{t("pages.incomes.createButton")}
		</Button>
	);
});
