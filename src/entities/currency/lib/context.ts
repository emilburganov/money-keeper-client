import { CurrencyStore } from "../model/store";
import { createContext } from "react";

export const CurrencyStoreContext = createContext<null | CurrencyStore>(null);
