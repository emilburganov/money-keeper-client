import Button from "@/components/UI/Button/Button";
import Container from "@/components/UI/Container/Container";
import {Box, Flex, Heading, Stack, Text} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const Home = () => {
    const {t} = useTranslation();

    return (
        <Container
            as={Flex}
            align={"center"}
            justify={"center"}
            maxW={"3xl"}
        >
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
                    {t("pages.hero.title.main")}
                    <br/>
                    <Text as={"span"} color={"green.400"}>
                        {t("pages.hero.title.highlighted")}
                    </Text>
                </Heading>
                <Text color={"gray.500"}>
                    {t("pages.hero.subtitle")}
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
                        to="/registration"
                        rounded={"full"}
                        px={6}
                    >
                        {t("pages.hero.button")}
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
};

export default Home;