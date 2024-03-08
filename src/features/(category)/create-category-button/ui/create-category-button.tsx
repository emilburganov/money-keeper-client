import { useCategoryStore } from "@/entities/category";
import { CategoryBody } from "@/shared/api/category";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CreateCategoryButtonProps {
	reset: () => void;
	isValid: boolean;
	isLoading: boolean;
	handleSubmit: UseFormHandleSubmit<CategoryBody>;
	onSubmit: () => void;
}

export const CreateCategoryButton = observer(
	(props: CreateCategoryButtonProps) => {
		const { reset, isValid, isLoading, handleSubmit, onSubmit } = props;
		const { createCategory } = useCategoryStore();
		const { t } = useTranslation();

		const handleCreate = (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			handleSubmit(createCategory)();

			if (isValid) {
				onSubmit();
				reset();
			}
		};

		return (
			<Button isLoading={isLoading} onClick={handleCreate}>
				{t("pages.categories.createButton")}
			</Button>
		);
	},
);
