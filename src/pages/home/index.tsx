import { Button } from "@/shared/ui/(button)/button";
import { Container } from "@/shared/ui/(container)/container";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Hero() {
	const { t } = useTranslation();

	return (
		<Container as={Flex} align={"center"} justify={"center"} maxW={"3xl"}>
			<Stack
				as={Box}
				textAlign={"center"}
				spacing={{ base: 8, md: 10 }}
				py={{ base: 20, md: 36 }}
			>
				<Heading
					fontWeight={600}
					fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
					lineHeight={"110%"}
				>
					{t("pages.hero.title.main")}
					<br />
					<Text as={"span"} colorScheme={"green"}>
						{t("pages.hero.title.highlighted")}
					</Text>
				</Heading>
				<Text color={"gray.500"}>{t("pages.hero.subtitle")}</Text>
				<Stack
					direction={"column"}
					spacing={2}
					align={"center"}
					alignSelf={"center"}
					position={"relative"}
				>
					<Button fontSize="md" as={Link} to="/registration" px={6}>
						{t("pages.hero.button")}
					</Button>
				</Stack>
			</Stack>
		</Container>
	);
}
