import { useAuthStore } from "@/entities/auth";
import { useTransferStore } from "@/entities/transfer";
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
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const TransfersStats = observer(() => {
  const { t } = useTranslation();
  const { getTransfersStats, transfersStats } = useTransferStore();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { user } = useAuthStore();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getTransfersStats();
      setLoading(false);
    })();
  }, [user.currency]);

  const data = {
    labels: transfersStats.labels,
    datasets: [
      {
        label: t("stats.transfers"),
        data: transfersStats.values,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
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
            duration: 0,
          },
          scales: {
            y: {
              ticks: {
                callback: value => `${value} ${user.currency.code}`,
              },
            },
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
  );
});
