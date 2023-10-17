import {createStandaloneToast} from "@chakra-ui/react";
import i18next from "i18next";
import {createRoot} from "react-dom/client";
import {I18nextProvider} from "react-i18next";
import App from "./App.tsx";
import {StoreProvider} from "./providers/StoreProvider";

i18next.init({
    interpolation: {escapeValue: false},
});

const {ToastContainer} = createStandaloneToast();

createRoot(document.getElementById("root")!).render(
    <StoreProvider>
        <I18nextProvider i18n={i18next}>
            <App/>
        </I18nextProvider>
        <ToastContainer/>
    </StoreProvider>,
);
