import {StoreContext} from "@/context";
import {useContext} from "react";

export const useStores = () => {
    return useContext(StoreContext);
};