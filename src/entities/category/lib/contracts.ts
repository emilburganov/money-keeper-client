import { t } from "i18next";
import * as Yup from "yup";

export const CreateCategorySchema = Yup.object().shape({
	title: Yup.string()
		.required(() =>
			t("validation.required", {
				field: t("pages.categories.createModal.form.fields.title"),
			}),
		)
		.min(3, () =>
			t("validation.min", {
				field: t("pages.categories.createModal.form.fields.title"),
				min: 3,
			}),
		)
		.max(60, () =>
			t("validation.max", {
				field: t("pages.categories.createModal.form.fields.title"),
				max: 60,
			}),
		),
	type: Yup.string().required(() =>
		t("validation.required", {
			field: t("pages.categories.createModal.form.fields.type"),
		}),
	),
});

export const UpdateCategorySchema = Yup.object().shape({
	title: Yup.string()
		.required(() =>
			t("validation.required", {
				field: t("pages.categories.createModal.form.fields.title"),
			}),
		)
		.min(3, () =>
			t("validation.min", {
				field: t("pages.categories.createModal.form.fields.title"),
				min: 3,
			}),
		)
		.max(60, () =>
			t("validation.max", {
				field: t("pages.categories.createModal.form.fields.title"),
				max: 60,
			}),
		),
});
