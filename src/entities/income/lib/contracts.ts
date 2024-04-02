import { t } from "i18next";
import * as Yup from "yup";

export const StoreIncomeSchema = Yup.object().shape({
	title: Yup.string()
		.required(() =>
			t("validation.required", {
				field: t("pages.incomes.createModal.form.fields.title"),
			}),
		)
		.min(3, () =>
			t("validation.min", {
				field: t("pages.incomes.createModal.form.fields.title"),
				min: 3,
			}),
		)
		.max(60, () =>
			t("validation.max", {
				field: t("pages.incomes.createModal.form.fields.title"),
				max: 60,
			}),
		),
	amount: Yup.string().required(() =>
		t("validation.required", {
			field: t("pages.incomes.createModal.form.fields.amount"),
		}),
	),
	category_id: Yup.number()
		.transform(value => (Number.isNaN(value) ? null : value))
		.nullable()
		.required(() =>
			t("validation.required", {
				field: t("pages.incomes.createModal.form.fields.category"),
			}),
		),
	account_id: Yup.number()
		.transform(value => (Number.isNaN(value) ? null : value))
		.nullable()
		.required(() =>
			t("validation.required", {
				field: t("pages.incomes.createModal.form.fields.account"),
			}),
		),
});

export const UpdateIncomeSchema = Yup.object().shape({
	title: Yup.string()
		.required(() =>
			t("validation.required", {
				field: t("pages.incomes.createModal.form.fields.title"),
			}),
		)
		.min(3, () =>
			t("validation.min", {
				field: t("pages.incomes.createModal.form.fields.title"),
				min: 3,
			}),
		)
		.max(60, () =>
			t("validation.max", {
				field: t("pages.incomes.createModal.form.fields.title"),
				max: 60,
			}),
		),
	amount: Yup.string().required(() =>
		t("validation.required", {
			field: t("pages.incomes.createModal.form.fields.amount"),
		}),
	),
	category_id: Yup.number()
		.transform(value => (Number.isNaN(value) ? null : value))
		.nullable()
		.required(() =>
			t("validation.required", {
				field: t("pages.incomes.createModal.form.fields.category"),
			}),
		),
	account_id: Yup.number()
		.transform(value => (Number.isNaN(value) ? null : value))
		.nullable()
		.required(() =>
			t("validation.required", {
				field: t("pages.incomes.createModal.form.fields.account"),
			}),
		),
});
