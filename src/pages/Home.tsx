import Button from "@/components/UI/Button/Button";
import Container from "@/components/UI/Container/Container";
import {Box, Heading, Stack, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <Container maxW={"3xl"}>
            <Stack
                as={Box}
                textAlign={"center"}
                spacing={{base: 8, md: 14}}
                py={{base: 20, md: 36}}
            >
                <Heading
                    fontWeight={600}
                    fontSize={{base: "2xl", sm: "4xl", md: "6xl"}}
                    lineHeight={"110%"}
                >
                    Financial control <br/>
                    <Text as={"span"} color={"green.400"}>
                        made easy
                    </Text>
                </Heading>
                <Text color={"gray.500"}>
                    Control your expenses and income with our application.
                </Text>
                <Stack
                    direction={"column"}
                    spacing={3}
                    align={"center"}
                    alignSelf={"center"}
                    position={"relative"}
                >
                    <Button
                        as={Link}
                        to="/register"
                        rounded={"full"}
                        px={6}
                    >
                        Get Started
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
};

export default Home;