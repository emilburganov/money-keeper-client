import RootStore from "@/store";
import {createContext} from "react";

export const StoreContext = createContext<RootStore | null>(null);