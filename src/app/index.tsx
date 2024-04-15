import { Routing } from "@/pages";
import "@/shared/i18n";
import { Spinner } from "@/shared/ui/(spinner)/spinner";
import { Footer, Header } from "@/widgets/(includes)";
import { createStandaloneToast } from "@chakra-ui/react";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Providers } from "./providers";

const {ToastContainer} = createStandaloneToast();

const App = () => {
    return (
        <Providers>
            <ToastContainer/>
            <BrowserRouter>
                <Header/>
                <Suspense fallback={<Spinner/>}>
                    <Routing/>
                </Suspense>
                <Footer/>
            </BrowserRouter>
        </Providers>
    );
};

export default App;
