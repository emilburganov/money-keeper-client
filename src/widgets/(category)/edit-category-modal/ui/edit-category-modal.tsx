import { CategorySchema } from "@/entities/category";
import { UpdateCategoryButton } from "@/features/(category)";
import { Category, CategoryBody, CategoryType } from "@/shared/api/category";
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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface EditCategoryModalProps {
	category: Category;
	isOpen: boolean;
	onClose: () => void;
}

export const EditCategoryModal = observer(
	({ category, isOpen, onClose }: EditCategoryModalProps) => {
		const { t } = useTranslation();
		const { colorMode } = useColorMode();
		
		const {
			register,
			handleSubmit,
			reset,
			formState: { errors, isValid },
		} = useForm<CategoryBody>({
			resolver: yupResolver(CategorySchema),
		});
		
		return (
			<Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
				<ModalOverlay />
				<ModalContent maxW={{ base: "calc(100% - 32px)", sm: 400 }}>
					<ModalHeader pt={5} px={5} pb={0}>
						{t("pages.categories.editModal.form.title")}
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
										{t("pages.categories.editModal.form.fields.title")}:
									</FormLabel>
									<Input
										{...register("title")}
										defaultValue={category.title}
										placeholder={t(
											"pages.categories.editModal.form.placeholders.title",
										)}
										focusBorderColor={
											colorMode === "light" ? "green.500" : "green.200"
										}
									/>
									{errors.title && (
										<FormErrorMessage>{errors.title?.message}</FormErrorMessage>
									)}
								</FormControl>
								<FormControl isInvalid={!!errors.type?.message}>
									<FormLabel>
										{t("pages.categories.createModal.form.fields.type")}:
									</FormLabel>
									<Select
										{...register("type")}
										defaultValue={category.type}
										focusBorderColor={
											colorMode === "light" ? "green.500" : "green.200"
										}
									>
										<option
											value={CategoryType.INCOMES}
										>
											{t("models.type.Incomes")}
										</option>
										<option
											value={CategoryType.EXPENSES}
										>
											{t("models.type.Expenses")}
										</option>
									</Select>
									{errors.type && (
										<FormErrorMessage>{errors.type?.message}</FormErrorMessage>
									)}
								</FormControl>
								<Stack spacing={10} pt={2}>
									<UpdateCategoryButton
										id={category.id}
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
