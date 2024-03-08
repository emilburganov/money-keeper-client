import { t } from "i18next";
import * as Yup from "yup";

export const TransferSchema = Yup.object().shape({
	title: Yup.string()
		.required(() =>
			t("validation.required", {
				field: t("pages.transfers.createModal.form.fields.title"),
			}),
		)
		.min(3, () =>
			t("validation.min", {
				field: t("pages.transfers.createModal.form.fields.title"),
				min: 3,
			}),
		)
		.max(60, () =>
			t("validation.max", {
				field: t("pages.transfers.createModal.form.fields.title"),
				max: 60,
			}),
		),
	amount: Yup.string().required(() =>
		t("validation.required", {
			field: t("pages.transfers.createModal.form.fields.amount"),
		}),
	),
	account_from_id: Yup.number()
		.transform(value => (Number.isNaN(value) ? null : value))
		.nullable()
		.required(() =>
			t("validation.required", {
				field: t("pages.transfers.createModal.form.fields.account_from"),
			}),
		),
	account_to_id: Yup.number()
		.transform(value => (Number.isNaN(value) ? null : value))
		.nullable()
		.required(() =>
			t("validation.required", {
				field: t("pages.transfers.createModal.form.fields.account_to"),
			}),
		),
});
