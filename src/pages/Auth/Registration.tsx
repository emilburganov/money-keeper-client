import Button from "@/components/UI/Button/Button";
import HideButton from "@/components/UI/Button/HideButton";
import Container from "@/components/UI/Container/Container";
import {useStores} from "@/hooks/useStores";
import {useTranslationTrigger} from "@/hooks/useTranslationTrigger";
import {useYupResolver} from "@/hooks/useYupResolver";
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
    useColorModeValue,
} from "@chakra-ui/react";
import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import * as Yup from "yup";

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const Registration: FC = () => {
    const {t} = useTranslation();
    const {authStore} = useStores();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);
    const [credentials, setCredentials] = useState<RegisterForm>({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(() => t("validation.required", {
                field: t("pages.register.form.fields.name"),
            }))
            .min(3, () => t("validation.min", {
                field: t("pages.register.form.fields.name"),
                min: 3,
            }))
            .max(60, () => t("validation.max", {
                field: t("pages.register.form.fields.name"),
                max: 60,
            })),
        email: Yup.string()
            .required(() => t("validation.required", {
                field: t("pages.register.form.fields.email"),
            }))
            .email(() => t("validation.email")),
        password: Yup.string()
            .required(() => t("validation.required", {
                field: t("pages.register.form.fields.password"),
            }))
            .min(8, () => t("validation.min", {
                field: t("pages.register.form.fields.password"),
                min: 8,
            }))
            .max(100, () => t("validation.max", {
                field: t("pages.register.form.fields.password"),
                max: 100,
            })),
        passwordConfirmation: Yup.string()
            .required(() => t("validation.required", {
                field: t("pages.register.form.fields.passwordConfirmation"),
            }))
            .oneOf([Yup.ref("password"), null], () => t("validation.oneOf", {
                firstField: t("pages.register.form.fields.passwordConfirmation"),
                secondField: t("pages.register.form.fields.password"),
            })),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterForm>({
        resolver: useYupResolver(() => validationSchema),
    });

    const registration = async (): Promise<void> => {
        setLoading(true);

        const response = await authStore.register(credentials);
        if (response) {
            navigate("/profile");
        }

        setLoading(false);
    };

    const isInvalid = !!Object.entries(errors).length
    useTranslationTrigger(t, handleSubmit(registration), isInvalid);

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
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        {t("pages.register.form.title")}
                    </Heading>
                </Stack>
                <Box
                    onSubmit={handleSubmit(registration)}
                    as={"form"}
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={6}
                >
                    <Stack spacing={4}>

                        <FormControl isInvalid={!!errors.name?.message}>
                            <FormLabel>
                                {t("pages.register.form.fields.name")}
                            </FormLabel>
                            <Input
                                {...register("name")}
                                value={credentials.name}
                                onChange={(event) =>
                                    setCredentials({...credentials, name: event.target.value})}
                                type="text"
                                focusBorderColor={"green.400"}
                            />
                            {errors.name &&
                                <FormErrorMessage>
                                    {errors.name?.message}
                                </FormErrorMessage>
                            }
                        </FormControl>

                        <FormControl isInvalid={!!errors.email?.message}>
                            <FormLabel>
                                {t("pages.register.form.fields.email")}
                            </FormLabel>
                            <Input
                                {...register("email")}
                                value={credentials.email}
                                onChange={(event) =>
                                    setCredentials({...credentials, email: event.target.value})}
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
                                {t("pages.register.form.fields.password")}
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    {...register("password")}
                                    value={credentials.password}
                                    onChange={(event) =>
                                        setCredentials({...credentials, password: event.target.value})}
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

                        <FormControl isInvalid={!!errors.passwordConfirmation?.message}>
                            <FormLabel>
                                {t("pages.register.form.fields.passwordConfirmation")}
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    {...register("passwordConfirmation")}
                                    value={credentials.passwordConfirmation}
                                    onChange={(event) =>
                                        setCredentials({...credentials, passwordConfirmation: event.target.value})}
                                    type={showPasswordConfirmation ? "text" : "password"}
                                    focusBorderColor={"green.400"}
                                />
                                <InputRightElement h={"full"}>
                                    <HideButton
                                        show={showPasswordConfirmation}
                                        setShow={setShowPasswordConfirmation}
                                    />
                                </InputRightElement>
                            </InputGroup>
                            {errors.passwordConfirmation &&
                                <FormErrorMessage>
                                    {errors.passwordConfirmation?.message}
                                </FormErrorMessage>
                            }
                        </FormControl>

                        <Stack spacing={10} pt={2}>
                            <Button
                                isLoading={isLoading}
                                type="submit"
                                size="lg"
                            >
                                {t("pages.register.form.button")}
                            </Button>
                        </Stack>

                        <Flex
                            pt={6}
                            align={"center"}
                            wrap={"wrap"}
                            gap={1}
                        >
                            {t("pages.register.form.redirect")}
                            <Link
                                as={RouterLink}
                                to="/login"
                                color={"green.400"}
                            >
                                {t("pages.login.form.button")}
                            </Link>
                        </Flex>

                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default Registration;