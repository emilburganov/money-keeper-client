import {resources} from "@/i18n";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: {
            en: typeof resources.en,
            ru: typeof resources.ru,
        };
    }
}