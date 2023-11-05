import Button from "@/components/UI/Button/Button";
import Loader from "@/components/UI/Loader/Loader";
import LoaderContext from "@/context/LoaderContext";
import useStores from "@/hooks/useStores";
import {Avatar, Box, Center, Flex, Heading, Stack, Text, useColorModeValue} from "@chakra-ui/react";
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
                <Box
                    h={"140px"}
                    w={"full"}
                    background={"green.500"}
                />
                <Flex justify={"center"} mt={-12}>
                    <Avatar size={"xl"}/>
                </Flex>
                <Box p={6}>
                    <Stack spacing={2} align={"center"}>
                        <Heading
                            fontSize={"2xl"}
                            fontWeight={500}
                            fontFamily={"body"}
                        >
                            {authStore.user.name}
                        </Heading>
                        <Text color={"gray.500"}>
                            {authStore.user.email}
                        </Text>
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