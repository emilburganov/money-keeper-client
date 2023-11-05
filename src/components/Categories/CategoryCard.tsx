import Button from "@/components/UI/Button/Button";
import useStores from "@/hooks/useStores";
import {ICategory} from "@/models/ICategory";
import {Badge, Card, CardFooter, CardHeader, Flex, Heading} from "@chakra-ui/react";
import {FC} from "react";
import {useTranslation} from "react-i18next";

interface CategoryCardProps {
    category: ICategory,
}

const CategoryCard: FC<CategoryCardProps> = ({category}) => {
    const {t} = useTranslation();
    const {categoryStore} = useStores();

    const typeBadgeColors: Record<string, string> = {
        Incomes: "green",
        Expenses: "red",
    };

    const destroyCategory = () => {
        categoryStore.destroy(category);
    };

    return (
        <Card borderColor="red">
            <CardHeader>
                <Heading
                    size="md"
                    as={Flex}
                    gap={2}
                    align={"center"}
                    wrap={"wrap"}
                >
                    {category.name}
                    <Badge
                        px={2}
                        py={1}
                        colorScheme={typeBadgeColors[category.type_name]}
                        textTransform={"capitalize"}
                    >
                        {t("models.type." + category.type_name)}
                    </Badge>
                </Heading>
            </CardHeader>
            <CardFooter>
                <Button
                    onClick={destroyCategory}
                    bg={"red.400"}
                    _hover={{bg: "red.500"}}
                >
                    {t("pages.categories.destroyButton")}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CategoryCard;