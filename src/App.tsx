import AppRouter from "@/router/AppRouter";
import {ChakraProvider} from "@chakra-ui/react";
import {FC} from "react";
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
