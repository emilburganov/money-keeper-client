import RootStore from "@/store/RootStore";
import {createContext} from "react";

export const StoreContext = createContext<RootStore>(RootStore);