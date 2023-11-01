import Button from "@/components/UI/Button/Button";
import useStores from "@/hooks/useStores";
import {ICategory} from "@/models/ICategory";
import {Badge, Card, CardBody, CardFooter, CardHeader, Heading, Text} from "@chakra-ui/react";
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
                <Heading size="md">
                    {category.name}
                    <Badge
                        colorScheme={typeBadgeColors[category.type_name]}
                        fontSize="0.6em"
                        variant="solid"
                        ml="2"
                    >
                        {category.type_name}
                    </Badge>
                </Heading>
            </CardHeader>
            <CardBody>
                <Text>
                    {category.description}
                </Text>
            </CardBody>
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