import {StoreContext} from "@/context";
import RootStore from "@/store/RootStore";
import {useContext} from "react";

const useStores = (): RootStore => {
    return useContext(StoreContext);
};

export default useStores;