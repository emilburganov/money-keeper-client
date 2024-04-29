import { useExpenseStore } from "@/entities/expense";
import { ExpenseBody } from "@/shared/api/expense";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CreateExpenseButtonProps {
  reset: () => void;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<ExpenseBody>;
  onSubmit: () => void;
}

export const CreateExpenseButton = observer(
  (props: CreateExpenseButtonProps) => {
    const { reset, isValid, handleSubmit, onSubmit } = props;
    const { createExpense } = useExpenseStore();
    const { t } = useTranslation();
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleCreate = async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      setLoading(true);
      await handleSubmit(createExpense)();
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
