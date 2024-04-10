import { useAuthStore } from "@/entities/auth";
import { useIncomeStore } from "@/entities/income";
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

export const IncomesStats = observer(() => {
    const {getIncomesStats, incomesStats} = useIncomeStore();
    const [isLoading, setLoading] = useState<boolean>(false);
    const {user} = useAuthStore();
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            await getIncomesStats();
            setLoading(false);
        })();
    }, [user.currency]);
    
    const data = {
        labels: incomesStats.labels,
        datasets: [
            {
                label: "Incomes",
                data: incomesStats.values,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
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