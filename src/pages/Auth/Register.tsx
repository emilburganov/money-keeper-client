import Button from "@/components/UI/Button/Button";
import HideButton from "@/components/UI/Button/HideButton";
import Container from "@/components/UI/Container/Container";
import {useStores} from "@/hooks/useStores";
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
import {yupResolver} from "@hookform/resolvers/yup";
import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import * as Yup from "yup";

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};

const Register: FC = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("The name field is required.")
            .min(3, "The name field must be at least 8 characters.")
            .max(60, "The name field must not be greater than 100 characters."),
        email: Yup.string()
            .required("The email field is required.")
            .email("The email field must be a valid email address."),
        password: Yup.string()
            .required("The password field is required.")
            .min(8, "The password field must be at least 8 characters.")
            .max(100, "The password field must not be greater than 100 characters."),
        passwordConfirmation: Yup.string()
            .required("The password confirmation field is required.")
            .oneOf([Yup.ref("password"), null], "The password confirmation field must match password."),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterForm>({
        resolver: yupResolver(validationSchema),
    });

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

    const onSubmit = async (): Promise<void> => {
        setLoading(true);

        const response = await authStore.register(credentials);
        if (response) {
            navigate("/profile");
        }

        setLoading(false);
    };

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
                        Register
                    </Heading>
                </Stack>
                <Box
                    onSubmit={handleSubmit(onSubmit)}
                    as={"form"}
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={6}
                >
                    <Stack spacing={4}>

                        <FormControl isInvalid={!!errors.name?.message}>
                            <FormLabel>Name</FormLabel>
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
                            <FormLabel>E-mail</FormLabel>
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
                            <FormLabel>Password</FormLabel>
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
                            <FormLabel>Password Confirmation</FormLabel>
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
                                Register
                            </Button>
                        </Stack>

                        <Flex pt={6} gap={1} align={"center"}>
                            Already have an account?
                            <Link
                                as={RouterLink}
                                to="/login"
                                color={"green.400"}
                            >
                                Login
                            </Link>
                        </Flex>

                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default Register;