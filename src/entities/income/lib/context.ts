import { createContext } from "react";
import { IncomeStore } from "../model/store";

export const IncomeStoreContext = createContext<null | IncomeStore>(null);
