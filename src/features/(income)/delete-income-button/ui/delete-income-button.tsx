import { useIncomeStore } from "@/entities/income";
import { Income } from "@/shared/api/income";
import { Button } from "@/shared/ui/(button)/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface DeleteIncomeButtonProps {
	income: Income;
}

export const DeleteIncomeButton = ({ income }: DeleteIncomeButtonProps) => {
	const { deleteIncome } = useIncomeStore();
	const { t } = useTranslation();
	const [isLoading, setLoading] = useState<boolean>(false);

	const handleDelete = async () => {
		setLoading(true);
		await deleteIncome(income);
		setLoading(false);
	};

	return (
		<Button
			w="100%"
			onClick={handleDelete}
			colorScheme={"red"}
			isLoading={isLoading}
			loadingText={t("pages.incomes.deleteButtonLoadingText")}
		>
			{t("pages.incomes.deleteButton")}
		</Button>
	);
};
