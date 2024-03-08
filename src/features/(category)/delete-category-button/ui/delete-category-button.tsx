import { useCategoryStore } from "@/entities/category";
import { Category } from "@/shared/api/category";
import { Button } from "@/shared/ui/(button)/button";
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
			w="100%"
			onClick={handleDelete}
			colorScheme={"red"}
			isLoading={isLoading}
			loadingText={t("pages.categories.deleteButtonLoadingText")}
		>
			{t("pages.categories.deleteButton")}
		</Button>
	);
};
