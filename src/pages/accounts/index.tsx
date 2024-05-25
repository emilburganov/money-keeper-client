import {Account} from "@/shared/api/account";
import {Button} from "@/shared/ui/(button)/button";
import {Container} from "@/shared/ui/(container)/container";
import {AccountCards, CreateAccountModal, EditAccountModal,} from "@/widgets/(account)";
import {Alert, AlertIcon, Stack, useDisclosure} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useAccountStore} from "@/entities/account";
import {Spinner} from "@/shared/ui/(spinner)/spinner";

export default function AccountsPage() {
    const {t} = useTranslation();
    const [account, setAccount] = useState<Account | null>(null);
    const {accounts, getAccounts} = useAccountStore();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [isLoading, setLoading] = useState<boolean>(false);

    const onEditModalClose = () => {
        onClose();
        setAccount(null);
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            await getAccounts();
            setLoading(false);
        })()
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Container>
            <Stack pt={2} gap={6}>
                {!accounts.length &&
                    <Alert borderRadius="md" status='info'>
                        <AlertIcon />
                        {t("advices.createAccountAdvice")}
                    </Alert>
                }
                <Button onClick={onOpen}>{t("crud.buttons.createButton")}</Button>
                <CreateAccountModal isOpen={isOpen && !account} onClose={onClose} />
                {account && (
                    <EditAccountModal
                        account={account}
                        isOpen={isOpen}
                        onClose={onEditModalClose}
                    />
                )}
                <AccountCards onOpen={onOpen} setAccount={setAccount} />
            </Stack>
        </Container>
    );
}
