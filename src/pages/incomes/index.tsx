import { Income } from "@/shared/api/income";
import { Button } from "@/shared/ui/(button)/button";
import { Container } from "@/shared/ui/(container)/container";
import {
	CreateIncomeModal,
	EditIncomeModal,
	IncomeCards,
} from "@/widgets/(income)";
import { Stack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function IncomesPage() {
	const { t } = useTranslation();
	const [income, setIncome] = useState<Income | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onEditModalClose = () => {
		onClose();
		setIncome(null);
	};

	return (
		<Container>
			<Stack pt={2} gap={6}>
				<Button display="flex" gap={2} onClick={onOpen}>
					{t("crud.buttons.createButton")}
				</Button>
				<CreateIncomeModal isOpen={isOpen && !income} onClose={onClose} />
				{income && (
					<EditIncomeModal
						income={income}
						isOpen={isOpen}
						onClose={onEditModalClose}
					/>
				)}
				<IncomeCards onOpen={onOpen} setIncome={setIncome} />
			</Stack>
		</Container>
	);
}
