import { AccountsSummaryStats } from "@/features/(account)";
import { ExpensesStatsByDate } from "@/features/(expense)";
import { IncomesStatsByDate } from "@/features/(income)";
import { Card, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode } from "@chakra-ui/react";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const Content = () => {
    const tabs = ["Incomes stats by date", "Expenses stats by date", "Accounts summary stats"];
    const {colorMode} = useColorMode();
    
    return (
        <Card
            bg={colorMode === "light" ? "gray.50" : "gray.700"}
            flex={3}
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            pt={2}
        >
            <Tabs color="whiteAlpha-900">
                <TabList
                    overflowY="hidden"
                    overflowX="auto"
                    whiteSpace="nowrap"
                    px={4}
                >
                    {tabs.map((tab) => (
                        <Tab
                            wordBreak="unset"
                            _selected={{
                                borderBottomColor: colorMode === "light" ? "green.500" : "green.200",
                                color: colorMode === "light" ? "green.500" : "green.200",
                            }}
                            key={tab}
                            py={4}
                            fontWeight="semibold"
                        >
                            {tab}
                        </Tab>
                    ))}
                </TabList>
                
                <TabPanels>
                    <TabPanel>
                        <IncomesStatsByDate/>
                    </TabPanel>
                    <TabPanel>
                        <ExpensesStatsByDate/>
                    </TabPanel>
                    <TabPanel>
                        <AccountsSummaryStats/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Card>
    );
};