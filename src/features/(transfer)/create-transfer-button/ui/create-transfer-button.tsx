import { useTransferStore } from "@/entities/transfer";
import { TransferBody } from "@/shared/api/transfer";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CreateTransferButtonProps {
  reset: () => void;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<TransferBody>;
  onSubmit: () => void;
}

export const CreateTransferButton = observer(
  (props: CreateTransferButtonProps) => {
    const { reset, isValid, handleSubmit, onSubmit } = props;
    const { createTransfer } = useTransferStore();
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleCreate = async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      setLoading(true);
      await handleSubmit(createTransfer)();
      setLoading(false);

      if (isValid) {
        onSubmit();
        reset();
      }
    };

    return (
      <Button
        isLoading={isLoading}
        onClick={handleCreate}
        loadingText={t("crud.buttons.createButtonLoadingText")}
      >
        {t("crud.buttons.createButton")}
      </Button>
    );
  },
);
