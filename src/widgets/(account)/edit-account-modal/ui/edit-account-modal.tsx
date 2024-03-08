import { AccountSchema } from "@/entities/account";
import { useCurrencyStore } from "@/entities/currency";
import { UpdateAccountButton } from "@/features/(account)";
import { Account, AccountBody } from "@/shared/api/account";
import {
	Box,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Select,
	Stack,
	useColorMode,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface EditAccountModalProps {
	account: Account;
	isOpen: boolean;
	onClose: () => void;
}

export const EditAccountModal = observer(
	({ account, isOpen, onClose }: EditAccountModalProps) => {
		const { currencies, getCurrencies } = useCurrencyStore();
		const { t } = useTranslation();
		const { colorMode } = useColorMode();

		const {
			register,
			handleSubmit,
			reset,
			formState: { errors, isValid },
		} = useForm<AccountBody>({
			resolver: yupResolver(AccountSchema),
		});

		useEffect(() => {
			(async () => {
				await getCurrencies();
			})();
		}, []);

		return (
			<Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
				<ModalOverlay />
				<ModalContent maxW={{ base: "calc(100% - 32px)", sm: 400 }}>
					<ModalHeader pt={5} px={5} pb={0}>
						{t("pages.accounts.editModal.form.title")}
					</ModalHeader>
					<ModalCloseButton top={5} right={5} />
					<Flex direction="column" gap={4}>
						<Box
							rounded={"lg"}
							bg={colorMode === "light" ? "gray.50" : "gray.700"}
							boxShadow={"lg"}
							p={5}
						>
							<Stack spacing={4}>
								<FormControl isInvalid={!!errors.title?.message}>
									<FormLabel>
										{t("pages.accounts.editModal.form.fields.title")}:
									</FormLabel>
									<Input
										{...register("title")}
										defaultValue={account.title}
										type="text"
										focusBorderColor={
											colorMode === "light" ? "green.500" : "green.200"
										}
										placeholder={t(
											"pages.accounts.editModal.form.placeholders.title",
										)}
									/>
									{errors.title && (
										<FormErrorMessage>{errors.title?.message}</FormErrorMessage>
									)}
								</FormControl>
								<FormControl isInvalid={!!errors.currency_id?.message}>
									<FormLabel>
										{t("pages.accounts.editModal.form.fields.currency")}:
									</FormLabel>
									<Select
										{...register("currency_id")}
										defaultValue={account.currency.id}
										focusBorderColor={
											colorMode === "light" ? "green.500" : "green.200"
										}
									>
										{currencies.map(({ id, code }) => (
											<option key={id} value={id}>
												{t(`models.currency.${code}`)}
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
									<UpdateAccountButton
										id={account.id}
										reset={reset}
										isValid={isValid}
										handleSubmit={handleSubmit}
										onSubmit={onClose}
									/>
								</Stack>
							</Stack>
						</Box>
					</Flex>
				</ModalContent>
			</Modal>
		);
	},
);
