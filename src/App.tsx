import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
    // TODO: TypeScript fix typing
    // TODO: Server Error Provider
    // TODO: Network Error Provider
    // TODO: Success & Error toasts utils

    useUnload(() => {
        localStorage.setItem("language", i18n.language);
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
