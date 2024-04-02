import { t } from "i18next";
import * as Yup from "yup";

export const StoreTransferSchema = Yup.object().shape({
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
        )
        .notOneOf([Yup.ref("account_to_id")], () =>
            t("validation.notOneOf", {
                firstField: t("pages.transfers.createModal.form.fields.account_from"),
                secondField: t("pages.transfers.createModal.form.fields.account_to"),
            }),
        ),
    account_to_id: Yup.number()
        .transform(value => (Number.isNaN(value) ? null : value))
        .nullable()
        .required(() =>
            t("validation.required", {
                field: t("pages.transfers.createModal.form.fields.account_to"),
            }),
        )
        .notOneOf([Yup.ref("account_from_id")], () =>
            t("validation.notOneOf", {
                firstField: t("pages.transfers.createModal.form.fields.account_to"),
                secondField: t("pages.transfers.createModal.form.fields.account_from"),
            }),
        ),
});

export const UpdateTransferSchema = Yup.object().shape({
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
        )
        .notOneOf([Yup.ref("account_to_id")], () =>
            t("validation.notOneOf", {
                firstField: t("pages.transfers.createModal.form.fields.account_from"),
                secondField: t("pages.transfers.createModal.form.fields.account_to"),
            }),
        ),
    account_to_id: Yup.number()
        .transform(value => (Number.isNaN(value) ? null : value))
        .nullable()
        .required(() =>
            t("validation.required", {
                field: t("pages.transfers.createModal.form.fields.account_to"),
            }),
        )
        .notOneOf([Yup.ref("account_from_id")], () =>
            t("validation.notOneOf", {
                firstField: t("pages.transfers.createModal.form.fields.account_to"),
                secondField: t("pages.transfers.createModal.form.fields.account_from"),
            }),
        ),
});
