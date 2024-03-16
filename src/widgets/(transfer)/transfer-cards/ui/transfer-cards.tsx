import { useTransferStore } from "@/entities/transfer";
import { DeleteTransferButton } from "@/features/(transfer)";
import { Transfer } from "@/shared/api/transfer";
import { Button } from "@/shared/ui/(button)/button";
import { Spinner } from "@/shared/ui/(spinner)/spinner";
import { ArrowForwardIcon, EditIcon } from "@chakra-ui/icons";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    ScaleFade,
    SimpleGrid,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    Text,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface TransferCardsProps {
    setTransfer: Dispatch<SetStateAction<Transfer | null>>;
    onOpen: () => void;
}

export const TransferCards = observer(
    ({setTransfer, onOpen}: TransferCardsProps) => {
        const {transfers, getTransfers} = useTransferStore();
        const [isLoading, setLoading] = useState<boolean>(false);
        
        useEffect(() => {
            (async () => {
                setLoading(true);
                await getTransfers();
                setLoading(false);
            })();
        }, []);
        
        if (isLoading) {
            return <Spinner/>;
        }
        
        return (
            <Flex direction="column" gap={4}>
                <SimpleGrid columns={{base: 1, sm: 2, lg: 3, xl: 4}} spacing="20px">
                    {transfers.map((transfer) => (
                        <TransferCard
                            key={transfer.id}
                            transfer={transfer}
                            onOpen={onOpen}
                            setTransfer={setTransfer}
                        />
                    ))}
                </SimpleGrid>
            </Flex>
        );
    },
);

interface TransferCardProps {
    setTransfer: Dispatch<SetStateAction<Transfer | null>>;
    transfer: Transfer;
    onOpen: () => void;
}

const TransferCard = ({setTransfer, transfer, onOpen}: TransferCardProps) => {
    const handleEdit = () => {
        setTransfer(transfer);
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
                            {transfer.title}
                        </Text>
                    </Heading>
                </CardHeader>
                <CardBody py={0}>
                    <Stat>
                        <StatLabel display="flex" gap={2} alignItems="center">
                            {transfer.account_from.title}
                            <ArrowForwardIcon/>
                            {transfer.account_to.title}
                        </StatLabel>
                        <StatNumber>{transfer.amount} {transfer.account_from.currency.code}</StatNumber>
                        <StatHelpText>{transfer.created_at}</StatHelpText>
                    </Stat>
                </CardBody>
                <CardFooter gap={5}>
                    <Button onClick={handleEdit}>
                        <EditIcon/>
                    </Button>
                    <DeleteTransferButton transfer={transfer}/>
                </CardFooter>
            </Card>
        </ScaleFade>
    );
};
