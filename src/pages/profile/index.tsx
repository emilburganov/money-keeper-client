import { useAuthStore } from "@/entities/auth";
import { useCurrencyStore } from "@/entities/currency";
import { useUserStore } from "@/entities/user";
import { Spinner } from "@/shared/ui/(spinner)/spinner";
import {
    Avatar,
    Box,
    Center,
    Flex,
    FormControl,
    Heading,
    Image,
    Select,
    Stack,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Profile() {
    const {currencies, getCurrencies} = useCurrencyStore();
    const {balance, getBalance} = useUserStore();
    const {user, load} = useAuthStore();
    const [isLoading, setLoading] = useState<boolean>(false);
    const {i18n} = useTranslation();
    const {colorMode} = useColorMode();
    const [currency, setCurrency] = useState<string>(localStorage.getItem("currency") ?? "1");
    
    const changeCurrency = (event: ChangeEvent<HTMLSelectElement>) => {
        setCurrency(event.target.value);
        localStorage.setItem("currency", currency);
    }
    
    
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
            setLoading(true);
            await getBalance(currency);
            setLoading(false);
        })();
    }, [currency]);
    
    if (isLoading) {
        return <Spinner/>;
    }
    
    return (
        <Center py={6}>
            <Box
                maxW={"270px"}
                w={"full"}
                bg={colorMode === "light" ? "white" : "gray.800"}
                boxShadow={"md"}
                rounded={"md"}
                overflow={"hidden"}
            >
                <Image
                    h={"120px"}
                    w={"full"}
                    backgroundColor={colorMode === "light" ? "green.500" : "green.200"}
                    objectFit="cover"
                />
                <Flex justify={"center"} mt={-12}>
                    <Avatar
                        size={"xl"}
                        src={
                            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                        }
                        css={{
                            border: "2px solid white",
                        }}
                    />
                </Flex>
                
                <Box p={6}>
                    <Stack spacing={0} align={"center"} mb={6}>
                        <Heading fontSize={"xl"} fontWeight={500} fontFamily={"body"}>
                            {user.name}
                        </Heading>
                        <Text color={"gray.500"}>
                            {user.email}
                        </Text>
                    </Stack>
                    <Stack spacing={6}>
                        <FormControl>
                            <Select
                                onChange={changeCurrency}
                                focusBorderColor={
                                    colorMode === "light" ? "green.500" : "green.200"
                                }
                            >
                                {currencies.map(({ id, code, title }) => (
                                    <option key={id} value={id}>
                                        {i18n.language === "ru" ? title : code}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <Stack direction={"row"} justify={"space-between"} spacing={6}>
                            <Stack spacing={0} align={"center"}>
                                <Text fontWeight={600}>
                                    {balance.incomes}
                                </Text>
                                <Text fontSize={"sm"} color={"gray.500"}>
                                    Incomes
                                </Text>
                            </Stack>
                            <Stack spacing={0} align={"center"}>
                                <Text fontWeight={600}>{balance.expenses}</Text>
                                <Text fontSize={"sm"} color={"gray.500"}>
                                    Expenses
                                </Text>
                            </Stack>
                            <Stack spacing={0} align={"center"}>
                                <Text fontWeight={600}>{balance.total}</Text>
                                <Text fontSize={"sm"} color={"gray.500"}>
                                    Total
                                </Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </Center>
    );
}
