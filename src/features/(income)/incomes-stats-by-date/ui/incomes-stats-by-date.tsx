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

export const IncomesStatsByDate = () => {
    const {getIncomesStats, incomesStats} = useIncomeStore();
    const [isLoading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            await getIncomesStats();
            setLoading(false);
        })();
    }, []);
    
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
                    }
                }}
                width="100%"
            />
        </Flex>
    );
};