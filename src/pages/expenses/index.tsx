import { Expense } from "@/shared/api/expense";
import { Button } from "@/shared/ui/(button)/button";
import { Container } from "@/shared/ui/(container)/container";
import {
	CreateExpenseModal,
	EditExpenseModal,
	ExpenseCards,
} from "@/widgets/(expense)";
import { Stack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ExpensesPage() {
	const { t } = useTranslation();
	const [expense, setExpense] = useState<Expense | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onEditModalClose = () => {
		onClose();
		setExpense(null);
	};

	return (
		<Container>
			<Stack pt={2} gap={6}>
				<Button onClick={onOpen}>{t("crud.buttons.createButton")}</Button>
				<CreateExpenseModal isOpen={isOpen && !expense} onClose={onClose} />
				{expense && (
					<EditExpenseModal
						expense={expense}
						isOpen={isOpen}
						onClose={onEditModalClose}
					/>
				)}
				<ExpenseCards onOpen={onOpen} setExpense={setExpense} />
			</Stack>
		</Container>
	);
}
