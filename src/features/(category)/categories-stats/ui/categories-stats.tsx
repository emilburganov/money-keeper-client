import {useAuthStore} from "@/entities/auth";
import {Box, Flex, FormControl, FormErrorMessage, FormLabel, Input, useColorMode} from "@chakra-ui/react";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {Pie} from "react-chartjs-2";
import {useTranslation} from "react-i18next";
import {GetCategoriesStatsSchema, useCategoryStore} from "@/entities/category";
import {useForm} from "react-hook-form";
import {CategoriesStatsBody} from "@/shared/api/category";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button} from "@/shared/ui/(button)/button";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategoriesStats = observer(() => {
    const {t} = useTranslation();
    const {colorMode} = useColorMode();
    const {
        incomeCategoriesStats,
        getIncomeCategoriesStats,
        expenseCategoriesStats,
        getExpenseCategoriesStats,
    } = useCategoryStore();
    const [isLoading, setLoading] = useState<boolean>(false);
    const {user} = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<CategoriesStatsBody>({
        resolver: yupResolver(GetCategoriesStatsSchema),
        defaultValues: {
            date_from: new Date(Date.now() - 2592000000).toISOString().split("T")[0],
            date_to: new Date(Date.now() + 86400000 ).toISOString().split("T")[0],
        }
    });

    const getStats = () => {
        handleSubmit(getIncomeCategoriesStats)();
        handleSubmit(getExpenseCategoriesStats)();
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            await getIncomeCategoriesStats();
            await getExpenseCategoriesStats();
            setLoading(false);
        })();
    }, [user.currency]);

    const incomeData = {
        labels: incomeCategoriesStats.labels,
        datasets: [
            {
                label: t("stats.categories"),
                data: incomeCategoriesStats.values,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
            },
        ],
    };

    const expenseData = {
        labels: expenseCategoriesStats.labels,
        datasets: [
            {
                label: t("stats.categories"),
                data: expenseCategoriesStats.values,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
            },
        ],
    };


    if (isLoading) {
        return;
    }

    return (
        <Box>
            <Flex direction="column" gap={4}>
                <Flex gap={4} alignItems={"flex-end"}>
                    <FormControl flexGrow={1} w={"fit-content"} isInvalid={!!errors.date_from?.message}>
                        <FormLabel>
                            {t("pages.categories.stats.form.fields.date_from")}:
                        </FormLabel>
                        <Input
                            {...register("date_from")}
                            type="date"
                            focusBorderColor={
                                colorMode === "light" ? "green.500" : "green.200"
                            }
                        />
                        {errors.date_from && (
                            <FormErrorMessage>{errors.date_from?.message}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl flexGrow={1} w={"fit-content"} isInvalid={!!errors.date_to?.message}>
                        <FormLabel>
                            {t("pages.categories.stats.form.fields.date_to")}:
                        </FormLabel>
                        <Input
                            {...register("date_to")}
                            type="date"
                            focusBorderColor={
                                colorMode === "light" ? "green.500" : "green.200"
                            }
                        />
                        {errors.date_to && (
                            <FormErrorMessage>{errors.date_to?.message}</FormErrorMessage>
                        )}
                    </FormControl>
                    <Button onClick={getStats}>
                        {t("pages.categories.stats.form.button")}
                    </Button>
                </Flex>
            </Flex>
            <Flex h={400} justifyContent="center">
                <Pie
                    data={incomeData}
                    options={{
                        maintainAspectRatio: false,
                        animation: {
                            duration: 0,
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: context =>
                                        `${context.formattedValue} ${user.currency.code}`,
                                },
                            },
                        },
                    }}
                    width="100%"
                />
            </Flex>
            <Flex h={400} justifyContent="center">
                <Pie
                    data={expenseData}
                    options={{
                        maintainAspectRatio: false,
                        animation: {
                            duration: 0,
                        },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: context =>
                                        `${context.formattedValue} ${user.currency.code}`,
                                },
                            },
                        },
                    }}
                    width="100%"
                />
            </Flex>
        </Box>
    );
});
