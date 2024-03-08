import { createContext } from "react";
import { TransferStore } from "../model/store";

export const TransferStoreContext = createContext<null | TransferStore>(null);
