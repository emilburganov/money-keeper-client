import CategoryCard from "@/components/Categories/CategoryCard";
import Container from "@/components/UI/Container/Container";
import useStores from "@/hooks/useStores";
import {ICategory} from "@/models/ICategory";
import {SimpleGrid} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";

const Categories = observer(() => {
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
                {categoryStore.categories.map((category: ICategory) =>
                    <CategoryCard
                        key={category.id}
                        category={category}
                    />,
                )}
            </SimpleGrid>
        </Container>
    );
});

export default Categories;