import { useAccountStore } from "@/entities/account";
import { DeleteAccountButton } from "@/features/(account)";
import { Account } from "@/shared/api/account";
import { Button } from "@/shared/ui/(button)/button";
import { Spinner } from "@/shared/ui/(spinner)/spinner";
import { EditIcon } from "@chakra-ui/icons";
import { Badge, Card, CardFooter, CardHeader, Flex, Heading, ScaleFade, SimpleGrid, Text, } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface AccountCardsProps {
    setAccount: Dispatch<SetStateAction<Account | null>>;
    onOpen: () => void;
}

export const AccountCards = observer(
    ({setAccount, onOpen}: AccountCardsProps) => {
        const {accounts, getAccounts} = useAccountStore();
        const [isLoading, setLoading] = useState<boolean>(false);
        
        useEffect(() => {
            (async () => {
                setLoading(true);
                await getAccounts();
                setLoading(false);
            })();
        }, []);
        
        if (isLoading) {
            return <Spinner/>;
        }
        
        return (
            <Flex direction="column" gap={4}>
                <SimpleGrid columns={{base: 1, sm: 2, lg: 3, xl: 4}} spacing="20px">
                    {accounts.map((account) => (
                        <AccountCard
                            key={account.id}
                            account={account}
                            onOpen={onOpen}
                            setAccount={setAccount}
                        />
                    ))}
                </SimpleGrid>
            </Flex>
        );
    },
);

interface AccountCardProps {
    setAccount: Dispatch<SetStateAction<Account | null>>;
    account: Account;
    onOpen: () => void;
}

const AccountCard = ({setAccount, account, onOpen}: AccountCardProps) => {
    const handleEdit = () => {
        setAccount(account);
        onOpen();
    };
    
    return (
        <ScaleFade initialScale={0.9} in={true}>
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
                            {account.title}
                        </Text>
                        <Badge fontSize="0.7em" colorScheme="green" px={2} py={1}>
                            {account.currency.code}
                        </Badge>
                    </Heading>
                </CardHeader>
                <CardFooter gap={5}>
                    <Button onClick={handleEdit}>
                        <EditIcon/>
                    </Button>
                    <DeleteAccountButton account={account}/>
                </CardFooter>
            </Card>
        </ScaleFade>
    );
};
