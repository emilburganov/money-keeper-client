import { CategoryStore } from "../model/store";
import { createContext } from "react";

export const CategoryStoreContext = createContext<null | CategoryStore>(null);
