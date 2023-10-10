import Container from "@/components/UI/Container";
import {Context} from "@/main";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    FormControl,
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
import {FC, useContext, useState} from "react";
import {Link as RouterLink} from "react-router-dom";

const Login: FC = () => {
    const {store} = useContext(Context);
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const login = async (event) => {
        event.preventDefault();

        await store.login(credentials);
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
                        Login
                    </Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={6}
                >
                    <Stack spacing={4}>

                        <FormControl id="email" isRequired>
                            <FormLabel>E-mail</FormLabel>
                            <Input
                                value={credentials.email}
                                onChange={(event) =>
                                    setCredentials({...credentials, email: event.target.value})}
                                type="email"
                            />
                        </FormControl>

                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    value={credentials.password}
                                    onChange={(event) =>
                                        setCredentials({...credentials, password: event.target.value})}
                                    type={showPassword ? "text" : "password"}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                                    >
                                        {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={login}
                                loadingText="Submitting"
                                size="lg"
                                bg={"green.400"}
                                color={"white"}
                                _hover={{
                                    bg: "green.500",
                                }}
                            >
                                Login
                            </Button>
                        </Stack>

                        <Stack pt={6}>
                            <Flex gap={1} align={"center"}>
                                <Text>Don't have an account?</Text>
                                <Link
                                    as={RouterLink}
                                    to="/register"
                                    color={"green.400"}
                                >
                                    Register
                                </Link>
                            </Flex>
                        </Stack>

                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default Login;