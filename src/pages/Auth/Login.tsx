import Button from "@/components/UI/Button/Button";
import HideButton from "@/components/UI/Button/HideButton";
import Container from "@/components/UI/Container/Container";
import {useStores} from "@/hooks/useStores";
import {useTranslationTrigger} from "@/hooks/useTranslationTrigger";
import {
    Box,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import {yupResolver} from "@hookform/resolvers/yup";
import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import * as Yup from "yup";

interface LoginForm {
    email: string;
    password: string;
}

const Login: FC = () => {
    const {t} = useTranslation();
    const {authStore} = useStores();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [credentials, setCredentials] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(() => t("validation.required", {
                field: t("pages.login.form.fields.email"),
            })),
        password: Yup.string()
            .required(() => t("validation.required", {
                field: t("pages.login.form.fields.password"),
            })),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginForm>({
        resolver: yupResolver(validationSchema),
    });

    const login = async (): Promise<void> => {
        setLoading(true);

        const response = await authStore.login(credentials);
        if (response) {
            navigate("/profile");
        }

        setLoading(false);
    };

    useTranslationTrigger(t, handleSubmit(login));

    return (
        <Container>
            <Stack
                align={"canter"}
                justify={"center"}
                minH={"100vh"}
                maxW={"lg"}
                spacing={8}
                mx={"auto"}
                py={6}
            >
                <Heading align={"center"} fontSize={"4xl"} textAlign={"center"}>
                    {t("pages.login.form.title")}
                </Heading>
                <Box
                    onSubmit={handleSubmit(login)}
                    as={"form"}
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={6}
                >
                    <Stack spacing={4}>

                        <FormControl isInvalid={!!errors.email?.message}>
                            <FormLabel>
                                {t("pages.login.form.fields.email")}
                            </FormLabel>
                            <Input
                                {...register("email")}
                                onChange={(event) =>
                                    setCredentials({...credentials, email: event.target.value})}
                                value={credentials.email}
                                type="text"
                                focusBorderColor={"green.400"}
                            />
                            {errors.email &&
                                <FormErrorMessage>
                                    {errors.email?.message}
                                </FormErrorMessage>
                            }
                        </FormControl>

                        <FormControl isInvalid={!!errors.password?.message}>
                            <FormLabel>
                                {t("pages.login.form.fields.password")}
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    {...register("password")}
                                    onChange={(event) =>
                                        setCredentials({...credentials, password: event.target.value})}
                                    value={credentials.password}
                                    type={showPassword ? "text" : "password"}
                                    focusBorderColor={"green.400"}
                                />
                                <InputRightElement h={"full"}>
                                    <HideButton
                                        show={showPassword}
                                        setShow={setShowPassword}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            {errors.password &&
                                <FormErrorMessage>
                                    {errors.password?.message}
                                </FormErrorMessage>
                            }
                        </FormControl>

                        <Stack spacing={10} pt={2}>
                            <Button
                                isLoading={isLoading}
                                type="submit"
                                size="lg"
                            >
                                {t("pages.login.form.button")}
                            </Button>
                        </Stack>

                        <Flex pt={6} gap={1} align={"center"}>
                            <Text>
                                {t("pages.login.form.redirect")}
                            </Text>
                            <Link
                                as={RouterLink}
                                to="/register"
                                color={"green.400"}
                            >
                                {t("pages.register.form.button")}
                            </Link>
                        </Flex>

                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default Login;