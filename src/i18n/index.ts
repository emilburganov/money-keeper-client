import translationEN from "@/i18n/locales/en/translation.json";
import translationRU from "@/i18n/locales/ru/translation.json";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

export const resources = {
    en: {
        translation: translationEN,
    },
    ru: {
        translation: translationRU,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem("language") as string,
    fallbackLng: "en",
});

export default i18n;