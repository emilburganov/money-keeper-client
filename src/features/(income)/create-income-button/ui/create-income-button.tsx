import { useIncomeStore } from "@/entities/income";
import { IncomeBody } from "@/shared/api/income";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CreateIncomeButtonProps {
  reset: () => void;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<IncomeBody>;
  onSubmit: () => void;
}

export const CreateIncomeButton = observer((props: CreateIncomeButtonProps) => {
  const { reset, isValid, handleSubmit, onSubmit } = props;
  const { createIncome } = useIncomeStore();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleCreate = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setLoading(true);
    await handleSubmit(createIncome)();
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
});
