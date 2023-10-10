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
    useColorModeValue,
} from "@chakra-ui/react";
import {FC, useContext, useState} from "react";
import {Link as RouterLink} from "react-router-dom";

const Register: FC = () => {
    const {store} = useContext(Context);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const register = async (event) => {
        event.preventDefault();

        await store.register(credentials);
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
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>

                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                value={credentials.name}
                                onChange={(event) =>
                                    setCredentials({...credentials, name: event.target.value})}
                                type="text"
                            />
                        </FormControl>

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

                        <FormControl id="password_confirmation" isRequired>
                            <FormLabel>Password Confirmation</FormLabel>
                            <InputGroup>
                                <Input
                                    value={credentials.passwordConfirmation}
                                    onChange={(event) =>
                                        setCredentials({...credentials, passwordConfirmation: event.target.value})}
                                    type={showPasswordConfirmation ? "text" : "password"}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() =>
                                            setShowPasswordConfirmation((showPasswordConfirmation) =>
                                                !showPasswordConfirmation)}
                                    >
                                        {showPasswordConfirmation ? <ViewIcon/> : <ViewOffIcon/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={register}
                                loadingText="Submitting"
                                size="lg"
                                bg={"green.400"}
                                color={"white"}
                                _hover={{
                                    bg: "green.500",
                                }}
                            >
                                Register
                            </Button>
                        </Stack>

                        <Stack pt={6}>
                            <Flex gap={1} align={"center"}>
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

                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default Register;