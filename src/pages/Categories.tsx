import Container from "@/components/UI/Container/Container";
import {Box, Flex, Heading, Stack} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const Categories = () => {
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
                    Categories
                </Heading>
            </Stack>
        </Container>
    );
};

export default Categories;