import CategoryCard from "@/components/Categories/CategoryCard";
import Container from "@/components/UI/Container/Container";
import useStores from "@/hooks/useStores";
import {SimpleGrid} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const Categories = observer(() => {
    const {t} = useTranslation();
    const {categoryStore, authStore} = useStores();

    useEffect(() => {
        (async () => {
            await authStore.me();
            await categoryStore.index();
        })();
    }, []);

    return (
        <Container>
            <SimpleGrid minChildWidth="280px" spacing="20px">
                {categoryStore.categories.map((category) =>
                    <CategoryCard key={category.id} category={category}/>,
                )}
            </SimpleGrid>
        </Container>
    );
});

export default Categories;