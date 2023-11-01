import {createStandaloneToast} from "@chakra-ui/react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import LoaderProvider from "./providers/LoaderProvider";
import StoreProvider from "./providers/StoreProvider";

const {ToastContainer} = createStandaloneToast();

createRoot(document.getElementById("root")!).render(
    <LoaderProvider>
        <StoreProvider>
            <App/>
            <ToastContainer/>
        </StoreProvider>
    </LoaderProvider>,
);
