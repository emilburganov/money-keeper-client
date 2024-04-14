import { UpdateUserSchema, useAuthStore } from "@/entities/auth";
import { useCurrencyStore } from "@/entities/currency";
import { UpdateUserButton } from "@/features/(auth)";
import { UpdateUserCredentials } from "@/shared/api/auth";
import { BACKEND_URL } from "@/shared/config";
import { Spinner } from "@/shared/ui/(spinner)/spinner";
import {
	Avatar,
	AvatarBadge,
	Box,
	Card,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Select,
	Stack,
	useColorMode,
	VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import i18n from "i18next";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const Sidebar = observer(() => {
	const { t } = useTranslation();
	const { currencies, getCurrencies } = useCurrencyStore();
	const { user } = useAuthStore();
	const { colorMode } = useColorMode();
	const [isLoading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			setLoading(true);
			await getCurrencies();
			setLoading(false);
		})();
	}, []);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<UpdateUserCredentials>({
		resolver: yupResolver(UpdateUserSchema),
		defaultValues: {
			name: user.name,
			email: user.email,
			currency_id: user.currency?.id,
		},
	});

	const handleChangeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setValue("avatar", event.target.files[0]);
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Card
			minW={250}
			p={4}
			mr={{ base: 0, md: 5 }}
			mb={{ base: 5, md: 0 }}
			bg={colorMode === "light" ? "gray.50" : "gray.700"}
			rounded="md"
			h="fit-content"
		>
			<Box
				w="full"
				minW={{ md: "sm", sm: "full" }}
				as="form"
				rounded="lg"
				bg={colorMode === "light" ? "gray.50" : "gray.700"}
			>
				<VStack spacing={3}>
					<Avatar
						borderRadius="full"
						position="relative"
						src={BACKEND_URL + user.avatar}
						name={user.name}
						size="2xl"
						cursor="pointer"
						bg={colorMode === "light" ? "green.500" : "green.200"}
					>
						<AvatarBadge
							borderColor={colorMode === "light" ? "gray.50" : "gray.700"}
							bg={colorMode === "light" ? "green.500" : "green.200"}
							boxSize="1em"
						>
							<svg width="0.4em" fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
								/>
							</svg>
						</AvatarBadge>
					</Avatar>
					<Input
						onChange={handleChangeAvatar}
						type="file"
						position="absolute"
						w={136}
						h={132}
						opacity={0}
						cursor="pointer"
					/>
					<Stack spacing={4} w="full">
						<FormControl isInvalid={!!errors.name?.message}>
							<FormLabel>
								{t("pages.profile.updateForm.fields.name")}:
							</FormLabel>
							<Input
								{...register("name")}
								type="text"
								placeholder="Username"
								focusBorderColor={
									colorMode === "light" ? "green.500" : "green.200"
								}
							/>
							{errors.name && (
								<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={!!errors.email?.message}>
							<FormLabel>
								{t("pages.registration.form.fields.email")}:
							</FormLabel>
							<Input
								{...register("email")}
								type="text"
								placeholder="Example@gmail.com"
								focusBorderColor={
									colorMode === "light" ? "green.500" : "green.200"
								}
							/>
							{errors.email && (
								<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
							)}
						</FormControl>
						<FormControl isInvalid={!!errors.currency_id?.message}>
							<FormLabel>
								{t("pages.accounts.createModal.form.fields.currency")}:
							</FormLabel>
							<Select
								{...register("currency_id")}
								focusBorderColor={
									colorMode === "light" ? "green.500" : "green.200"
								}
							>
								{currencies.map(({ id, code, title }) => (
									<option key={id} value={id}>
										{i18n.language === "ru" ? title : code}
									</option>
								))}
							</Select>
							{errors.currency_id && (
								<FormErrorMessage>
									{errors.currency_id?.message}
								</FormErrorMessage>
							)}
						</FormControl>
						<Stack spacing={10} pt={2}>
							<UpdateUserButton handleSubmit={handleSubmit} />
						</Stack>
					</Stack>
				</VStack>
			</Box>
		</Card>
	);
});
