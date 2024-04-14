import { useExpenseStore } from "@/entities/expense";
import { Expense } from "@/shared/api/expense";
import { Button } from "@/shared/ui/(button)/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface DeleteExpenseButtonProps {
	expense: Expense;
}

export const DeleteExpenseButton = ({ expense }: DeleteExpenseButtonProps) => {
	const { deleteExpense } = useExpenseStore();
	const { t } = useTranslation();
	const [isLoading, setLoading] = useState<boolean>(false);

	const handleDelete = async () => {
		setLoading(true);
		await deleteExpense(expense);
		setLoading(false);
	};

	return (
		<Button
			onClick={handleDelete}
			colorScheme="red"
			isLoading={isLoading}
			loadingText={t("crud.buttons.deleteButtonLoadingText")}
		>
			<DeleteIcon />
		</Button>
	);
};
