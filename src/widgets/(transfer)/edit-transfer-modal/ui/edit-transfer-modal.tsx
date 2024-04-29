import { useAccountStore } from "@/entities/account";
import { UpdateTransferSchema } from "@/entities/transfer";
import { UpdateTransferButton } from "@/features/(transfer)";
import { Transfer, TransferBody } from "@/shared/api/transfer";
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

interface EditTransferModalProps {
  transfer: Transfer;
  isOpen: boolean;
  onClose: () => void;
}

export const EditTransferModal = observer(
  ({ transfer, isOpen, onClose }: EditTransferModalProps) => {
    const { accounts, getAccounts } = useAccountStore();
    const { t } = useTranslation();
    const { colorMode } = useColorMode();

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isValid },
    } = useForm<TransferBody>({
      resolver: yupResolver(UpdateTransferSchema),
      defaultValues: {
        title: transfer.title,
        amount: String(transfer.amount),
        account_from_id: transfer.account_from.id,
        account_to_id: transfer.account_to.id,
      },
    });

    useEffect(() => {
      (async () => {
        await getAccounts();
      })();
    }, []);

    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent maxW={{ base: "calc(100% - 32px)", sm: 400 }}>
          <ModalHeader pt={5} px={5} pb={0}>
            {t("pages.transfers.editModal.form.title")}
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
                    {t("pages.transfers.editModal.form.fields.title")}:
                  </FormLabel>
                  <Input
                    {...register("title")}
                    type="text"
                    focusBorderColor={
                      colorMode === "light" ? "green.500" : "green.200"
                    }
                    placeholder={t(
                      "pages.transfers.editModal.form.placeholders.title",
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
                <FormControl isInvalid={!!errors.account_from_id?.message}>
                  <FormLabel>
                    {t("pages.transfers.editModal.form.fields.account_from")}:
                  </FormLabel>
                  <Select
                    {...register("account_from_id")}
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
                  {errors.account_from_id && (
                    <FormErrorMessage>
                      {errors.account_from_id?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.account_to_id?.message}>
                  <FormLabel>
                    {t("pages.transfers.editModal.form.fields.account_to")}:
                  </FormLabel>
                  <Select
                    {...register("account_to_id")}
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
                  {errors.account_to_id && (
                    <FormErrorMessage>
                      {errors.account_to_id?.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <UpdateTransferButton
                    id={transfer.id}
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
