import StoreContext from "@/context/StoreContext";
import RootStore from "@/store/RootStore";
import {ReactNode} from "react";

const StoreProvider = ({children}: { children: ReactNode }) => {
    const store = new RootStore();

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};


export default StoreProvider;