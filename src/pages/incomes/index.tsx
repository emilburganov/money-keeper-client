import {Income} from "@/shared/api/income";
import {Button} from "@/shared/ui/(button)/button";
import {Container} from "@/shared/ui/(container)/container";
import {CreateIncomeModal, EditIncomeModal, IncomeCards,} from "@/widgets/(income)";
import {Alert, AlertIcon, Stack, Text, useDisclosure} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useCategoryStore} from "@/entities/category";
import {useAccountStore} from "@/entities/account";
import {LinkButton} from "@/shared/ui/(button)/link-button";
import {Link} from "react-router-dom";
import {Category, CategoryType} from "@/shared/api/category";
import {Spinner} from "@/shared/ui/(spinner)/spinner";

export default function IncomesPage() {
    const {t} = useTranslation();
    const [income, setIncome] = useState<Income | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {categories, getCategories} = useCategoryStore();
    const {accounts, getAccounts} = useAccountStore();
    const [incomeCategories, setIncomeCategories] = useState<Category[] | null>();
    const [isLoading, setLoading] = useState<boolean>(false);

    const onEditModalClose = () => {
        onClose();
        setIncome(null);
    };

    useEffect(() => {
        setLoading(true);
        setIncomeCategories(categories.filter((category) => category.type === CategoryType.INCOMES));
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
                {!incomeCategories?.length &&
                    <Alert borderRadius="md" status='info'>
                        <AlertIcon />
                        <Text>
                            {t("advices.createIncomeCategoryFirstAdvice")} <br />
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
                {incomeCategories?.length && accounts.length && <Button display="flex" gap={2} onClick={onOpen}>
                    {t("crud.buttons.createButton")}
                </Button>}
                <CreateIncomeModal isOpen={isOpen && !income} onClose={onClose} />
                {income && (
                    <EditIncomeModal
                        income={income}
                        isOpen={isOpen}
                        onClose={onEditModalClose}
                    />
                )}
                <IncomeCards onOpen={onOpen} setIncome={setIncome} />
            </Stack>
        </Container>
    );
}
