import Button from "@/components/UI/Button/Button";
import Loader from "@/components/UI/Loader/Loader";
import LoaderContext from "@/context/LoaderContext";
import useStores from "@/hooks/useStores";
import {Avatar, Box, Center, Flex, Heading, Image, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {FC, useContext, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const ProfileCard: FC = observer(() => {
    const {t} = useTranslation();
    const {authStore} = useStores();
    const navigate = useNavigate();
    const {isLoading, setLoading} = useContext(LoaderContext);

    const logout = async () => {
        await authStore.logout();
        navigate("/login");
    };

    const me = async () => {
        setLoading(true);
        await authStore.me();
        setLoading(false);
    };

    useEffect(() => {
        me();
    }, []);

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <Center py={6} maxW={"400px"} w={"full"}>
            <Box
                w={"full"}
                bg={useColorModeValue("white", "gray.800")}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
            >
                <Image
                    h={"140px"}
                    w={"full"}
                    src={
                        "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    }
                    objectFit="cover"
                    alt="profile-background"
                />
                <Flex justify={"center"} mt={-12}>
                    <Avatar
                        size={"xl"}
                        css={{
                            border: "2px solid white",
                        }}
                    />
                </Flex>
                <Box p={6}>
                    <Stack spacing={2} align={"center"} mb={5}>
                        <Heading
                            fontSize={"2xl"}
                            fontWeight={500}
                            fontFamily={"body"}
                        >
                            {authStore.user.name}
                        </Heading>
                        <Text color={'gray.500'}>
                            {authStore.user.email}
                        </Text>
                    </Stack>
                    <Stack
                        direction={"row"}
                        justify={"center"}
                        spacing={6}
                    >
                        <Stack spacing={0} align={"center"}>
                            <Text fontWeight={600} color={"green.500"}>
                                99k
                            </Text>
                            <Text fontSize={"sm"} color={"gray.500"}>
                                Incomes
                            </Text>
                        </Stack>
                        <Stack spacing={0} align={"center"}>
                            <Text fontWeight={600} color={"red.500"}>
                                99k
                            </Text>
                            <Text fontSize={"sm"} color={"gray.500"}>
                                Expenses
                            </Text>
                        </Stack>
                    </Stack>
                    <Button
                        isLoading={isLoading}
                        onClick={logout}
                        w={"full"}
                        size={"md"}
                        mt={8}
                    >
                        {t("pages.profile.logout")}
                    </Button>
                </Box>
            </Box>
        </Center>
    );
});

export default ProfileCard;