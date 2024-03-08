import { t } from "i18next";
import * as Yup from "yup";

export const AccountSchema = Yup.object().shape({
	title: Yup.string()
		.required(() =>
			t("validation.required", {
				field: t("pages.accounts.createModal.form.fields.title"),
			}),
		)
		.min(3, () =>
			t("validation.min", {
				field: t("pages.accounts.createModal.form.fields.title"),
				min: 3,
			}),
		)
		.max(60, () =>
			t("validation.max", {
				field: t("pages.accounts.createModal.form.fields.title"),
				max: 60,
			}),
		),
	currency_id: Yup.number()
		.transform(value =>
			isNaN(value) || value === null || value === undefined ? 0 : value,
		)
		.nullable()
		.required(() =>
			t("validation.required", {
				field: t("pages.accounts.createModal.form.fields.currency"),
			}),
		),
});
