import {useCategoryStore} from "@/entities/category";
import {DeleteCategoryButton} from "@/features/(category)";
import {Category, CategoryType} from "@/shared/api/category";
import {Button} from "@/shared/ui/(button)/button";
import {Spinner} from "@/shared/ui/(spinner)/spinner";
import {EditIcon} from "@chakra-ui/icons";
import {Badge, Card, CardFooter, CardHeader, Flex, Heading, ScaleFade, SimpleGrid, Text,} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

interface CategoryCardsProps {
    setCategory: Dispatch<SetStateAction<Category | null>>;
    onOpen: () => void;
}

export const CategoryCards = observer(
    ({setCategory, onOpen}: CategoryCardsProps) => {
        const {categories, getCategories} = useCategoryStore();
        const [isLoading, setLoading] = useState<boolean>(false);

        useEffect(() => {
            (async () => {
                setLoading(true);
                await getCategories();
                setLoading(false);
            })();
        }, []);

        if (isLoading) {
            return <Spinner />;
        }

        return (
            <Flex direction="column" gap={4}>
                <SimpleGrid columns={{base: 1, sm: 2, lg: 3, xl: 4}} spacing="20px">
                    {categories.map(category => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onOpen={onOpen}
                            setCategory={setCategory}
                        />
                    ))}
                </SimpleGrid>
            </Flex>
        );
    },
);

interface CategoryCardProps {
    setCategory: Dispatch<SetStateAction<Category | null>>;
    category: Category;
    onOpen: () => void;
}

export const CategoryCard = ({
                                 setCategory,
                                 category,
                                 onOpen,
                             }: CategoryCardProps) => {
    const {t} = useTranslation();

    const handleEdit = () => {
        setCategory(category);
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
                        align="center"
                        justifyContent="space-between"
                    >
                        <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                            {category.title}
                        </Text>

                        {category.type === CategoryType.INCOMES && (
                            <Badge fontSize="0.7em" colorScheme="green" px={2} py={1}>
                                {t("models.type.Incomes")}
                            </Badge>
                        )}

                        {category.type === CategoryType.EXPENSES && (
                            <Badge fontSize="0.7em" colorScheme="red" px={2} py={1}>
                                {t("models.type.Expenses")}
                            </Badge>
                        )}
                    </Heading>
                </CardHeader>
                <CardFooter gap={5}>
                    <Button onClick={handleEdit}>
                        <EditIcon />
                    </Button>
                    <DeleteCategoryButton category={category} />
                </CardFooter>
            </Card>
        </ScaleFade>
    );
};
