import { useAccountStore } from "@/entities/account";
import { useCategoryStore } from "@/entities/category";
import { UpdateIncomeSchema } from "@/entities/income";
import { UpdateIncomeButton } from "@/features/(income)";
import { CategoryType } from "@/shared/api/category";
import { Income, IncomeBody } from "@/shared/api/income";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage, FormHelperText,
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
import {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {Currency} from "@/shared/api/currency";

interface EditIncomeModalProps {
  income: Income;
  isOpen: boolean;
  onClose: () => void;
}

export const EditIncomeModal = observer(
  ({ income, isOpen, onClose }: EditIncomeModalProps) => {
    const { accounts, getAccounts } = useAccountStore();
    const { categories, getCategories } = useCategoryStore();
    const { t } = useTranslation();
    const { colorMode } = useColorMode();
    const [accountCurrency, setAccountCurrency] = useState<Currency | null>(income?.account?.currency);

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isValid },
    } = useForm<IncomeBody>({
      resolver: yupResolver(UpdateIncomeSchema),
      defaultValues: {
        title: income.title,
        amount: String(income.amount),
        category_id: income.category.id,
        account_id: income.account.id,
      },
    });

    useEffect(() => {
      (async () => {
        await getAccounts();
        await getCategories();
      })();
    }, []);

    const updateAccountCurrency = (id: number) => {
      const account = accounts.find((account) => account.id === id);

      if (account) {
        setAccountCurrency(account.currency)
      }
    }

    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent maxW={{ base: "calc(100% - 32px)", sm: 400 }}>
          <ModalHeader pt={5} px={5} pb={0}>
            {t("pages.incomes.editModal.form.title")}
          </ModalHeader>
          <ModalCloseButton top={5} right={5} />
          <Flex direction="column" gap={4}>
            <Box
              rounded="lg"
              bg={colorMode === "light" ? "gray.50" : "gray.700"}
              boxShadow="lg"
              p={5}
            >
              <Stack spacing={4}>
                <FormControl isInvalid={!!errors.title?.message}>
                  <FormLabel>
                    {t("pages.incomes.editModal.form.fields.title")}:
                  </FormLabel>
                  <Input
                    {...register("title")}
                    type="text"
                    focusBorderColor={
                      colorMode === "light" ? "green.500" : "green.200"
                    }
                    placeholder={t(
                      "pages.incomes.editModal.form.placeholders.title",
                    )}
                  />
                  {errors.title && (
                    <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.amount?.message}>
                  <FormLabel>
                    {t("pages.incomes.editModal.form.fields.amount")}:
                  </FormLabel>
                  <NumberInput
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
                    {t("pages.incomes.editModal.form.fields.category")}:
                  </FormLabel>
                  <Select
                    {...register("category_id")}
                    focusBorderColor={
                      colorMode === "light" ? "green.500" : "green.200"
                    }
                  >
                    {categories
                      .filter(
                        category => category.type !== CategoryType.EXPENSES,
                      )
                      .map(({ id, title }) => (
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
                    {t("pages.incomes.editModal.form.fields.account")}:
                  </FormLabel>
                  <Select
                    {...register("account_id")}
                    focusBorderColor={
                      colorMode === "light" ? "green.500" : "green.200"
                    }
                    onChange={(event) => updateAccountCurrency(Number(event.target.value))}
                  >
                    {accounts.map(({ id, title }) => (
                      <option key={id} value={id}>
                        {title}
                      </option>
                    ))}
                  </Select>
                  {accountCurrency && <FormHelperText>
                    {t("pages.incomes.editModal.form.accountCurrency")} - {accountCurrency.title} ({accountCurrency.code})
                  </FormHelperText>}
                  {errors.account_id && (
                    <FormErrorMessage>
                      {errors.account_id?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <UpdateIncomeButton
                    id={income.id}
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
