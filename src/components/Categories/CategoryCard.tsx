import Button from "@/components/UI/Button/Button";
import useStores from "@/hooks/useStores";
import {ICategory} from "@/models/ICategory";
import {Badge, Card, CardBody, CardFooter, CardHeader, Heading, Text} from "@chakra-ui/react";
import {FC} from "react";

interface CategoryCardProps {
    category: ICategory,
}

const CategoryCard: FC<CategoryCardProps> = ({category}) => {
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
                    Delete Category
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CategoryCard;