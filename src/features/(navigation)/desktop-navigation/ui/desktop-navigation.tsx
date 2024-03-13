import { useAuthStore } from "@/entities/auth";
import {
	Box,
	Popover,
	PopoverTrigger,
	Stack,
	useColorMode,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const DesktopNavigation = observer(() => {
	const { t } = useTranslation();
	const { isAuth } = useAuthStore();
	const { colorMode } = useColorMode();

	const PRIVATE_NAV_ITEMS = [
		{
			label: t("header.navigation.categories"),
			to: "/categories",
		},
		{
			label: t("header.navigation.incomes"),
			to: "/incomes",
		},
		{
			label: t("header.navigation.expenses"),
			to: "/expenses",
		},
		{
			label: t("header.navigation.transfers"),
			to: "/transfers",
		},
		{
			label: t("header.navigation.accounts"),
			to: "/accounts",
		},
	];

	const PUBLIC_NAV_ITEMS = [
		{
			label: t("header.navigation.home"),
			to: "/",
		},
	];

	return (
		<Stack direction={"row"} spacing={2}>
			{!isAuth &&
				PUBLIC_NAV_ITEMS.map(({ label, to }) => (
					<Box key={label}>
						<Popover trigger={"hover"} placement={"bottom-start"}>
							<PopoverTrigger>
								<Box
									key={label}
									as={Link}
									to={to}
									p={2}
									fontSize={"sm"}
									fontWeight={500}
									color={colorMode === "light" ? "gray.600" : "gray.200"}
									_hover={{
										textDecoration: "none",
										color: colorMode === "light" ? "gray.800" : "gray.50",
									}}
								>
									{label}
								</Box>
							</PopoverTrigger>
						</Popover>
					</Box>
				))}

			{isAuth &&
				PRIVATE_NAV_ITEMS.map(({ label, to }) => (
					<Box key={label}>
						<Popover trigger={"hover"} placement={"bottom-start"}>
							<PopoverTrigger>
								<Box
									key={label}
									as={Link}
									to={to}
									p={2}
									fontSize={"sm"}
									fontWeight={500}
									color={colorMode === "light" ? "gray.600" : "gray.200"}
									_hover={{
										textDecoration: "none",
										color: colorMode === "light" ? "gray.800" : "gray.50",
									}}
								>
									{label}
								</Box>
							</PopoverTrigger>
						</Popover>
					</Box>
				))}
		</Stack>
	);
});
