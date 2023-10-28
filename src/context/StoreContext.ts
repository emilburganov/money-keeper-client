import RootStore from "@/store/RootStore";
import {createContext} from "react";

const StoreContext = createContext<RootStore>(new RootStore);

export default StoreContext;