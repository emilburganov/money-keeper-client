import { useExpenseStore } from "@/entities/expense";
import { ExpenseBody } from "@/shared/api/expense";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CreateExpenseButtonProps {
	reset: () => void;
	isValid: boolean;
	isLoading: boolean;
	handleSubmit: UseFormHandleSubmit<ExpenseBody>;
	onSubmit: () => void;
}

export const CreateExpenseButton = observer(
	(props: CreateExpenseButtonProps) => {
		const { reset, isValid, isLoading, handleSubmit, onSubmit } = props;
		const { createExpense } = useExpenseStore();
		const { t } = useTranslation();

		const handleCreate = (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			handleSubmit(createExpense)();

			if (isValid) {
				onSubmit();
				reset();
			}
		};

		return (
			<Button isLoading={isLoading} onClick={handleCreate}>
				{t("pages.expenses.createButton")}
			</Button>
		);
	},
);
