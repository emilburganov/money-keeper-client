import {useAuthStore} from "@/entities/auth";
import {Flex, FormControl, FormErrorMessage, FormLabel, Input, useColorMode} from "@chakra-ui/react";
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

export const IncomeCategoriesStats = observer(() => {
    const {t} = useTranslation();
    const {colorMode} = useColorMode();
    const {incomeCategoriesStats, getIncomeCategoriesStats,} = useCategoryStore();
    const [isLoading, setLoading] = useState<boolean>(false);
    const {user} = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<CategoriesStatsBody>({
        resolver: yupResolver(GetCategoriesStatsSchema),
        defaultValues: {
            start_date: new Date("2024-01-01").toISOString().split("T")[0],
            end_date: new Date(Date.now()).toISOString().split("T")[0],
        }
    });

    useEffect(() => {
        (async () => {
            setLoading(true);
            await getIncomeCategoriesStats();
            setLoading(false);
        })();
    }, [user.currency]);

    const data = {
        labels: incomeCategoriesStats.labels,
        datasets: [
            {
                label: t("stats.income-categories"),
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

    if (isLoading) {
        return;
    }

    return (
        <Flex direction="column" gap={8}>
            <Flex h={400} justifyContent="center">
                <Pie
                    data={data}
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
            <Flex direction="column" gap={4}>
                <Flex gap={4} alignItems={"flex-end"}>
                    <FormControl flexGrow={1} w={"fit-content"} isInvalid={!!errors.start_date?.message}>
                        <FormLabel>
                            {t("pages.categories.stats.form.fields.start_date")}:
                        </FormLabel>
                        <Input
                            {...register("start_date")}
                            type="date"
                            focusBorderColor={
                                colorMode === "light" ? "green.500" : "green.200"
                            }
                        />
                        {errors.start_date && (
                            <FormErrorMessage>{errors.start_date?.message}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl flexGrow={1} w={"fit-content"} isInvalid={!!errors.end_date?.message}>
                        <FormLabel>
                            {t("pages.categories.stats.form.fields.end_date")}:
                        </FormLabel>
                        <Input
                            {...register("end_date")}
                            type="date"
                            focusBorderColor={
                                colorMode === "light" ? "green.500" : "green.200"
                            }
                        />
                        {errors.end_date && (
                            <FormErrorMessage>{errors.end_date?.message}</FormErrorMessage>
                        )}
                    </FormControl>
                    <Button onClick={() => handleSubmit(getIncomeCategoriesStats)()}>
                        {t("pages.categories.stats.form.button")}
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
});
