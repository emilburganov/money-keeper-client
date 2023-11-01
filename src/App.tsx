import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useStores from "@/hooks/useStores";
import useUnload from "@/hooks/useUnload";
import i18n from "@/i18n";
import AppRouter from "@/router/AppRouter";
import theme from "@/utils/theme";
import {ChakraProvider} from "@chakra-ui/react";
import {FC} from "react";
import {BrowserRouter} from "react-router-dom";

import "./i18n";
import "./styles/App.css";

const App: FC = () => {
    // TODO: Sync translation with server

    const {authStore} = useStores();

    useUnload(async () => {
        let lang = i18n.language;

        if (authStore.isAuth) {
            await authStore.me();
            lang = authStore.user.lang
        }

        localStorage.setItem("lang", lang);
    });

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
