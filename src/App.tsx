import {FC} from "react";
import {ChakraProvider} from "@chakra-ui/react";
import AppRouter from "@/router/AppRouter";
import {BrowserRouter} from "react-router-dom";
import "./styles/App.css";

const App: FC = () => {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </ChakraProvider>
    );
};

export default App;
