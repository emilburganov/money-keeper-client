import {AccountsStats} from "@/features/(account)";
import {ExpensesStats} from "@/features/(expense)";
import {IncomesStats} from "@/features/(income)";
import {TransfersStats} from "@/features/(transfer)";
import {
    Card,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorMode,
} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {IncomeCategoriesStats} from "@/features/(category)/income-categories-stats";
import {ExpenseCategoriesStats} from "@/features/(category)/expense-categories-stats";

export const Content = () => {
    const {t} = useTranslation();
    const {colorMode} = useColorMode();

    const tabs = [
        t("stats.expenseCategories"),
        t("stats.incomeCategories"),
        t("stats.incomes"),
        t("stats.expenses"),
        t("stats.transfers"),
        t("stats.accounts"),
    ];

    return (
        <Card
            bg={colorMode === "light" ? "gray.50" : "gray.700"}
            flex={3}
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            pt={2}
        >
            <Tabs>
                <TabList
                    overflowX="auto"
                    whiteSpace="nowrap"
                    px={4}
                    pb="2px"
                    borderBottom="none"
                    boxShadow="0 -2px rgba(255, 255, 255, 0.16) inset"
                >
                    {tabs.map(tab => (
                        <Tab
                            wordBreak="unset"
                            _selected={{
                                borderBottomColor:
                                    colorMode === "light" ? "green.500" : "green.200",
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
                        <ExpenseCategoriesStats />
                    </TabPanel>
                    <TabPanel>
                        <IncomeCategoriesStats />
                    </TabPanel>
                    <TabPanel>
                        <IncomesStats />
                    </TabPanel>
                    <TabPanel>
                        <ExpensesStats />
                    </TabPanel>
                    <TabPanel>
                        <TransfersStats />
                    </TabPanel>
                    <TabPanel>
                        <AccountsStats />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Card>
    );
};
