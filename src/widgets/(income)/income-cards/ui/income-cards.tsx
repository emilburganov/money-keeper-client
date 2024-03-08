import { useIncomeStore } from "@/entities/income";
import { DeleteIncomeButton } from "@/features/(income)";
import { Income } from "@/shared/api/income";
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

interface IncomeCardsProps {
	setIncome: Dispatch<SetStateAction<Income | null>>;
	onOpen: () => void;
}

export const IncomeCards = observer(
	({ setIncome, onOpen }: IncomeCardsProps) => {
		const { incomes, getIncomes } = useIncomeStore();
		const [isLoading, setLoading] = useState<boolean>(false);

		useEffect(() => {
			(async () => {
				setLoading(true);
				await getIncomes();
				setLoading(false);
			})();
		}, []);

		if (isLoading) {
			return <Spinner />;
		}

		return (
			<Flex direction="column" gap={4}>
				<SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="20px">
					{incomes.map(income => (
						<IncomeCard
							key={income.id}
							income={income}
							onOpen={onOpen}
							setIncome={setIncome}
						/>
					))}
				</SimpleGrid>
			</Flex>
		);
	},
);

interface IncomeCardProps {
	setIncome: Dispatch<SetStateAction<Income | null>>;
	income: Income;
	onOpen: () => void;
}

export const IncomeCard = ({ setIncome, income, onOpen }: IncomeCardProps) => {
	const { t } = useTranslation();

	const handleEdit = () => {
		setIncome(income);
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
						{income.title}
					</Text>
				</Heading>
			</CardHeader>
			<CardFooter flexDirection="column" gap={5}>
				<Button onClick={handleEdit} w="100%">
					{t("pages.incomes.editButton")}
				</Button>
				<DeleteIncomeButton income={income} />
			</CardFooter>
		</Card>
	);
};
