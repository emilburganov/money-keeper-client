import StoreContext from "@/context/StoreContext";
import {RootStoreType} from "@/store/RootStore";
import {useContext} from "react";

const useStores = (): RootStoreType => {
    return useContext(StoreContext);
};

export default useStores;