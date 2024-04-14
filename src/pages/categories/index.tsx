import { Category } from "@/shared/api/category";
import { Button } from "@/shared/ui/(button)/button";
import { Container } from "@/shared/ui/(container)/container";
import {
	CategoryCards,
	CreateCategoryModal,
	EditCategoryModal,
} from "@/widgets/(category)";
import { Stack, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CategoriesPage() {
	const { t } = useTranslation();
	const [category, setCategory] = useState<Category | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onEditModalClose = () => {
		onClose();
		setCategory(null);
	};

	return (
		<Container>
			<Stack pt={2} gap={6}>
				<Button onClick={onOpen}>{t("crud.buttons.createButton")}</Button>
				<CreateCategoryModal isOpen={isOpen && !category} onClose={onClose} />
				{category && (
					<EditCategoryModal
						category={category}
						isOpen={isOpen}
						onClose={onEditModalClose}
					/>
				)}
				<CategoryCards onOpen={onOpen} setCategory={setCategory} />
			</Stack>
		</Container>
	);
}
