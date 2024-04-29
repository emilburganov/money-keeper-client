import { useExpenseStore } from "@/entities/expense";
import { ExpenseBody } from "@/shared/api/expense";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface UpdateExpenseButtonProps {
  id: number;
  reset: () => void;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<ExpenseBody>;
  onSubmit: () => void;
}

export const UpdateExpenseButton = observer(
  (props: UpdateExpenseButtonProps) => {
    const { t } = useTranslation();
    const { id, reset, isValid, handleSubmit, onSubmit } = props;
    const { updateExpense } = useExpenseStore();
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setLoading(true);
      await handleSubmit(data => updateExpense(data, id))();
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
