import { t } from "i18next";
import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required(() =>
      t("validation.required", {
        field: t("pages.login.form.fields.email"),
      }),
    )
    .email(() =>
      t("validation.email", {
        field: t("pages.login.form.fields.email"),
      }),
    ),
  password: Yup.string().required(() =>
    t("validation.required", {
      field: t("pages.login.form.fields.password"),
    }),
  ),
});

export const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .required(() =>
      t("validation.required", {
        field: t("pages.registration.form.fields.name"),
      }),
    )
    .min(3, () =>
      t("validation.min", {
        field: t("pages.registration.form.fields.name"),
        min: 3,
      }),
    )
    .max(60, () =>
      t("validation.max", {
        field: t("pages.registration.form.fields.name"),
        max: 60,
      }),
    ),
  email: Yup.string()
    .required(() =>
      t("validation.required", {
        field: t("pages.registration.form.fields.email"),
      }),
    )
    .email(() =>
      t("validation.email", {
        field: t("pages.registration.form.fields.email"),
      }),
    ),
  password: Yup.string()
    .required(() =>
      t("validation.required", {
        field: t("pages.registration.form.fields.password"),
      }),
    )
    .min(8, () =>
      t("validation.min", {
        field: t("pages.registration.form.fields.password"),
        min: 8,
      }),
    )
    .max(100, () =>
      t("validation.max", {
        field: t("pages.registration.form.fields.password"),
        max: 100,
      }),
    ),
  password_confirmation: Yup.string()
    .required(() =>
      t("validation.required", {
        field: t("pages.registration.form.fields.password_confirmation"),
      }),
    )
    .oneOf([Yup.ref("password")], () =>
      t("validation.oneOf", {
        firstField: t("pages.registration.form.fields.password_confirmation"),
        secondField: t("pages.registration.form.fields.password"),
      }),
    ),
});

export const UpdateUserSchema = Yup.object().shape({
  name: Yup.string()
    .required(() =>
      t("validation.required", {
        field: t("pages.registration.form.fields.name"),
      }),
    )
    .min(3, () =>
      t("validation.min", {
        field: t("pages.registration.form.fields.name"),
        min: 3,
      }),
    )
    .max(60, () =>
      t("validation.max", {
        field: t("pages.registration.form.fields.name"),
        max: 60,
      }),
    ),
  email: Yup.string()
    .required(() =>
      t("validation.required", {
        field: t("pages.registration.form.fields.email"),
      }),
    )
    .email(() =>
      t("validation.email", {
        field: t("pages.registration.form.fields.email"),
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
  avatar: Yup.mixed<File>().nullable(),
});
