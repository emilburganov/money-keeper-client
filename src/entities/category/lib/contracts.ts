import {t} from "i18next";
import * as Yup from "yup";
import {parse} from "date-fns/parse";

export const StoreCategorySchema = Yup.object().shape({
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

export const GetCategoriesStatsSchema = Yup.object().shape({
    date_from: Yup.string()
        .transform(function (value, originalValue) {
            if (this.isType(value)) {
                return value;
            }

            console.log(parse(originalValue, "dd.MM.yyyy", new Date()));
            return parse(originalValue, "dd.MM.yyyy", new Date()) + " 23:59:59";
        })
        .typeError(() =>
            t("validation.date", {
                field: t("pages.categories.stats.form.fields.date_from"),
            }),
        )
        .required(() =>
            t("validation.required", {
                field: t("pages.categories.stats.form.fields.date_from"),
            }),
        ),
    date_to: Yup.string()
        .transform(function (value, originalValue) {
            if (this.isType(value)) {
                return value;
            }

            return parse(originalValue, "dd.MM.yyyy", new Date()) + " 23:59:59";
        })
        .typeError(() =>
            t("validation.date", {
                field: t("pages.categories.stats.form.fields.date_to"),
            }),
        )
        .required(() =>
            t("validation.required", {
                field: t("pages.categories.stats.form.fields.date_to"),
            }),
        ),
});
