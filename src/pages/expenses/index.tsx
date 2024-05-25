import {Expense} from "@/shared/api/expense";
import {Button} from "@/shared/ui/(button)/button";
import {Container} from "@/shared/ui/(container)/container";
import {CreateExpenseModal, EditExpenseModal, ExpenseCards,} from "@/widgets/(expense)";
import {Alert, AlertIcon, Stack, Text, useDisclosure} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {LinkButton} from "@/shared/ui/(button)/link-button";
import {Link} from "react-router-dom";
import {useCategoryStore} from "@/entities/category";
import {useAccountStore} from "@/entities/account";
import {Category, CategoryType} from "@/shared/api/category";
import { Spinner } from "@/shared/ui/(spinner)/spinner";

export default function ExpensesPage() {
    const {t} = useTranslation();
    const [expense, setExpense] = useState<Expense | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {categories, getCategories} = useCategoryStore();
    const {accounts, getAccounts} = useAccountStore();
    const [expenseCategories, setExpenseCategories] = useState<Category[] | null>();
    const [isLoading, setLoading] = useState<boolean>(false);

    const onEditModalClose = () => {
        onClose();
        setExpense(null);
    };

    useEffect(() => {
        setLoading(true);
        setExpenseCategories(categories.filter((category) => category.type === CategoryType.EXPENSES));
        setLoading(false);
    }, [categories]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await getCategories();
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
                {!expenseCategories?.length &&
                    <Alert borderRadius="md" status='info'>
                        <AlertIcon />
                        <Text>
                            {t("advices.createExpenseCategoryFirstAdvice")} <br />
                            <LinkButton as={Link} fontSize="md" to="/categories">
                                {t("header.navigation.categories")}
                            </LinkButton>
                        </Text>
                    </Alert>
                }
                {!accounts.length &&
                    <Alert borderRadius="md" status='info'>
                        <AlertIcon />
                        <Text>
                            {t("advices.createAccountFirstAdvice")} <br />
                            <LinkButton as={Link} fontSize="md" to="/accounts">
                                {t("header.navigation.accounts")}
                            </LinkButton>
                        </Text>
                    </Alert>
                }
                {expenseCategories?.length && accounts.length && <Button onClick={onOpen}>
                    {t("crud.buttons.createButton")}
                </Button>}
                <CreateExpenseModal isOpen={isOpen && !expense} onClose={onClose} />
                {expense && (
                    <EditExpenseModal
                        expense={expense}
                        isOpen={isOpen}
                        onClose={onEditModalClose}
                    />
                )}
                <ExpenseCards onOpen={onOpen} setExpense={setExpense} />
            </Stack>
        </Container>
    );
}
