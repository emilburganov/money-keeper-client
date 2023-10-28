import {StoreContext} from "@/context";
import {RootStoreType} from "@/store/RootStore";
import {useContext} from "react";

const useStores = (): RootStoreType => {
    return useContext(StoreContext);
};

export default useStores;