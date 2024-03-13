import { useExpenseStore } from "@/entities/expense";
import { DeleteExpenseButton } from "@/features/(expense)";
import { Expense } from "@/shared/api/expense";
import { Button } from "@/shared/ui/(button)/button";
import { Spinner } from "@/shared/ui/(spinner)/spinner";
import { EditIcon } from "@chakra-ui/icons";
import {
    Badge,
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

interface ExpenseCardsProps {
    setExpense: Dispatch<SetStateAction<Expense | null>>;
    onOpen: () => void;
}

export const ExpenseCards = observer(
    ({setExpense, onOpen}: ExpenseCardsProps) => {
        const {expenses, getExpenses} = useExpenseStore();
        const [isLoading, setLoading] = useState<boolean>(false);
        
        useEffect(() => {
            (async () => {
                setLoading(true);
                await getExpenses();
                setLoading(false);
            })();
        }, []);
        
        if (isLoading) {
            return <Spinner/>;
        }
        
        return (
            <Flex direction="column" gap={4}>
                <SimpleGrid columns={{base: 1, sm: 2, lg: 3, xl: 4}} spacing="20px">
                    {expenses.map((expense) => (
                        <ExpenseCard
                            key={expense.id}
                            expense={expense}
                            onOpen={onOpen}
                            setExpense={setExpense}
                        />
                    ))}
                </SimpleGrid>
            </Flex>
        );
    },
);

interface ExpenseCardProps {
    setExpense: Dispatch<SetStateAction<Expense | null>>;
    expense: Expense;
    onOpen: () => void;
}

export const ExpenseCard = ({
                                setExpense,
                                expense,
                                onOpen,
                            }: ExpenseCardProps) => {

    const handleEdit = () => {
        setExpense(expense);
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
                            {expense.title}
                        </Text>
                        <Badge fontSize="0.7em" colorScheme="red" px={2} py={1}>
                            {expense.category.title}
                        </Badge>
                    </Heading>
                </CardHeader>
                <CardBody py={0}>
                    <Stat>
                        <StatLabel>{expense.account.title}</StatLabel>
                        <StatNumber>- {expense.amount} {expense.account.currency.symbol}</StatNumber>
                        <StatHelpText>{expense.created_at}</StatHelpText>
                    </Stat>
                </CardBody>
                <CardFooter gap={5}>
                    <Button onClick={handleEdit}>
                        <EditIcon/>
                    </Button>
                    <DeleteExpenseButton expense={expense}/>
                </CardFooter>
            </Card>
        </ScaleFade>
    );
};
