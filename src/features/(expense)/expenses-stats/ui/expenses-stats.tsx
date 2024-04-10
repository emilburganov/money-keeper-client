import { useAuthStore } from "@/entities/auth";
import { useExpenseStore } from "@/entities/expense";
import { Flex } from "@chakra-ui/react";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const ExpensesStats = observer(() => {
    const {getExpensesStats, expensesStats} = useExpenseStore();
    const [isLoading, setLoading] = useState<boolean>(false);
    const {user} = useAuthStore();
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            await getExpensesStats();
            setLoading(false);
        })();
    }, []);
    
    const data = {
        labels: expensesStats.labels,
        datasets: [
            {
                label: "Expenses",
                data: expensesStats.values,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    };
    
    if (isLoading) {
        return;
    }
    
    return (
        <Flex h={400} justifyContent="center">
            <Line
                data={data}
                options={{
                    maintainAspectRatio: false,
                    animation: {
                        duration: 0
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: (value) => `${value} ${user.currency.code}`,
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (context) => `${context.formattedValue} ${user.currency.code}`,
                            }
                        }
                    }
                }}
                width="100%"
            />
        </Flex>
    );
});