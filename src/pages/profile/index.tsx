import { Container } from "@/shared/ui/(container)/container";
import { Content, Sidebar } from "@/widgets/(profile)";
import { Box, ScaleFade } from "@chakra-ui/react";

export default function Profile() {
  return (
    <Container>
      <ScaleFade initialScale={0.9} in={true}>
        <Box display={{ base: "block", md: "flex" }} pt={2}>
          <Sidebar />
          <Content />
        </Box>
      </ScaleFade>
    </Container>
  );
}
