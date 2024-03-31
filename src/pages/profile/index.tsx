import { Container } from "@/shared/ui/(container)/container";
import { Sidebar, Content } from "@/widgets/(profile)";
import { Box, } from "@chakra-ui/react";

export default function Profile() {
    return (
        <Container>
            <Box display={{base: "block", md: "flex"}} pt={2}>
                <Sidebar/>
                <Content/>
            </Box>
        </Container>
    );
}
