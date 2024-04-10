import { useAccountStore } from "@/entities/account";
import { useAuthStore } from "@/entities/auth";
import { Flex } from "@chakra-ui/react";
import { ArcElement, Chart as ChartJS, Legend, Tooltip, } from "chart.js";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const AccountsStats = observer(() => {
    const {accountsSummaryStats, getAccountsSummaryStats} = useAccountStore();
    const [isLoading, setLoading] = useState<boolean>(false);
    const {user} = useAuthStore();
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            await getAccountsSummaryStats();
            setLoading(false);
        })();
    }, [user.currency]);
    
    const data = {
        labels: accountsSummaryStats.labels,
        datasets: [
            {
                label: "Balance",
                data: accountsSummaryStats.values,
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
        <Flex h={400} justifyContent="center">
            <Pie
                data={data}
                options={{
                    maintainAspectRatio: false,
                    animation: {
                        duration: 0
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