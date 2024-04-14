import { useCategoryStore } from "@/entities/category";
import { CategoryBody } from "@/shared/api/category";
import { Button } from "@/shared/ui/(button)/button";
import { observer } from "mobx-react-lite";
import { MouseEvent, useState } from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CreateCategoryButtonProps {
	reset: () => void;
	isValid: boolean;
	handleSubmit: UseFormHandleSubmit<CategoryBody>;
	onSubmit: () => void;
}

export const CreateCategoryButton = observer(
	(props: CreateCategoryButtonProps) => {
		const { reset, isValid, handleSubmit, onSubmit } = props;
		const { createCategory } = useCategoryStore();
		const { t } = useTranslation();
		const [isLoading, setLoading] = useState<boolean>(false);

		const handleCreate = async (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();

			setLoading(true);
			await handleSubmit(createCategory)();
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
