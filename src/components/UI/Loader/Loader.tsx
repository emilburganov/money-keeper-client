import Container from "@/components/UI/Container/Container";
import {Flex, Spinner, Stack} from "@chakra-ui/react";
import {FC} from "react";

const Loader: FC = () => {
    return (
        <Container as={Flex}>
            <Stack
                justify={"center"}
                minH={"100vh"}
                mx={"auto"}
            >
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="green.500"
                    size="xl"
                />
            </Stack>
        </Container>
    );
};

export default Loader;