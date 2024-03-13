import { useAuthStore } from "@/entities/auth";
import { LogoutButton } from "@/features/(auth)";
import { DesktopNavigation, MobileNavigation } from "@/features/(navigation)";
import { LanguageSwitchButton } from "@/features/language-switch-button";
import { Button } from "@/shared/ui/(button)/button";
import { LinkButton } from "@/shared/ui/(button)/link-button";
import { ThemeSwitchButton } from "@/shared/ui/(button)/theme-switch-button";
import { Logo } from "@/shared/ui/(logo)/logo";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
	Box,
	Collapse,
	Flex,
	Hide,
	IconButton,
	Stack,
	useColorMode,
	useDisclosure,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Header = observer(() => {
	const { isOpen, onToggle } = useDisclosure();
	const { t } = useTranslation();
	const { isAuth } = useAuthStore();
	const { colorMode } = useColorMode();

	return (
		<Box
			borderBottom={1}
			borderStyle={"solid"}
			borderColor={colorMode === "light" ? "gray.200" : "gray.900"}
			bg={colorMode === "light" ? "gray.50" : "gray.700"}
		>
			<Flex
				color={colorMode === "light" ? "gray.600" : "gray.50"}
				minH={"60px"}
				p={4}
				align={"center"}
				justify={"space-between"}
				maxW={"container.xl"}
				margin={"auto"}
			>
				<Flex ml={{ base: -2 }} display={{ base: "flex", xl: "none" }}>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
						}
						variant={"ghost"}
						aria-label={"Toggle Navigation"}
					/>
				</Flex>
				<Flex align={"center"} justify={{ base: "center", xl: "start" }}>
					<Logo />
					<Flex display={{ base: "none", xl: "flex" }} ml={10}>
						<DesktopNavigation />
					</Flex>
				</Flex>
				<Stack
					as={Flex}
					justify={"flex-end"}
					align={"center"}
					direction={"row"}
					spacing={3}
				>
					{isAuth ? (
						<LogoutButton />
					) : (
						<>
							<LinkButton
								as={Link}
								to="/login"
								display={{ base: "none", xl: "flex" }}
							>
								{t("header.buttons.auth.login")}
							</LinkButton>
							<Button
								as={Link}
								to="/registration"
								fontSize={"sm"}
								size={"md"}
								display={{ base: "none", xl: "flex" }}
							>
								{t("header.buttons.auth.registration")}
							</Button>
						</>
					)}
					<Hide below="sm">
						<ThemeSwitchButton />
					</Hide>
					<LanguageSwitchButton />
				</Stack>
			</Flex>
			<Collapse in={isOpen} animateOpacity>
				<MobileNavigation onToggle={onToggle} />
			</Collapse>
		</Box>
	);
});
