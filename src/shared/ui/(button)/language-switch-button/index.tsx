import {
	Button,
	Flex,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Stack,
	useColorMode,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const LanguageSwitchButton = () => {
	const { t, i18n } = useTranslation();
	const { colorMode } = useColorMode();

	const switchLanguage = async (language: string) => {
		await i18n.changeLanguage(language);
		localStorage.setItem("lang", language);
	};

	return (
		<Flex justifyContent="center">
			<Popover placement="bottom" isLazy>
				{({ onClose }) => (
					<>
						<PopoverTrigger>
							<Flex
								align="center"
								justify="center"
								w="40px"
								h="40px"
								cursor="pointer"
								borderRadius="10px"
							>
								{i18n.language === "en" && (
									<img
										src="/assets/icons/english-flag.svg"
										alt="english-flag-icon"
									/>
								)}
								{i18n.language === "ru" && (
									<img
										src="/assets/icons/russian-flag.svg"
										alt="russian-flag-icon"
									/>
								)}
							</Flex>
						</PopoverTrigger>
						<PopoverContent
							marginRight={4}
							w="fit-content"
							_focus={{ boxShadow: "none" }}
						>
							<PopoverArrow marginLeft={2} />
							<PopoverBody p={2}>
								<Stack align="baseline" onClick={onClose}>
									<Button
										onClick={() => switchLanguage("ru")}
										color={colorMode === "light" ? "gray.600" : "gray.200"}
										display="flex"
										justifyContent="start"
										w="full"
										variant="ghost"
										gap={2}
										p={2}
										fontSize="14px"
									>
										<img
											src="/assets/icons/russian-flag.svg"
											alt="russian-flag-icon"
										/>
										{t("header.buttons.lang.ru")}
									</Button>
									<Button
										onClick={() => switchLanguage("en")}
										color={colorMode === "light" ? "gray.600" : "gray.200"}
										display="flex"
										justifyContent="start"
										w="full"
										variant="ghost"
										gap={2}
										p={2}
										fontSize="14px"
									>
										<img
											src="/assets/icons/english-flag.svg"
											alt="english-flag-icon"
										/>
										{t("header.buttons.lang.en")}
									</Button>
								</Stack>
							</PopoverBody>
						</PopoverContent>
					</>
				)}
			</Popover>
		</Flex>
	);
};
