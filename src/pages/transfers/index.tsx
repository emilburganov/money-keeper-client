import { Transfer } from "@/shared/api/transfer";
import { Button } from "@/shared/ui/(button)/button";
import { Container } from "@/shared/ui/(container)/container";
import {
	CreateTransferModal,
	EditTransferModal,
	TransferCards,
} from "@/widgets/(transfer)";
import { Stack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function TransfersPage() {
	const { t } = useTranslation();
	const [transfer, setTransfer] = useState<Transfer | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onEditModalClose = () => {
		onClose();
		setTransfer(null);
	};

	return (
		<Container>
			<Stack pt={2} gap={6}>
				<Button onClick={onOpen}>{t("crud.buttons.createButton")}</Button>
				<CreateTransferModal isOpen={isOpen && !transfer} onClose={onClose} />
				{transfer && (
					<EditTransferModal
						transfer={transfer}
						isOpen={isOpen}
						onClose={onEditModalClose}
					/>
				)}
				<TransferCards onOpen={onOpen} setTransfer={setTransfer} />
			</Stack>
		</Container>
	);
}
