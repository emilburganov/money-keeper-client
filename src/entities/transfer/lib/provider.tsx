import type { ReactNode } from "react";
import { TransferStore } from "../model/store";

import { TransferStoreContext } from "./context";

interface TransferProviderProps {
  children?: ReactNode;
}

export const TransferProvider = ({ children }: TransferProviderProps) => {
  const store = new TransferStore();

  return (
    <TransferStoreContext.Provider value={store}>
      {children}
    </TransferStoreContext.Provider>
  );
};
