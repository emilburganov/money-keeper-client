import { AccountsStats } from "@/features/(account)";
import { ExpensesStats } from "@/features/(expense)";
import { IncomesStats } from "@/features/(income)";
import { TransfersStats } from "@/features/(transfer)";
import { Card, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode } from "@chakra-ui/react";

export const Content = () => {
    const tabs = ["Incomes", "Expenses", "Transfers", "Accounts"];
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
            <Tabs>
                <TabList
                    overflowX="auto"
                    whiteSpace="nowrap"
                    px={4}
                    pb="2px"
                    borderBottom="none"
                    boxShadow="0 -2px rgba(255, 255, 255, 0.16) inset"
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
                        <IncomesStats/>
                    </TabPanel>
                    <TabPanel>
                        <ExpensesStats/>
                    </TabPanel>
                    <TabPanel>
                        <TransfersStats/>
                    </TabPanel>
                    <TabPanel>
                        <AccountsStats/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Card>
    );
};