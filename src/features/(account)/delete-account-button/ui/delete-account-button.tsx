import { useAccountStore } from "@/entities/account";
import { Account } from "@/shared/api/account";
import { Button } from "@/shared/ui/(button)/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface DeleteAccountButtonProps {
	account: Account;
}

export const DeleteAccountButton = ({ account }: DeleteAccountButtonProps) => {
	const { deleteAccount } = useAccountStore();
	const { t } = useTranslation();
	const [isLoading, setLoading] = useState<boolean>(false);

	const handleDelete = async () => {
		setLoading(true);
		await deleteAccount(account);
		setLoading(false);
	};

	return (
		<Button
			onClick={handleDelete}
			colorScheme={"red"}
			isLoading={isLoading}
			loadingText={t("pages.accounts.deleteButtonLoadingText")}
		>
			<DeleteIcon/>
		</Button>
	);
};
