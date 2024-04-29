import { useTransferStore } from "@/entities/transfer";
import { TransferBody } from "@/shared/api/transfer";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface UpdateTransferButtonProps {
  id: number;
  reset: () => void;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<TransferBody>;
  onSubmit: () => void;
}

export const UpdateTransferButton = observer(
  (props: UpdateTransferButtonProps) => {
    const { t } = useTranslation();
    const { id, reset, isValid, handleSubmit, onSubmit } = props;
    const { updateTransfer } = useTransferStore();
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setLoading(true);
      await handleSubmit(data => updateTransfer(data, id))();
      setLoading(false);

      if (isValid) {
        onSubmit();
        reset();
      }
    };

    return (
      <Button
        onClick={handleUpdate}
        isLoading={isLoading}
        loadingText={t("crud.buttons.updateButtonLoadingText")}
      >
        {t("crud.buttons.updateButton")}
      </Button>
    );
  },
);
