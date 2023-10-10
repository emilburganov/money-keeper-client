import {createContext} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import RootStore from "./store/RootStore";

interface State {
    store: RootStore,
}

export const store = new RootStore();

export const Context = createContext<State>({
    store,
});

createRoot(document.getElementById("root")!).render(
    <Context.Provider value={{store}}>
        <App/>
    </Context.Provider>,
);
