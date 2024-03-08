import { useExpenseStore } from "@/entities/expense";
import { DeleteExpenseButton } from "@/features/(expense)";
import { Expense } from "@/shared/api/expense";
import { Button } from "@/shared/ui/(button)/button";
import { Spinner } from "@/shared/ui/(spinner)/spinner";
import {
	Card,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface ExpenseCardsProps {
	setExpense: Dispatch<SetStateAction<Expense | null>>;
	onOpen: () => void;
}

export const ExpenseCards = observer(
	({ setExpense, onOpen }: ExpenseCardsProps) => {
		const { expenses, getExpenses } = useExpenseStore();
		const [isLoading, setLoading] = useState<boolean>(false);

		useEffect(() => {
			(async () => {
				setLoading(true);
				await getExpenses();
				setLoading(false);
			})();
		}, []);

		if (isLoading) {
			return <Spinner />;
		}

		return (
			<Flex direction="column" gap={4}>
				<SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="20px">
					{expenses.map(expense => (
						<ExpenseCard
							key={expense.id}
							expense={expense}
							onOpen={onOpen}
							setExpense={setExpense}
						/>
					))}
				</SimpleGrid>
			</Flex>
		);
	},
);

interface ExpenseCardProps {
	setExpense: Dispatch<SetStateAction<Expense | null>>;
	expense: Expense;
	onOpen: () => void;
}

export const ExpenseCard = ({
	setExpense,
	expense,
	onOpen,
}: ExpenseCardProps) => {
	const { t } = useTranslation();

	const handleEdit = () => {
		setExpense(expense);
		onOpen();
	};

	return (
		<Card borderColor="red">
			<CardHeader>
				<Heading
					size="sm"
					as={Flex}
					gap={2}
					align={"center"}
					justifyContent="space-between"
				>
					<Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
						{expense.title}
					</Text>
				</Heading>
			</CardHeader>
			<CardFooter flexDirection="column" gap={5}>
				<Button onClick={handleEdit} w="100%">
					{t("pages.expenses.editButton")}
				</Button>
				<DeleteExpenseButton expense={expense} />
			</CardFooter>
		</Card>
	);
};
