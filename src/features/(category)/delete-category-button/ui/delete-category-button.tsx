import { useCategoryStore } from "@/entities/category";
import { Category } from "@/shared/api/category";
import { Button } from "@/shared/ui/(button)/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface DeleteCategoryButtonProps {
  category: Category;
}

export const DeleteCategoryButton = ({
  category,
}: DeleteCategoryButtonProps) => {
  const { deleteCategory } = useCategoryStore();
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteCategory(category);
    setLoading(false);
  };

  return (
    <Button
      onClick={handleDelete}
      colorScheme="red"
      isLoading={isLoading}
      loadingText={t("crud.buttons.deleteButtonLoadingText")}
    >
      <DeleteIcon />
    </Button>
  );
};
