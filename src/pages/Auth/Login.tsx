import Button from "@/components/UI/Button/Button";
import HideButton from "@/components/UI/Button/HideButton";
import Container from "@/components/UI/Container";
import {Context} from "@/main";
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
import {FC, useContext, useState} from "react";
import {useForm} from "react-hook-form";
import {Link as RouterLink} from "react-router-dom";
import * as Yup from "yup";

type LoginForm = {
    email: string;
    password: string;
};

const Login: FC = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required("The email field is required."),
        password: Yup.string()
            .required("The password field is required."),
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginForm>({
        resolver: yupResolver(validationSchema),
    });

    const {store} = useContext(Context);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [credentials, setCredentials] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const onSubmit = async (): Promise<void> => {
        setLoading(true);
        await store.login(credentials);
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
                <Heading align={"center"} fontSize={"4xl"} textAlign={"center"}>
                    Login
                </Heading>
                <Box
                    onSubmit={handleSubmit(onSubmit)}
                    as={"form"}
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={6}
                >
                    <Stack spacing={4}>
                        <FormControl isInvalid={!!errors.email?.message}>
                            <FormLabel>E-mail</FormLabel>
                            <Input
                                {...register("email")}
                                onChange={(event) =>
                                    setCredentials({...credentials, password: event.target.value})}
                                value={credentials.password}
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
                            <Button type="submit" isLoading={isLoading}>
                                Login
                            </Button>
                        </Stack>

                        <Flex pt={6} gap={1} align={"center"}>
                            <Text>
                                Don't have an account?
                            </Text>
                            <Link
                                as={RouterLink}
                                to="/register"
                                color={"green.400"}
                            >
                                Register
                            </Link>
                        </Flex>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default Login;