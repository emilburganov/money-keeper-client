import Button from "@/components/UI/Button/Button";
import useStores from "@/hooks/useStores";
import {Avatar, Box, Center, Flex, Heading, Image, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const ProfileCard = observer(() => {
    const {t} = useTranslation();
    const {authStore} = useStores();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(false);

    const logout = async (): Promise<void> => {
        setLoading(true);
        await authStore.logout();
        navigate("/login");
        setLoading(false);
    };

    const getUser = async (): Promise<void> => {
        await authStore.me();
    };

    useEffect(() => {
        getUser();
    }, []);

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
                    <Stack spacing={0} align={"center"} mb={5}>
                        <Heading
                            fontSize={"2xl"}
                            fontWeight={500}
                            fontFamily={"body"}
                        >
                            Emil Burganov
                        </Heading>
                        <Text color={"gray.500"}>
                            Lorem ipsum dolor sit.
                        </Text>
                    </Stack>
                    <Stack
                        direction={"row"}
                        justify={"center"}
                        spacing={6}
                    >
                        <Stack spacing={0} align={"center"}>
                            <Text fontWeight={600}>
                                99k
                            </Text>
                            <Text fontSize={"sm"} color={"gray.500"}>
                                Examples
                            </Text>
                        </Stack>
                        <Stack spacing={0} align={"center"}>
                            <Text fontWeight={600}>
                                99k
                            </Text>
                            <Text fontSize={"sm"} color={"gray.500"}>
                                Examples
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