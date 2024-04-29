import { Account } from "@/shared/api/account";
import { Button } from "@/shared/ui/(button)/button";
import { Container } from "@/shared/ui/(container)/container";
import {
  AccountCards,
  CreateAccountModal,
  EditAccountModal,
} from "@/widgets/(account)";
import { Stack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AccountsPage() {
  const { t } = useTranslation();
  const [account, setAccount] = useState<Account | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onEditModalClose = () => {
    onClose();
    setAccount(null);
  };

  return (
    <Container>
      <Stack pt={2} gap={6}>
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
