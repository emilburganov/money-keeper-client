import CategoryCard from "@/components/Categories/CategoryCard";
import Container from "@/components/UI/Container/Container";
import Loader from "@/components/UI/Loader/Loader";
import LoaderContext from "@/context/LoaderContext";
import useStores from "@/hooks/useStores";
import {ICategory} from "@/models/ICategory";
import {SimpleGrid} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {FC, useContext, useEffect} from "react";

const Categories: FC = observer(() => {
    const {isLoading, setLoading} = useContext(LoaderContext);
    const {categoryStore, authStore} = useStores();

    useEffect(() => {
        (async () => {
            setLoading(true);
            await authStore.me();
            await categoryStore.index();
            setLoading(false);
        })();
    }, []);

    if (isLoading) {
        return <Loader/>;
    }

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