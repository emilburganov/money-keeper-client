import { useIncomeStore } from "@/entities/income";
import { useColorMode } from "@chakra-ui/react";
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
    const {colorMode} = useColorMode();
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
                borderColor: colorMode === "light" ? "#38A169" : "#9AE6B4",
                backgroundColor: colorMode === "light" ? "#38A169" : "#9AE6B4",
            },
        ],
    };
    
    if (isLoading) {
        return;
    }
    
    return (
        <Line data={data}/>
    );
};