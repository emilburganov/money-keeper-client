import useUnload from "@/hooks/useUnload";
import translationEN from "@/locales/en/translation.json";
import translationRU from "@/locales/ru/translation.json";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const useLocales = () => {
    const resources = {
        en: {
            translation: translationEN,
        },
        ru: {
            translation: translationRU,
        },
    };

    i18n.use(initReactI18next).init({
        resources,
        lng: localStorage.getItem("language"),
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

    useUnload(() => {
        localStorage.setItem("language", i18n.language);
    });
};

export default useLocales;