import { Container } from "@/shared/ui/(container)/container";
import { RegistrationForm } from "@/widgets/(auth)";
import { Heading, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function Registration() {
	const { t } = useTranslation();

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
						{t("pages.registration.form.title")}
					</Heading>
				</Stack>
				<RegistrationForm />
			</Stack>
		</Container>
	);
}
