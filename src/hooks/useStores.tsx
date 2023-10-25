import {StoreContext} from "@/context";
import {useContext} from "react";

const useStores = () => {
    return useContext(StoreContext);
};

export default useStores;