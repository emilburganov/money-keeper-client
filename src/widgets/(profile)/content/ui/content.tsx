import { Card, Tab, TabList, TabPanel, TabPanels, Tabs, useColorMode } from "@chakra-ui/react";

export const Content = () => {
    const tabs = ["First", "Second", "Third"];
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
            <Tabs
                color="whiteAlpha-900"
            >
                <TabList px={4}>
                    {tabs.map((tab) => (
                        <Tab
                            _selected={{
                                borderBottomColor: colorMode === "light" ? "green.500" : "green.200",
                                color: colorMode === "light" ? "green.500" : "green.200",
                            }}
                            key={tab}
                            mx={4}
                            px={0}
                            py={4}
                            fontWeight="semibold"
                        >
                            {tab}
                        </Tab>
                    ))}
                </TabList>
                
                <TabPanels px={4} mt={6}>
                    <TabPanel>
                    
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Card>
    );
};
