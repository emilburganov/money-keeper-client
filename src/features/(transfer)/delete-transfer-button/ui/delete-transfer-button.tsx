import { useTransferStore } from "@/entities/transfer";
import { Transfer } from "@/shared/api/transfer";
import { Button } from "@/shared/ui/(button)/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface DeleteTransferButtonProps {
	transfer: Transfer;
}

export const DeleteTransferButton = ({ transfer }: DeleteTransferButtonProps) => {
	const { deleteTransfer } = useTransferStore();
	const { t } = useTranslation();
	const [isLoading, setLoading] = useState<boolean>(false);

	const handleDelete = async () => {
		setLoading(true);
		await deleteTransfer(transfer);
		setLoading(false);
	};

	return (
		<Button
			onClick={handleDelete}
			colorScheme={"red"}
			isLoading={isLoading}
			loadingText={t("pages.transfers.deleteButtonLoadingText")}
		>
			<DeleteIcon/>
		</Button>
	);
};
