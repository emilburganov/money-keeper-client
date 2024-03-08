import { useAccountStore } from "@/entities/account";
import { useCategoryStore } from "@/entities/category";
import { ExpenseSchema } from "@/entities/expense";
import { UpdateExpenseButton } from "@/features/(expense)";
import { Expense, ExpenseBody } from "@/shared/api/expense";
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
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	Stack,
	useColorMode,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface EditExpenseModalProps {
	expense: Expense;
	isOpen: boolean;
	onClose: () => void;
}

export const EditExpenseModal = observer(
	({ expense, isOpen, onClose }: EditExpenseModalProps) => {
		const { accounts, getAccounts } = useAccountStore();
		const { categories, getCategories } = useCategoryStore();
		const { t } = useTranslation();
		const { colorMode } = useColorMode();

		const {
			register,
			handleSubmit,
			reset,
			formState: { errors, isValid },
		} = useForm<ExpenseBody>({
			resolver: yupResolver(ExpenseSchema),
		});

		useEffect(() => {
			(async () => {
				await getAccounts();
				await getCategories();
			})();
		}, []);

		return (
			<Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
				<ModalOverlay />
				<ModalContent maxW={{ base: "calc(100% - 32px)", sm: 400 }}>
					<ModalHeader pt={5} px={5} pb={0}>
						{t("pages.expenses.editModal.form.title")}
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
										{t("pages.expenses.editModal.form.fields.title")}:
									</FormLabel>
									<Input
										{...register("title")}
										defaultValue={expense.title}
										type="text"
										focusBorderColor={
											colorMode === "light" ? "green.500" : "green.200"
										}
										placeholder={t(
											"pages.expenses.editModal.form.placeholders.title",
										)}
									/>
									{errors.title && (
										<FormErrorMessage>{errors.title?.message}</FormErrorMessage>
									)}
								</FormControl>
								<FormControl isInvalid={!!errors.amount?.message}>
									<FormLabel>
										{t("pages.expenses.editModal.form.fields.amount")}:
									</FormLabel>
									<NumberInput
										defaultValue={expense.amount}
										precision={2}
										min={0}
										max={1000000000}
										step={10}
										focusBorderColor={
											colorMode === "light" ? "green.500" : "green.200"
										}
									>
										<NumberInputField {...register("amount")} />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
									{errors.amount && (
										<FormErrorMessage>
											{errors.amount?.message}
										</FormErrorMessage>
									)}
								</FormControl>
								<FormControl isInvalid={!!errors.category_id?.message}>
									<FormLabel>
										{t("pages.expenses.editModal.form.fields.category")}:
									</FormLabel>
									<Select
										{...register("category_id")}
										defaultValue={expense.category.id}
										focusBorderColor={
											colorMode === "light" ? "green.500" : "green.200"
										}
									>
										{categories.map(({ id, title }) => (
											<option key={id} value={id}>
												{title}
											</option>
										))}
									</Select>
									{errors.category_id && (
										<FormErrorMessage>
											{errors.category_id?.message}
										</FormErrorMessage>
									)}
								</FormControl>
								<FormControl isInvalid={!!errors.account_id?.message}>
									<FormLabel>
										{t("pages.expenses.editModal.form.fields.account")}:
									</FormLabel>
									<Select
										{...register("account_id")}
										defaultValue={expense.account.id}
										focusBorderColor={
											colorMode === "light" ? "green.500" : "green.200"
										}
									>
										{accounts.map(({ id, title }) => (
											<option key={id} value={id}>
												{title}
											</option>
										))}
									</Select>
									{errors.account_id && (
										<FormErrorMessage>
											{errors.account_id?.message}
										</FormErrorMessage>
									)}
								</FormControl>
								<Stack spacing={10} pt={2}>
									<UpdateExpenseButton
										id={expense.id}
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
