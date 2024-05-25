import {Category} from "@/shared/api/category";
import {Button} from "@/shared/ui/(button)/button";
import {Container} from "@/shared/ui/(container)/container";
import {CategoryCards, CreateCategoryModal, EditCategoryModal,} from "@/widgets/(category)";
import {Alert, AlertIcon, Stack, useDisclosure} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useCategoryStore} from "@/entities/category";
import {Spinner} from "@/shared/ui/(spinner)/spinner";

export default function CategoriesPage() {
    const {t} = useTranslation();
    const [category, setCategory] = useState<Category | null>(null);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const {categories, getCategories} = useCategoryStore();
    const [isLoading, setLoading] = useState<boolean>(false);

    const onEditModalClose = () => {
        onClose();
        setCategory(null);
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            await getCategories();
            setLoading(false);
        })()
    }, []);

    if (isLoading) {
        return <Spinner/>;
    }

    return (
        <Container>
            <Stack pt={2} gap={6}>
                {!categories.length &&
                    <Alert borderRadius="md" status='info'>
                        <AlertIcon />
                        {t("advices.createCategoryAdvice")}
                    </Alert>
                }
                <Button onClick={onOpen}>{t("crud.buttons.createButton")}</Button>
                <CreateCategoryModal isOpen={isOpen && !category} onClose={onClose} />
                {category && (
                    <EditCategoryModal
                        category={category}
                        isOpen={isOpen}
                        onClose={onEditModalClose}
                    />
                )}
                <CategoryCards onOpen={onOpen} setCategory={setCategory} />
            </Stack>
        </Container>
    );
}
