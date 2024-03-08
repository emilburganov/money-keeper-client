import { AccountStore } from "../model/store";
import { createContext } from "react";

export const AccountStoreContext = createContext<null | AccountStore>(null);
