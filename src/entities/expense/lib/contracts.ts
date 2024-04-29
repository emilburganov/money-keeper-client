import { t } from "i18next";
import * as Yup from "yup";

export const StoreExpenseSchema = Yup.object().shape({
  title: Yup.string()
    .required(() =>
      t("validation.required", {
        field: t("pages.expenses.createModal.form.fields.title"),
      }),
    )
    .min(3, () =>
      t("validation.min", {
        field: t("pages.expenses.createModal.form.fields.title"),
        min: 3,
      }),
    )
    .max(60, () =>
      t("validation.max", {
        field: t("pages.expenses.createModal.form.fields.title"),
        max: 60,
      }),
    ),
  amount: Yup.string().required(() =>
    t("validation.required", {
      field: t("pages.expenses.createModal.form.fields.amount"),
    }),
  ),
  category_id: Yup.number()
    .transform(value =>
      isNaN(value) || value === null || value === undefined ? 0 : value,
    )
    .nullable()
    .required(() =>
      t("validation.required", {
        field: t("pages.expenses.createModal.form.fields.category"),
      }),
    ),
  account_id: Yup.number()
    .transform(value =>
      isNaN(value) || value === null || value === undefined ? 0 : value,
    )
    .nullable()
    .required(() =>
      t("validation.required", {
        field: t("pages.expenses.createModal.form.fields.account"),
      }),
    ),
});

export const UpdateExpenseSchema = Yup.object().shape({
  title: Yup.string()
    .required(() =>
      t("validation.required", {
        field: t("pages.expenses.createModal.form.fields.title"),
      }),
    )
    .min(3, () =>
      t("validation.min", {
        field: t("pages.expenses.createModal.form.fields.title"),
        min: 3,
      }),
    )
    .max(60, () =>
      t("validation.max", {
        field: t("pages.expenses.createModal.form.fields.title"),
        max: 60,
      }),
    ),
  amount: Yup.string().required(() =>
    t("validation.required", {
      field: t("pages.expenses.createModal.form.fields.amount"),
    }),
  ),
  category_id: Yup.number()
    .transform(value =>
      isNaN(value) || value === null || value === undefined ? 0 : value,
    )
    .nullable()
    .required(() =>
      t("validation.required", {
        field: t("pages.expenses.createModal.form.fields.category"),
      }),
    ),
  account_id: Yup.number()
    .transform(value =>
      isNaN(value) || value === null || value === undefined ? 0 : value,
    )
    .nullable()
    .required(() =>
      t("validation.required", {
        field: t("pages.expenses.createModal.form.fields.account"),
      }),
    ),
});
