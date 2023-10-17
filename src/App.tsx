import Footer from "@/components/Footer";
import Header from "@/components/Header";
import translationEN from "@/locales/en/translation.json";
import translationRU from "@/locales/ru/translation.json";
import AppRouter from "@/router/AppRouter";
import theme from "@/utils/theme";
import {ChakraProvider} from "@chakra-ui/react";
import i18n from "i18next";
import {FC} from "react";
import {initReactI18next} from "react-i18next";
import {BrowserRouter} from "react-router-dom";
import "./styles/App.css";

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

window.addEventListener("beforeunload", () => {
    localStorage.setItem("language", i18n.language);
});

const App: FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Header/>
                <AppRouter/>
                <Footer/>
            </BrowserRouter>
        </ChakraProvider>
    );
};

export default App;
