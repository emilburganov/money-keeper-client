import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useLocales from "@/hooks/useLocales";
import AppRouter from "@/router/AppRouter";
import theme from "@/utils/theme";
import {ChakraProvider} from "@chakra-ui/react";
import {FC} from "react";
import {BrowserRouter} from "react-router-dom";
import "./styles/App.css";

const App: FC = () => {
    useLocales();

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
