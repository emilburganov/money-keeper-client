import { useIncomeStore } from "@/entities/income";
import { IncomeBody } from "@/shared/api/income";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface UpdateIncomeButtonProps {
  id: number;
  reset: () => void;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<IncomeBody>;
  onSubmit: () => void;
}

export const UpdateIncomeButton = observer((props: UpdateIncomeButtonProps) => {
  const { t } = useTranslation();
  const { id, reset, isValid, handleSubmit, onSubmit } = props;
  const { updateIncome } = useIncomeStore();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    await handleSubmit(data => updateIncome(data, id))();
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
});
