import { createContext } from "react";
import { ExpenseStore } from "../model/store";

export const ExpenseStoreContext = createContext<null | ExpenseStore>(null);
