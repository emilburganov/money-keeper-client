import {Transfer} from "@/shared/api/transfer";
import {Button} from "@/shared/ui/(button)/button";
import {Container} from "@/shared/ui/(container)/container";
import {CreateTransferModal, EditTransferModal, TransferCards,} from "@/widgets/(transfer)";
import {Alert, AlertIcon, Stack, Text, useDisclosure} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {LinkButton} from "@/shared/ui/(button)/link-button";
import {Link} from "react-router-dom";
import {useAccountStore} from "@/entities/account";
import {Spinner} from "@/shared/ui/(spinner)/spinner";

export default function TransfersPage() {
    const {t} = useTranslation();
    const [transfer, setTransfer] = useState<Transfer | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {accounts, getAccounts} = useAccountStore();
    const [isLoading, setLoading] = useState<boolean>(false);

    const onEditModalClose = () => {
        onClose();
        setTransfer(null);
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            await getAccounts();
            setLoading(false);
        })()
    }, []);

    if (isLoading) {
        return <Spinner/>;
    }

    return (
        <Container>
            <Stack pt={2} gap={6}>
                {accounts.length < 2 &&
                    <Alert borderRadius="md" status='info'>
                        <AlertIcon />
                        <Text>
                            {t("advices.createTwoAccountsAdvice")} <br />
                            <LinkButton as={Link} fontSize="md" to="/accounts">
                                {t("header.navigation.accounts")}
                            </LinkButton>
                        </Text>
                    </Alert>
                }
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
