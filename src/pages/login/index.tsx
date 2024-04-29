import { Container } from "@/shared/ui/(container)/container";
import { LoginForm } from "@/widgets/(auth)";
import { Heading, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();

  return (
    <Container>
      <Stack
        align="canter"
        justify="center"
        minH="100vh"
        maxW="lg"
        spacing={8}
        mx="auto"
        py={6}
      >
        <Heading fontSize="4xl" textAlign="center">
          {t("pages.login.form.title")}
        </Heading>
        <LoginForm />
      </Stack>
    </Container>
  );
}
