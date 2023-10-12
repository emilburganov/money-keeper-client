import RootStore from "@/store/RootStore";
import {ReactNode} from "react";
import {StoreContext} from '@/context'

export const StoreProvider = ({children}: { children: ReactNode }) => {
    const store = new RootStore();

    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};