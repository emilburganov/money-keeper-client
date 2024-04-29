import { useCategoryStore } from "@/entities/category";
import { CategoryBody } from "@/shared/api/category";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface UpdateCategoryButtonProps {
  id: number;
  reset: () => void;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<Omit<CategoryBody, "type">>;
  onSubmit: () => void;
}

export const UpdateCategoryButton = observer(
  (props: UpdateCategoryButtonProps) => {
    const { t } = useTranslation();
    const { id, reset, isValid, handleSubmit, onSubmit } = props;
    const { updateCategory } = useCategoryStore();
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleUpdate = async (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setLoading(true);
      await handleSubmit(data => updateCategory(data, id))();
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
