import { useAuthStore } from "@/entities/auth";
import { useCurrencyStore } from "@/entities/currency";
import { useUserStore } from "@/entities/user";
import { Avatar, Card, Heading, Select, Stack, Text, useColorMode, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";

export const Sidebar = observer(() => {
    const {currencies, getCurrencies} = useCurrencyStore();
    const {balance, getBalance} = useUserStore();
    const {user, load} = useAuthStore();
    const {colorMode} = useColorMode();
    const [currency, setCurrency] = useState<string>(localStorage.getItem("currency") ?? "1");
    const [isLoading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        (async () => {
            setLoading(true);
            await getCurrencies();
            await load();
            await getBalance(currency);
            setLoading(false);
        })();
    }, []);
    
    useEffect(() => {
        (async () => {
            await getBalance(currency);
        })();
    }, [currency]);
    
    const changeCurrency = (event: ChangeEvent<HTMLSelectElement>) => {
        setCurrency(event.target.value);
    };
    
    if (isLoading) {
        return;
    }
    
    return (
        <Card
            minW={250}
            p={4}
            mr={{base: 0, md: 5}}
            mb={{base: 5, md: 0}}
            bg={colorMode === "light" ? "gray.50" : "gray.700"}
            rounded="md"
        >
            <VStack spacing={3}>
                <Avatar size="xl" name={user.name}/>
                <Stack spacing={2} align="center" mb={2}>
                    <Heading fontSize="xl" fontWeight={500} fontFamily="body">
                        {user.name}
                    </Heading>
                    <Text fontSize="sm" color={colorMode === "light" ? "gray.600" : "gray.200"}>
                        {user.email}
                    </Text>
                </Stack>
                
                <Stack direction="row" spacing={6} mb={2}>
                    <Stack spacing={0} align="center">
                        <Text fontWeight={600}>
                            {balance.incomes}
                        </Text>
                        <Text fontSize="sm" color={colorMode === "light" ? "gray.600" : "gray.200"}>
                            Incomes
                        </Text>
                    </Stack>
                    <Stack spacing={0} align="center">
                        <Text fontWeight={600}>
                            {balance.expenses}
                        </Text>
                        <Text fontSize="sm" color={colorMode === "light" ? "gray.600" : "gray.200"}>
                            Expenses
                        </Text>
                    </Stack>
                    <Stack spacing={0} align="center">
                        <Text fontWeight={600}>
                            {balance.total}
                        </Text>
                        <Text fontSize="sm" color={colorMode === "light" ? "gray.600" : "gray.200"}>
                            Total
                        </Text>
                    </Stack>
                </Stack>
                <Select
                    onChange={changeCurrency}
                    defaultValue={1}
                    focusBorderColor={
                        colorMode === "light" ? "green.500" : "green.200"
                    }
                >
                    {currencies.map((currency) =>
                        <option key={currency.id} value={currency.id}>
                            {currency.title}
                        </option>
                    )}
                </Select>
            </VStack>
        </Card>
    );
});
